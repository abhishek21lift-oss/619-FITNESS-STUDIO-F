import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Plus, Edit3, Trash2 } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

interface MeasurementField {
  id: number
  name: string
  unit: string
  order: number
  enabled: boolean
}

const initialFields: MeasurementField[] = [
  { id: 1, name: 'Weight', unit: 'kg', order: 1, enabled: true },
  { id: 2, name: 'Height', unit: 'cm', order: 2, enabled: true },
  { id: 3, name: 'Chest', unit: 'cm', order: 3, enabled: true },
  { id: 4, name: 'Waist', unit: 'cm', order: 4, enabled: true },
  { id: 5, name: 'Hips', unit: 'cm', order: 5, enabled: true },
  { id: 6, name: 'Arms', unit: 'cm', order: 6, enabled: true },
  { id: 7, name: 'Thighs', unit: 'cm', order: 7, enabled: true },
  { id: 8, name: 'Shoulders', unit: 'cm', order: 8, enabled: true },
  { id: 9, name: 'Body Fat %', unit: '%', order: 9, enabled: true },
  { id: 10, name: 'BMI', unit: 'kg/m²', order: 10, enabled: true },
  { id: 11, name: 'Calves', unit: 'cm', order: 11, enabled: false },
  { id: 12, name: 'Forearms', unit: 'cm', order: 12, enabled: false },
]

export default function AppSettingsMeasurements() {
  const [fields, setFields] = useState<MeasurementField[]>(initialFields)
  const [modalOpen, setModalOpen] = useState(false)
  const [editField, setEditField] = useState<MeasurementField | null>(null)
  const [form, setForm] = useState({ name: '', unit: '', order: fields.length + 1 })

  const openAdd = () => {
    setEditField(null)
    setForm({ name: '', unit: '', order: fields.length + 1 })
    setModalOpen(true)
  }

  const openEdit = (f: MeasurementField) => {
    setEditField(f)
    setForm({ name: f.name, unit: f.unit, order: f.order })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editField) {
      setFields(prev => prev.map(f => f.id === editField.id ? { ...f, ...form } : f))
    } else {
      setFields(prev => [...prev, { ...form, id: Date.now(), enabled: true }])
    }
    setModalOpen(false)
  }

  const toggleEnabled = (id: number) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))
  }

  const removeField = (id: number) => {
    setFields(prev => prev.filter(f => f.id !== id))
  }

  const sorted = [...fields].sort((a, b) => a.order - b.order)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Measurement Settings</h1><p className="text-xs text-apple-gray-500 mt-0.5">Configure client body measurement fields.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Field</button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">#</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Field</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Unit</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Visible</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apple-gray-200/50">
            {sorted.map((f, i) => (
              <motion.tr key={f.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-xs text-apple-gray-500">{f.order}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-apple-gray-500" /><span className="text-xs font-medium text-[#1C1C1E]">{f.name}</span></div></td>
                <td className="px-4 py-3 text-xs text-apple-gray-400">{f.unit}</td>
                <td className="px-4 py-3">
                  <div onClick={() => toggleEnabled(f.id)} className={`w-8 h-4 rounded-full relative cursor-pointer ${f.enabled ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                    <div className={`w-3 h-3 rounded-full absolute top-0.5 transition-all ${f.enabled ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionMenu actions={[
                    { label: 'Edit', icon: Edit3, onClick: () => openEdit(f) },
                    { label: 'Delete', icon: Trash2, onClick: () => removeField(f.id), color: 'text-red-400' },
                  ]} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editField ? 'Edit Field' : 'Add Custom Field'} size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Field Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Body Fat %" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Unit</label>
              <input value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="cm, kg, %" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Order</label>
              <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editField ? 'Update' : 'Add'} Field</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
