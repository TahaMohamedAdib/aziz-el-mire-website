import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero, SitePage } from '@/components/SitePage';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Costume sur mesure à Casablanca',
  description:
    'Service de costume sur mesure à Casablanca. Rendez-vous personnalisé, choix du tissu et coupe adaptée à votre morphologie.',
};

const steps = [
  ['01', 'Rendez-vous', "Définition de l'occasion, de la silhouette souhaitée et du niveau de personnalisation."],
  ['02', 'Mesures', 'Prise de mesures précise, choix du tissu, de la doublure et des finitions.'],
  ['03', 'Livraison', 'Essayage, ajustements et conseils pour porter la pièce avec justesse.'],
];

export default function SurMesurePage() {
  return (
    <SitePage>
      <PageHero eyebrow="Sur mesure" title="Un costume créé pour vous.">
        Un accompagnement calme et précis pour transformer une occasion en silhouette.
      </PageHero>
      <section className="section-pad" style={{ background: 'var(--color-linen)', paddingTop: 0 }}>
        <style>{`
          .sur-layout {
            align-items: center;
            display: grid;
            gap: 56px;
            grid-template-columns: 1fr 1fr;
          }
          .sur-steps {
            display: grid;
            gap: 18px;
            margin: 34px 0;
          }
          .sur-step {
            border-top: 1px solid rgba(201,169,110,0.42);
            padding-top: 18px;
          }
          @media (max-width: 840px) {
            .sur-layout { grid-template-columns: 1fr; }
          }
        `}</style>
        <div className="container-rc sur-layout">
          <div style={{ aspectRatio: '4 / 5', position: 'relative' }}>
            <Image src={asset('/aziz-media/ref-tailor-measuring-fabric.jpg')} alt="Prise de mesures costume sur mesure Casablanca" fill loading="lazy" sizes="(max-width: 840px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <p className="eyebrow">Atelier Sidi Maarouf</p>
            <h2 className="section-title">Du tissu au tombé final.</h2>
            <p className="body-large">
              Le sur mesure commence par une conversation: votre événement, votre confort, votre façon de bouger. L&apos;atelier ajuste ensuite chaque choix, du tissu à la doublure, pour composer un costume qui vous appartient vraiment.
            </p>
            <div className="sur-steps">
              {steps.map(([number, title, text]) => (
                <article key={title} className="sur-step">
                  <p className="eyebrow" style={{ marginBottom: 8 }}>{number}</p>
                  <h3 style={{ fontSize: 26, margin: '0 0 8px' }}>{title}</h3>
                  <p style={{ margin: 0 }}>{text}</p>
                </article>
              ))}
            </div>
            <Link className="btn btn-gold" href="/reservation">Réserver une séance de mesure</Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
