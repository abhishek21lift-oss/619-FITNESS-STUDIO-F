import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, CalendarRange, Users, Plus, X } from 'lucide-react'
import { api } from '../../api'

export default function Batches() {
  const [batches, setBatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState('20')
  const [selected, setSelected] = useState<any>(null)

  const load = () => api('/batches').then(setBatches).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const create = async () => {
    if (!name) return
    await api('/batches', { method: 'POST', body: JSON.stringify({ name, capacity: parseInt(capacity) || 20 }) })
    setName(''); setCapacity('20'); setShowForm(false)
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Batches</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF34]/10 text-[#D4AF34] border border-[#D4AF34]/20 hover:bg-[#D4AF34]/20 transition-all text-sm font-medium">
          <Plus className="w-4 h-4" /> New Batch
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-5 space-y-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Batch Name *"
            className="w-full bg-[#1A1A1A] text-white border border-ydl-dark-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4AF34]/50" />
          <input value={capacity} onChange={e => setCapacity(e.target.value)} placeholder="Capacity" type="number"
            className="w-full bg-[#1A1A1A] text-white border border-ydl-dark-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D4AF34]/50" />
          <div className="flex gap-3">
            <button onClick={create}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF34] text-black font-medium text-sm hover:bg-[#D4AF34]/90 transition-all">Create</button>
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-ydl-dark-border text-ydl-muted text-sm hover:text-white transition-all">Cancel</button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(b)}
              className="rounded-2xl border border-ydl-dark-border bg-ydl-card-gradient p-5 cursor-pointer hover:border-[#D4AF34]/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{b.name}</h3>
                  {b.trainer && <p className="text-xs text-ydl-muted">{b.trainer}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-ydl-muted">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {b.memberCount}/{b.capacity}</span>
                {b.daysOfWeek?.length > 0 && <span>{b.daysOfWeek.join(', ')}</span>}
              </div>
            </motion.div>
          ))}
          {batches.length === 0 && (
            <p className="text-ydl-muted text-sm text-center py-10 col-span-full">No batches created yet</p>
          )}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#0A0A0A] border border-ydl-dark-border rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <p><span className="text-ydl-muted">Trainer:</span> <span className="text-white">{selected.trainer || 'N/A'}</span></p>
              <p><span className="text-ydl-muted">Capacity:</span> <span className="text-white">{selected.memberCount}/{selected.capacity}</span></p>
              {selected.daysOfWeek?.length > 0 && (
                <p><span className="text-ydl-muted">Schedule:</span> <span className="text-white">{selected.daysOfWeek.join(', ')}</span></p>
              )}
              {selected.startTime && (
                <p><span className="text-ydl-muted">Time:</span> <span className="text-white">{selected.startTime} - {selected.endTime || ''}</span></p>
              )}
              <h3 className="text-white font-medium pt-3 border-t border-ydl-dark-border">Members</h3>
              {selected.members?.length > 0 ? selected.members.map((m: any) => (
                <div key={m.id} className="flex items-center justify-between py-1">
                  <span className="text-white">{m.name}</span>
                  <span className="text-ydl-muted text-xs">{m.code}</span>
                </div>
              )) : <p className="text-ydl-muted">No members assigned</p>}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
