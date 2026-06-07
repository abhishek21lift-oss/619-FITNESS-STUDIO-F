import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, PhoneCall, TrendingUp, CreditCard,
  CalendarRange, DollarSign, Bell,
  UserCog, Dumbbell, Settings, HelpCircle,
  ChevronDown, X,
  ClipboardCheck, Briefcase, Wallet, ShoppingCart,
  MessageSquare, Calendar, UserMinus, Activity,
  ClipboardList, QrCode, Megaphone, Store, FileText,
} from 'lucide-react'

interface SectionItem {
  label: string
  icon: any
  to?: string
  children?: { label: string; to: string }[]
}

const navData: { label: string; items: SectionItem[] }[] = [
  {
    label: 'MAIN',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard/overview' },
    ],
  },
  {
    label: 'ENQUIRY',
    items: [
      { label: 'Enquiry', icon: PhoneCall, children: [
        { label: 'Add Enquiry', to: '/dashboard/leads' },
        { label: 'Enquiry List', to: '/dashboard/leads' },
      ]},
    ],
  },
  {
    label: 'TRACKING',
    items: [
      { label: 'Follow Ups', icon: Bell, to: '/dashboard/followups' },
    ],
  },
  {
    label: 'MEMBERS',
    items: [
      { label: 'Members', icon: Users, children: [
        { label: 'Add Member', to: '/dashboard/members' },
        { label: 'My Members', to: '/dashboard/members' },
        { label: 'Expiry', to: '/dashboard/expiry' },
        { label: 'Client Database', to: '/dashboard/members' },
        { label: 'Client Referrals', to: '/dashboard/members' },
        { label: 'Members Birthday', to: '/dashboard/members' },
      ]},
    ],
  },
  {
    label: 'ANALYSIS',
    items: [
      { label: 'Analysis', icon: TrendingUp, children: [
        { label: 'Traffic Analysis', to: '/dashboard/reports' },
        { label: 'Members Analysis', to: '/dashboard/reports' },
        { label: 'Collection Analysis', to: '/dashboard/reports' },
        { label: 'Revenue Forecast', to: '/dashboard/reports' },
      ]},
    ],
  },
  {
    label: 'MEMBERSHIPS',
    items: [
      { label: 'Memberships', icon: CreditCard, children: [
        { label: 'Membership Plans', to: '/dashboard/plans' },
        { label: 'Subscriptions', to: '/dashboard/billing' },
      ]},
    ],
  },
  {
    label: 'SCHEDULE',
    items: [
      { label: 'Batches & Classes', icon: CalendarRange, children: [
        { label: 'Add Batch', to: '/dashboard/batches' },
        { label: 'Batch List', to: '/dashboard/batches' },
        { label: 'Class Bookings', to: '/dashboard/classes' },
        { label: 'Classes Calendar', to: '/dashboard/classes' },
      ]},
    ],
  },
  {
    label: 'ACCOUNTS',
    items: [
      { label: 'Accounts', icon: DollarSign, children: [
        { label: 'Billing', to: '/dashboard/billing' },
        { label: 'Quick Check-In', to: '/dashboard/checkin' },
      ]},
    ],
  },
  {
    label: 'COMMUNICATION',
    items: [
      { label: 'Notification & WhatsApp', icon: MessageSquare, children: [
        { label: 'Announcements', to: '/dashboard/announcements' },
        { label: 'Activity Log', to: '/dashboard/activity' },
      ]},
    ],
  },
  {
    label: 'TRAINERS',
    items: [
      { label: 'Trainers', icon: Dumbbell, children: [
        { label: 'Add Trainer', to: '/dashboard/staff' },
        { label: 'My Trainers', to: '/dashboard/staff' },
        { label: 'Staff', to: '/dashboard/staff' },
      ]},
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { label: 'Fitness Center', icon: Briefcase, children: [
        { label: 'Settings', to: '/dashboard/settings' },
        { label: 'Store Items', to: '/dashboard/store' },
      ]},
      { label: 'Staff', icon: UserCog, children: [
        { label: 'Staff List', to: '/dashboard/staff' },
        { label: 'Attendance', to: '/dashboard/attendance' },
      ]},
      { label: 'Attendance Reports', icon: ClipboardCheck, children: [
        { label: 'Staff & Trainer Attendance', to: '/dashboard/attendance' },
        { label: 'Client Attendance', to: '/dashboard/attendance' },
      ]},
      { label: 'App Settings', icon: Settings, children: [
        { label: 'Reports', to: '/dashboard/reports' },
      ]},
      { label: 'Tutorial & Help', icon: HelpCircle, children: [
        { label: 'Tutorial Videos', to: '#' },
        { label: 'Admin FAQ', to: '#' },
      ]},
    ],
  },
  {
    label: 'MORE',
    items: [
      { label: 'Reports', icon: FileText, to: '/dashboard/reports' },
      { label: 'Store', icon: ShoppingCart, to: '/dashboard/store' },
    ],
  },
]

function NavItem({ item, depth = 0, onClose }: { item: SectionItem; depth?: number; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (item.to && !hasChildren) {
    return (
      <NavLink
        to={item.to}
        onClick={onClose}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-accent font-medium transition-all duration-200 
          ${isActive
            ? 'bg-[#D4AF34]/10 text-[#D4AF34] border border-[#D4AF34]/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`
        }
      >
        <item.icon className="w-4 h-4 shrink-0" />
        {item.label}
      </NavLink>
    )
  }

  if (depth === 0) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-accent font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <span className="flex items-center gap-3">
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#D4AF34]/10 pl-2">
                {item.children!.map((child) => (
                  <NavLink
                    key={child.label}
                    to={child.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-accent transition-all duration-200
                      ${isActive
                        ? 'bg-[#D4AF34]/10 text-[#D4AF34]'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
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
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0A0A0A] border-r border-[#D4AF34]/10 
          flex flex-col transition-transform duration-300 
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#D4AF34]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF34] flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-black" />
            </div>
            <div>
              <h1 className="font-heading text-xs font-bold text-white tracking-tight">YOUR DIGITAL</h1>
              <p className="text-[9px] font-accent text-[#D4AF34] tracking-widest -mt-0.5">LIFT</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-2.5 space-y-3 scrollbar-thin">
          {navData.map((section) => (
            <div key={section.label}>
              <p className="px-3 text-[9px] font-accent text-gray-600 tracking-wider mb-1 uppercase">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavItem key={item.label} item={item} onClose={onClose} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-[#D4AF34]/10">
          <p className="text-[9px] text-gray-600 font-accent text-center">v2.0.0 &middot; YDL Admin</p>
        </div>
      </aside>
    </>
  )
}
