import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2, Plus } from 'lucide-react'
import { api } from '../../api'

export default function Members() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { api('/members').then(setMembers).catch(() => {}).finally(() => setLoading(false)) }, [])

  const filtered = members.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()) || m.phone?.includes(search)
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Members</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-ydl-gradient rounded-xl hover:shadow-ydl-gold-lg transition-all">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ydl-muted" />
        <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-ydl-card-gradient border border-ydl-dark-border rounded-xl text-white text-sm placeholder:text-ydl-muted focus:outline-none focus:border-ydl-yellow" />
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ydl-dark-border">
          <table className="w-full text-sm">
            <thead className="bg-ydl-card-gradient">
              <tr className="text-ydl-muted text-left">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">Plan</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border">
              {filtered.map((m, i) => (
                <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 text-white font-medium">{m.name}</td>
                  <td className="p-3 text-ydl-muted">{m.email}</td>
                  <td className="p-3 text-ydl-muted">{m.phone}</td>
                  <td className="p-3 text-ydl-muted">{m.plan}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${m.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{m.status}</span></td>
                  <td className="p-3 text-ydl-muted">{m.joinDate}</td>
                </motion.tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-ydl-muted">No members found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
