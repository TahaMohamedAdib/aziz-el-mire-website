import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ margin: '0 auto 54px', maxWidth: '760px', textAlign: 'center' }}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children ? <div style={{ color: '#b8ad96', fontSize: '17px', lineHeight: 1.8 }}>{children}</div> : null}
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
    <section style={{ background: '#07100c', color: 'var(--ivory)', padding: '168px 20px 92px', textAlign: 'center' }}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(38px, 6vw, 76px)', lineHeight: 1, margin: '0 0 24px', textTransform: 'uppercase' }}>
        {title}
      </h1>
      <div style={{ color: '#b8ad96', fontSize: '17px', lineHeight: 1.8, margin: '0 auto', maxWidth: '760px' }}>{children}</div>
    </section>
  );
}

export function SitePage({ children, withNewsletter = true }: { children: ReactNode; withNewsletter?: boolean }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      {withNewsletter ? <Newsletter /> : null}
      <Footer />
    </>
  );
}
