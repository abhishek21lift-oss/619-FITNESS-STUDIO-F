import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

export default function AppSettingsBannerCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ title: '', link: '', status: 'Active', startDate: '', endDate: '' })
  const [image, setImage] = useState<File | null>(null)

  const handleSave = () => {
    if (!form.title) { toast('Please enter a banner title.', 'error'); return }
    toast('Banner created successfully!', 'success')
    navigate('/dashboard/app-settings/banner')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/app-settings/banner')} className="p-2 rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-white">Create Banner</h1><p className="text-xs text-gray-500 mt-0.5">Add a new promotional banner.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.title} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-ydl-dark-border bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Banner Title *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Summer Sale 2026" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Banner Image</label>
          <label className="border-2 border-dashed border-ydl-dark-border rounded-lg p-8 text-center hover:border-ydl-yellow/30 transition-colors cursor-pointer block">
            <Image className="w-10 h-10 text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500">{image ? image.name : 'Click to upload image'}</p>
            <p className="text-[9px] text-gray-600 mt-1">Recommended: 1200x400px</p>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="hidden" />
          </label>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Link URL</label>
          <input value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="https://yourdigitallift.com/offer" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Status</label>
          <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
            <option>Active</option><option>Inactive</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Start Date</label>
            <input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">End Date</label>
            <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.title} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/app-settings/banner')} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
