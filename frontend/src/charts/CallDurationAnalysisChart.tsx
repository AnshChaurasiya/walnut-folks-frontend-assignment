import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Box } from '@mui/material'

interface CallDurationAnalysisChartProps {
  data: number[]
}

const CallDurationAnalysisChart: React.FC<CallDurationAnalysisChartProps> = ({ data }) => {
  // Transform data for smooth area chart
  const chartData = data.map((value, index) => ({
    time: `${index * 2}:00`, // Every 2 hours
    duration: value,
    smoothDuration: value + Math.sin(index) * 10, // Add some smoothness
  }))

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="time" 
            stroke="#64748b"
            fontSize={12}
            tick={{ fill: '#64748b' }}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tick={{ fill: '#64748b' }}
          />
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#1e293b' }}
          />
          <Area
            type="monotone"
            dataKey="smoothDuration"
            stroke="#60a5fa"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#durationGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default CallDurationAnalysisChart