import { products } from '@/lib/catalog';
import LegacyRedirect from './redirect';

export function generateStaticParams() {
  return products.flatMap((p) =>
    [p.slug, ...(p.aliases ?? [])].map((slug) => ({ slug }))
  );
}

export default function LegacyProductPage({
  params,
}: {
  params: { slug: string };
}) {
  return <LegacyRedirect slug={params.slug} />;
}
