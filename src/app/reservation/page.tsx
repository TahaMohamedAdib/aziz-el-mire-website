import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, MessageCircle, Ruler, Scissors } from 'lucide-react';
import ReservationForm from '@/components/ReservationForm';
import { SitePage } from '@/components/SitePage';
import { ADDRESS_DISPLAY, PHONE_DISPLAY, PHONE_TEL } from '@/lib/catalog';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Réserver un rendez-vous - Maison El Mire Atelier Casablanca',
  description:
    "Réservez une consultation à l'atelier Maison El Mire de Casablanca pour un costume sur mesure, un smoking de mariage ou une séance de retouches.",
};

const steps = [
  ['01', 'Choisir', 'Sélectionnez le service et partagez le contexte de votre événement.'],
  ['02', 'Mesurer', "À l'atelier, nous définissons coupe, tissu, posture et finitions."],
  ['03', 'Confirmer', 'Votre demande part sur WhatsApp pour une confirmation rapide.'],
];

const promises = [
  { icon: Clock, title: '30 à 45 min', text: 'Un premier rendez-vous court, précis et utile.' },
  { icon: MapPin, title: ADDRESS_DISPLAY, text: "Essayage et conseil directement à l'atelier." },
  { icon: MessageCircle, title: 'WhatsApp', text: 'Une confirmation simple avec toutes vos informations.' },
];

