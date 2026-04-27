import type { Metadata } from 'next';
import Link from 'next/link';
import { FaPhone, FaWhatsapp } from 'react-icons/fa6';
import { PageHero, SitePage } from '@/components/SitePage';
import { ADDRESS_DISPLAY, EMAIL_DISPLAY, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Contact - Maison El Mire Atelier Casablanca',
  description:
    'Contactez notre atelier à Sidi Maarouf, Casablanca. WhatsApp, téléphone, e-mail et adresse de Maison El Mire.',
};

const mapQuery = encodeURIComponent(ADDRESS_DISPLAY);

export default function ContactPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Contactez l'atelier" title="Contact atelier">
        WhatsApp, téléphone, e-mail et adresse: retrouvez les informations essentielles de Maison El Mire.
      </PageHero>
      <section className="section-pad" style={{ background: 'var(--color-ivory)', paddingTop: 0 }}>
        <style>{`
          .contact-layout {
            display: grid;
            gap: 28px;
            grid-template-columns: 0.9fr 1.1fr;
          }
          .contact-card {
            background: white;
            border: 1px solid var(--color-linen);
            padding: 28px;
          }
          .whatsapp-large {
            align-items: center;
            background: #25D366;
            color: white;
            display: inline-flex;
            font-weight: 600;
            gap: 10px;
            justify-content: center;
            min-height: 54px;
            padding: 0 22px;
            text-transform: uppercase;
            width: 100%;
          }
          .contact-map {
            border: 0;
            height: 300px;
            width: 100%;
          }
          @media (max-width: 840px) {
            .contact-layout { grid-template-columns: 1fr; }
            .contact-map { height: 200px; }
          }
        `}</style>
        <div className="container-rc contact-layout">
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="contact-card">
              <p className="eyebrow">WhatsApp</p>
              <h2 className="section-title" style={{ fontSize: 34 }}>Action directe</h2>
              <a className="whatsapp-large" href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous à l'atelier.")} target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" /> Écrire sur WhatsApp
              </a>
              <p style={{ marginBottom: 0 }}>
                <a className="text-link" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </p>
            </div>

            <div className="contact-card">
              <p className="eyebrow">Téléphone</p>
              <a className="text-link" href={`tel:${PHONE_TEL}`} style={{ alignItems: 'center', display: 'inline-flex', gap: 10 }}>
                <FaPhone aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <p className="body-large" style={{ marginBottom: 0 }}>Lundi-samedi, 10h-20h</p>
            </div>

            <div className="contact-card" style={{ background: 'var(--color-linen)' }}>
              Pour réserver une séance de mesure, utilisez la page dédiée.
              <br />
              <Link className="text-link" href="/reservation">Aller à la réservation</Link>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            <div className="contact-card">
              <p className="eyebrow">Informations</p>
              <h2 className="section-title" style={{ fontSize: 34 }}>Atelier Casablanca</h2>
              <p className="body-large" style={{ marginBottom: 12 }}>{ADDRESS_DISPLAY}</p>
              <p style={{ margin: '0 0 10px' }}>
                <a className="text-link" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </p>
              <p style={{ margin: 0 }}>
                <a className="text-link" href={`mailto:${EMAIL_DISPLAY}`}>{EMAIL_DISPLAY}</a>
              </p>
            </div>

            <div className="contact-card">
              <p className="eyebrow">Adresse</p>
              <p className="body-large">{ADDRESS_DISPLAY}</p>
              <iframe
                className="contact-map"
                title="Google Maps Maison El Mire"
                src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
