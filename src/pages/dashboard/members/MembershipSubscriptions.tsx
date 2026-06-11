import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Eye, RefreshCw, ArrowUpRight, XCircle, Bell, Layers, Users, AlertTriangle } from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import ActionMenu from '../../../components/shared/ActionMenu'
import StatsCard from '../../../components/shared/StatsCard'
import { useToast } from '../../../components/ui/Toast'

interface Sub {
  id: string
  member: string
  plan: string
  startDate: string
  endDate: string
  amount: string
  status: 'Active' | 'Expired' | 'About to Expire'
}

const initialSubs: Sub[] = [
  { id: 'SUB-001', member: 'Rahul Sharma', plan: 'Annual Gold', startDate: '01 Jan 2026', endDate: '31 Dec 2026', amount: '₹7,999', status: 'Active' },
  { id: 'SUB-002', member: 'Priya Singh', plan: 'Monthly Basic', startDate: '15 Jun 2026', endDate: '14 Jul 2026', amount: '₹999', status: 'Active' },
  { id: 'SUB-003', member: 'Amit Verma', plan: 'Quarterly Pro', startDate: '01 Mar 2026', endDate: '31 May 2026', amount: '₹2,499', status: 'Expired' },
  { id: 'SUB-004', member: 'Sneha Patel', plan: 'Annual Platinum', startDate: '20 Nov 2025', endDate: '19 Nov 2026', amount: '₹14,999', status: 'Active' },
  { id: 'SUB-005', member: 'Neha Gupta', plan: 'Annual Gold', startDate: '10 Sep 2025', endDate: '09 Sep 2026', amount: '₹7,999', status: 'Active' },
  { id: 'SUB-006', member: 'Vikram Mehta', plan: 'PT Monthly', startDate: '01 Jun 2026', endDate: '30 Jun 2026', amount: '₹2,999', status: 'About to Expire' },
  { id: 'SUB-007', member: 'Anjali Desai', plan: 'Half-Yearly', startDate: '01 Dec 2025', endDate: '31 May 2026', amount: '₹4,499', status: 'Expired' },
  { id: 'SUB-008', member: 'Rohit Kumar', plan: 'Monthly Basic', startDate: '20 Jun 2026', endDate: '19 Jul 2026', amount: '₹999', status: 'Active' },
]

type TabType = 'Active' | 'Expired' | 'About to Expire' | 'All'

