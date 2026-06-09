import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Calendar } from 'lucide-react'

interface Booking {
  id: number
  memberName: string
  className: string
  time: string
  date: string
  status: 'Confirmed' | 'Cancelled'
  paymentStatus: 'Paid' | 'Pending' | 'Refunded'
}

const initialBookings: Booking[] = [
  { id: 1, memberName: 'Rahul Sharma', className: 'Morning Yoga', time: '06:00 AM', date: '2026-06-08', status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 2, memberName: 'Priya Singh', className: 'Morning Yoga', time: '06:00 AM', date: '2026-06-08', status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 3, memberName: 'Amit Verma', className: 'Cardio Blast', time: '08:00 AM', date: '2026-06-08', status: 'Cancelled', paymentStatus: 'Refunded' },
  { id: 4, memberName: 'Sneha Gupta', className: 'HIIT Training', time: '09:00 AM', date: '2026-06-08', status: 'Confirmed', paymentStatus: 'Pending' },
  { id: 5, memberName: 'Vikram Patel', className: 'Zumba', time: '10:00 AM', date: '2026-06-08', status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 6, memberName: 'Neha Kapoor', className: 'Strength & Conditioning', time: '05:00 PM', date: '2026-06-08', status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 7, memberName: 'Rohit Yadav', className: 'Pilates', time: '06:00 PM', date: '2026-06-08', status: 'Cancelled', paymentStatus: 'Pending' },
  { id: 8, memberName: 'Anjali Desai', className: 'Evening Cardio', time: '07:00 PM', date: '2026-06-08', status: 'Confirmed', paymentStatus: 'Paid' },
]

export default function BatchesDailyBooking() {
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0])
  const [bookings] = useState<Booking[]>(initialBookings)

  const filtered = bookings.filter(b => !filterDate || b.date === filterDate)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Daily Bookings</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">View daily class bookings and payments.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400">Filter by Date</label>
          <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-40 bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4">
          <p className="text-[10px] text-apple-gray-500">Total Bookings</p>
          <p className="text-xl font-bold text-[#1C1C1E] mt-1">{filtered.length}</p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-[10px] text-emerald-400">Confirmed</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">{filtered.filter(b => b.status === 'Confirmed').length}</p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-[10px] text-red-400">Cancelled</p>
          <p className="text-xl font-bold text-red-400 mt-1">{filtered.filter(b => b.status === 'Cancelled').length}</p>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-[10px] text-[#007AFF]">Pending Payment</p>
          <p className="text-xl font-bold text-[#007AFF] mt-1">{filtered.filter(b => b.paymentStatus === 'Pending').length}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-gray-200">
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Member</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Class</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Time</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id} className="border-b border-apple-gray-200/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs text-apple-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-xs text-[#1C1C1E]">{b.memberName}</td>
                <td className="px-4 py-3 text-xs text-apple-gray-600">{b.className}</td>
                <td className="px-4 py-3 text-xs text-apple-gray-400">{b.time}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-xs text-apple-gray-400">
                    <Calendar className="w-3 h-3" />{b.date}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full ${b.status === 'Confirmed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                    {b.status === 'Confirmed' ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full ${b.paymentStatus === 'Paid' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : b.paymentStatus === 'Pending' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' : 'text-apple-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>
                    {b.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-xs text-apple-gray-500">No bookings found for this date.</td></tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
