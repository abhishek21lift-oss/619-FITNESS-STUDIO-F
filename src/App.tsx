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
import Members from './pages/dashboard/Members'
import Billing from './pages/dashboard/Billing'
import Attendance from './pages/dashboard/Attendance'
import Staff from './pages/dashboard/Staff'
import Reports from './pages/dashboard/Reports'
import Classes from './pages/dashboard/Classes'
import Leads from './pages/dashboard/Leads'
import Plans from './pages/dashboard/Plans'
import Settings from './pages/dashboard/Settings'
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
        <Route
          path="/digital-marketing-for-gyms-and-fitness-clubs"
          element={<DigitalMarketing />}
        />
      </Route>
      <Route path="/fitness-center/login" element={<AdminLogin />} />
      <Route path="/trainer-dashboard/login" element={<TrainerLogin />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="members" element={<Members />} />
        <Route path="billing" element={<Billing />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="staff" element={<Staff />} />
        <Route path="reports" element={<Reports />} />
        <Route path="classes" element={<Classes />} />
        <Route path="leads" element={<Leads />} />
        <Route path="plans" element={<Plans />} />
        <Route path="settings" element={<Settings />} />
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
