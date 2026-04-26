import EsisaPlatform from './EsisaPlatform';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EsisaPlatform />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
