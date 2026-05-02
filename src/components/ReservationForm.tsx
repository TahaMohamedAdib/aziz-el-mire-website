'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Check, Clock, House, MapPin, MessageCircle, TicketCheck, UserRound } from 'lucide-react';
import { ADDRESS_DISPLAY, whatsappUrl } from '@/lib/catalog';

const locations = [
  {
    value: `Atelier - ${ADDRESS_DISPLAY}`,
    title: 'Atelier',
    text: ADDRESS_DISPLAY,
    Icon: MapPin,
  },
  {
    value: 'À domicile',
    title: 'À domicile',
    text: 'Rendez-vous personnalisé chez vous, à confirmer selon votre adresse.',
    Icon: House,
  },
];

const services = [
  {
    value: 'Rendez-vous découverte',
    title: 'Rendez-vous découverte',
    text: 'Une première consultation pour comprendre votre besoin, votre occasion et votre style.',
  },
  {
    value: 'Rendez vous prise de mesure',
    title: 'Rendez vous prise de mesure',
    text: 'Prise de mesures complète, choix du tissu, coupe et finitions.',
  },
  {
    value: 'Essayage après prise de mesure',
    title: 'Essayage après prise de mesure',
    text: 'Essayage, vérification du tombé et ajustements avant finalisation.',
  },
];

const provider = {
  value: 'Maison El Mire Atelier Casablanca',
  title: 'Maison El Mire Atelier Casablanca',
  text: 'Atelier privé à Sidi Maarouf, Casablanca.',
};

const timeSlots = ['10:00', '11:00', '12:00', '15:00', '16:00', '17:30', '19:00'];

const steps = ['Le lieu', 'Service', 'Prestataire', 'Heure', 'Client'];

const buildAvailableDays = () => {
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    weekday: 'short',
  });
  const toLocalDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    return {
      value: toLocalDateValue(date),
      label: formatter.format(date).replace('.', ''),
      day: date.getDate().toString().padStart(2, '0'),
    };
  });
};

