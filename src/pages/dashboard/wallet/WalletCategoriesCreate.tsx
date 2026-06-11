import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../components/ui/Toast'

export default function WalletCategoriesCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', type: 'Income', description: '', status: 'Active' })

  const handleSave = () => {
    if (!form.name) { toast('Please enter a category name.', 'error'); return }
    toast('Category created successfully!', 'success')
    navigate('/dashboard/wallet/categories')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/wallet/categories')} className="p-2 rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-apple-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-[#1C1C1E]">Create Category</h1><p className="text-xs text-apple-gray-500 mt-0.5">Add a new wallet category.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.name} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-apple-gray-200 bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Category Name *</label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Membership Fees" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Type</label>
          <div className="flex gap-2">
            {(['Income', 'Expense'] as const).map(t => (
              <button key={t} onClick={() => setForm(p => ({ ...p, type: t }))} className={`flex-1 py-2 text-xs font-medium rounded-lg border ${form.type === t ? (t === 'Income' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400') : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-[#1C1C1E]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Brief description of the category." />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
          <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
            <option>Active</option><option>Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/wallet/categories')} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}

