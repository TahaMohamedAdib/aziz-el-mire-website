'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react';
import { ADDRESS_DISPLAY, EMAIL_DISPLAY, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '@/lib/catalog';

type StepKey = 'location' | 'service' | 'provider' | 'time' | 'client';

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  duration: string;
}

interface LocationOption {
  id: 'atelier' | 'domicile';
  title: string;
  display: string;
  description: string;
  meta: string;
}

interface TimeSlot {
  value: string;
  label: string;
}

const steps: Array<{ key: StepKey; label: string }> = [
  { key: 'location', label: 'Lieu' },
  { key: 'service', label: 'Service' },
  { key: 'provider', label: 'Prestataire' },
  { key: 'time', label: 'Heure' },
  { key: 'client', label: 'Client' },
];

const services: ServiceOption[] = [
  {
    id: 'decouverte',
    title: 'Rendez-vous découverte',
    description:
      'Non engageant, le rendez-vous découverte est un moment simple et convivial pour échanger sur vos envies. Nous vous expliquons notre démarche, partageons notre savoir-faire et réalisons un devis personnalisé.',
    duration: '1 H',
  },
  {
    id: 'prise-mesure',
    title: 'Rendez vous prise de mesure',
    description:
      'Validation du tissu, personnalisation et prise de mesure. Nous lançons en confection votre tenue.',
    duration: '1 H 30 MIN.',
  },
  {
    id: 'essayage',
    title: 'Essayage après prise de mesure',
    description:
      "Nous vérifions l'ensemble des ajustements à effectuer afin de parfaire votre tenue.",
    duration: '30 MIN.',
  },
];

const locations: LocationOption[] = [
  {
    id: 'atelier',
    title: 'Atelier Maison El Mire',
    display: ADDRESS_DISPLAY,
    description: ADDRESS_DISPLAY,
    meta: 'Atelier Casablanca',
  },
  {
    id: 'domicile',
    title: 'À domicile',
    display: 'À domicile',
    description: "Rendez-vous à l'adresse de votre choix. Nous confirmerons la zone et le déplacement sur WhatsApp.",
    meta: 'Adresse à préciser',
  },
];

const provider = {
  title: 'Maison El Mire Atelier Casablanca',
  description: "Prestataire dédié aux rendez-vous sur mesure à l'atelier.",
};

const weekdaySlots: Record<number, TimeSlot[]> = {
  1: [
    { value: '10:00', label: '10:00' },
    { value: '12:00', label: '12:00' },
    { value: '16:00', label: '16:00' },
    { value: '18:30', label: '18:30' },
  ],
  2: [
    { value: '10:30', label: '10:30' },
    { value: '13:00', label: '13:00' },
    { value: '17:00', label: '17:00' },
  ],
  3: [
    { value: '11:00', label: '11:00' },
    { value: '15:30', label: '15:30' },
    { value: '19:00', label: '19:00' },
  ],
  4: [
    { value: '10:00', label: '10:00' },
    { value: '14:00', label: '14:00' },
    { value: '18:00', label: '18:00' },
  ],
  5: [
    { value: '10:30', label: '10:30' },
    { value: '15:00', label: '15:00' },
    { value: '17:30', label: '17:30' },
  ],
  6: [
    { value: '11:00', label: '11:00' },
    { value: '13:30', label: '13:30' },
    { value: '16:30', label: '16:30' },
  ],
};

const toDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDate = (dateValue: string) => {
  const date = new Date(`${dateValue}T00:00:00`);
  return Number.isNaN(date.getTime()) ? dateValue : new Intl.DateTimeFormat('fr-MA').format(date);
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const getMonthDays = (monthAnchor: Date) => {
  const year = monthAnchor.getFullYear();
  const month = monthAnchor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: startOffset + daysInMonth }, (_, index) => {
    if (index < startOffset) {
      return null;
    }

    return new Date(year, month, index - startOffset + 1);
  });
};

