import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Search, Eye, Edit3 } from 'lucide-react'

const subs = [
  { id: 'SUB-001', member: 'Rahul Sharma', plan: 'Annual Gold', start: '01 Jan 2026', expiry: '31 Dec 2026', status: 'Active', amount: '₹7,999' },
  { id: 'SUB-002', member: 'Priya Singh', plan: 'Monthly Basic', start: '15 Jun 2026', expiry: '14 Jul 2026', status: 'Active', amount: '₹999' },
  { id: 'SUB-003', member: 'Amit Verma', plan: 'Quarterly Pro', start: '01 Mar 2026', expiry: '31 May 2026', status: 'Expired', amount: '₹2,499' },
  { id: 'SUB-004', member: 'Sneha Patel', plan: 'Annual Platinum', start: '20 Nov 2025', expiry: '19 Nov 2026', status: 'Active', amount: '₹14,999' },
  { id: 'SUB-005', member: 'Neha Gupta', plan: 'Annual Gold', start: '10 Sep 2025', expiry: '09 Sep 2026', status: 'Active', amount: '₹7,999' },
]

export default function MembershipSubscriptions() {
  const [search, setSearch] = useState('')
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Subscriptions</h1><p className="text-xs text-gray-500 mt-0.5">All active and expired subscriptions.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-ydl-dark-border">
          <Layers className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-[10px] font-semibold text-gray-300">627 Active</span>
        </div>
      </div>
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search member..." />
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">ID</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Start</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Expiry</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {subs.filter(s => !search || s.member.toLowerCase().includes(search.toLowerCase())).map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-gray-300">{s.id}</td>
                  <td className="px-4 py-3 text-xs font-medium text-white">{s.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.plan}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.start}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.expiry}</td>
                  <td className="px-4 py-3 text-xs text-ydl-yellow">{s.amount}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${s.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>{s.status}</span></td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1"><button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg"><Eye className="w-3.5 h-3.5" /></button><button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
