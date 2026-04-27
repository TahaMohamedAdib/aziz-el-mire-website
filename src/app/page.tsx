import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ReferenceInspiredSections from '@/components/ReferenceInspiredSections';
import { SectionHeader } from '@/components/SitePage';
import { BRAND_OFFER, BRAND_SIGNATURE, BRAND_TAGLINE, lookbookImages, newArrivals, productCategories, productCategoryImages, whatsappUrl } from '@/lib/catalog';

const processSteps = [
  'Prise de rendez-vous',
  'Choix du tissu',
  'Prise des mesures',
  'Essayage',
  'Livraison finale',
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
          <video
            src="/aziz-media/video-home-page.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ height: '100%', inset: 0, objectFit: 'cover', position: 'absolute', width: '100%' }}
          />
          <div style={{ background: 'linear-gradient(90deg, rgba(5,7,6,0.82), rgba(5,7,6,0.28))', inset: 0, position: 'absolute' }} />
          <div className="container-rc" style={{ alignItems: 'center', display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '720px', padding: '150px 0 80px' }}>
              <p className="eyebrow">Aziz EL Mire Haute Couture</p>
              <h1 style={{ color: 'var(--ivory)', fontFamily: 'var(--font-heading)', fontSize: 'clamp(38px, 5.8vw, 76px)', fontWeight: 500, lineHeight: 0.95, margin: '0 0 24px', maxWidth: '760px', textTransform: 'uppercase' }}>
                {BRAND_OFFER}
              </h1>
              <p style={{ color: 'var(--ivory)', fontSize: '20px', lineHeight: 1.7, margin: '0 0 34px', maxWidth: '620px' }}>
                {BRAND_TAGLINE}. <span style={{ color: '#b79a55', fontStyle: 'italic' }}>{BRAND_SIGNATURE}</span>.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link className="btn btn-gold" href="/collections">Découvrir les collections</Link>
                <Link className="btn btn-light" href="/reservation">Prendre rendez-vous</Link>
                <a className="btn btn-outline" href={whatsappUrl('Bonjour, je suis intéressé par vos costumes sur mesure.')} target="_blank" rel="noreferrer">
                  Contact WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: '#07100c', borderTop: '1px solid rgba(122,30,30,0.5)', padding: '58px 20px' }}>
          <div style={{ margin: '0 auto', maxWidth: '680px', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: '12px' }}>Notre maison</p>
            <h2 style={{ color: 'var(--ivory)', fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 500, lineHeight: 1, margin: '0 0 18px', textTransform: 'uppercase' }}>
              {BRAND_TAGLINE}
            </h2>
            <p style={{ color: '#b8ad96', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>
              {BRAND_OFFER}. Chaque pièce est pensée pour valoriser la silhouette et offrir un style raffiné, moderne et intemporel. <span style={{ color: '#d7c28b', fontStyle: 'italic' }}>{BRAND_SIGNATURE}</span>.
            </p>
          </div>
        </section>

        <section style={{ background: '#050706', padding: '96px 20px' }}>
          <style>{`
            .home-products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
            @media (max-width: 900px) { .home-products { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 620px) { .home-products { grid-template-columns: 1fr; } }
          `}</style>
          <SectionHeader eyebrow="Nouveautés" title="Dernières pièces">
            Les dernières pièces ajoutées à la collection Aziz EL Mire Haute Couture.
          </SectionHeader>
          <div className="container-rc home-products">
            {newArrivals.slice(0, 3).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>

        <section style={{ background: '#050706', padding: '96px 20px' }}>
          <style>{`
            .category-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
            @media (max-width: 1020px) { .category-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 560px) { .category-grid { grid-template-columns: 1fr; } }
          `}</style>
          <SectionHeader eyebrow="Collections" title="Collections phares" />
          <div className="container-rc category-grid">
            {productCategories.map((category) => (
              <article key={category} style={{ background: '#0c1410', border: '1px solid rgba(183,154,85,0.14)', boxShadow: 'inset 0 1px 0 rgba(122,30,30,0.18)', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '3 / 4', position: 'relative' }}>
                  <Image src={productCategoryImages[category]} alt={category} fill sizes="(max-width: 560px) 100vw, 20vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: '0 0 10px', textTransform: 'uppercase' }}>{category}</h3>
                  <p style={{ color: '#b8ad96', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px' }}>
                    Une sélection raffinée pour composer une silhouette masculine complète.
                  </p>
                  <Link className="btn btn-outline" href={`/collections?category=${encodeURIComponent(category)}`}>Voir la collection</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ReferenceInspiredSections />

        <section style={{ background: '#050706', padding: '96px 20px' }}>
          <style>{`
            .process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
            @media (max-width: 900px) { .process-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 560px) { .process-grid { grid-template-columns: 1fr; } }
          `}</style>
          <SectionHeader eyebrow="Sur mesure" title="Parcours sur mesure">
            Un service sur mesure adapté à votre style, votre morphologie et votre occasion.
          </SectionHeader>
          <div className="container-rc process-grid">
            {processSteps.map((step, index) => (
              <article key={step} style={{ borderTop: '1px solid rgba(183,154,85,0.4)', paddingTop: '22px' }}>
                <p className="eyebrow">0{index + 1}</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: 0 }}>{step}</h3>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '44px', textAlign: 'center' }}>
            <Link className="btn btn-gold" href="/reservation">Réserver une séance de mesure</Link>
          </div>
        </section>

        <section style={{ background: '#07100c', padding: '96px 0' }}>
          <SectionHeader eyebrow="Lookbook" title="Aperçu de la galerie" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {lookbookImages.slice(0, 8).map((image, index) => (
              <div key={image} style={{ aspectRatio: '1', position: 'relative' }}>
                <Image src={image} alt={`Lookbook Maison Elmire ${index + 1}`} fill sizes="25vw" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#07140f', padding: '90px 20px', textAlign: 'center' }}>
          <p className="eyebrow">Réservation</p>
          <h2 className="section-title">Préparez votre prochain costume</h2>
          <p style={{ color: '#d7c28b', fontSize: '18px', lineHeight: 1.8, margin: '0 auto 32px', maxWidth: '680px' }}>
            Planifiez une séance de mesure et laissez notre équipe vous accompagner dans le choix de la coupe, du tissu et des finitions.
          </p>
          <Link className="btn btn-gold" href="/reservation">Prendre rendez-vous</Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
