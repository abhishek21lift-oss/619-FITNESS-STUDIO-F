import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { StatsCardSkeleton } from '../components/ui/Skeleton'
import { membersApi } from '../api/members'
import { enquiriesApi } from '../api/enquiries'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts'
import {
  Plus, Receipt, Phone, QrCode, UserPlus, CreditCard,
  Users, DollarSign, AlertTriangle,
  X, ChevronDown, TrendingUp, Target, Activity,
  BarChart3, PieChart as PieChartIcon, UserCheck,
  Award, Zap,
} from 'lucide-react'

const APPLE_BLUE = '#007AFF'
const APPLE_GREEN = '#34C759'
const APPLE_ORANGE = '#FF9500'
const APPLE_RED = '#FF3B30'
const APPLE_PURPLE = '#AF52DE'
const APPLE_PINK = '#FF2D55'
const APPLE_TEAL = '#5AC8FA'
const quickActions = [
  { label: 'Add Enquiry', icon: Plus, path: '/dashboard/enquiry/add', gradient: 'from-[#007AFF] to-[#5856D6]', shadow: 'rgba(0,122,255,0.4)' },
  { label: 'Quick Billing', icon: CreditCard, path: '/dashboard/accounts/registers', gradient: 'from-[#34C759] to-[#30B350]', shadow: 'rgba(52,199,89,0.4)' },
  { label: 'Receipts', icon: Receipt, path: '/dashboard/accounts/registers', gradient: 'from-[#AF52DE] to-[#8944C2]', shadow: 'rgba(175,82,222,0.4)' },
  { label: 'Quick Follow Up', icon: Phone, path: '/dashboard/followups', gradient: 'from-[#5AC8FA] to-[#4A9EDA]', shadow: 'rgba(90,200,250,0.4)' },
  { label: 'QR Codes', icon: QrCode, path: '/dashboard/app-settings/actions', gradient: 'from-[#FF9500] to-[#FF6B00]', shadow: 'rgba(255,149,0,0.4)' },
  { label: 'Quick Member', icon: UserPlus, path: '/dashboard/members/quick-add', gradient: 'from-[#FF2D55] to-[#D6244A]', shadow: 'rgba(255,45,85,0.4)' },
]

const dateFilters = ['Today', 'Last 7 Days', 'Last 15 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Date']

const ENQUIRY_COLORS = { New: '#007AFF', Contacted: '#FF9500', Visited: '#AF52DE', Converted: '#34C759', Lost: '#FF3B30' }
const GENDER_COLORS = { Male: '#007AFF', Female: '#FF2D55', Other: '#AF52DE' }
const REVENUE_COLORS = { Subscriptions: '#007AFF', PT: '#34C759', Store: '#FF9500', Other: '#AF52DE' }

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 1200
    const step = Math.max(1, Math.floor(value / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setDisplay(value); clearInterval(timer) }
      else setDisplay(start)
    }, 16)
    return () => clearInterval(timer)
  }, [value])
  return <>{display.toLocaleString()}{suffix}</>
}

const BOX_GRADIENTS = [
  'linear-gradient(135deg, #007AFF15, #5856D608)',
  'linear-gradient(135deg, #34C75915, #30B35008)',
  'linear-gradient(135deg, #FF950015, #FF6B0008)',
  'linear-gradient(135deg, #AF52DE15, #8944C208)',
  'linear-gradient(135deg, #FF2D5515, #D6244A08)',
  'linear-gradient(135deg, #5AC8FA15, #4A9EDA08)',
  'linear-gradient(135deg, #FF3B3015, #D6292908)',
]
const BOX_BORDERS = [
  '1px solid #007AFF30',
  '1px solid #34C75930',
  '1px solid #FF950030',
  '1px solid #AF52DE30',
  '1px solid #FF2D5530',
  '1px solid #5AC8FA30',
  '1px solid #FF3B3030',
]

