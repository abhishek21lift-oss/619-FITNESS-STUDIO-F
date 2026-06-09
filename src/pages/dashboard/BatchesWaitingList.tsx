import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Phone, User } from 'lucide-react'

interface WaitingEntry {
  id: number
  name: string
  batch: string
  dateRequested: string
  phone: string
  status: 'Waiting' | 'Moved to Booked'
}

const initialEntries: WaitingEntry[] = [
  { id: 1, name: 'Akash Verma', batch: 'Morning Yoga (6-7am)', dateRequested: '2026-06-01', phone: '+91 98765 43210', status: 'Waiting' },
  { id: 2, name: 'Ritu Sharma', batch: 'Morning Yoga (6-7am)', dateRequested: '2026-06-02', phone: '+91 98765 43211', status: 'Waiting' },
  { id: 3, name: 'Manish Gupta', batch: 'HIIT Training (9-10am)', dateRequested: '2026-06-03', phone: '+91 98765 43212', status: 'Waiting' },
  { id: 4, name: 'Pooja Singh', batch: 'Evening Cardio (7-8pm)', dateRequested: '2026-06-03', phone: '+91 98765 43213', status: 'Waiting' },
  { id: 5, name: 'Deepak Kumar', batch: 'Morning Yoga (6-7am)', dateRequested: '2026-06-04', phone: '+91 98765 43214', status: 'Waiting' },
  { id: 6, name: 'Sonia Patel', batch: 'Strength & Conditioning (5-6pm)', dateRequested: '2026-06-04', phone: '+91 98765 43215', status: 'Waiting' },
  { id: 7, name: 'Ravi Yadav', batch: 'HIIT Training (9-10am)', dateRequested: '2026-06-05', phone: '+91 98765 43216', status: 'Waiting' },
  { id: 8, name: 'Neelu Agarwal', batch: 'Pilates (6-7pm)', dateRequested: '2026-06-05', phone: '+91 98765 43217', status: 'Waiting' },
]

export default function BatchesWaitingList() {
  const [entries, setEntries] = useState<WaitingEntry[]>(initialEntries)

  const moveToBooked = (id: number) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status: 'Moved to Booked' as const } : e))
  }

  const removeFromList = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const waiting = entries.filter(e => e.status === 'Waiting').length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Waiting List</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Manage batch waiting lists.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <User className="w-3.5 h-3.5" /> {waiting} waiting
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-gray-200">
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Member</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Class / Batch</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Date Requested</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Phone</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={e.id} className="border-b border-apple-gray-200/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs text-apple-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-xs text-[#1C1C1E]">{e.name}</td>
                <td className="px-4 py-3 text-xs text-apple-gray-600">{e.batch}</td>
                <td className="px-4 py-3 text-xs text-apple-gray-400">{e.dateRequested}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-xs text-apple-gray-400">
                    <Phone className="w-3 h-3" />{e.phone}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full ${e.status === 'Waiting' ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'}`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {e.status === 'Waiting' && (
                      <>
                        <button onClick={() => moveToBooked(e.id)} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
                          <Check className="w-3 h-3" /> Move to Booked
                        </button>
                        <button onClick={() => removeFromList(e.id)} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors">
                          <X className="w-3 h-3" /> Remove
                        </button>
                      </>
                    )}
                    {e.status !== 'Waiting' && <span className="text-[10px] text-emerald-400">Confirmed</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
