import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Receipt, Phone, QrCode, UserPlus, CreditCard,
  Users, DollarSign, AlertTriangle, ArrowUpRight,
  X, ChevronDown,
} from 'lucide-react'

const quickActions = [
  { label: 'Add Enquiry', icon: Plus, color: 'from-[#007AFF]/10 to-[#007AFF]/5', border: 'border-[#007AFF]/20', text: 'text-[#007AFF]' },
  { label: 'Quick Billing', icon: CreditCard, color: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { label: 'Receipts', icon: Receipt, color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/30', text: 'text-purple-400' },
  { label: 'Quick Follow Up', icon: Phone, color: 'from-cyan-500/20 to-cyan-600/5', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { label: 'QR Codes & Links', icon: QrCode, color: 'from-orange-500/20 to-orange-600/5', border: 'border-orange-500/30', text: 'text-orange-400' },
  { label: 'Add Quick Member', icon: UserPlus, color: 'from-pink-500/20 to-pink-600/5', border: 'border-pink-500/30', text: 'text-pink-400' },
]

const dateFilters = ['Today', 'Last 7 Days', 'Last 15 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Date']

const statsCards = [
  { label: "Today's Sale", value: '₹ 0', icon: DollarSign, color: 'from-[#007AFF]/10 to-[#007AFF]/5', border: 'border-[#007AFF]/20', text: 'text-[#007AFF]' },
  { label: 'Collected Payments', value: '₹ 0', icon: ArrowUpRight, color: 'from-green-500/20 to-green-600/5', border: 'border-green-500/30', text: 'text-green-400' },
  { label: 'Pending Payments', value: '₹ 0', icon: AlertTriangle, color: 'from-red-500/20 to-red-600/5', border: 'border-red-500/30', text: 'text-red-400' },
]

const metrics = [
  { label: 'New Clients', value: 0 },
  { label: 'Renewals', value: 0 },
  { label: 'Upgrade', value: 0 },
  { label: 'Check-ins', value: 0 },
]

const clientStats = [
  { label: 'Total Clients', value: 991 },
  { label: 'Active Clients', value: 303 },
  { label: 'Inactive Clients', value: 615 },
]

const enquiryStats = [
  { label: 'Total Enquiries', value: 0 },
  { label: 'Open Enquiries', value: 0 },
  { label: 'Converted Enquiries', value: 0 },
  { label: 'Lost Enquiries', value: 0 },
]

const summaryRows = [
  { label: 'Follow-Ups', value: 5, href: '#' },
  { label: 'Appointments', value: 0, href: '#' },
  { label: 'Classes', value: 0, href: '#' },
  { label: 'Expired Subscriptions', value: 0, href: '#' },
  { label: 'Subscriptions About to Expire', value: 27, href: '#' },
  { label: 'Active PT Subscriptions', value: 0, href: '#' },
  { label: 'Expired PT Subscriptions', value: 0, href: '#' },
  { label: 'Pending Renewals', value: 0, href: '#' },
  { label: 'Live App Installs', value: '9 (3%)', href: undefined },
  { label: 'Client Birthdays', value: 0, href: '#' },
  { label: 'Client Anniversaries', value: 6, href: '#' },
]

export default function Dashboard() {
  const [bannerVisible, setBannerVisible] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Today')

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* WhatsApp Alert Banner */}
      {bannerVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400">WhatsApp connected.</span>
            </div>
            <p className="text-[11px] text-emerald-300/70">
              QR code scanned successfully. Messages will be delivered normally.
            </p>
          </div>
          <button onClick={() => setBannerVisible(false)} className="text-emerald-400/50 hover:text-emerald-400">
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Coupon Banner */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-apple-blue/10 via-amber-600/10 to-ydl-yellow/5 border border-ydl-yellow/20">
        <p className="text-xs font-medium text-apple-blue">
          🎉 Special Coupon Offers Available —{' '}
          <a href="#" className="underline underline-offset-2 hover:text-apple-blue-light">Click here to activate</a>
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {quickActions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-2 p-2.5 rounded-xl border ${action.border} bg-gradient-to-br ${action.color} hover:brightness-125 transition-all duration-200`}
          >
            <action.icon className={`w-4 h-4 ${action.text}`} />
            <span className="text-[10px] font-medium text-apple-gray-600">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Branch Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-apple-gray-200">
          <Users className="w-3.5 h-3.5 text-apple-blue" />
          <span className="text-xs font-medium text-[#1C1C1E]">619 FITNESS STUDIO (Kalyanpur)</span>
          <ChevronDown className="w-3 h-3 text-apple-gray-500" />
        </div>
      </div>

      {/* Date Filters */}
      <div className="flex flex-wrap gap-1.5">
        {dateFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 text-[10px] font-medium rounded-lg border transition-all ${
              activeFilter === f
                ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue'
                : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600 hover:border-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Stats Row 1 - Financial */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-xl border ${card.border} bg-gradient-to-br ${card.color} p-4`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">{card.label}</p>
                <p className={`text-lg font-bold mt-1 ${card.text}`}>{card.value}</p>
              </div>
              <card.icon className={`w-6 h-6 ${card.text} opacity-50`} />
            </div>
            <a href="#" className="inline-block mt-2 text-[10px] text-apple-gray-500 hover:text-apple-gray-600 underline underline-offset-2">
              View More
            </a>
          </motion.div>
        ))}
      </div>

      {/* Stats Row 2 - Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4"
          >
            <p className="text-[10px] font-medium text-apple-gray-500 uppercase tracking-wider">{m.label}</p>
            <p className="text-lg font-bold text-[#1C1C1E] mt-1">{m.value}</p>
            <a href="#" className="inline-block mt-2 text-[10px] text-apple-gray-500 hover:text-apple-gray-600 underline underline-offset-2">
              View More
            </a>
          </motion.div>
        ))}
      </div>

      {/* Client Stats + Enquiry Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4"
        >
          <div className="grid grid-cols-3 gap-4">
            {clientStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-[#1C1C1E]">{s.value}</p>
                <p className="text-[10px] text-apple-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-4"
        >
          <div className="grid grid-cols-4 gap-3">
            {enquiryStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-[#1C1C1E]">{s.value}</p>
                <p className="text-[10px] text-apple-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-apple-gray-200 bg-white/[0.02] overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-apple-gray-200">
          <h2 className="text-xs font-semibold text-[#1C1C1E]">Summary.</h2>
        </div>
        <div className="divide-y divide-apple-gray-200/50">
          {summaryRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.02] transition-colors">
              <span className="text-[11px] text-apple-gray-400">{row.label}</span>
              {row.href ? (
                <a href={row.href} className="text-[11px] font-medium text-apple-blue hover:text-apple-blue-light underline underline-offset-2">
                  {row.value}
                </a>
              ) : (
                <span className="text-[11px] font-medium text-apple-gray-600">{row.value}</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <p className="text-[10px] text-apple-gray-400">Copyrights &copy; 2026 YourDigitalLift.</p>
        <a href="#" className="text-[10px] text-apple-gray-400 hover:text-apple-blue transition-colors">
          Download Anydesk
        </a>
      </div>
    </div>
  )
}
