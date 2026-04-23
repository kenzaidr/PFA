import { useState } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

const CANDIDATES = [
  { name: 'Ayman Benali',   score: 94, skills: ['React', 'Python', 'AI/ML'],       loc: 'Casablanca', avail: 'Immédiatement',  match: 97, grad: 'from-blue-700 to-blue-600' },
  { name: 'Mehdi Alami',    score: 88, skills: ['Node.js', 'Docker', 'PostgreSQL'], loc: 'Rabat',       avail: '1 mois',         match: 91, grad: 'from-blue-700 to-blue-600' },
  { name: 'Fatima El-Idrissi', score: 85, skills: ['React', 'TypeScript', 'GraphQL'], loc: 'Casablanca', avail: 'Immédiatement', match: 88, grad: 'from-emerald-500 to-teal-600' },
  { name: 'Yassine Tahiri', score: 82, skills: ['Python', 'TensorFlow', 'MLOps'],   loc: 'Marrakech',  avail: '2 mois',         match: 84, grad: 'from-pink-500 to-rose-600' },
  { name: 'Hajar Bennis',   score: 79, skills: ['DevOps', 'Kubernetes', 'CI/CD'],   loc: 'Casablanca', avail: '3 semaines',     match: 81, grad: 'from-yellow-500 to-orange-600' },
];

const CAMPAIGNS = [
  { title: 'Développeur React Senior', applicants: 23, status: 'active',  deadline: '20 Avr', match: 97 },
  { title: 'Data Engineer ML',         applicants: 11, status: 'active',  deadline: '25 Avr', match: 88 },
  { title: 'DevOps Engineer',          applicants:  7, status: 'draft',   deadline: null,      match: 81 },
  { title: 'Backend Node.js',          applicants:  0, status: 'draft',   deadline: null,      match: 74 },
];

