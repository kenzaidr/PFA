import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Video, 
  MessageSquare,
  CalendarCheck,
  X
} from 'lucide-react';

export default function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [integration, setIntegration] = useState('zoom'); // 'zoom', 'teams'

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Interviews & Calendar</h1>
          <p className="page-subtitle">Manage your schedule and video meetings.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Schedule Interview
        </button>
      </div>

      <div className="dashboard-panel">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3 className="panel-title" style={{ fontSize: '1.25rem' }}>October 2026</h3>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button className="dashboard-icon-btn"><ChevronLeft size={20} /></button>
              <button className="dashboard-icon-btn"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" style={{ color: '#0F172A', fontWeight: 600 }}>Month</button>
            <button className="btn-secondary" style={{ color: '#64748B' }}>Week</button>
          </div>
        </div>
        
        {/* Mock Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderTop: '1px solid var(--border-color)' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, fontSize: '0.75rem', color: '#64748B', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
              {day}
            </div>
          ))}
          {/* Days */}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} style={{ 
              minHeight: '120px', 
              padding: '0.5rem', 
              borderRight: '1px solid var(--border-color)', 
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: i < 3 || i > 33 ? '#F8FAFC' : 'transparent',
              color: i < 3 || i > 33 ? '#94A3B8' : '#0F172A'
            }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, display: 'inline-block', marginBottom: '0.5rem' }}>
                {i < 3 ? 28 + i : i > 33 ? i - 33 : i - 2}
              </span>
              
              {/* Mock Event */}
              {i === 15 && (
                <div style={{ backgroundColor: '#EFF6FF', borderLeft: '3px solid #2563EB', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', marginBottom: '0.25rem', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 600, color: '#1D4ED8' }}>10:00 AM</div>
                  <div style={{ color: '#2563EB', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Karim A. - Tech Screen</div>
                </div>
              )}
              {i === 18 && (
                <div style={{ backgroundColor: '#F3E8FF', borderLeft: '3px solid #9333EA', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', marginBottom: '0.25rem', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 600, color: '#7E22CE' }}>2:30 PM</div>
                  <div style={{ color: '#9333EA', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Sara B. - Final</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {isModalOpen && (
        <div className="dashboard-sidebar-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="dashboard-panel" style={{ width: '100%', maxWidth: '500px', margin: '1rem', animation: 'scaleIn 0.2s ease-out' }}>
            <div className="panel-header">
              <h3 className="panel-title">Schedule Interview</h3>
              <button className="dashboard-icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Candidate</label>
                <select className="dashboard-search-input" style={{ width: '100%', borderRadius: '0.5rem' }}>
                  <option>Select candidate...</option>
                  <option>Karim Alaoui - Full Stack Engineer</option>
                  <option>Sara Bennani - Data Scientist</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Date</label>
                  <input type="date" className="dashboard-search-input" style={{ width: '100%', borderRadius: '0.5rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Time</label>
                  <input type="time" className="dashboard-search-input" style={{ width: '100%', borderRadius: '0.5rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Video Integration</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    className={`btn-secondary ${integration === 'zoom' ? 'active-integration' : ''}`}
                    onClick={() => setIntegration('zoom')}
                    style={{ flex: 1, padding: '0.75rem', border: `1px solid ${integration === 'zoom' ? '#2563EB' : 'var(--border-color)'}`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: integration === 'zoom' ? '#EFF6FF' : 'transparent', color: integration === 'zoom' ? '#1D4ED8' : 'var(--text-secondary)' }}
                  >
                    <Video size={18} /> Zoom
                  </button>
                  <button 
                    className={`btn-secondary ${integration === 'teams' ? 'active-integration' : ''}`}
                    onClick={() => setIntegration('teams')}
                    style={{ flex: 1, padding: '0.75rem', border: `1px solid ${integration === 'teams' ? '#7E22CE' : 'var(--border-color)'}`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: integration === 'teams' ? '#F3E8FF' : 'transparent', color: integration === 'teams' ? '#7E22CE' : 'var(--text-secondary)' }}
                  >
                    <MessageSquare size={18} /> MS Teams
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <CalendarCheck size={20} color="#16A34A" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>Google Calendar Sync</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Event will be added to techcorp@gmail.com</div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem', accentColor: '#2563EB' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="btn-primary">Send Invitation</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        [data-theme="dark"] .dashboard-sidebar-overlay .dashboard-panel {
          background-color: #0F172A;
          border-color: #1E293B;
        }
        [data-theme="dark"] .dashboard-search-input {
          background-color: #1E293B;
          color: #F8FAFC;
          border-color: #334155;
        }
      `}</style>
    </div>
  );
}
