"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe, Share2, MapPin, Mail, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <Section id="contact" className="bg-card">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 block">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            We&apos;d love to hear from you
          </h2>
          <p className="text-lg text-foreground/80 mb-10 leading-relaxed">
            Whether you have a question about our ingredients, need help with an order, or just want to share your hair journey with us.
          </p>
          
          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4 text-foreground/80 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Our Studio</p>
                <p>123 Herbal Way, Wellness City, 10001</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-foreground/80 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p>hello@geethika.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-foreground/80 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold text-foreground mb-4 font-serif">Follow Us</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Share2 size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="bg-background dark:bg-background p-8 md:p-10 rounded-3xl"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Full Name</label>
              <input 
                type="text" 
                id="name"
                className="w-full bg-card border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">Email Address</label>
              <input 
                type="email" 
                id="email"
                className="w-full bg-white dark:bg-card border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">Message</label>
              <textarea 
                id="message"
                rows={4}
                className="w-full bg-white dark:bg-card border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-foreground resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <Button className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
