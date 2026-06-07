import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Dumbbell, Calendar } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface Program {
  id: number
  name: string
  description: string
  duration: string
  sessions: string
  level: string
  active: boolean
}

const initialPrograms: Program[] = [
  { id: 1, name: 'Fat Loss Program', description: 'Comprehensive fat loss program combining cardio, strength training, and diet planning for maximum results.', duration: '12 Weeks', sessions: '36', level: 'Intermediate', active: true },
  { id: 2, name: 'Muscle Building', description: 'Intensive muscle building program focused on progressive overload and proper nutrition.', duration: '8 Weeks', sessions: '24', level: 'Advanced', active: true },
  { id: 3, name: 'Yoga for Beginners', description: 'Gentle introduction to yoga poses, breathing techniques, and mindfulness.', duration: '4 Weeks', sessions: '12', level: 'Beginner', active: true },
  { id: 4, name: 'Cardio Endurance', description: 'Build cardiovascular endurance through varied cardio exercises and interval training.', duration: '6 Weeks', sessions: '18', level: 'All Levels', active: false },
  { id: 5, name: 'Strength Foundation', description: 'Build a strong foundation in weight training with proper form and technique.', duration: '8 Weeks', sessions: '24', level: 'Beginner', active: true },
]

const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'All Levels']

export default function BatchesProgram() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms)
  const [modalOpen, setModalOpen] = useState(false)
  const [editProgram, setEditProgram] = useState<Program | null>(null)
  const [form, setForm] = useState({ name: '', description: '', duration: '', sessions: '', level: 'Beginner', active: true })

  const openAdd = () => {
    setEditProgram(null)
    setForm({ name: '', description: '', duration: '', sessions: '', level: 'Beginner', active: true })
    setModalOpen(true)
  }

  const openEdit = (p: Program) => {
    setEditProgram(p)
    setForm({ name: p.name, description: p.description, duration: p.duration, sessions: p.sessions, level: p.level, active: p.active })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name || !form.duration) return
    if (editProgram) {
      setPrograms(prev => prev.map(p => p.id === editProgram.id ? { ...p, ...form } : p))
    } else {
      const newId = Math.max(...programs.map(p => p.id)) + 1
      setPrograms(prev => [...prev, { id: newId, ...form }])
    }
    setModalOpen(false)
  }

  const handleDeactivate = (id: number) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  const handleDelete = (id: number) => {
    setPrograms(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Program Management</h1><p className="text-xs text-gray-500 mt-0.5">Create and manage fitness programs.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Program</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {programs.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4 flex flex-col">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center"><Dumbbell className="w-4 h-4 text-ydl-yellow" /></div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${p.active ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 bg-gray-500/10 border border-gray-500/20'}`}>{p.active ? 'Active' : 'Inactive'}</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{p.name}</h3>
            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 flex-1">{p.description}</p>
            <div className="mt-3 space-y-1">
              <p className="text-[10px] text-gray-500">Duration: <span className="text-gray-300">{p.duration}</span></p>
              <p className="text-[10px] text-gray-500">Sessions: <span className="text-gray-300">{p.sessions}</span></p>
              <p className="text-[10px] text-gray-500">Level: <span className="text-gray-300">{p.level}</span></p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-ydl-dark-border">
              <button onClick={() => openEdit(p)} className="text-[10px] font-medium text-ydl-yellow hover:underline">Edit</button>
              <ActionMenu
                label="More"
                actions={[
                  { label: 'Edit', onClick: () => openEdit(p) },
                  { label: p.active ? 'Deactivate' : 'Activate', onClick: () => handleDeactivate(p.id) },
                  { label: 'View Schedule', onClick: () => alert(`Opening schedule for ${p.name}`), icon: Calendar },
                  { label: 'Delete', onClick: () => handleDelete(p.id), color: 'text-red-400' },
                ]}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editProgram ? 'Edit Program' : 'Add Program'} size="lg">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Program Name</label>
            <input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. Fat Loss Program" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Description</label>
            <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Program description..." />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Duration</label>
              <input value={form.duration} onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. 12 Weeks" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Sessions</label>
              <input value={form.sessions} onChange={e => setForm(prev => ({ ...prev, sessions: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. 36" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Level</label>
              <select value={form.level} onChange={e => setForm(prev => ({ ...prev, level: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                {levelOptions.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))} className="w-3.5 h-3.5 accent-ydl-yellow" />
              Active
            </label>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-ydl-dark-border">
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">{editProgram ? 'Update Program' : 'Create Program'}</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
