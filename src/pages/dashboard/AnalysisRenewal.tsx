import { motion } from 'framer-motion'
import { RefreshCw, TrendingUp, TrendingDown, Users, Clock } from 'lucide-react'

const stats = [
  { label: 'Renewal Rate', value: '68.4%', change: '+3.2%', up: true, icon: TrendingUp },
  { label: 'Due This Month', value: '127', change: '+8.1%', up: false, icon: Clock },
  { label: 'Renewed This Month', value: '89', change: '+5.7%', up: true, icon: RefreshCw },
  { label: 'At Risk', value: '38', change: '-2.3%', up: true, icon: Users },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const rates = [62, 64, 63, 66, 68, 71]

export default function AnalysisRenewal() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Renewal Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track member renewals and retention.</p>
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
        <h2 className="text-xs font-semibold text-white mb-4">Renewal Rate Trend (%)</h2>
        <div className="flex items-end gap-3 h-40">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-medium text-emerald-400">{rates[i]}%</span>
              <div className="w-full flex items-end justify-center">
                <div className="w-full max-w-[36px] rounded-t-md bg-gradient-to-t from-emerald-500/60 to-emerald-500/30 hover:from-emerald-500/80 hover:to-emerald-500/50 transition-all cursor-pointer" style={{ height: `${(rates[i] / Math.max(...rates)) * 120}px` }} />
              </div>
              <span className="text-[9px] text-gray-500">{m}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
