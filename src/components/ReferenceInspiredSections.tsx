import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Ruler, Scissors, Shirt, Sparkles } from 'lucide-react';

const IG = '/aziz-media/instagram';

const editorialBlocks = [
  {
    eyebrow: 'Histoire',
    title: "Une maison pensée pour l'élégance masculine",
    text: 'Maison El Mire accompagne les hommes qui recherchent une tenue précise, élégante et adaptée aux grandes occasions.',
    image: `${IG}/atelier-boutique-window.jpg`,
    href: '/about',
  },
  {
    eyebrow: 'Passion',
    title: 'Chaque costume passe par plusieurs mains',
    text: 'Sélection du tissu, coupe, montage, essayage et finitions : chaque étape donne de la tenue, du confort et du caractère à la pièce.',
    image: `${IG}/accessoire-lining-detail.jpg`,
    href: '/sur-mesure',
  },
  {
    eyebrow: 'Signature',
    title: 'Une coupe proche du corps, jamais contrainte',
    text: 'La silhouette est structurée avec discrétion pour garder une allure naturelle, moderne et durable.',
    image: `${IG}/veste-bordeaux-green-duo.jpg`,
    href: '/collections',
  },
  {
    eyebrow: 'Création',
    title: 'De la mesure à la veste finale',
    text: 'Le client suit un parcours clair: rendez-vous, choix du tissu, mesures, essayage, ajustements et livraison.',
    image: `${IG}/accessoire-maison-elmire-label.jpg`,
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
      <section style={{ background: '#001D14', padding: 'clamp(48px, 6vw, 78px) 0' }}>
        <div className="container-rc capsule-section">
          <div>
            <p className="eyebrow">Capsule cérémonie 2026</p>
            <h2 className="section-title">Un vestiaire pour les grands moments</h2>
            <p style={{ color: 'var(--grey)', fontSize: '15.5px', lineHeight: 1.75, margin: '0 0 24px' }}>
              Inspirée des maisons de couture parisiennes, cette présentation met en avant les costumes, vestes et accessoires comme un univers complet : look de mariage, tenue de gala, rendez-vous professionnel et pièces sur mesure.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
            <Image src={`${IG}/costume-black-tuxedo-front.jpg`} alt="Costume cérémonie Maison El Mire" fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="container-rc dual-panels">
          <Link className="dual-panel" href="/collections">
            <Image src={`${IG}/veste-green-mannequin.jpg`} alt="Le vestiaire Maison El Mire" fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)', inset: 0, position: 'absolute', zIndex: 1 }} />
            <div className="dual-panel-content">
              <p className="eyebrow">Le vestiaire</p>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '34px', lineHeight: 1, margin: '0 0 13px', textTransform: 'uppercase' }}>Pièces essentielles</h3>
              <span className="btn btn-outline">Découvrir</span>
            </div>
          </Link>
          <Link className="dual-panel" href="/sur-mesure">
            <Image src={`${IG}/accessoire-initials-lining.jpg`} alt="Expérience sur mesure Maison El Mire" fill sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)', inset: 0, position: 'absolute', zIndex: 1 }} />
            <div className="dual-panel-content">
              <p className="eyebrow">Bespoke</p>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '34px', lineHeight: 1, margin: '0 0 13px', textTransform: 'uppercase' }}>Expérience privée</h3>
              <span className="btn btn-outline">Voir le service</span>
            </div>
          </Link>
        </div>
      </section>

      <section style={{ background: '#001D14', padding: 'clamp(48px, 6vw, 78px) 0' }}>
        <div className="container-rc" style={{ textAlign: 'center' }}>
          <p className="eyebrow">Services</p>
          <h2 className="section-title">Trois façons de porter la maison</h2>
        </div>
        <div className="container-rc service-pathways">
          {serviceCards.map(({ title, text, href, Icon }) => (
            <article key={title}>
              <Icon size={26} color="#F88202" aria-hidden="true" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', margin: '22px 0 13px', textTransform: 'uppercase' }}>{title}</h3>
              <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 22px' }}>{text}</p>
              <Link href={href} style={{ alignItems: 'center', color: 'var(--color-gold)', display: 'inline-flex', fontFamily: 'var(--font-montserrat)', fontSize: '11px', fontWeight: 800, gap: '8px', textTransform: 'uppercase' }}>
                Découvrir <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section style={{ background: '#001D14', padding: 'clamp(48px, 6vw, 78px) 0' }}>
        <div className="container-rc" style={{ marginBottom: '42px', textAlign: 'center' }}>
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
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 0.98, margin: '0 0 14px', textTransform: 'uppercase' }}>
                    {block.title}
                  </h3>
                  <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px' }}>{block.text}</p>
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
