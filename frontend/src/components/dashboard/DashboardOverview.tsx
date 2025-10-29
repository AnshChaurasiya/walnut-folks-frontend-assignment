import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
} from '@mui/material';
import {
  Payment,
  PhoneCallback,
  Group,
  Speed,
  Analytics,
  Refresh,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { DashboardColors, ChartData, Transaction } from './types';

interface DashboardOverviewProps {
  colors: DashboardColors;
  transactions: Transaction[];
  chartData: ChartData | null;
  loading: boolean;
  onNavigate: (section: string) => void;
  onRefreshData: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  colors,
  transactions,
  chartData,
  loading,
  onNavigate,
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
          background: colors.gradients.primary,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3 }}>
          Welcome to your professional voiceAI analytics hub
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ 
              background: colors.gradients.primary,
              color: 'white',
              border: 'none',
              '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {transactions.length}
                    </Typography>
                    <Typography variant="body2">Total Graphs</Typography>
                  </Box>
                  <Payment sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ 
              background: colors.gradients.success,
              color: 'white',
              border: 'none',
              '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {chartData ? chartData.daily_call_volume.reduce((a, b) => a + b, 0) : 0}
                    </Typography>
                    <Typography variant="body2">Total Calls</Typography>
                  </Box>
                  <PhoneCallback sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ 
              background: colors.gradients.warm,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
            }}
            onClick={() => onNavigate('agents')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {chartData ? chartData.agent_performance.length : 0}
                    </Typography>
                    <Typography variant="body2">Active Agents</Typography>
                  </Box>
                  <Group sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ 
              background: colors.gradients.nature,
              color: 'white',
              border: 'none',
              '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      98.5%
                    </Typography>
                    <Typography variant="body2">System Uptime</Typography>
                  </Box>
                  <Speed sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Paper sx={{ 
          mt: 4,
          p: 3, 
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.border}`,
        }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Analytics />}
              onClick={() => onNavigate('analytics')}
              sx={{
                background: colors.gradients.primary,
                '&:hover': { transform: 'translateY(-2px)', transition: 'all 0.2s ease' }
              }}
            >
              View Analytics
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={onRefreshData}
              disabled={loading}
              sx={{
                borderColor: colors.primary,
                color: colors.primary,
                '&:hover': { 
                  borderColor: colors.primary,
                  background: 'rgba(99, 102, 241, 0.1)',
                  transform: 'translateY(-2px)', 
                  transition: 'all 0.2s ease' 
                }
              }}
            >
              Refresh Data
            </Button>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default DashboardOverview;