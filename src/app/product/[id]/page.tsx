import type { Metadata } from 'next';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import {
  getProduct as getStaticProduct,
  getRelatedProducts as getStaticRelatedProducts,
  products as staticProducts,
  whatsappUrl,
} from '@/lib/catalog';
import { getProductBySlug, getRelatedProducts, getProducts, toProduct } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const dbProducts = await getProducts();
  if (dbProducts.length > 0) {
    return dbProducts.flatMap((p) =>
      [p.slug, ...(p.aliases ?? [])].map((id) => ({ id }))
    );
  }
  // Fallback to static catalog during build if DB is unreachable
  return staticProducts.flatMap((p) => [p.slug, ...(p.aliases ?? [])].map((id) => ({ id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dbProduct = await getProductBySlug(id);
  const product = dbProduct ? toProduct(dbProduct) : getStaticProduct(id) ?? null;
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
  const dbProduct = await getProductBySlug(id);
  const product = dbProduct ? toProduct(dbProduct) : getStaticProduct(id);

  if (!product) notFound();

  const related = dbProduct
    ? (await getRelatedProducts(dbProduct)).map(toProduct)
    : getStaticRelatedProducts(product);

  return (
    <>
      <Header />
      <main id="main-content" style={{ background: 'var(--color-ivory)', padding: '122px 0 0' }}>
        <div className="container-rc product-detail">
          <ProductGallery images={product.images} name={product.name} />
          <div className="product-detail-info">
            <p className="eyebrow">Maison El Mire</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 400, lineHeight: 1, margin: '0 0 12px' }}>
              {product.name}
            </h1>
            <span className="category-pill">{product.category}</span>
            <p className="body-large" style={{ marginBottom: 20 }}>{product.description}</p>
            <p style={{ color: 'var(--color-dark)', fontSize: 19, margin: '0 0 16px' }}>{product.price || 'Sur demande'}</p>
            <p style={{ margin: '0 0 8px' }}><strong>Tissu:</strong> {product.fabric}</p>
            <div className="color-swatches" aria-label="Couleurs disponibles">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="color-swatch"
                  title={color}
                  style={{ background: color.toLowerCase().includes('noir') ? '#111' : color.toLowerCase().includes('bleu') ? '#1e3152' : color.toLowerCase().includes('gris') ? '#777' : color.toLowerCase().includes('bordeaux') ? '#5c1f2b' : color.toLowerCase().includes('vert') ? '#001D14' : '#f1eee6' }}
                />
              ))}
            </div>
            <p style={{ background: 'var(--color-linen)', margin: '0 0 20px', padding: 14 }}>
              Disponible en sur mesure - nous contacter pour les options de coupe, doublure et finitions.
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              <a className="btn btn-gold" href={whatsappUrl(product.whatsappMessage)} target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" /> Commander sur WhatsApp
              </a>
              <Link className="btn btn-outline" href="/reservation">Prendre rendez-vous</Link>
            </div>
            <div className="detail-accordion">
              <details>
                <summary>Composition</summary>
                <p>{product.fabric}. Options: {product.customization.join(', ')}.</p>
              </details>
              <details>
                <summary>Entretien</summary>
                <p>Nettoyage professionnel recommandé pour préserver le tombé, la couleur et les finitions.</p>
              </details>
              <details>
                <summary>Livraison</summary>
                <p>Disponible à l&apos;atelier de Sidi Maarouf, Casablanca. Délai confirmé lors du rendez-vous.</p>
              </details>
            </div>
          </div>
        </div>

        <section className="section-pad">
          <div className="container-rc">
            <h2 className="section-title">Vous aimerez aussi</h2>
            <div className="product-grid">
              {related.map((item, index) => (
                <ProductCard key={item.slug} product={item} index={index} />
              ))}
            </div>
          </div>
        </section>
        <div className="mobile-product-bar">
          <a className="btn btn-gold" href={whatsappUrl(product.whatsappMessage)} target="_blank" rel="noreferrer">
            <FaWhatsapp aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