export default function ReservationForm() {
  const availableDays = useMemo(() => buildAvailableDays(), []);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0].value);
  const [selectedService, setSelectedService] = useState(services[0].value);
  const [selectedDate, setSelectedDate] = useState(availableDays[0]?.value ?? '');
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [homeAddress, setHomeAddress] = useState('');

  const buildReservationMessage = (formData: FormData) => {
    const getValue = (field: string) => String(formData.get(field) ?? '').trim();
    const dateValue = selectedDate;
    const date = dateValue ? new Date(`${dateValue}T00:00:00`) : null;
    const formattedDate = date && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat('fr-MA').format(date) : dateValue;
    const remarks = getValue('remarks');
    const promoOptIn = formData.get('promo') ? 'Oui' : 'Non';

    return [
      'Bonjour, je souhaite réserver un rendez-vous Maison El Mire.',
      `Lieu : ${selectedLocation}`,
      homeAddress ? `Adresse domicile : ${homeAddress}` : '',
      `Service : ${selectedService}`,
      `Prestataire : ${provider.value}`,
      `Date souhaitée : ${formattedDate}`,
      `Heure souhaitée : ${selectedTime}`,
      `Nom : ${getValue('name')}`,
      `E-mail : ${getValue('email')}`,
      `Téléphone : ${getValue('phone')}`,
      `Accompagnants : ${getValue('companions') || '0'}`,
      `Offres / promotions : ${promoOptIn}`,
      remarks ? `Remarques : ${remarks}` : '',
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
          margin-bottom: 28px;
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
        .booking-progress {
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          margin-bottom: 28px;
        }
        .booking-progress-step {
          background: transparent;
          border: 0;
          border-top: 2px solid var(--color-linen);
          color: var(--color-gray);
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.1px;
          min-height: 42px;
          padding: 10px 0 0;
          text-align: left;
          text-transform: uppercase;
        }
        .booking-progress-step.is-active,
        .booking-progress-step.is-done {
          border-top-color: var(--color-gold);
          color: var(--color-dark);
        }
        .booking-step {
          border-top: 1px solid var(--color-linen);
          min-height: 360px;
          padding: 24px 0;
        }
        .booking-step:first-of-type {
          border-top: 1px solid var(--color-linen);
          padding-top: 0;
        }
        .booking-step-title {
          align-items: center;
          color: var(--color-dark);
          display: flex;
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 500;
          gap: 10px;
          line-height: 1;
          margin: 0 0 16px;
        }
        .booking-step-title span {
          color: var(--color-gold);
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.6px;
          text-transform: uppercase;
        }
        .booking-options {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .booking-options.is-three {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .booking-option input,
        .date-option input,
        .time-option input {
          opacity: 0;
          pointer-events: none;
          position: absolute;
        }
        .booking-option-card {
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          cursor: pointer;
          display: grid;
          gap: 10px;
          min-height: 124px;
          padding: 18px;
          transition: background 200ms ease, border-color 200ms ease, transform 200ms ease;
        }
        .booking-option-card:hover {
          transform: translateY(-1px);
        }
        .booking-option-card strong {
          align-items: flex-start;
          display: flex;
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 500;
          justify-content: space-between;
          line-height: 1;
        }
        .booking-option-card small {
          color: var(--color-gray);
          font-size: 13px;
          line-height: 1.5;
        }
        .booking-option-check {
          color: transparent;
          flex: 0 0 auto;
        }
        .booking-option input:checked + .booking-option-card,
        .provider-card {
          background: var(--color-ivory);
          border-color: var(--color-gold);
        }
        .booking-option input:checked + .booking-option-card .booking-option-check,
        .provider-card .booking-option-check {
          color: var(--color-gold);
        }
        .date-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-bottom: 12px;
        }
        .date-option span,
        .time-option span {
          align-items: center;
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          cursor: pointer;
          display: flex;
          font-size: 14px;
          font-weight: 600;
          justify-content: center;
          min-height: 46px;
          text-align: center;
          transition: background 200ms ease, border-color 200ms ease, color 200ms ease;
        }
        .date-option span {
          flex-direction: column;
          gap: 4px;
          min-height: 68px;
          text-transform: capitalize;
        }
        .date-option small {
          color: var(--color-gray);
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
        }
        .date-option input:checked + span,
        .time-option input:checked + span {
          background: var(--color-dark);
          border-color: var(--color-dark);
          color: var(--color-ivory);
        }
        .date-option input:checked + span small {
          color: var(--color-ivory);
        }
        .time-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .reservation-fields {
          display: grid;
          gap: 16px;
        }
        .reservation-field-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr 1fr;
        }
        .promo-check {
          align-items: flex-start;
          color: var(--color-gray);
          display: flex;
          font-size: 13px;
          gap: 10px;
          line-height: 1.5;
        }
        .promo-check input {
          accent-color: var(--color-gold);
          margin-top: 3px;
        }
        .reservation-submit {
          margin-top: 2px;
          width: 100%;
        }
        .booking-actions {
          align-items: center;
          border-top: 1px solid var(--color-linen);
          display: flex;
          gap: 12px;
          justify-content: space-between;
          padding-top: 20px;
        }
        .booking-actions .btn {
          min-width: 128px;
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
        @media (max-width: 760px) {
          .reservation-form-shell { padding: 18px; }
          .reservation-form-head {
            gap: 10px;
            margin-bottom: 18px;
          }
          .reservation-form-icon {
            height: 40px;
            width: 40px;
          }
          .booking-options,
          .booking-options.is-three,
          .reservation-field-grid,
          .date-grid,
          .time-grid,
          .booking-progress {
            grid-template-columns: 1fr;
          }
          .booking-progress {
            gap: 0;
            margin-bottom: 18px;
          }
          .booking-progress-step {
            min-height: 32px;
            padding-top: 7px;
          }
          .booking-step {
            min-height: 0;
            padding: 18px 0;
          }
          .booking-step-title {
            font-size: 22px;
            margin-bottom: 12px;
          }
          .booking-option-card {
            min-height: 0;
            padding: 13px;
          }
          .booking-option-card strong {
            font-size: 21px;
          }
          .booking-option-card small {
            font-size: 12px;
            line-height: 1.35;
          }
        }
      `}</style>
      <div className="reservation-form-head">
        <span className="reservation-form-icon">
          <CalendarDays aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="eyebrow" style={{ marginBottom: 8 }}>Votre rendez-vous</p>
          <h2 className="section-title" style={{ fontSize: 36, margin: 0 }}>Réserver</h2>
        </div>
      </div>
      <div className="booking-progress" aria-label="Étapes de réservation">
        {steps.map((step, index) => (
          <button
            key={step}
            type="button"
            className={`booking-progress-step ${index === activeStep ? 'is-active' : ''} ${index < activeStep ? 'is-done' : ''}`}
            onClick={() => setActiveStep(index)}
          >
            {String(index + 1).padStart(2, '0')} {step}
          </button>
        ))}
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
        {activeStep === 0 ? (
          <section className="booking-step" aria-labelledby="booking-location">
            <h3 id="booking-location" className="booking-step-title"><span>Le lieu</span></h3>
            <div className="booking-options">
              {locations.map(({ value, title, text, Icon }) => (
                <label key={value} className="booking-option">
                  <input
                    type="radio"
                    name="location"
                    value={value}
                    checked={selectedLocation === value}
                    onChange={() => setSelectedLocation(value)}
                  />
                  <span className="booking-option-card">
                    <strong>{title}<Check className="booking-option-check" aria-hidden="true" size={18} /></strong>
                    <small><Icon aria-hidden="true" size={14} /> {text}</small>
                  </span>
                </label>
              ))}
            </div>
            {selectedLocation === 'À domicile' ? (
              <div style={{ marginTop: 12 }}>
                <input
                  className="input-field"
                  name="address"
                  placeholder="Adresse pour le rendez-vous à domicile"
                  aria-label="Adresse pour le rendez-vous à domicile"
                  value={homeAddress}
                  onChange={(event) => setHomeAddress(event.target.value)}
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {activeStep === 1 ? (
          <section className="booking-step" aria-labelledby="booking-service">
            <h3 id="booking-service" className="booking-step-title"><span>Service</span></h3>
            <div className="booking-options is-three">
              {services.map((service) => (
                <label key={service.value} className="booking-option">
                  <input
                    type="radio"
                    name="service"
                    value={service.value}
                    checked={selectedService === service.value}
                    onChange={() => setSelectedService(service.value)}
                  />
                  <span className="booking-option-card">
                    <strong>{service.title}<Check className="booking-option-check" aria-hidden="true" size={18} /></strong>
                    <small>{service.text}</small>
                  </span>
                </label>
              ))}
            </div>
          </section>
        ) : null}

        {activeStep === 2 ? (
          <section className="booking-step" aria-labelledby="booking-provider">
            <h3 id="booking-provider" className="booking-step-title"><span>Prestataire</span></h3>
            <div className="booking-options">
              <div className="booking-option-card provider-card">
                <strong>{provider.title}<Check className="booking-option-check" aria-hidden="true" size={18} /></strong>
                <small>{provider.text}</small>
              </div>
            </div>
          </section>
        ) : null}

        {activeStep === 3 ? (
          <section className="booking-step" aria-labelledby="booking-time">
            <h3 id="booking-time" className="booking-step-title"><span>Heure</span></h3>
            <div className="date-grid" aria-label="Calendrier">
              {availableDays.map((day) => (
                <label key={day.value} className="date-option">
                  <input
                    type="radio"
                    name="date"
                    value={day.value}
                    checked={selectedDate === day.value}
                    onChange={() => setSelectedDate(day.value)}
                  />
                  <span>
                    {day.label}
                    <small>Jour {day.day}</small>
                  </span>
                </label>
              ))}
            </div>
            <div className="time-grid">
              {timeSlots.map((slot) => (
                <label key={slot} className="time-option">
                  <input
                    type="radio"
                    name="time"
                    value={slot}
                    checked={selectedTime === slot}
                    onChange={() => setSelectedTime(slot)}
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </section>
        ) : null}

        {activeStep === 4 ? (
          <section className="booking-step" aria-labelledby="booking-client">
            <h3 id="booking-client" className="booking-step-title"><span>Client</span></h3>
            <div className="reservation-fields">
              <div className="reservation-field-grid">
                <input className="input-field" name="name" placeholder="Nom complet" aria-label="Nom complet" autoComplete="name" required />
                <input className="input-field" name="email" type="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail" autoComplete="email" spellCheck={false} required />
              </div>
              <div className="reservation-field-grid">
                <input className="input-field" name="phone" type="tel" inputMode="tel" placeholder="Téléphone" aria-label="Téléphone" autoComplete="tel" required />
                <input className="input-field" name="companions" type="number" inputMode="numeric" min="0" defaultValue="0" placeholder="Accompagnants" aria-label="Nombre d'accompagnants" />
              </div>
              <textarea className="input-field" name="remarks" placeholder="Remarques: occasion, délai, style recherché..." aria-label="Remarques" rows={5} />
              <label className="promo-check">
                <input type="checkbox" name="promo" value="Oui" />
                <span>Je souhaite recevoir les offres et informations Maison El Mire.</span>
              </label>
              <button className="btn btn-gold reservation-submit" type="submit">
                <MessageCircle aria-hidden="true" size={17} /> Réserver
              </button>
            </div>
          </section>
        ) : null}

        <div className="booking-actions">
          <button
            className="btn btn-outline"
            type="button"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
          >
            Retour
          </button>
          {activeStep < steps.length - 1 ? (
            <button
              className="btn btn-gold"
              type="button"
              onClick={() => setActiveStep((step) => Math.min(steps.length - 1, step + 1))}
            >
              Continuer
            </button>
          ) : null}
        </div>
      </form>
      <div className="reservation-note">
        <span><Clock aria-hidden="true" size={15} /> Créneaux personnalisés</span>
        <span><TicketCheck aria-hidden="true" size={15} /> Confirmation via WhatsApp</span>
        <span><UserRound aria-hidden="true" size={15} /> Maison El Mire Atelier Casablanca</span>
      </div>
    </div>
  );
}
