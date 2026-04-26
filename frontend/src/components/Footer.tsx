import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import '../styles/EsisaPlatform.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <img src="/esisa-logo.svg" alt="ESISA logo" className="footer-logo" />
            <span className="footer-brand-name">ESISA</span>
          </div>
          <p className="footer-note">
            Plateforme carrière ESISA pour les stages, l’alternance et la mise en relation avec les entreprises partenaires.
          </p>
          <div className="footer-pills" aria-label="Footer highlights">
            <span>AI matching</span>
            <span>CV analysis</span>
            <span>Partner network</span>
          </div>
        </div>

        <div className="footer-links-group">
          <p className="footer-links-title">Platform</p>
          <div className="footer-links">
            <a href="#">Overview</a>
            <a href="#">Partners</a>
            <a href="#">Contact</a>
          </div>
        </div>

        <div className="footer-social-newsletter">
          <div className="footer-social-block">
            <p className="footer-links-title">Suivez l’école d'ingénieurs ESISA</p>
            <div className="footer-social-icons" aria-label="Social links">
              <a href="#" className="footer-social-icon facebook" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="footer-social-icon instagram" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="footer-social-icon youtube" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="#" className="footer-social-icon linkedin" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="footer-newsletter-block">
            <p className="footer-links-title">Newsletter ESISA</p>
            <p className="footer-newsletter-text">
              Recevez les actualités, dates clés d'inscription et événements de l'école d'ingénieurs.
            </p>
            <form className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                aria-label="Votre adresse e-mail"
                required
              />
              <button type="submit" aria-label="Subscribe">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} ESISA. Tous droits réservés.
        </p>
        <a href="#" className="footer-privacy-link">
          Politique de confidentialité
        </a>
      </div>
    </footer>
  );
}
