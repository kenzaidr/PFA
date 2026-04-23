import { useState, useEffect, useRef } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

/* ─── Hooks ────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Animated Terminal ─────────────────────────────────── */
function AnimatedTerminal() {
  const lines = [
    { d: 0,    c: 'text-slate-500', t: '$ skillmap-engine --analyze --profile=ayman.json' },
    { d: 600,  c: 'text-blue-400', t: '▸ [OCR v3.2] Parsing resume document...' },
    { d: 1200, c: 'text-slate-400',  t: '  → React · Python · Docker · SQL · NLP/ML' },
    { d: 1900, c: 'text-blue-400', t: '▸ [NLP] Extracting semantic skill vectors...' },
    { d: 2600, c: 'text-blue-400',   t: '  → 14 hard skills · 6 domain clusters found' },
    { d: 3300, c: 'text-blue-400', t: '▸ [Matcher] Querying enterprise database...' },
    { d: 4000, c: 'text-green-400',  t: '✓ 7 high-confidence matches (≥85% score)' },
    { d: 4700, c: 'text-yellow-300', t: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { d: 4800, c: 'text-white font-bold', t: '  SKILL DNA GENERATED  ·  Score: 94 / 100' },
    { d: 4900, c: 'text-yellow-300', t: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => { lines.forEach((l, i) => setTimeout(() => setVisible(i + 1), l.d + 300)); }, []); // eslint-disable-line

  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-blue-800/20 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -inset-4 bg-blue-700/10 rounded-2xl blur-2xl pointer-events-none" />
      <div className="relative gradient-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#0a0a20] rounded-2xl">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-slate-500 font-mono text-xs mx-auto">skillmap-engine · bash</span>
          </div>
          <div className="p-5 font-mono text-xs leading-relaxed space-y-1 min-h-[280px]">
            {lines.slice(0, visible).map((l, i) => (
              <p key={i} className={l.c}>{l.t}</p>
            ))}
            {visible < lines.length && <span className="terminal-cursor" />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Radar Chart ───────────────────────────────────────── */
function RadarChart({ skills }) {
  const cx = 100, cy = 100, r = 68, n = skills.length;
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [(cx + r * v * Math.cos(a)).toFixed(2), (cy + r * v * Math.sin(a)).toFixed(2)];
  };
  const data = skills.map((s, i) => pt(i, s.value / 100));
  const poly = data.map((p) => p.join(',')).join(' ');
  const uid = Math.random().toString(36).slice(2, 6);
  return (
    <svg viewBox="0 0 200 200" className="w-full h-auto">
      <defs>
        <linearGradient id={`rf${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1e3a8a" stopOpacity="0.5" /><stop offset="1" stopColor="#2563eb" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`rs${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {[0.2, 0.4, 0.6, 0.8, 1].map((lvl, i) => (
        <polygon key={i}
          points={skills.map((_, j) => { const [x, y] = pt(j, lvl); return `${x},${y}`; }).join(' ')}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      ))}
      {skills.map((_, i) => {
        const [x, y] = pt(i, 1); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />;
      })}
      <polygon points={poly} fill={`url(#rf${uid})`} stroke={`url(#rs${uid})`} strokeWidth="1.5" className="radar-polygon" />
      {data.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#1e3a8a" />)}
      {skills.map((s, i) => {
        const [x, y] = pt(i, 1.3);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#94a3b8" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="500">{s.label}</text>;
      })}
    </svg>
  );
}

/* ─── Recruiter Tile ────────────────────────────────────── */
function RecruiterTile({ onNavigate }) {
  const allSkills = ['React', 'Node.js', 'Python', 'DevOps', 'AI/ML', 'PostgreSQL'];
  const [active, setActive] = useState(['React', 'Python', 'AI/ML']);
  const toggle = (s) => setActive((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const candidates = [
    { name: 'Ayman B.', score: 98, match: ['React', 'Python', 'AI/ML'] },
    { name: 'Sara K.', score: 94, match: ['React', 'Node.js', 'AI/ML'] },
    { name: 'Mehdi A.', score: 89, match: ['Python', 'DevOps', 'React'] },
  ];
  return (
    <div className="glass glass-hover gradient-border rounded-2xl p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div className="badge glass border border-blue-700/30 text-blue-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />Recruteurs
        </div>
        <button onClick={() => onNavigate('register')}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
          Accès complet →
        </button>
      </div>
      <h3 className="text-white font-bold text-lg">Filtrage Sémantique</h3>
      <div className="flex flex-wrap gap-1.5">
        {allSkills.map((s) => (
          <button key={s} onClick={() => toggle(s)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            active.includes(s) ? 'bg-blue-800/30 border border-blue-700/50 text-blue-300' : 'bg-white/[0.04] border border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-300'
          }`}>{s}</button>
        ))}
      </div>
      <div className="space-y-2 flex-1">
        {candidates.filter((c) => active.length === 0 || active.some((a) => c.match.includes(a))).map((c) => (
          <div key={c.name} className="flex items-center justify-between bg-white/[0.03] rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-800 to-blue-800 flex items-center justify-center text-[10px] font-bold text-white">
                {c.name.split(' ').map((x) => x[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{c.name}</div>
                <div className="flex gap-1 mt-0.5">
                  {c.match.filter((m) => active.includes(m)).slice(0, 2).map((m) => (
                    <span key={m} className="text-[9px] bg-blue-700/20 text-blue-300 px-1.5 py-0.5 rounded">{m}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-white">{c.score}%</div>
              <div className="text-[9px] text-slate-500">match</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => onNavigate('register')}
        className="btn-secondary w-full py-2.5 rounded-xl text-sm font-semibold text-slate-300 cursor-pointer">
        Créer un compte recruteur
      </button>
    </div>
  );
}

/* ─── Stats Tile ────────────────────────────────────────── */
function StatsCounterTile() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const rate = useCounter(87, 1600, started);
  const alumni = useCounter(2340, 1800, started);
  const placed = useCounter(94, 1400, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="glass glass-hover gradient-border rounded-2xl p-6 flex flex-col gap-4 h-full">
      <div className="badge glass border border-blue-700/30 text-blue-300 self-start">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />Écoles & Pôles B2B
      </div>
      <h3 className="text-white font-bold text-lg">Observatoire de l'Employabilité</h3>
      <div className="grid grid-cols-3 gap-2">
        {[
          { val: rate, s: '%', l: "Taux d'insertion" },
          { val: alumni, s: '+', l: 'Alumni tracés' },
          { val: placed, s: '%', l: 'Précision IA' },
        ].map((s, i) => (
          <div key={i} className="bg-white/[0.03] rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-white">{s.val}{s.s}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2 flex-1">
        {[['Promo 2024', 91], ['Promo 2023', 87], ['Promo 2022', 83]].map(([name, v]) => (
          <div key={name}>
            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>{name}</span><span>{v}%</span></div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="progress-bar-fill rounded-full" style={{ width: started ? `${v}%` : '0%', height: '100%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
function HeroSection({ onNavigate }) {
  return (
    <section id="hero" className="relative min-h-screen grid-bg flex items-center pt-8 pb-16 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-blue-700/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-700/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-blue-700/30 text-blue-300 text-xs font-semibold tracking-wide mb-8">
              <Icons.Spark className="w-3 h-3" />
              ESISA · Ecole d'ingenierie informatique · Maroc
            </div>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tighter mb-6">
              <span className="gradient-text">Portail Carriere</span><br />
              <span className="text-white">ESISA</span><br />
              <span className="text-slate-400 font-light">Etudiants, Alumni, Entreprises</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg mb-10 font-light">
              La plateforme ESISA analyse les competences, centralise les profils et connecte etudiants et laureats aux entreprises partenaires selon les besoins reels du marche.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button id="hero-cta-dna" onClick={() => onNavigate('upload')}
                className="btn-primary px-7 py-3.5 rounded-2xl text-base font-semibold text-white cursor-pointer flex items-center justify-center gap-2.5">
                <Icons.Spark className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Creer mon profil ESISA</span>
              </button>
              <button id="hero-cta-recruiter" onClick={() => onNavigate('register')}
                className="btn-secondary px-7 py-3.5 rounded-2xl text-base font-semibold text-slate-300 cursor-pointer flex items-center justify-center gap-2">
                <span>Acces entreprise</span>
                <Icons.Arrow className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.07]">
              {[
                { value: '2400+', label: 'Etudiants & alumni' },
                { value: '94%', label: 'Precision de matching' },
                { value: '120+', label: 'Entreprises partenaires' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white tracking-tight">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block"><AnimatedTerminal /></div>
        </div>
        <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 opacity-40">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Ecosysteme academique</span>
          {['ESISA', 'ENSIAS', 'ENSA', 'UIR', 'INSEA', 'ENSET'].map((s) => (
            <span key={s} className="text-slate-400 text-sm font-semibold">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BENTO ─────────────────────────────────────────────── */
function BentoSection({ onNavigate }) {
  const candidateSkills = [
    { label: 'React', value: 88 }, { label: 'AI/ML', value: 72 },
    { label: 'Cloud', value: 65 }, { label: 'DevOps', value: 58 },
    { label: 'SQL', value: 80 },   { label: 'Node.js', value: 75 },
  ];
  return (
    <section id="produit" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-semibold mb-4">
            Concu pour l'ecosysteme ESISA
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4">
            Une plateforme, <span className="gradient-text">trois acteurs</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Etudiants, entreprises et ecole connectes dans un seul espace de suivi des competences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Tile 1 — Radar */}
          <div className="glass glass-hover gradient-border rounded-2xl p-6 flex flex-col gap-4 fade-in-up">
            <div className="flex items-center justify-between">
              <div className="badge glass border border-blue-700/30 text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />Candidats & Alumni
              </div>
              <button onClick={() => onNavigate('upload')}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                Créer le mien →
              </button>
            </div>
            <h3 className="text-white font-bold text-lg">Ton Skill DNA Radar</h3>
            <p className="text-slate-500 text-sm">Visualisation de tes forces techniques, générée par analyse IA de ton CV + GitHub.</p>
            <div className="bg-white/[0.02] rounded-xl p-2 border border-white/[0.05]">
              <RadarChart skills={candidateSkills} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {candidateSkills.slice(0, 3).map((s) => (
                <span key={s.label} className="px-2 py-0.5 rounded-full bg-blue-800/20 border border-blue-700/30 text-blue-300 text-xs font-semibold">
                  {s.label} · {s.value}%
                </span>
              ))}
            </div>
            <button id="bento-create-dna" onClick={() => onNavigate('upload')}
              className="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer flex items-center justify-center gap-2 mt-auto">
              <Icons.Upload className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Analyser mon CV</span>
            </button>
          </div>
          {/* Tile 2 — Recruiter */}
          <div className="fade-in-up"><RecruiterTile onNavigate={onNavigate} /></div>
          {/* Tile 3 — Stats */}
          <div className="fade-in-up"><StatsCounterTile /></div>
          {/* Tile 4 — Wide banner */}
          <div className="lg:col-span-3 glass gradient-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 fade-in-up">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-700/15 border border-blue-700/30 text-blue-300 text-xs font-semibold mb-3">
                Nouveau · v2.0
              </div>
            <h3 className="text-xl font-bold text-white mb-1">Synchronisation de profil automatique</h3>
            <p className="text-slate-400 text-sm max-w-lg">Mise a jour continue des competences et du positionnement candidat pour un suivi d'employabilite plus fiable.</p>
            </div>
            <button id="bento-github-sync" onClick={() => onNavigate('register')}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold text-white whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0">
              <Icons.Github className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Activer la synchronisation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPARISON ────────────────────────────────────────── */
function ComparisonSection({ onNavigate }) {
  const rows = [
    { label: 'Mise à jour', cv: 'Manuelle (rare)', dna: 'Automatique via GitHub & projets' },
    { label: 'Vérification', cv: 'Non vérifiable', dna: 'Validé par IA sur projets réels' },
    { label: 'Matching', cv: 'Keyword-based', dna: 'Embedding sémantique vectoriel' },
    { label: 'Personnalisation', cv: 'Une page statique', dna: 'Profil dynamique multi-axes' },
    { label: 'Insight recruteur', cv: 'Subjectif & limité', dna: 'Dashboard analytique complet' },
    { label: 'Temps traitement', cv: '6 secondes en moyenne', dna: 'Score instantané, 1 clic' },
  ];
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 to-cyan-950/10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4">
            CV classique <span className="text-slate-600">vs</span>{' '}
            <span className="gradient-text">Profil ESISA dynamique</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">Une lecture moderne, verifiable et orientee employabilite des competences.</p>
        </div>
        <div className="glass gradient-border rounded-2xl overflow-hidden fade-in-up">
          <div className="grid grid-cols-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="p-4 text-sm font-semibold text-slate-500">Critère</div>
            <div className="p-4 flex items-center gap-2 border-l border-white/[0.06]">
              <span className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <Icons.X className="w-2.5 h-2.5 text-red-400" />
              </span>
              <span className="text-sm font-bold text-red-400">CV Traditionnel</span>
            </div>
            <div className="p-4 flex items-center gap-2 border-l border-white/[0.06]">
              <span className="w-5 h-5 rounded-full bg-blue-700/20 border border-blue-600/40 flex items-center justify-center">
                <Icons.Spark className="w-2.5 h-2.5 text-blue-400" />
              </span>
              <span className="text-sm font-bold text-blue-400">Profil ESISA IA</span>
            </div>
          </div>
          {rows.map((row, i) => (
            <div key={row.label}
              className={`grid grid-cols-3 transition-colors hover:bg-white/[0.02] ${i < rows.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
              <div className="p-4 text-sm font-semibold text-slate-400">{row.label}</div>
              <div className="p-4 border-l border-white/[0.04]">
                <span className="text-sm text-slate-600 line-through">{row.cv}</span>
              </div>
              <div className="p-4 border-l border-white/[0.04] flex items-start gap-2">
                <Icons.Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{row.dna}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 fade-in-up">
          <button id="comparison-cta" onClick={() => onNavigate('upload')}
            className="btn-primary px-8 py-3.5 rounded-2xl text-base font-semibold text-white cursor-pointer inline-flex items-center gap-2.5">
            <Icons.Zap className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Essayer maintenant — Gratuit</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── INSIGHTS ──────────────────────────────────────────── */
function InsightsSection({ onNavigate }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const skills = [
    { name: 'React / Next.js', pct: 88, color: 'from-blue-700 to-blue-600', sub: '+12% vs 2024' },
    { name: 'Python & Data', pct: 82, color: 'from-blue-700 to-blue-600', sub: '+18% vs 2024' },
    { name: 'DevOps / Docker', pct: 74, color: 'from-emerald-500 to-teal-400', sub: '+9% vs 2024' },
    { name: 'Node.js / APIs', pct: 68, color: 'from-yellow-500 to-orange-400', sub: '+6% vs 2024' },
    { name: 'AI / LLM Ops', pct: 61, color: 'from-pink-500 to-rose-400', sub: '+34% vs 2024' },
    { name: 'Cloud (AWS/GCP)', pct: 55, color: 'from-indigo-500 to-blue-600', sub: '+15% vs 2024' },
  ];
  return (
    <section id="insights" className="py-28 relative" ref={ref}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-700/10 border border-blue-700/30 text-blue-300 text-xs font-semibold mb-4">
              Données temps réel · Q1 2026
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4">
              Top Skills <span className="gradient-text">au Maroc</span>
            </h2>
            <p className="text-slate-400 mb-6">
              Base sur les offres partenaires et les donnees d'insertion. Mise a jour reguliere par l'ecole.
            </p>
            <button id="insights-report" onClick={() => onNavigate('register')}
              className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 cursor-pointer flex items-center gap-2 w-fit">
              <span>Voir le rapport complet</span>
              <Icons.Arrow className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4 fade-in-up">
            {skills.map((s, i) => (
              <div key={s.name} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-sm font-semibold text-slate-300">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-emerald-400 font-medium">{s.sub}</span>
                    <span className="text-sm font-black text-white">{s.pct}%</span>
                  </div>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                    style={{ width: started ? `${s.pct}%` : '0%', transition: `width 1.4s cubic-bezier(0.25,1,0.5,1) ${i * 100}ms` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────── */
function TestimonialsSection() {
  const list = [
    { name: 'Ayman Benali', role: 'Développeur Full-Stack · Casablanca', avatar: 'AB', grad: 'from-blue-700 to-blue-900', score: 94,
      quote: 'En 48h après avoir créé mon Skill DNA, j\'ai reçu 3 offres qualifiées. Avant, j\'envoyais mon CV partout sans réponse. Jeu changé.' },
    { name: 'Sara Kettani', role: 'Head of Talent · TechMa Rabat', avatar: 'SK', grad: 'from-blue-700 to-blue-900', score: null,
      quote: 'La recherche par compétences vérifiées a réduit notre time-to-hire de 40%. On ne lit plus des CVs, on analyse des profils. Révolutionnaire.' },
    { name: 'Dr. Mehdi Alaoui', role: 'Directeur · ENSA Marrakech', avatar: 'MA', grad: 'from-emerald-500 to-teal-600', score: null,
      quote: 'L\'observatoire nous donne des données concrètes sur l\'insertion de nos lauréats. On aligne nos curricula sur les vraies demandes du marché.' },
  ];
  return (
    <section id="temoignages" className="py-28 relative">
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-blue-800/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4">
            Ils ont <span className="gradient-text">fait confiance</span>
          </h2>
          <p className="text-slate-400">De Fes a Casablanca, ESISA renforce le lien formation-emploi.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {list.map((t, i) => (
            <div key={t.name} className="glass glass-hover gradient-border rounded-2xl p-6 flex flex-col gap-5 fade-in-up"
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex gap-1">
                {[...Array(5)].map((_, si) => <Icons.Spark key={si} className="w-3.5 h-3.5 text-yellow-400" />)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">{t.name}</div>
                  <div className="text-xs text-slate-500 truncate">{t.role}</div>
                </div>
                {t.score && (
                  <div className="ml-auto shrink-0 text-right">
                    <div className="text-lg font-black text-white">{t.score}%</div>
                    <div className="text-[9px] text-blue-400 font-semibold">DNA SCORE</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ───────────────────────────────────────────── */
function PricingSection({ onNavigate }) {
  const [billing, setBilling] = useState('monthly');
  const plans = [
    {
      name: 'Étudiant', period: 'Pour toujours', highlight: false, badge: null,
      price: { monthly: '0', yearly: '0' },
      desc: 'Tout ce qu\'il faut pour démarrer ta carrière tech.',
      features: ['Profil Skill DNA', 'Matching algorithmique', '1 simulation d\'entretien', 'Badge GitHub public'],
      cta: 'Commencer gratuitement', ctaAction: () => onNavigate('register'),
    },
    {
      name: 'Pro Candidat', period: 'DH / mois', highlight: true, badge: 'Populaire',
      price: { monthly: '49', yearly: '39' },
      desc: 'Maximise ta visibilité et décroche ton poste plus vite.',
      features: ['Boost algorithmique ×3', 'Matching haute fréquence', 'Simulations IA illimitées', 'Roadmap Deep-Dive', 'Analyse comparative marché'],
      cta: 'Passer en Pro', ctaAction: () => onNavigate('register'),
    },
    {
      name: 'Recruteur', period: 'DH / mois', highlight: false, badge: null,
      price: { monthly: '999', yearly: '799' },
      desc: 'Accès complet à la base de talents vérifiés.',
      features: ['Base candidats illimitée', 'Recherche Skill-only', 'Dashboard analytics', 'API ATS intégration', 'Support prioritaire'],
      cta: 'Contacter l\'équipe', ctaAction: () => onNavigate('register'),
    },
  ];
  return (
    <section id="tarifs" className="py-28 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4">
            Structure <span className="gradient-text">des coûts</span>
          </h2>
          <p className="text-slate-400 mb-8">Zéro frais cachés. Annulation à tout moment.</p>
          <div className="inline-flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-1">
            {['monthly', 'yearly'].map((b) => (
              <button key={b} onClick={() => setBilling(b)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  billing === b ? 'bg-red-700 text-white shadow-lg shadow-red-700/30' : 'text-slate-400 hover:text-white'
                }`}>
                {b === 'monthly' ? 'Mensuel' : <span>Annuel <span className="text-blue-400 text-[10px] font-bold">-20%</span></span>}
              </button>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`relative rounded-2xl fade-in-up ${plan.highlight ? 'gradient-border' : 'glass border border-white/[0.07]'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-700/40">
                  <Icons.Spark className="w-3 h-3" />{plan.badge}
                </div>
              )}
              <div className={`p-7 h-full flex flex-col ${plan.highlight ? 'bg-[#101844] rounded-2xl' : ''}`}>
                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price[billing]}</span>
                  <span className="text-slate-500 text-sm ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        plan.highlight ? 'bg-blue-800/30 text-blue-400' : 'bg-white/[0.05] text-slate-400'
                      }`}>
                        <Icons.Check className="w-2.5 h-2.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={plan.ctaAction} id={`pricing-cta-${i}`}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    plan.highlight ? 'btn-primary text-white' : 'btn-secondary text-slate-300'
                  }`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA WAITLIST ──────────────────────────────────────── */
function CTASection({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (email.includes('@')) setDone(true);
  };
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-cyan-950/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-800/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-700/10 border border-blue-700/30 text-blue-300 text-xs font-semibold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Accès anticipé · 500 places disponibles
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4">
          Rejoins la <span className="gradient-text">révolution</span><br />du recrutement tech
        </h2>
        <p className="text-slate-400 mb-10 text-lg">Rejoignez le portail ESISA pour acceder aux services d'accompagnement et de mise en relation.</p>
        {!done ? (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input id="waitlist-email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-700/50 transition-colors" />
            <button id="waitlist-submit" type="submit"
              className="btn-primary px-6 py-3.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
              <Icons.Spark className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Rejoindre</span>
            </button>
          </form>
        ) : (
          <div className="glass gradient-border rounded-2xl px-8 py-6 max-w-md mx-auto">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-white font-bold mb-1">Tu es sur la liste !</div>
            <div className="text-slate-400 text-sm mb-4">On te contactera dès l'ouverture de la beta.</div>
            <button onClick={() => onNavigate('upload')}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer flex items-center gap-2 mx-auto w-fit">
              <Icons.Upload className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Analyser mon CV maintenant</span>
            </button>
          </div>
        )}
        <p className="text-slate-600 text-xs mt-4">Conforme CNDP · Zéro spam. Annulation à tout moment.</p>
      </div>
    </section>
  );
}

/* ─── LANDING PAGE ──────────────────────────────────────── */
export default function Landing() {
  const { navigate } = useRouter();
  useScrollReveal();
  return (
    <>
      <HeroSection onNavigate={navigate} />
      <BentoSection onNavigate={navigate} />
      <ComparisonSection onNavigate={navigate} />
      <InsightsSection onNavigate={navigate} />
      <TestimonialsSection />
      <PricingSection onNavigate={navigate} />
      <CTASection onNavigate={navigate} />
    </>
  );
}


