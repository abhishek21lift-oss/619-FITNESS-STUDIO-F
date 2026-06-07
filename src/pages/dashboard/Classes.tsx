import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Plus } from 'lucide-react'
import { api } from '../../api'

export default function Classes() {
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/classes').then(setClasses).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Classes</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-ydl-gradient rounded-xl hover:shadow-ydl-gold-lg transition-all">
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-5 hover:border-ydl-yellow/50 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-bold">{c.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs bg-ydl-yellow/20 text-ydl-yellow">{c.category}</span>
              </div>
              <p className="text-sm text-ydl-muted mb-2">{c.trainer}</p>
              <div className="flex items-center gap-4 text-xs text-ydl-muted">
                <span>{c.time}</span>
                <span>{c.duration} min</span>
                <span>{c.enrolled}/{c.capacity}</span>
              </div>
              <div className="mt-3 flex gap-1 flex-wrap">
                {(c.days || []).map((d: string) => (
                  <span key={d} className="px-1.5 py-0.5 text-xs rounded bg-white/5 text-ydl-muted">{d}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
