import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cake, Gift, Send, ChevronLeft, Phone, MessageSquare } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'

const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const mockBirthdays = [
  { name: 'Rahul Sharma', mobile: '+91 98765 43210', date: '15 Jun', plan: 'Annual Gold', year: 1994, age: 32, email: 'rahul@email.com' },
  { name: 'Priya Singh', mobile: '+91 87654 32109', date: '22 Jul', plan: 'Monthly Basic', year: 1997, age: 29, email: 'priya@email.com' },
  { name: 'Amit Verma', mobile: '+91 76543 21098', date: '05 Aug', plan: 'Quarterly Pro', year: 1992, age: 34, email: 'amit@email.com' },
  { name: 'Sneha Patel', mobile: '+91 65432 10987', date: '10 Sep', plan: 'Annual Platinum', year: 1995, age: 31, email: 'sneha@email.com' },
  { name: 'Neha Gupta', mobile: '+91 43210 98765', date: '18 Oct', plan: 'Annual Gold', year: 1999, age: 27, email: 'neha@email.com' },
  { name: 'Arun Kumar', mobile: '+91 32109 87654', date: '03 Nov', plan: 'Quarterly Pro', year: 1993, age: 33, email: 'arun@email.com' },
  { name: 'Pooja Jain', mobile: '+91 21098 76543', date: '25 Dec', plan: 'Monthly Basic', year: 1996, age: 30, email: 'pooja@email.com' },
  { name: 'Vikram Yadav', mobile: '+91 54321 09876', date: '14 Jan', plan: 'Annual Platinum', year: 1991, age: 35, email: 'vikram@email.com' },
  { name: 'Ananya Kapoor', mobile: '+91 99887 76655', date: '30 Mar', plan: 'PT Session', year: 1998, age: 28, email: 'ananya@email.com' },
  { name: 'Rohan Mehra', mobile: '+91 88776 65544', date: '07 Feb', plan: 'Quarterly Pro', year: 1990, age: 36, email: 'rohan@email.com' },
  { name: 'Isha Saxena', mobile: '+91 77665 54433', date: '19 Apr', plan: 'Annual Gold', year: 2000, age: 26, email: 'isha@email.com' },
  { name: 'Manish Tiwari', mobile: '+91 66554 43322', date: '12 May', plan: 'Monthly Basic', year: 1994, age: 32, email: 'manish@email.com' },
]

