import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Dumbbell, Plus, Search, Users, CheckSquare } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface Batch {
  id: number
  name: string
  category: string
  trainer: string
  time: string
  days: string
  capacity: number
  enrolled: number
  active: boolean
}

interface Member {
  id: number
  name: string
  phone: string
  joinDate: string
}

const initialBatches: Batch[] = [
  { id: 1, name: 'Morning HIIT', category: 'Cardio', trainer: 'Riya Singh', time: '06:00 - 07:00', days: 'Mon, Wed, Fri', capacity: 20, enrolled: 18, active: true },
  { id: 2, name: 'Yoga Flow', category: 'Yoga', trainer: 'Shivani Verma', time: '07:30 - 08:30', days: 'Mon-Sat', capacity: 25, enrolled: 22, active: true },
  { id: 3, name: 'Evening Strength', category: 'Weight Training', trainer: 'Abhishek Katiyar', time: '17:00 - 18:00', days: 'Tue, Thu, Sat', capacity: 15, enrolled: 12, active: true },
  { id: 4, name: 'Boxing Basics', category: 'Cardio', trainer: 'Rajat Katiyar', time: '18:30 - 19:30', days: 'Mon, Wed, Fri', capacity: 20, enrolled: 8, active: false },
  { id: 5, name: 'Zumba Dance', category: 'Zumba', trainer: 'Awash Vikash', time: '08:00 - 09:00', days: 'Tue, Thu', capacity: 30, enrolled: 27, active: true },
  { id: 6, name: 'Pilates Core', category: 'Pilates', trainer: 'Shivani Verma', time: '09:30 - 10:30', days: 'Mon, Wed, Fri', capacity: 15, enrolled: 10, active: true },
  { id: 7, name: 'Power Lifting', category: 'Weight Training', trainer: 'Abhishek Katiyar', time: '16:00 - 17:00', days: 'Tue, Thu, Sat', capacity: 12, enrolled: 11, active: true },
]

