import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react'

interface TransactionalSMS {
  id: number
  date: string
  to: string
  template: string
  message: string
  status: 'Sent' | 'Delivered' | 'Failed'
  cost: number
}

const initialData: TransactionalSMS[] = [
  { id: 1, date: '07 Jun 2026 10:23 AM', to: '+91 9876543210', template: 'OTP Login', message: 'Your OTP is 738291. Valid for 5 mins.', status: 'Delivered', cost: 0.25 },
  { id: 2, date: '07 Jun 2026 09:15 AM', to: '+91 8765432109', template: 'Payment Confirm', message: 'Payment of ₹7,999 received. Thank you!', status: 'Sent', cost: 0.25 },
  { id: 3, date: '06 Jun 2026 08:30 PM', to: '+91 7654321098', template: 'Welcome', message: 'Welcome to YourDigitalLift! Start your fitness journey.', status: 'Delivered', cost: 0.25 },
  { id: 4, date: '06 Jun 2026 06:45 PM', to: '+91 6543210987', template: 'Due Reminder', message: 'Your membership renews in 3 days.', status: 'Failed', cost: 0.00 },
  { id: 5, date: '06 Jun 2026 04:00 PM', to: '+91 5432109876', template: 'OTP Login', message: 'Your OTP is 462819.', status: 'Delivered', cost: 0.25 },
  { id: 6, date: '05 Jun 2026 02:30 PM', to: '+91 4321098765', template: 'Birthday', message: 'Happy Birthday! 🎉 Enjoy a free session!', status: 'Sent', cost: 0.25 },
]

export default function NotificationsSMSTransactional() {
  const [data] = useState<TransactionalSMS[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10
  const totalPages = Math.ceil(data.length / perPage)
  const paged = data.slice((page - 1) * perPage, page * perPage)

  const filtered = paged.filter(m => {
    if (search && !m.to.toLowerCase().includes(search.toLowerCase()) && !m.template.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const statusIcon = (s: string) => {
    switch (s) {
      case 'Sent': return <Clock className="w-3 h-3 text-blue-400" />
      case 'Delivered': return <CheckCircle className="w-3 h-3 text-emerald-400" />
      case 'Failed': return <XCircle className="w-3 h-3 text-red-400" />
      default: return null
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Transactional SMS</h1>
        <p className="text-xs text-gray-500 mt-0.5">OTP, payment confirmations, and other transactional messages.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search by number or template..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
          <span className="text-[10px] text-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark]" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">To</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Template</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Message</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((m, i) => (
                <motion.tr key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-[10px] text-gray-400">{m.date}</td>
                  <td className="px-4 py-3 text-xs text-white">{m.to}</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 px-2 py-0.5 rounded-md border border-ydl-yellow/20">{m.template}</span></td>
                  <td className="px-4 py-3 text-[11px] text-gray-300 max-w-[220px] truncate">{m.message}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-[10px] font-medium ${m.status === 'Sent' ? 'text-blue-400' : m.status === 'Delivered' ? 'text-emerald-400' : 'text-red-400'}`}>{statusIcon(m.status)} {m.status}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-400">₹{m.cost.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {totalPages > 1 && <div className="flex items-center justify-between"><span className="text-[10px] text-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">›</button></div></div>}
    </div>
  )
}
