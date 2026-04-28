import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://geethikahairoil.shop"),
  title: {
    default: "GEETHIKA | Premium Ayurvedic Hair Oil",
    template: "%s | GEETHIKA",
  },
  description:
    "Nourish your hair naturally with our 100% herbal ingredients. Handmade Ayurvedic traditional recipes for stronger, healthier hair.",
  keywords: ["hair oil", "ayurvedic", "herbal", "natural hair care", "handmade"],
  authors: [{ name: "GEETHIKA" }],
  creator: "GEETHIKA",
  publisher: "GEETHIKA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://geethikahairoil.shop",
  },
  verification: {
    google: "FLKlWELEBjLwcU5Qb4zUMbsE8l1g7JgiovlFzl5",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Add a standard favicon.ico fallback!
      { url: '/icon.png', type: 'image/png' },
      { url: '/geethika.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // 👇 FIX: Resolves "No touch web app title declared"
  appleWebApp: {
    title: "GEETHIKA",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  // 👇 FIX: Resolves "No web app manifest"
  manifest: "/manifest.json",
  openGraph: {
    title: "GEETHIKA | Premium Ayurvedic Hair Oil",
    description: "Nourish your hair naturally with our 100% herbal ingredients.",
    url: "https://geethikahairoil.shop",
    siteName: "GEETHIKA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GEETHIKA | Premium Ayurvedic Hair Oil",
    description: "Nourish your hair naturally with our 100% herbal ingredients.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "ecommerce",
};

export const viewport = {
  themeColor: "#4F6345",
  width: "device-width",
  initialScale: 1,
};

import { CartSidebar } from "@/components/cart/CartSidebar";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={clsx(
        playfair.variable,
        inter.variable,
        "antialiased dark", // 👈 add this
      )}
    >
      <body className="bg-white text-gray-900 dark:bg-black dark:text-white">
        <Navbar />

        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />

        <CartSidebar />
      </body>
    </html>
  );
}