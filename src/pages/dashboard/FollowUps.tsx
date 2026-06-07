import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Phone, MessageSquare, Mail, CheckCircle, Clock, ArrowRight, ChevronDown } from 'lucide-react'

const genderOptions = ['All', 'Male', 'Female']
const convertibleOptions = ['All', 'Hot', 'Warm', 'Cold']
const followUpTypeOptions = ['All', 'Call', 'Visit', 'WhatsApp', 'Email', 'SMS']
const staffOptions = ['All', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma']

const followups = [
  { id: 'FU-001', date: '07 Jun 2026', name: 'Rahul Sharma', mobile: '+91 98765 43210', gender: 'Male', convertible: 'Hot', staff: 'Riya Singh', type: 'Call', status: 'Pending' },
  { id: 'FU-002', date: '07 Jun 2026', name: 'Sneha Patel', mobile: '+91 65432 10987', gender: 'Female', convertible: 'Warm', staff: 'Awash Vikash', type: 'WhatsApp', status: 'Done' },
  { id: 'FU-003', date: '06 Jun 2026', name: 'Amit Verma', mobile: '+91 76543 21098', gender: 'Male', convertible: 'Cold', staff: 'Abhishek Katiyar', type: 'Visit', status: 'Pending' },
  { id: 'FU-004', date: '06 Jun 2026', name: 'Neha Gupta', mobile: '+91 43210 98765', gender: 'Female', convertible: 'Hot', staff: 'Riya Singh', type: 'Email', status: 'Done' },
  { id: 'FU-005', date: '05 Jun 2026', name: 'Arun Kumar', mobile: '+91 32109 87654', gender: 'Male', convertible: 'Warm', staff: 'Rajat Katiyar', type: 'SMS', status: 'Pending' },
  { id: 'FU-006', date: '04 Jun 2026', name: 'Pooja Jain', mobile: '+91 21098 76543', gender: 'Female', convertible: 'Cold', staff: 'Shivani Verma', type: 'Call', status: 'Done' },
  { id: 'FU-007', date: '03 Jun 2026', name: 'Vikram Yadav', mobile: '+91 54321 09876', gender: 'Male', convertible: 'Hot', staff: 'Narayan Chandel', type: 'Visit', status: 'Pending' },
  { id: 'FU-008', date: '02 Jun 2026', name: 'Priya Singh', mobile: '+91 87654 32109', gender: 'Female', convertible: 'Warm', staff: 'Awash Vikash', type: 'WhatsApp', status: 'Done' },
]

const typeIcons: Record<string, any> = { Call: Phone, Visit: Clock, WhatsApp: MessageSquare, Email: Mail, SMS: Mail }

export default function FollowUps() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState('All')
  const [convertible, setConvertible] = useState('All')
  const [staff, setStaff] = useState('All')
  const [type, setType] = useState('All')

  const filtered = followups.filter(f => {
    if (gender !== 'All' && f.gender !== gender) return false
    if (convertible !== 'All' && f.convertible !== convertible) return false
    if (staff !== 'All' && f.staff !== staff) return false
    if (type !== 'All' && f.type !== type) return false
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.mobile.includes(search)) return false
    return true
  })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Follow Ups</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track and manage follow-up tasks.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search name or mobile..." />
        </div>
        <select value={gender} onChange={e => setGender(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {genderOptions.map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={convertible} onChange={e => setConvertible(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {convertibleOptions.map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={staff} onChange={e => setStaff(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {staffOptions.map(o => <option key={o}>{o}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {followUpTypeOptions.map(o => <option key={o}>{o}</option>)}
        </select>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
          <Calendar className="w-3 h-3" /> Date Range <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Conv.</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Staff</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((f, i) => {
                const Icon = typeIcons[f.type]
                return (
                  <motion.tr key={f.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-gray-300">{f.id}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{f.date}</td>
                    <td className="px-4 py-3 text-xs font-medium text-white">{f.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{f.mobile}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${
                        f.convertible === 'Hot' ? 'text-red-400 bg-red-500/10 border border-red-500/20' :
                        f.convertible === 'Warm' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                        'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                      }`}>{f.convertible}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{f.staff}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-400">{f.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${
                        f.status === 'Done'
                          ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                          : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      }`}>
                        {f.status === 'Done' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {f.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 border border-ydl-yellow/20 rounded-lg hover:bg-ydl-yellow/20 transition-colors">
                        Follow Up <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
