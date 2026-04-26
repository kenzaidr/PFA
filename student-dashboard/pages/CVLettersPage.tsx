import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, BookOpen, FileText, Settings, BarChart3, Bell,
  LogOut, Menu, X, Sun, Moon, Download, Eye, Edit3, Plus,
  Sparkles, Wand2, CheckCircle, AlertCircle,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';

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

  return (
    <div className="dash-root" data-theme={darkMode ? 'dark' : 'light'}>
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dash-brand">
          <img src="/esisa-logo.svg" alt="ESISA" className="dash-brand-logo" />
          <div><p className="dash-brand-name">ESISA</p></div>
        </div>
        <button className="dash-nav-logout" onClick={() => navigate('/')}><LogOut size={18} /></button>
      </aside>

      <div className="dash-main">
        <header className="dash-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X size={22} /> : <Menu size={22} />}</button>
            <div><p className="dash-greeting-name">CV & Lettres</p></div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" onClick={() => setDarkMode(p => !p)}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <main className="dash-content">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2.5rem' }}>
            <div className="dash-section-header">
              <div>
                <h2 className="dash-section-title">Mes CV</h2>
                <p className="dash-section-sub">{cvDocs.length} documents</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
              {cvDocs.map((doc, i) => (
                <motion.div key={doc.name} className="dash-cv-preview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <FileText size={20} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 600 }}>{doc.name}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#94A3B8' }}>{doc.date}</p>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem' }}>Score IA</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{doc.score}%</span>
                    </div>
                    <div className="dash-progress-bar">
                      <motion.div className="dash-progress-fill" initial={{ width: 0 }} animate={{ width: `${doc.score}%` }} transition={{ delay: 0.4, duration: 0.8 }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', background: '#2563EB', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}><Eye size={13} /> Aperçu</button>
                    <button style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', background: 'transparent', border: '1px solid #DBEAFE', color: '#2563EB', cursor: 'pointer', fontSize: '0.75rem' }}><Download size={13} /> PDF</button>
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
