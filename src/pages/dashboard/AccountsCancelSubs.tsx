import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, XCircle, Users, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface CancelledSub {
  id: number
  date: string
  member: string
  plan: string
  amount: number
  cancelReason: string
  refund: number
}

const initialData: CancelledSub[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', plan: 'Annual Gold', amount: 7999, cancelReason: 'Moving to different city', refund: 5000 },
  { id: 2, date: '06 Jun 2026', member: 'Priya Singh', plan: 'Monthly Premium', amount: 1999, cancelReason: 'Health issues', refund: 999 },
  { id: 3, date: '05 Jun 2026', member: 'Sneha Patel', plan: 'Quarterly Basic', amount: 3500, cancelReason: 'Dissatisfied with service', refund: 2000 },
  { id: 4, date: '04 Jun 2026', member: 'Amit Verma', plan: 'Annual Platinum', amount: 14999, cancelReason: 'Financial constraints', refund: 10000 },
  { id: 5, date: '03 Jun 2026', member: 'Deepak Yadav', plan: 'Monthly Basic', amount: 999, cancelReason: 'Found another gym', refund: 0 },
]

export default function AccountsCancelSubs() {
  const [data, setData] = useState<CancelledSub[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<CancelledSub | null>(null)
  const [form, setForm] = useState({ date: '', member: '', plan: '', amount: '', cancelReason: '', refund: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase()) && !d.cancelReason.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalCancelled = data.reduce((s, d) => s + d.amount, 0)
  const totalRefund = data.reduce((s, d) => s + d.refund, 0)

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', plan: '', amount: '', cancelReason: '', refund: '' })
    setModalOpen(true)
  }

  const openEdit = (item: CancelledSub) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, plan: item.plan, amount: String(item.amount), cancelReason: item.cancelReason, refund: String(item.refund) })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.amount) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, amount: Number(form.amount), refund: Number(form.refund) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, plan: form.plan, amount: Number(form.amount), cancelReason: form.cancelReason, refund: Number(form.refund) }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Plan', 'Amount', 'Cancel Reason', 'Refund']
    const rows = filtered.map(d => [d.date, d.member, d.plan, `₹${d.amount}`, d.cancelReason, `₹${d.refund}`])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `cancelled-subs-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Cancelled Subscriptions</h1><p className="text-xs text-apple-gray-500 mt-0.5">Cancelled memberships and refunds.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Cancellation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Cancelled" value={fmt(totalCancelled)} icon={DollarSign} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Total Refunded" value={fmt(totalRefund)} icon={XCircle} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" />
        <StatsCard label="Cancellations" value={data.length} icon={Users} color="from-yellow-500/20 to-yellow-600/5" border="border-yellow-500/30" text="text-yellow-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search cancellations..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark]" />
          <span className="text-[10px] text-apple-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark]" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Cancel Reason</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Refund</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.plan}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-400">{fmt(d.amount)}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400 max-w-[200px] truncate">{d.cancelReason}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-orange-400">{fmt(d.refund)}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Cancellation' : 'Add Cancellation'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Member</label>
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Plan</label>
              <input value={form.plan} onChange={e => setForm(prev => ({ ...prev, plan: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-apple-gray-400">Refund (₹)</label>
              <input type="number" value={form.refund} onChange={e => setForm(prev => ({ ...prev, refund: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Cancel Reason</label>
            <textarea value={form.cancelReason} onChange={e => setForm(prev => ({ ...prev, cancelReason: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Cancellation'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
