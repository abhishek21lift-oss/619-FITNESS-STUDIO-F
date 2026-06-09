import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Users, Plus, Search, Download, CheckCircle } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Subscription {
  id: number
  date: string
  member: string
  plan: string
  start: string
  end: string
  amount: number
  status: 'Active' | 'Expired' | 'Cancelled'
}

const initialData: Subscription[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', plan: 'Annual Gold', start: '07 Jun 2026', end: '06 Jun 2027', amount: 7999, status: 'Active' },
  { id: 2, date: '07 Jun 2026', member: 'Priya Singh', plan: 'Monthly Premium', start: '07 Jun 2026', end: '06 Jul 2026', amount: 1999, status: 'Active' },
  { id: 3, date: '01 Jan 2026', member: 'Amit Verma', plan: 'Quarterly Basic', start: '01 Jan 2026', end: '31 Mar 2026', amount: 3500, status: 'Expired' },
  { id: 4, date: '15 May 2026', member: 'Deepak Yadav', plan: 'Annual Platinum', start: '15 May 2026', end: '14 May 2027', amount: 14999, status: 'Active' },
  { id: 5, date: '20 Apr 2026', member: 'Neha Kapoor', plan: 'Monthly Basic', start: '20 Apr 2026', end: '19 May 2026', amount: 999, status: 'Cancelled' },
]

export default function AccountsSubsRegister() {
  const [data, setData] = useState<Subscription[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Subscription | null>(null)
  const [form, setForm] = useState({ date: '', member: '', plan: '', start: '', end: '', amount: '', status: 'Active' as Subscription['status'] })

  const filtered = data.filter(d => {
    if (statusFilter !== 'All' && d.status !== statusFilter) return false
    if (search && !d.member.toLowerCase().includes(search.toLowerCase()) && !d.plan.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalRevenue = data.reduce((sum, d) => sum + d.amount, 0)
  const activeCount = data.filter(d => d.status === 'Active').length

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', plan: '', start: new Date().toISOString().split('T')[0], end: '', amount: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (item: Subscription) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, plan: item.plan, start: item.start, end: item.end, amount: String(item.amount), status: item.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.amount) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, amount: Number(form.amount) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, ...form, amount: Number(form.amount) }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Plan', 'Start', 'End', 'Amount', 'Status']
    const rows = filtered.map(d => [d.date, d.member, d.plan, d.start, d.end, `₹${d.amount}`, d.status])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `subs-register-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Subscription Register</h1><p className="text-xs text-gray-500 mt-0.5">Member subscription records.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Subscription
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Revenue" value={fmt(totalRevenue)} icon={DollarSign} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Active Subscriptions" value={activeCount} icon={CheckCircle} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Total Members" value={data.length} icon={Users} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search subscriptions..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
          <span className="text-[10px] text-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-ydl-dark-border bg-white/[0.02] p-0.5">
          {(['All', 'Active', 'Expired', 'Cancelled'] as const).map(t => (
            <button key={t} onClick={() => setStatusFilter(t)} className={`px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${statusFilter === t ? 'text-black bg-ydl-gradient' : 'text-gray-400 hover:text-white'}`}>{t}</button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Start</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">End</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.plan}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.start}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.end}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-400">{fmt(d.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                      d.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                      d.status === 'Expired' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                      'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                    }`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'View', onClick: () => {} },
                      { label: 'Edit', onClick: () => openEdit(d) },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Subscription' : 'Add Subscription'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Member</label>
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Member name..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Plan</label>
              <input value={form.plan} onChange={e => setForm(prev => ({ ...prev, plan: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Plan name..." />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as Subscription['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Expired</option><option>Cancelled</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Start Date</label>
              <input type="date" value={form.start} onChange={e => setForm(prev => ({ ...prev, start: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">End Date</label>
              <input type="date" value={form.end} onChange={e => setForm(prev => ({ ...prev, end: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Subscription'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
