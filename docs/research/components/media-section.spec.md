# Media / TV News Section — Spec

## Visual Reference
`docs/design-references/romeocouture-desktop-1440.png` (section 3)

## Layout
- Width: 100%
- Min-height: ~505px
- Background: #111111
- Padding: 80px 0

## Section Header
```
<div class="section-header" style="text-align:center; margin-bottom:60px">
  <span class="section-label">MÉDIAS</span>
  <h2 class="section-title">ROMEO COUTURE DANS LES MÉDIAS</h2>
</div>
```

### Section label
- font-family: Montserrat, sans-serif
- font-size: 11px
- letter-spacing: 4px
- text-transform: uppercase
- color: #777777
- display: block
- margin-bottom: 15px

### Section title
- font-family: Aboreto, sans-serif
- font-size: clamp(24px, 3vw, 40px)
- font-weight: 400
- letter-spacing: 4px
- text-transform: uppercase
- color: #ffffff

## Media Items List
3 items displayed as a vertical numbered list or grid.

### Item Data
1. Channel: France 24
   - Title: "Romeo Couture s'invite sur France 24"
   - Date: "15 MARS 2023"
   - Thumbnail: placeholder (no downloaded thumb — use a dark 16:9 placeholder)
   - href: "#"

2. Channel: MBC4 Trending
   - Title: "Trending: La haute couture marocaine à l'honneur"
   - Date: "08 JUIN 2023"
   - Thumbnail: placeholder
   - href: "#"

3. Channel: Dunia TV
   - Title: "Dunia TV couvre le défilé de Romeo Couture"
   - Date: "22 SEPTEMBRE 2023"
   - Thumbnail: placeholder
   - href: "#"

## Item Layout (per item)
```
<div class="media-item">
  <span class="media-number">01</span>
  <div class="media-thumbnail">
    <img src="..." alt="..." />
    <div class="play-icon">▶</div>
  </div>
  <div class="media-info">
    <span class="media-channel">FRANCE 24</span>
    <h3 class="media-title">Title text</h3>
    <span class="media-date">15 MARS 2023</span>
  </div>
</div>
```

## Item Styling
### Container
- display: flex
- align-items: center
- gap: 30px
- padding: 25px 0
- border-bottom: 1px solid rgba(255,255,255,0.1)
- cursor: pointer
- transition: opacity 300ms
- hover: opacity 0.7

### Number
- font-family: Aboreto, sans-serif
- font-size: 32px
- color: rgba(255,255,255,0.15)
- min-width: 60px
- font-weight: 400

### Thumbnail
- width: 180px
- height: 100px
- background: #1a1a1a
- position: relative
- overflow: hidden
- flex-shrink: 0
- img: width 100% height 100% object-fit cover

### Play Icon overlay
- position: absolute, centered
- width: 40px, height: 40px
- border: 2px solid rgba(255,255,255,0.7)
- border-radius: 50%
- display flex, align-items center, justify-content center
- color: white, font-size: 12px

### Channel name
- font-family: Montserrat, sans-serif
- font-size: 11px
- letter-spacing: 3px
- text-transform: uppercase
- color: #777777
- display: block
- margin-bottom: 8px

### Title
- font-family: Aboreto, sans-serif
- font-size: 18px
- font-weight: 400
- color: #ffffff
- margin-bottom: 10px

### Date
- font-family: Montserrat, sans-serif
- font-size: 11px
- color: #777777
- letter-spacing: 2px
- text-transform: uppercase

## Responsive
- Desktop (>992px): items side by side or full-width list
- Mobile (<768px): thumbnail smaller (120px wide), number hidden

## Scroll Animation
- Items enter with fadeInUpShorter, staggered 150ms per item
- IntersectionObserver threshold: 0.1

## Implementation Notes
- `'use client'` for IntersectionObserver
- Items are links (<a> wrapping the item) with href="#"
- No actual video player needed — just link behavior
