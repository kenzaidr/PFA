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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ MAIN DASHBOARD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function StudentDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Welcome!' }]);
  const [time, setTime] = useState(new Date());
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { const iv = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(iv); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    setMessages(m => [...m, { role: 'user', text: chatInput.trim() }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(m => [...m, { role: 'ai', text: 'Thank you for your question!' }]);
    }, 1000);
  };

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'skills', icon: Brain, label: 'Skills' },
    { id: 'market', icon: TrendingUp, label: 'Market' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs' },
    { id: 'roadmap', icon: BookOpen, label: 'Roadmap' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#070711', minHeight: '100vh', display: 'flex', color: 'white', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        .nav-item { transition: all 0.2s; border-radius: 12px; cursor:pointer; padding: 10px 12px; }
        .nav-item:hover { background: rgba(255,255,255,0.05); }
        .nav-item.active { background: rgba(99,102,241,0.15); }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{
        width: sidebarOpen ? 240 : 72, minHeight: '100vh', flexShrink: 0,
        background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1)',
        overflow: 'hidden', position: 'relative', zIndex: 40,
      }}>
        <div style={{ padding: '24px 16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Network size={18} color="white" />
            </div>
            {sidebarOpen && <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: -0.5 }}>SKILL<span style={{ color: '#818cf8' }}>MAP</span></span>}
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(({ id, icon: Icon, label }) => (
            <div key={id} className={`nav-item ${activeNav === id ? 'active' : ''}`}
              onClick={() => setActiveNav(id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
              <Icon size={18} color={activeNav === id ? '#818cf8' : '#6b7280'} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 500, color: activeNav === id ? '#c7d2fe' : '#9ca3af' }}>{label}</span>}
            </div>
          ))}
        </nav>

        <div style={{ padding: '16px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="nav-item" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogOut size={18} color="#6b7280" />
            {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Logout</span>}
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflow: 'hidden' }}>
        <header style={{ padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: 'white', margin: 0 }}>Student Dashboard</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setSidebarOpen(s => !s)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <Menu size={20} />
            </button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{ fontSize: 16, color: '#9ca3af' }}>Dashboard content goes here</div>
        </div>
      </main>
    </div>
  );
}
