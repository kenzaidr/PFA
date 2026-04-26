import { MoreHorizontal, Plus, GripVertical } from 'lucide-react';

const columns = [
  {
    id: 'new',
    title: 'New Applications',
    color: '#3B82F6', // Blue
    items: [
      { id: 1, name: 'Karim Alaoui', role: 'Full Stack Engineer', school: 'ESISA', date: '2h ago' },
      { id: 2, name: 'Nadia Idrissi', role: 'Frontend Intern', school: 'ESISA', date: '1d ago' },
    ]
  },
  {
    id: 'screen',
    title: 'Phone Screen',
    color: '#EAB308', // Yellow
    items: [
      { id: 3, name: 'Youssef Filali', role: 'Backend Developer', school: 'ESISA Alumni', date: '3d ago' }
    ]
  },
  {
    id: 'interview',
    title: 'Technical Interview',
    color: '#A855F7', // Purple
    items: [
      { id: 4, name: 'Omar Tazi', role: 'DevOps Engineer', school: 'ESISA Alumni', date: '4d ago' },
      { id: 5, name: 'Sara Bennani', role: 'Data Scientist Intern', school: 'ESISA', date: '1w ago' }
    ]
  },
  {
    id: 'offer',
    title: 'Offer Extended',
    color: '#22C55E', // Green
    items: [
      { id: 6, name: 'Amine Benjelloun', role: 'Mobile Developer', school: 'ESISA Alumni', date: '2w ago' }
    ]
  }
];

export default function Pipeline() {
  return (
    <div className="dashboard-page" style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Candidate Pipeline</h1>
          <p className="page-subtitle">Drag and drop candidates to update their status.</p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', alignItems: 'flex-start' }}>
        {columns.map(column => (
          <div key={column.id} style={{ minWidth: '300px', width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
            
            {/* Column Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: column.color }} />
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  {column.title}
                </h3>
                <span style={{ backgroundColor: 'var(--bg-primary)', padding: '0.125rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#64748B', border: '1px solid var(--border-color)' }}>
                  {column.items.length}
                </span>
              </div>
              <button className="dashboard-icon-btn"><MoreHorizontal size={16} /></button>
            </div>

            {/* Column Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {column.items.map(item => (
                <div key={item.id} style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', cursor: 'grab', position: 'relative' }}>
                  <GripVertical size={16} color="#CBD5E1" style={{ position: 'absolute', right: '0.5rem', top: '1rem' }} />
                  
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>{item.name}</h4>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '0.75rem' }}>{item.role}</div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
                    <span>{item.school}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
              
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.5rem', border: '1px dashed var(--border-color)', backgroundColor: 'transparent', color: '#64748B', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, justifyContent: 'center' }}>
                <Plus size={16} /> Add Candidate
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
