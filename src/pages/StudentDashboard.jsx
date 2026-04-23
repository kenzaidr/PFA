import { useState } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

/* ─── Sidebar item ──────────────────────────────────────── */
function NavItem({ icon: Ic, label, active, onClick, badge }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer text-left group ${
        active ? 'bg-[#1e3a8a]/20 border border-[#1e3a8a]/30 text-white shadow-lg shadow-blue-900/10' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
      }`}>
      <Ic className={`w-4 h-4 shrink-0 ${active ? 'text-[#2563eb]' : 'text-slate-500 group-hover:text-slate-300'}`} />
      <span className="text-sm font-medium">{label}</span>
      {badge && <span className="ml-auto text-xs bg-[#c0392b] text-white px-1.5 py-0.5 rounded-full font-bold">{badge}</span>}
    </button>
  );
}

/* ─── DNA Score Ring ────────────────────────────────────── */
function DNARing({ score }) {
  const r = 52, circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <circle cx="65" cy="65" r={r} fill="none" stroke="url(#dnaGrad)" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${filled} ${circ}`}
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.25,1,0.5,1)' }} />
        <defs>
          <linearGradient id="dnaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{score}</span>
        <span className="text-xs text-slate-500 font-medium">/ 100</span>
      </div>
    </div>
  );
}

/* ─── Mock data ─────────────────────────────────────────── */
const MATCHES = [
  { company: 'OCP Group',          role: 'Développeur React Senior', loc: 'Casablanca', salary: '12–15K DH/m', match: 97, tags: ['React', 'Node.js'],     applied: false },
  { company: 'Inwi',                role: 'Data Engineer',           loc: 'Rabat',       salary: '10–13K DH/m', match: 88, tags: ['Python', 'SQL'],        applied: false },
  { company: 'Maroc Telecom',       role: 'Full Stack Developer',    loc: 'Rabat',       salary: '11–14K DH/m', match: 85, tags: ['React', 'Docker'],      applied: true  },
  { company: 'Attijariwafa Bank',   role: 'MLOps Engineer',          loc: 'Casablanca', salary: '13–16K DH/m', match: 82, tags: ['Python', 'AI/ML'],      applied: false },
  { company: 'CBI',                 role: 'DevOps Engineer',         loc: 'Casablanca', salary: '10–12K DH/m', match: 79, tags: ['Docker', 'CI/CD'],      applied: false },
];

const SKILLS = [
  { name: 'React.js', score: 91, trend: '+3', color: 'from-blue-700 to-blue-400' },
  { name: 'Python',   score: 84, trend: '+7', color: 'from-blue-500 to-blue-500' },
  { name: 'SQL',      score: 88, trend: '+2', color: 'from-blue-700 to-teal-400' },
  { name: 'Docker',   score: 73, trend: '+5', color: 'from-emerald-500 to-green-400' },
  { name: 'Node.js',  score: 79, trend: '+1', color: 'from-yellow-500 to-orange-400' },
  { name: 'AI/ML',    score: 67, trend: '+12', color: 'from-pink-500 to-rose-400' },
];

const SIMULATIONS = [
  { type: 'Entretien Technique React', date: '14 Avr 2026', time: '10:00', status: 'upcoming' },
  { type: 'Algorithmes & Structures', date: '10 Avr 2026', score: 87, status: 'done' },
  { type: 'System Design Interview',   date: '8 Avr 2026',  score: 76, status: 'done' },
  { type: 'Live Coding JavaScript',    date: '5 Avr 2026',  score: 91, status: 'done' },
];

const ROADMAP = [
  { skill: 'TypeScript',     pct: 45, priority: 'Haute',   est: '3 semaines', color: 'from-blue-700 to-blue-400' },
  { skill: 'Kubernetes',     pct: 30, priority: 'Moyenne', est: '5 semaines', color: 'from-blue-700 to-blue-400' },
  { skill: 'LangChain/LLM',  pct: 20, priority: 'Haute',   est: '6 semaines', color: 'from-pink-500 to-rose-400' },
  { skill: 'GraphQL',        pct: 60, priority: 'Faible',  est: '2 semaines', color: 'from-emerald-500 to-teal-400' },
];

const NAV = [
  { id: 'overview',     label: 'Vue d\'ensemble',  Icon: 'Home'     },
  { id: 'matches',      label: 'Mes Matches',       Icon: 'Matches'  },
  { id: 'simulations',  label: 'Simulations IA',    Icon: 'Sim'      },
  { id: 'roadmap',      label: 'Ma Roadmap',         Icon: 'Roadmap'  },
  { id: 'settings',     label: 'Paramètres',         Icon: 'Settings' },
];

