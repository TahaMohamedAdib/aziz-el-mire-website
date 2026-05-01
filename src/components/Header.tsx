'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa6';
import { BRAND_LOGO, navItems, whatsappUrl } from '@/lib/catalog';

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

  const normalizedPath = (pathname ?? '/').replace(/\/$/, '') || '/';
  const isHome = normalizedPath === '/' || normalizedPath === '/aziz-el-mire-website';
  const isSolid = scrolled || open || !isHome;

  return (
    <header className={`site-header ${isSolid ? 'is-solid' : ''}`}>
      <style>{`
        .site-header {
          background: rgba(9, 48, 37, 0.96);
          border-bottom: 1px solid transparent;
          left: 0;
          min-height: 134px;
          position: fixed;
          right: 0;
          top: 0;
          transition: background var(--transition-base), border-color var(--transition-base), min-height var(--transition-base);
          z-index: 1000;
        }
        .site-header.is-solid {
          background: rgba(9, 48, 37, 0.98);
          border-bottom-color: rgba(184,151,90,0.35);
          min-height: 92px;
        }
        .header-inner {
          align-items: center;
          display: grid;
          gap: 36px;
          grid-template-columns: 180px 1fr 220px;
          margin: 0;
          max-width: none;
          min-height: inherit;
          padding-left: clamp(28px, 4.7vw, 88px);
          padding-right: clamp(28px, 4.7vw, 88px);
        }
        .brand-link {
          align-items: center;
          background: rgba(9,48,37,0.82);
          border: 1px solid rgba(216,178,90,0.52);
          box-shadow: 0 0 0 4px rgba(216,178,90,0.08), 0 10px 28px rgba(0,0,0,0.18);
          color: var(--color-white);
          display: inline-flex;
          font-family: var(--font-serif);
          font-size: 25px;
          height: 110px;
          justify-content: center;
          line-height: 0.95;
          overflow: hidden;
          padding: 5px;
          position: relative;
          transition: box-shadow 220ms ease, height var(--transition-base), transform 220ms ease, width var(--transition-base);
          width: 110px;
        }
        .brand-link::after {
          border: 1px solid rgba(255,229,164,0.36);
          content: "";
          inset: 4px;
          pointer-events: none;
          position: absolute;
        }
        .brand-link:hover {
          box-shadow: 0 0 0 4px rgba(216,178,90,0.12), 0 0 18px rgba(216,178,90,0.28), 0 12px 30px rgba(0,0,0,0.2);
          transform: translateY(-1px);
        }
        .site-header.is-solid .brand-link,
        .site-header.is-solid .nav-link,
        .site-header.is-solid .menu-button {
          color: var(--color-ivory);
        }
        .site-header.is-solid .brand-link {
          height: 68px;
          width: 68px;
        }
        .brand-logo {
          display: block;
          height: 100%;
          object-fit: cover;
          width: 100%;
        }
        .brand-name-visually-hidden {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
        .main-nav {
          align-items: center;
          display: flex;
          gap: clamp(28px, 2vw, 40px);
          justify-content: center;
        }
        .nav-link {
          align-items: center;
          color: var(--color-white);
          display: inline-flex;
          font-size: 16px;
          font-weight: 700;
          min-height: 64px;
          padding: 0 0 2px;
          position: relative;
          text-transform: uppercase;
        }
        .nav-link::after {
          background: var(--color-gold);
          bottom: 12px;
          content: "";
          height: 1px;
          left: 0;
          opacity: 0;
          position: absolute;
          right: 0;
          transform: scaleX(0.35);
          transform-origin: center;
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .nav-link:hover::after,
        .nav-link.is-active::after {
          opacity: 1;
          transform: scaleX(1);
        }
        .header-cta {
          justify-self: end;
          font-size: 18px;
          min-height: 64px;
          padding: 18px 30px;
          position: relative;
          box-shadow: 0 0 0 1px rgba(216,178,90,0.45), 0 0 16px rgba(216,178,90,0.36);
          overflow: hidden;
        }
        .header-cta::before {
          border: 1px solid rgba(255,225,148,0.85);
          content: "";
          inset: 3px;
          pointer-events: none;
          position: absolute;
        }
        .header-cta::after {
          background: linear-gradient(120deg, transparent 22%, rgba(255,238,184,0.75), transparent 48%);
          content: "";
          inset: -45%;
          opacity: 0.75;
          pointer-events: none;
          position: absolute;
          transform: translateX(-55%) rotate(10deg);
          transition: transform 620ms ease, opacity 220ms ease;
        }
        .header-cta:hover,
        .header-cta:focus-visible {
          background: #D8B25A;
          border-color: #D8B25A;
          box-shadow: 0 0 0 1px rgba(216,178,90,0.75), 0 0 22px rgba(216,178,90,0.58);
        }
        .header-cta:hover::after,
        .header-cta:focus-visible::after {
          opacity: 1;
          transform: translateX(55%) rotate(10deg);
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
          background: var(--color-emerald);
          inset: 0;
          padding: 104px 28px 32px;
          position: fixed;
          transform: translateX(100%);
          transition: transform 300ms ease;
          z-index: 990;
        }
        .mobile-menu.is-open { transform: translateX(0); }
        .mobile-close {
          align-items: center;
          background: transparent;
          border: 1px solid rgba(216,178,90,0.5);
          color: var(--color-ivory);
          cursor: pointer;
          display: none;
          height: 46px;
          justify-content: center;
          position: absolute;
          right: 28px;
          top: 26px;
          width: 46px;
        }
        .mobile-close::before,
        .mobile-close::after {
          background: currentColor;
          content: "";
          height: 1px;
          position: absolute;
          width: 22px;
        }
        .mobile-close::before {
          transform: rotate(45deg);
        }
        .mobile-close::after {
          transform: rotate(-45deg);
        }
        .mobile-menu a {
          border-bottom: 1px solid rgba(184,151,90,0.24);
          color: var(--color-ivory);
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
          .brand-link {
            height: 78px;
            width: 78px;
          }
        }
        @media (max-width: 720px) {
          .site-header { min-height: 78px; }
          .site-header.is-solid { min-height: 72px; }
          .header-inner {
            gap: 10px;
            grid-template-columns: 1fr auto 44px;
            padding-left: 18px;
            padding-right: 18px;
          }
          .header-cta {
            display: inline-flex;
            font-size: 11px;
            justify-self: end;
            min-height: 38px;
            padding: 10px 12px;
          }
          .brand-link,
          .site-header.is-solid .brand-link {
            height: 54px;
            width: 54px;
          }
          .mobile-menu {
            padding-top: 92px;
          }
          .mobile-close {
            display: inline-flex;
            right: 18px;
            top: 18px;
          }
          .mobile-menu a {
            font-size: 28px;
            padding: 14px 0;
          }
        }
      `}</style>
      <div className="container-rc header-inner">
        <Link href="/" className="brand-link" onClick={() => setOpen(false)} aria-label="Accueil Maison El Mire">
          <Image className="brand-logo" src={BRAND_LOGO} alt="" width={1254} height={1254} priority />
          <span className="brand-name-visually-hidden">Maison El Mire</span>
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

        <Link href="/reservation" className="btn btn-gold header-cta">
          Réserver
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
        <button type="button" className="mobile-close" aria-label="Fermer le menu" onClick={() => setOpen(false)} />
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <a
          className="mobile-whatsapp"
          href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous à l'atelier.")}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </header>
  );
}
