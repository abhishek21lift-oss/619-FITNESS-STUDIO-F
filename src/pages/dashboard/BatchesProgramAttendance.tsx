import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface MemberAttendance {
  id: number
  name: string
  status: 'Present' | 'Absent'
  notes: string
}

const programOptions = ['Morning Yoga', 'Evening Cardio', 'HIIT Blast', 'Strength Training', 'Zumba Dance', 'Pilates Core']

const initialMembers: MemberAttendance[] = [
  { id: 1, name: 'Rahul Sharma', status: 'Present', notes: '' },
  { id: 2, name: 'Priya Singh', status: 'Present', notes: '' },
  { id: 3, name: 'Amit Verma', status: 'Absent', notes: 'Sick' },
  { id: 4, name: 'Sneha Gupta', status: 'Present', notes: '' },
  { id: 5, name: 'Vikram Patel', status: 'Absent', notes: 'Travel' },
  { id: 6, name: 'Neha Kapoor', status: 'Present', notes: 'Left early' },
  { id: 7, name: 'Rohit Yadav', status: 'Present', notes: '' },
  { id: 8, name: 'Anjali Desai', status: 'Absent', notes: '' },
]

export default function BatchesProgramAttendance() {
  const [selectedProgram, setSelectedProgram] = useState(programOptions[0])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [members, setMembers] = useState<MemberAttendance[]>(initialMembers)

  const toggleStatus = (id: number) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'Present' ? 'Absent' as const : 'Present' as const } : m))
  }

  const setNotes = (id: number, notes: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, notes } : m))
  }

  const markAllPresent = () => {
    setMembers(prev => prev.map(m => ({ ...m, status: 'Present' as const })))
  }

  const total = members.length
  const present = members.filter(m => m.status === 'Present').length
  const absent = members.filter(m => m.status === 'Absent').length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Program Attendance</h1>
          <p className="text-xs text-gray-500 mt-0.5">Mark attendance for batch programs.</p>
        </div>
        <button onClick={markAllPresent} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
          <Check className="w-3.5 h-3.5" /> Mark All Present
        </button>
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
          <label className="text-[11px] font-medium text-gray-400">Program</label>
          <select value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)} className="w-48 bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
            {programOptions.map(p => <option key={p}>{p}</option>)}
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
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.id} className="border-b border-ydl-dark-border/50 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-xs text-white">{m.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleStatus(m.id)} className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium rounded-lg transition-colors ${m.status === 'Present' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                      {m.status === 'Present' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {m.status}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input value={m.notes} onChange={e => setNotes(m.id, e.target.value)} className="w-40 bg-white/5 border border-ydl-dark-border rounded px-2 py-1 text-[10px] text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Add notes..." />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
