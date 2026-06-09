import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Users, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ActionMenu from '../../components/shared/ActionMenu'
import Table from '../../components/shared/Table'
import { useToast } from '../../components/ui/Toast'

interface ChallengeTeam {
  id: number
  teamName: string
  challenge: string
  captain: string
  membersCount: number
  points: number
  rank: number
}

const initialTeams: ChallengeTeam[] = [
  { id: 1, teamName: 'Team Alpha', challenge: 'Summer Shred', captain: 'Rahul Sharma', membersCount: 6, points: 2450, rank: 1 },
  { id: 2, teamName: 'Fit Warriors', challenge: 'Summer Shred', captain: 'Priya Singh', membersCount: 5, points: 2100, rank: 2 },
  { id: 3, teamName: 'Iron Titans', challenge: 'Push-up Marathon', captain: 'Amit Verma', membersCount: 4, points: 1800, rank: 3 },
  { id: 4, teamName: 'Step Squad', challenge: '10K Steps Daily', captain: 'Neha Gupta', membersCount: 8, points: 3200, rank: 1 },
]

export default function AppSettingsChallengeTeams() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [teams, setTeams] = useState<ChallengeTeam[]>(initialTeams)

  const removeTeam = (id: number) => {
    setTeams(prev => prev.filter(t => t.id !== id))
    toast('Team removed.', 'info')
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-lg font-bold text-[#1C1C1E]">Challenge Teams</h1><p className="text-xs text-apple-gray-500 mt-0.5">Teams participating in challenges.</p></div>
        <button onClick={() => navigate('/dashboard/app-settings/challenges/teams/create')} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-black bg-apple-gradient-blue rounded-lg hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Add Team
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Table
          columns={[
            { header: 'Team Name', accessor: (r: ChallengeTeam) => <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-apple-blue" /><span className="text-[#1C1C1E] font-medium">{r.teamName}</span></div> },
            { header: 'Challenge', accessor: (r: ChallengeTeam) => <span>{r.challenge}</span> },
            { header: 'Captain', accessor: (r: ChallengeTeam) => <span>{r.captain}</span> },
            { header: 'Members', accessor: (r: ChallengeTeam) => <span>{r.membersCount}</span> },
            { header: 'Points', accessor: (r: ChallengeTeam) => <span className="text-apple-blue font-medium">{r.points.toLocaleString()}</span> },
            { header: 'Rank', accessor: (r: ChallengeTeam) => (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md ${r.rank === 1 ? 'text-apple-blue bg-apple-blue/10' : 'text-apple-gray-400 bg-gray-500/10'}`}>
                <Trophy className="w-2.5 h-2.5" /> #{r.rank}
              </span>
            )},
            { header: '', accessor: (r: ChallengeTeam) => (
              <ActionMenu actions={[
                { label: 'Edit', icon: Edit3, onClick: () => toast('Edit team', 'info') },
                { label: 'Delete', icon: Trash2, onClick: () => removeTeam(r.id), color: 'text-red-400' },
              ]} />
            ), className: 'text-right' },
          ]}
          data={teams}
          keyExtractor={r => r.id}
        />
      </motion.div>
    </div>
  )
}
