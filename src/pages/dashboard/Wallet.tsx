import { motion } from 'framer-motion'
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownRight, Clock, CheckCircle } from 'lucide-react'

const stats = [
  { label: 'Total Balance', value: '₹ 12,84,500', icon: WalletIcon, color: 'text-ydl-yellow' },
  { label: 'Credits This Month', value: '₹ 2,41,800', icon: ArrowUpRight, color: 'text-emerald-400' },
  { label: 'Debits This Month', value: '₹ 78,500', icon: ArrowDownRight, color: 'text-red-400' },
  { label: 'Pending Transactions', value: '₹ 3,12,000', icon: Clock, color: 'text-amber-400' },
]

const transactions = [
  { id: 'TXN-001', description: 'Membership - Rahul Sharma', amount: '+₹7,999', type: 'Credit', status: 'Completed', date: '07 Jun 2026' },
  { id: 'TXN-002', description: 'PT Session - Priya Singh', amount: '+₹1,500', type: 'Credit', status: 'Completed', date: '07 Jun 2026' },
  { id: 'TXN-003', description: 'Electricity Bill Payment', amount: '-₹12,000', type: 'Debit', status: 'Completed', date: '06 Jun 2026' },
  { id: 'TXN-004', description: 'Staff Salary - Awash Vikash', amount: '-₹45,000', type: 'Debit', status: 'Pending', date: '05 Jun 2026' },
]

export default function Wallet() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Wallet</h1><p className="text-xs text-gray-500 mt-0.5">Financial overview and transactions.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Funds</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p><p className={`text-lg font-bold mt-1 ${s.color}`}>{s.value}</p></div>
              <s.icon className={`w-5 h-5 ${s.color} opacity-50`} />
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="px-4 py-3 border-b border-ydl-dark-border"><h2 className="text-xs font-semibold text-white">Recent Transactions</h2></div>
        <div className="divide-y divide-ydl-dark-border/50">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${t.type === 'Credit' ? 'bg-emerald-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                  {t.type === 'Credit' ? <ArrowUpRight className="w-4 h-4 text-emerald-400" /> : <ArrowDownRight className="w-4 h-4 text-red-400" />}
                </div>
                <div><p className="text-xs font-medium text-white">{t.description}</p><div className="flex items-center gap-2 mt-0.5"><span className="text-[9px] text-gray-600">{t.id}</span><span className="text-[9px] text-gray-600">{t.date}</span></div></div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-semibold ${t.type === 'Credit' ? 'text-emerald-400' : 'text-red-400'}`}>{t.amount}</p>
                <span className={`inline-flex items-center gap-1 text-[9px] font-medium ${t.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {t.status === 'Completed' ? <CheckCircle className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
