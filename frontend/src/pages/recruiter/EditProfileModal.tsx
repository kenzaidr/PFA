import { X, Camera } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="dashboard-sidebar-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="dashboard-panel" style={{ width: '100%', maxWidth: '450px', margin: '1rem', animation: 'scaleIn 0.2s ease-out' }}>
        <div className="panel-header">
          <h3 className="panel-title">Edit Profile</h3>
          <button className="dashboard-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
                T
              </div>
              <button 
                style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#475569' }}
                aria-label="Change avatar"
              >
                <Camera size={14} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Full Name</label>
            <input type="text" className="dashboard-search-input" defaultValue="TechCorp Recruiter" style={{ width: '100%', borderRadius: '0.5rem' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email Address</label>
            <input type="email" className="dashboard-search-input" defaultValue="recruiting@techcorp.com" style={{ width: '100%', borderRadius: '0.5rem' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Role</label>
            <input type="text" className="dashboard-search-input" defaultValue="Senior Talent Acquisition" style={{ width: '100%', borderRadius: '0.5rem' }} />
          </div>

        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: 'var(--bg-primary)' }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onClose}>Save Profile</button>
        </div>
      </div>
    </div>
  );
}
