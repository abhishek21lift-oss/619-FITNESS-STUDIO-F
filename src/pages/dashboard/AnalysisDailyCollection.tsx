import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  IndianRupee, CreditCard, Smartphone,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const paymentMethods = ['All Methods', 'Cash', 'UPI', 'Card', 'Bank Transfer']

const dailyData = Array.from({ length: 10 }, (_, i) => {
  const date = new Date(2026, 5, i + 1)
  return {
    date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    cash: Math.round(5000 + Math.random() * 15000),
    upi: Math.round(8000 + Math.random() * 20000),
    card: Math.round(3000 + Math.random() * 10000),
    bankTransfer: Math.round(2000 + Math.random() * 8000),
  }
})

export default function AnalysisDailyCollection() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-10')
  const [method, setMethod] = useState('All Methods')

  const totalCash = dailyData.reduce((s, d) => s + d.cash, 0)
  const totalUPI = dailyData.reduce((s, d) => s + d.upi, 0)
  const totalCard = dailyData.reduce((s, d) => s + d.card, 0)
  const totalTransfer = dailyData.reduce((s, d) => s + d.bankTransfer, 0)
  const grandTotal = totalCash + totalUPI + totalCard + totalTransfer

  const chartData = dailyData.map(d => ({
    date: d.date,
    total: d.cash + d.upi + d.card + d.bankTransfer,
  }))

  const formatRupee = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Daily Collection</h1>
        <p className="text-xs text-gray-500 mt-0.5">Track daily revenue by payment method.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Payment Method">
          <FilterSelect options={paymentMethods} value={method} onChange={e => setMethod(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total Collection" value={formatRupee(grandTotal)} icon={IndianRupee} color="from-ydl-yellow/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-ydl-yellow" index={0} />
        <StatsCard label="Cash" value={formatRupee(totalCash)} icon={IndianRupee} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="UPI" value={formatRupee(totalUPI)} icon={Smartphone} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={2} />
        <StatsCard label="Card" value={formatRupee(totalCard)} icon={CreditCard} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
        <h2 className="text-xs font-semibold text-white mb-4">Daily Collection Trend</h2>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(212,175,52,0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#D4AF34' }} />
              <Bar dataKey="total" fill="#D4AF34" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Date', accessor: r => <span className="text-white font-medium">{r.date}</span> },
            { header: 'Cash', accessor: r => formatRupee(r.cash) },
            { header: 'UPI', accessor: r => formatRupee(r.upi) },
            { header: 'Card', accessor: r => formatRupee(r.card) },
            { header: 'Bank Transfer', accessor: r => formatRupee(r.bankTransfer) },
            { header: 'Total', accessor: r => <span className="text-ydl-yellow font-medium">{formatRupee(r.cash + r.upi + r.card + r.bankTransfer)}</span> },
          ]}
          data={dailyData}
          keyExtractor={r => r.date}
        />
      </motion.div>
    </div>
  )
}
