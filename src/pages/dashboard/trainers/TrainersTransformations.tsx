import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Image, Search, Trash2, Eye, CheckCircle,
  MoreHorizontal, TrendingUp, Percent
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import FilterBar from '../../components/shared/FilterBar'
import { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const initialTransformations = [
  { id: 1, client: 'Rahul Sharma', trainer: 'Riya Singh', start: '2026-01-15', end: '2026-06-15', progress: 75, status: 'In Progress', notes: 'Focus on weight loss and muscle definition' },
  { id: 2, client: 'Priya Singh', trainer: 'Shivani Verma', start: '2026-03-01', end: '2026-06-01', progress: 60, status: 'In Progress', notes: 'Yoga and flexibility improvement' },
  { id: 3, client: 'Amit Verma', trainer: 'Abhishek Katiyar', start: '2026-02-01', end: '2026-05-01', progress: 100, status: 'Completed', notes: 'Strength training - exceeded all targets' },
  { id: 4, client: 'Sneha Patel', trainer: 'Awash Vikash', start: '2026-04-01', end: '2026-06-01', progress: 40, status: 'In Progress', notes: 'Cardio and HIIT program' },
  { id: 5, client: 'Vikram Yadav', trainer: 'Rajat Katiyar', start: '2026-05-01', end: '2026-08-01', progress: 20, status: 'In Progress', notes: 'CrossFit training program' },
  { id: 6, client: 'Neha Gupta', trainer: 'Narayan Chandel', start: '2026-01-01', end: '2026-04-01', progress: 100, status: 'Completed', notes: 'Boxing and MMA transformation' },
]

const trainers = ['All Trainers', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']
const clients = ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Sneha Patel', 'Vikram Yadav', 'Neha Gupta', 'Arun Kumar', 'Pooja Jain', 'Rohan Mehra']

export default function TrainersTransformations() {
  const [transformations, setTransformations] = useState(initialTransformations)
  const [trainerFilter, setTrainerFilter] = useState('All Trainers')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [addForm, setAddForm] = useState({ client: clients[0], trainer: trainers[1], start: new Date().toISOString().split('T')[0], notes: '' })
  const [updateProgress, setUpdateProgress] = useState(0)

  const filtered = transformations.filter(t => {
    if (trainerFilter !== 'All Trainers' && t.trainer !== trainerFilter) return false
    if (search && !t.client.toLowerCase().includes(search.toLowerCase()) && !t.trainer.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalTransformations = transformations.length
  const inProgress = transformations.filter(t => t.status === 'In Progress').length
  const completed = transformations.filter(t => t.status === 'Completed').length

  const handleAdd = () => {
    const newT = {
      id: transformations.length + 1,
      client: addForm.client,
      trainer: addForm.trainer,
      start: addForm.start,
      end: '',
      progress: 0,
      status: 'In Progress',
      notes: addForm.notes,
    }
    setTransformations([newT, ...transformations])
    setModal(null)
  }

  const handleDelete = (id: number) => {
    setTransformations(prev => prev.filter(t => t.id !== id))
    setModal(null)
  }

  const handleMarkComplete = (id: number) => {
    setTransformations(prev => prev.map(t => t.id === id ? { ...t, progress: 100, status: 'Completed' } : t))
    setModal(null)
  }

  const handleUpdateProgress = (id: number) => {
    setTransformations(prev => prev.map(t => t.id === id ? { ...t, progress: updateProgress, status: updateProgress >= 100 ? 'Completed' : 'In Progress' } : t))
    setModal(null)
  }

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      'In Progress': 'text-[#007AFF] bg-blue-500/10 border-blue-500/20',
      'Completed': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || ''}`}>{s}</span>
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Client Transformations</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Track client before/after progress.</p>
        </div>
        <button onClick={() => { setAddForm({ client: clients[0], trainer: trainers[1], start: new Date().toISOString().split('T')[0], notes: '' }); setModal({ type: 'add' }) }} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-3 h-3" /> Add Transformation
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Transformations" value={totalTransformations} icon={TrendingUp} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="In Progress" value={inProgress} icon={Percent} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Completed" value={completed} icon={CheckCircle} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <FilterBar>
        <FilterField label="Trainer">
          <FilterSelect options={trainers} value={trainerFilter} onChange={(e: any) => setTrainerFilter(e.target.value)} />
        </FilterField>
        <FilterField label="Search">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-apple-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} className="h-7 pl-7 pr-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/30" placeholder="Search client..." />
          </div>
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-apple-blue/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center overflow-hidden">
                  <Image className="w-6 h-6 text-apple-blue opacity-60" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1C1C1E]">{t.client}</h3>
                  <p className="text-[10px] text-apple-gray-500">Trainer: {t.trainer}</p>
                  <p className="text-[9px] text-apple-gray-400">{t.status === 'Completed' ? `${t.start} → Completed` : `Since ${new Date(t.start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`}</p>
                </div>
              </div>
              <ActionMenu
                label={<MoreHorizontal className="w-3.5 h-3.5" />}
                actions={[
                  { label: 'View Details', icon: Eye, onClick: () => setModal({ type: 'view', data: t }) },
                  { label: 'Update Progress', icon: TrendingUp, onClick: () => { setUpdateProgress(t.progress); setModal({ type: 'update-progress', data: t }) } },
                  { label: 'Mark Complete', icon: CheckCircle, onClick: () => setModal({ type: 'confirm-complete', data: t }) },
                  { label: 'Delete', icon: Trash2, color: 'text-red-400', onClick: () => setModal({ type: 'confirm-delete', data: t }) },
                ]}
              />
            </div>

            <div className="mt-3 flex gap-2">
              <div className="flex-1 h-24 rounded-lg bg-gradient-to-br from-apple-blue/5 to-amber-600/5 border border-apple-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-5 h-5 text-apple-gray-500 mx-auto" />
                  <p className="text-[8px] text-apple-gray-400 mt-1">Before</p>
                </div>
              </div>
              <div className="flex-1 h-24 rounded-lg bg-gradient-to-br from-emerald-500/5 to-green-600/5 border border-apple-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-5 h-5 text-apple-gray-500 mx-auto" />
                  <p className="text-[8px] text-apple-gray-400 mt-1">After</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-apple-gray-500">Progress</span>
                  <span className="text-[10px] font-bold text-apple-blue">{t.progress}%</span>
                </div>
                {statusBadge(t.status)}
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-apple-blue/60 to-ydl-yellow/40" style={{ width: `${t.progress}%` }} />
              </div>
            </div>

            {t.notes && (
              <p className="mt-2 text-[9px] text-apple-gray-500 line-clamp-2">{t.notes}</p>
            )}
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-10 text-xs text-apple-gray-500">No transformations found.</div>}

      <Modal open={modal?.type === 'add'} onClose={() => setModal(null)} title="Add Transformation" size="md">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Select Client</label>
            <select value={addForm.client} onChange={e => setAddForm({ ...addForm, client: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {clients.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Select Trainer</label>
            <select value={addForm.trainer} onChange={e => setAddForm({ ...addForm, trainer: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {trainers.filter(t => t !== 'All Trainers').map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Start Date</label>
            <input type="date" value={addForm.start} onChange={e => setAddForm({ ...addForm, start: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Notes</label>
            <textarea value={addForm.notes} onChange={e => setAddForm({ ...addForm, notes: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[60px] resize-none" placeholder="Initial notes..." />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleAdd} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3 h-3 inline mr-1" /> Create</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title={`Details: ${modal?.data?.client || ''}`} size="md">
        {modal?.data && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-apple-gray-500">Client:</span> <span className="text-[#1C1C1E] font-medium">{modal.data.client}</span></div>
              <div><span className="text-apple-gray-500">Trainer:</span> <span className="text-[#1C1C1E]">{modal.data.trainer}</span></div>
              <div><span className="text-apple-gray-500">Start:</span> <span className="text-[#1C1C1E]">{new Date(modal.data.start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
              <div><span className="text-apple-gray-500">End:</span> <span className="text-[#1C1C1E]">{modal.data.end ? new Date(modal.data.end).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</span></div>
              <div><span className="text-apple-gray-500">Progress:</span> <span className="text-apple-blue font-bold">{modal.data.progress}%</span></div>
              <div><span className="text-apple-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
            </div>
            {modal.data.notes && (
              <div className="pt-2 border-t border-apple-gray-200">
                <span className="text-apple-gray-500">Notes:</span>
                <p className="text-[#1C1C1E] mt-1">{modal.data.notes}</p>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <div className="flex-1 h-28 rounded-lg bg-gradient-to-br from-apple-blue/5 to-amber-600/5 border border-apple-gray-200 flex items-center justify-center">
                <div className="text-center"><Image className="w-6 h-6 text-apple-gray-500 mx-auto" /><p className="text-[9px] text-apple-gray-400 mt-1">Before Photo</p></div>
              </div>
              <div className="flex-1 h-28 rounded-lg bg-gradient-to-br from-emerald-500/5 to-green-600/5 border border-apple-gray-200 flex items-center justify-center">
                <div className="text-center"><Image className="w-6 h-6 text-apple-gray-500 mx-auto" /><p className="text-[9px] text-apple-gray-400 mt-1">After Photo</p></div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'update-progress'} onClose={() => setModal(null)} title={`Update Progress: ${modal?.data?.client || ''}`} size="sm">
        {modal?.data && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] text-apple-gray-500">Progress: {updateProgress}%</label>
              <input type="range" min={0} max={100} value={updateProgress} onChange={e => setUpdateProgress(Number(e.target.value))} className="w-full accent-ydl-yellow" />
              <input type="number" min={0} max={100} value={updateProgress} onChange={e => setUpdateProgress(Math.max(0, Math.min(100, Number(e.target.value))))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 mt-1" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => handleUpdateProgress(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><TrendingUp className="w-3 h-3 inline mr-1" /> Update</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'confirm-complete'} onClose={() => setModal(null)} title="Mark Complete" size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-apple-gray-400">Mark <span className="text-apple-blue">{modal.data.client}</span>'s transformation as complete?</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleMarkComplete(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"><CheckCircle className="w-3 h-3 inline mr-1" /> Complete</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'confirm-delete'} onClose={() => setModal(null)} title="Confirm Delete" size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-apple-gray-400">Delete <span className="text-apple-blue">{modal.data.client}</span>'s transformation? This cannot be undone.</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleDelete(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-red-500 rounded-lg hover:bg-red-600 transition-colors"><Trash2 className="w-3 h-3 inline mr-1" /> Delete</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
