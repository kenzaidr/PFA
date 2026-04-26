import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EsisaPlatform from './EsisaPlatform';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EsisaPlatform />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
