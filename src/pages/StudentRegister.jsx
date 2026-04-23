import { useState } from 'react';
import { Icons } from '../components/Icons';
import { useRouter } from '../router';

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const TECH_STACKS = [
  { label: 'Frontend (React, Vue, Angular)', value: 'frontend' },
  { label: 'Backend (Node, Python, Java)', value: 'backend' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'DevOps / Cloud (AWS, Docker)', value: 'devops' },
  { label: 'Data / AI / ML', value: 'data' },
  { label: 'Mobile (React Native, Flutter)', value: 'mobile' },
  { label: 'Autre', value: 'other' },
];

const CURRENT_YEARS = [
  { label: "1ère année", value: '1' },
  { label: '2ème année', value: '2' },
  { label: '3ème année (Bac+3)', value: '3' },
  { label: 'Master 1', value: 'm1' },
  { label: 'Master 2 (Sortant)', value: 'm2' },
  { label: 'Alumni (Diplômé)', value: 'alumni' },
];

export default function StudentRegister() {
  const { navigate } = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    techStack: 'frontend',
    currentYear: '3',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSSO = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('dashboard-student', { role: 'student', name: 'Alex Student', provider });
    }, 1200);
  };

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (!agreed) {
      alert('Veuillez accepter les conditions');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('dashboard-student', { role: 'student', name: form.name });
    }, 1400);
  };

  const isFormValid = form.name && form.email && form.password && form.confirmPassword && form.school && agreed;

  return (
    <div className="min-h-[calc(100vh-64px)] grid-bg flex items-center justify-center px-5 py-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-800/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-[480px]">
        {/* Back Button */}
        <button onClick={() => navigate('home')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 cursor-pointer group text-sm">
          <Icons.ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </button>

        <div className="glass gradient-border rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="p-8 bg-gradient-to-b from-blue-700/5 to-transparent border-b border-white/[0.06]">
            <div className="flex items-center gap-2 mb-6">
              <Icons.Logo className="w-7 h-7" />
              <span className="text-base font-bold text-white tracking-tight">
                Skill<span className="text-blue-400">Map</span>
              </span>
              <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-700/20 to-blue-500/20 border border-blue-700/30">
                <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  🎓 Étudiant
                </span>
              </span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight mb-1">Prêt à booster ta carrière ? 🚀</h1>
            <p className="text-slate-400 text-sm">Crée ton account et déverrouille ton Skill DNA.</p>
          </div>

          <div className="p-8 space-y-5">
            {/* SSO Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => handleSSO('google')}
                className="btn-secondary py-2.5 rounded-xl text-sm font-semibold text-slate-200 cursor-pointer flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-colors">
                <GoogleIcon className="w-4 h-4" />
                <span>Google</span>
              </button>
              <button type="button" onClick={() => handleSSO('github')}
                className="btn-secondary py-2.5 rounded-xl text-sm font-semibold text-slate-200 cursor-pointer flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-colors">
                <Icons.Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="text-xs text-slate-600 font-medium">ou par email</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Nom complet</label>
                <input type="text" value={form.name} onChange={set('name')} required
                  placeholder="Jean Dupont"
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                <input type="email" value={form.email} onChange={set('email')} required
                  placeholder="jean@email.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors" />
              </div>

              {/* School */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">École actuelle</label>
                <input type="text" value={form.school} onChange={set('school')} required
                  placeholder="ex: ESISA, ENSIAS..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors" />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Spécialité tech</label>
                <select value={form.techStack} onChange={set('techStack')}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none">
                  {TECH_STACKS.map((stack) => (
                    <option key={stack.value} value={stack.value} className="bg-slate-900">
                      {stack.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Année d'études</label>
                <select value={form.currentYear} onChange={set('currentYear')}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none">
                  {CURRENT_YEARS.map((year) => (
                    <option key={year.value} value={year.value} className="bg-slate-900">
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mot de passe</label>
                <div className="relative mt-1.5">
                  <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')} required
                    placeholder="••••••••"
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-slate-600 outline-none transition-colors" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                    {showPwd ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirmer mot de passe</label>
                <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')} required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-600/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors mt-1.5" />
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 py-2 cursor-pointer group">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] accent-blue-600 cursor-pointer" />
                <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  J'accepte les <button type="button" onClick={() => navigate('home')} className="text-blue-400 hover:text-blue-300 underline">conditions d'utilisation</button> et la <button type="button" onClick={() => navigate('home')} className="text-blue-400 hover:text-blue-300 underline">politique de confidentialité</button>
                </span>
              </label>

              {/* Submit Button */}
              <button type="submit" disabled={!isFormValid || loading}
                className={`btn-primary w-full py-3.5 rounded-2xl text-sm font-semibold text-white cursor-pointer flex items-center justify-center gap-2 mt-6 ${!isFormValid || loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-600/20'}`}>
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span className="relative z-10">Création en cours...</span></>
                  : <><Icons.Spark className="w-4 h-4 relative z-10" /><span className="relative z-10">Créer mon compte gratuit</span></>
                }
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Déjà inscrit(e) ?{' '}
          <button onClick={() => navigate('student-login')}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}


