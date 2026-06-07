import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Phone, Users, Plus, CheckCircle, XCircle, Edit3, Eye, Star } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface Center {
  id: number
  name: string
  address: string
  phone: string
  email: string
  members: number
  status: 'Active' | 'Inactive'
  isDefault: boolean
}

const initialCenters: Center[] = [
  { id: 1, name: '619 FITNESS STUDIO (Kalyanpur)', address: 'S-21, Kalyanpur, Lucknow', phone: '+91 98765 43210', email: 'kalyanpur@619fitness.com', members: 491, status: 'Active', isDefault: true },
  { id: 2, name: '619 FITNESS STUDIO (Gomti Nagar)', address: 'B-12, Gomti Nagar, Lucknow', phone: '+91 87654 32109', email: 'gomti@619fitness.com', members: 312, status: 'Active', isDefault: false },
  { id: 3, name: '619 FITNESS STUDIO (Indira Nagar)', address: 'C-45, Indira Nagar, Lucknow', phone: '+91 76543 21098', email: 'indira@619fitness.com', members: 188, status: 'Active', isDefault: false },
]

export default function SettingsFitnessCenters() {
  const [centers, setCenters] = useState<Center[]>(initialCenters)
  const [modalOpen, setModalOpen] = useState(false)
  const [editCenter, setEditCenter] = useState<Center | null>(null)
  const [form, setForm] = useState({ name: '', address: '', phone: '', email: '', status: 'Active' as 'Active' | 'Inactive' })
  const [detailOpen, setDetailOpen] = useState<Center | null>(null)

  const openAdd = () => {
    setEditCenter(null)
    setForm({ name: '', address: '', phone: '', email: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (c: Center) => {
    setEditCenter(c)
    setForm({ name: c.name, address: c.address, phone: c.phone, email: c.email, status: c.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editCenter) {
      setCenters(prev => prev.map(c => c.id === editCenter.id ? { ...c, ...form } : c))
    } else {
      setCenters(prev => [...prev, { ...form, id: Date.now(), members: 0, isDefault: false }])
    }
    setModalOpen(false)
  }

  const toggleStatus = (id: number) => {
    setCenters(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c))
  }

  const setDefault = (id: number) => {
    setCenters(prev => prev.map(c => ({ ...c, isDefault: c.id === id })))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">My Fitness Centers</h1><p className="text-xs text-gray-500 mt-0.5">Manage your gym branches.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Center</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {centers.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 relative">
            {c.isDefault && <span className="absolute top-2 right-2 text-[8px] font-bold text-black bg-ydl-yellow px-1.5 py-0.5 rounded">DEFAULT</span>}
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center"><Briefcase className="w-5 h-5 text-ydl-yellow" /></div>
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(c) },
                { label: 'View Details', icon: Eye, onClick: () => setDetailOpen(c) },
                { label: c.isDefault ? 'Default' : 'Set as Default', icon: Star, onClick: () => setDefault(c.id) },
                { label: c.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => toggleStatus(c.id), color: c.status === 'Active' ? 'text-red-400' : 'text-emerald-400' },
              ]} />
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{c.name}</h3>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] text-gray-400"><MapPin className="w-3 h-3 text-gray-500" />{c.address}</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400"><Phone className="w-3 h-3 text-gray-500" />{c.phone}</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400"><Users className="w-3 h-3 text-gray-500" />{c.members} members</div>
            </div>
            <div className="mt-3 pt-3 border-t border-ydl-dark-border">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${
                c.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'
              }`}>
                {c.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {c.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editCenter ? 'Edit Center' : 'Add Center'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Center Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="619 FITNESS STUDIO (Branch)" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Address</label>
            <input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Full address" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Phone</label>
              <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Phone number" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Email</label>
              <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Email address" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as 'Active' | 'Inactive' }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editCenter ? 'Update' : 'Add'} Center</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={!!detailOpen} onClose={() => setDetailOpen(null)} title={detailOpen?.name || 'Center Details'} size="md">
        {detailOpen && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-gray-400"><MapPin className="w-3.5 h-3.5 text-ydl-yellow" />{detailOpen.address}</div>
            <div className="flex items-center gap-2 text-xs text-gray-400"><Phone className="w-3.5 h-3.5 text-ydl-yellow" />{detailOpen.phone}</div>
            <div className="flex items-center gap-2 text-xs text-gray-400"><Mail className="w-3.5 h-3.5 text-ydl-yellow" />{detailOpen.email}</div>
            <div className="flex items-center gap-2 text-xs text-gray-400"><Users className="w-3.5 h-3.5 text-ydl-yellow" />{detailOpen.members} members</div>
            <div className="pt-3 border-t border-ydl-dark-border">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${detailOpen.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{detailOpen.status}</span>
              {detailOpen.isDefault && <span className="ml-2 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-2 py-0.5 rounded">Default Center</span>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function Mail(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  )
}
