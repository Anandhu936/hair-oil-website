"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { type Product, PRODUCTS } from "@/lib/products";

// --- Data & Constants ---

const products = Object.values(PRODUCTS);

const premiumEase = [0.22, 1, 0.36, 1] as const;

// --- Main Component ---

export default function CollectionPage() {
  // 1. Explicitly type the ref to avoid 'never' errors
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Track scroll progress relative to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  // 3. Create a subtle parallax for the background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    /* 4. Added 'relative' to ensure scroll calculations are accurate */
    <section
      ref={containerRef}
      className="relative bg-background min-h-screen py-24 overflow-hidden"
    >

      {/* Ethereal Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 blur-2xl pointer-events-none scale-110"
        style={{
          backgroundImage: "url('/collection-hero-img.webp')",
          y: bgY
        }}
      />

      {/* Header */}
      <div className="mb-12 max-w-2xl mx-auto px-4 flex flex-col items-center relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: premiumEase }}
          className="h-px w-12 bg-foreground/30 mb-8"
        />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-4xl md:text-6xl font-bold font-sans text-foreground text-center mb-6 tracking-tight"
        >
          The Collection
        </motion.h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-12 px-4 relative z-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: premiumEase }}
            className="group flex flex-col"
          >
            <ProductCard product={product} />

            <div className="flex flex-col grow px-2 mt-10 justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-foreground/50 uppercase mb-3 block">
                  {product.tagline}
                </span>
                <h2 className="text-2xl md:text-3xl font-sans text-foreground mb-4 transition-colors group-hover:text-primary">
                  {product.name}
                </h2>
                <p className="text-foreground/60 leading-relaxed mb-8 text-sm font-light">
                  {product.description}
                </p>
              </div>

              <Link href={`/product/${product.id}`} className="mt-auto">
                <Button
                  className="w-full bg-foreground/5 text-foreground hover:bg-foreground hover:text-background border border-foreground/10 hover:shadow-2xl transition-all duration-700 py-6 text-base rounded-2xl flex items-center justify-center gap-3 group/btn cursor-pointer"
                >
                  <span className="uppercase tracking-wider text-xs font-semibold">Explore Essence</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pt-24 lg:pt-48 flex justify-center ">
        <Link href="/#home">
          {/* Added hover:bg-transparent to override the default green background */}
          <Button className="group flex items-center gap-3 bg-transparent hover:bg-transparent border-none py-2 px-4 cursor-pointer">
            <ArrowLeft
              className="w-5 h-5 text-foreground transition-transform group-hover:-translate-x-1"
              strokeWidth={2.5}
            />
            <span className="glitch-text text-sm font-bold uppercase tracking-widest text-foreground transition-colors duration-300">
              Back to Home
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
}

// --- Sub-component for 3D Cards ---

function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Use MotionValues for high-performance updates without re-renders
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth "weighty" feel
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxRotation = 10;

    // Calculate rotation based on cursor position relative to card center
    x.set(-((event.clientY - centerY) / (rect.height / 2)) * maxRotation);
    y.set(((event.clientX - centerX) / (rect.width / 2)) * maxRotation);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="relative w-full aspect-2.5/2.5 rounded-3xl overflow-hidden shadow-2xl bg-card transition-shadow duration-500 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] group/card"
    >
      <div className="absolute inset-0 scale-110 group-hover/card:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
        <div className="absolute inset-0 bg-muted/40 transition-transform duration-1000 group-hover/card:scale-105" />

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover relative z-10 transition-transform duration-1000 group-hover/card:translate-y-1"
          priority
        />

        <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors duration-700 z-20" />
      </div>
    </motion.div>
  );
}