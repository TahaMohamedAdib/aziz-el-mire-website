'use client';

import { useState } from 'react';
import { CalendarDays, Check, Clock, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/catalog';

const services = [
  {
    value: 'Costume sur mesure',
    title: 'Costume sur mesure',
    text: 'Coupe, tissu et finitions adaptés à votre silhouette.',
  },
  {
    value: 'Smoking mariage',
    title: 'Smoking mariage',
    text: 'Une allure cérémonie précise, élégante et personnelle.',
  },
  {
    value: 'Retouches & ajustements',
    title: 'Retouches',
    text: 'Ajuster une pièce pour retrouver le bon tombé.',
  },
  {
    value: 'Conseil style',
    title: 'Conseil style',
    text: 'Choisir la tenue juste pour un événement important.',
  },
];

export default function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0].value);

  const buildReservationMessage = (formData: FormData) => {
    const getValue = (field: string) => String(formData.get(field) ?? '').trim();
    const dateValue = getValue('date');
    const date = dateValue ? new Date(`${dateValue}T00:00:00`) : null;
    const formattedDate = date && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat('fr-MA').format(date) : dateValue;
    const message = getValue('message');

    return [
      'Bonjour, je souhaite prendre rendez-vous pour un costume sur mesure.',
      `Nom : ${getValue('name')}`,
      `Téléphone : ${getValue('phone')}`,
      `E-mail : ${getValue('email')}`,
      `Date souhaitée : ${formattedDate}`,
      `Heure souhaitée : ${getValue('time')}`,
      `Service : ${getValue('service')}`,
      message ? `Message : ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <div className="reservation-form-shell">
      <style>{`
        .reservation-form-shell {
          background: var(--color-white);
          border: 1px solid rgba(184,151,90,0.24);
          padding: 30px;
        }
        .reservation-form-head {
          display: flex;
          gap: 14px;
          margin-bottom: 24px;
        }
        .reservation-form-icon {
          align-items: center;
          background: var(--color-dark);
          color: var(--color-ivory);
          display: inline-flex;
          height: 46px;
          justify-content: center;
          width: 46px;
        }
        .service-options {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .service-option input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        .service-option span {
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          cursor: pointer;
          display: grid;
          min-height: 132px;
          padding: 18px;
          transition: border-color 200ms ease, background 200ms ease;
        }
        .service-option strong {
          display: flex;
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 500;
          justify-content: space-between;
          line-height: 1;
          margin-bottom: 10px;
        }
        .service-option small {
          color: var(--color-gray);
          font-size: 13px;
          line-height: 1.5;
        }
        .service-option svg {
          color: transparent;
          flex: 0 0 auto;
        }
        .service-option input:checked + span {
          background: var(--color-ivory);
          border-color: var(--color-gold);
        }
        .service-option input:checked + span svg {
          color: var(--color-gold);
        }
        .reservation-fields {
          display: grid;
          gap: 16px;
          margin-top: 18px;
        }
        .reservation-field-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr 1fr;
        }
        .reservation-submit {
          margin-top: 2px;
          width: 100%;
        }
        .reservation-note {
          align-items: center;
          color: var(--color-gray);
          display: flex;
          flex-wrap: wrap;
          font-size: 13px;
          gap: 12px;
          margin-top: 16px;
        }
        .reservation-note span {
          align-items: center;
          display: inline-flex;
          gap: 7px;
        }
        @media (max-width: 680px) {
          .reservation-form-shell { padding: 18px; }
          .reservation-form-head {
            gap: 10px;
            margin-bottom: 18px;
          }
          .reservation-form-icon {
            height: 40px;
            width: 40px;
          }
          .service-options,
          .reservation-field-grid { grid-template-columns: 1fr; }
          .service-options,
          .reservation-fields {
            gap: 10px;
          }
          .service-option span {
            min-height: 0;
            padding: 13px;
          }
          .service-option strong {
            font-size: 21px;
            margin-bottom: 5px;
          }
          .service-option small {
            font-size: 12px;
            line-height: 1.35;
          }
          .reservation-note {
            gap: 8px;
            margin-top: 12px;
          }
        }
      `}</style>
      <div className="reservation-form-head">
        <span className="reservation-form-icon">
          <CalendarDays aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="eyebrow" style={{ marginBottom: 8 }}>Votre rendez-vous</p>
          <h2 className="section-title" style={{ fontSize: 36, margin: 0 }}>Demande rapide</h2>
        </div>
      </div>
      {submitted ? (
        <div role="status" aria-live="polite" style={{ background: 'rgba(184,151,90,0.12)', border: '1px solid rgba(184,151,90,0.32)', color: 'var(--color-dark)', marginBottom: '20px', padding: '18px' }}>
          Merci. WhatsApp s&apos;ouvre avec les informations de votre rendez-vous.
        </div>
      ) : null}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const url = whatsappUrl(buildReservationMessage(formData));
          setSubmitted(true);
          const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
          if (!openedWindow) {
            window.location.href = url;
          }
        }}
      >
        <div className="service-options">
          {services.map((service) => (
            <label key={service.value} className="service-option">
              <input
                type="radio"
                name="service"
                value={service.value}
                checked={selectedService === service.value}
                onChange={() => setSelectedService(service.value)}
              />
              <span>
                <strong>{service.title}<Check aria-hidden="true" size={18} /></strong>
                <small>{service.text}</small>
              </span>
            </label>
          ))}
        </div>

        <div className="reservation-fields">
          <div className="reservation-field-grid">
            <input className="input-field" name="name" placeholder="Nom complet" aria-label="Nom complet" autoComplete="name" required />
            <input className="input-field" name="phone" type="tel" inputMode="tel" placeholder="Téléphone" aria-label="Téléphone" autoComplete="tel" required />
          </div>
          <input className="input-field" name="email" type="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail" autoComplete="email" spellCheck={false} required />
          <div className="reservation-field-grid">
            <input className="input-field" name="date" type="date" aria-label="Date souhaitée" required />
            <input className="input-field" name="time" type="time" aria-label="Heure souhaitée" required />
          </div>
          <textarea className="input-field" name="message" placeholder="Message optionnel: occasion, délai, style recherché..." aria-label="Message optionnel" rows={5} />
          <button className="btn btn-gold reservation-submit" type="submit">
            <MessageCircle aria-hidden="true" size={17} /> Confirmer sur WhatsApp
          </button>
        </div>
      </form>
      <div className="reservation-note">
        <span><Clock aria-hidden="true" size={15} /> 30 à 45 minutes</span>
        <span><MessageCircle aria-hidden="true" size={15} /> Confirmation via WhatsApp</span>
      </div>
    </div>
  );
}
