import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare, UserCheck, Percent, Download,
} from 'lucide-react'
import StatsCard from '../../components/shared/StatsCard'
import Table from '../../components/shared/Table'
import FilterBar, { FilterField, FilterSelect } from '../../components/shared/FilterBar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'

const staffOptions = ['All Staff', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel']

const staffData = [
  { name: 'Awash Vikash', enquiries: 45, converted: 18, rate: 40 },
  { name: 'Riya Singh', enquiries: 38, converted: 16, rate: 42.1 },
  { name: 'Abhishek Katiyar', enquiries: 52, converted: 22, rate: 42.3 },
  { name: 'Rajat Katiyar', enquiries: 41, converted: 14, rate: 34.1 },
  { name: 'Narayan Chandel', enquiries: 33, converted: 12, rate: 36.4 },
]

const pieData = [
  { name: 'Converted', value: 82, color: '#34D399' },
  { name: 'Not Converted', value: 127, color: '#F87171' },
]

export default function AnalysisEnquiryConversion() {
  const [from, setFrom] = useState('2026-06-01')
  const [to, setTo] = useState('2026-06-30')
  const [staff, setStaff] = useState('All Staff')

  const totalEnquiries = staffData.reduce((s, d) => s + d.enquiries, 0)
  const totalConverted = staffData.reduce((s, d) => s + d.converted, 0)
  const overallRate = totalEnquiries > 0 ? ((totalConverted / totalEnquiries) * 100).toFixed(1) : '0'

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Enquiry Conversion</h1>
        <p className="text-xs text-gray-500 mt-0.5">Analyse enquiry-to-member conversion rates.</p>
      </div>

      <FilterBar>
        <FilterField label="From">
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="To">
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white focus:outline-none focus:border-ydl-yellow/30" />
        </FilterField>
        <FilterField label="Staff Member">
          <FilterSelect options={staffOptions} value={staff} onChange={e => setStaff(e.target.value)} />
        </FilterField>
      </FilterBar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Enquiries" value={totalEnquiries} icon={MessageSquare} color="from-ydl-yellow/20 to-ydl-yellow/5" border="border-ydl-yellow/30" text="text-ydl-yellow" index={0} />
        <StatsCard label="Converted" value={totalConverted} icon={UserCheck} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" index={1} />
        <StatsCard label="Conversion Rate" value={`${overallRate}%`} icon={Percent} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Conversion Overview</h2>
          <div className="h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={4}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(212,175,52,0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-xs font-semibold text-white mb-4">Staff Conversion Rates</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={staffData} margin={{ left: -10, right: 0, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(212,175,52,0.3)', borderRadius: 8, fontSize: 11, color: '#fff' }} labelStyle={{ color: '#D4AF34' }} />
                <Bar dataKey="rate" fill="#D4AF34" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Table
          columns={[
            { header: 'Staff Name', accessor: r => <span className="text-white font-medium">{r.name}</span> },
            { header: 'Enquiries', accessor: r => r.enquiries },
            { header: 'Converted', accessor: r => <span className="text-emerald-400 font-medium">{r.converted}</span> },
            { header: 'Conversion Rate', accessor: r => <span className="text-ydl-yellow font-medium">{r.rate}%</span> },
          ]}
          data={staffData}
          keyExtractor={r => r.name}
        />
      </motion.div>
    </div>
  )
}
