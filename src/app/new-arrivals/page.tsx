import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionBrowser from '@/components/CollectionBrowser';
import { PageHero, SitePage } from '@/components/SitePage';
import { newArrivals as staticNewArrivals, products as staticProducts } from '@/lib/catalog';
import { getNewArrivals, getProducts, toProduct } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Nouveautés',
  description: "Découvrez les dernières pièces Maison El Mire disponibles à Casablanca.",
};

export default async function NewArrivalsPage() {
  const [newArrivalsDb, allProductsDb] = await Promise.all([getNewArrivals(), getProducts()]);
  const hasNewArrivals = newArrivalsDb.length > 0;
  const hasDbProducts = allProductsDb.length > 0;
  const products = hasNewArrivals
    ? newArrivalsDb.map(toProduct)
    : hasDbProducts
      ? allProductsDb.map(toProduct)
      : (staticNewArrivals.length > 0 ? staticNewArrivals : staticProducts);

  return (
    <SitePage>
      <PageHero eyebrow="Nouveautés" title="Dernières pièces">
        Une sélection récente de smokings, vestes et finitions pour composer une silhouette de cérémonie.
      </PageHero>
      <Suspense>
        <CollectionBrowser products={products} initialFilter="Tous" initialNewOnly={hasNewArrivals} />
      </Suspense>
    </SitePage>
  );
}
