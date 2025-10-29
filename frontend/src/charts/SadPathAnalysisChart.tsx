import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Box, Typography } from '@mui/material'

interface SadPathAnalysisChartProps {
  data?: any[]
}

const SadPathAnalysisChart: React.FC<SadPathAnalysisChartProps> = ({ data }) => {
  // Sample data for sad path analysis
  const sadPathData = [
    { name: 'User refused to confirm identity', value: 35, color: '#3b82f6' },
    { name: 'Caller Identification', value: 20, color: '#1e40af' },
    { name: 'Incorrect caller identity', value: 15, color: '#60a5fa' },
    { name: 'Assistant did not speak French', value: 12, color: '#93c5fd' },
    { name: 'Unsupported Language', value: 10, color: '#dbeafe' },
    { name: 'Customer Unhappy', value: 5, color: '#a7f3d0' },
    { name: 'Wrong Approach', value: 3, color: '#6ee7b7' },
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (percent < 0.05) return null // Don't show labels for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sadPathData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {sadPathData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value}%`, 'Percentage']}
          />
          <Legend 
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{
              paddingLeft: '20px',
              fontSize: '12px',
              color: '#64748b'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center label */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
          Total Issues
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#3b82f6' }}>
          {sadPathData.reduce((sum, item) => sum + item.value, 0)}
        </Typography>
      </Box>
    </Box>
  )
}

export default SadPathAnalysisChart