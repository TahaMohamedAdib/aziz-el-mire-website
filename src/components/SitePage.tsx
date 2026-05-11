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
    <div style={{ margin: align === 'center' ? '0 auto 46px' : '0 0 34px', maxWidth: '720px', textAlign: align }}>
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
  titleColor?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container-rc">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="body-large" style={{ margin: '0 auto', maxWidth: '700px' }}>
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
