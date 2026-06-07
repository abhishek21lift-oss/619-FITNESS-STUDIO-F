import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, CalendarDays, Download, Eye,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const branches = ['All Branches', 'Main Branch', 'Sector 62', 'Gomti Nagar']
const dailyData = [
  { date: '01-Jun', checkins: 42, unique: 38, avg: 38 },
  { date: '02-Jun', checkins: 38, unique: 35, avg: 36.5 },
  { date: '03-Jun', checkins: 45, unique: 40, avg: 41.7 },
  { date: '04-Jun', checkins: 40, unique: 37, avg: 38.5 },
  { date: '05-Jun', checkins: 50, unique: 44, avg: 46.2 },
  { date: '06-Jun', checkins: 0, unique: 0, avg: 0 },
  { date: '07-Jun', checkins: 0, unique: 0, avg: 0 },
]
const maxCheckin = Math.max(...dailyData.map(d => d.checkins), 1)

export default function AnalysisTraffic() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-07')
  const [branch, setBranch] = useState('All Branches')
  const [exportOpen, setExportOpen] = useState(false)
  const [viewModal, setViewModal] = useState<{ open: boolean; date: string; data: typeof dailyData }>({ open: false, date: '', data: [] })

  const totalCheckins = dailyData.reduce((s, d) => s + d.checkins, 0)
  const totalUnique = dailyData.reduce((s, d) => s + d.unique, 0)
  const avgDaily = Math.round(totalCheckins / dailyData.filter(d => d.checkins > 0).length || 1)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Traffic Analysis</h1>
          <p className="text-xs text-gray-500 mt-0.5">Monitor footfall and check-in patterns.</p>
        </div>
        <button onClick={() => setExportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-ydl-yellow/10 border border-ydl-yellow/30 text-ydl-yellow rounded-lg hover:bg-ydl-yellow/20 transition-all">
          <Download className="w-3 h-3" /> Export
        </button>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Branch">
          <FilterSelect options={branches} value={branch} onChange={e => setBranch(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Check-ins" value={totalCheckins} icon={Users} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={0} />
        <StatsCard label="Unique Members" value={totalUnique} icon={UserCheck} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Avg Daily" value={avgDaily} icon={CalendarDays} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Daily Check-ins</h2>
        <div className="flex items-end gap-3 h-40">
          {dailyData.map(d => (
            <button key={d.date} onClick={() => setViewModal({ open: true, date: d.date, data: [d] })} className="flex-1 flex flex-col items-center gap-1.5 group">
              <div className="w-full flex items-end justify-center">
                <div className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-ydl-yellow/40 to-ydl-yellow/20 group-hover:from-ydl-yellow/60 group-hover:to-ydl-yellow/40 transition-all cursor-pointer" style={{ height: `${(d.checkins / maxCheckin) * 130}px` }} />
              </div>
              <span className="text-[9px] text-gray-500">{d.date}</span>
              <span className="text-[9px] font-medium text-gray-400">{d.checkins}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Date', accessor: r => r.date },
            { header: 'Check-ins', accessor: r => <span className="text-white font-medium">{r.checkins}</span> },
            { header: 'Unique Members', accessor: r => r.unique },
            { header: 'Avg Time (min)', accessor: r => r.avg },
            { header: '', accessor: r => (
              <button onClick={() => setViewModal({ open: true, date: r.date, data: [r] })} className="text-ydl-yellow/70 hover:text-ydl-yellow transition-colors">
                <Eye className="w-3 h-3" />
              </button>
            )},
          ]}
          data={dailyData}
          keyExtractor={r => r.date}
        />
      </motion.div>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Traffic Report" size="sm">
        <p className="text-xs text-gray-400 mb-3">Choose export format:</p>
        <div className="flex gap-2">
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 hover:bg-white/10 transition-all">CSV</button>
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 hover:bg-white/10 transition-all">PDF</button>
        </div>
      </Modal>

      <Modal open={viewModal.open} onClose={() => setViewModal({ open: false, date: '', data: [] })} title={`Details - ${viewModal.date}`} size="sm">
        {viewModal.data.map(d => (
          <div key={d.date} className="space-y-2 text-xs text-gray-400">
            <div className="flex justify-between"><span>Check-ins</span><span className="text-white font-medium">{d.checkins}</span></div>
            <div className="flex justify-between"><span>Unique Members</span><span className="text-white font-medium">{d.unique}</span></div>
            <div className="flex justify-between"><span>Avg Time (min)</span><span className="text-white font-medium">{d.avg}</span></div>
          </div>
        ))}
      </Modal>
    </div>
  )
}
