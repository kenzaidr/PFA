import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeLang } from '../contexts/ThemeLangContext.jsx';
import {
  LayoutDashboard, Brain, TrendingUp, Briefcase, BookOpen, MessageSquare,
  Bell, Settings, LogOut, ChevronRight, Star, Zap, Target, Award,
  ArrowUp, MapPin, Clock, CheckCircle, Circle, Globe, Moon, Sun,
  Network, Flame, BarChart2, Users, Sparkles, Send, Bot, ChevronDown,
  Play, Lock, X, Menu, Search, Filter
} from 'lucide-react';

/* ─── i18n ─── */
const i18n = {
  fr: {
    greeting: 'Bonjour', student: 'Youssef Amrani', role: 'Étudiant — ESISA Fès',
    overview: 'Vue d\'ensemble', skills: 'Mes Skills', market: 'Market Pulse',
    jobs: 'Offres', roadmap: 'Roadmap', coach: 'AI Coach', settings: 'Paramètres',
    logout: 'Déconnexion',
    statLabels: ['Score Global', 'Offres Matchées', 'Streak Actif', 'Rang National'],
    statVals: ['87/100', '23', '14 jours', '#342'],
    statDeltas: ['+5 ce mois', '+8 nouvelles', '🔥 Record!', '↑ +58 places'],
    dnaTitle: 'Skill DNA', dnaLive: 'Analyse en direct',
    marketTitle: 'Market Pulse', marketSub: 'Salaires en temps réel — Maroc',
    jobsTitle: 'Offres pour toi', jobsSub: 'Matchées à ton profil',
    actTitle: 'Activité Récente',
    coachTitle: 'AI Coach', coachSub: 'Propulsé par SKILLMAP AI',
    coachPlaceholder: 'Pose ta question...',
    coachWelcome: 'Salut Youssef ! 👋 Je suis ton coach IA. Je vois que tu progresses bien en React — tu veux qu\'on attaque System Design aujourd\'hui ? C\'est ta plus grande lacune pour les entretiens senior.',
    roadmapTitle: 'Ta Roadmap', roadmapSub: 'Vers Senior Full-Stack',
    apply: 'Postuler', viewAll: 'Voir tout',
    notifications: 'Notifications',
    notifList: [
      { text: 'Nouvelle offre matchée à 96%', time: 'Il y a 2min', type: 'job' },
      { text: 'Tu as atteint le niveau Senior React 🎉', time: 'Il y a 1h', type: 'badge' },
      { text: 'Entretien simulé disponible', time: 'Il y a 3h', type: 'coach' },
    ],
  },
  en: {
    greeting: 'Hello', student: 'Youssef Amrani', role: 'Student — ESISA Fès',
    overview: 'Overview', skills: 'My Skills', market: 'Market Pulse',
    jobs: 'Jobs', roadmap: 'Roadmap', coach: 'AI Coach', settings: 'Settings',
    logout: 'Logout',
    statLabels: ['Global Score', 'Matched Jobs', 'Active Streak', 'National Rank'],
    statVals: ['87/100', '23', '14 days', '#342'],
    statDeltas: ['+5 this month', '+8 new', '🔥 Record!', '↑ +58 places'],
    dnaTitle: 'Skill DNA', dnaLive: 'Live Analysis',
    marketTitle: 'Market Pulse', marketSub: 'Real-time salaries — Morocco',
    jobsTitle: 'Jobs for you', jobsSub: 'Matched to your profile',
    actTitle: 'Recent Activity',
    coachTitle: 'AI Coach', coachSub: 'Powered by SKILLMAP AI',
    coachPlaceholder: 'Ask your question...',
    coachWelcome: 'Hey Youssef! 👋 I\'m your AI coach. I see you\'re progressing well in React — want to tackle System Design today? It\'s your biggest gap for senior interviews.',
    roadmapTitle: 'Your Roadmap', roadmapSub: 'Towards Senior Full-Stack',
    apply: 'Apply', viewAll: 'View all',
    notifications: 'Notifications',
    notifList: [
      { text: 'New offer matched at 96%', time: '2min ago', type: 'job' },
      { text: 'You reached Senior React level 🎉', time: '1h ago', type: 'badge' },
      { text: 'Simulated interview available', time: '3h ago', type: 'coach' },
    ],
  },
};