export default function RecruiterDashboard() {
  const { navigate, routeState } = useRouter();
  const [tab, setTab] = useState('search');
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState(['React']);
  const userName = routeState?.name || 'Sara Kettani';

  const toggleFilter = (f) => setActiveFilters((p) => p.includes(f) ? p.filter((x) => x !== f) : [...p, f]);

  const filtered = CANDIDATES.filter((c) =>
    (search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))) &&
    (activeFilters.length === 0 || activeFilters.some((f) => c.skills.includes(f)))
  );

  const allSkills = [...new Set(CANDIDATES.flatMap((c) => c.skills))];

  const NavBtn = ({ id, label, active, onClick }) => (
    <button id={id} onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${active ? 'bg-red-700 text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0f1035]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[#0f1035]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer group">
              <Icons.Logo className="w-7 h-7 transition-transform group-hover:rotate-12" />
              <span className="text-base font-bold text-white">ESISA<span className="text-blue-400"> Portal</span></span>
            </button>
            <div className="hidden md:flex items-center gap-1 bg-white/[0.04] rounded-xl p-1 border border-white/[0.06]">
              <NavBtn id="tab-search"    label="🔍 Recherche"   active={tab === 'search'}    onClick={() => setTab('search')} />
              <NavBtn id="tab-campaigns" label="📋 Campagnes"   active={tab === 'campaigns'} onClick={() => setTab('campaigns')} />
              <NavBtn id="tab-analytics" label="📊 Analytics"   active={tab === 'analytics'} onClick={() => setTab('analytics')} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                {userName.split(' ').map((x) => x[0]).join('').slice(0, 2)}
              </div>
              <span className="text-slate-300 font-medium">{userName}</span>
              <span className="text-xs bg-blue-700/20 text-blue-400 border border-blue-700/30 px-2 py-0.5 rounded-full font-semibold">Recruteur Pro</span>
            </div>
            <button onClick={() => navigate('home')}
              className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 cursor-pointer">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ── SEARCH ── */}
        {tab === 'search' && (
          <div className="space-y-5">
            {/* KPI strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Candidats vus', val: '127', trend: '+23 cette semaine', color: 'text-blue-400' },
                { label: 'Candidatures reçues', val: '34', trend: '3 nouvelles', color: 'text-blue-400' },
                { label: 'Time-to-Hire moy.', val: '8j', trend: '-3j vs mois dernier', color: 'text-emerald-400' },
                { label: 'Offres actives', val: '2', trend: '2 en brouillon', color: 'text-yellow-400' },
              ].map((s) => (
                <div key={s.label} className="glass gradient-border rounded-2xl p-4">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">{s.label}</div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-emerald-400 mt-1 font-medium">{s.trend}</div>
                </div>
              ))}
            </div>

            {/* Search + filters */}
            <div className="glass gradient-border rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Icons.Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher par nom, compétence, ville..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-700/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors" />
                </div>
                <select className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none cursor-pointer">
                  <option>Toutes les villes</option>
                  <option>Casablanca</option><option>Rabat</option><option>Marrakech</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-500 font-medium self-center">Filtres :</span>
                {allSkills.map((f) => (
                  <button key={f} onClick={() => toggleFilter(f)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      activeFilters.includes(f)
                        ? 'bg-blue-800/30 border-blue-700/50 text-blue-300'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-300'
                    }`}>{f}</button>
                ))}
                {activeFilters.length > 0 && (
                  <button onClick={() => setActiveFilters([])} className="text-xs text-slate-600 hover:text-red-400 transition-colors cursor-pointer ml-1">
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="text-xs text-slate-500 font-medium">{filtered.length} candidat(s) trouvé(s)</div>
            <div className="space-y-3">
              {filtered.map((c, i) => (
                <div key={i} className="glass glass-hover gradient-border rounded-2xl p-5 flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center text-base font-black text-white shrink-0`}>
                    {c.name.split(' ').map((x) => x[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-base font-bold text-white">{c.name}</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold">DNA {c.score}</span>
                    </div>
                    <div className="text-sm text-slate-400">{c.loc} · Disponible : {c.avail}</div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {c.skills.map((s) => (
                        <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                          activeFilters.includes(s)
                            ? 'bg-blue-700/20 border-blue-700/30 text-blue-300'
                            : 'bg-white/[0.04] border-white/[0.07] text-slate-400'
                        }`}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="text-2xl font-black text-white">{c.match}%</div>
                    <div className="text-[10px] text-slate-500">compatibilité</div>
                    <div className="flex gap-2">
                      <button className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 cursor-pointer">
                        Profil
                      </button>
                      <button className="btn-primary px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer">
                        <span className="relative z-10">Contacter</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CAMPAIGNS ── */}
        {tab === 'campaigns' && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-white">Mes Campagnes de Recrutement</h2>
              <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer flex items-center gap-2">
                <span className="text-lg relative z-10">+</span>
                <span className="relative z-10">Nouvelle offre</span>
              </button>
            </div>
            <div className="space-y-4">
              {CAMPAIGNS.map((c, i) => (
                <div key={i} className="glass gradient-border rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-base font-bold text-white">{c.title}</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        c.status === 'active'
                          ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                          : 'bg-slate-500/20 border-slate-500/30 text-slate-400'
                      }`}>{c.status === 'active' ? '● Actif' : '○ Brouillon'}</span>
                    </div>
                    <div className="text-sm text-slate-400">
                      {c.applicants} candidature(s)
                      {c.deadline && <span className="ml-3 text-blue-400">Deadline : {c.deadline}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {c.status === 'draft' && (
                      <button className="btn-primary px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer">
                        <span className="relative z-10">Publier</span>
                      </button>
                    )}
                    <button className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 cursor-pointer">
                      Gérer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ANALYTICS ── */}
        {tab === 'analytics' && (
          <div className="space-y-5">
            <h2 className="text-xl font-black text-white">Tableau de Bord Analytics</h2>
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="glass gradient-border rounded-2xl p-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">Source des candidats</div>
                {[['Matching ESISA', 68], ['Candidature directe', 22], ['Recommandation', 10]].map(([l, v]) => (
                  <div key={l} className="mb-3">
                    <div className="flex justify-between text-sm mb-1"><span className="text-slate-300">{l}</span><span className="text-white font-bold">{v}%</span></div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass gradient-border rounded-2xl p-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">Temps de recrutement</div>
                {[['Réception CV', '0j'], ['Présélection IA', '1j'], ['Entretien RH', '5j'], ['Offre envoyée', '8j']].map(([l, v], i) => (
                  <div key={l} className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-800/30 border border-blue-600/40 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">{i + 1}</div>
                    <span className="text-sm text-slate-300 flex-1">{l}</span>
                    <span className="text-sm font-black text-white">{v}</span>
                  </div>
                ))}
              </div>
              <div className="glass gradient-border rounded-2xl p-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">Top compétences recherchées</div>
                {[['React', 4], ['Python', 3], ['Node.js', 2], ['Docker', 2]].map(([s, n]) => (
                  <div key={s} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-sm text-slate-300">{s}</span>
                    <span className="text-xs bg-blue-700/20 text-blue-400 border border-blue-700/30 px-2 py-0.5 rounded-full font-bold">{n} offres</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass gradient-border rounded-2xl p-6 flex items-center justify-between">
              <div>
                <div className="text-white font-bold mb-1">Accès à l'API ATS</div>
                <div className="text-slate-400 text-sm">Integrez la couche ESISA Portal a votre systeme ATS existant.</div>
              </div>
              <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer">
                <span className="relative z-10">Voir la documentation</span>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}


