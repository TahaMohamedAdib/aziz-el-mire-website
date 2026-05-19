'use client';

import { useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/utils';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div className="product-gallery">
      <button
        type="button"
        className="product-gallery-main"
        onClick={() => setLightbox(true)}
        aria-label="Agrandir l'image du produit"
      >
        <Image
          src={asset(images[active])}
          alt={`${name} Maison El Mire Casablanca`}
          fill
          priority
          sizes="(max-width: 820px) 100vw, 55vw"
          style={{ objectFit: 'cover' }}
        />
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
            <Image
              src={asset(image)}
              alt={`${name} détail ${index + 1}`}
              fill
              loading="lazy"
              sizes="80px"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      {lightbox ? (
        <div className="product-lightbox" role="dialog" aria-modal="true">
          <button
            type="button"
            className="product-lightbox-close"
            onClick={() => setLightbox(false)}
            aria-label="Fermer"
          >
            ✕
          </button>
          <div className="product-lightbox-image">
            <Image
              src={asset(images[active])}
              alt={`${name} agrandi`}
              fill
              sizes="80vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
