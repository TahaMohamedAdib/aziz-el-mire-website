'use client';

import { useState } from 'react';
import { whatsappUrl } from '@/lib/catalog';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const buildContactMessage = (formData: FormData) => {
    const getValue = (field: string) => String(formData.get(field) ?? '').trim();
    return [
      'Bonjour, je souhaite contacter Aziz EL Mire Haute Couture pour une création sur mesure.',
      `Nom : ${getValue('name')}`,
      `Email : ${getValue('email')}`,
      getValue('phone') ? `Téléphone : ${getValue('phone')}` : '',
      `Message : ${getValue('message')}`,
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
        <div role="status" aria-live="polite" style={{ background: 'rgba(183,154,85,0.12)', border: '1px solid rgba(183,154,85,0.32)', color: 'var(--ivory)', padding: '18px' }}>
          Merci. WhatsApp s&apos;ouvre avec votre message.
        </div>
      ) : null}
      <input className="input-field" name="name" placeholder="Nom complet" aria-label="Nom complet" autoComplete="name" required />
      <input className="input-field" name="email" type="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail" autoComplete="email" spellCheck={false} required />
      <input className="input-field" name="phone" type="tel" inputMode="tel" placeholder="Téléphone" aria-label="Téléphone" autoComplete="tel" />
      <textarea className="input-field" name="message" placeholder="Votre message" aria-label="Votre message" rows={6} required />
      <button className="btn btn-gold" type="submit">Envoyer</button>
    </form>
  );
}