export default function MembersBirthday() {
  const [month, setMonth] = useState('All')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<{ type: string; data?: any } | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const monthMap: Record<string, string> = {
    January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr', May: 'May', June: 'Jun',
    July: 'Jul', August: 'Aug', September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
  }

  const today = new Date()
  const todayStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).replace(/ /, ' ')
  const todayBirthdays = mockBirthdays.filter(b => b.date === todayStr)

  const filtered = mockBirthdays.filter(b => {
    if (month !== 'All' && !b.date.toLowerCase().includes(monthMap[month]?.toLowerCase() || month.slice(0, 3).toLowerCase())) return false
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.mobile.includes(search)) return false
    return true
  })

  const toggleSelect = (name: string) => {
    const next = new Set(selected)
    if (next.has(name)) next.delete(name); else next.add(name)
    setSelected(next)
  }

  const sendWishes = (b: any) => {
    const msg = `Happy Birthday ${b.name}! 🎂 Wishing you a fantastic day filled with joy and fitness. - 619 FITNESS STUDIO`
    window.open(`https://wa.me/${b.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Members Birthday</h1>
          <p className="text-xs text-gray-500 mt-0.5">Celebrate client birthdays and send wishes.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ydl-yellow/10 border border-ydl-yellow/20">
            <Cake className="w-3.5 h-3.5 text-ydl-yellow" />
            <span className="text-[10px] font-semibold text-ydl-yellow">{todayBirthdays.length} Today</span>
          </div>
          <button onClick={() => setModal({ type: 'send-all' })} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity" disabled={todayBirthdays.length === 0}>
            <Send className="w-3 h-3" /> Send Wishes to All
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Search name or mobile..." />
        </div>
        <select value={month} onChange={e => setMonth(e.target.value)} className="bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
          {months.map(m => <option key={m}>{m}</option>)}
        </select>
        <span className="text-[10px] text-gray-500">{filtered.length} birthdays this month</span>
      </div>

      {todayBirthdays.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-yellow/30 bg-ydl-yellow/[0.03] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cake className="w-4 h-4 text-ydl-yellow" />
            <span className="text-sm font-semibold text-ydl-yellow">Birthdays Today!</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {todayBirthdays.map(b => (
              <div key={b.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-ydl-dark-border">
                <div className="w-8 h-8 rounded-full bg-ydl-yellow/10 flex items-center justify-center text-xs font-bold text-ydl-yellow">{b.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div className="text-xs font-medium text-white">{b.name}</div>
                  <div className="text-[10px] text-gray-500">{b.mobile}</div>
                </div>
                <button onClick={() => sendWishes(b)} className="ml-2 p-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
                <th className="w-8 px-3 py-3"><input type="checkbox" onChange={() => { if (selected.size === filtered.length) setSelected(new Set()); else setSelected(new Set(filtered.map(b => b.name))) }} checked={selected.size === filtered.length && filtered.length > 0} className="accent-ydl-yellow" /></th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Mobile</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Age</th>
                <th className="text-left px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ydl-dark-border/50">
              {filtered.map((b, i) => (
                <motion.tr key={b.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-3 py-3"><input type="checkbox" checked={selected.has(b.name)} onChange={() => toggleSelect(b.name)} className="accent-ydl-yellow" /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-ydl-yellow/10 flex items-center justify-center">
                        <Cake className="w-3.5 h-3.5 text-ydl-yellow" />
                      </div>
                      <span onClick={() => setModal({ type: 'profile', data: b })} className="text-xs font-medium text-white hover:text-ydl-yellow cursor-pointer transition-colors">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-400">{b.mobile}</td>
                  <td className="px-3 py-3">
                    <span className={`text-xs font-medium ${b.date === todayStr ? 'text-ydl-yellow' : 'text-gray-400'}`}>{b.date}</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-400">{b.age} yrs</td>
                  <td className="px-3 py-3 text-xs text-gray-400">{b.plan}</td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => sendWishes(b)} className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors">
                        <Send className="w-3 h-3" /> Wish
                      </button>
                      <button onClick={() => setModal({ type: 'gift', data: b })} className="p-1.5 text-gray-500 hover:text-ydl-yellow hover:bg-ydl-yellow/10 rounded-lg transition-all">
                        <Gift className="w-3.5 h-3.5" />
                      </button>
                      <ActionMenu
                        label={<ChevronLeft className="w-3 h-3" />}
                        actions={[
                          { label: 'Send WhatsApp', icon: MessageSquare, onClick: () => sendWishes(b) },
                          { label: 'Call', icon: Phone, onClick: () => window.open(`tel:${b.mobile}`) },
                          { label: 'Send Gift', icon: Gift, onClick: () => setModal({ type: 'gift', data: b }) },
                        ]}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10"><p className="text-xs text-gray-500">No birthdays found for this period.</p></div>}
      </motion.div>

      {selected.size > 0 && (
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-ydl-yellow">{selected.size} selected</span>
          <button onClick={() => { selected.forEach(name => { const b = mockBirthdays.find(x => x.name === name); if (b) sendWishes(b) }); setSelected(new Set()) }} className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20"><Send className="w-3 h-3" /> Send Wishes</button>
        </div>
      )}

      <Modal open={modal?.type === 'gift'} onClose={() => setModal(null)} title={`Send Gift to ${modal?.data?.name || ''}`} size="md">
        <div className="space-y-3">
          <div className="text-[11px] text-gray-500">Choose a birthday gift or reward for <span className="text-white">{modal?.data?.name}</span></div>
          <div className="grid grid-cols-2 gap-2">
            {['1 Month Free', '₹500 Off', 'PT Session', 'Protein Shake', 'T-Shirt', 'Water Bottle'].map(g => (
              <button key={g} className="px-3 py-2 text-xs text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:border-ydl-yellow/30 hover:text-ydl-yellow transition-colors text-left">{g}</button>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert(`Gift sent to ${modal?.data?.name}!`); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Gift className="w-3 h-3 inline mr-1" /> Send Gift</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'send-all'} onClose={() => setModal(null)} title="Send Wishes to All" size="md">
        <div className="space-y-3">
          <p className="text-xs text-gray-400">Send birthday wishes to <span className="text-ydl-yellow">{todayBirthdays.length}</span> members celebrating today.</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {todayBirthdays.map(b => (
              <div key={b.name} className="flex items-center gap-2 text-xs text-gray-400"><span className="text-white">{b.name}</span> - {b.mobile}</div>
            ))}
          </div>
          <textarea className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 min-h-[80px] resize-none" placeholder="Custom message (optional)" defaultValue="Happy Birthday! 🎂 Wishing you health and happiness. - 619 FITNESS STUDIO" />
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => { alert('Birthday wishes sent to all!'); setModal(null); }} className="px-4 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Send className="w-3 h-3 inline mr-1" /> Send to All</button>
            <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal?.type === 'profile'} onClose={() => setModal(null)} title={`Profile: ${modal?.data?.name || ''}`} size="lg">
        {modal?.data && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-gray-500">Name:</span> <span className="text-white font-medium">{modal.data.name}</span></div>
              <div><span className="text-gray-500">Mobile:</span> <span className="text-white">{modal.data.mobile}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="text-white">{modal.data.email}</span></div>
              <div><span className="text-gray-500">Birth Date:</span> <span className="text-white">{modal.data.date}</span></div>
              <div><span className="text-gray-500">Age:</span> <span className="text-white">{modal.data.age} yrs</span></div>
              <div><span className="text-gray-500">Plan:</span> <span className="text-white">{modal.data.plan}</span></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
