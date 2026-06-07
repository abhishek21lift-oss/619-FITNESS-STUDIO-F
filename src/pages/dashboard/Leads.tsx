import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { api } from '../../api'

const statusColors: Record<string, string> = {
  New: 'bg-blue-500/20 text-blue-400', Contacted: 'bg-yellow-500/20 text-yellow-400',
  Qualified: 'bg-purple-500/20 text-purple-400', Proposal: 'bg-orange-500/20 text-orange-400',
  Won: 'bg-green-500/20 text-green-400', Lost: 'bg-red-500/20 text-red-400',
}

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/leads').then(setLeads).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Leads</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ydl-dark-border">
          <table className="w-full text-sm">
            <thead className="bg-ydl-card-gradient">
              <tr className="text-ydl-muted text-left">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">Source</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Follow Up</th>
                <th className="p-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border">
              {leads.map((l, i) => (
                <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 text-white font-medium">{l.name}</td>
                  <td className="p-3 text-ydl-muted">{l.phone}</td>
                  <td className="p-3 text-ydl-muted">{l.source}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[l.status] || ''}`}>{l.status}</span></td>
                  <td className="p-3 text-ydl-muted">{l.followUp}</td>
                  <td className="p-3 text-ydl-muted max-w-[200px] truncate">{l.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
