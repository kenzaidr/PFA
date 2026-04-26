import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Eye, EyeOff, ChevronRight,
  Sun, Moon, GraduationCap, Briefcase, Check,
} from 'lucide-react';
import UseAnimations from 'react-useanimations';
import lock from 'react-useanimations/lib/lock';
import mail from 'react-useanimations/lib/mail';
import '../styles/LoginPage.css';
import '../styles/SignUpPage.css';

type Role = 'student' | 'recruiter';

const STEPS = [
  { label: 'Role', number: 1 },
  { label: 'Details', number: 2 },
  { label: 'Security', number: 3 },
];

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Student-specific
  const [studentId, setStudentId] = useState('');
  const [program, setProgram] = useState('');

  // Recruiter-specific
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

  const handleSignUp = () => {
    // TODO: wire to backend registration
    const payload = role === 'student'
      ? { role, fullName, email, password, studentId, program }
      : { role, fullName, email, password, companyName, jobTitle };
    console.log('Sign up:', payload);
  };

  const handleSocialSignUp = (provider: string) => {
    // TODO: wire to OAuth flow
    console.log('Social sign up:', provider, 'as', role);
  };

  /* Step validation */
  const canProceedStep1 = role !== undefined;
  const canProceedStep2 = fullName.trim() && email.trim() &&
    (role === 'student' ? studentId.trim() && program.trim() : companyName.trim() && jobTitle.trim());
  const canSubmit = password.length >= 8 && password === confirmPassword && agreed;

  const next = () => { if (step < 3) setStep(step + 1); };
  const back = () => { if (step > 1) setStep(step - 1); };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);
  const goNext = () => { setDirection(1); next(); };
  const goBack = () => { setDirection(-1); back(); };

  const iconColor = darkMode ? '#94A3B8' : '#64748B';

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

      {/* Main */}
      <main className="login-main">
        <motion.div
          className="login-card signup-card"
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

          {/* Step progress */}
          <div className="signup-progress">
            {STEPS.map((s, i) => (
              <div key={s.number} className="signup-progress-item">
                <div className={`signup-step-dot ${step > s.number ? 'signup-step-dot--done' : ''} ${step === s.number ? 'signup-step-dot--active' : ''}`}>
                  {step > s.number ? <Check size={14} strokeWidth={3} /> : s.number}
                </div>
                <span className={`signup-step-label ${step >= s.number ? 'signup-step-label--active' : ''}`}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`signup-step-line ${step > s.number ? 'signup-step-line--done' : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Animated step content */}
          <AnimatePresence mode="wait" custom={direction}>
            {/* ========== STEP 1: ROLE ========== */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              >
                <h2 className="signup-step-title">I am a…</h2>
                <p className="login-subheading">Choose your role to get started.</p>

                <div className="signup-role-cards">
                  <button
                    type="button"
                    className={`signup-role-card ${role === 'student' ? 'signup-role-card--active' : ''}`}
                    onClick={() => setRole('student')}
                    id="role-student"
                  >
                    <div className="signup-role-card-icon">
                      <GraduationCap size={28} />
                    </div>
                    <p className="signup-role-card-title">Student</p>
                    <p className="signup-role-card-desc">Looking for internships & career opportunities</p>
                  </button>
                  <button
                    type="button"
                    className={`signup-role-card ${role === 'recruiter' ? 'signup-role-card--active' : ''}`}
                    onClick={() => setRole('recruiter')}
                    id="role-recruiter"
                  >
                    <div className="signup-role-card-icon">
                      <Briefcase size={28} />
                    </div>
                    <p className="signup-role-card-title">Recruiter</p>
                    <p className="signup-role-card-desc">Hiring talent from ESISA partner network</p>
                  </button>
                </div>

                {/* Divider */}
                <div className="login-divider" style={{ marginTop: '1.5rem' }}>
                  <div className="login-divider-line" />
                  <span className="login-divider-text">or sign up with</span>
                  <div className="login-divider-line" />
                </div>

                {/* Social providers */}
                <div className="login-social-row">
                  <button className="login-social-btn" onClick={() => handleSocialSignUp('google')} id="signup-google">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button className="login-social-btn" onClick={() => handleSocialSignUp('github')} id="signup-github">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </button>
                  <button className="login-social-btn" onClick={() => handleSocialSignUp('apple')} id="signup-apple">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>

                <div className="signup-actions">
                  <div />
                  <motion.button
                    type="button"
                    className="login-submit signup-btn-next"
                    onClick={goNext}
                    disabled={!canProceedStep1}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ========== STEP 2: DETAILS ========== */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              >
                <h2 className="signup-step-title">
                  {role === 'student' ? 'Student details' : 'Company details'}
                </h2>
                <p className="login-subheading">Tell us a bit about yourself.</p>

                <div className="login-form">
                  {/* Full name */}
                  <div className="login-field">
                    <label htmlFor="signup-name" className="login-label">Full name</label>
                    <div className="login-input-wrap">
                      <span className="login-input-icon signup-icon-text">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        id="signup-name"
                        type="text"
                        placeholder="Ahmed Bennani"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="login-input"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="login-field">
                    <label htmlFor="signup-email" className="login-label">Email address</label>
                    <div className="login-input-wrap">
                      <span className="login-input-icon">
                        <UseAnimations animation={mail} size={22} strokeColor={iconColor} />
                      </span>
                      <input
                        id="signup-email"
                        type="email"
                        placeholder={role === 'student' ? 'you@esisa.ac.ma' : 'you@company.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {role === 'student' ? (
                    <div className="signup-row">
                      <div className="login-field">
                        <label htmlFor="signup-student-id" className="login-label">Student ID</label>
                        <div className="login-input-wrap">
                          <span className="login-input-icon signup-icon-text">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="5" width="20" height="14" rx="2" />
                              <line x1="2" y1="10" x2="22" y2="10" />
                            </svg>
                          </span>
                          <input
                            id="signup-student-id"
                            type="text"
                            placeholder="WA000000"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                            className="login-input"
                          />
                        </div>
                      </div>
                      <div className="login-field">
                        <label htmlFor="signup-program" className="login-label">Program / Year</label>
                        <div className="login-input-wrap">
                          <span className="login-input-icon signup-icon-text">
                            <GraduationCap size={18} color={iconColor} />
                          </span>
                          <input
                            id="signup-program"
                            type="text"
                            placeholder="3ème Année — IL"
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            required
                            className="login-input"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="signup-row">
                      <div className="login-field">
                        <label htmlFor="signup-company" className="login-label">Company name</label>
                        <div className="login-input-wrap">
                          <span className="login-input-icon signup-icon-text">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                          </span>
                          <input
                            id="signup-company"
                            type="text"
                            placeholder="Acme Corp"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            className="login-input"
                          />
                        </div>
                      </div>
                      <div className="login-field">
                        <label htmlFor="signup-jobtitle" className="login-label">Your position</label>
                        <div className="login-input-wrap">
                          <span className="login-input-icon signup-icon-text">
                            <Briefcase size={18} color={iconColor} />
                          </span>
                          <input
                            id="signup-jobtitle"
                            type="text"
                            placeholder="HR Manager"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                            className="login-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="signup-actions">
                  <button type="button" className="signup-btn-back" onClick={goBack}>
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <motion.button
                    type="button"
                    className="login-submit signup-btn-next"
                    onClick={goNext}
                    disabled={!canProceedStep2}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ========== STEP 3: SECURITY ========== */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              >
                <h2 className="signup-step-title">Secure your account</h2>
                <p className="login-subheading">Choose a strong password to protect your account.</p>

                <div className="login-form">
                  <div className="login-field">
                    <label htmlFor="signup-password" className="login-label">Password</label>
                    <div className="login-input-wrap">
                      <span className="login-input-icon">
                        <UseAnimations animation={lock} size={22} strokeColor={iconColor} />
                      </span>
                      <input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="login-input"
                        autoComplete="new-password"
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

                  <div className="login-field">
                    <label htmlFor="signup-confirm" className="login-label">Confirm password</label>
                    <div className="login-input-wrap">
                      <span className="login-input-icon">
                        <UseAnimations animation={lock} size={22} strokeColor={iconColor} />
                      </span>
                      <input
                        id="signup-confirm"
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className="login-input"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="login-eye-btn"
                        onClick={() => setShowConfirm((p) => !p)}
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="signup-mismatch">Passwords do not match</p>
                    )}
                  </div>

                  {/* Terms */}
                  <label className="signup-terms" htmlFor="signup-agree">
                    <input
                      type="checkbox"
                      id="signup-agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>
                      I agree to the{' '}
                      <a href="#" className="login-signup-link">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="login-signup-link">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <div className="signup-actions">
                  <button type="button" className="signup-btn-back" onClick={goBack}>
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <motion.button
                    type="button"
                    className="login-submit signup-btn-next"
                    onClick={handleSignUp}
                    disabled={!canSubmit}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    id="signup-submit"
                  >
                    Create account
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="login-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="login-signup-link">Sign in</Link>
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
            <p>"Education is the passport to the future."</p>
            <cite>— Malcolm X</cite>
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
