import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target, Edit3, MoreHorizontal, History, RotateCcw,
  DollarSign, Percent
} from 'lucide-react'
import Modal from '../../../components/shared/Modal'
import ActionMenu from '../../../components/shared/ActionMenu'
import StatsCard from '../../../components/shared/StatsCard'
import FilterBar from '../../../components/shared/FilterBar'
import { FilterField, FilterSelect } from '../../../components/shared/FilterBar'

const initialTargets = [
  { id: 1, name: 'Riya Singh', type: 'Sales', target: 500000, achieved: 396000, membersTarget: 20, membersAchieved: 16, month: 'June', year: 2026, incentive: '5% of achieved' },
  { id: 2, name: 'Awash Vikash', type: 'Sales', target: 400000, achieved: 482000, membersTarget: 15, membersAchieved: 18, month: 'June', year: 2026, incentive: '7% of achieved' },
  { id: 3, name: 'Shivani Verma', type: 'Sales', target: 350000, achieved: 312000, membersTarget: 12, membersAchieved: 10, month: 'June', year: 2026, incentive: '5% of achieved' },
  { id: 4, name: 'Abhishek Katiyar', type: 'Sales', target: 300000, achieved: 254000, membersTarget: 10, membersAchieved: 8, month: 'June', year: 2026, incentive: '5% of achieved' },
  { id: 5, name: 'Rajat Katiyar', type: 'Sales', target: 250000, achieved: 210000, membersTarget: 8, membersAchieved: 7, month: 'June', year: 2026, incentive: '4% of achieved' },
  { id: 6, name: 'Narayan Chandel', type: 'Sales', target: 200000, achieved: 156000, membersTarget: 6, membersAchieved: 5, month: 'June', year: 2026, incentive: '3% of achieved' },
]

