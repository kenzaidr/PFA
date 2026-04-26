import { Construction } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#64748B' }}>
      <Construction size={48} style={{ marginBottom: '1rem', color: '#CBD5E1' }} />
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>{title}</h2>
      <p>This page is currently under construction.</p>
    </div>
  );
}
