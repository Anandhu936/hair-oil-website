"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Privacy Policy", href: "/policies/privacy-policy" },
    { name: "Terms of Service", href: "/policies/terms" },
    { name: "Shipping Policy", href: "/policies/shipping" },
    { name: "Return Policy", href: "/policies/returns" },
    { name: "Contact Information", href: "/policies/contact" },
  ];

  return (
    <footer className="bg-background pt-20 pb-10 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 group">
              <div className="group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/geethika.svg"
                  alt="Geethika logo"
                  width={24}
                  height={24}
                />
              </div>

              <span className="font-sans text-2xl font-bold text-primary tracking-tight">
                GEETHIKA
              </span>
            </a>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-xs mb-8 transition-colors duration-500">
              Purity and tradition meticulously blended into every drop. Nourish
              your hair with the wisdom of Ayurveda.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-foreground font-sans font-bold mb-6 transition-colors duration-500">
              Join the Ritual
            </h4>
            <p className="text-foreground/60 text-sm mb-4 transition-colors duration-500">
              Subscribe for hair care tips, exclusive offers, and early access
              to new releases.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="bg-card border border-black/10 dark:border-foreground rounded-l-lg px-4 py-2 text-foreground text-sm w-full focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary hover:bg-primary-dark text-primary-foreground dark:text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground text-sm transition-colors duration-500">
          <p className="text-center font-sans">
            © {currentYear} GEETHIKA. All rights reserved.
          </p>

          {/* Added justify-center here */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/70">
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative group hover:text-foreground transition-colors"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-current font-sans transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
