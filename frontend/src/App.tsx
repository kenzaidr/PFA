import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EsisaPlatform from './EsisaPlatform';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';
import DashboardOverview from './pages/student/DashboardOverview';
import DashboardLearning from './pages/student/DashboardLearning';
import OpportunitiesPage from './pages/student/OpportunitiesPage';
import CVLettersPage from './pages/student/CVLettersPage';
import SettingsPage from './pages/student/SettingsPage';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EsisaPlatform />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard/overview" element={<DashboardOverview />} />
        <Route path="/dashboard/learning" element={<DashboardLearning />} />
        <Route path="/dashboard/opportunities" element={<OpportunitiesPage />} />
        <Route path="/dashboard/cv-letters" element={<CVLettersPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
