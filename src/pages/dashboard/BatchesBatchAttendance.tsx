import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Clock } from 'lucide-react'

interface BatchAttendanceRecord {
  id: number
  name: string
  timeIn: string
  status: 'Present' | 'Absent'
}

const batchOptions = ['Morning Yoga 6am', 'Morning Yoga 7am', 'Cardio Blast 8am', 'HIIT Training 9am', 'Zumba 10am', 'Strength 5pm', 'Pilates 6pm', 'Evening Cardio 7pm']

const initialRecords: BatchAttendanceRecord[] = [
  { id: 1, name: 'Rahul Sharma', timeIn: '06:05 AM', status: 'Present' },
  { id: 2, name: 'Priya Singh', timeIn: '06:10 AM', status: 'Present' },
  { id: 3, name: 'Amit Verma', timeIn: '', status: 'Absent' },
  { id: 4, name: 'Sneha Gupta', timeIn: '05:55 AM', status: 'Present' },
  { id: 5, name: 'Vikram Patel', timeIn: '', status: 'Absent' },
  { id: 6, name: 'Neha Kapoor', timeIn: '06:02 AM', status: 'Present' },
  { id: 7, name: 'Rohit Yadav', timeIn: '06:08 AM', status: 'Present' },
  { id: 8, name: 'Anjali Desai', timeIn: '', status: 'Absent' },
]

export default function BatchesBatchAttendance() {
  const [selectedBatch, setSelectedBatch] = useState(batchOptions[0])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [records, setRecords] = useState<BatchAttendanceRecord[]>(initialRecords)

  const toggleStatus = (id: number) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Present' ? 'Absent' as const : 'Present' as const, timeIn: r.status === 'Absent' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '' } : r))
  }

  const total = records.length
  const present = records.filter(r => r.status === 'Present').length
  const absent = records.filter(r => r.status === 'Absent').length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Batch Attendance</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track daily batch attendance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
          <p className="text-[10px] text-gray-500">Total Members</p>
          <p className="text-xl font-bold text-white mt-1">{total}</p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-[10px] text-emerald-400">Present</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">{present}</p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-[10px] text-red-400">Absent</p>
          <p className="text-xl font-bold text-red-400 mt-1">{absent}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400">Batch</label>
          <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)} className="w-52 bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
            {batchOptions.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-gray-400">Date</label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-40 bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border">
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Time In</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={r.id} className="border-b border-ydl-dark-border/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-xs text-white">{r.name}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {r.timeIn ? <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.timeIn}</span> : '-'}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleStatus(r.id)} className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium rounded-lg transition-colors ${r.status === 'Present' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                    {r.status === 'Present' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {r.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
