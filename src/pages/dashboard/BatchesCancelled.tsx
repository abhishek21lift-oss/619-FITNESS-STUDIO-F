import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ban, Calendar } from 'lucide-react'

interface CancelledClass {
  id: number
  className: string
  date: string
  time: string
  reason: string
  cancelledBy: string
}

const initialCancelled: CancelledClass[] = [
  { id: 1, className: 'Morning Yoga (6-7am)', date: '2026-06-01', time: '06:00 AM', reason: 'Trainer sick', cancelledBy: 'Riya Singh' },
  { id: 2, className: 'HIIT Training (9-10am)', date: '2026-06-02', time: '09:00 AM', reason: 'Public holiday', cancelledBy: 'Admin' },
  { id: 3, className: 'Evening Cardio (7-8pm)', date: '2026-06-03', time: '07:00 PM', reason: 'Equipment maintenance', cancelledBy: 'Abhishek Katiyar' },
  { id: 4, className: 'Zumba (10-11am)', date: '2026-06-05', time: '10:00 AM', reason: 'Low enrollment', cancelledBy: 'Riya Singh' },
  { id: 5, className: 'Pilates (6-7pm)', date: '2026-06-06', time: '06:00 PM', reason: 'Trainer unavailable', cancelledBy: 'Admin' },
  { id: 6, className: 'Strength & Conditioning (5-6pm)', date: '2026-06-07', time: '05:00 PM', reason: 'Studio booked for event', cancelledBy: 'Narayan Chandel' },
]

export default function BatchesCancelled() {
  const [filterStart, setFilterStart] = useState('')
  const [filterEnd, setFilterEnd] = useState('')

  const filtered = initialCancelled.filter(c => {
    if (filterStart && c.date < filterStart) return false
    if (filterEnd && c.date > filterEnd) return false
    return true
  })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Cancelled Classes</h1>
        <p className="text-xs text-gray-500 mt-0.5">View cancelled batch sessions.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400">From</label>
          <input type="date" value={filterStart} onChange={e => setFilterStart(e.target.value)} className="w-40 bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400">To</label>
          <input type="date" value={filterEnd} onChange={e => setFilterEnd(e.target.value)} className="w-40 bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
        </div>
        {(filterStart || filterEnd) && (
          <button onClick={() => { setFilterStart(''); setFilterEnd('') }} className="mt-5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            Clear Filter
          </button>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border">
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Cancelled By</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} className="border-b border-ydl-dark-border/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs text-white">
                    <Ban className="w-3 h-3 text-red-400" />{c.className}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />{c.date}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{c.time}</td>
                <td className="px-4 py-3 text-xs text-gray-300">{c.reason}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{c.cancelledBy}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-xs text-gray-500">No cancelled classes found.</td></tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
