'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa6';
import { BRAND_TAGLINE, navItems, whatsappUrl } from '@/lib/catalog';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isSolid = scrolled || open;

  return (
    <header className={`site-header ${isSolid ? 'is-solid' : ''}`}>
      <style>{`
        .site-header {
          border-bottom: 1px solid transparent;
          left: 0;
          min-height: 88px;
          position: fixed;
          right: 0;
          top: 0;
          transition: background var(--transition-base), border-color var(--transition-base), min-height var(--transition-base);
          z-index: 1000;
        }
        .site-header.is-solid {
          background: rgba(255, 255, 255, 0.96);
          border-bottom-color: var(--color-linen);
          min-height: 72px;
        }
        .header-inner {
          align-items: center;
          display: grid;
          gap: 24px;
          grid-template-columns: 220px 1fr 140px;
          min-height: inherit;
        }
        .brand-link {
          color: var(--color-white);
          font-family: var(--font-serif);
          font-size: 25px;
          line-height: 0.95;
        }
        .site-header.is-solid .brand-link,
        .site-header.is-solid .nav-link,
        .site-header.is-solid .menu-button {
          color: var(--color-dark);
        }
        .brand-sub {
          color: var(--color-gold);
          display: block;
          font-family: var(--font-sans);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.4px;
          margin-top: 7px;
          text-transform: uppercase;
        }
        .main-nav {
          align-items: center;
          display: flex;
          gap: 26px;
          justify-content: center;
        }
        .nav-link {
          color: var(--color-white);
          font-size: 12px;
          font-weight: 600;
          min-height: 44px;
          padding-top: 16px;
          position: relative;
          text-transform: uppercase;
        }
        .nav-link::after {
          background: var(--color-gold);
          bottom: 8px;
          content: "";
          height: 1px;
          left: 0;
          opacity: 0;
          position: absolute;
          right: 0;
          transform: scaleX(0.4);
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .nav-link:hover::after,
        .nav-link.is-active::after {
          opacity: 1;
          transform: scaleX(1);
        }
        .header-cta {
          justify-self: end;
          min-height: 40px;
          padding: 10px 16px;
        }
        .menu-button {
          background: transparent;
          border: 0;
          color: var(--color-white);
          cursor: pointer;
          display: none;
          height: 44px;
          justify-self: end;
          position: relative;
          width: 44px;
        }
        .menu-button span {
          background: currentColor;
          display: block;
          height: 1px;
          left: 9px;
          position: absolute;
          right: 9px;
          transition: transform 200ms ease, top 200ms ease, opacity 200ms ease;
        }
        .menu-button span:nth-child(1) { top: 15px; }
        .menu-button span:nth-child(2) { top: 22px; }
        .menu-button span:nth-child(3) { top: 29px; }
        .menu-button.is-open span:nth-child(1) { top: 22px; transform: rotate(45deg); }
        .menu-button.is-open span:nth-child(2) { opacity: 0; }
        .menu-button.is-open span:nth-child(3) { top: 22px; transform: rotate(-45deg); }
        .mobile-menu {
          background: var(--color-ivory);
          inset: 0;
          padding: 120px 28px 32px;
          position: fixed;
          transform: translateX(100%);
          transition: transform 300ms ease;
          z-index: 990;
        }
        .mobile-menu.is-open { transform: translateX(0); }
        .mobile-menu a {
          border-bottom: 1px solid var(--color-linen);
          color: var(--color-dark);
          display: block;
          font-family: var(--font-serif);
          font-size: 34px;
          padding: 18px 0;
        }
        .mobile-whatsapp {
          align-items: center;
          background: #25D366;
          color: white !important;
          display: inline-flex !important;
          font-family: var(--font-sans) !important;
          font-size: 14px !important;
          font-weight: 600;
          gap: 10px;
          justify-content: center;
          margin-top: 28px;
          min-height: 52px;
          padding: 0 20px !important;
          text-transform: uppercase;
          width: 100%;
        }
        @media (max-width: 1050px) {
          .header-inner { grid-template-columns: 1fr 44px; }
          .main-nav, .header-cta { display: none; }
          .menu-button { display: block; }
        }
      `}</style>
      <div className="container-rc header-inner">
        <Link href="/" className="brand-link" onClick={() => setOpen(false)} aria-label="Accueil Aziz EL Mire Haute Couture">
          Aziz EL Mire
          <span className="brand-sub">{BRAND_TAGLINE}</span>
        </Link>

        <nav className="main-nav" aria-label="Navigation principale">
          {navItems.map((item) => {
            const isActive = pathname === item.href || Boolean(pathname?.startsWith(`${item.href}/`));
            return (
              <Link key={item.href} href={item.href} className={`nav-link ${isActive ? 'is-active' : ''}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="btn btn-gold header-cta">
          Reserver
        </Link>

        <button
          type="button"
          className={`menu-button ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <a
          className="mobile-whatsapp"
          href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous a l'atelier.")}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </header>
  );
}
