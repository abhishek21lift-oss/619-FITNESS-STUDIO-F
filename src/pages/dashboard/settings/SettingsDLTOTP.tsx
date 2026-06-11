import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Hash, CheckCircle, XCircle, Clock } from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import { useToast } from '../../../components/ui/Toast'

interface Template {
  id: number
  name: string
  templateId: string
  status: 'Approved' | 'Pending' | 'Rejected'
}

const initialTemplates: Template[] = [
  { id: 1, name: 'OTP Login', templateId: 'TMPL-OTP-001', status: 'Approved' },
  { id: 2, name: 'Welcome Message', templateId: 'TMPL-WEL-001', status: 'Approved' },
  { id: 3, name: 'Payment Confirmation', templateId: 'TMPL-PAY-001', status: 'Pending' },
  { id: 4, name: 'Promotional Offer', templateId: 'TMPL-PRO-001', status: 'Rejected' },
]

export default function SettingsDLTOTP() {
  const [senderId, setSenderId] = useState('619FIT')
  const [principalEntityId, setPrincipalEntityId] = useState('')
  const [contentTemplateId, setContentTemplateId] = useState('')
  const [templates, setTemplates] = useState<Template[]>(initialTemplates)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({ name: '', templateId: '' })
  const { toast } = useToast()

  const handleAddTemplate = () => {
    if (!form.name || !form.templateId) return
    setTemplates(prev => [...prev, { id: Date.now(), ...form, status: 'Pending' }])
    setAddOpen(false)
    setForm({ name: '', templateId: '' })
    toast('Template added for DLT approval', 'success')
  }

  const statusIcon = (s: string) => {
    switch (s) {
      case 'Approved': return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
      case 'Pending': return <Clock className="w-3.5 h-3.5 text-amber-400" />
      case 'Rejected': return <XCircle className="w-3.5 h-3.5 text-red-400" />
      default: return null
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">DLT / OTP Settings</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">DLT registration and OTP template management.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-2xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><Hash className="w-3 h-3" /> Sender ID</label>
          <input value={senderId} onChange={e => setSenderId(e.target.value)} maxLength={6} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 uppercase" placeholder="6 char Sender ID" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><Hash className="w-3 h-3" /> DLT Principal Entity ID</label>
          <input value={principalEntityId} onChange={e => setPrincipalEntityId(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Enter DLT principal entity ID" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-apple-gray-400 flex items-center gap-1.5"><Hash className="w-3 h-3" /> DLT Content Template ID</label>
          <input value={contentTemplateId} onChange={e => setContentTemplateId(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Enter DLT content template ID" />
        </div>

        <div className="pt-4 border-t border-apple-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-[#1C1C1E]">Templates</h3>
            <button onClick={() => { setForm({ name: '', templateId: '' }); setAddOpen(true) }} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
              <Plus className="w-3 h-3" /> Add Template
            </button>
          </div>
          <div className="space-y-2">
            {templates.map(t => (
              <div key={t.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-apple-gray-200">
                <div>
                  <p className="text-[11px] font-medium text-[#1C1C1E]">{t.name}</p>
                  <p className="text-[9px] text-apple-gray-400 font-mono">{t.templateId}</p>
                </div>
                <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md border ${t.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : t.status === 'Pending' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                  {statusIcon(t.status)} {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Template" size="sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Template Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="OTP Login" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Template ID</label>
            <input value={form.templateId} onChange={e => setForm(p => ({ ...p, templateId: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="TMPL-OTP-001" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleAddTemplate} disabled={!form.name || !form.templateId} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">Add Template</button>
          <button onClick={() => setAddOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

