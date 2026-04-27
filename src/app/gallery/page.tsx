import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero, SitePage } from '@/components/SitePage';
import { lookbookImages } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Lookbook Aziz EL Mire Haute Couture.',
};

export default function GalleryPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Lookbook" title="Galerie">
        Looks de cérémonie, détails de tissus, gestes d’atelier et inspirations élégantes pour mariages, réceptions et événements professionnels.
      </PageHero>
      <section style={{ background: '#07100c', padding: '30px 0 96px' }}>
        <style>{`
          .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
          .gallery-grid div:nth-child(5n + 1) { grid-column: span 2; grid-row: span 2; }
          @media (max-width: 820px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        `}</style>
        <div className="gallery-grid">
          {lookbookImages.map((image, index) => (
            <div key={`${image}-${index}`} style={{ aspectRatio: '1', position: 'relative' }}>
              <Image src={image} alt={`Lookbook Aziz EL Mire ${index + 1}`} fill sizes="(max-width: 820px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
