import { motion } from 'framer-motion'
import { CreditCard, Layers, CheckCircle, XCircle } from 'lucide-react'

const stats = [
  { label: 'Active Subscriptions', value: '627', change: '+4.2%', icon: CheckCircle },
  { label: 'Expired', value: '364', change: '+2.1%', icon: XCircle },
  { label: 'Monthly Plans', value: '412', change: '+6.8%', icon: Layers },
  { label: 'Annual Plans', value: '215', change: '+3.5%', icon: CreditCard },
]

const plans = [
  { name: 'Monthly Basic', active: 245, price: '₹999' },
  { name: 'Quarterly Pro', active: 167, price: '₹2,499' },
  { name: 'Annual Gold', active: 138, price: '₹7,999' },
  { name: 'Annual Platinum', active: 77, price: '₹14,999' },
]

export default function AnalysisSubscriptions() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Subscriptions Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Breakdown of all subscription plans.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p><p className="text-lg font-bold text-white mt-1">{s.value}</p></div>
              <s.icon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-[10px] font-medium text-emerald-400">↑ {s.change}</span>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Plan Distribution</h2>
        <div className="space-y-3">
          {plans.map(p => {
            const pct = Math.round((p.active / 627) * 100)
            return (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300">{p.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{p.active} members</span>
                    <span className="text-[10px] font-medium text-ydl-yellow">{p.price}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-ydl-yellow/60 to-ydl-yellow/40" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
