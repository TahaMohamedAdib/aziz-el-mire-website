'use client';

import { asset } from '@/lib/utils';

export default function ParallaxSection() {
  return (
    <section style={{ background: '#001D14' }}>
      <div className="malaga-feature">
        <div className="malaga-copy">
          <div style={{ maxWidth: '560px' }}>
            <h2>Atelier couture pour costumes masculins</h2>
            <p>
              Chaque pièce est pensée pour mettre en valeur la silhouette : coupe nette,
              matières choisies, finitions précises et détails personnalisés. Du costume
              classique à la veste de cérémonie, l&apos;approche reste la même : une allure
              distinguée, confortable et mémorable.
            </p>
          </div>
        </div>
        <div
          style={{
            minHeight: '420px',
            backgroundImage: `url(${asset('/aziz-media/instagram/veste-green-mannequin.jpg')})`,
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
