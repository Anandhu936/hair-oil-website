"use client";

import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const products = [
  {
    id: 1,
    name: "Geethika Hair Oil",
    size: "200ml",
    price: 299.00,
    image: "/hair-oil.webp",
    bestseller: true
  },
  {
    id: 2,
    name: "Geethika Shampoo",
    size: "100ml",
    price: 99.00,
    image: "/shampoo.webp",
    bestseller: false
  },
  {
    id: 3,
    name: "Geethika coconut oil",
    size: "500ml",
    price: 199.00,
    image: "/coconut.webp",
    bestseller: false
  }
];

export function ProductsSection() {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
    });
  };

  return (
    <Section id="products" className="bg-linear-to-br from-[#fcfaf5] via-[#f4ecd8] to-[#fcfaf5] dark:from-[#0b130c] dark:via-[#122216] dark:to-[#0b130c]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-black/10 dark:border-white/10 pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
            The Collection
          </h2>
          <p className="text-foreground/70 text-lg">
            Pure oils for every hair need.
          </p>
        </div>
        <Button variant="ghost" className="hidden md:flex">
          Shop All Products
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col"
          >
            <div className="relative aspect-3/4 bg-white dark:bg-card rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
              {product.bestseller && (
                <div className="absolute top-4 left-4 z-10 bg-accent text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg">
                  Bestseller
                </div>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                 loading="eager"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Add to cart overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <Button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full gap-2 shadow-xl"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-foreground/60 text-sm">{product.size}</p>
              </div>
              <p className="font-medium text-lg text-foreground">
                ₹{product.price.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 md:hidden flex justify-center">
        <Button variant="outline">Shop All Products</Button>
      </div>
    </Section>
  );
}
