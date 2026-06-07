import { motion } from 'framer-motion'
import { DollarSign, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react'

const entries = [
  { date: '07 Jun 2026', description: 'Membership - Rahul Sharma', type: 'Credit', amount: '+₹7,999', category: 'Membership' },
  { date: '07 Jun 2026', description: 'PT Session - Priya Singh', type: 'Credit', amount: '+₹1,500', category: 'PT' },
  { date: '06 Jun 2026', description: 'Electricity Bill', type: 'Debit', amount: '-₹12,000', category: 'Utility' },
  { date: '06 Jun 2026', description: 'Membership - Sneha Patel', type: 'Credit', amount: '+₹14,999', category: 'Membership' },
  { date: '05 Jun 2026', description: 'Staff Salary', type: 'Debit', amount: '-₹45,000', category: 'Payroll' },
  { date: '05 Jun 2026', description: 'Equipment Purchase', type: 'Debit', amount: '-₹18,000', category: 'Asset' },
]

export default function AccountsRegisters() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Account Registers</h1><p className="text-xs text-gray-500 mt-0.5">General ledger and accounting entries.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /><span className="text-[10px] font-semibold text-emerald-400">Balance: ₹2,41,800</span></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search entries..." /></div>
        <select className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white"><option>All Categories</option><option>Membership</option><option>PT</option><option>Utility</option><option>Payroll</option></select>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Description</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Category</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {entries.map((e, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{e.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{e.description}</td>
                  <td className="px-4 py-3">{e.type === 'Credit' ? <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400"><ArrowUpRight className="w-3 h-3" />Credit</span> : <span className="flex items-center gap-1 text-[10px] font-medium text-red-400"><ArrowDownRight className="w-3 h-3" />Debit</span>}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.category}</td>
                  <td className={`px-4 py-3 text-right text-xs font-semibold ${e.type === 'Credit' ? 'text-emerald-400' : 'text-red-400'}`}>{e.amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
