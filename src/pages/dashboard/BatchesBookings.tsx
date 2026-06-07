import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'

const bookings = [
  { id: 'BK-001', member: 'Rahul Sharma', batch: 'Morning HIIT', date: '07 Jun 2026', time: '06:00', status: 'Confirmed' },
  { id: 'BK-002', member: 'Priya Singh', batch: 'Yoga Flow', date: '07 Jun 2026', time: '07:30', status: 'Confirmed' },
  { id: 'BK-003', member: 'Amit Verma', batch: 'Morning HIIT', date: '07 Jun 2026', time: '06:00', status: 'Cancelled' },
  { id: 'BK-004', member: 'Sneha Patel', batch: 'Zumba Dance', date: '07 Jun 2026', time: '08:00', status: 'Confirmed' },
  { id: 'BK-005', member: 'Neha Gupta', batch: 'Evening Strength', date: '07 Jun 2026', time: '17:00', status: 'Waitlist' },
]

export default function BatchesBookings() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Class Bookings</h1>
        <p className="text-xs text-gray-500 mt-0.5">View and manage batch reservations.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" className="bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" /></div>
        <select className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          <option>All Batches</option><option>Morning HIIT</option><option>Yoga Flow</option><option>Evening Strength</option>
        </select>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">ID</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Batch</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Time</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th><th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {bookings.map((b, i) => (
                <motion.tr key={b.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-gray-300">{b.id}</td>
                  <td className="px-4 py-3 text-xs font-medium text-white">{b.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.batch}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.time}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      b.status === 'Confirmed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      b.status === 'Cancelled' ? 'text-red-400 bg-red-500/10 border border-red-500/20' :
                      'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    }`}>
                      {b.status === 'Confirmed' ? <CheckCircle className="w-3 h-3" /> : b.status === 'Cancelled' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right"><button className="text-[10px] font-medium text-ydl-yellow hover:underline">Manage</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
