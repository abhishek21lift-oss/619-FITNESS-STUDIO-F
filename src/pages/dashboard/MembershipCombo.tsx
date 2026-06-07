import { motion } from 'framer-motion'
import { Plus, Check, Percent } from 'lucide-react'

const combos = [
  { name: 'Duo Membership', price: '₹1,499', original: '₹1,998', save: '25%', includes: ['2 Memberships', 'Full Gym Access', 'Locker'], active: true },
  { name: 'Family Pack', price: '₹2,999', original: '₹3,996', save: '25%', includes: ['4 Memberships', 'Full Gym Access', 'Locker + Towel', '1 PT Session/mo each'], active: true },
  { name: 'Student Combo', price: '₹599', original: '₹999', save: '40%', includes: ['Student ID Required', 'Gym Access', 'Cardio Only'], active: true },
  { name: 'PT + Diet Bundle', price: '₹2,999', original: '₹3,998', save: '25%', includes: ['8 PT Sessions', 'Custom Diet Plan', 'Monthly Consultation'], active: false },
]

export default function MembershipCombo() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Combo Offers</h1><p className="text-xs text-gray-500 mt-0.5">Bundle deals and special packages.</p></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-3.5 h-3.5" /> Add Combo</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {combos.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-white">{c.name}</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md"><Percent className="w-2.5 h-2.5" />Save {c.save}</span>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-ydl-yellow">{c.price}</span>
              <span className="text-xs text-gray-500 line-through ml-2">{c.original}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {c.includes.map(f => <li key={f} className="flex items-center gap-1.5 text-[10px] text-gray-400"><Check className="w-3 h-3 text-ydl-yellow" />{f}</li>)}
            </ul>
            <div className="mt-3 pt-3 border-t border-ydl-dark-border">
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${c.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{c.active ? 'Active' : 'Inactive'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
