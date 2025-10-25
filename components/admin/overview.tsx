"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", total: 2400 },
  { name: "Fév", total: 1398 },
  { name: "Mar", total: 9800 },
  { name: "Avr", total: 3908 },
  { name: "Mai", total: 4800 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4300 },
  { name: "Aoû", total: 5200 },
  { name: "Sep", total: 4100 },
  { name: "Oct", total: 6200 },
  { name: "Nov", total: 5400 },
  { name: "Déc", total: 7200 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}€`}
        />
        <Tooltip />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
