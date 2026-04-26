import React, { useState } from 'react';
import { CheckCircle, Lock, Play } from 'lucide-react';
import { PageHeader as PH } from '../layout/PageHeader.jsx';

export const RoadmapTab = ({ t, roadSteps }) => {
  const [activeTrack, setActiveTrack] = useState(0);
  const tracks = [
    { name:'Full-Stack Senior', emoji:'🚀', progress:35, color:'#818cf8' },
    { name:'ML Engineer', emoji:'🤖', progress:12, color:'#34d399' },
    { name:'DevOps', emoji:'⚙️', progress:8, color:'#fb923c' },
  ];
  const modules = [
    { title:'React Fondamentaux', sub:'Hooks, Context, Router — 12 leçons', done:true, xp:'+150 XP' },
    { title:'React Avancé & Hooks', sub:'useMemo, useCallback, Custom Hooks — 8 leçons', done:false, current:true, xp:'+200 XP' },
    { title:'TypeScript Mastery', sub:'Types avancés, Generics, infer — 6 leçons', done:false, xp:'+180 XP' },
    { title:'System Design', sub:'Load Balancing, Caching, DB Sharding — 10 leçons', done:false, xp:'+300 XP', locked:true },
    { title:'Node.js & API Design', sub:'REST, GraphQL, WebSockets — 9 leçons', done:false, xp:'+220 XP', locked:true },
    { title:'Cloud & DevOps', sub:'Docker, K8s, CI/CD, AWS — 12 leçons', done:false, xp:'+350 XP', locked:true },
    { title:'Préparation Entretiens', sub:'LeetCode, System Design, Behavioural — 6 leçons', done:false, xp:'+400 XP', locked:true },
    { title:'Certification Senior', sub:'Examen final — 1 épreuve', done:false, xp:'+500 XP', locked:true },
  ];
  return (
    <>
      <PH badge="🗺️ Roadmap" title="Ta Roadmap Carrière" sub="Parcours personnalisé vers Senior Full-Stack — généré par SKILLMAP AI" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:24 }}>
        {tracks.map((tk, i) => (
          <div key={i} onClick={() => setActiveTrack(i)} style={{ padding:'18px 20px', borderRadius:16, border:`1px solid ${activeTrack===i?tk.color+'55':'rgba(255,255,255,0.07)'}`, background:activeTrack===i?`rgba(${tk.color==='#818cf8'?'129,140,248':tk.color==='#34d399'?'52,211,153':'251,146,60'},0.08)`:'rgba(255,255,255,0.02)', cursor:'pointer', transition:'all 0.2s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:22 }}>{tk.emoji}</span>
              {activeTrack===i && <span style={{ fontSize:10, color:tk.color, fontWeight:700, padding:'2px 8px', borderRadius:6, background:`${tk.color}22` }}>Actif</span>}
            </div>
            <p style={{ fontWeight:800, fontSize:14, color:'white', marginBottom:6 }}>{tk.name}</p>
            <div style={{ height:4, borderRadius:4, background:'rgba(255,255,255,0.06)', marginBottom:4 }}>
              <div style={{ height:'100%', borderRadius:4, background:tk.color, width:`${tk.progress}%` }} />
            </div>
            <p style={{ fontSize:11, color:'#6b7280' }}>{tk.progress}% complété</p>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <div>
            <h3 style={{ fontWeight:800, fontSize:15, color:'white' }}>Modules du parcours</h3>
            <p style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>Progression globale : 35% · 2/8 modules terminés</p>
          </div>
          <div style={{ height:6, width:160, borderRadius:4, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:4, background:'linear-gradient(90deg,#6366f1,#8b5cf6)', width:'35%' }} />
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {modules.map((mod, i) => (
            <div key={i} style={{ display:'flex', gap:16, position:'relative', paddingBottom: i<modules.length-1?20:0 }}>
              {i<modules.length-1 && <div style={{ position:'absolute', left:19, top:40, bottom:0, width:2, background:mod.done?'rgba(52,211,153,0.3)':'rgba(255,255,255,0.05)' }} />}
              <div style={{ width:38, height:38, borderRadius:12, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background:mod.done?'rgba(52,211,153,0.2)':mod.current?'rgba(99,102,241,0.25)':mod.locked?'rgba(255,255,255,0.03)':'rgba(255,255,255,0.05)', border:`1px solid ${mod.done?'rgba(52,211,153,0.3)':mod.current?'rgba(99,102,241,0.4)':'rgba(255,255,255,0.05)'}` }}>
                {mod.done ? <CheckCircle size={16} color="#34d399" /> : mod.locked ? <Lock size={14} color="#374151" /> : <Play size={14} color={mod.current?'#818cf8':'#4b5563'} />}
              </div>
              <div style={{ flex:1, paddingTop:6 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:2 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:mod.done?'#6b7280':mod.current?'white':mod.locked?'#374151':'#9ca3af' }}>{mod.title}</p>
                  <span style={{ fontSize:10, fontWeight:700, color:mod.done?'#34d399':mod.current?'#818cf8':'#374151', padding:'2px 8px', borderRadius:6, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>{mod.xp}</span>
                </div>
                <p style={{ fontSize:12, color:'#4b5563' }}>{mod.sub}</p>
                {mod.current && <button style={{ marginTop:8, padding:'6px 14px', borderRadius:8, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', fontSize:11, fontWeight:700, cursor:'pointer' }}>▶ Continuer →</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
