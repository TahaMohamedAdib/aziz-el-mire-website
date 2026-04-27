'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div>
      <style>{`
        .product-gallery-main {
          aspect-ratio: 4 / 5;
          background: var(--color-linen);
          cursor: zoom-in;
          position: relative;
        }
        .product-thumbs {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(5, 1fr);
          margin-top: 12px;
        }
        .product-thumb {
          aspect-ratio: 1;
          background: var(--color-linen);
          border: 1px solid transparent;
          cursor: pointer;
          overflow: hidden;
          padding: 0;
          position: relative;
        }
        .product-thumb.is-active {
          border-color: var(--color-gold);
        }
        .product-lightbox {
          align-items: center;
          background: rgba(0,0,0,0.86);
          display: flex;
          inset: 0;
          justify-content: center;
          padding: 28px;
          position: fixed;
          z-index: 10000;
        }
        .product-lightbox button {
          background: white;
          border: 0;
          color: var(--color-dark);
          cursor: pointer;
          height: 44px;
          position: absolute;
          right: 22px;
          top: 22px;
          width: 44px;
        }
        .product-lightbox-image {
          height: min(90vh, 900px);
          position: relative;
          width: min(72vw, 760px);
        }
        @media (max-width: 760px) {
          .product-thumbs {
            display: flex;
            overflow-x: auto;
          }
          .product-thumb {
            flex: 0 0 74px;
          }
        }
      `}</style>
      <button type="button" className="product-gallery-main" onClick={() => setLightbox(true)} aria-label="Agrandir l'image produit">
        <Image src={images[active]} alt={`${name} Aziz EL Mire Casablanca`} fill priority sizes="(max-width: 820px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
      </button>
      <div className="product-thumbs">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={image}
            type="button"
            className={`product-thumb ${active === index ? 'is-active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Voir image ${index + 1}`}
          >
            <Image src={image} alt={`${name} detail ${index + 1}`} fill loading="lazy" sizes="80px" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
      {lightbox ? (
        <div className="product-lightbox" role="dialog" aria-modal="true">
          <button type="button" onClick={() => setLightbox(false)} aria-label="Fermer">
            X
          </button>
          <div className="product-lightbox-image">
            <Image src={images[active]} alt={`${name} agrandi`} fill sizes="80vw" style={{ objectFit: 'contain' }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
