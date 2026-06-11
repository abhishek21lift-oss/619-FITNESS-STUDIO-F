import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, MessageSquare, CheckCircle, Send } from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import StatsCard from '../../../components/shared/StatsCard'

interface Feedback {
  id: number
  member: string
  rating: number
  comment: string
  date: string
  category: string
  status: 'New' | 'Read' | 'Resolved'
}

const initialFeedbacks: Feedback[] = [
  { id: 1, member: 'Rahul Sharma', rating: 5, comment: 'Great gym! Equipment is well maintained. The trainers are very supportive and knowledgeable.', date: '07 Jun 2026', category: 'General', status: 'New' },
  { id: 2, member: 'Priya Singh', rating: 4, comment: 'Yoga classes are amazing. Need more timing options though.', date: '06 Jun 2026', category: 'Classes', status: 'Read' },
  { id: 3, member: 'Amit Verma', rating: 3, comment: 'Good gym but locker room needs cleaning more frequently.', date: '05 Jun 2026', category: 'Facilities', status: 'New' },
  { id: 4, member: 'Sneha Patel', rating: 5, comment: 'Best trainers in Lucknow! Highly recommend this place to everyone.', date: '04 Jun 2026', category: 'Trainers', status: 'Resolved' },
  { id: 5, member: 'Neha Gupta', rating: 2, comment: 'Cardio machines are often occupied during peak hours.', date: '03 Jun 2026', category: 'Equipment', status: 'Read' },
  { id: 6, member: 'Vikram Singh', rating: 4, comment: 'Good value for money. The HIIT classes are excellent.', date: '02 Jun 2026', category: 'Classes', status: 'New' },
]

export default function SettingsFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks)
  const [statusTab, setStatusTab] = useState<'All' | 'New' | 'Read' | 'Resolved'>('All')
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replies, setReplies] = useState<Record<number, string[]>>({})

  const filtered = statusTab === 'All' ? feedbacks : feedbacks.filter(f => f.status === statusTab)

  const avgRating = (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
  const thisMonth = feedbacks.filter(f => f.date.includes('Jun')).length

  const markResolved = (id: number) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, status: 'Resolved' } : f))
  }

  const handleReply = () => {
    if (!replyText.trim() || !selectedFeedback) return
    setReplies(prev => ({
      ...prev,
      [selectedFeedback.id]: [...(prev[selectedFeedback.id] || []), replyText],
    }))
    setReplyText('')
    setFeedbacks(prev => prev.map(f => f.id === selectedFeedback.id ? { ...f, status: 'Read' } : f))
  }

  const statusCounts = {
    All: feedbacks.length,
    New: feedbacks.filter(f => f.status === 'New').length,
    Read: feedbacks.filter(f => f.status === 'Read').length,
    Resolved: feedbacks.filter(f => f.status === 'Resolved').length,
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-[#1C1C1E]">Feedback</h1><p className="text-xs text-apple-gray-500 mt-0.5">Client reviews and suggestions.</p></div>

      <div className="grid grid-cols-4 gap-3">
        <StatsCard label="Total Feedback" value={feedbacks.length} icon={MessageSquare} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Avg Rating" value={avgRating} icon={Star} color="from-apple-blue/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-apple-blue" />
        <StatsCard label="This Month" value={thisMonth} icon={ThumbsUp} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Resolved" value={statusCounts.Resolved} icon={CheckCircle} color="from-green-500/20 to-green-600/5" border="border-green-500/30" text="text-green-400" />
      </div>

      <div className="flex gap-1.5">
        {(['All', 'New', 'Read', 'Resolved'] as const).map(t => (
          <button key={t} onClick={() => setStatusTab(t)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${statusTab === t ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>
            {t} ({statusCounts[t]})
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        {filtered.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4 cursor-pointer hover:bg-white/[0.04] transition-colors"
            onClick={() => setSelectedFeedback(f)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1C1C1E]">{f.member}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => <Star key={si} className={`w-3 h-3 ${si < f.rating ? 'text-apple-blue' : 'text-apple-gray-400'}`} />)
                  }</div>
                  <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded-md ${
                    f.status === 'New' ? 'text-[#007AFF] bg-blue-500/10' : f.status === 'Read' ? 'text-amber-400 bg-amber-500/10' : 'text-emerald-400 bg-emerald-500/10'
                  }`}>{f.status}</span>
                </div>
                <p className="text-[11px] text-apple-gray-400 mt-1 line-clamp-2">{f.comment}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <span className="text-[9px] text-apple-gray-400">{f.date}</span>
                <span className="text-[10px] font-medium text-apple-blue bg-apple-blue/10 px-2 py-0.5 rounded-md">{f.category}</span>
              </div>
            </div>
            {f.status !== 'Resolved' && (
              <div className="flex items-center gap-2 mt-2 ml-0">
                <button onClick={e => { e.stopPropagation(); markResolved(f.id) }} className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] text-emerald-400 bg-emerald-500/10 rounded-md hover:bg-emerald-500/20"><CheckCircle className="w-2.5 h-2.5" /> Mark Resolved</button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <Modal open={!!selectedFeedback} onClose={() => { setSelectedFeedback(null); setReplyText('') }} title={selectedFeedback?.member || 'Feedback'} size="md">
        {selectedFeedback && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} className={`w-4 h-4 ${si < selectedFeedback.rating ? 'text-apple-blue' : 'text-apple-gray-400'}`} />)
                }</div>
                <span className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-medium rounded-md ${
                  selectedFeedback.status === 'New' ? 'text-[#007AFF] bg-blue-500/10' : selectedFeedback.status === 'Read' ? 'text-amber-400 bg-amber-500/10' : 'text-emerald-400 bg-emerald-500/10'
                }`}>{selectedFeedback.status}</span>
              </div>
              <p className="text-xs text-apple-gray-600">{selectedFeedback.comment}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] text-apple-gray-400">{selectedFeedback.date}</span>
                <span className="text-[10px] font-medium text-apple-blue bg-apple-blue/10 px-2 py-0.5 rounded-md">{selectedFeedback.category}</span>
              </div>
            </div>

            {selectedFeedback.status !== 'Resolved' && (
              <div className="pt-3 border-t border-apple-gray-200">
                <button onClick={() => markResolved(selectedFeedback.id)} className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20"><CheckCircle className="w-3 h-3" /> Mark as Resolved</button>
              </div>
            )}

            <div className="pt-3 border-t border-apple-gray-200">
              <h4 className="text-[11px] font-semibold text-[#1C1C1E] mb-2">Reply</h4>
              {replies[selectedFeedback.id]?.map((r, ri) => (
                <div key={ri} className="p-2 rounded-lg bg-ydl-yellow/5 border border-ydl-yellow/10 mb-2">
                  <p className="text-[10px] text-apple-gray-600">{r}</p>
                  <p className="text-[8px] text-apple-gray-400 mt-0.5">Admin · Just now</p>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={2} className="flex-1 bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Type your reply..." />
                <button onClick={handleReply} disabled={!replyText.trim()} className="p-2 text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

