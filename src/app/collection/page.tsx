"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
const products = [
  {
    id: "hair-oil",
    name: "Geethika Hair Oil",
    tagline: "NATURAL",
    description:
      "Hairvel Herbal Hair Oil, formulated with a blend of nature's finest herbs and pure essential oils, transforms your hair, making it healthier than ever before.",
    image: "/hair-oil.webp",
  },
  {
    id: "shampoo",
    name: "Geethika Herbal Shampoo",
    tagline: "Formula",
    description:
      "Where tradition meets purity. Crafted with a rich blend of herbs, this gentle formula brings nature's essence to every wash — clean, calm, and completely herbal.",
    image: "/shampoo.webp",
  },
  {
    id: "coconut-oil",
    name: "Geethika Coconut Oil",
    tagline: "NATURAL",
    description:
      "Deeply nourish your scalp and roots with pure, cold-pressed coconut oil. Locks in moisture and provides a natural, healthy shine to your everyday look.",
    image: "/coconut.webp",
  },
];

// ✅ IMPORTANT: default export
export default function CollectionPage() {
  return (
    <Section className="bg-card min-h-screen">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground text-center mb-4">
          The Collection
        </h2>
        <p className="text-center text-sm text-foreground/70">
          Crafted from nature’s finest ingredients to nourish, strengthen, and
          restore your hair’s natural beauty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="flex flex-col dark:bg-card border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="relative w-full shrink-0 aspect-4/2.5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority={index < 3}
              />
            </div>

            <div className="flex flex-col grow p-5 md:p-4 justify-between">
              <div>
                <span className="text-xs font-semibold tracking-widest text-foreground/70 uppercase mb-3 block">
                  {product.tagline}
                </span>
                <h2 className="text-2xl font-serif text-foreground mb-3">
                  {product.name}
                </h2>
                <p className="text-foreground leading-relaxed mb-6 text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              <Link
                href={`/product/${product.id}`}
                className="mt-auto flex justify-center"
              >
                <Button className="text-white bg-black border border-black hover:bg-green-700 py-4 text-lg rounded-md transition-all duration-300 cursor-pointer">
                  Buy Now
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pt-48 flex justify-center ">
        <Link href="/#home">
          {/* Added hover:bg-transparent to override the default green background */}
          <Button className="group flex items-center gap-3 bg-transparent hover:bg-transparent border-none py-2 px-4 cursor-pointer">
            <ArrowLeft
              className="w-5 h-5 text-foreground transition-transform group-hover:-translate-x-1"
              strokeWidth={2.5}
            />
            <span className="glitch-text text-sm font-bold uppercase tracking-widest text-foreground transition-colors duration-300">
              Back to Home
            </span>
          </Button>
        </Link>
      </div>
    </Section>
  );
}