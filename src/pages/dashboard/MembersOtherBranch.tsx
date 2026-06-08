import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GitBranch, Search, MapPin, Phone, Eye, Edit3, Trash2,
  MoreHorizontal, Send, Bell, Plus
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

const branches = ['All Branches', 'Gomti Nagar', 'Indira Nagar', 'Hazratganj', 'Aliganj']
const statusOptions = ['All', 'Active', 'Inactive', 'Expired', 'Freeze']

const mockOtherBranchClients = Array.from({ length: 32 }, (_, i) => ({
  id: `OB-${String(i + 1).padStart(4, '0')}`,
  name: ['Manoj Tiwari', 'Sunita Sharma', 'Ravi Kumar', 'Anjali Singh', 'Deepak Verma', 'Kiran Patel', 'Rajesh Yadav', 'Smita Gupta', 'Aakash Singh', 'Neelam Joshi', 'Vijay Kumar', 'Poonam Saxena', 'Ashish Agarwal', 'Ritu Mishra', 'Gaurav Pandey', 'Shweta Choudhary', 'Nitin Verma', 'Komal Singh', 'Sanjay Gupta', 'Anita Yadav', 'Rakesh Sharma', 'Shalini Tiwari', 'Mukesh Jain', 'Pallavi Singh', 'Amit Saxena', 'Sonali Patel', 'Pradeep Yadav', 'Jyoti Sharma', 'Vikas Gupta', 'Neha Singh', 'Rohit Verma', 'Pooja Pandey'][i],
  mobile: `+91 9${String(8000 + i * 15).padStart(5, '0')} ${String(10000 + i * 9).padStart(5, '0')}`,
  email: `client${i + 100}@email.com`,
  branch: ['Gomti Nagar', 'Indira Nagar', 'Hazratganj', 'Aliganj'][i % 4],
  plan: ['Annual Gold', 'Monthly Basic', 'Quarterly Pro', 'Annual Platinum', 'Monthly Pro', 'Quarterly Basic'][i % 6],
  status: ['Active', 'Active', 'Active', 'Inactive', 'Inactive', 'Expired', 'Freeze'][i % 7],
  joinDate: new Date(2025, i % 12, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  expiry: new Date(2026, (i % 12) + 3, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  membershipId: `MEM-${String(5000 + i).padStart(4, '0')}`,
}))

export default function MembersOtherBranch() {
  const [filter, setFilter] = useState('All Branches')
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 25
  const { toast } = useToast()

  const filtered = mockOtherBranchClients.filter(c => {
    if (filter !== 'All Branches' && c.branch !== filter) return false
    if (statusFilter !== 'All' && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.mobile.includes(search)) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const branchCounts = branches.slice(1).reduce((acc: Record<string, number>, b) => {
    acc[b] = mockOtherBranchClients.filter(c => c.branch === b).length
    return acc
  }, {})

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      Active: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Inactive: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      Expired: 'text-red-400 bg-red-500/10 border-red-500/20',
      Freeze: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || styles.Inactive}`}>{s}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Other Branch Members</h1>
          <p className="text-xs text-gray-500 mt-0.5">Members registered at other fitness center branches.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-ydl-dark-border">
            <GitBranch className="w-3.5 h-3.5 text-ydl-yellow" />
            <span className="text-[10px] font-semibold text-gray-300">{mockOtherBranchClients.length} Members</span>
          </div>
          <button onClick={() => toast('Add member to other branch...', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {branches.slice(1).map((b) => (
          <button key={b} onClick={() => setFilter(b)} className={`rounded-xl border p-3 text-left transition-all ${filter === b ? 'border-ydl-yellow/30 bg-ydl-yellow/[0.03]' : 'border-ydl-dark-border bg-white/[0.02] hover:bg-white/[0.04]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${filter === b ? 'text-ydl-yellow' : 'text-gray-500'}`} />
                <span className={`text-xs font-medium ${filter === b ? 'text-ydl-yellow' : 'text-gray-300'}`}>{b}</span>
              </div>
            </div>
            <p className={`text-lg font-bold mt-1 ${filter === b ? 'text-ydl-yellow' : 'text-white'}`}>{branchCounts[b] || 0}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search name or mobile..." />
        </div>
        <div className="flex gap-1.5">
          {statusOptions.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${statusFilter === s ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>{s}</button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {branches.map(b => (
            <button key={b} onClick={() => setFilter(b)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${filter === b ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>{b === 'All Branches' ? 'All' : b}</button>
          ))}
        </div>
        <span className="text-[10px] text-gray-500">{filtered.length} members</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Branch</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Join Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {paged.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-ydl-yellow">{c.membershipId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-ydl-yellow/10 flex items-center justify-center text-[10px] font-bold text-ydl-yellow">{c.name.split(' ').map(n => n[0]).join('')}</div>
                      <span onClick={() => setModal({ type: 'view-profile', data: c })} className="text-xs font-medium text-white hover:text-ydl-yellow cursor-pointer transition-colors">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{c.mobile}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{c.branch}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.plan}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.joinDate}</td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'View Profile', icon: Eye, onClick: () => setModal({ type: 'view-profile', data: c }) },
                        { label: 'Edit', icon: Edit3, onClick: () => setModal({ type: 'edit', data: c }) },
                        { label: 'Send WhatsApp', icon: Send, onClick: () => window.open(`https://wa.me/${c.mobile.replace(/[^0-9]/g, '')}`, '_blank') },
                        { label: 'Send Notification', icon: Bell, onClick: () => setModal({ type: 'notify', data: c }) },
                        { label: 'Delete', icon: Trash2, color: 'text-red-400', onClick: () => setModal({ type: 'delete', data: c }) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10"><p className="text-xs text-gray-500">No members found in this branch.</p></div>}
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-ydl-dark-border bg-white/[0.02]"><span className="text-[10px] text-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>

      <Modal open={modal?.type === 'view-profile'} onClose={() => setModal(null)} title={`Member: ${modal?.data?.name || ''}`} size="lg">
        {modal?.data && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 pb-3 border-b border-ydl-dark-border">
              <div className="w-10 h-10 rounded-full bg-ydl-yellow/10 flex items-center justify-center text-sm font-bold text-ydl-yellow">{modal.data.name.split(' ').map((n: string) => n[0]).join('')}</div>
              <div><h3 className="text-sm font-semibold text-white">{modal.data.name}</h3><p className="text-[11px] text-gray-500">{modal.data.membershipId} • {modal.data.branch}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-gray-500">Mobile:</span> <span className="text-white">{modal.data.mobile}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="text-white">{modal.data.email}</span></div>
              <div><span className="text-gray-500">Branch:</span> <span className="text-white">{modal.data.branch}</span></div>
              <div><span className="text-gray-500">Plan:</span> <span className="text-white">{modal.data.plan}</span></div>
              <div><span className="text-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
              <div><span className="text-gray-500">Join Date:</span> <span className="text-white">{modal.data.joinDate}</span></div>
              <div><span className="text-gray-500">Expiry:</span> <span className="text-white">{modal.data.expiry}</span></div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'edit'} onClose={() => setModal(null)} title={`Edit: ${modal?.data?.name || ''}`} size="md">
        {modal?.data && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Name</label><input defaultValue={modal.data.name} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Mobile</label><input defaultValue={modal.data.mobile} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Plan</label><select defaultValue={modal.data.plan} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40"><option>Annual Gold</option><option>Monthly Basic</option><option>Quarterly Pro</option><option>Annual Platinum</option></select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Status</label><select defaultValue={modal.data.status} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40"><option>Active</option><option>Inactive</option><option>Expired</option><option>Freeze</option></select></div>
            <div className="col-span-2 flex items-center gap-3 pt-2 border-t border-ydl-dark-border mt-2">
              <button onClick={() => { toast('Changes saved!', 'success'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Edit3 className="w-3 h-3 inline mr-1" /> Save</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'notify'} onClose={() => setModal(null)} title={`Send Notification: ${modal?.data?.name || ''}`} size="md">
        <div className="space-y-3">
          <div className="text-[11px] text-gray-500">To: <span className="text-white">{modal?.data?.name}</span> ({modal?.data?.mobile})</div>
          <div className="space-y-1.5"><label className="text-[11px] text-gray-400">Message</label><textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[80px] resize-none" placeholder="Type notification message..." /></div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { toast('Notification sent!', 'success'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Bell className="w-3 h-3 inline mr-1" /> Send</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'delete'} onClose={() => setModal(null)} title="Confirm Delete" size="sm">
        <p className="text-xs text-gray-400">Delete member <span className="text-white">{modal?.data?.name}</span> from this branch list? Data will be preserved.</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { toast(`Member ${modal?.data?.name} deleted.`, 'error'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"><Trash2 className="w-3 h-3 inline mr-1" /> Delete</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