function Doughnut3D({ data, colors, title, icon: Icon, centerLabel, boxIndex = 0 }: {
  data: { name: string; value: number }[]
  colors: Record<string, string>
  title: string
  icon: any
  centerLabel: string
  boxIndex?: number
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-4 shadow-apple-md hover:shadow-apple-lg transition-all duration-300 group"
      style={{ background: BOX_GRADIENTS[boxIndex % BOX_GRADIENTS.length], border: BOX_BORDERS[boxIndex % BOX_BORDERS.length] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-apple-blue" />
        <h3 className="text-xs font-semibold text-[#1C1C1E]">{title}</h3>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <defs>
              {Object.entries(colors).map(([key, color]) => [
                <filter key={`${key}-shadow`} id={`${key.replace(/\s/g, '')}-shadow`}>
                  <feDropShadow dx={0} dy={2} stdDeviation={4} floodColor={color} floodOpacity={0.3} />
                </filter>,
                <linearGradient key={`${key}-grad`} id={`${key.replace(/\s/g, '')}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                </linearGradient>
              ])}
            </defs>
            {data.map((entry, i) => {
              const colorKey = entry.name.replace(/\s/g, '')
              return (
                <Pie
                  key={entry.name}
                  data={[entry, { name: 'rest', value: Math.max(0, total - entry.value) }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50 + i * 6}
                  outerRadius={68 + i * 6}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  animationBegin={i * 200}
                  animationDuration={1000}
                  filter={`url(#${colorKey}-shadow)`}
                >
                  <Cell fill={`url(#${colorKey}-grad)`} />
                  <Cell fill="transparent" />
                </Pie>
              )
            })}
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid #E8E8ED',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
              formatter={(value: any, name: any) => [`${Number(value).toLocaleString()}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-lg font-bold text-[#1C1C1E]">{total.toLocaleString()}</p>
            <p className="text-[9px] text-apple-gray-400 uppercase tracking-wider">{centerLabel}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors[d.name] || APPLE_BLUE }}
            />
            <span className="text-[10px] text-apple-gray-500">{d.name}</span>
            <span className="text-[10px] font-semibold text-[#1C1C1E]">{d.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function StatCard({ label, value, icon: Icon, color, shadow, delay, subtitle }: {
  label: string; value: string | number; icon: any
  color: string; shadow: string; delay: number; subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl p-5 text-white"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`, boxShadow: `0 8px 32px ${shadow}` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">{label}</span>
          <Icon className="w-5 h-5 text-white/60" />
        </div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {subtitle && <p className="text-[10px] text-white/70 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  )
}

function ActivityBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-apple-gray-500">{label}</span>
        <span className="font-semibold text-[#1C1C1E]">{value}</span>
      </div>
      <div className="h-2 bg-apple-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [bannerVisible, setBannerVisible] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Today')
  const [loading, setLoading] = useState(true)
  const [membershipData, setMembershipData] = useState([
    { name: 'Total Clients', value: 991 },
    { name: 'Active Clients', value: 303 },
    { name: 'Inactive Clients', value: 615 },
  ])
  const [enquiryData, setEnquiryData] = useState([
    { name: 'New', value: 45 },
    { name: 'Contacted', value: 28 },
    { name: 'Visited', value: 15 },
    { name: 'Converted', value: 12 },
    { name: 'Lost', value: 8 },
  ])
  const [genderData] = useState([
    { name: 'Male', value: 520 },
    { name: 'Female', value: 380 },
    { name: 'Other', value: 91 },
  ])
  const [revenueData] = useState([
    { name: 'Subscriptions', value: 425000 },
    { name: 'PT', value: 185000 },
    { name: 'Store', value: 72000 },
    { name: 'Other', value: 34000 },
  ])
  const [weeklyCheckins] = useState([
    { label: 'Mon', value: 42, color: APPLE_BLUE },
    { label: 'Tue', value: 56, color: APPLE_GREEN },
    { label: 'Wed', value: 48, color: APPLE_ORANGE },
    { label: 'Thu', value: 63, color: APPLE_PURPLE },
    { label: 'Fri', value: 55, color: APPLE_PINK },
    { label: 'Sat', value: 38, color: APPLE_TEAL },
    { label: 'Sun', value: 12, color: APPLE_RED },
  ])

  useEffect(() => {
    async function fetchStats() {
      try {
        const m = await membersApi.list({ limit: '1000' }) as any
        if (m?.members) {
          const members = m.members
          const active = members.filter((m: any) => m.status === 'active').length
          const inactive = members.filter((m: any) => m.status === 'inactive').length
          setMembershipData([
            { name: 'Total Clients', value: members.length },
            { name: 'Active Clients', value: active },
            { name: 'Inactive Clients', value: inactive },
          ])
        }
      } catch {}
      try {
        const e = await enquiriesApi.list({ limit: '1000' }) as any
        if (e?.enquiries) {
          const enqs = e.enquiries
          const newE = enqs.filter((x: any) => x.status === 'new').length
          const contacted = enqs.filter((x: any) => x.status === 'contacted').length
          const visited = enqs.filter((x: any) => x.status === 'visited').length
          const converted = enqs.filter((x: any) => x.status === 'converted').length
          const lost = enqs.filter((x: any) => x.status === 'lost').length
          setEnquiryData([
            { name: 'New', value: newE || 45 },
            { name: 'Contacted', value: contacted || 28 },
            { name: 'Visited', value: visited || 15 },
            { name: 'Converted', value: converted || 12 },
            { name: 'Lost', value: lost || 8 },
          ])
        }
      } catch {}
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

  const summaryRows = [
    { label: 'Follow-Ups', value: 5 },
    { label: 'Appointments', value: 0 },
    { label: 'Classes', value: 0 },
    { label: 'Expired Subscriptions', value: 0 },
    { label: 'Subscriptions About to Expire', value: 27 },
    { label: 'Active PT Subscriptions', value: 0 },
    { label: 'Expired PT Subscriptions', value: 0 },
    { label: 'Pending Renewals', value: 0 },
    { label: 'Live App Installs', value: '9 (3%)' },
    { label: 'Client Birthdays', value: 0 },
    { label: 'Client Anniversaries', value: 6 },
  ]

  if (loading) {
    return (
      <div className="p-4 lg:p-6 space-y-5">
        <StatsCardSkeleton count={4} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-apple-gray-200 bg-white p-4">
              <div className="animate-pulse space-y-3">
                <div className="h-3 bg-apple-gray-100 rounded w-20" />
                <div className="h-8 bg-apple-gray-100 rounded w-16" />
              </div>
            </div>
          ))}
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
          className="flex items-start gap-3 p-3 rounded-2xl bg-[#34C759]/10 border border-[#34C759]/20 backdrop-blur-sm"
        >
          <div className="w-8 h-8 rounded-full bg-[#34C759]/20 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-[#34C759]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
              <span className="text-xs font-semibold text-[#34C759]">WhatsApp Connected</span>
            </div>
            <p className="text-[11px] text-[#34C759]/70">QR code scanned successfully. Messages will be delivered normally.</p>
          </div>
          <button onClick={() => setBannerVisible(false)} className="text-[#34C759]/50 hover:text-[#34C759]">
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Coupon Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 rounded-2xl bg-gradient-to-r from-[#007AFF] via-[#AF52DE] to-[#FF2D55] text-white shadow-apple-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">Special Offer</p>
            <p className="text-sm font-semibold mt-0.5">🎉 Special Coupon Offers Available</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/memberships/coupon')}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold rounded-xl transition-all"
          >
            Activate Now
          </button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.path)}
            className="relative overflow-hidden rounded-xl p-3 text-white text-left group"
            style={{
              background: `linear-gradient(135deg, ${action.gradient})`,
              boxShadow: `0 4px 16px ${action.shadow}`,
            }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <action.icon className="w-5 h-5 mb-2 text-white/80" />
              <p className="text-[11px] font-semibold leading-tight">{action.label}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Branch Selector + Date Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-apple-sm" style={{ background: 'linear-gradient(135deg, #007AFF12, #5856D608)', border: '1px solid #007AFF25' }}>
          <Users className="w-3.5 h-3.5 text-apple-blue" />
          <span className="text-xs font-medium text-[#1C1C1E]">619 FITNESS STUDIO (Kalyanpur)</span>
          <ChevronDown className="w-3 h-3 text-apple-gray-400" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {dateFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all shadow-sm ${
                activeFilter === f
                  ? 'text-white shadow-md'
                  : 'text-apple-gray-500 hover:text-[#1C1C1E]'
              }`}
              style={activeFilter === f
                ? { background: 'linear-gradient(135deg, #007AFF, #5856D6)', border: '1px solid transparent' }
                : { background: 'linear-gradient(135deg, #007AFF08, #5856D604)', border: '1px solid #007AFF20' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Stats Cards - Colorful Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Today's Sale"
          value="₹ 0"
          icon={TrendingUp}
          color="#007AFF"
          shadow="rgba(0,122,255,0.35)"
          delay={0.1}
          subtitle="+0% vs yesterday"
        />
        <StatCard
          label="Collected Payments"
          value="₹ 0"
          icon={DollarSign}
          color="#34C759"
          shadow="rgba(52,199,89,0.35)"
          delay={0.15}
          subtitle="This period"
        />
        <StatCard
          label="Pending Payments"
          value="₹ 0"
          icon={AlertTriangle}
          color="#FF9500"
          shadow="rgba(255,149,0,0.35)"
          delay={0.2}
          subtitle="Requires attention"
        />
      </div>

      {/* Counters Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Clients', value: 0, icon: UserCheck, color: APPLE_BLUE },
          { label: 'Renewals', value: 0, icon: RefreshCwIcon, color: APPLE_GREEN },
          { label: 'Upgrade', value: 0, icon: TrendingUp, color: APPLE_ORANGE },
          { label: 'Check-ins', value: 0, icon: Activity, color: APPLE_PURPLE },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className="rounded-2xl p-4 shadow-apple-sm hover:shadow-apple-md transition-all"
            style={{
              background: `linear-gradient(135deg, ${m.color}18, ${m.color}08)`,
              border: `1px solid ${m.color}30`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: m.color }}>{m.label}</span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${m.color}20` }}>
                <m.icon className="w-3.5 h-3.5" style={{ color: m.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-[#1C1C1E]"><CountUp value={m.value} /></p>
          </motion.div>
        ))}
      </div>

      {/* 3D Doughnut Charts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Doughnut3D
          data={membershipData}
          colors={{ 'Total Clients': APPLE_BLUE, 'Active Clients': APPLE_GREEN, 'Inactive Clients': APPLE_RED }}
          title="Membership Overview"
          icon={Users}
          centerLabel="Members"
          boxIndex={0}
        />
        <Doughnut3D
          data={enquiryData}
          colors={ENQUIRY_COLORS}
          title="Enquiry Funnel"
          icon={Target}
          centerLabel="Enquiries"
          boxIndex={1}
        />
        <Doughnut3D
          data={genderData}
          colors={GENDER_COLORS}
          title="Gender Distribution"
          icon={PieChartIcon}
          centerLabel="Clients"
          boxIndex={2}
        />
        <Doughnut3D
          data={revenueData}
          colors={REVENUE_COLORS}
          title="Revenue Breakdown"
          icon={BarChart3}
          centerLabel="Total ₹"
          boxIndex={3}
        />
      </div>

      {/* Weekly Activity */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-5 shadow-apple-sm"
        style={{ background: 'linear-gradient(135deg, #007AFF10, #5856D608)', border: '1px solid #007AFF25' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-apple-blue" />
            <h3 className="text-xs font-semibold text-[#1C1C1E]">Weekly Check-ins</h3>
          </div>
          <span className="text-[10px] text-apple-gray-400">This week</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weeklyCheckins.map((day, i) => (
            <motion.div
              key={day.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="flex-1 w-full flex flex-col justify-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.value / 63) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
                  className="w-full rounded-lg min-h-[4px]"
                  style={{
                    background: `linear-gradient(180deg, ${day.color}, ${day.color}88)`,
                    height: `${(day.value / 63) * 100}px`,
                    boxShadow: `0 2px 8px ${day.color}44`,
                  }}
                />
              </div>
              <span className="text-[10px] font-semibold text-[#1C1C1E]">{day.value}</span>
              <span className="text-[9px] text-apple-gray-400">{day.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activity Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl p-5 shadow-apple-sm"
          style={{ background: 'linear-gradient(135deg, #34C75912, #30B35008)', border: '1px solid #34C75925' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-apple-green" />
            <h3 className="text-xs font-semibold text-[#1C1C1E]">Performance Metrics</h3>
          </div>
          <div className="space-y-3">
            <ActivityBar label="Enquiry Conversion" value={68} max={100} color={APPLE_GREEN} />
            <ActivityBar label="Member Retention" value={82} max={100} color={APPLE_BLUE} />
            <ActivityBar label="Follow-up Rate" value={45} max={100} color={APPLE_ORANGE} />
            <ActivityBar label="Class Attendance" value={73} max={100} color={APPLE_PURPLE} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-5 shadow-apple-sm"
          style={{ background: 'linear-gradient(135deg, #AF52DE12, #8944C208)', border: '1px solid #AF52DE25' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-apple-purple" />
            <h3 className="text-xs font-semibold text-[#1C1C1E]">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Rahul S.', role: 'Sales', deals: 24, color: '#007AFF', pct: 100 },
              { name: 'Priya M.', role: 'Trainer', deals: 19, color: '#34C759', pct: 79 },
              { name: 'Amit K.', role: 'Sales', deals: 16, color: '#AF52DE', pct: 67 },
              { name: 'Neha G.', role: 'Support', deals: 12, color: '#FF9500', pct: 50 },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1C1C1E]">{p.name}</p>
                  <p className="text-[10px] text-apple-gray-400">{p.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#1C1C1E]">{p.deals}</p>
                  <p className="text-[10px] text-apple-gray-400">deals</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="rounded-2xl overflow-hidden shadow-apple-sm"
        style={{ background: 'linear-gradient(135deg, #FF950010, #FF6B0008)', border: '1px solid #FF950025' }}
      >
        <div className="px-5 py-3 flex items-center justify-between" style={{
          background: 'linear-gradient(135deg, #FF9500, #FF6B00)',
        }}>
          <h2 className="text-xs font-semibold text-white">Summary</h2>
          <span className="text-[10px] text-white/70">{summaryRows.length} items</span>
        </div>
        <div>
          {summaryRows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.02 }}
              className="flex items-center justify-between px-5 py-2.5 transition-colors"
              style={{
                background: i % 2 === 0 ? 'rgba(255,149,0,0.04)' : 'rgba(255,149,0,0.10)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{
                  backgroundColor: [APPLE_BLUE, APPLE_GREEN, APPLE_ORANGE, APPLE_RED, APPLE_PURPLE, APPLE_TEAL, APPLE_PINK][i % 7]
                }} />
                <span className="text-[11px] text-apple-gray-500">{row.label}</span>
              </div>
              {summaryRoutes[row.label] ? (
                <button
                  onClick={() => navigate(summaryRoutes[row.label])}
                  className="text-[11px] font-semibold text-apple-blue hover:text-apple-blue underline underline-offset-2"
                >
                  {row.value}
                </button>
              ) : (
                <span className="text-[11px] font-semibold text-[#1C1C1E]">{row.value}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <p className="text-[10px] text-apple-gray-400">Copyrights &copy; 2026 YourDigitalLift.</p>
        <button
          onClick={() => window.open('https://anydesk.com', '_blank')}
          className="text-[10px] text-apple-gray-400 hover:text-apple-blue transition-colors"
        >
          Download Anydesk
        </button>
      </div>
    </div>
  )
}

function RefreshCwIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}
