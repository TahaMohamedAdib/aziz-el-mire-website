'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/catalog';
import { productCategories } from '@/lib/catalog';

const filters = ['Tous', ...productCategories] as const;
type SortMode = 'Nouveautes' | 'Prix croissant' | 'Prix decroissant';

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
  const [sortMode, setSortMode] = useState<SortMode>('Nouveautes');

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) => {
      const categoryMatch = activeFilter === 'Tous' || product.category === activeFilter;
      const newMatch = !newOnly || product.isNewArrival;
      return categoryMatch && newMatch;
    });

    return [...next].sort((a, b) => {
      if (sortMode === 'Prix croissant') return priceValue(a.price) - priceValue(b.price);
      if (sortMode === 'Prix decroissant') return priceValue(b.price) - priceValue(a.price);
      return Number(b.isNewArrival) - Number(a.isNewArrival);
    });
  }, [activeFilter, newOnly, products, sortMode]);

  return (
    <section style={{ background: 'var(--color-ivory)', padding: '0 0 100px' }}>
      <style>{`
        .filter-bar {
          background: rgba(248,245,240,0.96);
          border-bottom: 1px solid var(--color-linen);
          border-top: 1px solid var(--color-linen);
          margin-bottom: 48px;
          position: sticky;
          top: 72px;
          z-index: 20;
        }
        .filter-inner {
          align-items: center;
          display: flex;
          gap: 12px;
          justify-content: space-between;
          padding-bottom: 14px;
          padding-top: 14px;
        }
        .filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .filter-pill {
          background: transparent;
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          min-height: 38px;
          padding: 0 14px;
          text-transform: uppercase;
        }
        .filter-pill.is-active {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: white;
        }
        .sort-select {
          background: white;
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          min-height: 38px;
          padding: 0 12px;
        }
        @media (max-width: 760px) {
          .filter-bar { top: 72px; }
          .filter-inner { align-items: stretch; flex-direction: column; }
          .filter-pills { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; }
          .filter-pill { flex: 0 0 auto; }
        }
      `}</style>
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
          <select className="sort-select" value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} aria-label="Trier les produits">
            <option>Nouveautes</option>
            <option>Prix croissant</option>
            <option>Prix decroissant</option>
          </select>
        </div>
      </div>
      <div className="container-rc">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
