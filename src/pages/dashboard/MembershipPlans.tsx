import { motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'

const plans = [
  { name: 'Monthly Basic', price: '₹999', period: '/mo', features: ['Gym Access', ' cardio', 'Locker'], popular: false, color: 'from-blue-500/20 to-blue-600/5' },
  { name: 'Quarterly Pro', price: '₹2,499', period: '/3mo', features: ['Gym Access', 'Cardio + Weights', 'Locker + Towel', '1 PT Session/mo'], popular: true, color: 'from-ydl-yellow/20 to-amber-600/5' },
  { name: 'Annual Gold', price: '₹7,999', period: '/yr', features: ['Unlimited Access', 'All Equipment', 'Locker + Towel', '4 PT Sessions/mo', 'Diet Consultation'], popular: false, color: 'from-emerald-500/20 to-emerald-600/5' },
  { name: 'Annual Platinum', price: '₹14,999', period: '/yr', features: ['Everything in Gold', 'Personal Trainer', 'Custom Diet Plan', 'Priority Booking', 'Free Merch'], popular: false, color: 'from-purple-500/20 to-purple-600/5' },
]

export default function MembershipPlans() {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Membership Plans</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage subscription plans and pricing.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" /> Add Plan
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative rounded-xl border ${p.popular ? 'border-ydl-yellow/40' : 'border-ydl-dark-border'} bg-gradient-to-br ${p.color} p-5`}
          >
            {p.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[9px] font-bold text-black bg-ydl-gradient rounded-full">
                POPULAR
              </span>
            )}
            <h3 className="text-sm font-bold text-white">{p.name}</h3>
            <div className="mt-2">
              <span className="text-2xl font-bold text-white">{p.price}</span>
              <span className="text-xs text-gray-500">{p.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Check className="w-3 h-3 text-ydl-yellow" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
              Edit Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
