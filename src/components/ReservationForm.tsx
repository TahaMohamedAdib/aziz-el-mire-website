'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, Clock, House, Loader2, MapPin, MessageCircle, Scissors, TicketCheck, UserRound } from 'lucide-react';
import { ADDRESS_DISPLAY, whatsappUrl } from '@/lib/catalog';
import { createReservation, getAvailableSlots } from '@/lib/db';
import type { DbSlot, LocationType, ServiceType, SlotsByDate } from '@/lib/db';

const locations: { value: LocationType; title: string; text: string; Icon: React.ElementType }[] = [
  {
    value: 'atelier',
    title: 'Atelier',
    text: ADDRESS_DISPLAY,
    Icon: MapPin,
  },
  {
    value: 'domicile',
    title: 'À domicile',
    text: 'Rendez-vous personnalisé chez vous, à confirmer selon votre adresse.',
    Icon: House,
  },
];

const services: { value: ServiceType; title: string; text: string }[] = [
  {
    value: 'Rendez-vous découverte',
    title: 'Rendez-vous découverte',
    text: 'Une première consultation pour comprendre votre besoin, votre occasion et votre style.',
  },
  {
    value: 'Prise de mesure',
    title: 'Prise de mesure',
    text: 'Prise de mesures complète, choix du tissu, coupe et finitions.',
  },
  {
    value: 'Essayage après prise de mesure',
    title: 'Essayage après prise de mesure',
    text: 'Essayage, vérification du tombé et ajustements avant finalisation.',
  },
];

const provider = {
  title: 'Maison El Mire Atelier Casablanca',
  text: 'Atelier privé à Sidi Maarouf, Casablanca.',
};

const steps = ['Le lieu', 'Service', 'Prestataire', 'Heure', 'Client'];

const FR_DAY = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' });
const FR_DATE = new Intl.DateTimeFormat('fr-MA');

function formatDateLabel(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return FR_DAY.format(d).replace(/\./g, '');
}

function formatDateDisplay(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return FR_DATE.format(d);
}