export default function MembershipSubscriptions() {
  const navigate = useNavigate()
  const [subs, setSubs] = useState<Sub[]>(initialSubs)
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('All Plans')
  const [statusFilter, setStatusFilter] = useState('All')
  const [activeTab, setActiveTab] = useState<TabType>('All')
  const [renewModal, setRenewModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)
  const [selectedSub, setSelectedSub] = useState<Sub | null>(null)
  const [renewDate, setRenewDate] = useState('')
  const [cancelReason, setCancelReason] = useState('')
  
  const [page, setPage] = useState(1)
  const perPage = 10
  const { toast } = useToast()

  const planOptions = ['All Plans', 'Annual Gold', 'Monthly Basic', 'Quarterly Pro', 'Annual Platinum', 'PT Monthly', 'Half-Yearly']

  const filtered = subs.filter(s => {
    if (activeTab !== 'All' && s.status !== activeTab) return false
    if (search && !s.member.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase())) return false
    if (planFilter !== 'All Plans' && s.plan !== planFilter) return false
    if (statusFilter !== 'All' && s.status !== statusFilter) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const stats = {
    active: subs.filter(s => s.status === 'Active').length,
    expired: subs.filter(s => s.status === 'Expired').length,
    aboutToExpire: subs.filter(s => s.status === 'About to Expire').length,
  }

  const tabs: TabType[] = ['All', 'Active', 'Expired', 'About to Expire']
  const tabColors: Record<TabType, string> = { All: 'text-[#007AFF] border-blue-400', Active: 'text-emerald-400 border-emerald-400', Expired: 'text-red-400 border-red-400', 'About to Expire': 'text-amber-400 border-amber-400' }

  const handleRenew = () => {
    if (!selectedSub || !renewDate) return
    setSubs(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Active', startDate: renewDate, endDate: '' } : s))
    setRenewModal(false)
    setSelectedSub(null)
    setRenewDate('')
  }

  const handleCancel = () => {
    if (!selectedSub) return
    setSubs(prev => prev.map(s => s.id === selectedSub.id ? { ...s, status: 'Expired' as const } : s))
    setCancelModal(false)
    setSelectedSub(null)
    setCancelReason('')
  }

  const openRenew = (sub: Sub) => {
    setSelectedSub(sub)
    setRenewDate('')
    setRenewModal(true)
  }

  const openCancel = (sub: Sub) => {
    setSelectedSub(sub)
    setCancelReason('')
    setCancelModal(true)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Subscriptions</h1><p className="text-xs text-apple-gray-500 mt-0.5">All active and expired subscriptions.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-apple-gray-200">
          <Layers className="w-3.5 h-3.5 text-apple-blue" /><span className="text-[10px] font-semibold text-apple-gray-600">{stats.active} Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Active" value={stats.active} icon={Users} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Expired" value={stats.expired} icon={XCircle} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="About to Expire" value={stats.aboutToExpire} icon={AlertTriangle} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
      </div>

      <div className="flex items-center gap-2 border-b border-apple-gray-200 pb-0">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab ? `${tabColors[tab]}` : 'text-apple-gray-500 border-transparent hover:text-apple-gray-600'}`}>{tab}</button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search member or ID..." />
        </div>
        <select value={planFilter} onChange={e => setPlanFilter(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
          {planOptions.map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
          <option>All Status</option>
          <option>Active</option>
          <option>Expired</option>
          <option>About to Expire</option>
        </select>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Start Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">End Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {paged.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><span className="text-xs font-medium text-[#1C1C1E] cursor-pointer hover:text-apple-blue transition-colors" onClick={() => navigate(`/dashboard/members/profile/${encodeURIComponent(s.member)}`)}>{s.member}</span><br /><span className="text-[9px] text-apple-gray-400">{s.id}</span></td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{s.plan}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{s.startDate}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{s.endDate}</td>
                  <td className="px-4 py-3 text-xs text-apple-blue">{s.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      s.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      s.status === 'Expired' ? 'text-red-400 bg-red-500/10 border border-red-500/20' :
                      'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    }`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label="Actions"
                      actions={[
                        { label: 'View', onClick: () => navigate(`/dashboard/members/profile/${encodeURIComponent(s.member)}`), icon: Eye },
                        { label: 'Renew', onClick: () => openRenew(s), icon: RefreshCw },
                        { label: 'Upgrade', onClick: () => toast(`Upgrade ${s.member} from ${s.plan} to a higher tier.`, 'info'), icon: ArrowUpRight },
                        { label: 'Cancel', onClick: () => openCancel(s), icon: XCircle, color: 'text-red-400' },
                        { label: 'Send Reminder', onClick: () => toast(`Reminder sent to ${s.member} regarding subscription expiry.`, 'success'), icon: Bell },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-apple-gray-200 bg-white/[0.02]"><span className="text-[10px] text-apple-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>

      <Modal open={renewModal} onClose={() => setRenewModal(false)} title="Renew Subscription" size="sm">
        <div className="space-y-4">
          <p className="text-xs text-apple-gray-400">Renewing <span className="text-[#1C1C1E] font-medium">{selectedSub?.member}</span> — <span className="text-apple-blue">{selectedSub?.plan}</span></p>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">New Start Date</label>
            <input type="date" value={renewDate} onChange={e => setRenewDate(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleRenew} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">Confirm Renewal</button>
            <button onClick={() => setRenewModal(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={cancelModal} onClose={() => setCancelModal(false)} title="Cancel Subscription" size="sm">
        <div className="space-y-4">
          <p className="text-xs text-apple-gray-400">Cancelling <span className="text-[#1C1C1E] font-medium">{selectedSub?.member}</span> — <span className="text-apple-blue">{selectedSub?.plan}</span></p>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Reason for Cancellation</label>
            <select value={cancelReason} onChange={e => setCancelReason(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option value="">Select reason...</option>
              <option value="Not attending">Not attending</option>
              <option value="Too expensive">Too expensive</option>
              <option value="Moving location">Moving location</option>
              <option value="Medical reasons">Medical reasons</option>
              <option value="Switching gym">Switching gym</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleCancel} className="px-4 py-2 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20">Confirm Cancellation</button>
            <button onClick={() => setCancelModal(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Keep Subscription</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

