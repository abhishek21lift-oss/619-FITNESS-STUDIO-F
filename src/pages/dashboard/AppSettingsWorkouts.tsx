import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Plus, Edit3, Trash2, Play, ClipboardCopy, Salad, Flame } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface WorkoutPlan {
  id: number
  name: string
  category: string
  difficulty: string
  duration: string
  exercises: number
  description: string
}

interface DietPlan {
  id: number
  name: string
  type: string
  calories: string
  meals: number
  duration: string
  description: string
}

const initialWorkouts: WorkoutPlan[] = [
  { id: 1, name: 'Full Body Blast', duration: '45 min', difficulty: 'Intermediate', exercises: 8, category: 'Strength', description: 'Complete full body workout targeting all major muscle groups.' },
  { id: 2, name: 'HIIT Cardio', duration: '30 min', difficulty: 'Advanced', exercises: 12, category: 'Cardio', description: 'High intensity interval training for maximum calorie burn.' },
  { id: 3, name: 'Yoga Flow', duration: '60 min', difficulty: 'Beginner', exercises: 15, category: 'Yoga', description: 'Relaxing yoga flow for flexibility and mindfulness.' },
  { id: 4, name: 'Core Crusher', duration: '20 min', difficulty: 'All Levels', exercises: 6, category: 'Core', description: 'Focused core workout to strengthen abs and back.' },
  { id: 5, name: 'Lower Body Pump', duration: '40 min', difficulty: 'Intermediate', exercises: 7, category: 'Strength', description: 'Leg day workout focusing on quads, hamstrings, and glutes.' },
]

const initialDiets: DietPlan[] = [
  { id: 1, name: 'Weight Loss Plan', type: 'Veg', calories: '1,800', meals: 5, duration: '12 weeks', description: 'Calorie-controlled vegetarian diet for weight loss.' },
  { id: 2, name: 'Muscle Gain Plan', type: 'Non-Veg', calories: '3,200', meals: 6, duration: '8 weeks', description: 'High protein non-vegetarian diet for muscle building.' },
  { id: 3, name: 'Maintenance Plan', type: 'Mixed', calories: '2,400', meals: 4, duration: 'Ongoing', description: 'Balanced diet for maintaining current weight and health.' },
  { id: 4, name: 'Keto Diet Plan', type: 'Non-Veg', calories: '1,900', meals: 4, duration: '6 weeks', description: 'Low carb, high fat keto diet plan.' },
]

const workoutCategories = ['Strength', 'Cardio', 'Yoga', 'Core', 'Flexibility']
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels']
const dietTypes = ['Veg', 'Non-Veg', 'Mixed']

const typeColors: Record<string, string> = {
  Veg: 'text-emerald-400 bg-emerald-500/10',
  'Non-Veg': 'text-red-400 bg-red-500/10',
  Mixed: 'text-amber-400 bg-amber-500/10',
}

