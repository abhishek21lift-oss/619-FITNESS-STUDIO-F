import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock, CheckCircle, XCircle, Plus, Eye, MoreHorizontal
} from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import ActionMenu from '../../../components/shared/ActionMenu'
import StatsCard from '../../../components/shared/StatsCard'

const initialLeaves = [
  { id: 1, trainer: 'Riya Singh', type: 'Sick Leave', from: '2026-06-10', to: '2026-06-11', days: 2, reason: 'Not feeling well', status: 'Approved' },
  { id: 2, trainer: 'Abhishek Katiyar', type: 'Casual Leave', from: '2026-06-15', to: '2026-06-15', days: 1, reason: 'Family function', status: 'Pending' },
  { id: 3, trainer: 'Rajat Katiyar', type: 'Earned Leave', from: '2026-06-20', to: '2026-06-24', days: 5, reason: 'Vacation with family', status: 'Pending' },
  { id: 4, trainer: 'Shivani Verma', type: 'Sick Leave', from: '2026-06-05', to: '2026-06-07', days: 3, reason: 'Doctor appointment and rest', status: 'Approved' },
  { id: 5, trainer: 'Narayan Chandel', type: 'Casual Leave', from: '2026-06-01', to: '2026-06-01', days: 1, reason: 'Personal work', status: 'Rejected' },
  { id: 6, trainer: 'Awash Vikash', type: 'Earned Leave', from: '2026-06-25', to: '2026-06-26', days: 2, reason: 'Pre-planned break', status: 'Pending' },
]

const trainers = ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']
const leaveTypes = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Personal Leave', 'Medical Leave', 'Annual Leave']
const statusTabs = ['Pending', 'Approved', 'Rejected', 'All']

