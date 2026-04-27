'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeaderSocialLinks } from '@/components/SocialLinks';
import { BRAND_TAGLINE } from '@/lib/catalog';

const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Nouveautés', href: '/new-arrivals' },
  { label: 'Sur Mesure', href: '/sur-mesure' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'Réservation', href: '/reservation' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        minHeight: scrolled ? '72px' : '96px',
        background: scrolled || open ? 'rgba(5, 7, 6, 0.96)' : 'linear-gradient(to bottom, rgba(5,7,6,0.7), transparent)',
        borderBottom: scrolled || open ? '1px solid rgba(183, 154, 85, 0.24)' : '1px solid transparent',
        backdropFilter: scrolled || open ? 'blur(16px)' : 'none',
        transition: 'background-color 300ms ease, min-height 300ms ease, border-color 300ms ease',
      }}
    >
      <style>{`
        .main-nav { display: flex; gap: 22px; align-items: center; }
        .header-social { display: flex; gap: 12px; }
        .mobile-panel { display: none; }
        @media (max-width: 1120px) {
          .main-nav, .header-social { display: none !important; }
          .mobile-panel.is-open { display: grid !important; }
        }
      `}</style>
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '20px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <Link
          href="/"
          aria-label="Aziz EL Mire Haute Couture home"
          style={{
            color: 'var(--ivory)',
            fontFamily: 'var(--font-heading)',
            maxWidth: '250px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            lineHeight: 1.05,
          }}
          onClick={() => setOpen(false)}
        >
          <span style={{ display: 'block', fontSize: scrolled ? '20px' : '24px', transition: 'font-size 300ms ease' }}>
            Aziz EL Mire
          </span>
          <span style={{ color: '#b79a55', display: 'block', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '1.2px', lineHeight: 1.35, marginTop: '5px' }}>
            {BRAND_TAGLINE}
          </span>
        </Link>

        <nav className="main-nav" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--ivory)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderSocialLinks />

        <button
          className="header-hamburger"
          style={{
            flexDirection: 'column',
            background: 'none',
            border: '1px solid rgba(239,230,209,0.24)',
            cursor: 'pointer',
            padding: '9px',
            width: '44px',
            height: '44px',
            justifyContent: 'center',
          }}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'var(--ivory)', margin: '3px 0' }} />
          ))}
        </button>
      </div>

      <div className={`mobile-panel ${open ? 'is-open' : ''}`} style={{ gap: '0', padding: '0 18px 24px' }}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              borderTop: '1px solid rgba(183,154,85,0.18)',
              color: 'var(--ivory)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 700,
              padding: '16px 0',
              textTransform: 'uppercase',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
