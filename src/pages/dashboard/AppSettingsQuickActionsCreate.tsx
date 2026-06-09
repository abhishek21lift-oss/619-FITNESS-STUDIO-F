import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Zap, Bell, Mail, MessageSquare, Calendar, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

const iconMap: Record<string, any> = { Zap, Bell, Mail, MessageSquare, Calendar, Shield }
const iconOptions = ['Zap', 'Bell', 'Mail', 'MessageSquare', 'Calendar', 'Shield']

export default function AppSettingsQuickActionsCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', icon: 'Zap', route: '', status: 'Active', order: 1 })

  const handleSave = () => {
    if (!form.name) { toast('Please enter an action name.', 'error'); return }
    toast('Quick action created successfully!', 'success')
    navigate('/dashboard/app-settings/quick-actions')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/app-settings/quick-actions')} className="p-2 rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-apple-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-[#1C1C1E]">Create Quick Action</h1><p className="text-xs text-apple-gray-500 mt-0.5">Add a new button to the quick action bar.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.name} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-apple-gray-200 bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Action Name *</label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Quick Check-in" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Icon</label>
          <div className="flex gap-2">
            {iconOptions.map(io => {
              const Ico = iconMap[io]
              return (
                <button key={io} onClick={() => setForm(p => ({ ...p, icon: io }))} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${form.icon === io ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-[#1C1C1E]'}`}>
                  <Ico className="w-4 h-4" />
                </button>
              )
            })}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Route / Link</label>
          <input value={form.route} onChange={e => setForm(p => ({ ...p, route: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="/checkin" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Display Order</label>
            <input type="number" min={1} value={form.order} onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 1 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/app-settings/quick-actions')} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
