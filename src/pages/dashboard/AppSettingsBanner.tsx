import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image, Plus, Edit3, Trash2, Eye } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface Banner {
  id: number
  title: string
  link: string
  position: 'Top' | 'Middle' | 'Bottom'
  status: 'Active' | 'Inactive'
}

const initialBanners: Banner[] = [
  { id: 1, title: 'Summer Sale 2026', link: 'https://yourdigitallift.com/summer-sale', position: 'Top', status: 'Active' },
  { id: 2, title: 'New Batch Alert', link: 'https://yourdigitallift.com/batches', position: 'Middle', status: 'Active' },
  { id: 3, title: 'Referral Bonus', link: 'https://yourdigitallift.com/referral', position: 'Bottom', status: 'Inactive' },
  { id: 4, title: 'Diwali Offer', link: 'https://yourdigitallift.com/diwali', position: 'Top', status: 'Active' },
]

export default function AppSettingsBanner() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners)
  const [modalOpen, setModalOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewBanner, setPreviewBanner] = useState<Banner | null>(null)
  const [editBanner, setEditBanner] = useState<Banner | null>(null)
  const [form, setForm] = useState({ title: '', link: '', position: 'Top' as Banner['position'], status: 'Active' as Banner['status'] })

  const openAdd = () => {
    setEditBanner(null)
    setForm({ title: '', link: '', position: 'Top', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (b: Banner) => {
    setEditBanner(b)
    setForm({ title: b.title, link: b.link, position: b.position, status: b.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editBanner) {
      setBanners(prev => prev.map(b => b.id === editBanner.id ? { ...b, ...form } : b))
    } else {
      setBanners(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const toggleStatus = (id: number) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b))
  }

  const removeBanner = (id: number) => {
    setBanners(prev => prev.filter(b => b.id !== id))
  }

  const openPreview = (b: Banner) => {
    setPreviewBanner(b)
    setPreviewOpen(true)
  }

  const positionColors: Record<string, string> = {
    Top: 'text-purple-400 bg-purple-500/10',
    Middle: 'text-blue-400 bg-blue-500/10',
    Bottom: 'text-amber-400 bg-amber-500/10',
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Banner Images</h1><p className="text-xs text-gray-500 mt-0.5">Promotional banners for the app.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Banner</button>
      </div>

      <div className="space-y-3">
        {banners.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
            <div className="flex items-start gap-4 p-4">
              <div className="w-28 h-16 rounded-lg bg-gradient-to-br from-ydl-yellow/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center flex-shrink-0">
                <Image className="w-6 h-6 text-ydl-yellow/50" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-white">{b.title}</h3>
                  <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded-md ${positionColors[b.position]}`}>{b.position}</span>
                  <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded-md ${b.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{b.status}</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5 truncate">{b.link}</p>
              </div>
              <ActionMenu actions={[
                { label: 'Preview', icon: Eye, onClick: () => openPreview(b) },
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(b) },
                { label: b.status === 'Active' ? 'Deactivate' : 'Activate', onClick: () => toggleStatus(b.id), color: b.status === 'Active' ? 'text-red-400' : 'text-emerald-400' },
                { label: 'Delete', icon: Trash2, onClick: () => removeBanner(b.id), color: 'text-red-400' },
              ]} />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editBanner ? 'Edit Banner' : 'Add Banner'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Banner Title</label>
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Summer Sale 2026" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Link URL</label>
            <input value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="https://yourdigitallift.com/offer" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Banner Image</label>
            <div className="border-2 border-dashed border-ydl-dark-border rounded-lg p-6 text-center hover:border-ydl-yellow/30 transition-colors cursor-pointer">
              <Image className="w-8 h-8 text-gray-600 mx-auto mb-1" />
              <p className="text-[10px] text-gray-500">Click to upload image</p>
              <p className="text-[8px] text-gray-600">Recommended: 1200x400px</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Position</label>
              <select value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value as Banner['position'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Top</option><option>Middle</option><option>Bottom</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Banner['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.title} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editBanner ? 'Update' : 'Add'} Banner</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Banner Preview" size="lg">
        {previewBanner && (
          <div>
            <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-ydl-yellow/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center mb-3">
              <div className="text-center">
                <Image className="w-12 h-12 text-ydl-yellow/50 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">{previewBanner.title}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white font-medium">{previewBanner.title}</p>
                <p className="text-[10px] text-gray-500">{previewBanner.link}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${previewBanner.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{previewBanner.status}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
