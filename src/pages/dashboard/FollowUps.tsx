import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ChevronDown, Filter, Calendar, Phone, MessageSquare, Mail,
  CheckCircle, Clock, ArrowRight, Download, Trash2, Upload, BarChart3,
  UserCheck
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import FilterBar, { FilterField } from '../../components/shared/FilterBar'

const genders = ['All', 'Male', 'Female']
const convertibilities = ['All', 'Hot', 'Warm', 'Cold', 'Expected', 'Unpitched']
const callResponses = ['All', 'Open', 'Interested', 'Not Interested', 'No Answer', 'Busy', 'Call Back Later', 'Demo Scheduled', 'Joined', 'Not Reachable', 'Wrong Number', 'Switched Off']
const assignOptions = ['All', 'System', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']
const staffList = ['All', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma', 'Aarav Singh', 'Pooja Sharma']
const clientReps = ['All', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar']
const followUpTypes = ['All', 'Membership Renewal', 'Enquiry', 'Freeze', 'Birthday', 'Anniversary', 'Feedback', 'Trial Follow Up', 'Demo', 'Payment Follow Up', 'Personal Training', 'Nutrition Consultation', 'Goal Review', 'Body Measurement', 'Reactivation', 'Referral', 'Event Invitation', 'Wellness Check', 'Progress Review', 'Challenge Update', 'Workshop', 'Store Order', 'Class Schedule Change', 'Holiday Notification', 'Maintenance', 'General Check In', 'Other']
const clientTypes = ['All', 'Enquiry', 'Member']

const mockFollowups = Array.from({ length: 50 }, (_, i) => ({
  id: `FU-${String(i + 1).padStart(4, '0')}`,
  date: new Date(2026, 5, 7 - (i % 14)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  name: ['Rahul Sharma', 'Sneha Patel', 'Amit Verma', 'Neha Gupta', 'Arun Kumar', 'Pooja Jain', 'Vikram Yadav', 'Priya Singh', 'Rohan Kapoor', 'Ananya Saxena'][i % 10],
  mobile: `+91 9${String(8000 + i * 13).padStart(5, '0')} ${String(10000 + i * 7).padStart(5, '0')}`,
  gender: ['Male', 'Female'][i % 2],
  convertible: ['Hot', 'Warm', 'Cold', 'Expected', 'Unpitched'][i % 5],
  assignTo: ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma', 'System'][i % 7],
  type: ['Membership Renewal', 'Enquiry', 'Freeze', 'Birthday', 'Anniversary', 'Feedback', 'Trial Follow Up', 'Demo', 'Payment Follow Up', 'Personal Training', 'Nutrition Consultation', 'Goal Review', 'Body Measurement', 'Reactivation', 'Referral', 'Event Invitation', 'Wellness Check', 'Progress Review', 'Challenge Update', 'Workshop', 'Store Order', 'Class Schedule Change', 'Holiday Notification', 'Maintenance', 'General Check In', 'Other'][i % 26],
  response: ['Interested', 'Not Interested', 'No Answer', 'Busy', 'Call Back Later', 'Demo Scheduled', 'Joined', 'Open'][i % 8],
  status: ['Pending', 'Done', 'Overdue'][i % 3],
  clientRep: ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar'][i % 4],
  comment: 'Client was polite and said will call back next week.',
  clientType: ['Enquiry', 'Member'][i % 2],
  addedBy: ['Awash Vikash', 'Riya Singh'][i % 2],
}))

const typeIcons: Record<string, any> = { Call: Phone, Visit: Clock, WhatsApp: MessageSquare, Email: Mail, SMS: Mail, 'Membership Renewal': Clock, Enquiry: MessageSquare, Freeze: Clock, Birthday: Calendar, Anniversary: Calendar, Feedback: MessageSquare, Demo: Phone, Default: Clock }

export default function FollowUps() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState('All')
  const [convertible, setConvertible] = useState('All')
  const [callResponse, setCallResponse] = useState('All')
  const [assignTo, setAssignTo] = useState('All')
  const [followUpType, setFollowUpType] = useState('All')
  const [clientType, setClientType] = useState('All')
  const [clientRep, setClientRep] = useState('All')
  const [commentBy, setCommentBy] = useState('All')
  const [showStaffInsights, setShowStaffInsights] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const perPage = 25

  const filtered = mockFollowups.filter(f => {
    if (gender !== 'All' && f.gender !== gender) return false
    if (convertible !== 'All' && f.convertible !== convertible) return false
    if (callResponse !== 'All' && f.response !== callResponse) return false
    if (assignTo !== 'All' && f.assignTo !== assignTo) return false
    if (followUpType !== 'All' && f.type !== followUpType) return false
    if (clientType !== 'All' && f.clientType !== clientType) return false
    if (clientRep !== 'All' && f.clientRep !== clientRep) return false
    if (commentBy !== 'All' && f.addedBy !== commentBy) return false
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.mobile.includes(search)) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedRows(next)
  }

  const convertibleBadge = (c: string) => {
    const styles: Record<string, string> = {
      Hot: 'text-red-400 bg-red-500/10 border-red-500/20',
      Warm: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      Cold: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      Expected: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Unpitched: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[c] || styles.Cold}`}>{c}</span>
  }

  const responseBadge = (r: string) => {
    const styles: Record<string, string> = {
      Open: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      Interested: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      'Not Interested': 'text-red-400 bg-red-500/10 border-red-500/20',
      'Demo Scheduled': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      Joined: 'text-green-500 bg-green-500/10 border-green-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[r] || 'text-gray-500 bg-gray-500/10 border-gray-500/20'}`}>{r}</span>
  }

  const statusBadge = (s: string) => {
    if (s === 'Done') return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border text-emerald-400 bg-emerald-500/10 border-emerald-500/20"><CheckCircle className="w-3 h-3" /> Done</span>
    if (s === 'Overdue') return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border text-red-400 bg-red-500/10 border-red-500/20"><Clock className="w-3 h-3" /> Overdue</span>
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/20"><Clock className="w-3 h-3" /> Pending</span>
  }

  const getIcon = (type: string) => typeIcons[type] || typeIcons.Default

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Follow Ups</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track and manage all follow-up tasks across branches.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setModal({ type: 'analysis' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
            <BarChart3 className="w-3 h-3" /> View Analysis
          </button>
          <button onClick={() => setModal({ type: 'transfer' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors">
            <Upload className="w-3 h-3" /> Transfer
          </button>
          <button onClick={() => setModal({ type: 'delete-bulk' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors">
            <Trash2 className="w-3 h-3" /> Delete
          </button>
          <button onClick={() => alert(`Exporting CSV with ${filtered.length} follow-ups...`)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search name or mobile..." />
        </div>
        <select value={gender} onChange={e => setGender(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {genders.map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={convertible} onChange={e => setConvertible(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {convertibilities.map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={callResponse} onChange={e => setCallResponse(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {callResponses.map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={assignTo} onChange={e => setAssignTo(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {assignOptions.map(o => <option key={o}>{o}</option>)}
        </select>
        <button onClick={() => setShowMoreFilters(!showMoreFilters)} className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-colors ${showMoreFilters ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-400 hover:text-white'}`}>
          <Filter className="w-3 h-3" /> More Filters <ChevronDown className={`w-3 h-3 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {showMoreFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
              <FilterBar>
                <FilterField label="Gender"><select value={gender} onChange={e => setGender(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{genders.map(o => <option key={o}>{o}</option>)}</select></FilterField>
                <FilterField label="Convertibility"><select value={convertible} onChange={e => setConvertible(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{convertibilities.map(o => <option key={o}>{o}</option>)}</select></FilterField>
                <FilterField label="Call Response"><select value={callResponse} onChange={e => setCallResponse(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{callResponses.map(o => <option key={o}>{o}</option>)}</select></FilterField>
                <FilterField label="Assign To"><select value={assignTo} onChange={e => setAssignTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{assignOptions.map(o => <option key={o}>{o}</option>)}</select></FilterField>
                <FilterField label="Date From"><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30 [color-scheme:dark]" /></FilterField>
                <FilterField label="Date To"><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30 [color-scheme:dark]" /></FilterField>
                <FilterField label="Comment Added By"><select value={commentBy} onChange={e => setCommentBy(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{staffList.map(o => <option key={o}>{o}</option>)}</select></FilterField>
                <FilterField label="Client Rep"><select value={clientRep} onChange={e => setClientRep(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{clientReps.map(o => <option key={o}>{o}</option>)}</select></FilterField>
                <FilterField label="Follow Up Type"><select value={followUpType} onChange={e => setFollowUpType(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{followUpTypes.map(o => <option key={o}>{o}</option>)}</select></FilterField>
                <FilterField label="Client Type"><select value={clientType} onChange={e => setClientType(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30">{clientTypes.map(o => <option key={o}>{o}</option>)}</select></FilterField>
              </FilterBar>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-ydl-dark-border">
          <UserCheck className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-[10px] font-semibold text-gray-300">Total: <span className="text-ydl-yellow">{filtered.length}</span></span>
        </div>
        <label className="flex items-center gap-1.5 text-[10px] text-gray-500 cursor-pointer">
          <input type="checkbox" checked={showStaffInsights} onChange={() => setShowStaffInsights(!showStaffInsights)} className="accent-ydl-yellow" />
          Show all staff insights
        </label>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="w-8 px-3 py-3"><input type="checkbox" onChange={() => { if (selectedRows.size === filtered.length) setSelectedRows(new Set()); else setSelectedRows(new Set(filtered.map(f => f.id))) }} checked={selectedRows.size === filtered.length && filtered.length > 0} className="accent-ydl-yellow" /></th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">ID</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Conv.</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Assign To</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Response</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {paged.map((f, i) => {
                const Icon = getIcon(f.type)
                return (
                  <motion.tr key={f.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-3 py-3"><input type="checkbox" checked={selectedRows.has(f.id)} onChange={() => toggleRow(f.id)} className="accent-ydl-yellow" /></td>
                    <td className="px-3 py-3 text-xs font-medium text-ydl-yellow">{f.id}</td>
                    <td className="px-3 py-3 text-xs text-gray-400">{f.date}</td>
                    <td className="px-3 py-3"><div onClick={() => setModal({ type: 'view-profile', data: f })} className="text-xs font-medium text-white hover:text-ydl-yellow cursor-pointer transition-colors">{f.name}</div><div className="text-[10px] text-gray-600">{f.clientType}</div></td>
                    <td className="px-3 py-3 text-xs text-gray-400">{f.mobile}</td>
                    <td className="px-3 py-3">{convertibleBadge(f.convertible)}</td>
                    <td className="px-3 py-3 text-xs text-gray-400">{f.assignTo}</td>
                    <td className="px-3 py-3"><div className="flex items-center gap-1.5"><Icon className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{f.type}</span></div></td>
                    <td className="px-3 py-3">{responseBadge(f.response)}</td>
                    <td className="px-3 py-3">{statusBadge(f.status)}</td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setModal({ type: 'follow-up', data: f })} className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 border border-ydl-yellow/20 rounded-lg hover:bg-ydl-yellow/20 transition-colors">
                          Follow Up <ArrowRight className="w-3 h-3" />
                        </button>
                        <ActionMenu
                          label={<ChevronDown className="w-3 h-3" />}
                          actions={[
                            { label: 'Call', icon: Phone, onClick: () => window.open(`tel:${f.mobile}`) },
                            { label: 'Send WhatsApp', icon: MessageSquare, onClick: () => setModal({ type: 'whatsapp', data: f }) },
                            { label: 'Send Email', icon: Mail, onClick: () => setModal({ type: 'email', data: f }) },
                            { label: 'Mark Done', icon: CheckCircle, onClick: () => setModal({ type: 'mark-done', data: f }) },
                            { label: 'Reschedule', icon: Calendar, onClick: () => setModal({ type: 'reschedule', data: f }) },
                            { label: 'Edit', icon: ArrowRight, onClick: () => setModal({ type: 'edit', data: f }) },
                          ]}
                        />
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10"><p className="text-xs text-gray-500">No follow ups found.</p></div>}
        {totalPages > 1 && <div className="flex items-center justify-between px-3 py-2 border-t border-ydl-dark-border bg-white/[0.02]"><span className="text-[10px] text-gray-500">Page {page} of {totalPages}</span><div className="flex items-center gap-1"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">‹</button><button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10">›</button></div></div>}
      </motion.div>

      <Modal open={modal?.type === 'follow-up'} onClose={() => setModal(null)} title="Follow Up Action" size="md">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-gray-500">Client:</span> <span className="text-white">{modal?.data?.name}</span></div>
            <div><span className="text-gray-500">Mobile:</span> <span className="text-white">{modal?.data?.mobile}</span></div>
          </div>
          <div className="space-y-1.5"><label className="text-[11px] text-gray-400">Follow Up Type</label><select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">{followUpTypes.filter(t => t !== 'All').map(t => <option key={t}>{t}</option>)}</select></div>
          <div className="space-y-1.5"><label className="text-[11px] text-gray-400">Response</label><select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">{callResponses.filter(r => r !== 'All').map(r => <option key={r}>{r}</option>)}</select></div>
          <div className="space-y-1.5"><label className="text-[11px] text-gray-400">Comment</label><textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[60px] resize-none" placeholder="Add comment..." /></div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('Follow up saved!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Save</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'transfer'} onClose={() => setModal(null)} title="Transfer Follow Ups" size="md">
        <div className="space-y-3">
          <div className="text-xs text-gray-500">Transfer {selectedRows.size || 'all'} follow up(s) to:</div>
          <select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">{staffList.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}</select>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('Follow ups transferred successfully!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Upload className="w-3 h-3 inline mr-1" /> Transfer</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'delete-bulk'} onClose={() => setModal(null)} title="Delete Follow Ups" size="sm">
        <p className="text-xs text-gray-400">Are you sure you want to delete {selectedRows.size || 'all filtered'} follow up(s)? This action cannot be undone.</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { alert(`${selectedRows.size || 'all filtered'} follow up(s) deleted.`); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={modal?.type === 'analysis'} onClose={() => setModal(null)} title="Follow Up Analysis" size="xl">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-lg bg-white/[0.02] border border-ydl-dark-border p-3 text-center"><div className="text-lg font-bold text-ydl-yellow">{mockFollowups.filter(f => f.status === 'Pending').length}</div><div className="text-[10px] text-gray-500">Pending</div></div>
          <div className="rounded-lg bg-white/[0.02] border border-ydl-dark-border p-3 text-center"><div className="text-lg font-bold text-emerald-400">{mockFollowups.filter(f => f.status === 'Done').length}</div><div className="text-[10px] text-gray-500">Done</div></div>
          <div className="rounded-lg bg-white/[0.02] border border-ydl-dark-border p-3 text-center"><div className="text-lg font-bold text-red-400">{mockFollowups.filter(f => f.status === 'Overdue').length}</div><div className="text-[10px] text-gray-500">Overdue</div></div>
        </div>
        <div className="text-xs text-gray-500 mb-2">Conversion by staff:</div>
        <div className="space-y-1.5">
          {['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar'].map(s => (
            <div key={s} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-ydl-dark-border">
              <span className="text-xs text-white">{s}</span>
              <span className="text-[10px] text-emerald-400">{Math.floor(Math.random() * 30 + 10)} conversions</span>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={modal?.type === 'whatsapp'} onClose={() => setModal(null)} title={`WhatsApp: ${modal?.data?.name || ''}`} size="md">
        <div className="space-y-3">
          <div className="text-[11px] text-gray-500">To: <span className="text-white">{modal?.data?.mobile}</span></div>
          <textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[100px] resize-none" placeholder="Type WhatsApp message..." />
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('WhatsApp message sent!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Send WhatsApp</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'mark-done'} onClose={() => setModal(null)} title="Mark as Done" size="sm">
        <p className="text-xs text-gray-400">Mark follow up <span className="text-white">{modal?.data?.id}</span> for <span className="text-white">{modal?.data?.name}</span> as completed?</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { alert('Follow up marked as done!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><CheckCircle className="w-3 h-3 inline mr-1" /> Mark Done</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={modal?.type === 'reschedule'} onClose={() => setModal(null)} title="Reschedule Follow Up" size="md">
        <div className="space-y-3">
          <div className="text-[11px] text-gray-500">Client: <span className="text-white">{modal?.data?.name}</span></div>
          <div className="space-y-1.5"><label className="text-[11px] text-gray-400">New Date</label><input type="date" className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" /></div>
          <div className="space-y-1.5"><label className="text-[11px] text-gray-400">Reason</label><textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[60px] resize-none" placeholder="Reason for rescheduling..." /></div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('Follow up rescheduled!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">Reschedule</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'view-profile'} onClose={() => setModal(null)} title={`Profile: ${modal?.data?.name || ''}`} size="lg">
        {modal?.data && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-gray-500">ID:</span> <span className="text-white font-medium">{modal.data.id}</span></div>
              <div><span className="text-gray-500">Date:</span> <span className="text-white">{modal.data.date}</span></div>
              <div><span className="text-gray-500">Name:</span> <span className="text-white">{modal.data.name}</span></div>
              <div><span className="text-gray-500">Mobile:</span> <span className="text-white">{modal.data.mobile}</span></div>
              <div><span className="text-gray-500">Gender:</span> <span className="text-white">{modal.data.gender}</span></div>
              <div><span className="text-gray-500">Type:</span> <span className="text-white">{modal.data.type}</span></div>
              <div><span className="text-gray-500">Assign To:</span> <span className="text-white">{modal.data.assignTo}</span></div>
              <div><span className="text-gray-500">Convertibility:</span> {convertibleBadge(modal.data.convertible)}</div>
              <div><span className="text-gray-500">Response:</span> {responseBadge(modal.data.response)}</div>
              <div><span className="text-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
            </div>
            <div className="pt-2 border-t border-ydl-dark-border">
              <span className="text-gray-500">Comment:</span>
              <p className="text-white mt-1">{modal.data.comment || 'No comments'}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
