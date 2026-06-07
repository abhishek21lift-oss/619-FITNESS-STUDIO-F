import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Target } from 'lucide-react'

const stats = [
  { label: 'Current ARR', value: '₹ 1,04,72,000', change: '+12.4%', icon: DollarSign },
  { label: 'Forecasted ARR', value: '₹ 1,18,50,000', change: '+13.2%', icon: TrendingUp },
  { label: 'Monthly Target', value: '₹ 9,87,500', change: 'On Track', icon: Target },
]

const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const actual = [241800, 256000, null, null, null, null]
const forecast = [null, null, 268000, 282000, 295000, 310000]

export default function AnalysisRevenueForecast() {
  const allVals = [...actual.filter(Boolean), ...forecast.filter(Boolean)] as number[]
  const maxVal = Math.max(...allVals, 1)
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Revenue Forecast</h1>
        <p className="text-xs text-gray-500 mt-0.5">Projected revenue for upcoming months.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p><p className="text-lg font-bold text-ydl-yellow mt-1">{s.value}</p></div>
              <s.icon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-[10px] font-medium text-emerald-400">↑ {s.change}</span>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Forecast (Actual + Projected)</h2>
        <div className="flex items-end gap-3 h-40">
          {months.map((m, i) => {
            const actualVal = actual[i]
            const forecastVal = forecast[i]
            const displayVal = actualVal ?? forecastVal!
            return (
              <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[9px] font-medium text-ydl-yellow">₹{(displayVal/1000).toFixed(0)}k</span>
                <div className="w-full flex items-end justify-center gap-0.5">
                  {actualVal != null && (
                    <div className="w-[60%] rounded-t-md bg-gradient-to-t from-ydl-yellow/60 to-ydl-yellow/30" style={{ height: `${(actualVal / maxVal) * 120}px` }} />
                  )}
                  {forecastVal != null && (
                    <div className="w-[60%] rounded-t-md bg-gradient-to-t from-emerald-500/60 to-emerald-500/30 opacity-60" style={{ height: `${(forecastVal / maxVal) * 120}px` }} />
                  )}
                </div>
                <span className="text-[9px] text-gray-500">{m}</span>
                {actualVal != null && <span className="text-[8px] text-gray-600">Actual</span>}
                {forecastVal != null && <span className="text-[8px] text-emerald-500/60">Forecast</span>}
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
