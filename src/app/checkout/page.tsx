"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // If cart is empty, redirect back to home after mount
    if (items.length === 0) {
      router.push("/");
    }
  }, [items.length, router]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  if (!isMounted || items.length === 0) return null;

  const subtotal = getSubtotal();
  const shipping = 150.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 p-6 bg-white dark:bg-card sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold text-primary tracking-tight">
            GEETHIKA
          </Link>
          <Link href="/" className="text-sm font-medium text-foreground/60 hover:text-foreground flex items-center gap-1">
            <ChevronLeft size={16} /> Return to Store
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 space-y-10">
            {/* Contact Info */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  required
                  placeholder="Email" 
                  className="w-full h-12 bg-white dark:bg-card border border-black/10 dark:border-white/10 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="First Name" 
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-white dark:bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <input 
                  type="text" 
                  required
                  placeholder="Last Name" 
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-white dark:bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <input 
                  type="text" 
                  required
                  placeholder="Address" 
                  className="col-span-2 border border-black/10 dark:border-white/10 h-12 bg-white dark:bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <input 
                  type="text" 
                  required
                  placeholder="City" 
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-white dark:bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <input 
                  type="text" 
                  required
                  placeholder="Postal Code" 
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-white dark:bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-serif font-bold text-foreground">Payment Method</h2>
                <Lock size={16} className="text-foreground/40" />
              </div>
              <p className="text-sm text-foreground/60 mb-4 bg-primary/10 text-primary p-3 rounded-lg border border-primary/20">
                This is a secure, simulated checkout. No real money will be charged.
              </p>
              
              <div className="bg-white dark:bg-card border border-black/10 dark:border-white/10 rounded-xl p-6 space-y-4 shadow-sm">
                <input 
                  type="text" 
                  required
                  defaultValue="4242 4242 4242 4242"
                  placeholder="Card Number" 
                  className="w-full border border-black/10 dark:border-white/10 h-12 bg-background rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    required
                    defaultValue="12/26"
                    placeholder="MM/YY" 
                    className="border border-black/10 dark:border-white/10 h-12 bg-background rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                  <input 
                    type="text" 
                    required
                    defaultValue="123"
                    placeholder="CVC" 
                    className="border border-black/10 dark:border-white/10 h-12 bg-background rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                <input 
                  type="text" 
                  required
                  defaultValue="Jane Doe"
                  placeholder="Name on Card" 
                  className="w-full border border-black/10 dark:border-white/10 h-12 bg-background rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
            </section>
            
            <div className="hidden lg:block pt-4">
              <Button type="submit" size="lg" disabled={isProcessing} className="w-full shadow-lg shadow-primary/20 text-lg h-14">
                {isProcessing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
              </Button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="bg-white dark:bg-card border border-black/10 dark:border-white/10 rounded-2xl p-6 lg:p-8 sticky top-32 shadow-xl shadow-black/5">
              <h2 className="text-xl font-serif font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-background shrink-0 border border-black/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10 font-medium shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-foreground/60">{item.size}</p>
                    </div>
                    <p className="font-medium text-sm text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-black/10 dark:border-white/10 mb-6">
                <div className="flex justify-between text-foreground/70 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70 text-sm">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-foreground pt-4">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="lg:hidden">
                <Button type="submit" disabled={isProcessing} size="lg" className="w-full shadow-lg shadow-primary/20 text-lg h-14">
                  {isProcessing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
