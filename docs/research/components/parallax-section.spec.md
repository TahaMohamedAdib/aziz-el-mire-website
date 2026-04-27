# Parallax Section (Défilé Malaga) — Spec

## Visual Reference
`docs/design-references/romeocouture-desktop-1440.png` (section below hero)

## Layout
- Width: 100%
- Height: ~505px (min-height)
- Background: `/images/tours/defile-malaga-1.jpg`
- Background attachment: fixed (CSS parallax)
- Background size: cover
- Background position: center
- Background repeat: no-repeat
- Overflow: hidden

## Overlay
- Pseudo-element ::before or inner div
- background: rgba(0,0,0,0.5)
- position: absolute, inset: 0
- z-index: 1

## Content Layout
```
<section class="parallax-section">
  <div class="parallax-overlay" />
  <div class="parallax-content">
    <span class="date-stamp">25 — 30 SEPTEMBRE 2023 · MALAGA, ESPAGNE</span>
    <h2 class="parallax-title">DÉFILÉ MALAGA</h2>
    <p class="parallax-text">
      Une collection exceptionnelle présentée dans le cadre enchanteur de Malaga,
      mêlant tradition et modernité dans un spectacle inoubliable.
    </p>
  </div>
</section>
```

## Content Positioning
- Content div: position relative, z-index 2
- Vertically centered within section (display flex, align-items center, justify-content center)
- Text alignment: center
- Max-width: 700px, margin 0 auto
- Padding: 80px 30px

## Typography
### Date stamp
- font-family: Montserrat, sans-serif
- font-size: 12px
- font-weight: 400
- letter-spacing: 3px
- text-transform: uppercase
- color: rgba(255,255,255,0.7)
- margin-bottom: 20px
- display: block

### H2 title
- font-family: Aboreto, sans-serif
- font-size: clamp(32px, 5vw, 64px)
- font-weight: 400
- letter-spacing: 6px
- text-transform: uppercase
- color: #ffffff
- margin-bottom: 25px

### Paragraph
- font-family: Playfair Display, serif
- font-size: 16px
- line-height: 1.8
- color: rgba(255,255,255,0.8)
- max-width: 550px
- margin: 0 auto

## Scroll Animation (IntersectionObserver)
- Elements start invisible (opacity: 0, transform: translateY(30px))
- When section enters viewport (threshold: 0.2), animate in:
  - date-stamp: fadeInUpShorter 0.6s ease, delay 0ms
  - h2 title: fadeInUpShorter 0.6s ease, delay 200ms
  - paragraph: fadeInUpShorter 0.6s ease, delay 400ms
- Use `'use client'` + useEffect with IntersectionObserver

## Implementation Notes
- `background-attachment: fixed` for parallax effect (CSS-only, no JS)
- On mobile (<768px), background-attachment should fall back to scroll (fixed doesn't work well on iOS)
- The section is a semantic <section> element
- Position: relative to contain the absolute overlay
