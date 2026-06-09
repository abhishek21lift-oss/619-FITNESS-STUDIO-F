import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, BookOpen } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import Table from '../../components/shared/Table'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface Recipe {
  id: number
  recipeName: string
  ingredients: string
  instructions: string
  status: 'Active' | 'Inactive'
}

const initialRecipes: Recipe[] = [
  { id: 1, recipeName: 'Banana Pancakes', ingredients: 'Banana, eggs, oats, cinnamon', instructions: 'Mash banana, mix with eggs and oats, cook on pan.', status: 'Active' },
  { id: 2, recipeName: 'Protein Balls', ingredients: 'Oats, peanut butter, protein powder, honey', instructions: 'Mix all ingredients, roll into balls, refrigerate.', status: 'Active' },
  { id: 3, recipeName: 'Avocado Toast', ingredients: 'Bread, avocado, salt, pepper, lemon', instructions: 'Toast bread, mash avocado, spread on top.', status: 'Inactive' },
]

export default function AppSettingsRecipes() {
  const { toast } = useToast()
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [modalOpen, setModalOpen] = useState(false)
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null)
  const [form, setForm] = useState({ recipeName: '', ingredients: '', instructions: '', status: 'Active' as Recipe['status'] })

  const openAdd = () => {
    setEditRecipe(null)
    setForm({ recipeName: '', ingredients: '', instructions: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (r: Recipe) => {
    setEditRecipe(r)
    setForm({ recipeName: r.recipeName, ingredients: r.ingredients, instructions: r.instructions, status: r.status })
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
        <div><h1 className="text-lg font-bold text-white">Recipes</h1><p className="text-xs text-gray-500 mt-0.5">General recipes for members and trainers.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Recipe
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Recipe Name', accessor: (r: Recipe) => <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-white font-medium">{r.recipeName}</span></div> },
            { header: 'Ingredients', accessor: (r: Recipe) => <span className="text-gray-400 max-w-[200px] truncate block">{r.ingredients}</span> },
            { header: 'Instructions', accessor: (r: Recipe) => <span className="text-gray-400 max-w-[250px] truncate block">{r.instructions}</span> },
            { header: 'Status', accessor: (r: Recipe) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{r.status}</span>
            )},
            { header: '', accessor: (r: Recipe) => (
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
            <label className="text-[10px] font-medium text-gray-400">Recipe Name *</label>
            <input value={form.recipeName} onChange={e => setForm(p => ({ ...p, recipeName: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Banana Pancakes" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Ingredients</label>
            <textarea value={form.ingredients} onChange={e => setForm(p => ({ ...p, ingredients: e.target.value }))} rows={2} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Banana, eggs, oats, cinnamon" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Instructions</label>
            <textarea value={form.instructions} onChange={e => setForm(p => ({ ...p, instructions: e.target.value }))} rows={3} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Mash banana, mix with eggs and oats, cook on pan." />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Recipe['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.recipeName} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editRecipe ? 'Update' : 'Add'} Recipe</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
