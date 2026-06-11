import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import { useToast } from '../../../components/ui/Toast'

const planOptions = ['Monthly Basic', 'Quarterly Pro', 'Half-Yearly', 'Annual Gold', 'Annual Platinum', 'PT Monthly', 'PT 12 Sessions', 'Gym Access Only']

export default function MembershipCreateCombo() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: '', description: '', price: '', duration: '', status: 'Active' as 'Active' | 'Inactive', plansIncluded: [] as string[]
  })

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const togglePlan = (plan: string) => {
    setForm(prev => ({
      ...prev,
      plansIncluded: prev.plansIncluded.includes(plan) ? prev.plansIncluded.filter(p => p !== plan) : [...prev.plansIncluded, plan]
    }))
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    toast('Combo offer created successfully!', 'success')
  }

  const handleSaveClose = () => {
    if (!form.name || !form.price) return
    toast('Combo offer created successfully!', 'success')
    navigate('/dashboard/memberships/combo')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/memberships/combo')} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] bg-white/5 border border-apple-gray-200 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Create Combo</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Add a new combo offer.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Combo Name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Duo Membership" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Price</label>
            <input value={form.price} onChange={e => set('price', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. ₹1,499" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Duration</label>
            <input value={form.duration} onChange={e => set('duration', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. 1 Month" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[50px] resize-none" placeholder="Combo description..." />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Plans Included</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 rounded-lg bg-white/[0.02] border border-apple-gray-200">
              {planOptions.map(p => (
                <label key={p} className="flex items-center gap-2 px-2 py-1 text-[11px] text-apple-gray-600 cursor-pointer hover:text-[#1C1C1E] rounded-md hover:bg-apple-gray-100">
                  <input type="checkbox" checked={form.plansIncluded.includes(p)} onChange={() => togglePlan(p)} className="w-3 h-3 accent-ydl-yellow" />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={() => navigate('/dashboard/memberships/combo')} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

