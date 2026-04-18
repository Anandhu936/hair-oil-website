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
  description: "Nourish your hair naturally with our 100% herbal ingredients. Handmade Ayurvedic traditional recipes.",
};

import { CartSidebar } from "@/components/cart/CartSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(playfair.variable, inter.variable, "antialiased scroll-smooth")}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        {children}
        <CartSidebar />
      </body>
    </html>
  );
}
