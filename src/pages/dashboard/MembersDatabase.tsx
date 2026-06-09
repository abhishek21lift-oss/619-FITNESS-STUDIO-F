import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search, Users, Phone, MapPin, MoreHorizontal, Eye, Edit3, Trash2,
  ChevronLeft, ChevronRight, Bell, Send, Download, Filter, ChevronDown,
  UserPlus, CheckCircle, XCircle, MessageSquare
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'
import StatsCard from '../../components/shared/StatsCard'
import FilterBar, { FilterField } from '../../components/shared/FilterBar'
import { membersApi } from '../../api/members'
import { TableSkeleton, StatsCardSkeleton } from '../../components/ui/Skeleton'

const branchOptions = ['All Branches', 'Kalyanpur', 'Gomti Nagar', 'Indira Nagar']
const statusOptions = ['All', 'Active', 'Inactive', 'Expired', 'Freeze']
const genderOptions = ['All', 'Male', 'Female', 'Other']
const clientReps = ['All', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']
const membershipPlans = ['All', 'Annual Gold', 'Monthly Basic', 'Quarterly Pro', 'Annual Platinum', 'Monthly Pro', 'Quarterly Basic', 'Annual Basic', 'Monthly Platinum', 'PT Session', 'Free Trial']

const mockClients = Array.from({ length: 991 }, (_, i) => ({
  id: `MEM-${String(i + 1).padStart(4, '0')}`,
  name: ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Sneha Patel', 'Vikram Yadav', 'Neha Gupta', 'Arun Kumar', 'Pooja Jain', 'Rohan Mehra', 'Ananya Kapoor', 'Karan Malhotra', 'Isha Saxena', 'Manish Tiwari', 'Divya Choudhary', 'Siddharth Pandey', 'Nisha Agarwal', 'Ravi Verma', 'Kavita Singh', 'Dinesh Yadav', 'Meera Joshi', 'Harsh Tiwari', 'Anjali Sharma', 'Saurabh Gupta', 'Pallavi Jain', 'Vivek Saxena'][i % 25],
  mobile: `+91 ${String(90000 + i).slice(0, 5)} ${String(10000 + i).slice(0, 5)}`,
  email: `client${i + 1}@email.com`,
  branch: ['Kalyanpur', 'Gomti Nagar', 'Indira Nagar'][i % 3],
  plan: ['Annual Gold', 'Monthly Basic', 'Quarterly Pro', 'Annual Platinum', 'Monthly Pro', 'Quarterly Basic', 'Annual Basic', 'Monthly Platinum', 'PT Session'][i % 9],
  status: ['Active', 'Active', 'Active', 'Inactive', 'Inactive', 'Expired', 'Freeze'][i % 7],
  joinDate: new Date(2025, i % 12, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  expiry: new Date(2026, (i % 12) + 6, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  gender: ['Male', 'Female', 'Other'][i % 3],
  clientRep: clientReps[(i % 6) + 1],
  amount: 999 + (i % 5) * 500,
}))

export default function MembersDatabase() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState('All')
  const [status, setStatus] = useState('All')
  const [branch, setBranch] = useState('All Branches')
  const [clientRep, setClientRep] = useState('All')
  const [plan, setPlan] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const perPage = 25
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<typeof mockClients>([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersApi.list({ limit: '1000' })
        setMembers(data.members || [])
      } catch {
        setMembers(mockClients)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  const active = members.filter(c => c.status === 'Active').length
  const inactive = members.filter(c => c.status !== 'Active').length

  const filtered = members.filter(c => {
    if (status !== 'All' && c.status !== status) return false
    if (branch !== 'All Branches' && c.branch !== branch) return false
    if (gender !== 'All' && c.gender !== gender) return false
    if (clientRep !== 'All' && c.clientRep !== clientRep) return false
    if (plan !== 'All' && c.plan !== plan) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.mobile.includes(search) && !c.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      Active: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Inactive: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      Expired: 'text-red-400 bg-red-500/10 border-red-500/20',
      Freeze: 'text-[#007AFF] bg-blue-500/10 border-blue-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || styles.Inactive}`}>{s}</span>
  }

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedRows(next)
  }

  if (loading) return <div className="p-4 lg:p-6 space-y-5"><StatsCardSkeleton count={4} /><TableSkeleton rows={10} cols={8} /></div>

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Client Database</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Manage all registered members.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => toast(`Exporting CSV with ${filtered.length} members...`, 'info')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={() => navigate('/dashboard/members/add')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <UserPlus className="w-3 h-3" /> Add Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total Members" value={members.length} icon={Users} color="from-apple-blue/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-apple-blue" index={0} />
        <StatsCard label="Active" value={active} icon={CheckCircle} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Inactive" value={inactive} icon={XCircle} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" index={2} />
        <StatsCard label="Expiring Soon" value={members.filter(c => c.status === 'Active').length} icon={Users} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" index={3} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search by name, mobile or email..." />
        </div>
        <div className="flex gap-1.5">
          {statusOptions.map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1) }} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${status === s ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{s}</button>
          ))}
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-colors ${showFilters ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-400 hover:text-[#1C1C1E]'}`}>
          <Filter className="w-3 h-3" /> Filters <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        <span className="text-[10px] text-apple-gray-500">{filtered.length} of {members.length} members</span>
      </div>

      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4">
          <FilterBar>
            <FilterField label="Gender"><select value={gender} onChange={e => setGender(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 focus:outline-none focus:border-ydl-yellow/30">{genderOptions.map(o => <option key={o}>{o}</option>)}</select></FilterField>
            <FilterField label="Branch"><select value={branch} onChange={e => setBranch(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 focus:outline-none focus:border-ydl-yellow/30">{branchOptions.map(o => <option key={o}>{o}</option>)}</select></FilterField>
            <FilterField label="Member Status"><select value={status} onChange={e => setStatus(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 focus:outline-none focus:border-ydl-yellow/30">{statusOptions.map(o => <option key={o}>{o}</option>)}</select></FilterField>
            <FilterField label="Client Rep"><select value={clientRep} onChange={e => setClientRep(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 focus:outline-none focus:border-ydl-yellow/30">{clientReps.map(o => <option key={o}>{o}</option>)}</select></FilterField>
            <FilterField label="Plan"><select value={plan} onChange={e => setPlan(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 focus:outline-none focus:border-ydl-yellow/30">{membershipPlans.map(o => <option key={o}>{o}</option>)}</select></FilterField>
          </FilterBar>
        </motion.div>
      )}

      <div className="flex items-center gap-2 text-[10px] text-apple-gray-500">
        <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" className="accent-ydl-yellow" /> Show inactive members only</label>
        {selectedRows.size > 0 && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-apple-blue">{selectedRows.size} selected</span>
            <button onClick={() => setModal({ type: 'send-notification' })} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20"><Bell className="w-3 h-3" /> Notify</button>
            <button onClick={() => { toast(`Sending WhatsApp to ${selectedRows.size} members...`, 'info'); }} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20"><Send className="w-3 h-3" /> WhatsApp</button>
          </div>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="w-8 px-3 py-3"><input type="checkbox" onChange={() => { if (selectedRows.size === paged.length) setSelectedRows(new Set()); else setSelectedRows(new Set(paged.map(c => c.id))) }} checked={selectedRows.size === paged.length && paged.length > 0} className="accent-ydl-yellow" /></th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">ID</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Name</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Mobile</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Plan</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Branch</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Join Date</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {paged.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-3"><input type="checkbox" checked={selectedRows.has(c.id)} onChange={() => toggleRow(c.id)} className="accent-ydl-yellow" /></td>
                  <td className="px-3 py-3 text-xs font-medium text-apple-blue">{c.id}</td>
                  <td className="px-3 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-apple-blue/10 flex items-center justify-center text-[10px] font-bold text-apple-blue">{c.name.split(' ').map(n => n[0]).join('')}</div><span onClick={() => navigate(`/dashboard/members/profile/${c.id}`)} className="text-xs font-medium text-[#1C1C1E] hover:text-apple-blue cursor-pointer transition-colors">{c.name}</span></div></td>
                  <td className="px-3 py-3"><div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-apple-gray-500" /><span className="text-xs text-apple-gray-400">{c.mobile}</span></div></td>
                  <td className="px-3 py-3 text-xs text-apple-gray-400">{c.plan}</td>
                  <td className="px-3 py-3"><div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-apple-gray-500" /><span className="text-xs text-apple-gray-400">{c.branch}</span></div></td>
                  <td className="px-3 py-3 text-xs text-apple-gray-400">{c.joinDate}</td>
                  <td className="px-3 py-3">{statusBadge(c.status)}</td>
                  <td className="px-3 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'View Profile', icon: Eye, onClick: () => navigate(`/dashboard/members/profile/${c.id}`) },
                        { label: 'Edit', icon: Edit3, onClick: () => setModal({ type: 'edit', data: c }) },
                        { label: 'Send WhatsApp', icon: MessageSquare, onClick: () => setModal({ type: 'whatsapp', data: c }) },
                        { label: 'Send Notification', icon: Bell, onClick: () => setModal({ type: 'send-notification', data: c }) },
                        { label: 'Delete', icon: Trash2, color: 'text-red-400', onClick: () => setModal({ type: 'delete', data: c }) },
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
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 4))
            const p = start + i
            if (p > totalPages) return null
            return (
              <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 text-[10px] font-medium rounded-lg border transition-colors ${page === p ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-[#1C1C1E]'}`}>
                {p}
              </button>
            )
          })}
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Modal open={modal?.type === 'edit'} onClose={() => setModal(null)} title={`Edit: ${modal?.data?.name || ''}`} size="lg">
        {modal?.data && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Name</label><input defaultValue={modal.data.name} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Mobile</label><input defaultValue={modal.data.mobile} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Email</label><input defaultValue={modal.data.email} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Branch</label><select defaultValue={modal.data.branch} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">{branchOptions.filter(b => b !== 'All Branches').map(b => <option key={b}>{b}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Plan</label><select defaultValue={modal.data.plan} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">{membershipPlans.filter(p => p !== 'All').map(p => <option key={p}>{p}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-apple-gray-500">Status</label><select defaultValue={modal.data.status} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40"><option>Active</option><option>Inactive</option><option>Expired</option><option>Freeze</option></select></div>
            <div className="col-span-2 flex items-center gap-3 pt-3 border-t border-apple-gray-200 mt-2">
              <button onClick={() => { toast(`Changes saved for ${modal?.data?.name}`, 'success'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Edit3 className="w-3 h-3 inline mr-1" /> Save Changes</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'send-notification'} onClose={() => setModal(null)} title="Send Notification" size="md">
        <div className="space-y-3">
          <div className="text-[11px] text-apple-gray-500">To: {modal?.data ? modal.data.name : `${selectedRows.size} selected members`}</div>
          <div className="space-y-1.5"><label className="text-[11px] text-apple-gray-400">Title</label><input className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Notification title" /></div>
          <div className="space-y-1.5"><label className="text-[11px] text-apple-gray-400">Message</label><textarea className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[80px] resize-none" placeholder="Type notification message..." /></div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { toast('Notification sent successfully!', 'success'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Bell className="w-3 h-3 inline mr-1" /> Send</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'whatsapp'} onClose={() => setModal(null)} title={`WhatsApp: ${modal?.data?.name || ''}`} size="md">
        <div className="space-y-3">
          <div className="text-[11px] text-apple-gray-500">To: <span className="text-[#1C1C1E]">{modal?.data?.mobile}</span></div>
          <textarea className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[100px] resize-none" placeholder="Type WhatsApp message..." />
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { toast('WhatsApp message sent!', 'success'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Send className="w-3 h-3 inline mr-1" /> Send</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'delete'} onClose={() => setModal(null)} title="Confirm Delete" size="sm">
        <p className="text-xs text-apple-gray-400">Are you sure you want to delete <span className="text-[#1C1C1E]">{modal?.data?.name}</span>? This action cannot be undone.</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { toast(`Member ${modal?.data?.name} deleted.`, 'error'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-red-500 rounded-lg hover:bg-red-600"><Trash2 className="w-3 h-3 inline mr-1" /> Delete</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
