import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, DollarSign, CheckCircle, Plus, Search, Download, FileText } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface CourseOrder {
  id: number
  orderNo: string
  date: string
  member: string
  course: string
  amount: number
  status: 'Completed' | 'Pending' | 'Cancelled'
}

const initialData: CourseOrder[] = [
  { id: 1, orderNo: 'ORD-001', date: '07 Jun 2026', member: 'Rahul Sharma', course: 'Nutrition Certification', amount: 2999, status: 'Completed' },
  { id: 2, orderNo: 'ORD-002', date: '07 Jun 2026', member: 'Priya Singh', course: 'Yoga Instructor', amount: 4999, status: 'Pending' },
  { id: 3, orderNo: 'ORD-003', date: '06 Jun 2026', member: 'Sneha Patel', course: 'Personal Training', amount: 7999, status: 'Completed' },
  { id: 4, orderNo: 'ORD-004', date: '05 Jun 2026', member: 'Amit Verma', course: 'Nutrition Certification', amount: 2999, status: 'Cancelled' },
  { id: 5, orderNo: 'ORD-005', date: '04 Jun 2026', member: 'Deepak Yadav', course: 'Strength Coach', amount: 5999, status: 'Completed' },
]

export default function AccountsCourseOrders() {
  const [data, setData] = useState<CourseOrder[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<CourseOrder | null>(null)
  const [form, setForm] = useState({ orderNo: '', date: '', member: '', course: '', amount: '', status: 'Pending' as CourseOrder['status'] })

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase()) && !d.course.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalRevenue = data.filter(d => d.status === 'Completed').reduce((s, d) => s + d.amount, 0)
  const completedCount = data.filter(d => d.status === 'Completed').length

  const openAdd = () => {
    setEditItem(null)
    setForm({ orderNo: `ORD-${String(data.length + 1).padStart(3, '0')}`, date: new Date().toISOString().split('T')[0], member: '', course: '', amount: '', status: 'Pending' })
    setModalOpen(true)
  }

  const openEdit = (item: CourseOrder) => {
    setEditItem(item)
    setForm({ orderNo: item.orderNo, date: item.date, member: item.member, course: item.course, amount: String(item.amount), status: item.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.member || !form.course || !form.amount) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form, amount: Number(form.amount) } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, ...form, amount: Number(form.amount) }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Order#', 'Date', 'Member', 'Course', 'Amount', 'Status']
    const rows = filtered.map(d => [d.orderNo, d.date, d.member, d.course, `₹${d.amount}`, d.status])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `course-orders-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Course Orders</h1><p className="text-xs text-gray-500 mt-0.5">Course and certification purchases.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Course Revenue" value={fmt(totalRevenue)} icon={DollarSign} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Completed Orders" value={completedCount} icon={CheckCircle} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Total Orders" value={data.length} icon={BookOpen} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search orders..." />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Order#</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Course</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-ydl-yellow">{d.orderNo}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.course}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-400">{fmt(d.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                      d.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                      d.status === 'Pending' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                      'text-red-400 bg-red-500/10 border-red-500/20'
                    }`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'View', onClick: () => {} },
                      { label: 'Edit', onClick: () => openEdit(d) },
                      { label: 'Invoice', onClick: () => {}, icon: FileText },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Order' : 'Add Course Order'} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Order#</label>
              <input value={form.orderNo} onChange={e => setForm(prev => ({ ...prev, orderNo: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40" />
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Course</label>
              <input value={form.course} onChange={e => setForm(prev => ({ ...prev, course: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="0" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as CourseOrder['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option>Pending</option><option>Completed</option><option>Cancelled</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Order'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
