import type { Metadata } from 'next';
import CollectionBrowser from '@/components/CollectionBrowser';
import { PageHero, SitePage } from '@/components/SitePage';
import { products, productCategories } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Toutes les collections Aziz EL Mire Haute Couture: costumes, vestes, pantalons, chemises et accessoires.',
};

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialFilter = category && [...productCategories, 'Nouveautés'].includes(category as never) ? category : 'Tous';

  return (
    <SitePage>
      <PageHero eyebrow="Collections" title="Toutes les pièces">
        Explorez les costumes, vestes, pantalons, chemises, accessoires et nouveautés de la maison.
      </PageHero>
      <CollectionBrowser products={products} initialFilter={initialFilter} />
    </SitePage>
  );
}
