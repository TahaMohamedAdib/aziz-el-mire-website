'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/catalog';
import { productCategories } from '@/lib/catalog';

const filters = ['Tous', ...productCategories, 'Nouveautés'] as const;

export default function CollectionBrowser({ products, initialFilter = 'Tous' }: { products: Product[]; initialFilter?: string }) {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && filters.includes(category as never)) {
      setActiveFilter(category);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'Tous') return products;
    if (activeFilter === 'Nouveautés') return products.filter((product) => product.isNewArrival);
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter, products]);

  return (
    <section style={{ background: '#07100c', padding: '48px 20px 100px' }}>
      <style>{`
        .filter-row { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 46px; }
        .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        @media (max-width: 900px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 620px) { .product-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="container-rc">
        <div className="filter-row" role="tablist" aria-label="Filtres produits">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'btn btn-gold' : 'btn btn-outline'}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
