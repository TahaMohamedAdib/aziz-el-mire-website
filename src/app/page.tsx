import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FabricStorySection from '@/components/FabricStorySection';
import ProductCard from '@/components/ProductCard';
import {
  ADDRESS_DISPLAY,
  PHONE_DISPLAY,
  newArrivals as staticNewArrivals,
  productCategories,
  productCategoryImages,
  whatsappUrl,
} from '@/lib/catalog';
import { getNewArrivals, toProduct } from '@/lib/db';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Maison El Mire - Costumes et smokings sur mesure à Casablanca',
  description:
    'Maison de création masculine à Casablanca. Smokings, costumes et vestes sur mesure pour mariage, cérémonie et événement. Prenez rendez-vous.',
};

export default async function Home() {
  const dbNewArrivals = await getNewArrivals();
  const newArrivals = dbNewArrivals.length > 0 ? dbNewArrivals.map(toProduct) : staticNewArrivals;
  const heroPoster = productCategoryImages.Smokings;
  const tiles = productCategories.filter((category) => category !== 'Smokings').slice(0, 5);
  const collectionDetails: Record<string, string> = {
    Costumes: 'Silhouettes nettes pour cérémonie, travail et grands soirs.',
    Vestes: 'Textures, revers et couleurs pour signer une allure.',
    Pantalons: 'Coupes précises et tombés propres pour compléter la tenue.',
    Chemises: 'Bases lumineuses pensées pour le costume et le smoking.',
    Accessoires: 'Finitions, doublures et détails personnels.',
  };

  return (
    <>
      <Header />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="home-hero">
          <Image
            className="poster"
            src={heroPoster}
            alt="Smoking noir revers satin Maison El Mire Casablanca"
            fill
            priority
            sizes="100vw"
          />
          <video
            src={asset('/aziz-media/video-home-page.mp4')}
            poster={heroPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          />
          <div className="container-rc">
            <div className="hero-copy">
              <h1>Costumes d&apos;exception.</h1>
              <p>Maison de création et sur mesure — Casablanca</p>
              <div className="hero-actions">
                <Link className="btn" style={{ background: '#F88202', border: '1px solid #F88202', color: '#fff', boxShadow: '0 8px 24px rgba(248,130,2,0.28)' }} href="/collections">
                  Découvrir les collections
                </Link>
                <Link className="btn" style={{ background: 'transparent', border: '1px solid #F88202', color: '#F88202' }} href="/reservation">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Collections ── */}
        <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
          <div className="container-rc">
            <div className="collections-home-head">
              <div>
                <p className="eyebrow">Nos collections</p>
                <h2 className="section-title">Le vestiaire Maison</h2>
              </div>
              <p>Des pièces choisies pour composer une silhouette complète, du costume principal jusqu&apos;au dernier détail.</p>
            </div>
            <div className="category-tiles">
              {tiles.map((category, index) => (
                <Link
                  key={category}
                  className="category-tile"
                  href={`/collections?category=${encodeURIComponent(category)}`}
                >
                  <span className="category-tile-media">
                    <Image
                      src={productCategoryImages[category]}
                      alt={`${category} Maison El Mire Casablanca`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 20vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </span>
                  <span className="category-tile-copy">
                    <span className="category-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="category-name">{category}</span>
                    <span className="category-note">{collectionDetails[category]}</span>
                    <span className="category-action">Explorer</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── New arrivals ── */}
        <section className="section-pad" style={{ background: 'var(--color-white)' }}>
          <div className="container-rc">
            <div className="new-arrivals-head">
              <div>
                <p className="eyebrow">Dernières pièces</p>
                <h2 className="section-title" style={{ margin: 0 }}>Nouveautés</h2>
              </div>
              <Link className="text-link" href="/new-arrivals">Voir toutes les nouveautés</Link>
            </div>
            <div className="product-grid">
              {newArrivals.slice(0, 3).map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Sur mesure ── */}
        <section className="section-pad" style={{ background: 'var(--color-linen)' }}>
          <div className="container-rc bespoke-home">
            <div className="bespoke-media">
              <Image
                src={asset('/aziz-media/instagram/accessoire-lining-detail.jpg')}
                alt="Détail de doublure sur mesure Maison El Mire"
                fill
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <p className="eyebrow">Sur mesure</p>
              <h2 className="section-title">Un costume créé pour vous.</h2>
              <p className="body-large">
                À l&apos;atelier, chaque rendez-vous commence par votre occasion, votre posture et votre manière de porter le costume. Nous guidons le choix du tissu, dessinons la coupe, puis ajustons les finitions jusqu&apos;au bon équilibre.
              </p>
              <div className="bespoke-steps">
                {['Rendez-vous', 'Mesures', 'Livraison'].map((step, index) => (
                  <div key={step}>
                    <strong>0{index + 1}</strong>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <Link className="btn btn-gold" href="/reservation">Réserver une séance de mesure</Link>
            </div>
          </div>
        </section>

        {/* ── Fabric story ── */}
        <FabricStorySection showProcess={false} />

        {/* ── Atelier ── */}
        <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
          <div className="container-rc atelier-home">
            <div>
              <p className="eyebrow">Atelier</p>
              <h2 className="section-title">Héritage &amp; Savoir-faire</h2>
              <p className="body-large">
                Maison El Mire travaille la silhouette masculine depuis Casablanca avec une attention particulière pour la coupe, les matières et les détails intérieurs. Chaque pièce est pensée comme une rencontre entre cérémonie marocaine, exigence contemporaine et discrétion du beau geste. À Sidi Maarouf, l&apos;atelier accompagne les clients dans un parcours simple, précis et personnel.
              </p>
              <Link className="text-link" href="/about">Découvrir la maison</Link>
            </div>
            <div className="atelier-media">
              <Image
                src={asset('/aziz-media/instagram/atelier-boutique-window.jpg')}
                alt="Atelier Maison El Mire à Casablanca"
                fill
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="container-rc">
            <h2>Prêt à composer votre costume&nbsp;?</h2>
            <p>Prenez rendez-vous à l&apos;atelier ou contactez-nous sur WhatsApp.</p>
            <div className="cta-actions">
              <Link className="btn btn-outline" href="/reservation">Prendre rendez-vous</Link>
              <a
                className="btn btn-gold"
                href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous à l'atelier.")}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <p className="cta-note">{PHONE_DISPLAY} — {ADDRESS_DISPLAY}</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
