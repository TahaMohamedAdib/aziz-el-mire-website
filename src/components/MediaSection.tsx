import Image from 'next/image';
import { asset } from '@/lib/utils';

const mediaItems = [
  {
    id: 1,
    day: '01',
    month: 'LOOK',
    channel: 'Costumes signature',
    title: 'Des coupes élégantes pour le quotidien, les rendez-vous et les occasions importantes.',
    image: asset('/aziz-media/instagram/costume-grey-boutique.jpg'),
  },
  {
    id: 2,
    day: '02',
    month: 'FIT',
    channel: 'Sur mesure',
    title: 'Un accompagnement personnalisé pour choisir la coupe, le tissu et les finitions.',
    image: asset('/aziz-media/instagram/veste-blue-mannequin.jpg'),
  },
  {
    id: 3,
    day: '03',
    month: 'EVENT',
    channel: 'Cérémonie',
    title: 'Costumes de mariage, vestes habillées et pièces fortes pour vos grands événements.',
    image: asset('/aziz-media/instagram/costume-black-tuxedo-front.jpg'),
  },
];

export default function MediaSection() {
  return (
    <section className="media-section">
      <div className="container-rc">
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>Le vestiaire</p>
          <h2 style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 400, margin: '0 0 14px' }}>
            L&apos;art du costume sur mesure
          </h2>
          <div style={{ width: '36px', height: '1px', background: 'rgba(161,98,7,0.6)', margin: '0 auto 18px' }} />
          <p style={{ color: 'rgba(248,245,240,0.6)', margin: 0, fontSize: '15px' }}>
            Une garde-robe masculine pensée avec précision, sobriété et caractère.
          </p>
        </div>

        <div className="media-card-grid">
          {mediaItems.map((item) => (
            <a key={item.id} className="media-card" href="/collections">
              <div className="media-card-image">
                <Image src={item.image} alt={item.channel} fill loading="eager" sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '22px', top: '22px', width: '44px', textAlign: 'center', zIndex: 1 }}>
                  <div style={{ background: '#001D14', color: 'var(--color-ivory)', fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400, padding: '7px 0' }}>{item.day}</div>
                  <div style={{ background: 'var(--color-ivory)', color: '#001D14', fontFamily: 'var(--font-sans)', fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', padding: '6px 0' }}>{item.month}</div>
                </div>
              </div>
              <div className="media-card-body">
                <h3>{item.channel}</h3>
                <p>{item.title}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/collections" className="btn btn-outline-dark">
            Voir les costumes
          </a>
        </div>
      </div>
    </section>
  );
}
