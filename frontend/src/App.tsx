import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EsisaPlatform from './EsisaPlatform';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';
import StudentDashboard from './pages/student/StudentDashboard';
import DashboardOverview from './pages/student/DashboardOverview';
import DashboardLearning from './pages/student/DashboardLearning';
import OpportunitiesPage from './pages/student/OpportunitiesPage';
import CVLettersPage from './pages/student/CVLettersPage';
import StudentSettingsPage from './pages/student/SettingsPage';

// Recruiter Dashboard
import RecruiterLayout from './pages/recruiter/RecruiterLayout';
import RecruiterOverview from './pages/recruiter/Overview';
import Candidates from './pages/recruiter/Candidates';
import JobPostings from './pages/recruiter/JobPostings';
import Settings from './pages/recruiter/Settings';
import Calendar from './pages/recruiter/Calendar';
import Notebook from './pages/recruiter/Notebook';
import Pipeline from './pages/recruiter/Pipeline';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EsisaPlatform />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/overview" element={<DashboardOverview />} />
        <Route path="/student/learning" element={<DashboardLearning />} />
        <Route path="/student/opportunities" element={<OpportunitiesPage />} />
        <Route path="/student/cv-letters" element={<CVLettersPage />} />
        <Route path="/student/settings" element={<StudentSettingsPage />} />
        
        {/* Recruiter Dashboard Routes */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<RecruiterOverview />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="jobs" element={<JobPostings />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="notebook" element={<Notebook />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
