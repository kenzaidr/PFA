import React from 'react';
import { Bot, Send } from 'lucide-react';
import { PageHeader as PH } from '../layout/PageHeader.jsx';

export const CoachTab = ({ t, messages, chatInput, setChatInput, sendMsg, chatEndRef }) => {
  const prompts = ['Analyse mon profil complet','Roadmap System Design complet','Comment négocier mon salaire ?','Simule un entretien React Senior','Quelles certifications prioriser ?','Top 5 erreurs en entretien tech'];
  return (
    <>
      <PH badge="🤖 AI Coach" title="Coach IA Personnel" sub="Conseils ultra-personnalisés basés sur ton Skill DNA et le marché marocain" />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:16 }}>
        <div className="card" style={{ padding:24, display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, paddingBottom:16, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width:42, height:42, borderRadius:12, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center' }}><Bot size={20} color="white" /></div>
            <div>
              <p style={{ fontWeight:800, fontSize:15, color:'white' }}>SKILLMAP Coach</p>
              <p style={{ fontSize:11, color:'#6b7280' }}>IA spécialisée marché tech marocain</p>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#34d399', fontWeight:700 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#34d399', animation:'pulse2 2s infinite', display:'inline-block' }} />Online
            </div>
          </div>
          <div style={{ flex:1, minHeight:380, overflowY:'auto', display:'flex', flexDirection:'column', gap:14, marginBottom:16, paddingRight:4 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start', animation:'fadeSlide 0.3s ease' }}>
                {msg.role==='ai' && <div style={{ width:30, height:30, borderRadius:9, background:'rgba(99,102,241,0.2)', display:'flex', alignItems:'center', justifyContent:'center', marginRight:10, flexShrink:0, alignSelf:'flex-end' }}><Bot size={14} color="#818cf8" /></div>}
                <div className={msg.role==='ai'?'ai-bubble':'user-bubble'} style={{ maxWidth:'75%', padding:'12px 16px', fontSize:13, lineHeight:1.6, color:msg.role==='ai'?'#d1d5db':'white' }}>{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder={t.coachPlaceholder} style={{ flex:1, padding:'13px 16px', borderRadius:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'white', fontSize:14, outline:'none' }} />
            <button onClick={sendMsg} style={{ padding:'13px 18px', borderRadius:12, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontWeight:700, fontSize:13, boxShadow:'0 0 20px rgba(99,102,241,0.3)' }}><Send size={15} /> Envoyer</button>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontWeight:800, fontSize:14, color:'white', marginBottom:12 }}>💡 Questions suggérées</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {prompts.map(p => (
                <button key={p} onClick={() => setChatInput(p)} style={{ textAlign:'left', padding:'10px 12px', borderRadius:10, background:'rgba(99,102,241,0.06)', border:'1px solid rgba(99,102,241,0.15)', color:'#c7d2fe', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.2s', lineHeight:1.3 }}>{p}</button>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontWeight:800, fontSize:14, color:'white', marginBottom:12 }}>📊 Ton coaching</h3>
            {[{label:'Sessions ce mois',val:'12'},{label:'Score moyen entretiens',val:'87/100'},{label:'Temps passé',val:'4h 30min'},{label:'Skills améliorés',val:'3'}].map((item,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:i<3?'1px solid rgba(255,255,255,0.04)':'none' }}>
                <span style={{ fontSize:12, color:'#6b7280' }}>{item.label}</span>
                <span style={{ fontSize:12, fontWeight:700, color:'white' }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
