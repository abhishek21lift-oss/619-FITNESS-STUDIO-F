import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { api } from '../../api'

export default function TrainerClients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { api('/members').then(setClients).catch(() => {}).finally(() => setLoading(false)) }, [])

  const filtered = clients.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">My Clients</h1>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ydl-muted" />
        <input type="text" placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-ydl-card-gradient border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow" />
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-5 hover:border-ydl-yellow/50 transition-all">
              <h3 className="text-white font-bold">{c.name}</h3>
              <p className="text-sm text-ydl-muted mt-1">{c.email} &middot; {c.phone}</p>
              <div className="flex items-center gap-3 mt-3 text-xs">
                <span className="text-ydl-muted">Plan: {c.plan}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{c.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
