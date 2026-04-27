import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Ruler, Scissors, Shirt, Sparkles } from 'lucide-react';

const editorialBlocks = [
  {
    eyebrow: 'Histoire',
    title: "Une maison pensée pour l'élégance masculine",
    text: 'Aziz EL Mire Haute Couture accompagne les hommes qui recherchent une tenue précise, élégante et adaptée aux grandes occasions.',
    image: '/aziz-media/instagram/atelier-boutique-window.jpg',
    href: '/about',
  },
  {
    eyebrow: 'Passion',
    title: 'Chaque costume passe par plusieurs mains',
    text: 'Sélection du tissu, coupe, montage, essayage et finitions : chaque étape donne de la tenue, du confort et du caractère à la pièce.',
    image: '/aziz-media/instagram/accessoire-lining-detail.jpg',
    href: '/sur-mesure',
  },
  {
    eyebrow: 'Signature',
    title: 'Une coupe proche du corps, jamais contrainte',
    text: 'La silhouette est structurée avec discrétion pour garder une allure naturelle, moderne et durable.',
    image: '/aziz-media/instagram/veste-bordeaux-green-duo.jpg',
    href: '/collections',
  },
  {
    eyebrow: 'Création',
    title: 'De la mesure à la veste finale',
    text: 'Le client suit un parcours clair: rendez-vous, choix du tissu, mesures, essayage, ajustements et livraison.',
    image: '/aziz-media/instagram/accessoire-maison-elmire-label.jpg',
    href: '/reservation',
  },
];

const serviceCards = [
  {
    title: 'Prêt-à-porter',
    text: 'Pièces élégantes disponibles pour composer rapidement un vestiaire de cérémonie ou de travail.',
    href: '/collections',
    Icon: Shirt,
  },
  {
    title: 'Sur mesure',
    text: "Ajustement personnalisé selon votre morphologie, votre style et l'occasion préparée.",
    href: '/sur-mesure',
    Icon: Ruler,
  },
  {
    title: 'Bespoke',
    text: 'Expérience artisanale complète avec choix du tissu, finitions, doublure et détails personnels.',
    href: '/reservation',
    Icon: Scissors,
  },
];

