import { X, Sparkles, Briefcase, FileText, CheckCircle, Sliders } from 'lucide-react';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateJobModal({ isOpen, onClose }: CreateJobModalProps) {
  if (!isOpen) return null;

  return (
    <div className="dashboard-sidebar-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 100 }}>
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '520px',
          maxHeight: '90vh',
          background: 'linear-gradient(to bottom, #E8EEF8, #D1DFE8)',
          borderRadius: '1.5rem', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E3A8A', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>
            Create Job Offer
          </h3>
          <button 
            onClick={onClose}
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
        <div className="dashboard-content-scroll" style={{ flex: 1, padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          
          {/* Section: Job Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6', marginBottom: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <Sliders size={16} /> Job Preferences
            </div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '0.5rem', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              
              <div style={{ padding: '0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E3A8A', display: 'block', marginBottom: '0.25rem' }}>Job Title</label>
                <input type="text" placeholder="e.g. Senior Frontend Engineer" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.875rem', color: '#475569', backgroundColor: 'transparent' }} />
              </div>

              <div style={{ padding: '0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E3A8A', display: 'block', marginBottom: '0.25rem' }}>Employment Type</label>
                <select style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.875rem', color: '#475569', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div style={{ padding: '0.75rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E3A8A', display: 'block', marginBottom: '0.25rem' }}>Location</label>
                <select style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.875rem', color: '#475569', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <option>Casablanca, Morocco</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6', marginBottom: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <FileText size={16} /> Quick Actions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button style={{ width: '100%', padding: '0.875rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #BFDBFE', borderRadius: '0.75rem', color: '#1D4ED8', fontSize: '0.8125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Sparkles size={16} /> Auto-Generate with AI
              </button>
              
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '1rem', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                <textarea rows={4} placeholder="Describe the responsibilities and requirements..." style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.875rem', color: '#475569', backgroundColor: 'transparent', resize: 'vertical' }}></textarea>
              </div>
            </div>
          </div>

          {/* Section: Requirements */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6', marginBottom: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <CheckCircle size={16} /> Momentum / Requirements
            </div>
            <div style={{ background: 'linear-gradient(135deg, #BFDBFE, #E2E8F0)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.5)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Skills</label>
                <input type="text" placeholder="React, Node.js, TypeScript" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.125rem', fontWeight: 700, color: '#1E3A8A', backgroundColor: 'transparent' }} />
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8125rem', color: '#475569' }}>Adding specific skills boosts applicant match accuracy.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.5)' }}>
          <button style={{ flex: 1, padding: '0.875rem', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '0.75rem', color: '#475569', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }} onClick={onClose}>
            Save as Draft
          </button>
          <button style={{ flex: 1, padding: '0.875rem', backgroundColor: '#2563EB', border: 'none', borderRadius: '0.75rem', color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }} onClick={onClose}>
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );
}