const staffFilter = ['All Staff', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma', 'Rajesh Kumar', 'Sunita Devi']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = [2024, 2025, 2026, 2027]

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')

export default function StaffTarget() {
  const [targets, setTargets] = useState(initialTargets)
  const [tab, setTab] = useState<'Staff' | 'Trainer'>('Staff')
  const [staffFilt, setStaffFilt] = useState('All Staff')
  const [month, setMonth] = useState('June')
  const [year, setYear] = useState(2026)
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [setForm, setSetForm] = useState({ name: staffFilter[1], target: 100000, month: 'June', incentive: '5%' })
  const [editTargetVal, setEditTargetVal] = useState(0)

  const filtered = targets.filter(t => staffFilt === 'All Staff' || t.name === staffFilt)

  const totalTarget = filtered.reduce((s, t) => s + t.target, 0)
  const totalAchieved = filtered.reduce((s, t) => s + t.achieved, 0)
  const overallPct = totalTarget > 0 ? Math.round((totalAchieved / totalTarget) * 100) : 0

  const handleSetTarget = () => {
    const newTarget = {
      id: targets.length + 1,
      name: setForm.name,
      type: tab === 'Staff' ? 'Admin' : 'Sales',
      target: setForm.target,
      achieved: 0,
      membersTarget: 0,
      membersAchieved: 0,
      month: setForm.month,
      year: year,
      incentive: setForm.incentive,
    }
    setTargets([...targets, newTarget])
    setModal(null)
  }

  const handleEditTarget = (id: number) => {
    setTargets(prev => prev.map(t => t.id === id ? { ...t, target: editTargetVal } : t))
    setModal(null)
  }

  const handleReset = (id: number) => {
    setTargets(prev => prev.map(t => t.id === id ? { ...t, achieved: 0, membersAchieved: 0 } : t))
    setModal(null)
  }

  const pctColor = (p: number) => p >= 100 ? 'text-emerald-400' : p >= 80 ? 'text-apple-blue' : 'text-red-400'

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-[#1C1C1E]">Staff Target</h1>
          <p className="text-xs text-apple-gray-500 mt-0.5">Set and track staff/trainer monthly targets.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-apple-gray-200 bg-white/5 overflow-hidden">
            {(['Staff', 'Trainer'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-[10px] font-medium transition-colors ${tab === t ? 'bg-apple-blue/10 text-apple-blue' : 'text-apple-gray-500 hover:text-[#1C1C1E]'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatsCard label="Total Target" value={fmt(totalTarget)} icon={Target} color="from-[#007AFF]/10 to-[#007AFF]/5" border="border-[#007AFF]/20" text="text-[#007AFF]" />
        <StatsCard label="Total Achieved" value={fmt(totalAchieved)} icon={DollarSign} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Overall Achievement" value={`${overallPct}%`} icon={Percent} color="from-apple-blue/20 to-amber-600/5" border="border-ydl-yellow/30" text="text-apple-blue" />
      </div>

      <FilterBar>
        <FilterField label="Staff/Trainer">
          <FilterSelect options={staffFilter} value={staffFilt} onChange={(e: any) => setStaffFilt(e.target.value)} />
        </FilterField>
        <FilterField label="Month">
          <FilterSelect options={months} value={month} onChange={(e: any) => setMonth(e.target.value)} />
        </FilterField>
        <FilterField label="Year">
          <div className="flex gap-1">
            {years.map(y => (
              <button key={y} onClick={() => setYear(y)} className={`px-2 h-7 text-[10px] font-medium rounded-lg border transition-colors ${year === y ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-[#1C1C1E]'}`}>
                {y}
              </button>
            ))}
          </div>
        </FilterField>
        <button onClick={() => { setSetForm({ name: staffFilter[1], target: 100000, month: month, incentive: '5%' }); setModal({ type: 'set-target' }) }} className="h-7 px-3 text-[10px] font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90 transition-opacity">
          Set Target
        </button>
      </FilterBar>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Target (₹)</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Achieved (₹)</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Achievement %</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Members Target</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Members Achieved</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Bonus Elig.</th>
                <th className="text-right px-4 py-3 text-[10px] font-semibold text-apple-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200/50">
              {filtered.map((t, i) => {
                const pct = t.target > 0 ? Math.round((t.achieved / t.target) * 100) : 0
                const memberPct = t.membersTarget > 0 ? Math.round((t.membersAchieved / t.membersTarget) * 100) : 0
                const bonusEligible = pct >= 80 && memberPct >= 80
                return (
                  <motion.tr key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-apple-blue" />
                        <span className="text-xs font-medium text-[#1C1C1E]">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-[#1C1C1E]">{fmt(t.target)}</td>
                    <td className="px-4 py-3 text-xs font-medium text-apple-blue">{fmt(t.achieved)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[80px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${pct >= 100 ? 'bg-emerald-500/60' : 'bg-ydl-yellow/60'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className={`text-[10px] font-bold ${pctColor(pct)}`}>{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-apple-gray-400">{t.membersTarget}</td>
                    <td className="px-4 py-3 text-xs text-apple-gray-400">{t.membersAchieved}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${bonusEligible ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-apple-gray-500 bg-gray-500/10 border-gray-500/20'}`}>
                        {bonusEligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ActionMenu
                        label={<MoreHorizontal className="w-3.5 h-3.5" />}
                        actions={[
                          { label: 'Edit Target', icon: Edit3, onClick: () => { setEditTargetVal(t.target); setModal({ type: 'edit-target', data: t }) } },
                          { label: 'View History', icon: History, onClick: () => setModal({ type: 'history', data: t }) },
                          { label: 'Reset', icon: RotateCcw, color: 'text-red-400', onClick: () => setModal({ type: 'confirm-reset', data: t }) },
                        ]}
                      />
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-xs text-apple-gray-500">No targets found for this period.</div>}
      </motion.div>

      <Modal open={modal?.type === 'set-target'} onClose={() => setModal(null)} title="Set Target" size="md">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Staff/Trainer</label>
            <select value={setForm.name} onChange={e => setSetForm({ ...setForm, name: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {staffFilter.filter(s => s !== 'All Staff').map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Target Amount (₹)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-500" />
              <input type="number" value={setForm.target} onChange={e => setSetForm({ ...setForm, target: Number(e.target.value) })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Month</label>
            <select value={setForm.month} onChange={e => setSetForm({ ...setForm, month: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
              {months.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-apple-gray-500">Incentive</label>
            <input value={setForm.incentive} onChange={e => setSetForm({ ...setForm, incentive: e.target.value })} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="e.g. 5% of achieved" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleSetTarget} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Target className="w-3 h-3 inline mr-1" /> Set Target</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'edit-target'} onClose={() => setModal(null)} title={`Edit Target: ${modal?.data?.name || ''}`} size="sm">
        {modal?.data && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] text-apple-gray-500">Current Target: {fmt(modal.data.target)}</label>
              <input type="number" value={editTargetVal} onChange={e => setEditTargetVal(Number(e.target.value))} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => handleEditTarget(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90"><Edit3 className="w-3 h-3 inline mr-1" /> Update</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'history'} onClose={() => setModal(null)} title={`Target History: ${modal?.data?.name || ''}`} size="md">
        {modal?.data && (
          <div className="space-y-2">
            {[0, 1, 2].map(i => {
              const m = ['April', 'May', 'June'][i]
              const t = [400000, 450000, modal.data.target][i]
              const a = [320000, 380000, modal.data.achieved][i]
              return (
                <div key={m} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-apple-gray-200">
                  <div>
                    <span className="text-xs font-medium text-[#1C1C1E]">{m} 2026</span>
                    <p className="text-[10px] text-apple-gray-500">Target: {fmt(t)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-apple-blue">{fmt(a)}</span>
                    <p className="text-[10px] font-medium text-apple-gray-500">{t > 0 ? Math.round((a / t) * 100) : 0}% achieved</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Modal>

      <Modal open={modal?.type === 'confirm-reset'} onClose={() => setModal(null)} title="Reset Target" size="sm">
        {modal?.data && (
          <div>
            <p className="text-xs text-apple-gray-400">Reset achieved figures for <span className="text-apple-blue">{modal.data.name}</span>? This will set achieved to ₹0.</p>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => handleReset(modal.data.id)} className="px-4 py-2 text-xs font-semibold text-[#1C1C1E] bg-red-500 rounded-lg hover:bg-red-600 transition-colors"><RotateCcw className="w-3 h-3 inline mr-1" /> Reset</button>
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-apple-gray-400 bg-white/5 border border-apple-gray-200 rounded-lg hover:text-[#1C1C1E]">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

