import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Play, Plus, Edit3, Trash2, Clock, Search, X } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface TutorialVideo {
  id: number
  title: string
  duration: string
  category: string
  description: string
}

const categories = ['Getting Started', 'Features', 'Reports', 'Settings']

const initialVideos: TutorialVideo[] = [
  { id: 1, title: 'How to Use the Admin Dashboard', duration: '12:34', category: 'Getting Started', description: 'A comprehensive walkthrough of the admin dashboard interface.' },
  { id: 2, title: 'Adding New Members - Step by Step', duration: '08:21', category: 'Getting Started', description: 'Learn how to add and manage members in the system.' },
  { id: 3, title: 'Managing Enquiries & Follow-ups', duration: '15:42', category: 'Features', description: 'How to handle enquiries and schedule follow-ups effectively.' },
  { id: 4, title: 'Trainer Commission Setup', duration: '06:18', category: 'Settings', description: 'Configure trainer commissions and payout structures.' },
  { id: 5, title: 'Billing & Subscription Guide', duration: '10:55', category: 'Reports', description: 'Generate and understand billing reports and subscription analytics.' },
  { id: 6, title: 'WhatsApp Integration Setup', duration: '07:30', category: 'Settings', description: 'Connect WhatsApp Business API for automated notifications.' },
  { id: 7, title: 'Attendance Tracking', duration: '05:45', category: 'Features', description: 'Track member attendance using QR, biometric, or manual check-in.' },
  { id: 8, title: 'Revenue Reports Overview', duration: '09:12', category: 'Reports', description: 'Understand revenue reports, collection stats, and profit analysis.' },
]

const bgColors = [
  'from-[#007AFF]/10 to-[#007AFF]/5',
  'from-emerald-500/20 to-emerald-600/5',
  'from-purple-500/20 to-purple-600/5',
  'from-rose-500/20 to-rose-600/5',
  'from-amber-500/20 to-amber-600/5',
  'from-cyan-500/20 to-cyan-600/5',
  'from-pink-500/20 to-pink-600/5',
  'from-indigo-500/20 to-indigo-600/5',
]

export default function TutorialVideos() {
  const [videos, setVideos] = useState<TutorialVideo[]>(initialVideos)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [playOpen, setPlayOpen] = useState(false)
  const [playingVideo, setPlayingVideo] = useState<TutorialVideo | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editVideo, setEditVideo] = useState<TutorialVideo | null>(null)
  const [form, setForm] = useState({ title: '', duration: '', category: 'Getting Started', description: '' })

  const filtered = videos.filter(v => {
    const matchCat = category === 'All' || v.category === category
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const openAdd = () => {
    setEditVideo(null)
    setForm({ title: '', duration: '', category: 'Getting Started', description: '' })
    setModalOpen(true)
  }

  const openEdit = (v: TutorialVideo) => {
    setEditVideo(v)
    setForm({ title: v.title, duration: v.duration, category: v.category, description: v.description })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editVideo) {
      setVideos(prev => prev.map(v => v.id === editVideo.id ? { ...v, ...form } : v))
    } else {
      setVideos(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const removeVideo = (id: number) => {
    setVideos(prev => prev.filter(v => v.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Tutorial Videos</h1><p className="text-xs text-apple-gray-500 mt-0.5">Helpful guides for using the system.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Upload Video</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search videos..." />
          {search && <X className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-apple-gray-500 cursor-pointer hover:text-[#1C1C1E]" onClick={() => setSearch('')} />}
        </div>
        <div className="flex gap-1.5">
          {['All', ...categories].map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${category === c ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden group cursor-pointer" onClick={() => { setPlayingVideo(v); setPlayOpen(true) }}>
            <div className={`aspect-video bg-gradient-to-br ${bgColors[i % bgColors.length]} flex items-center justify-center relative`}>
              <Video className="w-10 h-10 text-apple-gray-400" />
              <div className="absolute inset-0 bg-[#F5F5F7]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-ydl-yellow/80 flex items-center justify-center"><Play className="w-5 h-5 text-black ml-0.5" /></div>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-medium text-[#1C1C1E] bg-[#F5F5F7]/60 rounded-md flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{v.duration}</span>
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-semibold text-[#1C1C1E] flex-1">{v.title}</h3>
                <ActionMenu actions={[
                  { label: 'Edit', icon: Edit3, onClick: () => openEdit(v) },
                  { label: 'Delete', icon: Trash2, onClick: () => removeVideo(v.id), color: 'text-red-400' },
                ]} />
              </div>
              <p className="text-[9px] text-apple-gray-500 mt-1 line-clamp-2">{v.description}</p>
              <span className="inline-block mt-2 text-[9px] font-medium text-apple-blue bg-apple-blue/10 px-1.5 py-0.5 rounded">{v.category}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={playOpen} onClose={() => { setPlayOpen(false); setPlayingVideo(null) }} title={playingVideo?.title || 'Play Video'} size="lg">
        {playingVideo && (
          <div>
            <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${bgColors[videos.indexOf(playingVideo) % bgColors.length]} flex items-center justify-center mb-3`}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-ydl-yellow/80 flex items-center justify-center mx-auto mb-2"><Play className="w-7 h-7 text-black ml-0.5" /></div>
                <p className="text-xs text-apple-gray-400">{playingVideo.duration}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#1C1C1E]">{playingVideo.title}</p>
                <p className="text-xs text-apple-gray-500 mt-0.5">{playingVideo.description}</p>
              </div>
              <span className="text-[10px] font-medium text-apple-blue bg-apple-blue/10 px-2 py-0.5 rounded-md">{playingVideo.category}</span>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editVideo ? 'Edit Video' : 'Upload Video'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Video Title</label>
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="How to Use the Admin Dashboard" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Duration</label>
              <input value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="12:34" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
          <div className="border-2 border-dashed border-apple-gray-200 rounded-lg p-6 text-center hover:border-ydl-yellow/30 transition-colors cursor-pointer">
            <Video className="w-8 h-8 text-apple-gray-400 mx-auto mb-1" />
            <p className="text-[10px] text-apple-gray-500">Click to upload video file</p>
            <p className="text-[8px] text-apple-gray-400">MP4, WebM, or OGG (max 100MB)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.title} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editVideo ? 'Update' : 'Upload'} Video</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