export default function ReferenceInspiredSections() {
  return (
    <>
      <section style={{ background: '#050706', padding: '96px 20px' }}>
        <style>{`
          .capsule-section { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 44px; align-items: center; }
          .capsule-image { min-height: 560px; position: relative; }
          .dual-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 26px; }
          .dual-panel { min-height: 420px; overflow: hidden; position: relative; }
          .dual-panel-content { bottom: 0; left: 0; padding: 34px; position: absolute; right: 0; z-index: 2; }
          @media (max-width: 860px) {
            .capsule-section, .dual-panels { grid-template-columns: 1fr; }
            .capsule-image, .dual-panel { min-height: 380px; }
          }
        `}</style>
        <div className="container-rc capsule-section">
          <div>
            <p className="eyebrow">Capsule cérémonie 2026</p>
            <h2 className="section-title">Un vestiaire pour les grands moments</h2>
            <p style={{ color: 'var(--grey)', fontSize: '17px', lineHeight: 1.9, margin: '0 0 30px' }}>
              Inspirée des maisons de couture parisiennes, cette présentation met en avant les costumes, vestes et accessoires comme un univers complet : look de mariage, tenue de gala, rendez-vous professionnel et pièces sur mesure.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link className="btn btn-gold" href="/new-arrivals">
                <Sparkles size={16} aria-hidden="true" />
                Découvrir les nouveautés
              </Link>
              <Link className="btn btn-outline" href="/reservation">
                <CalendarDays size={16} aria-hidden="true" />
                Prendre rendez-vous
              </Link>
            </div>
          </div>
          <div className="capsule-image">
            <Image src="/aziz-media/instagram/costume-black-tuxedo-front.jpg" alt="Costume cérémonie Aziz EL Mire" fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="container-rc dual-panels">
          <Link className="dual-panel" href="/collections">
            <Image src="/aziz-media/instagram/veste-green-mannequin.jpg" alt="Le vestiaire Aziz EL Mire" fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)', inset: 0, position: 'absolute', zIndex: 1 }} />
            <div className="dual-panel-content">
              <p className="eyebrow">Le vestiaire</p>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', lineHeight: 1, margin: '0 0 16px', textTransform: 'uppercase' }}>Pièces essentielles</h3>
              <span className="btn btn-outline">Découvrir</span>
            </div>
          </Link>
          <Link className="dual-panel" href="/sur-mesure">
            <Image src="/aziz-media/instagram/accessoire-initials-lining.jpg" alt="Expérience sur mesure Aziz EL Mire" fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)', inset: 0, position: 'absolute', zIndex: 1 }} />
            <div className="dual-panel-content">
              <p className="eyebrow">Bespoke</p>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', lineHeight: 1, margin: '0 0 16px', textTransform: 'uppercase' }}>Expérience privée</h3>
              <span className="btn btn-outline">Voir le service</span>
            </div>
          </Link>
        </div>
      </section>

      <section style={{ background: '#07100c', padding: '96px 20px' }}>
        <style>{`
          .service-pathways { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
          .service-pathways article { background: #0c1410; border: 1px solid rgba(183,154,85,0.16); min-height: 300px; padding: 34px; }
          @media (max-width: 820px) { .service-pathways { grid-template-columns: 1fr; } }
        `}</style>
        <div className="container-rc" style={{ textAlign: 'center' }}>
          <p className="eyebrow">Services</p>
          <h2 className="section-title">Trois façons de porter la maison</h2>
        </div>
        <div className="container-rc service-pathways">
          {serviceCards.map(({ title, text, href, Icon }) => (
            <article key={title}>
              <Icon size={30} color="#b79a55" aria-hidden="true" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '34px', margin: '28px 0 16px', textTransform: 'uppercase' }}>{title}</h3>
              <p style={{ color: 'var(--grey)', fontSize: '15px', lineHeight: 1.8, margin: '0 0 28px' }}>{text}</p>
              <Link href={href} style={{ alignItems: 'center', color: '#b79a55', display: 'inline-flex', fontFamily: 'var(--font-montserrat)', fontSize: '12px', fontWeight: 800, gap: '8px', textTransform: 'uppercase' }}>
                Découvrir <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section style={{ background: '#050706', padding: '96px 20px' }}>
        <style>{`
          .editorial-scroll { margin: 0 auto; max-width: 1080px; overflow-x: auto; padding: 0 18px 18px; scroll-snap-type: x mandatory; scrollbar-color: rgba(183,154,85,0.52) rgba(239,230,209,0.08); }
          .editorial-track { display: grid; gap: 20px; grid-auto-columns: minmax(620px, 72%); grid-auto-flow: column; }
          .editorial-card { background: #0c1410; border: 1px solid rgba(183,154,85,0.18); box-shadow: inset 0 1px 0 rgba(122,30,30,0.18); display: grid; grid-template-columns: minmax(240px, 0.9fr) minmax(280px, 1.1fr); min-height: 410px; overflow: hidden; scroll-snap-align: start; }
          .editorial-card-image { min-height: 410px; position: relative; }
          .editorial-card-content { align-self: center; padding: 34px; }
          .editorial-progress { background: rgba(239,230,209,0.08); height: 1px; margin: 28px auto 0; max-width: 1200px; position: relative; }
          .editorial-progress::after { background: linear-gradient(90deg, var(--burgundy), var(--gold)); content: ''; height: 1px; left: 0; position: absolute; top: 0; width: 28%; }
          @media (max-width: 820px) {
            .editorial-scroll { padding-inline: 18px; }
            .editorial-track { grid-auto-columns: minmax(280px, 84vw); }
            .editorial-card { grid-template-columns: 1fr; min-height: 0; }
            .editorial-card-image { min-height: 260px; }
            .editorial-card-content { padding: 26px; }
          }
        `}</style>
        <div className="container-rc" style={{ marginBottom: '54px', textAlign: 'center' }}>
          <p className="eyebrow">Atelier</p>
          <h2 className="section-title">Héritage, passion et signature</h2>
        </div>
        <div className="editorial-scroll">
          <div className="editorial-track">
            {editorialBlocks.map((block) => (
              <article className="editorial-card" key={block.title}>
                <div className="editorial-card-image">
                  <Image src={block.image} alt={block.title} fill sizes="(max-width: 820px) 88vw, 38vw" style={{ objectFit: 'cover' }} />
                </div>
                <div className="editorial-card-content">
                  <p className="eyebrow">{block.eyebrow}</p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 0.98, margin: '0 0 18px', textTransform: 'uppercase' }}>
                    {block.title}
                  </h3>
                  <p style={{ color: 'var(--grey)', fontSize: '15px', lineHeight: 1.8, margin: '0 0 24px' }}>{block.text}</p>
                  <Link className="btn btn-outline" href={block.href}>Voir plus</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="editorial-progress" aria-hidden="true" />
      </section>

    </>
  );
}
