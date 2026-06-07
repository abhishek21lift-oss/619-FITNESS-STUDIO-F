import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Phone, MoreHorizontal, Eye, Edit3, Trash2, ChevronDown } from 'lucide-react'

const statusFilters = ['All', 'Open', 'Converted', 'Closed', 'Lost']

const enquiries = [
  { code: 'ENQ-001', date: '07 Jun 2026', name: 'Rahul Sharma', mobile: '+91 98765 43210', source: 'Instagram', status: 'Open' },
  { code: 'ENQ-002', date: '06 Jun 2026', name: 'Priya Singh', mobile: '+91 87654 32109', source: 'Walk-in', status: 'Converted' },
  { code: 'ENQ-003', date: '05 Jun 2026', name: 'Amit Verma', mobile: '+91 76543 21098', source: 'Google', status: 'Closed' },
  { code: 'ENQ-004', date: '05 Jun 2026', name: 'Sneha Patel', mobile: '+91 65432 10987', source: 'Friend Referral', status: 'Open' },
  { code: 'ENQ-005', date: '04 Jun 2026', name: 'Vikram Yadav', mobile: '+91 54321 09876', source: 'Facebook', status: 'Lost' },
  { code: 'ENQ-006', date: '03 Jun 2026', name: 'Neha Gupta', mobile: '+91 43210 98765', source: 'Website', status: 'Open' },
  { code: 'ENQ-007', date: '02 Jun 2026', name: 'Arun Kumar', mobile: '+91 32109 87654', source: 'Phone Call', status: 'Converted' },
  { code: 'ENQ-008', date: '01 Jun 2026', name: 'Pooja Jain', mobile: '+91 21098 76543', source: 'Instagram', status: 'Open' },
]

const statusColors: Record<string, string> = {
  Open: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
  Closed: 'text-gray-400 bg-gray-500/10 border border-gray-500/20',
  Converted: 'text-blue-400 bg-blue-500/10 border border-blue-500/20',
  Lost: 'text-red-400 bg-red-500/10 border border-red-500/20',
}

export default function EnquiryList() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = enquiries.filter(e => {
    if (statusFilter !== 'All' && e.status !== statusFilter) return false
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.mobile.includes(search)) return false
    return true
  })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Enquiry List</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage all client enquiries.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] font-semibold text-emerald-400">388 Open</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-500/10 border border-gray-500/20">
            <span className="text-[10px] font-semibold text-gray-400">988 Closed</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors"
            placeholder="Search name or mobile..."
          />
        </div>
        <div className="flex gap-1.5">
          {statusFilters.map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${
                statusFilter === f
                  ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow'
                  : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
          <Filter className="w-3 h-3" /> More Filters <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((enq, i) => (
                <motion.tr
                  key={enq.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-xs font-medium text-gray-300">{enq.code}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{enq.date}</td>
                  <td className="px-4 py-3 text-xs font-medium text-white">{enq.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-400">{enq.mobile}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{enq.source}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${statusColors[enq.status]}`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-300 rounded-lg transition-all"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xs text-gray-500">No enquiries found.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
