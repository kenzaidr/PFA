import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PageHeader as PH } from '../layout/PageHeader.jsx';

export const MarketTab = ({ t, marketData }) => {
  const companies = [
    { name:'OCP Digital', jobs:12, logo:'🏭', avg:'20 000 DH' },
    { name:'Capgemini', jobs:8, logo:'💼', avg:'18 000 DH' },
    { name:'CIH Bank', jobs:5, logo:'🏦', avg:'22 000 DH' },
    { name:'Maroc Telecom', jobs:9, logo:'📡', avg:'19 000 DH' },
    { name:'Sopra Steria', jobs:6, logo:'⚙️', avg:'17 000 DH' },
    { name:'BMCE IT', jobs:4, logo:'💳', avg:'21 000 DH' },
  ];
  const insights = [
    { icon:'📈', title:'React +18%', sub:'Hausse salariale annuelle' },
    { icon:'🔥', title:'ML Engineer', sub:'Profil le plus demandé' },
    { icon:'💡', title:'3 000 offres', sub:'Actives aujourd\'hui au Maroc' },
    { icon:'⚡', title:'10s matching', sub:'Délai moyen de réponse recruteur' },
  ];
  return (
    <>
      <PH badge="📊 Market Pulse" title="Analyse du Marché" sub="Données salariales et tendances en temps réel depuis +340 entreprises marocaines" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {insights.map((ins, i) => (
          <div key={i} className="card" style={{ padding:'18px 20px', textAlign:'center' }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{ins.icon}</div>
            <p style={{ fontWeight:900, fontSize:18, color:'white', letterSpacing:-0.5 }}>{ins.title}</p>
            <p style={{ fontSize:11, color:'#6b7280', marginTop:4 }}>{ins.sub}</p>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
        <div className="card" style={{ padding:24 }}>
          <h3 style={{ fontWeight:800, fontSize:15, color:'white', marginBottom:4 }}>Salaires par spécialité</h3>
          <p style={{ fontSize:11, color:'#6b7280', marginBottom:20 }}>Fourchettes mensuelles · DH</p>
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            {marketData.map((m, i) => (
              <div key={i}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:m.color, boxShadow:`0 0 8px ${m.color}` }} />
                    <span style={{ fontSize:13, color:'#e5e7eb', fontWeight:600 }}>{m.skill}</span>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <span style={{ fontSize:12, color:'white', fontWeight:700 }}>{m.salary}</span>
                    <span style={{ fontSize:11, color:'#34d399', marginLeft:8, fontWeight:700 }}>{m.trend}</span>
                  </div>
                </div>
                <div style={{ height:6, borderRadius:4, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:4, background:`linear-gradient(90deg,${m.color},${m.color}88)`, width:`${40+i*12}%`, transition:'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:24 }}>
          <h3 style={{ fontWeight:800, fontSize:15, color:'white', marginBottom:4 }}>Top Recruteurs Actifs</h3>
          <p style={{ fontSize:11, color:'#6b7280', marginBottom:20 }}>Entreprises avec le plus d'offres</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {companies.map((c, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px', borderRadius:12, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', cursor:'pointer', transition:'all 0.2s' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'rgba(99,102,241,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{c.logo}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:'white' }}>{c.name}</p>
                  <p style={{ fontSize:11, color:'#6b7280' }}>{c.jobs} offres actives · Moy. {c.avg}</p>
                </div>
                <ChevronRight size={14} color="#4b5563" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
