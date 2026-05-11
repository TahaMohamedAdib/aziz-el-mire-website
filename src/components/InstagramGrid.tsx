'use client';

import Image from 'next/image';
import { INSTAGRAM_URL, lookbookImages } from '@/lib/catalog';

const posts = lookbookImages.slice(0, 12).map((imageSrc, i) => ({
  id: i + 1,
  imageSrc,
  alt: `Maison El Mire - inspiration costume - ${i + 1}`,
  href: INSTAGRAM_URL,
}));

export default function InstagramGrid() {
  return (
    <section className="instagram-grid-section">
      <div className="instagram-grid-inner">
        {posts.map((post) => (
          <a key={post.id} className="instagram-grid-tile" href={post.href} target="_blank" rel="noreferrer" aria-label={post.alt}>
            <Image
              src={post.imageSrc}
              alt={post.alt}
              fill
              loading="eager"
              sizes="(max-width: 767px) 50vw, 16.7vw"
              style={{ objectFit: 'cover' }}
            />
          </a>
        ))}
      </div>

      <div className="instagram-overlay">
        <div>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.3" style={{ marginBottom: '16px' }}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="white" />
          </svg>
          <h2>Entrez dans l&apos;univers<br />Maison El Mire.</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(248,245,240,0.72)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            @maison_elmire
          </a>
        </div>
      </div>
    </section>
  );
}
