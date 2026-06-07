import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [480000, 510000, 495000, 528000, 541800, 556000]
const expenses = [320000, 335000, 310000, 345000, 358000, 362000]
const profit = revenue.map((r, i) => r - expenses[i])

const totalRevenue = revenue.reduce((a, b) => a + b, 0)
const totalExpenses = expenses.reduce((a, b) => a + b, 0)
const totalProfit = totalRevenue - totalExpenses

export default function AnalysisProfitLoss() {
  const maxVal = Math.max(...revenue)
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Profit & Loss</h1>
        <p className="text-xs text-gray-500 mt-0.5">Financial performance overview.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-start justify-between"><div><p className="text-[10px] font-medium text-emerald-400 uppercase">Total Revenue</p><p className="text-lg font-bold text-emerald-400 mt-1">₹ {totalRevenue.toLocaleString()}</p></div><ArrowUpRight className="w-5 h-5 text-emerald-500" /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-start justify-between"><div><p className="text-[10px] font-medium text-red-400 uppercase">Total Expenses</p><p className="text-lg font-bold text-red-400 mt-1">₹ {totalExpenses.toLocaleString()}</p></div><ArrowDownRight className="w-5 h-5 text-red-500" /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-ydl-yellow/20 bg-ydl-yellow/5 p-4">
          <div className="flex items-start justify-between"><div><p className="text-[10px] font-medium text-ydl-yellow uppercase">Net Profit</p><p className="text-lg font-bold text-ydl-yellow mt-1">₹ {totalProfit.toLocaleString()}</p></div><TrendingUp className="w-5 h-5 text-ydl-yellow" /></div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Monthly P&L Trend</h2>
        <div className="flex items-end gap-3 h-44">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center justify-end gap-0.5">
              <span className={`text-[8px] font-medium ${profit[i] >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>₹{(profit[i]/1000).toFixed(0)}k</span>
              <div className="w-full flex items-end justify-center gap-0.5">
                <div className="w-[35%] rounded-t-sm bg-emerald-500/50" title={`Revenue: ₹${revenue[i]}`} style={{ height: `${(revenue[i] / maxVal) * 100}px` }} />
                <div className="w-[35%] rounded-t-sm bg-red-500/50" title={`Expenses: ₹${expenses[i]}`} style={{ height: `${(expenses[i] / maxVal) * 100}px` }} />
              </div>
              <span className="text-[9px] text-gray-500 mt-1">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ydl-dark-border">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-emerald-500/50" /><span className="text-[10px] text-gray-400">Revenue</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-red-500/50" /><span className="text-[10px] text-gray-400">Expenses</span></div>
        </div>
      </motion.div>
    </div>
  )
}
