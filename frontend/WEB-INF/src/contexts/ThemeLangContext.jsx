import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeLangContext = createContext();

export const useThemeLang = () => useContext(ThemeLangContext);

export const ThemeLangProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang(l => (l === 'fr' ? 'en' : 'fr'));

  return (
    <ThemeLangContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
      {children}
    </ThemeLangContext.Provider>
  );
};
