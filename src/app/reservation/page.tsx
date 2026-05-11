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
    "Réservez un rendez-vous Maison El Mire à Sidi Maarouf, Casablanca: découverte, prise de mesure ou essayage après prise de mesure.",
};

const steps = [
  ['01', 'Lieu & service', 'Choisissez l’atelier ou le domicile, puis le type de rendez-vous adapté.'],
  ['02', 'Créneau', 'Sélectionnez Maison El Mire Atelier Casablanca, une date et une heure disponibles.'],
  ['03', 'Client', 'Ajoutez vos coordonnées, accompagnants et remarques avant la confirmation WhatsApp.'],
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
        <div className="container-rc reservation-hero-grid">
          <div>
            <div className="reservation-kicker">
              <Scissors aria-hidden="true" size={15} /> Atelier privé
            </div>
            <h1 className="reservation-title">Réservez votre rendez-vous.</h1>
            <p className="reservation-copy">
              Un parcours guidé en cinq étapes pour choisir le lieu, le service, le prestataire, l’heure et vos informations client.
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
            <h2>Une réservation guidée.</h2>
            <p>
              Choisissez votre type de rendez-vous, votre créneau et vos détails client. La demande ouvre WhatsApp avec toutes les informations préparées.
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
