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
    <a
      className={`floating-whatsapp ${visible ? 'is-visible' : ''}`}
      href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous à l'atelier.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Écrire sur WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" size={24} />
    </a>
  );
}
