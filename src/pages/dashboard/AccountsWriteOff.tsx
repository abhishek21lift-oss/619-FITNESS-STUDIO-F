import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, XCircle, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface WriteOff {
  id: number
  date: string
  member: string
  amount: number
  reason: string
  approvedBy: string
}

const initialData: WriteOff[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', amount: 500, reason: 'Membership discount adjustment', approvedBy: 'Admin' },
  { id: 2, date: '06 Jun 2026', member: 'Priya Singh', amount: 250, reason: 'Session cancellation fee waiver', approvedBy: 'Manager' },
  { id: 3, date: '05 Jun 2026', member: 'Sneha Patel', amount: 1000, reason: 'Equipment damage deposit', approvedBy: 'Admin' },
  { id: 4, date: '04 Jun 2026', member: 'Amit Verma', amount: 750, reason: 'Plan downgrade adjustment', approvedBy: 'Manager' },
  { id: 5, date: '03 Jun 2026', member: 'Deepak Yadav', amount: 200, reason: 'Referral bonus', approvedBy: 'Admin' },
]

export default function AccountsWriteOff() {
  const [data, setData] = useState<WriteOff[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<WriteOff | null>(null)
  const [form, setForm] = useState({ date: '', member: '', amount: '', reason: '', approvedBy: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase()) && !d.reason.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalWriteOff = data.reduce((s, d) => s + d.amount, 0)

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', amount: '', reason: '', approvedBy: '' })
    setModalOpen(true)
  }

  const openEdit = (item: WriteOff) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, amount: String(item.amount), reason: item.reason, approvedBy: item.approvedBy })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.reason || !form.amount) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, amount: Number(form.amount) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, amount: Number(form.amount), reason: form.reason, approvedBy: form.approvedBy }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Amount', 'Reason', 'Approved By']
    const rows = filtered.map(d => [d.date, d.member, `₹${d.amount}`, d.reason, d.approvedBy])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `writeoffs-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Write Offs</h1><p className="text-xs text-apple-gray-500 mt-0.5">Amounts written off for adjustments.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Write Off
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatsCard label="Total Written Off" value={fmt(totalWriteOff)} icon={DollarSign} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Entries" value={data.length} icon={XCircle} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search write-offs..." />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Reason</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Approved By</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{d.member}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-400">{fmt(d.amount)}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400 max-w-[200px] truncate">{d.reason}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.approvedBy}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Write Off' : 'Add Write Off'} size="md">
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
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Reason</label>
            <textarea value={form.reason} onChange={e => setForm(prev => ({ ...prev, reason: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Write-off reason..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Approved By</label>
            <input value={form.approvedBy} onChange={e => setForm(prev => ({ ...prev, approvedBy: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-apple-gray-200">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Write Off'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
