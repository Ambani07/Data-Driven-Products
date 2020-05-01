import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

function Chart({ data }) {
  return (
    <div>
      <LineChart
        width={1000}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="answer" />
        <YAxis />
        <Tooltip />
        <Line
          connectNulls
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>
    </div>
  )
}

export default Chart
