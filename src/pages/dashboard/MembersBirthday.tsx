import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cake, Gift, Send } from 'lucide-react'

const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const birthdays = [
  { name: 'Rahul Sharma', mobile: '+91 98765 43210', date: '15 Jun', plan: 'Annual Gold', year: 1994 },
  { name: 'Priya Singh', mobile: '+91 87654 32109', date: '22 Jul', plan: 'Monthly Basic', year: 1997 },
  { name: 'Amit Verma', mobile: '+91 76543 21098', date: '05 Aug', plan: 'Quarterly Pro', year: 1992 },
  { name: 'Sneha Patel', mobile: '+91 65432 10987', date: '10 Sep', plan: 'Annual Platinum', year: 1995 },
  { name: 'Neha Gupta', mobile: '+91 43210 98765', date: '18 Oct', plan: 'Annual Gold', year: 1999 },
  { name: 'Arun Kumar', mobile: '+91 32109 87654', date: '03 Nov', plan: 'Quarterly Pro', year: 1993 },
]

export default function MembersBirthday() {
  const [month, setMonth] = useState('All')

  const filtered = month === 'All' ? birthdays : birthdays.filter(b => b.date.toLowerCase().includes(month.slice(0, 3).toLowerCase()))

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Members Birthday</h1>
          <p className="text-xs text-gray-500 mt-0.5">Celebrate client birthdays.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20">
          <Cake className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-[10px] font-semibold text-ydl-yellow">0 Today</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select value={month} onChange={e => setMonth(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {months.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((b, i) => (
                <motion.tr key={b.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Cake className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-xs font-medium text-white">{b.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.mobile}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{b.plan}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
                        <Send className="w-3 h-3" /> Wish
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg transition-all"><Gift className="w-3.5 h-3.5" /></button>
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
