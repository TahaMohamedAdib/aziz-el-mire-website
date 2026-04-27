import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionBrowser from '@/components/CollectionBrowser';
import { PageHero, SitePage } from '@/components/SitePage';
import { products } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Toutes les collections Aziz EL Mire Haute Couture: costumes, vestes, pantalons, chemises et accessoires.',
};

export default function CollectionsPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Collections" title="Toutes les pièces">
        Explorez les costumes, vestes, pantalons, chemises, accessoires et nouveautés de la maison.
      </PageHero>
      <Suspense>
        <CollectionBrowser products={products} initialFilter="Tous" />
      </Suspense>
    </SitePage>
  );
}
