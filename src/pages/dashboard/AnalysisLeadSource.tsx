import { motion } from 'framer-motion'
import { Target, TrendingUp, Globe, Camera, MessageSquare, Phone, Users } from 'lucide-react'

const stats = [
  { label: 'Total Leads', value: '1,376', change: '+6.8%', icon: Users },
  { label: 'Cost per Lead', value: '₹ 124', change: '-8.2%', icon: DollarIcon },
  { label: 'Best Source', value: 'Walk-in', change: '30% share', icon: Target },
]

const sources = [
  { name: 'Walk-in', leads: 420, converted: 189, cost: '₹ 0', roi: '∞', trend: 'up', icon: Users },
  { name: 'Instagram', leads: 312, converted: 98, cost: '₹ 12,480', roi: '312%', trend: 'up', icon: Camera },
  { name: 'Facebook', leads: 198, converted: 52, cost: '₹ 9,900', roi: '184%', trend: 'down', icon: MessageSquare },
  { name: 'Google', leads: 167, converted: 61, cost: '₹ 16,700', roi: '245%', trend: 'up', icon: Globe },
  { name: 'Friend Referral', leads: 145, converted: 78, cost: '₹ 3,625', roi: '520%', trend: 'up', icon: MessageSquare },
  { name: 'Phone Call', leads: 98, converted: 28, cost: '₹ 4,900', roi: '112%', trend: 'down', icon: Phone },
]

function DollarIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> }

export default function AnalysisLeadSource() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Lead Source Analysis</h1>
        <p className="text-xs text-gray-500 mt-0.5">Which channels bring the best leads.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-[10px] font-medium text-gray-500 uppercase">{s.label}</p><p className="text-lg font-bold text-white mt-1">{s.value}</p></div>
              <s.icon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-[10px] font-medium text-emerald-400">↑ {s.change}</span>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-ydl-dark-border bg-white/[0.03]"><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Source</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Leads</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Converted</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Cost</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">ROI</th><th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Trend</th></tr></thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {sources.map(s => (
                <tr key={s.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><s.icon className="w-3.5 h-3.5 text-gray-500" /><span className="text-xs text-gray-300">{s.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.leads}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.converted}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.cost}</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-medium text-ydl-yellow">{s.roi}</span></td>
                  <td className="px-4 py-3">{s.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> : <TrendingDown2 className="w-3.5 h-3.5 text-red-400" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

function TrendingDown2(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg> }
