import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, Clock, Users, Search, Download } from 'lucide-react'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface ReceiptLog {
  id: number
  logNo: string
  date: string
  receiptNo: string
  action: string
  staff: string
  timestamp: string
}

const initialData: ReceiptLog[] = [
  { id: 1, logNo: 'L001', date: '07 Jun 2026', receiptNo: 'RCP-001', action: 'Created', staff: 'Amit', timestamp: '09:15 AM' },
  { id: 2, logNo: 'L002', date: '07 Jun 2026', receiptNo: 'RCP-002', action: 'Voided', staff: 'Neha', timestamp: '10:30 AM' },
  { id: 3, logNo: 'L003', date: '07 Jun 2026', receiptNo: 'RCP-001', action: 'Re-issued', staff: 'Admin', timestamp: '11:00 AM' },
  { id: 4, logNo: 'L004', date: '06 Jun 2026', receiptNo: 'RCP-003', action: 'Created', staff: 'Amit', timestamp: '14:45 PM' },
  { id: 5, logNo: 'L005', date: '06 Jun 2026', receiptNo: 'RCP-004', action: 'Deleted', staff: 'Manager', timestamp: '16:20 PM' },
]

export default function AccountsReceiptLog() {
  const [data, setData] = useState<ReceiptLog[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = data.filter(d => {
    if (search && !d.receiptNo.toLowerCase().includes(search.toLowerCase()) && !d.staff.toLowerCase().includes(search.toLowerCase()) && !d.action.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleDelete = (id: number) => setData(prev => prev.filter(d => d.id !== id))

  const exportCSV = () => {
    const headers = ['Log#', 'Date', 'Receipt#', 'Action', 'Staff', 'Timestamp']
    const rows = filtered.map(d => [d.logNo, d.date, d.receiptNo, d.action, d.staff, d.timestamp])
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `receipt-log-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Receipt Log</h1><p className="text-xs text-gray-500 mt-0.5">Audit trail for receipt actions.</p></div>
        <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-colors">
          <Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Logs" value={data.length} icon={ClipboardList} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Today" value={data.filter(d => d.date === '07 Jun 2026').length} icon={Clock} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
        <StatsCard label="Staff Involved" value={new Set(data.map(d => d.staff)).size} icon={Users} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search logs..." />
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Log#</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Receipt#</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Staff</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Timestamp</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((d, i) => (
                <motion.tr key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-ydl-yellow">{d.logNo}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-400">{d.receiptNo}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                      d.action === 'Created' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                      d.action === 'Voided' || d.action === 'Deleted' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                      'text-blue-400 bg-blue-500/10 border-blue-500/20'
                    }`}>{d.action}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.staff}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{d.timestamp}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu label="Actions" actions={[
                      { label: 'Details', onClick: () => {} },
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
