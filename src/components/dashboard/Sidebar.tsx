import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, CreditCard, QrCode, UserCog,
  BarChart3, CalendarDays, TrendingUp, ClipboardList,
  Settings, Dumbbell, X, PhoneCall, Megaphone, Store,
  Package, CalendarRange, Bell, Activity, Dumbbell as ExerciseIcon,
  Wrench, ClipboardCheck, UserMinus, FileText, ShoppingCart,
} from 'lucide-react'

const sections = [
  {
    label: 'MAIN',
    items: [
      { to: '/dashboard/overview', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/dashboard/members', icon: Users, label: 'Members' },
      { to: '/dashboard/expiry', icon: UserMinus, label: 'Expiry' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { to: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
      { to: '/dashboard/plans', icon: ClipboardList, label: 'Plans & Diet' },
    ],
  },
  {
    label: 'PEOPLE',
    items: [
      { to: '/dashboard/leads', icon: TrendingUp, label: 'Leads' },
      { to: '/dashboard/followups', icon: PhoneCall, label: 'Follow Ups' },
      { to: '/dashboard/staff', icon: UserCog, label: 'Staff' },
    ],
  },
  {
    label: 'SCHEDULE',
    items: [
      { to: '/dashboard/classes', icon: CalendarDays, label: 'Classes' },
      { to: '/dashboard/batches', icon: CalendarRange, label: 'Batches' },
      { to: '/dashboard/attendance', icon: QrCode, label: 'Attendance' },
      { to: '/dashboard/checkin', icon: ClipboardCheck, label: 'Quick Check-In' },
    ],
  },
  {
    label: 'COMMS',
    items: [
      { to: '/dashboard/announcements', icon: Megaphone, label: 'Announcements' },
      { to: '/dashboard/activity', icon: Activity, label: 'Activity Log' },
    ],
  },
  {
    label: 'STORE',
    items: [
      { to: '/dashboard/store', icon: Store, label: 'Store Items' },
    ],
  },
  {
    label: 'REPORTS',
    items: [
      { to: '/dashboard/reports', icon: FileText, label: 'Reports' },
      { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ],
  },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0A0A0A] border-r border-[#D4AF34]/10 
          flex flex-col transition-transform duration-300 
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#D4AF34]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF34] flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="font-heading text-sm font-bold text-white tracking-tight">YOUR DIGITAL</h1>
              <p className="text-[10px] font-accent text-[#D4AF34] tracking-widest -mt-0.5">LIFT</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4 scrollbar-thin">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="px-3 text-[10px] font-accent text-gray-600 tracking-wider mb-1">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
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
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#D4AF34]/10">
          <p className="text-[10px] text-gray-600 font-accent text-center">v2.0.0 &middot; YDL Admin</p>
        </div>
      </aside>
    </>
  )
}
