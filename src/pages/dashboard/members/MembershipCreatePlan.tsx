import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

const featureOptions = ['Gym Access', 'Cardio', 'Weights', 'Locker', 'Towel', 'PT Session/mo', 'Personal Trainer', 'Diet Consultation', 'Custom Workout Plan', 'Fitness Assessment', 'Progress Tracking', 'Unlimited Access', 'All Equipment', 'Priority Booking']

export default function MembershipCreatePlan() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: '', price: '', duration: '', period: '/mo', status: 'Active' as 'Active' | 'Inactive', features: [] as string[]
  })

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const toggleFeature = (f: string) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(f) ? prev.features.filter(x => x !== f) : [...prev.features, f]
    }))
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    toast('Membership plan created successfully!', 'success')
  }

  const handleSaveClose = () => {
    if (!form.name || !form.price) return
    toast('Membership plan created successfully!', 'success')
    navigate('/dashboard/memberships/plans')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/memberships/plans')} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] bg-white/5 border border-apple-gray-200 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Create Plan</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Add a new membership plan.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Plan Name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Monthly Basic" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Price</label>
            <input value={form.price} onChange={e => set('price', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. ₹999" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Duration</label>
            <input value={form.duration} onChange={e => set('duration', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. 1 Month" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Period</label>
            <select value={form.period} onChange={e => set('period', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option value="/mo">/mo</option>
              <option value="/3mo">/3mo</option>
              <option value="/6mo">/6mo</option>
              <option value="/yr">/yr</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400">Features</label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 rounded-lg bg-white/[0.02] border border-apple-gray-200">
            {featureOptions.map(f => (
              <label key={f} className="flex items-center gap-2 px-2 py-1 text-[11px] text-apple-gray-600 cursor-pointer hover:text-[#1C1C1E] rounded-md hover:bg-apple-gray-100">
                <input type="checkbox" checked={form.features.includes(f)} onChange={() => toggleFeature(f)} className="w-3 h-3 accent-ydl-yellow" />
                {f}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={() => navigate('/dashboard/memberships/plans')} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
