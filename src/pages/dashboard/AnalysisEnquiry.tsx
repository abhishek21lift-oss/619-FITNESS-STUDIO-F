import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PhoneCall, MessageSquare, Users, Eye,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const sourceOptions = ['All Sources', 'Walk-in', 'Instagram', 'Facebook', 'Google', 'Friend', 'Other']
const staffOptions = ['All Staff', 'Rahul S.', 'Priya M.', 'Amit K.', 'Sneha R.']

const sourceData = [
  { source: 'Walk-in', count: 120, pct: 31, trend: 'up' as const },
  { source: 'Instagram', count: 88, pct: 23, trend: 'up' as const },
  { source: 'Facebook', count: 58, pct: 15, trend: 'down' as const },
  { source: 'Google', count: 46, pct: 12, trend: 'up' as const },
  { source: 'Friend', count: 42, pct: 11, trend: 'down' as const },
  { source: 'Other', count: 34, pct: 8, trend: 'stable' as const },
]

const allEnquiries = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Enquiry ${i + 1}`,
  source: sourceOptions[1 + (i % 6)],
  staff: staffOptions[1 + (i % 4)],
  date: `0${(i % 30) + 1}-Jun-2026`,
  status: i % 5 === 0 ? 'Closed' as const : 'Open' as const,
}))

const dailyTrend = [12, 15, 8, 18, 14, 10, 6, 20, 16, 11, 13, 9, 17, 19, 7, 14, 12, 16, 10, 15, 13, 11, 18, 14, 9, 16, 12, 8, 15, 10]

export default function AnalysisEnquiry() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-30')
  const [source, setSource] = useState('All Sources')
  const [staff, setStaff] = useState('All Staff')
  const [viewAll, setViewAll] = useState(false)

  const totalEnquiries = allEnquiries.length
  const openCount = allEnquiries.filter(e => e.status === 'Open').length
  const closedCount = allEnquiries.filter(e => e.status === 'Closed').length

  const filteredSource = source === 'All Sources' ? sourceData : sourceData.filter(s => s.source === source)

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-[#1C1C1E]">Enquiry Analysis</h1>
        <p className="text-xs text-apple-gray-500 mt-0.5">Track enquiries by source, staff, and status.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Source">
          <FilterSelect options={sourceOptions} value={source} onChange={e => setSource(e.target.value)} />
        </FilterField>
        <FilterField label="Staff">
          <FilterSelect options={staffOptions} value={staff} onChange={e => setStaff(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Enquiries" value={totalEnquiries} icon={PhoneCall} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" index={0} />
        <StatsCard label="Open" value={openCount} icon={MessageSquare} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Closed" value={closedCount} icon={Users} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Source-wise Breakdown</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredSource} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="source" tick={{ fill: '#D1D5DB', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(0, 122, 255, 0.3)', borderRadius: 8, fontSize: 12 }} labelStyle={{ color: '#007AFF' }} />
                <Bar dataKey="count" fill="#007AFF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-[#1C1C1E] mb-4">Daily Enquiry Trend</h2>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrend.map((v, i) => ({ day: `D${i + 1}`, count: v }))} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 8 }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(0, 122, 255, 0.3)', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#007AFF' }} />
                <Bar dataKey="count" fill="#007AFF" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => setViewAll(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-apple-blue/10 border border-ydl-yellow/30 text-apple-blue rounded-lg hover:bg-apple-blue/20 transition-all">
          <Eye className="w-3 h-3" /> View All Enquiries
        </button>
      </div>

      <Modal open={viewAll} onClose={() => setViewAll(false)} title="All Enquiries" size="xl">
        <div className="max-h-96 overflow-y-auto">
          <Table
            columns={[
              { header: '#', accessor: r => r.id },
              { header: 'Name', accessor: r => r.name },
              { header: 'Source', accessor: r => r.source },
              { header: 'Staff', accessor: r => r.staff },
              { header: 'Date', accessor: r => r.date },
              { header: 'Status', accessor: r => (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${r.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-apple-gray-400'}`}>{r.status}</span>
              )},
            ]}
            data={allEnquiries}
            keyExtractor={r => r.id}
          />
        </div>
      </Modal>
    </div>
  )
}
