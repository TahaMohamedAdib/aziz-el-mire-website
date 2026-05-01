'use client';

import Image from 'next/image';
import { INSTAGRAM_URL, lookbookImages } from '@/lib/catalog';

const posts = lookbookImages.slice(0, 12).map((imageSrc, i) => ({
  id: i + 1,
  imageSrc,
  alt: `Maison El Mire - inspiration costume - ${i + 1}`,
  href: INSTAGRAM_URL,
}));

function InstagramTile({ post }: { post: (typeof posts)[number] }) {
  return (
    <a href={post.href} style={{ display: 'block', overflow: 'hidden', aspectRatio: '1', position: 'relative' }}>
      <Image
        src={post.imageSrc}
        alt={post.alt}
        fill
        loading="eager"
        sizes="(max-width: 767px) 50vw, 16.7vw"
        style={{ objectFit: 'cover', transition: 'transform 300ms ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
    </a>
  );
}

export default function InstagramGrid() {
  return (
    <section style={{ position: 'relative', backgroundColor: 'var(--color-emerald)' }}>
      <style>{`
        .instagram-grid-inner { display: grid; grid-template-columns: repeat(6, 1fr); }
        .instagram-overlay {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 33.333%;
          min-height: 50%;
        }
        @media (max-width: 767px) {
          .instagram-grid-inner { grid-template-columns: repeat(2, 1fr) !important; }
          .instagram-overlay {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            width: 100% !important;
            min-height: 250px !important;
          }
        }
      `}</style>

      <div className="instagram-grid-inner">
        {posts.map((post) => <InstagramTile key={post.id} post={post} />)}
      </div>

      <div
        className="instagram-overlay"
        style={{
          background: 'var(--color-emerald-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'var(--ivory)',
          padding: '30px',
          zIndex: 2,
        }}
      >
        <div>
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" style={{ marginBottom: '20px' }}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="white" />
          </svg>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, lineHeight: 1.15, margin: '0 0 14px', textTransform: 'uppercase' }}>
            Entrez dans l’univers<br />Maison El Mire.
          </h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ivory)', textTransform: 'uppercase' }}>
            @maison_elmire
          </a>
        </div>
      </div>
    </section>
  );
}
