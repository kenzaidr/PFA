import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase, BookOpen, FileText, Settings, BarChart3, Bell,
  LogOut, Menu, X, Sun, Moon, Download, Eye, Edit3, Plus,
  Sparkles, Wand2, CheckCircle, AlertCircle,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';
import '../../styles/PremiumEffects.css';

export default function CVLettersPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => window.localStorage.getItem('esisa-theme') === 'dark');

  useEffect(() => {
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

  const cvDocs = [
    { name: 'CV_Youssef_Amrani_2026.pdf', date: 'Mis à jour il y a 2h', score: 87, suggestions: 2 },
    { name: 'CV_Stage_DataScience.pdf', date: '15 Avril 2026', score: 72, suggestions: 5 },
  ];

  const letterTemplates = [
    { emoji: '🎯', title: 'Candidature spontanée', desc: 'Pour postuler sans offre' },
    { emoji: '💼', title: 'Stage de fin d\'études', desc: 'PFE / stage 6 mois' },
    { emoji: '🚀', title: 'Premier emploi', desc: 'Sortie d\'école' },
    { emoji: '🔬', title: 'Recherche & IA', desc: 'Laboratoire / R&D' },
  ];

  const aiFeatures = [
    { icon: <Wand2 size={20} />, title: 'Génération IA', desc: 'Créez un CV professionnel en 30 secondes', color: 'purple' },
    { icon: <Eye size={20} />, title: 'Analyse de CV', desc: 'Notre IA évalue et améliore votre CV', color: '' },
    { icon: <Sparkles size={20} />, title: 'Optimisation ATS', desc: 'Passez les filtres automatiques', color: 'orange' },
  ];

  const navItems = [
    { label: 'Vue d\'ensemble', icon: <BarChart3 size={18} />, path: '/dashboard/overview' },
    { label: 'Apprentissage', icon: <BookOpen size={18} />, path: '/dashboard/learning' },
    { label: 'Opportunités', icon: <Briefcase size={18} />, path: '/dashboard/opportunities' },
    { label: 'CV & Lettres', icon: <FileText size={18} />, path: '/dashboard/cv-letters' },
    { label: 'Paramètres', icon: <Settings size={18} />, path: '/dashboard/settings' },
  ];

  return (
    <div className="dash-root" data-theme={darkMode ? 'dark' : 'light'}>
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-brand">
          <img src="/esisa-logo.svg" alt="ESISA" className="dash-brand-logo" />
          <div><p className="dash-brand-name">ESISA</p><p className="dash-brand-sub">Espace Étudiant</p></div>
        </div>
        <div className="dash-profile-mini">
          <div className="dash-profile-avatar">YA</div>
          <div><p className="dash-profile-name">Youssef Amrani</p><p className="dash-profile-role">5ème Année — IL</p></div>
        </div>
        <nav className="dash-nav">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path} className={`dash-nav-item ${item.path === '/dashboard/cv-letters' ? 'active' : ''}`}>
              {item.icon}<span>{item.label}</span>
              {item.path === '/dashboard/cv-letters' && <span className="dash-nav-active-dot" />}
            </Link>
          ))}
        </nav>
        <button className="dash-nav-logout" onClick={() => navigate('/')}><LogOut size={18} /><span>Déconnexion</span></button>
      </aside>

      <div className="dash-main">
        <header className="dash-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X size={22} /> : <Menu size={22} />}</button>
            <div><p className="dash-greeting-sub">Documents</p><p className="dash-greeting-name">CV & Lettres de motivation</p></div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" style={{ position: 'relative' }}><Bell size={16} /><span className="dash-notif-dot" /></button>
            <button className="dash-header-btn" onClick={() => setDarkMode(p => !p)}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <main className="dash-content">
          {/* Banner */}
          <motion.div className="dash-welcome-banner" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #059669 50%, #10B981 100%)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="dash-particles"><div className="dash-particle" /><div className="dash-particle" /><div className="dash-particle" /><div className="dash-particle" /><div className="dash-particle" /></div>
            <div className="dash-welcome-banner-text">
              <h1 className="dash-welcome-title">Créez des documents percutants</h1>
              <p className="dash-welcome-sub" style={{ marginBottom: '1rem' }}>Notre IA vous aide à construire un CV et des lettres qui se démarquent</p>
              <div className="dash-welcome-chips">
                <span className="dash-chip"><FileText size={12} /> 2 CV enregistrés</span>
                <span className="dash-chip"><Sparkles size={12} /> Score moyen : 80%</span>
              </div>
            </div>
          </motion.div>

          {/* AI Features */}
          <div className="dash-quick-actions" style={{ marginBottom: '2rem' }}>
            {aiFeatures.map((feat, i) => (
              <motion.div key={feat.title} className="dash-quick-action dash-tilt-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className={`dash-quick-action-icon ${feat.color}`} style={feat.color === 'purple' ? { background: '#F5F3FF', color: '#7C3AED' } : feat.color === 'orange' ? { background: '#FFF7ED', color: '#EA580C' } : {}}>{feat.icon}</div>
                <span className="dash-quick-action-label">{feat.title}</span>
                <span className="dash-section-sub" style={{ textAlign: 'center', fontSize: '0.6875rem' }}>{feat.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* My CVs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: '2.5rem' }}>
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Mes CV</h2>
                <p className="dash-section-sub">{cvDocs.length} documents</p>
              </div>
              <button className="dash-view-more" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Plus size={14} /> Nouveau CV</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
              {cvDocs.map((doc, i) => (
                <motion.div key={doc.name} className="dash-cv-preview dash-glow-border" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}>
                  <div className="dash-cv-preview-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="dash-cv-doc-icon"><FileText size={20} /></div>
                      <div>
                        <p className="dash-cv-name">{doc.name}</p>
                        <p className="dash-cv-date">{doc.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="dash-cv-score-bar">
                    <span className="dash-cv-score-label">Score IA</span>
                    <div className="dash-progress-bar" style={{ flex: 1 }}>
                      <motion.div className="dash-progress-fill" initial={{ width: 0 }} animate={{ width: `${doc.score}%` }} transition={{ delay: 0.4, duration: 0.8 }} />
                    </div>
                    <span className="dash-cv-score-num">{doc.score}%</span>
                  </div>

                  {doc.suggestions > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.875rem', fontSize: '0.6875rem', fontWeight: 600, color: '#D97706' }}>
                      <AlertCircle size={13} /> {doc.suggestions} suggestions d'amélioration
                    </div>
                  )}

                  <div className="dash-cv-actions">
                    <button className="dash-cv-btn primary"><Eye size={13} /> Aperçu</button>
                    <button className="dash-cv-btn ghost"><Edit3 size={13} /> Modifier</button>
                    <button className="dash-cv-btn ghost"><Download size={13} /> PDF</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Letter Templates */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Modèles de lettres de motivation</h2>
                <p className="dash-section-sub">Générés par IA et personnalisés</p>
              </div>
            </div>
            <div className="dash-letter-grid">
              {letterTemplates.map((tpl, i) => (
                <motion.div key={tpl.title} className="dash-letter-card dash-tilt-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                  <div className="dash-letter-emoji">{tpl.emoji}</div>
                  <p className="dash-letter-title">{tpl.title}</p>
                  <p className="dash-letter-desc">{tpl.desc}</p>
                  <button className="dash-cv-btn primary" style={{ marginTop: '0.75rem', width: '100%' }}><Wand2 size={13} /> Générer</button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAB */}
          <motion.button className="dash-fab" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title="Nouveau document">
            <Plus size={22} />
          </motion.button>
        </main>
      </div>
    </div>
  );
}
