import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Briefcase, BookOpen, FileText, Settings, BarChart3, Bell,
  LogOut, Menu, X, Sun, Moon, User, Shield, Palette,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => window.localStorage.getItem('esisa-theme') === 'dark');
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

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
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X size={22} /> : <Menu size={22} />}</button>
            <div><p className="dash-greeting-name">Paramètres</p></div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" onClick={() => setDarkMode(p => !p)}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <main className="dash-content">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="dash-welcome-title">Paramètres du compte</h1>
            <p className="dash-welcome-sub">Gérez votre profil, sécurité et préférences</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem', marginTop: '2rem' }}>
            <motion.div className="dash-settings-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <User size={18} style={{ color: '#2563EB' }} />
                <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Profil</h2>
              </div>
              <div style={{ fontSize: '0.875rem', lineHeight: '1.8' }}>
                <p><strong>Nom:</strong> Youssef Amrani</p>
                <p><strong>Email:</strong> y.amrani@esisa.ac.ma</p>
                <p><strong>Programme:</strong> 5ème Année — IL</p>
              </div>
            </motion.div>

            <motion.div className="dash-settings-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Palette size={18} style={{ color: '#7C3AED' }} />
                <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Apparence</h2>
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <p>Mode sombre: {darkMode ? '✓ Activé' : '✗ Désactivé'}</p>
                <p>Langue: {lang.toUpperCase()}</p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
