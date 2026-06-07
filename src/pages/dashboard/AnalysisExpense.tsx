import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Home, Zap, Wifi } from 'lucide-react'

const stats = [
  { label: 'Total Expenses', value: '₹ 4,82,000', change: '+6.2%', up: false, icon: DollarSign },
  { label: 'This Month', value: '₹ 78,500', change: '+3.1%', up: false, icon: CreditCard },
  { label: 'Avg Monthly', value: '₹ 72,800', change: '+2.4%', up: false, icon: TrendingUp },
  { label: 'vs Revenue', value: '37.5%', change: '-1.2%', up: true, icon: TrendingDown },
]

const categories = [
  { name: 'Rent', amount: '₹ 2,40,000', pct: 50, icon: Home },
  { name: 'Utilities', amount: '₹ 48,000', pct: 10, icon: Zap },
  { name: 'Staff Salary', amount: '₹ 1,20,000', pct: 25, icon: CreditCard },
  { name: 'Equipment', amount: '₹ 36,000', pct: 7.5, icon: DollarSign },
  { name: 'Marketing', amount: '₹ 24,000', pct: 5, icon: TrendingUp },
  { name: 'Other', amount: '₹ 14,000', pct: 2.5, icon: Wifi },
]

export default function AnalysisExpense() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Expense Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track and categorize business expenses.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p><p className="text-lg font-bold text-red-400 mt-1">{s.value}</p></div>
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
        <h2 className="text-xs font-semibold text-white mb-4">Expense Breakdown</h2>
        <div className="space-y-3">
          {categories.map(c => (
            <div key={c.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <c.icon className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-300">{c.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500">{c.amount}</span>
                  <span className="text-[10px] font-medium text-gray-400">{c.pct}%</span>
                </div>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-500/30" style={{ width: `${c.pct * 2}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
