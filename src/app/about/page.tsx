import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero, SitePage } from '@/components/SitePage';
import { BRAND_OFFER, BRAND_SIGNATURE, BRAND_TAGLINE } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez la maison Aziz EL Mire Haute Couture.',
};

export default function AboutPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Histoire de la maison" title="À propos">
        {BRAND_TAGLINE}. {BRAND_OFFER}. {BRAND_SIGNATURE}.
      </PageHero>
      <section style={{ background: '#07100c', padding: '78px 20px 110px' }}>
        <style>{`
          .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 54px; align-items: center; }
          @media (max-width: 820px) { .about-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="container-rc about-grid">
          <div style={{ position: 'relative', aspectRatio: '4 / 5', background: '#101813' }}>
            <Image src="/aziz-media/costume4.webp" alt="Atelier tailoring Aziz EL Mire" fill sizes="(max-width: 820px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div>
            {[
              ['Savoir-faire', 'Nous accordons une attention particulière au choix des tissus, à la précision des coupes et à la qualité des finitions afin d’offrir à chaque client une pièce unique, adaptée à son style et à sa morphologie.'],
              ['Vision', 'Créer une garde-robe masculine raffinée, moderne et intemporelle, pensée pour les cérémonies, les événements professionnels et les moments personnels importants.'],
              ['Qualité', 'Chaque costume, veste, pantalon, chemise ou accessoire est travaillé avec une exigence de confort, de tenue et de présence.'],
            ].map(([title, text]) => (
              <article key={title} style={{ borderBottom: '1px solid rgba(183,154,85,0.16)', padding: '0 0 26px', marginBottom: '26px' }}>
                <p className="eyebrow">{title}</p>
                <p style={{ color: 'var(--grey)', fontSize: '17px', lineHeight: 1.9, margin: 0 }}>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}
