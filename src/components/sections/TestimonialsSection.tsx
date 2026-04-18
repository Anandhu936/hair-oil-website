"use client";

import Image from "next/image";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "I've tried countless hair oils, but nothing compares to GEETHIKA. After just three weeks of consistent use, the shedding stopped and my hair looks incredibly shiny.",
    author: "Samantha",
    role: "Verified Buyer",
    image: "/P-1.webp",
  },
  {
    text: "The earthy smell and the rich texture make my Sunday oiling ritual feel like a luxurious spa treatment. My dandruff is completely gone.",
    author: "Rashmika",
    role: "Verified Buyer",
    image: "/P-2.webp",
  },
  {
    text: "You can tell this is made with real herbs. The Bhringraj formula helped regrow my edges after postpartum hair loss. Absolutely highly recommended!",
    author: "Rashi Khanna",
    role: "Verified Buyer",
    image: "/P-3.webp",
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="bg-white dark:bg-card py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Real Results
            </h2>
            <p className="text-lg text-foreground/70">
              Don&apos;t just take our word for it. Here is what our community has to say.
            </p>
          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-slate-50 dark:bg-background rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 relative flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Subtle Quote Icon */}
              <Quote className="absolute top-6 right-6 text-primary/10 w-12 h-12" />

              {/* Five Stars */}
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground/80 leading-relaxed mb-8 grow">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground capitalize">
                    {testimonial.author}
                  </h4>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
}