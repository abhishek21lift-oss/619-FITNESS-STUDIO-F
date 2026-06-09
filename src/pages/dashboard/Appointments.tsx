import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, CheckCircle, XCircle, Plus, List, Grid3X3, Eye } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import { useToast } from '../../components/ui/Toast'

interface Appointment {
  id: string
  client: string
  trainer: string
  date: string
  time: string
  type: string
  notes: string
  status: 'Confirmed' | 'Pending' | 'Cancelled'
}

const initialAppointments: Appointment[] = [
  { id: 'APT-001', client: 'Rahul Sharma', trainer: 'Riya Singh', date: '08 Jun 2026', time: '07:00 AM', type: 'PT Session', notes: 'Focus on deadlift form', status: 'Confirmed' },
  { id: 'APT-002', client: 'Priya Singh', trainer: 'Shivani Verma', date: '08 Jun 2026', time: '08:00 AM', type: 'Yoga', notes: '', status: 'Confirmed' },
  { id: 'APT-003', client: 'Amit Verma', trainer: 'Abhishek Katiyar', date: '08 Jun 2026', time: '05:00 PM', type: 'PT Session', notes: 'First session assessment', status: 'Pending' },
  { id: 'APT-004', client: 'Sneha Patel', trainer: 'Awash Vikash', date: '09 Jun 2026', time: '06:30 AM', type: 'Consultation', notes: 'Diet plan discussion', status: 'Confirmed' },
  { id: 'APT-005', client: 'Neha Gupta', trainer: 'Rajat Katiyar', date: '09 Jun 2026', time: '07:30 AM', type: 'PT Session', notes: '', status: 'Cancelled' },
  { id: 'APT-006', client: 'Vikram Singh', trainer: 'Riya Singh', date: '10 Jun 2026', time: '06:00 AM', type: 'Cardio Session', notes: 'HIIT assessment', status: 'Pending' },
  { id: 'APT-007', client: 'Anita Sharma', trainer: 'Shivani Verma', date: '10 Jun 2026', time: '09:00 AM', type: 'Yoga', notes: 'Beginner level', status: 'Confirmed' },
]

