import { motion } from 'framer-motion'
import { Users, TrendingUp, TrendingDown, UserPlus, UserMinus } from 'lucide-react'

const stats = [
  { label: 'Total Members', value: '991', change: '+5.2%', up: true, icon: Users },
  { label: 'New This Month', value: '48', change: '+12.7%', up: true, icon: UserPlus },
  { label: 'Churned This Month', value: '23', change: '-3.1%', up: false, icon: UserMinus },
  { label: 'Net Growth', value: '+25', change: '+8.4%', up: true, icon: TrendingUp },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const newData = [32, 28, 41, 36, 48, 52]
const churnData = [18, 22, 15, 20, 23, 17]

export default function AnalysisMembers() {
  const maxVal = Math.max(...newData.map((v, i) => v + churnData[i]))
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Members Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Detailed member growth and retention metrics.</p>
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
        <h2 className="text-xs font-semibold text-white mb-4">New vs Churned Members</h2>
        <div className="flex items-end gap-3 h-40">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-0.5">
                <div className="w-[40%] rounded-t-sm bg-emerald-500/60" style={{ height: `${(newData[i] / maxVal) * 130}px` }} />
                <div className="w-[40%] rounded-t-sm bg-red-500/60" style={{ height: `${(churnData[i] / maxVal) * 130}px` }} />
              </div>
              <span className="text-[9px] text-gray-500">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ydl-dark-border">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-emerald-500/60" /><span className="text-[10px] text-gray-400">New</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-red-500/60" /><span className="text-[10px] text-gray-400">Churned</span></div>
        </div>
      </motion.div>
    </div>
  )
}
