import type { Metadata } from 'next';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import { getProduct, getRelatedProducts, products, whatsappUrl } from '@/lib/catalog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

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
      <main id="main-content" style={{ background: 'var(--color-ivory)', padding: '140px 0 0' }}>
        <style>{`
          .product-detail {
            align-items: start;
            display: grid;
            gap: 58px;
            grid-template-columns: 55fr 45fr;
          }
          .category-pill {
            border: 1px solid var(--color-gold);
            color: var(--color-gold);
            display: inline-flex;
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 24px;
            padding: 7px 10px;
            text-transform: uppercase;
          }
          .color-swatches {
            display: flex;
            gap: 8px;
            margin: 8px 0 22px;
          }
          .color-swatch {
            border: 1px solid rgba(26,26,26,0.18);
            border-radius: 999px;
            height: 22px;
            width: 22px;
          }
          .detail-accordion {
            border-top: 1px solid var(--color-linen);
            margin-top: 28px;
          }
          .detail-accordion details {
            border-bottom: 1px solid var(--color-linen);
            padding: 16px 0;
          }
          .detail-accordion summary {
            color: var(--color-dark);
            cursor: pointer;
            font-weight: 600;
            text-transform: uppercase;
          }
          .mobile-product-bar {
            display: none;
          }
          @media (max-width: 860px) {
            .product-detail { grid-template-columns: 1fr; }
            .mobile-product-bar {
              background: var(--color-white);
              border-top: 1px solid var(--color-linen);
              bottom: 0;
              display: block;
              left: 0;
              padding: 10px 14px;
              position: sticky;
              right: 0;
              z-index: 40;
            }
            .mobile-product-bar .btn { width: 100%; }
          }
        `}</style>
        <div className="container-rc product-detail">
          <ProductGallery images={product.images} name={product.name} />
          <div>
            <p className="eyebrow">Aziz EL Mire Haute Couture</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 5vw, 58px)', fontWeight: 400, lineHeight: 1, margin: '0 0 14px' }}>
              {product.name}
            </h1>
            <span className="category-pill">{product.category}</span>
            <p className="body-large" style={{ marginBottom: 26 }}>{product.description}</p>
            <p style={{ color: 'var(--color-dark)', fontSize: 22, margin: '0 0 20px' }}>{product.price || 'Sur demande'}</p>
            <p style={{ margin: '0 0 8px' }}><strong>Tissu:</strong> {product.fabric}</p>
            <div className="color-swatches" aria-label="Couleurs disponibles">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="color-swatch"
                  title={color}
                  style={{ background: color.toLowerCase().includes('noir') ? '#111' : color.toLowerCase().includes('bleu') ? '#1e3152' : color.toLowerCase().includes('gris') ? '#777' : color.toLowerCase().includes('bordeaux') ? '#5c1f2b' : color.toLowerCase().includes('vert') ? '#233b2d' : '#f1eee6' }}
                />
              ))}
            </div>
            <p style={{ background: 'var(--color-linen)', margin: '0 0 24px', padding: 16 }}>
              Disponible en sur mesure - nous contacter pour les options de coupe, doublure et finitions.
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              <a className="btn btn-gold" href={whatsappUrl(product.whatsappMessage)} target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" /> Commander via WhatsApp
              </a>
              <Link className="btn btn-outline" href="/contact">Prendre rendez-vous</Link>
            </div>
            <div className="detail-accordion">
              <details>
                <summary>Composition</summary>
                <p>{product.fabric}. Options: {product.customization.join(', ')}.</p>
              </details>
              <details>
                <summary>Entretien</summary>
                <p>Nettoyage professionnel recommande pour preserver le tombe, la couleur et les finitions.</p>
              </details>
              <details>
                <summary>Livraison</summary>
                <p>Disponible a l&apos;atelier de Sidi Maarouf, Casablanca. Delai confirme lors du rendez-vous.</p>
              </details>
            </div>
          </div>
        </div>

        <section className="section-pad">
          <div className="container-rc">
            <h2 className="section-title">Vous aimerez aussi</h2>
            <div className="product-grid">
              {getRelatedProducts(product).map((item) => (
                <ProductCard key={item.slug} product={item} />
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
