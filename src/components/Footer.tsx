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
            padding: 34px 0 18px;
          }
          .footer-grid {
            gap: 24px;
            grid-template-columns: 1fr;
          }
          .footer-logo {
            height: 72px;
            width: 72px;
          }
          .footer-socials {
            margin-top: 12px;
          }
          .footer-copyright {
            margin-top: 24px;
            padding-top: 16px;
          }
        }
      `}</style>
      <div className="container-rc">
        <div className="footer-grid">
          <div>
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

        <p className="footer-copyright">
          © 2026 {BRAND_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
