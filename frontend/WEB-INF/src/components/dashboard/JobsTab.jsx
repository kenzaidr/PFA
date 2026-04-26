import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { JobCard } from '../ui/JobCard.jsx';
import { PageHeader as PH } from '../layout/PageHeader.jsx';

export const JobsTab = ({ t, jobs }) => {
  const [filter, setFilter] = useState('all');
  const allJobs = [
    ...jobs,
    { title:'Data Engineer', company:'ONCF Tech', match:77, location:'Casablanca', salary:'16 000 – 21 000 DH/mo', tags:['Python','Spark','Airflow'] },
    { title:'Backend Developer', company:'M2T', match:81, location:'Rabat', salary:'14 000 – 18 000 DH/mo', tags:['Node.js','PostgreSQL','Docker'] },
    { title:'DevOps Engineer', company:'Huawei MA', match:72, location:'Casablanca', salary:'22 000 – 28 000 DH/mo', tags:['K8s','Terraform','AWS'] },
    { title:'Mobile Developer', company:'InTech Solutions', match:68, location:'Fès', salary:'13 000 – 17 000 DH/mo', tags:['React Native','Expo','Firebase'] },
  ];
  const filters = [
    { id:'all', label:'Toutes' },
    { id:'top', label:'Top Match (90%+)' },
    { id:'remote', label:'Télétravail' },
    { id:'senior', label:'Senior' },
  ];
  const filtered = filter === 'top' ? allJobs.filter(j => j.match >= 90) : allJobs;
  return (
    <>
      <PH badge="💼 Offres" title="Offres pour toi" sub="Matchées à ton profil Skill DNA — mises à jour toutes les heures" />
      <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding:'8px 16px', borderRadius:10, border:`1px solid ${filter===f.id?'rgba(99,102,241,0.5)':'rgba(255,255,255,0.08)'}`, background:filter===f.id?'rgba(99,102,241,0.15)':'rgba(255,255,255,0.03)', color:filter===f.id?'#a5b4fc':'#6b7280', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>{f.label}</button>
        ))}
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
          <Search size={13} color="#6b7280" />
          <input placeholder="Rechercher un poste..." style={{ background:'none', border:'none', outline:'none', color:'#9ca3af', fontSize:13, width:180 }} />
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        {filtered.map((j, i) => <JobCard key={i} {...j} t={t} />)}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:60, color:'#4b5563' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
          <p style={{ fontWeight:700, color:'#6b7280' }}>Aucune offre pour ce filtre</p>
        </div>
      )}
    </>
  );
};
