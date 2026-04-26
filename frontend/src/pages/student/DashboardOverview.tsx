import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  TrendingUp, Briefcase, Zap, Award, BarChart3, BookOpen,
  FileText, Settings, Bell, LogOut, Menu, X, ChevronRight,
  Sun, Moon, ArrowUpRight, MapPin, DollarSign, Calendar,
  Star, Clock, CheckCircle, User, Sparkles,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';

export default function DashboardOverview() {
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

  const stats = [
    { label: 'Score Global', value: '87/100', delta: '+5 ce mois', icon: <TrendingUp size={18} />, iconClass: '' },
    { label: 'Offres Matchées', value: '23', delta: '+8 nouvelles', icon: <Briefcase size={18} />, iconClass: 'purple' },
    { label: 'Streak Actif', value: '14 jours', delta: '🔥 Record!', icon: <Zap size={18} />, iconClass: 'orange' },
    { label: 'Rang National', value: '#342', delta: '+58 places', icon: <Award size={18} />, iconClass: 'emerald' },
  ];

  const recentJobs = [
    { id: 1, title: 'Développeur React Senior', company: 'Maroc Tech', location: 'Casablanca', salary: '45-55k DH', match: 96, skills: ['React', 'TypeScript', 'GraphQL'], posted: 'Il y a 2j' },
    { id: 2, title: 'Full Stack Developer', company: 'Digital Solutions', location: 'Rabat', salary: '38-48k DH', match: 88, skills: ['Node.js', 'React', 'PostgreSQL'], posted: 'Il y a 3j' },
    { id: 3, title: 'Frontend Engineer', company: 'Web Agency', location: 'Fès', salary: '32-42k DH', match: 82, skills: ['Vue.js', 'Tailwind', 'JavaScript'], posted: 'Il y a 5j' },
  ];

  const activities = [
    { icon: <CheckCircle size={14} />, text: 'CV mis à jour', time: 'Il y a 2h', color: 'emerald' },
    { icon: <Star size={14} />, text: 'Quiz React complété — Score: 92%', time: 'Il y a 5h', color: '' },
    { icon: <Briefcase size={14} />, text: 'Candidature envoyée — Maroc Tech', time: 'Hier', color: 'purple' },
    { icon: <Award size={14} />, text: 'Badge "TypeScript Pro" obtenu', time: 'Il y a 2j', color: 'orange' },
  ];

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

        <div className="dash-profile-mini">
          <div className="dash-profile-avatar">YA</div>
          <div>
            <p className="dash-profile-name">{studentName}</p>
            <p className="dash-profile-role">5ème Année — IL</p>
          </div>
        </div>

        <nav className="dash-side-nav">
          <NavLink to="/student/overview" className={({ isActive }) => `dash-side-link ${isActive ? 'active' : ''}`}>
            <BarChart3 size={16} />
            <span>Overview</span>
          </NavLink>
          <NavLink to="/student/learning" className={({ isActive }) => `dash-side-link ${isActive ? 'active' : ''}`}>
            <BookOpen size={16} />
            <span>Learning</span>
          </NavLink>
          <NavLink to="/student/opportunities" className={({ isActive }) => `dash-side-link ${isActive ? 'active' : ''}`}>
            <Briefcase size={16} />
            <span>Opportunities</span>
          </NavLink>
          <NavLink to="/student/cv-letters" className={({ isActive }) => `dash-side-link ${isActive ? 'active' : ''}`}>
            <FileText size={16} />
            <span>CV & Letters</span>
          </NavLink>
          <NavLink to="/student/settings" className={({ isActive }) => `dash-side-link ${isActive ? 'active' : ''}`}>
            <Settings size={16} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <button className="dash-nav-logout" onClick={() => navigate('/')}>
          <LogOut size={18} />
          <span>Déconnexion</span>
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
              <p className="dash-greeting-name">{studentName} 👋</p>
            </div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" style={{ position: 'relative' }}>
              <Bell size={16} />
              <span className="dash-notif-dot" />
            </button>
            <button className="dash-header-btn" onClick={() => setDarkMode((p) => !p)} aria-label="Toggle theme">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <main className="dash-content">
          <motion.div className="dash-welcome-banner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="dash-welcome-banner-text">
              <h1 className="dash-welcome-title">Bienvenue sur votre tableau de bord</h1>
              <p className="dash-welcome-sub" style={{ marginBottom: '1rem' }}>Suivez votre progression et explorez les meilleures opportunités</p>
              <div className="dash-welcome-chips">
                <span className="dash-chip"><Sparkles size={12} /> Profil complet à 87%</span>
                <span className="dash-chip"><Calendar size={12} /> 3 entretiens cette semaine</span>
              </div>
            </div>
          </motion.div>

          <div className="dash-stats">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="dash-stat-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="dash-stat-top">
                  <div className={`dash-stat-icon ${stat.iconClass}`}>{stat.icon}</div>
                  <span className="dash-stat-delta up">
                    <ArrowUpRight size={12} />
                    {stat.delta}
                  </span>
                </div>
                <p className="dash-stat-label">{stat.label}</p>
                <p className="dash-stat-value">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="dash-two-cols">
            <motion.div className="dash-activity-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="dash-section-header" style={{ marginBottom: '1rem' }}>
                <div>
                  <h2 className="dash-section-title">Activité Récente</h2>
                </div>
              </div>
              <div className="dash-activity-list">
                {activities.map((act, i) => (
                  <motion.div
                    key={i}
                    className="dash-activity-item"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.06 }}
                  >
                    <div className={`dash-activity-icon ${act.color}`}>{act.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p className="dash-activity-text">{act.text}</p>
                      <p className="dash-activity-time"><Clock size={11} /> {act.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Offres Récentes</h2>
                <p className="dash-section-sub">Matchées à votre profil</p>
              </div>
            </div>

            <div className="dash-jobs">
              {recentJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  className="dash-job-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                >
                  <div className="dash-job-top">
                    <div>
                      <h3 className="dash-job-title">{job.title}</h3>
                      <p className="dash-job-company">{job.company}</p>
                    </div>
                    <div className="dash-job-match">{job.match}%</div>
                  </div>

                  <div className="dash-job-meta">
                    <span><MapPin size={13} /> {job.location}</span>
                    <span className="salary"><DollarSign size={13} /> {job.salary}</span>
                  </div>

                  <div className="dash-job-skills">
                    {job.skills.map((s) => (
                      <span key={s} className="dash-job-skill">{s}</span>
                    ))}
                  </div>

                  <div className="dash-job-footer">
                    <span className="dash-job-posted"><Clock size={12} /> {job.posted}</span>
                    <button className="dash-job-apply">Postuler</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
