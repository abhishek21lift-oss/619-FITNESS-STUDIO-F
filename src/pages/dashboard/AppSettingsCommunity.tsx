import { motion } from 'framer-motion'
import { Users, MessageSquare, ThumbsUp, Eye, Edit3, Trash2, Plus } from 'lucide-react'

const posts = [
  { author: 'Awash Vikash', content: 'Great session today! Everyone gave their 100%.', likes: 24, comments: 8, views: 342, date: '07 Jun 2026' },
  { author: 'Riya Singh', content: 'New HIIT routine starting next week. Get ready!', likes: 18, comments: 12, views: 289, date: '06 Jun 2026' },
  { author: 'Rahul Sharma', content: 'Hit a new PR on deadlift - 180kg!', likes: 45, comments: 16, views: 567, date: '05 Jun 2026' },
]

export default function AppSettingsCommunity() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Community</h1><p className="text-xs text-gray-500 mt-0.5">Manage community posts and interactions.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> New Post</button>
      </div>
      <div className="space-y-3">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ydl-yellow/20 border border-ydl-yellow/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-ydl-yellow" />
                </div>
                <div><p className="text-xs font-semibold text-white">{p.author}</p><p className="text-[9px] text-gray-600">{p.date}</p></div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <p className="text-xs text-gray-300 mt-3">{p.content}</p>
            <div className="flex items-center gap-4 mt-3 text-[9px] text-gray-500">
              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{p.likes}</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{p.comments}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.views}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
