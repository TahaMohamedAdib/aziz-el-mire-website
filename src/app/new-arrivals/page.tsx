import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionBrowser from '@/components/CollectionBrowser';
import { PageHero, SitePage } from '@/components/SitePage';
import { products } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Nouveautés',
  description: "Découvrez les dernières pièces Maison El Mire disponibles à Casablanca.",
};

export default function NewArrivalsPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Nouveautés" title="Dernières pièces">
        Une sélection récente de smokings, vestes et finitions pour composer une silhouette de cérémonie.
      </PageHero>
      <Suspense>
        <CollectionBrowser products={products} initialFilter="Tous" initialNewOnly />
      </Suspense>
    </SitePage>
  );
}
