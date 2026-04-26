import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, CheckCircle, Lock, Play, BarChart3, Settings,
  Bell, LogOut, Menu, X, Sun, Moon, Briefcase, FileText,
  Award, Zap, Target, Clock,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';

interface Module {
  id: number; title: string; description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number; duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
}

interface Skill {
  name: string; level: number; maxLevel: number; progress: number;
}

export default function DashboardLearning() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

  const studentName = 'Youssef Amrani';

  const navItems = [
    { label: 'Vue d\'ensemble', icon: <BarChart3 size={18} />, path: '/dashboard/overview', active: false },
    { label: 'Apprentissage', icon: <BookOpen size={18} />, path: '/dashboard/learning', active: true },
    { label: 'Opportunités', icon: <Briefcase size={18} />, path: '/dashboard/opportunities', active: false },
    { label: 'CV & Lettres', icon: <FileText size={18} />, path: '/dashboard/cv-letters', active: false },
    { label: 'Paramètres', icon: <Settings size={18} />, path: '/dashboard/settings', active: false },
  ];

  const modules: Module[] = [
    { id: 1, title: 'React Advanced Patterns', description: 'Maîtrisez les patterns avancés et l\'optimisation', status: 'in-progress', progress: 65, duration: '12h 30min', level: 'advanced', topics: ['Hooks', 'Context API', 'Performance'] },
    { id: 2, title: 'TypeScript Mastery', description: 'Types avancés et génériques', status: 'in-progress', progress: 45, duration: '8h 15min', level: 'intermediate', topics: ['Types', 'Génériques', 'Decorators'] },
    { id: 3, title: 'System Design', description: 'Préparez-vous aux entretiens système', status: 'locked', progress: 0, duration: '15h', level: 'advanced', topics: ['Architecture', 'Scalability', 'Patterns'] },
    { id: 4, title: 'Node.js & Express', description: 'Backends robustes et scalables', status: 'completed', progress: 100, duration: '10h 45min', level: 'advanced', topics: ['Middleware', 'Auth', 'Database'] },
    { id: 5, title: 'Database Design & SQL', description: 'Optimisez vos requêtes et architectures', status: 'completed', progress: 100, duration: '9h 30min', level: 'intermediate', topics: ['SQL', 'Optimization', 'NoSQL'] },
    { id: 6, title: 'DevOps & Deployment', description: 'Docker et Kubernetes', status: 'locked', progress: 0, duration: '14h', level: 'advanced', topics: ['Docker', 'K8s', 'CI/CD'] },
  ];

  const skills: Skill[] = [
    { name: 'React', level: 4, maxLevel: 5, progress: 85 },
    { name: 'TypeScript', level: 3, maxLevel: 5, progress: 65 },
    { name: 'Node.js', level: 4, maxLevel: 5, progress: 78 },
    { name: 'SQL', level: 3, maxLevel: 5, progress: 62 },
    { name: 'System Design', level: 2, maxLevel: 5, progress: 35 },
    { name: 'DevOps', level: 1, maxLevel: 5, progress: 15 },
  ];

  const totalProgress = Math.round(modules.reduce((a, m) => a + m.progress, 0) / modules.length);

  const levelLabels: Record<string, string> = { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' };

  return (
    <div className="dash-root" data-theme={darkMode ? 'dark' : 'light'}>
      {/* SIDEBAR */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-brand">
          <img src="/esisa-logo.svg" alt="ESISA" className="dash-brand-logo" />
          <div>
            <p className="dash-brand-name">ESISA</p>
            <p className="dash-brand-sub">Espace Étudiant</p>
          </div>
        </div>
        <nav className="dash-nav">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path} className={`dash-nav-item ${item.active ? 'active' : ''}`}>
              {item.icon} <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button className="dash-nav-logout" onClick={() => navigate('/')}>
          <LogOut size={18} /> <span>Déconnexion</span>
        </button>
      </aside>

      {/* MAIN */}
      <div className="dash-main">
        <header className="dash-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div>
              <p className="dash-greeting-sub">Bonjour,</p>
              <p className="dash-greeting-name">{studentName}</p>
            </div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" style={{ position: 'relative' }}>
              <Bell size={16} /><span className="dash-notif-dot" />
            </button>
            <button className="dash-header-btn" onClick={() => setDarkMode((p) => !p)}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <main className="dash-content">
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="dash-welcome-title">Votre Parcours d'Apprentissage</h1>
            <p className="dash-welcome-sub">Progressez à travers les compétences essentielles</p>
          </motion.div>

          {/* Progress Overview */}
          <div className="dash-stats" style={{ marginBottom: '1.5rem' }}>
            {[
              { label: 'Niveau Actuel', value: 'Intermédiaire', icon: <Award size={18} />, cls: '' },
              { label: 'Prochain Jalon', value: 'Advanced React', icon: <Target size={18} />, cls: 'purple' },
              { label: 'Temps Estimé', value: '24 heures', icon: <Clock size={18} />, cls: 'orange' },
              { label: 'Progression', value: `${totalProgress}%`, icon: <Zap size={18} />, cls: 'emerald' },
            ].map((s, i) => (
              <motion.div key={s.label} className="dash-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="dash-stat-top">
                  <div className={`dash-stat-icon ${s.cls}`}>{s.icon}</div>
                </div>
                <p className="dash-stat-label">{s.label}</p>
                <p className="dash-stat-value">{s.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Streak */}
          <motion.div className="dash-streak" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <Zap size={28} className="dash-streak-icon" />
            <div>
              <p className="dash-streak-text">14 jours de suite</p>
              <p className="dash-streak-sub">Continuez comme ça ! 🔥</p>
            </div>
          </motion.div>

          {/* Modules */}
          <div className="dash-section-header">
            <div>
              <h2 className="dash-section-title">Modules</h2>
              <p className="dash-section-sub">
                {modules.filter(m => m.status === 'in-progress').length} en cours • {modules.filter(m => m.status === 'completed').length} complétés
              </p>
            </div>
          </div>

          <div className="dash-modules" style={{ marginBottom: '2.5rem' }}>
            {modules.map((mod, i) => (
              <motion.div
                key={mod.id}
                className={`dash-module-card ${mod.status === 'locked' ? 'locked' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
              >
                <div className="dash-module-head">
                  <div style={{ flex: 1 }}>
                    <h3 className="dash-module-title">{mod.title}</h3>
                    <p className="dash-module-desc">{mod.description}</p>
                  </div>
                  <span className={`dash-level-badge ${mod.level}`}>{levelLabels[mod.level]}</span>
                </div>

                <div className="dash-progress-wrap">
                  <div className="dash-progress-labels">
                    <span>{mod.progress}%</span>
                    <span>{mod.duration}</span>
                  </div>
                  <div className="dash-progress-bar">
                    <div className="dash-progress-fill" style={{ width: `${mod.progress}%` }} />
                  </div>
                </div>

                <div className="dash-module-topics">
                  {mod.topics.map((t) => <span key={t} className="dash-module-topic">{t}</span>)}
                </div>

                <button className={`dash-module-btn ${mod.status === 'completed' ? 'completed' : mod.status === 'locked' ? 'locked-btn' : 'continue'}`} disabled={mod.status === 'locked'}>
                  {mod.status === 'completed' && <><CheckCircle size={14} /> Revoir</>}
                  {mod.status === 'in-progress' && <><Play size={14} /> Continuer</>}
                  {mod.status === 'locked' && <><Lock size={14} /> Verrouillé</>}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="dash-section-header" style={{ marginBottom: '1.25rem' }}>
              <div>
                <h2 className="dash-section-title">Mes Compétences</h2>
                <p className="dash-section-sub">Vue d'ensemble de vos compétences</p>
              </div>
            </div>
            <div className="dash-skills-panel">
              <div className="dash-skills-grid">
                {skills.map((skill, i) => (
                  <motion.div key={skill.name} className="dash-skill-item" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.05 }}>
                    <div className="dash-skill-head">
                      <span className="dash-skill-name">{skill.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="dash-skill-dots">
                          {Array.from({ length: skill.maxLevel }).map((_, j) => (
                            <div key={j} className={`dash-skill-dot ${j < skill.level ? 'filled' : ''}`} />
                          ))}
                        </div>
                        <span className="dash-skill-level">{skill.level}/{skill.maxLevel}</span>
                      </div>
                    </div>
                    <div className="dash-progress-bar">
                      <div className="dash-progress-fill" style={{ width: `${skill.progress}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
