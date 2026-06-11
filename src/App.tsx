import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'

// Landing page
const Home = lazy(() => import('./pages/Home'))

// Login
const Login = lazy(() => import('./pages/Login'))

// Dashboard & Auth
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Overview = lazy(() => import('./pages/dashboard/Overview'))

// Enquiry
const EnquiryAdd = lazy(() => import('./pages/dashboard/EnquiryAdd'))
const EnquiryList = lazy(() => import('./pages/dashboard/EnquiryList'))
const FollowUps = lazy(() => import('./pages/dashboard/FollowUps'))

// Members (Modularized paths)
const MembersAdd = lazy(() => import('./pages/dashboard/members/MembersAdd'))
const MembersQuickAdd = lazy(() => import('./pages/dashboard/members/MembersQuickAdd'))
const MembersDatabase = lazy(() => import('./pages/dashboard/members/MembersDatabase'))
const ClientProfile = lazy(() => import('./pages/dashboard/ClientProfile'))
const MembersReferrals = lazy(() => import('./pages/dashboard/members/MembersReferrals'))
const MembersBirthday = lazy(() => import('./pages/dashboard/members/MembersBirthday'))
const MembersOtherBranch = lazy(() => import('./pages/dashboard/members/MembersOtherBranch'))

// Analysis
const AnalysisTraffic = lazy(() => import('./pages/dashboard/AnalysisTraffic'))
const AnalysisMembers = lazy(() => import('./pages/dashboard/AnalysisMembers'))
const AnalysisCollection = lazy(() => import('./pages/dashboard/AnalysisCollection'))
const AnalysisSubscriptions = lazy(() => import('./pages/dashboard/AnalysisSubscriptions'))
const AnalysisRenewal = lazy(() => import('./pages/dashboard/AnalysisRenewal'))
const AnalysisFollowup = lazy(() => import('./pages/dashboard/AnalysisFollowup'))
const AnalysisConversion = lazy(() => import('./pages/dashboard/AnalysisConversion'))
const AnalysisEnquiry = lazy(() => import('./pages/dashboard/AnalysisEnquiry'))
const AnalysisExpense = lazy(() => import('./pages/dashboard/AnalysisExpense'))
const AnalysisProfitLoss = lazy(() => import('./pages/dashboard/AnalysisProfitLoss'))
const AnalysisBilling = lazy(() => import('./pages/dashboard/AnalysisBilling'))
const AnalysisSalesLeaderboard = lazy(() => import('./pages/dashboard/AnalysisSalesLeaderboard'))
const AnalysisRevenueForecast = lazy(() => import('./pages/dashboard/AnalysisRevenueForecast'))
const AnalysisLeadSource = lazy(() => import('./pages/dashboard/AnalysisLeadSource'))

// Memberships (Modularized paths)
const MembershipPlans = lazy(() => import('./pages/dashboard/members/MembershipPlans'))
const MembershipSubscriptions = lazy(() => import('./pages/dashboard/members/MembershipSubscriptions'))
const MembershipCoupon = lazy(() => import('./pages/dashboard/members/MembershipCoupon'))
const MembershipCombo = lazy(() => import('./pages/dashboard/members/MembershipCombo'))

// Batches & Classes
const BatchesAdd = lazy(() => import('./pages/dashboard/BatchesAdd'))
const BatchesList = lazy(() => import('./pages/dashboard/BatchesList'))
const BatchesBookings = lazy(() => import('./pages/dashboard/BatchesBookings'))
const BatchesCalendar = lazy(() => import('./pages/dashboard/BatchesCalendar'))
const BatchesProgram = lazy(() => import('./pages/dashboard/BatchesProgram'))

// Accounts
const AccountsRegisters = lazy(() => import('./pages/dashboard/AccountsRegisters'))
const AccountsPayroll = lazy(() => import('./pages/dashboard/AccountsPayroll'))
const AccountsExpense = lazy(() => import('./pages/dashboard/AccountsExpense'))

// Notifications (Modularized paths)
const Notifications = lazy(() => import('./pages/dashboard/notifications/Notifications'))
const NotificationsWhatsApp = lazy(() => import('./pages/dashboard/notifications/NotificationsWhatsApp'))
const NotificationsSMS = lazy(() => import('./pages/dashboard/notifications/NotificationsSMS'))
const NotificationsEmail = lazy(() => import('./pages/dashboard/notifications/NotificationsEmail'))

// Trainers (Modularized paths)
const TrainersAdd = lazy(() => import('./pages/dashboard/trainers/TrainersAdd'))
const TrainersList = lazy(() => import('./pages/dashboard/trainers/TrainersList'))
const TrainersTransformations = lazy(() => import('./pages/dashboard/trainers/TrainersTransformations'))
const TrainersLeave = lazy(() => import('./pages/dashboard/trainers/TrainersLeave'))

