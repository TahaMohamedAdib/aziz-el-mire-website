'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { whatsappUrl } from '@/lib/catalog';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300 || window.innerWidth < 768);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        .floating-whatsapp {
          align-items: center;
          background: #25D366;
          border-radius: 999px;
          bottom: 22px;
          box-shadow: 0 16px 34px rgba(0,0,0,0.22);
          color: white;
          display: flex;
          height: 56px;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          position: fixed;
          right: 22px;
          transform: translateY(8px);
          transition: opacity 200ms ease, transform 200ms ease;
          width: 56px;
          z-index: 9999;
        }
        .floating-whatsapp.is-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        @media (max-width: 767px) {
          .floating-whatsapp {
            bottom: 14px;
            opacity: 1;
            pointer-events: auto;
            right: 14px;
            transform: none;
          }
        }
      `}</style>
      <a
        className={`floating-whatsapp ${visible ? 'is-visible' : ''}`}
        href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous à l'atelier.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Écrire sur WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" size={25} />
      </a>
    </>
  );
}
