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
    <footer className="site-footer" style={{ background: 'var(--color-emerald)', borderTop: '1px solid var(--color-gold)' }}>
      <style>{`
        .site-footer {
          padding: 48px 0 20px;
        }
        .footer-grid {
          display: grid;
          gap: 34px;
          grid-template-columns: 1.3fr 0.7fr 1fr;
        }
        .footer-socials {
          display: flex;
          gap: 12px;
          margin-top: 16px;
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
        .footer-logo {
          display: block;
          height: 92px;
          margin: 0 0 14px;
          object-fit: cover;
          width: 92px;
        }
        .footer-copyright {
          border-top: 1px solid rgba(248,245,240,0.14);
          color: rgba(248,245,240,0.58);
          font-size: 12px;
          margin: 34px 0 0;
          padding-top: 18px;
          text-align: center;
        }
        @media (max-width: 820px) {
          .site-footer {
            padding: 26px 0 14px;
          }
          .footer-grid {
            gap: 20px;
            grid-template-columns: 1fr;
          }
          .footer-logo {
            height: 58px;
            margin-bottom: 10px;
            width: 58px;
          }
          .footer-socials {
            gap: 8px;
            margin-top: 10px;
          }
          .footer-socials a {
            height: 34px;
            width: 34px;
          }
          .footer-title {
            font-size: 26px;
            margin-bottom: 12px;
          }
          .footer-link,
          .footer-text {
            font-size: 14px;
            line-height: 1.45;
            margin-bottom: 8px;
          }
          .footer-copyright {
            margin-top: 16px;
            padding-top: 12px;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            gap: 18px;
          }
          .footer-brand-block {
            display: grid;
            gap: 0 14px;
            grid-template-columns: 58px 1fr;
          }
          .footer-brand-block .footer-logo {
            grid-row: span 3;
          }
          .footer-brand-block .footer-text {
            margin-bottom: 5px !important;
          }
          .footer-socials {
            grid-column: 1 / -1;
          }
          .footer-nav {
            display: grid;
            gap: 0 18px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .footer-nav .footer-title {
            grid-column: 1 / -1;
          }
          .footer-contact {
            display: grid;
            gap: 0 14px;
            grid-template-columns: 1fr;
          }
          .footer-contact .footer-title {
            margin-bottom: 8px;
          }
          .footer-contact .footer-text:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
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
                  <Icon aria-hidden="true" size={16} />
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
            <p className="footer-text">Lundi - Samedi, 10h00 - 20h00</p>
          </div>
        </div>

        <p className="footer-copyright">
          © 2026 {BRAND_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
