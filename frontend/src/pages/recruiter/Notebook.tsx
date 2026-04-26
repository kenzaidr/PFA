import { useState } from 'react';
import { 
  FileText, 
  Send, 
  Sparkles, 
  BookOpen, 
  Plus, 
  MessageSquare,
  Paperclip,
  Check
} from 'lucide-react';

export default function Notebook() {
  const [activeNote, setActiveNote] = useState('Karim Alaoui - Resume');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Recruiting AI. I have analyzed Karim Alaoui\'s resume and portfolio. What would you like to know?' },
    { role: 'user', content: 'Does he have experience with React and Node.js?' },
    { role: 'assistant', content: 'Yes, Karim has extensive experience with both. He used React for his 4th-year e-commerce project at ESISA and Node.js with Express for the backend. He also completed a 3-month internship at DevCorp where he built a full-stack dashboard using the MERN stack.' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I noticed he also mentioned GraphQL and Docker in his skills section, which aligns perfectly with your Full Stack Engineer requirements.' 
      }]);
    }, 1000);
  };

  return (
    <div className="dashboard-page" style={{ height: 'calc(100vh - 4rem)', padding: 0, display: 'flex', flexDirection: 'column' }}>
      
      {/* Split Pane Layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', height: '100%' }}>
        
        {/* Left Pane: Sources & Notes */}
        <div style={{ width: '350px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)', zIndex: 1 }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} color="#2563EB" />
              Notebook
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>Your AI recruiting assistant</p>
          </div>

          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Sources</h3>
              <button className="dashboard-icon-btn"><Plus size={16} /></button>
            </div>
            
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {['Karim Alaoui - Resume', 'Sara Bennani - Portfolio', 'TechCorp Engineer Job Spec'].map((doc, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveNote(doc)}
                  style={{ 
                    padding: '0.75rem', 
                    backgroundColor: activeNote === doc ? '#EFF6FF' : 'transparent', 
                    border: `1px solid ${activeNote === doc ? '#BFDBFE' : 'var(--border-color)'}`, 
                    borderRadius: '0.5rem', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <FileText size={16} color={activeNote === doc ? '#2563EB' : '#94A3B8'} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: activeNote === doc ? 600 : 500, color: activeNote === doc ? '#1D4ED8' : 'var(--text-primary)' }}>
                    {doc}
                  </span>
                  {activeNote === doc && <Check size={14} color="#2563EB" style={{ marginLeft: 'auto' }} />}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: '2rem 0 1rem 0' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <button className="btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.75rem', fontSize: '0.8125rem' }}>
                <Sparkles size={14} /> Generate Interview Questions
              </button>
              <button className="btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.75rem', fontSize: '0.8125rem' }}>
                <Sparkles size={14} /> Compare against Job Spec
              </button>
            </div>
          </div>
        </div>

        {/* Right Pane: Chat / Viewer */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MessageSquare size={18} color="#64748B" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Chatting about: <span style={{ color: '#2563EB' }}>{activeNote}</span></span>
          </div>
          
          <div className="dashboard-content-scroll" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={16} color="#2563EB" />
                  </div>
                )}
                <div style={{ 
                  padding: '1rem 1.25rem', 
                  backgroundColor: msg.role === 'user' ? '#2563EB' : 'var(--bg-secondary)', 
                  color: msg.role === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                  borderRadius: '1rem',
                  borderTopRightRadius: msg.role === 'user' ? 0 : '1rem',
                  borderTopLeftRadius: msg.role === 'assistant' ? 0 : '1rem',
                  fontSize: '0.9375rem',
                  lineHeight: 1.5,
                  boxShadow: msg.role === 'assistant' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                  border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button className="dashboard-icon-btn" style={{ position: 'absolute', left: '0.75rem' }}>
                <Paperclip size={18} />
              </button>
              <input 
                type="text" 
                placeholder="Ask about the candidate or document..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="dashboard-search-input"
                style={{ width: '100%', padding: '1rem 4rem 1rem 3rem', borderRadius: '1rem', fontSize: '0.9375rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              />
              <button 
                onClick={handleSend}
                className="btn-primary" 
                style={{ position: 'absolute', right: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem', minWidth: 'auto' }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
