import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionBrowser from '@/components/CollectionBrowser';
import { PageHero, SitePage } from '@/components/SitePage';
import { products } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Collections - Costumes & Smokings Homme',
  description:
    "Explorez notre collection de costumes, smokings, vestes et pantalons homme. Pieces d'exception disponibles a Casablanca.",
};

export default function CollectionsPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Collections" title="Costumes & Smokings Homme">
        Explorez les smokings, costumes, vestes, pantalons, chemises et accessoires de la maison Aziz EL Mire.
      </PageHero>
      <Suspense>
        <CollectionBrowser products={products} initialFilter="Tous" />
      </Suspense>
    </SitePage>
  );
}
