import { Upload, Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your company profile and preferences.</p>
        </div>
        <button className="btn-primary">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="dashboard-panel" style={{ maxWidth: '800px' }}>
        <div className="panel-header">
          <h3 className="panel-title">Company Profile</h3>
        </div>
        
        <div style={{ padding: '2rem 1.5rem' }}>
          {/* Logo Upload */}
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '1rem', border: '1px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', color: '#94A3B8', cursor: 'pointer' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={24} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Upload</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', color: '#0F172A' }}>Company Logo</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748B' }}>
                Update your company logo. Recommended size is 256x256px.
                Max file size is 2MB.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Company Name</label>
                <input type="text" className="dashboard-search-input" defaultValue="TechCorp Inc." style={{ width: '100%', borderRadius: '0.5rem' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Website</label>
                <input type="url" className="dashboard-search-input" defaultValue="https://techcorp.com" style={{ width: '100%', borderRadius: '0.5rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Industry</label>
              <select className="dashboard-search-input" style={{ width: '100%', borderRadius: '0.5rem' }}>
                <option>Information Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Consulting</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Company Description</label>
              <textarea 
                className="dashboard-search-input" 
                rows={4} 
                style={{ width: '100%', borderRadius: '0.5rem', resize: 'vertical' }}
                defaultValue="TechCorp is a leading provider of enterprise software solutions, specializing in AI and cloud infrastructure."
              />
            </div>
          </div>
        </div>

        <div className="panel-header" style={{ borderTop: '1px solid #F1F5F9' }}>
          <h3 className="panel-title">Notifications</h3>
        </div>
        <div style={{ padding: '2rem 1.5rem', display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem', accentColor: '#2563EB' }} />
            <div>
              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.875rem' }}>New Applications</div>
              <div style={{ color: '#64748B', fontSize: '0.8125rem' }}>Receive an email when a student applies to your job.</div>
            </div>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem', accentColor: '#2563EB' }} />
            <div>
              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.875rem' }}>Interview Reminders</div>
              <div style={{ color: '#64748B', fontSize: '0.8125rem' }}>Receive a reminder 24 hours before a scheduled interview.</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
