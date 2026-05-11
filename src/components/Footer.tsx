import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import {
  ADDRESS_DISPLAY,
  BRAND_LOGO,
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
    { label: 'WhatsApp', href: whatsappUrl("Bonjour, je souhaite prendre rendez-vous à l'atelier."), icon: FaWhatsapp },
  ];

  return (
    <footer className="site-footer" style={{ background: '#001D14', borderTop: '1px solid rgba(161,98,7,0.35)' }}>
      <div className="container-rc">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <Image className="footer-logo" src={BRAND_LOGO} alt="Maison El Mire" width={1254} height={1254} />
            <p className="footer-text" style={{ color: 'var(--color-gold)', marginBottom: 12 }}>
              {BRAND_TAGLINE}
            </p>
            <p className="footer-text" style={{ maxWidth: 340 }}>
              {BRAND_SIGNATURE}
            </p>
            <div className="footer-socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" size={15} />
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-nav" aria-label="Navigation pied de page">
            <h3 className="footer-title">Navigation</h3>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer-contact">
            <h3 className="footer-title">Contact</h3>
            <p className="footer-text">{ADDRESS_DISPLAY}</p>
            <p className="footer-text">{PHONE_DISPLAY}</p>
            <p className="footer-text">{EMAIL_DISPLAY}</p>
            <p className="footer-text">Lundi – Samedi, 10h – 20h</p>
          </div>
        </div>

        <p className="footer-copyright">
          © 2026 {BRAND_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
