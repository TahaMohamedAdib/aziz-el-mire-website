import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { BRAND_OFFER, BRAND_TAGLINE } from "@/lib/catalog";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `Aziz EL Mire Haute Couture - ${BRAND_TAGLINE}`,
    template: "%s | Aziz EL Mire Haute Couture",
  },
  description: `${BRAND_TAGLINE}. ${BRAND_OFFER} à Sidi Maarouf.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-full">
        <a className="skip-link" href="#main-content">Aller au contenu principal</a>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
