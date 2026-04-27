export default function IntroSection() {
  return (
    <section style={{ background: '#07100c', padding: '86px 20px 78px', textAlign: 'center' }}>
      <h2
        style={{
          color: 'var(--ivory)',
          fontFamily: 'var(--font-heading)',
          fontSize: '28px',
          fontWeight: 700,
          margin: '0 0 18px',
        }}
      >
        Costumes d’exception et tailoring moderne
      </h2>
      <p
        style={{
          color: '#b8ad96',
          fontFamily: 'var(--font-sans)',
          fontSize: '16px',
          lineHeight: 1.7,
          margin: '0 auto',
          maxWidth: '620px',
        }}
      >
        Maison El Mire imagine des costumes élégants pour les mariages,
        les cérémonies, les soirées et les moments où la tenue doit parler avant vous.
      </p>
    </section>
  );
}
