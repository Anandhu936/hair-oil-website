"use client";

import { Section } from "@/components/ui/section";
import { Sparkles, Sprout, ShieldCheck, Droplet } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Sprout size={32} />,
    title: "Promotes Hair Growth",
    description: "Stimulates hair follicles naturally, encouraging thicker, fuller hair over time."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Reduces Hair Fall",
    description: "Strengthens roots and prevents breakage, significantly reducing hair shedding."
  },
  {
    icon: <Sparkles size={32} />,
    title: "Dandruff Control",
    description: "Anti-microbial herbs soothe the scalp, eliminating flakes and itchiness."
  },
  {
    icon: <Droplet size={32} />,
    title: "Deep Nourishment",
    description: "Penetrates deeply to lock in moisture, leaving hair incredibly soft and shiny."
  }
];

export function BenefitsSection() {
  return (
    <Section id="benefits" className="bg-background">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Why Choose Our Oil?
        </h2>
        <p className="text-lg text-foreground/80">
          Infused with nature&apos;s most powerful botanicals, our oil addresses the root causes of hair issues to transform your hair health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-card p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 dark:border-white/5 group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold font-serif text-foreground mb-3">{benefit.title}</h3>
            <p className="text-foreground/70 leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
