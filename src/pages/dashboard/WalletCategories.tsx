import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Tags } from 'lucide-react'

import Modal from '../../components/shared/Modal'
import Table from '../../components/shared/Table'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface WalletCategory {
  id: number
  name: string
  type: 'Income' | 'Expense'
  description: string
  status: 'Active' | 'Inactive'
}

const initialCategories: WalletCategory[] = [
  { id: 1, name: 'Membership Fees', type: 'Income', description: 'Monthly membership payments', status: 'Active' },
  { id: 2, name: 'PT Sessions', type: 'Income', description: 'Personal training session fees', status: 'Active' },
  { id: 3, name: 'Rent', type: 'Expense', description: 'Monthly rent payment', status: 'Active' },
  { id: 4, name: 'Salaries', type: 'Expense', description: 'Staff salaries and wages', status: 'Active' },
  { id: 5, name: 'Supplements', type: 'Income', description: 'Supplement sales', status: 'Inactive' },
  { id: 6, name: 'Utilities', type: 'Expense', description: 'Electricity, water, internet', status: 'Active' },
]

export default function WalletCategories() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<WalletCategory[]>(initialCategories)
  const [modalOpen, setModalOpen] = useState(false)
  const [editCategory, setEditCategory] = useState<WalletCategory | null>(null)
  const [form, setForm] = useState({ name: '', type: 'Income' as WalletCategory['type'], description: '', status: 'Active' as WalletCategory['status'] })

  const openAdd = () => {
    setEditCategory(null)
    setForm({ name: '', type: 'Income', description: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (c: WalletCategory) => {
    setEditCategory(c)
    setForm({ name: c.name, type: c.type, description: c.description, status: c.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name) { toast('Please enter a category name.', 'error'); return }
    if (editCategory) {
      setCategories(prev => prev.map(c => c.id === editCategory.id ? { ...c, ...form } : c))
    } else {
      setCategories(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
    toast(editCategory ? 'Category updated.' : 'Category added.', 'success')
  }

  const removeCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    toast('Category removed.', 'info')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Wallet Categories</h1><p className="text-xs text-gray-500 mt-0.5">Manage income and expense categories.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Category Name', accessor: (r: WalletCategory) => <div className="flex items-center gap-2"><Tags className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-white font-medium">{r.name}</span></div> },
            { header: 'Type', accessor: (r: WalletCategory) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.type === 'Income' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{r.type}</span>
            )},
            { header: 'Description', accessor: (r: WalletCategory) => <span className="text-gray-400">{r.description}</span> },
            { header: 'Status', accessor: (r: WalletCategory) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{r.status}</span>
            )},
            { header: '', accessor: (r: WalletCategory) => (
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(r) },
                { label: 'Delete', icon: Trash2, onClick: () => removeCategory(r.id), color: 'text-red-400' },
              ]} />
            ), className: 'text-right' },
          ]}
          data={categories}
          keyExtractor={r => r.id}
        />
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editCategory ? 'Edit Category' : 'Add Category'} size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Category Name *</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Membership Fees" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Type</label>
            <div className="flex gap-2">
              {(['Income', 'Expense'] as const).map(t => (
                <button key={t} onClick={() => setForm(p => ({ ...p, type: t }))} className={`flex-1 py-2 text-xs font-medium rounded-lg border ${form.type === t ? (t === 'Income' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400') : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-white'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Description</label>
            <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Monthly membership payments" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as WalletCategory['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editCategory ? 'Update' : 'Add'} Category</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
