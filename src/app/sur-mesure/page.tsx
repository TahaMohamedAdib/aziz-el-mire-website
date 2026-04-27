import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, SectionHeader, SitePage } from '@/components/SitePage';

export const metadata: Metadata = {
  title: 'Sur Mesure',
  description: 'Service sur mesure Aziz EL Mire Haute Couture.',
};

const steps = [
  ['01', 'Prise de rendez-vous', 'Définition du besoin, de l’occasion, du style et du budget.'],
  ['02', 'Choix du tissu', 'Sélection de matières premium, couleurs, doublures et détails.'],
  ['03', 'Prise des mesures', 'Étude de la morphologie pour construire une coupe précise.'],
  ['04', 'Essayage', 'Ajustements en atelier pour un tombé net et confortable.'],
  ['05', 'Livraison finale', 'Dernière vérification et conseils pour porter la pièce.'],
];

export default function SurMesurePage() {
  return (
    <SitePage>
      <PageHero eyebrow="Sur mesure" title="Sur Mesure">
        Un service sur mesure adapté à votre style, votre morphologie et votre occasion.
      </PageHero>
      <section style={{ background: '#07100c', padding: '88px 20px' }}>
        <style>{`
          .sur-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
          @media (max-width: 980px) { .sur-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 560px) { .sur-grid { grid-template-columns: 1fr; } }
        `}</style>
        <SectionHeader eyebrow="Processus" title="Le parcours couture" />
        <div className="container-rc sur-grid">
          {steps.map(([number, title, text]) => (
            <article key={title} style={{ background: '#050706', border: '1px solid rgba(183,154,85,0.16)', boxShadow: 'inset 0 1px 0 rgba(122,30,30,0.18)', padding: '28px' }}>
              <p className="eyebrow">{number}</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', margin: '0 0 16px', textTransform: 'uppercase' }}>{title}</h2>
              <p style={{ color: '#b8ad96', lineHeight: 1.7, margin: 0 }}>{text}</p>
            </article>
          ))}
        </div>
        <div style={{ marginTop: '46px', textAlign: 'center' }}>
          <Link className="btn btn-gold" href="/reservation">Réserver une séance de mesure</Link>
        </div>
      </section>
    </SitePage>
  );
}
