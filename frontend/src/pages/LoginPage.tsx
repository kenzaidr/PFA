import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, ChevronRight, Sun, Moon } from 'lucide-react';
import UseAnimations from 'react-useanimations';
import lock from 'react-useanimations/lib/lock';
import mail from 'react-useanimations/lib/mail';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend auth
    console.log('Login:', { email, password });
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: wire to OAuth flow
    console.log('Social login:', provider);
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
        <Link to="/" className="login-back-link">
          <ArrowLeft size={18} />
          <span>Back to home</span>
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

          <h1 className="login-heading">Welcome back</h1>
          <p className="login-subheading">
            Sign in to access your dashboard and career tools.
          </p>

          {/* Social providers */}
          <div className="login-social-row">
            <button
              className="login-social-btn"
              onClick={() => handleSocialLogin('google')}
              id="login-google"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
            <button
              className="login-social-btn"
              onClick={() => handleSocialLogin('github')}
              id="login-github"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
            <button
              className="login-social-btn"
              onClick={() => handleSocialLogin('apple')}
              id="login-apple"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">or continue with email</span>
            <div className="login-divider-line" />
          </div>

          {/* Email & password form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label htmlFor="login-email" className="login-label">Email address</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <UseAnimations animation={mail} size={22} strokeColor={darkMode ? '#94A3B8' : '#64748B'} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@esisa.ac.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="login-password" className="login-label">Password</label>
                <Link to="/forgot-password" className="login-forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <UseAnimations animation={lock} size={22} strokeColor={darkMode ? '#94A3B8' : '#64748B'} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="login-submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              id="login-submit"
            >
              Sign in
              <ChevronRight size={18} />
            </motion.button>
          </form>

          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link to="/signup" className="login-signup-link">Create one</Link>
          </p>
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
