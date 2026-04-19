import React from 'react';
import { RadarChart } from '../ui/RadarChart.jsx';
import { MiniBar } from '../ui/MiniBar.jsx';
import { PageHeader as PH } from '../layout/PageHeader.jsx';

export const SkillsTab = ({ t, radarData }) => {
  const allSkills = [
    { name:'React', level:'Senior', xp:92, category:'Frontend', color:'#818cf8', cert:true },
    { name:'TypeScript', level:'Intermédiaire', xp:70, category:'Frontend', color:'#38bdf8', cert:false },
    { name:'Node.js', level:'Intermédiaire', xp:68, category:'Backend', color:'#34d399', cert:false },
    { name:'Python', level:'Intermédiaire', xp:78, category:'Data', color:'#fbbf24', cert:false },
    { name:'SQL / PostgreSQL', level:'Avancé', xp:80, category:'Data', color:'#a78bfa', cert:true },
    { name:'Docker', level:'Débutant', xp:55, category:'DevOps', color:'#38bdf8', cert:false },
    { name:'AWS', level:'Débutant', xp:40, category:'DevOps', color:'#fb923c', cert:false },
    { name:'System Design', level:'Débutant', xp:52, category:'Architecture', color:'#f87171', cert:false },
    { name:'GraphQL', level:'Intermédiaire', xp:65, category:'Frontend', color:'#e879f9', cert:false },
    { name:'Git / CI/CD', level:'Avancé', xp:84, category:'DevOps', color:'#34d399', cert:true },
  ];
  const badges = [
    { icon:'⚡', name:'React Senior', desc:'Maîtrise avancée de React 18', earned:true },
    { icon:'🎯', name:'SQL Expert', desc:'Requêtes complexes & optimisation', earned:true },
    { icon:'🔥', name:'Streak 14j', desc:'14 jours consécutifs d\'apprentissage', earned:true },
    { icon:'🤖', name:'AI Builder', desc:'Intégration d\'APIs IA en production', earned:false },
    { icon:'☁️', name:'Cloud Native', desc:'AWS Solutions Architect Associate', earned:false },
    { icon:'🏆', name:'Top 100', desc:'Top 100 national SKILLMAP', earned:false },
  ];
  return (
    <>
      <PH badge="🧬 Skill DNA" title="Mes Compétences" sub="Analyse complète de ton profil technique — mise à jour en temps réel" />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
        <div className="card" style={{ padding:24, display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ display:'flex', justifyContent:'space-between', width:'100%', marginBottom:16 }}>
            <div><h3 style={{ fontWeight:800, fontSize:15, color:'white' }}>Radar Global</h3><p style={{ fontSize:11, color:'#6b7280' }}>Score composite : 74/100</p></div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#34d399', fontWeight:700 }}><span style={{ width:6, height:6, borderRadius:'50%', background:'#34d399', animation:'pulse2 2s infinite', display:'inline-block' }}/>LIVE</div>
          </div>
          <RadarChart data={radarData} size={260} />
        </div>
        <div className="card" style={{ padding:24, overflowY:'auto', maxHeight:340 }}>
          <h3 style={{ fontWeight:800, fontSize:15, color:'white', marginBottom:16 }}>Détail par skill</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {allSkills.map((s, i) => (
              <div key={i}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:'white' }}>{s.name}</span>
                    {s.cert && <span style={{ fontSize:10, color:'#fbbf24', fontWeight:700 }}>✓ Certifié</span>}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:6, background:`rgba(${s.color==='#818cf8'?'129,140,248':s.color==='#34d399'?'52,211,153':'99,102,241'},0.15)`, color:s.color, fontWeight:600 }}>{s.level}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:'#818cf8' }}>{s.xp}%</span>
                  </div>
                </div>
                <MiniBar pct={s.xp} color={s.xp>=80?'#34d399':s.xp>=65?'#818cf8':'#f87171'} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding:24 }}>
        <h3 style={{ fontWeight:800, fontSize:15, color:'white', marginBottom:4 }}>Badges & Certifications</h3>
        <p style={{ fontSize:11, color:'#6b7280', marginBottom:20 }}>3/6 badges débloqués</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12 }}>
          {badges.map((b, i) => (
            <div key={i} style={{ padding:'16px 12px', borderRadius:16, border:`1px solid ${b.earned?'rgba(99,102,241,0.3)':'rgba(255,255,255,0.06)'}`, background:b.earned?'rgba(99,102,241,0.08)':'rgba(255,255,255,0.02)', textAlign:'center', opacity:b.earned?1:0.4, transition:'all 0.2s' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{b.icon}</div>
              <p style={{ fontSize:11, fontWeight:700, color:b.earned?'white':'#6b7280', marginBottom:4 }}>{b.name}</p>
              <p style={{ fontSize:9, color:'#4b5563', lineHeight:1.3 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
