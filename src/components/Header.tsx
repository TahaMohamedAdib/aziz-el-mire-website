'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LOGO, navItems } from '@/lib/catalog';

type IntroPhase = 'center' | 'moving' | 'settling' | 'complete';

let hasPlayedHeaderIntro = false;

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
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
    let frame = 0;

    const getLogoSizes = () => {
      if (window.innerWidth <= 720) {
        return { expanded: 82, compact: 50 };
      }
      if (window.innerWidth <= 1050) {
        return { expanded: 106, compact: 54 };
      }
      return { expanded: 128, compact: 58 };
    };

    const getHeroProgress = (scrollTop: number) => {
      // Prefer the hero heading as the trigger so the logo starts shrinking
      // when it nears the title (e.g. "Costumes d'exception.").
      const heading = document.querySelector<HTMLElement>(
        '.home-hero h1, .page-hero h1, .reservation-hero h1',
      );

      if (heading) {
        const headerHeight = headerRef.current?.offsetHeight ?? 80;
        const expandedLogoSize = getLogoSizes().expanded;
        // The logo bottom edge sits at headerHeight + expandedLogoSize/2 when expanded.
        const logoBottom = headerHeight + expandedLogoSize / 2;
        const buffer = 24; // start shrinking this many px before contact
        const transitionDistance = expandedLogoSize / 2 + buffer; // smooth window
        const headingTop = heading.getBoundingClientRect().top;
        const gap = headingTop - logoBottom; // px between logo bottom and heading top
        // progress: 0 when gap >= buffer (no overlap risk), 1 when gap <= -transitionDistance + buffer
        return Math.min(Math.max((buffer - gap) / transitionDistance, 0), 1);
      }

      const hero = document.querySelector<HTMLElement>('.home-hero, .page-hero, .reservation-hero');
      if (!hero) {
        return Math.min(Math.max(scrollTop / 180, 0), 1);
      }

      const headerHeight = headerRef.current?.offsetHeight ?? 80;
      const transitionDistance = Math.min(Math.max(window.innerHeight * 0.18, 120), 220);
      const heroBottom = hero.getBoundingClientRect().bottom;
      return Math.min(Math.max((headerHeight + transitionDistance - heroBottom) / transitionDistance, 0), 1);
    };

    const updateLogo = () => {
      frame = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const progress = getHeroProgress(scrollTop);
      const { expanded, compact } = getLogoSizes();
      const size = expanded + (compact - expanded) * progress;
      const headerHeight = headerRef.current?.offsetHeight ?? 80;
      // top: logo center moves from navbar bottom edge (expanded) to navbar center (compact)
      const topPx = headerHeight - (headerHeight / 2) * progress;
      const padding = 7 + (4 - 7) * progress;
      const isScrolled = scrollTop > 12;

      headerRef.current?.style.setProperty('--logo-dynamic-size', `${size}px`);
      headerRef.current?.style.setProperty('--logo-dynamic-top', `${topPx}px`);
      headerRef.current?.style.setProperty('--logo-dynamic-padding', `${padding}px`);
      document.documentElement.toggleAttribute('data-header-scrolled', isScrolled);
      setScrolled((value) => (value === isScrolled ? value : isScrolled));
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateLogo);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    updateLogo();

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.documentElement.removeAttribute('data-header-scrolled');
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.documentElement.toggleAttribute('data-mobile-menu-open', open);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.removeAttribute('data-mobile-menu-open');
    };
  }, [open]);

  useEffect(() => {
    if (hasPlayedHeaderIntro) {
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
  }, []);

  const normalizedPath = (pathname ?? '/').replace(/\/$/, '') || '/';
  const isHome = normalizedPath === '/';
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
        >
          <Link
            href="/"
            className="logo-intro-mark"
            style={introLogoStyle}
            aria-label="Accueil Maison El Mire"
            tabIndex={-1}
            onClick={() => setOpen(false)}
          >
            <Image className="logo-intro-image" src={NAV_LOGO} alt="" width={1254} height={1254} priority />
          </Link>
        </div>
      )}

      <header
        ref={headerRef}
        className={`site-header ${isSolid ? 'is-solid' : ''} ${scrolled ? 'is-scrolled' : ''} ${
          introActive ? 'logo-intro-active' : ''
        }`}
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

      </header>

      <div className="mobile-header-actions" data-menu-open={open ? 'true' : 'false'}>
        <Link href="/reservation" className="btn btn-gold mobile-header-reserve" onClick={() => setOpen(false)}>
          R&eacute;server
        </Link>
        <button
          type="button"
          className={`mobile-header-toggle ${open ? 'is-open' : ''}`}
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
        <Link href="/" className="mobile-menu-brand" aria-label="Accueil Maison El Mire" onClick={() => setOpen(false)}>
          <Image src={NAV_LOGO} alt="" width={1254} height={1254} priority />
        </Link>
        <button type="button" className="mobile-close" aria-label="Fermer le menu" onClick={() => setOpen(false)} />
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="mobile-menu-link" onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
