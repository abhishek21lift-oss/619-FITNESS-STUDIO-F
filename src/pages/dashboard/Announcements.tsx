import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Megaphone, Plus, Trash2 } from 'lucide-react'
import { api } from '../../api'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState('normal')

  const load = () => api('/announcements').then(setAnnouncements).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const create = async () => {
    if (!title) return
    await api('/announcements', { method: 'POST', body: JSON.stringify({ title, content, priority }) })
    setTitle(''); setContent(''); setPriority('normal'); setShowForm(false)
    load()
  }

  const deleteAnnouncement = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await api(`/announcements/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Announcements</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-apple-blue/10 text-[#007AFF] border border-[#007AFF]/20 hover:bg-apple-blue/20 transition-all text-sm font-medium">
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-apple-gray-200 bg-white p-5 space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title *"
            className="w-full bg-[#1A1A1A] text-[#1C1C1E] border border-apple-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#007AFF]/50" />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content"
            className="w-full bg-[#1A1A1A] text-[#1C1C1E] border border-apple-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#007AFF]/50 min-h-[80px]" />
          <div className="flex items-center gap-3">
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="bg-[#1A1A1A] text-[#1C1C1E] border border-apple-gray-200 rounded-xl px-4 py-2.5 text-sm">
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            <button onClick={create}
              className="px-5 py-2.5 rounded-xl bg-apple-blue text-black font-medium text-sm hover:bg-apple-blue/90 transition-all">Post</button>
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-apple-gray-200 text-apple-gray-400 text-sm hover:text-[#1C1C1E] transition-all">Cancel</button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border p-5 flex items-start gap-4 ${
                a.priority === 'urgent' ? 'border-red-500/30 bg-red-500/5' :
                a.priority === 'high' ? 'border-yellow-500/30 bg-yellow-500/5' :
                'border-apple-gray-200 bg-white'
              }`}>
              <div className={`p-2 rounded-xl ${
                a.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                a.priority === 'high' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-apple-blue/10 text-[#007AFF]'
              }`}>
                <Megaphone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#1C1C1E] font-semibold">{a.title}</h3>
                  {a.priority !== 'normal' && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${
                      a.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                      a.priority === 'high' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-[#007AFF]'
                    }`}>{a.priority}</span>
                  )}
                </div>
                {a.content && <p className="text-apple-gray-400 text-sm">{a.content}</p>}
                <p className="text-[11px] text-apple-gray-400 mt-2">{a.createdBy} &middot; {new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => deleteAnnouncement(a.id)}
                className="p-2 text-apple-gray-400 hover:text-red-400 transition-all rounded-lg hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {announcements.length === 0 && (
            <p className="text-apple-gray-400 text-sm text-center py-10">No announcements yet</p>
          )}
        </div>
      )}
    </div>
  )
}
