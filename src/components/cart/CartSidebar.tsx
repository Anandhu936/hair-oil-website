"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, getSubtotal } = useCartStore();
  
  // Prevent Hydration errors with Zustand + LocalStorage
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeCart}
              className="fixed inset-0 bg-background/60 dark:bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background border-l border-black/10 dark:border-white/10 shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-primary" />
                  <h2 className="font-serif font-bold text-xl text-foreground">Your Order</h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-foreground/60 space-y-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p>Your cart is empty.</p>
                    <Button onClick={closeCart} variant="outline" className="mt-4">
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white dark:bg-card shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif font-bold text-foreground line-clamp-1 pr-4">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-foreground/40 hover:text-red-500 transition-colors"
                              >
                                <X size={18} />
                              </button>
                            </div>
                            <p className="text-sm text-foreground/60">{item.size}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-black/10 dark:border-white/10 rounded-full bg-white dark:bg-card">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium text-foreground">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <p className="font-medium text-foreground">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-black/5 dark:border-white/5 bg-background shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-foreground/70">
                      <span>Subtotal</span>
                      <span>₹{getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground/70 text-sm">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="pt-3 flex justify-between font-serif font-bold text-xl text-foreground border-t border-black/5 dark:border-white/5">
                      <span>Total</span>
                      <span>₹{getSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full text-lg h-14 gap-2 shadow-lg shadow-primary/20">
                      Proceed to Checkout
                      <ArrowRight size={20} />
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
