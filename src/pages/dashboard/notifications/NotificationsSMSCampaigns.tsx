import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users, CheckCircle, DollarSign } from 'lucide-react'

interface Campaign {
  id: number
  name: string
  sentTo: number
  delivered: number
  failed: number
  date: string
  cost: number
}

const initialCampaigns: Campaign[] = [
  { id: 1, name: 'Summer Promotion 2026', sentTo: 1500, delivered: 1428, failed: 72, date: '05 Jun 2026', cost: 375 },
  { id: 2, name: 'New Year Offer', sentTo: 2000, delivered: 1890, failed: 110, date: '01 Jan 2026', cost: 500 },
  { id: 3, name: 'Membership Renewal Drive', sentTo: 800, delivered: 760, failed: 40, date: '15 May 2026', cost: 200 },
  { id: 4, name: 'Festival Greetings', sentTo: 2500, delivered: 2375, failed: 125, date: '14 Apr 2026', cost: 625 },
  { id: 5, name: 'Weekend Flash Sale', sentTo: 1200, delivered: 1152, failed: 48, date: '20 Mar 2026', cost: 300 },
]

export default function NotificationsSMSCampaigns() {
  const [campaigns] = useState<Campaign[]>(initialCampaigns)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10
  const totalPages = Math.ceil(campaigns.length / perPage)
  const paged = campaigns.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).slice((page - 1) * perPage, page * perPage)

  const totalSent = campaigns.reduce((s, c) => s + c.sentTo, 0)
  const totalDelivered = campaigns.reduce((s, c) => s + c.delivered, 0)
  const totalCost = campaigns.reduce((s, c) => s + c.cost, 0)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">SMS Campaigns</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Marketing and promotional SMS campaigns.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-4">
          <div className="flex items-center gap-2 text-emerald-400"><Users className="w-4 h-4" /><span className="text-[10px] font-semibold uppercase">Total Sent</span></div>
          <p className="text-xl font-bold text-[#1C1C1E] mt-1">{totalSent.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-apple-gray-200 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-4">
          <div className="flex items-center gap-2 text-[#007AFF]"><CheckCircle className="w-4 h-4" /><span className="text-[10px] font-semibold uppercase">Delivered</span></div>
          <p className="text-xl font-bold text-[#1C1C1E] mt-1">{totalDelivered.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-apple-gray-200 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-4">
          <div className="flex items-center gap-2 text-amber-400"><DollarSign className="w-4 h-4" /><span className="text-[10px] font-semibold uppercase">Total Cost</span></div>
          <p className="text-xl font-bold text-[#1C1C1E] mt-1">₹{totalCost.toLocaleString()}</p>
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search campaigns..." />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Campaign Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Sent To</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Delivered</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Failed</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Performance</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {paged.map((c, i) => {
                const rate = c.sentTo > 0 ? Math.round((c.delivered / c.sentTo) * 100) : 0
                return (
                  <motion.tr key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-[#1C1C1E]">{c.name}</td>
                    <td className="px-4 py-3 text-xs text-apple-gray-400">{c.sentTo.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-emerald-400">{c.delivered.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-red-400">{c.failed.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-400/60" style={{ width: `${rate}%` }} />
                        </div>
                        <span className="text-[10px] text-apple-gray-500">{rate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-apple-gray-400">{c.date}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-apple-blue">₹{c.cost}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {totalPages > 1 && <div className="flex items-center justify-between"><span className="text-[10px] text-apple-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">›</button></div></div>}
    </div>
  )
}
