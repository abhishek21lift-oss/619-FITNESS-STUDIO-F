import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Plus, Edit3, Trash2, AlertTriangle, Wrench, Archive } from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import ActionMenu from '../../../components/shared/ActionMenu'

interface EquipmentItem {
  id: number
  name: string
  category: string
  purchaseDate: string
  cost: string
  condition: 'New' | 'Good' | 'Fair' | 'Poor'
  status: 'Operational' | 'Maintenance' | 'Retired'
  notes: string
}

const categories = ['Cardio', 'Strength', 'Free Weights', 'Functional', 'Other']

const initialEquipment: EquipmentItem[] = [
  { id: 1, name: 'Treadmill', category: 'Cardio', purchaseDate: '15 Jan 2025', cost: '₹1,50,000', condition: 'Good', status: 'Operational', notes: '' },
  { id: 2, name: 'Squat Rack', category: 'Strength', purchaseDate: '01 Mar 2025', cost: '₹85,000', condition: 'New', status: 'Operational', notes: '' },
  { id: 3, name: 'Dumbbell Set (5-50kg)', category: 'Free Weights', purchaseDate: '20 Feb 2025', cost: '₹1,20,000', condition: 'Good', status: 'Operational', notes: '' },
  { id: 4, name: 'Bench Press', category: 'Strength', purchaseDate: '10 Apr 2025', cost: '₹65,000', condition: 'Fair', status: 'Maintenance', notes: 'Padding needs replacement' },
  { id: 5, name: 'Cable Crossover', category: 'Strength', purchaseDate: '25 May 2025', cost: '₹2,00,000', condition: 'Good', status: 'Operational', notes: '' },
  { id: 6, name: 'Exercise Bike', category: 'Cardio', purchaseDate: '05 Jun 2025', cost: '₹75,000', condition: 'New', status: 'Operational', notes: '' },
  { id: 7, name: 'Leg Press Machine', category: 'Strength', purchaseDate: '10 Jan 2024', cost: '₹1,80,000', condition: 'Poor', status: 'Retired', notes: 'Being replaced' },
]

export default function SettingsEquipment() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(initialEquipment)
  const [activeCategory, setActiveCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<EquipmentItem | null>(null)
  const [form, setForm] = useState({ name: '', category: 'Cardio', purchaseDate: '', cost: '', condition: 'New' as EquipmentItem['condition'], status: 'Operational' as EquipmentItem['status'], notes: '' })

  const openAdd = () => {
    setEditItem(null)
    setForm({ name: '', category: 'Cardio', purchaseDate: '', cost: '', condition: 'New', status: 'Operational', notes: '' })
    setModalOpen(true)
  }

  const openEdit = (item: EquipmentItem) => {
    setEditItem(item)
    setForm({ name: item.name, category: item.category, purchaseDate: item.purchaseDate, cost: item.cost, condition: item.condition, status: item.status, notes: item.notes })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editItem) {
      setEquipment(prev => prev.map(e => e.id === editItem.id ? { ...e, ...form } : e))
    } else {
      setEquipment(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const updateStatus = (id: number, status: EquipmentItem['status']) => {
    setEquipment(prev => prev.map(e => e.id === id ? { ...e, status } : e))
  }

  const removeItem = (id: number) => {
    setEquipment(prev => prev.filter(e => e.id !== id))
  }

  const filtered = activeCategory === 'All' ? equipment : equipment.filter(e => e.category === activeCategory)

  const conditionColors: Record<string, string> = {
    New: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Good: 'text-[#007AFF] bg-blue-500/10 border-blue-500/20',
    Fair: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Poor: 'text-red-400 bg-red-500/10 border-red-500/20',
  }

  const statusColors: Record<string, string> = {
    Operational: 'text-emerald-400 bg-emerald-500/10',
    Maintenance: 'text-amber-400 bg-amber-500/10',
    Retired: 'text-apple-gray-400 bg-gray-500/10',
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Equipment</h1><p className="text-xs text-apple-gray-500 mt-0.5">Track gym equipment inventory.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Equipment</button>
      </div>

      <div className="flex gap-1.5">
        {['All', ...categories].map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${activeCategory === c ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{c}</button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Category</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Purchase Date</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Cost</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Condition</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apple-gray-200/50">
            {filtered.map((e, i) => (
              <motion.tr key={e.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><Dumbbell className="w-3.5 h-3.5 text-apple-gray-500" /><span className="text-xs font-medium text-[#1C1C1E]">{e.name}</span></div></td>
                <td className="px-4 py-3"><span className="text-[10px] font-medium text-apple-gray-600 bg-white/5 px-2 py-0.5 rounded-md">{e.category}</span></td>
                <td className="px-4 py-3 text-xs text-apple-gray-400">{e.purchaseDate}</td>
                <td className="px-4 py-3 text-xs text-apple-blue">{e.cost}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${conditionColors[e.condition]}`}>
                    {e.condition === 'Poor' && <AlertTriangle className="w-3 h-3" />}
                    {e.condition}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${statusColors[e.status]}`}>
                    {e.status === 'Maintenance' && <Wrench className="w-3 h-3" />}
                    {e.status === 'Retired' && <Archive className="w-3 h-3" />}
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionMenu actions={[
                    { label: 'Edit', icon: Edit3, onClick: () => openEdit(e) },
                    { label: 'Mark Maintenance', icon: Wrench, onClick: () => updateStatus(e.id, 'Maintenance') },
                    { label: 'Mark Retired', icon: Archive, onClick: () => updateStatus(e.id, 'Retired') },
                    { label: 'Mark Operational', icon: Dumbbell, onClick: () => updateStatus(e.id, 'Operational'), color: 'text-emerald-400' },
                    { label: 'Delete', icon: Trash2, onClick: () => removeItem(e.id), color: 'text-red-400' },
                  ]} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Equipment' : 'Add Equipment'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Equipment Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Equipment name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Purchase Date</label>
              <input type="date" value={form.purchaseDate} onChange={e => setForm(p => ({ ...p, purchaseDate: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Cost</label>
              <input value={form.cost} onChange={e => setForm(p => ({ ...p, cost: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="₹1,50,000" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Condition</label>
              <select value={form.condition} onChange={e => setForm(p => ({ ...p, condition: e.target.value as EquipmentItem['condition'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>New</option><option>Good</option><option>Fair</option><option>Poor</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as EquipmentItem['status'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Operational</option><option>Maintenance</option><option>Retired</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editItem ? 'Update' : 'Add'} Equipment</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

