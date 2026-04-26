import React from 'react';

export const PageHeader = ({ badge, title, sub }) => (
  <div style={{ marginBottom: 28 }}>
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:99, background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.2)', color:'#a5b4fc', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:12 }}>{badge}</span>
    <h2 style={{ fontSize:28, fontWeight:900, color:'white', letterSpacing:-1, marginBottom:4 }}>{title}</h2>
    {sub && <p style={{ fontSize:13, color:'#6b7280' }}>{sub}</p>}
  </div>
);
