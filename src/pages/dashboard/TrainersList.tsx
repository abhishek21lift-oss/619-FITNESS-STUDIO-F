import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Plus, LogOut, UserCheck, UserX, Clock, Edit3, Eye,
  MoreHorizontal, CheckCircle, XCircle, Calendar
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

const initialTrainers = [
  { id: 'TT-17043', name: '619 Fitness Studio', subtitle: 'AWASH VIKASH', type: 'Head Trainer', email: 'awash@ydl.com', phone: '+91 98765 43210', gender: 'Male', checkin: 'Present', checkinTime: '05:45 AM', star: '-', status: 'Active' },
  { id: 'TT-17044', name: 'Riya Singh', type: 'Senior Trainer', email: 'riya@ydl.com', phone: '+91 87654 32109', gender: 'Female', checkin: 'Present', checkinTime: '06:00 AM', star: '-', status: 'Active' },
  { id: 'TT-17045', name: 'Abhishek Katiyar', subtitle: 'ITT Gate', type: 'Trainer', email: 'abhishek@ydl.com', phone: '+91 76543 21098', gender: 'Male', checkin: 'Late', checkinTime: '06:30 AM', star: '-', status: 'Active' },
  { id: 'TT-17046', name: 'Rajat Katiyar', type: 'Trainer', email: 'rajat@ydl.com', phone: '+91 65432 10987', gender: 'Male', checkin: 'Absent', checkinTime: '-', star: '-', status: 'Active' },
  { id: 'TT-17047', name: 'Narayan Chandel', type: 'Junior Trainer', email: 'narayan@ydl.com', phone: '+91 54321 09876', gender: 'Male', checkin: 'Present', checkinTime: '05:50 AM', star: '-', status: 'Active' },
  { id: 'TT-17048', name: 'Shivani Verma', type: 'Yoga Trainer', email: 'shivani@ydl.com', phone: '+91 43210 98765', gender: 'Female', checkin: 'Present', checkinTime: '06:30 AM', star: '-', status: 'Active' },
]