export default function ReservationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [selectedLocation, setSelectedLocation] = useState<LocationType>('atelier');
  const [selectedService, setSelectedService] = useState<ServiceType>('Rendez-vous découverte');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<DbSlot | null>(null);
  const [homeAddress, setHomeAddress] = useState('');

  const [slots, setSlots] = useState<SlotsByDate>({});
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState('');

  useEffect(() => {
    getAvailableSlots(30).then((data) => {
      setSlots(data);
      const firstDate = Object.keys(data)[0] ?? '';
      setSelectedDate(firstDate);
      setSelectedSlot(data[firstDate]?.[0] ?? null);
      setSlotsLoading(false);
    }).catch(() => {
      setSlotsError('Impossible de charger les créneaux. Veuillez réessayer.');
      setSlotsLoading(false);
    });
  }, []);

  const sortedDates = useMemo(() => Object.keys(slots).sort(), [slots]);

  const timeSlotsForDate: DbSlot[] = useMemo(
    () => (selectedDate ? (slots[selectedDate] ?? []) : []),
    [slots, selectedDate],
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const firstSlot = slots[date]?.[0] ?? null;
    setSelectedSlot(firstSlot);
  };

  const buildWhatsAppMessage = (name: string, email: string, phone: string, companions: string, remarks: string, promoOptIn: boolean) => {
    return [
      'Bonjour, je souhaite réserver un rendez-vous Maison El Mire.',
      `Lieu : ${selectedLocation === 'atelier' ? `Atelier - ${ADDRESS_DISPLAY}` : 'À domicile'}`,
      homeAddress && selectedLocation === 'domicile' ? `Adresse domicile : ${homeAddress}` : '',
      `Service : ${selectedService}`,
      `Prestataire : ${provider.title}`,
      `Date souhaitée : ${selectedDate ? formatDateDisplay(selectedDate) : ''}`,
      `Heure souhaitée : ${selectedSlot?.time ?? ''}`,
      `Nom : ${name}`,
      `E-mail : ${email}`,
      `Téléphone : ${phone}`,
      `Accompagnants : ${companions || '0'}`,
      `Offres / promotions : ${promoOptIn ? 'Oui' : 'Non'}`,
      remarks ? `Remarques : ${remarks}` : '',
    ].filter(Boolean).join('\n');
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
        .slots-empty {
          align-items: center;
          color: var(--color-gray);
          display: flex;
          flex-direction: column;
          font-size: 14px;
          gap: 10px;
          justify-content: center;
          min-height: 200px;
          text-align: center;
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
          Merci. Votre réservation est confirmée. WhatsApp s&apos;ouvre avec les détails.
        </div>
      ) : null}
      {submitError ? (
        <div role="alert" style={{ background: 'rgba(180,30,30,0.08)', border: '1px solid rgba(180,30,30,0.3)', color: '#b01e1e', marginBottom: '20px', padding: '14px', fontSize: '14px' }}>
          {submitError}
        </div>
      ) : null}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!selectedSlot) return;
          const formData = new FormData(event.currentTarget);
          const getValue = (field: string) => String(formData.get(field) ?? '').trim();
          const name = getValue('name');
          const email = getValue('email');
          const phone = getValue('phone');
          const companions = getValue('companions');
          const remarks = getValue('remarks');
          const promoOptIn = formData.get('promo') === 'Oui';

          setSubmitting(true);
          setSubmitError('');

          const result = await createReservation({
            slot_id: selectedSlot.id,
            client_name: name,
            client_email: email,
            client_phone: phone,
            service: selectedService,
            location: selectedLocation,
            home_address: selectedLocation === 'domicile' ? homeAddress : undefined,
            companions: Number(companions) || 0,
            remarks: remarks || undefined,
            promo_optin: promoOptIn,
          });

          setSubmitting(false);

          if (!result.ok) {
            setSubmitError(result.error ?? 'Une erreur est survenue. Réessayez.');
            return;
          }

          setSubmitted(true);
          const msg = buildWhatsAppMessage(name, email, phone, companions, remarks, promoOptIn);
          const url = whatsappUrl(msg);
          const opened = window.open(url, '_blank', 'noopener,noreferrer');
          if (!opened) window.location.href = url;
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
            {selectedLocation === 'domicile' ? (
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
            {slotsLoading ? (
              <div className="slots-empty">
                <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true" />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                Chargement des créneaux…
              </div>
            ) : slotsError ? (
              <div className="slots-empty" style={{ color: '#b01e1e' }}>{slotsError}</div>
            ) : sortedDates.length === 0 ? (
              <div className="slots-empty">
                <Scissors size={28} aria-hidden="true" />
                Aucun créneau disponible pour le moment. Contactez-nous directement.
              </div>
            ) : (
              <>
                <div className="date-grid" aria-label="Calendrier">
                  {sortedDates.map((date) => (
                    <label key={date} className="date-option">
                      <input
                        type="radio"
                        name="date"
                        value={date}
                        checked={selectedDate === date}
                        onChange={() => handleDateChange(date)}
                      />
                      <span>
                        {formatDateLabel(date)}
                        <small>{new Date(`${date}T00:00:00`).getDate().toString().padStart(2, '0')}</small>
                      </span>
                    </label>
                  ))}
                </div>
                <div className="time-grid">
                  {timeSlotsForDate.map((slot) => (
                    <label key={slot.id} className="time-option">
                      <input
                        type="radio"
                        name="time"
                        value={slot.id}
                        checked={selectedSlot?.id === slot.id}
                        onChange={() => setSelectedSlot(slot)}
                      />
                      <span>{slot.time.slice(0, 5)}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
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
              <button className="btn btn-gold reservation-submit" type="submit" disabled={submitting || !selectedSlot}>
                {submitting ? (
                  <><Loader2 aria-hidden="true" size={17} style={{ animation: 'spin 1s linear infinite' }} /> Envoi en cours…</>
                ) : (
                  <><MessageCircle aria-hidden="true" size={17} /> Réserver</>
                )}
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
        <span><Clock aria-hidden="true" size={15} /> Créneaux en temps réel</span>
        <span><TicketCheck aria-hidden="true" size={15} /> Confirmation via WhatsApp</span>
        <span><UserRound aria-hidden="true" size={15} /> Maison El Mire Atelier Casablanca</span>
      </div>
    </div>
  );
}
