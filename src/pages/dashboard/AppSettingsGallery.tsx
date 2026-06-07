import { motion } from 'framer-motion'
import { Image, Plus, Trash2, Star } from 'lucide-react'

const images = [
  { name: 'gym-floor-1.jpg', url: '', featured: true, size: '1.2 MB' },
  { name: 'gym-floor-2.jpg', url: '', featured: false, size: '890 KB' },
  { name: 'cardio-area.jpg', url: '', featured: false, size: '1.5 MB' },
  { name: 'yoga-studio.jpg', url: '', featured: false, size: '1.1 MB' },
  { name: 'locker-room.jpg', url: '', featured: false, size: '980 KB' },
  { name: 'reception.jpg', url: '', featured: false, size: '750 KB' },
]

export default function AppSettingsGallery() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Gallery</h1><p className="text-xs text-gray-500 mt-0.5">Manage gym images and media.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Upload</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {images.map((img, i) => (
          <motion.div key={img.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden group">
            <div className="aspect-square bg-gradient-to-br from-ydl-yellow/10 to-amber-600/5 flex items-center justify-center relative">
              <Image className="w-8 h-8 text-gray-600" />
              {img.featured && <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[8px] font-bold text-black bg-ydl-yellow rounded-md"><Star className="w-2.5 h-2.5 inline" /></span>}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-1.5 bg-ydl-yellow/20 rounded-lg text-ydl-yellow hover:bg-ydl-yellow/30"><Star className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="p-2">
              <p className="text-[9px] text-gray-400 truncate">{img.name}</p>
              <p className="text-[8px] text-gray-600">{img.size}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