const categoryOptions = ['All', 'Weight Training', 'Yoga', 'Pilates', 'Cardio', 'Zumba']
const trainerOptions = ['All Trainers', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']

const mockMembers: Record<number, Member[]> = {
  1: [
    { id: 1, name: 'Rahul Sharma', phone: '+91-9876543210', joinDate: '01 Jan 2026' },
    { id: 2, name: 'Priya Singh', phone: '+91-9876543211', joinDate: '15 Feb 2026' },
  ],
  2: [
    { id: 3, name: 'Amit Verma', phone: '+91-9876543212', joinDate: '10 Mar 2026' },
    { id: 4, name: 'Sneha Patel', phone: '+91-9876543213', joinDate: '20 Apr 2026' },
    { id: 5, name: 'Neha Gupta', phone: '+91-9876543214', joinDate: '05 May 2026' },
  ],
}

export default function BatchesList() {
  const navigate = useNavigate()
  const [batches, setBatches] = useState<Batch[]>(initialBatches)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [trainerFilter, setTrainerFilter] = useState('All Trainers')
  const [viewMembersModal, setViewMembersModal] = useState(false)
  const [attendanceModal, setAttendanceModal] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [attendance, setAttendance] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const perPage = 10
  const { toast } = useToast()

  const filtered = batches.filter(b => {
    if (categoryFilter !== 'All' && b.category !== categoryFilter) return false
    if (trainerFilter !== 'All Trainers' && b.trainer !== trainerFilter) return false
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.trainer.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const openViewMembers = (batch: Batch) => {
    setSelectedBatch(batch)
    setViewMembersModal(true)
  }

  const openAttendance = (batch: Batch) => {
    setSelectedBatch(batch)
    setAttendance(mockMembers[batch.id]?.map(m => m.id) || [])
    setAttendanceModal(true)
  }

  const toggleAttendance = (memberId: number) => {
    setAttendance(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId])
  }

  const handleDeactivate = (id: number) => {
    setBatches(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b))
  }

  const handleDelete = (id: number) => {
    setBatches(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Batch List</h1>
          <p className="text-xs text-gray-500 mt-0.5">All scheduled batches and classes.</p>
        </div>
        <button onClick={() => navigate('/dashboard/batches/add')} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" /> Add Batch
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-ydl-dark-border pb-0 overflow-x-auto">
        {categoryOptions.map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(cat)} className={`whitespace-nowrap px-3 py-2 text-[10px] font-semibold uppercase tracking-wider border-b-2 transition-colors ${categoryFilter === cat ? 'text-ydl-yellow border-ydl-yellow' : 'text-gray-500 border-transparent hover:text-gray-300'}`}>{cat}</button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search batches..." />
        </div>
        <select value={trainerFilter} onChange={e => setTrainerFilter(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {trainerOptions.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Trainer</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Schedule</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Capacity</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {paged.map((b, i) => (
                <motion.tr key={b.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{b.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 border border-ydl-yellow/20 rounded-md">
                      <Dumbbell className="w-3 h-3" />{b.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.trainer}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{b.time}</span></div>
                    <p className="text-[9px] text-gray-600 mt-0.5">{b.days}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-ydl-yellow/60" style={{ width: `${(b.enrolled / b.capacity) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400">{b.enrolled}/{b.capacity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${b.active ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>
                      {b.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label="Actions"
                      actions={[
                        { label: 'Edit', onClick: () => navigate(`/dashboard/batches/edit/${b.id}`) },
                        { label: 'View Members', onClick: () => openViewMembers(b), icon: Users },
                        { label: 'Take Attendance', onClick: () => openAttendance(b), icon: CheckSquare },
                        { label: b.active ? 'Deactivate' : 'Activate', onClick: () => handleDeactivate(b.id) },
                        { label: 'Delete', onClick: () => handleDelete(b.id), color: 'text-red-400' },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-ydl-dark-border bg-white/[0.02]"><span className="text-[10px] text-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>

      <Modal open={viewMembersModal} onClose={() => setViewMembersModal(false)} title={`Members - ${selectedBatch?.name || ''}`} size="lg">
        <div className="space-y-3">
          <p className="text-xs text-gray-500">Enrolled: {selectedBatch ? mockMembers[selectedBatch.id]?.length || 0 : 0} / {selectedBatch?.capacity || 0}</p>
          <div className="overflow-x-auto rounded-lg border border-ydl-dark-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Phone</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ydl-dark-border/50">
                {selectedBatch && (mockMembers[selectedBatch.id] || []).map(m => (
                  <tr key={m.id} className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 text-xs text-white">{m.name}</td>
                    <td className="px-3 py-2 text-xs text-gray-400">{m.phone}</td>
                    <td className="px-3 py-2 text-xs text-gray-400">{m.joinDate}</td>
                  </tr>
                ))}
                {selectedBatch && (!mockMembers[selectedBatch.id] || mockMembers[selectedBatch.id].length === 0) && (
                  <tr><td colSpan={3} className="px-3 py-4 text-xs text-gray-500 text-center">No members enrolled yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <Modal open={attendanceModal} onClose={() => setAttendanceModal(false)} title={`Take Attendance - ${selectedBatch?.name || ''}`} size="md">
        <div className="space-y-3">
          <p className="text-xs text-gray-500">{selectedBatch ? new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
          <div className="space-y-1">
            {selectedBatch && (mockMembers[selectedBatch.id] || []).map(m => (
              <label key={m.id} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${attendance.includes(m.id) ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/[0.02] border border-ydl-dark-border'}`}>
                <div>
                  <p className="text-xs text-white">{m.name}</p>
                  <p className="text-[10px] text-gray-500">{m.phone}</p>
                </div>
                <input type="checkbox" checked={attendance.includes(m.id)} onChange={() => toggleAttendance(m.id)} className="w-4 h-4 accent-ydl-yellow" />
              </label>
            ))}
            {selectedBatch && (!mockMembers[selectedBatch.id] || mockMembers[selectedBatch.id].length === 0) && (
              <p className="text-xs text-gray-500 text-center py-4">No members to take attendance for.</p>
            )}
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={() => { setAttendanceModal(false); toast(`Attendance saved for ${attendance.length} member(s)`, 'success') }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Save Attendance</button>
            <button onClick={() => setAttendanceModal(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
