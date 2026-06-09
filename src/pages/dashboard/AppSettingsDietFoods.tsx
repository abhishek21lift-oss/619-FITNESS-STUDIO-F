import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Apple } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import Table from '../../components/shared/Table'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface DietFood {
  id: number
  foodName: string
  category: 'Veg' | 'Non-Veg'
  calories: number
  protein: string
  carbs: string
  fat: string
  unit: string
}

const initialFoods: DietFood[] = [
  { id: 1, foodName: 'Chicken Breast', category: 'Non-Veg', calories: 165, protein: '31g', carbs: '0g', fat: '3.6g', unit: '100g' },
  { id: 2, foodName: 'Brown Rice', category: 'Veg', calories: 112, protein: '2.6g', carbs: '24g', fat: '0.9g', unit: '100g' },
  { id: 3, foodName: 'Eggs', category: 'Non-Veg', calories: 155, protein: '13g', carbs: '1.1g', fat: '11g', unit: '2 eggs' },
  { id: 4, foodName: 'Broccoli', category: 'Veg', calories: 34, protein: '2.8g', carbs: '7g', fat: '0.4g', unit: '100g' },
  { id: 5, foodName: 'Salmon', category: 'Non-Veg', calories: 208, protein: '20g', carbs: '0g', fat: '13g', unit: '100g' },
  { id: 6, foodName: 'Almonds', category: 'Veg', calories: 579, protein: '21g', carbs: '22g', fat: '50g', unit: '100g' },
]

export default function AppSettingsDietFoods() {
  const { toast } = useToast()
  const [foods, setFoods] = useState<DietFood[]>(initialFoods)
  const [modalOpen, setModalOpen] = useState(false)
  const [editFood, setEditFood] = useState<DietFood | null>(null)
  const [form, setForm] = useState({ foodName: '', category: 'Veg' as DietFood['category'], calories: 0, protein: '', carbs: '', fat: '', unit: '' })

  const openAdd = () => {
    setEditFood(null)
    setForm({ foodName: '', category: 'Veg', calories: 0, protein: '', carbs: '', fat: '', unit: '' })
    setModalOpen(true)
  }

  const openEdit = (f: DietFood) => {
    setEditFood(f)
    setForm({ foodName: f.foodName, category: f.category, calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat, unit: f.unit })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.foodName) { toast('Please enter food name.', 'error'); return }
    if (editFood) {
      setFoods(prev => prev.map(f => f.id === editFood.id ? { ...f, ...form } : f))
    } else {
      setFoods(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
    toast(editFood ? 'Food updated.' : 'Food added.', 'success')
  }

  const removeFood = (id: number) => {
    setFoods(prev => prev.filter(f => f.id !== id))
    toast('Food removed.', 'info')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Diet Foods</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage the food database for diet plans.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Food
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Food Name', accessor: (r: DietFood) => <div className="flex items-center gap-2"><Apple className="w-3.5 h-3.5 text-apple-blue" /><span className="text-[#1C1C1E] font-medium">{r.foodName}</span></div> },
            { header: 'Category', accessor: (r: DietFood) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.category === 'Veg' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{r.category}</span>
            )},
            { header: 'Calories', accessor: (r: DietFood) => <span>{r.calories} kcal</span> },
            { header: 'Protein', accessor: (r: DietFood) => <span>{r.protein}</span> },
            { header: 'Carbs', accessor: (r: DietFood) => <span>{r.carbs}</span> },
            { header: 'Fat', accessor: (r: DietFood) => <span>{r.fat}</span> },
            { header: 'Unit', accessor: (r: DietFood) => <span className="text-apple-gray-500">{r.unit}</span> },
            { header: '', accessor: (r: DietFood) => (
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(r) },
                { label: 'Delete', icon: Trash2, onClick: () => removeFood(r.id), color: 'text-red-400' },
              ]} />
            ), className: 'text-right' },
          ]}
          data={foods}
          keyExtractor={r => r.id}
        />
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editFood ? 'Edit Food' : 'Add Food'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Food Name *</label>
            <input value={form.foodName} onChange={e => setForm(p => ({ ...p, foodName: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Chicken Breast" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as DietFood['category'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Veg</option><option>Non-Veg</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Calories (kcal)</label>
              <input type="number" value={form.calories} onChange={e => setForm(p => ({ ...p, calories: parseInt(e.target.value) || 0 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Protein</label>
              <input value={form.protein} onChange={e => setForm(p => ({ ...p, protein: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="31g" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Carbs</label>
              <input value={form.carbs} onChange={e => setForm(p => ({ ...p, carbs: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="24g" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Fat</label>
              <input value={form.fat} onChange={e => setForm(p => ({ ...p, fat: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="3.6g" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Unit / Serving Size</label>
            <input value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="100g" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.foodName} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editFood ? 'Update' : 'Add'} Food</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
