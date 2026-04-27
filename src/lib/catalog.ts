export const BRAND_NAME = 'Aziz EL Mire Haute Couture';
export const BRAND_TAGLINE = 'Maison de création & sur-mesure';
export const BRAND_OFFER = 'Costumes d’exception & pièces exclusives';
export const BRAND_SIGNATURE = 'Where elegance is tailored to you';
export const PHONE_DISPLAY = '+212 6 61 48 28 84';
export const WHATSAPP_NUMBER = '212661482884';
export const ADDRESS_DISPLAY = 'Sidi Maarouf, Casablanca';
export const INSTAGRAM_URL = 'https://www.instagram.com/maison_elmire/';
export const FACEBOOK_URL = 'https://facebook.com/azizelmire';
export const TIKTOK_URL = 'https://tiktok.com/@azizelmire';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/aziz-el-mire-haute-couture';

export const productCategories = [
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

const IG = '/aziz-media/instagram';

export const instagramCategoryImages: Record<ProductCategory, string[]> = {
  Costumes: [
    `${IG}/costume-grey-boutique.jpg`,
    `${IG}/costume-navy-boutique.jpg`,
    `${IG}/costume-navy-red-tie.jpg`,
    `${IG}/costume-plaid-red-tie.jpg`,
    `${IG}/costume-black-double-breasted.jpg`,
    `${IG}/costume-black-double-breasted-front.jpg`,
    `${IG}/costume-black-tuxedo-front.jpg`,
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
    `${IG}/accessoire-pocket-square-buttons.jpg`,
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
  Costumes: instagramCategoryImages.Costumes[1],
  Vestes: instagramCategoryImages.Vestes[5],
  Pantalons: instagramCategoryImages.Pantalons[0],
  Chemises: instagramCategoryImages.Chemises[0],
  Accessoires: instagramCategoryImages.Accessoires[5],
};

export const lookbookImages = [
  ...instagramCategoryImages.Costumes,
  ...instagramCategoryImages.Vestes,
  ...instagramCategoryImages.Pantalons,
  ...instagramCategoryImages.Chemises,
  ...instagramCategoryImages.Accessoires,
  `${IG}/atelier-boutique-window.jpg`,
].filter((image, index, list) => list.indexOf(image) === index);

export const products: Product[] = [
  {
    id: 1,
    slug: 'smoking-noir-revers-satin',
    aliases: ['costume-noir-satin'],
    name: 'Smoking noir revers satin',
    category: 'Costumes',
    collection: 'Smoking & Mariage',
    description:
      'Smoking noir inspiré des looks Maison Elmire, pensé pour les mariages, soirées et cérémonies. Sa veste structurée et ses revers satin apportent une présence élégante, sobre et contemporaine.',
    shortDescription: 'Smoking noir à revers satin pour mariage et soirée.',
    price: '3 900 MAD',
    images: [
      `${IG}/costume-black-tuxedo-front.jpg`,
      `${IG}/costume-black-double-breasted.jpg`,
      `${IG}/pantalon-black-tuxedo-side.jpg`,
      `${IG}/accessoire-blue-lining-label.jpg`,
    ],
    colors: ['Noir', 'Bleu nuit', 'Gris anthracite'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu premium avec revers satin',
    customization: ['Doublure personnalisée', 'Boutons couture', 'Ajustement morphologie'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis intéressé par le smoking noir revers satin.',
  },
  {
    id: 2,
    slug: 'costume-croise-noir',
    aliases: ['smoking-noir-gilet'],
    name: 'Costume croisé noir',
    category: 'Costumes',
    collection: 'Cérémonie',
    description:
      'Costume croisé noir inspiré des publications Maison Elmire autour du smoking, du mariage et du sur-mesure. Une pièce forte pour une silhouette habillée et parfaitement structurée.',
    shortDescription: 'Costume croisé noir pour cérémonie et mariage.',
    price: '4 500 MAD',
    images: [
      `${IG}/costume-black-double-breasted-front.jpg`,
      `${IG}/costume-navy-boutique.jpg`,
      `${IG}/costume-grey-boutique.jpg`,
      `${IG}/costume-plaid-red-tie.jpg`,
    ],
    colors: ['Noir', 'Bleu nuit'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Laine mélangée premium',
    customization: ['Revers satin', 'Boutonnage croisé', 'Broderie initiales'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je souhaite commander le costume croisé noir.',
  },
  {
    id: 3,
    slug: 'veste-bleu-nuit-epuree',
    aliases: ['veste-noire-prestige'],
    name: 'Veste bleu nuit épurée',
    category: 'Vestes',
    collection: 'Prestige',
    description:
      'Veste bleu nuit au tombé net, issue de l’univers visuel Maison Elmire. Elle se porte avec un pantalon habillé, une chemise claire ou un col roulé pour une allure moderne et raffinée.',
    shortDescription: 'Veste bleu nuit minimaliste, élégante et structurée.',
    price: 'Sur demande',
    images: [
      `${IG}/veste-navy-mannequin.jpg`,
      `${IG}/veste-pinstripe-detail.jpg`,
      `${IG}/veste-grey-mannequin.jpg`,
      `${IG}/veste-sleeve-buttons.jpg`,
    ],
    colors: ['Bleu nuit', 'Gris anthracite', 'Noir'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu de cérémonie structuré',
    customization: ['Col ajusté', 'Boutons luxe', 'Longueur ajustée'],
    isNewArrival: false,
    whatsappMessage: 'Bonjour, je suis intéressé par la veste bleu nuit épurée.',
  },
  {
    id: 4,
    slug: 'veste-bordeaux-texturee',
    aliases: ['veste-noire-texturee'],
    name: 'Veste bordeaux texturée',
    category: 'Vestes',
    collection: 'Signature',
    description:
      'Veste bordeaux texturée, pensée comme une pièce signature pour les grandes occasions. La matière visible dans les photos apporte profondeur, caractère et élégance.',
    shortDescription: 'Veste bordeaux texturée avec allure signature.',
    price: '3 600 MAD',
    images: [
      `${IG}/veste-bordeaux-hanger.jpg`,
      `${IG}/veste-bordeaux-lapel-detail.jpg`,
      `${IG}/veste-green-lapel-detail.jpg`,
      `${IG}/veste-blue-cuff-detail.jpg`,
    ],
    colors: ['Bordeaux', 'Vert profond', 'Bleu nuit'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu texturé premium',
    customization: ['Coupe cintrée', 'Poches passepoilées', 'Doublure personnalisée'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis intéressé par la veste bordeaux texturée.',
  },
  {
    id: 5,
    slug: 'vestes-bordeaux-et-vert-profond',
    aliases: ['veste-blanche-ceremonie'],
    name: 'Vestes bordeaux & vert profond',
    category: 'Vestes',
    collection: 'Cérémonie',
    description:
      'Duo de vestes cérémonie en bordeaux et vert profond, inspiré directement des visuels Maison Elmire. Une proposition élégante pour composer une tenue distinctive et sur mesure.',
    shortDescription: 'Vestes cérémonie en bordeaux et vert profond.',
    price: '4 800 MAD',
    images: [
      `${IG}/veste-bordeaux-green-duo.jpg`,
      `${IG}/veste-green-mannequin.jpg`,
      `${IG}/veste-blue-mannequin.jpg`,
      `${IG}/veste-navy-canvas-detail.jpg`,
    ],
    colors: ['Bordeaux', 'Vert profond', 'Bleu', 'Ivoire'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu cérémonie texturé',
    customization: ['Boutons métal', 'Revers ajusté', 'Doublure personnalisée'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis intéressé par les vestes bordeaux et vert profond.',
  },
  {
    id: 6,
    slug: 'pantalon-smoking-noir',
    aliases: ['pantalon-tailoring-noir'],
    name: 'Pantalon smoking noir',
    category: 'Pantalons',
    collection: 'Essentiels',
    description:
      'Pantalon smoking noir présenté dans les looks Maison Elmire. Sa ligne nette accompagne les vestes croisées, les smokings et les tenues de cérémonie.',
    shortDescription: 'Pantalon smoking noir à coupe nette.',
    price: '1 200 MAD',
    images: [
      `${IG}/pantalon-black-tuxedo-side.jpg`,
      `${IG}/pantalon-navy-suit-look.jpg`,
      `${IG}/pantalon-city-look.jpg`,
      '/aziz-media/web-pantalons-tailored-trousers.jpg',
    ],
    colors: ['Noir', 'Gris', 'Bleu nuit'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Tissu tailoring infroissable',
    customization: ['Ourlet personnalisé', 'Taille ajustée', 'Pinces sur demande'],
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
      'Chemise blanche premium pensée pour accompagner les smokings, costumes croisés et vestes de cérémonie Maison Elmire. Une base élégante pour une tenue impeccable.',
    shortDescription: 'Chemise blanche premium pour costumes et smokings.',
    price: 'Sur demande',
    images: [
      '/aziz-media/web-chemises-white-shirt.jpg',
      `${IG}/accessoire-pocket-square-buttons.jpg`,
      `${IG}/costume-grey-boutique.jpg`,
      `${IG}/costume-navy-boutique.jpg`,
    ],
    colors: ['Blanc', 'Ivoire', 'Bleu clair'],
    sizes: ['Sur mesure', 'M', 'L', 'XL'],
    fabric: 'Coton premium',
    customization: ['Col italien', 'Poignets mousquetaire', 'Initiales brodées'],
    isNewArrival: true,
    whatsappMessage: 'Bonjour, je suis intéressé par la chemise blanche premium.',
  },
  {
    id: 8,
    slug: 'finitions-maison-elmire',
    aliases: ['noeud-papillon-satin'],
    name: 'Finitions Maison Elmire',
    category: 'Accessoires',
    collection: 'Accessoires',
    description:
      'Sélection de détails Maison Elmire: doublures, étiquettes, pochettes, initiales brodées et finitions intérieures. Ces éléments personnalisent chaque costume sur mesure.',
    shortDescription: 'Doublures, pochettes, initiales et détails personnalisés.',
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
    customization: ['Initiales brodées', 'Pochette assortie', 'Étiquette personnalisée'],
    isNewArrival: false,
    whatsappMessage: 'Bonjour, je suis intéressé par les finitions Maison Elmire.',
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
