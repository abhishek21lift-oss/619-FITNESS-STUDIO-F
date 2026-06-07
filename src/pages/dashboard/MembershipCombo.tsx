import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, Percent } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface Combo {
  id: number
  name: string
  price: string
  original: string
  save: string
  plansIncluded: string[]
  active: boolean
}

const initialCombos: Combo[] = [
  { id: 1, name: 'Duo Membership', price: '₹1,499', original: '₹1,998', save: '25%', plansIncluded: ['Monthly Basic x2'], active: true },
  { id: 2, name: 'Family Pack', price: '₹2,999', original: '₹4,996', save: '40%', plansIncluded: ['Monthly Basic x4'], active: true },
  { id: 3, name: 'Student Combo', price: '₹599', original: '₹999', save: '40%', plansIncluded: ['Gym Access Only'], active: true },
  { id: 4, name: 'PT + Diet Bundle', price: '₹2,999', original: '₹3,998', save: '25%', plansIncluded: ['PT Monthly', 'Diet Consultation'], active: false },
  { id: 5, name: 'Premium Duo', price: '₹5,999', original: '₹8,998', save: '33%', plansIncluded: ['Annual Gold x2'], active: true },
]

const planOptions = ['Monthly Basic', 'Quarterly Pro', 'Half-Yearly', 'Annual Gold', 'Annual Platinum', 'PT Monthly', 'PT 12 Sessions']

export default function MembershipCombo() {
  const [combos, setCombos] = useState<Combo[]>(initialCombos)
  const [modalOpen, setModalOpen] = useState(false)
  const [editCombo, setEditCombo] = useState<Combo | null>(null)
  const [form, setForm] = useState({ name: '', price: '', plansIncluded: [] as string[], active: true })

  const openAdd = () => {
    setEditCombo(null)
    setForm({ name: '', price: '', plansIncluded: [], active: true })
    setModalOpen(true)
  }

  const openEdit = (c: Combo) => {
    setEditCombo(c)
    setForm({ name: c.name, price: c.price, plansIncluded: [...c.plansIncluded], active: c.active })
    setModalOpen(true)
  }

  const togglePlan = (plan: string) => {
    setForm(prev => ({
      ...prev,
      plansIncluded: prev.plansIncluded.includes(plan) ? prev.plansIncluded.filter(p => p !== plan) : [...prev.plansIncluded, plan]
    }))
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    if (editCombo) {
      setCombos(prev => prev.map(c => c.id === editCombo.id ? { ...c, name: form.name, price: form.price, plansIncluded: form.plansIncluded, active: form.active } : c))
    } else {
      const newId = Math.max(...combos.map(c => c.id)) + 1
      setCombos(prev => [...prev, { id: newId, name: form.name, price: form.price, original: '', save: '', plansIncluded: form.plansIncluded, active: form.active }])
    }
    setModalOpen(false)
  }

  const handleDeactivate = (id: number) => {
    setCombos(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c))
  }

  const handleDelete = (id: number) => {
    setCombos(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Combo Offers</h1><p className="text-xs text-gray-500 mt-0.5">Bundle deals and special packages.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Combo</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {combos.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`rounded-xl border ${c.active ? 'border-ydl-dark-border' : 'border-red-500/20'} bg-white/[0.02] p-4`}>
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-white">{c.name}</h3>
              {c.save && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                  <Percent className="w-2.5 h-2.5" />Save {c.save}
                </span>
              )}
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-ydl-yellow">{c.price}</span>
              {c.original && <span className="text-xs text-gray-500 line-through ml-2">{c.original}</span>}
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-[10px] font-medium text-gray-500">Plans Included:</p>
              {c.plansIncluded.map(p => (
                <div key={p} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <Check className="w-3 h-3 text-ydl-yellow" />{p}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-ydl-dark-border">
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full ${c.active ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{c.active ? 'Active' : 'Inactive'}</span>
              <ActionMenu
                label="Manage"
                actions={[
                  { label: 'Edit', onClick: () => openEdit(c) },
                  { label: c.active ? 'Deactivate' : 'Activate', onClick: () => handleDeactivate(c.id) },
                  { label: 'Delete', onClick: () => handleDelete(c.id), color: 'text-red-400' },
                ]}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editCombo ? 'Edit Combo' : 'Add Combo'} size="md">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Combo Name</label>
            <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Duo Membership" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Combo Price</label>
            <input value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. ₹1,499" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Select Plans</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 rounded-lg bg-white/[0.02] border border-ydl-dark-border">
              {planOptions.map(p => (
                <label key={p} className="flex items-center gap-2 px-2 py-1 text-[11px] text-gray-300 cursor-pointer hover:text-white rounded-md hover:bg-white/5">
                  <input type="checkbox" checked={form.plansIncluded.includes(p)} onChange={() => togglePlan(p)} className="w-3 h-3 accent-ydl-yellow" />
                  {p}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))} className="w-3.5 h-3.5 accent-ydl-yellow" />
              Active
            </label>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">{editCombo ? 'Update Combo' : 'Create Combo'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
