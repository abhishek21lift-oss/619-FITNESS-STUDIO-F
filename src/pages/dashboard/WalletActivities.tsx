import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Activity } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import Table from '../../components/shared/Table'
import ActionMenu from '../../components/shared/ActionMenu'
import { useToast } from '../../components/ui/Toast'

interface WalletActivity {
  id: number
  activityName: string
  category: string
  price: number
  duration: string
  status: 'Active' | 'Inactive'
}

const initialActivities: WalletActivity[] = [
  { id: 1, activityName: 'PT Session', category: 'Training', price: 1500, duration: '60 min', status: 'Active' },
  { id: 2, activityName: 'Yoga Class', category: 'Group', price: 500, duration: '45 min', status: 'Active' },
  { id: 3, activityName: 'Steam Bath', category: 'Wellness', price: 300, duration: '30 min', status: 'Active' },
  { id: 4, activityName: 'Diet Consultation', category: 'Nutrition', price: 2000, duration: '45 min', status: 'Inactive' },
  { id: 5, activityName: 'Body Composition Test', category: 'Assessment', price: 800, duration: '15 min', status: 'Active' },
]

const categoryOptions = ['Training', 'Group', 'Wellness', 'Nutrition', 'Assessment']

export default function WalletActivities() {
  const { toast } = useToast()
  const [activities, setActivities] = useState<WalletActivity[]>(initialActivities)
  const [modalOpen, setModalOpen] = useState(false)
  const [editActivity, setEditActivity] = useState<WalletActivity | null>(null)
  const [form, setForm] = useState({ activityName: '', category: 'Training', price: 0, duration: '', status: 'Active' as WalletActivity['status'] })

  const openAdd = () => {
    setEditActivity(null)
    setForm({ activityName: '', category: 'Training', price: 0, duration: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (a: WalletActivity) => {
    setEditActivity(a)
    setForm({ activityName: a.activityName, category: a.category, price: a.price, duration: a.duration, status: a.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.activityName) { toast('Please enter an activity name.', 'error'); return }
    if (editActivity) {
      setActivities(prev => prev.map(a => a.id === editActivity.id ? { ...a, ...form } : a))
    } else {
      setActivities(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
    toast(editActivity ? 'Activity updated.' : 'Activity added.', 'success')
  }

  const removeActivity = (id: number) => {
    setActivities(prev => prev.filter(a => a.id !== id))
    toast('Activity removed.', 'info')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Wallet Activities</h1><p className="text-xs text-apple-gray-500 mt-0.5">Manage billable activities and services.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Activity
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Activity Name', accessor: (r: WalletActivity) => <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-apple-blue" /><span className="text-[#1C1C1E] font-medium">{r.activityName}</span></div> },
            { header: 'Category', accessor: (r: WalletActivity) => <span className="text-apple-blue">{r.category}</span> },
            { header: 'Price', accessor: (r: WalletActivity) => <span className="font-medium">₹{r.price.toLocaleString('en-IN')}</span> },
            { header: 'Duration', accessor: (r: WalletActivity) => <span>{r.duration}</span> },
            { header: 'Status', accessor: (r: WalletActivity) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-apple-gray-400 bg-gray-500/10'}`}>{r.status}</span>
            )},
            { header: '', accessor: (r: WalletActivity) => (
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(r) },
                { label: 'Delete', icon: Trash2, onClick: () => removeActivity(r.id), color: 'text-red-400' },
              ]} />
            ), className: 'text-right' },
          ]}
          data={activities}
          keyExtractor={r => r.id}
        />
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editActivity ? 'Edit Activity' : 'Add Activity'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Activity Name *</label>
            <input value={form.activityName} onChange={e => setForm(p => ({ ...p, activityName: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="PT Session" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                {categoryOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Price (₹)</label>
              <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: parseInt(e.target.value) || 0 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Duration</label>
            <input value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="60 min" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as WalletActivity['status'] }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.activityName} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editActivity ? 'Update' : 'Add'} Activity</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
