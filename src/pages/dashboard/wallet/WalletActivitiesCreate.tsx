import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

const categoryOptions = ['Training', 'Group', 'Wellness', 'Nutrition', 'Assessment']

export default function WalletActivitiesCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ activityName: '', category: 'Training', price: 0, duration: '', description: '', status: 'Active' })

  const handleSave = () => {
    if (!form.activityName) { toast('Please enter an activity name.', 'error'); return }
    toast('Activity created successfully!', 'success')
    navigate('/dashboard/wallet/activities')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/wallet/activities')} className="p-2 rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-apple-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-[#1C1C1E]">Create Activity</h1><p className="text-xs text-apple-gray-500 mt-0.5">Add a new billable activity.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.activityName} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-apple-gray-200 bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Activity Name *</label>
          <input value={form.activityName} onChange={e => setForm(p => ({ ...p, activityName: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="PT Session" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {categoryOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Price (₹)</label>
            <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: parseInt(e.target.value) || 0 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Duration</label>
            <input value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="60 min" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Brief description of the activity." />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.activityName} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/wallet/activities')} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
