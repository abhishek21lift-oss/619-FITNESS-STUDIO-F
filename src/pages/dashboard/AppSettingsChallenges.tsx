import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Trophy, Users, Edit3, Trash2, Medal, Flag } from 'lucide-react'
import Modal from '../../components/shared/Modal'
import ActionMenu from '../../components/shared/ActionMenu'
import StatsCard from '../../components/shared/StatsCard'

interface Challenge {
  id: number
  name: string
  type: string
  startDate: string
  endDate: string
  goal: string
  prize: string
  participants: number
  status: 'Active' | 'Ended' | 'Upcoming'
}

interface LeaderboardEntry {
  rank: number
  name: string
  value: string
  prize: string
}

const challengeTypes = ['Steps', 'Workout', 'Weight Loss', 'Attendance', 'Endurance', 'Strength']

const initialChallenges: Challenge[] = [
  { id: 1, name: 'Summer Shred Challenge', type: 'Weight Loss', startDate: '01 Jun 2026', endDate: '30 Jun 2026', goal: 'Lose 5% body fat', prize: '1 Month Free', participants: 24, status: 'Active' },
  { id: 2, name: 'Push-up Marathon', type: 'Endurance', startDate: '15 Jun 2026', endDate: '15 Jul 2026', goal: '10,000 push-ups', prize: 'PT Session', participants: 18, status: 'Active' },
  { id: 3, name: '10K Steps Daily', type: 'Steps', startDate: '01 May 2026', endDate: '31 May 2026', goal: '10,000 steps daily', prize: 'Merchandise', participants: 32, status: 'Ended' },
  { id: 4, name: 'Deadlift Competition', type: 'Strength', startDate: '01 May 2026', endDate: '31 May 2026', goal: 'Max deadlift', prize: 'Trophy', participants: 12, status: 'Ended' },
  { id: 5, name: 'July Attendance King', type: 'Attendance', startDate: '01 Jul 2026', endDate: '31 Jul 2026', goal: '25 check-ins', prize: '₹1,000 Off', participants: 0, status: 'Upcoming' },
]

