import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import './styles/EsisaPlatform.css';
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  ChevronDown,
  Facebook,
  Globe2,
  GraduationCap,
  Handshake,
  Instagram,
  Layers,
  LineChart,
  Moon,
  Network,
  Send,
  Radar,
  School,
  ShieldCheck,
  Youtube,
  Linkedin,
  Sun,
  Users,
} from 'lucide-react';

const ESISA_COLORS = {
  blue: '#2563EB',
};

/* ------------------------------------------------
   LOADING SCREEN
   ------------------------------------------------ */
const LoadingScreen = () => (
  <motion.div
    className="loading-screen"
    exit={{ opacity: 0, transition: { duration: 0.7 } }}
  >
    <motion.div
      className="loading-blob-left"
      animate={{ x: [0, 30, 0] }}
      transition={{ duration: 2.8, repeat: Infinity }}
    />
    <motion.div
      className="loading-blob-right"
      animate={{ x: [0, -24, 0] }}
      transition={{ duration: 3.2, repeat: Infinity }}
    />

    <div className="loading-content">
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        src="/loading-intro.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="loading-video"
      />
      <p className="loading-text">Designing the education network</p>
    </div>

    <div className="loading-bar">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        className="loading-bar-fill"
      />
    </div>
  </motion.div>
);

/* ------------------------------------------------
   CONNECTION VISUALIZATION
   ------------------------------------------------ */
