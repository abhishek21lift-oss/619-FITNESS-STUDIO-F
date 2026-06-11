import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Users, MessageSquare, Eye, FileText } from 'lucide-react'
import Modal from '../../../components/shared/Modal'

const groupOptions = ['All Enquiries', 'All Male Enquiries', 'All Female Enquiries', 'All Members', 'All Male Members', 'All Female Members', 'Expired Membership']
const categoryOptions = ['All Categories', 'Weight Training', 'Personal Training']

const recipientCounts: Record<string, number> = {
  'All Enquiries': 245,
  'All Male Enquiries': 142,
  'All Female Enquiries': 103,
  'All Members': 521,
  'All Male Members': 298,
  'All Female Members': 223,
  'Expired Membership': 67,
}

export default function Notifications() {
  const [group, setGroup] = useState('All Members')
  const [category, setCategory] = useState('All Categories')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const count = recipientCounts[group] || 0

  const handleSend = () => {
    setConfirmOpen(true)
  }

  const confirmSend = () => {
    setConfirmOpen(false)
    setTitle('')
    setBody('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Send Notification</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Push notifications to members, trainers, or staff.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Target Group</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={group} onChange={e => setGroup(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {groupOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Fitness Category</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {categoryOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Message Title <span className="text-apple-gray-400">({title.length}/100)</span></label>
            <input value={title} onChange={e => e.target.value.length <= 100 && setTitle(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Notification title" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-apple-gray-400">Message Body <span className="text-apple-gray-400">({body.length}/500)</span></label>
            <textarea value={body} onChange={e => e.target.value.length <= 500 && setBody(e.target.value)} rows={4} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors resize-none" placeholder="Type your notification message here..." />
            <div className="w-full bg-white/[0.03] rounded-lg h-1.5 overflow-hidden">
              <div className="h-full bg-ydl-yellow/40 transition-all" style={{ width: `${(body.length / 500) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-apple-gray-200">
          <button onClick={handleSend} disabled={!title || !body} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
            <Send className="w-3.5 h-3.5" /> Send Notification
          </button>
          <button onClick={() => setPreviewOpen(true)} className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] transition-colors">
            <MessageSquare className="w-3.5 h-3.5" /> Send as WhatsApp
          </button>
        </div>
        <p className="text-[10px] text-apple-gray-400 mt-3">Will be sent to approximately <span className="text-apple-gray-400 font-medium">{count}</span> recipients.</p>
      </motion.div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm Send" size="sm">
        <p className="text-xs text-apple-gray-400 mb-4">This notification will be sent to <span className="text-[#1C1C1E] font-medium">{count}</span> recipients in the <span className="text-apple-blue">{group}</span> group.</p>
        <div className="bg-white/[0.03] rounded-lg p-3 mb-4 border border-apple-gray-200">
          <p className="text-xs font-medium text-[#1C1C1E]">{title}</p>
          <p className="text-[11px] text-apple-gray-400 mt-1 line-clamp-2">{body}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={confirmSend} className="flex-1 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">Send Now</button>
          <button onClick={() => setConfirmOpen(false)} className="flex-1 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
        </div>
      </Modal>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Notification Preview" size="sm">
        <div className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-apple-blue/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-apple-blue" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-[#1C1C1E]">Your Digital Lift</p>
              <p className="text-[8px] text-apple-gray-500">Push Notification</p>
            </div>
          </div>
          <p className="text-xs font-semibold text-[#1C1C1E] mb-1">{title || 'Notification Title'}</p>
          <p className="text-[11px] text-apple-gray-400">{body || 'Your notification message will appear here...'}</p>
        </div>
      </Modal>
    </div>
  )
}

