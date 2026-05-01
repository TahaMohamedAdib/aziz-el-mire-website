import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/catalog';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <style>{`
        .product-card {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(201,169,110,0.18);
          color: var(--color-dark);
          display: grid;
          isolation: isolate;
          min-width: 0;
          overflow: hidden;
          padding: 10px;
          position: relative;
          transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
        }
        .product-card::before {
          border: 1px solid rgba(201,169,110,0);
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
          transition: border-color 220ms ease, box-shadow 220ms ease, opacity 220ms ease;
          z-index: 4;
        }
        .product-card::after {
          background: linear-gradient(120deg, transparent 28%, rgba(255,237,187,0.34), transparent 52%);
          content: "";
          inset: -35%;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          transform: translateX(-45%) rotate(8deg);
          transition: opacity 220ms ease, transform 650ms ease;
          z-index: 3;
        }
        .product-card:hover,
        .product-card:focus-within {
          border-color: rgba(201,169,110,0.64);
          box-shadow: 0 18px 46px rgba(31,92,91,0.14), 0 0 18px rgba(201,169,110,0.24);
          transform: translateY(-4px);
        }
        .product-card:hover::before,
        .product-card:focus-within::before {
          border-color: rgba(201,169,110,0.92);
          box-shadow: inset 0 0 16px rgba(201,169,110,0.18), 0 0 12px rgba(201,169,110,0.34);
        }
        .product-card:hover::after,
        .product-card:focus-within::after {
          opacity: 1;
          transform: translateX(45%) rotate(8deg);
        }
        .product-card-image {
          aspect-ratio: 3 / 4;
          background: var(--color-linen);
          display: block;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        .product-card-image::after {
          background: linear-gradient(to top, rgba(31,92,91,0.66), transparent 54%);
          content: "";
          inset: 0;
          opacity: 0.7;
          position: absolute;
          transition: opacity 220ms ease;
          z-index: 1;
        }
        .product-card-image img {
          transition: filter var(--transition-image), transform var(--transition-image);
        }
        .product-card:hover .product-card-image::after,
        .product-card:focus-within .product-card-image::after {
          opacity: 0.92;
        }
        .product-card:hover .product-card-image img,
        .product-card:focus-within .product-card-image img {
          filter: saturate(1.08) contrast(1.05);
          transform: scale(1.045);
        }
        .product-card-cta {
          align-items: center;
          background: rgba(31,92,91,0.94);
          bottom: 16px;
          color: var(--color-ivory);
          display: inline-flex;
          font-size: 12px;
          font-weight: 600;
          gap: 10px;
          left: 16px;
          opacity: 0;
          padding: 12px 14px;
          position: absolute;
          right: auto;
          text-align: center;
          text-transform: uppercase;
          transform: translateY(10px);
          transition: opacity 200ms ease, transform 200ms ease;
          z-index: 2;
        }
        .product-card-cta::after {
          background: var(--color-gold);
          content: "";
          height: 1px;
          width: 26px;
        }
        .product-card:hover .product-card-cta,
        .product-card:focus-within .product-card-cta {
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
        .product-card-body {
          padding: 18px 6px 6px;
          position: relative;
          z-index: 2;
        }
        .product-card-meta {
          align-items: center;
          color: var(--color-gold);
          display: flex;
          flex-wrap: wrap;
          font-size: 10px;
          font-weight: 700;
          gap: 8px;
          letter-spacing: 1.4px;
          line-height: 1.3;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .product-card-meta span + span::before {
          content: "/";
          margin-right: 8px;
          opacity: 0.5;
        }
        .product-card-title {
          font-family: var(--font-serif);
          font-size: clamp(22px, 2vw, 28px);
          line-height: 1.15;
          margin: 0 0 10px;
        }
        .product-card-title a {
          transition: color 180ms ease;
        }
        .product-card:hover .product-card-title a,
        .product-card:focus-within .product-card-title a {
          color: var(--color-emerald);
        }
        .product-card-description {
          color: var(--color-gray);
          font-size: 13px;
          line-height: 1.65;
          margin: 0 0 18px;
          min-height: 44px;
        }
        .product-card-footer {
          align-items: center;
          border-top: 1px solid rgba(201,169,110,0.18);
          display: flex;
          justify-content: space-between;
          padding-top: 14px;
        }
        .product-card-price {
          color: var(--color-dark);
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }
        @media (hover: none) {
          .product-card-cta { display: none; }
          .product-card:hover,
          .product-card:focus-within {
            transform: none;
          }
        }
        @media (max-width: 620px) {
          .product-card {
            padding: 6px;
          }
          .product-card-image {
            aspect-ratio: 1 / 1.08;
          }
          .product-card-badge {
            font-size: 9px;
            left: 8px;
            padding: 5px 7px;
            top: 8px;
          }
          .product-card-body {
            padding: 12px 4px 4px;
          }
          .product-card-meta {
            font-size: 9px;
            gap: 5px;
            letter-spacing: 1px;
            margin-bottom: 7px;
          }
          .product-card-meta span + span::before {
            margin-right: 5px;
          }
          .product-card-title {
            font-size: clamp(18px, 5.4vw, 22px);
            margin-bottom: 8px;
          }
          .product-card-description {
            display: none;
            min-height: 0;
          }
          .product-card-footer {
            padding-top: 10px;
          }
          .product-card-price {
            font-size: 13px;
          }
        }
      `}</style>
      <Link href={`/product/${product.slug}`} className="product-card-image">
        {product.isNewArrival ? <span className="product-card-badge">Nouveau</span> : null}
        <Image
          src={product.images[0]}
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
