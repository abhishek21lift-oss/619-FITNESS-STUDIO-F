import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageSquare, ThumbsUp, Eye, Plus, Trash2, CheckCircle, XCircle, Star as StarIcon } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'

interface CommunityPost {
  id: number
  author: string
  avatar: string
  content: string
  image: boolean
  likes: number
  comments: number
  date: string
  status: 'Pending' | 'Approved' | 'Rejected'
  featured: boolean
}

const initialPosts: CommunityPost[] = [
  { id: 1, author: 'Awash Vikash', avatar: 'AV', content: 'Great session today! Everyone gave their 100%. Keep pushing! 🔥', image: false, likes: 24, comments: 8, date: '07 Jun 2026', status: 'Approved', featured: true },
  { id: 2, author: 'Riya Singh', avatar: 'RS', content: 'New HIIT routine starting next week. Get ready to sweat! 💪', image: false, likes: 18, comments: 12, date: '06 Jun 2026', status: 'Approved', featured: false },
  { id: 3, author: 'Rahul Sharma', avatar: 'RS', content: 'Hit a new PR on deadlift - 180kg! 🏋️ Hard work pays off.', image: false, likes: 45, comments: 16, date: '05 Jun 2026', status: 'Approved', featured: false },
  { id: 4, author: 'Priya Singh', avatar: 'PS', content: 'Yoga session was amazing today. Feeling so refreshed! 🧘‍♀️', image: true, likes: 12, comments: 5, date: '04 Jun 2026', status: 'Pending', featured: false },
  { id: 5, author: 'Amit Verma', avatar: 'AV', content: 'Check out my transformation journey! 3 months of consistent training.', image: true, likes: 67, comments: 23, date: '03 Jun 2026', status: 'Pending', featured: false },
  { id: 6, author: 'Neha Gupta', avatar: 'NG', content: 'Spam link - free membership', image: false, likes: 0, comments: 0, date: '02 Jun 2026', status: 'Rejected', featured: false },
]

const avatarColors = ['bg-blue-500/20 text-blue-400', 'bg-emerald-500/20 text-emerald-400', 'bg-purple-500/20 text-purple-400', 'bg-rose-500/20 text-rose-400', 'bg-amber-500/20 text-amber-400']

export default function AppSettingsCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts)
  const [tab, setTab] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [newContent, setNewContent] = useState('')

  const filtered = tab === 'All' ? posts : posts.filter(p => p.status === tab)
  const activeMembers = [...new Set(posts.map(p => p.author))].length
  const todayPosts = posts.filter(p => p.date === '07 Jun 2026').length

  const updateStatus = (id: number, status: CommunityPost['status']) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  const toggleFeatured = (id: number) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p))
  }

  const removePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  const handleCreate = () => {
    if (!newContent.trim()) return
    setPosts(prev => [{
      id: Date.now(),
      author: 'Admin',
      avatar: 'AD',
      content: newContent,
      image: false,
      likes: 0,
      comments: 0,
      date: 'Just now',
      status: 'Approved',
      featured: false,
    }, ...prev])
    setNewContent('')
    setModalOpen(false)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Community</h1><p className="text-xs text-gray-500 mt-0.5">Manage community posts and interactions.</p></div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> New Post</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Total Posts" value={posts.length} icon={MessageSquare} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Active Members" value={activeMembers} icon={Users} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Posts Today" value={todayPosts} icon={Eye} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="flex gap-1.5">
        {(['All', 'Approved', 'Pending', 'Rejected'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${tab === t ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>
            {t} ({t === 'All' ? posts.length : posts.filter(p => p.status === t).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((p, i) => {
          const colorClass = avatarColors[i % avatarColors.length]
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center text-[11px] font-bold`}>
                    {p.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-white">{p.author}</p>
                      {p.featured && <StarIcon className="w-3 h-3 text-ydl-yellow" />}
                      <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded-md ${
                        p.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10' :
                        p.status === 'Pending' ? 'text-amber-400 bg-amber-500/10' :
                        'text-red-400 bg-red-500/10'
                      }`}>{p.status}</span>
                    </div>
                    <p className="text-[9px] text-gray-600">{p.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {p.status !== 'Approved' && <button onClick={() => updateStatus(p.id, 'Approved')} className="p-1 text-emerald-400 hover:bg-emerald-500/10 rounded-lg"><CheckCircle className="w-3.5 h-3.5" /></button>}
                  {p.status !== 'Rejected' && <button onClick={() => updateStatus(p.id, 'Rejected')} className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg"><XCircle className="w-3.5 h-3.5" /></button>}
                  <button onClick={() => toggleFeatured(p.id)} className={`p-1 rounded-lg ${p.featured ? 'text-ydl-yellow bg-ydl-yellow/10' : 'text-gray-500 hover:text-ydl-yellow'}`}><StarIcon className="w-3.5 h-3.5" /></button>
                  <button onClick={() => removePost(p.id)} className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-gray-300 mt-3">{p.content}</p>
              {p.image && <div className="mt-2 w-full h-32 rounded-lg bg-gradient-to-br from-ydl-yellow/10 to-amber-600/5 border border-ydl-dark-border flex items-center justify-center"><Eye className="w-6 h-6 text-gray-600" /></div>}
              <div className="flex items-center gap-4 mt-3 text-[9px] text-gray-500">
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{p.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{p.comments}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Post" size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Post Content</label>
            <textarea value={newContent} onChange={e => setNewContent(e.target.value)} rows={4} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="What would you like to share with the community?" />
          </div>
          <div className="border-2 border-dashed border-ydl-dark-border rounded-lg p-4 text-center hover:border-ydl-yellow/30 transition-colors cursor-pointer">
            <Eye className="w-6 h-6 text-gray-600 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500">Add image (optional)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleCreate} disabled={!newContent.trim()} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">Publish Post</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
