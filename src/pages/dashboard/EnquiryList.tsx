import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Plus, Download, Filter, ChevronDown, Phone, Mail, MessageSquare,
  MoreHorizontal, Copy, Eye, Edit3, Trash2, Bell, Send,
  ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock
} from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import FilterBar from '../../components/shared/FilterBar'
import { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const mockEnquiries = Array.from({ length: 39 }, (_, page) =>
  Array.from({ length: 25 }, (__, i) => ({
    id: `ENQ-${String(page * 25 + i + 1).padStart(4, '0')}`,
    date: new Date(2026, 5, 7 - ((page * 25 + i) % 14)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    name: ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Sneha Patel', 'Vikram Yadav', 'Neha Gupta', 'Arun Kumar', 'Pooja Jain', 'Rohan Mehra', 'Ananya Kapoor', 'Karan Malhotra', 'Isha Saxena', 'Manish Tiwari', 'Divya Choudhary', 'Siddharth Pandey'][(page * 25 + i) % 15],
    mobile: `+91 ${String(90000 + (page * 25 + i) % 10000).padStart(5, '0')} ${String(10000 + (page * 25 + i) % 10000).padStart(5, '0')}`,
    email: `user${page * 25 + i}@email.com`,
    status: ['Open', 'Closed', 'Closed', 'Not Interested'][(page * 25 + i) % 4],
    tapped: ['Tapped', 'Untapped'][(page * 25 + i) % 5 === 0 ? 1 : 0],
    source: ['Instagram', 'Facebook', 'Google', 'Walk-in', 'Friend Referral', 'Phone Call', 'Website', 'YouTube'][(page * 25 + i) % 8],
    promotion: ['Instagram Ad', 'Facebook Ad', 'Google Ads', 'Referral Program', 'Billboard', 'Radio', 'Newspaper', 'SMS Campaign', 'Email Campaign', 'YouTube Ad', 'Podcast', 'Local Event', 'Cross Promotion', 'Flyer', 'Poster', 'Banner', 'TV Ad', 'WhatsApp Group', 'Telegram', 'LinkedIn', 'Twitter', 'Pinterest', 'Snapchat', 'TikTok', 'Blog', 'SEO', 'Word of Mouth', 'Other'][(page * 25 + i) % 28],
    gender: ['Male', 'Female', 'Other'][(page * 25 + i) % 3],
    leadType: ['New', 'Existing', 'Reactivation'][(page * 25 + i) % 3],
    leadStatus: ['Hot', 'Warm', 'Cold'][(page * 25 + i) % 3],
    clientRep: ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar'][(page * 25 + i) % 4],
    onTrial: ['Yes', 'No'][(page * 25 + i) % 3 === 0 ? 0 : 1],
    followupStage: ['Initial', 'Demo', 'Follow Up 1', 'Follow Up 2', 'Follow Up 3', 'Negotiation', 'Closed Won', 'Closed Lost'][(page * 25 + i) % 8],
    trainer: ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma', 'Unassigned'][(page * 25 + i) % 7],
    remark: ['Interested in Annual Plan', 'Wants demo session', 'Budget concern', 'Will decide next week', 'Need spouse approval', '', '', ''][(page * 25 + i) % 8],
    comment: 'Followed up, client is considering',
    appStatus: ['installed', 'not_installed'][(page * 25 + i) % 4 === 0 ? 1 : 0],
    tappedStatus: ['tapped', 'not_tapped'][(page * 25 + i) % 5 === 0 ? 1 : 0],
  }))
).flat()

const sourcePromotions = ['Instagram Ad', 'Facebook Ad', 'Google Ads', 'Referral Program', 'Billboard', 'Radio', 'Newspaper', 'SMS Campaign', 'Email Campaign', 'YouTube Ad', 'Podcast', 'Local Event', 'Cross Promotion', 'Flyer', 'Poster', 'Banner', 'TV Ad', 'WhatsApp Group', 'Telegram', 'LinkedIn', 'Twitter', 'Pinterest', 'Snapchat', 'TikTok', 'Blog', 'SEO', 'Word of Mouth', 'Other']
const genders = ['All', 'Male', 'Female', 'Other']
const leadTypes = ['All', 'New', 'Existing', 'Reactivation']
const leadStatuses = ['All', 'Hot', 'Warm', 'Cold']
const clientReps = ['All', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']
const onTrials = ['All', 'Yes', 'No']
const followupStages = ['All', 'Initial', 'Demo', 'Follow Up 1', 'Follow Up 2', 'Follow Up 3', 'Negotiation', 'Closed Won', 'Closed Lost']
const trainers = ['All', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Venma', 'Unassigned']
const sourceEnquiries = ['All', 'Instagram', 'Facebook', 'Google', 'Walk-in', 'Friend Referral', 'Phone Call', 'Website', 'YouTube', 'LinkedIn', 'Twitter', 'Email']

function LeadStatusTab({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${active ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'}`}>
      {label}: <span className="font-bold">{count}</span>
    </button>
  )
}

export default function EnquiryList() {
  const [search, setSearch] = useState('')
  const [leadTab, setLeadTab] = useState('Open')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const perPage = 25

  const [filters, setFilters] = useState({
    gender: 'All', leadType: 'All', leadStatus: 'All', clientRep: 'All',
    onTrial: 'All', followupStage: 'All', trainer: 'All', sourceEnquiry: 'All', promotion: 'All'
  })

  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [dateRange, setDateRange] = useState('All')
  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [showPromoDropdown, setShowPromoDropdown] = useState(false)

  const dateRef = useRef<HTMLDivElement>(null)
  const promoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) setShowDateDropdown(false)
      if (promoRef.current && !promoRef.current.contains(e.target as Node)) setShowPromoDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openCount = mockEnquiries.filter(e => e.status === 'Open').length
  const closedCount = mockEnquiries.filter(e => e.status === 'Closed').length
  const notInterestedCount = mockEnquiries.filter(e => e.status === 'Not Interested').length
  const tappedCount = mockEnquiries.filter(e => e.tapped === 'Tapped').length
  const untappedCount = mockEnquiries.filter(e => e.tapped === 'Untapped').length

  const filtered = mockEnquiries.filter(e => {
    if (leadTab !== 'All' && e.status !== leadTab) return false
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.mobile.includes(search) && !e.email.toLowerCase().includes(search.toLowerCase())) return false
    if (filters.gender !== 'All' && e.gender !== filters.gender) return false
    if (filters.leadType !== 'All' && e.leadType !== filters.leadType) return false
    if (filters.leadStatus !== 'All' && e.leadStatus !== filters.leadStatus) return false
    if (filters.clientRep !== 'All' && e.clientRep !== filters.clientRep) return false
    if (filters.onTrial !== 'All' && e.onTrial !== filters.onTrial) return false
    if (filters.followupStage !== 'All' && e.followupStage !== filters.followupStage) return false
    if (filters.trainer !== 'All' && e.trainer !== filters.trainer) return false
    if (filters.sourceEnquiry !== 'All' && e.source !== filters.sourceEnquiry) return false
    if (filters.promotion !== 'All' && e.promotion !== filters.promotion) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedRows(next)
  }

  const toggleAll = () => {
    if (selectedRows.size === paged.length) setSelectedRows(new Set())
    else setSelectedRows(new Set(paged.map(r => r.id)))
  }

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      Open: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Closed: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      'Not Interested': 'text-red-400 bg-red-500/10 border-red-500/20',
    }
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${styles[s] || styles.Open}`}>{s}</span>
  }

  const exportCSV = () => {
    const csv = [['Enquiry Code', 'Date', 'Name', 'Mobile', 'Email', 'Status', 'Source', 'Promotion', 'Handled By'].join(',')]
      .concat(filtered.map(e => [e.id, e.date, e.name, e.mobile, e.email, e.status, e.source, e.promotion, e.clientRep].join(',')))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'enquiries.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Enquiry List</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage and track all client leads.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            <Download className="w-3 h-3" /> Export CSV
          </button>
          <button onClick={() => setModal({ type: 'delete', data: 'selected' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors">
            <Trash2 className="w-3 h-3" /> Delete
          </button>
          <button onClick={() => setModal({ type: 'deactivate' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors">
            <XCircle className="w-3 h-3" /> Deactivate
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-3 h-3" /> Add Enquiry
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <LeadStatusTab label="Open" count={openCount} active={leadTab === 'Open'} onClick={() => { setLeadTab('Open'); setPage(1) }} />
        <LeadStatusTab label="Closed" count={closedCount} active={leadTab === 'Closed'} onClick={() => { setLeadTab('Closed'); setPage(1) }} />
        <LeadStatusTab label="Not Interested" count={notInterestedCount} active={leadTab === 'Not Interested'} onClick={() => { setLeadTab('Not Interested'); setPage(1) }} />
        <LeadStatusTab label="All" count={mockEnquiries.length} active={leadTab === 'All'} onClick={() => { setLeadTab('All'); setPage(1) }} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search by mobile, email, name..." />
        </div>

        <div className="relative" ref={dateRef}>
          <button onClick={() => setShowDateDropdown(!showDateDropdown)} className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            {dateRange === 'All' ? 'Date Range' : dateRange} <ChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showDateDropdown && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="absolute left-0 top-full mt-1 w-40 rounded-lg border border-ydl-dark-border bg-[#1A1A1A] shadow-xl z-30 overflow-hidden">
                {['All', 'Today', 'Yesterday', 'Last 7 Days', 'This Month', 'Last Month', 'Custom'].map(d => (
                  <button key={d} onClick={() => { setDateRange(d); setShowDateDropdown(false) }} className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-white/5 transition-colors ${dateRange === d ? 'text-ydl-yellow' : 'text-gray-400'}`}>{d}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={promoRef}>
          <button onClick={() => setShowPromoDropdown(!showPromoDropdown)} className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            {filters.promotion === 'All' ? 'Source of Promotion' : filters.promotion} <ChevronDown className="w-3 h-3" />
          </button>
          <AnimatePresence>
            {showPromoDropdown && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="absolute left-0 top-full mt-1 w-52 rounded-lg border border-ydl-dark-border bg-[#1A1A1A] shadow-xl z-30 max-h-60 overflow-y-auto">
                {sourcePromotions.map(p => (
                  <button key={p} onClick={() => { setFilters({ ...filters, promotion: p }); setShowPromoDropdown(false) }} className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-white/5 transition-colors ${filters.promotion === p ? 'text-ydl-yellow' : 'text-gray-400'}`}>{p}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-colors ${showFilters ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-400 hover:text-white'}`}>
          <Filter className="w-3 h-3" /> Filters <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        <span className="text-[10px] text-gray-500">{filtered.length} results</span>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
              <FilterBar>
                <FilterField label="Gender"><FilterSelect options={genders} value={filters.gender} onChange={(e: any) => setFilters({ ...filters, gender: e.target.value })} /></FilterField>
                <FilterField label="Lead Type"><FilterSelect options={leadTypes} value={filters.leadType} onChange={(e: any) => setFilters({ ...filters, leadType: e.target.value })} /></FilterField>
                <FilterField label="Lead Status"><FilterSelect options={leadStatuses} value={filters.leadStatus} onChange={(e: any) => setFilters({ ...filters, leadStatus: e.target.value })} /></FilterField>
                <FilterField label="Client Rep"><FilterSelect options={clientReps} value={filters.clientRep} onChange={(e: any) => setFilters({ ...filters, clientRep: e.target.value })} /></FilterField>
                <FilterField label="On Trial"><FilterSelect options={onTrials} value={filters.onTrial} onChange={(e: any) => setFilters({ ...filters, onTrial: e.target.value })} /></FilterField>
                <FilterField label="Followup Stage"><FilterSelect options={followupStages} value={filters.followupStage} onChange={(e: any) => setFilters({ ...filters, followupStage: e.target.value })} /></FilterField>
                <FilterField label="Assigned Trainer"><FilterSelect options={trainers} value={filters.trainer} onChange={(e: any) => setFilters({ ...filters, trainer: e.target.value })} /></FilterField>
                <FilterField label="Source Enquiry"><FilterSelect options={sourceEnquiries} value={filters.sourceEnquiry} onChange={(e: any) => setFilters({ ...filters, sourceEnquiry: e.target.value })} /></FilterField>
              </FilterBar>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-ydl-dark-border">
          <span className="text-[10px] font-semibold text-gray-400">Untapped:</span>
          <span className="text-[10px] font-bold text-amber-400">{untappedCount}</span>
          <span className="text-gray-600 mx-1">|</span>
          <span className="text-[10px] font-semibold text-gray-400">Tapped:</span>
          <span className="text-[10px] font-bold text-emerald-400">{tappedCount}</span>
        </div>
        <button onClick={() => setModal({ type: 'send-notification' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
          <Bell className="w-3 h-3" /> Send Notification
        </button>
        <button onClick={() => alert('Sending customized WhatsApp message...')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
          <Send className="w-3 h-3" /> Send Customized WhatsApp
        </button>
        <button onClick={() => alert('Selected enquiries marked as Tapped!')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
          <CheckCircle className="w-3 h-3" /> Mark as Tapped
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="w-8 px-3 py-3">
                  <input type="checkbox" checked={selectedRows.size === paged.length && paged.length > 0} onChange={toggleAll} className="accent-ydl-yellow" />
                </th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Enquiry Code</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Name & Number</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Trial</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Handled By</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Promotion</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Remark</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {paged.map((enq, i) => (
                <motion.tr key={enq.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-3"><input type="checkbox" checked={selectedRows.has(enq.id)} onChange={() => toggleRow(enq.id)} className="accent-ydl-yellow" /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-ydl-yellow">{enq.id}</span>
                      <button onClick={() => { navigator.clipboard.writeText(enq.id); setModal({ type: 'copied', data: enq.id }) }} className="text-gray-600 hover:text-gray-400 transition-colors">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-400">{enq.date}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span onClick={() => setModal({ type: 'view-profile', data: enq })} className="text-xs font-medium text-white hover:text-ydl-yellow cursor-pointer transition-colors">{enq.name}</span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-medium rounded ${enq.appStatus === 'installed' ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-500 bg-gray-500/10'}`}>
                          {enq.appStatus === 'installed' ? 'App' : 'No App'}
                        </span>
                        <span className={`text-[8px] font-medium ${enq.tappedStatus === 'tapped' ? 'text-green-400' : 'text-amber-400'}`}>
                          {enq.tappedStatus === 'tapped' ? 'Tapped' : 'Untapped'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500">{enq.mobile}</span>
                        <button onClick={() => setModal({ type: 'followup-history', data: enq })} className="text-[10px] text-ydl-yellow hover:underline">FollowUp</button>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-[10px] font-medium ${enq.onTrial === 'Yes' ? 'text-emerald-400' : 'text-gray-500'}`}>{enq.onTrial}</span>
                  </td>
                  <td className="px-3 py-3">{statusBadge(enq.status)}</td>
                  <td className="px-3 py-3 text-xs text-gray-400">{enq.clientRep}</td>
                  <td className="px-3 py-3 text-xs text-gray-400">{enq.source}</td>
                  <td className="px-3 py-3 text-[10px] text-gray-400 max-w-[120px] truncate">{enq.promotion}</td>
                  <td className="px-3 py-3 text-[10px] text-gray-500 max-w-[120px] truncate">{enq.remark || '-'}</td>
                  <td className="px-3 py-3 text-right">
                    <ActionMenu
                      label={<MoreHorizontal className="w-3.5 h-3.5" />}
                      actions={[
                        { label: 'Call', icon: Phone, onClick: () => window.open(`tel:${enq.mobile}`) },
                        { label: 'Send SMS', icon: MessageSquare, onClick: () => setModal({ type: 'send-sms', data: enq }) },
                        { label: 'Send Email', icon: Mail, onClick: () => setModal({ type: 'send-email', data: enq }) },
                        { label: 'View Profile', icon: Eye, onClick: () => setModal({ type: 'view-profile', data: enq }) },
                        { label: 'FollowUp History', icon: Clock, onClick: () => setModal({ type: 'followup-history', data: enq }) },
                        { label: 'Edit', icon: Edit3, onClick: () => setModal({ type: 'edit-enquiry', data: enq }) },
                        { label: 'Delete', icon: Trash2, color: 'text-red-400', onClick: () => setModal({ type: 'delete', data: enq }) },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {paged.length === 0 && <div className="text-center py-10"><p className="text-xs text-gray-500">No enquiries match your filters.</p></div>}
      </motion.div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500">Page {page} of {totalPages}</span>
        <div className="flex items-center gap-1">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 4))
            const p = start + i
            if (p > totalPages) return null
            return (
              <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 text-[10px] font-medium rounded-lg border transition-colors ${page === p ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-white'}`}>
                {p}
              </button>
            )
          })}
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-1.5 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Modal open={modal?.type === 'send-notification'} onClose={() => setModal(null)} title="Send Notification" size="md">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Title</label>
            <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Notification title" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400">Message</label>
            <textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[80px] resize-none" placeholder="Type your notification message..." />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <input type="checkbox" className="accent-ydl-yellow" /> Send to all {filtered.length} filtered enquiries
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('Notification sent successfully!'); setModal(null); }} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Send className="w-3.5 h-3.5" /> Send</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'view-profile'} onClose={() => setModal(null)} title={`Profile: ${modal?.data?.name || ''}`} size="lg">
        {modal?.data && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-gray-500">Code:</span> <span className="text-white font-medium">{modal.data.id}</span></div>
              <div><span className="text-gray-500">Date:</span> <span className="text-white">{modal.data.date}</span></div>
              <div><span className="text-gray-500">Name:</span> <span className="text-white">{modal.data.name}</span></div>
              <div><span className="text-gray-500">Mobile:</span> <span className="text-white">{modal.data.mobile}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="text-white">{modal.data.email}</span></div>
              <div><span className="text-gray-500">Gender:</span> <span className="text-white">{modal.data.gender}</span></div>
              <div><span className="text-gray-500">Source:</span> <span className="text-white">{modal.data.source}</span></div>
              <div><span className="text-gray-500">Promotion:</span> <span className="text-white">{modal.data.promotion}</span></div>
              <div><span className="text-gray-500">Handled By:</span> <span className="text-white">{modal.data.clientRep}</span></div>
              <div><span className="text-gray-500">Trainer:</span> <span className="text-white">{modal.data.trainer}</span></div>
              <div><span className="text-gray-500">Lead Type:</span> <span className="text-white">{modal.data.leadType}</span></div>
              <div><span className="text-gray-500">Status:</span> {statusBadge(modal.data.status)}</div>
            </div>
            <div className="pt-2 border-t border-ydl-dark-border">
              <span className="text-gray-500">Remark:</span>
              <p className="text-white mt-1">{modal.data.remark || 'No remarks'}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'followup-history'} onClose={() => setModal(null)} title={`FollowUp History: ${modal?.data?.name || ''}`} size="md">
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-ydl-dark-border">
              <div className="w-6 h-6 rounded-full bg-ydl-yellow/10 flex items-center justify-center text-xs text-ydl-yellow font-bold">{i}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-white">Follow Up #{i}</span>
                  <span className="text-[10px] text-gray-500">{new Date(2026, 5, 7 - i).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">Called and discussed membership options. Client showed interest in Annual Gold plan.</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Hot</span>
                  <span className="text-[9px] text-gray-500">by Riya Singh</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={modal?.type === 'delete'} onClose={() => setModal(null)} title="Confirm Delete" size="sm">
        <p className="text-xs text-gray-400">Are you sure you want to delete {modal?.data === 'selected' ? `${selectedRows.size} selected` : 'this'} enquiry? This action cannot be undone.</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { alert(`Enquiry ${modal?.data === 'selected' ? `${selectedRows.size} selected` : modal?.data?.id || ''} deleted.`); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">Cancel</button>
        </div>
      </Modal>

      <Modal open={modal?.type === 'send-sms'} onClose={() => setModal(null)} title={`Send SMS to ${modal?.data?.name || ''}`} size="md">
        <div className="space-y-3">
          <div className="text-[11px] text-gray-500">To: <span className="text-white">{modal?.data?.mobile}</span></div>
          <textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[100px] resize-none" placeholder="Type SMS message..." />
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('SMS sent successfully!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><MessageSquare className="w-3 h-3 inline mr-1" /> Send SMS</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'send-email'} onClose={() => setModal(null)} title={`Send Email to ${modal?.data?.name || ''}`} size="lg">
        <div className="space-y-3">
          <div className="text-[11px] text-gray-500">To: <span className="text-white">{modal?.data?.email}</span></div>
          <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Subject" />
          <textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[120px] resize-none" placeholder="Compose email..." />
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('Email sent successfully!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Mail className="w-3 h-3 inline mr-1" /> Send Email</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'edit-enquiry'} onClose={() => setModal(null)} title={`Edit Enquiry: ${modal?.data?.id || ''}`} size="lg">
        {modal?.data && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Name</label><input defaultValue={modal.data.name} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Mobile</label><input defaultValue={modal.data.mobile} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Email</label><input defaultValue={modal.data.email} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40" /></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Status</label><select defaultValue={modal.data.status} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40"><option>Open</option><option>Closed</option><option>Not Interested</option></select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Source</label><select defaultValue={modal.data.source} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40">{sourceEnquiries.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-[10px] text-gray-500">Handled By</label><select defaultValue={modal.data.clientRep} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-ydl-yellow/40">{clientReps.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="col-span-2 flex items-center gap-3 pt-2 border-t border-ydl-dark-border mt-2">
              <button onClick={() => { alert('Enquiry updated successfully!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Edit3 className="w-3 h-3 inline mr-1" /> Save Changes</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'copied'} onClose={() => setModal(null)} title="Copied" size="sm">
        <p className="text-xs text-gray-400">Enquiry code <span className="text-ydl-yellow font-medium">{modal?.data}</span> copied to clipboard.</p>
        <button onClick={() => setModal(null)} className="mt-3 px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">OK</button>
      </Modal>

      <Modal open={modal?.type === 'deactivate'} onClose={() => setModal(null)} title="Deactivate Enquiries" size="sm">
        <p className="text-xs text-gray-400">You can deactivate selected enquiries. They will be hidden from the active list but data will be preserved.</p>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { alert('Enquiries deactivated successfully!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors">Deactivate</button>
          <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
