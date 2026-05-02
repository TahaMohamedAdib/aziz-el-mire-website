import Image from 'next/image';

const BASE = process.env.NODE_ENV === 'production' ? '/aziz-el-mire-website' : '';

const mediaItems = [
  {
    id: 1,
    day: '01',
    month: 'LOOK',
    channel: 'Costumes signature',
    title: 'Des coupes élégantes pour le quotidien, les rendez-vous et les occasions importantes.',
    image: `${BASE}/aziz-media/costume1.webp`,
  },
  {
    id: 2,
    day: '02',
    month: 'FIT',
    channel: 'Sur mesure',
    title: 'Un accompagnement personnalisé pour choisir la coupe, le tissu et les finitions.',
    image: `${BASE}/aziz-media/costume4.webp`,
  },
  {
    id: 3,
    day: '03',
    month: 'EVENT',
    channel: 'Cérémonie',
    title: 'Costumes de mariage, vestes habillées et pièces fortes pour vos grands événements.',
    image: `${BASE}/aziz-media/costume7.webp`,
  },
];

export default function MediaSection() {
  return (
    <section style={{ width: '100%', background: '#001a10', padding: '92px 12px 96px' }}>
      <style>{`
        .media-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .media-card-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div className="container-rc">
        <div style={{ textAlign: 'center', marginBottom: '68px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(26px, 3vw, 34px)',
              textTransform: 'uppercase',
              color: 'var(--ivory)',
              margin: '0 0 16px',
              fontWeight: 700,
            }}
          >
            L’art du costume sur mesure
          </h2>
          <div style={{ width: '50px', height: '3px', background: 'var(--ivory)', margin: '0 auto 24px' }} />
          <p style={{ color: '#b8ad96', margin: 0, fontFamily: 'var(--font-sans)' }}>
            Une garde-robe masculine pensée avec précision, sobriété et caractère.
          </p>
        </div>

        <div className="media-card-grid">
          {mediaItems.map((item) => (
            <a key={item.id} href="/collections" style={{ display: 'block', background: '#050706', textDecoration: 'none', overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '1.72 / 1', overflow: 'hidden' }}>
                <Image src={item.image} alt={item.channel} fill loading="eager" sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '36px', top: '36px', width: '56px', textAlign: 'center' }}>
                  <div style={{ background: '#001a10', color: 'var(--ivory)', fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, padding: '9px 0' }}>{item.day}</div>
                  <div style={{ background: 'var(--ivory)', color: '#001a10', fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '8px 0' }}>{item.month}</div>
                </div>
              </div>

              <div style={{ padding: '46px 48px 52px', minHeight: '190px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--ivory)',
                    margin: '0 0 20px',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.channel}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#b8ad96', margin: 0, lineHeight: 1.6 }}>
                  {item.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a
            href="/collections"
            style={{
              display: 'inline-block',
              background: 'var(--ivory)',
              borderRadius: '4px',
              color: '#001a10',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              padding: '18px 42px',
              textTransform: 'uppercase',
            }}
          >
            Voir les costumes
          </a>
        </div>
      </div>
    </section>
  );
}
