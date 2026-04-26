import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BellRing,
  BookmarkCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  FileText,
  Flame,
  GraduationCap,
  LayoutGrid,
  Moon,
  PanelLeftOpen,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  UserRound,
  WandSparkles,
  X,
} from 'lucide-react';
import './styles/StudentDashboard.css';

type StatItem = {
  label: string;
  value: string;
  hint: string;
  icon: JSX.Element;
};

const stats: StatItem[] = [
  {
    label: 'Profile Completion',
    value: '86%',
    hint: '+12% this month',
    icon: <UserRound size={20} />,
  },
  {
    label: 'Matched Opportunities',
    value: '24',
    hint: '7 new this week',
    icon: <BriefcaseBusiness size={20} />,
  },
  {
    label: 'CV Score',
    value: '91',
    hint: 'Excellent readiness',
    icon: <FileText size={20} />,
  },
  {
    label: 'Applications Sent',
    value: '14',
    hint: '4 pending review',
    icon: <TrendingUp size={20} />,
  },
];

const tasks = [
  { title: 'Finalize AI-generated CV summary', due: 'Today', status: 'high' },
  { title: 'Submit motivation letter for Data Analyst Internship', due: 'Tomorrow', status: 'medium' },
  { title: 'Upload portfolio project links', due: 'This week', status: 'low' },
  { title: 'Book mock interview with mentor', due: 'This week', status: 'medium' },
];

const opportunities = [
  { company: 'Capgemini', role: 'Junior Data Analyst', type: 'Internship', fit: '95% match' },
  { company: 'Orange Digital Center', role: 'Frontend Developer', type: 'Part-time', fit: '90% match' },
  { company: 'Deloitte', role: 'Business Intelligence Trainee', type: 'Internship', fit: '88% match' },
  { company: 'Accenture', role: 'AI Product Assistant', type: 'Graduate Program', fit: '85% match' },
];

