import type { Metadata } from 'next';
import ReservationForm from '@/components/ReservationForm';
import { PageHero, SitePage } from '@/components/SitePage';

export const metadata: Metadata = {
  title: 'Réservation',
  description: 'Réservez un rendez-vous Aziz EL Mire Haute Couture.',
};

export default function ReservationPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Rendez-vous" title="Réservation">
        Prenez rendez-vous pour un costume sur mesure, une veste, un pantalon, des retouches ou un conseil style.
      </PageHero>
      <section style={{ background: '#07100c', padding: '70px 20px 110px' }}>
        <div className="container-rc" style={{ maxWidth: '760px' }}>
          <ReservationForm />
        </div>
      </section>
    </SitePage>
  );
}
