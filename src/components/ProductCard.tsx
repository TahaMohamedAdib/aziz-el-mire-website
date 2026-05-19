import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Product } from '@/lib/catalog';
import { asset } from '@/lib/utils';

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cardStyle = { '--product-card-delay': `${Math.min(index, 8) * 70}ms` } as CSSProperties;

  return (
    <article className="product-card" style={cardStyle}>
      <Link href={`/product/${product.slug}`} className="product-card-image">
        {product.isNewArrival ? <span className="product-card-badge">Nouveau</span> : null}
        <Image
          src={asset(product.images[0])}
          alt={`${product.name} Maison El Mire Casablanca`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <span className="product-card-cta">Voir la pièce</span>
      </Link>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span>{product.category}</span>
          <span>{product.collection}</span>
        </div>
        <h3 className="product-card-title">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card-description">{product.shortDescription}</p>
        <div className="product-card-footer">
          <p className="product-card-price">{product.price}</p>
        </div>
      </div>
    </article>
  );
}
