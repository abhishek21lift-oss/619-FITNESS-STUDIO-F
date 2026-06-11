import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Edit3, Eye, MoreHorizontal, UserCog, Lock, Trash2,
  UserCheck, UserX
} from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import ActionMenu from '../../../components/shared/ActionMenu'
import StatsCard from '../../../components/shared/StatsCard'
import FilterBar from '../../../components/shared/FilterBar'
import { useToast } from '../../../components/ui/Toast'
import { FilterField, FilterSelect } from '../../../components/shared/FilterBar'

const initialStaff = [
  { id: 1, name: 'Awash Vikash', email: 'awash@ydl.com', phone: '+91 98765 43210', role: 'Head Trainer', branch: 'Lucknow', access: 'Full', status: 'Active', lastLogin: '07 Jun 2026, 05:45 AM' },
  { id: 2, name: 'Riya Singh', email: 'riya@ydl.com', phone: '+91 87654 32109', role: 'Senior Trainer', branch: 'Lucknow', access: 'Full', status: 'Active', lastLogin: '07 Jun 2026, 06:00 AM' },
  { id: 3, name: 'Abhishek Katiyar', email: 'abhishek@ydl.com', phone: '+91 76543 21098', role: 'Trainer', branch: 'Lucknow', access: 'Limited', status: 'Active', lastLogin: '06 Jun 2026, 06:15 AM' },
  { id: 4, name: 'Shivani Verma', email: 'shivani@ydl.com', phone: '+91 43210 98765', role: 'Yoga Trainer', branch: 'Lucknow', access: 'Limited', status: 'Active', lastLogin: '07 Jun 2026, 06:30 AM' },
  { id: 5, name: 'Rajesh Kumar', email: 'rajesh@ydl.com', phone: '+91 99887 76655', role: 'Receptionist', branch: 'Lucknow', access: 'Partial', status: 'Active', lastLogin: '07 Jun 2026, 07:00 AM' },
  { id: 6, name: 'Sunita Devi', email: 'sunita@ydl.com', phone: '+91 88776 65544', role: 'Accountant', branch: 'Jaipur', access: 'Partial', status: 'Inactive', lastLogin: '01 Jun 2026, 09:00 AM' },
]

const roles = ['All Roles', 'Head Trainer', 'Senior Trainer', 'Trainer', 'Yoga Trainer', 'Receptionist', 'Accountant', 'Admin']
const statuses = ['All Status', 'Active', 'Inactive']

