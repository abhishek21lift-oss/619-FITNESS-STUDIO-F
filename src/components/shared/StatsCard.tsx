import { motion } from 'framer-motion'

interface StatsCardProps {
  label: string
  value: string | number
  icon?: any
  color?: string
  border?: string
  text?: string
  index?: number
  href?: string
}

export default function StatsCard({ label, value, icon: Icon, color = 'from-blue-500/20 to-blue-600/5', border = 'border-blue-500/30', text = 'text-blue-400', index = 0, href }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative overflow-hidden rounded-xl border ${border} bg-gradient-to-br ${color} p-4`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className={`text-lg font-bold mt-1 ${text}`}>{value}</p>
        </div>
        {Icon && <Icon className={`w-6 h-6 ${text} opacity-50`} />}
      </div>
      {href && (
        <a href={href} className="inline-block mt-2 text-[10px] text-gray-500 hover:text-gray-300 underline underline-offset-2">
          View More
        </a>
      )}
    </motion.div>
  )
}