export default function AppSettingsWorkouts() {
  const [tab, setTab] = useState<'workout' | 'diet'>('workout')
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>(initialWorkouts)
  const [diets, setDiets] = useState<DietPlan[]>(initialDiets)
  const [modalOpen, setModalOpen] = useState(false)
  const [workoutForm, setWorkoutForm] = useState({ name: '', category: 'Strength', difficulty: 'Intermediate', duration: '', description: '' })
  const [dietForm, setDietForm] = useState({ name: '', type: 'Veg', calories: '', meals: 3, duration: '', description: '' })
  const [editMode, setEditMode] = useState<'workout' | 'diet' | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const { toast } = useToast()

  const openAddWorkout = () => {
    setEditMode('workout')
    setEditId(null)
    setWorkoutForm({ name: '', category: 'Strength', difficulty: 'Intermediate', duration: '', description: '' })
    setModalOpen(true)
  }

  const openEditWorkout = (w: WorkoutPlan) => {
    setEditMode('workout')
    setEditId(w.id)
    setWorkoutForm({ name: w.name, category: w.category, difficulty: w.difficulty, duration: w.duration, description: w.description })
    setModalOpen(true)
  }

  const openAddDiet = () => {
    setEditMode('diet')
    setEditId(null)
    setDietForm({ name: '', type: 'Veg', calories: '', meals: 3, duration: '', description: '' })
    setModalOpen(true)
  }

  const openEditDiet = (d: DietPlan) => {
    setEditMode('diet')
    setEditId(d.id)
    setDietForm({ name: d.name, type: d.type, calories: d.calories, meals: d.meals, duration: d.duration, description: d.description })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editMode === 'workout') {
      if (editId) {
        setWorkouts(prev => prev.map(w => w.id === editId ? { ...w, ...workoutForm } : w))
      } else {
        setWorkouts(prev => [...prev, { ...workoutForm, id: Date.now(), exercises: 0 }])
      }
    } else {
      if (editId) {
        setDiets(prev => prev.map(d => d.id === editId ? { ...d, ...dietForm } : d))
      } else {
        setDiets(prev => [...prev, { ...dietForm, id: Date.now() }])
      }
    }
    setModalOpen(false)
  }

  const duplicateWorkout = (w: WorkoutPlan) => {
    setWorkouts(prev => [...prev, { ...w, id: Date.now(), name: `${w.name} (Copy)` }])
  }

  const duplicateDiet = (d: DietPlan) => {
    setDiets(prev => [...prev, { ...d, id: Date.now(), name: `${d.name} (Copy)` }])
  }

  const removeWorkout = (id: number) => setWorkouts(prev => prev.filter(w => w.id !== id))
  const removeDiet = (id: number) => setDiets(prev => prev.filter(d => d.id !== id))

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Workouts & Diet Plans</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage exercise and nutrition content.</p></div>
        <button onClick={tab === 'workout' ? openAddWorkout : openAddDiet} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add {tab === 'workout' ? 'Workout' : 'Diet Plan'}</button>
      </div>

      <div className="flex gap-1.5">
        <button onClick={() => setTab('workout')} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${tab === 'workout' ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500'}`}><Dumbbell className="w-3 h-3 inline mr-1" />Workout Plans</button>
        <button onClick={() => setTab('diet')} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${tab === 'diet' ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500'}`}><Salad className="w-3 h-3 inline mr-1" />Diet Plans</button>
      </div>

      {tab === 'workout' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {workouts.map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-apple-blue" />
                  <div><p className="text-xs font-medium text-[#1C1C1E]">{w.name}</p><p className="text-[9px] text-apple-gray-500">{w.duration} · {w.difficulty}</p></div>
                </div>
                <ActionMenu actions={[
                  { label: 'Edit', icon: Edit3, onClick: () => openEditWorkout(w) },
                  { label: 'View Details', icon: Play, onClick: () => toast(`${w.name}: ${w.description} (${w.difficulty}, ${w.duration})`, 'info') },
                  { label: 'Duplicate', icon: ClipboardCopy, onClick: () => duplicateWorkout(w) },
                  { label: 'Delete', icon: Trash2, onClick: () => removeWorkout(w.id), color: 'text-red-400' },
                ]} />
              </div>
              <p className="text-[9px] text-apple-gray-500 mt-2 line-clamp-2">{w.description}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-apple-gray-200">
                <span className="text-[9px] text-apple-gray-500">{w.exercises} exercises</span>
                <span className="text-[9px] font-medium text-apple-blue bg-apple-blue/10 px-1.5 py-0.5 rounded">{w.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {diets.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Salad className="w-4 h-4 text-apple-blue" />
                  <div><p className="text-xs font-medium text-[#1C1C1E]">{d.name}</p><p className="text-[9px] text-apple-gray-500">{d.duration}</p></div>
                </div>
                <ActionMenu actions={[
                  { label: 'Edit', icon: Edit3, onClick: () => openEditDiet(d) },
                  { label: 'View Details', icon: Play, onClick: () => toast(`${d.name}: ${d.description} (${d.calories} cal, ${d.duration})`, 'info') },
                  { label: 'Duplicate', icon: ClipboardCopy, onClick: () => duplicateDiet(d) },
                  { label: 'Delete', icon: Trash2, onClick: () => removeDiet(d.id), color: 'text-red-400' },
                ]} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded-md ${typeColors[d.type]}`}>{d.type}</span>
                <span className="text-[9px] text-apple-gray-500"><Flame className="w-2.5 h-2.5 inline mr-0.5" />{d.calories} cal</span>
                <span className="text-[9px] text-apple-gray-500">{d.meals} meals</span>
              </div>
              <p className="text-[9px] text-apple-gray-500 mt-1 line-clamp-2">{d.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editMode === 'workout' ? (editId ? 'Edit Workout' : 'Add Workout Plan') : (editId ? 'Edit Diet Plan' : 'Add Diet Plan')} size="md">
        {editMode === 'workout' ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Plan Name</label>
              <input value={workoutForm.name} onChange={e => setWorkoutForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Full Body Blast" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
                <select value={workoutForm.category} onChange={e => setWorkoutForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                  {workoutCategories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Difficulty</label>
                <select value={workoutForm.difficulty} onChange={e => setWorkoutForm(p => ({ ...p, difficulty: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                  {difficultyLevels.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Duration</label>
              <input value={workoutForm.duration} onChange={e => setWorkoutForm(p => ({ ...p, duration: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="45 min" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
              <textarea value={workoutForm.description} onChange={e => setWorkoutForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Plan Name</label>
              <input value={dietForm.name} onChange={e => setDietForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Weight Loss Plan" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Type</label>
                <select value={dietForm.type} onChange={e => setDietForm(p => ({ ...p, type: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                  {dietTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Calories</label>
                <input value={dietForm.calories} onChange={e => setDietForm(p => ({ ...p, calories: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="2,400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Meals per Day</label>
                <input type="number" value={dietForm.meals} onChange={e => setDietForm(p => ({ ...p, meals: parseInt(e.target.value) || 3 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Duration</label>
                <input value={dietForm.duration} onChange={e => setDietForm(p => ({ ...p, duration: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="12 weeks" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
              <textarea value={dietForm.description} onChange={e => setDietForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={editMode === 'workout' ? !workoutForm.name : !dietForm.name} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editId ? 'Update' : 'Add'} Plan</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
