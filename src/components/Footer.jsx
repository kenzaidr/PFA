import { Icons } from './Icons';
import { useRouter } from '../router';

export function Footer() {
  const { navigate } = useRouter();

  const cols = [
    {
      title: 'Portail',
      links: [
        { label: 'Profil de compétences', action: () => navigate('upload') },
        { label: 'Matching entreprises', action: () => navigate('home') },
        { label: 'Suivi alumni', action: () => navigate('register') },
        { label: 'Partenaires RH', action: () => navigate('register') },
        { label: 'Documentation', action: () => navigate('home') },
      ],
    },
    {
      title: 'École',
      links: [
        { label: 'À propos ESISA', action: () => navigate('home') },
        { label: 'Programmes', action: () => navigate('home') },
        { label: 'Stages', action: () => navigate('home') },
        { label: 'Entreprises partenaires', action: () => navigate('home') },
        { label: 'Contact', action: () => navigate('home') },
      ],
    },
    {
      title: 'Informations',
      links: [
        { label: 'Politique de Confidentialité', action: () => navigate('home') },
        { label: "Conditions Générales", action: () => navigate('home') },
        { label: 'Cookies', action: () => navigate('home') },
        { label: 'Sécurité des données', action: () => navigate('home') },
        { label: 'Contact', action: () => navigate('home') },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a20]">
      {/* Contact Bar */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <p className="text-center text-slate-400 text-sm mb-8">Restons en contact pour toute question ou information</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '📍', title: 'ADRESSE', info: '29 bis Av Ibn Khatib Route d\'Imouzzer', sub: 'Fès, Maroc', color: 'bg-rose-500/20 border-rose-500/30' },
              { icon: '📞', title: 'TÉLÉPHONE', info: '+212 (0)6 61 45 35 09', sub: null, color: 'bg-blue-500/20 border-blue-500/30' },
              { icon: '✉️', title: 'EMAIL', info: 'info@esisa.ac.ma', sub: null, color: 'bg-blue-800/20 border-blue-800/30' },
            ].map((c) => (
              <div key={c.title} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
                <div className={`w-12 h-12 rounded-xl ${c.color} border flex items-center justify-center text-xl shrink-0`}>
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">{c.title}</div>
                  <div className="text-sm text-slate-300 font-medium">{c.info}</div>
                  {c.sub && <div className="text-xs text-slate-500">{c.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <button onClick={() => navigate('home')}
              className="flex items-center gap-2.5 mb-4 cursor-pointer group">
              <div className="flex items-center">
                <span className="text-3xl font-black text-yellow-400 transition-transform duration-300 group-hover:scale-110">E</span>
                <span className="text-3xl font-black text-white">SISA</span>
              </div>
            </button>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              École Supérieure d'Ingénierie en Sciences Appliquées, formation d'excellence en informatique, intelligence artificielle et data science.
            </p>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-semibold">
                ESISA - Fès, Maroc
              </div>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button onClick={l.action}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-left">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Newsletter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 mb-8 border-b border-white/[0.06]">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Suivez l'École d'Ingénieurs ESISA</h4>
            <div className="flex items-center gap-3">
              {[
                { Icon: Icons.Github, label: 'GitHub' },
                { Icon: Icons.Linkedin, label: 'LinkedIn' },
                { Icon: Icons.Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-blue-800/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/60 hover:bg-blue-900/20 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Newsletter ESISA</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors w-64"
              />
              <button className="btn-esisa-blue w-10 h-10 rounded-xl flex items-center justify-center text-white cursor-pointer">
                <span className="relative z-10">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 ESISA · École d'Ingénierie Informatique & Intelligence Artificielle · Données protégées conformément à la CNDP
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <button className="hover:text-slate-400 transition-colors cursor-pointer">Politique de Confidentialité</button>
            <span>·</span>
            <button className="hover:text-slate-400 transition-colors cursor-pointer">Conditions Générales</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