export default function TrainersList() {
  const [trainers, setTrainers] = useState(initialTrainers)
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [editForm, setEditForm] = useState<any>(null)

  const filtered = trainers.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.phone.includes(search) || t.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedRows(next)
  }

  const toggleAll = () => {
    if (selectedRows.size === filtered.length) setSelectedRows(new Set())
    else setSelectedRows(new Set(filtered.map(r => r.id)))
  }

  const handleCheckInOut = (t: any) => {
    const isPresent = t.checkin === 'Present' || t.checkin === 'Late'
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setTrainers(prev => prev.map(tr => tr.id === t.id ? {
      ...tr,
      checkin: isPresent ? 'Absent' : 'Present',
      checkinTime: isPresent ? '-' : now,
      star: '-'
    } : tr))
    setModal(null)
  }

  const handleDeactivate = (t: any) => {
    setTrainers(prev => prev.map(tr => tr.id === t.id ? { ...tr, status: tr.status === 'Active' ? 'Inactive' : 'Active' } : tr))
    setModal(null)
  }

  const activeCount = trainers.filter(t => t.status === 'Active').length
  const inactiveCount = trainers.filter(t => t.status === 'Inactive').length

  const checkinBadge = (s: string) => {
    const styles: Record<string, string> = {
      Present: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Late: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      Absent: 'text-red-400 bg-red-500/10 border-red-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || styles.Absent}`}>{s === 'Absent' ? 'Not present at the moment' : s}</span>
  }

  const statusBadge = (s: string) => {
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${s === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border-gray-500/20'}`}>{s}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">My Trainers</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your trainer team (max 10).</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setModal({ type: 'add-trainer' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3 h-3" /> Add Trainer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Trainers" value={trainers.length} icon={UserCheck} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Active" value={activeCount} icon={CheckCircle} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Inactive" value={inactiveCount} icon={XCircle} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search by mobile, email..." />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setModal({ type: 'bulk-checkin' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
            <UserCheck className="w-3 h-3" /> Check In
          </button>
          <button onClick={() => setModal({ type: 'bulk-checkout' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors">
            <LogOut className="w-3 h-3" /> Check Out
          </button>
          <button onClick={() => setModal({ type: 'bulk-addtime' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
            <Clock className="w-3 h-3" /> Add Time
          </button>
          <button onClick={() => setModal({ type: 'bulk-deactivate' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors">
            <UserX className="w-3 h-3" /> Deactivate
          </button>
          <button onClick={() => setModal({ type: 'bulk-activate' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
            <CheckCircle className="w-3 h-3" /> Activate
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="w-8 px-3 py-3"><input type="checkbox" checked={selectedRows.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="accent-ydl-yellow" /></th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Trainer</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Trainer Type</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Checkin Status</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Star</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((t, i) => (
                <motion.tr key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-3"><input type="checkbox" checked={selectedRows.has(t.id)} onChange={() => toggleRow(t.id)} className="accent-ydl-yellow" /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ydl-yellow/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-ydl-yellow">{t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-white cursor-pointer hover:text-ydl-yellow transition-colors" onClick={() => setModal({ type: 'view-trainer', data: t })}>{t.name}</span>
                        {t.subtitle && <p className="text-[9px] text-ydl-yellow">{t.subtitle}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs text-gray-400">{t.type}</span>
                    <p className="text-[9px] text-gray-600">{t.id}</p>
                  </td>
                  <td className="px-3 py-3">{checkinBadge(t.checkin)}</td>
                  <td className="px-3 py-3 text-xs text-gray-400">{t.email}</td>
                  <td className="px-3 py-3 text-xs text-gray-400">{t.phone}</td>
                  <td className="px-3 py-3 text-xs text-gray-500">{t.star}</td>
                  <td className="px-3 py-3">{statusBadge(t.status)}</td>
                  <td className="px-3 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'Edit', icon: Edit3, onClick: () => { setEditForm({ ...t }); setModal({ type: 'edit-trainer', data: t }) } },
                        { label: 'View', icon: Eye, onClick: () => setModal({ type: 'view-trainer', data: t }) },
                        { label: t.checkin === 'Present' || t.checkin === 'Late' ? 'Check Out' : 'Check In', icon: Clock, onClick: () => setModal({ type: 'confirm-check', data: t }) },
                        { label: 'Add Time', icon: Calendar, onClick: () => setModal({ type: 'add-time', data: t }) },
                        { label: t.status === 'Active' ? 'Deactivate' : 'Activate', icon: t.status === 'Active' ? UserX : UserCheck, color: t.status === 'Active' ? 'text-red-400' : 'text-emerald-400', onClick: () => setModal({ type: 'confirm-deactivate', data: t }) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-xs text-gray-500">No trainers match your search.</div>}
      </motion.div>

      <Modal open={modal?.type === 'view-trainer'} onClose={() => setModal(null)} title={`Trainer Profile: ${modal?.data?.name || ''}`} size="lg">
        {modal?.data && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-ydl-yellow/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center">
                <span className="text-lg font-bold text-ydl-yellow">{modal.data.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{modal.data.name}</h3>
                {modal.data.subtitle && <p className="text-[10px] text-ydl-yellow">{modal.data.subtitle}</p>}
                <p className="text-[10px] text-gray-500">{modal.data.type} ({modal.data.id})</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-gray-500">Email:</span> <span className="text-white">{modal.data.email}</span></div>
              <div><span className="text-gray-500">Phone:</span> <span className="text-white">{modal.data.phone}</span></div>
              <div><span className="text-gray-500">Gender:</span> <span className="text-white">{modal.data.gender}</span></div>
              <div><span className="text-gray-500">Check-in:</span> <span className="text-white">{modal.data.checkinTime === '-' ? 'Not checked in' : modal.data.checkinTime}</span></div>
              <div><span className="text-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
              <div><span className="text-gray-500">Star Trainer:</span> <span className="text-gray-500">{modal.data.star}</span></div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'edit-trainer'} onClose={() => setModal(null)} title={`Edit Trainer: ${modal?.data?.name || ''}`} size="lg">
        {editForm && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Name</label><input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Email</label><input value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Phone</label><input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Gender</label><select value={editForm.gender} onChange={e => setEditForm({ ...editForm, gender: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40"><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Type</label><select value={editForm.type} onChange={e => setEditForm({ ...editForm, type: e.target.value })} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40"><option>Head Trainer</option><option>Senior Trainer</option><option>Trainer</option><option>Junior Trainer</option><option>Yoga Trainer</option></select></div>
            <div className="flex items-center gap-3 pt-2 border-t border-ydl-dark-border mt-2 col-span-2">
              <button onClick={() => { setTrainers(prev => prev.map(tr => tr.id === editForm.id ? { ...tr, ...editForm } : tr)); setModal(null) }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Edit3 className="w-3 h-3 inline mr-1" /> Save Changes</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'confirm-check'} onClose={() => setModal(null)} title={`Confirm ${modal?.data?.checkin === 'Present' || modal?.data?.checkin === 'Late' ? 'Check Out' : 'Check In'}`} size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-gray-400">Are you sure you want to <strong className="text-white">{modal.data.checkin === 'Present' || modal.data.checkin === 'Late' ? 'check out' : 'check in'}</strong> <span className="text-ydl-yellow">{modal.data.name}</span>?</p>
            <p className="text-[10px] text-gray-500 mt-1">Timestamp: {new Date().toLocaleString('en-IN')}</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleCheckInOut(modal.data)} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Confirm</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'confirm-deactivate'} onClose={() => setModal(null)} title={`Confirm ${modal?.data?.status === 'Active' ? 'Deactivate' : 'Activate'}`} size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-gray-400">Are you sure you want to <strong className="text-white">{modal.data.status === 'Active' ? 'deactivate' : 'activate'}</strong> <span className="text-ydl-yellow">{modal.data.name}</span>?</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleDeactivate(modal.data)} className={`px-4 py-2 text-xs font-semibold text-white rounded-lg ${modal.data.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'} transition-colors`}>Confirm</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'add-time'} onClose={() => setModal(null)} title={`Add Time: ${modal?.data?.name || ''}`} size="md">
        {modal?.data && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Date</label><input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" /></div>
              <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Time</label><input type="time" className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" /></div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => { alert(`Time added for ${modal?.data?.name}`); setModal(null) }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Clock className="w-3 h-3 inline mr-1" /> Add Time</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'add-trainer'} onClose={() => setModal(null)} title="Add Trainer" size="md">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="col-span-2 space-y-1.5"><label className="text-[10px] text-gray-500">Name</label><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" placeholder="Trainer name" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Email</label><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" placeholder="Email" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Phone</label><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" placeholder="Phone" /></div>
          <div className="col-span-2 flex gap-3 pt-2">
            <button onClick={() => { alert('Trainer added successfully!'); setModal(null) }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3 h-3 inline mr-1" /> Add</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'bulk-checkin'} onClose={() => setModal(null)} title="Bulk Check In" size="sm">
        <p className="text-xs text-gray-400">Check in {selectedRows.size || 'all'} selected trainer(s)?</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { if (selectedRows.size) { setTrainers(prev => prev.map(t => selectedRows.has(t.id) ? { ...t, checkin: 'Present', checkinTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } : t)); setModal(null) } }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Confirm</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={modal?.type === 'bulk-checkout'} onClose={() => setModal(null)} title="Bulk Check Out" size="sm">
        <p className="text-xs text-gray-400">Check out {selectedRows.size || 'all'} selected trainer(s)?</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { if (selectedRows.size) { setTrainers(prev => prev.map(t => selectedRows.has(t.id) ? { ...t, checkin: 'Absent', checkinTime: '-' } : t)); setModal(null) } }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Confirm</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
