import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './styles/EsisaPlatform.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
  BrainCircuit,
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
const ORBIT_DURATION = 24; // seconds per full revolution

const ConnectionVisualization = () => {
  const nodes = [
    { icon: <Users size={20} />, label: 'Students', colorClass: 'students', ringClass: 'ring-node--students' },
    { icon: <School size={20} />, label: 'Schools', colorClass: 'schools', ringClass: 'ring-node--schools' },
    { icon: <BriefcaseBusiness size={20} />, label: 'Corporate', colorClass: 'corporate', ringClass: 'ring-node--corporate' },
  ];

  return (
    <div className="connection-container">
      <div className="connection-gradient" />

      {/* Outer ring — centered anchor, ring rotates around hub center */}
      <div className="connection-ring-outer-anchor">
        <motion.div
          className="connection-ring-outer"
          animate={{ rotate: 360 }}
          transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orbital-dot orbital-dot--1" />
          <div className="orbital-dot orbital-dot--2" />

          {/* 3 nodes on the ring at 0°, 120°, 240° */}
          {nodes.map((node, i) => {
            const angle = i * 120;
            return (
              <div
                key={node.label}
                className={`ring-node ${node.ringClass}`}
                style={{ '--node-angle': `${angle}deg` } as React.CSSProperties}
              >
                <motion.div
                  className="ring-node-inner"
                  style={{ rotate: -angle }}
                  animate={{ rotate: -angle - 360 }}
                  transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
                >
                  <div className={`node-icon ${node.colorClass}`}>{node.icon}</div>
                  <span className="node-label">{node.label}</span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Inner ring — centered anchor, spins opposite direction */}
      <div className="connection-ring-inner-anchor">
        <motion.div
          className="connection-ring-inner"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <div className="orbital-dot orbital-dot--3" />
        </motion.div>
      </div>

      {/* Central hub — exact center anchor */}
      <div className="connection-hub-anchor">
        <motion.div whileHover={{ scale: 1.05 }} className="connection-hub">
          <motion.div
            className="hub-icon"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BrainCircuit size={28} />
          </motion.div>
          <p className="hub-label">Core intelligence</p>
          <p className="hub-title">ESISA AI</p>
        </motion.div>
      </div>
    </div>
  );
};

/* ------------------------------------------------
   MAIN COMPONENT
   ------------------------------------------------ */
export default function EsisaPlatform() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const universityPartners = [
    { name: 'ENSIIE', logo: 'ensiiie.png' },
    { name: 'Polytech Marseille (Aix-Marseille Universite)', logo: 'polytech_marseille.png', zoom: 1.12 },
    { name: "EiL Cote d'Opale (Ecole d'Ingenieurs du Littoral)", logo: 'eil_cote_dopale.png' },
    { name: 'ISIMA (Institut Superieur d Informatique, de Modelisation et de leurs Applications)', logo: 'isima.png', zoom: 1.12 },
    { name: 'Universite Lumiere Lyon 2', logo: 'uni_lumiere_lyon2.png' },
    { name: 'Aix-Marseille Universite', logo: 'aix_marseille_uni.png', zoom: 1.1 },
    { name: 'Universite de Lorraine', logo: 'université-lorraine.png', zoom: 1.2 },
    { name: 'Universite Paris 8 (Vincennes-Saint-Denis)', logo: 'uni_paris8.png' },
    { name: 'Universite de Bourgogne (uB)', logo: 'uni_bourgogne.png' },
    { name: 'ULCO (Universite du Littoral Cote d Opale)', logo: 'ulco.png' },
    { name: 'UCA (Universite Clermont Auvergne)', logo: 'uca_clermont.png', zoom: 1.12 },
    { name: 'Universite Sorbonne Paris Nord', logo: 'uni_sorbonne_parisnord.png', zoom: 1.08 },
    { name: 'Universite de Lille', logo: 'uni_lille.png', zoom: 1.12 },
    { name: 'LIS (Laboratoire d Informatique & Systemes)', logo: 'lis_lab.png', zoom: 1.24 },
    { name: 'Universite Cote d Azur', logo: 'uni_cote_dazur.png', zoom: 1.12 },
    { name: 'INP Isima (Clermont Auvergne)', logo: 'inp_isima.png', zoom: 1.15 },
    { name: 'Systemes Numeriques pour l Humain (SNH)', logo: 'snh_lab.png', zoom: 1.24 },
  ];
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      {!loading && <Navbar scrolled={scrolled} darkMode={darkMode} setDarkMode={setDarkMode} />}

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
            <Link to="/student" className="btn-explore">
              Explore AI Platform
              <ArrowRight className="btn-explore-arrow" size={18} />
            </Link>
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

      {/* ==================== MARQUEE ==================== */}
      <div className="marquee-section">
        <div className="marquee-label">Powered by ESISA</div>
        <div className="marquee-track">
          <div className="marquee-content">
            {[
              'AI CV Builder',
              'Smart Matching',
              'Motivation Letters',
              'Career Analytics',
              'ESISA Network',
              'Skills Assessment',
              'Company Partners',
              'Student Profiles',
              'CV Analysis',
              'Job Recommendations',
            ].map((item, i) => (
              <span key={`a-${i}`} className="marquee-item">
                <span className="marquee-dot" />
                {item}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {[
              'AI CV Builder',
              'Smart Matching',
              'Motivation Letters',
              'Career Analytics',
              'ESISA Network',
              'Skills Assessment',
              'Company Partners',
              'Student Profiles',
              'CV Analysis',
              'Job Recommendations',
            ].map((item, i) => (
              <span key={`b-${i}`} className="marquee-item">
                <span className="marquee-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

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

      <div className="marquee-section marquee-section--universities">
        <div className="marquee-label">Our Collaborating Universities</div>
        <div className="marquee-track marquee-track--logos">
          <div className="marquee-content">
            {universityPartners.map((university, i) => (
              <span key={`u-a-${i}`} className="marquee-item marquee-item--logo" title={university.name}>
                <span
                  className="partner-logo-box"
                  aria-hidden="true"
                  style={{ '--logo-zoom': `${university.zoom ?? 1}` } as React.CSSProperties}
                >
                  <img
                    src={`/assets/${university.logo}`}
                    alt={`${university.name} logo`}
                    className="partner-logo"
                    loading="lazy"
                  />
                </span>
                <span className="partner-name">{university.name}</span>
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {universityPartners.map((university, i) => (
              <span key={`u-b-${i}`} className="marquee-item marquee-item--logo" title={university.name}>
                <span
                  className="partner-logo-box"
                  aria-hidden="true"
                  style={{ '--logo-zoom': `${university.zoom ?? 1}` } as React.CSSProperties}
                >
                  <img
                    src={`/assets/${university.logo}`}
                    alt=""
                    className="partner-logo"
                    loading="lazy"
                  />
                </span>
                <span className="partner-name">{university.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}