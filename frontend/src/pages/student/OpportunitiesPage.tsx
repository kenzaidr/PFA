import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase, BookOpen, FileText, Settings, BarChart3, Bell,
  LogOut, Menu, X, Sun, Moon, MapPin, DollarSign, Clock,
  ChevronRight, Search, Flame, Sparkles, ArrowUpRight,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';
import '../../styles/PremiumEffects.css';

type Filter = 'all' | 'stage' | 'cdi' | 'alternance' | 'remote';

const JOBS = [
  { id: 1, title: 'Développeur React Senior', company: 'Maroc Tech', location: 'Casablanca', salary: '45-55k DH', match: 96, skills: ['React', 'TypeScript', 'GraphQL'], type: 'cdi' as const, posted: 'Il y a 2j', urgency: 'hot' as const, logo: 'MT', logoColor: '#2563EB' },
  { id: 2, title: 'Stage Data Science', company: 'DataLab', location: 'Rabat', salary: '8-12k DH', match: 91, skills: ['Python', 'TensorFlow', 'SQL'], type: 'stage' as const, posted: 'Il y a 1j', urgency: 'new' as const, logo: 'DL', logoColor: '#7C3AED' },
  { id: 3, title: 'Full Stack Developer', company: 'Digital Solutions', location: 'Rabat', salary: '38-48k DH', match: 88, skills: ['Node.js', 'React', 'PostgreSQL'], type: 'cdi' as const, posted: 'Il y a 3j', urgency: 'new' as const, logo: 'DS', logoColor: '#0D9488' },
  { id: 4, title: 'Alternance DevOps', company: 'CloudFirst', location: 'Casablanca', salary: '15-20k DH', match: 85, skills: ['Docker', 'K8s', 'CI/CD'], type: 'alternance' as const, posted: 'Il y a 4j', urgency: 'new' as const, logo: 'CF', logoColor: '#EA580C' },
  { id: 5, title: 'Frontend Engineer (Remote)', company: 'Web Agency', location: 'Remote', salary: '32-42k DH', match: 82, skills: ['Vue.js', 'Tailwind', 'JavaScript'], type: 'remote' as const, posted: 'Il y a 5j', urgency: 'new' as const, logo: 'WA', logoColor: '#059669' },
  { id: 6, title: 'Stage Machine Learning', company: 'AI Morocco', location: 'Fès', salary: '10-15k DH', match: 79, skills: ['Python', 'PyTorch', 'NLP'], type: 'stage' as const, posted: 'Il y a 6j', urgency: 'new' as const, logo: 'AI', logoColor: '#DC2626' },
];

