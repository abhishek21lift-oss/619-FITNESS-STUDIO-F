import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, Calendar, Users, Tag, MessageSquare, Save,
  ChevronDown, ChevronUp, Plus, Search, MapPin, Briefcase,
  CreditCard, FileText, ArrowLeft
} from 'lucide-react'
import Modal from '../../components/shared/Modal'

const sourcePromotions = ['Instagram Ad', 'Facebook Ad', 'Google Ads', 'Referral Program', 'Billboard', 'Radio', 'Newspaper', 'SMS Campaign', 'Email Campaign', 'YouTube Ad', 'Podcast', 'Local Event', 'Cross Promotion', 'Flyer', 'Poster', 'Banner', 'TV Ad', 'WhatsApp Group', 'Telegram', 'LinkedIn', 'Twitter', 'Pinterest', 'Snapchat', 'TikTok', 'Blog', 'SEO', 'Word of Mouth', 'Other', 'Facebook Post', 'Google My Business', 'Influencer', 'Referral by Member', 'SMS Blast', 'WhatsApp Broadcast', 'Walk-in', 'Website Blog', 'YouTube Channel', 'Zomato', 'Swiggy']
const sourceEnquiries = ['Instagram', 'Facebook', 'Google', 'Walk-in', 'Friend Referral', 'Phone Call', 'Website', 'YouTube', 'LinkedIn', 'Twitter', 'Email', 'Referral', 'Newspaper', 'Radio', 'TV', 'Billboard', 'SMS', 'WhatsApp', 'Telegram', 'Other']
const trainers = ['Unassigned', 'Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar', 'Aarav Singh', 'Shivani Verma']
const clientReps = ['Awash Vikash', 'Riya Singh', 'Abhishek Katiyar', 'Rajat Katiyar']
const genderOptions = ['Male', 'Female', 'Other']
const followUpTypes = ['Call', 'Visit', 'WhatsApp', 'Email', 'SMS', 'In Person Meeting', 'Video Call', 'Demo Session']
const responses = ['No Answer', 'Not Reachable', 'Busy', 'Interested', 'Not Interested', 'Will Call Back']
const convertibilities = ['Hot', 'Warm', 'Cold', 'Expected', 'Unpitched', 'Not Convertible']
const contactTypes = ['Phone', 'In Person', 'Email', 'WhatsApp', 'SMS']
const quickMessages = [
  'Not reachable', 'No answer', 'Interested', 'Demo Scheduled', 'Not Interested',
  'Budget Issue', 'Timing Issue', 'Location Issue', 'Will Decide Later', 'Call Back Later',
  'Spouse Not Agreed', 'Already Joined Elsewhere', 'Medical Issue', 'Out of Station',
  'Price Negotiation', 'Plan Comparison', 'Need Trial First', 'Family Member Will Call',
  'Distance Issue', 'Emergency at Home', 'Job Change', 'Marriage', 'Other'
]

