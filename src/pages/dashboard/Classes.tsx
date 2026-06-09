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
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Classes</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-apple-gradient-blue rounded-xl hover:shadow-apple-md-lg transition-all">
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-apple-gray-200 bg-white p-5 hover:border-ydl-yellow/50 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[#1C1C1E] font-bold">{c.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs bg-apple-blue/20 text-apple-blue">{c.category}</span>
              </div>
              <p className="text-sm text-apple-gray-400 mb-2">{c.trainer}</p>
              <div className="flex items-center gap-4 text-xs text-apple-gray-400">
                <span>{c.time}</span>
                <span>{c.duration} min</span>
                <span>{c.enrolled}/{c.capacity}</span>
              </div>
              <div className="mt-3 flex gap-1 flex-wrap">
                {(c.days || []).map((d: string) => (
                  <span key={d} className="px-1.5 py-0.5 text-xs rounded bg-white/5 text-apple-gray-400">{d}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
