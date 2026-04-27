import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionBrowser from '@/components/CollectionBrowser';
import { PageHero, SitePage } from '@/components/SitePage';
import { products } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Nouveautes',
  description: "Decouvrez les dernieres pieces Aziz EL Mire Haute Couture disponibles a Casablanca.",
};

export default function NewArrivalsPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Nouveautes" title="Dernieres pieces">
        Une selection recente de smokings, vestes et finitions pour composer une silhouette de ceremonie.
      </PageHero>
      <Suspense>
        <CollectionBrowser products={products} initialFilter="Tous" initialNewOnly />
      </Suspense>
    </SitePage>
  );
}
