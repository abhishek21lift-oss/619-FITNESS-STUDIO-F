import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { api } from '../../api'

export default function TrainerSchedule() {
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/classes').then(setClasses).catch(() => {}).finally(() => setLoading(false)) }, [])

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Schedule</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ydl-dark-border">
          <table className="w-full text-sm">
            <thead className="bg-ydl-card-gradient">
              <tr className="text-ydl-muted text-left">
                <th className="p-3 font-medium">Class</th>
                {days.map(d => <th key={d} className="p-3 font-medium text-center">{d}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border">
              {classes.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 text-white font-medium">{c.name}<br /><span className="text-xs text-ydl-muted">{c.time} &middot; {c.duration}min</span></td>
                  {days.map(d => (
                    <td key={d} className="p-3 text-center">
                      {(c.days || []).includes(d) ? <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" /> : <span className="inline-block w-2.5 h-2.5 rounded-full bg-ydl-dark-border" />}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