const ConnectionVisualization = () => {
  const nodes = [
    { icon: <Users size={20} />, label: 'Students', colorClass: 'students', x: '-26%', y: '-26%' },
    { icon: <School size={20} />, label: 'Schools', colorClass: 'schools', x: '26%', y: '-26%' },
    { icon: <BriefcaseBusiness size={20} />, label: 'Corporate', colorClass: 'corporate', x: '0%', y: '28%' },
  ];

  return (
    <div className="connection-container">
      <div className="connection-gradient" />

      <motion.div
        className="connection-ring-outer"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="connection-ring-inner"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Central hub */}
      <motion.div whileHover={{ scale: 1.03 }} className="connection-hub">
        <div className="hub-icon">
          <Network size={28} />
        </div>
        <p className="hub-label">Core intelligence</p>
        <p className="hub-title">ESISA HUB</p>
      </motion.div>

      {/* Satellite nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.22 + 0.15, duration: 0.5 }}
          className="connection-node"
          style={{ left: `calc(50% + ${node.x})`, top: `calc(50% + ${node.y})` }}
        >
          <motion.div className={`node-icon ${node.colorClass}`} whileHover={{ y: -4 }}>
            {node.icon}
          </motion.div>
          <span className="node-label">{node.label}</span>

          <svg className="connection-line-svg">
            <motion.line
              x1="0"
              y1="0"
              x2={node.x === '-26%' ? 100 : node.x === '26%' ? -100 : 0}
              y2={node.y === '-26%' ? 80 : -90}
              stroke={ESISA_COLORS.blue}
              strokeWidth="2"
              strokeDasharray="8 6"
              animate={{ strokeDashoffset: [-20, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/* ------------------------------------------------
   MAIN COMPONENT
   ------------------------------------------------ */
export default function EsisaPlatform() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

  return (
    <div className="page-root" data-theme={darkMode ? 'dark' : 'light'}>

      {/* Loading intro */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Parallax background */}
      <motion.div className="parallax-bg" style={{ y: driftY }}>
        <div className="bg-blobs" />
        <div className="bg-grid" />
      </motion.div>

      {/* ==================== NAVIGATION ==================== */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <img src="/esisa-logo.svg" alt="ESISA logo" className="navbar-logo" />
            <div>
              <p className="navbar-title">ESISA</p>
              <p className="navbar-subtitle">Education Network Layer</p>
            </div>
          </div>

          <div className="navbar-links">
            {['Overview', 'Platform', 'Partners', 'Outcomes'].map((item) => (
              <button key={item} className="nav-link">{item}</button>
            ))}
          </div>

          <div className="navbar-actions">
            <button onClick={() => setDarkMode((prev) => !prev)} aria-label="Toggle dark mode" className="dark-mode-toggle">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="btn-book-call">Login</button>
            <button className="btn-nav-demo">Start now</button>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <header className="hero-section">
        <motion.div
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-badge">
            <Radar size={13} />
            ESISA Student Career Platform
          </span>

          <h1 className="hero-title">
            Connecting ESISA
            <span className="hero-title-blue">students with</span>
            <span className="hero-title-gold">collaborating companies</span>
          </h1>

          <p className="hero-description">
            Our AI-powered platform helps ESISA students build strong CVs, generate motivation letters, and connect directly to companies that partner with our school.
          </p>

          <div className="hero-buttons">
            <button className="btn-explore">
              Explore AI Platform
              <ArrowRight className="btn-explore-arrow" size={18} />
            </button>
            <button className="btn-vision">Our Vision</button>
          </div>
        </motion.div>

        {/* Right side — panel */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.65 }}
          className="relative"
        >
          <div className="hero-panel-blur" />
          <div className="hero-panel">
            <motion.div
              className="panel-blob-left"
              animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="panel-blob-right"
              animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <div className="panel-content">
              <div className="panel-header">
                <div className="panel-header-left">
                  <img src="/esisa-logo.svg" alt="ESISA logo" className="panel-header-logo" />
                  <div>
                    <p className="panel-header-label">Identity Layer</p>
                    <p className="panel-header-title">ESISA x Company Collaboration Network</p>
                  </div>
                </div>
                <p className="panel-live-badge">Live</p>
              </div>
              <ConnectionVisualization />
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="scroll-hint"
        >
          <ChevronDown size={30} />
        </motion.div>
      </header>

      {/* ==================== FEATURES ==================== */}
      <section className="features-section">
        {[
          { icon: <GraduationCap size={20} />, title: 'AI CV Builder', desc: 'Students generate professional CVs instantly using smart profile guidance.' },
          { icon: <School size={20} />, title: 'Motivation Letter Generator', desc: 'AI creates personalized motivation letters adapted to each company and role.' },
          { icon: <ShieldCheck size={20} />, title: 'CV Analysis Engine', desc: 'A model reads CVs, scores quality, and gives clear suggestions for improvement.' },
        ].map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ y: 26, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: i * 0.11, duration: 0.45 }}
            className="feature-card"
          >
            <div className="feature-icon">{item.icon}</div>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.desc}</p>
          </motion.article>
        ))}
      </section>

      {/* ==================== CAPABILITIES ==================== */}
      <section className="capabilities-section">
        <div className="capabilities-header">
          <div>
            <p className="section-label">Platform capabilities</p>
            <h2 className="section-title">AI services for ESISA students</h2>
          </div>
          <p className="section-description">
            This is not a simple listing website. It is an intelligent assistant platform that helps students prepare and match with real opportunities from ESISA partner companies.
          </p>
        </div>

        <div className="capabilities-grid">
          {[
            { title: 'Smart Company Matching', desc: 'Students are matched with collaborating companies based on profile and goals.' },
            { title: 'Document Optimization', desc: 'AI improves CV and motivation letter quality before submission.' },
            { title: 'Feedback and Readiness Score', desc: 'The CV analysis model provides actionable feedback and readiness scoring.' },
          ].map((feature, i) => (
            <motion.article
              key={feature.title}
              whileHover={{ y: -6 }}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.08, duration: 0.44 }}
              className="capability-card"
            >
              <div className="capability-card-corner" />
              <h3 className="capability-title">{feature.title}</h3>
              <p className="capability-desc">{feature.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ==================== WORKFLOW & TIMELINE ==================== */}
      <section className="workflow-section">
        <div className="workflow-grid">
          {/* Left — workflow */}
          <div className="workflow-panel">
            <p className="section-label">Operational Clarity</p>
            <h3 className="section-title" style={{ marginTop: '0.75rem' }}>One workflow for student success</h3>
            <div className="workflow-items">
              {[
                { icon: <LineChart size={18} />, t: 'Profile Scoring', d: 'Evaluate profile completeness and role fit before applications.' },
                { icon: <Handshake size={18} />, t: 'Company Collaboration', d: 'Only opportunities from companies collaborating with ESISA are prioritized.' },
                { icon: <Layers size={18} />, t: 'AI Writing Assistant', d: 'Generate CV sections and motivation letters in a professional style.' },
                { icon: <Globe2 size={18} />, t: 'Opportunity Visibility', d: 'Students see relevant roles, requirements, and preparation tips clearly.' },
              ].map((item) => (
                <article key={item.t} className="workflow-item">
                  <div className="workflow-item-icon">{item.icon}</div>
                  <h4 className="workflow-item-title">{item.t}</h4>
                  <p className="workflow-item-desc">{item.d}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div className="timeline-panel">
            <p className="timeline-label">Visibility Timeline</p>
            <h3 className="timeline-title">From student profile to company opportunity</h3>
            <div className="timeline-steps">
              {[
                { m: '01', t: 'Student Profile Setup', d: 'Student enters skills, education, and target roles.', icon: <Users size={16} /> },
                { m: '02', t: 'AI Document Generation', d: 'Platform generates CV and motivation letter drafts.', icon: <School size={16} /> },
                { m: '03', t: 'CV Analysis & Improvement', d: 'Model evaluates CV and suggests improvements.', icon: <BriefcaseBusiness size={16} /> },
                { m: '04', t: 'Company Matching', d: 'Student is matched with ESISA partner companies.', icon: <Clock3 size={16} /> },
              ].map((step) => (
                <div key={step.m} className="timeline-step">
                  <div className="step-icon">{step.icon}</div>
                  <div>
                    <p className="step-number">Step {step.m}</p>
                    <p className="step-title">{step.t}</p>
                    <p className="step-desc">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ECOSYSTEM ==================== */}
      <section className="ecosystem-section">
        <div className="ecosystem-card">
          <p className="ecosystem-title">Trusted ecosystem snapshot</p>
          <div className="ecosystem-tags">
            {['School Network', 'Tech Partners', 'HR Teams', 'Faculty Board', 'Career Office', 'Mentor Pool', 'Student Labs', 'Alumni Link'].map((name) => (
              <div key={name} className="ecosystem-tag">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CALL TO ACTION ==================== */}
      <section className="cta-section">
        <div className="cta-inner">
          <div>
            <p className="cta-label">Next step</p>
            <h3 className="cta-title">Launch ESISA AI career assistant</h3>
            <p className="cta-desc">
              Help every ESISA student create stronger applications and access real opportunities from collaborating companies.
            </p>
          </div>
          <button className="btn-cta">
            Request Demo
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-block">
            <div className="footer-brand">
              <img src="/esisa-logo.svg" alt="ESISA logo" className="footer-logo" />
              <span className="footer-brand-name">ESISA</span>
            </div>
            <p className="footer-note">
              Plateforme carrière ESISA pour les stages, l’alternance et la mise en relation avec les entreprises partenaires.
            </p>
            <div className="footer-pills" aria-label="Footer highlights">
              <span>AI matching</span>
              <span>CV analysis</span>
              <span>Partner network</span>
            </div>
          </div>

          <div className="footer-links-group">
            <p className="footer-links-title">Platform</p>
            <div className="footer-links">
              <a href="#">Overview</a>
              <a href="#">Partners</a>
              <a href="#">Contact</a>
            </div>
          </div>

          <div className="footer-social-newsletter">
            <div className="footer-social-block">
              <p className="footer-links-title">Suivez l’école d'ingénieurs ESISA</p>
              <div className="footer-social-icons" aria-label="Social links">
                <a href="#" className="footer-social-icon facebook" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#" className="footer-social-icon instagram" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className="footer-social-icon youtube" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="#" className="footer-social-icon linkedin" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <div className="footer-newsletter-block">
              <p className="footer-links-title">Newsletter ESISA</p>
              <p className="footer-newsletter-text">
                Recevez les actualités, dates clés d'inscription et événements de l'école d'ingénieurs.
              </p>
              <form className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  aria-label="Votre adresse e-mail"
                />
                <button type="submit" aria-label="S'inscrire à la newsletter">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          <div className="footer-meta">
            <p className="footer-copyright">Copyright 2026 ESISA Ecosystem. All rights reserved.</p>
            <a href="#" className="footer-privacy-link">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}