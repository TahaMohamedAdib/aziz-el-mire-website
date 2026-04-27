# Hero Carousel — Spec

## Visual Reference
`docs/design-references/romeocouture-desktop-1440.png` (first viewport)

## Layout
- Full viewport: width 100%, height 100vh
- Position: relative, overflow hidden
- Background per slide: fullscreen <video> element (object-fit: cover)
- Dark overlay: absolute inset 0, background rgba(0,0,0,0.4), z-index 1
- Slide content: absolute, centered vertically and horizontally, z-index 2

## Videos (4 slides)
1. `/videos/video-collection-13.mp4`
2. `/videos/video-pres-a-porter.mp4`
3. `/videos/video-collection-7.mp4`
4. `/videos/video-collection-14.mp4`

## Slide Content Data
All slides share the same layout structure with different text:

Slide 1:
- subtitle (h3): "NOUVELLE COLLECTION"
- title (h2): "ROMEO COUTURE"
- btn: "DÉCOUVRIR" → href="#"

Slide 2:
- subtitle: "PRÊT-À-PORTER"
- title: "ÉLÉGANCE ABSOLUE"
- btn: "VOIR LA COLLECTION" → href="#"

Slide 3:
- subtitle: "DÉFILÉ EXCLUSIF"
- title: "HAUTE COUTURE"
- btn: "EXPLORER" → href="#"

Slide 4:
- subtitle: "SAISON 2024"
- title: "L'ART DU VÊTEMENT"
- btn: "DÉCOUVRIR" → href="#"

## Slide Content Layout
```
<div class="slide-content" style="text-align:center; color:#fff">
  <div class="slide-border-left">
    <img src="/images/slide-title-border.png" />
  </div>
  <h3 class="slide-subtitle">SUBTITLE</h3>
  <div class="slide-border-right">
    <img src="/images/slide-title-border.png" style="transform:scaleX(-1)" />
  </div>
  <h2 class="slide-title">TITLE</h2>
  <a href="#" class="slide-btn">BUTTON TEXT</a>
</div>
```

## Slide Border Decoration
- `slide-title-border.png` flanks the h3 subtitle left and right
- Left: normal, Right: flipped horizontally (scaleX(-1))
- Both fade in at 250ms delay

## Slide Content Typography
### H3 subtitle
- font-family: Montserrat, sans-serif
- font-size: 14px
- font-weight: 400
- letter-spacing: 4px
- text-transform: uppercase
- color: #ffffff
- margin-bottom: 15px

### H2 title
- font-family: Aboreto, sans-serif
- font-size: clamp(36px, 6vw, 80px)
- font-weight: 400
- letter-spacing: 6px
- text-transform: uppercase
- color: #ffffff
- margin-bottom: 30px

### CTA Button
- display: inline-block
- font-family: Montserrat, sans-serif
- font-size: 12px
- font-weight: 700
- letter-spacing: 3px
- text-transform: uppercase
- color: #ffffff
- border: 1px solid rgba(255,255,255,0.5)
- padding: 14px 40px
- hover: background rgba(255,255,255,0.1), border-color #fff
- transition: background 300ms, border-color 300ms

## Entrance Animations (per active slide)
Applied when slide becomes active (re-triggered on each transition):
- Border images: `fadeIn` 0.6s ease, delay 250ms
- H3 subtitle: `fadeInDownShorterPlus` 0.6s ease, delay 100ms
- H2 title: `blurIn` 0.8s ease, delay 500ms
- CTA button: `fadeInUpShorter` 0.6s ease, delay 1600ms
All start with opacity 0.

## Carousel Behavior
- Type: manual state machine (no library — do NOT use owl-carousel or any external lib)
- Auto-rotate: 15000ms interval
- Transition: cross-fade between slides (opacity 0→1 over 800ms)
- Active slide video: autoplay, loop, muted, playsInline
- Inactive slide videos: paused (to save resources)
- Pause on hover: optional, not required

## Navigation Dots
- Absolute positioned, bottom 30px, centered
- One dot per slide (4 total)
- Active dot: white filled circle, 10px diameter
- Inactive dot: white border only, 8px diameter
- Click to jump to slide

## Implementation Notes
- `'use client'` required for interval and state
- `useEffect` for interval: clear on unmount, reset on manual nav
- Video element: autoplay muted loop playsInline, width 100% height 100% objectFit cover
- Re-trigger animations: key prop on content div changes with activeIndex
- z-index layering: video(0) < overlay(1) < content(2) < dots(3)
