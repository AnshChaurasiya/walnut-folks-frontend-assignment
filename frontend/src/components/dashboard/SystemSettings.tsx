import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Download,
  Refresh,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { DashboardColors } from './types';

interface SystemSettingsProps {
  colors: DashboardColors;
  userEmail: string;
  loading: boolean;
  onLogout: () => void;
  onRefreshData: () => void;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({
  colors,
  userEmail,
  loading,
  onLogout,
  onRefreshData,
}) => {
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
          background: colors.gradients.nature,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          System Settings
        </Typography>
        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3 }}>
          Configure your dashboard preferences and system settings
        </Typography>

        <Grid container spacing={3}>
          {/* User Profile Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                User Profile
              </Typography>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={userEmail}
                  disabled
                  sx={{ mb: 2 }}
                />
              </Box>
              <Button
                variant="outlined"
                onClick={onLogout}
                sx={{
                  borderColor: colors.error,
                  color: colors.error,
                  '&:hover': { 
                    borderColor: colors.error,
                    background: 'rgba(239, 68, 68, 0.1)',
                  }
                }}
              >
                Logout Account
              </Button>
            </Paper>
          </Grid>

          {/* Dashboard Preferences */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 2, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Dashboard Preferences
              </Typography>
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Real-time Updates"
                  sx={{ display: 'block', mb: 2 }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email Notifications"
                  sx={{ display: 'block', mb: 2 }}
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Sound Alerts"
                  sx={{ display: 'block'}}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Data Management */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Data Management
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  sx={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    '&:hover': { 
                      borderColor: colors.primary,
                      background: 'rgba(99, 102, 241, 0.1)',
                    }
                  }}
                >
                  Export Data
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={onRefreshData}
                  disabled={loading}
                  sx={{
                    borderColor: colors.success,
                    color: colors.success,
                    '&:hover': { 
                      borderColor: colors.success,
                      background: 'rgba(16, 185, 129, 0.1)',
                    }
                  }}
                >
                  Refresh All Data
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default SystemSettings;