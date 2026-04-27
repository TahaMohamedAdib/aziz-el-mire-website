'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GalleryMasonry({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  const move = (direction: 1 | -1) => {
    setActive((value) => {
      if (value === null) return null;
      return (value + direction + images.length) % images.length;
    });
  };

  return (
    <>
      <style>{`
        .gallery-masonry {
          column-count: 3;
          column-gap: 12px;
        }
        .gallery-item {
          background: var(--color-linen);
          border: 0;
          cursor: zoom-in;
          display: block;
          margin: 0 0 12px;
          padding: 0;
          position: relative;
          width: 100%;
        }
        .gallery-item:nth-child(3n + 1) { aspect-ratio: 3 / 4; }
        .gallery-item:nth-child(3n + 2) { aspect-ratio: 1; }
        .gallery-item:nth-child(3n + 3) { aspect-ratio: 4 / 5; }
        .gallery-lightbox {
          align-items: center;
          background: rgba(0,0,0,0.88);
          display: flex;
          inset: 0;
          justify-content: center;
          padding: 26px;
          position: fixed;
          z-index: 10000;
        }
        .gallery-lightbox-image {
          height: min(86vh, 880px);
          position: relative;
          width: min(78vw, 900px);
        }
        .gallery-lightbox button {
          background: white;
          border: 0;
          color: var(--color-dark);
          cursor: pointer;
          min-height: 44px;
          min-width: 44px;
          position: absolute;
          z-index: 2;
        }
        .gallery-close { right: 22px; top: 22px; }
        .gallery-prev { left: 22px; top: 50%; }
        .gallery-next { right: 22px; top: 50%; }
        @media (max-width: 820px) {
          .gallery-masonry { column-count: 2; }
        }
      `}</style>
      <div className="gallery-masonry">
        {images.map((image, index) => (
          <button key={`${image}-${index}`} className="gallery-item" type="button" onClick={() => setActive(index)}>
            <Image src={image} alt={`Galerie Aziz EL Mire Casablanca ${index + 1}`} fill loading="lazy" sizes="(max-width: 820px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
      {active !== null ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true">
          <button className="gallery-close" type="button" onClick={() => setActive(null)} aria-label="Fermer">X</button>
          <button className="gallery-prev" type="button" onClick={() => move(-1)} aria-label="Image precedente">‹</button>
          <div className="gallery-lightbox-image">
            <Image src={images[active]} alt={`Galerie Aziz EL Mire image ${active + 1}`} fill sizes="85vw" style={{ objectFit: 'contain' }} />
          </div>
          <button className="gallery-next" type="button" onClick={() => move(1)} aria-label="Image suivante">›</button>
        </div>
      ) : null}
    </>
  );
}
