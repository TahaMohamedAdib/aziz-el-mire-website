import { whatsappUrl } from '@/lib/catalog';
import { FaWhatsapp } from 'react-icons/fa6';

export default function FloatingWhatsApp() {
  return (
    <>
      <style>{`
        .floating-whatsapp {
          align-items: center;
          background: #07140f;
          border: 1px solid rgba(183, 154, 85, 0.7);
          border-radius: 999px;
          bottom: 22px;
          box-shadow: 0 16px 34px rgba(0,0,0,0.34), inset 0 1px 0 rgba(122, 30, 30, 0.34);
          color: var(--ivory);
          display: flex;
          font-family: var(--font-montserrat);
          font-size: 12px;
          font-weight: 800;
          gap: 8px;
          justify-content: center;
          padding: 14px 18px;
          position: fixed;
          right: 22px;
          text-transform: uppercase;
          z-index: 1200;
        }
        @media (max-width: 520px) {
          .floating-whatsapp {
            bottom: 14px;
            font-size: 11px;
            height: 52px;
            padding: 0;
            right: 14px;
            width: 52px;
          }
          .floating-whatsapp span { display: none; }
        }
      `}</style>
      <a
        className="floating-whatsapp"
        href={whatsappUrl('Bonjour, je suis intéressé par vos costumes d’exception et pièces sur mesure.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" size={17} />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
