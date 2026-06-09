import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Dumbbell } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import Table from '../../components/shared/Table'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface Exercise {
  id: number
  exerciseName: string
  category: string
  equipment: string
  difficulty: string
  defaultSets: number
  defaultReps: string
}

const initialExercises: Exercise[] = [
  { id: 1, exerciseName: 'Bench Press', category: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate', defaultSets: 4, defaultReps: '8-12' },
  { id: 2, exerciseName: 'Deadlift', category: 'Back', equipment: 'Barbell', difficulty: 'Advanced', defaultSets: 3, defaultReps: '5-8' },
  { id: 3, exerciseName: 'Squat', category: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', defaultSets: 4, defaultReps: '8-10' },
  { id: 4, exerciseName: 'Shoulder Press', category: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner', defaultSets: 3, defaultReps: '10-12' },
  { id: 5, exerciseName: 'Bicep Curl', category: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner', defaultSets: 3, defaultReps: '12-15' },
  { id: 6, exerciseName: 'Plank', category: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner', defaultSets: 3, defaultReps: '30-60 sec' },
]

const exerciseCategories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']
const equipmentOptions = ['Barbell', 'Dumbbell', 'Machine', 'Cable', 'Bodyweight', 'Kettlebell', 'Resistance Band']
const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced']

export default function AppSettingsExercises() {
  const { toast } = useToast()
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)
  const [modalOpen, setModalOpen] = useState(false)
  const [editExercise, setEditExercise] = useState<Exercise | null>(null)
  const [form, setForm] = useState({ exerciseName: '', category: 'Chest', equipment: 'Barbell', difficulty: 'Beginner', defaultSets: 3, defaultReps: '' })

  const openAdd = () => {
    setEditExercise(null)
    setForm({ exerciseName: '', category: 'Chest', equipment: 'Barbell', difficulty: 'Beginner', defaultSets: 3, defaultReps: '' })
    setModalOpen(true)
  }

  const openEdit = (e: Exercise) => {
    setEditExercise(e)
    setForm({ exerciseName: e.exerciseName, category: e.category, equipment: e.equipment, difficulty: e.difficulty, defaultSets: e.defaultSets, defaultReps: e.defaultReps })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.exerciseName) { toast('Please enter an exercise name.', 'error'); return }
    if (editExercise) {
      setExercises(prev => prev.map(e => e.id === editExercise.id ? { ...e, ...form } : e))
    } else {
      setExercises(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
    toast(editExercise ? 'Exercise updated.' : 'Exercise added.', 'success')
  }

  const removeExercise = (id: number) => {
    setExercises(prev => prev.filter(e => e.id !== id))
    toast('Exercise removed.', 'info')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Exercises</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage the exercise library for workout plans.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Exercise
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Exercise Name', accessor: (r: Exercise) => <div className="flex items-center gap-2"><Dumbbell className="w-3.5 h-3.5 text-apple-blue" /><span className="text-[#1C1C1E] font-medium">{r.exerciseName}</span></div> },
            { header: 'Category', accessor: (r: Exercise) => <span className="text-apple-blue">{r.category}</span> },
            { header: 'Equipment', accessor: (r: Exercise) => <span>{r.equipment}</span> },
            { header: 'Difficulty', accessor: (r: Exercise) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.difficulty === 'Beginner' ? 'text-emerald-400 bg-emerald-500/10' : r.difficulty === 'Intermediate' ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10'}`}>{r.difficulty}</span>
            )},
            { header: 'Sets', accessor: (r: Exercise) => <span>{r.defaultSets}</span> },
            { header: 'Reps', accessor: (r: Exercise) => <span>{r.defaultReps}</span> },
            { header: '', accessor: (r: Exercise) => (
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(r) },
                { label: 'Delete', icon: Trash2, onClick: () => removeExercise(r.id), color: 'text-red-400' },
              ]} />
            ), className: 'text-right' },
          ]}
          data={exercises}
          keyExtractor={r => r.id}
        />
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editExercise ? 'Edit Exercise' : 'Add Exercise'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Exercise Name *</label>
            <input value={form.exerciseName} onChange={e => setForm(p => ({ ...p, exerciseName: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Bench Press" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {exerciseCategories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Equipment</label>
              <select value={form.equipment} onChange={e => setForm(p => ({ ...p, equipment: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {equipmentOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {difficultyOptions.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Default Sets</label>
              <input type="number" min={1} value={form.defaultSets} onChange={e => setForm(p => ({ ...p, defaultSets: parseInt(e.target.value) || 3 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Default Reps</label>
            <input value={form.defaultReps} onChange={e => setForm(p => ({ ...p, defaultReps: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="8-12" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.exerciseName} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editExercise ? 'Update' : 'Add'} Exercise</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
