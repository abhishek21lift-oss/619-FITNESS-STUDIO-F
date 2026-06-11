import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Search, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useToast } from '../../../components/ui/Toast'

interface WhatsAppMessage {
  id: number
  date: string
  to: string
  type: 'Template' | 'Text' | 'Media'
  message: string
  status: 'Sent' | 'Delivered' | 'Failed'
}

const initialMessages: WhatsAppMessage[] = [
  { id: 1, date: '07 Jun 2026 10:23 AM', to: '+91 9876543210', type: 'Template', message: 'Welcome to YourDigitalLift!', status: 'Delivered' },
  { id: 2, date: '07 Jun 2026 09:15 AM', to: '+91 8765432109', type: 'Text', message: 'Your session starts at 6 PM.', status: 'Sent' },
  { id: 3, date: '06 Jun 2026 08:30 PM', to: '+91 7654321098', type: 'Template', message: 'Payment confirmation #INV-2024', status: 'Delivered' },
  { id: 4, date: '06 Jun 2026 06:45 PM', to: '+91 6543210987', type: 'Media', message: 'Workout plan attachment', status: 'Failed' },
  { id: 5, date: '06 Jun 2026 04:00 PM', to: '+91 5432109876', type: 'Text', message: 'Reminder: Renewal due tomorrow.', status: 'Delivered' },
  { id: 6, date: '05 Jun 2026 02:30 PM', to: '+91 4321098765', type: 'Template', message: 'Happy Birthday! 🎉', status: 'Sent' },
]

export default function NotificationsWhatsAppHistory() {
  const [messages] = useState<WhatsAppMessage[]>(initialMessages)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const { toast } = useToast()

  const filtered = messages.filter(m => {
    if (statusFilter !== 'All' && m.status !== statusFilter) return false
    if (search && !m.to.toLowerCase().includes(search.toLowerCase()) && !m.message.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleRetry = (id: number) => {
    toast(`Retrying message #${id}...`, 'info')
  }

  const statusIcon = (s: string) => {
    switch (s) {
      case 'Sent': return <Clock className="w-3 h-3 text-[#007AFF]" />
      case 'Delivered': return <CheckCircle className="w-3 h-3 text-emerald-400" />
      case 'Failed': return <XCircle className="w-3 h-3 text-red-400" />
      default: return null
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">WhatsApp History</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Sent WhatsApp messages and delivery status.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search by number or message..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark]" />
          <span className="text-[10px] text-apple-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark]" />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-apple-gray-200 bg-white/[0.02] p-0.5">
          {(['All', 'Sent', 'Delivered', 'Failed'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${statusFilter === s ? 'text-black bg-apple-gradient-blue' : 'text-apple-gray-400 hover:text-[#1C1C1E]'}`}>{s}</button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">To</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Message</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((m, i) => (
                <motion.tr key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-[10px] text-apple-gray-400">{m.date}</td>
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{m.to}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${m.type === 'Template' ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : m.type === 'Text' ? 'text-[#007AFF] bg-blue-500/10 border-blue-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>{m.type}</span></td>
                  <td className="px-4 py-3 text-[11px] text-apple-gray-600 max-w-[200px] truncate">{m.message}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-[10px] font-medium ${m.status === 'Sent' ? 'text-[#007AFF]' : m.status === 'Delivered' ? 'text-emerald-400' : 'text-red-400'}`}>{statusIcon(m.status)} {m.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleRetry(m.id)} disabled={m.status !== 'Failed'} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-apple-blue bg-apple-blue/10 border border-ydl-yellow/20 rounded-lg hover:bg-apple-blue/20 disabled:opacity-30 disabled:cursor-not-allowed">
                      <RefreshCw className="w-3 h-3" /> Retry
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

