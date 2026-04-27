# Page Topology — romeocouture.com

## Overall Structure
- Background: #111111 (near-black)
- Layout: full-width, single-column scroll
- No smooth scroll library (Lenis/Locomotive not detected)
- Font stack: Playfair Display (body), Aboreto (headings), Montserrat (UI)

## Sections (top to bottom)

| # | Name | Type | Height | Interaction Model |
|---|------|------|--------|-------------------|
| 0 | Header/Nav | Fixed overlay | 100px | scroll-driven (shrinks at 30px) |
| 1 | Hero Carousel | Full-viewport | 100vh | time-driven (15s autoplay, owl-carousel) |
| 2 | Défilé Malaga | Parallax section | ~505px | scroll-driven (parallax bg) |
| 3 | Media/TV News | Video thumbnails | ~505px | click-driven (video thumbs) |
| 4 | Instagram Grid | Grid + CTA | ~240px | static |
| 5 | Newsletter | Email signup | ~100px | static |
| 6 | Footer | 3-column | ~200px | static (hover links) |

## Z-Index Layers
- Header: position fixed, z-index high (sticky)
- Hero carousel: z-index 0 (video behind overlay)
- Content overlay: z-index 3

## Key Dependencies
- Header overlays the hero carousel (header is transparent, hero is 100vh)
- Instagram grid has a centered overlay CTA card (position absolute transform50)

## Responsive Breakpoints (observed)
- Mobile (390px): nav collapses to hamburger, all sections stack single-column
- Tablet (768px): partial layout maintained
- Desktop (1440px): full multi-column layout
