import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionBrowser from '@/components/CollectionBrowser';
import { PageHero, SitePage } from '@/components/SitePage';
import { getProducts, toProduct } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Collections - Costumes et smokings homme',
  description:
    "Explorez notre collection de costumes, smokings, vestes et pantalons homme. Pièces d'exception disponibles à Casablanca.",
};

export default async function CollectionsPage() {
  const dbProducts = await getProducts();
  const products = dbProducts.map(toProduct);

  return (
    <SitePage>
      <PageHero eyebrow="Collections" title="Costumes et smokings homme">
        Explorez les smokings, costumes, vestes, pantalons, chemises et accessoires de Maison El Mire.
      </PageHero>
      <Suspense>
        <CollectionBrowser products={products} initialFilter="Tous" />
      </Suspense>
    </SitePage>
  );
}
