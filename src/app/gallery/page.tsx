import type { Metadata } from 'next';
import GalleryMasonry from '@/components/GalleryMasonry';
import { PageHero, SitePage } from '@/components/SitePage';
import { lookbookImages } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Lookbook Aziz EL Mire Haute Couture: costumes, smokings, details atelier et inspirations a Casablanca.',
};

export default function GalleryPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Galerie" title="Galerie">
        Une selection visuelle de costumes, vestes, details de doublure et gestes d&apos;atelier.
      </PageHero>
      <section style={{ background: 'var(--color-white)', padding: '0 0 96px' }}>
        <div className="container-rc">
          <GalleryMasonry images={lookbookImages} />
        </div>
      </section>
    </SitePage>
  );
}