// Settings (Modularized paths)
const SettingsFitnessCenters = lazy(() => import('./pages/dashboard/settings/SettingsFitnessCenters'))
const SettingsFitnessSettings = lazy(() => import('./pages/dashboard/settings/SettingsFitnessSettings'))
const SettingsBiometric = lazy(() => import('./pages/dashboard/settings/SettingsBiometric'))
const SettingsEquipment = lazy(() => import('./pages/dashboard/settings/SettingsEquipment'))
const SettingsNotices = lazy(() => import('./pages/dashboard/settings/SettingsNotices'))
const SettingsHoliday = lazy(() => import('./pages/dashboard/settings/SettingsHoliday'))
const SettingsFeedback = lazy(() => import('./pages/dashboard/settings/SettingsFeedback'))

// Staff (Modularized paths)
const StaffAdd = lazy(() => import('./pages/dashboard/staff/StaffAdd'))
const StaffList = lazy(() => import('./pages/dashboard/staff/StaffList'))
const StaffAccess = lazy(() => import('./pages/dashboard/staff/StaffAccess'))
const StaffTarget = lazy(() => import('./pages/dashboard/staff/StaffTarget'))

// Attendance
const AttendanceStaff = lazy(() => import('./pages/dashboard/AttendanceStaff'))
const AttendanceClient = lazy(() => import('./pages/dashboard/AttendanceClient'))
const AttendanceLeaderboard = lazy(() => import('./pages/dashboard/AttendanceLeaderboard'))

// App Settings
const AppSettingsPermissions = lazy(() => import('./pages/dashboard/AppSettingsPermissions'))
const AppSettingsServices = lazy(() => import('./pages/dashboard/AppSettingsServices'))
const AppSettingsGallery = lazy(() => import('./pages/dashboard/AppSettingsGallery'))
const AppSettingsActions = lazy(() => import('./pages/dashboard/AppSettingsActions'))
const AppSettingsBanner = lazy(() => import('./pages/dashboard/AppSettingsBanner'))
const AppSettingsSocial = lazy(() => import('./pages/dashboard/AppSettingsSocial'))
const AppSettingsMeasurements = lazy(() => import('./pages/dashboard/AppSettingsMeasurements'))
const AppSettingsWorkouts = lazy(() => import('./pages/dashboard/AppSettingsWorkouts'))
const AppSettingsCommunity = lazy(() => import('./pages/dashboard/AppSettingsCommunity'))
const AppSettingsChallenges = lazy(() => import('./pages/dashboard/AppSettingsChallenges'))

// Tutorial
const TutorialVideos = lazy(() => import('./pages/dashboard/TutorialVideos'))
const TutorialFAQ = lazy(() => import('./pages/dashboard/TutorialFAQ'))

// More
const Appointments = lazy(() => import('./pages/dashboard/Appointments'))
const Wallet = lazy(() => import('./pages/dashboard/wallet/Wallet'))
const Ecommerce = lazy(() => import('./pages/dashboard/Ecommerce'))

// Trainer routes
const TrainerLayout = lazy(() => import('./layouts/TrainerLayout'))
const TrainerDashboard = lazy(() => import('./pages/trainer/Dashboard'))
const TrainerClients = lazy(() => import('./pages/trainer/Clients'))
const TrainerSchedule = lazy(() => import('./pages/trainer/Schedule'))

