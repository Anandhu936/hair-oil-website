"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Droplets, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const orderId = searchParams.get("orderId");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (paymentId) {
      navigator.clipboard.writeText(paymentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
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

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white dark:bg-card p-10 md:p-12 rounded-3xl text-center shadow-xl border border-black/10 dark:border-white/10"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary"
        >
          <CheckCircle2 size={40} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-3xl font-serif font-bold text-foreground mb-3"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-foreground/70 mb-8 leading-relaxed"
        >
          Your order has been confirmed and is being prepared with care.
        </motion.p>

        {/* Payment Details */}
        {paymentId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-[#FAF8F5] dark:bg-[#1A1C19] rounded-xl p-4 mb-4 text-left space-y-3"
          >
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider font-medium mb-1">
                Payment ID
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-mono font-medium text-foreground truncate">{paymentId}</p>
                <button
                  onClick={handleCopy}
                  className="text-primary hover:text-primary/70 shrink-0 transition-colors"
                  title="Copy payment ID"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
            </div>
            {orderId && (
              <div>
                <p className="text-xs text-foreground/50 uppercase tracking-wider font-medium mb-1">
                  Order ID
                </p>
                <p className="text-sm font-mono font-medium text-foreground truncate">{orderId}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 rounded-xl p-4 mb-8"
        >
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            ✅ A confirmation will be sent to your email with tracking details.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <Link href="/">
            <Button id="return-to-store-btn" className="w-full gap-2 text-base h-12 shadow-lg shadow-primary/20">
              Return to Store
              <ChevronRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p className="text-foreground/60">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}