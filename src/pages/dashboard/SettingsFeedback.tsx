import { motion } from 'framer-motion'
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'

const feedbacks = [
  { client: 'Rahul Sharma', rating: 5, comment: 'Great gym! Equipment is well maintained.', date: '07 Jun 2026', category: 'General' },
  { client: 'Priya Singh', rating: 4, comment: 'Yoga classes are amazing. Need more timing options.', date: '06 Jun 2026', category: 'Classes' },
  { client: 'Amit Verma', rating: 3, comment: 'Good but locker room needs cleaning.', date: '05 Jun 2026', category: 'Facilities' },
  { client: 'Sneha Patel', rating: 5, comment: 'Best trainers in Lucknow! Highly recommend.', date: '04 Jun 2026', category: 'Trainers' },
]

export default function SettingsFeedback() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Feedback</h1><p className="text-xs text-gray-500 mt-0.5">Client reviews and suggestions.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] font-medium text-gray-500 uppercase">Total</p><p className="text-xl font-bold text-white mt-1">24</p></div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] font-medium text-gray-500 uppercase">Avg Rating</p><p className="text-xl font-bold text-ydl-yellow mt-1">4.2</p></div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] font-medium text-gray-500 uppercase">Positive</p><p className="text-xl font-bold text-emerald-400 mt-1">18</p></div>
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 text-center"><p className="text-[10px] font-medium text-gray-500 uppercase">Negative</p><p className="text-xl font-bold text-red-400 mt-1">6</p></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        {feedbacks.map((f, i) => (
          <div key={i} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">{f.client}</span>
                  <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, si) => <Star key={si} className={`w-3 h-3 ${si < f.rating ? 'text-ydl-yellow' : 'text-gray-600'}`} />)}</div>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{f.comment}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[9px] text-gray-600">{f.date}</span>
                <span className="text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-2 py-0.5 rounded-md">{f.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] text-emerald-400 bg-emerald-500/10 rounded-md hover:bg-emerald-500/20"><ThumbsUp className="w-2.5 h-2.5" /> Helpful</button>
              <button className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] text-red-400 bg-red-500/10 rounded-md hover:bg-red-500/20"><ThumbsDown className="w-2.5 h-2.5" /> Report</button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
