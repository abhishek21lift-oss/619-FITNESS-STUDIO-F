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
      <h1 className="text-2xl font-bold text-[#1C1C1E]">Schedule</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-apple-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-apple-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="text-apple-gray-400 text-left">
                <th className="p-3 font-medium">Class</th>
                {days.map(d => <th key={d} className="p-3 font-medium text-center">{d}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {classes.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-apple-gray-100 transition-colors">
                  <td className="p-3 text-[#1C1C1E] font-medium">{c.name}<br /><span className="text-xs text-apple-gray-400">{c.time} &middot; {c.duration}min</span></td>
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
