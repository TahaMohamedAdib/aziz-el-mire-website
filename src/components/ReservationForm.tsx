'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, House, Loader2, MapPin, MessageCircle, Scissors, TicketCheck, UserRound } from 'lucide-react';
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

const FR_DATE = new Intl.DateTimeFormat('fr-MA');
const FR_MONTH = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function dateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function getCalendarDays(month: Date) {
  const first = startOfMonth(month);
  const mondayOffset = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
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
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [homeAddress, setHomeAddress] = useState('');

  const [slots, setSlots] = useState<SlotsByDate>({});
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState('');

  useEffect(() => {
    getAvailableSlots(120).then((data) => {
      setSlots(data);
      const firstDate = Object.keys(data)[0] ?? '';
      setSelectedDate(firstDate);
      setSelectedSlot(data[firstDate]?.[0] ?? null);
      if (firstDate) setVisibleMonth(startOfMonth(new Date(`${firstDate}T00:00:00`)));
      setSlotsLoading(false);
    }).catch(() => {
      setSlotsError('Impossible de charger les créneaux. Veuillez réessayer.');
      setSlotsLoading(false);
    });
  }, []);

  const sortedDates = useMemo(() => Object.keys(slots).sort(), [slots]);

  const availableDateSet = useMemo(() => new Set(sortedDates), [sortedDates]);

  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);

  const availableMonthKeys = useMemo(
    () => new Set(sortedDates.map((date) => date.slice(0, 7))),
    [sortedDates],
  );

  const canGoToPreviousMonth = useMemo(
    () => sortedDates.some((date) => date.slice(0, 7) < monthKey(visibleMonth)),
    [sortedDates, visibleMonth],
  );

  const canGoToNextMonth = useMemo(
    () => sortedDates.some((date) => date.slice(0, 7) > monthKey(visibleMonth)),
    [sortedDates, visibleMonth],
  );

  const timeSlotsForDate: DbSlot[] = useMemo(
    () => (selectedDate ? (slots[selectedDate] ?? []) : []),
    [slots, selectedDate],
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const firstSlot = slots[date]?.[0] ?? null;
    setSelectedSlot(firstSlot);
  };

  const goToMonth = (direction: -1 | 1) => {
    setVisibleMonth((month) => {
      let next = addMonths(month, direction);
      for (let i = 0; i < 12; i += 1) {
        if (availableMonthKeys.has(monthKey(next))) return next;
        next = addMonths(next, direction);
      }
      return month;
    });
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
      <div className="reservation-form-head">
        <span className="reservation-form-icon">
          <CalendarDays aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="eyebrow" style={{ marginBottom: 8 }}>Votre rendez-vous</p>
          <h2 className="section-title" style={{ fontSize: 30, margin: 0 }}>Réserver</h2>
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
        <div role="status" aria-live="polite" style={{ background: 'rgba(248,130,2,0.12)', border: '1px solid rgba(248,130,2,0.32)', color: 'var(--color-dark)', marginBottom: '20px', padding: '18px' }}>
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
                <div className="calendar-panel" aria-label="Calendrier">
                  <div className="calendar-head">
                    <p className="calendar-month">{FR_MONTH.format(visibleMonth)}</p>
                    <div className="calendar-nav">
                      <button
                        type="button"
                        aria-label="Mois précédent"
                        disabled={!canGoToPreviousMonth}
                        onClick={() => goToMonth(-1)}
                      >
                        <ChevronLeft size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label="Mois suivant"
                        disabled={!canGoToNextMonth}
                        onClick={() => goToMonth(1)}
                      >
                        <ChevronRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="calendar-weekdays" aria-hidden="true">
                    {WEEKDAYS.map((day) => <span key={day} className="calendar-weekday">{day}</span>)}
                  </div>
                  <div className="calendar-grid">
                    {calendarDays.map((day) => {
                      const key = dateKey(day);
                      const isAvailable = availableDateSet.has(key);
                      const isOutside = day.getMonth() !== visibleMonth.getMonth();
                      const isSelected = key === selectedDate;
                      return (
                        <button
                          key={key}
                          type="button"
                          className={`calendar-day ${isOutside ? 'is-outside' : ''} ${isAvailable ? 'is-available' : ''} ${isSelected ? 'is-selected' : ''}`}
                          disabled={!isAvailable}
                          aria-pressed={isSelected}
                          aria-label={`${formatDateDisplay(key)}${isAvailable ? ', disponible' : ', indisponible'}`}
                          onClick={() => handleDateChange(key)}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="selected-date-summary">
                  Date sélectionnée : <strong>{selectedDate ? formatDateDisplay(selectedDate) : 'Choisissez une date'}</strong>
                </p>
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
