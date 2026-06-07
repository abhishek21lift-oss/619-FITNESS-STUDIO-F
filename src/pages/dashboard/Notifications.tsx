import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Users, MessageSquare } from 'lucide-react'

const groupOptions = ['All Members', 'Active Members', 'Inactive Members', 'Trainers', 'Staff', 'Specific Members']

export default function Notifications() {
  const [group, setGroup] = useState('All Members')
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Send Notification</h1>
        <p className="text-xs text-gray-500 mt-0.5">Push notifications to members, trainers, or staff.</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5 max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Target Group</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <select value={group} onChange={e => setGroup(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {groupOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Title</label>
            <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Notification title" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Body</label>
            <textarea rows={4} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors resize-none" placeholder="Type your notification message here..." />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ydl-dark-border">
          <button className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Send className="w-3.5 h-3.5" /> Send Notification
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            <MessageSquare className="w-3.5 h-3.5" /> Send as WhatsApp
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-3">Will be sent to approximately 991 recipients.</p>
      </motion.div>
    </div>
  )
}
