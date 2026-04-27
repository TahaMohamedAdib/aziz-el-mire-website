# Behaviors — romeocouture.com

## Header
- **Trigger:** scroll past 30px
- **State A (top):** transparent background, height 100px, white text/links
- **State B (scrolled):** dark background #111111, height shrinks ~60px, adds subtle shadow
- **Transition:** CSS transition on background-color + height, ~300ms ease
- **Implementation:** scroll listener, add `.sticky` class at 30px threshold

## Hero Carousel
- **Interaction:** time-driven auto-rotate, 15000ms interval
- **Type:** owl-carousel with video backgrounds (not images)
- **Videos:** 4 mp4 videos, autoplay + loop + muted + playsinline
- **Overlay:** dark overlay at 0.4 opacity over each video
- **Slide content animation:**
  - H3 subtitle: fadeInDownShorterPlus, delay 100ms
  - H2 title: blurIn, delay 500ms
  - CTA button: fadeInUpShorter, delay 1600ms
- **Slide border decoration:** slide-title-border.png flanks the h3 (left/right), fadeIn at 250ms

## Parallax Section (Défilé Malaga)
- **Interaction:** scroll-driven parallax
- **Background:** defile-malaga-1.jpg fixed attachment
- **Content:** appears with scroll via IntersectionObserver
- **Text:** date stamp top-left, heading + paragraph centered

## Media/TV Section
- **Interaction:** click on video thumbnails opens modal/navigates
- **Items:** 3 video items (France 24, MBC4 Trending, Dunia TV)
- **Layout:** numbered list with thumbnail + channel info

## Instagram Grid
- **Interaction:** static grid, hover scale on items
- **Layout:** 5 columns desktop, 2 columns mobile
- **Center overlay:** Instagram CTA card (absolute positioned, dark bg)
- **Image hover:** scale 1.1, transition 300ms

## Newsletter / Footer
- **Interaction:** static form, hover states on links
- **Footer links hover:** color change to white, transition 200ms

## Responsive
- **< 992px:** hamburger menu replaces desktop nav
- **< 768px:** all sections stack single-column
- **< 576px:** font sizes reduce, hero text smaller