export default function ReservationPage() {
  return (
    <SitePage>
      <section className="reservation-hero">
        <style>{`
          .reservation-hero {
            background: var(--color-ivory);
            padding: 150px 0 84px;
          }
          .reservation-hero-grid {
            align-items: center;
            display: grid;
            gap: 58px;
            grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          }
          .reservation-kicker {
            align-items: center;
            color: var(--color-gold);
            display: inline-flex;
            font-size: 12px;
            font-weight: 600;
            gap: 10px;
            letter-spacing: 2.2px;
            margin-bottom: 18px;
            text-transform: uppercase;
          }
          .reservation-title {
            color: var(--color-dark);
            font-family: var(--font-serif);
            font-size: clamp(48px, 7vw, 86px);
            font-weight: 400;
            line-height: 0.95;
            margin: 0 0 24px;
          }
          .reservation-copy {
            color: var(--color-gray);
            font-size: 18px;
            line-height: 1.75;
            margin: 0 0 32px;
            max-width: 620px;
          }
          .reservation-quick {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }
          .reservation-media {
            min-height: 620px;
            position: relative;
          }
          .reservation-media-main {
            bottom: 0;
            left: 0;
            overflow: hidden;
            position: absolute;
            right: 82px;
            top: 0;
          }
          .reservation-media-detail {
            border: 10px solid var(--color-ivory);
            bottom: 44px;
            height: 250px;
            overflow: hidden;
            position: absolute;
            right: 0;
            width: 230px;
          }
          .reservation-badge {
            background: var(--color-dark);
            bottom: 0;
            color: var(--color-ivory);
            left: 28px;
            padding: 20px 22px;
            position: absolute;
            width: min(300px, calc(100% - 56px));
            z-index: 2;
          }
          .reservation-badge strong {
            color: var(--color-gold);
            display: block;
            font-size: 12px;
            letter-spacing: 1.8px;
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          .reservation-badge span {
            display: block;
            font-family: var(--font-serif);
            font-size: 28px;
            line-height: 1;
          }
          .reservation-flow {
            background: var(--color-white);
            border-top: 1px solid var(--color-linen);
            padding: 76px 0;
          }
          .reservation-flow-grid {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .reservation-step {
            border-top: 1px solid var(--color-gold);
            padding-top: 22px;
          }
          .reservation-step span {
            color: var(--color-gold);
            display: block;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            margin-bottom: 12px;
          }
          .reservation-step h2 {
            font-size: 34px;
            font-weight: 500;
            line-height: 1;
            margin: 0 0 10px;
          }
          .reservation-step p {
            color: var(--color-gray);
            line-height: 1.7;
            margin: 0;
          }
          .reservation-booking {
            background: var(--color-linen);
            padding: 90px 0;
          }
          .reservation-booking-grid {
            align-items: start;
            display: grid;
            gap: 34px;
            grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
          }
          .reservation-info-panel {
            background: var(--color-dark);
            color: var(--color-ivory);
            padding: 32px;
            position: sticky;
            top: 96px;
          }
          .reservation-info-panel h2 {
            color: var(--color-ivory);
            font-family: var(--font-serif);
            font-size: 42px;
            font-weight: 400;
            line-height: 1;
            margin: 0 0 18px;
          }
          .reservation-info-panel p {
            color: rgba(248,245,240,0.72);
            line-height: 1.75;
          }
          .reservation-promises {
            display: grid;
            gap: 18px;
            margin-top: 28px;
          }
          .reservation-promise {
            align-items: flex-start;
            display: grid;
            gap: 14px;
            grid-template-columns: 38px 1fr;
          }
          .reservation-promise svg {
            color: var(--color-gold);
            margin-top: 2px;
          }
          .reservation-promise strong {
            color: var(--color-ivory);
            display: block;
            margin-bottom: 4px;
          }
          .reservation-promise span {
            color: rgba(248,245,240,0.68);
            display: block;
            font-size: 14px;
            line-height: 1.6;
          }
          @media (max-width: 980px) {
            .reservation-hero-grid,
            .reservation-booking-grid {
              grid-template-columns: 1fr;
            }
            .reservation-media {
              min-height: 520px;
            }
            .reservation-info-panel {
              position: static;
            }
          }
          @media (max-width: 760px) {
            .reservation-hero {
              padding: 104px 0 42px;
            }
            .reservation-hero-grid {
              gap: 28px;
            }
            .reservation-title {
              font-size: clamp(40px, 13vw, 58px);
              margin-bottom: 16px;
            }
            .reservation-copy {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 22px;
            }
            .reservation-flow {
              padding: 44px 0;
            }
            .reservation-flow-grid {
              grid-template-columns: 1fr;
              gap: 18px;
            }
            .reservation-step {
              padding-top: 16px;
            }
            .reservation-step h2 {
              font-size: 28px;
            }
            .reservation-step p {
              line-height: 1.55;
            }
            .reservation-media {
              min-height: 260px;
            }
            .reservation-media-main {
              right: 0;
            }
            .reservation-media-detail {
              display: none;
            }
            .reservation-booking {
              padding: 46px 0;
            }
            .reservation-info-panel {
              padding: 24px;
            }
            .reservation-info-panel h2 {
              font-size: 34px;
              margin-bottom: 12px;
            }
            .reservation-info-panel p {
              line-height: 1.6;
              margin: 0;
            }
            .reservation-promises {
              gap: 12px;
              margin-top: 22px;
            }
            .reservation-promise {
              gap: 10px;
              grid-template-columns: 30px 1fr;
            }
          }
        `}</style>
        <div className="container-rc reservation-hero-grid">
          <div>
            <div className="reservation-kicker">
              <Scissors aria-hidden="true" size={15} /> Atelier privé
            </div>
            <h1 className="reservation-title">Réservez votre séance de mesure.</h1>
            <p className="reservation-copy">
              Un rendez-vous simple pour définir votre silhouette, votre occasion et les finitions qui feront la différence.
            </p>
            <div className="reservation-quick">
              <a className="btn btn-gold" href="#booking">
                Commencer <ArrowRight aria-hidden="true" size={16} />
              </a>
              <a className="text-link" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </div>
          </div>

          <div className="reservation-media" aria-hidden="true">
            <div className="reservation-media-main">
              <Image src={asset('/aziz-media/instagram/atelier-boutique-window.jpg')} alt="" fill priority sizes="(max-width: 980px) 100vw, 48vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="reservation-media-detail">
              <Image src={asset('/aziz-media/ref-fabric-measurement.jpg')} alt="" fill sizes="230px" style={{ objectFit: 'cover' }} />
            </div>
            <div className="reservation-badge">
              <strong>Sidi Maarouf</strong>
              <span>Consultation sur rendez-vous</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reservation-flow">
        <div className="container-rc reservation-flow-grid">
          {steps.map(([number, title, text]) => (
            <article key={title} className="reservation-step">
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="booking" className="reservation-booking">
        <div className="container-rc reservation-booking-grid">
          <aside className="reservation-info-panel">
            <Ruler aria-hidden="true" color="var(--color-gold)" size={28} />
            <h2>Un rendez-vous, pas un formulaire.</h2>
            <p>
              La demande ouvre WhatsApp avec les détails déjà préparés. L&apos;atelier peut ensuite confirmer l&apos;horaire et vous guider avant votre visite.
            </p>
            <div className="reservation-promises">
              {promises.map(({ icon: Icon, title, text }) => (
                <div key={title} className="reservation-promise">
                  <Icon aria-hidden="true" size={22} />
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link className="text-link" href="/about" style={{ display: 'inline-block', marginTop: 28 }}>
              Voir la page À propos
            </Link>
          </aside>
          <ReservationForm />
        </div>
      </section>
    </SitePage>
  );
}
