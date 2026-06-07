import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Plus } from 'lucide-react'
import { api } from '../../api'

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/staff').then(setStaff).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Staff</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-ydl-gradient rounded-xl hover:shadow-ydl-gold-lg transition-all">
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ydl-dark-border">
          <table className="w-full text-sm">
            <thead className="bg-ydl-card-gradient">
              <tr className="text-ydl-muted text-left">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">Salary</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border">
              {staff.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 text-white font-medium">{s.name}</td>
                  <td className="p-3 text-ydl-muted">{s.role}</td>
                  <td className="p-3 text-ydl-muted">{s.email}</td>
                  <td className="p-3 text-ydl-muted">{s.phone}</td>
                  <td className="p-3 text-ydl-muted">₹{(s.salary || 0).toLocaleString()}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{s.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
