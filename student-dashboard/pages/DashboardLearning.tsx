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

  const modules: Module[] = [
    { id: 1, title: 'React Advanced Patterns', description: 'Maîtrisez les patterns avancés et l\'optimisation', status: 'in-progress', progress: 65, duration: '12h 30min', level: 'advanced', topics: ['Hooks', 'Context API', 'Performance'] },
    { id: 2, title: 'TypeScript Mastery', description: 'Types avancés et génériques', status: 'in-progress', progress: 45, duration: '8h 15min', level: 'intermediate', topics: ['Types', 'Génériques', 'Decorators'] },
    { id: 3, title: 'System Design', description: 'Préparez-vous aux entretiens système', status: 'locked', progress: 0, duration: '15h', level: 'advanced', topics: ['Architecture', 'Scalability', 'Patterns'] },
  ];

  const totalProgress = Math.round(modules.reduce((a, m) => a + m.progress, 0) / modules.length);
  const levelLabels: Record<string, string> = { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' };

  return (
    <div className="dash-root" data-theme={darkMode ? 'dark' : 'light'}>
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-brand">
          <img src="/esisa-logo.svg" alt="ESISA" className="dash-brand-logo" />
          <div>
            <p className="dash-brand-name">ESISA</p>
            <p className="dash-brand-sub">Espace Étudiant</p>
          </div>
        </div>
        <button className="dash-nav-logout" onClick={() => navigate('/')}>
          <LogOut size={18} /> <span>Déconnexion</span>
        </button>
      </aside>

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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="dash-welcome-title">Votre Parcours d'Apprentissage</h1>
            <p className="dash-welcome-sub">Progressez à travers les compétences essentielles</p>
          </motion.div>

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
        </main>
      </div>
    </div>
  );
}
