import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EsisaPlatform from './EsisaPlatform';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';

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
