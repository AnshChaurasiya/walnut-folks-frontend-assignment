import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { Refresh } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { DashboardColors, ChartData } from './types';

interface CallAnalyticsProps {
  colors: DashboardColors;
  chartData: ChartData | null;
  loading: boolean;
  onSaveChartData: () => void;
}

const CallAnalytics: React.FC<CallAnalyticsProps> = ({
  colors,
  chartData,
  loading,
  onSaveChartData,
}) => {
  if (!chartData) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Loading analytics data...</Typography>
        <LinearProgress sx={{ maxWidth: 400, mx: 'auto' }} />
      </Box>
    );
  }

  const dailyVolumeData = chartData.daily_call_volume.map((volume, index) => ({
    day: `Day ${index + 1}`,
    volume,
    duration: chartData.average_call_duration[index],
    conversion: chartData.conversion_rate[index],
  }));

  const sentimentData = [
    { name: 'Positive', value: chartData.call_sentiment.positive, color: colors.success },
    { name: 'Neutral', value: chartData.call_sentiment.neutral, color: colors.warning },
    { name: 'Negative', value: chartData.call_sentiment.negative, color: colors.error },
  ];

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
          Call Analytics Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3 }}>
          Comprehensive insights into voice agent performance and call metrics
        </Typography>

        <Grid container spacing={3}>
          {/* Daily Call Volume */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Daily Call Volume & Duration
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyVolumeData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="day" stroke={colors.textSecondary} />
                  <YAxis stroke={colors.textSecondary} />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke={colors.primary}
                    fillOpacity={1}
                    fill="url(#colorVolume)"
                    name="Call Volume"
                  />
                  <Area
                    type="monotone"
                    dataKey="duration"
                    stroke={colors.secondary}
                    fillOpacity={1}
                    fill="url(#colorDuration)"
                    name="Avg Duration (min)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Call Sentiment */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Call Sentiment Analysis
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Agent Performance */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Agent Performance Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={chartData.agent_performance}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="name" stroke={colors.textSecondary} />
                  <YAxis stroke={colors.textSecondary} />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="calls" fill={colors.primary} name="Total Calls" />
                  <Bar dataKey="rating" fill={colors.success} name="Rating" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Save Data Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Refresh />}
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
                    background: colors.gradients.success,
                  },
                  '&:disabled': {
                    background: colors.textSecondary,
                  }
                }}
              >
                {loading ? 'Saving...' : 'Save Chart Data'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default CallAnalytics;