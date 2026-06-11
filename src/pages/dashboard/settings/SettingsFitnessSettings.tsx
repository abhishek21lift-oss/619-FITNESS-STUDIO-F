import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, DollarSign, Save, MapPin, Phone, Globe, CreditCard, Landmark, ToggleLeft, Calendar } from 'lucide-react'

type Tab = 'General' | 'Timings' | 'Membership' | 'Payment'

export default function SettingsFitnessSettings() {
  const [tab, setTab] = useState<Tab>('General')
  const [saved, setSaved] = useState(false)

  const [gymName, setGymName] = useState('619 Fitness Studio')
  const [address, setAddress] = useState('S-21, Kalyanpur, Lucknow')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [email, setEmail] = useState('info@619fitness.com')
  const [gst, setGst] = useState('09ABCDE1234F1Z5')
  const [website, setWebsite] = useState('https://619fitness.com')

  const [openTime, setOpenTime] = useState('05:00')
  const [closeTime, setCloseTime] = useState('22:00')
  const [weekendOpen, setWeekendOpen] = useState('06:00')
  const [weekendClose, setWeekendClose] = useState('20:00')
  const [maxCapacity, setMaxCapacity] = useState('80')

  const [defaultPlan, setDefaultPlan] = useState('Monthly Unlimited')
  const [freezeDays, setFreezeDays] = useState('30')
  const [noticePeriod, setNoticePeriod] = useState('7')
  const [allowLateFee, setAllowLateFee] = useState(true)

  const [upiId, setUpiId] = useState('619fitness@paytm')
  const [bankName, setBankName] = useState('HDFC Bank')
  const [accountNo, setAccountNo] = useState('XXXXXX1234')
  const [ifsc, setIfsc] = useState('HDFC0001234')
  const [enablePayment, setEnablePayment] = useState(true)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs: Tab[] = ['General', 'Timings', 'Membership', 'Payment']

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div><h1 className="text-lg font-bold text-[#1C1C1E]">Fitness Settings</h1><p className="text-xs text-apple-gray-500 mt-0.5">Global settings for your fitness center.</p></div>

      <div className="flex gap-1.5">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-[10px] font-medium rounded-lg border transition-all ${tab === t ? 'bg-apple-blue/10 border-ydl-yellow/30 text-apple-blue' : 'bg-white/5 border-apple-gray-200 text-apple-gray-500 hover:text-apple-gray-600'}`}>{t}</button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-apple-gray-200 bg-white/[0.02] p-5 max-w-2xl">
        {tab === 'General' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> Gym Name</label>
              <input value={gymName} onChange={e => setGymName(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Address</label>
              <input value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400"><Phone className="w-3 h-3 inline mr-1" />Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400"><MailIcon className="w-3 h-3 inline mr-1" />Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">GST No.</label>
                <input value={gst} onChange={e => setGst(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400"><Globe className="w-3 h-3 inline mr-1" />Website</label>
                <input value={website} onChange={e => setWebsite(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
            </div>
          </div>
        )}

        {tab === 'Timings' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400"><Clock className="w-3 h-3 inline mr-1" />Opening Time (Weekdays)</label>
                <input type="time" value={openTime} onChange={e => setOpenTime(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400"><Clock className="w-3 h-3 inline mr-1" />Closing Time (Weekdays)</label>
                <input type="time" value={closeTime} onChange={e => setCloseTime(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400"><Calendar className="w-3 h-3 inline mr-1" />Weekend Opening</label>
                <input type="time" value={weekendOpen} onChange={e => setWeekendOpen(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400"><Calendar className="w-3 h-3 inline mr-1" />Weekend Closing</label>
                <input type="time" value={weekendClose} onChange={e => setWeekendClose(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40 [color-scheme:dark]" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400"><Users className="w-3 h-3 inline mr-1" />Max Capacity</label>
              <input type="number" value={maxCapacity} onChange={e => setMaxCapacity(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
        )}

        {tab === 'Membership' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400">Default Plan</label>
              <select value={defaultPlan} onChange={e => setDefaultPlan(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40">
                <option>Monthly Unlimited</option>
                <option>Quarterly Unlimited</option>
                <option>Yearly Unlimited</option>
                <option>Pay Per Session</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Freeze Days Allowed</label>
                <input type="number" value={freezeDays} onChange={e => setFreezeDays(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Notice Period (Days)</label>
                <input type="number" value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-apple-gray-200">
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-apple-gray-500" /><span className="text-xs text-[#1C1C1E]">Auto Late Fee Calculation</span></div>
              <div onClick={() => setAllowLateFee(!allowLateFee)} className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${allowLateFee ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${allowLateFee ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
              </div>
            </div>
          </div>
        )}

        {tab === 'Payment' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400"><CreditCard className="w-3 h-3 inline mr-1" />UPI ID</label>
              <input value={upiId} onChange={e => setUpiId(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-apple-gray-400"><Landmark className="w-3 h-3 inline mr-1" />Bank Name</label>
              <input value={bankName} onChange={e => setBankName(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">Account No.</label>
                <input value={accountNo} onChange={e => setAccountNo(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-apple-gray-400">IFSC Code</label>
                <input value={ifsc} onChange={e => setIfsc(e.target.value)} className="w-full bg-white/5 border border-apple-gray-200 rounded-lg px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-ydl-yellow/40" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-apple-gray-200">
              <div className="flex items-center gap-2"><ToggleLeft className="w-4 h-4 text-apple-gray-500" /><span className="text-xs text-[#1C1C1E]">Enable Online Payment Gateway</span></div>
              <div onClick={() => setEnablePayment(!enablePayment)} className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${enablePayment ? 'bg-ydl-yellow/40' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${enablePayment ? 'bg-ydl-yellow right-0.5' : 'bg-gray-500 left-0.5'}`} />
              </div>
            </div>
          </div>
        )}

        <button onClick={handleSave} className="mt-6 w-full py-2 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Save className="w-3.5 h-3.5 inline mr-1" /> {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </motion.div>
    </div>
  )
}

function MailIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  )
}

