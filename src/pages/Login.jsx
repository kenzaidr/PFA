import { useState } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

const ROLES = [
  {
    id: 'student',
    label: 'Étudiant / Alumni',
    sub: 'Je cherche un poste tech',
    icon: '🎓',
    grad: 'from-blue-700 to-blue-600',
    accent: 'cyan',
    dest: 'student-login',
  },
  {
    id: 'recruiter',
    label: 'Recruteur',
    sub: 'Je cherche des talents qualifiés',
    icon: '🏢',
    grad: 'from-blue-700 to-blue-600',
    accent: 'cyan',
    dest: 'recruiter-login',
  },
  {
    id: 'school',
    label: 'École / Pôle',
    sub: 'Suivi des cohortes & employabilité',
    icon: '🏫',
    grad: 'from-emerald-500 to-teal-600',
    accent: 'emerald',
    dest: 'school-login',
  },
];

export default function Login() {
  const { navigate } = useRouter();
  const [selectedRole, setSelectedRole] = useState('student');

  const role = ROLES.find((r) => r.id === selectedRole);

  const handleContinue = () => {
    navigate(role.dest);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid-bg flex items-center justify-center px-5 py-16 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-800/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-[480px]">
        <button onClick={() => navigate('home')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 cursor-pointer group text-sm">
          <Icons.ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </button>

        <div className="glass gradient-border rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="p-8 bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/[0.06]">
            <div className="flex items-center gap-2 mb-6">
              <Icons.Logo className="w-7 h-7" />
              <span className="text-base font-bold text-white tracking-tight">
                Skill<span className="text-blue-400">Map</span>
              </span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight mb-1">Qui es-tu ? ✨</h1>
            <p className="text-slate-400 text-sm">Sélectionne ton profil pour accéder à ton espace de connexion.</p>
          </div>

          <div className="p-8">
            {/* Role Selection Cards */}
            <div className="space-y-3 mb-6">
              {ROLES.map((r) => (
                <button key={r.id} type="button" onClick={() => setSelectedRole(r.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedRole === r.id
                      ? `border-${r.accent}-500/50 bg-${r.accent}-500/8`
                      : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.grad} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                    {r.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-bold text-white">{r.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{r.sub}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${selectedRole === r.id ? `border-${r.accent}-400 bg-${r.accent}-500/40` : 'border-white/20'}`} />
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <button onClick={handleContinue}
              className={`btn-primary w-full py-3.5 rounded-2xl text-sm font-semibold text-white cursor-pointer flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-blue-800 to-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all`}>
              <Icons.Spark className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Continuer vers la connexion</span>
            </button>

            <p className="text-center text-xs text-slate-500">
              Tu peux changer de profil à tout moment.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Pas encore de compte ?{' '}
          <button onClick={() => navigate('register')}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
            S'inscrire gratuitement
          </button>
        </p>
      </div>
    </div>
  );
}


