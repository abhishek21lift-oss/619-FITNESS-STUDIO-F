import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users, Phone, Mail, MapPin, MoreHorizontal, Eye, Edit3 } from 'lucide-react'

const branchOptions = ['All Branches', '619 FITNESS STUDIO (Kalyanpur)', '619 FITNESS STUDIO (Gomti Nagar)', '619 FITNESS STUDIO (Indira Nagar)']
const statusOptions = ['All', 'Active', 'Inactive', 'Expired']

const clients = [
  { name: 'Rahul Sharma', mobile: '+91 98765 43210', email: 'rahul@email.com', branch: 'Kalyanpur', status: 'Active', plan: 'Annual Gold', expiry: '31 Dec 2026' },
  { name: 'Priya Singh', mobile: '+91 87654 32109', email: 'priya@email.com', branch: 'Gomti Nagar', status: 'Active', plan: 'Monthly Basic', expiry: '15 Jul 2026' },
  { name: 'Amit Verma', mobile: '+91 76543 21098', email: 'amit@email.com', branch: 'Kalyanpur', status: 'Inactive', plan: 'Quarterly Pro', expiry: '01 Mar 2026' },
  { name: 'Sneha Patel', mobile: '+91 65432 10987', email: 'sneha@email.com', branch: 'Indira Nagar', status: 'Active', plan: 'Annual Platinum', expiry: '20 Nov 2026' },
  { name: 'Vikram Yadav', mobile: '+91 54321 09876', email: 'vikram@email.com', branch: 'Kalyanpur', status: 'Expired', plan: 'Monthly Basic', expiry: '02 Jan 2026' },
  { name: 'Neha Gupta', mobile: '+91 43210 98765', email: 'neha@email.com', branch: 'Gomti Nagar', status: 'Active', plan: 'Annual Gold', expiry: '10 Sep 2026' },
  { name: 'Arun Kumar', mobile: '+91 32109 87654', email: 'arun@email.com', branch: 'Kalyanpur', status: 'Inactive', plan: 'Quarterly Pro', expiry: '15 Apr 2026' },
  { name: 'Pooja Jain', mobile: '+91 21098 76543', email: 'pooja@email.com', branch: 'Indira Nagar', status: 'Active', plan: 'Monthly Basic', expiry: '05 Aug 2026' },
]

export default function MembersDatabase() {
  const [search, setSearch] = useState('')
  const [branch, setBranch] = useState('All Branches')
  const [status, setStatus] = useState('All')

  const filtered = clients.filter(c => {
    if (branch !== 'All Branches' && !c.branch.includes(branch)) return false
    if (status !== 'All' && c.status !== status) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.mobile.includes(search)) return false
    return true
  })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Client Database</h1>
          <p className="text-xs text-gray-500 mt-0.5">Total <span className="text-ydl-yellow font-semibold">991</span> clients registered.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-ydl-dark-border">
          <Users className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-xs text-gray-300">991 Total</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search name, mobile, email..." />
        </div>
        <select value={branch} onChange={e => setBranch(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {branchOptions.map(o => <option key={o}>{o}</option>)}
        </select>
        <div className="flex gap-1.5">
          {statusOptions.map(s => (
            <button key={s} onClick={() => setStatus(s)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${
              status === s ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'
            }`}>{s}</button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Branch</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Expiry</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((c, i) => (
                <motion.tr key={c.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{c.name}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{c.mobile}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{c.email}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{c.branch}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.plan}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      c.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      c.status === 'Inactive' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.expiry}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-300 rounded-lg transition-all"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
