import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, BookOpen } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import Table from '../../components/shared/Table'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface DietRecipe {
  id: number
  recipeName: string
  category: string
  calories: number
  prepTime: string
  status: 'Active' | 'Inactive'
}

const initialRecipes: DietRecipe[] = [
  { id: 1, recipeName: 'Grilled Chicken Salad', category: 'Lunch', calories: 350, prepTime: '20 min', status: 'Active' },
  { id: 2, recipeName: 'Overnight Oats', category: 'Breakfast', calories: 280, prepTime: '10 min', status: 'Active' },
  { id: 3, recipeName: 'Protein Smoothie', category: 'Snack', calories: 220, prepTime: '5 min', status: 'Active' },
  { id: 4, recipeName: 'Baked Salmon with Veggies', category: 'Dinner', calories: 420, prepTime: '35 min', status: 'Inactive' },
  { id: 5, recipeName: 'Quinoa Bowl', category: 'Lunch', calories: 390, prepTime: '25 min', status: 'Active' },
]

const recipeCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']

export default function AppSettingsDietRecipes() {
  const { toast } = useToast()
  const [recipes, setRecipes] = useState<DietRecipe[]>(initialRecipes)
  const [modalOpen, setModalOpen] = useState(false)
  const [editRecipe, setEditRecipe] = useState<DietRecipe | null>(null)
  const [form, setForm] = useState({ recipeName: '', category: 'Breakfast', calories: 0, prepTime: '', status: 'Active' as DietRecipe['status'] })

  const openAdd = () => {
    setEditRecipe(null)
    setForm({ recipeName: '', category: 'Breakfast', calories: 0, prepTime: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (r: DietRecipe) => {
    setEditRecipe(r)
    setForm({ recipeName: r.recipeName, category: r.category, calories: r.calories, prepTime: r.prepTime, status: r.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.recipeName) { toast('Please enter a recipe name.', 'error'); return }
    if (editRecipe) {
      setRecipes(prev => prev.map(r => r.id === editRecipe.id ? { ...r, ...form } : r))
    } else {
      setRecipes(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
    toast(editRecipe ? 'Recipe updated.' : 'Recipe added.', 'success')
  }

  const removeRecipe = (id: number) => {
    setRecipes(prev => prev.filter(r => r.id !== id))
    toast('Recipe removed.', 'info')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Diet Recipes</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage recipes used in diet plans.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Recipe
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Recipe Name', accessor: (r: DietRecipe) => <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-apple-blue" /><span className="text-[#1C1C1E] font-medium">{r.recipeName}</span></div> },
            { header: 'Category', accessor: (r: DietRecipe) => <span className="text-apple-blue">{r.category}</span> },
            { header: 'Calories', accessor: (r: DietRecipe) => <span>{r.calories} kcal</span> },
            { header: 'Prep Time', accessor: (r: DietRecipe) => <span>{r.prepTime}</span> },
            { header: 'Status', accessor: (r: DietRecipe) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-apple-gray-400 bg-gray-500/10'}`}>{r.status}</span>
            )},
            { header: '', accessor: (r: DietRecipe) => (
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(r) },
                { label: 'Delete', icon: Trash2, onClick: () => removeRecipe(r.id), color: 'text-red-400' },
              ]} />
            ), className: 'text-right' },
          ]}
          data={recipes}
          keyExtractor={r => r.id}
        />
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editRecipe ? 'Edit Recipe' : 'Add Recipe'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Recipe Name *</label>
            <input value={form.recipeName} onChange={e => setForm(p => ({ ...p, recipeName: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Grilled Chicken Salad" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {recipeCategories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Calories</label>
              <input type="number" value={form.calories} onChange={e => setForm(p => ({ ...p, calories: parseInt(e.target.value) || 0 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Prep Time</label>
            <input value={form.prepTime} onChange={e => setForm(p => ({ ...p, prepTime: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="20 min" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as DietRecipe['status'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.recipeName} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editRecipe ? 'Update' : 'Add'} Recipe</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
