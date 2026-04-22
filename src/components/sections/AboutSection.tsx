"use client";

import Image from "next/image";
import { Section } from "@/components/ui/section";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  const highlights = [
    "100% Chemical-Free",
    "Handmade in Small Batches",
    "Traditional Ayurvedic Recipe",
    "Cruelty-Free & Vegan"
  ];

  return (
    <Section id="about" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          {" "}
          {/* Changed: order-2 on mobile, order-1 on large screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-4/5 rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg"
          >
            <Image
              src="/about.webp"
              alt="Herbal ingredients"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
              className="object-cover"
            />
          </motion.div>
          {/* Decorative element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10" />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          {" "}
          {/* Changed: order-1 on mobile, order-2 on large screens */}
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 block">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Rooted in Tradition, <br />
            <span className="text-accent ">Perfected by Nature</span>
          </h2>
          <div className="space-y-6 text-foreground/80 text-md lg:text-lg leading-relaxed mb-10">
            <p>
              GEETHIKA was born from a simple belief: nature provides everything
              we need to thrive. Frustrated by commercial products filled with
              synthetics, we turned to the ancient texts of Ayurveda.
            </p>
            <p>
              Every bottle of our hair oil is a testament to this philosophy. We
              slowly infuse cold-pressed oils with powerful herbs over several
              days to ensure maximum potency, just as it was done centuries ago.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="text-primary" size={20} />
                <span className="font-medium text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
