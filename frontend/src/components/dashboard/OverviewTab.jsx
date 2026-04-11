import React from 'react';
import { Zap, Briefcase, Flame, Award, Bot, Send } from 'lucide-react';
import { RadarChart } from '../ui/RadarChart.jsx';
import { MiniBar } from '../ui/MiniBar.jsx';
import { JobCard } from '../ui/JobCard.jsx';
import { RoadStep } from '../ui/RoadStep.jsx';

export const OverviewTab = ({ t, radarData, marketData, jobs, activities, roadSteps, colorMap, messages, chatInput, setChatInput, sendMsg, chatEndRef }) => {
  const stats = [
    { label: t.statLabels[0], val: t.statVals[0], delta: t.statDeltas[0], icon: Zap,      color:'#818cf8', bg:'rgba(99,102,241,0.12)' },
    { label: t.statLabels[1], val: t.statVals[1], delta: t.statDeltas[1], icon: Briefcase, color:'#34d399', bg:'rgba(16,185,129,0.12)' },
    { label: t.statLabels[2], val: t.statVals[2], delta: t.statDeltas[2], icon: Flame,     color:'#fb923c', bg:'rgba(251,146,60,0.12)' },
    { label: t.statLabels[3], val: t.statVals[3], delta: t.statDeltas[3], icon: Award,     color:'#a78bfa', bg:'rgba(167,139,250,0.12)' },
  ];
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {stats.map(({ label, val, delta, icon: Icon, color, bg }, i) => (
          <div key={i} className="card stat-glow" style={{ padding:'20px 24px', transition:'all 0.3s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <p style={{ fontSize:12, color:'#6b7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</p>
              <div style={{ width:32, height:32, borderRadius:8, background:bg, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon size={15} color={color} /></div>
            </div>
            <p style={{ fontSize:26, fontWeight:900, color:'white', letterSpacing:-1, marginBottom:6 }}>{val}</p>
            <p style={{ fontSize:11, color:'#4ade80', fontWeight:600 }}>{delta}</p>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
        <div className="card" style={{ padding:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
            <div><h3 style={{ fontWeight:800, fontSize:16, color:'white' }}>{t.dnaTitle}</h3><p style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{t.dnaLive}</p></div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#34d399', fontWeight:700 }}><span style={{ width:6, height:6, borderRadius:'50%', background:'#34d399', animation:'pulse2 2s infinite', display:'inline-block' }} />LIVE</div>
          </div>
          <div style={{ display:'flex', gap:20, alignItems:'center' }}>
            <RadarChart data={radarData} size={180} />
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
              {radarData.map(d => (
                <div key={d.label}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:4 }}>
                    <span style={{ color:'#9ca3af', fontWeight:500 }}>{d.label.replace('\n',' ')}</span>
                    <span style={{ color:'#818cf8', fontWeight:700 }}>{d.value}%</span>
                  </div>
                  <MiniBar pct={d.value} color={d.value>=80?'#34d399':d.value>=65?'#818cf8':'#f87171'} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ padding:24 }}>
          <div style={{ marginBottom:20 }}><h3 style={{ fontWeight:800, fontSize:16, color:'white' }}>{t.marketTitle}</h3><p style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{t.marketSub}</p></div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {marketData.map((m, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:m.color, boxShadow:`0 0 8px ${m.color}`, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:13, color:'#e5e7eb', fontWeight:600 }}>{m.skill}</span>
                    <span style={{ fontSize:12, color:'#34d399', fontWeight:700 }}>{m.trend}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:11, color:'#6b7280' }}>{m.salary}</span>
                    <div style={{ height:2, width:60, borderRadius:2, background:'rgba(255,255,255,0.06)' }}>
                      <div style={{ height:'100%', borderRadius:2, background:m.color, width:`${40+i*12}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 0.7fr 0.6fr', gap:16, marginBottom:24 }}>
        <div className="card" style={{ padding:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div><h3 style={{ fontWeight:800, fontSize:16, color:'white' }}>{t.jobsTitle}</h3><p style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{t.jobsSub}</p></div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {jobs.map((j, i) => <JobCard key={i} {...j} t={t} />)}
          </div>
        </div>
        <div className="card" style={{ padding:24 }}>
          <h3 style={{ fontWeight:800, fontSize:16, color:'white', marginBottom:16 }}>{t.actTitle}</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {activities.map(({ icon: Icon, color, text, time: at }, i) => (
              <div key={i} style={{ display:'flex', gap:12, position:'relative', paddingBottom: i<activities.length-1?16:0 }}>
                {i<activities.length-1 && <div style={{ position:'absolute', left:15, top:28, bottom:0, width:1, background:'rgba(255,255,255,0.05)' }} />}
                <div style={{ width:30, height:30, borderRadius:8, background:`rgba(${colorMap[color]==='#34d399'?'52,211,153':colorMap[color]==='#fbbf24'?'251,191,36':colorMap[color]==='#818cf8'?'129,140,248':colorMap[color]==='#a78bfa'?'167,139,250':'251,113,133'},0.15)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon size={13} color={colorMap[color]} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:12, color:'#d1d5db', lineHeight:1.4 }}>{text}</p>
                  <p style={{ fontSize:10, color:'#4b5563', marginTop:3 }}>Il y a {at}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:24 }}>
          <h3 style={{ fontWeight:800, fontSize:16, color:'white' }}>{t.roadmapTitle}</h3>
          <p style={{ fontSize:11, color:'#6b7280', marginTop:2, marginBottom:12 }}>{t.roadmapSub}</p>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#6b7280', marginBottom:6 }}><span>Progression</span><span style={{ color:'#818cf8', fontWeight:700 }}>35%</span></div>
            <div style={{ height:4, borderRadius:4, background:'rgba(255,255,255,0.06)' }}><div style={{ height:'100%', borderRadius:4, width:'35%', background:'linear-gradient(90deg,#6366f1,#8b5cf6)' }} /></div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {roadSteps.map((s, i) => <RoadStep key={i} {...s} />)}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center' }}><Bot size={18} color="white" /></div>
            <div><h3 style={{ fontWeight:800, fontSize:15, color:'white' }}>{t.coachTitle}</h3><p style={{ fontSize:11, color:'#6b7280' }}>{t.coachSub}</p></div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#34d399', fontWeight:700 }}><span style={{ width:6, height:6, borderRadius:'50%', background:'#34d399', animation:'pulse2 2s infinite', display:'inline-block' }} />Online</div>
        </div>
        <div style={{ height:160, overflowY:'auto', display:'flex', flexDirection:'column', gap:12, marginBottom:12, paddingRight:4 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start' }}>
              {msg.role==='ai' && <div style={{ width:26, height:26, borderRadius:8, background:'rgba(99,102,241,0.2)', display:'flex', alignItems:'center', justifyContent:'center', marginRight:8, flexShrink:0, alignSelf:'flex-end' }}><Bot size={13} color="#818cf8" /></div>}
              <div className={msg.role==='ai'?'ai-bubble':'user-bubble'} style={{ maxWidth:'70%', padding:'9px 13px', fontSize:12, lineHeight:1.5, color:msg.role==='ai'?'#d1d5db':'white' }}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder={t.coachPlaceholder} style={{ flex:1, padding:'10px 14px', borderRadius:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'white', fontSize:13, outline:'none' }} />
          <button onClick={sendMsg} style={{ padding:'10px 14px', borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', cursor:'pointer', display:'flex', alignItems:'center' }}><Send size={15} /></button>
        </div>
      </div>
    </>
  );
};
