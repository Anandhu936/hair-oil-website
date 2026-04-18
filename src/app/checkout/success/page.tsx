"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-primary group-hover:scale-110 transition-transform">
            <Droplets size={24} strokeWidth={2.5} />
          </div>
          <span className="font-serif text-xl font-bold text-primary tracking-tight">
            GEETHIKA
          </span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white dark:bg-card p-10 md:p-12 rounded-3xl text-center shadow-xl shadow-black/5 dark:shadow-none border border-black/10 dark:border-white/10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        
        <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
          Order Confirmed
        </h1>
        
        <p className="text-foreground/70 mb-8 leading-relaxed">
          Thank you for trusting us with your hair wellness journey. We've received your order <span className="font-medium text-foreground">#{orderNumber}</span> and are preparing it just for you.
        </p>

        <div className="bg-[#FAF8F5] dark:bg-[#1A1C19] rounded-xl p-4 mb-8">
          <p className="text-sm font-medium text-foreground/80">
            A confirmation email will be sent shortly with your tracking details.
          </p>
        </div>

        <Link href="/">
          <Button className="w-full gap-2 text-base h-12 shadow-lg shadow-primary/20">
            Return to Store
            <ChevronRight size={18} />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
