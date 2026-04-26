import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users, Briefcase, TrendingUp, Eye, BarChart3, FileText,
  Settings, Bell, LogOut, Menu, X, Sun, Moon, ChevronRight,
  ArrowUpRight, PlusCircle, Search, Filter, Send, Calendar,
  Building2, Clock, Star, CheckCircle,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';
import '../../styles/RecruiterDashboard.css';

export default function RecruiterDashboard() {
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

  const recruiterName = 'Sarah Martin';

  const navItems = [
    { label: 'Tableau de bord', icon: <BarChart3 size={18} />, path: '/recruiter/dashboard', active: true },
    { label: 'Candidats', icon: <Users size={18} />, path: '#', active: false },
    { label: 'Mes Offres', icon: <Briefcase size={18} />, path: '#', active: false },
    { label: 'Messages', icon: <Send size={18} />, path: '#', active: false },
    { label: 'Paramètres', icon: <Settings size={18} />, path: '#', active: false },
  ];

  const stats = [
    { label: 'Candidatures Reçues', value: '156', delta: '+24 cette semaine', icon: <Users size={18} />, iconClass: 'teal' },
    { label: 'Offres Actives', value: '8', delta: '+2 ce mois', icon: <Briefcase size={18} />, iconClass: 'indigo' },
    { label: 'Taux de Réponse', value: '94%', delta: '+3%', icon: <TrendingUp size={18} />, iconClass: 'amber' },
    { label: 'Vues Profil Entreprise', value: '1.2K', delta: '+180 cette semaine', icon: <Eye size={18} />, iconClass: 'rose' },
  ];

  const topCandidates = [
    { id: 1, name: 'Ahmed Bennani', program: '5ème Année — IL', score: 96, skills: ['React', 'TypeScript', 'Node.js'], avatar: 'AB', avatarClass: 'av-blue' },
    { id: 2, name: 'Fatima Zahra El Idrissi', program: '4ème Année — IA', score: 91, skills: ['Python', 'TensorFlow', 'SQL'], avatar: 'FZ', avatarClass: 'av-purple' },
    { id: 3, name: 'Yassine Tazi', program: '5ème Année — GL', score: 88, skills: ['Java', 'Spring Boot', 'Docker'], avatar: 'YT', avatarClass: 'av-teal' },
  ];

  const activeOffers = [
    { id: 1, title: 'Développeur Full Stack', applications: 42, status: 'active' as const, posted: '12 Avr 2026' },
    { id: 2, title: 'Data Scientist Junior', applications: 28, status: 'active' as const, posted: '08 Avr 2026' },
    { id: 3, title: 'DevOps Engineer', applications: 15, status: 'paused' as const, posted: '01 Avr 2026' },
    { id: 4, title: 'UX/UI Designer', applications: 33, status: 'closed' as const, posted: '20 Mar 2026' },
  ];

  const recentActivity = [
    { icon: <CheckCircle size={14} />, text: 'Ahmed Bennani a postulé — Full Stack', time: 'Il y a 1h', color: 'emerald' },
    { icon: <Star size={14} />, text: 'Nouveau match 95% — Fatima Z.', time: 'Il y a 3h', color: '' },
    { icon: <Send size={14} />, text: 'Message envoyé à Yassine T.', time: 'Hier', color: 'purple' },
    { icon: <Eye size={14} />, text: '42 vues sur l\'offre Full Stack', time: 'Il y a 2j', color: 'orange' },
  ];

  const hiringPipeline = [
    { stage: 'Candidatures', count: 156, color: '#2563EB' },
    { stage: 'Présélection', count: 48, color: '#7C3AED' },
    { stage: 'Entretiens', count: 12, color: '#EA580C' },
    { stage: 'Offres', count: 4, color: '#059669' },
  ];

  return (
    <div className="dash-root" data-theme={darkMode ? 'dark' : 'light'}>
      {/* SIDEBAR */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-brand">
          <img src="/esisa-logo.svg" alt="ESISA" className="dash-brand-logo" />
          <div>
            <p className="dash-brand-name">ESISA</p>
            <p className="dash-brand-sub">Espace Recruteur</p>
          </div>
        </div>

        {/* Company profile */}
        <div className="dash-profile-mini">
          <div className="dash-profile-avatar" style={{ background: 'linear-gradient(135deg,#0D9488,#0F766E)' }}>SM</div>
          <div>
            <p className="dash-profile-name">{recruiterName}</p>
            <p className="dash-profile-role">Digital Solutions SA</p>
          </div>
        </div>

        <nav className="dash-nav">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path} className={`dash-nav-item ${item.active ? 'active' : ''}`}>
              {item.icon} <span>{item.label}</span>
              {item.active && <span className="dash-nav-active-dot" />}
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
              <p className="dash-greeting-sub">Bienvenue,</p>
              <p className="dash-greeting-name">{recruiterName} 👋</p>
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
          {/* Welcome Banner */}
          <motion.div className="dash-welcome-banner" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #14B8A6 100%)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="dash-welcome-banner-text">
              <h1 className="dash-welcome-title">Tableau de bord Recruteur</h1>
              <p className="dash-welcome-sub" style={{ marginBottom: '1rem' }}>Gérez vos offres et trouvez les meilleurs talents ESISA</p>
              <div className="dash-welcome-chips">
                <span className="dash-chip"><Building2 size={12} /> Digital Solutions SA</span>
                <span className="dash-chip"><Calendar size={12} /> 3 entretiens aujourd'hui</span>
              </div>
            </div>
            <div className="dash-welcome-illustration">
              <div className="dash-illustration-circle">
                <div className="dash-illustration-score">156</div>
                <p className="dash-illustration-label">Candidatures</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="dash-quick-actions">
            {[
              { icon: <PlusCircle size={22} />, label: 'Publier une offre' },
              { icon: <Search size={22} />, label: 'Rechercher un candidat' },
              { icon: <Filter size={22} />, label: 'Filtrer les CV' },
            ].map((action, i) => (
              <motion.div key={action.label} className="dash-quick-action" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="dash-quick-action-icon">{action.icon}</div>
                <span className="dash-quick-action-label">{action.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="dash-stats">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} className="dash-stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <div className="dash-stat-top">
                  <div className={`dash-stat-icon ${stat.iconClass}`}>{stat.icon}</div>
                  <span className="dash-stat-delta up"><ArrowUpRight size={12} />{stat.delta}</span>
                </div>
                <p className="dash-stat-label">{stat.label}</p>
                <p className="dash-stat-value">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Two columns: Pipeline + Activity */}
          <div className="dash-two-cols">
            {/* Hiring Pipeline */}
            <motion.div className="dash-chart-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="dash-section-header" style={{ marginBottom: '1.25rem' }}>
                <div>
                  <h2 className="dash-section-title">Pipeline de Recrutement</h2>
                  <p className="dash-section-sub">Entonnoir de conversion</p>
                </div>
              </div>
              <div className="dash-pipeline">
                {hiringPipeline.map((stage, i) => (
                  <motion.div key={stage.stage} className="dash-pipeline-row" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                    <span className="dash-pipeline-label">{stage.stage}</span>
                    <div className="dash-pipeline-bar-bg">
                      <motion.div
                        className="dash-pipeline-bar-fill"
                        style={{ background: stage.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stage.count / 156) * 100}%` }}
                        transition={{ delay: 0.35 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="dash-pipeline-count">{stage.count}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div className="dash-activity-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="dash-section-header" style={{ marginBottom: '1rem' }}>
                <div>
                  <h2 className="dash-section-title">Activité Récente</h2>
                </div>
              </div>
              <div className="dash-activity-list">
                {recentActivity.map((act, i) => (
                  <motion.div key={i} className="dash-activity-item" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.06 }}>
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

          {/* Top Candidates */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginBottom: '2.5rem' }}>
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Meilleurs Candidats</h2>
                <p className="dash-section-sub">Matchés à vos offres actives</p>
              </div>
              <button className="dash-view-more">Voir tous <ChevronRight size={16} /></button>
            </div>

            <div className="dash-candidates">
              {topCandidates.map((c, i) => (
                <motion.div key={c.id} className="dash-candidate-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}>
                  <div className="dash-candidate-top">
                    <div className={`dash-candidate-avatar ${c.avatarClass}`}>{c.avatar}</div>
                    <div>
                      <h3 className="dash-candidate-name">{c.name}</h3>
                      <p className="dash-candidate-program">{c.program}</p>
                    </div>
                  </div>
                  <div className="dash-candidate-score">
                    <span className="dash-candidate-score-label">Score de compatibilité</span>
                    <span className="dash-candidate-score-value">{c.score}%</span>
                  </div>
                  <div className="dash-candidate-skills">
                    {c.skills.map((s) => <span key={s} className="dash-job-skill">{s}</span>)}
                  </div>
                  <div className="dash-candidate-actions">
                    <button className="dash-candidate-btn primary">Voir profil</button>
                    <button className="dash-candidate-btn secondary">Contacter</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Offers Table */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Mes Offres</h2>
                <p className="dash-section-sub">{activeOffers.filter(o => o.status === 'active').length} offres actives</p>
              </div>
              <button className="dash-view-more">Gérer <ChevronRight size={16} /></button>
            </div>
            <table className="dash-offers-table">
              <thead>
                <tr><th>Titre</th><th>Candidatures</th><th>Statut</th><th>Publiée le</th></tr>
              </thead>
              <tbody>
                {activeOffers.map((offer) => (
                  <tr key={offer.id}>
                    <td><span className="dash-offer-title">{offer.title}</span></td>
                    <td>{offer.applications}</td>
                    <td>
                      <span className={`dash-status-badge ${offer.status}`}>
                        {offer.status === 'active' ? 'Active' : offer.status === 'paused' ? 'En pause' : 'Fermée'}
                      </span>
                    </td>
                    <td>{offer.posted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
