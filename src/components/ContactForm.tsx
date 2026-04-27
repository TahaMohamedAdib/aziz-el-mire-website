'use client';

import { useState } from 'react';
import { whatsappUrl } from '@/lib/catalog';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const buildContactMessage = (formData: FormData) => {
    const getValue = (field: string) => String(formData.get(field) ?? '').trim();
    return [
      "Bonjour, je souhaite prendre rendez-vous a l'atelier.",
      `Nom : ${getValue('name')}`,
      `Telephone : ${getValue('phone')}`,
      `Date souhaitee : ${getValue('date')}`,
      getValue('message') ? `Message : ${getValue('message')}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <form
      style={{ display: 'grid', gap: '16px' }}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const url = whatsappUrl(buildContactMessage(formData));
        setSubmitted(true);
        const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (!openedWindow) {
          window.location.href = url;
        }
      }}
    >
      {submitted ? (
        <div role="status" aria-live="polite" style={{ background: 'var(--color-linen)', color: 'var(--color-dark)', padding: '18px' }}>
          Merci. WhatsApp s&apos;ouvre avec votre demande.
        </div>
      ) : null}
      <input className="input-field" name="name" placeholder="Nom" aria-label="Nom" autoComplete="name" required />
      <input className="input-field" name="phone" type="tel" inputMode="tel" placeholder="Telephone" aria-label="Telephone" autoComplete="tel" required />
      <input className="input-field" name="date" type="date" aria-label="Date souhaitee" required />
      <textarea className="input-field" name="message" placeholder="Message (optionnel)" aria-label="Message optionnel" rows={4} />
      <button className="btn btn-gold" type="submit">Envoyer la demande</button>
    </form>
  );
}
