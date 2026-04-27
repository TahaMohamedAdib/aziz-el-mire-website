# Header / Nav — Spec

## Visual Reference
`docs/design-references/romeocouture-desktop-1440.png` (top strip)

## Layout
- Position: `fixed`, top 0, left 0, width 100%, z-index 1000
- State A (top of page): height 100px, background transparent, color white
- State B (scrolled >30px): height ~60px, background #111111, box-shadow 0 2px 10px rgba(0,0,0,0.3)
- Transition: `background-color 300ms ease, height 300ms ease, box-shadow 300ms ease`

## DOM Structure
```
<header class="site-header" [data-scrolled]>
  <div class="container-rc" style="display:flex; align-items:center; justify-content:space-between; height:100%">
    <!-- Logo -->
    <a href="/" class="logo">
      <img src="/images/logo-default.png" alt="Romeo Couture" height="50" />
    </a>

    <!-- Desktop Nav (hidden <992px) -->
    <nav class="desktop-nav">
      <ul style="display:flex; gap:40px; list-style:none; margin:0; padding:0">
        <li><a href="#">ACCUEIL</a></li>
        <li><a href="#">COLLECTIONS</a></li>
        <li><a href="#">DÉFILÉS</a></li>
        <li><a href="#">ROMÉO COUTURE</a></li>
        <li><a href="#">CONTACT</a></li>
      </ul>
    </nav>

    <!-- Hamburger (visible <992px) -->
    <button class="hamburger" aria-label="Menu">
      <span /><span /><span />
    </button>
  </div>
</header>
```

## Styling Details

### Logo image
- Height: 50px (State A), 40px (State B)
- transition: height 300ms ease

### Nav links
- font-family: Montserrat, sans-serif
- font-size: 13px
- font-weight: 700
- letter-spacing: 2px
- text-transform: uppercase
- color: #ffffff
- hover: color rgba(255,255,255,0.7), transition 200ms

### Hamburger (mobile only)
- 3 horizontal bars, color white
- each span: display block, width 25px, height 2px, background #fff, margin 5px 0
- hidden on desktop (>=992px)

## Behavior (scroll-driven)
```
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```
- When scrolled=true: apply dark bg + shadow + reduced height
- When scrolled=false: transparent + full height

## Implementation Notes
- Use `'use client'` for scroll listener
- CSS transition on the header element itself
- No mobile menu implementation needed (placeholder hamburger only)
- Logo: `<Image>` from next/image, unoptimized or width/height set
