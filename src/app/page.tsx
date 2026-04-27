import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import {
  ADDRESS_DISPLAY,
  PHONE_DISPLAY,
  lookbookImages,
  newArrivals,
  productCategories,
  productCategoryImages,
  whatsappUrl,
} from '@/lib/catalog';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Aziz EL Mire - Costumes & Smokings sur mesure a Casablanca',
  description:
    'Maison de creation masculine a Casablanca. Smokings, costumes et vestes sur mesure pour mariage, ceremonie et evenement. Prenez rendez-vous.',
};

export default function Home() {
  const heroPoster = productCategoryImages.Smokings;
  const tiles = productCategories.filter((category) => category !== 'Smokings').slice(0, 5);
  const lookbookPreview = [
    '/aziz-media/instagram/atelier-boutique-window.jpg',
    lookbookImages[2],
    '/aziz-media/instagram/accessoire-lining-detail.jpg',
    '/aziz-media/instagram/veste-bordeaux-green-duo.jpg',
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="home-hero">
          <style>{`
            .home-hero {
              align-items: center;
              background: var(--color-dark);
              display: flex;
              min-height: 100vh;
              overflow: hidden;
              position: relative;
            }
            .home-hero video,
            .home-hero .poster {
              height: 100%;
              inset: 0;
              object-fit: cover;
              position: absolute;
              width: 100%;
            }
            .home-hero::after {
              background: rgba(0,0,0,0.45);
              content: "";
              inset: 0;
              position: absolute;
            }
            .hero-copy {
              color: white;
              max-width: 720px;
              padding-top: 96px;
              position: relative;
              z-index: 2;
            }
            .hero-copy h1 {
              color: white;
              font-size: clamp(52px, 7vw, 72px);
              font-weight: 300;
              line-height: 0.95;
              margin: 0 0 18px;
            }
            .hero-copy p {
              color: rgba(255,255,255,0.82);
              font-size: 16px;
              margin: 0 0 32px;
            }
            .hero-actions {
              align-items: center;
              display: flex;
              flex-wrap: wrap;
              gap: 22px;
            }
            .hero-whatsapp {
              align-items: center;
              bottom: 34px;
              color: white;
              display: inline-flex;
              font-size: 13px;
              gap: 10px;
              position: absolute;
              right: 34px;
              z-index: 2;
            }
            @media (max-width: 720px) {
              .home-hero video { display: none; }
              .hero-whatsapp { left: 24px; right: auto; }
            }
          `}</style>
          <Image className="poster" src={heroPoster} alt="Smoking noir revers satin Aziz EL Mire Casablanca" fill priority sizes="100vw" />
          <video src={asset('/aziz-media/video-home-page.mp4')} poster={heroPoster} autoPlay loop muted playsInline preload="none" />
          <div className="container-rc">
            <div className="hero-copy">
              <h1>Costumes d&apos;exception.</h1>
              <p>Maison de creation & sur-mesure - Casablanca</p>
              <div className="hero-actions">
                <Link className="btn btn-outline" href="/collections">
                  Decouvrir les collections
                </Link>
                <Link className="text-link" href="/contact">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
          <a className="hero-whatsapp" href={whatsappUrl('Bonjour, je souhaite commander via WhatsApp.')} target="_blank" rel="noreferrer">
            <FaWhatsapp aria-hidden="true" /> Commander par WhatsApp
          </a>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
          <style>{`
            .category-tiles {
              display: grid;
              gap: 16px;
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }
            .category-tile {
              aspect-ratio: 3 / 4;
              background: var(--color-linen);
              display: block;
              overflow: hidden;
              position: relative;
            }
            .category-tile img { transition: transform var(--transition-image); }
            .category-tile:hover img { transform: scale(1.03); }
            .category-tile span {
              align-items: end;
              background: linear-gradient(to top, rgba(0,0,0,0.62), transparent 55%);
              color: white;
              display: flex;
              font-family: var(--font-serif);
              font-size: 28px;
              inset: 0;
              padding: 22px;
              position: absolute;
            }
            @media (max-width: 980px) { .category-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          `}</style>
          <div className="container-rc">
            <p className="eyebrow">Nos Collections</p>
            <div className="category-tiles">
              {tiles.map((category) => (
                <Link key={category} className="category-tile" href={`/collections?category=${encodeURIComponent(category)}`}>
                  <Image src={productCategoryImages[category]} alt={`${category} Aziz EL Mire Casablanca`} fill loading="lazy" sizes="(max-width: 980px) 50vw, 20vw" style={{ objectFit: 'cover' }} />
                  <span>{category}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-white)' }}>
          <div className="container-rc">
            <div style={{ alignItems: 'end', display: 'flex', justifyContent: 'space-between', marginBottom: 36 }}>
              <div>
                <p className="eyebrow">Dernieres Pieces</p>
                <h2 className="section-title" style={{ margin: 0 }}>Nouveautes</h2>
              </div>
              <Link className="text-link" href="/new-arrivals">Voir toutes les nouveautes</Link>
            </div>
            <div className="product-grid">
              {newArrivals.slice(0, 3).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-linen)' }}>
          <style>{`
            .bespoke-home {
              align-items: center;
              display: grid;
              gap: 56px;
              grid-template-columns: 1fr 1fr;
            }
            .bespoke-steps {
              display: grid;
              gap: 18px;
              grid-template-columns: repeat(3, 1fr);
              margin: 30px 0;
            }
            .bespoke-steps strong {
              color: var(--color-gold);
              display: block;
              font-size: 13px;
              margin-bottom: 8px;
            }
            @media (max-width: 860px) {
              .bespoke-home, .bespoke-steps { grid-template-columns: 1fr; }
            }
          `}</style>
          <div className="container-rc bespoke-home">
            <div style={{ aspectRatio: '4 / 5', position: 'relative' }}>
              <Image src="/aziz-media/instagram/accessoire-lining-detail.jpg" alt="Detail de doublure sur mesure Aziz EL Mire" fill loading="lazy" sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <p className="eyebrow">Sur Mesure</p>
              <h2 className="section-title">Un costume cree pour vous.</h2>
              <p className="body-large">
                A l&apos;atelier, chaque rendez-vous commence par votre occasion, votre posture et votre maniere de porter le costume. Nous guidons le choix du tissu, dessinons la coupe, puis ajustons les finitions jusqu&apos;au bon equilibre.
              </p>
              <div className="bespoke-steps">
                {['Rendez-vous', 'Mesures', 'Livraison'].map((step, index) => (
                  <div key={step}>
                    <strong>0{index + 1}</strong>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <Link className="btn btn-gold" href="/contact">Reserver une seance de mesure</Link>
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
          <div className="container-rc" style={{ alignItems: 'center', display: 'grid', gap: 56, gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <p className="eyebrow">Atelier</p>
              <h2 className="section-title">Heritage & Savoir-faire</h2>
              <p className="body-large">
                Aziz EL Mire Haute Couture travaille la silhouette masculine depuis Casablanca avec une attention particuliere pour la coupe, les matieres et les details interieurs. Chaque piece est pensee comme une rencontre entre ceremonie marocaine, exigence contemporaine et discretion du beau geste. A Sidi Maarouf, l&apos;atelier accompagne les clients dans un parcours simple, precis et personnel.
              </p>
              <Link className="text-link" href="/about">Decouvrir la maison</Link>
            </div>
            <div style={{ aspectRatio: '4 / 5', position: 'relative' }}>
              <Image src="/aziz-media/instagram/atelier-boutique-window.jpg" alt="Atelier Aziz EL Mire a Casablanca" fill loading="lazy" sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-white)' }}>
          <style>{`
            .lookbook-preview {
              display: grid;
              gap: 12px;
              grid-template-columns: 1.15fr 0.85fr 1fr;
            }
            .lookbook-preview div {
              min-height: 260px;
              position: relative;
            }
            .lookbook-preview div:first-child { grid-row: span 2; min-height: 540px; }
            @media (max-width: 820px) {
              .lookbook-preview { grid-template-columns: repeat(2, 1fr); }
              .lookbook-preview div:first-child { min-height: 320px; }
            }
          `}</style>
          <div className="container-rc">
            <p className="eyebrow">Galerie</p>
            <div className="lookbook-preview">
              {lookbookPreview.map((image, index) => (
                <div key={image}>
                  <Image src={image} alt={`Lookbook Aziz EL Mire Casablanca ${index + 1}`} fill loading="lazy" sizes="(max-width: 820px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <Link className="text-link" href="/gallery" style={{ display: 'inline-block', marginTop: 24 }}>Voir la galerie complete</Link>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-dark)', color: 'var(--color-ivory)', textAlign: 'center' }}>
          <div className="container-rc">
            <h2 style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, lineHeight: 1, margin: '0 0 18px' }}>
              Pret a composer votre costume?
            </h2>
            <p style={{ color: 'rgba(248,245,240,0.72)', margin: '0 0 30px' }}>
              Prenez rendez-vous a l&apos;atelier ou contactez-nous sur WhatsApp.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 24 }}>
              <Link className="btn btn-outline" href="/contact">Prendre rendez-vous</Link>
              <a className="btn btn-gold" href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous a l'atelier.")} target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <p style={{ color: 'rgba(248,245,240,0.6)', fontSize: 13, margin: 0 }}>{PHONE_DISPLAY} - {ADDRESS_DISPLAY}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