function HomeIcon({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function MatchIcon({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function SimIcon({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 6M15 9l-6 6"/></svg>;
}
function RoadmapIcon({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>;
}
function SettingsIcon({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
}

const ICON_MAP = { Home: HomeIcon, Matches: MatchIcon, Sim: SimIcon, Roadmap: RoadmapIcon, Settings: SettingsIcon };

/* ─── STUDENT DASHBOARD ─────────────────────────────────── */
export default function StudentDashboard() {
  const { navigate, routeState } = useRouter();
  const [tab, setTab] = useState('overview');
  const [applied, setApplied] = useState({});
  const userName = routeState?.name || 'Ayman Benali';

  const applyTo = (i) => setApplied((p) => ({ ...p, [i]: true }));

  return (
    <div className="min-h-screen flex bg-[#0f1035]">
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-white/[0.06] bg-[#09090f] shrink-0 sticky top-0 h-screen">
        {/* ESISA Logo + Branding */}
        <div className="p-4 border-b border-white/[0.08]">
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
            <img src="/esisa-logo.png" alt="ESISA" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-white uppercase tracking-wider">Portail Carrière</span>
              <span className="text-[9px] text-blue-400 font-semibold tracking-wide">ESISA · Avenir Ingenieur</span>
            </div>
          </button>
        </div>

        {/* User card */}
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] flex items-center justify-center text-sm font-bold text-white shrink-0">
              {userName.split(' ').map((x) => x[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">{userName}</div>
              <div className="text-[10px] text-blue-400 font-semibold">Étudiant · Score 94</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((n) => (
            <NavItem key={n.id} icon={ICON_MAP[n.Icon]} label={n.label}
              active={tab === n.id} onClick={() => setTab(n.id)}
              badge={n.id === 'matches' ? '5' : n.id === 'simulations' ? '1' : null} />
          ))}
        </nav>

        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <NavItem icon={Icons.Upload} label="Mettre à jour mon CV" onClick={() => navigate('upload')} active={false} />
          <button onClick={() => navigate('home')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#0f1035]/90 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-white tracking-tight">
              {tab === 'overview' ? `Bonjour, ${userName.split(' ')[0]} 👋` :
               tab === 'matches' ? 'Mes Matches' :
               tab === 'simulations' ? 'Simulations IA' :
               tab === 'roadmap' ? 'Ma Roadmap de Compétences' : 'Paramètres'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Dernière mise à jour: aujourd'hui à 09:32</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('checkout', { plan: 'Pro Candidat', price: '49 DH/mois' })}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer flex items-center gap-1.5">
              <Icons.Spark className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Passer Pro</span>
            </button>
          </div>
        </header>

        <main className="p-6 max-w-6xl mx-auto space-y-6">

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <>
              {/* Top stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'DNA Score', val: '94/100', sub: 'Top 8%', color: 'text-blue-400' },
                  { label: 'Matches actifs', val: '5', sub: '2 nouveaux', color: 'text-blue-400' },
                  { label: 'Simulations', val: '4', sub: 'Moy. 85/100', color: 'text-emerald-400' },
                  { label: 'Vues profil', val: '23', sub: '+11 cette semaine', color: 'text-yellow-400' },
                ].map((s) => (
                  <div key={s.label} className="glass gradient-border rounded-2xl p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">{s.label}</div>
                    <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* DNA + Skills */}
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="glass gradient-border rounded-2xl p-6">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Skill DNA</div>
                  <DNARing score={94} />
                  <div className="text-center mt-4">
                    <span className="text-sm text-slate-400">14 compétences · </span>
                    <span className="text-sm text-emerald-400 font-semibold">7 opportunités ≥85%</span>
                  </div>
                  <button onClick={() => navigate('upload')}
                    className="btn-secondary w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 mt-4 cursor-pointer">
                    Mettre à jour mon CV
                  </button>
                </div>

                <div className="glass gradient-border rounded-2xl p-6">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Top Compétences</div>
                  <div className="space-y-3">
                    {SKILLS.map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-semibold text-slate-300">{s.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-emerald-400 font-bold">{s.trend}</span>
                            <span className="text-sm font-black text-white">{s.score}%</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Voir mes matches', sub: '5 disponibles', icon: '🎯', action: () => setTab('matches') },
                  { label: 'Démarrer simulation', sub: 'Entretien React', icon: '🤖', action: () => setTab('simulations') },
                  { label: 'Explorer roadmap', sub: 'TypeScript prioritaire', icon: '🗺️', action: () => setTab('roadmap') },
                ].map((a) => (
                  <button key={a.label} onClick={a.action}
                    className="glass glass-hover gradient-border rounded-2xl p-4 text-left cursor-pointer">
                    <div className="text-2xl mb-2">{a.icon}</div>
                    <div className="text-sm font-bold text-white">{a.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{a.sub}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── MATCHES ── */}
          {tab === 'matches' && (
            <div className="space-y-4">
              <div className="glass rounded-2xl p-4 flex flex-wrap gap-2">
                {['Tous', 'Casablanca', 'Rabat', '>85%', 'Remote'].map((f) => (
                  <button key={f} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:border-blue-600/40 hover:text-blue-300 transition-all cursor-pointer">
                    {f}
                  </button>
                ))}
              </div>
              {MATCHES.map((m, i) => (
                <div key={i} className="glass gradient-border rounded-2xl p-5 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/[0.08] flex items-center justify-center text-lg font-black text-white shrink-0">
                    {m.company[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-white">{m.role}</div>
                    <div className="text-sm text-slate-400">{m.company} · {m.loc} · {m.salary}</div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {m.tags.map((t) => (
                        <span key={t} className="text-[10px] bg-blue-700/15 border border-blue-700/30 text-blue-300 px-2 py-0.5 rounded-full font-semibold">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{m.match}%</div>
                      <div className="text-[10px] text-slate-500">match</div>
                    </div>
                    <button onClick={() => !applied[i] && applyTo(i)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        applied[i] || m.applied
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                          : 'btn-primary text-white'
                      }`}>
                      {applied[i] || m.applied
                        ? <span className="flex items-center gap-1"><Icons.Check className="w-3.5 h-3.5" />Candidature envoyée</span>
                        : <span className="relative z-10">Postuler</span>
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── SIMULATIONS ── */}
          {tab === 'simulations' && (
            <div className="space-y-5">
              <div className="glass gradient-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-700/20 border border-blue-700/30 flex items-center justify-center">
                    <span className="text-lg">📅</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">Prochain entretien</div>
                    <div className="text-slate-400 text-sm">Dans 3 jours</div>
                  </div>
                </div>
                {SIMULATIONS.filter((s) => s.status === 'upcoming').map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-blue-600/8 border border-blue-600/25 rounded-2xl">
                    <div>
                      <div className="font-bold text-white">{s.type}</div>
                      <div className="text-sm text-slate-400">{s.date} · {s.time} · 45 min</div>
                    </div>
                    <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer">
                      <span className="relative z-10">Rejoindre</span>
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Historique</div>
                <div className="space-y-3">
                  {SIMULATIONS.filter((s) => s.status === 'done').map((s, i) => (
                    <div key={i} className="glass rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">{s.type}</div>
                        <div className="text-xs text-slate-500">{s.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-lg font-black ${s.score >= 85 ? 'text-emerald-400' : 'text-yellow-400'}`}>{s.score}/100</div>
                        <button className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 cursor-pointer">Rejouer</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn-primary w-full py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer flex items-center justify-center gap-2">
                <span className="text-lg relative z-10">🤖</span>
                <span className="relative z-10">Démarrer une nouvelle simulation</span>
              </button>
            </div>
          )}

          {/* ── ROADMAP ── */}
          {tab === 'roadmap' && (
            <div className="space-y-5">
              <div className="glass gradient-border rounded-2xl p-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Objectif actuel</div>
                <div className="text-xl font-black text-white mb-1">Développeur Full-Stack Senior</div>
                <div className="text-slate-400 text-sm">4 compétences à acquérir pour atteindre ce niveau</div>
              </div>

              <div className="space-y-4">
                {ROADMAP.map((r, i) => (
                  <div key={i} className="glass gradient-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-white font-bold">{r.skill}</div>
                        <div className="text-xs text-slate-500 mt-0.5">Estimation: {r.est}</div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        r.priority === 'Haute' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        r.priority === 'Moyenne' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                      }`}>{r.priority}</span>
                    </div>
                    <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${r.color}`} style={{ width: `${r.pct}%`, transition: 'width 1s ease' }} />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                      <span>Progression: {r.pct}%</span>
                      <button className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">Voir les ressources →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === 'settings' && (
            <div className="glass gradient-border rounded-2xl p-8 space-y-6 max-w-xl">
              <div>
                <h3 className="text-white font-bold mb-4">Informations du profil</h3>
                {[['Nom', 'Ayman Benali'], ['Email', 'ayman@esisa.ac.ma'], ['École', 'ESISA · Promo 2024'], ['Ville', 'Casablanca']].map(([l, v]) => (
                  <div key={l} className="flex justify-between py-3 border-b border-white/[0.05]">
                    <span className="text-sm text-slate-400">{l}</span>
                    <span className="text-sm text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate('checkout', { plan: 'Pro Candidat', price: '49 DH/mois' })}
                  className="btn-primary py-3 rounded-xl text-sm font-bold text-white cursor-pointer">
                  <span className="relative z-10">Passer à la version Pro</span>
                </button>
                <button onClick={() => navigate('home')}
                  className="btn-secondary py-3 rounded-xl text-sm font-semibold text-slate-300 cursor-pointer">
                  Se déconnecter
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}


