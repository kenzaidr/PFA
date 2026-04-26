import { 
  Plus, 
  Briefcase, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';

// Mock Data
const recentApplications = [
  { id: 1, name: 'Karim Alaoui', school: 'ESISA (5ème année)', role: 'Full Stack Engineer', status: 'New', date: '2 hours ago' },
  { id: 2, name: 'Sara Bennani', school: 'ESISA (4ème année)', role: 'Data Scientist Intern', status: 'Reviewing', date: '5 hours ago' },
  { id: 3, name: 'Omar Tazi', school: 'ESISA (Alumni)', role: 'DevOps Engineer', status: 'Interview', date: '1 day ago' },
  { id: 4, name: 'Nadia Idrissi', school: 'ESISA (3ème année)', role: 'Frontend Intern', status: 'New', date: '1 day ago' },
];

export default function RecruiterOverview() {
  return (
    <div className="overview-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, TechCorp</h1>
          <p className="page-subtitle">Here is what's happening with your job postings today.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          Post New Job
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Active Jobs</span>
            <span className="stat-value">12</span>
            <span className="stat-trend positive">
              <ArrowUpRight size={14} />
              +2 this week
            </span>
          </div>
          <div className="stat-icon blue">
            <Briefcase size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Applications</span>
            <span className="stat-value">84</span>
            <span className="stat-trend positive">
              <ArrowUpRight size={14} />
              +14% vs last month
            </span>
          </div>
          <div className="stat-icon gold">
            <Users size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Interviews Scheduled</span>
            <span className="stat-value">8</span>
            <span className="stat-trend negative">
              <ArrowDownRight size={14} />
              -2 this week
            </span>
          </div>
          <div className="stat-icon green">
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Recent Applications Panel */}
      <div className="dashboard-panel">
        <div className="panel-header">
          <h3 className="panel-title">Recent Applications</h3>
          <button className="btn-secondary">View all</button>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Applied Role</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentApplications.map((app) => (
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
                  <span className={`status-badge ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
                <td style={{ color: '#64748B', fontSize: '0.8125rem' }}>{app.date}</td>
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
    </div>
  );
}
