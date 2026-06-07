import { motion } from 'framer-motion'
import { AlertTriangle, Plus, Edit3, Trash2, Pin } from 'lucide-react'

const notices = [
  { title: 'Gym Closed on 15th June', content: 'The gym will remain closed for maintenance on 15th June 2026.', date: '07 Jun 2026', pinned: true },
  { title: 'New Batch Schedule', content: 'Evening HIIT batch timings changed to 5:30 PM - 6:30 PM.', date: '05 Jun 2026', pinned: false },
  { title: 'Annual Maintenance Fee', content: 'Annual maintenance fee of ₹2,000 is due for all members by 30th June.', date: '01 Jun 2026', pinned: true },
]

export default function SettingsNotices() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Notices & Rules</h1><p className="text-xs text-gray-500 mt-0.5">Manage gym notices and house rules.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Notice</button>
      </div>
      <div className="space-y-3">
        {notices.map((n, i) => (
          <motion.div key={n.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${n.pinned ? 'text-ydl-yellow' : 'text-gray-500'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-white">{n.title}</h3>
                    {n.pinned && <Pin className="w-3 h-3 text-ydl-yellow" />}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{n.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-600">{n.date}</span>
                <button className="p-1 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3 h-3" /></button>
                <button className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
