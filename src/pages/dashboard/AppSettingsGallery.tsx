import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Star, Camera } from 'lucide-react'
import Modal from '../../components/shared/Modal'

interface GalleryImage {
  id: number
  name: string
  category: string
  featured: boolean
  size: string
  color: string
}

const categories = ['All', 'Gym', 'Events', 'Transformations', 'Promotional']

const colors = [
  'from-blue-500/20 to-blue-600/5',
  'from-emerald-500/20 to-emerald-600/5',
  'from-purple-500/20 to-purple-600/5',
  'from-rose-500/20 to-rose-600/5',
  'from-amber-500/20 to-amber-600/5',
  'from-cyan-500/20 to-cyan-600/5',
]

const initialImages: GalleryImage[] = [
  { id: 1, name: 'gym-floor-1.jpg', category: 'Gym', featured: true, size: '1.2 MB', color: colors[0] },
  { id: 2, name: 'gym-floor-2.jpg', category: 'Gym', featured: false, size: '890 KB', color: colors[1] },
  { id: 3, name: 'cardio-area.jpg', category: 'Gym', featured: false, size: '1.5 MB', color: colors[2] },
  { id: 4, name: 'yoga-studio.jpg', category: 'Gym', featured: false, size: '1.1 MB', color: colors[3] },
  { id: 5, name: 'diwali-celebration.jpg', category: 'Events', featured: false, size: '2.0 MB', color: colors[4] },
  { id: 6, name: 'client-rahul-before-after.jpg', category: 'Transformations', featured: true, size: '980 KB', color: colors[5] },
  { id: 7, name: 'summer-sale-banner.jpg', category: 'Promotional', featured: false, size: '750 KB', color: colors[0] },
  { id: 8, name: 'reception-area.jpg', category: 'Gym', featured: false, size: '1.3 MB', color: colors[1] },
]

export default function AppSettingsGallery() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [category, setCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  const filtered = category === 'All' ? images : images.filter(i => i.category === category)

  const toggleFeatured = (id: number) => {
    setImages(prev => prev.map(i => i.id === id ? { ...i, featured: !i.featured } : i))
  }

  const removeImage = (id: number) => {
    setImages(prev => prev.filter(i => i.id !== id))
  }

  const handleUpload = () => {
    const newImg: GalleryImage = {
      id: Date.now(),
      name: `upload-${Date.now()}.jpg`,
      category: 'Gym',
      featured: false,
      size: '0 KB',
      color: colors[Math.floor(Math.random() * colors.length)],
    }
    setImages(prev => [...prev, newImg])
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Gallery</h1><p className="text-xs text-gray-500 mt-0.5">Manage gym images and media ({images.length} images).</p></div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-2 py-1 text-[10px] font-medium rounded-lg border transition-all ${category === c ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>{c}</button>
            ))}
          </div>
          <button onClick={handleUpload} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Upload</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden group cursor-pointer"
            onClick={() => setLightboxImage(img)}
          >
            <div className={`aspect-square bg-gradient-to-br ${img.color} flex items-center justify-center relative`}>
              <Camera className="w-10 h-10 text-gray-600" />
              {img.featured && <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[8px] font-bold text-black bg-ydl-yellow rounded-md flex items-center gap-0.5"><Star className="w-2.5 h-2.5" /> Featured</span>}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" onClick={e => e.stopPropagation()}>
                <button onClick={() => toggleFeatured(img.id)} className={`p-1.5 rounded-lg ${img.featured ? 'bg-amber-500/20 text-amber-400' : 'bg-ydl-yellow/20 text-ydl-yellow'} hover:bg-ydl-yellow/30`}><Star className="w-3.5 h-3.5" /></button>
                <button onClick={() => removeImage(img.id)} className="p-1.5 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="p-2">
              <p className="text-[9px] text-gray-400 truncate">{img.name}</p>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[8px] text-gray-600">{img.size}</p>
                <span className="text-[8px] font-medium text-ydl-yellow">{img.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={!!lightboxImage} onClose={() => setLightboxImage(null)} title={lightboxImage?.name || 'Image'} size="lg">
        {lightboxImage && (
          <div className="flex flex-col items-center">
            <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${lightboxImage.color} flex items-center justify-center mb-3`}>
              <Camera className="w-20 h-20 text-gray-600" />
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-xs text-white font-medium">{lightboxImage.name}</p>
                <p className="text-[10px] text-gray-500">{lightboxImage.size} · {lightboxImage.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleFeatured(lightboxImage.id)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border ${lightboxImage.featured ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow'}`}>
                  <Star className="w-3 h-3 inline mr-1" />{lightboxImage.featured ? 'Unfeature' : 'Set Featured'}
                </button>
                <button onClick={() => { removeImage(lightboxImage.id); setLightboxImage(null) }} className="px-3 py-1.5 text-[10px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20">
                  <Trash2 className="w-3 h-3 inline mr-1" />Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
