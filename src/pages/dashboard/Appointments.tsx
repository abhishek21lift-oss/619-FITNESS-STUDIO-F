import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react'

const appointments = [
  { id: 'APT-001', client: 'Rahul Sharma', trainer: 'Riya Singh', date: '08 Jun 2026', time: '07:00 AM', type: 'PT Session', status: 'Confirmed' },
  { id: 'APT-002', client: 'Priya Singh', trainer: 'Shivani Verma', date: '08 Jun 2026', time: '08:00 AM', type: 'Yoga', status: 'Confirmed' },
  { id: 'APT-003', client: 'Amit Verma', trainer: 'Abhishek Katiyar', date: '08 Jun 2026', time: '05:00 PM', type: 'PT Session', status: 'Pending' },
  { id: 'APT-004', client: 'Sneha Patel', trainer: 'Awash Vikash', date: '09 Jun 2026', time: '06:30 AM', type: 'Consultation', status: 'Confirmed' },
  { id: 'APT-005', client: 'Neha Gupta', trainer: 'Rajat Katiyar', date: '09 Jun 2026', time: '07:30 AM', type: 'PT Session', status: 'Cancelled' },
]

export default function Appointments() {
  const [filter, setFilter] = useState('All')
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Appointments</h1><p className="text-xs text-gray-500 mt-0.5">Schedule and manage client appointments.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">+ Book Appointment</button>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" className="bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white [color-scheme:dark]" /></div>
        <div className="flex gap-1.5">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${filter === f ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>{f}</button>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">ID</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Client</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Trainer</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Time</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {appointments.filter(a => filter === 'All' || a.status === filter).map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-gray-300">{a.id}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><User className="w-3 h-3 text-gray-500" /><span className="text-xs font-medium text-white">{a.client}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.trainer}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.date}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{a.time}</span></div></td>
                  <td className="px-4 py-3"><span className="text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-2 py-0.5 rounded-md">{a.type}</span></td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      a.status === 'Confirmed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      a.status === 'Pending' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                      {a.status === 'Confirmed' ? <CheckCircle className="w-3 h-3" /> : a.status === 'Pending' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{a.status === 'Pending' && <button className="text-[10px] font-medium text-emerald-400 hover:underline">Confirm</button>}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
