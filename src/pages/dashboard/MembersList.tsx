import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Users, UserCheck, UserX, MoreHorizontal, Eye, Edit3, Trash2,
  ChevronLeft, ChevronRight, Phone, Calendar,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import ActionMenu from '../../components/shared/ActionMenu'
import Modal from '../../components/shared/Modal'

const mockMembers = Array.from({ length: 45 }, (_, i) => ({
  id: `M-${String(i + 1).padStart(4, '0')}`,
  name: ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Sneha Patel', 'Vikram Yadav', 'Neha Gupta', 'Arun Kumar', 'Pooja Jain', 'Rohan Mehra', 'Ananya Kapoor'][i % 10],
  mobile: `+91 ${String(90000 + i).slice(0, 5)} ${String(10000 + i).slice(0, 5)}`,
  email: `member${i + 1}@email.com`,
  plan: ['Annual Gold', 'Monthly Basic', 'Quarterly Pro', 'Monthly Pro', 'Annual Platinum'][i % 5],
  status: ['Active', 'Active', 'Active', 'Inactive', 'Inactive'][i % 5],
  joinedDate: new Date(2025, i % 12, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
}))

export default function MembersList() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)
  const [members] = useState(mockMembers)
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const perPage = 10

  const active = members.filter(m => m.status === 'Active').length
  const inactive = members.filter(m => m.status !== 'Active').length

  const filtered = members.filter(m => {
    if (status !== 'All' && m.status !== status) return false
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.mobile.includes(search) && !m.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      Active: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Inactive: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || styles.Inactive}`}>{s}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Members List</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">View and manage all registered members.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Members" value={members.length} icon={Users} color="from-apple-blue/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-apple-blue" index={0} />
        <StatsCard label="Active" value={active} icon={UserCheck} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Inactive" value={inactive} icon={UserX} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" index={2} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search by name, mobile or email..." />
        </div>
        <div className="flex gap-1.5">
          {['All', 'Active', 'Inactive'].map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1) }} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${status === s ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{s}</button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Name</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Mobile</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Email</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Plan</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Joined Date</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {paged.map((m, i) => (
                <motion.tr key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-apple-blue/10 flex items-center justify-center text-[10px] font-bold text-apple-blue">{m.name.split(' ').map(n => n[0]).join('')}</div><span className="text-xs font-medium text-[#1C1C1E]">{m.name}</span></div></td>
                  <td className="px-3 py-3"><div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-apple-gray-500" /><span className="text-xs text-apple-gray-400">{m.mobile}</span></div></td>
                  <td className="px-3 py-3 text-xs text-apple-gray-400">{m.email}</td>
                  <td className="px-3 py-3 text-xs text-apple-gray-400">{m.plan}</td>
                  <td className="px-3 py-3">{statusBadge(m.status)}</td>
                  <td className="px-3 py-3"><div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-apple-gray-500" /><span className="text-xs text-apple-gray-400">{m.joinedDate}</span></div></td>
                  <td className="px-3 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'View Profile', icon: Eye, onClick: () => setModal({ type: 'view', data: m }) },
                        { label: 'Edit', icon: Edit3, onClick: () => setModal({ type: 'edit', data: m }) },
                        { label: 'Delete', icon: Trash2, color: 'text-red-400', onClick: () => setModal({ type: 'delete', data: m }) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {paged.length === 0 && <div className="text-center py-10"><p className="text-xs text-apple-gray-500">No members found.</p></div>}
      </motion.div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-apple-gray-500">Page {page} of {totalPages} ({filtered.length} members)</span>
        <div className="flex items-center gap-1">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors"><ChevronLeft className="w-3.5 h-3.5" /></button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 4))
            const p = start + i
            if (p > totalPages) return null
            return <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 text-[10px] font-medium rounded-lg border transition-colors ${page === p ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-[#1C1C1E]'}`}>{p}</button>
          })}
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors"><ChevronRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title={`Member: ${modal?.data?.name || ''}`} size="md">
        {modal?.data && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 pb-3 border-b border-apple-gray-200">
              <div className="w-10 h-10 rounded-full bg-apple-blue/10 flex items-center justify-center text-base font-bold text-apple-blue">{modal.data.name.split(' ').map((n: string) => n[0]).join('')}</div>
              <div><h3 className="text-sm font-semibold text-[#1C1C1E]">{modal.data.name}</h3><p className="text-[10px] text-apple-gray-500">{modal.data.id}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-apple-gray-500">Mobile:</span> <span className="text-[#1C1C1E] ml-1">{modal.data.mobile}</span></div>
              <div><span className="text-apple-gray-500">Email:</span> <span className="text-[#1C1C1E] ml-1">{modal.data.email}</span></div>
              <div><span className="text-apple-gray-500">Plan:</span> <span className="text-[#1C1C1E] ml-1">{modal.data.plan}</span></div>
              <div><span className="text-apple-gray-500">Status:</span> <span className="ml-1">{statusBadge(modal.data.status)}</span></div>
              <div><span className="text-apple-gray-500">Joined:</span> <span className="text-[#1C1C1E] ml-1">{modal.data.joinedDate}</span></div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'edit'} onClose={() => setModal(null)} title={`Edit: ${modal?.data?.name || ''}`} size="md">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Name</label><input defaultValue={modal?.data?.name} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Mobile</label><input defaultValue={modal?.data?.mobile} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Email</label><input defaultValue={modal?.data?.email} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Plan</label><select defaultValue={modal?.data?.plan} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40"><option>Annual Gold</option><option>Monthly Basic</option><option>Quarterly Pro</option><option>Monthly Pro</option><option>Annual Platinum</option></select></div>
          <div className="col-span-2 flex items-center gap-3 pt-3 border-t border-apple-gray-200 mt-2">
            <button onClick={() => { setModal(null) }} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Edit3 className="w-3 h-3 inline mr-1" /> Save Changes</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'delete'} onClose={() => setModal(null)} title="Confirm Delete" size="sm">
        <p className="text-xs text-apple-gray-400">Are you sure you want to delete <span className="text-[#1C1C1E]">{modal?.data?.name}</span>?</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { setModal(null) }} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-red-500 rounded-lg hover:bg-red-600"><Trash2 className="w-3 h-3 inline mr-1" /> Delete</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
