import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  TrendingUp,
  Briefcase,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  Bell,
  Sun,
  Moon,
  Network,
  Target,
  Flame,
  Award,
  ArrowUp,
  MapPin,
  Clock,
} from 'lucide-react';
import '../../styles/StudentDashboard.css';

type NavId = 'overview' | 'skills' | 'market' | 'jobs' | 'roadmap' | 'settings';

const navItems: Array<{ id: NavId; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'skills', label: 'Skills', icon: Brain },
  { id: 'market', label: 'Market Pulse', icon: TrendingUp },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'roadmap', label: 'Roadmap', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const navPathById: Record<NavId, string> = {
  overview: '/student/overview',
  skills: '/student/learning',
  market: '/student/opportunities',
  jobs: '/student/opportunities',
  roadmap: '/student/cv-letters',
  settings: '/student/settings',
};

const jobs = [
  {
    id: 1,
    title: 'Frontend Engineer Intern',
    company: 'Capgemini Maroc',
    location: 'Casablanca',
    type: 'Hybrid',
    salary: '8k-12k MAD',
    match: '96%',
    skills: ['React', 'TypeScript', 'UI'],
  },
  {
    id: 2,
    title: 'Full-Stack Junior',
    company: 'Orange Digital Center',
    location: 'Rabat',
    type: 'On-site',
    salary: '10k-14k MAD',
    match: '91%',
    skills: ['Spring', 'React', 'SQL'],
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'SQLI',
    location: 'Fes',
    type: 'Remote',
    salary: '9k-13k MAD',
    match: '88%',
    skills: ['Java', 'REST', 'Docker'],
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<NavId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });

  const statCards = useMemo(
    () => [
      { label: 'Global Score', value: '87/100', icon: Target, className: '' },
      { label: 'Matched Jobs', value: '23', icon: TrendingUp, className: 'purple' },
      { label: 'Active Streak', value: '14 days', icon: Flame, className: 'orange' },
      { label: 'National Rank', value: '#342', icon: Award, className: 'emerald' },
    ],
    [],
  );

  return (
    <div className="dash-root" data-theme={darkMode ? 'dark' : 'light'}>
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="dash-brand">
          <img src="/esisa-logo.svg" alt="ESISA" className="dash-brand-logo" />
          <div>
            <div className="dash-brand-name">ESISA</div>
            <div className="dash-brand-sub">Espace Etudiant</div>
          </div>
        </div>

        <nav className="dash-side-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`dash-side-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.id);
                  navigate(navPathById[item.id]);
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {isActive && <span className="dash-nav-active-dot" />}
              </button>
            );
          })}
        </nav>

        <button className="dash-nav-logout" onClick={() => navigate('/')} type="button">
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <div>
            <div className="dash-greeting-sub">Welcome back</div>
            <div className="dash-greeting-name">Youssef Amrani</div>
          </div>

          <div className="dash-header-actions">
            <button type="button" className="dash-header-btn" aria-label="Toggle theme" onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button type="button" className="dash-header-btn" aria-label="Notifications">
              <Bell size={16} />
            </button>
            <button type="button" className="dash-header-btn dash-menu-btn" aria-label="Toggle sidebar" onClick={() => setSidebarOpen((prev) => !prev)}>
              <Menu size={16} />
            </button>
          </div>
        </header>

        <div className="dash-content">
          <section className="dash-welcome-banner">
            <div>
              <h1 className="dash-welcome-title">Student Dashboard</h1>
              <p className="dash-welcome-sub">Track your profile growth and discover matching opportunities.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="dash-chip"><Network size={12} /> ESISA Network</span>
              <span className="dash-chip"><TrendingUp size={12} /> Live Market</span>
              <span className="dash-chip"><Brain size={12} /> AI Coach</span>
            </div>
          </section>

          <section className="dash-stats">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <article key={stat.label} className="dash-stat-card">
                  <div className="dash-stat-top">
                    <div className={`dash-stat-icon ${stat.className}`}>
                      <Icon size={18} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
                      <ArrowUp size={12} />
                      +5%
                    </div>
                  </div>
                  <div className="dash-stat-label">{stat.label}</div>
                  <div className="dash-stat-value">{stat.value}</div>
                </article>
              );
            })}
          </section>

          <section className="dash-jobs">
            {jobs.map((job) => (
              <article key={job.id} className="dash-job-card">
                <div className="dash-job-top">
                  <div>
                    <h3 className="dash-job-title">{job.title}</h3>
                    <p className="dash-job-company">{job.company}</p>
                  </div>
                  <div className="dash-job-match">{job.match}</div>
                </div>

                <div className="dash-job-meta">
                  <span><MapPin size={12} /> {job.location}</span>
                  <span><Clock size={12} /> {job.type}</span>
                  <span className="salary">{job.salary}</span>
                </div>

                <div className="dash-job-skills">
                  {job.skills.map((skill) => (
                    <span key={skill} className="dash-job-skill">{skill}</span>
                  ))}
                </div>

                <button type="button" className="dash-job-apply">Apply</button>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
