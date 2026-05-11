import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import FabricSwatchBook from '@/components/FabricSwatchBook';
import { asset } from '@/lib/utils';

const tissusDirectory = join(process.cwd(), 'public', 'Tissus');

function getFabricImages() {
  try {
    return readdirSync(tissusDirectory)
      .filter((file) => /\.(avif|gif|jpe?g|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, 'fr'));
  } catch {
    return [];
  }
}

const processSteps = [
  {
    number: '01',
    title: 'La matière',
    text: 'Le rendez-vous commence par les textures : poids, main, reflets et usage. Le tissu donne déjà le ton de la silhouette.',
  },
  {
    number: '02',
    title: 'La coupe',
    text: "L'atelier traduit votre posture en lignes nettes : épaule, cintrage, longueur et aisance sont ajustés ensemble.",
  },
  {
    number: '03',
    title: 'Le tombé',
    text: "Les essayages affinent l'équilibre. La pièce doit accompagner le mouvement sans perdre sa tenue.",
  },
  {
    number: '04',
    title: 'Les finitions',
    text: 'Doublure, boutons, revers et détails intérieurs signent la pièce sans la surcharger.',
  },
];

export default function FabricStorySection({ showProcess = true }: { showProcess?: boolean }) {
  const fabricImages = getFabricImages();
  const featuredImages = fabricImages.slice(0, processSteps.length);
  const fabricBookItems = fabricImages.map((image, index) => ({
    src: asset(`/Tissus/${encodeURIComponent(image)}`),
    alt: `Tissu Maison El Mire ${index + 1}`,
    label: String(index + 1).padStart(2, '0'),
  }));

  if (fabricImages.length === 0) {
    return null;
  }

  return (
    <section className={`fabric-story ${showProcess ? '' : 'is-library-only'}`} id="tissus">
      <div className="container-rc">
        {showProcess ? (
          <>
            <div className="fabric-story-head">
              <div>
                <p className="eyebrow">Tissus &amp; sur mesure</p>
                <h2 className="fabric-story-title">Du tissu au costume.</h2>
              </div>
              <p className="fabric-story-copy">
                Une silhouette commence par une matière juste. La sélection, la coupe, le tombé et les finitions avancent ensemble pour créer une pièce personnelle, précise, durable.
              </p>
            </div>

            <div className="fabric-process" aria-label="Processus du tissu au costume">
              <div className="fabric-process-visuals" aria-hidden="true">
                {featuredImages.map((image, index) => (
                  <span key={image} className="fabric-process-image">
                    <Image
                      src={asset(`/Tissus/${encodeURIComponent(image)}`)}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(max-width: 980px) 50vw, 24vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="fabric-gallery-label">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                ))}
              </div>
              <div className="fabric-process-copy">
                {processSteps.map((step) => (
                  <article key={step.title} className="fabric-process-step">
                    <span className="fabric-process-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </>
        ) : null}

        <div className="fabric-library-head">
          <div>
            <p className="eyebrow">Bibliothèque textile</p>
            <h3>Les étoffes de la maison</h3>
          </div>
          <p>
            Tous les tissus disponibles sont présentés ici pour inspirer le rendez-vous : nuances sombres, textures fines, motifs discrets et matières de cérémonie.
          </p>
        </div>
        <FabricSwatchBook items={fabricBookItems} />
        <div className="fabric-story-actions">
          <Link className="btn btn-gold" href="/reservation">Choisir mon tissu en atelier</Link>
          <Link className="btn btn-outline" href="/collections">Voir les pièces</Link>
        </div>
      </div>
    </section>
  );
}
