import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, XCircle, Users, Eye } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Booking {
  id: string
  member: string
  batch: string
  date: string
  time: string
  status: 'Confirmed' | 'Cancelled' | 'Waitlist'
}

const initialBookings: Booking[] = [
  { id: 'BK-001', member: 'Rahul Sharma', batch: 'Morning HIIT', date: '07 Jun 2026', time: '06:00', status: 'Confirmed' },
  { id: 'BK-002', member: 'Priya Singh', batch: 'Yoga Flow', date: '07 Jun 2026', time: '07:30', status: 'Confirmed' },
  { id: 'BK-003', member: 'Amit Verma', batch: 'Morning HIIT', date: '07 Jun 2026', time: '06:00', status: 'Cancelled' },
  { id: 'BK-004', member: 'Sneha Patel', batch: 'Zumba Dance', date: '07 Jun 2026', time: '08:00', status: 'Confirmed' },
  { id: 'BK-005', member: 'Neha Gupta', batch: 'Evening Strength', date: '07 Jun 2026', time: '17:00', status: 'Waitlist' },
  { id: 'BK-006', member: 'Vikram Mehta', batch: 'Yoga Flow', date: '08 Jun 2026', time: '07:30', status: 'Confirmed' },
  { id: 'BK-007', member: 'Anjali Desai', batch: 'Zumba Dance', date: '08 Jun 2026', time: '08:00', status: 'Waitlist' },
  { id: 'BK-008', member: 'Rohit Kumar', batch: 'Pilates Core', date: '09 Jun 2026', time: '09:30', status: 'Confirmed' },
]

const batchOptions = ['All Batches', 'Morning HIIT', 'Yoga Flow', 'Evening Strength', 'Zumba Dance', 'Pilates Core', 'Power Lifting']
const categoryOptions = ['All Categories', 'Weight Training', 'Yoga', 'Pilates', 'Cardio', 'Zumba']

export default function BatchesBookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [dateFilter, setDateFilter] = useState('')
  const [batchFilter, setBatchFilter] = useState('All Batches')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [profileModal, setProfileModal] = useState(false)
  const [profileMember, setProfileMember] = useState<Booking | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = bookings.filter(b => {
    if (batchFilter !== 'All Batches' && b.batch !== batchFilter) return false
    if (dateFilter && b.date !== new Date(dateFilter).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    waitlisted: bookings.filter(b => b.status === 'Waitlist').length,
  }

  const updateStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const statusColors: Record<Booking['status'], string> = {
    Confirmed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
    Waitlist: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  }

  const statusIcons: Record<Booking['status'], any> = {
    Confirmed: CheckCircle,
    Cancelled: XCircle,
    Waitlist: Clock,
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Class Bookings</h1>
        <p className="text-xs text-gray-500 mt-0.5">View and manage batch reservations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Bookings" value={stats.total} icon={Calendar} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Confirmed" value={stats.confirmed} icon={CheckCircle} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Waitlisted" value={stats.waitlisted} icon={Users} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" />
        </div>
        <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {batchOptions.map(b => <option key={b}>{b}</option>)}
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {categoryOptions.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Batch</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Time</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {paged.map((b, i) => {
                const StatusIcon = statusIcons[b.status]
                return (
                  <motion.tr key={b.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3"><span className="text-xs font-medium text-white cursor-pointer hover:text-ydl-yellow transition-colors" onClick={() => { setProfileMember(b); setProfileModal(true) }}>{b.member}</span><br /><span className="text-[9px] text-gray-600">{b.id}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-400">{b.batch}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{b.date}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{b.time}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${statusColors[b.status]}`}>
                        <StatusIcon className="w-3 h-3" />{b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ActionMenu
                        label="Manage"
                        actions={[
                          { label: 'Confirm', onClick: () => updateStatus(b.id, 'Confirmed'), icon: CheckCircle },
                          { label: 'Cancel', onClick: () => updateStatus(b.id, 'Cancelled'), icon: XCircle, color: 'text-red-400' },
                          { label: 'Move to Waitlist', onClick: () => updateStatus(b.id, 'Waitlist'), icon: Clock },
                          { label: 'View Member', onClick: () => { setProfileMember(b); setProfileModal(true) }, icon: Eye },
                        ]}
                      />
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-ydl-dark-border bg-white/[0.02]"><span className="text-[10px] text-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>
      <Modal open={profileModal} onClose={() => setProfileModal(false)} title="Member Profile" size="sm">
        {profileMember && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-ydl-dark-border">
              <div className="w-10 h-10 rounded-full bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center text-sm font-bold text-ydl-yellow">
                {profileMember.member.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{profileMember.member}</h3>
                <p className="text-[10px] text-gray-500">{profileMember.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-[10px] text-gray-500">Batch</p><p className="text-xs text-white">{profileMember.batch}</p></div>
              <div><p className="text-[10px] text-gray-500">Status</p><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${statusColors[profileMember.status]}`}>{profileMember.status}</span></div>
              <div><p className="text-[10px] text-gray-500">Date</p><p className="text-xs text-white">{profileMember.date}</p></div>
              <div><p className="text-[10px] text-gray-500">Time</p><p className="text-xs text-white">{profileMember.time}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
