import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Receipt, TrendingUp, Plus, Search, Download, FileText } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface TaxEntry {
  id: number
  invoiceNo: string
  date: string
  member: string
  taxableAmount: number
  gst: number
  total: number
}

const initialData: TaxEntry[] = [
  { id: 1, invoiceNo: 'INV-001', date: '07 Jun 2026', member: 'Rahul Sharma', taxableAmount: 6779, gst: 1220, total: 7999 },
  { id: 2, invoiceNo: 'INV-002', date: '07 Jun 2026', member: 'Priya Singh', taxableAmount: 1271, gst: 229, total: 1500 },
  { id: 3, invoiceNo: 'INV-003', date: '06 Jun 2026', member: 'Sneha Patel', taxableAmount: 12711, gst: 2288, total: 14999 },
  { id: 4, invoiceNo: 'INV-004', date: '05 Jun 2026', member: 'Vikram Joshi', taxableAmount: 2966, gst: 534, total: 3500 },
  { id: 5, invoiceNo: 'INV-005', date: '04 Jun 2026', member: 'Anita Desai', taxableAmount: 1694, gst: 305, total: 1999 },
]

export default function AccountsTaxRegister() {
  const [data, setData] = useState<TaxEntry[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<TaxEntry | null>(null)
  const [form, setForm] = useState({ invoiceNo: '', date: '', member: '', taxableAmount: '', gst: '', total: '' })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase()) && !d.invoiceNo.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalTaxable = data.reduce((s, d) => s + d.taxableAmount, 0)
  const totalGst = data.reduce((s, d) => s + d.gst, 0)
  const totalAmount = data.reduce((s, d) => s + d.total, 0)

  const openAdd = () => {
    setEditItem(null)
    setForm({ invoiceNo: `INV-${String(data.length + 1).padStart(3, '0')}`, date: new Date().toISOString().split('T')[0], member: '', taxableAmount: '', gst: '', total: '' })
    setModalOpen(true)
  }

  const openEdit = (item: TaxEntry) => {
    setEditItem(item)
    setForm({ invoiceNo: item.invoiceNo, date: item.date, member: item.member, taxableAmount: String(item.taxableAmount), gst: String(item.gst), total: String(item.total) })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.total) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, taxableAmount: Number(form.taxableAmount), gst: Number(form.gst), total: Number(form.total) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, invoiceNo: form.invoiceNo, date: form.date, member: form.member, taxableAmount: Number(form.taxableAmount), gst: Number(form.gst), total: Number(form.total) }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Invoice#', 'Date', 'Member', 'Taxable Amount', 'GST', 'Total']
    const rows = filtered.map(d => [d.invoiceNo, d.date, d.member, `₹${d.taxableAmount}`, `₹${d.gst}`, `₹${d.total}`])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `tax-register-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Tax Register</h1><p className="text-xs text-gray-500 mt-0.5">GST/Tax invoice records.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Taxable" value={fmt(totalTaxable)} icon={DollarSign} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Total GST" value={fmt(totalGst)} icon={TrendingUp} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
        <StatsCard label="Total Invoiced" value={fmt(totalAmount)} icon={Receipt} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search invoices..." />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Invoice#</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Taxable Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">GST</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-ydl-yellow">{d.invoiceNo}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{fmt(d.taxableAmount)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-purple-400">{fmt(d.gst)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-400">{fmt(d.total)}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'View', onClick: () => {} },
                      { label: 'Edit', onClick: () => openEdit(d) },
                      { label: 'Print Invoice', onClick: () => {}, icon: FileText },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Invoice' : 'Add Invoice'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Invoice#</label>
              <input value={form.invoiceNo} onChange={e => setForm(prev => ({ ...prev, invoiceNo: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Member</label>
            <input value={form.member} onChange={e => setForm(prev => ({ ...prev, member: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Taxable (₹)</label>
              <input type="number" value={form.taxableAmount} onChange={e => setForm(prev => ({ ...prev, taxableAmount: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">GST (₹)</label>
              <input type="number" value={form.gst} onChange={e => setForm(prev => ({ ...prev, gst: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Total (₹)</label>
              <input type="number" value={form.total} onChange={e => setForm(prev => ({ ...prev, total: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Invoice'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
