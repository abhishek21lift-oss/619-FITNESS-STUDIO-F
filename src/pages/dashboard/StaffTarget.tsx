import { motion } from 'framer-motion'
import { Target, TrendingUp, Edit3 } from 'lucide-react'

const targets = [
  { name: 'Riya Singh', type: 'Sales', target: '₹5,00,000', achieved: '₹3,96,000', pct: 79, trend: 'up' },
  { name: 'Awash Vikash', type: 'Sales', target: '₹4,00,000', achieved: '₹4,82,000', pct: 120, trend: 'up' },
  { name: 'Shivani Verma', type: 'Sales', target: '₹3,50,000', achieved: '₹3,12,000', pct: 89, trend: 'up' },
  { name: 'Abhishek Katiyar', type: 'Sales', target: '₹3,00,000', achieved: '₹2,54,000', pct: 85, trend: 'down' },
  { name: 'Rajat Katiyar', type: 'Sales', target: '₹2,50,000', achieved: '₹2,10,000', pct: 84, trend: 'up' },
  { name: 'Narayan Chandel', type: 'Sales', target: '₹2,00,000', achieved: '₹1,56,000', pct: 78, trend: 'down' },
]

export default function StaffTarget() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Staff Target</h1><p className="text-xs text-gray-500 mt-0.5">Set and track staff performance targets.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20"><Target className="w-3.5 h-3.5 text-ydl-yellow" /><span className="text-[10px] font-semibold text-ydl-yellow">This Month</span></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        {targets.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><Target className="w-4 h-4 text-ydl-yellow" /><span className="text-xs font-semibold text-white">{t.name}</span><span className="text-[10px] text-gray-500">({t.type})</span></div>
              <div className="flex items-center gap-2"><span className="text-[10px] text-gray-500">Target: <span className="text-gray-300">{t.target}</span></span><span className="text-[10px] font-medium text-ydl-yellow">Achieved: {t.achieved}</span><button className="p-1 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 className="w-3 h-3" /></button></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${t.pct >= 100 ? 'bg-gradient-to-r from-emerald-500/60 to-emerald-500/40' : 'bg-gradient-to-r from-ydl-yellow/60 to-ydl-yellow/40'}`} style={{ width: `${Math.min(t.pct, 100)}%` }} />
              </div>
              <span className={`text-[10px] font-bold ${t.pct >= 100 ? 'text-emerald-400' : 'text-ydl-yellow'}`}>{t.pct}%</span>
              {t.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> : <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function TrendingDown(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg> }
