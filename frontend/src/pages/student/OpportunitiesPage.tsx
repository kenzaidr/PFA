import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Briefcase, BookOpen, FileText, Settings, BarChart3, Bell,
  LogOut, Menu, X, Sun, Moon, MapPin, DollarSign, Clock,
  ChevronRight, Search, Flame, Sparkles, ArrowUpRight,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';

type Filter = 'all' | 'stage' | 'cdi' | 'alternance' | 'remote';

const JOBS = [
  { id: 1, title: 'Développeur React Senior', company: 'Maroc Tech', location: 'Casablanca', salary: '45-55k DH', match: 96, skills: ['React', 'TypeScript', 'GraphQL'], type: 'cdi' as const, posted: 'Il y a 2j', urgency: 'hot' as const, logo: 'MT' },
  { id: 2, title: 'Stage Data Science', company: 'DataLab', location: 'Rabat', salary: '8-12k DH', match: 91, skills: ['Python', 'TensorFlow', 'SQL'], type: 'stage' as const, posted: 'Il y a 1j', urgency: 'new' as const, logo: 'DL' },
  { id: 3, title: 'Full Stack Developer', company: 'Digital Solutions', location: 'Rabat', salary: '38-48k DH', match: 88, skills: ['Node.js', 'React', 'PostgreSQL'], type: 'cdi' as const, posted: 'Il y a 3j', urgency: 'new' as const, logo: 'DS' },
];

export default function OpportunitiesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => window.localStorage.getItem('esisa-theme') === 'dark');
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#050C18' : '#EEF4FF';
  }, [darkMode]);

  const filteredJobs = useMemo(() =>
    JOBS.filter(j => (filter === 'all' || j.type === filter) && (searchQuery === '' || j.title.toLowerCase().includes(searchQuery.toLowerCase())))
  , [filter, searchQuery]);

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
            <div><p className="dash-greeting-name">Opportunités</p></div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" onClick={() => setDarkMode(p => !p)}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <main className="dash-content">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <input placeholder="Rechercher une offre..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none' }} />
            </div>
            <div className="dash-filter-tabs">
              {([['all', 'Toutes'], ['stage', 'Stages'], ['cdi', 'CDI']] as [Filter, string][]).map(([key, label]) => (
                <button key={key} className={`dash-filter-tab ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>{label}</button>
              ))}
            </div>
          </motion.div>

          <div className="dash-section-header">
            <div>
              <h2 className="dash-section-title">Offres disponibles</h2>
              <p className="dash-section-sub">{filteredJobs.length} résultats</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {filteredJobs.map((job, i) => (
              <motion.div key={job.id} className="dash-job-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
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
                  {job.skills.map(s => <span key={s} className="dash-job-skill">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
