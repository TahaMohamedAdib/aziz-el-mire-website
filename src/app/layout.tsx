import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ADDRESS_DISPLAY, BRAND_NAME, PHONE_DISPLAY } from "@/lib/catalog";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aziz EL Mire - Costumes & Smokings sur mesure a Casablanca",
    template: "%s | Aziz EL Mire Haute Couture",
  },
  description:
    "Maison de creation masculine a Casablanca. Smokings, costumes et vestes sur mesure pour mariage, ceremonie et evenement. Prenez rendez-vous.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND_NAME,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_DISPLAY,
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    telephone: PHONE_DISPLAY,
    openingHours: "Mo-Sa 10:00-20:00",
  };

  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-full">
        <a className="skip-link" href="#main-content">
          Aller au contenu principal
        </a>
        {children}
        <FloatingWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
