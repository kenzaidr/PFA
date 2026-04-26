import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import '../styles/EsisaPlatform.css';

interface NavbarProps {
  scrolled: boolean;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ scrolled, darkMode, setDarkMode }: NavbarProps) {
  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-brand">
          <img src="/esisa-logo.svg" alt="ESISA logo" className="navbar-logo" />
          <div>
            <p className="navbar-title">ESISA</p>
            <p className="navbar-subtitle">Education Network Layer</p>
          </div>
        </div>

        <div className="navbar-links">
          {['Overview', 'Platform', 'Partners', 'Outcomes'].map((item) => (
            <button key={item} className="nav-link">{item}</button>
          ))}
        </div>

        <div className="navbar-actions">
          <button onClick={() => setDarkMode((prev) => !prev)} aria-label="Toggle dark mode" className="dark-mode-toggle">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/login" className="btn-book-call">Login</Link>
          <Link to="/signup" className="btn-nav-demo">Start now</Link>
        </div>
      </div>
    </nav>
  );
}