const trainers = ['Riya Singh', 'Shivani Verma', 'Abhishek Katiyar', 'Awash Vikash', 'Rajat Katiyar']
const appointmentTypes = ['PT Session', 'Yoga', 'Consultation', 'Cardio Session', 'HIIT']

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [filter, setFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [addOpen, setAddOpen] = useState(false)
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)
  const [newDate, setNewDate] = useState('')
  const [form, setForm] = useState({ client: '', trainer: 'Riya Singh', date: '', time: '', type: 'PT Session', notes: '' })
  const [page, setPage] = useState(1)
  const perPage = 10
  const { toast } = useToast()

  const filtered = filter === 'All' ? appointments : appointments.filter(a => a.status === filter)

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const todayAppts = appointments.filter(a => a.date === '08 Jun 2026').length
  const pendingAppts = appointments.filter(a => a.status === 'Pending').length

  const addAppointment = () => {
    if (!form.client) return
    const id = `APT-${String(appointments.length + 1).padStart(3, '0')}`
    setAppointments(prev => [...prev, { ...form, id, status: 'Pending' }])
    setForm({ client: '', trainer: 'Riya Singh', date: '', time: '', type: 'PT Session', notes: '' })
    setAddOpen(false)
  }

  const confirmAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Confirmed' as const } : a))
  }

  const openReschedule = (a: Appointment) => {
    setSelectedAppt(a)
    setNewDate('')
    setRescheduleOpen(true)
  }

  const handleReschedule = () => {
    if (selectedAppt && newDate) {
      setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? { ...a, date: newDate, status: 'Pending' as const } : a))
    }
    setRescheduleOpen(false)
    setSelectedAppt(null)
  }

  const openCancel = (a: Appointment) => {
    setSelectedAppt(a)
    setCancelOpen(true)
  }

  const handleCancel = () => {
    if (selectedAppt) {
      setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? { ...a, status: 'Cancelled' as const } : a))
    }
    setCancelOpen(false)
    setSelectedAppt(null)
  }

  const statusColors: Record<string, string> = {
    Confirmed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
  }

  const statusIcons: Record<string, any> = {
    Confirmed: CheckCircle,
    Pending: Clock,
    Cancelled: XCircle,
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Appointments</h1><p className="text-xs text-apple-gray-500 mt-0.5">Schedule and manage client appointments.</p></div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/[0.03] rounded-lg border border-apple-gray-200">
            <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'text-apple-blue bg-apple-blue/10' : 'text-apple-gray-500'} rounded-l-lg`}><List className="w-3.5 h-3.5" /></button>
            <button onClick={() => setViewMode('calendar')} className={`p-1.5 ${viewMode === 'calendar' ? 'text-apple-blue bg-apple-blue/10' : 'text-apple-gray-500'} rounded-r-lg`}><Grid3X3 className="w-3.5 h-3.5" /></button>
          </div>
          <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Book Appointment</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Today's Appointments" value={todayAppts} icon={Calendar} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Pending" value={pendingAppts} icon={Clock} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
        <StatsCard label="Total" value={appointments.length} icon={User} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input type="date" className="bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
        </div>
        <div className="flex gap-1.5">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${filter === f ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{f}</button>
          ))}
        </div>
      </div>

      {viewMode === 'list' ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Client</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Trainer</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Time</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {paged.map((a, i) => {
                const StatusIcon = statusIcons[a.status]
                return (
                  <motion.tr key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-apple-gray-600">{a.id}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1.5"><User className="w-3 h-3 text-apple-gray-500" /><span className="text-xs font-medium text-[#1C1C1E] cursor-pointer hover:text-apple-blue transition-colors" onClick={() => toast(`Client: ${a.client}, ID: ${a.id}, Date: ${a.date}, Time: ${a.time}, Trainer: ${a.trainer}, Status: ${a.status}`, 'info')}>{a.client}</span></div></td>
                    <td className="px-4 py-3 text-xs text-apple-gray-400">{a.trainer}</td>
                    <td className="px-4 py-3 text-xs text-apple-gray-400">{a.date}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1"><Clock className="w-3 h-3 text-apple-gray-500" /><span className="text-xs text-apple-gray-400">{a.time}</span></div></td>
                    <td className="px-4 py-3"><span className="text-[10px] font-medium text-apple-blue bg-apple-blue/10 px-2 py-0.5 rounded-md">{a.type}</span></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${statusColors[a.status]}`}>
                        <StatusIcon className="w-3 h-3" />{a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ActionMenu actions={[
                        ...(a.status === 'Pending' ? [{ label: 'Confirm', icon: CheckCircle, onClick: () => confirmAppointment(a.id), color: 'text-emerald-400' as const }] : []),
                        { label: 'Reschedule', icon: Calendar, onClick: () => openReschedule(a) },
                        { label: 'Cancel', icon: XCircle, onClick: () => openCancel(a), color: 'text-red-400' },
                        { label: 'View Member', icon: Eye, onClick: () => toast(`Member: ${a.client} - ${a.id}`, 'info') },
                      ]} />
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
          {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-apple-gray-200 bg-white/[0.02]"><span className="text-[10px] text-apple-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">›</button></div></div>}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-[10px] font-medium text-apple-gray-500 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1
              const dayAppts = appointments.filter(a => {
                const parts = a.date.split(' ')
                return parts[0] === String(day)
              })
              return (
                <div key={i} className={`min-h-[70px] rounded-lg p-1 text-[10px] ${dayAppts.length ? 'bg-ydl-yellow/5 border border-ydl-yellow/20' : 'bg-white/[0.02] border border-apple-gray-200/30'}`}>
                  <span className="text-apple-gray-500 font-medium">{day}</span>
                  {dayAppts.slice(0, 2).map(a => (
                    <div key={a.id} className={`text-[7px] truncate mt-0.5 px-0.5 rounded ${a.status === 'Confirmed' ? 'text-emerald-400' : a.status === 'Pending' ? 'text-amber-400' : 'text-red-400'}`}>
                      {a.time} {a.client}
                    </div>
                  ))}
                  {dayAppts.length > 2 && <div className="text-[7px] text-apple-gray-400 mt-0.5">+{dayAppts.length - 2} more</div>}
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Book Appointment" size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Client Name</label>
            <input value={form.client} onChange={e => setForm(p => ({ ...p, client: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Member name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Time</label>
              <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Trainer</label>
              <select value={form.trainer} onChange={e => setForm(p => ({ ...p, trainer: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {trainers.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {appointmentTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={addAppointment} disabled={!form.client} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">Book Appointment</button>
          <button onClick={() => setAddOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>

      <Modal open={rescheduleOpen} onClose={() => setRescheduleOpen(false)} title="Reschedule Appointment" size="sm">
        <p className="text-xs text-apple-gray-400 mb-3">Appointment: <span className="text-[#1C1C1E]">{selectedAppt?.id}</span> with <span className="text-[#1C1C1E]">{selectedAppt?.client}</span></p>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">New Date</label>
          <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleReschedule} disabled={!newDate} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">Reschedule</button>
          <button onClick={() => setRescheduleOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>

      <Modal open={cancelOpen} onClose={() => setCancelOpen(false)} title="Cancel Appointment" size="sm">
        <p className="text-xs text-apple-gray-400 mb-4">Are you sure you want to cancel the appointment for <span className="text-[#1C1C1E] font-medium">{selectedAppt?.client}</span> on <span className="text-[#1C1C1E] font-medium">{selectedAppt?.date}</span>?</p>
        <div className="flex items-center gap-2">
          <button onClick={handleCancel} className="flex-1 py-2 text-xs font-semibold text-[#1C1C1E] bg-red-500/80 rounded-lg hover:bg-red-500">Yes, Cancel</button>
          <button onClick={() => setCancelOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Keep It</button>
        </div>
      </Modal>
    </div>
  )
}
