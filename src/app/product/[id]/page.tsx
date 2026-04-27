import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { getProduct, getRelatedProducts, products, whatsappUrl } from '@/lib/catalog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return products.flatMap((product) => [product.slug, ...(product.aliases ?? [])].map((id) => ({ id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return {
    title: product ? product.name : 'Produit',
    description: product?.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: '#07100c', color: 'var(--ivory)', padding: '150px 20px 0' }}>
        <style>{`
          .product-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 58px; align-items: start; }
          .image-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .image-gallery > div:first-child { grid-column: span 2; }
          .info-list { display: grid; grid-template-columns: 150px 1fr; border-top: 1px solid rgba(183,154,85,0.18); }
          .info-list dt, .info-list dd { border-bottom: 1px solid rgba(183,154,85,0.18); margin: 0; padding: 16px 0; }
          .info-list dt { color: #b79a55; font-family: var(--font-montserrat); font-size: 12px; font-weight: 800; text-transform: uppercase; }
          .info-list dd { color: var(--ivory); }
          @media (max-width: 820px) {
            .product-detail { grid-template-columns: 1fr; }
            .info-list { grid-template-columns: 1fr; }
            .info-list dt { border-bottom: none; padding-bottom: 4px; }
            .info-list dd { padding-top: 0; }
          }
        `}</style>
        <div className="container-rc product-detail">
          <div className="image-gallery">
            {product.images.map((image, index) => (
              <div key={image} style={{ aspectRatio: index === 0 ? '4 / 5' : '1', background: '#101813', position: 'relative' }}>
                <Image src={image} alt={`${product.name} ${index + 1}`} fill priority={index === 0} sizes="(max-width: 820px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div>
            <p className="eyebrow">{product.category}</p>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(42px, 6vw, 76px)', lineHeight: 0.95, margin: '0 0 20px', textTransform: 'uppercase' }}>
              {product.name}
            </h1>
            <p style={{ color: '#b79a55', fontFamily: 'var(--font-montserrat)', fontSize: '14px', fontWeight: 800, margin: '0 0 26px', textTransform: 'uppercase' }}>
              {product.price || 'Prix sur demande'}
            </p>
            <p style={{ color: 'var(--grey)', fontSize: '17px', lineHeight: 1.9, margin: '0 0 34px' }}>{product.description}</p>

            <dl className="info-list">
              <dt>Couleurs</dt>
              <dd>{product.colors.join(', ')}</dd>
              <dt>Tailles</dt>
              <dd>{product.sizes.join(', ')}</dd>
              <dt>Tissu</dt>
              <dd>{product.fabric}</dd>
              <dt>Options</dt>
              <dd>{product.customization.join(', ')}</dd>
            </dl>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '34px' }}>
              <a className="btn btn-gold" href={whatsappUrl(product.whatsappMessage)} target="_blank" rel="noreferrer">
                Commander via WhatsApp
              </a>
              <Link className="btn btn-outline" href="/reservation">
                Réserver un rendez-vous
              </Link>
            </div>
          </div>
        </div>

        <section style={{ padding: '96px 0 0' }}>
          <div className="container-rc" style={{ textAlign: 'center' }}>
            <p className="eyebrow">Sélection</p>
            <h2 className="section-title">Produits associés</h2>
          </div>
          <ProductGrid products={getRelatedProducts(product)} />
        </section>
      </main>
      <Footer />
    </>
  );
}
