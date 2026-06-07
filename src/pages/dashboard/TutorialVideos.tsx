import { motion } from 'framer-motion'
import { Video, Play, Plus, Edit3, Trash2, Clock } from 'lucide-react'

const videos = [
  { title: 'How to Use the Admin Dashboard', duration: '12:34', category: 'Admin', views: 342, date: '01 Jun 2026' },
  { title: 'Adding New Members - Step by Step', duration: '08:21', category: 'Members', views: 278, date: '28 May 2026' },
  { title: 'Managing Enquiries & Follow-ups', duration: '15:42', category: 'Enquiry', views: 156, date: '25 May 2026' },
  { title: 'Trainer Commission Setup', duration: '06:18', category: 'Trainers', views: 89, date: '20 May 2026' },
  { title: 'Billing & Subscription Guide', duration: '10:55', category: 'Accounts', views: 201, date: '15 May 2026' },
]

export default function TutorialVideos() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Tutorial Videos</h1><p className="text-xs text-gray-500 mt-0.5">Helpful guides for using the system.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Upload Video</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden group">
            <div className="aspect-video bg-gradient-to-br from-ydl-yellow/10 to-amber-600/5 flex items-center justify-center relative">
              <Video className="w-10 h-10 text-gray-600" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-ydl-yellow/80 flex items-center justify-center"><Play className="w-5 h-5 text-black ml-0.5" /></div>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-medium text-white bg-black/60 rounded-md"><Clock className="w-2.5 h-2.5 inline mr-0.5" />{v.duration}</span>
            </div>
            <div className="p-3">
              <h3 className="text-xs font-semibold text-white">{v.title}</h3>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[9px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-1.5 py-0.5 rounded">{v.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500">{v.views} views</span>
                  <button className="p-1 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3 h-3" /></button>
                  <button className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
