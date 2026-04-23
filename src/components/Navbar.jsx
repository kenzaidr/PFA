import { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { useRouter } from '../router';

export function Navbar() {
  const { navigate, page } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on navigation
  const handleNav = (to) => {
    setOpen(false);
    navigate(to);
  };

  const navLinks = [
    { label: 'Portail', href: 'home', section: '#produit' },
    { label: 'Admissions', href: 'home', section: '#tarifs' },
    { label: 'Employabilité', href: 'home', section: '#insights' },
    { label: 'Témoignages', href: 'home', section: '#temoignages' },
  ];

  const handleSection = (href, section) => {
    setOpen(false);
    if (page !== href) {
      navigate(href);
      // Wait for render then scroll
      setTimeout(() => {
        document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0f1035]/95 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-[#0f1035]'
      }`}
    >
      {/* ESISA Identity Bar — 3 logos like esisa.ac.ma */}
      <div className="border-b border-white/[0.08] bg-gradient-to-r from-[#0a0a20] via-[#0f1035] to-[#0a0a20]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* ESISA Logo — Left */}
          <button onClick={() => navigate('home')} className="cursor-pointer group shrink-0">
            <img src="/esisa-logo.png" alt="ESISA Logo" className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </button>

          {/* AVENIR INGENIEUR — Center */}
          <div className="hidden sm:block">
            <img src="/avenir-ingenieur.png" alt="Avenir Ingénieur" className="h-8 w-auto object-contain" />
          </div>

          {/* RECONNUE Badge — Right */}
          <div className="hidden md:block shrink-0">
            <img src="/reconnue-badge.png" alt="Reconnue par l'État" className="h-12 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.label} onClick={() => handleSection(l.href, l.section)}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200 relative group cursor-pointer uppercase tracking-wider">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button id="nav-login" onClick={() => navigate('login')}
            className="btn-secondary px-4 py-2 rounded-xl text-sm font-medium text-slate-300 cursor-pointer">
            Connexion
          </button>
          <button id="nav-admission" onClick={() => navigate('register')}
            className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer flex items-center gap-2">
            <Icons.Spark className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Je Candidate</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button id="mobile-menu-toggle"
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <Icons.Close className="w-5 h-5" /> : <Icons.Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden ${open ? 'open' : ''}`}>
        <div className="bg-[#0f1035]/95 backdrop-blur-xl border-t border-white/[0.06] px-5 py-4 space-y-1">
          {navLinks.map((l) => (
            <button key={l.label} onClick={() => handleSection(l.href, l.section)}
              className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer uppercase tracking-wider">
              {l.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <button id="mobile-login" onClick={() => handleNav('login')}
              className="btn-secondary w-full py-2.5 rounded-xl text-sm font-medium text-slate-300 cursor-pointer">
              Connexion
            </button>
            <button id="mobile-register" onClick={() => handleNav('register')}
              className="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer flex items-center justify-center gap-2">
              <Icons.Spark className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Je Candidate</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