export default function EnquiryAdd() {
  const [showOptional, setShowOptional] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', mobile: '', altMobile: '',
    guardianContact: '', dob: '', enquiryDate: new Date().toISOString().split('T')[0],
    clientRep: clientReps[0], gender: 'Male',
    address1: '', address2: '', company: '', gst: '', aadhaar: '', pan: '',
    sourcePromotion: sourcePromotions[0], sourceEnquiry: sourceEnquiries[0],
    trainer: trainers[0], followupStage: 'Untapped',
    fuType: 'Call', fuAssignTo: clientReps[0], fuResponse: 'No Answer',
    fuConvertibility: 'Hot', fuNextDate: '', fuContactType: 'Phone',
    fuComment: '', fuRemarks: '',
    referralBy: '', referralMemberId: '', referralThirdParty: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showQuickMsg, setShowQuickMsg] = useState(false)
  const [showMemberLookup, setShowMemberLookup] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.firstName.trim()) errs.firstName = 'First name is required'
    if (!formData.mobile.trim()) errs.mobile = 'Mobile is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    alert('Enquiry saved successfully!')
  }

  const handleSaveClose = () => {
    if (!validate()) return
    alert('Enquiry saved successfully!')
    navigate('/dashboard/enquiry/list')
  }

  const set = (key: string, value: string) => setFormData({ ...formData, [key]: value })

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/enquiry/list')} className="p-1.5 text-gray-500 hover:text-white bg-white/5 border border-ydl-dark-border rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Add Enquiry</h1>
            <p className="text-xs text-gray-500 mt-0.5">Capture a new lead with complete details.</p>
          </div>
        </div>
        <button onClick={() => setShowOptional(!showOptional)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
          {showOptional ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} {showOptional ? 'Hide' : 'Show'} Optional Fields
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><User className="w-4 h-4 text-ydl-yellow" /> Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">First Name <span className="text-red-400">*</span></label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.firstName} onChange={e => { set('firstName', e.target.value); if (errors.firstName) setErrors(prev => { const n = { ...prev }; delete n.firstName; return n }) }} className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-400' : 'border-ydl-dark-border'} rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="First name" /></div>
              {errors.firstName && <p className="text-[10px] text-red-400 mt-1">{errors.firstName}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Last Name</label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.lastName} onChange={e => set('lastName', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Last name" /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.email} onChange={e => set('email', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="email@example.com" /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Mobile <span className="text-red-400">*</span></label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.mobile} onChange={e => { set('mobile', e.target.value); if (errors.mobile) setErrors(prev => { const n = { ...prev }; delete n.mobile; return n }) }} className={`w-full bg-white/5 border ${errors.mobile ? 'border-red-400' : 'border-ydl-dark-border'} rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors`} placeholder="+91 98765 43210" /></div>
              {errors.mobile && <p className="text-[10px] text-red-400 mt-1">{errors.mobile}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Alt Mobile</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.altMobile} onChange={e => set('altMobile', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="+91" /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Guardian Contact</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.guardianContact} onChange={e => set('guardianContact', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Guardian's mobile" /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Date of Birth</label>
              <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" value={formData.dob} onChange={e => set('dob', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Enquiry Date</label>
              <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" value={formData.enquiryDate} onChange={e => set('enquiryDate', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Client Rep</label>
              <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><select value={formData.clientRep} onChange={e => set('clientRep', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">{clientReps.map(o => <option key={o}>{o}</option>)}</select></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Gender</label>
              <div className="flex items-center gap-3 h-[34px]">
                {genderOptions.map(g => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="gender" checked={formData.gender === g} onChange={() => set('gender', g)} className="accent-ydl-yellow" />
                    <span className="text-xs text-gray-300">{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {showOptional && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-ydl-dark-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400">Address Line 1</label>
                  <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.address1} onChange={e => set('address1', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Address" /></div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400">Address Line 2</label>
                  <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.address2} onChange={e => set('address2', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="City, State" /></div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400">Company Name</label>
                  <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.company} onChange={e => set('company', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Company" /></div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400">GST</label>
                  <div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.gst} onChange={e => set('gst', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="GST Number" /></div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400">Aadhaar</label>
                  <div className="relative"><CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.aadhaar} onChange={e => set('aadhaar', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="XXXX XXXX XXXX" /></div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400">PAN</label>
                  <div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input value={formData.pan} onChange={e => set('pan', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="PAN Number" /></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-ydl-yellow" /> Lead Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Source of Promotion</label>
              <select value={formData.sourcePromotion} onChange={e => set('sourcePromotion', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {sourcePromotions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Source of Enquiry</label>
              <select value={formData.sourceEnquiry} onChange={e => set('sourceEnquiry', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {sourceEnquiries.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Assign Trainer</label>
              <select value={formData.trainer} onChange={e => set('trainer', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {trainers.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Followup Stage</label>
              <select value={formData.followupStage} onChange={e => set('followupStage', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                <option>Untapped</option><option>Tapped</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-ydl-yellow" /> Add Follow Up</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Type of Follow Up</label>
              <select value={formData.fuType} onChange={e => set('fuType', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {followUpTypes.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Assign To</label>
              <select value={formData.fuAssignTo} onChange={e => set('fuAssignTo', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {clientReps.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Response</label>
              <select value={formData.fuResponse} onChange={e => set('fuResponse', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {responses.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Convertibility</label>
              <select value={formData.fuConvertibility} onChange={e => set('fuConvertibility', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {convertibilities.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Next Follow Up Date</label>
              <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input type="date" value={formData.fuNextDate} onChange={e => set('fuNextDate', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors [color-scheme:dark]" /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Contact Type</label>
              <select value={formData.fuContactType} onChange={e => set('fuContactType', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                {contactTypes.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-medium text-gray-400">To Do / Comment</label>
              <textarea value={formData.fuComment} onChange={e => set('fuComment', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors min-h-[60px] resize-none" placeholder="Add comment..." />
              <div className="relative">
                <button onClick={() => setShowQuickMsg(!showQuickMsg)} className="flex items-center gap-1 text-[10px] text-ydl-yellow mt-1 hover:underline">
                  <Plus className="w-3 h-3" /> Quick Message
                </button>
                {showQuickMsg && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-ydl-dark-border bg-[#1A1A1A] shadow-xl z-20 max-h-48 overflow-y-auto">
                    {quickMessages.map(msg => (
                      <button key={msg} onClick={() => { set('fuComment', (formData.fuComment ? formData.fuComment + '\n' : '') + msg); setShowQuickMsg(false) }} className="block w-full text-left px-3 py-1.5 text-[11px] text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                        {msg}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Remarks / Summary</label>
              <textarea value={formData.fuRemarks} onChange={e => set('fuRemarks', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors min-h-[60px] resize-none" placeholder="Summary of conversation..." />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ydl-dark-border bg-white/[0.02] p-5">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-ydl-yellow" /> Referral</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Referral By</label>
              <select className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-ydl-yellow/40 transition-colors appearance-none">
                <option>None</option><option>Rahul Sharma</option><option>Priya Singh</option><option>Amit Verma</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Member ID Lookup</label>
              <div className="flex gap-2">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" /><input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search member..." /></div>
                <button onClick={() => setShowMemberLookup(true)} className="px-2.5 py-2 text-[10px] font-medium text-ydl-yellow bg-ydl-yellow/10 border border-ydl-yellow/20 rounded-lg hover:bg-ydl-yellow/20">Lookup</button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400">Third Party Name</label>
              <input value={formData.referralThirdParty} onChange={e => set('referralThirdParty', e.target.value)} className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40 transition-colors" placeholder="Third party name" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={handleSaveClose} className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-ydl-gradient rounded-lg hover:opacity-90 transition-opacity">
            <Save className="w-3.5 h-3.5" /> Save & Close
          </button>
          <button onClick={() => navigate('/dashboard/enquiry/list')} className="px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
          </button>
        </div>
      </motion.div>

      <Modal open={showMemberLookup} onClose={() => setShowMemberLookup(false)} title="Member Lookup" size="md">
        <div className="space-y-2">
          <input className="w-full bg-white/5 border border-ydl-dark-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/40" placeholder="Search by name or member ID..." />
          <div className="max-h-48 overflow-y-auto space-y-1 mt-2">
            {['Rahul Sharma (MEM-001)', 'Priya Singh (MEM-002)', 'Amit Verma (MEM-003)'].map(m => (
              <button key={m} onClick={() => { set('referralMemberId', m); setShowMemberLookup(false) }} className="w-full text-left px-3 py-2 text-[11px] text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors">{m}</button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}