import { RadarChart } from '../components/ui/RadarChart.jsx';
import { MiniBar } from '../components/ui/MiniBar.jsx';
import { JobCard } from '../components/ui/JobCard.jsx';
import { RoadStep } from '../components/ui/RoadStep.jsx';
import { PageHeader as PH } from '../components/layout/PageHeader.jsx';
import { ProfilePanel } from '../components/layout/ProfilePanel.jsx';
import { OverviewTab as OverviewPage } from '../components/dashboard/OverviewTab.jsx';
import { SkillsTab as SkillsPage } from '../components/dashboard/SkillsTab.jsx';
import { MarketTab as MarketPage } from '../components/dashboard/MarketTab.jsx';
import { JobsTab as JobsPage } from '../components/dashboard/JobsTab.jsx';
import { RoadmapTab as RoadmapPage } from '../components/dashboard/RoadmapTab.jsx';
import { CoachTab as CoachPage } from '../components/dashboard/CoachTab.jsx';
import { SettingsTab as SettingsPage } from '../components/dashboard/SettingsTab.jsx';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ MAIN DASHBOARD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function StudentDashboard() {
  const { lang, theme, toggleTheme, toggleLang } = useThemeLang();
  const t = i18n[lang];
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'ai', text: t.coachWelcome }]);
  const [time, setTime] = useState(new Date());
  const chatEndRef = useRef(null);

  useEffect(() => { const iv = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(iv); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      const replies = [
        'Excellente question ! Pour System Design, commence par les bases : Load Balancer, CDN, et Database Sharding. Veux-tu une roadmap détaillée ?',
        'Je vois que tu travailles dur ! Tu es dans le top 5% des étudiants ESISA sur notre plateforme. Continue comme ça 💪',
        'Basé sur ton profil, je recommande de pratiquer LeetCode Medium 3x/semaine. Tu seras prêt pour OCP en 6 semaines.',
      ];
      setMessages(m => [...m, { role: 'ai', text: replies[Math.floor(Math.random() * replies.length)] }]);
    }, 1000);
  };

  const radarData = [
    { label: 'React', value: 92 }, { label: 'Python', value: 78 },
    { label: 'DevOps', value: 65 }, { label: 'SQL', value: 80 },
    { label: 'System\nDesign', value: 52 }, { label: 'TypeScript', value: 70 },
  ];

  const marketData = [
    { skill: 'React Senior', salary: '18-25k DH', trend: '+18%', color: '#818cf8' },
    { skill: 'ML Engineer', salary: '20-28k DH', trend: '+31%', color: '#34d399' },
    { skill: 'DevOps/K8s', salary: '22-30k DH', trend: '+25%', color: '#fb923c' },
    { skill: 'Data Analyst', salary: '12-18k DH', trend: '+12%', color: '#a78bfa' },
    { skill: 'Full-Stack JS', salary: '15-22k DH', trend: '+20%', color: '#38bdf8' },
  ];

  const jobs = [
    { title: 'React Developer', company: 'OCP Digital', match: 96, location: 'Casablanca', salary: '18 000 – 22 000 DH/mo', tags: ['React', 'TypeScript', 'GraphQL'] },
    { title: 'Full-Stack Engineer', company: 'Capgemini MA', match: 89, location: 'Rabat', salary: '15 000 – 20 000 DH/mo', tags: ['Node.js', 'Vue', 'AWS'] },
    { title: 'Frontend Lead', company: 'CIH Bank', match: 83, location: 'Fès', salary: '20 000 – 26 000 DH/mo', tags: ['React', 'Redux', 'CI/CD'] },
  ];

  const activities = [
    { icon: CheckCircle, color: 'emerald', text: 'Module "Hooks avancés" terminé', time: '10min' },
    { icon: Star, color: 'yellow', text: 'Score entretien simulé : 91/100', time: '2h' },
    { icon: Briefcase, color: 'indigo', text: 'Profil consulté par OCP Digital', time: '4h' },
    { icon: Award, color: 'violet', text: 'Badge "Senior React" débloqué', time: '1j' },
    { icon: Brain, color: 'rose', text: 'Nouveau skill détecté : Next.js App Router', time: '2j' },
  ];

  const roadSteps = [
    { icon: CheckCircle, title: 'React Fondamentaux', sub: '12 modules · Terminé', done: true },
    { icon: Brain, title: 'React Avancé & Hooks', sub: '8 modules · En cours', inProgress: true },
    { icon: BarChart2, title: 'System Design', sub: '10 modules', done: false },
    { icon: Briefcase, title: 'Préparation Entretiens', sub: '6 modules', locked: true },
    { icon: Award, title: 'Certification Senior', sub: 'Examen final', locked: true },
  ];

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: t.overview },
    { id: 'skills', icon: Brain, label: t.skills },
    { id: 'market', icon: TrendingUp, label: t.market },
    { id: 'jobs', icon: Briefcase, label: t.jobs },
    { id: 'roadmap', icon: BookOpen, label: t.roadmap },
    { id: 'coach', icon: MessageSquare, label: t.coach },
    { id: 'settings', icon: Settings, label: t.settings },
  ];

  const colorMap = { emerald: '#34d399', yellow: '#fbbf24', indigo: '#818cf8', violet: '#a78bfa', rose: '#fb7185' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#070711', minHeight: '100vh', display: 'flex', color: 'white', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }
        ::selection { background: rgba(99,102,241,0.3); }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse2 { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .fade-in { animation: fadeSlide 0.4s ease forwards; }
        .nav-item { transition: all 0.2s; border-radius: 12px; cursor:pointer; }
        .nav-item:hover { background: rgba(255,255,255,0.05); }
        .nav-item.active { background: rgba(99,102,241,0.15); }
        .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; }
        .grad-text { background: linear-gradient(135deg,#a5b4fc,#818cf8,#c084fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ai-bubble { background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.2); border-radius: 0 16px 16px 16px; }
        .user-bubble { background: linear-gradient(135deg,#6366f1,#8b5cf6); border-radius: 16px 0 16px 16px; }
        .stat-glow:hover { box-shadow: 0 0 30px rgba(99,102,241,0.15); }
        .notif-panel { background: rgba(10,10,25,0.95); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-radius: 16px; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: sidebarOpen ? 240 : 72, minHeight: '100vh', flexShrink: 0,
        background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1)',
        overflow: 'hidden', position: 'relative', zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Network size={18} color="white" />
            </div>
            {sidebarOpen && <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: -0.5 }}>SKILL<span style={{ color: '#818cf8' }}>MAP</span></span>}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(({ id, icon: Icon, label }) => (
            <div key={id} className={`nav-item ${activeNav === id ? 'active' : ''}`}
              onClick={() => setActiveNav(id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', whiteSpace: 'nowrap' }}>
              <Icon size={18} color={activeNav === id ? '#818cf8' : '#6b7280'} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 500, color: activeNav === id ? '#c7d2fe' : '#9ca3af' }}>{label}</span>}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="nav-item" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
            <LogOut size={18} color="#6b7280" />
            {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>{t.logout}</span>}
          </div>
          {/* Toggle sidebar */}
          <button onClick={() => setSidebarOpen(s => !s)} style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: sidebarOpen ? 'flex-end' : 'center', padding: '6px 12px', cursor: 'pointer', background: 'none', border: 'none', color: '#4b5563' }}>
            <Menu size={16} />
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Header */}
        <header style={{ padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, backdropFilter: 'blur(20px)', background: 'rgba(7,7,17,0.7)', position: 'sticky', top: 0, zIndex: 30 }}>
          <div>
            <p style={{ fontSize: 13, color: '#6b7280' }}>{time.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginTop: 2 }}>{t.greeting}, <span className="grad-text">{t.student.split(' ')[0]}</span> 👋</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Search size={14} color="#6b7280" />
              <input placeholder="Rechercher..." style={{ background: 'none', border: 'none', outline: 'none', color: '#9ca3af', fontSize: 13, width: 140 }} />
            </div>

            <button onClick={toggleLang} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              <Globe size={14} />{lang.toUpperCase()}
            </button>

            <button onClick={toggleTheme} style={{ padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotif(v => !v)} style={{ position: 'relative', padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Bell size={16} />
                <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#f87171', border: '2px solid #070711', animation: 'pulse2 2s infinite' }} />
              </button>
              {showNotif && (
                <div className="notif-panel" style={{ position: 'absolute', right: 0, top: 44, width: 300, padding: 16, zIndex: 100 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{t.notifications}</span>
                    <button onClick={() => setShowNotif(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={14} /></button>
                  </div>
                  {t.notifList.map((n, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < t.notifList.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.type === 'job' ? '#34d399' : n.type === 'badge' ? '#fbbf24' : '#818cf8', marginTop: 3, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 13, color: '#e5e7eb' }}>{n.text}</p>
                        <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar + Profile Panel */}
            <div style={{ position: 'relative' }}>
              <div onClick={() => { setShowProfile(v => !v); setShowNotif(false); }} style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 0 16px rgba(99,102,241,0.35)', userSelect: 'none' }}>YA</div>
              {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} onSettings={() => setActiveNav('settings')} />}
            </div>
          </div>
        </header>

        {/* Content area */}
        <div key={activeNav} style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }} className="fade-in">

          {/* ── PAGE ROUTER ── */}
          {activeNav === 'overview'  && <OverviewPage t={t} radarData={radarData} marketData={marketData} jobs={jobs} activities={activities} roadSteps={roadSteps} colorMap={colorMap} messages={messages} chatInput={chatInput} setChatInput={setChatInput} sendMsg={sendMsg} chatEndRef={chatEndRef} />}
          {activeNav === 'skills'    && <SkillsPage   t={t} radarData={radarData} />}
          {activeNav === 'market'    && <MarketPage   t={t} marketData={marketData} />}
          {activeNav === 'jobs'      && <JobsPage     t={t} jobs={jobs} />}
          {activeNav === 'roadmap'   && <RoadmapPage  t={t} roadSteps={roadSteps} />}
          {activeNav === 'coach'     && <CoachPage    t={t} messages={messages} chatInput={chatInput} setChatInput={setChatInput} sendMsg={sendMsg} chatEndRef={chatEndRef} />}
          {activeNav === 'settings'  && <SettingsPage t={t} lang={lang} theme={theme} toggleTheme={toggleTheme} toggleLang={toggleLang} />}

        </div>
      </main>
    </div>
  );
}
