'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/catalog';
import { productCategories } from '@/lib/catalog';

const filters = ['Tous', ...productCategories] as const;
type SortMode = 'Nouveautés' | 'Prix croissant' | 'Prix décroissant';

function priceValue(price: string) {
  const value = Number(price.replace(/[^\d]/g, ''));
  return Number.isFinite(value) && value > 0 ? value : Number.POSITIVE_INFINITY;
}

export default function CollectionBrowser({
  products,
  initialFilter = 'Tous',
  initialNewOnly = false,
}: {
  products: Product[];
  initialFilter?: string;
  initialNewOnly?: boolean;
}) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const initialUrlFilter = categoryParam && filters.includes(categoryParam as never) ? categoryParam : initialFilter;
  const [activeFilter, setActiveFilter] = useState(initialUrlFilter);
  const [newOnly, setNewOnly] = useState(initialNewOnly || searchParams.get('tag') === 'nouveau');
  const [sortMode, setSortMode] = useState<SortMode>('Nouveautés');

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) => {
      const categoryMatch = activeFilter === 'Tous' || product.category === activeFilter;
      const newMatch = !newOnly || product.isNewArrival;
      return categoryMatch && newMatch;
    });

    return [...next].sort((a, b) => {
      if (sortMode === 'Prix croissant') return priceValue(a.price) - priceValue(b.price);
      if (sortMode === 'Prix décroissant') return priceValue(b.price) - priceValue(a.price);
      return Number(b.isNewArrival) - Number(a.isNewArrival);
    });
  }, [activeFilter, newOnly, products, sortMode]);

  return (
    <section className="collection-browser-section">
      <div className="filter-bar">
        <div className="container-rc filter-inner">
          <div className="filter-pills" role="tablist" aria-label="Filtres produits">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-pill ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
            <button
              type="button"
              className={`filter-pill ${newOnly ? 'is-active' : ''}`}
              onClick={() => setNewOnly((value) => !value)}
              aria-pressed={newOnly}
            >
              Nouveau
            </button>
          </div>
          <select
            className="sort-select"
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
            aria-label="Trier les produits"
          >
            <option>Nouveautés</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
          </select>
        </div>
      </div>
      <div className="container-rc">
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
