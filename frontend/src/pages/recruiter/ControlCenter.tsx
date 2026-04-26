import { useState } from 'react';
import { X, SlidersHorizontal, Zap, Bookmark, Bell, Settings as SettingsIcon, PanelRightClose } from 'lucide-react';

export default function ControlCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [autoProgress, setAutoProgress] = useState(false);

  return (
    <>
      {/* Floating Toggle Button (Visible when closed) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRight: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '1.5rem 0 0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#1E40AF',
            fontWeight: 700,
            fontSize: '0.8125rem',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            zIndex: 40,
            letterSpacing: '0.05em'
          }}
        >
          <PanelRightClose size={18} /> CONTROLS
        </button>
      )}

      {/* Control Center Panel */}
      <div 
        style={{
          position: 'fixed',
          top: '1rem',
          bottom: '1rem',
          right: isOpen ? '1rem' : '-450px',
          width: '380px',
          background: 'linear-gradient(to bottom, rgba(241, 245, 249, 0.95), rgba(226, 232, 240, 0.95))',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)',
          transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255,255,255,0.6)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E3A8A', margin: 0, letterSpacing: '0.05em' }}>
            CONTROL CENTER
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ 
              width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', 
              border: 'none', color: '#3B82F6', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
            }}
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="dashboard-content-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Dashboard Preferences */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '1.25rem', padding: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6', marginBottom: '1rem', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <SlidersHorizontal size={16} /> DASHBOARD PREFERENCES
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Focus Mode */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', border: '1px solid #EFF6FF', borderRadius: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E3A8A' }}>Focus mode</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Prioritize key tasks and deadlines</div>
                </div>
                <button 
                  onClick={() => setFocusMode(!focusMode)}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: focusMode ? '#2563EB' : '#CBD5E1', border: 'none', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ position: 'absolute', top: '2px', left: focusMode ? '22px' : '2px', width: '20px', height: '20px', backgroundColor: '#FFFFFF', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </button>
              </div>

              {/* AI Alerts */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', border: '1px solid #EFF6FF', borderRadius: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E3A8A' }}>AI alert nudges</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Get smart reminders for opportunities</div>
                </div>
                <button 
                  onClick={() => setAiAlerts(!aiAlerts)}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: aiAlerts ? '#2563EB' : '#CBD5E1', border: 'none', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ position: 'absolute', top: '2px', left: aiAlerts ? '22px' : '2px', width: '20px', height: '20px', backgroundColor: '#FFFFFF', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </button>
              </div>

              {/* Auto Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', border: '1px solid #EFF6FF', borderRadius: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E3A8A' }}>Auto progress tracker</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>Track profile improvements automatically</div>
                </div>
                <button 
                  onClick={() => setAutoProgress(!autoProgress)}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: autoProgress ? '#2563EB' : '#CBD5E1', border: 'none', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  <div style={{ position: 'absolute', top: '2px', left: autoProgress ? '22px' : '2px', width: '20px', height: '20px', backgroundColor: '#FFFFFF', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '1.25rem', padding: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6', marginBottom: '1rem', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <Zap size={16} /> QUICK ACTIONS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button style={{ width: '100%', padding: '0.875rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #DBEAFE', borderRadius: '0.75rem', color: '#1D4ED8', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Bookmark size={16} /> SAVE WEEKLY PLAN
              </button>
              <button style={{ width: '100%', padding: '0.875rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #DBEAFE', borderRadius: '0.75rem', color: '#1D4ED8', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Bell size={16} /> CONFIGURE ALERTS
              </button>
              <button style={{ width: '100%', padding: '0.875rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #DBEAFE', borderRadius: '0.75rem', color: '#1D4ED8', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <SettingsIcon size={16} /> PROFILE PREFERENCES
              </button>
            </div>
          </div>

          {/* Momentum Score */}
          <div style={{ background: 'linear-gradient(135deg, #CFD8E5, #DFE6D5)', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              MOMENTUM SCORE
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1E3A8A', lineHeight: 1, marginBottom: '0.5rem' }}>
              92 <span style={{ fontSize: '1.5rem', color: '#334155' }}>/ 100</span>
            </div>
            <div style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.4 }}>
              Top 8% among active students this week
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
