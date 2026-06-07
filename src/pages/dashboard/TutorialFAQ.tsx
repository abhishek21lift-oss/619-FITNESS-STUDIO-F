import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus, ChevronDown, Edit3, Trash2, Search } from 'lucide-react'

const faqs = [
  { q: 'How do I add a new member?', a: 'Go to Members > Add Member and fill in the required details including name, mobile, email, and assign a membership plan.', category: 'Members' },
  { q: 'How do I create a follow-up task?', a: 'Navigate to Enquiry List, click on "Follow Up" next to any enquiry, or use the Follow Ups section to schedule tasks.', category: 'Enquiry' },
  { q: 'How do I generate a receipt?', a: 'Go to Billing Analysis and process payments. Receipts are auto-generated and can be downloaded as PDF.', category: 'Accounts' },
  { q: 'How do I assign a trainer?', a: 'In the Add Enquiry or Add Member form, use the "Assign Trainer" dropdown to select from available trainers.', category: 'Trainers' },
  { q: 'How do I set up WhatsApp notifications?', a: 'Go to Notification & WhatsApp > WhatsApp Settings and scan the QR code to connect your WhatsApp Business account.', category: 'Communication' },
]

export default function TutorialFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Admin FAQ</h1><p className="text-xs text-gray-500 mt-0.5">Frequently asked questions.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add FAQ</button>
      </div>
      <div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search FAQs..." /></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {filtered.map((faq, i) => (
          <div key={i} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-ydl-yellow flex-shrink-0" /><span className="text-xs font-medium text-white">{faq.q}</span></div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-1.5 py-0.5 rounded">{faq.category}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-[11px] text-gray-400 leading-relaxed">{faq.a}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3 h-3" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
