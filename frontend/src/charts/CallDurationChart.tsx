import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface CallDurationChartProps {
  data: number[]
}

const CallDurationChart: React.FC<CallDurationChartProps> = ({ data }) => {
  const chartData = data.map((value, index) => ({
    day: `Day ${index + 1}`,
    duration: value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip />
        <Line type="monotone" dataKey="duration" stroke="#f59e0b" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CallDurationChart