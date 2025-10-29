import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ConversionRateChartProps {
  data: number[]
}

const ConversionRateChart: React.FC<ConversionRateChartProps> = ({ data }) => {
  const chartData = data.map((value, index) => ({
    day: `Day ${index + 1}`,
    rate: value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip />
        <Area type="monotone" dataKey="rate" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ConversionRateChart