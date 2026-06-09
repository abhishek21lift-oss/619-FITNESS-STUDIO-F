import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Wallet, Plus, Search, Download } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface CashEntry {
  id: number
  date: string
  member: string
  description: string
  amount: number
  balance: number
}

const initialData: CashEntry[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', description: 'Membership payment', amount: 7999, balance: 125000 },
  { id: 2, date: '07 Jun 2026', member: 'Priya Singh', description: 'PT session fee', amount: 1500, balance: 117001 },
  { id: 3, date: '06 Jun 2026', member: '-', description: 'Electricity bill', amount: -12000, balance: 115501 },
  { id: 4, date: '06 Jun 2026', member: 'Sneha Patel', description: 'Annual Platinum payment', amount: 14999, balance: 127501 },
  { id: 5, date: '05 Jun 2026', member: '-', description: 'Staff salary', amount: -45000, balance: 112502 },
]

export default function AccountsCashRegister() {
  const [data, setData] = useState<CashEntry[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<CashEntry | null>(null)
  const [form, setForm] = useState({ date: '', member: '', description: '', amount: '' })

  const filtered = data.filter(d => {
    if (search && !d.description.toLowerCase().includes(search.toLowerCase()) && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalIn = data.filter(d => d.amount > 0).reduce((s, d) => s + d.amount, 0)
  const totalOut = data.filter(d => d.amount < 0).reduce((s, d) => s + Math.abs(d.amount), 0)
  const runningBalance = data[data.length - 1]?.balance || 0

  const openAdd = () => {
    setEditItem(null)
    setForm({ date: new Date().toISOString().split('T')[0], member: '', description: '', amount: '' })
    setModalOpen(true)
  }

  const openEdit = (item: CashEntry) => {
    setEditItem(item)
    setForm({ date: item.date, member: item.member, description: item.description, amount: String(Math.abs(item.amount)) })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.description || !form.amount) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, date: form.date, member: form.member, description: form.description, amount: Number(form.amount) } : d))
    } else {
      const newId = Math.max(...data.map(d => d.id), 0) + 1
      const amt = Number(form.amount)
      const lastBalance = data[data.length - 1]?.balance || 0
      setData(prev => [...prev, { id: newId, date: form.date, member: form.member, description: form.description, amount: amt, balance: lastBalance + amt }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Date', 'Member', 'Description', 'Amount', 'Balance']
    const rows = filtered.map(d => [d.date, d.member, d.description, `₹${d.amount}`, `₹${d.balance}`])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `cash-register-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Cash Register</h1><p className="text-xs text-gray-500 mt-0.5">Daily cash inflow and outflow.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Cash In" value={fmt(totalIn)} icon={TrendingUp} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Cash Out" value={fmt(totalOut)} icon={TrendingDown} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Running Balance" value={fmt(runningBalance)} icon={Wallet} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search entries..." />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Balance</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.description}</td>
                  <td className={`px-4 py-3 text-xs font-semibold ${d.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{d.amount >= 0 ? '+' : ''}{fmt(d.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{fmt(d.balance)}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Entry' : 'Add Cash Entry'} size="md">
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
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Member name (or -)" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Description</label>
            <input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Enter description..." />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Entry'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
