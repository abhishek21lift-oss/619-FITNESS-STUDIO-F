import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Eye, Clock } from 'lucide-react'

const ranges = ['Today', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom']

const stats = [
  { label: 'Total Visitors', value: '1,247', change: '+12.3%', up: true, icon: Users },
  { label: 'Page Views', value: '4,832', change: '+8.1%', up: true, icon: Eye },
  { label: 'Avg. Session', value: '4m 32s', change: '-2.4%', up: false, icon: Clock },
  { label: 'Bounce Rate', value: '32.1%', change: '-5.2%', up: true, icon: TrendingDown },
]

const monthlyData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const visitsData = [850, 1020, 980, 1240, 1180, 1247]

export default function AnalysisTraffic() {
  const [range, setRange] = useState('Last 30 Days')
  const maxVal = Math.max(...visitsData)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Traffic Analysis</h1>
          <p className="text-xs text-gray-500 mt-0.5">Monitor website & gym traffic.</p>
        </div>
        <div className="flex gap-1.5">
          {ranges.map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${
              range === r ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'
            }`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p>
                <p className="text-lg font-bold text-white mt-1">{s.value}</p>
              </div>
              <s.icon className="w-5 h-5 text-gray-500" />
            </div>
            <div className={`flex items-center gap-1 mt-2 ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-[10px] font-medium">{s.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Monthly Traffic Overview</h2>
        <div className="flex items-end gap-3 h-40">
          {monthlyData.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full relative flex items-end justify-center">
                <div
                  className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-ydl-yellow/40 to-ydl-yellow/20 hover:from-ydl-yellow/60 hover:to-ydl-yellow/40 transition-all cursor-pointer"
                  style={{ height: `${(visitsData[i] / maxVal) * 140}px` }}
                />
              </div>
              <span className="text-[9px] text-gray-500">{m}</span>
              <span className="text-[9px] font-medium text-gray-400">{visitsData[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
