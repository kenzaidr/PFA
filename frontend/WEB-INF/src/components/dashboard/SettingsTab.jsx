import React, { useState } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';
import { PageHeader as PH } from '../layout/PageHeader.jsx';

export const SettingsTab = ({ t, lang, theme, toggleTheme, toggleLang }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Youssef', lastName: 'Amrani',
    email: 'youssef.amrani@esisa.ac.ma',
    phone: '+212 6 12 34 56 78',
    school: 'ESISA Fès', level: 'Bac+4 — Ingénierie Logicielle',
    bio: 'Passionné de développement web full-stack et de technologies cloud. Je cherche à rejoindre une équipe dynamique pour mon stage de fin d\'études.',
    linkedin: 'linkedin.com/in/youssef-amrani',
    github: 'github.com/youssef-amrani',
    portfolio: 'youssef.dev',
  });
  const [form, setForm] = useState({ ...profile });
  const [notifs, setNotifs] = useState({ newJobs: true, interviews: true, badges: true, weeklyReport: false, marketing: false });
  const [privacy, setPrivacy] = useState({ profilePublic: true, showSkills: true, showActivity: false });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'security', label: 'Sécurité', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'preferences', label: 'Préférences', icon: '⚙️' },
  ];

  const inputStyle = (disabled) => ({
    width: '100%', padding: '11px 14px', borderRadius: 10,
    background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${disabled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.12)'}`,
    color: disabled ? '#6b7280' : 'white', fontSize: 14, outline: 'none',
    transition: 'all 0.2s', boxSizing: 'border-box',
  });

  const labelStyle = { fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' };

  const Toggle = ({ on, onChange }) => (
    <div onClick={onChange} style={{ width: 44, height: 24, borderRadius: 99, background: on ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
    </div>
  );

  const saveProfile = () => { setProfile({ ...form }); setEditing(false); };

  return (
    <>
      <PH badge="⚙️ Paramètres" title="Paramètres du compte" sub="Gérez votre profil, sécurité et préférences" />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Tab sidebar */}
        <div className="card" style={{ padding: 12, height: 'fit-content' }}>
          {tabs.map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
              borderRadius: 10, cursor: 'pointer', marginBottom: 4, transition: 'all 0.2s',
              background: activeTab === tab.id ? 'rgba(99,102,241,0.15)' : 'transparent',
              border: `1px solid ${activeTab === tab.id ? 'rgba(99,102,241,0.3)' : 'transparent'}`,
            }}>
              <span style={{ fontSize: 16 }}>{tab.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: activeTab === tab.id ? '#c7d2fe' : '#9ca3af' }}>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 28, boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>YA</div>
                    {editing && (
                      <div style={{ position: 'absolute', bottom: -4, right: -4, width: 26, height: 26, borderRadius: '50%', background: 'rgba(99,102,241,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #070711' }}>
                        <Sparkles size={12} color="white" />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 900, fontSize: 20, color: 'white', marginBottom: 4 }}>{profile.firstName} {profile.lastName}</h3>
                    <p style={{ fontSize: 13, color: '#6b7280' }}>{profile.school} · {profile.level}</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)', fontSize: 11, fontWeight: 700, color: '#34d399' }}>✓ Profil vérifié</span>
                      <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.2)', fontSize: 11, fontWeight: 700, color: '#fbbf24' }}>⚡ Score 87/100</span>
                    </div>
                  </div>
                  <button onClick={() => editing ? saveProfile() : setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 12, background: editing ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: editing ? '0 0 20px rgba(16,185,129,0.3)' : '0 0 20px rgba(99,102,241,0.3)' }}>
                    {editing ? <><CheckCircle size={15} /> Sauvegarder</> : <><Sparkles size={15} /> Modifier le profil</>}
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Prénom</label>
                    <input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} disabled={!editing} style={inputStyle(!editing)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nom</label>
                    <input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} disabled={!editing} style={inputStyle(!editing)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} disabled={!editing} style={inputStyle(!editing)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} disabled={!editing} style={inputStyle(!editing)} />
                  </div>
                  <div>
                    <label style={labelStyle}>École</label>
                    <input value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} disabled={!editing} style={inputStyle(!editing)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Niveau</label>
                    <input value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} disabled={!editing} style={inputStyle(!editing)} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Bio</label>
                    <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} disabled={!editing} rows={3} style={{ ...inputStyle(!editing), resize: 'none', fontFamily: 'Inter,sans-serif', lineHeight: 1.5 }} />
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 20 }}>🔗 Liens & Portfolio</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { key: 'linkedin', label: 'LinkedIn', prefix: 'linkedin.com/in/', icon: '💼' },
                    { key: 'github', label: 'GitHub', prefix: 'github.com/', icon: '🐙' },
                    { key: 'portfolio', label: 'Portfolio', prefix: 'https://', icon: '🌐' },
                  ].map(({ key, label, prefix, icon }) => (
                    <div key={key}>
                      <label style={labelStyle}>{icon} {label}</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)', borderRadius: 10, border: `1px solid ${editing ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`, overflow: 'hidden' }}>
                        <span style={{ padding: '11px 12px', fontSize: 13, color: '#4b5563', borderRight: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap', flexShrink: 0 }}>{prefix}</span>
                        <input value={form[key].replace(prefix, '')} onChange={e => setForm(f => ({ ...f, [key]: prefix + e.target.value }))} disabled={!editing} style={{ flex: 1, padding: '11px 12px', background: 'none', border: 'none', color: editing ? 'white' : '#6b7280', fontSize: 14, outline: 'none' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 6 }}>🔑 Changer le mot de passe</h3>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 24 }}>Utilisez un mot de passe fort d'au moins 8 caractères</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
                  {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau mot de passe'].map(lbl => (
                    <div key={lbl}>
                      <label style={labelStyle}>{lbl}</label>
                      <input type="password" placeholder="••••••••" style={inputStyle(false)} />
                    </div>
                  ))}
                  <button style={{ alignSelf: 'flex-start', padding: '11px 22px', borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 4 }}>Mettre à jour</button>
                </div>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 6 }}>📱 Authentification 2 facteurs</h3>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 20 }}>Renforcez la sécurité de votre compte</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: 'white' }}>Authentification via SMS</p>
                    <p style={{ fontSize: 12, color: '#4b5563', marginTop: 2 }}>+212 6 12 34 56 78</p>
                  </div>
                  <span style={{ padding: '4px 12px', borderRadius: 8, background: 'rgba(251,113,133,0.15)', border: '1px solid rgba(251,113,133,0.25)', fontSize: 12, fontWeight: 700, color: '#fb7185' }}>Désactivé</span>
                </div>
                <button style={{ marginTop: 14, padding: '10px 18px', borderRadius: 10, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Activer la 2FA →</button>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 20 }}>🖥️ Sessions actives</h3>
                {[
                  { device: 'Chrome sur Windows 11', location: 'Fès, Maroc', current: true, time: 'Maintenant' },
                  { device: 'Safari sur iPhone 15', location: 'Casablanca, Maroc', current: false, time: 'Il y a 2h' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.current ? '💻' : '📱'}</div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 13, color: 'white' }}>{s.device}</p>
                        <p style={{ fontSize: 11, color: '#6b7280' }}>{s.location} · {s.time}</p>
                      </div>
                    </div>
                    {s.current ? <span style={{ fontSize: 11, color: '#34d399', fontWeight: 700, padding: '3px 10px', borderRadius: 6, background: 'rgba(52,211,153,0.1)' }}>Session actuelle</span> : <button style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)', color: '#fb7185', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Déconnecter</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 6 }}>🔔 Notifications par email</h3>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 24 }}>Choisissez les alertes que vous souhaitez recevoir</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { key: 'newJobs', title: 'Nouvelles offres matchées', sub: 'Chaque fois qu\'une offre correspond à votre profil' },
                    { key: 'interviews', title: 'Entretiens simulés', sub: 'Rappels et résultats d\'entretiens' },
                    { key: 'badges', title: 'Badges & Achievements', sub: 'Quand vous débloquez un nouveau badge' },
                    { key: 'weeklyReport', title: 'Rapport hebdomadaire', sub: 'Résumé de votre activité chaque lundi' },
                    { key: 'marketing', title: 'Communications marketing', sub: 'Nouveautés et offres spéciales SKILLMAP' },
                  ].map(({ key, title, sub }, i, arr) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14, color: 'white', marginBottom: 3 }}>{title}</p>
                        <p style={{ fontSize: 12, color: '#6b7280' }}>{sub}</p>
                      </div>
                      <Toggle on={notifs[key]} onChange={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 20 }}>🔕 Ne pas déranger</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 24 }}>🌙</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: 'white' }}>Mode silencieux</p>
                    <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Désactiver toutes les notifications de 22h à 8h</p>
                  </div>
                  <Toggle on={false} onChange={() => {}} />
                </div>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 6 }}>🎨 Apparence</h3>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 24 }}>Personnalisez l'interface selon vos préférences</p>
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                  {['Sombre', 'Clair'].map((mode, i) => (
                    <div key={mode} onClick={i === 1 && theme === 'dark' ? toggleTheme : i === 0 && theme === 'light' ? toggleTheme : null} style={{ flex: 1, padding: '20px', borderRadius: 16, border: `2px solid ${(i === 0 && theme === 'dark') || (i === 1 && theme === 'light') ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.07)'}`, background: (i === 0 && theme === 'dark') || (i === 1 && theme === 'light') ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{i === 0 ? '🌙' : '☀️'}</div>
                      <p style={{ fontWeight: 700, fontSize: 13, color: (i === 0 && theme === 'dark') || (i === 1 && theme === 'light') ? '#a5b4fc' : '#6b7280' }}>{mode}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 6 }}>🌐 Langue</h3>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 20 }}>Choisissez la langue de l'interface</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[{ code: 'fr', label: 'Français', flag: '🇫🇷' }, { code: 'en', label: 'English', flag: '🇬🇧' }].map(({ code, label, flag }) => (
                    <div key={code} onClick={lang !== code ? toggleLang : null} style={{ flex: 1, padding: '16px', borderRadius: 14, border: `2px solid ${lang === code ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.07)'}`, background: lang === code ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                      <span style={{ fontSize: 24 }}>{flag}</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: lang === code ? '#a5b4fc' : '#6b7280' }}>{label}</span>
                      {lang === code && <CheckCircle size={16} color="#818cf8" style={{ marginLeft: 'auto' }} />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: 'white', marginBottom: 20 }}>🔒 Confidentialité</h3>
                {[
                  { key: 'profilePublic', title: 'Profil public', sub: 'Les recruteurs peuvent voir votre profil' },
                  { key: 'showSkills', title: 'Afficher mes compétences', sub: 'Visible sur votre page publique' },
                  { key: 'showActivity', title: 'Afficher mon activité', sub: 'Historique visible par les autres étudiants' },
                ].map(({ key, title, sub }, i, arr) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: 'white', marginBottom: 3 }}>{title}</p>
                      <p style={{ fontSize: 12, color: '#6b7280' }}>{sub}</p>
                    </div>
                    <Toggle on={privacy[key]} onChange={() => setPrivacy(p => ({ ...p, [key]: !p[key] }))} />
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 28, border: '1px solid rgba(251,113,133,0.2)', background: 'rgba(251,113,133,0.03)' }}>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: '#fb7185', marginBottom: 6 }}>⚠️ Zone de danger</h3>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 20 }}>Ces actions sont irréversibles. Procédez avec précaution.</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{ padding: '10px 18px', borderRadius: 10, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Exporter mes données</button>
                  <button style={{ padding: '10px 18px', borderRadius: 10, background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)', color: '#fb7185', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Supprimer le compte</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
