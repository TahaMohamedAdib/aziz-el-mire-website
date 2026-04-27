'use client';

import { useState } from 'react';
import { whatsappUrl } from '@/lib/catalog';

export default function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

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
      `Email : ${getValue('email')}`,
      `Date souhaitée : ${formattedDate}`,
      `Heure souhaitée : ${getValue('time')}`,
      `Service : ${getValue('service')}`,
      message ? `Message : ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <div>
      {submitted ? (
        <div role="status" aria-live="polite" style={{ background: 'rgba(183,154,85,0.12)', border: '1px solid rgba(183,154,85,0.32)', color: 'var(--ivory)', marginBottom: '24px', padding: '20px' }}>
          Merci pour votre demande. WhatsApp s&apos;ouvre avec les informations de votre rendez-vous.
        </div>
      ) : null}
      <form
        style={{ display: 'grid', gap: '16px' }}
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
        <input className="input-field" name="name" placeholder="Nom complet" aria-label="Nom complet" autoComplete="name" required />
        <input className="input-field" name="phone" type="tel" inputMode="tel" placeholder="Téléphone" aria-label="Téléphone" autoComplete="tel" required />
        <input className="input-field" name="email" type="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail" autoComplete="email" spellCheck={false} required />
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
          <input className="input-field" name="date" type="date" aria-label="Date souhaitée" required />
          <input className="input-field" name="time" type="time" aria-label="Heure souhaitée" required />
        </div>
        <select className="input-field" name="service" aria-label="Type de service" required defaultValue="">
          <option value="" disabled>Type de service</option>
          <option>Costume sur mesure</option>
          <option>Veste</option>
          <option>Pantalon</option>
          <option>Retouches</option>
          <option>Conseil style</option>
        </select>
        <textarea className="input-field" name="message" placeholder="Message" aria-label="Message" rows={6} />
        <button className="btn btn-gold" type="submit">Envoyer la demande</button>
      </form>
      <a
        className="btn btn-outline"
        href={whatsappUrl('Bonjour, je souhaite prendre rendez-vous pour un costume sur mesure.\nNom :\nDate souhaitée :\nService :')}
        target="_blank"
        rel="noreferrer"
        style={{ marginTop: '18px' }}
      >
        Réserver via WhatsApp
      </a>
    </div>
  );
}
