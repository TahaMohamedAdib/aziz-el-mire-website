import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/catalog';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="product-grid-section">
      <div className="container-rc product-grid">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
