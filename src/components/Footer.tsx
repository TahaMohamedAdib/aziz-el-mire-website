import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import {
  ADDRESS_DISPLAY,
  BRAND_NAME,
  BRAND_SIGNATURE,
  BRAND_TAGLINE,
  EMAIL_DISPLAY,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  navItems,
  PHONE_DISPLAY,
  TIKTOK_URL,
  whatsappUrl,
} from '@/lib/catalog';

export default function Footer() {
  const socials = [
    { label: 'Instagram', href: INSTAGRAM_URL, icon: FaInstagram },
    { label: 'Facebook', href: FACEBOOK_URL, icon: FaFacebookF },
    { label: 'TikTok', href: TIKTOK_URL, icon: FaTiktok },
    { label: 'WhatsApp', href: whatsappUrl("Bonjour, je souhaite prendre rendez-vous a l'atelier."), icon: FaWhatsapp },
  ];

  return (
    <footer style={{ background: 'var(--color-dark)', borderTop: '1px solid var(--color-gold)', padding: '72px 0 28px' }}>
      <style>{`
        .footer-grid {
          display: grid;
          gap: 48px;
          grid-template-columns: 1.3fr 0.7fr 1fr;
        }
        .footer-socials {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .footer-socials a {
          align-items: center;
          border: 1px solid rgba(248,245,240,0.22);
          color: var(--color-ivory);
          display: inline-flex;
          height: 38px;
          justify-content: center;
          transition: border-color 200ms ease, color 200ms ease;
          width: 38px;
        }
        .footer-socials a:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }
        @media (max-width: 820px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="container-rc">
        <div className="footer-grid">
          <div>
            <h2 style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-serif)', fontSize: '30px', lineHeight: 1, margin: '0 0 12px' }}>
              Aziz EL Mire
            </h2>
            <p className="footer-text" style={{ color: 'var(--color-gold)', marginBottom: 12 }}>
              {BRAND_TAGLINE}
            </p>
            <p className="footer-text" style={{ maxWidth: 340 }}>
              {BRAND_SIGNATURE}
            </p>
            <div className="footer-socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" size={16} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navigation pied de page">
            <h3 className="footer-title">Navigation</h3>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <h3 className="footer-title">Contact</h3>
            <p className="footer-text">{ADDRESS_DISPLAY}</p>
            <p className="footer-text">{PHONE_DISPLAY}</p>
            <p className="footer-text">{EMAIL_DISPLAY}</p>
            <p className="footer-text">Lundi - Samedi, 10h00 - 20h00</p>
          </div>
        </div>

        <p style={{ borderTop: '1px solid rgba(248,245,240,0.14)', color: 'rgba(248,245,240,0.58)', fontSize: 12, margin: '56px 0 0', paddingTop: 24, textAlign: 'center' }}>
          © 2026 {BRAND_NAME}. Tous droits reserves.
        </p>
      </div>
    </footer>
  );
}
