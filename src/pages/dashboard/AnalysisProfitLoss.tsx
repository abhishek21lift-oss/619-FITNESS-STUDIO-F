import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, DollarSign,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenueData = [185000, 210000, 178000, 245000, 232000, 198000]
const expenseData = [72000, 81000, 69000, 88000, 79000, 78000]
const maxVal = Math.max(...revenueData, ...expenseData, 1)

const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const yearOptions = ['2026', '2025', '2024']

export default function AnalysisProfitLoss() {
  const [selectedMonth, setSelectedMonth] = useState('June')
  const [selectedYear, setSelectedYear] = useState('2026')

  const totalRev = revenueData.reduce((a, b) => a + b, 0)
  const totalExp = expenseData.reduce((a, b) => a + b, 0)
  const netProfit = totalRev - totalExp
  const netColor = netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'

  const monthlyData = months.map((m, i) => ({
    month: m,
    revenue: revenueData[i],
    expense: expenseData[i],
    profit: revenueData[i] - expenseData[i],
  }))

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Profit & Loss</h1>
        <p className="text-xs text-gray-500 mt-0.5">Revenue vs expense analysis and net profit tracking.</p>
      </div>

      <FilterBar>
        <FilterField label="Month">
          <FilterSelect options={monthsFull} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} />
        </FilterField>
        <FilterField label="Year">
          <FilterSelect options={yearOptions} value={selectedYear} onChange={e => setSelectedYear(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Revenue" value={`₹ ${totalRev.toLocaleString()}`} icon={TrendingUp} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={0} />
        <StatsCard label="Total Expense" value={`₹ ${totalExp.toLocaleString()}`} icon={TrendingDown} color="from-red-500/20 to-red-600/5" border="border-red-500/30" text="text-red-400" index={1} />
        <StatsCard label="Net Profit" value={`₹ ${netProfit.toLocaleString()}`} icon={DollarSign} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text={netColor} index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Revenue vs Expense</h2>
        <div className="flex items-end gap-3 h-40">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-0.5">
                <div className="w-[35%] rounded-t-sm bg-emerald-500/60" style={{ height: `${(revenueData[i] / maxVal) * 130}px` }} title={`Revenue: ₹${revenueData[i].toLocaleString()}`} />
                <div className="w-[35%] rounded-t-sm bg-red-500/60" style={{ height: `${(expenseData[i] / maxVal) * 130}px` }} title={`Expense: ₹${expenseData[i].toLocaleString()}`} />
              </div>
              <span className="text-[9px] text-gray-500">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ydl-dark-border">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-emerald-500/60" /><span className="text-[10px] text-gray-400">Revenue</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-red-500/60" /><span className="text-[10px] text-gray-400">Expense</span></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="text-xs font-semibold text-white mb-3">Monthly Breakdown</h2>
        <Table
          columns={[
            { header: 'Month', accessor: r => r.month },
            { header: 'Revenue', accessor: r => <span className="text-emerald-400 font-medium">₹{r.revenue.toLocaleString()}</span> },
            { header: 'Expense', accessor: r => <span className="text-red-400">₹{r.expense.toLocaleString()}</span> },
            { header: 'Profit', accessor: r => (
              <span className={`font-medium ${r.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ₹{r.profit.toLocaleString()}
              </span>
            )},
            { header: 'Margin', accessor: r => {
              const margin = r.revenue > 0 ? Math.round((r.profit / r.revenue) * 100) : 0
              return <span className={margin >= 0 ? 'text-emerald-400' : 'text-red-400'}>{margin}%</span>
            }},
          ]}
          data={monthlyData}
          keyExtractor={r => r.month}
        />
      </motion.div>
    </div>
  )
}
