import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/catalog';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section style={{ background: '#07100c', padding: '70px 20px 100px' }}>
      <style>{`
        .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        @media (max-width: 900px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 620px) { .product-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="container-rc product-grid">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
