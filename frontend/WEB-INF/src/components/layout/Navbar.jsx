import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useThemeLang } from '../../contexts/ThemeLangContext.jsx';
import { Network, Globe, Sun, Moon } from 'lucide-react';
import { homeI18n } from '../../utils/i18n.js';

export const Navbar = () => {
  const { theme, toggleTheme, lang, toggleLang } = useThemeLang();
  const t = homeI18n[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#080810]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Network className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-black text-lg tracking-tight">
            SKILL<span className="text-indigo-400">MAP</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {[t.nav.marketPulse, t.nav.roadmaps, t.nav.pricing, t.nav.blog].map(link => (
            <a key={link} href="#" className="hover:text-white transition-colors duration-200 relative group">
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button onClick={toggleLang} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Globe className="w-3.5 h-3.5" />
            {lang.toUpperCase()}
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/auth" className="text-sm text-gray-400 hover:text-white transition-colors font-medium px-3 py-2">{t.nav.login}</Link>
          <Link to="/auth" className="relative overflow-hidden px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 duration-200">
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </nav>
  );
};
