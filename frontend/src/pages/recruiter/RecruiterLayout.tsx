import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  Calendar,
  BookOpen,
  Trello
} from 'lucide-react';
import '../../styles/RecruiterDashboard.css';
import EditProfileModal from './EditProfileModal';

export default function RecruiterLayout() {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#050B14' : '#F8FAFC';
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // Map path to breadcrumb
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/recruiter') return 'Overview';
    if (path.includes('candidates')) return 'Candidates';
    if (path.includes('pipeline')) return 'Pipeline';
    if (path.includes('jobs')) return 'Job Postings';
    if (path.includes('calendar')) return 'Calendar';
    if (path.includes('notebook')) return 'Notebook';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="dashboard-root">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="dashboard-sidebar-overlay" 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${mobileSidebarOpen ? 'dashboard-sidebar--open' : ''}`}>
        <div className="dashboard-brand">
          <img src="/esisa-logo.svg" alt="ESISA Logo" className="dashboard-brand-logo" />
          <div className="dashboard-brand-text">
            <h2>ESISA</h2>
            <p>Recruiter</p>
          </div>
        </div>

        <nav className="dashboard-nav">
          <NavLink 
            to="/recruiter" 
            end 
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} className="dashboard-nav-icon" />
            Overview
          </NavLink>
          <NavLink 
            to="/recruiter/candidates" 
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <Users size={18} className="dashboard-nav-icon" />
            Candidates
          </NavLink>
          <NavLink 
            to="/recruiter/pipeline" 
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <Trello size={18} className="dashboard-nav-icon" />
            Pipeline
          </NavLink>
          <NavLink 
            to="/recruiter/jobs" 
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <Briefcase size={18} className="dashboard-nav-icon" />
            Job Postings
          </NavLink>
          <NavLink 
            to="/recruiter/calendar" 
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <Calendar size={18} className="dashboard-nav-icon" />
            Calendar
          </NavLink>
          <NavLink 
            to="/recruiter/notebook" 
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} className="dashboard-nav-icon" />
            Notebook
          </NavLink>
          <NavLink 
            to="/recruiter/settings" 
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <Settings size={18} className="dashboard-nav-icon" />
            Settings
          </NavLink>
        </nav>

        <div className="dashboard-sidebar-footer">
          <button className="dashboard-nav-item" onClick={() => console.log('Logout')}>
            <LogOut size={18} className="dashboard-nav-icon" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumbs">
            <button 
              className="dashboard-hamburger" 
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <span className="breadcrumb-text">Recruiter</span>
            <span className="breadcrumb-slash" style={{ opacity: 0.5 }}>/</span>
            <span className="current">{getPageTitle()}</span>
          </div>

          <div className="dashboard-topbar-actions">
            <div className="dashboard-search">
              <Search size={16} className="dashboard-search-icon" />
              <input 
                type="text" 
                placeholder="Search candidates or jobs..." 
                className="dashboard-search-input" 
              />
            </div>

            <button 
              className="dashboard-icon-btn" 
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="dashboard-icon-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="dashboard-notification-badge" />
            </button>

            <div className="dashboard-user-profile" onClick={() => setIsProfileModalOpen(true)}>
              <div className="dashboard-avatar">T</div>
              <div className="dashboard-user-info">
                <span className="dashboard-user-name">TechCorp Inc.</span>
                <span className="dashboard-user-role">Recruiting Team</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="dashboard-content-scroll">
          <Outlet />
        </div>
      </main>

      <EditProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </div>
  );
}
