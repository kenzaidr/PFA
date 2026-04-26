import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import UseAnimations from 'react-useanimations';
import mail from 'react-useanimations/lib/mail';
import '../styles/LoginPage.css';

export default function ForgotPasswordPage() {
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend password reset
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setResetEmail('');
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="login-root" data-theme={darkMode ? 'dark' : 'light'}>
      {/* Ambient background */}
      <div className="login-bg">
        <div className="login-bg-grain" />
        <div className="login-bg-glow login-bg-glow--1" />
        <div className="login-bg-glow login-bg-glow--2" />
        <div className="login-bg-grid" />
      </div>

      {/* Top bar */}
      <header className="login-topbar">
        <Link to="/login" className="login-back-link">
          <ArrowLeft size={18} />
          <span>Back to login</span>
        </Link>
        <button
          className="login-theme-toggle"
          onClick={() => setDarkMode((p) => !p)}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Main card */}
      <main className="login-main">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand header */}
          <div className="login-brand">
            <img src="/esisa-logo.svg" alt="ESISA" className="login-brand-logo" />
            <div>
              <p className="login-brand-name">ESISA</p>
              <p className="login-brand-sub">Career Platform</p>
            </div>
          </div>

          <h1 className="login-heading">Reset your password</h1>
          <p className="login-subheading">
            Enter the email associated with your account and we'll send a reset link.
          </p>

          {resetSent ? (
            <motion.div
              className="login-success-msg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p>Check your inbox! A reset link has been sent.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleResetPassword} className="login-form">
              <div className="login-field">
                <label htmlFor="reset-email" className="login-label">Email address</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">
                    <UseAnimations animation={mail} size={22} strokeColor={darkMode ? '#94A3B8' : '#64748B'} />
                  </span>
                  <input
                    id="reset-email"
                    type="email"
                    placeholder="you@esisa.ac.ma"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="login-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="login-submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                id="reset-submit"
              >
                Send reset link
                <ChevronRight size={18} />
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Decorative side quote — desktop only */}
        <motion.aside
          className="login-aside"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <blockquote className="login-quote">
            <p>"The best way to predict your future is to create it."</p>
            <cite>— Abraham Lincoln</cite>
          </blockquote>
          <div className="login-aside-dots">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="login-aside-dot" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </div>
        </motion.aside>
      </main>
    </div>
  );
}
