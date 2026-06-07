import { useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Search, MapPin } from 'lucide-react'

const branchFilter = ['All', 'Gomti Nagar', 'Indira Nagar', 'Hazratganj']

const otherBranchClients = [
  { name: 'Manoj Tiwari', mobile: '+91 99887 76655', branch: 'Gomti Nagar', plan: 'Annual Gold', status: 'Active' },
  { name: 'Sunita Sharma', mobile: '+91 88776 65544', branch: 'Indira Nagar', plan: 'Monthly Basic', status: 'Active' },
  { name: 'Ravi Kumar', mobile: '+91 77665 54433', branch: 'Hazratganj', plan: 'Quarterly Pro', status: 'Inactive' },
  { name: 'Anjali Singh', mobile: '+91 66554 43322', branch: 'Gomti Nagar', plan: 'Annual Platinum', status: 'Active' },
  { name: 'Deepak Verma', mobile: '+91 55443 32211', branch: 'Indira Nagar', plan: 'Monthly Basic', status: 'Expired' },
]

export default function MembersOtherBranch() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = otherBranchClients.filter(c => {
    if (filter !== 'All' && c.branch !== filter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Other Branch Members</h1>
          <p className="text-xs text-gray-500 mt-0.5">Clients from other fitness center branches.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-ydl-dark-border">
          <GitBranch className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-[10px] font-semibold text-gray-300">5 Members</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search name..." />
        </div>
        <div className="flex gap-1.5">
          {branchFilter.map(b => (
            <button key={b} onClick={() => setFilter(b)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${
              filter === b ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow' : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300'
            }`}>{b}</button>
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
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Branch</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((c, i) => (
                <motion.tr key={c.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-white">{c.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.mobile}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-500" /><span className="text-xs text-gray-400">{c.branch}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{c.plan}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${
                      c.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      c.status === 'Inactive' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>{c.status}</span>
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
