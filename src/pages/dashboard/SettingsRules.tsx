import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, ToggleLeft, Edit3, Trash2 } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface Rule {
  id: number
  name: string
  description: string
  status: 'Active' | 'Inactive'
}

const initialRules: Rule[] = [
  { id: 1, name: 'Auto-freeze after 30 days', description: 'Freeze membership if no check-in for 30 consecutive days.', status: 'Active' },
  { id: 2, name: 'Max PT booking per day', description: 'Limit PT session bookings to 2 per day per member.', status: 'Active' },
  { id: 3, name: 'Referral bonus cap', description: 'Maximum referral bonus of ₹500 per member per month.', status: 'Inactive' },
  { id: 4, name: 'Late fee calculation', description: 'Charge ₹50/day for overdue renewals after grace period.', status: 'Active' },
]

export default function SettingsRules() {
  const [rules, setRules] = useState<Rule[]>(initialRules)
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editRule, setEditRule] = useState<Rule | null>(null)
  const [form, setForm] = useState({ name: '', description: '', status: 'Active' as 'Active' | 'Inactive' })
  const { toast } = useToast()

  const filtered = rules.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()))

  const openAdd = () => {
    setEditRule(null)
    setForm({ name: '', description: '', status: 'Active' })
    setAddOpen(true)
  }

  const openEdit = (r: Rule) => {
    setEditRule(r)
    setForm({ name: r.name, description: r.description, status: r.status })
    setAddOpen(true)
  }

  const handleSave = () => {
    if (!form.name) return
    if (editRule) {
      setRules(prev => prev.map(r => r.id === editRule.id ? { ...r, ...form } : r))
    } else {
      setRules(prev => [...prev, { id: Date.now(), ...form }])
    }
    setAddOpen(false)
    toast(editRule ? 'Rule updated' : 'Rule added', 'success')
  }

  const handleDelete = (id: number) => {
    setRules(prev => prev.filter(r => r.id !== id))
    toast('Rule deleted', 'info')
  }

  const toggleStatus = (id: number) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r))
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Business Rules</h1><p className="text-xs text-gray-500 mt-0.5">Configure automated business logic and workflows.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Rule
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search rules..." />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Rule Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Description</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ydl-dark-border/50">
            {filtered.map((r, i) => (
              <motion.tr key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs font-medium text-white">{r.name}</td>
                <td className="px-4 py-3 text-xs text-gray-400 max-w-[300px] truncate">{r.description}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleStatus(r.id)} className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium rounded-md border transition-colors ${r.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-gray-400 bg-white/[0.03] border-ydl-dark-border'}`}>
                    <ToggleLeft className={`w-3 h-3 ${r.status === 'Active' ? 'text-emerald-400' : 'text-gray-500'}`} />
                    {r.status}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionMenu actions={[
                    { label: 'Edit', icon: Edit3, onClick: () => openEdit(r) },
                    { label: 'Delete', icon: Trash2, onClick: () => handleDelete(r.id), color: 'text-red-400' },
                  ]} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={editRule ? 'Edit Rule' : 'Add Rule'} size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Rule Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Auto-freeze after 30 days" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" placeholder="Describe what this rule does..." />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Status</label>
            <div className="flex items-center gap-2">
              {(['Active', 'Inactive'] as const).map(s => (
                <label key={s} className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-lg cursor-pointer border transition-colors ${form.status === s ? 'text-ydl-yellow bg-ydl-yellow/10 border-ydl-yellow/30' : 'text-gray-400 bg-white/5 border-ydl-dark-border hover:text-white'}`}>
                  <input type="radio" name="ruleStatus" checked={form.status === s} onChange={() => setForm(p => ({ ...p, status: s }))} className="w-3 h-3 accent-ydl-yellow" />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editRule ? 'Update Rule' : 'Add Rule'}</button>
          <button onClick={() => setAddOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
