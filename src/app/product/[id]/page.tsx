"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Check, Star, ShieldCheck, Zap, Droplets, Leaf } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS[id as keyof typeof PRODUCTS];

  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Track the previous ID to reset state without using useEffect
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setSelectedSize(product?.sizes?.[0] || "");
    setQuantity(1);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl bg-white dark:bg-black w-full">
        Product not found
      </div>
    );
  }

  const selectedIndex = product.sizes.indexOf(selectedSize) !== -1 ? product.sizes.indexOf(selectedSize) : 0;
  const currentPrice = product.prices[selectedIndex];
  const currentOriginalPrice = product.originalPrices[selectedIndex];
  const discount = Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen w-full bg-background transition-colors">
      {/* Product Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* LEFT - Image Gallery */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-4/5 rounded-3xl overflow-hidden bg-card border border-black/5 dark:border-white/5 shadow-2xl"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />

                {/* Sale Badge */}
                <div className="absolute top-6 left-6 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {discount}% OFF
                </div>
              </motion.div>
            </div>

            {/* RIGHT - Details */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-foreground/60 uppercase tracking-widest">(2,450+ Reviews)</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>

                <p className="text-xl text-primary font-medium mb-6">
                  {product.tagline}
                </p>

                <p className="text-foreground/70 mb-8 text-lg leading-relaxed max-w-xl">
                  {product.description}
                </p>

                {/* Pricing */}
                <div className="flex items-end gap-4 mb-10">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground/40 line-through">
                      ₹{currentOriginalPrice}
                    </span>
                    <span className="text-4xl font-bold text-foreground">
                      ₹{currentPrice}
                    </span>
                  </div>
                  <div className="bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1.5 rounded-full mb-1">
                    Save ₹{currentOriginalPrice - currentPrice}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-4">Select Volume</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`lg:px-6 lg:py-3 py-2 px-4 cursor-pointer rounded-2xl border-2 transition-all duration-300 font-medium ${selectedSize === size
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                          : "bg-card border-black/5 dark:border-white/5 text-foreground hover:border-primary/50"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <div className="flex items-center bg-card border border-black/5 dark:border-white/5 rounded-2xl h-12 lg:h-14 px-2 justify-center ">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 lg:h-10 lg:w-10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 h-12 lg:h-14 text-lg font-bold gap-3 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group"
                  >
                    <span className={`flex cursor-pointer items-center h-12 md:h-0 gap-3 transition-transform duration-300 ${addedToCart ? "-translate-y-full" : "translate-y-0"}`}>
                      Add to Cart <Plus size={20} />
                    </span>

                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-black/5 dark:border-white/5">
                  {[
                    { icon: ShieldCheck, label: "100% Pure" },
                    { icon: Leaf, label: "Natural" },
                    { icon: Zap, label: "Fast Results" },
                    { icon: Droplets, label: "Zero Chemicals" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                        <item.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Tabs/Sections */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Deep Description */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Ancient Secrets, Modern Science</h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
                  <Check className="text-primary" /> Key Benefits
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 bg-background p-4 rounded-2xl border border-black/5 dark:border-white/5">
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-foreground/80 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How to Use */}
            <div className="bg-background p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl h-fit">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
                <Leaf className="text-primary" size={24} /> How to Use
              </h3>
              <div className="space-y-6">
                {product.usage.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-2xl font-serif font-bold text-primary/20 shrink-0">0{i + 1}</div>
                    <p className="text-foreground/70 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
                <p className="text-sm font-medium text-primary bg-primary/5 p-4 rounded-xl">
                  💡 <strong>Pro Tip:</strong> For extreme hair fall, use with our Herbal Shampoo for 3 weeks consistently.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}