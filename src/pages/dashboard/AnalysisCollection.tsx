import { motion } from 'framer-motion'
import { DollarSign, CreditCard, Wallet, ArrowUpRight } from 'lucide-react'

const stats = [
  { label: 'Total Collection', value: '₹ 12,84,500', change: '+18.3%', icon: DollarSign },
  { label: 'This Month', value: '₹ 2,41,800', change: '+12.1%', icon: Wallet },
  { label: 'Avg per Member', value: '₹ 1,296', change: '+6.7%', icon: CreditCard },
  { label: 'Outstanding', value: '₹ 3,12,000', change: '-8.2%', icon: ArrowUpRight },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [180000, 210000, 195000, 228000, 241800, 256000]

export default function AnalysisCollection() {
  const maxVal = Math.max(...revenue)
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Collection Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Revenue collection insights.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
        <h2 className="text-xs font-semibold text-white mb-4">Revenue Trend (₹)</h2>
        <div className="flex items-end gap-3 h-40">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-medium text-ydl-yellow">₹{(revenue[i]/1000).toFixed(0)}k</span>
              <div className="w-full flex items-end justify-center">
                <div className="w-full max-w-[36px] rounded-t-md bg-gradient-to-t from-ydl-yellow/50 to-ydl-yellow/20 hover:from-ydl-yellow/70 hover:to-ydl-yellow/40 transition-all cursor-pointer" style={{ height: `${(revenue[i] / maxVal) * 120}px` }} />
              </div>
              <span className="text-[9px] text-gray-500">{m}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
