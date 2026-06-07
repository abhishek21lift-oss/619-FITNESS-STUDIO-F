import { motion } from 'framer-motion'
import { FileText, TrendingUp, TrendingDown, CreditCard, Receipt, DollarSign } from 'lucide-react'

const stats = [
  { label: 'Total Bills', value: '3,842', change: '+7.4%', up: true, icon: FileText },
  { label: 'Paid Bills', value: '3,421', change: '+8.1%', up: true, icon: Receipt },
  { label: 'Pending Bills', value: '421', change: '-2.3%', up: true, icon: CreditCard },
  { label: 'Avg Bill Value', value: '₹ 1,850', change: '+3.2%', up: true, icon: DollarSign },
]

const paymentModes = [
  { mode: 'Cash', count: 1642, amount: '₹ 28,42,000', pct: 43 },
  { mode: 'UPI', count: 1120, amount: '₹ 19,36,000', pct: 29 },
  { mode: 'Card', count: 485, amount: '₹ 8,92,000', pct: 13 },
  { mode: 'Bank Transfer', count: 312, amount: '₹ 5,76,000', pct: 9 },
  { mode: 'Other', count: 234, amount: '₹ 4,32,000', pct: 6 },
]

export default function AnalysisBilling() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Billing Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Payment and billing metrics.</p>
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
        <h2 className="text-xs font-semibold text-white mb-4">Payment Mode Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border"><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Mode</th><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Count</th><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Amount</th><th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Share</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {paymentModes.map(p => (
                <tr key={p.mode} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-2.5 text-xs text-gray-300">{p.mode}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-400">{p.count}</td>
                  <td className="px-3 py-2.5 text-xs text-ydl-yellow">{p.amount}</td>
                  <td className="px-3 py-2.5"><div className="w-full max-w-[120px] h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full bg-ydl-yellow/60" style={{ width: `${p.pct * 2}%` }} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
