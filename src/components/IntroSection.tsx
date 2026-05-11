export default function IntroSection() {
  return (
    <section style={{ background: '#001D14', padding: '70px 18px 64px', textAlign: 'center' }}>
      <h2
        style={{
          color: 'var(--ivory)',
          fontFamily: 'var(--font-heading)',
          fontSize: '24px',
          fontWeight: 700,
          margin: '0 0 14px',
        }}
      >
        Costumes d’exception et tailoring moderne
      </h2>
      <p
        style={{
          color: '#b8ad96',
          fontFamily: 'var(--font-sans)',
          fontSize: '14.5px',
          lineHeight: 1.62,
          margin: '0 auto',
          maxWidth: '560px',
        }}
      >
        Maison El Mire imagine des costumes élégants pour les mariages,
        les cérémonies, les soirées et les moments où la tenue doit parler avant vous.
      </p>
    </section>
  );
}
