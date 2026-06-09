import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'

const challengeOptions = ['Summer Shred', 'Push-up Marathon', '10K Steps Daily', 'Deadlift Competition']
const captainOptions = ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Neha Gupta', 'Sneha Patel']
const memberOptions = ['Rahul Sharma', 'Priya Singh', 'Amit Verma', 'Neha Gupta', 'Sneha Patel', 'Vikram Joshi', 'Ananya Rai', 'Rohit Mehta', 'Kavita Das', 'Arjun Nair']

export default function AppSettingsChallengeTeamsCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ teamName: '', challenge: challengeOptions[0], captain: captainOptions[0], members: [] as string[] })
  const [memberSearch, setMemberSearch] = useState('')

  const filteredMembers = memberOptions.filter(m => m.toLowerCase().includes(memberSearch.toLowerCase()) && !form.members.includes(m))

  const toggleMember = (name: string) => {
    setForm(p => ({
      ...p,
      members: p.members.includes(name) ? p.members.filter(m => m !== name) : [...p.members, name],
    }))
  }

  const handleSave = () => {
    if (!form.teamName) { toast('Please enter a team name.', 'error'); return }
    toast('Team created successfully!', 'success')
    navigate('/dashboard/app-settings/challenges/teams')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/app-settings/challenges/teams')} className="p-2 rounded-lg border border-ydl-dark-border bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <div><h1 className="text-lg font-bold text-white">Create Team</h1><p className="text-xs text-gray-500 mt-0.5">Form a new challenge team.</p></div>
        </div>
        <button onClick={handleSave} disabled={!form.teamName} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40">
          <Save className="w-3.5 h-3.5" /> Save
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl rounded-xl border border-ydl-dark-border bg-white/[0.02] p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Team Name *</label>
          <input value={form.teamName} onChange={e => setForm(p => ({ ...p, teamName: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Team Alpha" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Challenge</label>
            <select value={form.challenge} onChange={e => setForm(p => ({ ...p, challenge: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              {challengeOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-gray-400">Captain</label>
            <select value={form.captain} onChange={e => setForm(p => ({ ...p, captain: e.target.value }))} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40">
              {captainOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-400">Members ({form.members.length} selected)</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input value={memberSearch} onChange={e => setMemberSearch(e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search members..." />
          </div>
          <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-ydl-dark-border bg-white/[0.02] p-2 space-y-1">
            {form.members.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-ydl-dark-border">
                {form.members.map(m => (
                  <span key={m} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 rounded-full">
                    {m}
                    <button onClick={() => toggleMember(m)} className="text-ydl-yellow/60 hover:text-ydl-yellow">×</button>
                  </span>
                ))}
              </div>
            )}
            {filteredMembers.length === 0 ? (
              <p className="text-[10px] text-gray-500 text-center py-2">No members found</p>
            ) : (
              filteredMembers.map(m => (
                <button key={m} onClick={() => toggleMember(m)} className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left">
                  <Users className="w-3 h-3" /> {m}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={handleSave} disabled={!form.teamName} className="flex-1 py-2 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 disabled:opacity-40"><Save className="w-3.5 h-3.5 inline mr-1" />Save</button>
          <button onClick={() => navigate('/dashboard/app-settings/challenges/teams')} className="flex-1 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white"><ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back</button>
        </div>
      </motion.div>
    </div>
  )
}
