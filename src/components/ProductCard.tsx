import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/catalog';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <style>{`
        .product-card {
          background: transparent;
          color: var(--color-dark);
          min-width: 0;
        }
        .product-card-image {
          aspect-ratio: 3 / 4;
          background: var(--color-linen);
          display: block;
          overflow: hidden;
          position: relative;
        }
        .product-card-image img {
          transition: transform var(--transition-image);
        }
        .product-card:hover .product-card-image img {
          transform: scale(1.03);
        }
        .product-card-cta {
          background: rgba(26,26,26,0.72);
          bottom: 0;
          color: white;
          font-size: 12px;
          font-weight: 600;
          left: 0;
          opacity: 0;
          padding: 14px 18px;
          position: absolute;
          right: 0;
          text-align: center;
          text-transform: uppercase;
          transform: translateY(8px);
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .product-card:hover .product-card-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .product-card-badge {
          background: var(--color-gold);
          color: white;
          font-size: 10px;
          font-weight: 600;
          left: 12px;
          padding: 7px 9px;
          position: absolute;
          text-transform: uppercase;
          top: 12px;
          z-index: 2;
        }
        .product-card-title {
          font-family: var(--font-serif);
          font-size: 20px;
          line-height: 1.15;
          margin: 16px 0 5px;
        }
        .product-card-price {
          color: var(--color-gray);
          font-size: 14px;
          margin: 0;
        }
        @media (hover: none) {
          .product-card-cta { display: none; }
        }
      `}</style>
      <Link href={`/product/${product.slug}`} className="product-card-image">
        {product.isNewArrival ? <span className="product-card-badge">Nouveau</span> : null}
        <Image
          src={product.images[0]}
          alt={`${product.name} Aziz EL Mire Casablanca`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <span className="product-card-cta">Voir la piece</span>
      </Link>
      <h3 className="product-card-title">
        <Link href={`/product/${product.slug}`}>{product.name}</Link>
      </h3>
      <p className="product-card-price">{product.price}</p>
    </article>
  );
}
