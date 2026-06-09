import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'

interface RechargeEntry {
  id: number
  date: string
  amount: number
  paymentMethod: string
  transactionId: string
  status: 'Success' | 'Pending' | 'Failed'
  notes: string
}

const initialEntries: RechargeEntry[] = [
  { id: 1, date: '05 Jun 2026', amount: 500, paymentMethod: 'UPI', transactionId: 'TXN123456', status: 'Success', notes: 'Auto recharge' },
  { id: 2, date: '28 May 2026', amount: 1000, paymentMethod: 'Card', transactionId: 'TXN789012', status: 'Success', notes: 'Manual recharge' },
  { id: 3, date: '15 May 2026', amount: 250, paymentMethod: 'UPI', transactionId: 'TXN345678', status: 'Pending', notes: 'Pending confirmation' },
  { id: 4, date: '01 May 2026', amount: 2000, paymentMethod: 'Bank Transfer', transactionId: 'TXN901234', status: 'Success', notes: 'Monthly top-up' },
  { id: 5, date: '20 Apr 2026', amount: 500, paymentMethod: 'Cheque', transactionId: 'TXN567890', status: 'Failed', notes: 'Insufficient funds' },
  { id: 6, date: '10 Apr 2026', amount: 1500, paymentMethod: 'UPI', transactionId: 'TXN112233', status: 'Success', notes: 'Promo campaign recharge' },
]

export default function NotificationsSMSRechargeHistory() {
  const [entries] = useState<RechargeEntry[]>(initialEntries)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10
  const totalPages = Math.ceil(entries.length / perPage)
  const paged = entries.filter(e => !search || e.transactionId.toLowerCase().includes(search.toLowerCase()) || e.paymentMethod.toLowerCase().includes(search.toLowerCase()))
    .slice((page - 1) * perPage, page * perPage)

  const totalRecharged = entries.reduce((s, e) => s + (e.status === 'Success' ? e.amount : 0), 0)
  const currentBalance = 1247

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">SMS Recharge History</h1>
        <p className="text-xs text-gray-500 mt-0.5">Complete record of all SMS credit recharges.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatsCard label="Total Recharged" value={`₹${totalRecharged}`} icon={ArrowUpRight} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Current Balance" value={`${currentBalance}`} icon={Wallet} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search by transaction ID..." />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Payment Method</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Transaction ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {paged.map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">{e.date}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-white">₹{e.amount}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{e.paymentMethod}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{e.transactionId}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${e.status === 'Success' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : e.status === 'Pending' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                      {e.status === 'Success' ? <ArrowUpRight className="w-3 h-3" /> : e.status === 'Pending' ? <ClockIcon className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{e.notes}</td>
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

function ClockIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
