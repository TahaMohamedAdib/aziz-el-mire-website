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
