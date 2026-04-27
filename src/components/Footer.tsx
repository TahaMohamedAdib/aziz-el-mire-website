'use client';

import Link from 'next/link';
import { ADDRESS_DISPLAY, BRAND_NAME, BRAND_OFFER, BRAND_SIGNATURE, BRAND_TAGLINE, PHONE_DISPLAY } from '@/lib/catalog';
import { FooterSocialLinks } from '@/components/SocialLinks';

export default function Footer() {
  const quickLinks = [
    ['Accueil', '/'],
    ['Collections', '/collections'],
    ['Nouveautés', '/new-arrivals'],
    ['Sur Mesure', '/sur-mesure'],
    ['Galerie', '/gallery'],
    ['Réservation', '/reservation'],
    ['À propos', '/about'],
    ['Contact', '/contact'],
  ];

  const collections = ['Costumes', 'Vestes', 'Pantalons', 'Chemises', 'Accessoires'];

  return (
    <footer style={{ background: '#050706', borderTop: '1px solid rgba(183,154,85,0.16)', padding: '72px 0 30px' }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1.3fr 0.8fr 0.8fr 1.1fr; gap: 46px; }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 620px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="container-rc">
        <div className="footer-grid">
          <div>
            <h3 style={{ color: 'var(--ivory)', fontFamily: 'var(--font-heading)', fontSize: '24px', lineHeight: 1.1, margin: '0 0 18px', textTransform: 'uppercase' }}>
              Aziz EL Mire<br />
              <span style={{ color: '#b79a55', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px' }}>{BRAND_TAGLINE}</span>
            </h3>
            <p style={{ color: '#b8ad96', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
              {BRAND_OFFER}. <span style={{ color: '#d7c28b', fontStyle: 'italic' }}>{BRAND_SIGNATURE}</span>.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Liens rapides</h4>
            {quickLinks.map(([label, href]) => (
              <Link key={href} href={href} className="footer-link">
                {label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer-title">Collections</h4>
            {collections.map((label) => (
              <Link key={label} href={`/collections?category=${encodeURIComponent(label)}`} className="footer-link">
                {label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer-title">Contact</h4>
            <p className="footer-text">Adresse : {ADDRESS_DISPLAY}</p>
            <p className="footer-text">Téléphone : {PHONE_DISPLAY}</p>
            <p className="footer-text">Email : contact@azizelmire.com</p>
            <p className="footer-text">Horaires : Lundi - Samedi, 10h00 - 20h00</p>
            <FooterSocialLinks />
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(183,154,85,0.16)', marginTop: '54px', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#8f856f', fontSize: '12px', margin: 0 }}>
            © 2026 {BRAND_NAME}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
