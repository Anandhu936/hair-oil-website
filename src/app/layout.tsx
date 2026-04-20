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
  title: "GEETHIKA | Premium Ayurvedic Hair Oil",
  description:
    "Nourish your hair naturally with our 100% herbal ingredients. Handmade Ayurvedic traditional recipes.",
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
      className={clsx(playfair.variable, inter.variable, "antialiased")}
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