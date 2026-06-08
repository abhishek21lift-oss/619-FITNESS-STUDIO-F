import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useToast } from '../components/ui/Toast'
import { StatsCardSkeleton } from '../components/ui/Skeleton'
import { membersApi } from '../api/members'
import { enquiriesApi } from '../api/enquiries'
import {
  Plus, Receipt, Phone, QrCode, UserPlus, CreditCard,
  Users, DollarSign, AlertTriangle, ArrowUpRight,
  X, ChevronDown,
} from 'lucide-react'

const quickActions = [
  { label: 'Add Enquiry', icon: Plus, path: '/dashboard/enquiry/add', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30', text: 'text-blue-400' },
  { label: 'Quick Billing', icon: CreditCard, path: '/dashboard/accounts/registers', color: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { label: 'Receipts', icon: Receipt, path: '/dashboard/accounts/registers', color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/30', text: 'text-purple-400' },
  { label: 'Quick Follow Up', icon: Phone, path: '/dashboard/followups', color: 'from-cyan-500/20 to-cyan-600/5', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { label: 'QR Codes & Links', icon: QrCode, path: '/dashboard/app-settings/actions', color: 'from-orange-500/20 to-orange-600/5', border: 'border-orange-500/30', text: 'text-orange-400' },
  { label: 'Add Quick Member', icon: UserPlus, path: '/dashboard/members/quick-add', color: 'from-pink-500/20 to-pink-600/5', border: 'border-pink-500/30', text: 'text-pink-400' },
]

const dateFilters = ['Today', 'Last 7 Days', 'Last 15 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Date']

const statsCards = [
  { label: "Today's Sale", value: '₹ 0', icon: DollarSign, color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30', text: 'text-blue-400', viewMore: '/dashboard/accounts/registers' },
  { label: 'Collected Payments', value: '₹ 0', icon: ArrowUpRight, color: 'from-green-500/20 to-green-600/5', border: 'border-green-500/30', text: 'text-green-400', viewMore: '/dashboard/analysis/collection' },
  { label: 'Pending Payments', value: '₹ 0', icon: AlertTriangle, color: 'from-red-500/20 to-red-600/5', border: 'border-red-500/30', text: 'text-red-400', viewMore: '/dashboard/members/database' },
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
  const navigate = useNavigate()
  const { toast } = useToast()
  const [bannerVisible, setBannerVisible] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Today')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        await membersApi.list({ limit: '1' })
      } catch {
        // API unavailable — using mock data fallback
      }
      try {
        await enquiriesApi.list({ limit: '1' })
      } catch {
        // API unavailable — using mock data fallback
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  const summaryRoutes: Record<string, string> = {
    'Follow-Ups': '/dashboard/followups',
    'Appointments': '/dashboard/appointments',
    'Classes': '/dashboard/batches/list',
    'Expired Subscriptions': '/dashboard/memberships/subscriptions',
    'Subscriptions About to Expire': '/dashboard/memberships/subscriptions',
    'Active PT Subscriptions': '/dashboard/memberships/subscriptions',
    'Expired PT Subscriptions': '/dashboard/memberships/subscriptions',
    'Pending Renewals': '/dashboard/memberships/subscriptions',
    'Client Birthdays': '/dashboard/members/birthday',
    'Client Anniversaries': '/dashboard/members/birthday',
  }

  if (loading) {
    return (
      <div className="p-4 lg:p-6 space-y-5">
        <StatsCardSkeleton count={3} />
        <StatsCardSkeleton count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="animate-pulse bg-white/5 rounded-lg h-8 w-16 mx-auto" />
                  <div className="animate-pulse bg-white/5 rounded-lg h-3 w-20 mx-auto mt-2" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="animate-pulse bg-white/5 rounded-lg h-8 w-12 mx-auto" />
                  <div className="animate-pulse bg-white/5 rounded-lg h-3 w-16 mx-auto mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
      <div className="p-3 rounded-xl bg-gradient-to-r from-ydl-yellow/10 via-amber-600/10 to-ydl-yellow/5 border border-ydl-yellow/20">
        <p className="text-xs font-medium text-ydl-yellow">
          🎉 Special Coupon Offers Available —{' '}
          <button onClick={() => navigate('/dashboard/memberships/coupon')} className="underline underline-offset-2 hover:text-ydl-yellow-light">Click here to activate</button>
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
            onClick={() => navigate(action.path)}
            className={`flex items-center gap-2 p-2.5 rounded-xl border ${action.border} bg-gradient-to-br ${action.color} hover:brightness-125 transition-all duration-200`}
          >
            <action.icon className={`w-4 h-4 ${action.text}`} />
            <span className="text-[10px] font-medium text-gray-300">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Branch Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-ydl-dark-border">
          <Users className="w-3.5 h-3.5 text-ydl-yellow" />
          <span className="text-xs font-medium text-white">619 FITNESS STUDIO (Kalyanpur)</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
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
                ? 'bg-ydl-yellow/10 border-ydl-yellow/30 text-ydl-yellow'
                : 'bg-white/5 border-ydl-dark-border text-gray-500 hover:text-gray-300 hover:border-gray-600'
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
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
                <p className={`text-lg font-bold mt-1 ${card.text}`}>{card.value}</p>
              </div>
              <card.icon className={`w-6 h-6 ${card.text} opacity-50`} />
            </div>
            <button onClick={() => navigate(card.viewMore)} className="inline-block mt-2 text-[10px] text-gray-500 hover:text-gray-300 underline underline-offset-2">
              View More
            </button>
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
            className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4"
          >
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{m.label}</p>
            <p className="text-lg font-bold text-white mt-1">{m.value}</p>
            <button onClick={() => navigate('/dashboard/members/database')} className="inline-block mt-2 text-[10px] text-gray-500 hover:text-gray-300 underline underline-offset-2">
              View More
            </button>
          </motion.div>
        ))}
      </div>

      {/* Client Stats + Enquiry Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4"
        >
          <div className="grid grid-cols-3 gap-4">
            {clientStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4"
        >
          <div className="grid grid-cols-4 gap-3">
            {enquiryStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
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
        className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-ydl-dark-border">
          <h2 className="text-xs font-semibold text-white">Summary.</h2>
        </div>
        <div className="divide-y divide-ydl-dark-border/50">
          {summaryRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.02] transition-colors">
              <span className="text-[11px] text-gray-400">{row.label}</span>
              {row.href ? (
                <button onClick={() => { const r = summaryRoutes[row.label]; if (r) navigate(r); else toast(`Navigating to ${row.label}...`, 'info'); }} className="text-[11px] font-medium text-ydl-yellow hover:text-ydl-yellow-light underline underline-offset-2">
                  {row.value}
                </button>
              ) : (
                <span className="text-[11px] font-medium text-gray-300">{row.value}</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <p className="text-[10px] text-gray-600">Copyrights &copy; 2026 YourDigitalLift.</p>
        <button onClick={() => window.open('https://anydesk.com', '_blank')} className="text-[10px] text-gray-600 hover:text-ydl-yellow transition-colors">
          Download Anydesk
        </button>
      </div>
    </div>
  )
}
