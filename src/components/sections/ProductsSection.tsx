"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { PRODUCTS } from "@/lib/products";

const productList = Object.values(PRODUCTS);

export function ProductsSection() {
  return (
    <Section id="products" className="bg-background py-16">
      <div className=" mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-sans text-foreground text-center mb-4">
          The Collection
        </h2>
        <p className="text-center text-sm text-foreground/70">
          {" "}
          Crafted from nature’s finest ingredients to nourish, strengthen, and
          restore your hair’s natural beauty.
        </p>
      </div>

      {/* 3 Columns on desktop, 1 column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-8 ">
        {productList.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="flex flex-col dark:bg-card border border-black/10 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden group"
          >
            {/* Image Container (Top) - Using Inline Styles for guaranteed height */}
            <div className="relative w-full shrink-0 aspect-4/2.5 overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                // Prioritize the first 3 items instead of just the first one
                priority={index < 3}
              />
            </div>

            {/* Content Container (Bottom) */}
            <div className="flex flex-col grow p-5 md:p-8 justify-between">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3 block">
                  {product.tagline}
                </span>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-3">
                  {product.name}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-6 text-sm">
                  {product.description}
                </p>
              </div>

              <Link
                href={`/product/${product.id}`}
                className="mt-auto"
              >
                <Button className="w-full text-white bg-primary hover:bg-primary/90 py-6 text-base font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer">
                  Buy Now
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}