import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PhoneCall, CheckCircle, XCircle, Clock, Download, Eye, MessageSquare, UserCheck,
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const staffOptions = ['All Staff', 'Rahul S.', 'Priya M.', 'Amit K.', 'Sneha R.']
const typeOptions = ['All Types', 'Phone', 'Email', 'WhatsApp', 'In-Person']

const staffData = [
  { id: 1, name: 'Rahul S.', total: 45, done: 38, missed: 7, avgTime: '2.4h', type: 'Phone' },
  { id: 2, name: 'Priya M.', total: 52, done: 44, missed: 8, avgTime: '1.8h', type: 'WhatsApp' },
  { id: 3, name: 'Amit K.', total: 33, done: 25, missed: 8, avgTime: '3.1h', type: 'Email' },
  { id: 4, name: 'Sneha R.', total: 48, done: 42, missed: 6, avgTime: '2.0h', type: 'Phone' },
]

export default function AnalysisFollowup() {
  const [staff, setStaff] = useState('All Staff')
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-07')
  const [type, setType] = useState('All Types')
  const [exportOpen, setExportOpen] = useState(false)
  const [detailModal, setDetailModal] = useState<{ open: boolean; staff: string }>({ open: false, staff: '' })

  const totalFollowups = staffData.reduce((s, d) => s + d.total, 0)
  const totalDone = staffData.reduce((s, d) => s + d.done, 0)
  const totalMissed = staffData.reduce((s, d) => s + d.missed, 0)
  const avgResponse = (staffData.reduce((s, d) => {
    const [h] = d.avgTime.replace('h', '').split('.')
    return s + parseInt(h)
  }, 0) / staffData.length).toFixed(1) + 'h'

  const filteredStaff = staffData.filter(d =>
    (staff === 'All Staff' || d.name === staff) &&
    (type === 'All Types' || d.type === type)
  )

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Follow-up Analysis</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track follow-up activities and staff performance.</p>
        </div>
        <button onClick={() => setExportOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium bg-ydl-yellow/10 border border-ydl-yellow/30 text-ydl-yellow rounded-lg hover:bg-ydl-yellow/20 transition-all">
          <Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <FilterBar>
        <FilterField label="Staff">
          <FilterSelect options={staffOptions} value={staff} onChange={e => setStaff(e.target.value)} />
        </FilterField>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Type">
          <FilterSelect options={typeOptions} value={type} onChange={e => setType(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total Followups" value={totalFollowups} icon={PhoneCall} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={0} />
        <StatsCard label="Done" value={totalDone} icon={CheckCircle} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Missed" value={totalMissed} icon={XCircle} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" index={2} />
        <StatsCard label="Avg Response" value={avgResponse} icon={Clock} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xs font-semibold text-white mb-3">Staff-wise Breakdown</h2>
        <Table
          columns={[
            { header: 'Staff', accessor: r => r.name },
            { header: 'Total', accessor: r => r.total },
            { header: 'Done', accessor: r => <span className="text-emerald-400 font-medium">{r.done}</span> },
            { header: 'Missed', accessor: r => <span className="text-red-400">{r.missed}</span> },
            { header: 'Avg Time', accessor: r => r.avgTime },
            { header: 'Type', accessor: r => r.type },
            { header: '', accessor: r => (
              <ActionMenu
                label={<Eye className="w-3 h-3" />}
                actions={[
                  { label: 'View Details', icon: Eye, onClick: () => setDetailModal({ open: true, staff: r.name }) },
                  { label: 'Send Message', icon: MessageSquare, onClick: () => alert(`Message sent to ${r.name}`) },
                  { label: 'Mark as Reviewed', icon: UserCheck, onClick: () => alert(`Marked ${r.name} as reviewed`) },
                ]}
              />
            )},
          ]}
          data={filteredStaff}
          keyExtractor={r => r.id}
        />
      </motion.div>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Follow-up Report" size="sm">
        <p className="text-xs text-gray-400 mb-3">Download follow-up analysis as CSV:</p>
        <button onClick={() => { setExportOpen(false) }} className="w-full px-3 py-2 text-[11px] font-medium bg-ydl-yellow/10 border border-ydl-yellow/30 text-ydl-yellow rounded-lg hover:bg-ydl-yellow/20 transition-all">Download CSV</button>
      </Modal>

      <Modal open={detailModal.open} onClose={() => setDetailModal({ open: false, staff: '' })} title={`Follow-ups - ${detailModal.staff}`} size="lg">
        <p className="text-xs text-gray-400 mb-3">Detailed follow-up records for {detailModal.staff}.</p>
        <Table
          columns={[
            { header: 'Client', accessor: i => `Client ${i + 1}` },
            { header: 'Type', accessor: i => ['Phone', 'WhatsApp', 'Email'][i % 3] },
            { header: 'Date', accessor: i => `0${i + 1}-Jun-2026` },
            { header: 'Status', accessor: i => (
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${i % 3 !== 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {i % 3 !== 0 ? 'Done' : 'Missed'}
              </span>
            )},
          ]}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={i => i}
        />
      </Modal>
    </div>
  )
}
