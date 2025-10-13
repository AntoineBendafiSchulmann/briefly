'use client'

import { useState, useEffect } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie } from 'recharts'
import { Chart } from '@/components/ui/chart'

export default function StatistiquesPage() {
  const [stats, setStats] = useState({ reformulations: 0, timeSaved: 0 })

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    }

    fetchStats()
  }, [])

  const chartDataBar = [
    { label: 'Janvier', reformulations: 12, timeSaved: 30 },
    { label: 'Février', reformulations: 19, timeSaved: 45 },
    { label: 'Mars', reformulations: 3, timeSaved: 10 },
    { label: 'Avril', reformulations: 5, timeSaved: 15 },
    { label: 'Mai', reformulations: 2, timeSaved: 5 },
  ]

  const chartDataPie = [
    { label: 'Reformulations', value: stats.reformulations },
    { label: 'Temps économisé', value: stats.timeSaved },
  ]

  return (
    <div className="flex flex-col h-full p-8 text-foreground dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Statistiques</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold">Nombre de reformulations</h2>
          <p className="text-2xl font-bold">{stats.reformulations}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold">Temps économisé</h2>
          <p className="text-2xl font-bold">{stats.timeSaved} minutes</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Répartition mensuelle</h2>
          <Chart
            id="bar-chart"
            config={{
              reformulations: { label: 'Reformulations', color: '#4F46E5' },
              timeSaved: { label: 'Temps économisé (minutes)', color: '#10B981' },
            }}
          >
            <BarChart data={chartDataBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reformulations" fill="#4F46E5" />
              <Bar dataKey="timeSaved" fill="#10B981" />
            </BarChart>
          </Chart>
        </div>

        {/* Pie Chart */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Répartition globale</h2>
          {chartDataPie.some((data) => data.value > 0) ? (
            <Chart
              id="pie-chart"
              config={{
                reformulations: { label: 'Reformulations', color: '#4F46E5' },
                timeSaved: { label: 'Temps économisé (minutes)', color: '#10B981' },
              }}
            >
              <PieChart>
                <Tooltip />
                <Pie
                  data={chartDataPie}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#4F46E5"
                  label
                />
              </PieChart>
            </Chart>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Aucune donnée disponible</p>
          )}
        </div>
      </div>
    </div>
  )
}