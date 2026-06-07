import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Check } from 'lucide-react'
import { api } from '../../api'

export default function Plans() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api('/plans').then(setPlans).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Membership Plans</h1>
      {loading ? (
        <div className="flex items-center gap-2 text-ydl-muted"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {plans.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border ${p.popular ? 'border-ydl-yellow bg-ydl-yellow/5' : 'border-ydl-dark-border bg-ydl-card-gradient'} p-5`}>
              {p.popular && <span className="absolute -top-2.5 right-4 px-3 py-0.5 text-xs font-bold text-black bg-ydl-gradient rounded-full">Popular</span>}
              <h3 className="text-white font-bold text-lg">{p.name}</h3>
              <p className="text-2xl font-bold text-ydl-yellow mt-2">₹{p.price?.toLocaleString()}<span className="text-sm text-ydl-muted font-normal">/{p.duration}</span></p>
              <p className="text-sm text-ydl-muted mt-2">{p.description}</p>
              <ul className="mt-4 space-y-2">
                {(p.features || []).map((f: string) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ydl-muted"><Check className="w-3.5 h-3.5 text-green-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
