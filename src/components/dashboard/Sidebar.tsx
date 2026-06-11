import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, PhoneCall, TrendingUp, CreditCard,
  CalendarRange, DollarSign, Bell,
  UserCog, Dumbbell, Settings, HelpCircle,
  ChevronDown, X,
  ClipboardCheck, Briefcase, Wallet, ShoppingCart,
  MessageSquare,
  Calendar, List, UserPlus, Database, Gift, Cake,
  GitBranch, BarChart3, LineChart, PieChart, Target,
  BookOpen, Tag, Layers, Clock, Award, FileText,
  PlusSquare, Grid, Video, Sun, AlertTriangle,
  Key, Image, Link2, Activity, Zap, Users2,
  Mail,
} from 'lucide-react'

interface MenuItem {
  label: string
  icon: any
  to?: string
  children?: { label: string; to: string; icon?: any }[]
}

const navData: { label: string; items: MenuItem[] }[] = [
  { label: 'MAIN', items: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  ]},
  { label: 'ENQUIRY', items: [
    { label: 'Enquiry', icon: PhoneCall, children: [
      { label: 'Add Enquiry', to: '/dashboard/enquiry/add', icon: PlusSquare },
      { label: 'Enquiry List', to: '/dashboard/enquiry/list', icon: List },
    ]},
  ]},
  { label: 'TRACKING', items: [
    { label: 'Follow Ups', icon: Bell, to: '/dashboard/followups' },
  ]},
  { label: 'MEMBERS', items: [
    { label: 'Members', icon: Users, children: [
      { label: 'Add Member', to: '/dashboard/members/add', icon: UserPlus },
      { label: 'Add Quick Member', to: '/dashboard/members/quick-add', icon: Zap },
      { label: 'Client Database', to: '/dashboard/members/database', icon: Database },
      { label: 'Client Referrals', to: '/dashboard/members/referrals', icon: Gift },
      { label: 'Members Birthday', to: '/dashboard/members/birthday', icon: Cake },
      { label: 'Other Branch', to: '/dashboard/members/other-branch', icon: GitBranch },
    ]},
  ]},
  { label: 'ANALYSIS', items: [
    { label: 'Analysis', icon: TrendingUp, children: [
      { label: 'Traffic Analysis', to: '/dashboard/analysis/traffic', icon: BarChart3 },
      { label: 'Members Analysis', to: '/dashboard/analysis/members', icon: Users2 },
      { label: 'Collection Analysis', to: '/dashboard/analysis/collection', icon: DollarSign },
      { label: 'Subscriptions Analysis', to: '/dashboard/analysis/subscriptions', icon: CreditCard },
      { label: 'Renewal Analysis', to: '/dashboard/analysis/renewal', icon: RefreshIcon },
      { label: 'Follow up Analysis', to: '/dashboard/analysis/followup', icon: PhoneCall },
      { label: 'Conversion Analysis', to: '/dashboard/analysis/conversion', icon: Target },
      { label: 'Enquiry Analysis', to: '/dashboard/analysis/enquiry', icon: PieChart },
      { label: 'Expense Analysis', to: '/dashboard/analysis/expense', icon: DollarSign },
      { label: 'Profit & Loss', to: '/dashboard/analysis/profit-loss', icon: LineChart },
      { label: 'Billing Analysis', to: '/dashboard/analysis/billing', icon: FileText },
      { label: 'Sales Leaderboard', to: '/dashboard/analysis/sales-leaderboard', icon: Award },
      { label: 'Revenue Forecast', to: '/dashboard/analysis/revenue-forecast', icon: TrendingUp },
      { label: 'Lead Source Analysis', to: '/dashboard/analysis/lead-source', icon: Target },
    ]},
  ]},
  { label: 'MEMBERSHIPS', items: [
    { label: 'Memberships', icon: CreditCard, children: [
      { label: 'Membership Plans', to: '/dashboard/memberships/plans', icon: BookOpen },
      { label: 'Subscriptions', to: '/dashboard/memberships/subscriptions', icon: Layers },
      { label: 'Coupon', to: '/dashboard/memberships/coupon', icon: Tag },
      { label: 'Combo Offer', to: '/dashboard/memberships/combo', icon: Gift },
    ]},
  ]},
  { label: 'SCHEDULE', items: [
    { label: 'Batches & Classes', icon: CalendarRange, children: [
      { label: 'Add Batch', to: '/dashboard/batches/add', icon: PlusSquare },
      { label: 'Batch List', to: '/dashboard/batches/list', icon: List },
      { label: 'Class Bookings', to: '/dashboard/batches/bookings', icon: Calendar },
      { label: 'Classes Calendar', to: '/dashboard/batches/calendar', icon: Calendar },
      { label: 'Program', to: '/dashboard/batches/program', icon: Grid },
    ]},
  ]},
  { label: 'ACCOUNTS', items: [
    { label: 'Accounts', icon: DollarSign, children: [
      { label: 'Account Registers', to: '/dashboard/accounts/registers', icon: FileText },
      { label: 'Payroll', to: '/dashboard/accounts/payroll', icon: Users },
      { label: 'Expense', to: '/dashboard/accounts/expense', icon: CreditCard },
    ]},
  ]},
  { label: 'COMMUNICATION', items: [
    { label: 'Notification & WhatsApp', icon: MessageSquare, children: [
      { label: 'Notification', to: '/dashboard/notifications', icon: Bell },
      { label: 'WhatsApp', to: '/dashboard/notifications/whatsapp', icon: MessageSquare },
      { label: 'SMS', to: '/dashboard/notifications/sms', icon: Mail },
      { label: 'Email', to: '/dashboard/notifications/email', icon: Mail },
    ]},
  ]},
  { label: 'TRAINERS', items: [
    { label: 'Trainers', icon: Dumbbell, children: [
      { label: 'Add Trainer', to: '/dashboard/trainers/add', icon: UserPlus },
      { label: 'My Trainers', to: '/dashboard/trainers/list', icon: Users },
      { label: 'Transformations', to: '/dashboard/trainers/transformations', icon: Activity },
      { label: 'Leave Requests', to: '/dashboard/trainers/leave', icon: Clock },
    ]},
  ]},
  { label: 'SETTINGS', items: [
    { label: 'Fitness Center', icon: Briefcase, children: [
      { label: 'My Fitness Centers', to: '/dashboard/settings/fitness-centers', icon: Briefcase },
      { label: 'Fitness Settings', to: '/dashboard/settings/fitness-settings', icon: Settings },
      { label: 'Biometric', to: '/dashboard/settings/biometric', icon: Key },
      { label: 'Equipment', to: '/dashboard/settings/equipment', icon: Dumbbell },
      { label: 'Notices & Rules', to: '/dashboard/settings/notices', icon: AlertTriangle },
      { label: 'Holiday', to: '/dashboard/settings/holiday', icon: Sun },
      { label: 'Feedback', to: '/dashboard/settings/feedback', icon: MessageSquare },
    ]},
    { label: 'Staff', icon: UserCog, children: [
      { label: 'Add Staff', to: '/dashboard/staff/add', icon: UserPlus },
      { label: 'Staff List', to: '/dashboard/staff/list', icon: Users },
      { label: 'Access Control', to: '/dashboard/staff/access', icon: Key },
      { label: 'Staff Target', to: '/dashboard/staff/target', icon: Target },
    ]},
    { label: 'Attendance', icon: ClipboardCheck, children: [
      { label: 'Staff Attendance', to: '/dashboard/attendance/staff', icon: Users },
      { label: 'Client Attendance', to: '/dashboard/attendance/client', icon: Users2 },
      { label: 'Check-ins Leaderboard', to: '/dashboard/attendance/leaderboard', icon: Award },
    ]},
    { label: 'App Settings', icon: Settings, children: [
      { label: 'Permissions', to: '/dashboard/app-settings/permissions', icon: Key },
      { label: 'Services List', to: '/dashboard/app-settings/services', icon: List },
      { label: 'Gallery', to: '/dashboard/app-settings/gallery', icon: Image },
      { label: 'Action Items', to: '/dashboard/app-settings/actions', icon: Zap },
      { label: 'Banner', to: '/dashboard/app-settings/banner', icon: Image },
      { label: 'Social & QR', to: '/dashboard/app-settings/social', icon: Link2 },
      { label: 'Measurements', to: '/dashboard/app-settings/measurements', icon: Activity },
      { label: 'Workouts & Diet', to: '/dashboard/app-settings/workouts', icon: Dumbbell },
      { label: 'Community', to: '/dashboard/app-settings/community', icon: Users },
      { label: 'Challenges', to: '/dashboard/app-settings/challenges', icon: Award },
    ]},
    { label: 'Tutorial & Help', icon: HelpCircle, children: [
      { label: 'Tutorial Videos', to: '/dashboard/tutorial/videos', icon: Video },
      { label: 'Admin FAQ', to: '/dashboard/tutorial/faq', icon: HelpCircle },
    ]},
  ]},
  { label: 'MORE', items: [
    { label: 'Appointments', icon: Calendar, to: '/dashboard/appointments' },
    { label: 'Wallet', icon: Wallet, to: '/dashboard/wallet' },
    { label: 'E-commerce', icon: ShoppingCart, to: '/dashboard/ecommerce' },
  ]},
]

function RefreshIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> }

function NavItem({ item, depth = 0, onClose }: { item: MenuItem; depth?: number; onClose: () => void }) {
  const loc = useLocation()
  const hasChildren = item.children && item.children.length > 0
  const childActive = hasChildren && item.children!.some((c) => loc.pathname === c.to || loc.pathname.startsWith(c.to + '/'))
  const [open, setOpen] = useState(childActive)

  if (!hasChildren && item.to) {
    return (
      <NavLink
        to={item.to}
        end
        onClick={onClose}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-accent font-medium transition-all duration-200 
          ${isActive
            ? 'bg-apple-blue/10 text-[#007AFF] border border-[#007AFF]/20'
            : 'text-apple-gray-400 hover:text-[#1C1C1E] hover:bg-apple-gray-100 border border-transparent'
          }`
        }
      >
        <item.icon className="w-4 h-4 shrink-0" />
        {item.label}
      </NavLink>
    )
  }

  if (depth === 0) {
    const isOpen = open || childActive
    return (
      <div>
        <button
          onClick={() => setOpen(!isOpen)}
          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-accent font-medium transition-all duration-200 ${
            childActive ? 'text-[#007AFF] bg-apple-blue/5' : 'text-apple-gray-400 hover:text-[#1C1C1E] hover:bg-apple-gray-100'
          }`}
        >
          <span className="flex items-center gap-3">
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-0.5 space-y-0.5 border-l border-apple-blue/10 pl-2">
                {item.children!.map((child) => (
                  <NavLink
                    key={child.label}
                    to={child.to}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-accent transition-all duration-200
                      ${isActive
                        ? 'bg-apple-blue/10 text-[#007AFF]'
                        : 'text-apple-gray-500 hover:text-apple-gray-600 hover:bg-apple-gray-100'
                      }`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return null
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-[#F5F5F7]/60 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#F5F5F7] border-r border-apple-blue/10 
          flex flex-col transition-transform duration-300 
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-apple-blue/10">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="619 FITNESS STUDIO" className="h-8 w-auto" />
            <div>
              <h1 className="font-heading text-xs font-bold text-[#1C1C1E] tracking-tight">619</h1>
              <p className="text-[9px] font-accent text-[#007AFF] tracking-widest -mt-0.5">FITNESS STUDIO</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-apple-gray-400 hover:text-[#1C1C1E]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-2.5 space-y-3 scrollbar-thin">
          {navData.map((section) => (
            <div key={section.label}>
              <p className="px-3 text-[9px] font-accent text-apple-gray-400 tracking-wider mb-1 uppercase">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItem key={item.label} item={item} onClose={onClose} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-apple-blue/10">
          <p className="text-[9px] text-apple-gray-400 font-accent text-center">v2.0.0 &middot; 619 Admin</p>
        </div>
      </aside>
    </>
  )
}
