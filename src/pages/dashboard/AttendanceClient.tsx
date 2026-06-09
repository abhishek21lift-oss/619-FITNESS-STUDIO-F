import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users2, Search, Calendar, Clock, CheckCircle, MoreHorizontal,
  Eye, History, UserPlus
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'
import FilterBar from '../../components/shared/FilterBar'
import { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const initialCheckins = [
  { id: 1, name: 'Rahul Sharma', membership: 'Annual Gold', plan: 'Annual Gold', checkIn: '06:15 AM', checkOut: '-', status: 'Checked In', mobile: '+91 90001 00001' },
  { id: 2, name: 'Priya Singh', membership: 'Monthly Basic', plan: 'Monthly Basic', checkIn: '07:00 AM', checkOut: '08:30 AM', status: 'Checked Out', mobile: '+91 90002 00002' },
  { id: 3, name: 'Sneha Patel', membership: 'Annual Platinum', plan: 'Annual Platinum', checkIn: '07:30 AM', checkOut: '-', status: 'Checked In', mobile: '+91 90003 00003' },
  { id: 4, name: 'Neha Gupta', membership: 'Annual Gold', plan: 'Annual Gold', checkIn: '08:00 AM', checkOut: '09:15 AM', status: 'Checked Out', mobile: '+91 90004 00004' },
  { id: 5, name: 'Arun Kumar', membership: 'Quarterly Pro', plan: 'Quarterly Pro', checkIn: '05:45 AM', checkOut: '07:00 AM', status: 'Checked Out', mobile: '+91 90005 00005' },
  { id: 6, name: 'Amit Verma', membership: 'Annual Gold', plan: 'Annual Gold', checkIn: '06:00 AM', checkOut: '-', status: 'Checked In', mobile: '+91 90006 00006' },
]

const branches = ['All Branches', 'Lucknow', 'Jaipur', 'Delhi']
const planFilters = ['All Plans', 'Annual Gold', 'Annual Platinum', 'Monthly Basic', 'Quarterly Pro', 'Monthly Premium']

const memberSearchResults = ['Rahul Sharma', 'Priya Singh', 'Sneha Patel', 'Neha Gupta', 'Arun Kumar', 'Amit Verma', 'Vikram Yadav', 'Pooja Jain', 'Rohan Mehra']

export default function AttendanceClient() {
  const [checkins, setCheckins] = useState(initialCheckins)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [branch, setBranch] = useState('All Branches')
  const [planFilter, setPlanFilter] = useState('All Plans')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [manualSearch, setManualSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 25

  const filtered = checkins.filter(c => {
    if (planFilter !== 'All Plans' && c.plan !== planFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.mobile.includes(search)) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const todayCheckins = checkins.length
  const uniqueMembers = new Set(checkins.map(c => c.name)).size
  const avgPerDay = 48

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      'Checked In': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      'Checked Out': 'text-apple-gray-400 bg-gray-500/10 border-gray-500/20',
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || ''}`}>
        {s === 'Checked In' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
        {s}
      </span>
    )
  }

  const handleManualCheckin = (name: string) => {
    const newCheckin = {
      id: checkins.length + 1,
      name,
      membership: 'Manual Entry',
      plan: 'Manual Entry',
      checkIn: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      checkOut: '-',
      status: 'Checked In' as const,
      mobile: '-',
    }
    setCheckins([newCheckin, ...checkins])
    setModal(null)
    setManualSearch('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Client Attendance</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Track member check-ins and visits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Check-ins Today" value={todayCheckins > 0 ? todayCheckins : 0} icon={Users2} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Unique Members" value={uniqueMembers} icon={Users2} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Avg/Day (This Month)" value={avgPerDay} icon={Calendar} color="from-apple-blue/20 to-amber-600/5" border="border-ydl-yellow/30" text="text-apple-blue" />
      </div>

      <FilterBar>
        <FilterField label="Date">
          <div className="relative">
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-apple-gray-500" />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-7 pl-7 pr-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/30 [color-scheme:dark]" />
          </div>
        </FilterField>
        <FilterField label="Branch">
          <FilterSelect options={branches} value={branch} onChange={(e: any) => setBranch(e.target.value)} />
        </FilterField>
        <FilterField label="Plan">
          <FilterSelect options={planFilters} value={planFilter} onChange={(e: any) => setPlanFilter(e.target.value)} />
        </FilterField>
        <FilterField label="Search">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-apple-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} className="h-7 pl-7 pr-2 text-[11px] bg-white/5 border border-apple-gray-200 rounded-lg text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/30" placeholder="Search name or mobile..." />
          </div>
        </FilterField>
      </FilterBar>

      <div className="flex items-center gap-2">
        <button onClick={() => setModal({ type: 'manual-checkin' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
          <UserPlus className="w-3 h-3" /> Manual Check-in
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Member</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Membership</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Check In</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Check Out</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {paged.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-apple-blue/20 to-amber-600/10 border border-ydl-yellow/20 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-apple-blue">{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#1C1C1E] cursor-pointer hover:text-apple-blue transition-colors" onClick={() => setModal({ type: 'view-member', data: c })}>{c.name}</span>
                        <p className="text-[9px] text-apple-gray-400">{c.mobile}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{c.membership}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-apple-gray-500" />
                      <span className="text-xs text-apple-gray-400">{c.checkIn}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-apple-gray-400">{c.checkOut}</td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'View Member', icon: Eye, onClick: () => setModal({ type: 'view-member', data: c }) },
                        { label: 'View History', icon: History, onClick: () => setModal({ type: 'history', data: c }) },
                        { label: 'Mark Manual Check-in', icon: UserPlus, onClick: () => setModal({ type: 'manual-checkin' }) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-xs text-apple-gray-500">No check-ins found for this date.</div>}
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-apple-gray-200 bg-white/[0.02]"><span className="text-[10px] text-apple-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-apple-gray-500 hover:text-[#1C1C1E] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-apple-gray-200 bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>

      <Modal open={modal?.type === 'manual-checkin'} onClose={() => setModal(null)} title="Manual Check-in" size="md">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Search Member</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-apple-gray-500" />
              <input value={manualSearch} onChange={e => setManualSearch(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Type to search member..." />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {memberSearchResults
              .filter(m => !manualSearch || m.toLowerCase().includes(manualSearch.toLowerCase()))
              .map(m => (
                <button key={m} onClick={() => handleManualCheckin(m)} className="w-full text-left px-3 py-2 text-[11px] text-apple-gray-400 hover:bg-apple-gray-100 hover:text-[#1C1C1E] rounded-lg transition-colors">
                  {m}
                </button>
              ))}
          </div>
          {manualSearch && memberSearchResults.filter(m => m.toLowerCase().includes(manualSearch.toLowerCase())).length === 0 && (
            <button onClick={() => handleManualCheckin(manualSearch)} className="w-full text-left px-3 py-2 text-[11px] text-apple-blue hover:bg-apple-gray-100 rounded-lg transition-colors">
              + Add "{manualSearch}" as new check-in
            </button>
          )}
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'view-member'} onClose={() => setModal(null)} title={`Member: ${modal?.data?.name || ''}`} size="sm">
        {modal?.data && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-apple-gray-500">Name:</span> <span className="text-[#1C1C1E]">{modal.data.name}</span></div>
              <div><span className="text-apple-gray-500">Mobile:</span> <span className="text-[#1C1C1E]">{modal.data.mobile}</span></div>
              <div><span className="text-apple-gray-500">Plan:</span> <span className="text-[#1C1C1E]">{modal.data.membership}</span></div>
              <div><span className="text-apple-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
              <div><span className="text-apple-gray-500">Check In:</span> <span className="text-[#1C1C1E]">{modal.data.checkIn}</span></div>
              <div><span className="text-apple-gray-500">Check Out:</span> <span className="text-[#1C1C1E]">{modal.data.checkOut}</span></div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'history'} onClose={() => setModal(null)} title={`Check-in History: ${modal?.data?.name || ''}`} size="md">
        {modal?.data && (
          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map(i => {
              const d = new Date(Date.now() - i * 86400000)
              return (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-apple-gray-200">
                  <div>
                    <span className="text-xs font-medium text-[#1C1C1E]">{d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <p className="text-[10px] text-apple-gray-500">{i === 0 ? modal.data.checkIn : '07:0' + (5 + i % 3) + ' AM'}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${i < 2 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-apple-gray-400 bg-gray-500/10 border-gray-500/20'}`}>
                    {i < 2 ? 'Checked In' : 'Checked Out'}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </Modal>
    </div>
  )
}
