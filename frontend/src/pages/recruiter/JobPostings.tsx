import { 
  Plus,
  MoreVertical,
  Eye,
  Users,
  Clock,
  MapPin,
  Building
} from 'lucide-react';
import { useState } from 'react';
import CreateJobModal from './CreateJobModal';

const jobs = [
  { id: 1, title: 'Full Stack Engineer', type: 'Full-time', location: 'Casablanca, Morocco', applicants: 24, views: 145, status: 'Active', posted: '2 days ago' },
  { id: 2, title: 'Data Scientist Intern', type: 'Internship', location: 'Remote', applicants: 45, views: 320, status: 'Active', posted: '1 week ago' },
  { id: 3, title: 'DevOps Engineer', type: 'Full-time', location: 'Rabat, Morocco', applicants: 8, views: 56, status: 'Active', posted: '3 days ago' },
  { id: 4, title: 'Frontend Intern', type: 'Internship', location: 'Casablanca, Morocco', applicants: 112, views: 450, status: 'Closed', posted: '2 months ago' },
  { id: 5, title: 'Backend Developer', type: 'Full-time', location: 'Hybrid', applicants: 0, views: 0, status: 'Draft', posted: '-' },
];

export default function JobPostings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Job Postings</h1>
          <p className="page-subtitle">Manage your active listings and drafts.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create New Job
        </button>
      </div>

      <div className="dashboard-panel">
        <div className="panel-header" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ color: '#0F172A' }}>All Jobs (5)</button>
            <button className="btn-secondary" style={{ color: '#64748B' }}>Active (3)</button>
            <button className="btn-secondary" style={{ color: '#64748B' }}>Drafts (1)</button>
            <button className="btn-secondary" style={{ color: '#64748B' }}>Closed (1)</button>
          </div>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Status</th>
              <th>Metrics</th>
              <th>Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.title}</span>
                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: '#64748B' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Building size={12}/> {job.type}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12}/> {job.location}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${job.status.toLowerCase() === 'active' ? 'new' : job.status.toLowerCase() === 'closed' ? 'rejected' : 'reviewing'}`}>
                    {job.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '1rem', color: '#64748B', fontSize: '0.8125rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} title="Views">
                      <Eye size={14} /> {job.views}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} title="Applicants">
                      <Users size={14} /> {job.applicants}
                    </span>
                  </div>
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#64748B', fontSize: '0.8125rem' }}>
                    <Clock size={14} />
                    {job.posted}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="dashboard-icon-btn">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
