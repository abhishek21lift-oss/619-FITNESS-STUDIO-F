import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Gift, Award, Trophy, Search, Download, ChevronDown,
  CheckCircle, XCircle, Plus, Phone, MessageSquare
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

const statusOptions = ['All', 'Claimed', 'Pending', 'Expired']
const rewardOptions = ['All', '1 Month Free', '₹500 Off', 'PT Session', '₹1000 Off', 'T-Shirt', 'Water Bottle', 'Protein Shake']

const mockReferrals = Array.from({ length: 24 }, (_, i) => ({
  id: `REF-${String(i + 1).padStart(4, '0')}`,
  client: ['Rahul Sharma', 'Priya Singh', 'Neha Gupta', 'Vikram Yadav', 'Ananya Kapoor', 'Rohan Mehra', 'Isha Saxena', 'Manish Tiwari', 'Divya Choudhary', 'Siddharth Pandey', 'Nisha Agarwal', 'Ravi Verma', 'Kavita Singh', 'Dinesh Yadav', 'Meera Joshi', 'Harsh Tiwari', 'Anjali Sharma', 'Saurabh Gupta', 'Pallavi Jain', 'Vivek Saxena', 'Deepak Verma', 'Sunita Sharma', 'Manoj Tiwari', 'Pooja Jain'][i],
  mobile: `+91 9${String(8000 + i * 17).padStart(5, '0')} ${String(10000 + i * 13).padStart(5, '0')}`,
  referred: ['Amit Verma', 'Sneha Patel', 'Arun Kumar', 'Pooja Jain', 'Rohit Singh', 'Kiran Sharma', 'Aryan Gupta', 'Meera Kapoor', 'Rajesh Tiwari', 'Smita Yadav', 'Vijay Malhotra', 'Neetu Saxena'][i % 12],
  referredMobile: `+91 9${String(7000 + i * 23).padStart(5, '0')} ${String(20000 + i * 11).padStart(5, '0')}`,
  date: new Date(2026, 4 + (i % 3), 1 + (i % 28)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  reward: ['1 Month Free', '₹500 Off', 'PT Session', '₹1000 Off', 'T-Shirt', 'Water Bottle', 'Protein Shake'][i % 7],
  status: ['Claimed', 'Pending', 'Expired'][i % 3],
  claimedDate: i % 3 === 0 ? new Date(2026, 4 + (i % 3), 10 + (i % 15)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-',
  note: i % 3 === 1 ? 'Awaiting confirmation' : '-',
}))

export default function MembersReferrals() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [rewardFilter, setRewardFilter] = useState('All')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)

  const claimed = mockReferrals.filter(r => r.status === 'Claimed').length
  const pending = mockReferrals.filter(r => r.status === 'Pending').length
  const totalRewards = mockReferrals.reduce((acc, r) => {
    if (r.reward === '1 Month Free') return acc + 1500
    if (r.reward === '₹500 Off') return acc + 500
    if (r.reward === 'PT Session') return acc + 800
    if (r.reward === '₹1000 Off') return acc + 1000
    return acc + 200
  }, 0)

  const filtered = mockReferrals.filter(r => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false
    if (rewardFilter !== 'All' && r.reward !== rewardFilter) return false
    if (search && !r.client.toLowerCase().includes(search.toLowerCase()) && !r.referred.toLowerCase().includes(search.toLowerCase()) && !r.mobile.includes(search)) return false
    return true
  })

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      Claimed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      Expired: 'text-red-400 bg-red-500/10 border-red-500/20',
    }
    return <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${map[s] || map.Pending}`}>{s === 'Claimed' ? <CheckCircle className="w-3 h-3" /> : s === 'Pending' ? <XCircle className="w-3 h-3" /> : null}{s}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Client Referrals</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track referrals, rewards, and member-driven growth.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => alert(`Exporting ${filtered.length} referrals...`)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={() => setModal({ type: 'add-referral' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3 h-3" /> Add Referral
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-medium text-gray-500 uppercase">Total Referrals</p><p className="text-lg font-bold text-ydl-yellow mt-1">{mockReferrals.length}</p></div><Award className="w-6 h-6 text-ydl-yellow opacity-50" /></div>
        </div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-medium text-gray-500 uppercase">Claimed</p><p className="text-lg font-bold text-emerald-400 mt-1">{claimed}</p></div><CheckCircle className="w-6 h-6 text-emerald-400 opacity-50" /></div>
        </div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-medium text-gray-500 uppercase">Pending</p><p className="text-lg font-bold text-amber-400 mt-1">{pending}</p></div><XCircle className="w-6 h-6 text-amber-400 opacity-50" /></div>
        </div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-medium text-gray-500 uppercase">Reward Value</p><p className="text-lg font-bold text-purple-400 mt-1">₹{totalRewards.toLocaleString()}</p></div><Trophy className="w-6 h-6 text-purple-400 opacity-50" /></div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search client or referred..." />
        </div>
        <div className="flex gap-1.5">
          {statusOptions.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${statusFilter === s ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>{s}</button>
          ))}
        </div>
        <select value={rewardFilter} onChange={e => setRewardFilter(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {rewardOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Client</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Referred</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Reward</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Claimed Date</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-ydl-yellow/10 flex items-center justify-center text-[10px] font-bold text-ydl-yellow">{r.client.split(' ').map(n => n[0]).join('')}</div>
                      <span onClick={() => setModal({ type: 'details', data: r })} className="text-xs font-medium text-white hover:text-ydl-yellow cursor-pointer transition-colors">{r.client}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{r.mobile}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-300">{r.referred}</span>
                      <span className="text-[10px] text-gray-600">{r.referredMobile}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 border border-ydl-yellow/20 rounded-md">
                      <Gift className="w-3 h-3" />{r.reward}
                    </span>
                  </td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{r.claimedDate}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label={<ChevronDown className="w-3 h-3" />}
                      actions={[
                        { label: 'View Details', icon: Award, onClick: () => setModal({ type: 'details', data: r }) },
                        { label: 'Mark Claimed', icon: CheckCircle, onClick: () => setModal({ type: 'mark-claimed', data: r }) },
                        { label: 'Send WhatsApp', icon: MessageSquare, onClick: () => window.open(`https://wa.me/${r.referredMobile.replace(/[^0-9]/g, '')}`, '_blank') },
                        { label: 'Call Client', icon: Phone, onClick: () => window.open(`tel:${r.mobile}`) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10"><p className="text-xs text-gray-500">No referrals found.</p></div>}
      </motion.div>

      <Modal open={modal?.type === 'details'} onClose={() => setModal(null)} title={`Referral: ${modal?.data?.client || ''}`} size="md">
        {modal?.data && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-gray-500">Client:</span> <span className="text-white">{modal.data.client}</span></div>
              <div><span className="text-gray-500">Mobile:</span> <span className="text-white">{modal.data.mobile}</span></div>
              <div><span className="text-gray-500">Referred:</span> <span className="text-white">{modal.data.referred}</span></div>
              <div><span className="text-gray-500">Referred Mobile:</span> <span className="text-white">{modal.data.referredMobile}</span></div>
              <div><span className="text-gray-500">Date:</span> <span className="text-white">{modal.data.date}</span></div>
              <div><span className="text-gray-500">Reward:</span> <span className="text-ydl-yellow">{modal.data.reward}</span></div>
              <div><span className="text-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
              <div><span className="text-gray-500">Claimed:</span> <span className="text-white">{modal.data.claimedDate}</span></div>
            </div>
            <div className="pt-2 border-t border-ydl-dark-border">
              <span className="text-gray-500">Note:</span>
              <p className="text-white mt-1">{modal.data.note || 'No notes'}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'mark-claimed'} onClose={() => setModal(null)} title="Mark as Claimed" size="sm">
        <p className="text-xs text-gray-400">Mark referral reward for <span className="text-white">{modal?.data?.client}</span> as claimed?</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { alert(`Reward marked as claimed for ${modal?.data?.client}`); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><CheckCircle className="w-3 h-3 inline mr-1" /> Mark Claimed</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={modal?.type === 'add-referral'} onClose={() => setModal(null)} title="Add Referral" size="md">
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Client Name</label><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" placeholder="Client name" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Client Mobile</label><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" placeholder="+91" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Referred Name</label><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" placeholder="Referred person" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Reward</label><select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40">{rewardOptions.filter(r => r !== 'All').map(r => <option key={r}>{r}</option>)}</select></div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('Referral added successfully!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3 h-3 inline mr-1" /> Add Referral</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
