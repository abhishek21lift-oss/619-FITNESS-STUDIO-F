import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, IndianRupee, Activity, Users, Calendar } from 'lucide-react'
import StatsCard from '../../../components/shared/StatsCard'
import Table from '../../../components/shared/Table'

interface TrafficRow {
  id: number
  memberName: string
  activity: string
  amount: number
  date: string
  status: 'Completed' | 'Pending' | 'Cancelled'
}

const initialData: TrafficRow[] = [
  { id: 1, memberName: 'Rahul Sharma', activity: 'PT Session', amount: 1500, date: '07 Jun 2026', status: 'Completed' },
  { id: 2, memberName: 'Priya Singh', activity: 'Yoga Class', amount: 500, date: '07 Jun 2026', status: 'Completed' },
  { id: 3, memberName: 'Amit Verma', activity: 'Steam Bath', amount: 300, date: '06 Jun 2026', status: 'Completed' },
  { id: 4, memberName: 'Neha Gupta', activity: 'Body Comp Test', amount: 800, date: '06 Jun 2026', status: 'Pending' },
  { id: 5, memberName: 'Sneha Patel', activity: 'PT Session', amount: 1500, date: '05 Jun 2026', status: 'Completed' },
  { id: 6, memberName: 'Vikram Joshi', activity: 'Diet Consultation', amount: 2000, date: '05 Jun 2026', status: 'Cancelled' },
]

export default function WalletTraffic() {
  const [data] = useState<TrafficRow[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = data.filter(r => {
    const matchSearch = r.memberName.toLowerCase().includes(search.toLowerCase()) || r.activity.toLowerCase().includes(search.toLowerCase())
    const matchDate = (!dateFrom || r.date >= dateFrom) && (!dateTo || r.date <= dateTo)
    return matchSearch && matchDate
  })

  const totalRevenue = data.filter(r => r.status === 'Completed').reduce((s, r) => s + r.amount, 0)
  const totalActivities = data.length
  const activeUsers = [...new Set(data.map(r => r.memberName))].length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-[#1C1C1E]">Wallet Traffic</h1><p className="text-xs text-apple-gray-500 mt-0.5">Activity traffic and revenue tracking.</p></div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={IndianRupee} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Total Activities" value={totalActivities} icon={Activity} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Active Users" value={activeUsers} icon={Users} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-apple-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none w-full" placeholder="Search member or activity..." />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-apple-gray-500" />
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          <span className="text-[10px] text-apple-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Member', accessor: (r: TrafficRow) => <span className="text-[#1C1C1E] font-medium">{r.memberName}</span> },
            { header: 'Activity', accessor: (r: TrafficRow) => <span>{r.activity}</span> },
            { header: 'Amount', accessor: (r: TrafficRow) => <span className="text-apple-blue font-medium">₹{r.amount.toLocaleString('en-IN')}</span> },
            { header: 'Date', accessor: (r: TrafficRow) => <span>{r.date}</span> },
            { header: 'Status', accessor: (r: TrafficRow) => (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${r.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10' : r.status === 'Pending' ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10'}`}>{r.status}</span>
            )},
          ]}
          data={filtered}
          keyExtractor={r => r.id}
        />
      </motion.div>
    </div>
  )
}

