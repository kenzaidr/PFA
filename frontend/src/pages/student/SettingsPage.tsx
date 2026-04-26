import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase, BookOpen, FileText, Settings, BarChart3, Bell,
  LogOut, Menu, X, Sun, Moon, User, Shield, Globe, Palette,
  Mail, Smartphone, Lock, Trash2, Edit3,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';
import '../../styles/PremiumEffects.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => window.localStorage.getItem('esisa-theme') === 'dark');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifOffers, setNotifOffers] = useState(true);
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

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
            <Link key={item.label} to={item.path} className={`dash-nav-item ${item.path === '/dashboard/settings' ? 'active' : ''}`}>
              {item.icon}<span>{item.label}</span>
              {item.path === '/dashboard/settings' && <span className="dash-nav-active-dot" />}
            </Link>
          ))}
        </nav>
        <button className="dash-nav-logout" onClick={() => navigate('/')}><LogOut size={18} /><span>Déconnexion</span></button>
      </aside>

      <div className="dash-main">
        <header className="dash-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X size={22} /> : <Menu size={22} />}</button>
            <div><p className="dash-greeting-sub">Configuration</p><p className="dash-greeting-name">Paramètres</p></div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" style={{ position: 'relative' }}><Bell size={16} /><span className="dash-notif-dot" /></button>
            <button className="dash-header-btn" onClick={() => setDarkMode(p => !p)}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <main className="dash-content">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="dash-welcome-title">Paramètres du compte</h1>
            <p className="dash-welcome-sub">Gérez votre profil, sécurité et préférences</p>
          </motion.div>

          <div className="dash-settings-grid">
            {/* Profile */}
            <motion.div className="dash-settings-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <User size={18} style={{ color: '#2563EB' }} />
                <h2 className="dash-settings-section-title" style={{ margin: 0 }}>Profil</h2>
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label">Nom complet</p><p className="dash-setting-desc">Youssef Amrani</p></div>
                <button className="dash-cv-btn ghost" style={{ width: 'auto', padding: '0.4rem 0.75rem' }}><Edit3 size={13} /></button>
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label">Email</p><p className="dash-setting-desc">y.amrani@esisa.ac.ma</p></div>
                <button className="dash-cv-btn ghost" style={{ width: 'auto', padding: '0.4rem 0.75rem' }}><Edit3 size={13} /></button>
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label">Programme</p><p className="dash-setting-desc">5ème Année — Ingénierie Logicielle</p></div>
                <button className="dash-cv-btn ghost" style={{ width: 'auto', padding: '0.4rem 0.75rem' }}><Edit3 size={13} /></button>
              </div>
            </motion.div>

            {/* Appearance */}
            <motion.div className="dash-settings-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Palette size={18} style={{ color: '#7C3AED' }} />
                <h2 className="dash-settings-section-title" style={{ margin: 0 }}>Apparence & Langue</h2>
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label">Mode sombre</p><p className="dash-setting-desc">Changer l'apparence de l'application</p></div>
                <button className={`dash-toggle ${darkMode ? 'on' : ''}`} onClick={() => setDarkMode(p => !p)} />
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label">Langue</p><p className="dash-setting-desc">{lang === 'fr' ? 'Français' : 'English'}</p></div>
                <div className="dash-filter-tabs" style={{ marginBottom: 0 }}>
                  <button className={`dash-filter-tab ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>FR</button>
                  <button className={`dash-filter-tab ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div className="dash-settings-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Bell size={18} style={{ color: '#EA580C' }} />
                <h2 className="dash-settings-section-title" style={{ margin: 0 }}>Notifications</h2>
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label"><Mail size={14} style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: '-2px' }} />Notifications email</p><p className="dash-setting-desc">Recevoir les mises à jour par email</p></div>
                <button className={`dash-toggle ${notifEmail ? 'on' : ''}`} onClick={() => setNotifEmail(p => !p)} />
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label"><Smartphone size={14} style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: '-2px' }} />Push notifications</p><p className="dash-setting-desc">Alertes dans le navigateur</p></div>
                <button className={`dash-toggle ${notifPush ? 'on' : ''}`} onClick={() => setNotifPush(p => !p)} />
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label"><Briefcase size={14} style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: '-2px' }} />Nouvelles offres</p><p className="dash-setting-desc">Alertes quand une offre correspond à votre profil</p></div>
                <button className={`dash-toggle ${notifOffers ? 'on' : ''}`} onClick={() => setNotifOffers(p => !p)} />
              </div>
            </motion.div>

            {/* Security */}
            <motion.div className="dash-settings-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Shield size={18} style={{ color: '#059669' }} />
                <h2 className="dash-settings-section-title" style={{ margin: 0 }}>Sécurité</h2>
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label"><Lock size={14} style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: '-2px' }} />Changer le mot de passe</p></div>
                <button className="dash-cv-btn ghost" style={{ width: 'auto', padding: '0.4rem 0.75rem' }}>Modifier</button>
              </div>
              <div className="dash-setting-row">
                <div><p className="dash-setting-label"><Shield size={14} style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: '-2px' }} />Authentification à 2 facteurs</p><p className="dash-setting-desc">Ajoutez une couche de sécurité</p></div>
                <button className="dash-cv-btn primary" style={{ width: 'auto', padding: '0.4rem 0.75rem' }}>Activer</button>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div className="dash-settings-section" style={{ borderColor: 'rgba(220,38,38,0.25)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Trash2 size={18} style={{ color: '#DC2626' }} />
                <h2 className="dash-settings-section-title" style={{ margin: 0, color: '#DC2626' }}>Zone de danger</h2>
              </div>
              <div className="dash-setting-row" style={{ borderBottom: 'none' }}>
                <div><p className="dash-setting-label">Supprimer le compte</p><p className="dash-setting-desc">Cette action est irréversible</p></div>
                <button className="dash-cv-btn ghost" style={{ width: 'auto', padding: '0.4rem 0.75rem', color: '#DC2626', borderColor: 'rgba(220,38,38,0.3)' }}>Supprimer</button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
