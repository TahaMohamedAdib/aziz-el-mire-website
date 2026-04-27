'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/utils';

interface Slide {
  id: number;
  videoSrc: string;
  subtitle: string;
  title?: string;
  btnText: string;
  btnHref: string;
}

const slides: Slide[] = [
  {
    id: 1,
    videoSrc: asset('/aziz-media/video-home-page.mp4'),
    subtitle: 'AZIZ EL MIRE HAUTE COUTURE',
    title: 'Costumes de caractère',
    btnText: 'Découvrir',
    btnHref: '/collections',
  },
  {
    id: 2,
    videoSrc: asset('/aziz-media/video-home-page.mp4'),
    subtitle: 'COSTUMES SUR MESURE',
    title: 'L’élégance taillée pour vous',
    btnText: 'Prendre rendez-vous',
    btnHref: '/sur-mesure',
  },
  {
    id: 3,
    videoSrc: asset('/aziz-media/video-home-page.mp4'),
    subtitle: 'CÉRÉMONIES & SOIRÉES',
    title: 'Tenues raffinées pour vos grands moments',
    btnText: 'Voir la collection',
    btnHref: '/ceremonie',
  },
  {
    id: 4,
    videoSrc: asset('/aziz-media/video-home-page.mp4'),
    subtitle: 'NOUVELLE COLLECTION',
    title: 'Vestes, costumes et finitions couture',
    btnText: 'Explorer',
    btnHref: '/costumes',
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '760px', overflow: 'hidden' }}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === activeIndex ? 1 : 0,
            pointerEvents: index === activeIndex ? 'auto' : 'none',
            transition: 'opacity 800ms ease',
          }}
        >
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={slide.videoSrc}
            autoPlay={index === 0}
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.38)', zIndex: 1 }} />

          {index === activeIndex && (
            <div
              key={`content-${activeIndex}`}
              style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                textAlign: 'center',
                width: '90%',
                maxWidth: '820px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', marginBottom: '54px' }}>
                <Image src="/images/slide-title-border.png" alt="" width={37} height={10} style={{ width: '37px', height: '10px' }} unoptimized />
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: 'var(--ivory)',
                    margin: 0,
                    textTransform: 'uppercase',
                    animation: 'fadeInDownShorterPlus 0.6s ease 100ms both',
                  }}
                >
                  {slide.subtitle}
                </h3>
                <Image src="/images/slide-title-border.png" alt="" width={37} height={10} style={{ width: '37px', height: '10px', transform: 'scaleX(-1)' }} unoptimized />
              </div>

              {slide.title ? (
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    fontWeight: 400,
                    color: 'var(--ivory)',
                    margin: '-30px 0 42px',
                    textTransform: 'uppercase',
                    animation: 'blurIn 0.8s ease 400ms both',
                  }}
                >
                  {slide.title}
                </h2>
              ) : null}

              <a
                href={slide.btnHref}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#07100c',
                  background: 'var(--ivory)',
                  border: '1px solid var(--ivory)',
                  borderRadius: '3px',
                  padding: '17px 50px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  animation: 'fadeInUpShorter 0.6s ease 800ms both',
                }}
              >
                {slide.btnText}
              </a>
            </div>
          )}
        </div>
      ))}

      <div style={{ position: 'absolute', bottom: '34px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 4 }}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            style={{
              width: index === activeIndex ? '10px' : '8px',
              height: index === activeIndex ? '10px' : '8px',
              borderRadius: '50%',
              background: index === activeIndex ? '#efe6d1' : 'transparent',
              border: index === activeIndex ? 'none' : '1px solid rgba(239,230,209,0.7)',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
