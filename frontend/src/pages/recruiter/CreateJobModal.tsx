import { X, Sparkles } from 'lucide-react';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateJobModal({ isOpen, onClose }: CreateJobModalProps) {
  if (!isOpen) return null;

  return (
    <div className="dashboard-sidebar-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <div 
        className="dashboard-panel" 
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          height: '100%', 
          borderRadius: '0', 
          animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="panel-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="panel-title" style={{ fontSize: '1.25rem' }}>Create New Job Offer</h3>
          <button className="dashboard-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="dashboard-content-scroll" style={{ flex: 1, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Job Title</label>
            <input type="text" className="dashboard-search-input" placeholder="e.g. Senior Frontend Engineer" style={{ width: '100%', borderRadius: '0.5rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Employment Type</label>
              <select className="dashboard-search-input" style={{ width: '100%', borderRadius: '0.5rem' }}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Location</label>
              <select className="dashboard-search-input" style={{ width: '100%', borderRadius: '0.5rem' }}>
                <option>Casablanca, Morocco</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Job Description</label>
              <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                <Sparkles size={12} /> Auto-Generate with AI
              </button>
            </div>
            <textarea className="dashboard-search-input" rows={6} placeholder="Describe the responsibilities and requirements..." style={{ width: '100%', borderRadius: '0.5rem', resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Target Skills (comma separated)</label>
            <input type="text" className="dashboard-search-input" placeholder="React, Node.js, TypeScript" style={{ width: '100%', borderRadius: '0.5rem' }} />
          </div>

        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'var(--bg-primary)' }}>
          <button className="btn-secondary" onClick={onClose}>Save as Draft</button>
          <button className="btn-primary" onClick={onClose}>Publish Job</button>
        </div>
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        [data-theme="dark"] .dashboard-sidebar-overlay .dashboard-panel {
          background-color: #0F172A;
          border-left: 1px solid #1E293B;
        }
      `}</style>
    </div>
  );
}
