import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { api } from '../../api'

const statusColors: Record<string, string> = {
  New: 'bg-blue-500/20 text-[#007AFF]', Contacted: 'bg-yellow-500/20 text-yellow-400',
  Qualified: 'bg-purple-500/20 text-purple-400', Proposal: 'bg-orange-500/20 text-orange-400',
  Won: 'bg-green-500/20 text-green-400', Lost: 'bg-red-500/20 text-red-400',
}

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/leads').then(setLeads).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1C1C1E]">Leads</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-apple-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="text-apple-gray-400 text-left">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">Source</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Follow Up</th>
                <th className="p-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {leads.map((l, i) => (
                <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-apple-gray-100 transition-colors">
                  <td className="p-3 text-[#1C1C1E] font-medium">{l.name}</td>
                  <td className="p-3 text-apple-gray-400">{l.phone}</td>
                  <td className="p-3 text-apple-gray-400">{l.source}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[l.status] || ''}`}>{l.status}</span></td>
                  <td className="p-3 text-apple-gray-400">{l.followUp}</td>
                  <td className="p-3 text-apple-gray-400 max-w-[200px] truncate">{l.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
