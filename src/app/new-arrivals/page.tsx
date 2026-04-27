import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import { PageHero, SitePage } from '@/components/SitePage';
import { newArrivals } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Nouveautés',
  description: 'Découvrez les nouveautés Aziz EL Mire Haute Couture.',
};

export default function NewArrivalsPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Nouveautés" title="Dernières pièces">
        Les dernières pièces premium ajoutées à la collection.
      </PageHero>
      <ProductGrid products={newArrivals} />
    </SitePage>
  );
}
