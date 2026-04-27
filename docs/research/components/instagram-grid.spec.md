# Instagram Grid — Spec

## Visual Reference
`docs/design-references/romeocouture-desktop-1440.png` (section 4)

## Layout
- Width: 100%
- Height: ~240px (fixed, no padding)
- Background: #111111
- Position: relative (for absolute overlay card)

## Grid
- CSS Grid: 5 columns desktop, 2 columns mobile (<768px)
- No gap between cells (gap: 0)
- Each cell: aspect-ratio 1/1 (square), overflow hidden

## Grid Items (10 placeholders)
Since Instagram images require API/login, use dark placeholder images.
Use Next.js Image or plain img with src pointing to a dark placeholder.

For src, use the defile-malaga background or generate via a placeholder URL pattern.
Actually: use `background-color: #1a1a1a` as placeholder for all 10 cells,
with a subtle gradient overlay to simulate photos.

```
<div class="instagram-grid">
  {/* 10 grid cells */}
  {posts.map((post) => (
    <a key={post.id} href={post.href} class="instagram-cell">
      <img src={post.imageSrc} alt={post.alt} />
    </a>
  ))}
  {/* Centered overlay CTA */}
  <div class="instagram-cta">
    <span class="instagram-icon">📷</span>
    <p>@romeocouture</p>
    <a href="https://instagram.com/romeocouture">SUIVRE</a>
  </div>
</div>
```

## Instagram Cell Styling
```css
.instagram-cell {
  display: block;
  overflow: hidden;
  aspect-ratio: 1;
  position: relative;
}
.instagram-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}
.instagram-cell:hover img {
  transform: scale(1.1);
}
```

## CTA Overlay Card
- Position: absolute
- Left: 50%, top: 50%, transform: translate(-50%, -50%)
- Width: ~200px
- Background: rgba(17,17,17,0.95)
- Padding: 25px 20px
- Text-align: center
- z-index: 5
- border: 1px solid rgba(255,255,255,0.1)

### CTA card content
- Instagram icon (use a simple camera SVG or @romeocouture text)
- Handle text: "@romeocouture", font-size 14px, color #fff, Montserrat
- Follow link: "SUIVRE SUR INSTAGRAM", font-size 11px, letter-spacing 2px, color #777, hover #fff

## Mock Post Data
```typescript
const posts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  imageSrc: '/images/tours/defile-malaga-1.jpg', // reuse available image
  alt: `Romeo Couture post ${i + 1}`,
  href: 'https://instagram.com/romeocouture'
}));
```

## Responsive
- Desktop (>=768px): 5 columns
- Mobile (<768px): 2 columns, CTA card scales down

## Implementation Notes
- No 'use client' needed (pure CSS hover)
- Grid is full-bleed (no container-rc wrapper)
- The CTA overlay sits in the grid flow but uses absolute positioning to center over the grid
- Parent div needs `position: relative` and `overflow: hidden`
