import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Clock, CheckCircle, XCircle, AlertTriangle,
  Edit3, Eye, MoreHorizontal, UserCheck
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import FilterBar from '../../components/shared/FilterBar'
import { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const initialAttendance = [
  { id: 1, name: 'Awash Vikash', role: 'Head Trainer', checkIn: '05:45 AM', checkOut: '10:00 AM', status: 'Present', hours: '4h 15m' },
  { id: 2, name: 'Riya Singh', role: 'Senior Trainer', checkIn: '06:00 AM', checkOut: '10:30 AM', status: 'Present', hours: '4h 30m' },
  { id: 3, name: 'Abhishek Katiyar', role: 'Trainer', checkIn: '06:30 AM', checkOut: '-', status: 'Late', hours: '-' },
  { id: 4, name: 'Rajat Katiyar', role: 'Trainer', checkIn: '-', checkOut: '-', status: 'Absent', hours: '-' },
  { id: 5, name: 'Shivani Verma', role: 'Yoga Trainer', checkIn: '06:30 AM', checkOut: '09:00 AM', status: 'Present', hours: '2h 30m' },
  { id: 6, name: 'Narayan Chandel', role: 'Junior Trainer', checkIn: '05:50 AM', checkOut: '09:30 AM', status: 'Present', hours: '3h 40m' },
  { id: 7, name: 'Rajesh Kumar', role: 'Receptionist', checkIn: '07:00 AM', checkOut: '04:00 PM', status: 'Present', hours: '9h 00m' },
  { id: 8, name: 'Sunita Devi', role: 'Accountant', checkIn: '-', checkOut: '-', status: 'On Leave', hours: '-' },
]

const staffFilter = ['All Staff', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma', 'Rajesh Kumar', 'Sunita Devi']
const branches = ['All Branches', 'Lucknow', 'Jaipur', 'Delhi']
const attendanceStatuses = ['Present', 'Absent', 'Late', 'Half Day']

export default function AttendanceStaff() {
  const [attendance, setAttendance] = useState(initialAttendance)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [staffFilt, setStaffFilt] = useState('All Staff')
  const [branchFilt, setBranchFilt] = useState('All Branches')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [markForm, setMarkForm] = useState({ name: staffFilter[1], status: 'Present', time: '09:00', date: new Date().toISOString().split('T')[0] })

  const filtered = attendance.filter(a => {
    if (staffFilt !== 'All Staff' && a.name !== staffFilt) return false
    return true
  })

  const presentCount = attendance.filter(a => a.status === 'Present').length
  const absentCount = attendance.filter(a => a.status === 'Absent').length
  const leaveCount = attendance.filter(a => a.status === 'On Leave').length
  const lateCount = attendance.filter(a => a.status === 'Late').length

  const handleMarkAttendance = () => {
    const now = new Date()
    const timeStr = markForm.time
      ? new Date(`2000-01-01T${markForm.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const newEntry = {
      id: attendance.length + 1,
      name: markForm.name,
      role: 'Staff',
      checkIn: markForm.status === 'Present' || markForm.status === 'Late' ? timeStr : '-',
      checkOut: '-',
      status: markForm.status as any,
      hours: '-',
    }
    setAttendance([newEntry, ...attendance])
    setModal(null)
  }

  const handleBulkPresent = () => {
    setAttendance(prev => prev.map(a => ({
      ...a,
      status: a.status === 'Absent' || a.status === 'Late' ? 'Present' : a.status,
      checkIn: a.checkIn === '-' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : a.checkIn,
      hours: a.hours === '-' ? '0h 0m' : a.hours,
    })))
    setModal(null)
  }

  const handleEditStatus = (id: number, status: string) => {
    setAttendance(prev => prev.map(a => a.id === id ? { ...a, status: status as any } : a))
    setModal(null)
  }

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      Present: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Absent: 'text-red-400 bg-red-500/10 border-red-500/20',
      Late: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      'On Leave': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      'Half Day': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || styles.Absent}`}>
        {s === 'Present' ? <CheckCircle className="w-3 h-3" /> : s === 'Absent' ? <XCircle className="w-3 h-3" /> : s === 'Late' ? <Clock className="w-3 h-3" /> : s === 'On Leave' ? <AlertTriangle className="w-3 h-3" /> : null}
        {s}
      </span>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Staff Attendance</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track daily staff and trainer check-ins.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setModal({ type: 'bulk-present' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
            <UserCheck className="w-3 h-3" /> Bulk Mark Present
          </button>
          <button onClick={() => setModal({ type: 'mark' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Clock className="w-3 h-3" /> Mark Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatsCard label="Present" value={presentCount} icon={CheckCircle} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Absent" value={absentCount} icon={XCircle} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="On Leave" value={leaveCount} icon={AlertTriangle} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Late" value={lateCount} icon={Clock} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
      </div>

      <FilterBar>
        <FilterField label="Date">
          <div className="relative">
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-7 pl-7 pr-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30 [color-scheme:dark]" />
          </div>
        </FilterField>
        <FilterField label="Staff">
          <FilterSelect options={staffFilter} value={staffFilt} onChange={(e: any) => setStaffFilt(e.target.value)} />
        </FilterField>
        <FilterField label="Branch">
          <FilterSelect options={branches} value={branchFilt} onChange={(e: any) => setBranchFilt(e.target.value)} />
        </FilterField>
      </FilterBar>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Check In</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Check Out</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Hours</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ydl-yellow/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-ydl-yellow">{a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <span className="text-xs font-medium text-white">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-400">{a.checkIn}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.checkOut}</td>
                  <td className="px-4 py-3">{statusBadge(a.status)}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{a.hours}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'Edit', icon: Edit3, onClick: () => setModal({ type: 'edit', data: a }) },
                        { label: 'View Details', icon: Eye, onClick: () => setModal({ type: 'view', data: a }) },
                        { label: 'Mark Absent', icon: XCircle, color: 'text-red-400', onClick: () => handleEditStatus(a.id, 'Absent') },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-xs text-gray-500">No attendance records for this date.</div>}
      </motion.div>

      <Modal open={modal?.type === 'mark'} onClose={() => setModal(null)} title="Mark Attendance" size="md">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-500">Staff/Trainer</label>
            <select value={markForm.name} onChange={e => setMarkForm({ ...markForm, name: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              {staffFilter.filter(s => s !== 'All Staff').map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-500">Status</label>
            <select value={markForm.status} onChange={e => setMarkForm({ ...markForm, status: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              {attendanceStatuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-500">Date</label>
            <input type="date" value={markForm.date} onChange={e => setMarkForm({ ...markForm, date: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
          </div>
          {(markForm.status === 'Present' || markForm.status === 'Late') && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500">Time</label>
              <input type="time" value={markForm.time} onChange={e => setMarkForm({ ...markForm, time: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
          )}
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleMarkAttendance} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Clock className="w-3 h-3 inline mr-1" /> Mark</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'bulk-present'} onClose={() => setModal(null)} title="Bulk Mark Present" size="sm">
        <p className="text-xs text-gray-400">Mark all absent/late staff as present for today?</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={handleBulkPresent} className="px-4 py-2 text-xs font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"><UserCheck className="w-3 h-3 inline mr-1" /> Confirm</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title={`Attendance: ${modal?.data?.name || ''}`} size="sm">
        {modal?.data && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-gray-500">Name:</span> <span className="text-white">{modal.data.name}</span></div>
              <div><span className="text-gray-500">Role:</span> <span className="text-white">{modal.data.role}</span></div>
              <div><span className="text-gray-500">Date:</span> <span className="text-white">{new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
              <div><span className="text-gray-500">Check In:</span> <span className="text-white">{modal.data.checkIn}</span></div>
              <div><span className="text-gray-500">Check Out:</span> <span className="text-white">{modal.data.checkOut}</span></div>
              <div><span className="text-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
              <div><span className="text-gray-500">Hours:</span> <span className="text-white">{modal.data.hours}</span></div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'edit'} onClose={() => setModal(null)} title={`Edit Attendance: ${modal?.data?.name || ''}`} size="sm">
        {modal?.data && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500">Status</label>
              <select defaultValue={modal.data.status} onChange={e => handleEditStatus(modal.data.id, e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                {attendanceStatuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Close</button>
          </div>
        )}
      </Modal>
    </div>
  )
}
