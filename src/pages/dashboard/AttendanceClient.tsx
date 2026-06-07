import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users2, Calendar, Search, Clock, CheckCircle } from 'lucide-react'

const checkins = [
  { name: 'Rahul Sharma', date: '07 Jun 2026', time: '06:15 AM', plan: 'Annual Gold', checkins: 142 },
  { name: 'Priya Singh', date: '07 Jun 2026', time: '07:00 AM', plan: 'Monthly Basic', checkins: 38 },
  { name: 'Sneha Patel', date: '07 Jun 2026', time: '07:30 AM', plan: 'Annual Platinum', checkins: 189 },
  { name: 'Neha Gupta', date: '07 Jun 2026', time: '08:00 AM', plan: 'Annual Gold', checkins: 156 },
  { name: 'Arun Kumar', date: '07 Jun 2026', time: '05:45 AM', plan: 'Quarterly Pro', checkins: 87 },
]

export default function AttendanceClient() {
  const [search, setSearch] = useState('')
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Client Attendance</h1><p className="text-xs text-gray-500 mt-0.5">Member check-in tracking.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] text-gray-500">Today</p><p className="text-lg font-bold text-white mt-1">42</p></div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] text-gray-500">This Week</p><p className="text-lg font-bold text-white mt-1">287</p></div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] text-gray-500">This Month</p><p className="text-lg font-bold text-white mt-1">1,234</p></div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] text-gray-500">Avg Daily</p><p className="text-lg font-bold text-ydl-yellow mt-1">48</p></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search member..." /></div>
        <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" className="bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white [color-scheme:dark]" /></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Time</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Total Check-ins</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {checkins.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Users2 className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs font-medium text-white">{c.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.date}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{c.time}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.plan}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-400" /><span className="text-xs font-medium text-emerald-400">{c.checkins}</span></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
