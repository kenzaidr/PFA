import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useThemeLang } from '../contexts/ThemeLangContext.jsx';
import {
  Moon, Sun, Globe, TrendingUp, Cpu, Network, Zap, ArrowRight,
  BarChart2, Target, Brain, Shield, Users, Star, ChevronRight,
  Sparkles, MapPin, Award, CheckCircle, Play, Code2, Layers, GitBranch, Rocket
} from 'lucide-react';

import { Navbar } from '../components/layout/Navbar.jsx';
import { CursorGlow } from '../components/layout/CursorGlow.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { Counter } from '../components/ui/Counter.jsx';
import { homeI18n as i18n } from '../utils/i18n.js';

/* ─────────────────── color map ─────────────────── */
const colorMap = {
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'text-violet-400', glow: 'shadow-violet-500/20' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: 'text-rose-400', glow: 'shadow-rose-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400', glow: 'shadow-amber-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
};

/* ─────────────────── HomePage ─────────────────── */
export default function HomePage() {
  const { lang } = useThemeLang();
  const t = i18n[lang];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActiveStep(s => (s + 1) % 3), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="min-h-screen bg-[#080810] text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        ::selection { background: rgba(99,102,241,0.4); color: white; }

        /* Aurora */
        @keyframes aurora1 { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(60px,-40px) scale(1.1);} 66%{transform:translate(-40px,30px) scale(0.95);} }
        @keyframes aurora2 { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(-80px,50px) scale(1.15);} 66%{transform:translate(50px,-60px) scale(0.9);} }
        @keyframes aurora3 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(40px,40px) scale(1.2);} }
        .aurora1{animation:aurora1 18s ease-in-out infinite;}
        .aurora2{animation:aurora2 22s ease-in-out infinite;}
        .aurora3{animation:aurora3 15s ease-in-out infinite;}

        /* Noise */
        .noise::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:1;}

        /* Grid */
        .grid-bg{background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:60px 60px;}

        /* Gradient border */
        .grad-border{position:relative;}
        .grad-border::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(99,102,241,0.4),rgba(139,92,246,0.15),rgba(6,182,212,0.2));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}

        /* Text */
        .text-gradient{background:linear-gradient(135deg,#e0e7ff 0%,#a5b4fc 40%,#818cf8 70%,#c084fc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% 200%;animation:gradShift 6s ease infinite;}
        @keyframes gradShift{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}

        /* Buttons */
        .btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);transition:all 0.3s;position:relative;overflow:hidden;}
        .btn-primary::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent);opacity:0;transition:opacity 0.3s;}
        .btn-primary:hover::after{opacity:1;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 20px 50px rgba(99,102,241,0.5),0 0 0 1px rgba(99,102,241,0.3);}

        /* Marquee */
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .marquee-track{animation:marquee 30s linear infinite;display:flex;width:max-content;}
        .marquee-track:hover{animation-play-state:paused;}

        /* Cards */
        .feature-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);transition:all 0.4s cubic-bezier(0.23,1,0.32,1);backdrop-filter:blur(12px);}
        .feature-card:hover{background:rgba(99,102,241,0.06);border-color:rgba(99,102,241,0.25);transform:translateY(-4px);box-shadow:0 24px 60px rgba(0,0,0,0.4),0 0 40px rgba(99,102,241,0.1);}
        .stat-card{backdrop-filter:blur(20px);background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);transition:all 0.3s;}
        .stat-card:hover{border-color:rgba(99,102,241,0.3);background:rgba(99,102,241,0.05);}

        /* Float */
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
        @keyframes floatR{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-8px) rotate(3deg);}}
        .animate-float{animation:float 5s ease-in-out infinite;}
        .animate-floatR{animation:floatR 7s ease-in-out infinite;}

        /* Shimmer */
        @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
        .shimmer-line{background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);background-size:200% 100%;animation:shimmer 3s infinite linear;}

        /* Slide up (hero only) */
        @keyframes slideUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
        .animate-slide-up{animation:slideUp 0.8s cubic-bezier(0.23,1,0.32,1) forwards;}

        /* Cursor glow */
        .cursor-glow{pointer-events:none;position:fixed;width:400px;height:400px;background:radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%);border-radius:50%;transform:translate(-50%,-50%);transition:left 0.15s ease,top 0.15s ease;z-index:9999;}

        /* Radar */
        @keyframes radarSpin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        .radar-sweep{transform-origin:center;animation:radarSpin 3s linear infinite;}
        @keyframes blip{0%,100%{opacity:0;r:0;}50%{opacity:1;}}

        /* Ping */
        .particle{position:absolute;border-radius:50%;animation:float var(--dur) ease-in-out infinite;animation-delay:var(--delay);}
      `}</style>

      <Navbar />

      {/* ── CURSOR GLOW ── */}
      <CursorGlow />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden noise">
        {/* Aurora blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="aurora1 absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-30" style={{background:'radial-gradient(circle,rgba(99,102,241,0.5) 0%,transparent 70%)'}} />
          <div className="aurora2 absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-25" style={{background:'radial-gradient(circle,rgba(139,92,246,0.5) 0%,transparent 70%)'}} />
          <div className="aurora3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15" style={{background:'radial-gradient(circle,rgba(6,182,212,0.4) 0%,transparent 70%)'}} />
        </div>
        {/* Grid */}
        <div className="absolute inset-0 grid-bg" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 80% 60% at 50% 0%,transparent 40%,rgba(8,8,16,0.8) 100%)'}} />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: [5,7,4,9,6,4,8,5][i]+'px', height: [5,7,4,9,6,4,8,5][i]+'px',
            top: ['18%','72%','38%','12%','82%','55%','28%','65%'][i],
            left: ['8%','88%','4%','92%','14%','94%','50%','30%'][i],
            background: ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ec4899','#818cf8','#34d399'][i],
            opacity: 0.5, '--dur': ['5s','7s','6s','8s','5.5s','6.5s','4.5s','7.5s'][i],
            '--delay': ['0s','1s','2s','0.5s','1.5s','3s','0.8s','2.5s'][i],
          }} />
        ))}

        {/* Badge */}
        <div className="animate-slide-up relative z-10 mb-7" style={{ animationDelay: '0.1s', opacity:0 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{background:'rgba(99,102,241,0.12)',border:'1px solid rgba(99,102,241,0.35)',color:'#a5b4fc',backdropFilter:'blur(8px)'}}>
            <Sparkles className="w-3.5 h-3.5" />
            {t.badge}
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          </span>
        </div>

        {/* Title */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="block text-white/90">{t.heroTitle[0]}</span>
            <span className="block text-gradient">{t.heroTitle[1]}</span>
            <span className="block text-white/90">{t.heroTitle[2]}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {t.heroSub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/auth" className="btn-primary group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-2xl shadow-indigo-500/30">
              <Zap className="w-5 h-5" />
              {t.heroCta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-base border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-70" />
                <Play className="w-4 h-4 fill-white relative z-10" />
              </div>
              {t.heroCta2}
            </button>
          </div>

          {/* Social proof bar */}
          <div className="flex items-center justify-center gap-3 mt-10 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex -space-x-2">
              {['YA','SM','HT','KB','AO'].map((a, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080810] flex items-center justify-center text-[10px] font-bold"
                  style={{ background: `hsl(${i * 60 + 200}, 70%, 50%)` }}>
                  {a}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-white font-semibold">12 400+</span> talents nous font confiance
              <span className="ml-2 text-yellow-400">★★★★★</span>
            </div>
          </div>
        </div>

        {/* Hero visual – floating dashboard mockup */}
        <div className="relative z-10 mt-20 max-w-5xl w-full mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="relative rounded-3xl border border-white/8 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
              {['#ff5f56','#ffbd2e','#27c93f'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
              <div className="flex-1 mx-4 h-6 rounded-lg bg-white/5 flex items-center px-3">
                <span className="text-gray-500 text-xs">app.skillmap.ma/dashboard</span>
              </div>
            </div>

            {/* Dashboard preview content */}
            <div className="grid grid-cols-3 gap-4 p-6">
              {/* Skill DNA card */}
              <div className="col-span-2 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Skill DNA</span>
                  <span className="text-xs text-gray-500">Live Analysis</span>
                </div>
                <div className="space-y-3">
                  {[['React/Next.js', 92],['Python ML', 78],['DevOps/K8s', 65],['System Design', 84]].map(([skill, pct]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300 font-medium">{skill}</span>
                        <span className="text-indigo-400 font-bold">{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: pct + '%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market widget */}
              <div className="space-y-3">
                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Market Pulse</p>
                  {[['React Dev', '+18%'],['ML Eng.', '+31%'],['DevOps', '+25%']].map(([n, v]) => (
                    <div key={n} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-xs text-gray-400">{n}</span>
                      <span className="text-xs font-bold text-emerald-400">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-violet-500/5 border border-violet-500/15 p-4">
                  <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Shadow Twin</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">Valeur dans 6 mois :</p>
                  <p className="text-xl font-black text-white mt-1">+4 200<span className="text-violet-400 text-sm font-medium"> DH/mo</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Shimmer overlay for premium feel */}
          <div className="absolute -inset-px rounded-3xl shimmer-line pointer-events-none" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(99,102,241,0.05) 0%,transparent 70%)'}} />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.statsVal.map((val, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="stat-card grad-border rounded-2xl p-7 text-center group cursor-default">
                  <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
                    <Counter val={val} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{t.statsLabel[i]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-5">
              <Cpu className="w-3 h-3" />
              {t.featuresBadge}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight" style={{ whiteSpace: 'pre-line' }}>{t.featuresTitle}</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">{t.featuresSub}</p>
          </Reveal>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {t.features.map(({ color, title, desc }, i) => {
              const Icon = [Brain, TrendingUp, Target, MapPin, Code2, Layers][i];
              const c = colorMap[color];
              const spans = ['md:col-span-3','md:col-span-3','md:col-span-2','md:col-span-2','md:col-span-2','md:col-span-6'];
              const isBig = i < 2;
              return (
                <Reveal key={i} delay={i * 80} className={spans[i]}>
                  <div className={`feature-card grad-border rounded-2xl p-6 h-full ${isBig ? 'min-h-[220px]' : 'min-h-[180px]'} flex flex-col`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0`} style={{background:`rgba(${color==='indigo'?'99,102,241':color==='emerald'?'16,185,129':color==='violet'?'139,92,246':color==='rose'?'244,63,94':color==='amber'?'245,158,11':'6,182,212'},0.12)`,border:`1px solid rgba(${color==='indigo'?'99,102,241':color==='emerald'?'16,185,129':color==='violet'?'139,92,246':color==='rose'?'244,63,94':color==='amber'?'245,158,11':'6,182,212'},0.25)`}}>
                      <Icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">{desc}</p>
                    {isBig && <div className={`mt-5 text-[11px] font-semibold uppercase tracking-widest ${c.icon} flex items-center gap-1.5`}>
                      <span>Explorer</span><ArrowRight className="w-3 h-3" />
                    </div>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/4 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">
              <Zap className="w-3 h-3" />
              {t.howBadge}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight" style={{ whiteSpace: 'pre-line' }}>{t.howTitle}</h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/50 to-transparent transform -translate-x-1/2" />

            <div className="space-y-12">
              {t.steps.map(({ n, title, desc }, i) => (
                <div key={i}
                  className={`relative flex flex-col md:flex-row items-center gap-8 cursor-pointer group`}
                  onClick={() => setActiveStep(i)}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:order-1' : 'md:order-3'}`}>
                    <div className={`inline-block p-6 rounded-2xl border transition-all duration-500 ${activeStep === i
                      ? 'bg-indigo-500/10 border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                      : 'bg-white/2 border-white/6 hover:border-white/12'}`}>
                      <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>

                  {/* Number bubble */}
                  <div className="md:order-2 relative flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg z-10 transition-all duration-500 ${activeStep === i
                      ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/40 scale-110'
                      : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                      {n}
                    </div>
                    {activeStep === i && (
                      <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 animate-ping" />
                    )}
                  </div>

                  <div className={`flex-1 ${i % 2 !== 0 ? 'md:text-right md:order-1' : 'md:order-3'} hidden md:block`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-widest mb-5">
              <Star className="w-3 h-3" />
              {t.testimonialsBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">{t.testimonialsTitle}</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.testimonials.map(({ name, role, avatar, rating, text }, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="feature-card grad-border rounded-2xl p-6 flex flex-col gap-4 h-full">
                  <div className="flex gap-0.5">
                    {[...Array(rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">{text}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg"
                      style={{ background: `hsl(${i * 90 + 220}, 70%, 55%)` }}>
                      {avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{name}</p>
                      <p className="text-gray-500 text-xs">{role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGOS MARQUEE ── */}
      <section className="py-14 border-y border-white/5 overflow-hidden">
        <Reveal>
          <p className="text-center text-gray-600 text-[11px] font-semibold uppercase tracking-[0.2em] mb-10">Ils recrutent sur SKILLMAP</p>
        </Reveal>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{background:'linear-gradient(to right,#080810,transparent)'}} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{background:'linear-gradient(to left,#080810,transparent)'}} />
          <div className="marquee-track gap-16 px-8">
            {['OCP Group','CIH Bank','Atos','IndustriAll','Capgemini','Orange MA','Maroc Telecom','BMCE','Inwi','Société Générale','OCP Group','CIH Bank','Atos','IndustriAll','Capgemini','Orange MA','Maroc Telecom','BMCE','Inwi','Société Générale'].map((company, i) => (
              <span key={i} className="text-gray-500 font-black text-base shrink-0 hover:text-gray-300 transition-colors duration-300 tracking-tight cursor-default select-none">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 relative overflow-hidden noise">
        {/* Aurora BG */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(99,102,241,0.2) 0%,rgba(139,92,246,0.1) 40%,transparent 70%)',filter:'blur(40px)'}} />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/50 animate-floatR">
              <Rocket className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight" style={{ whiteSpace: 'pre-line' }}>
              {t.ctaTitle}
            </h2>
            <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">{t.ctaSub}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link to="/auth" className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-indigo-500/40">
                <CheckCircle className="w-5 h-5" />
                {t.ctaBtn}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#" className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl text-gray-300 font-semibold text-base border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all">
                <Play className="w-4 h-4 fill-gray-300" /> Voir la démo
              </a>
            </div>
            <p className="text-gray-600 text-sm mb-12">{t.ctaNota}</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[{icon:Shield,text:'100% Sécurisé'},{icon:Users,text:'12 400+ Talents'},{icon:Award,text:'ESISA Certified'},{icon:GitBranch,text:'Open Source'}].map(({icon:Icon,text}) => (
                <div key={text} className="flex items-center gap-2 text-gray-500 text-sm">
                  <Icon className="w-4 h-4 text-gray-600" />{text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Network className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-black text-lg">SKILL<span className="text-indigo-400">MAP</span></span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{t.footerTagline}</p>
            </div>

            {/* Product */}
            <div>
              <p className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Product</p>
              <ul className="space-y-3">
                {t.footerLinks.product.map(l => (
                  <li key={l}><a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Company</p>
              <ul className="space-y-3">
                {t.footerLinks.company.map(l => (
                  <li key={l}><a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal + newsletter */}
            <div>
              <p className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Legal</p>
              <ul className="space-y-3 mb-6">
                {t.footerLinks.legal.map(l => (
                  <li key={l}><a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{l}</a></li>
                ))}
              </ul>
              <div className="flex rounded-xl overflow-hidden border border-white/8">
                <input placeholder="ton@email.ma" className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-400 placeholder-gray-600 focus:outline-none" />
                <button className="px-4 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-xs font-bold">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">{t.footerCopy}</p>
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <BarChart2 className="w-3 h-3 text-emerald-500" />
              <span>Système opérationnel</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