export default function ReservationForm() {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const [activeStep, setActiveStep] = useState<StepKey>('location');
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [monthAnchor, setMonthAnchor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedLocationLabel = selectedLocation?.display ?? '';
  const selectedServiceTitle = selectedService?.title ?? '';
  const selectedDateObject = selectedDate ? new Date(`${selectedDate}T00:00:00`) : null;
  const visibleDays = useMemo(() => getMonthDays(monthAnchor), [monthAnchor]);
  const selectedSlots = selectedDateObject ? weekdaySlots[selectedDateObject.getDay()] ?? [] : [];

  const monthLabel = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(monthAnchor);

  const setStep = (step: StepKey) => {
    const index = steps.findIndex((item) => item.key === step);
    const locationReady = Boolean(selectedLocation);
    const serviceReady = Boolean(selectedService);
    const timeReady = Boolean(selectedDate && selectedTime);

    if (index <= 0 || (step === 'service' && locationReady) || (step === 'provider' && locationReady && serviceReady) || (step === 'time' && locationReady && serviceReady) || (step === 'client' && locationReady && serviceReady && timeReady)) {
      setActiveStep(step);
    }
  };

  const buildReservationMessage = (formData: FormData) => {
    const getValue = (field: string) => String(formData.get(field) ?? '').trim();
    const remarks = getValue('remarks');
    const companions = getValue('companions');
    const homeAddress = getValue('homeAddress');
    const promotion = formData.get('promotion_letters_flag') ? 'Oui' : 'Non';

    return [
      'Bonjour, je souhaite réserver un rendez-vous Maison El Mire.',
      `Lieu : ${selectedLocationLabel}`,
      selectedLocation?.id === 'domicile' && homeAddress ? `Adresse domicile : ${homeAddress}` : '',
      `Service : ${selectedServiceTitle}`,
      `Prestataire : ${provider.title}`,
      `Date : ${formatDate(selectedDate)}`,
      `Heure : ${selectedTime}`,
      `Nom : ${getValue('name')}`,
      `Téléphone : ${getValue('phone')}`,
      `E-mail : ${getValue('email')}`,
      companions ? `Nombre d'accompagnants : ${companions}` : '',
      remarks ? `Remarques : ${remarks}` : '',
      `Messages promotions : ${promotion}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <div className="reservation-form-shell">
      <style>{`
        .reservation-form-shell {
          background: var(--color-white);
          border: 1px solid rgba(201,169,110,0.24);
          padding: 0;
        }
        .booking-stepper {
          background: var(--color-dark);
          color: var(--color-ivory);
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }
        .booking-step {
          align-items: center;
          background: transparent;
          border: 0;
          border-right: 1px solid rgba(248,245,240,0.16);
          color: rgba(248,245,240,0.66);
          cursor: pointer;
          display: grid;
          gap: 5px;
          min-height: 76px;
          padding: 13px 12px;
          text-align: center;
        }
        .booking-step:last-child {
          border-right: 0;
        }
        .booking-step strong {
          color: inherit;
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 600;
          line-height: 1;
        }
        .booking-step span {
          color: rgba(248,245,240,0.56);
          font-size: 11px;
          min-height: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .booking-step.is-active {
          background: var(--color-brown);
          color: var(--color-white);
        }
        .booking-step.is-active span {
          color: rgba(255,255,255,0.82);
        }
        .booking-step:disabled {
          cursor: default;
          opacity: 0.42;
        }
        .booking-body {
          padding: 30px;
        }
        .booking-topline {
          align-items: center;
          color: var(--color-gray);
          display: flex;
          font-size: 12px;
          font-weight: 600;
          gap: 8px;
          justify-content: flex-end;
          letter-spacing: 0.8px;
          margin-bottom: 22px;
          text-transform: uppercase;
        }
        .booking-back {
          margin-bottom: 18px;
        }
        .booking-panel-title {
          color: var(--color-dark);
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 600;
          line-height: 1;
          margin: 0 0 18px;
        }
        .booking-card-list {
          display: grid;
          gap: 16px;
        }
        .booking-card {
          background: var(--color-white);
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          display: grid;
          gap: 14px;
          padding: 24px;
          text-align: left;
          transition: border-color 180ms ease, background 180ms ease;
        }
        button.booking-card {
          cursor: pointer;
        }
        button.booking-card:hover {
          background: var(--color-ivory);
          border-color: rgba(201,169,110,0.55);
        }
        .booking-card-head {
          align-items: start;
          display: flex;
          gap: 18px;
          justify-content: space-between;
        }
        .booking-card h3 {
          color: var(--color-dark);
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 600;
          line-height: 1;
          margin: 0;
        }
        .booking-card p {
          color: var(--color-gray);
          line-height: 1.65;
          margin: 0;
        }
        .booking-meta {
          align-items: center;
          color: var(--color-gold);
          display: flex;
          flex-wrap: wrap;
          font-size: 13px;
          font-weight: 600;
          gap: 12px;
          text-transform: uppercase;
        }
        .booking-select {
          border: 1px solid var(--color-dark);
          color: var(--color-dark);
          display: inline-flex;
          font-size: 13px;
          font-weight: 600;
          justify-content: center;
          max-width: 230px;
          min-height: 44px;
          padding: 12px 18px;
          text-transform: lowercase;
        }
        .provider-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .calendar-layout {
          display: grid;
          gap: 24px;
          grid-template-columns: minmax(0, 1fr) 220px;
        }
        .calendar-head {
          align-items: center;
          display: flex;
          gap: 12px;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .calendar-head h3 {
          color: var(--color-dark);
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 600;
          margin: 0;
          text-transform: capitalize;
        }
        .calendar-nav {
          display: flex;
          gap: 8px;
        }
        .calendar-nav button {
          align-items: center;
          background: var(--color-white);
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          cursor: pointer;
          display: inline-flex;
          height: 40px;
          justify-content: center;
          width: 40px;
        }
        .calendar-grid {
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(7, minmax(0, 1fr));
        }
        .calendar-weekday {
          color: var(--color-gray);
          font-size: 12px;
          font-weight: 700;
          padding: 0 0 4px;
          text-align: center;
          text-transform: uppercase;
        }
        .calendar-day {
          align-items: center;
          aspect-ratio: 1;
          background: var(--color-ivory);
          border: 1px solid transparent;
          color: var(--color-dark);
          cursor: pointer;
          display: inline-flex;
          font-weight: 600;
          justify-content: center;
          min-width: 0;
        }
        .calendar-day:disabled {
          background: transparent;
          color: rgba(26,26,26,0.24);
          cursor: default;
        }
        .calendar-day.is-selected,
        .time-slot.is-selected {
          background: var(--color-dark);
          border-color: var(--color-dark);
          color: var(--color-white);
        }
        .time-panel {
          border-left: 1px solid var(--color-linen);
          padding-left: 24px;
        }
        .time-panel h3 {
          color: var(--color-dark);
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 600;
          margin: 0 0 14px;
        }
        .time-list {
          display: grid;
          gap: 10px;
        }
        .time-slot {
          background: var(--color-white);
          border: 1px solid var(--color-linen);
          color: var(--color-dark);
          cursor: pointer;
          font-weight: 600;
          min-height: 44px;
        }
        .time-empty {
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.55;
          margin: 0;
        }
        .client-layout {
          display: grid;
          gap: 28px;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 0.78fr);
        }
        .client-fields {
          display: grid;
          gap: 14px;
        }
        .client-field-grid {
          display: grid;
          gap: 14px;
          grid-template-columns: 1fr 1fr;
        }
        .input-with-icon {
          position: relative;
        }
        .input-with-icon svg {
          color: rgba(26,26,26,0.42);
          left: 14px;
          position: absolute;
          top: 15px;
        }
        .input-with-icon .input-field {
          padding-left: 44px;
        }
        .client-summary {
          background: var(--color-ivory);
          border: 1px solid var(--color-linen);
          padding: 24px;
        }
        .client-summary h3 {
          color: var(--color-dark);
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 600;
          line-height: 1;
          margin: 0 0 20px;
        }
        .summary-row {
          display: grid;
          gap: 8px;
          grid-template-columns: 94px 1fr;
          margin-bottom: 13px;
        }
        .summary-row span {
          color: var(--color-gray);
        }
        .summary-row strong {
          color: var(--color-dark);
          font-weight: 600;
        }
        .promo-check {
          align-items: flex-start;
          color: var(--color-gray);
          display: flex;
          font-size: 13px;
          gap: 10px;
          line-height: 1.45;
        }
        .promo-check input {
          margin-top: 2px;
        }
        .reservation-submit {
          width: 100%;
        }
        .booking-status {
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.32);
          color: var(--color-dark);
          margin-bottom: 18px;
          padding: 16px;
        }
        @media (max-width: 860px) {
          .booking-stepper {
            grid-template-columns: 1fr;
          }
          .booking-step {
            border-bottom: 1px solid rgba(248,245,240,0.16);
            border-right: 0;
            min-height: 58px;
            text-align: left;
          }
          .booking-step span {
            white-space: normal;
          }
          .calendar-layout,
          .client-layout {
            grid-template-columns: 1fr;
          }
          .time-panel {
            border-left: 0;
            border-top: 1px solid var(--color-linen);
            padding-left: 0;
            padding-top: 20px;
          }
        }
        @media (max-width: 680px) {
          .booking-body {
            padding: 18px;
          }
          .booking-card {
            padding: 18px;
          }
          .booking-card h3,
          .calendar-head h3 {
            font-size: 24px;
          }
          .booking-panel-title {
            font-size: 30px;
          }
          .calendar-grid {
            gap: 5px;
          }
          .client-field-grid {
            grid-template-columns: 1fr;
          }
          .summary-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="booking-stepper" aria-label="Étapes de réservation">
        {steps.map((step) => {
          const isActive = activeStep === step.key;
          const isDisabled =
            step.key === 'service' && !selectedLocation
              ? true
              : (step.key === 'provider' || step.key === 'time') && !(selectedLocation && selectedService)
              ? true
              : step.key === 'client' && !(selectedLocation && selectedService && selectedDate && selectedTime);
          const summary =
            step.key === 'location'
              ? selectedLocationLabel
              : step.key === 'service'
                ? selectedServiceTitle
                : step.key === 'provider'
                  ? selectedService ? provider.title : ''
                  : step.key === 'time'
                    ? selectedDate && selectedTime ? `${formatDate(selectedDate)} ${selectedTime}` : ''
                    : '';

          return (
            <button
              key={step.key}
              className={`booking-step${isActive ? ' is-active' : ''}`}
              disabled={isDisabled}
              type="button"
              onClick={() => setStep(step.key)}
            >
              <strong>{step.label}</strong>
              <span>{summary}</span>
            </button>
          );
        })}
      </div>

      <div className="booking-body">
        <div className="booking-topline">
          <Clock aria-hidden="true" size={14} /> Notre heure: Casablanca
        </div>

        {activeStep !== 'location' ? (
          <button
            className="btn btn-outline booking-back"
            type="button"
            onClick={() => {
              const currentIndex = steps.findIndex((step) => step.key === activeStep);
              setActiveStep(steps[Math.max(0, currentIndex - 1)].key);
            }}
          >
            Retour
          </button>
        ) : null}

        {activeStep === 'location' ? (
          <section aria-labelledby="booking-location-title">
            <h2 className="booking-panel-title" id="booking-location-title">Choisissez le lieu</h2>
            <div className="booking-card-list">
              {locations.map((location) => (
                <button
                  className="booking-card"
                  key={location.id}
                  type="button"
                  onClick={() => {
                    setSelectedLocation(location);
                    setSelectedDate('');
                    setSelectedTime('');
                    setActiveStep('service');
                  }}
                >
                  <div className="booking-card-head">
                    <h3>{location.title}</h3>
                    {selectedLocation?.id === location.id ? <Check aria-hidden="true" color="var(--color-gold)" size={22} /> : null}
                  </div>
                  <p>{location.description}</p>
                  <div className="booking-meta">
                    <span><MapPin aria-hidden="true" size={15} /> {location.meta}</span>
                    <span><Phone aria-hidden="true" size={15} /> {PHONE_DISPLAY}</span>
                  </div>
                  <span className="booking-select">sélectionner</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {activeStep === 'service' ? (
          <section aria-labelledby="booking-service-title">
            <h2 className="booking-panel-title" id="booking-service-title">Sélectionnez un service</h2>
            <div className="booking-card-list">
              {services.map((service) => (
                <button
                  className="booking-card"
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setSelectedService(service);
                    setSelectedDate('');
                    setSelectedTime('');
                    setActiveStep('provider');
                  }}
                >
                  <div className="booking-card-head">
                    <h3>{service.title}</h3>
                    {selectedService?.id === service.id ? <Check aria-hidden="true" color="var(--color-gold)" size={22} /> : null}
                  </div>
                  <p>{service.description}</p>
                  <div className="booking-meta">
                    <span><Clock aria-hidden="true" size={15} /> {service.duration}</span>
                  </div>
                  <span className="booking-select">sélectionner</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {activeStep === 'provider' ? (
          <section aria-labelledby="booking-provider-title">
            <h2 className="booking-panel-title" id="booking-provider-title">Prestataire</h2>
            <article className="booking-card">
              <div className="booking-card-head">
                <h3>{provider.title}</h3>
                <Check aria-hidden="true" color="var(--color-gold)" size={22} />
              </div>
              <p>{provider.description}</p>
              <div className="booking-meta">
                <span><MapPin aria-hidden="true" size={15} /> {selectedLocationLabel}</span>
                <span><Mail aria-hidden="true" size={15} /> {EMAIL_DISPLAY}</span>
              </div>
              <div className="provider-actions">
                <button className="btn btn-gold" type="button" onClick={() => setActiveStep('time')}>
                  Continuer
                </button>
                <a className="btn btn-outline" href={`tel:${PHONE_TEL}`}>
                  Appeler
                </a>
              </div>
            </article>
          </section>
        ) : null}

        {activeStep === 'time' ? (
          <section aria-labelledby="booking-time-title">
            <h2 className="booking-panel-title" id="booking-time-title">Choisissez une heure</h2>
            <div className="calendar-layout">
              <div>
                <div className="calendar-head">
                  <h3>{monthLabel}</h3>
                  <div className="calendar-nav">
                    <button
                      aria-label="Mois précédent"
                      type="button"
                      onClick={() => setMonthAnchor((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
                    >
                      <ChevronLeft aria-hidden="true" size={18} />
                    </button>
                    <button
                      aria-label="Mois suivant"
                      type="button"
                      onClick={() => setMonthAnchor((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
                    >
                      <ChevronRight aria-hidden="true" size={18} />
                    </button>
                  </div>
                </div>
                <div className="calendar-grid">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                    <div className="calendar-weekday" key={day}>{day}</div>
                  ))}
                  {visibleDays.map((day, index) => {
                    if (!day) {
                      return <span aria-hidden="true" key={`empty-${index}`} />;
                    }

                    const isPast = day < today;
                    const isAvailable = !isPast && Boolean(weekdaySlots[day.getDay()]);
                    const value = toDateInputValue(day);
                    const isSelected = selectedDateObject ? isSameDay(day, selectedDateObject) : false;

                    return (
                      <button
                        className={`calendar-day${isSelected ? ' is-selected' : ''}`}
                        disabled={!isAvailable}
                        key={value}
                        type="button"
                        onClick={() => {
                          setSelectedDate(value);
                          setSelectedTime('');
                        }}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside className="time-panel">
                <h3>Horaires disponibles</h3>
                {selectedDate ? (
                  selectedSlots.length ? (
                    <div className="time-list">
                      {selectedSlots.map((slot) => (
                        <button
                          className={`time-slot${selectedTime === slot.value ? ' is-selected' : ''}`}
                          key={slot.value}
                          type="button"
                          onClick={() => {
                            setSelectedTime(slot.value);
                            setActiveStep('client');
                          }}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="time-empty">Aucun horaire disponible pour cette date.</p>
                  )
                ) : (
                  <p className="time-empty">Sélectionnez une date disponible pour afficher les heures.</p>
                )}
              </aside>
            </div>
          </section>
        ) : null}

        {activeStep === 'client' ? (
          <section aria-labelledby="booking-client-title">
            <h2 className="booking-panel-title" id="booking-client-title">Veuillez confirmer les détails</h2>
            {submitted ? (
              <div className="booking-status" role="status" aria-live="polite">
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
              <div className="client-layout">
                <div className="client-fields">
                  <div className="input-with-icon">
                    <UserRound aria-hidden="true" size={18} />
                    <input className="input-field" name="name" placeholder="Entrer votre nom" aria-label="Entrer votre nom" autoComplete="name" required />
                  </div>
                  <div className="input-with-icon">
                    <Mail aria-hidden="true" size={18} />
                    <input className="input-field" name="email" type="email" placeholder="Entrer votre adresse mail" aria-label="Entrer votre adresse mail" autoComplete="email" spellCheck={false} required />
                  </div>
                  <div className="input-with-icon">
                    <Phone aria-hidden="true" size={18} />
                    <input className="input-field" name="phone" type="tel" inputMode="tel" placeholder="Entrer le numéro de téléphone" aria-label="Entrer le numéro de téléphone" autoComplete="tel" required />
                  </div>
                  {selectedLocation?.id === 'domicile' ? (
                    <div className="input-with-icon">
                      <MapPin aria-hidden="true" size={18} />
                      <input className="input-field" name="homeAddress" placeholder="Adresse du rendez-vous à domicile" aria-label="Adresse du rendez-vous à domicile" autoComplete="street-address" required />
                    </div>
                  ) : null}
                  <input className="input-field" name="companions" placeholder="Nombre d'accompagnants" aria-label="Nombre d'accompagnants" inputMode="numeric" />
                  <textarea className="input-field" name="remarks" placeholder="Remarques / Description" aria-label="Remarques / Description" rows={5} />
                  <label className="promo-check">
                    <input name="promotion_letters_flag" type="checkbox" value="1" />
                    <span>Soyez l&apos;un des premiers à recevoir des messages sur nos promotions et autres informations.</span>
                  </label>
                  <button className="btn btn-gold reservation-submit" type="submit">
                    <MessageCircle aria-hidden="true" size={17} /> Réserver
                  </button>
                </div>

                <aside className="client-summary">
                  <h3>{selectedServiceTitle}</h3>
                  <div className="summary-row">
                    <span>Date:</span>
                    <strong>{formatDate(selectedDate)} {selectedTime}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Prestataire:</span>
                    <strong>{provider.title}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Lieu:</span>
                    <strong>{selectedLocationLabel}</strong>
                  </div>
                </aside>
              </div>
            </form>
          </section>
        ) : null}
      </div>
    </div>
  );
}
