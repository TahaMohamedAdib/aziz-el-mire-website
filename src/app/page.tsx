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
  newArrivals,
  productCategories,
  productCategoryImages,
  whatsappUrl,
} from '@/lib/catalog';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Maison El Mire - Costumes et smokings sur mesure à Casablanca',
  description:
    'Maison de création masculine à Casablanca. Smokings, costumes et vestes sur mesure pour mariage, cérémonie et événement. Prenez rendez-vous.',
};

export default function Home() {
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
        <section className="home-hero">
          <style>{`
            .home-hero {
              align-items: center;
              background: var(--color-dark);
              display: flex;
              min-height: 108vh;
              overflow: hidden;
              position: relative;
            }
            .home-hero video,
            .home-hero .poster {
              height: 100%;
              inset: 0;
              object-fit: cover;
              object-position: center center;
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
              max-width: 760px;
              padding-top: 18px;
              position: relative;
              z-index: 2;
            }
            .hero-copy h1 {
              color: white;
              font-size: clamp(72px, 7.2vw, 124px);
              font-weight: 300;
              line-height: 0.95;
              margin: 0 0 22px;
            }
            .hero-copy p {
              color: rgba(255,255,255,0.82);
              font-size: 18px;
              margin: 0 0 36px;
            }
            .hero-actions {
              align-items: center;
              display: flex;
              flex-wrap: wrap;
              gap: 22px;
            }
            .hero-actions .btn {
              min-height: 52px;
              padding: 15px 28px;
            }
            .home-hero .container-rc {
              margin: 0;
              max-width: none;
              padding-left: clamp(28px, 5vw, 96px);
              padding-right: clamp(28px, 5vw, 96px);
            }
            @media (max-width: 720px) {
              .home-hero { min-height: 100svh; }
              .home-hero video { display: none; }
              .hero-copy { padding-top: 84px; }
              .hero-copy h1 { font-size: clamp(48px, 14vw, 64px); }
              .hero-copy p { font-size: 16px; }
            }
          `}</style>
          <Image className="poster" src={heroPoster} alt="Smoking noir revers satin Maison El Mire Casablanca" fill priority sizes="100vw" />
          <video src={asset('/aziz-media/video-home-page.mp4')} poster={heroPoster} autoPlay loop muted playsInline preload="none" />
          <div className="container-rc">
            <div className="hero-copy">
              <h1>Costumes d&apos;exception.</h1>
              <p>Maison de création et sur mesure - Casablanca</p>
              <div className="hero-actions">
                <Link className="btn btn-outline" href="/collections">
                  Découvrir les collections
                </Link>
                <Link className="text-link" href="/reservation">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
          <style>{`
            .collections-home-head {
              align-items: end;
              display: flex;
              gap: 28px;
              justify-content: space-between;
              margin-bottom: 34px;
            }
            .collections-home-head h2 {
              margin: 0;
            }
            .collections-home-head p:last-child {
              color: var(--color-gray);
              line-height: 1.7;
              margin: 0;
              max-width: 420px;
            }
            .category-tiles {
              display: grid;
              gap: 18px;
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }
            .category-tile {
              background: var(--color-white);
              border: 1px solid rgba(184,151,90,0.28);
              color: var(--color-dark);
              display: grid;
              gap: 16px;
              overflow: hidden;
              padding: 10px;
              position: relative;
              transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
            }
            .category-tile::before {
              border: 1px solid rgba(232,200,128,0);
              content: "";
              inset: 0;
              opacity: 0;
              pointer-events: none;
              position: absolute;
              transition: border-color 220ms ease, box-shadow 220ms ease, opacity 220ms ease;
              z-index: 3;
            }
            .category-tile::after {
              border: 1px solid transparent;
              content: "";
              inset: 5px;
              pointer-events: none;
              position: absolute;
              transition: border-color 200ms ease, box-shadow 200ms ease;
              z-index: 3;
            }
            .category-tile:hover,
            .category-tile:focus-visible {
              border-color: var(--color-gold);
              box-shadow: 0 16px 34px rgba(6,63,50,0.12);
              transform: translateY(-3px);
            }
            .category-tile:hover::before,
            .category-tile:focus-visible::before {
              border-color: rgba(255,225,151,0.96);
              box-shadow: 0 0 0 1px rgba(184,151,90,0.5), 0 0 12px rgba(255,220,132,0.62), inset 0 0 10px rgba(255,220,132,0.22);
              opacity: 1;
            }
            .category-tile:hover::after,
            .category-tile:focus-visible::after {
              border-color: rgba(184,151,90,0.42);
              box-shadow: none;
            }
            .category-tile-media {
              aspect-ratio: 4 / 5;
              background: var(--color-linen);
              overflow: hidden;
              position: relative;
              z-index: 1;
            }
            .category-tile-media::after {
              background: linear-gradient(to top, rgba(6,63,50,0.44), transparent 55%);
              content: "";
              inset: 0;
              position: absolute;
              z-index: 1;
            }
            .category-tile img {
              transition: transform var(--transition-image), filter var(--transition-image);
            }
            .category-tile:hover img {
              filter: saturate(1.08) contrast(1.04);
              transform: scale(1.045);
            }
            .category-index {
              color: var(--color-gold);
              display: block;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 1.8px;
              line-height: 1;
              margin-bottom: 10px;
            }
            .category-name {
              color: var(--color-dark);
              display: block;
              font-family: var(--font-serif);
              font-size: clamp(26px, 2vw, 32px);
              line-height: 0.95;
            }
            .category-note {
              color: var(--color-gray);
              display: block;
              font-size: 13px;
              line-height: 1.55;
              margin-top: 12px;
              min-height: 62px;
            }
            .category-action {
              align-items: center;
              color: var(--color-gold);
              display: inline-flex;
              font-size: 11px;
              font-weight: 600;
              gap: 8px;
              letter-spacing: 1.5px;
              margin-top: 16px;
              text-transform: uppercase;
            }
            .category-action::after {
              background: currentColor;
              content: "";
              height: 1px;
              transition: width 200ms ease;
              width: 22px;
            }
            .category-tile:hover .category-action::after {
              width: 38px;
            }
            .category-tile-copy {
              padding: 0 6px 8px;
              position: relative;
              z-index: 1;
            }
            @media (max-width: 980px) {
              .collections-home-head {
                align-items: start;
                flex-direction: column;
              }
              .category-tiles {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
            @media (max-width: 560px) {
              .category-tiles {
                grid-template-columns: 1fr;
              }
              .category-note {
                min-height: 0;
              }
            }
          `}</style>
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
                <Link key={category} className="category-tile" href={`/collections?category=${encodeURIComponent(category)}`}>
                  <span className="category-tile-media">
                    <Image src={productCategoryImages[category]} alt={`${category} Maison El Mire Casablanca`} fill loading="lazy" sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 20vw" style={{ objectFit: 'cover' }} />
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

        <section className="section-pad" style={{ background: 'var(--color-white)' }}>
          <div className="container-rc">
            <div style={{ alignItems: 'end', display: 'flex', justifyContent: 'space-between', marginBottom: 36 }}>
              <div>
                <p className="eyebrow">Dernières pièces</p>
                <h2 className="section-title" style={{ margin: 0 }}>Nouveautés</h2>
              </div>
              <Link className="text-link" href="/new-arrivals">Voir toutes les nouveautés</Link>
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
              <Image src={asset('/aziz-media/instagram/accessoire-lining-detail.jpg')} alt="Détail de doublure sur mesure Maison El Mire" fill loading="lazy" sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
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

        <section className="section-pad" style={{ background: 'var(--color-ivory)' }}>
          <div className="container-rc" style={{ alignItems: 'center', display: 'grid', gap: 56, gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <p className="eyebrow">Atelier</p>
              <h2 className="section-title">Héritage & Savoir-faire</h2>
              <p className="body-large">
                Maison El Mire travaille la silhouette masculine depuis Casablanca avec une attention particulière pour la coupe, les matières et les détails intérieurs. Chaque pièce est pensée comme une rencontre entre cérémonie marocaine, exigence contemporaine et discrétion du beau geste. À Sidi Maarouf, l&apos;atelier accompagne les clients dans un parcours simple, précis et personnel.
              </p>
              <Link className="text-link" href="/about">Découvrir la maison</Link>
            </div>
            <div style={{ aspectRatio: '4 / 5', position: 'relative' }}>
              <Image src={asset('/aziz-media/instagram/atelier-boutique-window.jpg')} alt="Atelier Maison El Mire à Casablanca" fill loading="lazy" sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--color-emerald)', color: 'var(--color-ivory)', textAlign: 'center' }}>
          <div className="container-rc">
            <h2 style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, lineHeight: 1, margin: '0 0 18px' }}>
              Prêt à composer votre costume?
            </h2>
            <p style={{ color: 'rgba(248,245,240,0.72)', margin: '0 0 30px' }}>
              Prenez rendez-vous à l&apos;atelier ou contactez-nous sur WhatsApp.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 24 }}>
              <Link className="btn btn-outline" href="/reservation">Prendre rendez-vous</Link>
              <a className="btn btn-gold" href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous à l'atelier.")} target="_blank" rel="noreferrer">
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
