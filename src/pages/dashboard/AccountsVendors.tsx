import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Phone, Plus, Search, Download, Mail } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Vendor {
  id: number
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  status: 'Active' | 'Inactive'
}

const initialData: Vendor[] = [
  { id: 1, name: 'FitLife Equipment', contactPerson: 'Rajesh Kumar', phone: '+91-9876543210', email: 'rajesh@fitlife.in', address: 'Mumbai, Maharashtra', status: 'Active' },
  { id: 2, name: 'NutriSupplements', contactPerson: 'Priya Sharma', phone: '+91-8765432109', email: 'priya@nutri.in', address: 'Delhi, NCR', status: 'Active' },
  { id: 3, name: 'GymTech Solutions', contactPerson: 'Amit Verma', phone: '+91-7654321098', email: 'amit@gymtech.in', address: 'Bangalore, Karnataka', status: 'Inactive' },
  { id: 4, name: 'PowerBuild Inc', contactPerson: 'Sneha Patel', phone: '+91-6543210987', email: 'sneha@powerbuild.in', address: 'Pune, Maharashtra', status: 'Active' },
  { id: 5, name: 'CleanPro Services', contactPerson: 'Ravi Yadav', phone: '+91-5432109876', email: 'ravi@cleanpro.in', address: 'Lucknow, UP', status: 'Active' },
]

export default function AccountsVendors() {
  const [data, setData] = useState<Vendor[]>(initialData)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Vendor | null>(null)
  const [form, setForm] = useState({ name: '', contactPerson: '', phone: '', email: '', address: '', status: 'Active' as Vendor['status'] })

  const filtered = data.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.contactPerson.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const activeCount = data.filter(d => d.status === 'Active').length

  const openAdd = () => {
    setEditItem(null)
    setForm({ name: '', contactPerson: '', phone: '', email: '', address: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (item: Vendor) => {
    setEditItem(item)
    setForm({ name: item.name, contactPerson: item.contactPerson, phone: item.phone, email: item.email, address: item.address, status: item.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name) return
    if (editItem) {
      setData(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form } : d))
    } else {
      setData(prev => [...prev, { id: Math.max(...prev.map(d => d.id), 0) + 1, ...form }])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Vendor Name', 'Contact Person', 'Phone', 'Email', 'Address', 'Status']
    const rows = filtered.map(d => [d.name, d.contactPerson, d.phone, d.email, d.address, d.status])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `vendors-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Vendors</h1><p className="text-xs text-gray-500 mt-0.5">Supplier and partner management.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Vendor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Vendors" value={data.length} icon={Building2} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Active" value={activeCount} icon={Users} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Inactive" value={data.length - activeCount} icon={Phone} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
      </div>

      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search vendors..." />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Vendor Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Contact Person</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Phone</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Address</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-white">{d.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.contactPerson}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.phone}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.email}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 max-w-[150px] truncate">{d.address}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                      d.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                      'text-red-400 bg-red-500/10 border-red-500/20'
                    }`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'Edit', onClick: () => openEdit(d) },
                      { label: 'Send Email', onClick: () => {}, icon: Mail },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Vendor' : 'Add Vendor'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Vendor Name</label>
              <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Contact Person</label>
              <input value={form.contactPerson} onChange={e => setForm(prev => ({ ...prev, contactPerson: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Phone</label>
              <input value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="+91-" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Address</label>
              <textarea value={form.address} onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as Vendor['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">{editItem ? 'Update' : 'Add Vendor'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
