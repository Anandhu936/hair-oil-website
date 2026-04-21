"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How often should I use the oil?",
    answer: "For best results, we recommend oiling your hair 2-3 times a week. Massage gently into the scalp and leave it on for at least 2 hours, or overnight, before washing with a mild shampoo."
  },
  {
    question: "Can I use it on colored or chemically treated hair?",
    answer: "Yes! Our oils are 100% natural and safe for colored or chemically treated hair. In fact, they help restore the moisture and strength lost during chemical treatments."
  },
  {
    question: "How long does it take to see results?",
    answer: "While individual results vary, most customers notice reduced hair fall and increased shine within 3-4 weeks of consistent use. Noticeable new growth typically takes 2-3 months."
  },
  {
    question: "Is it suitable for all hair types?",
    answer: "Absolutely. Our carefully balanced formula works beautifully on all hair types, from straight and fine to thick, curly, and coily hair, providing exactly the nourishment your specific texture needs."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our customer support team for personal assistance.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="font-serif font-bold text-lg md:text-xl text-foreground pr-8">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary dark:bg-primary/20'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-foreground/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
