'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ width: '100%', background: '#0c1410', borderTop: '1px solid rgba(183,154,85,0.12)', padding: '42px 0' }}>
      <style>{`
        @media (max-width: 767px) {
          .newsletter-inner { flex-direction: column !important; text-align: left !important; align-items: stretch !important; }
          .newsletter-form { flex-direction: column !important; width: 100% !important; }
          .newsletter-form input, .newsletter-form button { width: 100% !important; }
        }
      `}</style>
      <div className="container-rc">
        <div className="newsletter-inner" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px' }}>
          <div>
            <p className="eyebrow" style={{ textAlign: 'left' }}>Newsletter</p>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--ivory)', margin: '0 0 10px', textTransform: 'uppercase' }}>
              Restez informés
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#b8ad96', margin: 0 }}>
              Recevez les nouvelles collections, les conseils de style et les ouvertures de rendez-vous.
            </p>
          </div>

          <form
            className="newsletter-form"
            style={{ display: 'flex', gap: '18px', flex: 1, justifyContent: 'flex-end' }}
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
              event.currentTarget.reset();
            }}
          >
            <input type="email" placeholder="Adresse e-mail" className="input-field" style={{ width: 'min(100%, 420px)' }} aria-label="Adresse e-mail" required />
            <button type="submit" className="btn btn-gold">
              S’inscrire
            </button>
          </form>
          {submitted ? (
            <p role="status" aria-live="polite" style={{ color: '#b79a55', fontSize: '13px', margin: '14px 0 0' }}>
              Merci. Votre demande d&apos;inscription est prête pour la démonstration client.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
