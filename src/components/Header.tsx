'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa6';
import { NAV_LOGO, navItems, whatsappUrl } from '@/lib/catalog';

type IntroPhase = 'center' | 'moving' | 'settling' | 'complete';

let hasPlayedHeaderIntro = false;

export default function Header() {
  const pathname = usePathname();
  const brandRef = useRef<HTMLAnchorElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() =>
    hasPlayedHeaderIntro ? 'complete' : 'center',
  );
  const [introTarget, setIntroTarget] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

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

  useEffect(() => {
    if (hasPlayedHeaderIntro || introPhase !== 'center') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      hasPlayedHeaderIntro = true;
      window.setTimeout(() => setIntroPhase('complete'), 0);
      return;
    }

    const measureTarget = () => {
      const rect = brandRef.current?.getBoundingClientRect();
      if (!rect) {
        hasPlayedHeaderIntro = true;
        setIntroPhase('complete');
        return;
      }

      setIntroTarget({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
      setIntroPhase('moving');
    };

    const moveTimer = window.setTimeout(measureTarget, 620);
    const settleTimer = window.setTimeout(() => {
      setIntroPhase('settling');
    }, 1580);
    const doneTimer = window.setTimeout(() => {
      hasPlayedHeaderIntro = true;
      setIntroPhase('complete');
    }, 1880);

    return () => {
      window.clearTimeout(moveTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(doneTimer);
    };
  }, [introPhase]);

  const normalizedPath = (pathname ?? '/').replace(/\/$/, '') || '/';
  const isHome = normalizedPath === '/' || normalizedPath === '/aziz-el-mire-website';
  const isSolid = scrolled || open || !isHome;
  const introActive = introPhase === 'center' || introPhase === 'moving';
  const introLogoStyle =
    introPhase !== 'center' && introTarget
      ? ({
          left: `${introTarget.x}px`,
          top: `${introTarget.y}px`,
          width: `${introTarget.width}px`,
          height: `${introTarget.height}px`,
        } satisfies CSSProperties)
      : undefined;

  return (
    <>
      {introPhase !== 'complete' && (
        <div
          className={`logo-intro-overlay ${introPhase === 'moving' ? 'is-moving' : ''} ${
            introPhase === 'settling' ? 'is-settling' : ''
          }`}
          aria-hidden="true"
        >
          <div className="logo-intro-mark" style={introLogoStyle}>
            <Image className="logo-intro-image" src={NAV_LOGO} alt="" width={1254} height={1254} priority />
          </div>
        </div>
      )}

      <header
        className={`site-header ${isSolid ? 'is-solid' : ''} ${introActive ? 'logo-intro-active' : ''}`}
      >
        <div className="container-rc header-inner">
          <Link
            ref={brandRef}
            href="/"
            className="brand-link"
            onClick={() => setOpen(false)}
            aria-label="Accueil Maison El Mire"
          >
            <Image className="brand-logo" src={NAV_LOGO} alt="" width={1254} height={1254} priority />
            <span className="brand-name-visually-hidden">Maison El Mire</span>
          </Link>

          <nav className="main-nav" aria-label="Navigation principale">
            {navItems.map((item) => {
              const isActive = pathname === item.href || Boolean(pathname?.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/reservation"
            className="btn btn-gold header-cta"
          >
            R&eacute;server
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
            href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous \u00e0 l'atelier.")}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </header>
    </>
  );
}
