"use client";

import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
            
                      <span className="font-serif text-2xl font-bold text-primary tracking-tight">
                        GEETHIKA
                      </span>
                    </a>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-xs mb-8 transition-colors duration-500">
              Purity and tradition meticulously blended into every drop. Nourish your hair with the wisdom of Ayurveda.
            </p>
          </div>

          {/* Links 1 */}
          {/* <div>
            <h4 className="text-foreground font-serif font-bold mb-6 transition-colors duration-500">Shop</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">All Products</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Hair Oils</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Scalp Serums</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Gift Sets</a></li>
            </ul>
          </div> */}

          {/* Links 2 */}
          {/* <div>
            <h4 className="text-foreground font-serif font-bold mb-6 transition-colors duration-500">About</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Our Story</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Ingredients</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Sustainability</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">Journal</a></li>
            </ul>
          </div> */}

          {/* Newsletter */}
          <div>
            <h4 className="text-foreground font-serif font-bold mb-6 transition-colors duration-500">Join the Ritual</h4>
            <p className="text-foreground/60 text-sm mb-4 transition-colors duration-500">
              Subscribe for hair care tips, exclusive offers, and early access to new releases.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-foreground rounded-l-lg px-4 py-2 text-foreground text-sm w-full focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary hover:bg-primary-dark text-primary-foreground dark:text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/40 text-sm transition-colors duration-500">
          <p>© {currentYear} GEETHIKA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
