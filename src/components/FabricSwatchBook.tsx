'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CSSProperties, PointerEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type FabricBookItem = {
  src: string;
  alt: string;
  label: string;
};

type DragState = {
  active: boolean;
  x: number;
  y: number;
};

type LeavingCard = {
  item: FabricBookItem;
  startX: number;
  startY: number;
  rotate: number;
};

type IncomingCard = {
  src: string;
  direction: -1 | 1;
};

const visibleDepth = 6;
const swipeThreshold = 74;
const transitionMs = 430;

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export default function FabricSwatchBook({ items }: { items: FabricBookItem[] }) {
  const startRef = useRef({ x: 0, y: 0 });
  const animatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [drag, setDrag] = useState<DragState>({ active: false, x: 0, y: 0 });
  const [leaving, setLeaving] = useState<LeavingCard | null>(null);
  const [incoming, setIncoming] = useState<IncomingCard | null>(null);
  const [preloadAll, setPreloadAll] = useState(false);

  const visibleItems = useMemo(() => {
    const count = Math.min(visibleDepth, items.length);
    return Array.from({ length: count }, (_, depth) => ({
      item: items[wrapIndex(activeIndex + depth, items.length)],
      depth,
    }));
  }, [activeIndex, items]);

  const move = useCallback(
    (direction: -1 | 1, startX = 0, startY = 0) => {
      if (items.length < 2 || animatingRef.current) return;
      const currentItem = items[activeIndex];
      const nextIndex = wrapIndex(activeIndex + direction, items.length);
      const nextItem = items[nextIndex];
      const rotate = startX / 16 || direction * 7;
      animatingRef.current = true;
      setDrag({ active: false, x: 0, y: 0 });

      if (direction === 1) {
        setLeaving({ item: currentItem, startX, startY, rotate });
        setIncoming(null);
      } else {
        setLeaving(null);
        setIncoming({ src: nextItem.src, direction });
      }

      setActiveIndex(nextIndex);

      window.setTimeout(() => {
        setLeaving(null);
        setIncoming(null);
        animatingRef.current = false;
      }, transitionMs);
    },
    [activeIndex, items]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setPreloadAll(true), 450);
    return () => window.clearTimeout(timer);
  }, [items.length]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (animatingRef.current) return;
    startRef.current = { x: event.clientX, y: event.clientY };
    setDrag({ active: true, x: 0, y: 0 });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.active || animatingRef.current) return;
    const x = event.clientX - startRef.current.x;
    const y = Math.max(-34, Math.min(34, event.clientY - startRef.current.y));
    setDrag({ active: true, x, y });
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.active) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.x <= -swipeThreshold) {
      move(-1, drag.x, drag.y);
      return;
    }

    if (drag.x >= swipeThreshold) {
      move(1, drag.x, drag.y);
      return;
    }

    setDrag({ active: false, x: 0, y: 0 });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fabric-stack-book">
      <style>{`
        .fabric-stack-book {
          margin-top: 30px;
          position: relative;
          z-index: 1;
        }
        .fabric-stack-shell {
          align-items: center;
          background:
            radial-gradient(circle at 20% 10%, rgba(231,200,115,0.14), transparent 34%),
            linear-gradient(135deg, rgba(248,245,240,0.09), rgba(248,245,240,0.025));
          border: 1px solid rgba(231,200,115,0.2);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 26px 80px rgba(0,0,0,0.2);
          display: grid;
          gap: clamp(18px, 3.4vw, 36px);
          grid-template-columns: minmax(0, 1fr) minmax(190px, 280px);
          min-height: clamp(360px, 46vw, 510px);
          overflow: hidden;
          padding: clamp(22px, 3.4vw, 46px);
          position: relative;
        }
        .fabric-stack-shell::before {
          background:
            linear-gradient(to bottom, rgba(231,200,115,0), rgba(231,200,115,0.7), rgba(231,200,115,0)),
            linear-gradient(90deg, rgba(0,0,0,0.42), rgba(255,255,255,0.08), rgba(0,0,0,0.44));
          content: "";
          inset: 0 auto 0 clamp(16px, 2.6vw, 34px);
          position: absolute;
          width: 12px;
          z-index: 1;
        }
        .fabric-stack-stage {
          aspect-ratio: 4 / 5;
          cursor: grab;
          isolation: isolate;
          justify-self: center;
          max-height: 470px;
          max-width: 350px;
          min-height: 270px;
          perspective: 1300px;
          position: relative;
          touch-action: pan-y;
          user-select: none;
          width: min(70vw, 350px);
        }
        .fabric-stack-stage.is-dragging {
          cursor: grabbing;
        }
        .fabric-stack-card {
          background:
            linear-gradient(135deg, rgba(248,245,240,0.16), rgba(248,245,240,0.04)),
            #121414;
          border: 1px solid rgba(231,200,115,0.22);
          box-shadow:
            -10px 0 0 rgba(248,245,240,0.04),
            0 24px 64px rgba(0,0,0,0.3);
          inset: 0;
          overflow: hidden;
          position: absolute;
          transform:
            translate3d(var(--card-x), var(--card-y), calc(var(--card-depth) * -18px))
            rotate(var(--card-rotate))
            scale(var(--card-scale));
          transform-origin: 50% 76%;
          transform-style: preserve-3d;
          transition:
            box-shadow 260ms ease,
            opacity 260ms ease,
            transform 360ms cubic-bezier(.19, 1, .22, 1);
          will-change: transform;
        }
        .fabric-stack-card::before {
          background:
            linear-gradient(90deg, rgba(0,0,0,0.35), transparent 16%),
            linear-gradient(110deg, transparent 22%, rgba(255,255,255,0.18), transparent 52%);
          content: "";
          inset: 0;
          opacity: 0.72;
          pointer-events: none;
          position: absolute;
          z-index: 2;
        }
        .fabric-stack-card::after {
          border: 1px solid rgba(255,255,255,0.18);
          content: "";
          inset: 10px;
          pointer-events: none;
          position: absolute;
          z-index: 3;
        }
        .fabric-stack-card.is-top {
          box-shadow:
            -10px 0 0 rgba(248,245,240,0.055),
            0 28px 78px rgba(0,0,0,0.36),
            0 0 40px rgba(231,200,115,0.12);
        }
        .fabric-stack-card.is-dragged {
          transition: none;
        }
        .fabric-stack-card.is-leaving {
          animation: fabric-stack-send-back-right ${transitionMs}ms cubic-bezier(.19, 1, .22, 1) forwards;
          transform:
            translate3d(var(--exit-start-x), var(--exit-start-y), 0)
            rotate(var(--exit-rotate))
            scale(1);
          z-index: 20;
        }
        .fabric-stack-card.is-incoming {
          animation: fabric-stack-bring-forward-left ${transitionMs}ms cubic-bezier(.19, 1, .22, 1) both;
        }
        .fabric-stack-card img {
          filter: saturate(0.97) contrast(1.06);
          pointer-events: none;
          transform: scale(1.025);
          transition: filter 700ms cubic-bezier(.19, 1, .22, 1), transform 900ms cubic-bezier(.19, 1, .22, 1);
        }
        .fabric-stack-card.is-top:hover img {
          filter: saturate(1.08) contrast(1.08);
          transform: scale(1.07);
        }
        .fabric-stack-label {
          bottom: 15px;
          color: rgba(248,245,240,0.88);
          font-size: 10px;
          font-weight: 700;
          left: 17px;
          letter-spacing: 1.7px;
          position: absolute;
          text-transform: uppercase;
          z-index: 4;
        }
        .fabric-stack-panel {
          align-self: stretch;
          border-left: 1px solid rgba(231,200,115,0.18);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          padding-left: clamp(18px, 3.4vw, 36px);
          position: relative;
          z-index: 2;
        }
        .fabric-stack-kicker {
          color: rgba(248,245,240,0.64);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.8px;
          margin: 0 0 12px;
          text-transform: uppercase;
        }
        .fabric-stack-count {
          color: var(--color-gold-soft);
          font-family: var(--font-serif);
          font-size: clamp(42px, 6vw, 68px);
          font-variant-numeric: tabular-nums;
          line-height: 0.88;
          margin: 0;
        }
        .fabric-stack-total {
          color: rgba(248,245,240,0.5);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.6px;
          margin-top: 10px;
          text-transform: uppercase;
        }
        .fabric-stack-controls {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .fabric-stack-button {
          align-items: center;
          backdrop-filter: blur(14px) saturate(1.15);
          background: rgba(18,20,20,0.62);
          border: 1px solid rgba(231,200,115,0.34);
          color: var(--color-ivory);
          cursor: pointer;
          display: inline-flex;
          height: 46px;
          justify-content: center;
          transition: background 220ms ease, border-color 220ms ease, color 220ms ease, transform 220ms ease;
          width: 46px;
        }
        .fabric-stack-button:hover,
        .fabric-stack-button:focus-visible {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-white);
          transform: translateY(-2px);
        }
        .fabric-stack-preload {
          height: 1px;
          left: 0;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
          position: absolute;
          top: 0;
          width: 1px;
          z-index: -1;
        }
        @keyframes fabric-stack-send-back-right {
          from {
            opacity: 1;
            transform:
              translate3d(var(--exit-start-x), var(--exit-start-y), 0)
              rotate(var(--exit-rotate))
              scale(1);
          }
          58% {
            opacity: 0.92;
            transform: translate3d(46%, -10px, -38px) rotate(11deg) scale(0.94);
          }
          to {
            opacity: 0;
            transform: translate3d(46px, 48px, -130px) rotate(8deg) scale(0.72);
          }
        }
        @keyframes fabric-stack-bring-forward-left {
          from {
            opacity: 0.42;
            transform:
              translate3d(-48px, 44px, -120px)
              rotate(-9deg)
              scale(0.76);
          }
          to {
            opacity: 1;
            transform:
              translate3d(var(--card-x), var(--card-y), calc(var(--card-depth) * -18px))
              rotate(var(--card-rotate))
              scale(var(--card-scale));
          }
        }
        @media (max-width: 860px) {
          .fabric-stack-shell {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .fabric-stack-panel {
            border-left: 0;
            border-top: 1px solid rgba(231,200,115,0.18);
            min-height: 0;
            padding-left: 0;
            padding-top: 24px;
          }
          .fabric-stack-stage {
            max-width: 300px;
            min-height: 246px;
            width: min(70vw, 300px);
          }
          .fabric-stack-controls {
            margin-top: 18px;
          }
        }
        @media (max-width: 520px) {
          .fabric-stack-shell {
            padding: 20px 16px 24px;
          }
          .fabric-stack-shell::before {
            left: 10px;
            width: 8px;
          }
          .fabric-stack-stage {
            min-height: 238px;
            width: min(76vw, 280px);
          }
          .fabric-stack-card {
            box-shadow:
              -7px 0 0 rgba(248,245,240,0.035),
              0 22px 54px rgba(0,0,0,0.28);
          }
          .fabric-stack-button {
            height: 44px;
            width: 44px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .fabric-stack-card,
          .fabric-stack-card img,
          .fabric-stack-button {
            animation: none !important;
            transition: none;
          }
        }
      `}</style>
      <div className="fabric-stack-shell">
        <div
          className={`fabric-stack-stage ${drag.active ? 'is-dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
          role="group"
          aria-label="Pile de tissus Maison El Mire"
        >
          {visibleItems
            .slice()
            .reverse()
            .map(({ item, depth }) => {
              const isTop = depth === 0;
              const isIncoming = isTop && incoming?.src === item.src;
              const x = isTop ? drag.x : depth * 13;
              const y = isTop ? drag.y : depth * 11;
              const rotate = isTop ? drag.x / 16 : ((depth % 2 === 0 ? 1 : -1) * (depth + 1) * 1.35);
              const scale = isTop ? 1 : 1 - depth * 0.045;
              const opacity = 1 - depth * 0.08;

              return (
                <figure
                  key={item.src}
                  className={`fabric-stack-card ${isTop ? 'is-top' : ''} ${isIncoming ? 'is-incoming' : ''} ${isTop && drag.active ? 'is-dragged' : ''}`}
                  data-direction={isIncoming ? incoming.direction : undefined}
                  style={
                    {
                      '--card-x': `${x}px`,
                      '--card-y': `${y}px`,
                      '--card-rotate': `${rotate}deg`,
                      '--card-scale': scale,
                      '--card-depth': depth,
                      opacity,
                      zIndex: visibleDepth - depth,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    draggable={false}
                    loading={depth === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 860px) 82vw, 430px"
                    style={{ objectFit: 'cover' }}
                  />
                  <figcaption className="fabric-stack-label">{item.label}</figcaption>
                </figure>
              );
            })}
          {leaving ? (
            <figure
              className="fabric-stack-card is-leaving"
              style={
                {
                  '--exit-start-x': `${leaving.startX}px`,
                  '--exit-start-y': `${leaving.startY}px`,
                  '--exit-rotate': `${leaving.rotate}deg`,
                } as CSSProperties
              }
            >
              <Image
                src={leaving.item.src}
                alt={leaving.item.alt}
                fill
                draggable={false}
                sizes="(max-width: 860px) 82vw, 430px"
                style={{ objectFit: 'cover' }}
              />
              <figcaption className="fabric-stack-label">{leaving.item.label}</figcaption>
            </figure>
          ) : null}
        </div>

        <div className="fabric-stack-panel">
          <div>
            <p className="fabric-stack-kicker">Pile d&apos;echantillons</p>
            <p className="fabric-stack-count">{String(activeIndex + 1).padStart(2, '0')}</p>
            <p className="fabric-stack-total">sur {String(items.length).padStart(2, '0')} tissus</p>
          </div>
          <div className="fabric-stack-controls">
            <button className="fabric-stack-button" type="button" onClick={() => move(-1)} aria-label="Voir le tissu precedent">
              <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.7} />
            </button>
            <button className="fabric-stack-button" type="button" onClick={() => move(1)} aria-label="Voir le tissu suivant">
              <ChevronRight aria-hidden="true" size={24} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
      {preloadAll ? (
        <div className="fabric-stack-preload" aria-hidden="true">
          {items.map((item) => (
            <Image
              key={`preload-${item.src}`}
              src={item.src}
              alt=""
              width={700}
              height={875}
              loading="eager"
              sizes="(max-width: 860px) 82vw, 430px"
              style={{ height: 1, objectFit: 'cover', width: 1 }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
