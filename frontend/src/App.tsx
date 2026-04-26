import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EsisaPlatform from './EsisaPlatform';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EsisaPlatform />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
