# Newsletter Section — Spec

## Visual Reference
`docs/design-references/romeocouture-desktop-1440.png` (section 5)

## Layout
- Width: 100%
- Height: ~100px (compact strip)
- Background: #1a1a1a (slightly lighter than main bg)
- Padding: 30px 0

## Content Structure
```
<section class="newsletter-section">
  <div class="container-rc">
    <div class="newsletter-inner">
      <div class="newsletter-text">
        <h3>RESTEZ INFORMÉ</h3>
        <p>Inscrivez-vous à notre newsletter pour suivre nos actualités</p>
      </div>
      <form class="newsletter-form">
        <input type="email" placeholder="Votre adresse email" />
        <button type="submit">S'INSCRIRE</button>
      </form>
    </div>
  </div>
</section>
```

## Inner Layout
- Display: flex
- Align-items: center
- Justify-content: space-between
- Gap: 40px
- On mobile (<768px): flex-direction column, text-align center

## Typography
### H3
- font-family: Aboreto, sans-serif
- font-size: 18px
- font-weight: 400
- letter-spacing: 3px
- text-transform: uppercase
- color: #ffffff
- margin-bottom: 5px

### Paragraph
- font-family: Playfair Display, serif
- font-size: 14px
- color: #777777

## Form
- Display: flex, gap: 0 (input and button flush together)

### Email Input
- font-family: Montserrat, sans-serif
- font-size: 12px
- letter-spacing: 1px
- color: #ffffff
- background: transparent
- border: 1px solid rgba(255,255,255,0.2)
- border-right: none
- padding: 12px 20px
- width: 280px
- outline: none
- placeholder color: #777777
- focus: border-color rgba(255,255,255,0.5)

### Submit Button
- font-family: Montserrat, sans-serif
- font-size: 11px
- font-weight: 700
- letter-spacing: 2px
- text-transform: uppercase
- color: #111111
- background: #ffffff
- border: 1px solid #ffffff
- padding: 12px 25px
- cursor: pointer
- transition: background 200ms, color 200ms
- hover: background transparent, color #ffffff

## Implementation Notes
- Static form (no submission handler needed, just preventDefault)
- No 'use client' needed unless adding submit handler
- The section acts as a divider between media content and footer
