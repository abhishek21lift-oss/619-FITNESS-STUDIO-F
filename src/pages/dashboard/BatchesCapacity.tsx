import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

interface BatchCapacity {
  id: number
  name: string
  capacity: number
  booked: number
  waitlist: number
}

const initialBatches: BatchCapacity[] = [
  { id: 1, name: 'Morning Yoga (6-7am)', capacity: 30, booked: 28, waitlist: 3 },
  { id: 2, name: 'Morning Yoga (7-8am)', capacity: 30, booked: 30, waitlist: 8 },
  { id: 3, name: 'Cardio Blast (8-9am)', capacity: 25, booked: 22, waitlist: 1 },
  { id: 4, name: 'HIIT Training (9-10am)', capacity: 20, booked: 20, waitlist: 5 },
  { id: 5, name: 'Zumba (10-11am)', capacity: 35, booked: 18, waitlist: 0 },
  { id: 6, name: 'Strength & Conditioning (5-6pm)', capacity: 25, booked: 25, waitlist: 2 },
  { id: 7, name: 'Pilates (6-7pm)', capacity: 20, booked: 15, waitlist: 0 },
  { id: 8, name: 'Evening Cardio (7-8pm)', capacity: 30, booked: 30, waitlist: 4 },
]

const getStatusColor = (batch: BatchCapacity) => {
  const pct = (batch.booked / batch.capacity) * 100
  if (batch.booked >= batch.capacity) return 'text-red-400 bg-red-500/10 border-red-500/20'
  if (pct > 80) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
}

export default function BatchesCapacity() {
  const [batches] = useState<BatchCapacity[]>(initialBatches)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Batch Capacity</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Monitor class capacity and availability.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4">
          <p className="text-[10px] text-apple-gray-500">Total Batches</p>
          <p className="text-xl font-bold text-[#1C1C1E] mt-1">{batches.length}</p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-[10px] text-emerald-400">Available</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">{batches.filter(b => b.booked < b.capacity).length}</p>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <p className="text-[10px] text-yellow-400">Near Full</p>
          <p className="text-xl font-bold text-yellow-400 mt-1">{batches.filter(b => (b.booked / b.capacity) * 100 > 80 && b.booked < b.capacity).length}</p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-[10px] text-red-400">Full</p>
          <p className="text-xl font-bold text-red-400 mt-1">{batches.filter(b => b.booked >= b.capacity).length}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-gray-200">
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Class / Batch</th>
              <th className="text-right px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="text-right px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Booked</th>
              <th className="text-right px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Available</th>
              <th className="text-right px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Waitlist</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => {
              const available = b.capacity - b.booked
              const pct = (b.booked / b.capacity) * 100
              return (
                <tr key={b.id} className="border-b border-apple-gray-200/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{b.name}</td>
                  <td className="px-4 py-3 text-xs text-[#1C1C1E] text-right">{b.capacity}</td>
                  <td className="px-4 py-3 text-xs text-[#1C1C1E] text-right">{b.booked}</td>
                  <td className={`px-4 py-3 text-xs text-right ${available > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{available}</td>
                  <td className="px-4 py-3 text-xs text-yellow-400 text-right">{b.waitlist || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full border ${getStatusColor(b)}`}>
                      <Users className="w-2.5 h-2.5" />
                      {b.booked >= b.capacity ? 'Full' : pct > 80 ? 'Near Full' : 'Available'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
