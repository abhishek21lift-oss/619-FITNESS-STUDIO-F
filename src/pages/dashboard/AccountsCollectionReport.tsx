import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Wallet, Plus, Search, Download, Eye, FileText } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Collection {
  id: number
  date: string
  member: string
  plan: string
  amount: number
  paymentMethod: string
  collectedBy: string
}

const initialData: Collection[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', plan: 'Annual Gold', amount: 7999, paymentMethod: 'UPI', collectedBy: 'Amit' },
  { id: 2, date: '07 Jun 2026', member: 'Priya Singh', plan: 'PT Session', amount: 1500, paymentMethod: 'Cash', collectedBy: 'Neha' },
  { id: 3, date: '06 Jun 2026', member: 'Sneha Patel', plan: 'Annual Platinum', amount: 14999, paymentMethod: 'Card', collectedBy: 'Amit' },
  { id: 4, date: '06 Jun 2026', member: 'Vikram Joshi', plan: 'Quarterly Basic', amount: 3500, paymentMethod: 'Bank Transfer', collectedBy: 'Ravi' },
  { id: 5, date: '05 Jun 2026', member: 'Anita Desai', plan: 'Monthly Premium', amount: 1999, paymentMethod: 'UPI', collectedBy: 'Neha' },
]

const paymentMethods = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']

export default function AccountsCollectionReport() {
  const [data, setData] = useState<Collection[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Collection | null>(null)
  const [form, setForm] = useState({ date: '', member: '', plan: '', amount: '', paymentMethod: 'Cash', collectedBy: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase()) && !d.plan.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalCollection = data.reduce((sum, d) => sum + d.amount, 0)
  const totalTransactions = data.length

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', plan: '', amount: '', paymentMethod: 'Cash', collectedBy: '' })
    setModalOpen(true)
  }

  const openEdit = (item: Collection) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, plan: item.plan, amount: String(item.amount), paymentMethod: item.paymentMethod, collectedBy: item.collectedBy })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.amount) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, date: form.date, member: form.member, plan: form.plan, amount: Number(form.amount), paymentMethod: form.paymentMethod, collectedBy: form.collectedBy } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, date: form.date, member: form.member, plan: form.plan, amount: Number(form.amount), paymentMethod: form.paymentMethod, collectedBy: form.collectedBy }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Plan', 'Amount', 'Payment Method', 'Collected By']
    const rows = filtered.map(d => [d.date, d.member, d.plan, `₹${d.amount}`, d.paymentMethod, d.collectedBy])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `collection-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Collection Report</h1><p className="text-xs text-gray-500 mt-0.5">Daily payment collection summary.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Collection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Collection" value={fmt(totalCollection)} icon={DollarSign} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Transactions" value={totalTransactions} icon={TrendingUp} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Average per Transaction" value={fmt(totalTransactions ? Math.round(totalCollection / totalTransactions) : 0)} icon={Wallet} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search collections..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
          <span className="text-[10px] text-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Payment Method</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Collected By</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.plan}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-400">{fmt(d.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.paymentMethod}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.collectedBy}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'View', onClick: () => {} },
                      { label: 'Edit', onClick: () => openEdit(d) },
                      { label: 'Print Receipt', onClick: () => {}, icon: FileText },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Collection' : 'Add Collection'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
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
              <label className="text-[11px] font-medium text-gray-400">Collected By</label>
              <input value={form.collectedBy} onChange={e => setForm(prev => ({ ...prev, collectedBy: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Staff name..." />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Payment Method</label>
            <select value={form.paymentMethod} onChange={e => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              {paymentMethods.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Collection'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
