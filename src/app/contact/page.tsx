import type { Metadata } from 'next';
import { FaPhone, FaWhatsapp } from 'react-icons/fa6';
import ContactForm from '@/components/ContactForm';
import { PageHero, SitePage } from '@/components/SitePage';
import { ADDRESS_DISPLAY, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous - Aziz EL Mire Atelier Casablanca',
  description:
    'Contactez notre atelier a Sidi Maarouf, Casablanca. WhatsApp, telephone ou formulaire. Consultation sur mesure disponible.',
};

const mapQuery = encodeURIComponent(ADDRESS_DISPLAY);

export default function ContactPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Contactez l'Atelier" title="Contact & Reservation">
        WhatsApp, telephone ou formulaire: choisissez le chemin le plus simple pour organiser votre rendez-vous.
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
              <a className="whatsapp-large" href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous a l'atelier.")} target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" /> Ecrire sur WhatsApp
              </a>
              <p style={{ marginBottom: 0 }}>
                <a className="text-link" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </p>
            </div>

            <div className="contact-card">
              <p className="eyebrow">Telephone</p>
              <a className="text-link" href={`tel:${PHONE_TEL}`} style={{ alignItems: 'center', display: 'inline-flex', gap: 10 }}>
                <FaPhone aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <p className="body-large" style={{ marginBottom: 0 }}>Lun-Sam 10h-20h</p>
            </div>

            <div className="contact-card" style={{ background: 'var(--color-linen)' }}>
              Pour un costume sur mesure, prevoyez 30 a 45 minutes pour le premier rendez-vous.
            </div>
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            <div className="contact-card">
              <p className="eyebrow">Rendez-vous</p>
              <h2 className="section-title" style={{ fontSize: 34 }}>Demande rapide</h2>
              <ContactForm />
            </div>

            <div className="contact-card">
              <p className="eyebrow">Adresse</p>
              <p className="body-large">{ADDRESS_DISPLAY}</p>
              <iframe
                className="contact-map"
                title="Google Maps Aziz EL Mire Haute Couture"
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
