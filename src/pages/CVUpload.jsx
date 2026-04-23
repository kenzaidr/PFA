import { useState, useRef, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

/* ─── Phase config ──────────────────────────────────────── */
const PHASES = [
  { id: 'read',   icon: Icons.File,   label: 'Lecture du document',    sub: 'Extraction du texte brut (OCR)…',          color: 'text-blue-400',   glow: 'bg-blue-500/20'    },
  { id: 'nlp',    icon: Icons.Brain,  label: 'Analyse NLP',            sub: 'Détection des compétences techniques…',    color: 'text-blue-400', glow: 'bg-blue-700/20'  },
  { id: 'match',  icon: Icons.Scan,   label: 'Matching entreprises',   sub: 'Calcul des vecteurs de similarité…',       color: 'text-blue-400',   glow: 'bg-blue-700/20'    },
  { id: 'dna',    icon: Icons.Spark,  label: 'Génération Skill DNA',   sub: 'Construction du profil dynamique…',        color: 'text-emerald-400', glow: 'bg-emerald-500/20' },
];

const DETECTED_SKILLS = [
  { label: 'React.js', score: 91, color: 'from-blue-700 to-blue-400' },
  { label: 'Python',   score: 84, color: 'from-blue-500 to-blue-500' },
  { label: 'Node.js',  score: 79, color: 'from-blue-700 to-teal-400' },
  { label: 'Docker',   score: 73, color: 'from-emerald-500 to-green-400' },
  { label: 'SQL',      score: 88, color: 'from-yellow-500 to-orange-400' },
  { label: 'AI/ML',    score: 67, color: 'from-pink-500 to-rose-400' },
  { label: 'Git',      score: 95, color: 'from-slate-400 to-slate-300' },
  { label: 'REST APIs',score: 82, color: 'from-indigo-500 to-blue-400' },
];

/* ─── Drag & Drop Zone ──────────────────────────────────── */
function DropZone({ onFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handle = (file) => { if (file) onFile(file); };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === 'application/pdf' || f.name.endsWith('.pdf') || f.name.endsWith('.docx'))) handle(f);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`relative rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer group
        ${dragging
          ? 'border-blue-400 bg-blue-700/10 scale-[1.01]'
          : 'border-white/20 hover:border-blue-400/60 hover:bg-blue-600/5'
        }`}
      onClick={() => inputRef.current?.click()}
      style={{ minHeight: '320px' }}
    >
      {/* Animated corner accents */}
      <div className={`absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg transition-colors duration-300 ${dragging ? 'border-blue-400' : 'border-white/20 group-hover:border-blue-400/60'}`} />
      <div className={`absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg transition-colors duration-300 ${dragging ? 'border-blue-400' : 'border-white/20 group-hover:border-blue-400/60'}`} />
      <div className={`absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg transition-colors duration-300 ${dragging ? 'border-blue-400' : 'border-white/20 group-hover:border-blue-400/60'}`} />
      <div className={`absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 rounded-br-lg transition-colors duration-300 ${dragging ? 'border-blue-400' : 'border-white/20 group-hover:border-blue-400/60'}`} />

      <div className="flex flex-col items-center justify-center h-full p-10 text-center">
        {/* Glow orb & icon */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${dragging ? 'bg-blue-600/40 scale-125' : 'bg-blue-700/20 group-hover:bg-blue-600/30'}`} />
          <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${dragging ? 'bg-blue-800/30 border border-blue-400/50' : 'bg-white/[0.06] border border-white/10 group-hover:border-blue-400/30'}`}>
            <Icons.Upload className={`w-9 h-9 transition-all duration-300 ${dragging ? 'text-blue-300 -translate-y-1' : 'text-slate-400 group-hover:text-blue-400 group-hover:-translate-y-1'}`} />
          </div>
        </div>

        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${dragging ? 'text-blue-300' : 'text-white'}`}>
          {dragging ? 'Relâche pour analyser' : 'Glisse ton CV ici'}
        </h3>
        <p className="text-slate-500 text-sm mb-6">Format PDF ou DOCX · Max 10 MB</p>

        <button
          type="button"
          className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer flex items-center gap-2 pointer-events-none"
        >
          <Icons.File className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Parcourir les fichiers</span>
        </button>

        <p className="text-slate-600 text-xs mt-6">
          🔒 Analyse sécurisée · Données chiffrées · Conforme CNDP
        </p>
      </div>

      <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden"
        onChange={(e) => handle(e.target.files?.[0])} />
    </div>
  );
}

/* ─── Analysis Phase Panel ──────────────────────────────── */
function AnalysisPanel({ file, phase, phaseIdx }) {
  return (
    <div className="space-y-4">
      {/* File info */}
      <div className="glass gradient-border rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-700/20 border border-blue-700/30 flex items-center justify-center shrink-0">
          <Icons.File className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">{file.name}</div>
          <div className="text-xs text-slate-500 mt-0.5">{(file.size / 1024).toFixed(0)} KB · {file.type || 'document'}</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          En cours
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-2">
        {PHASES.map((p, i) => {
          const Ic = p.icon;
          const done = i < phaseIdx;
          const running = i === phaseIdx;
          return (
            <div key={p.id}
              className={`glass rounded-2xl p-4 flex items-center gap-3 transition-all duration-500 ${
                running ? 'border border-blue-700/30 bg-blue-600/5' :
                done    ? 'border border-emerald-500/20 bg-emerald-500/5' :
                          'border border-white/[0.04] opacity-40'
              }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                done ? 'bg-emerald-500/20' : running ? p.glow : 'bg-white/[0.04]'
              }`}>
                {done
                  ? <Icons.Check className="w-4 h-4 text-emerald-400" />
                  : <Ic className={`w-4 h-4 ${running ? p.color : 'text-slate-600'}`} />
                }
              </div>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${done ? 'text-emerald-300' : running ? 'text-white' : 'text-slate-600'}`}>
                  {p.label}
                </div>
                {running && <div className="text-xs text-slate-500 mt-0.5">{p.sub}</div>}
              </div>
              {running && (
                <div className="flex gap-0.5">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className={`w-1 h-1 rounded-full ${p.color.replace('text-', 'bg-')} animate-bounce`}
                      style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </div>
              )}
              {done && <div className="text-xs text-emerald-400 font-medium">✓ Terminé</div>}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="glass rounded-2xl p-4">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progression globale</span>
          <span className="text-white font-bold">{Math.round((phaseIdx / PHASES.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="progress-bar-fill rounded-full"
            style={{ width: `${(phaseIdx / PHASES.length) * 100}%`, height: '100%',
              transition: 'width 0.8s cubic-bezier(0.25,1,0.5,1)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Results Panel ─────────────────────────────────────── */
function ResultsPanel({ onNavigate }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    DETECTED_SKILLS.forEach((_, i) => {
      setTimeout(() => setShown(i + 1), i * 200 + 300);
    });
  }, []);

  return (
    <div className="space-y-5">
      {/* Score card */}
      <div className="gradient-border rounded-2xl overflow-hidden">
        <div className="bg-[#0a0a14] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Skill DNA Généré</div>
              <div className="text-white font-bold">Ayman Benali</div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black gradient-text">94</div>
              <div className="text-xs text-slate-500">/ 100</div>
            </div>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full progress-bar-fill rounded-full" style={{ width: '94%' }} />
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
            <span>14 compétences détectées</span>
            <span className="text-emerald-400 font-semibold">7 opportunités · ≥85% match</span>
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Compétences Détectées</div>
        <div className="grid grid-cols-2 gap-2">
          {DETECTED_SKILLS.slice(0, shown).map((s, i) => (
            <div key={s.label}
              className="glass rounded-xl px-3 py-2.5 flex items-center justify-between fade-skill"
              style={{ animation: `skillPop 0.4s ease ${i * 80}ms both` }}>
              <span className="text-sm font-semibold text-white">{s.label}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-12 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                    style={{ width: `${s.score}%`, transition: 'width 0.8s ease' }} />
                </div>
                <span className={`text-xs font-bold bg-gradient-to-r ${s.color} bg-clip-text`}
                  style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {shown >= DETECTED_SKILLS.length && (
        <div className="space-y-3 pt-2">
          <button id="results-view-profile" onClick={() => onNavigate('register')}
            className="btn-primary w-full py-3.5 rounded-2xl text-base font-semibold text-white cursor-pointer flex items-center justify-center gap-2.5">
            <Icons.Spark className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Voir mon Skill DNA complet</span>
          </button>
          <button id="results-back" onClick={() => window.location.reload()}
            className="btn-secondary w-full py-3 rounded-2xl text-sm font-semibold text-slate-300 cursor-pointer">
            Analyser un autre CV
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── CV UPLOAD PAGE ────────────────────────────────────── */
export default function CVUpload() {
  const { navigate } = useRouter();
  const [file, setFile] = useState(null);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [done, setDone] = useState(false);

  // Simulate analysis when file is set
  useEffect(() => {
    if (!file) return;
    setPhaseIdx(0);
    setDone(false);
    PHASES.forEach((_, i) => {
      setTimeout(() => {
        setPhaseIdx(i + 1);
        if (i === PHASES.length - 1) setTimeout(() => setDone(true), 900);
      }, i * 1400 + 600);
    });
  }, [file]);

  return (
    <div className="min-h-screen grid-bg">
      {/* Page header */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-[#0f1035]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 to-cyan-950/20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-10 relative">
          <button id="upload-back" onClick={() => navigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer group">
            <Icons.ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Retour à l'accueil</span>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-700/10 border border-blue-700/30 text-blue-300 text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                IA · OCR · NLP Pipeline
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-2">
                Analyse ton CV en <span className="gradient-text">10 secondes</span>
              </h1>
              <p className="text-slate-400 max-w-lg">
                Notre IA extrait tes compétences, les évalue et génère ton Skill DNA — un profil vivant que les recruteurs adorent.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              {[Icons.Shield, Icons.Zap, Icons.Brain].map((Ic, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Ic className="w-3.5 h-3.5" />
                  <span>{['CNDP-Safe', 'Instantané', 'IA avancée'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT — Upload / File preview */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${file ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              {file ? 'Document reçu' : 'Étape 1 — Importer ton CV'}
            </div>

            {!file ? (
              <DropZone onFile={setFile} />
            ) : (
              <div className="glass gradient-border rounded-3xl p-8 flex flex-col items-center text-center min-h-[320px] justify-center">
                {/* Circular scanner animation */}
                <div className="relative w-28 h-28 mb-6">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#scanGrad)" strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${done ? 283 : phaseIdx * 70} 283`}
                      style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.25,1,0.5,1)' }} />
                    <defs>
                      <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {done
                      ? <Icons.Spark className="w-12 h-12 text-blue-400" />
                      : <Icons.File className="w-12 h-12 text-slate-400" />
                    }
                  </div>
                  {!done && (
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: 'conic-gradient(from 0deg, transparent, rgba(0,153,204,0.28))', animation: 'spin 2s linear infinite' }} />
                  )}
                </div>
                <div className="text-white font-bold text-lg mb-1 max-w-[200px] truncate">{file.name}</div>
                <div className="text-slate-500 text-sm">{(file.size / 1024).toFixed(0)} KB</div>
                {done && (
                  <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    <Icons.Check className="w-4 h-4" /> Analyse terminée !
                  </div>
                )}
              </div>
            )}

            {/* Tips */}
            {!file && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Icons.Shield, label: 'Données sécurisées', sub: 'Chiffrement AES-256' },
                  { icon: Icons.Zap,    label: 'Résultat en 10s',    sub: 'Pipeline optimisé' },
                  { icon: Icons.Brain,  label: 'IA précise à 94%',   sub: 'NLP + Embeddings' },
                ].map((t) => (
                  <div key={t.label} className="glass rounded-2xl p-3 text-center border border-white/[0.05]">
                    <t.icon className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                    <div className="text-xs font-semibold text-white">{t.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{t.sub}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Phase tracker / Results */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${done ? 'bg-emerald-400' : file ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'}`} />
              {done ? 'Étape 2 — Résultats' : file ? 'Étape 2 — Analyse en cours' : 'Étape 2 — En attente du document'}
            </div>

            {!file ? (
              /* Idle state */
              <div className="glass rounded-3xl border border-white/[0.06] p-8 min-h-[320px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <Icons.Brain className="w-7 h-7 text-slate-600" />
                </div>
                <div className="text-slate-500 text-sm max-w-xs">
                  Importe ton CV à gauche pour démarrer l'analyse IA en temps réel.
                </div>
                <div className="mt-6 space-y-2 w-full max-w-[240px]">
                  {PHASES.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 opacity-30">
                      <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <p.icon className="w-3 h-3 text-slate-600" />
                      </div>
                      <span className="text-xs text-slate-600">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : !done ? (
              <AnalysisPanel file={file} phase={PHASES[Math.min(phaseIdx, PHASES.length - 1)]} phaseIdx={phaseIdx} />
            ) : (
              <ResultsPanel onNavigate={navigate} />
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        {!file && (
          <div className="mt-12 glass gradient-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold mb-1">Pas encore de CV prêt ?</div>
              <div className="text-slate-400 text-sm">Crée ton compte et complète ton profil manuellement, nous t'aiderons à le construire.</div>
            </div>
            <button id="upload-create-account" onClick={() => navigate('register')}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold text-white whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0">
              <Icons.Spark className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Créer mon compte</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes skillPop {
          from { opacity: 0; transform: scale(0.8) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}


