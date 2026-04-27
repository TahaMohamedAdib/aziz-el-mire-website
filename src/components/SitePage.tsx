import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function SectionHeader({
  eyebrow,
  title,
  children,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div style={{ margin: align === 'center' ? '0 auto 54px' : '0 0 40px', maxWidth: '760px', textAlign: align }}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children ? <div className="body-large">{children}</div> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ background: 'var(--color-ivory)', color: 'var(--color-dark)', padding: '160px 0 80px', textAlign: 'center' }}>
      <div className="container-rc">
        <p className="eyebrow">{eyebrow}</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 400, lineHeight: 1, margin: '0 0 22px' }}>
          {title}
        </h1>
        <div className="body-large" style={{ margin: '0 auto', maxWidth: '760px' }}>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SitePage({ children }: { children: ReactNode; withNewsletter?: boolean }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
