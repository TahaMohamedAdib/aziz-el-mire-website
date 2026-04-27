import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/catalog';
import { whatsappUrl } from '@/lib/catalog';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article style={{ background: '#050706', border: '1px solid rgba(183,154,85,0.14)', boxShadow: 'inset 0 1px 0 rgba(122,30,30,0.18)', color: 'var(--ivory)', overflow: 'hidden' }}>
      <Link href={`/product/${product.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', aspectRatio: '4 / 5', background: '#101813' }}>
          <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
          {product.isNewArrival ? (
            <span style={{ background: '#b79a55', color: '#050706', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, left: '16px', padding: '8px 10px', position: 'absolute', textTransform: 'uppercase', top: '16px' }}>
              Nouveauté
            </span>
          ) : null}
        </div>
      </Link>
      <div style={{ padding: '26px 26px 30px' }}>
        <p style={{ color: '#b79a55', fontFamily: 'var(--font-mono)', fontSize: '11px', margin: '0 0 10px', textTransform: 'uppercase' }}>
          {product.category}
        </p>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', margin: '0 0 12px', textTransform: 'uppercase' }}>
          <Link href={`/product/${product.slug}`} style={{ color: 'var(--ivory)' }}>
            {product.name}
          </Link>
        </h3>
        <p style={{ color: '#b8ad96', fontSize: '15px', lineHeight: 1.6, margin: '0 0 16px' }}>{product.shortDescription}</p>
        <p style={{ color: 'var(--ivory)', fontFamily: 'var(--font-mono)', fontSize: '12px', margin: '0 0 20px', textTransform: 'uppercase' }}>
          {product.price}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Link className="btn btn-gold" href={`/product/${product.slug}`}>
            Voir détails
          </Link>
          <a className="btn btn-outline" href={whatsappUrl(product.whatsappMessage)} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
