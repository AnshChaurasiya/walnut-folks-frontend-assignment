import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Refresh,
  Assessment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { DashboardColors, ChartData } from './types';

interface AgentManagementProps {
  colors: DashboardColors;
  chartData: ChartData | null;
  onNavigate: (section: string) => void;
  onShowSnackbar: (message: string, severity: 'success' | 'error') => void;
}

const AgentManagement: React.FC<AgentManagementProps> = ({
  colors,
  chartData,
  onNavigate,
  onShowSnackbar,
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
          Agent Management
        </Typography>
        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3 }}>
          Monitor and manage your voice agents, view performance metrics, and control agent settings
        </Typography>

        <Grid container spacing={3}>
          {/* Agent Status Overview */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: colors.text }}>
                Agent Status Overview
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                  <Card sx={{ 
                    p: 2, 
                    background: colors.gradients.success,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {chartData ? chartData.agent_performance.filter(a => a.rating >= 4.0).length : 0}
                    </Typography>
                    <Typography variant="body2">Active Agents</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ 
                    p: 2, 
                    background: colors.gradients.warm,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {chartData ? chartData.agent_performance.filter(a => a.rating < 4.0 && a.rating >= 3.0).length : 0}
                    </Typography>
                    <Typography variant="body2">Need Training</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ 
                    p: 2, 
                    background: colors.gradients.primary,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {chartData ? Math.round(chartData.agent_performance.reduce((sum, a) => sum + a.rating, 0) / chartData.agent_performance.length * 10) / 10 : 0}
                    </Typography>
                    <Typography variant="body2">Avg Rating</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ 
                    p: 2, 
                    background: colors.gradients.nature,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {chartData ? chartData.agent_performance.reduce((sum, a) => sum + a.calls, 0) : 0}
                    </Typography>
                    <Typography variant="body2">Total Calls</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Individual Agent Cards */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: colors.text }}>
                Agent Performance Dashboard
              </Typography>
              
              {chartData && (
                <Grid container spacing={3}>
                  {chartData.agent_performance.map((agent) => (
                    <Grid item xs={12} md={6} lg={4} key={agent.name}>
                      <Card sx={{ 
                        p: 3, 
                        background: colors.gradients.cool,
                        border: `1px solid ${colors.border}`,
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': { 
                          transform: 'translateY(-4px)', 
                          transition: 'all 0.3s ease',
                          boxShadow: 3,
                        }
                      }}>
                        {/* Agent Avatar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ 
                            width: 50, 
                            height: 50, 
                            background: agent.rating >= 4.0 ? colors.gradients.success : 
                                       agent.rating >= 3.0 ? colors.gradients.warm : colors.gradients.warm,
                            mr: 2,
                            fontSize: '1.2rem',
                            fontWeight: 600,
                          }}>
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.text }}>
                              {agent.name}
                            </Typography>
                            <Chip 
                              label={agent.rating >= 4.0 ? 'Excellent' : 
                                     agent.rating >= 3.0 ? 'Good' : 'Needs Training'}
                              size="small"
                              sx={{ 
                                background: agent.rating >= 4.0 ? colors.success : 
                                           agent.rating >= 3.0 ? colors.warning : colors.error,
                                color: 'white',
                                fontSize: '0.7rem',
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Performance Metrics */}
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                              Calls Handled
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text }}>
                              {agent.calls}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                              Performance Rating
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text }}>
                              {agent.rating}/5.0 ⭐
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                              Success Rate
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text }}>
                              {Math.round(agent.rating * 20)}%
                            </Typography>
                          </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => onShowSnackbar(`Viewing ${agent.name}'s detailed analytics`, 'success')}
                            sx={{
                              flex: 1,
                              borderColor: colors.primary,
                              color: colors.primary,
                              '&:hover': { 
                                borderColor: colors.primary,
                                background: 'rgba(99, 102, 241, 0.1)',
                              }
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => onShowSnackbar(`Training session scheduled for ${agent.name}`, 'success')}
                            sx={{
                              flex: 1,
                              background: colors.gradients.secondary,
                              '&:hover': { 
                                transform: 'scale(1.02)',
                                transition: 'all 0.2s ease' 
                              }
                            }}
                          >
                            {agent.rating < 4.0 ? 'Train' : 'Optimize'}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>

          {/* Agent Controls */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: colors.text }}>
                Quick Actions
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => onShowSnackbar('Agent deployment initiated', 'success')}
                  sx={{
                    background: colors.gradients.success,
                    '&:hover': { transform: 'translateY(-2px)', transition: 'all 0.2s ease' }
                  }}
                >
                  Deploy New Agent
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => onShowSnackbar('Agent training session started', 'success')}
                  sx={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    '&:hover': { 
                      borderColor: colors.primary,
                      background: 'rgba(99, 102, 241, 0.1)',
                    }
                  }}
                >
                  Start Training Session
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Assessment />}
                  onClick={() => onNavigate('analytics')}
                  sx={{
                    borderColor: colors.secondary,
                    color: colors.secondary,
                    '&:hover': { 
                      borderColor: colors.secondary,
                      background: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  View Full Analytics
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* System Health */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: colors.text }}>
                System Health
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    Server Uptime
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: colors.success }}>
                    99.8%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={99.8} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: colors.gradients.success,
                    }
                  }} 
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    Response Time
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: colors.success }}>
                    120ms
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: colors.gradients.primary,
                    }
                  }} 
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    Memory Usage
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: colors.warning }}>
                    68%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={68} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: colors.gradients.warm,
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default AgentManagement;