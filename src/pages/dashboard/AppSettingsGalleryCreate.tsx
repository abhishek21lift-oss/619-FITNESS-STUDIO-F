import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image, ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

export default function AppSettingsGalleryCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ title: '', description: '', status: 'Active' })
  const [image, setImage] = useState<File | null>(null)

  const handleSave = () => {
    if (!form.title) { toast('Please enter a title.', 'error'); return }
    toast('Gallery image created successfully!', 'success')
    navigate('/dashboard/app-settings/gallery')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/app-settings/gallery')} className="p-2 rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-apple-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-[#1C1C1E]">Create Gallery Image</h1><p className="text-xs text-apple-gray-500 mt-0.5">Add a new image to the gallery.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.title} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-apple-gray-200 bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Title *</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Gym Floor" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Brief description of the image." />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Image</label>
          <label className="border-2 border-dashed border-apple-gray-200 rounded-lg p-8 text-center hover:border-ydl-yellow/30 transition-colors cursor-pointer block">
            <Image className="w-10 h-10 text-apple-gray-400 mx-auto mb-2" />
            <p className="text-xs text-apple-gray-500">{image ? image.name : 'Click to upload image'}</p>
            <p className="text-[9px] text-apple-gray-400 mt-1">Recommended: 1920x1080px</p>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="hidden" />
          </label>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
          <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
            <option>Active</option><option>Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.title} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/app-settings/gallery')} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
