import { motion } from 'framer-motion'
import { Image, Plus, Edit3, Trash2, Eye } from 'lucide-react'

const banners = [
  { title: 'Summer Sale 2026', subtitle: 'Get 25% off on all annual plans', active: true, priority: 1 },
  { title: 'New Batch Alert', subtitle: 'Evening HIIT batch starting from 15th June', active: true, priority: 2 },
  { title: 'Referral Bonus', subtitle: 'Refer a friend and get 1 month free', active: false, priority: 3 },
]

export default function AppSettingsBanner() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Banner Images</h1><p className="text-xs text-gray-500 mt-0.5">Promotional banners for the app.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Banner</button>
      </div>
      <div className="space-y-3">
        {banners.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
            <div className="flex items-start gap-4 p-4">
              <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-ydl-yellow/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center flex-shrink-0">
                <Image className="w-6 h-6 text-ydl-yellow/50" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-white">{b.title}</h3>
                  <span className="text-[9px] text-gray-600">Priority {b.priority}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-medium rounded-md ${b.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{b.active ? 'Active' : 'Inactive'}</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">{b.subtitle}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
