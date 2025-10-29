import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Refresh,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { DashboardColors, ChartData } from './types';

interface DataManagementProps {
  colors: DashboardColors;
  chartData: ChartData | null;
  userEmail: string;
  loading: boolean;
  onSaveChartData: () => void;
  onUpdateChartData: (newData: ChartData) => void;
  onShowSnackbar: (message: string, severity: 'success' | 'error') => void;
}

interface EditableField {
  key: string;
  label: string;
  type: 'array' | 'object' | 'number';
  value: any;
}

const DataManagement: React.FC<DataManagementProps> = ({
  colors,
  chartData,
  userEmail,
  loading,
  onSaveChartData,
  onUpdateChartData,
  onShowSnackbar,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [pendingData, setPendingData] = useState<ChartData | null>(null);

  const getEditableFields = (): EditableField[] => {
    if (!chartData) return [];
    
    return [
      {
        key: 'daily_call_volume',
        label: 'Daily Call Volume (7 days)',
        type: 'array',
        value: chartData.daily_call_volume
      },
      {
        key: 'average_call_duration',
        label: 'Average Call Duration (7 days)',
        type: 'array',
        value: chartData.average_call_duration
      },
      {
        key: 'conversion_rate',
        label: 'Conversion Rate (7 days)',
        type: 'array',
        value: chartData.conversion_rate
      },
      {
        key: 'call_sentiment.positive',
        label: 'Positive Sentiment %',
        type: 'number',
        value: chartData.call_sentiment.positive
      },
      {
        key: 'call_sentiment.neutral',
        label: 'Neutral Sentiment %',
        type: 'number',
        value: chartData.call_sentiment.neutral
      },
      {
        key: 'call_sentiment.negative',
        label: 'Negative Sentiment %',
        type: 'number',
        value: chartData.call_sentiment.negative
      }
    ];
  };

  const handleEditField = (field: EditableField) => {
    setCurrentField(field);
    if (field.type === 'array') {
      setEditValue(field.value.join(', '));
    } else {
      setEditValue(field.value.toString());
    }
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentField || !chartData) return;

    let newValue: any;
    
    try {
      if (currentField.type === 'array') {
        newValue = editValue.split(',').map(v => Number(v.trim())).filter(v => !isNaN(v));
        if (newValue.length !== 7) {
          onShowSnackbar('Please provide exactly 7 values separated by commas', 'error');
          return;
        }
      } else if (currentField.type === 'number') {
        newValue = Number(editValue);
        if (isNaN(newValue) || newValue < 0 || newValue > 100) {
          onShowSnackbar('Please provide a valid number between 0 and 100', 'error');
          return;
        }
      }

      // Create updated chart data
      const updatedData = { ...chartData };
      
      if (currentField.key.includes('.')) {
        const [parent, child] = currentField.key.split('.');
        if (parent === 'call_sentiment') {
          updatedData.call_sentiment = {
            ...updatedData.call_sentiment,
            [child]: newValue
          };
        }
      } else {
        (updatedData as any)[currentField.key] = newValue;
      }

      setPendingData(updatedData);
      setEditDialogOpen(false);
      setConfirmDialogOpen(true);
    } catch (error) {
      onShowSnackbar('Invalid input format. Please check your values.', 'error');
    }
  };

  const handleConfirmSave = () => {
    if (pendingData) {
      onUpdateChartData(pendingData);
      onShowSnackbar('Data updated successfully! Changes reflected in Call Analytics.', 'success');
      setPendingData(null);
    }
    setConfirmDialogOpen(false);
  };

  const formatValue = (field: EditableField) => {
    if (field.type === 'array') {
      return `[${field.value.join(', ')}]`;
    }
    return field.value.toString();
  };

  if (!chartData) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ mb: 2, color: colors.textSecondary }}>
          No chart data available to manage
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          mb: 1,
          background: colors.gradients.secondary,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          Data Management
        </Typography>
        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3 }}>
          Customize your chart data values. Changes will be reflected in the Call Analytics section.
        </Typography>

        <Grid container spacing={3}>
          {/* User Info */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: colors.gradients.cool,
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: colors.text }}>
                Current User: {userEmail}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                All changes will be saved to your account and synchronized across sessions.
              </Typography>
            </Paper>
          </Grid>

          {/* Editable Fields */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Chart Data Values
              </Typography>
              
              <List>
                {getEditableFields().map((field) => (
                  <ListItem
                    key={field.key}
                    sx={{
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      mb: 1,
                      background: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    <ListItemText
                      primary={field.label}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {formatValue(field)}
                          </Typography>
                          <Chip 
                            size="small" 
                            label={field.type} 
                            sx={{ 
                              mt: 1,
                              background: colors.primary,
                              color: 'white',
                              fontSize: '0.7rem',
                            }} 
                          />
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleEditField(field)}
                        sx={{
                          color: colors.primary,
                          '&:hover': {
                            background: 'rgba(99, 102, 241, 0.1)',
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Save />}
                onClick={onSaveChartData}
                disabled={loading}
                sx={{
                  background: colors.gradients.success,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': { 
                    transform: 'translateY(-2px)', 
                    transition: 'all 0.2s ease',
                  },
                  '&:disabled': {
                    background: colors.textSecondary,
                  }
                }}
              >
                {loading ? 'Saving to Database...' : 'Save All Changes to Database'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Edit Dialog */}
        <Dialog 
          open={editDialogOpen} 
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ 
            background: colors.gradients.primary,
            color: 'white',
          }}>
            Edit {currentField?.label}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body2" sx={{ mb: 2, color: colors.textSecondary }}>
              {currentField?.type === 'array' 
                ? 'Enter 7 numbers separated by commas (e.g., 50, 55, 60, 65, 70, 75, 80)'
                : 'Enter a number between 0 and 100'
              }
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Value"
              fullWidth
              variant="outlined"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={currentField?.type === 'array' ? '50, 55, 60, 65, 70, 75, 80' : '75'}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setEditDialogOpen(false)}
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit}
              variant="contained"
              startIcon={<Save />}
              sx={{ 
                background: colors.gradients.primary,
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog 
          open={confirmDialogOpen} 
          onClose={() => setConfirmDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ 
            background: colors.gradients.warm,
            color: 'white',
          }}>
            Confirm Data Update
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              You are about to update your chart data. This will:
            </Typography>
            <Box component="ul" sx={{ pl: 2, color: colors.textSecondary }}>
              <li>Immediately reflect changes in the Call Analytics section</li>
              <li>Overwrite your current data values</li>
              <li>Require saving to database to persist across sessions</li>
            </Box>
            <Typography variant="body2" sx={{ mt: 2, fontWeight: 600, color: colors.warning }}>
              This action cannot be undone. Continue?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setConfirmDialogOpen(false)}
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSave}
              variant="contained"
              startIcon={<Refresh />}
              sx={{ 
                background: colors.gradients.success,
              }}
            >
              Yes, Update Data
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default DataManagement;