export default function TrainersLeave() {
  const [leaves, setLeaves] = useState(initialLeaves)
  const [statusTab, setStatusTab] = useState('Pending')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [addForm, setAddForm] = useState({ trainer: trainers[0], type: leaveTypes[0], from: '', to: '', reason: '' })

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  const filtered = statusTab === 'All' ? leaves : leaves.filter(l => l.status === statusTab)

  const pendingCount = leaves.filter(l => l.status === 'Pending').length
  const approvedToday = leaves.filter(l => l.status === 'Approved').length

  const handleApprove = (id: number) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l))
    setModal(null)
  }

  const handleReject = (id: number) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l))
    setModal(null)
  }

  const handleAdd = () => {
    const fromD = new Date(addForm.from)
    const toD = new Date(addForm.to)
    const days = Math.max(1, Math.ceil((toD.getTime() - fromD.getTime()) / (1000 * 60 * 60 * 24)) + 1)
    const newLeave = {
      id: leaves.length + 1,
      trainer: addForm.trainer,
      type: addForm.type,
      from: addForm.from,
      to: addForm.to || addForm.from,
      days: addForm.to ? days : 1,
      reason: addForm.reason,
      status: 'Pending' as const,
    }
    setLeaves([newLeave, ...leaves])
    setModal(null)
    setAddForm({ trainer: trainers[0], type: leaveTypes[0], from: '', to: '', reason: '' })
  }

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      Approved: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      Rejected: 'text-red-400 bg-red-500/10 border-red-500/20',
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || ''}`}>
        {s === 'Approved' ? <CheckCircle className="w-3 h-3" /> : s === 'Pending' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {s}
      </span>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Leave Requests</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Manage trainer leave applications.</p>
        </div>
        <button onClick={() => setModal({ type: 'add' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-3 h-3" /> Add Leave
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatsCard label="Pending" value={`${pendingCount} Request${pendingCount !== 1 ? 's' : ''}`} icon={Clock} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
        <StatsCard label="Approved Today" value={approvedToday} icon={CheckCircle} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {statusTabs.map(tab => (
          <button key={tab} onClick={() => setStatusTab(tab)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${statusTab === tab ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>
            {tab} {tab !== 'All' && <span className="font-bold">({leaves.filter(l => l.status === tab).length})</span>}
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Trainer</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Leave Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">From</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">To</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Days</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Reason</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((l, i) => (
                <motion.tr key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-apple-blue/10 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-apple-blue">{l.trainer.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="text-xs font-medium text-[#1C1C1E]">{l.trainer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{l.type}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{formatDate(l.from)}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{formatDate(l.to)}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#1C1C1E]">{l.days}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400 max-w-[150px] truncate">{l.reason}</td>
                  <td className="px-4 py-3">{statusBadge(l.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        ...(l.status === 'Pending' ? [
                          { label: 'Approve', icon: CheckCircle, color: 'text-emerald-400', onClick: () => setModal({ type: 'confirm-approve', data: l }) },
                          { label: 'Reject', icon: XCircle, color: 'text-red-400', onClick: () => setModal({ type: 'confirm-reject', data: l }) },
                        ] : []),
                        { label: 'View Details', icon: Eye, onClick: () => setModal({ type: 'view', data: l }) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-xs text-apple-gray-500">No {statusTab.toLowerCase()} leave requests.</div>}
      </motion.div>

      <Modal open={modal?.type === 'add'} onClose={() => setModal(null)} title="Add Leave Request" size="md">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Trainer</label>
            <select value={addForm.trainer} onChange={e => setAddForm({ ...addForm, trainer: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {trainers.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Leave Type</label>
            <select value={addForm.type} onChange={e => setAddForm({ ...addForm, type: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {leaveTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] text-apple-gray-500">From Date</label>
              <input type="date" value={addForm.from} onChange={e => setAddForm({ ...addForm, from: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-apple-gray-500">To Date</label>
              <input type="date" value={addForm.to} onChange={e => setAddForm({ ...addForm, to: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Reason</label>
            <textarea value={addForm.reason} onChange={e => setAddForm({ ...addForm, reason: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[60px] resize-none" placeholder="Reason for leave..." />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleAdd} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3 h-3 inline mr-1" /> Submit</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'confirm-approve'} onClose={() => setModal(null)} title="Approve Leave" size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-apple-gray-400">Approve <span className="text-apple-blue font-medium">{modal.data.trainer}</span>'s {modal.data.type} ({formatDate(modal.data.from)} - {formatDate(modal.data.to)})?</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleApprove(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"><CheckCircle className="w-3 h-3 inline mr-1" /> Approve</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'confirm-reject'} onClose={() => setModal(null)} title="Reject Leave" size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-apple-gray-400">Reject <span className="text-apple-blue font-medium">{modal.data.trainer}</span>'s {modal.data.type}?</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleReject(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-red-500 rounded-lg hover:bg-red-600 transition-colors"><XCircle className="w-3 h-3 inline mr-1" /> Reject</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title={`Leave Details: ${modal?.data?.trainer || ''}`} size="sm">
        {modal?.data && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-apple-gray-500">Trainer:</span> <span className="text-[#1C1C1E]">{modal.data.trainer}</span></div>
              <div><span className="text-apple-gray-500">Type:</span> <span className="text-[#1C1C1E]">{modal.data.type}</span></div>
              <div><span className="text-apple-gray-500">From:</span> <span className="text-[#1C1C1E]">{formatDate(modal.data.from)}</span></div>
              <div><span className="text-apple-gray-500">To:</span> <span className="text-[#1C1C1E]">{formatDate(modal.data.to)}</span></div>
              <div><span className="text-apple-gray-500">Days:</span> <span className="text-[#1C1C1E]">{modal.data.days}</span></div>
              <div><span className="text-apple-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
            </div>
            <div className="pt-2 border-t border-apple-gray-200">
              <span className="text-apple-gray-500">Reason:</span>
              <p className="text-[#1C1C1E] mt-0.5">{modal.data.reason}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

