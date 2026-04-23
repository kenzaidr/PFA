import { useState, useRef, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

const COHORTS = [
  { year: 'Promo 2024', total: 140, placed: 128, rate: 91, avgTime: '2.3m', color: 'from-blue-700 to-blue-400' },
  { year: 'Promo 2023', total: 132, placed: 115, rate: 87, avgTime: '3.1m', color: 'from-blue-700 to-blue-400' },
  { year: 'Promo 2022', total: 125, placed: 104, rate: 83, avgTime: '3.8m', color: 'from-emerald-500 to-teal-400' },
  { year: 'Promo 2021', total: 118, placed:  94, rate: 79, avgTime: '4.2m', color: 'from-yellow-500 to-orange-400' },
];

const TOP_SKILLS = [
  { skill: 'React / Next.js', demand: 88, gap: 15, color: 'from-blue-700 to-blue-400' },
  { skill: 'Python & Data',   demand: 82, gap: 22, color: 'from-blue-700 to-blue-400' },
  { skill: 'DevOps / Docker', demand: 74, gap: 38, color: 'from-emerald-500 to-teal-400' },
  { skill: 'Node.js / APIs',  demand: 68, gap:  9, color: 'from-yellow-500 to-orange-400' },
  { skill: 'AI / LLM Ops',   demand: 61, gap: 45, color: 'from-pink-500 to-rose-400' },
];

const PARTNERS = [
  { name: 'OCP Group', slots: 8, active: true },
  { name: 'Inwi', slots: 5, active: true },
  { name: 'Maroc Telecom', slots: 3, active: true },
  { name: 'Attijariwafa Bank', slots: 4, active: false },
  { name: 'UM6P', slots: 6, active: true },
  { name: 'HPS', slots: 2, active: false },
];

function useCounter(target, dur = 1600, go = false) {
  const [c, setC] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setC(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, dur, go]);
  return c;
}

function StatCard({ label, value, sub, color, started }) {
  return (
    <div className="glass gradient-border rounded-2xl p-5">
      <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">{label}</div>
      <div className={`text-3xl font-black ${color}`}>{value}</div>
      {sub && <div className="text-xs text-emerald-400 mt-1 font-medium">{sub}</div>}
    </div>
  );
}

