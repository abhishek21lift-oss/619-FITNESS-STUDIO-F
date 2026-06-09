import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Dumbbell } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface Service {
  id: number
  name: string
  category: string
  price: string
  duration: string
  description: string
  status: 'Active' | 'Inactive'
}

const categories = ['Training', 'Nutrition', 'Assessment', 'Wellness', 'Recovery', 'Other']

const initialServices: Service[] = [
  { id: 1, name: 'Personal Training', duration: '60 min', price: '₹500', category: 'Training', description: 'One-on-one personal training session with certified trainer.', status: 'Active' },
  { id: 2, name: 'Diet Consultation', duration: '45 min', price: '₹800', category: 'Nutrition', description: 'Personalized diet plan consultation with nutritionist.', status: 'Active' },
  { id: 3, name: 'Body Composition', duration: '30 min', price: '₹300', category: 'Assessment', description: 'Full body composition analysis with detailed report.', status: 'Active' },
  { id: 4, name: 'Sauna Access', duration: '30 min', price: '₹200', category: 'Wellness', description: 'Access to premium sauna room.', status: 'Active' },
  { id: 5, name: 'Steam Room', duration: '30 min', price: '₹150', category: 'Wellness', description: 'Access to steam room facilities.', status: 'Inactive' },
  { id: 6, name: 'Massage Therapy', duration: '45 min', price: '₹600', category: 'Recovery', description: 'Sports massage for muscle recovery.', status: 'Active' },
]

export default function AppSettingsServices() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [modalOpen, setModalOpen] = useState(false)
  const [editService, setEditService] = useState<Service | null>(null)
  const [form, setForm] = useState({ name: '', category: 'Training', price: '', duration: '', description: '', status: 'Active' as Service['status'] })

  const openAdd = () => {
    setEditService(null)
    setForm({ name: '', category: 'Training', price: '', duration: '', description: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (s: Service) => {
    setEditService(s)
    setForm({ name: s.name, category: s.category, price: s.price, duration: s.duration, description: s.description, status: s.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editService) {
      setServices(prev => prev.map(s => s.id === editService.id ? { ...s, ...form } : s))
    } else {
      setServices(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const toggleStatus = (id: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s))
  }

  const removeService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Services List</h1><p className="text-xs text-apple-gray-500 mt-0.5">Additional services offered at the gym.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Service</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-apple-blue/10 border border-ydl-yellow/20 flex items-center justify-center"><Dumbbell className="w-5 h-5 text-apple-blue" /></div>
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(s) },
                { label: s.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => toggleStatus(s.id), color: s.status === 'Active' ? 'text-red-400' : 'text-emerald-400' },
                { label: 'Delete', icon: Trash2, onClick: () => removeService(s.id), color: 'text-red-400' },
              ]} />
            </div>
            <h3 className="text-sm font-bold text-[#1C1C1E] mt-3">{s.name}</h3>
            <p className="text-[10px] text-apple-gray-500 mt-1 line-clamp-2">{s.description}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-apple-gray-200">
              <div>
                <p className="text-sm font-bold text-apple-blue">{s.price}</p>
                <p className="text-[9px] text-apple-gray-500">{s.duration}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-medium text-apple-gray-600 bg-white/5 px-2 py-0.5 rounded-md">{s.category}</span>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-medium rounded-md ${s.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-apple-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{s.status}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editService ? 'Edit Service' : 'Add Service'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Service Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Service name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Service['status'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Price</label>
              <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="₹500" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Duration</label>
              <input value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="60 min" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editService ? 'Update' : 'Add'} Service</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
