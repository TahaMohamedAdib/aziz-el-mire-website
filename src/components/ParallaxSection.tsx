'use client';

import { asset } from '@/lib/utils';

export default function ParallaxSection() {
  return (
    <section style={{ background: 'var(--color-emerald)' }}>
      <style>{`
        .malaga-feature { display: grid; grid-template-columns: 1fr 1fr; min-height: 505px; }
        .malaga-copy { padding: 92px 60px 80px; display: flex; align-items: center; }
        @media (max-width: 768px) {
          .malaga-feature { grid-template-columns: 1fr !important; }
          .malaga-copy { padding: 58px 28px !important; }
          .parallax-bg { background-attachment: scroll !important; }
        }
      `}</style>
      <div className="malaga-feature">
        <div className="malaga-copy">
          <div style={{ maxWidth: '580px' }}>
            <h2
              style={{
                color: 'var(--ivory)',
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                fontWeight: 700,
                margin: '0 0 24px',
                textTransform: 'capitalize',
              }}
            >
              Atelier couture pour costumes masculins
            </h2>
            <p
              style={{
                color: 'rgba(245,245,245,0.72)',
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Chaque pièce est pensée pour mettre en valeur la silhouette: coupe nette,
              matières choisies, finitions précises et détails personnalisés. Du costume
              classique à la veste de cérémonie, l’approche reste la même: une allure
              distinguée, confortable et mémorable.
            </p>
          </div>
        </div>
        <div
          className="parallax-bg"
          style={{
            minHeight: '505px',
            backgroundImage: `url(${asset('/aziz-media/costume5.webp')})`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </div>
    </section>
  );
}
