import { 
  Search,
  Filter,
  Download,
  MoreVertical,
  CheckCircle,
  XCircle,
  Calendar as CalendarIcon
} from 'lucide-react';

const candidates = [
  { id: 1, name: 'Karim Alaoui', school: 'ESISA (5ème année)', role: 'Full Stack Engineer', match: 95, status: 'New', date: 'Oct 24, 2026' },
  { id: 2, name: 'Sara Bennani', school: 'ESISA (4ème année)', role: 'Data Scientist Intern', match: 88, status: 'Reviewing', date: 'Oct 23, 2026' },
  { id: 3, name: 'Omar Tazi', school: 'ESISA (Alumni)', role: 'DevOps Engineer', match: 92, status: 'Interview', date: 'Oct 21, 2026' },
  { id: 4, name: 'Nadia Idrissi', school: 'ESISA (3ème année)', role: 'Frontend Intern', match: 75, status: 'New', date: 'Oct 20, 2026' },
  { id: 5, name: 'Youssef Filali', school: 'ESISA (5ème année)', role: 'Backend Developer', match: 82, status: 'Rejected', date: 'Oct 18, 2026' },
  { id: 6, name: 'Amine Benjelloun', school: 'ESISA (Alumni)', role: 'Mobile Developer', match: 98, status: 'Hired', date: 'Oct 15, 2026' },
];

export default function Candidates() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Candidates</h1>
          <p className="page-subtitle">Review and manage your talent pipeline.</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}>
            <Filter size={16} />
            Filters
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}>
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="dashboard-panel">
        <div className="panel-header" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div className="dashboard-search" style={{ flex: 1, maxWidth: '400px' }}>
            <Search size={16} className="dashboard-search-icon" />
            <input 
              type="text" 
              placeholder="Search candidates by name, role, or school..." 
              className="dashboard-search-input" 
              style={{ width: '100%' }}
            />
          </div>
          <select className="dashboard-search-input" style={{ width: 'auto', paddingLeft: '1rem' }}>
            <option>All Statuses</option>
            <option>New</option>
            <option>Reviewing</option>
            <option>Interview</option>
            <option>Hired</option>
            <option>Rejected</option>
          </select>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Applied Role</th>
              <th>Match</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((app) => (
              <tr key={app.id}>
                <td>
                  <div className="cell-candidate">
                    <div className="candidate-avatar">
                      {app.name.charAt(0)}
                    </div>
                    <div className="candidate-info">
                      <span className="candidate-name">{app.name}</span>
                      <span className="candidate-school">{app.school}</span>
                    </div>
                  </div>
                </td>
                <td>{app.role}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '60px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${app.match}%`, height: '100%', backgroundColor: app.match > 90 ? '#16A34A' : app.match > 80 ? '#2563EB' : '#EAB308' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{app.match}%</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
                <td style={{ color: '#64748B', fontSize: '0.8125rem' }}>{app.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button className="dashboard-icon-btn" title="Schedule Interview">
                      <CalendarIcon size={16} />
                    </button>
                    <button className="dashboard-icon-btn" style={{ color: '#16A34A' }} title="Accept">
                      <CheckCircle size={16} />
                    </button>
                    <button className="dashboard-icon-btn" style={{ color: '#EF4444' }} title="Reject">
                      <XCircle size={16} />
                    </button>
                    <button className="dashboard-icon-btn">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
