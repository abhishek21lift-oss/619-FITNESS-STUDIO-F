import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import ContactUs from './pages/ContactUs'
import CallForDemo from './pages/CallForDemo'
import Blog from './pages/Blog'
import GymSoftware from './pages/GymSoftware'
import PilatesStudio from './pages/PilatesStudio'
import StudioSoftware from './pages/StudioSoftware'
import DigitalMarketing from './pages/DigitalMarketing'
import AdminLogin from './pages/AdminLogin'
import TrainerLogin from './pages/TrainerLogin'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import YdlDashboard from './pages/dashboard/YdlDashboard'
import EnquiryAdd from './pages/dashboard/EnquiryAdd'
import EnquiryList from './pages/dashboard/EnquiryList'
import FollowUps from './pages/dashboard/FollowUps'
import MembersAdd from './pages/dashboard/MembersAdd'
import MembersQuickAdd from './pages/dashboard/MembersQuickAdd'
import MembersDatabase from './pages/dashboard/MembersDatabase'
import MembersReferrals from './pages/dashboard/MembersReferrals'
import MembersBirthday from './pages/dashboard/MembersBirthday'
import MembersOtherBranch from './pages/dashboard/MembersOtherBranch'
import AnalysisTraffic from './pages/dashboard/AnalysisTraffic'
import AnalysisMembers from './pages/dashboard/AnalysisMembers'
import AnalysisCollection from './pages/dashboard/AnalysisCollection'
import AnalysisSubscriptions from './pages/dashboard/AnalysisSubscriptions'
import AnalysisRenewal from './pages/dashboard/AnalysisRenewal'
import AnalysisFollowup from './pages/dashboard/AnalysisFollowup'
import AnalysisConversion from './pages/dashboard/AnalysisConversion'
import AnalysisEnquiry from './pages/dashboard/AnalysisEnquiry'
import AnalysisExpense from './pages/dashboard/AnalysisExpense'
import AnalysisProfitLoss from './pages/dashboard/AnalysisProfitLoss'
import AnalysisBilling from './pages/dashboard/AnalysisBilling'
import AnalysisSalesLeaderboard from './pages/dashboard/AnalysisSalesLeaderboard'
import AnalysisRevenueForecast from './pages/dashboard/AnalysisRevenueForecast'
import AnalysisLeadSource from './pages/dashboard/AnalysisLeadSource'
import MembershipPlans from './pages/dashboard/MembershipPlans'
import MembershipSubscriptions from './pages/dashboard/MembershipSubscriptions'
import MembershipCoupon from './pages/dashboard/MembershipCoupon'
import MembershipCombo from './pages/dashboard/MembershipCombo'
import BatchesAdd from './pages/dashboard/BatchesAdd'
import BatchesList from './pages/dashboard/BatchesList'
import BatchesBookings from './pages/dashboard/BatchesBookings'
import BatchesCalendar from './pages/dashboard/BatchesCalendar'
import BatchesProgram from './pages/dashboard/BatchesProgram'
import AccountsRegisters from './pages/dashboard/AccountsRegisters'
import AccountsPayroll from './pages/dashboard/AccountsPayroll'
import AccountsExpense from './pages/dashboard/AccountsExpense'
import Notifications from './pages/dashboard/Notifications'
import NotificationsWhatsApp from './pages/dashboard/NotificationsWhatsApp'
import NotificationsSMS from './pages/dashboard/NotificationsSMS'
import NotificationsEmail from './pages/dashboard/NotificationsEmail'
import TrainersAdd from './pages/dashboard/TrainersAdd'
import TrainersList from './pages/dashboard/TrainersList'
import TrainersTransformations from './pages/dashboard/TrainersTransformations'
import TrainersLeave from './pages/dashboard/TrainersLeave'
import SettingsFitnessCenters from './pages/dashboard/SettingsFitnessCenters'
import SettingsFitnessSettings from './pages/dashboard/SettingsFitnessSettings'
import SettingsBiometric from './pages/dashboard/SettingsBiometric'
import SettingsEquipment from './pages/dashboard/SettingsEquipment'
import SettingsNotices from './pages/dashboard/SettingsNotices'
import SettingsHoliday from './pages/dashboard/SettingsHoliday'
import SettingsFeedback from './pages/dashboard/SettingsFeedback'
import StaffAdd from './pages/dashboard/StaffAdd'
import StaffList from './pages/dashboard/StaffList'
import StaffAccess from './pages/dashboard/StaffAccess'
import StaffTarget from './pages/dashboard/StaffTarget'
import AttendanceStaff from './pages/dashboard/AttendanceStaff'
import AttendanceClient from './pages/dashboard/AttendanceClient'
import AttendanceLeaderboard from './pages/dashboard/AttendanceLeaderboard'
import AppSettingsPermissions from './pages/dashboard/AppSettingsPermissions'
import AppSettingsServices from './pages/dashboard/AppSettingsServices'
import AppSettingsGallery from './pages/dashboard/AppSettingsGallery'
import AppSettingsActions from './pages/dashboard/AppSettingsActions'
import AppSettingsBanner from './pages/dashboard/AppSettingsBanner'
import AppSettingsSocial from './pages/dashboard/AppSettingsSocial'
import AppSettingsMeasurements from './pages/dashboard/AppSettingsMeasurements'
import AppSettingsWorkouts from './pages/dashboard/AppSettingsWorkouts'
import AppSettingsCommunity from './pages/dashboard/AppSettingsCommunity'
import AppSettingsChallenges from './pages/dashboard/AppSettingsChallenges'
import TutorialVideos from './pages/dashboard/TutorialVideos'
import TutorialFAQ from './pages/dashboard/TutorialFAQ'
import Appointments from './pages/dashboard/Appointments'
import Wallet from './pages/dashboard/Wallet'
import Ecommerce from './pages/dashboard/Ecommerce'
import TrainerLayout from './layouts/TrainerLayout'
import TrainerDashboard from './pages/trainer/Dashboard'
import TrainerClients from './pages/trainer/Clients'
import TrainerSchedule from './pages/trainer/Schedule'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/call-for-demo" element={<CallForDemo />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/gym-and-club-software" element={<GymSoftware />} />
        <Route path="/pilates-studio" element={<PilatesStudio />} />
        <Route path="/studio" element={<StudioSoftware />} />
        <Route path="/digital-marketing-for-gyms-and-fitness-clubs" element={<DigitalMarketing />} />
      </Route>
      <Route path="/fitness-center/login" element={<AdminLogin />} />
      <Route path="/trainer-dashboard/login" element={<TrainerLogin />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<YdlDashboard />} />
        <Route path="overview" element={<Overview />} />
        {/* Enquiry */}
        <Route path="enquiry/add" element={<EnquiryAdd />} />
        <Route path="enquiry/list" element={<EnquiryList />} />
        {/* Follow Ups */}
        <Route path="followups" element={<FollowUps />} />
        {/* Members */}
        <Route path="members/add" element={<MembersAdd />} />
        <Route path="members/quick-add" element={<MembersQuickAdd />} />
        <Route path="members/database" element={<MembersDatabase />} />
        <Route path="members/referrals" element={<MembersReferrals />} />
        <Route path="members/birthday" element={<MembersBirthday />} />
        <Route path="members/other-branch" element={<MembersOtherBranch />} />
        {/* Analysis */}
        <Route path="analysis/traffic" element={<AnalysisTraffic />} />
        <Route path="analysis/members" element={<AnalysisMembers />} />
        <Route path="analysis/collection" element={<AnalysisCollection />} />
        <Route path="analysis/subscriptions" element={<AnalysisSubscriptions />} />
        <Route path="analysis/renewal" element={<AnalysisRenewal />} />
        <Route path="analysis/followup" element={<AnalysisFollowup />} />
        <Route path="analysis/conversion" element={<AnalysisConversion />} />
        <Route path="analysis/enquiry" element={<AnalysisEnquiry />} />
        <Route path="analysis/expense" element={<AnalysisExpense />} />
        <Route path="analysis/profit-loss" element={<AnalysisProfitLoss />} />
        <Route path="analysis/billing" element={<AnalysisBilling />} />
        <Route path="analysis/sales-leaderboard" element={<AnalysisSalesLeaderboard />} />
        <Route path="analysis/revenue-forecast" element={<AnalysisRevenueForecast />} />
        <Route path="analysis/lead-source" element={<AnalysisLeadSource />} />
        {/* Memberships */}
        <Route path="memberships/plans" element={<MembershipPlans />} />
        <Route path="memberships/subscriptions" element={<MembershipSubscriptions />} />
        <Route path="memberships/coupon" element={<MembershipCoupon />} />
        <Route path="memberships/combo" element={<MembershipCombo />} />
        {/* Batches & Classes */}
        <Route path="batches/add" element={<BatchesAdd />} />
        <Route path="batches/list" element={<BatchesList />} />
        <Route path="batches/bookings" element={<BatchesBookings />} />
        <Route path="batches/calendar" element={<BatchesCalendar />} />
        <Route path="batches/program" element={<BatchesProgram />} />
        {/* Accounts */}
        <Route path="accounts/registers" element={<AccountsRegisters />} />
        <Route path="accounts/payroll" element={<AccountsPayroll />} />
        <Route path="accounts/expense" element={<AccountsExpense />} />
        {/* Notifications */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="notifications/whatsapp" element={<NotificationsWhatsApp />} />
        <Route path="notifications/sms" element={<NotificationsSMS />} />
        <Route path="notifications/email" element={<NotificationsEmail />} />
        {/* Trainers */}
        <Route path="trainers/add" element={<TrainersAdd />} />
        <Route path="trainers/list" element={<TrainersList />} />
        <Route path="trainers/transformations" element={<TrainersTransformations />} />
        <Route path="trainers/leave" element={<TrainersLeave />} />
        {/* Settings - Fitness Center */}
        <Route path="settings/fitness-centers" element={<SettingsFitnessCenters />} />
        <Route path="settings/fitness-settings" element={<SettingsFitnessSettings />} />
        <Route path="settings/biometric" element={<SettingsBiometric />} />
        <Route path="settings/equipment" element={<SettingsEquipment />} />
        <Route path="settings/notices" element={<SettingsNotices />} />
        <Route path="settings/holiday" element={<SettingsHoliday />} />
        <Route path="settings/feedback" element={<SettingsFeedback />} />
        {/* Staff */}
        <Route path="staff/add" element={<StaffAdd />} />
        <Route path="staff/list" element={<StaffList />} />
        <Route path="staff/access" element={<StaffAccess />} />
        <Route path="staff/target" element={<StaffTarget />} />
        {/* Attendance */}
        <Route path="attendance/staff" element={<AttendanceStaff />} />
        <Route path="attendance/client" element={<AttendanceClient />} />
        <Route path="attendance/leaderboard" element={<AttendanceLeaderboard />} />
        {/* App Settings */}
        <Route path="app-settings/permissions" element={<AppSettingsPermissions />} />
        <Route path="app-settings/services" element={<AppSettingsServices />} />
        <Route path="app-settings/gallery" element={<AppSettingsGallery />} />
        <Route path="app-settings/actions" element={<AppSettingsActions />} />
        <Route path="app-settings/banner" element={<AppSettingsBanner />} />
        <Route path="app-settings/social" element={<AppSettingsSocial />} />
        <Route path="app-settings/measurements" element={<AppSettingsMeasurements />} />
        <Route path="app-settings/workouts" element={<AppSettingsWorkouts />} />
        <Route path="app-settings/community" element={<AppSettingsCommunity />} />
        <Route path="app-settings/challenges" element={<AppSettingsChallenges />} />
        {/* Tutorial */}
        <Route path="tutorial/videos" element={<TutorialVideos />} />
        <Route path="tutorial/faq" element={<TutorialFAQ />} />
        {/* More */}
        <Route path="appointments" element={<Appointments />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="ecommerce" element={<Ecommerce />} />
      </Route>
      <Route path="/trainer" element={<TrainerLayout />}>
        <Route index element={<TrainerDashboard />} />
        <Route path="dashboard" element={<TrainerDashboard />} />
        <Route path="clients" element={<TrainerClients />} />
        <Route path="schedule" element={<TrainerSchedule />} />
      </Route>
    </Routes>
  )
}
