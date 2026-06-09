import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus, ChevronDown, Edit3, Trash2, Search, X } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

const categories = ['General', 'Members', 'Billing', 'Reports', 'Settings']

const initialFAQs: FAQ[] = [
  { id: 1, question: 'How do I add a new member?', answer: 'Go to Members > Add Member and fill in the required details including name, mobile, email, and assign a membership plan. You can also add optional details like emergency contact, medical conditions, and photo.', category: 'Members' },
  { id: 2, question: 'How do I create a follow-up task?', answer: 'Navigate to Enquiry List, click on "Follow Up" next to any enquiry, or use the Follow Ups section to schedule tasks. Set the date, time, assigned staff, and notes for the follow-up.', category: 'General' },
  { id: 3, question: 'How do I generate a receipt?', answer: 'Go to Billing Analysis and process payments. Receipts are auto-generated and can be downloaded as PDF. You can also email receipts directly to members from the system.', category: 'Billing' },
  { id: 4, question: 'How do I assign a trainer?', answer: 'In the Add Enquiry or Add Member form, use the "Assign Trainer" dropdown to select from available trainers. You can also change trainer assignment from the member profile page.', category: 'Members' },
  { id: 5, question: 'How do I set up WhatsApp notifications?', answer: 'Go to Notifications > WhatsApp Settings and scan the QR code to connect your WhatsApp Business account. Once connected, you can send automated messages for reminders, payments, and promotions.', category: 'Settings' },
  { id: 6, question: 'How do I view monthly revenue reports?', answer: 'Navigate to Analysis > Revenue Forecast or Profit & Loss. Use the date range filter to select the period. All reports can be exported to CSV or PDF.', category: 'Reports' },
  { id: 7, question: 'How do I add a new membership plan?', answer: 'Go to Memberships > Plans and click Add Plan. Enter plan name, price, duration, features, and status. You can set up multiple plans with different pricing tiers.', category: 'Billing' },
  { id: 8, question: 'How do I manage staff accounts?', answer: 'Go to Staff > Add Staff to create new staff accounts. Set their role, permissions, and access level. Staff can be trainers, receptionists, or managers with different permissions.', category: 'Settings' },
  { id: 9, question: 'How do I generate attendance reports?', answer: 'Go to Analysis > Traffic or Attendance reports. You can filter by date range, member type, or trainer. Reports show check-in patterns, peak hours, and member engagement.', category: 'Reports' },
  { id: 10, question: 'How do I handle membership renewals?', answer: 'The system sends automatic reminders before expiry. From the member profile, click Renew to process payment and extend membership. You can also set up auto-renewal for members.', category: 'Members' },
]

export default function TutorialFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs)
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editFaq, setEditFaq] = useState<FAQ | null>(null)
  const [form, setForm] = useState({ question: '', answer: '', category: 'General' })

  const filtered = faqs.filter(f => {
    const matchCat = category === 'All' || f.category === category
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const openAdd = () => {
    setEditFaq(null)
    setForm({ question: '', answer: '', category: 'General' })
    setModalOpen(true)
  }

  const openEdit = (faq: FAQ) => {
    setEditFaq(faq)
    setForm({ question: faq.question, answer: faq.answer, category: faq.category })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editFaq) {
      setFaqs(prev => prev.map(f => f.id === editFaq.id ? { ...f, ...form } : f))
    } else {
      setFaqs(prev => [...prev, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const removeFaq = (id: number) => {
    setFaqs(prev => prev.filter(f => f.id !== id))
  }

  const uniqueCategories = [...new Set(faqs.map(f => f.category))]

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Admin FAQ</h1><p className="text-xs text-apple-gray-500 mt-0.5">Frequently asked questions.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add FAQ</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Total FAQs" value={faqs.length} icon={HelpCircle} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Categories" value={uniqueCategories.length} icon={ChevronDown} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
        <StatsCard label="Most Viewed" value={uniqueCategories[0] || 'General'} icon={Search} color="from-amber-500/20 to-amber-600/5" border="border-amber-500/30" text="text-amber-400" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search FAQs..." />
          {search && <X className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-apple-gray-500 cursor-pointer hover:text-[#1C1C1E]" onClick={() => setSearch('')} />}
        </div>
        <div className="flex gap-1.5">
          {['All', ...categories].map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${category === c ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{c}</button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {filtered.map((faq) => {
          const actualIdx = faqs.findIndex(f => f.id === faq.id)
          return (
            <div key={faq.id} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === actualIdx ? null : actualIdx)} className="w-full flex items-center justify-between p-4 text-left">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <HelpCircle className="w-4 h-4 text-apple-blue flex-shrink-0" />
                  <span className="text-xs font-medium text-[#1C1C1E]">{faq.question}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-[9px] font-medium text-apple-blue bg-apple-blue/10 px-1.5 py-0.5 rounded">{faq.category}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-apple-gray-500 transition-transform ${openIdx === actualIdx ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === actualIdx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-[11px] text-apple-gray-400 leading-relaxed">{faq.answer}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <button onClick={() => openEdit(faq)} className="p-1.5 text-apple-gray-500 hover:text-[#007AFF] hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => removeFaq(faq.id)} className="p-1.5 text-apple-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </motion.div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editFaq ? 'Edit FAQ' : 'Add FAQ'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Question</label>
            <input value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="How do I add a new member?" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Answer</label>
            <textarea value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} rows={4} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 resize-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-apple-gray-400">Category</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.question || !form.answer} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 disabled:opacity-40">{editFaq ? 'Update' : 'Add'} FAQ</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
