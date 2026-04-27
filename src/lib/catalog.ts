export const BRAND_NAME = 'Aziz EL Mire Haute Couture';
export const BRAND_TAGLINE = 'Maison de creation & sur-mesure';
export const BRAND_OFFER = "Costumes d'exception & pieces exclusives";
export const BRAND_SIGNATURE = 'Where elegance is tailored to you';
export const PHONE_DISPLAY = '+212 6 61 48 28 84';
export const PHONE_TEL = '+212661482884';
export const WHATSAPP_NUMBER = '212661482884';
export const ADDRESS_DISPLAY = 'Sidi Maarouf, Casablanca';
export const EMAIL_DISPLAY = 'contact@azizelmire.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/maison_elmire/';
export const FACEBOOK_URL = 'https://facebook.com/azizelmire';
export const TIKTOK_URL = 'https://tiktok.com/@azizelmire';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/aziz-el-mire-haute-couture';

export const navItems = [
  { label: 'Collections', href: '/collections' },
  { label: 'Nouveautes', href: '/new-arrivals' },
  { label: 'Sur Mesure', href: '/sur-mesure' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'A propos', href: '/about' },
  { label: 'Reserver', href: '/contact' },
] as const;

export const productCategories = [
  'Smokings',
  'Costumes',
  'Vestes',
  'Pantalons',
  'Chemises',
  'Accessoires',
] as const;

export type ProductCategory = (typeof productCategories)[number];

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  collection: string;
  description: string;
  shortDescription: string;
  price: string;
  images: string[];
  colors: string[];
  sizes: string[];
  fabric: string;
  customization: string[];
  isNewArrival: boolean;
  whatsappMessage: string;
  aliases?: string[];
}

const BASE = process.env.NODE_ENV === 'production' ? '/aziz-el-mire-website' : '';
const IG = `${BASE}/aziz-media/instagram`;
const MEDIA = `${BASE}/aziz-media`;

export const instagramCategoryImages: Record<ProductCategory, string[]> = {
  Smokings: [
    `${IG}/costume-black-tuxedo-front.jpg`,
    `${IG}/costume-black-double-breasted-front.jpg`,
    `${IG}/pantalon-black-tuxedo-side.jpg`,
  ],
  Costumes: [
    `${IG}/costume-grey-boutique.jpg`,
    `${IG}/costume-navy-boutique.jpg`,
    `${IG}/costume-navy-red-tie.jpg`,
    `${IG}/costume-plaid-red-tie.jpg`,
    `${IG}/costume-black-double-breasted.jpg`,
  ],
  Vestes: [
    `${IG}/veste-navy-canvas-detail.jpg`,
    `${IG}/veste-navy-mannequin.jpg`,
    `${IG}/veste-pinstripe-detail.jpg`,
    `${IG}/veste-grey-mannequin.jpg`,
    `${IG}/veste-bordeaux-hanger.jpg`,
    `${IG}/veste-bordeaux-green-duo.jpg`,
    `${IG}/veste-green-sleeve-detail.jpg`,
    `${IG}/veste-green-lapel-detail.jpg`,
    `${IG}/veste-green-mannequin.jpg`,
    `${IG}/veste-bordeaux-mannequin.jpg`,
    `${IG}/veste-bordeaux-lapel-detail.jpg`,
    `${IG}/veste-blue-mannequin.jpg`,
    `${IG}/veste-pinstripe-pocket-detail.jpg`,
    `${IG}/veste-lapel-closeup.jpg`,
    `${IG}/veste-sleeve-buttons.jpg`,
    `${IG}/veste-blue-cuff-detail.jpg`,
  ],
  Pantalons: [
    `${IG}/pantalon-black-tuxedo-side.jpg`,
    `${IG}/pantalon-city-look.jpg`,
    `${IG}/pantalon-navy-suit-look.jpg`,
  ],
  Chemises: [
    `${MEDIA}/web-chemises-white-shirt.jpg`,
    `${IG}/costume-grey-boutique.jpg`,
    `${IG}/costume-navy-boutique.jpg`,
  ],
  Accessoires: [
    `${IG}/accessoire-lining-detail.jpg`,
    `${IG}/accessoire-label-detail.jpg`,
    `${IG}/accessoire-pocket-square-buttons.jpg`,
    `${IG}/accessoire-initials-lining.jpg`,
    `${IG}/accessoire-blue-lining-label.jpg`,
    `${IG}/accessoire-maison-elmire-label.jpg`,
    `${IG}/accessoire-s-a-label-detail.jpg`,
  ],
};

export const productCategoryImages: Record<ProductCategory, string> = {
  Smokings: instagramCategoryImages.Smokings[0],
  Costumes: instagramCategoryImages.Costumes[1],
  Vestes: instagramCategoryImages.Vestes[5],
  Pantalons: instagramCategoryImages.Pantalons[0],
  Chemises: instagramCategoryImages.Chemises[0],
  Accessoires: instagramCategoryImages.Accessoires[5],
};

