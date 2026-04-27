import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { PageHero, SitePage } from '@/components/SitePage';
import { ContactSocialButtons } from '@/components/SocialLinks';
import { ADDRESS_DISPLAY, PHONE_DISPLAY } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Aziz EL Mire Haute Couture à Sidi Maarouf.',
};

const mapQuery = encodeURIComponent(ADDRESS_DISPLAY);

export default function ContactPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Contact" title="Contact">
        Adresse, horaires, WhatsApp, réseaux sociaux et formulaire de contact.
      </PageHero>
      <section style={{ background: '#07100c', padding: '70px 20px 110px' }}>
        <style>{`
          .contact-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 54px; }
          @media (max-width: 820px) { .contact-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="container-rc contact-grid">
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', margin: '0 0 24px', textTransform: 'uppercase' }}>Informations</h2>
            <p className="footer-text">Adresse : {ADDRESS_DISPLAY}</p>
            <p className="footer-text">Téléphone : {PHONE_DISPLAY}</p>
            <p className="footer-text">WhatsApp : {PHONE_DISPLAY}</p>
            <p className="footer-text">Email : contact@azizelmire.com</p>
            <p className="footer-text">Horaires : Lundi - Samedi, 10h00 - 20h00</p>
            <p className="footer-text">Localisation : {ADDRESS_DISPLAY}</p>
            <div style={{ display: 'grid', gap: '14px', margin: '28px 0' }}>
              <ContactSocialButtons />
              <a className="contact-map-link" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">
                <MapPin aria-hidden="true" size={17} />
                Ouvrir dans Google Maps
              </a>
            </div>
            <iframe
              title="Google Maps Aziz EL Mire Haute Couture"
              src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
              style={{ border: 0, height: '280px', width: '100%' }}
              loading="lazy"
            />
          </div>
          <ContactForm />
        </div>
      </section>
    </SitePage>
  );
}