export default function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
        {/* Public pages — only Landing + Login */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/overview" element={<Overview />} />

          {/* Enquiry */}
          <Route path="/dashboard/enquiry/add" element={<EnquiryAdd />} />
          <Route path="/dashboard/enquiry/list" element={<EnquiryList />} />

          {/* Follow Ups */}
          <Route path="/dashboard/followups" element={<FollowUps />} />

          {/* Members */}
          <Route path="/dashboard/members/add" element={<MembersAdd />} />
          <Route path="/dashboard/members/quick-add" element={<MembersQuickAdd />} />
          <Route path="/dashboard/members/database" element={<MembersDatabase />} />
          <Route path="/dashboard/members/profile/:id" element={<ClientProfile />} />
          <Route path="/dashboard/members/referrals" element={<MembersReferrals />} />
          <Route path="/dashboard/members/birthday" element={<MembersBirthday />} />
          <Route path="/dashboard/members/other-branch" element={<MembersOtherBranch />} />

          {/* Analysis */}
          <Route path="/dashboard/analysis/traffic" element={<AnalysisTraffic />} />
          <Route path="/dashboard/analysis/members" element={<AnalysisMembers />} />
          <Route path="/dashboard/analysis/collection" element={<AnalysisCollection />} />
          <Route path="/dashboard/analysis/subscriptions" element={<AnalysisSubscriptions />} />
          <Route path="/dashboard/analysis/renewal" element={<AnalysisRenewal />} />
          <Route path="/dashboard/analysis/followup" element={<AnalysisFollowup />} />
          <Route path="/dashboard/analysis/conversion" element={<AnalysisConversion />} />
          <Route path="/dashboard/analysis/enquiry" element={<AnalysisEnquiry />} />
          <Route path="/dashboard/analysis/expense" element={<AnalysisExpense />} />
          <Route path="/dashboard/analysis/profit-loss" element={<AnalysisProfitLoss />} />
          <Route path="/dashboard/analysis/billing" element={<AnalysisBilling />} />
          <Route path="/dashboard/analysis/sales-leaderboard" element={<AnalysisSalesLeaderboard />} />
          <Route path="/dashboard/analysis/revenue-forecast" element={<AnalysisRevenueForecast />} />
          <Route path="/dashboard/analysis/lead-source" element={<AnalysisLeadSource />} />

          {/* Memberships */}
          <Route path="/dashboard/memberships/plans" element={<MembershipPlans />} />
          <Route path="/dashboard/memberships/subscriptions" element={<MembershipSubscriptions />} />
          <Route path="/dashboard/memberships/coupon" element={<MembershipCoupon />} />
          <Route path="/dashboard/memberships/combo" element={<MembershipCombo />} />

          {/* Batches & Classes */}
          <Route path="/dashboard/batches/add" element={<BatchesAdd />} />
          <Route path="/dashboard/batches/list" element={<BatchesList />} />
          <Route path="/dashboard/batches/bookings" element={<BatchesBookings />} />
          <Route path="/dashboard/batches/calendar" element={<BatchesCalendar />} />
          <Route path="/dashboard/batches/program" element={<BatchesProgram />} />

          {/* Accounts */}
          <Route path="/dashboard/accounts/registers" element={<AccountsRegisters />} />
          <Route path="/dashboard/accounts/payroll" element={<AccountsPayroll />} />
          <Route path="/dashboard/accounts/expense" element={<AccountsExpense />} />

          {/* Notifications */}
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/notifications/whatsapp" element={<NotificationsWhatsApp />} />
          <Route path="/dashboard/notifications/sms" element={<NotificationsSMS />} />
          <Route path="/dashboard/notifications/email" element={<NotificationsEmail />} />

          {/* Trainers */}
          <Route path="/dashboard/trainers/add" element={<TrainersAdd />} />
          <Route path="/dashboard/trainers/list" element={<TrainersList />} />
          <Route path="/dashboard/trainers/transformations" element={<TrainersTransformations />} />
          <Route path="/dashboard/trainers/leave" element={<TrainersLeave />} />

          {/* Settings - Fitness Center */}
          <Route path="/dashboard/settings/fitness-centers" element={<SettingsFitnessCenters />} />
          <Route path="/dashboard/settings/fitness-settings" element={<SettingsFitnessSettings />} />
          <Route path="/dashboard/settings/biometric" element={<SettingsBiometric />} />
          <Route path="/dashboard/settings/equipment" element={<SettingsEquipment />} />
          <Route path="/dashboard/settings/notices" element={<SettingsNotices />} />
          <Route path="/dashboard/settings/holiday" element={<SettingsHoliday />} />
          <Route path="/dashboard/settings/feedback" element={<SettingsFeedback />} />

          {/* Staff */}
          <Route path="/dashboard/staff/add" element={<StaffAdd />} />
          <Route path="/dashboard/staff/list" element={<StaffList />} />
          <Route path="/dashboard/staff/access" element={<StaffAccess />} />
          <Route path="/dashboard/staff/target" element={<StaffTarget />} />

          {/* Attendance */}
          <Route path="/dashboard/attendance/staff" element={<AttendanceStaff />} />
          <Route path="/dashboard/attendance/client" element={<AttendanceClient />} />
          <Route path="/dashboard/attendance/leaderboard" element={<AttendanceLeaderboard />} />

          {/* App Settings */}
          <Route path="/dashboard/app-settings/permissions" element={<AppSettingsPermissions />} />
          <Route path="/dashboard/app-settings/services" element={<AppSettingsServices />} />
          <Route path="/dashboard/app-settings/gallery" element={<AppSettingsGallery />} />
          <Route path="/dashboard/app-settings/actions" element={<AppSettingsActions />} />
          <Route path="/dashboard/app-settings/banner" element={<AppSettingsBanner />} />
          <Route path="/dashboard/app-settings/social" element={<AppSettingsSocial />} />
          <Route path="/dashboard/app-settings/measurements" element={<AppSettingsMeasurements />} />
          <Route path="/dashboard/app-settings/workouts" element={<AppSettingsWorkouts />} />
          <Route path="/dashboard/app-settings/community" element={<AppSettingsCommunity />} />
          <Route path="/dashboard/app-settings/challenges" element={<AppSettingsChallenges />} />

          {/* Tutorial */}
          <Route path="/dashboard/tutorial/videos" element={<TutorialVideos />} />
          <Route path="/dashboard/tutorial/faq" element={<TutorialFAQ />} />

          {/* More */}
          <Route path="/dashboard/appointments" element={<Appointments />} />
          <Route path="/dashboard/wallet" element={<Wallet />} />
          <Route path="/dashboard/ecommerce" element={<Ecommerce />} />
        </Route>

        {/* Trainer routes */}
        <Route path="/trainer" element={<TrainerLayout />}>
          <Route index element={<TrainerDashboard />} />
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="clients" element={<TrainerClients />} />
          <Route path="schedule" element={<TrainerSchedule />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
