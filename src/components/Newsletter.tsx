'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="newsletter-section">
      <div className="container-rc">
        <div className="newsletter-inner">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--color-ivory)', margin: '0 0 8px', fontWeight: 400 }}>
              Restez informés
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(248,245,240,0.62)', margin: 0, lineHeight: 1.6 }}>
              Recevez les nouvelles collections, les conseils de style et les ouvertures de rendez-vous.
            </p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
              event.currentTarget.reset();
            }}
          >
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="input-field"
              aria-label="Adresse e-mail"
              required
            />
            <button type="submit" className="btn btn-gold">
              S&apos;inscrire
            </button>
          </form>
        </div>
        {submitted ? (
          <p role="status" aria-live="polite" style={{ color: 'var(--color-gold)', fontSize: '13px', margin: '14px 0 0' }}>
            Merci. Votre demande d&apos;inscription est prête pour la démonstration client.
          </p>
        ) : null}
      </div>
    </section>
  );
}
