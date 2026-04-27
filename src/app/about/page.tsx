import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero, SitePage } from '@/components/SitePage';

export const metadata: Metadata = {
  title: 'La Maison Aziz EL Mire - Haute couture masculine Casablanca',
  description:
    "Decouvrez l'histoire et la vision d'Aziz EL Mire, maison de couture masculine basee a Casablanca, specialisee en costumes d'exception.",
};

export default function AboutPage() {
  return (
    <SitePage>
      <PageHero eyebrow="La Maison" title="Aziz EL Mire">
        Haute couture masculine a Sidi Maarouf, Casablanca.
      </PageHero>
      <section className="section-pad" style={{ background: 'var(--color-ivory)', paddingTop: 0 }}>
        <style>{`
          .about-layout {
            align-items: center;
            display: grid;
            gap: 56px;
            grid-template-columns: 0.9fr 1.1fr;
          }
          .timeline {
            display: grid;
            gap: 18px;
            margin-top: 34px;
          }
          .timeline article {
            border-top: 1px solid var(--color-linen);
            padding-top: 18px;
          }
          @media (max-width: 840px) {
            .about-layout { grid-template-columns: 1fr; }
          }
        `}</style>
        <div className="container-rc about-layout">
          <div style={{ aspectRatio: '4 / 5', position: 'relative' }}>
            <Image src="/aziz-media/instagram/atelier-boutique-window.jpg" alt="Portrait atelier Aziz EL Mire Casablanca" fill loading="lazy" sizes="(max-width: 840px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <p className="eyebrow">Histoire</p>
            <h2 className="section-title">Une elegance masculine, mesuree a Casablanca.</h2>
            <p className="body-large">
              Aziz EL Mire Haute Couture defend une approche sobre et precise du vetement masculin. La maison accompagne les clients dans les moments ou l&apos;allure compte: mariage, gala, reception, rendez-vous professionnel ou ceremonie familiale. Chaque costume cherche la bonne proportion, le bon tissu, le detail juste.
            </p>
            <div className="timeline">
              {[
                ['Origine', 'Une maison ancree a Sidi Maarouf, proche de ses clients et de leurs occasions.'],
                ['Savoir-faire', 'Une attention constante aux coupes, aux doublures et aux finitions visibles de pres.'],
                ['Vision', 'Composer une garde-robe masculine moderne, elegante et durable.'],
              ].map(([title, text]) => (
                <article key={title}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>{title}</p>
                  <p style={{ margin: 0 }}>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
