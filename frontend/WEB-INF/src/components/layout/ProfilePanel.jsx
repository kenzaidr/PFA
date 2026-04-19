import React from 'react';
import { ChevronRight, LogOut } from 'lucide-react';

export const ProfilePanel = ({ onClose, onSettings }) => (
  <div style={{ position: 'absolute', right: 0, top: 48, width: 300, zIndex: 100 }} className="notif-panel">
    <div style={{ padding: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>YA</div>
        <div>
          <p style={{ fontWeight: 800, fontSize: 15, color: 'white' }}>Youssef Amrani</p>
          <p style={{ fontSize: 12, color: '#6b7280' }}>youssef.amrani@esisa.ac.ma</p>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <span style={{ padding: '2px 8px', borderRadius: 5, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)', fontSize: 10, fontWeight: 700, color: '#34d399' }}>Étudiant</span>
            <span style={{ padding: '2px 8px', borderRadius: 5, background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.2)', fontSize: 10, fontWeight: 700, color: '#fbbf24' }}>Score 87</span>
          </div>
        </div>
      </div>
    </div>
    <div style={{ padding: 12 }}>
      {[
        { icon: '📊', label: 'Mon profil public', action: null },
        { icon: '🧬', label: 'Skill DNA', action: null },
        { icon: '🏆', label: 'Mes badges (3)', action: null },
        { icon: '⚙️', label: 'Paramètres', action: () => { onSettings(); onClose(); } },
      ].map(({ icon, label, action }, i) => (
        <div key={i} onClick={action} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#d1d5db' }}>{label}</span>
          <ChevronRight size={12} color="#4b5563" style={{ marginLeft: 'auto' }} />
        </div>
      ))}
    </div>
    <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,113,133,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <LogOut size={15} color="#fb7185" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#fb7185' }}>Déconnexion</span>
      </div>
    </div>
  </div>
);
