import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Table from '../../components/shared/Table'

interface RegisterRow {
  id: number
  date: string
  member: string
  activity: string
  debit: number
  credit: number
  balance: number
}

const initialData: RegisterRow[] = [
  { id: 1, date: '07 Jun 2026', member: 'Rahul Sharma', activity: 'PT Session', debit: 0, credit: 1500, balance: 1500 },
  { id: 2, date: '07 Jun 2026', member: 'Priya Singh', activity: 'Yoga Class', debit: 0, credit: 500, balance: 2000 },
  { id: 3, date: '06 Jun 2026', member: 'Amit Verma', activity: 'Steam Bath', debit: 0, credit: 300, balance: 2300 },
  { id: 4, date: '06 Jun 2026', member: 'Rahul Sharma', activity: 'Supplement Purchase', debit: 1200, credit: 0, balance: 1100 },
  { id: 5, date: '05 Jun 2026', member: 'Neha Gupta', activity: 'Body Comp Test', debit: 0, credit: 800, balance: 1900 },
  { id: 6, date: '05 Jun 2026', member: 'Sneha Patel', activity: 'PT Session', debit: 0, credit: 1500, balance: 3400 },
]

export default function WalletRegister() {
  const [data] = useState<RegisterRow[]>(initialData)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = data.filter(r => {
    const matchSearch = r.member.toLowerCase().includes(search.toLowerCase()) || r.activity.toLowerCase().includes(search.toLowerCase())
    const matchDate = (!dateFrom || r.date >= dateFrom) && (!dateTo || r.date <= dateTo)
    return matchSearch && matchDate
  })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-white">Wallet Register</h1><p className="text-xs text-gray-500 mt-0.5">Ledger of all wallet transactions with running balance.</p></div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none w-full" placeholder="Search member or activity..." />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-gray-500" />
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
          <span className="text-[10px] text-gray-500">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Date', accessor: (r: RegisterRow) => <span className="text-gray-400">{r.date}</span> },
            { header: 'Member', accessor: (r: RegisterRow) => <span className="text-white font-medium">{r.member}</span> },
            { header: 'Activity', accessor: (r: RegisterRow) => <span>{r.activity}</span> },
            { header: 'Debit', accessor: (r: RegisterRow) => r.debit > 0 ? <span className="text-red-400 font-medium flex items-center gap-1"><ArrowDownRight className="w-3 h-3" />₹{r.debit.toLocaleString('en-IN')}</span> : <span className="text-gray-600">-</span> },
            { header: 'Credit', accessor: (r: RegisterRow) => r.credit > 0 ? <span className="text-emerald-400 font-medium flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />₹{r.credit.toLocaleString('en-IN')}</span> : <span className="text-gray-600">-</span> },
            { header: 'Balance', accessor: (r: RegisterRow) => <span className="text-ydl-yellow font-medium">₹{r.balance.toLocaleString('en-IN')}</span> },
          ]}
          data={filtered}
          keyExtractor={r => r.id}
        />
      </motion.div>
    </div>
  )
}
