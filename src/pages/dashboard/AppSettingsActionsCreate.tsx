import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Zap, Bell, Mail, MessageSquare, Calendar, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

const iconMap: Record<string, any> = { Zap, Bell, Mail, MessageSquare, Calendar, Shield }
const iconOptions = ['Zap', 'Bell', 'Mail', 'MessageSquare', 'Calendar', 'Shield']

export default function AppSettingsActionsCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', description: '', icon: 'Zap', link: '', status: 'Active' })

  const handleSave = () => {
    if (!form.name) { toast('Please enter an action name.', 'error'); return }
    toast('Action item created successfully!', 'success')
    navigate('/dashboard/app-settings/actions')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/app-settings/actions')} className="p-2 rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-white">Create Action Item</h1><p className="text-xs text-gray-500 mt-0.5">Add a new automated or manual action.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.name} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-ydl-dark-border bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Action Name *</label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Send Birthday Wish" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Brief description of the action." />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Icon</label>
          <div className="flex gap-2">
            {iconOptions.map(io => {
              const Ico = iconMap[io]
              return (
                <button key={io} onClick={() => setForm(p => ({ ...p, icon: io }))} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${form.icon === io ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-white'}`}>
                  <Ico className="w-4 h-4" />
                </button>
              )
            })}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Link / Route</label>
          <input value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="/actions/birthday" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Status</label>
          <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
            <option>Active</option><option>Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/app-settings/actions')} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
