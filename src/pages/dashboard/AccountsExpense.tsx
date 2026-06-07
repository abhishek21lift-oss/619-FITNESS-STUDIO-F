import { motion } from 'framer-motion'
import { Plus, Search, Edit3, Trash2 } from 'lucide-react'

const expenses = [
  { date: '07 Jun 2026', category: 'Utilities', description: 'Electricity Bill - June', amount: '₹12,000', payment: 'UPI', status: 'Paid' },
  { date: '06 Jun 2026', category: 'Rent', description: 'Office Rent - June', amount: '₹40,000', payment: 'Bank Transfer', status: 'Paid' },
  { date: '05 Jun 2026', category: 'Equipment', description: 'Dumbbell Set (10kg x 4)', amount: '₹8,500', payment: 'Cash', status: 'Paid' },
  { date: '04 Jun 2026', category: 'Marketing', description: 'Instagram Ads - May', amount: '₹5,000', payment: 'Card', status: 'Pending' },
  { date: '03 Jun 2026', category: 'Supplies', description: 'Cleaning Supplies', amount: '₹2,400', payment: 'Cash', status: 'Paid' },
]

export default function AccountsExpense() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Expense Tracking</h1><p className="text-xs text-gray-500 mt-0.5">Log and manage all business expenses.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Expense</button>
      </div>
      <div className="flex items-center gap-3"><div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search expenses..." /></div>
      <select className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white"><option>All Categories</option><option>Utilities</option><option>Rent</option><option>Equipment</option><option>Marketing</option><option>Supplies</option></select></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Category</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Description</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Payment</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {expenses.map((e, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{e.date}</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-medium text-gray-300 bg-white/5 px-2 py-0.5 rounded-md">{e.category}</span></td>
                  <td className="px-4 py-3 text-xs text-white">{e.description}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.payment}</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-red-400">{e.amount}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${e.status === 'Paid' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'}`}>{e.status}</span></td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1"><button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button><button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