const timeline = [
  { text: 'CV analysis completed with new recommendations', time: '2 hours ago' },
  { text: 'New opportunity from Capgemini added to your list', time: '5 hours ago' },
  { text: 'Motivation letter draft generated for Orange Digital Center', time: 'Yesterday' },
  { text: 'Mentor approved your profile headline update', time: '2 days ago' },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [autoTracker, setAutoTracker] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('esisa-theme') === 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem('esisa-theme', darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <div className="student-dashboard" data-theme={darkMode ? 'dark' : 'light'}>
      <div className="dashboard-bg-blobs" />
      <div className="dashboard-bg-grid" />

      <motion.button
        className="sidebar-toggle-fab"
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label="Toggle dashboard controls"
        whileHover={{ x: 4 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {sidebarOpen ? <X size={16} /> : <PanelLeftOpen size={16} />}
        <span>Controls</span>
      </motion.button>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button
              className="dashboard-sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close controls sidebar"
            />

            <motion.aside
              className="dashboard-sidebar"
              initial={{ x: -340, opacity: 0.75 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -340, opacity: 0.75 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <div className="sidebar-top">
                <p>Control Center</p>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                  <X size={15} />
                </button>
              </div>

              <div className="sidebar-block">
                <h4>
                  <SlidersHorizontal size={15} /> Dashboard Preferences
                </h4>

                <div className="sidebar-switch-row">
                  <div>
                    <p>Focus mode</p>
                    <small>Prioritize key tasks and deadlines</small>
                  </div>
                  <button
                    className={`sidebar-switch ${focusMode ? 'is-on' : ''}`}
                    onClick={() => setFocusMode((prev) => !prev)}
                    aria-label="Toggle focus mode"
                  />
                </div>

                <div className="sidebar-switch-row">
                  <div>
                    <p>AI alert nudges</p>
                    <small>Get smart reminders for opportunities</small>
                  </div>
                  <button
                    className={`sidebar-switch ${aiAlerts ? 'is-on' : ''}`}
                    onClick={() => setAiAlerts((prev) => !prev)}
                    aria-label="Toggle AI alerts"
                  />
                </div>

                <div className="sidebar-switch-row">
                  <div>
                    <p>Auto progress tracker</p>
                    <small>Track profile improvements automatically</small>
                  </div>
                  <button
                    className={`sidebar-switch ${autoTracker ? 'is-on' : ''}`}
                    onClick={() => setAutoTracker((prev) => !prev)}
                    aria-label="Toggle auto tracker"
                  />
                </div>
              </div>

              <div className="sidebar-block">
                <h4>
                  <WandSparkles size={15} /> Quick Actions
                </h4>
                <div className="sidebar-actions-grid">
                  <button className="sidebar-action-btn"><BookmarkCheck size={14} /> Save Weekly Plan</button>
                  <button className="sidebar-action-btn"><BellRing size={14} /> Configure Alerts</button>
                  <button className="sidebar-action-btn"><Settings2 size={14} /> Profile Preferences</button>
                </div>
              </div>

              <motion.div
                className="sidebar-glow-card"
                animate={{ backgroundPositionX: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <p>Momentum score</p>
                <strong>92 / 100</strong>
                <span>Top 8% among active students this week</span>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">
            <LayoutGrid size={18} />
          </div>
          <div>
            <p className="dashboard-label">Student Space</p>
            <h1 className="dashboard-title">ESISA Career Dashboard</h1>
          </div>
        </div>

        <div className="dashboard-header-actions">
          <button className="dashboard-btn dashboard-btn-ghost" onClick={() => navigate('/')}>
            Back to Home
          </button>
          <button
            className="dashboard-btn dashboard-btn-icon"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <section className="dashboard-welcome">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="welcome-content"
        >
          <p className="dashboard-chip">
            <Sparkles size={14} /> AI-powered guidance enabled
          </p>
          <h2>Welcome back, Mouad. Your profile is gaining strong recruiter visibility.</h2>
          <p>
            Keep building momentum by completing your top tasks and applying to your best-fit company opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="welcome-metrics"
        >
          <div className="metric-highlight">
            <Flame size={18} />
            <div>
              <p>Activity Streak</p>
              <strong>9 days</strong>
            </div>
          </div>
          <div className="metric-highlight">
            <Target size={18} />
            <div>
              <p>Weekly Goal</p>
              <strong>3/5 completed</strong>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="stats-grid">
        {stats.map((item, idx) => (
          <motion.article
            key={item.label}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ delay: idx * 0.08 + 0.15, duration: 0.35 }}
            className="stat-card-dashboard"
          >
            <div className="stat-icon">{item.icon}</div>
            <p className="stat-heading">{item.label}</p>
            <p className="stat-number">{item.value}</p>
            <p className="stat-hint">{item.hint}</p>
          </motion.article>
        ))}
      </section>

      <section className="dashboard-main-grid">
        <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="dashboard-panel">
          <div className="panel-top">
            <h3>Priority Tasks</h3>
            <span><CheckCircle2 size={14} /> 4 active</span>
          </div>
          <div className="task-list">
            {tasks.map((task) => (
              <motion.div whileHover={{ x: 4 }} key={task.title} className={`task-item task-${task.status}`}>
                <div>
                  <p className="task-title">{task.title}</p>
                  <p className="task-due"><Clock3 size={13} /> Due {task.due}</p>
                </div>
                <button className="task-action">Open</button>
              </motion.div>
            ))}
          </div>
        </motion.article>

        <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="dashboard-panel">
          <div className="panel-top">
            <h3>Upcoming Schedule</h3>
            <span><CalendarCheck2 size={14} /> This week</span>
          </div>
          <div className="schedule-block">
            <div className="schedule-item">
              <p>Mock interview session</p>
              <strong>Tuesday - 14:30</strong>
            </div>
            <div className="schedule-item">
              <p>CV review with mentor</p>
              <strong>Wednesday - 11:00</strong>
            </div>
            <div className="schedule-item">
              <p>Company webinar: Data Careers</p>
              <strong>Friday - 16:00</strong>
            </div>
          </div>
        </motion.article>
      </section>

      <section className="dashboard-main-grid">
        <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="dashboard-panel">
          <div className="panel-top">
            <h3>Recommended Opportunities</h3>
            <span><GraduationCap size={14} /> Partner companies</span>
          </div>
          <div className="opportunity-list">
            {opportunities.map((opportunity) => (
              <motion.div whileHover={{ x: 4 }} key={opportunity.company + opportunity.role} className="opportunity-item">
                <div>
                  <p className="opportunity-company">{opportunity.company}</p>
                  <p className="opportunity-role">{opportunity.role}</p>
                </div>
                <div className="opportunity-meta">
                  <span>{opportunity.type}</span>
                  <strong>{opportunity.fit}</strong>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.article>

        <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="dashboard-panel">
          <div className="panel-top">
            <h3>Activity Timeline</h3>
            <span><Clock3 size={14} /> Recent updates</span>
          </div>
          <div className="timeline-list">
            {timeline.map((event) => (
              <motion.div whileHover={{ x: 4 }} key={event.text} className="timeline-item">
                <div className="timeline-dot" />
                <div>
                  <p>{event.text}</p>
                  <small>{event.time}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.article>
      </section>
    </div>
  );
}