export default function AppSettingsChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
  const [modalOpen, setModalOpen] = useState(false)
  const [leaderboardOpen, setLeaderboardOpen] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [leaderboardTitle, setLeaderboardTitle] = useState('')
  const [editChallenge, setEditChallenge] = useState<Challenge | null>(null)
  const [form, setForm] = useState({ name: '', type: 'Steps', startDate: '', endDate: '', goal: '', prize: '', status: 'Active' as Challenge['status'] })

  const openAdd = () => {
    setEditChallenge(null)
    setForm({ name: '', type: 'Steps', startDate: '', endDate: '', goal: '', prize: '', status: 'Active' })
    setModalOpen(true)
  }

  const openEdit = (c: Challenge) => {
    setEditChallenge(c)
    setForm({ name: c.name, type: c.type, startDate: c.startDate, endDate: c.endDate, goal: c.goal, prize: c.prize, status: c.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editChallenge) {
      setChallenges(prev => prev.map(c => c.id === editChallenge.id ? { ...c, ...form } : c))
    } else {
      setChallenges(prev => [...prev, { ...form, id: Date.now(), participants: 0 }])
    }
    setModalOpen(false)
  }

  const endChallenge = (id: number) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'Ended' } : c))
  }

  const removeChallenge = (id: number) => {
    setChallenges(prev => prev.filter(c => c.id !== id))
  }

  const viewLeaderboard = (c: Challenge) => {
    setLeaderboardTitle(c.name)
    const mockData: LeaderboardEntry[] = [
      { rank: 1, name: 'Rahul Sharma', value: c.type === 'Weight Loss' ? '5.2 kg lost' : c.type === 'Steps' ? '345,000 steps' : c.type === 'Attendance' ? '28 days' : '85%', prize: c.prize },
      { rank: 2, name: 'Priya Singh', value: c.type === 'Weight Loss' ? '4.8 kg lost' : c.type === 'Steps' ? '312,000 steps' : c.type === 'Attendance' ? '26 days' : '78%', prize: 'Certificate' },
      { rank: 3, name: 'Amit Verma', value: c.type === 'Weight Loss' ? '3.9 kg lost' : c.type === 'Steps' ? '289,000 steps' : c.type === 'Attendance' ? '24 days' : '72%', prize: 'Certificate' },
      { rank: 4, name: 'Sneha Patel', value: c.type === 'Weight Loss' ? '3.2 kg lost' : c.type === 'Steps' ? '256,000 steps' : c.type === 'Attendance' ? '22 days' : '65%', prize: '-' },
      { rank: 5, name: 'Neha Gupta', value: c.type === 'Weight Loss' ? '2.8 kg lost' : c.type === 'Steps' ? '234,000 steps' : c.type === 'Attendance' ? '20 days' : '58%', prize: '-' },
    ]
    setLeaderboardData(mockData)
    setLeaderboardOpen(true)
  }

  const activeChallenges = challenges.filter(c => c.status === 'Active').length
  const totalParticipants = challenges.reduce((s, c) => s + c.participants, 0)
  const completedChallenges = challenges.filter(c => c.status === 'Ended').length

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-white">Challenges</h1><p className="text-xs text-gray-500 mt-0.5">Create and manage fitness challenges.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90"><Plus className="w-3.5 h-3.5" /> Add Challenge</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard label="Active" value={activeChallenges} icon={Trophy} color="from-emerald-500/20 to-emerald-600/5" border="border-emerald-500/30" text="text-emerald-400" />
        <StatsCard label="Total Participants" value={totalParticipants} icon={Users} color="from-blue-500/20 to-blue-600/5" border="border-blue-500/30" text="text-blue-400" />
        <StatsCard label="Completed" value={completedChallenges} icon={Flag} color="from-purple-500/20 to-purple-600/5" border="border-purple-500/30" text="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-ydl-yellow/10 border border-ydl-yellow/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-ydl-yellow" /></div>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md ${
                c.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                c.status === 'Upcoming' ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' :
                'text-gray-400 bg-gray-500/10 border border-gray-500/20'
              }`}>{c.status}</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{c.name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-gray-500">Type: <span className="text-gray-300">{c.type}</span></p>
              <p className="text-[10px] text-gray-500"><Calendar className="inline w-3 h-3 mr-0.5" />{c.startDate} - {c.endDate}</p>
              <p className="text-[10px] text-gray-500">Goal: <span className="text-gray-300">{c.goal}</span></p>
              <p className="text-[10px] text-gray-500"><Users className="inline w-3 h-3 mr-0.5" />{c.participants} participants</p>
              <p className="text-[10px] font-medium text-ydl-yellow">Prize: {c.prize}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-ydl-dark-border">
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => openEdit(c) },
                { label: 'View Leaderboard', icon: Medal, onClick: () => viewLeaderboard(c) },
                { label: c.status === 'Active' ? 'End Challenge' : 'Reactivate', icon: Flag, onClick: () => c.status === 'Active' ? endChallenge(c.id) : setChallenges(prev => prev.map(c2 => c2.id === c.id ? { ...c2, status: 'Active' } : c2)), color: c.status === 'Active' ? 'text-red-400' : 'text-emerald-400' },
                { label: 'Delete', icon: Trash2, onClick: () => removeChallenge(c.id), color: 'text-red-400' },
              ]} />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editChallenge ? 'Edit Challenge' : 'Add Challenge'} size="md">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Challenge Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Summer Shred Challenge" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                {challengeTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Challenge['status'] }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
                <option>Active</option><option>Upcoming</option><option>Ended</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Start Date</label>
              <input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">End Date</label>
              <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none focus:border-ydl-yellow/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Goal</label>
              <input value={form.goal} onChange={e => setForm(p => ({ ...p, goal: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="10,000 steps daily" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-gray-400">Prize</label>
              <input value={form.prize} onChange={e => setForm(p => ({ ...p, prize: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="1 Month Free" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={handleSave} disabled={!form.name} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">{editChallenge ? 'Update' : 'Add'} Challenge</button>
          <button onClick={() => setModalOpen(false)} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white">Cancel</button>
        </div>
      </Modal>

      <Modal open={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} title={`Leaderboard: ${leaderboardTitle}`} size="lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ydl-dark-border bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase w-12">Rank</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Member</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Progress</th>
              <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase">Prize</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ydl-dark-border/50">
            {leaderboardData.map((e, i) => (
              <motion.tr key={e.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    e.rank === 1 ? 'bg-ydl-yellow/20 text-ydl-yellow' : e.rank === 2 ? 'bg-gray-300/20 text-gray-300' : e.rank === 3 ? 'bg-amber-600/20 text-amber-600' : 'bg-white/5 text-gray-500'
                  }`}>{e.rank}</div>
                </td>
                <td className="px-4 py-3 text-xs font-medium text-white">{e.name}</td>
                <td className="px-4 py-3 text-xs text-ydl-yellow">{e.value}</td>
                <td className="px-4 py-3 text-right text-xs text-gray-400">{e.prize}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  )
}
