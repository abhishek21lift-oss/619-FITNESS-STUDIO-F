import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Phone, MessageSquare, Bell, Edit3, Trash2,
  Calendar, MapPin, CreditCard, User, Mail, Hash,
  CheckCircle, XCircle, AlertTriangle, Clock, DollarSign,
  Activity, Award, Target, Users,
} from 'lucide-react'
import { membersApi } from '../../api/members'
import { useToast } from '../../components/ui/Toast'

const ACTIVE_COLORS = ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5AC8FA']

const mockMembers = Array.from({ length: 991 }, (_, i) => ({
  id: `MEM-${String(i + 1).padStart(4, '0')}`,
  name: ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Sneha Patel', 'Vikram Yadav', 'Neha Gupta', 'Arun Kumar', 'Pooja Jain', 'Rohan Mehra', 'Ananya Kapoor', 'Karan Malhotra', 'Isha Saxena', 'Manish Tiwari', 'Divya Choudhary', 'Siddharth Pandey', 'Nisha Agarwal', 'Ravi Verma', 'Kavita Singh', 'Dinesh Yadav', 'Meera Joshi', 'Harsh Tiwari', 'Anjali Sharma', 'Saurabh Gupta', 'Pallavi Jain', 'Vivek Saxena'][i % 25],
  mobile: `+91 ${String(90000 + i).slice(0, 5)} ${String(10000 + i).slice(0, 5)}`,
  email: `client${i + 1}@email.com`,
  branch: ['Kalyanpur', 'Gomti Nagar', 'Indira Nagar'][i % 3],
  plan: ['Annual Gold', 'Monthly Basic', 'Quarterly Pro', 'Annual Platinum', 'Monthly Pro', 'Quarterly Basic', 'Annual Basic', 'Monthly Platinum', 'PT Session'][i % 9],
  status: ['Active', 'Active', 'Active', 'Inactive', 'Inactive', 'Expired', 'Freeze'][i % 7],
  joinDate: new Date(2025, i % 12, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  expiry: new Date(2026, (i % 12) + 6, (i % 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  gender: ['Male', 'Female', 'Other'][i % 3],
  clientRep: ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Narayan Chandel', 'Shivani Verma'][i % 6],
  amount: 999 + (i % 5) * 500,
}))

function statusStyles(status: string) {
  const map: Record<string, { label: string; bg: string; text: string; icon: any }> = {
    Active: { label: 'Active', bg: 'rgba(52,199,89,0.15)', text: '#34C759', icon: CheckCircle },
    Inactive: { label: 'Inactive', bg: 'rgba(255,149,0,0.15)', text: '#FF9500', icon: AlertTriangle },
    Expired: { label: 'Expired', bg: 'rgba(255,59,48,0.15)', text: '#FF3B30', icon: XCircle },
    Freeze: { label: 'Freeze', bg: 'rgba(0,122,255,0.15)', text: '#007AFF', icon: Clock },
  }
  return map[status] || map.Inactive
}

export default function ClientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    async function fetch() {
      try {
        const m = mockMembers.find(x => x.id === id)
        if (m) {
          setMember(m)
          setForm(m)
        }
      } catch {} finally { setLoading(false) }
    }
    fetch()
  }, [id])

  const colorIdx = member ? member.name.length % ACTIVE_COLORS.length : 0
  const accent = ACTIVE_COLORS[colorIdx]
  const initials = member ? member.name.split(' ').map((n: string) => n[0]).join('') : ''

  const handleSave = () => {
    setMember(form)
    setEditing(false)
    toast('Profile updated successfully', 'success')
  }

  if (loading) {
    return (
      <div className="p-4 lg:p-6 space-y-5">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-gray-200 rounded-lg" />
          <div className="h-48 bg-gray-200 rounded-2xl" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="p-4 lg:p-6">
        <button onClick={() => navigate('/dashboard/members/database')} className="flex items-center gap-1.5 text-xs text-apple-blue hover:underline mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Database
        </button>
        <div className="text-center py-16">
          <User className="w-12 h-12 text-apple-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-apple-gray-500">Member not found</p>
          <p className="text-xs text-apple-gray-400 mt-1">No member exists with ID: {id}</p>
        </div>
      </div>
    )
  }

  const st = statusStyles(member.status)
  const StatIcon = st.icon

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-4xl mx-auto">
      {/* Back + Actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/dashboard/members/database')} className="flex items-center gap-1.5 text-xs font-semibold text-apple-blue hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Database
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setEditing(!editing)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
            <Edit3 className="w-3 h-3" /> {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 shadow-apple-md relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${accent}18, ${accent}08)`, border: `1px solid ${accent}25` }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${accent}, transparent)`, }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg shrink-0"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)`, boxShadow: `0 8px 24px ${accent}40` }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="text-lg font-bold text-[#1C1C1E] bg-white/50 border border-apple-gray-200 rounded-lg px-3 py-1 w-full max-w-xs focus:outline-none" />
            ) : (
              <h1 className="text-lg font-bold text-[#1C1C1E]">{member.name}</h1>
            )}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-apple-gray-500 font-medium">{member.id}</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: st.bg, color: st.text }}>
                <StatIcon className="w-3 h-3" /> {st.label}
              </span>
            </div>
          </div>
          {/* Quick stat pill */}
          <div className="flex items-center gap-3 text-center shrink-0">
            <div className="px-4 py-2 rounded-xl" style={{ background: `${accent}12` }}>
              <p className="text-lg font-bold text-[#1C1C1E]">₹{member.amount}</p>
              <p className="text-[10px] text-apple-gray-500 font-semibold">Plan Value</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-2 rounded-2xl p-5 shadow-apple-sm"
          style={{ background: 'linear-gradient(135deg, #007AFF08, #5856D604)', border: '1px solid #007AFF20' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-apple-blue" />
            <h3 className="text-xs font-bold text-[#1C1C1E]">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
            {[
              { label: 'Name', icon: User, value: editing ? form.name : member.name, key: 'name', editable: true },
              { label: 'Mobile', icon: Phone, value: editing ? form.mobile : member.mobile, key: 'mobile', editable: true },
              { label: 'Email', icon: Mail, value: editing ? form.email : member.email, key: 'email', editable: true },
              { label: 'Gender', icon: Users, value: editing ? form.gender : member.gender, key: 'gender', editable: true, options: ['Male', 'Female', 'Other'] },
              { label: 'Branch', icon: MapPin, value: editing ? form.branch : member.branch, key: 'branch', editable: true, options: ['Kalyanpur', 'Gomti Nagar', 'Indira Nagar'] },
              { label: 'Member ID', icon: Hash, value: member.id, key: 'id', editable: false },
            ].map((field) => (
              <div key={field.key}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <field.icon className="w-3 h-3 text-apple-gray-500" />
                  <span className="text-[10px] font-semibold text-apple-gray-500 uppercase">{field.label}</span>
                </div>
                {editing && field.editable ? (
                  field.options ? (
                    <select value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full text-xs bg-white/50 border border-apple-gray-200 rounded-lg px-2.5 py-1.5 text-[#1C1C1E] focus:outline-none">
                      {field.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full text-xs bg-white/50 border border-apple-gray-200 rounded-lg px-2.5 py-1.5 text-[#1C1C1E] focus:outline-none" />
                  )
                ) : (
                  <span className="text-xs font-semibold text-[#1C1C1E] capitalize">{field.value?.toLowerCase()}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subscription Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 shadow-apple-sm"
          style={{ background: 'linear-gradient(135deg, #34C75908, #30B35004)', border: '1px solid #34C75920' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-apple-green" />
            <h3 className="text-xs font-bold text-[#1C1C1E]">Subscription</h3>
          </div>
          <div className="space-y-3.5">
            {[
              { label: 'Plan', value: member.plan, icon: Award },
              { label: 'Join Date', value: member.joinDate, icon: Calendar },
              { label: 'Expiry', value: member.expiry, icon: Clock },
              { label: 'Client Rep', value: member.clientRep, icon: Target },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <f.icon className="w-3 h-3 text-apple-gray-500" />
                  <span className="text-[10px] font-semibold text-apple-gray-500 uppercase">{f.label}</span>
                </div>
                <span className="text-xs font-semibold text-[#1C1C1E]">{f.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap items-center gap-2.5"
      >
        {editing && (
          <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-md"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)`, boxShadow: `0 4px 16px ${accent}40` }}>
            <CheckCircle className="w-3.5 h-3.5" /> Save Changes
          </button>
        )}
        <button onClick={() => window.open(`tel:${member.mobile}`)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl"
          style={{ background: 'rgba(52,199,89,0.12)', color: '#34C759', border: '1px solid rgba(52,199,89,0.25)' }}>
          <Phone className="w-3.5 h-3.5" /> Call
        </button>
        <button onClick={() => toast(`WhatsApp opening for ${member.name}...`, 'info')} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl"
          style={{ background: 'rgba(0,122,255,0.12)', color: '#007AFF', border: '1px solid rgba(0,122,255,0.25)' }}>
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
        </button>
        <button onClick={() => toast(`Notification sent to ${member.name}`, 'success')} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl"
          style={{ background: 'rgba(175,82,222,0.12)', color: '#AF52DE', border: '1px solid rgba(175,82,222,0.25)' }}>
          <Bell className="w-3.5 h-3.5" /> Notify
        </button>
        <button onClick={() => { toast(`Member ${member.name} deleted`, 'error'); navigate('/dashboard/members/database') }} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl"
          style={{ background: 'rgba(255,59,48,0.12)', color: '#FF3B30', border: '1px solid rgba(255,59,48,0.25)' }}>
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: 'Total Paid', value: `₹${member.amount}`, icon: DollarSign, color: '#007AFF' },
          { label: 'Days Remaining', value: '124', icon: Clock, color: '#34C759' },
          { label: 'Check-ins', value: '48', icon: Activity, color: '#FF9500' },
          { label: 'Referrals', value: '3', icon: Users, color: '#AF52DE' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3.5 text-center"
            style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
            <s.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: s.color }} />
            <p className="text-sm font-bold text-[#1C1C1E]">{s.value}</p>
            <p className="text-[10px] font-semibold text-apple-gray-500">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
