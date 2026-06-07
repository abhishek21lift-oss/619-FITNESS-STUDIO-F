import { motion } from 'framer-motion'
import { Phone, TrendingUp, TrendingDown, CheckCircle, Clock, XCircle } from 'lucide-react'

const stats = [
  { label: 'Total Follow-ups', value: '1,847', change: '+8.4%', up: true, icon: Phone },
  { label: 'Completed', value: '1,214', change: '+12.1%', up: true, icon: CheckCircle },
  { label: 'Pending', value: '482', change: '-3.2%', up: true, icon: Clock },
  { label: 'Missed', value: '151', change: '+2.1%', up: false, icon: XCircle },
]

const staffEffectiveness = [
  { name: 'Riya Singh', total: 342, completed: 298, rate: '87%' },
  { name: 'Awash Vikash', total: 298, completed: 245, rate: '82%' },
  { name: 'Abhishek Katiyar', total: 267, completed: 201, rate: '75%' },
  { name: 'Rajat Katiyar', total: 234, completed: 178, rate: '76%' },
  { name: 'Shivani Verma', total: 189, completed: 156, rate: '83%' },
]

export default function AnalysisFollowup() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Follow-up Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Staff follow-up performance metrics.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p><p className="text-lg font-bold text-white mt-1">{s.value}</p></div>
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
        <h2 className="text-xs font-semibold text-white mb-4">Staff Follow-up Effectiveness</h2>
        <div className="space-y-3">
          {staffEffectiveness.map(s => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">{s.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500">{s.completed}/{s.total}</span>
                  <span className="text-[10px] font-medium text-ydl-yellow">{s.rate}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-ydl-yellow/60 to-ydl-yellow/40" style={{ width: s.rate }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