export default function SchoolDashboard() {
  const { navigate, routeState } = useRouter();
  const [tab, setTab] = useState('cohorts');
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const userName = routeState?.name || 'Dr. Mehdi Alaoui';

  const rate = useCounter(COHORTS[selected].rate, 1400, started);
  const placed = useCounter(COHORTS[selected].placed, 1600, started);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cohort = COHORTS[selected];

  const TabBtn = ({ id, label, onClick, active }) => (
    <button id={id} onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
        active ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
      }`}>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0f1035]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0f1035]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer group">
              <Icons.Logo className="w-7 h-7 transition-transform group-hover:rotate-12" />
              <span className="text-base font-bold text-white">ESISA<span className="text-emerald-400"> Portal</span></span>
            </button>
            <div className="hidden md:flex items-center gap-1 bg-white/[0.04] rounded-xl p-1 border border-white/[0.06]">
              <TabBtn id="tab-cohorts"  label="🎓 Cohortes"  active={tab === 'cohorts'}  onClick={() => setTab('cohorts')}  />
              <TabBtn id="tab-trends"   label="📈 Tendances" active={tab === 'trends'}   onClick={() => setTab('trends')}   />
              <TabBtn id="tab-partners" label="🤝 Partenaires" active={tab === 'partners'} onClick={() => setTab('partners')} />
              <TabBtn id="tab-reports"  label="📄 Rapports"  active={tab === 'reports'}  onClick={() => setTab('reports')}  />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white">
                {userName.split(' ').filter(x => !x.startsWith('Dr')).map(x => x[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{userName}</div>
                <div className="text-[10px] text-emerald-400 font-semibold">ESISA · Directeur</div>
              </div>
            </div>
            <button onClick={() => navigate('home')} className="btn-secondary px-3 py-1.5 rounded-lg text-xs text-slate-400 cursor-pointer">Sortir</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6" ref={ref}>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Taux d'insertion global" value="87%" sub="+4% vs 2022" color="text-emerald-400" started={started} />
          <StatCard label="Alumni suivis" value="515" sub="4 promos actives" color="text-blue-400" started={started} />
          <StatCard label="Partenaires actifs" value="4" sub="14 slots ouverts" color="text-blue-400" started={started} />
          <StatCard label="Profils ESISA Portal" value="140" sub="Promo 2024" color="text-yellow-400" started={started} />
        </div>

        {/* ── COHORTS ── */}
        {tab === 'cohorts' && (
          <div className="space-y-5">
            {/* Cohort selector */}
            <div className="flex gap-3 flex-wrap">
              {COHORTS.map((c, i) => (
                <button key={c.year} onClick={() => { setSelected(i); setStarted(false); setTimeout(() => setStarted(true), 50); }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                    selected === i
                      ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300'
                      : 'bg-white/[0.03] border-white/[0.07] text-slate-400 hover:border-white/20'
                  }`}>
                  {c.year}
                </button>
              ))}
            </div>

            {/* Selected cohort detail */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Score ring */}
              <div className="glass gradient-border rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">{cohort.year} · Taux d'insertion</div>
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                    <circle cx="65" cy="65" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
                    <circle cx="65" cy="65" r="52" fill="none" stroke="url(#schoolGrad)" strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(rate / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                      style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.25,1,0.5,1)' }}/>
                    <defs>
                      <linearGradient id="schoolGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#10b981"/><stop offset="1" stopColor="#2563eb"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{rate}</span>
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">{placed}/{cohort.total} étudiants placés</div>
                <div className="text-xs text-slate-500 mt-1">Délai moyen : {cohort.avgTime}</div>
              </div>

              {/* Breakdown */}
              <div className="glass gradient-border rounded-2xl p-6 lg:col-span-2">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-5">Répartition par secteur</div>
                <div className="space-y-4">
                  {[
                    { sec: 'Finance & Banque', pct: 32, color: 'from-blue-700 to-blue-400' },
                    { sec: 'Télécoms',          pct: 28, color: 'from-blue-700 to-blue-400' },
                    { sec: 'Industrie & OCP',   pct: 21, color: 'from-emerald-500 to-teal-400' },
                    { sec: 'Start-ups & Tech',  pct: 19, color: 'from-yellow-500 to-orange-400' },
                  ].map((s) => (
                    <div key={s.sec}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">{s.sec}</span>
                        <span className="text-white font-bold">{s.pct}%</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                          style={{ width: started ? `${s.pct}%` : '0%', transition: 'width 1.2s cubic-bezier(0.25,1,0.5,1)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* All cohorts table */}
            <div className="glass gradient-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-5 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02] text-xs text-slate-500 uppercase font-semibold tracking-widest">
                {['Promotion', 'Effectif', 'Placés', 'Taux', 'Délai moy.'].map((h) => <div key={h}>{h}</div>)}
              </div>
              {COHORTS.map((c, i) => (
                <div key={c.year}
                  className={`grid grid-cols-5 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors ${i < COHORTS.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${c.color}`}/>
                    <span className="text-sm font-bold text-white">{c.year}</span>
                  </div>
                  <span className="text-sm text-slate-300">{c.total}</span>
                  <span className="text-sm text-slate-300">{c.placed}</span>
                  <span className={`text-sm font-black ${c.rate >= 90 ? 'text-emerald-400' : c.rate >= 85 ? 'text-yellow-400' : 'text-slate-400'}`}>{c.rate}%</span>
                  <span className="text-sm text-slate-400">{c.avgTime}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TRENDS ── */}
        {tab === 'trends' && (
          <div className="space-y-5">
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="glass gradient-border rounded-2xl p-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-5">Compétences les + demandées</div>
                <div className="space-y-4">
                  {TOP_SKILLS.map((s) => (
                    <div key={s.skill}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">{s.skill}</span>
                        <span className="text-white font-bold">{s.demand}%</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                          style={{ width: started ? `${s.demand}%` : '0%', transition: 'width 1.2s cubic-bezier(0.25,1,0.5,1)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass gradient-border rounded-2xl p-6">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-5">Écart formation / marché</div>
                <div className="space-y-4">
                  {TOP_SKILLS.map((s) => (
                    <div key={s.skill} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-28 shrink-0">{s.skill}</span>
                      <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.gap > 30 ? 'bg-red-500' : s.gap > 15 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                          style={{ width: started ? `${s.gap}%` : '0%', transition: 'width 1.2s ease' }} />
                      </div>
                      <span className={`text-xs font-bold w-10 text-right ${s.gap > 30 ? 'text-red-400' : s.gap > 15 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                        {s.gap}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"/>Écart critique</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"/>Modéré</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"/>Aligné</span>
                </div>
              </div>
            </div>

            <div className="glass gradient-border rounded-2xl p-6">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Recommandations ESISA IA</div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: '🚀', title: 'Renforcer AI/ML', sub: 'Écart de 45% — Ajouter 1 module AI obligatoire en S5', priority: 'Haute' },
                  { icon: '☁️', title: 'Intro Cloud AWS', sub: 'DevOps gap 38% — Certif AWS Cloud Practitioner recommandé', priority: 'Haute' },
                  { icon: '⚡', title: 'Python avancé', sub: 'Pandas, FastAPI, ML pipelines manquants dans le programme', priority: 'Moyenne' },
                ].map((r) => (
                  <div key={r.title} className={`rounded-2xl p-4 border ${r.priority === 'Haute' ? 'bg-red-500/8 border-red-500/25' : 'bg-yellow-500/8 border-yellow-500/25'}`}>
                    <div className="text-2xl mb-2">{r.icon}</div>
                    <div className="text-sm font-bold text-white mb-1">{r.title}</div>
                    <div className="text-xs text-slate-400">{r.sub}</div>
                    <span className={`mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${r.priority === 'Haute' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{r.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PARTNERS ── */}
        {tab === 'partners' && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-white">Entreprises Partenaires</h2>
              <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer">
                <span className="relative z-10">+ Ajouter un partenaire</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {PARTNERS.map((p, i) => (
                <div key={i} className="glass gradient-border rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/[0.08] flex items-center justify-center text-lg font-black text-white">
                      {p.name[0]}
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">{p.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{p.slots} poste(s) disponible(s)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${p.active ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-slate-500/20 border-slate-600/30 text-slate-500'}`}>
                      {p.active ? '● Actif' : '○ Inactif'}
                    </span>
                    <button className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 cursor-pointer">
                      Gérer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REPORTS ── */}
        {tab === 'reports' && (
          <div className="space-y-5">
            <h2 className="text-xl font-black text-white">Rapports & Exports</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Rapport Annuel 2024', sub: 'Taux d\'insertion · Secteurs · Délais · Partenaires', size: '2.4 MB', format: 'PDF', ready: true },
                { title: 'Analyse Cohorte 2024', sub: 'Profils individuels · Competences · Matching ESISA', size: '1.1 MB', format: 'XLSX', ready: true },
                { title: 'Tendances Marché Q1 2026', sub: 'Top skills demandés · Écarts formation · Recommandations', size: '890 KB', format: 'PDF', ready: true },
                { title: 'Rapport Partenaires', sub: 'Historique placements · Satisfaction · Renouvellements', size: '-', format: 'PDF', ready: false },
              ].map((r, i) => (
                <div key={i} className="glass gradient-border rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-lg">
                      {r.format === 'PDF' ? '📄' : '📊'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{r.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 max-w-[220px] truncate">{r.sub}</div>
                      <div className="text-[10px] text-slate-600 mt-1">{r.format} · {r.size}</div>
                    </div>
                  </div>
                  <button disabled={!r.ready}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      r.ready ? 'btn-primary text-white' : 'bg-white/[0.04] text-slate-600 cursor-not-allowed border border-white/[0.06]'
                    }`}>
                    {r.ready
                      ? <><span className="relative z-10">⬇</span><span className="relative z-10">Télécharger</span></>
                      : <span>En préparation</span>
                    }
                  </button>
                </div>
              ))}
            </div>
            <div className="glass gradient-border rounded-2xl p-6 flex items-center justify-between">
              <div>
                <div className="text-white font-bold mb-1">Rapport personnalisé</div>
                <div className="text-slate-400 text-sm">Génère un rapport sur mesure pour tes besoins spécifiques.</div>
              </div>
              <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer">
                <span className="relative z-10">Configurer un rapport</span>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}