export default function StaffList() {
  const [staff, setStaff] = useState(initialStaff)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [editForm, setEditForm] = useState<any>(null)
  const [resetPass, setResetPass] = useState({ password: '', confirm: '' })
  const [page, setPage] = useState(1)
  const perPage = 10
  const { toast } = useToast()

  const filtered = staff.filter(s => {
    if (roleFilter !== 'All Roles' && s.role !== roleFilter) return false
    if (statusFilter !== 'All Status' && s.status !== statusFilter) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.email.toLowerCase().includes(search.toLowerCase()) && !s.phone.includes(search)) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const activeCount = staff.filter(s => s.status === 'Active').length
  const inactiveCount = staff.filter(s => s.status === 'Inactive').length

  const handleDeactivate = (id: number) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s))
    setModal(null)
  }

  const handleDelete = (id: number) => {
    setStaff(prev => prev.filter(s => s.id !== id))
    setModal(null)
  }

  const accessBadge = (a: string) => {
    const styles: Record<string, string> = {
      Full: 'text-emerald-400 bg-emerald-500/10',
      Partial: 'text-amber-400 bg-amber-500/10',
      Limited: 'text-apple-gray-400 bg-gray-500/10',
    }
    return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${styles[a] || ''}`}>{a}</span>
  }

  const statusBadge = (s: string) => {
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${s === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-apple-gray-400 bg-gray-500/10 border-gray-500/20'}`}>{s}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Staff List</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">{staff.length} staff members registered.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Staff" value={staff.length} icon={UserCog} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Active" value={activeCount} icon={UserCheck} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Inactive" value={inactiveCount} icon={UserX} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
      </div>

      <FilterBar>
        <FilterField label="Search">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-apple-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} className="h-7 pl-7 pr-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/30" placeholder="Search by name, email..." />
          </div>
        </FilterField>
        <FilterField label="Role">
          <FilterSelect options={roles} value={roleFilter} onChange={(e: any) => setRoleFilter(e.target.value)} />
        </FilterField>
        <FilterField label="Status">
          <FilterSelect options={statuses} value={statusFilter} onChange={(e: any) => setStatusFilter(e.target.value)} />
        </FilterField>
      </FilterBar>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Email</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Phone</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Role</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Branch</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Last Login</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {paged.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#007AFF]/10 to-[#007AFF]/5 border border-[#007AFF]/20 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-[#007AFF]">{s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <span className="text-xs font-medium text-[#1C1C1E] cursor-pointer hover:text-apple-blue transition-colors" onClick={() => setModal({ type: 'view', data: s })}>{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{s.email}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{s.phone}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{s.role}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{s.branch}</td>
                  <td className="px-4 py-3">{statusBadge(s.status)}</td>
                  <td className="px-4 py-3 text-[10px] text-apple-gray-500">{s.lastLogin}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'Edit', icon: Edit3, onClick: () => { setEditForm({ ...s }); setModal({ type: 'edit', data: s }) } },
                        { label: 'View', icon: Eye, onClick: () => setModal({ type: 'view', data: s }) },
                        { label: s.status === 'Active' ? 'Deactivate' : 'Activate', icon: s.status === 'Active' ? UserX : UserCheck, color: s.status === 'Active' ? 'text-red-400' : 'text-emerald-400', onClick: () => setModal({ type: 'confirm-deactivate', data: s }) },
                        { label: 'Reset Password', icon: Lock, onClick: () => { setResetPass({ password: '', confirm: '' }); setModal({ type: 'reset-password', data: s }) } },
                        { label: 'Delete', icon: Trash2, color: 'text-red-400', onClick: () => setModal({ type: 'confirm-delete', data: s }) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-xs text-apple-gray-500">No staff match your filters.</div>}
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-apple-gray-200 bg-white/[0.02]"><span className="text-[10px] text-apple-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title={`Staff: ${modal?.data?.name || ''}`} size="md">
        {modal?.data && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-apple-gray-500">Name:</span> <span className="text-[#1C1C1E]">{modal.data.name}</span></div>
            <div><span className="text-apple-gray-500">Email:</span> <span className="text-[#1C1C1E]">{modal.data.email}</span></div>
            <div><span className="text-apple-gray-500">Phone:</span> <span className="text-[#1C1C1E]">{modal.data.phone}</span></div>
            <div><span className="text-apple-gray-500">Role:</span> <span className="text-[#1C1C1E]">{modal.data.role}</span></div>
            <div><span className="text-apple-gray-500">Branch:</span> <span className="text-[#1C1C1E]">{modal.data.branch}</span></div>
            <div><span className="text-apple-gray-500">Access:</span> {accessBadge(modal.data.access)}</div>
            <div><span className="text-apple-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
            <div><span className="text-apple-gray-500">Last Login:</span> <span className="text-[#1C1C1E]">{modal.data.lastLogin}</span></div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'edit'} onClose={() => setModal(null)} title={`Edit Staff: ${modal?.data?.name || ''}`} size="lg">
        {editForm && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Name</label><input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Email</label><input value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Phone</label><input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Role</label><select value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40"><option>Head Trainer</option><option>Senior Trainer</option><option>Trainer</option><option>Yoga Trainer</option><option>Receptionist</option><option>Accountant</option></select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Branch</label><select value={editForm.branch} onChange={e => setEditForm({ ...editForm, branch: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40"><option>Lucknow</option><option>Jaipur</option><option>Delhi</option><option>Mumbai</option><option>Bangalore</option></select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Access Level</label><select value={editForm.access} onChange={e => setEditForm({ ...editForm, access: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40"><option>Full</option><option>Partial</option><option>Limited</option></select></div>
            <div className="col-span-2 flex items-center gap-3 pt-2 border-t border-apple-gray-200 mt-2">
              <button onClick={() => { setStaff(prev => prev.map(s => s.id === editForm.id ? { ...s, ...editForm } : s)); setModal(null) }} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Edit3 className="w-3 h-3 inline mr-1" /> Save Changes</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'reset-password'} onClose={() => setModal(null)} title={`Reset Password: ${modal?.data?.name || ''}`} size="md">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">New Password</label>
            <input type="password" value={resetPass.password} onChange={e => setResetPass({ ...resetPass, password: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Min 8 characters" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Confirm Password</label>
            <input type="password" value={resetPass.confirm} onChange={e => setResetPass({ ...resetPass, confirm: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Re-enter password" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { if (resetPass.password && resetPass.password === resetPass.confirm) { toast(`Password reset successfully for ${modal?.data?.name}`, 'success'); setModal(null) } else { toast('Passwords do not match or are empty.', 'error') } }} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Lock className="w-3 h-3 inline mr-1" /> Reset</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'confirm-deactivate'} onClose={() => setModal(null)} title={`Confirm ${modal?.data?.status === 'Active' ? 'Deactivate' : 'Activate'}`} size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-apple-gray-400">Are you sure you want to <strong className="text-[#1C1C1E]">{modal.data.status === 'Active' ? 'deactivate' : 'activate'}</strong> <span className="text-apple-blue">{modal.data.name}</span>?</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleDeactivate(modal.data.id)} className={`px-4 py-2 text-xs font-semibold text-[#1C1C1E] rounded-lg ${modal.data.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'} transition-colors`}>Confirm</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'confirm-delete'} onClose={() => setModal(null)} title="Confirm Delete" size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-apple-gray-400">Delete <span className="text-apple-blue">{modal.data.name}</span>'s account? This cannot be undone.</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleDelete(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-red-500 rounded-lg hover:bg-red-600 transition-colors"><Trash2 className="w-3 h-3 inline mr-1" /> Delete</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