// Radar chart helper
function radarPoints(values: number[], cx: number, cy: number, r: number) {
  const n = values.length;
  return values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const vr = (v / 100) * r;
    return `${cx + vr * Math.cos(angle)},${cy + vr * Math.sin(angle)}`;
  }).join(' ');
}

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
    JOBS.filter(j => (filter === 'all' || j.type === filter) && (searchQuery === '' || j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase())))
  , [filter, searchQuery]);

  const skillRadar = [85, 65, 78, 62, 35, 45]; // React, TS, Node, SQL, Design, DevOps
  const radarLabels = ['React', 'TypeScript', 'Node.js', 'SQL', 'Design', 'DevOps'];
  const cx = 140, cy = 140, maxR = 100;

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
            <Link key={item.label} to={item.path} className={`dash-nav-item ${item.path === '/dashboard/opportunities' ? 'active' : ''}`}>
              {item.icon}<span>{item.label}</span>
              {item.path === '/dashboard/opportunities' && <span className="dash-nav-active-dot" />}
            </Link>
          ))}
        </nav>
        <button className="dash-nav-logout" onClick={() => navigate('/')}><LogOut size={18} /><span>Déconnexion</span></button>
      </aside>

      <div className="dash-main">
        <header className="dash-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X size={22} /> : <Menu size={22} />}</button>
            <div><p className="dash-greeting-sub">Explorer</p><p className="dash-greeting-name">Opportunités</p></div>
          </div>
          <div className="dash-header-actions">
            <button className="dash-header-btn" style={{ position: 'relative' }}><Bell size={16} /><span className="dash-notif-dot" /></button>
            <button className="dash-header-btn" onClick={() => setDarkMode(p => !p)}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <main className="dash-content">
          {/* Banner with particles */}
          <motion.div className="dash-welcome-banner" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="dash-particles">
              <div className="dash-particle" /><div className="dash-particle" /><div className="dash-particle" /><div className="dash-particle" /><div className="dash-particle" />
            </div>
            <div className="dash-welcome-banner-text">
              <h1 className="dash-welcome-title">Trouvez votre prochain défi</h1>
              <p className="dash-welcome-sub" style={{ marginBottom: '1rem' }}>{JOBS.length} offres matchées à votre profil</p>
              <div className="dash-welcome-chips">
                <span className="dash-chip"><Flame size={12} /> 2 offres urgentes</span>
                <span className="dash-chip"><Sparkles size={12} /> Score moyen : 87%</span>
              </div>
            </div>
            <div className="dash-welcome-illustration">
              <div className="dash-ring-wrap">
                <svg className="dash-ring-svg" width="100" height="100" viewBox="0 0 100 100">
                  <circle className="dash-ring-bg" cx="50" cy="50" r="42" />
                  <circle className="dash-ring-fill" cx="50" cy="50" r="42" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - 0.87)} />
                </svg>
                <div className="dash-ring-label">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>87%</span>
                  <span style={{ fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>Match</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search + Filters */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="login-input-wrap" style={{ flex: 1 }}>
                <span className="login-input-icon" style={{ color: darkMode ? '#94A3B8' : '#64748B' }}><Search size={18} /></span>
                <input className="login-input" placeholder="Rechercher une offre, entreprise…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </div>
            <div className="dash-filter-tabs">
              {([['all', 'Toutes'], ['stage', 'Stages'], ['cdi', 'CDI'], ['alternance', 'Alternance'], ['remote', 'Remote']] as [Filter, string][]).map(([key, label]) => (
                <button key={key} className={`dash-filter-tab ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>{label}</button>
              ))}
            </div>
          </motion.div>

          {/* Two columns: Jobs + Radar */}
          <div className="dash-two-cols" style={{ alignItems: 'start' }}>
            {/* Job cards */}
            <div>
              <div className="dash-section-header">
                <div>
                  <h2 className="dash-section-title">Offres disponibles</h2>
                  <p className="dash-section-sub">{filteredJobs.length} résultats</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {filteredJobs.map((job, i) => (
                  <motion.div key={job.id} className="dash-job-card-enhanced dash-tilt-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
                    <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '0.75rem' }}>
                      <div className="dash-job-logo" style={{ background: job.logoColor }}>{job.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h3 className="dash-job-title">{job.title}</h3>
                            <p className="dash-job-company">{job.company}</p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                            <div className="dash-job-match">{job.match}%</div>
                            {job.urgency === 'hot' && <span className="dash-job-urgency hot"><Flame size={10} /> Urgent</span>}
                            {job.urgency === 'new' && <span className="dash-job-urgency new"><Sparkles size={10} /> Nouveau</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dash-job-meta"><span><MapPin size={13} /> {job.location}</span><span className="salary"><DollarSign size={13} /> {job.salary}</span></div>
                    <div className="dash-job-skills">{job.skills.map(s => <span key={s} className="dash-job-skill">{s}</span>)}</div>
                    <div className="dash-job-footer">
                      <span className="dash-job-posted"><Clock size={12} /> {job.posted}</span>
                      <button className="dash-job-apply">Postuler <ArrowUpRight size={14} /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Radar chart */}
            <motion.div className="dash-chart-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="dash-section-title" style={{ marginBottom: '0.25rem' }}>Votre profil de compétences</h2>
              <p className="dash-section-sub" style={{ marginBottom: '0.5rem' }}>Radar interactif</p>
              <div className="dash-radar-wrap">
                <svg className="dash-radar-svg" viewBox="0 0 280 280">
                  {[20, 40, 60, 80, 100].map(r => (
                    <polygon key={r} className="dash-radar-grid" points={radarPoints(Array(6).fill(r), cx, cy, maxR)} />
                  ))}
                  <motion.polygon
                    className="dash-radar-area"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    points={radarPoints(skillRadar, cx, cy, maxR)}
                  />
                  {skillRadar.map((v, i) => {
                    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                    const dotR = (v / 100) * maxR;
                    const labelR = maxR + 18;
                    return (
                      <g key={i}>
                        <circle className="dash-radar-dot" cx={cx + dotR * Math.cos(angle)} cy={cy + dotR * Math.sin(angle)} r={4} />
                        <text className="dash-radar-label" x={cx + labelR * Math.cos(angle)} y={cy + labelR * Math.sin(angle)} textAnchor="middle" dominantBaseline="middle">{radarLabels[i]}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
