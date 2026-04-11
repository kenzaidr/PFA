import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, FileText, CheckCircle, ChevronRight, Brain, Sparkles,
  ArrowRight, Zap, BarChart2, Briefcase, Target, User, GraduationCap,
  Code2, Globe, Clock, X, RefreshCw, Network, Star
} from 'lucide-react';

/* ─── helpers ─── */
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ─── Fake CV analysis result ─── */
const FAKE_ANALYSIS = {
  name: 'Youssef Amrani',
  level: 'Junior → Mid',
  skills: ['React', 'JavaScript', 'Python', 'SQL', 'Git'],
  education: 'ESISA — Ingénierie Informatique (Bac+5)',
  experience: '1 stage chez MTN Morocco (3 mois)',
  missing: ['TypeScript', 'Docker', 'System Design'],
  score: 67,
};

/* ─── Questions générées depuis le CV ─── */
const QUESTIONS = [
  {
    id: 'specialty',
    icon: Code2,
    question: 'Quelle spécialité tech te correspond le mieux ?',
    sub: 'Basé sur tes skills détectés (React, Python…)',
    type: 'choice',
    options: [
      { value: 'frontend', label: '🎨 Frontend Engineer', desc: 'React, Vue, UI/UX' },
      { value: 'backend', label: '⚙️ Backend Engineer', desc: 'Node.js, Python, APIs' },
      { value: 'fullstack', label: '🚀 Full-Stack', desc: 'Les deux + DevOps' },
      { value: 'data', label: '📊 Data / ML', desc: 'Python, Data Science, IA' },
    ],
  },
  {
    id: 'goal',
    icon: Target,
    question: 'Quel est ton objectif principal ?',
    sub: 'Pour personnaliser ta roadmap et tes offres d\'emploi',
    type: 'choice',
    options: [
      { value: 'job_6m', label: '💼 Trouver un job en < 6 mois', desc: 'Priorité aux offres & entretiens' },
      { value: 'job_1y', label: '📈 Monter en compétences (1 an)', desc: 'Roadmap d\'apprentissage intense' },
      { value: 'senior', label: '🏆 Devenir Senior dans 2 ans', desc: 'Plan de carrière long terme' },
      { value: 'freelance', label: '🌍 Freelance / International', desc: 'Préparer un profil global' },
    ],
  },
  {
    id: 'availability',
    icon: Clock,
    question: 'Combien d\'heures peux-tu investir par semaine ?',
    sub: 'Pour calibrer la charge de travail de ta roadmap',
    type: 'choice',
    options: [
      { value: '5h', label: '⚡ 1 à 5h / semaine', desc: 'Rythme léger, progression douce' },
      { value: '10h', label: '🔥 5 à 10h / semaine', desc: 'Rythme recommandé' },
      { value: '20h', label: '💪 10 à 20h / semaine', desc: 'Mode intensif — résultats rapides' },
      { value: '40h', label: '🚀 +20h / semaine', desc: 'Bootcamp total — transformation radicale' },
    ],
  },
  {
    id: 'weakness',
    icon: BarChart2,
    question: 'Ton plus grand manque selon toi ?',
    sub: 'On a détecté que TypeScript, Docker & System Design manquent à ton CV',
    type: 'choice',
    options: [
      { value: 'algo', label: '🧩 Algorithmique / LeetCode', desc: 'Crucial pour les entretiens' },
      { value: 'sysdesign', label: '🏗️ System Design', desc: 'Architecture à grande échelle' },
      { value: 'english', label: '🌐 Anglais technique', desc: 'Communiquer en équipe internationale' },
      { value: 'soft', label: '🤝 Soft skills & présentation', desc: 'Convaincre les recruteurs' },
    ],
  },
  {
    id: 'city',
    icon: Globe,
    question: 'Où cherches-tu à travailler ?',
    sub: 'Pour filtrer les offres géographiquement',
    type: 'choice',
    options: [
      { value: 'casablanca', label: '🏙️ Casablanca', desc: 'Hub tech #1 au Maroc' },
      { value: 'rabat', label: '🏛️ Rabat', desc: 'Institutions & startups' },
      { value: 'fes', label: '🕌 Fès / Meknès', desc: 'Marché local en croissance' },
      { value: 'remote', label: '🌍 Télétravail / International', desc: 'France, Canada, Emirats…' },
    ],
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━ MAIN COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('upload'); // upload | analyzing | questions | building | done
  const [file, setFile] = useState(null);
  const [isDrag, setIsDrag] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildStep, setBuildStep] = useState(0);
  const fileRef = useRef(null);

  const analysisSteps = [
    'Extraction du texte du CV…',
    'Identification des compétences techniques…',
    'Analyse du niveau d\'expérience…',
    'Détection des lacunes vs le marché…',
    'Calcul du score de profil…',
    'Génération des recommandations…',
  ];

  const buildSteps = [
    'Création de ton Skill DNA…',
    'Configuration de ta Roadmap personnalisée…',
    'Sélection des offres matchées…',
    'Calibration de ton AI Coach…',
    'Finalisation de ton profil SKILLMAP…',
  ];

  /* ── Drag & Drop ── */
  const handleDrop = e => {
    e.preventDefault(); setIsDrag(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === 'application/pdf' || f.name.endsWith('.pdf') || f.name.endsWith('.docx'))) setFile(f);
  };

  const handleFile = e => {
    const f = e.target.files[0]; if (f) setFile(f);
  };

  /* ── Start analysis ── */
  const startAnalysis = async () => {
    setStep('analyzing');
    for (let i = 0; i <= 100; i += 2) {
      await sleep(60);
      setAnalysisProgress(i);
      if (i % 17 === 0) setAnalysisStep(s => Math.min(s + 1, analysisSteps.length - 1));
    }
    await sleep(400);
    setStep('questions');
  };

  /* ── Answer a question ── */
  const answer = val => {
    const q = QUESTIONS[currentQ];
    setAnswers(a => ({ ...a, [q.id]: val }));
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) setCurrentQ(q => q + 1);
      else startBuilding();
    }, 350);
  };

  /* ── Build profile ── */
  const startBuilding = async () => {
    setStep('building');
    for (let i = 0; i <= 100; i += 1.5) {
      await sleep(40);
      setBuildProgress(Math.min(i, 100));
      if (i % 20 === 0) setBuildStep(s => Math.min(s + 1, buildSteps.length - 1));
    }
    await sleep(600);
    setStep('done');
    await sleep(1800);
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight:'100vh', background:'#070711', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Inter',sans-serif", color:'white', padding:'24px', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse3 { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.97)} }
        @keyframes spin2 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bgBlob { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.1) translate(20px,-20px)} }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .pulse3 { animation: pulse3 2s ease-in-out infinite; }
        .spin2 { animation: spin2 1.4s linear infinite; }
        .float { animation: float 3s ease-in-out infinite; }
        .opt-btn { transition:all 0.2s cubic-bezier(0.23,1,0.32,1); cursor:pointer; }
        .opt-btn:hover { transform:translateY(-2px); }
        .opt-btn.selected { border-color:rgba(99,102,241,0.6) !important; background:rgba(99,102,241,0.15) !important; }
      `}</style>

      {/* Aurora bg */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:0 }}>
        <div style={{ position:'absolute', top:'-20%', left:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)', animation:'bgBlob 18s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%)', animation:'bgBlob 22s ease-in-out infinite reverse' }} />
      </div>

      {/* Logo */}
      <div style={{ position:'fixed', top:24, left:28, display:'flex', alignItems:'center', gap:10, zIndex:10 }}>
        <div style={{ width:34, height:34, borderRadius:9, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center' }}><Network size={17} color="white" /></div>
        <span style={{ fontWeight:900, fontSize:16, letterSpacing:-0.5 }}>SKILL<span style={{ color:'#818cf8' }}>MAP</span></span>
      </div>

      {/* Step indicator */}
      <div style={{ position:'fixed', top:28, right:28, display:'flex', alignItems:'center', gap:8, zIndex:10 }}>
        {['upload','questions','done'].map((s, i) => {
          const active = (step==='upload'&&i===0)||(step==='analyzing'&&i===0)||((step==='questions'||step==='building')&&i===1)||(step==='done'&&i===2);
          const done = (i===0&&(step==='questions'||step==='building'||step==='done'))||(i===1&&(step==='building'||step==='done'));
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:8, border:`1px solid ${done?'rgba(52,211,153,0.5)':active?'rgba(99,102,241,0.5)':'rgba(255,255,255,0.1)'}`, background:done?'rgba(52,211,153,0.15)':active?'rgba(99,102,241,0.15)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:done?'#34d399':active?'#818cf8':'#4b5563' }}>
                {done ? <CheckCircle size={13} color="#34d399"/> : i+1}
              </div>
              {i<2 && <div style={{ width:20, height:1, background:'rgba(255,255,255,0.08)' }} />}
            </div>
          );
        })}
      </div>

      {/* ════════════════ STEP: UPLOAD ════════════════ */}
      {step === 'upload' && (
        <div className="fade-up" style={{ width:'100%', maxWidth:560, position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 14px', borderRadius:99, background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.2)', color:'#a5b4fc', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:20 }}>
              <Sparkles size={11} /> Bienvenue sur SKILLMAP
            </div>
            <h1 style={{ fontSize:36, fontWeight:900, letterSpacing:-1.5, lineHeight:1.1, marginBottom:14 }}>
              Commençons par<br />
              <span style={{ background:'linear-gradient(135deg,#a5b4fc,#818cf8,#c084fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>analyser ton CV</span>
            </h1>
            <p style={{ fontSize:14, color:'#6b7280', lineHeight:1.6 }}>Notre IA va scanner ton profil en <strong style={{ color:'#9ca3af' }}>30 secondes</strong> et construire ton Skill DNA personnalisé.</p>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e=>{e.preventDefault();setIsDrag(true)}}
            onDragLeave={()=>setIsDrag(false)}
            onDrop={handleDrop}
            onClick={()=>!file&&fileRef.current.click()}
            style={{ border:`2px dashed ${isDrag?'rgba(99,102,241,0.6)':file?'rgba(52,211,153,0.4)':'rgba(255,255,255,0.1)'}`, borderRadius:24, padding:'48px 32px', textAlign:'center', cursor:file?'default':'pointer', background:isDrag?'rgba(99,102,241,0.05)':file?'rgba(52,211,153,0.04)':'rgba(255,255,255,0.02)', transition:'all 0.3s', marginBottom:24 }}
          >
            {!file ? (
              <>
                <div className="float" style={{ width:64, height:64, borderRadius:18, background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                  <Upload size={26} color="#818cf8" />
                </div>
                <p style={{ fontSize:16, fontWeight:700, color:'white', marginBottom:8 }}>Glisse ton CV ici</p>
                <p style={{ fontSize:13, color:'#6b7280', marginBottom:16 }}>ou clique pour parcourir</p>
                <span style={{ fontSize:11, color:'#4b5563', padding:'4px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>PDF, DOCX — Max 10 MB</span>
              </>
            ) : (
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ width:52, height:52, borderRadius:14, background:'rgba(52,211,153,0.12)', border:'1px solid rgba(52,211,153,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <FileText size={22} color="#34d399" />
                </div>
                <div style={{ flex:1, textAlign:'left' }}>
                  <p style={{ fontWeight:700, fontSize:15, color:'white', marginBottom:4 }}>{file.name}</p>
                  <p style={{ fontSize:12, color:'#6b7280' }}>{(file.size/1024).toFixed(0)} KB · Prêt à analyser</p>
                </div>
                <button onClick={e=>{e.stopPropagation();setFile(null)}} style={{ padding:8, borderRadius:8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#6b7280', cursor:'pointer', display:'flex' }}><X size={14}/></button>
              </div>
            )}
            <input ref={fileRef} type="file" accept=".pdf,.docx" style={{ display:'none' }} onChange={handleFile} />
          </div>

          {/* OR manual */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize:11, color:'#4b5563', fontWeight:600 }}>OU</span>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.06)' }} />
          </div>

          <button
            onClick={()=>{ setFile({ name:'CV_Manual.pdf', size:240000 }); }}
            style={{ width:'100%', padding:'14px', borderRadius:14, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', color:'#9ca3af', fontSize:14, fontWeight:600, cursor:'pointer', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}
          >
            <User size={16} /> Continuer sans CV (remplir manuellement)
          </button>

          <button
            onClick={file ? startAnalysis : ()=>fileRef.current.click()}
            style={{ width:'100%', padding:'16px', borderRadius:14, background: file ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(99,102,241,0.2)', border:`1px solid ${file?'transparent':'rgba(99,102,241,0.3)'}`, color: file ? 'white' : '#818cf8', fontSize:15, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow: file ? '0 0 30px rgba(99,102,241,0.3)' : 'none', transition:'all 0.3s' }}
          >
            {file ? <><Zap size={17} /> Analyser mon CV avec l'IA</> : <><Upload size={17} /> Choisir un fichier</>}
            {file && <ArrowRight size={17} />}
          </button>

          {/* Trust badges */}
          <div style={{ display:'flex', justifyContent:'center', gap:20, marginTop:28 }}>
            {['🔒 100% confidentiel', '⚡ Analyse en 30s', '🤖 IA propriétaire'].map(b => (
              <span key={b} style={{ fontSize:11, color:'#4b5563', fontWeight:600 }}>{b}</span>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════ STEP: ANALYZING ════════════════ */}
      {step === 'analyzing' && (
        <div className="fade-up" style={{ width:'100%', maxWidth:480, textAlign:'center', position:'relative', zIndex:1 }}>
          {/* Animated orb */}
          <div style={{ position:'relative', width:120, height:120, margin:'0 auto 36px' }}>
            <div className="pulse3" style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,0.3),transparent 70%)' }} />
            <div className="spin2" style={{ position:'absolute', inset:6, borderRadius:'50%', border:'2px solid transparent', borderTopColor:'#818cf8', borderRightColor:'rgba(129,140,248,0.3)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Brain size={40} color="#818cf8" />
            </div>
          </div>

          <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:-0.5, marginBottom:12 }}>Analyse en cours…</h2>
          <p style={{ fontSize:13, color:'#818cf8', fontWeight:600, marginBottom:32, minHeight:20 }}>
            {analysisSteps[analysisStep]}
          </p>

          {/* Progress bar */}
          <div style={{ height:6, borderRadius:6, background:'rgba(255,255,255,0.06)', marginBottom:12, overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:6, background:'linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)', width:`${analysisProgress}%`, transition:'width 0.1s linear' }} />
          </div>
          <p style={{ fontSize:13, color:'#6b7280', fontWeight:700 }}>{Math.round(analysisProgress)}%</p>

          {/* Detected skills preview */}
          {analysisProgress > 40 && (
            <div style={{ marginTop:32, padding:'16px 20px', borderRadius:16, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', textAlign:'left', animation:'fadeUp 0.4s ease' }}>
              <p style={{ fontSize:11, color:'#6b7280', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10 }}>Skills détectés</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {FAKE_ANALYSIS.skills.map(s => (
                  <span key={s} style={{ padding:'4px 10px', borderRadius:8, background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.2)', color:'#a5b4fc', fontSize:12, fontWeight:600 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {analysisProgress > 70 && (
            <div style={{ marginTop:12, padding:'16px 20px', borderRadius:16, background:'rgba(52,211,153,0.04)', border:'1px solid rgba(52,211,153,0.15)', textAlign:'left', animation:'fadeUp 0.4s ease' }}>
              <p style={{ fontSize:11, color:'#6b7280', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Profil détecté</p>
              <p style={{ fontSize:14, color:'white', fontWeight:700 }}>{FAKE_ANALYSIS.education}</p>
              <p style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>{FAKE_ANALYSIS.experience}</p>
            </div>
          )}
        </div>
      )}

      {/* ════════════════ STEP: QUESTIONS ════════════════ */}
      {step === 'questions' && (
        <div style={{ width:'100%', maxWidth:580, position:'relative', zIndex:1 }}>
          {/* Progress dots */}
          <div style={{ display:'flex', gap:6, justifyContent:'center', marginBottom:40 }}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{ height:3, borderRadius:3, background: i <= currentQ ? '#818cf8' : 'rgba(255,255,255,0.1)', width: i === currentQ ? 28 : 14, transition:'all 0.3s' }} />
            ))}
          </div>

          {/* CV summary badge */}
          {currentQ === 0 && (
            <div className="fade-up" style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderRadius:14, background:'rgba(99,102,241,0.08)', border:'1px solid rgba(99,102,241,0.2)', marginBottom:28 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'rgba(99,102,241,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><FileText size={16} color="#818cf8" /></div>
              <div>
                <p style={{ fontSize:12, color:'#818cf8', fontWeight:700 }}>CV analysé — Score : {FAKE_ANALYSIS.score}/100</p>
                <p style={{ fontSize:11, color:'#6b7280' }}>On a trouvé {FAKE_ANALYSIS.skills.length} compétences · Niveau : {FAKE_ANALYSIS.level}</p>
              </div>
              <CheckCircle size={16} color="#34d399" style={{ marginLeft:'auto', flexShrink:0 }} />
            </div>
          )}

          {/* Question card */}
          <div key={currentQ} className="fade-up" style={{ marginBottom:32 }}>
            {(() => {
              const q = QUESTIONS[currentQ];
              const Icon = q.icon;
              return (
                <>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon size={20} color="#818cf8" />
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'#6b7280', fontWeight:600, marginBottom:4 }}>Question {currentQ + 1} / {QUESTIONS.length}</div>
                      <h2 style={{ fontSize:22, fontWeight:900, letterSpacing:-0.5, color:'white' }}>{q.question}</h2>
                    </div>
                  </div>
                  <p style={{ fontSize:13, color:'#6b7280', marginBottom:24, marginLeft:54 }}>{q.sub}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {q.options.map(opt => (
                      <button
                        key={opt.value}
                        className={`opt-btn ${answers[q.id]===opt.value?'selected':''}`}
                        onClick={() => answer(opt.value)}
                        style={{ padding:'16px 18px', borderRadius:14, border:`1px solid ${answers[q.id]===opt.value?'rgba(99,102,241,0.6)':'rgba(255,255,255,0.08)'}`, background: answers[q.id]===opt.value?'rgba(99,102,241,0.15)':'rgba(255,255,255,0.02)', textAlign:'left', color:'white' }}
                      >
                        <p style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>{opt.label}</p>
                        <p style={{ fontSize:11, color:'#6b7280' }}>{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Skip button */}
          <button
            onClick={() => {
              if (currentQ < QUESTIONS.length - 1) setCurrentQ(q => q + 1);
              else startBuilding();
            }}
            style={{ background:'none', border:'none', color:'#4b5563', fontSize:12, fontWeight:600, cursor:'pointer', display:'block', margin:'0 auto' }}
          >
            Passer cette question →
          </button>
        </div>
      )}

      {/* ════════════════ STEP: BUILDING ════════════════ */}
      {step === 'building' && (
        <div className="fade-up" style={{ width:'100%', maxWidth:480, textAlign:'center', position:'relative', zIndex:1 }}>
          <div className="pulse3" style={{ width:100, height:100, margin:'0 auto 32px', borderRadius:24, background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.3))', border:'1px solid rgba(99,102,241,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Sparkles size={44} color="#818cf8" />
          </div>
          <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:-0.5, marginBottom:12 }}>On construit ton profil…</h2>
          <p style={{ fontSize:13, color:'#818cf8', fontWeight:600, marginBottom:32 }}>{buildSteps[buildStep]}</p>
          <div style={{ height:6, borderRadius:6, background:'rgba(255,255,255,0.06)', marginBottom:12, overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:6, background:'linear-gradient(90deg,#6366f1,#8b5cf6,#34d399)', width:`${buildProgress}%`, transition:'width 0.05s linear' }} />
          </div>
          <p style={{ fontSize:13, color:'#6b7280', fontWeight:700 }}>{Math.round(buildProgress)}%</p>

          {/* Animated items appearing */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:32 }}>
            {[
              { icon:'🧬', label:'Skill DNA généré', done: buildProgress > 20 },
              { icon:'🗺️', label:'Roadmap personnalisée', done: buildProgress > 40 },
              { icon:'💼', label:'23 offres matchées', done: buildProgress > 60 },
              { icon:'🤖', label:'AI Coach configuré', done: buildProgress > 80 },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:12, background:item.done?'rgba(52,211,153,0.06)':'rgba(255,255,255,0.02)', border:`1px solid ${item.done?'rgba(52,211,153,0.2)':'rgba(255,255,255,0.05)'}`, transition:'all 0.5s', opacity: item.done?1:0.3 }}>
                <span style={{ fontSize:18 }}>{item.icon}</span>
                <span style={{ fontSize:13, fontWeight:600, color: item.done?'white':'#4b5563' }}>{item.label}</span>
                {item.done && <CheckCircle size={14} color="#34d399" style={{ marginLeft:'auto' }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════ STEP: DONE ════════════════ */}
      {step === 'done' && (
        <div className="fade-up" style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ width:90, height:90, borderRadius:24, background:'linear-gradient(135deg,rgba(52,211,153,0.2),rgba(16,185,129,0.2))', border:'1px solid rgba(52,211,153,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', boxShadow:'0 0 40px rgba(52,211,153,0.2)' }}>
            <CheckCircle size={44} color="#34d399" />
          </div>
          <h2 style={{ fontSize:32, fontWeight:900, letterSpacing:-1, marginBottom:12 }}>Ton profil est prêt ! 🎉</h2>
          <p style={{ fontSize:14, color:'#6b7280', marginBottom:8 }}>Score de profil initial : <strong style={{ color:'#818cf8' }}>{FAKE_ANALYSIS.score}/100</strong></p>
          <p style={{ fontSize:13, color:'#4b5563' }}>Redirection vers ton dashboard…</p>
          <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:20 }}>
            {['⚡ Roadmap créée','💼 23 offres matchées','🤖 Coach activé'].map(b => (
              <span key={b} style={{ fontSize:11, color:'#34d399', fontWeight:700, padding:'4px 10px', borderRadius:8, background:'rgba(52,211,153,0.1)', border:'1px solid rgba(52,211,153,0.2)' }}>{b}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
