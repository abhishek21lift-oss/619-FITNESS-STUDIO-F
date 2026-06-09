import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Salad } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/shared/Table'

interface DietPlan {
  id: number
  planName: string
  clientName: string
  dietitian: string
  startDate: string
  endDate: string
  status: 'Active' | 'Completed' | 'Cancelled'
}

const initialPlans: DietPlan[] = [
  { id: 1, planName: 'Weight Loss Plan', clientName: 'Rahul Sharma', dietitian: 'Dr. Priya', startDate: '01 Jun 2026', endDate: '30 Aug 2026', status: 'Active' },
  { id: 2, planName: 'Muscle Gain Diet', clientName: 'Amit Verma', dietitian: 'Dr. Singh', startDate: '15 May 2026', endDate: '15 Jul 2026', status: 'Active' },
  { id: 3, planName: 'Keto Plan', clientName: 'Priya Singh', dietitian: 'Dr. Priya', startDate: '01 Apr 2026', endDate: '30 Jun 2026', status: 'Completed' },
  { id: 4, planName: 'Maintenance Diet', clientName: 'Neha Gupta', dietitian: 'Dr. Sharma', startDate: '10 Jun 2026', endDate: '10 Sep 2026', status: 'Active' },
  { id: 5, planName: 'Vegan Plan', clientName: 'Sneha Patel', dietitian: 'Dr. Singh', startDate: '01 May 2026', endDate: '01 Aug 2026', status: 'Cancelled' },
]

const statusColors: Record<string, string> = {
  Active: 'text-emerald-400 bg-emerald-500/10',
  Completed: 'text-blue-400 bg-blue-500/10',
  Cancelled: 'text-red-400 bg-red-500/10',
}

export default function AppSettingsDietPlans() {
  const navigate = useNavigate()
  const [plans] = useState<DietPlan[]>(initialPlans)
  const [search, setSearch] = useState('')

  const filtered = plans.filter(p => p.planName.toLowerCase().includes(search.toLowerCase()) || p.clientName.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Diet Plans</h1><p className="text-xs text-gray-500 mt-0.5">Manage client diet plans assigned by dietitians.</p></div>
        <button onClick={() => navigate('/dashboard/app-settings/diet-plans/create')} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Plan
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 max-w-xs">
        <Search className="w-3.5 h-3.5 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none w-full" placeholder="Search plans or clients..." />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Plan Name', accessor: (r: DietPlan) => <span className="text-white font-medium">{r.planName}</span> },
            { header: 'Client', accessor: (r: DietPlan) => <div className="flex items-center gap-2"><Salad className="w-3 h-3 text-ydl-yellow" /><span>{r.clientName}</span></div> },
            { header: 'Dietitian', accessor: (r: DietPlan) => <span>{r.dietitian}</span> },
            { header: 'Start Date', accessor: (r: DietPlan) => <span>{r.startDate}</span> },
            { header: 'End Date', accessor: (r: DietPlan) => <span>{r.endDate}</span> },
            { header: 'Status', accessor: (r: DietPlan) => <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${statusColors[r.status]}`}>{r.status}</span> },
          ]}
          data={filtered}
          keyExtractor={r => r.id}
        />
      </motion.div>
    </div>
  )
}
