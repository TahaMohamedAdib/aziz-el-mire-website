# Footer — Spec

## Visual Reference
`docs/design-references/romeocouture-desktop-1440.png` (bottom)

## Layout
- Width: 100%
- Background: #111111
- Border-top: 1px solid rgba(255,255,255,0.1)
- Padding: 60px 0 30px

## 3-Column Structure
```
<footer>
  <div class="container-rc">
    <div class="footer-grid">
      <!-- Col 1: Brand -->
      <div class="footer-col">
        <img src="/images/logo-default.png" alt="Romeo Couture" class="footer-logo" />
        <p class="footer-tagline">Haute Couture · Prêt-à-Porter</p>
        <p class="footer-desc">
          Maison de couture fondée sur l'excellence et l'élégance,
          Romeo Couture crée des pièces uniques qui traversent les générations.
        </p>
      </div>

      <!-- Col 2: Navigation -->
      <div class="footer-col">
        <h4 class="footer-heading">NAVIGATION</h4>
        <ul class="footer-links">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Collections</a></li>
          <li><a href="#">Défilés</a></li>
          <li><a href="#">Roméo Couture</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <!-- Col 3: Contact -->
      <div class="footer-col">
        <h4 class="footer-heading">CONTACT</h4>
        <ul class="footer-contact-list">
          <li>
            <EnvelopeIcon />
            <a href="mailto:contact@romeocouture.com">contact@romeocouture.com</a>
          </li>
          <li>
            <PhoneIcon />
            <span>+212 6XX XXX XXX</span>
          </li>
        </ul>
        <div class="footer-social">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="YouTube">YT</a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <p>© 2024 Romeo Couture. Tous droits réservés.</p>
    </div>
  </div>
</footer>
```

## Grid
- display: grid
- grid-template-columns: 1.5fr 1fr 1fr (desktop)
- gap: 60px
- On mobile (<768px): single column

## Typography
### Footer logo
- height: 45px, width: auto

### Tagline
- font-family: Montserrat, sans-serif
- font-size: 11px
- letter-spacing: 3px
- text-transform: uppercase
- color: #777777
- margin: 15px 0 12px

### Description
- font-family: Playfair Display, serif
- font-size: 14px
- line-height: 1.8
- color: #777777
- max-width: 280px

### Column headings (h4)
- font-family: Aboreto, sans-serif
- font-size: 13px
- letter-spacing: 3px
- text-transform: uppercase
- color: #ffffff
- margin-bottom: 25px

### Footer links
- list-style: none
- padding: 0
- margin: 0
- each li: margin-bottom 12px
- a: font-family Playfair Display, font-size 14px, color #777777
- a:hover: color #ffffff, transition 200ms

### Contact list
- list-style: none, padding: 0
- each li: display flex, align-items center, gap 12px, margin-bottom 15px
- icon: width 16px, height 16px, color #777777, flex-shrink 0
- text/link: font-size 14px, color #777777
- link hover: color #ffffff

### Social links
- display: flex, gap: 15px, margin-top: 20px
- each: font-size 12px, letter-spacing 2px, color #777777, hover #ffffff, transition 200ms

## Bottom Bar
- border-top: 1px solid rgba(255,255,255,0.1)
- margin-top: 50px
- padding-top: 25px
- text-align: center
- font-family: Montserrat
- font-size: 12px
- color: #777777
- letter-spacing: 1px

## Implementation Notes
- Import EnvelopeIcon, PhoneIcon from '@/components/icons'
- No 'use client' needed
- Footer is a Server Component
