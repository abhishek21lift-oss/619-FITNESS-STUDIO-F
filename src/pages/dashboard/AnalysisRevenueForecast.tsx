import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, DollarSign, BarChart3,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentData = [185000, 210000, 178000, 245000, 232000, 198000, 0, 0, 0, 0, 0, 0]
const projectedData = [185000, 210000, 178000, 245000, 232000, 198000, 215000, 230000, 245000, 260000, 275000, 290000]
const projectionOptions = ['3 Months', '6 Months', '12 Months']

export default function AnalysisRevenueForecast() {
  const [selectedMonth, setSelectedMonth] = useState('June')
  const [projectionPeriod, setProjectionPeriod] = useState('6 Months')

  const monthIdx = months.indexOf(selectedMonth)
  const currentRevenue = currentData.slice(0, monthIdx + 1).reduce((a, b) => a + b, 0)
  const projectedRevenue = projectedData.slice(0, monthIdx + 1 + (projectionPeriod === '3 Months' ? 3 : projectionPeriod === '6 Months' ? 6 : 12)).reduce((a, b) => a + b, 0)
  const growthPct = currentRevenue > 0 ? Math.round(((projectedRevenue - currentRevenue) / currentRevenue) * 100) : 0

  const forecastMonths = months.slice(0, monthIdx + 1 + (projectionPeriod === '3 Months' ? 3 : projectionPeriod === '6 Months' ? 6 : 12)).filter((_, i) => i < monthIdx + 1 + (projectionPeriod === '3 Months' ? 3 : projectionPeriod === '6 Months' ? 6 : 12))

  const tableData = forecastMonths.map(m => {
    const mi = months.indexOf(m)
    return {
      month: m,
      current: mi <= monthIdx ? currentData[mi] : null,
      projected: projectedData[mi],
      growth: mi > monthIdx ? projectedData[mi] - (currentData[mi] || 0) : null,
    }
  })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Revenue Forecast</h1>
        <p className="text-xs text-gray-500 mt-0.5">Project future revenue based on current trends.</p>
      </div>

      <FilterBar>
        <FilterField label="Current Month">
          <FilterSelect options={months} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} />
        </FilterField>
        <FilterField label="Projection Period">
          <FilterSelect options={projectionOptions} value={projectionPeriod} onChange={e => setProjectionPeriod(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Current Revenue" value={`₹ ${currentRevenue.toLocaleString()}`} icon={DollarSign} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={0} />
        <StatsCard label="Projected Revenue" value={`₹ ${projectedRevenue.toLocaleString()}`} icon={TrendingUp} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Growth %" value={`${growthPct >= 0 ? '+' : ''}${growthPct}%`} icon={BarChart3} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text={growthPct >= 0 ? 'text-emerald-400' : 'text-red-400'} index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Current vs Projected Revenue</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastMonths.map(m => {
              const mi = months.indexOf(m)
              const isProjected = mi > monthIdx
              return {
                month: m,
                Actual: isProjected ? 0 : currentData[mi],
                Projected: projectedData[mi],
              }
            })} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(212,175,52,0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#D4AF34' }} />
              <Bar dataKey="Actual" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Projected" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ydl-dark-border">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-blue-500/60" /><span className="text-[10px] text-gray-400">Actual</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-emerald-500/60" /><span className="text-[10px] text-gray-400">Projected</span></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="text-xs font-semibold text-white mb-3">Monthly Breakdown</h2>
        <Table
          columns={[
            { header: 'Month', accessor: r => r.month },
            { header: 'Current', accessor: r => r.current !== null ? <span className="text-blue-400 font-medium">₹{r.current.toLocaleString()}</span> : <span className="text-gray-600">—</span> },
            { header: 'Projected', accessor: r => <span className="text-emerald-400 font-medium">₹{r.projected.toLocaleString()}</span> },
            { header: 'Growth', accessor: r => r.growth !== null ? (
              <span className={r.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}>₹{r.growth > 0 ? '+' : ''}{r.growth.toLocaleString()}</span>
            ) : <span className="text-gray-600">—</span> },
          ]}
          data={tableData}
          keyExtractor={r => r.month}
        />
      </motion.div>
    </div>
  )
}
