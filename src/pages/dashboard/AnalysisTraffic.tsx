import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, CalendarDays, Download, Eye,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

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
          <h1 className="text-lg font-bold text-[#1C1C1E]">Traffic Analysis</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Monitor footfall and check-in patterns.</p>
        </div>
        <button onClick={() => setExportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-apple-blue/10 border border-ydl-yellow/30 text-apple-blue rounded-lg hover:bg-apple-blue/20 transition-all">
          <Download className="w-3 h-3" /> Export
        </button>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Branch">
          <FilterSelect options={branches} value={branch} onChange={e => setBranch(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Check-ins" value={totalCheckins} icon={Users} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" index={0} />
        <StatsCard label="Unique Members" value={totalUnique} icon={UserCheck} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Avg Daily" value={avgDaily} icon={CalendarDays} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Daily Check-ins</h2>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData.map(d => ({ date: d.date, checkins: d.checkins }))} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(0, 122, 255, 0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#007AFF' }} />
              <Bar dataKey="checkins" fill="#007AFF" radius={[4, 4, 0, 0]} onClick={(d: any) => setViewModal({ open: true, date: d.date, data: [{ ...d, unique: 0, avg: 0 }] })} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Date', accessor: r => r.date },
            { header: 'Check-ins', accessor: r => <span className="text-[#1C1C1E] font-medium">{r.checkins}</span> },
            { header: 'Unique Members', accessor: r => r.unique },
            { header: 'Avg Time (min)', accessor: r => r.avg },
            { header: '', accessor: r => (
              <button onClick={() => setViewModal({ open: true, date: r.date, data: [r] })} className="text-apple-blue/70 hover:text-apple-blue transition-colors">
                <Eye className="w-3 h-3" />
              </button>
            )},
          ]}
          data={dailyData}
          keyExtractor={r => r.date}
        />
      </motion.div>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Traffic Report" size="sm">
        <p className="text-xs text-apple-gray-400 mb-3">Choose export format:</p>
        <div className="flex gap-2">
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 hover:bg-white/10 transition-all">CSV</button>
          <button onClick={() => { setExportOpen(false) }} className="flex-1 px-3 py-2 text-[11px] font-medium bg-white/5 border border-apple-gray-200 rounded-lg text-apple-gray-600 hover:bg-white/10 transition-all">PDF</button>
        </div>
      </Modal>

      <Modal open={viewModal.open} onClose={() => setViewModal({ open: false, date: '', data: [] })} title={`Details - ${viewModal.date}`} size="sm">
        {viewModal.data.map(d => (
          <div key={d.date} className="space-y-2 text-xs text-apple-gray-400">
            <div className="flex justify-between"><span>Check-ins</span><span className="text-[#1C1C1E] font-medium">{d.checkins}</span></div>
            <div className="flex justify-between"><span>Unique Members</span><span className="text-[#1C1C1E] font-medium">{d.unique}</span></div>
            <div className="flex justify-between"><span>Avg Time (min)</span><span className="text-[#1C1C1E] font-medium">{d.avg}</span></div>
          </div>
        ))}
      </Modal>
    </div>
  )
}