export const lookbookImages = [
  `${IG}/atelier-boutique-window.jpg`,
  ...instagramCategoryImages.Smokings,
  ...instagramCategoryImages.Costumes,
  ...instagramCategoryImages.Vestes,
  ...instagramCategoryImages.Pantalons,
  ...instagramCategoryImages.Accessoires,
  `${MEDIA}/ref-tailor-workshop.jpg`,
  `${MEDIA}/ref-hands-fabric.jpg`,
].filter((image, index, list) => list.indexOf(image) === index);

export const products: Product[] = [
  {
    id: 1,
    slug: 'smoking-noir-revers-satin',
    aliases: ['costume-noir-satin'],
    name: 'Smoking noir revers satin',
    category: 'Smokings',
    collection: 'Mariage & Gala',
    description:
      "Taille dans une matiere noire aux reflets satin, ce smoking habille les soirees de mariage avec une elegance sobre et maitrisee. Les revers lumineux structurent la silhouette et signent une presence calme, precise, tres Maison.",
    shortDescription: 'Smoking noir a revers satin pour mariage et soiree.',
    price: '3 900 MAD',
    images: [
      `${IG}/costume-black-tuxedo-front.jpg`,
      `${IG}/costume-black-double-breasted.jpg`,
      `${IG}/pantalon-black-tuxedo-side.jpg`,
      `${IG}/accessoire-blue-lining-label.jpg`,
    ],
    colors: ['Noir', 'Bleu nuit', 'Gris anthracite'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Laine melangee et revers satin',
    customization: ['Doublure personnalisee', 'Boutons couture', 'Ajustement morphologie'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis interesse par le smoking noir revers satin.',
  },
  {
    id: 2,
    slug: 'costume-croise-noir',
    aliases: ['smoking-noir-gilet'],
    name: 'Costume croise noir',
    category: 'Costumes',
    collection: 'Ceremonie',
    description:
      "Ce costume croise noir dessine une carrure nette et une allure de ceremonie sans exces. Le boutonnage double apporte de la profondeur, tandis que la coupe reste fluide pour accompagner les grands moments.",
    shortDescription: 'Costume croise noir pour ceremonie et mariage.',
    price: '4 500 MAD',
    images: [
      `${IG}/costume-black-double-breasted-front.jpg`,
      `${IG}/costume-navy-boutique.jpg`,
      `${IG}/costume-grey-boutique.jpg`,
      `${IG}/costume-plaid-red-tie.jpg`,
    ],
    colors: ['Noir', 'Bleu nuit'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Laine melangee premium',
    customization: ['Revers satin', 'Boutonnage croise', 'Broderie initiales'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je souhaite commander le costume croise noir.',
  },
  {
    id: 3,
    slug: 'veste-bleu-nuit-epuree',
    aliases: ['veste-noire-prestige'],
    name: 'Veste bleu nuit epuree',
    category: 'Vestes',
    collection: 'Prestige',
    description:
      "Une veste bleu nuit au tombe net, pensee pour passer d'une reception a un diner habille avec naturel. Sa ligne minimaliste laisse parler la matiere, la coupe et la precision des finitions.",
    shortDescription: 'Veste bleu nuit minimaliste, elegante et structuree.',
    price: 'Sur demande',
    images: [
      `${IG}/veste-navy-mannequin.jpg`,
      `${IG}/veste-pinstripe-detail.jpg`,
      `${IG}/veste-grey-mannequin.jpg`,
      `${IG}/veste-sleeve-buttons.jpg`,
    ],
    colors: ['Bleu nuit', 'Gris anthracite', 'Noir'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu de ceremonie structure',
    customization: ['Col ajuste', 'Boutons luxe', 'Longueur ajustee'],
    isNewArrival: false,
    whatsappMessage: 'Bonjour, je suis interesse par la veste bleu nuit epuree.',
  },
  {
    id: 4,
    slug: 'veste-bordeaux-texturee',
    aliases: ['veste-noire-texturee'],
    name: 'Veste bordeaux texturee',
    category: 'Vestes',
    collection: 'Signature',
    description:
      "La texture bordeaux donne a cette veste une profondeur discrete, ideale pour les ceremonies du soir. Elle affirme la silhouette sans la charger, avec une couleur chaude et une finition couture.",
    shortDescription: 'Veste bordeaux texturee avec allure signature.',
    price: '3 600 MAD',
    images: [
      `${IG}/veste-bordeaux-hanger.jpg`,
      `${IG}/veste-bordeaux-lapel-detail.jpg`,
      `${IG}/veste-green-lapel-detail.jpg`,
      `${IG}/veste-blue-cuff-detail.jpg`,
    ],
    colors: ['Bordeaux', 'Vert profond', 'Bleu nuit'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu texture premium',
    customization: ['Coupe cintree', 'Poches passepoilees', 'Doublure personnalisee'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis interesse par la veste bordeaux texturee.',
  },
  {
    id: 5,
    slug: 'vestes-bordeaux-et-vert-profond',
    aliases: ['veste-blanche-ceremonie'],
    name: 'Vestes bordeaux & vert profond',
    category: 'Vestes',
    collection: 'Ceremonie',
    description:
      "Deux nuances riches pour une tenue de ceremonie plus personnelle. Le bordeaux et le vert profond dialoguent avec des finitions soignees, parfaits pour composer une silhouette distinctive.",
    shortDescription: 'Vestes ceremonie en bordeaux et vert profond.',
    price: '4 800 MAD',
    images: [
      `${IG}/veste-bordeaux-green-duo.jpg`,
      `${IG}/veste-green-mannequin.jpg`,
      `${IG}/veste-blue-mannequin.jpg`,
      `${IG}/veste-navy-canvas-detail.jpg`,
    ],
    colors: ['Bordeaux', 'Vert profond', 'Bleu', 'Ivoire'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu ceremonie texture',
    customization: ['Boutons metal', 'Revers ajuste', 'Doublure personnalisee'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis interesse par les vestes bordeaux et vert profond.',
  },
  {
    id: 6,
    slug: 'pantalon-smoking-noir',
    aliases: ['pantalon-tailoring-noir'],
    name: 'Pantalon smoking noir',
    category: 'Pantalons',
    collection: 'Essentiels',
    description:
      "Un pantalon noir a la ligne nette, concu pour accompagner un smoking ou une veste de ceremonie. La coupe allonge la jambe et conserve une tenue impeccable du premier rendez-vous a la derniere danse.",
    shortDescription: 'Pantalon smoking noir a coupe nette.',
    price: '1 200 MAD',
    images: [
      `${IG}/pantalon-black-tuxedo-side.jpg`,
      `${IG}/pantalon-navy-suit-look.jpg`,
      `${IG}/pantalon-city-look.jpg`,
      `${MEDIA}/web-pantalons-tailored-trousers.jpg`,
    ],
    colors: ['Noir', 'Gris', 'Bleu nuit'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu tailoring infroissable',
    customization: ['Ourlet personnalise', 'Taille ajustee', 'Pinces sur demande'],
    isNewArrival: false,
    whatsappMessage: 'Bonjour, je souhaite des informations sur le pantalon smoking noir.',
  },
  {
    id: 7,
    slug: 'chemise-blanche-premium',
    aliases: ['chemise-blanche-couture'],
    name: 'Chemise blanche premium',
    category: 'Chemises',
    collection: 'Essentiels',
    description:
      "Une chemise blanche en coton premium, lumineuse sous un revers satin comme sous une veste de jour. Le col reste precis, les poignets propres, la silhouette toujours composee.",
    shortDescription: 'Chemise blanche premium pour costumes et smokings.',
    price: 'Sur demande',
    images: [
      `${MEDIA}/web-chemises-white-shirt.jpg`,
      `${IG}/accessoire-pocket-square-buttons.jpg`,
      `${IG}/costume-grey-boutique.jpg`,
      `${IG}/costume-navy-boutique.jpg`,
    ],
    colors: ['Blanc', 'Ivoire', 'Bleu clair'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Coton premium',
    customization: ['Col italien', 'Poignets mousquetaire', 'Initiales brodees'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis interesse par la chemise blanche premium.',
  },
  {
    id: 8,
    slug: 'finitions-maison-elmire',
    aliases: ['noeud-papillon-satin'],
    name: 'Finitions Maison Elmire',
    category: 'Accessoires',
    collection: 'Accessoires',
    description:
      "Doublures, pochettes, etiquettes et initiales brodees donnent a chaque piece son caractere intime. Ces details se decouvrent de pres et prolongent l'elegance jusque dans l'interieur du costume.",
    shortDescription: 'Doublures, pochettes, initiales et details personnalises.',
    price: 'Sur demande',
    images: [
      `${IG}/accessoire-maison-elmire-label.jpg`,
      `${IG}/accessoire-pocket-square-buttons.jpg`,
      `${IG}/accessoire-lining-detail.jpg`,
      `${IG}/accessoire-initials-lining.jpg`,
      `${IG}/accessoire-label-detail.jpg`,
      `${IG}/accessoire-s-a-label-detail.jpg`,
    ],
    colors: ['Noir', 'Blanc', 'Bordeaux'],
    sizes: ['Sur mesure'],
    fabric: 'Doublure, satin et finitions premium',
    customization: ['Initiales brodees', 'Pochette assortie', 'Etiquette personnalisee'],
    isNewArrival: false,
    whatsappMessage: 'Bonjour, je suis interesse par les finitions Maison Elmire.',
  },
];

export const featuredProducts = products.slice(0, 5);
export const newArrivals = products.filter((product) => product.isNewArrival);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug || String(product.id) === slug || product.aliases?.includes(slug));
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .concat(products.filter((item) => item.slug !== product.slug && item.category !== product.category))
    .slice(0, 3);
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
