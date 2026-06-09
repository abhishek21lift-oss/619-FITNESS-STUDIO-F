import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, Users, Search, Download } from 'lucide-react'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface ExpiredSession {
  id: number
  member: string
  trainer: string
  sessionsBooked: number
  sessionsUsed: number
  expired: number
  value: number
}

const initialData: ExpiredSession[] = [
  { id: 1, member: 'Priya Singh', trainer: 'Amit', sessionsBooked: 20, sessionsUsed: 12, expired: 8, value: 12000 },
  { id: 2, member: 'Rahul Sharma', trainer: 'Neha', sessionsBooked: 15, sessionsUsed: 10, expired: 5, value: 7500 },
  { id: 3, member: 'Sneha Patel', trainer: 'Ravi', sessionsBooked: 10, sessionsUsed: 4, expired: 6, value: 9000 },
  { id: 4, member: 'Vikram Joshi', trainer: 'Amit', sessionsBooked: 25, sessionsUsed: 20, expired: 5, value: 7500 },
  { id: 5, member: 'Anita Desai', trainer: 'Neha', sessionsBooked: 12, sessionsUsed: 8, expired: 4, value: 6000 },
]

export default function AccountsExpiredSession() {
  const [data, setData] = useState<ExpiredSession[]>(initialData)
  const [search, setSearch] = useState('')

  const filtered = data.filter(d => {
    if (search && !d.member.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalExpired = data.reduce((s, d) => s + d.expired, 0)
  const totalValue = data.reduce((s, d) => s + d.value, 0)

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Member', 'Trainer', 'Sessions Booked', 'Sessions Used', 'Expired', 'Value']
    const rows = filtered.map(d => [d.member, d.trainer, String(d.sessionsBooked), String(d.sessionsUsed), String(d.expired), `₹${d.value}`])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `expired-sessions-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Expired Sessions</h1><p className="text-xs text-apple-gray-500 mt-0.5">Unused sessions past validity.</p></div>
        <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-apple-gray-600 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E] hover:bg-white/10 transition-colors">
          <Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Members Affected" value={data.length} icon={Users} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" />
        <StatsCard label="Total Expired Sessions" value={totalExpired} icon={Calendar} color="from-orange-500/20 to-orange-600/5" border="border-orange-500/30" text="text-orange-400" />
        <StatsCard label="Lifetime Value Lost" value={fmt(totalValue)} icon={DollarSign} color="from-yellow-500/20 to-yellow-600/5" border="border-yellow-500/30" text="text-yellow-400" />
      </div>

      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search members..." />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Trainer</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Sessions Booked</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Sessions Used</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Expired</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Value</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-[#1C1C1E]">{d.member}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.trainer}</td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{d.sessionsBooked}</td>
                  <td className="px-4 py-3 text-xs text-emerald-400">{d.sessionsUsed}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-red-400">{d.expired}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-orange-400">{fmt(d.value)}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'View Details', onClick: () => {} },
                      { label: 'Delete', onClick: () => handleDelete(d.id), color: 'text-red-400' },
                    ]} />
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
