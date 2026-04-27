import type { Metadata } from 'next';
import Link from 'next/link';
import { SitePage } from '@/components/SitePage';

export const metadata: Metadata = {
  title: 'Reservation',
  description: 'La page reservation a ete regroupee avec la page contact.',
};

export default function ReservationPage() {
  return (
    <SitePage>
      <section className="section-pad" style={{ minHeight: '70vh', paddingTop: 180, textAlign: 'center' }}>
        <div className="container-rc" style={{ maxWidth: 680 }}>
          <p className="eyebrow">Reservation</p>
          <h1 className="section-title">Contact & Reservation</h1>
          <p className="body-large">Les demandes de rendez-vous sont maintenant centralisees sur une seule page.</p>
          <Link className="btn btn-gold" href="/contact">Aller a la page contact</Link>
        </div>
      </section>
    </SitePage>
  );
}
