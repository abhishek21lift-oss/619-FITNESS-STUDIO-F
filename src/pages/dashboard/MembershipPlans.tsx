import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Plus, Copy } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface Plan {
  id: number
  name: string
  price: string
  duration: string
  period: string
  features: string[]
  status: 'Active' | 'Inactive'
  popular: boolean
  color: string
}

const initialPlans: Plan[] = [
  { id: 1, name: 'Monthly Basic', price: '₹999', duration: '1 Month', period: '/mo', features: ['Gym Access', 'Cardio', 'Locker'], status: 'Active', popular: false, color: 'from-blue-500/20 to-blue-600/5' },
  { id: 2, name: 'Quarterly Pro', price: '₹2,499', duration: '3 Months', period: '/3mo', features: ['Gym Access', 'Cardio + Weights', 'Locker + Towel', '1 PT Session/mo'], status: 'Active', popular: true, color: 'from-ydl-yellow/20 to-amber-600/5' },
  { id: 3, name: 'Half-Yearly', price: '₹4,499', duration: '6 Months', period: '/6mo', features: ['Gym Access', 'Cardio + Weights', 'Locker + Towel', '2 PT Sessions/mo'], status: 'Active', popular: false, color: 'from-emerald-500/20 to-emerald-600/5' },
  { id: 4, name: 'Annual Gold', price: '₹7,999', duration: '12 Months', period: '/yr', features: ['Unlimited Access', 'All Equipment', 'Locker + Towel', '4 PT Sessions/mo', 'Diet Consultation'], status: 'Active', popular: false, color: 'from-purple-500/20 to-purple-600/5' },
  { id: 5, name: 'PT Monthly', price: '₹2,999', duration: '1 Month', period: '/mo', features: ['Gym Access', 'Personal Trainer', 'Custom Workout Plan'], status: 'Active', popular: false, color: 'from-pink-500/20 to-pink-600/5' },
  { id: 6, name: 'PT 12 Sessions', price: '₹5,999', duration: '12 Sessions', period: '', features: ['12 PT Sessions', 'Fitness Assessment', 'Progress Tracking'], status: 'Active', popular: false, color: 'from-cyan-500/20 to-cyan-600/5' },
]

const featureOptions = ['Gym Access', 'Cardio', 'Weights', 'Locker', 'Towel', 'PT Session/mo', 'Personal Trainer', 'Diet Consultation', 'Custom Workout Plan', 'Fitness Assessment', 'Progress Tracking', 'Unlimited Access', 'All Equipment', 'Priority Booking']

export default function MembershipPlans() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [modalOpen, setModalOpen] = useState(false)
  const [editPlan, setEditPlan] = useState<Plan | null>(null)
  const [form, setForm] = useState({ name: '', price: '', duration: '', features: [] as string[], status: 'Active' as 'Active' | 'Inactive' })

  const openAdd = () => {
    setEditPlan(null)
    setForm({ name: '', price: '', duration: '', features: [], status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (plan: Plan) => {
    setEditPlan(plan)
    setForm({ name: plan.name, price: plan.price, duration: plan.duration, features: [...plan.features], status: plan.status })
    setModalOpen(true)
  }

  const toggleFeature = (f: string) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(f) ? prev.features.filter(x => x !== f) : [...prev.features, f]
    }))
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    if (editPlan) {
      setPlans(prev => prev.map(p => p.id === editPlan.id ? { ...p, name: form.name, price: form.price, duration: form.duration, features: form.features, status: form.status } : p))
    } else {
      const newId = Math.max(...plans.map(p => p.id)) + 1
      setPlans(prev => [...prev, { id: newId, name: form.name, price: form.price, duration: form.duration, period: '', features: form.features, status: form.status, popular: false, color: 'from-gray-500/20 to-gray-600/5' }])
    }
    setModalOpen(false)
  }

  const handleDuplicate = (plan: Plan) => {
    const newId = Math.max(...plans.map(p => p.id)) + 1
    setPlans(prev => [...prev, { ...plan, id: newId, name: `${plan.name} (Copy)`, popular: false }])
  }

  const handleDeactivate = (id: number) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' as const : 'Active' as const } : p))
  }

  const handleDelete = (id: number) => {
    setPlans(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Membership Plans</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage subscription plans and pricing.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" /> Add Plan
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {plans.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative rounded-xl border ${p.popular ? 'border-ydl-yellow/40' : 'border-ydl-dark-border'} bg-gradient-to-br ${p.color} p-5`}
          >
            {p.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[9px] font-bold text-black bg-ydl-gradient rounded-full">
                POPULAR
              </span>
            )}
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-white">{p.name}</h3>
              <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-medium rounded-full ${p.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{p.status}</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-white">{p.price}</span>
              <span className="text-xs text-gray-500">{p.period}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">{p.duration}</p>
            <ul className="mt-4 space-y-2">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Check className="w-3 h-3 text-ydl-yellow" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-ydl-dark-border/50 flex items-center justify-between">
              <button onClick={() => openEdit(p)} className="text-[10px] font-medium text-ydl-yellow hover:underline">Edit Plan</button>
              <ActionMenu
                label="More"
                actions={[
                  { label: 'Edit', onClick: () => openEdit(p) },
                  { label: 'Duplicate', onClick: () => handleDuplicate(p), icon: Copy },
                  { label: p.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => handleDeactivate(p.id) },
                  { label: 'Delete', onClick: () => handleDelete(p.id), color: 'text-red-400' },
                ]}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editPlan ? 'Edit Plan' : 'Add Plan'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Plan Name</label>
              <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Monthly Basic" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Price</label>
              <input value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. ₹999" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Duration</label>
              <input value={form.duration} onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. 1 Month" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Features</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 rounded-lg bg-white/[0.02] border border-ydl-dark-border">
              {featureOptions.map(f => (
                <label key={f} className="flex items-center gap-2 px-2 py-1 text-[11px] text-gray-300 cursor-pointer hover:text-white rounded-md hover:bg-white/5">
                  <input type="checkbox" checked={form.features.includes(f)} onChange={() => toggleFeature(f)} className="w-3 h-3 accent-ydl-yellow" />
                  {f}
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">{editPlan ? 'Update Plan' : 'Create Plan'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
