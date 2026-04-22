"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Droplet, Leaf, ShieldCheck, Sparkles, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ✅ Seeded random generator (pure & stable) */
function createSeededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function HeroSection() {
  /* ✅ Generate deterministic particles (safe for React) */
  const { bgParticles, herbParticles } = useMemo(() => {
    const random = createSeededRandom(42);

    const bg = [...Array(15)].map(() => ({
      left: random() * 100,
      top: random() * 100,
      scale: random() * 0.5 + 0.5,
      duration: random() * 5 + 5,
      yMove: random() * -100 - 50,
    }));

    const herb = [...Array(8)].map(() => ({
      left: random() * 100,
      top: random() * 60 + 20,
      scale: random() * 0.5 + 0.5,
      duration: random() * 4 + 4,
      delay: random() * 2,
    }));

    return { bgParticles: bg, herbParticles: herb };
  }, []);

  return (
    <section  id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background " >
      {/* Background Particles */}
      {bgParticles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#d4af37]/60 rounded-full"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          initial={{ scale: p.scale, opacity: 0 }}
          animate={{ y: [0, p.yMove], opacity: [0, 0.8, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20 pb-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start items-center gap-2">
              <Sparkles className="text-[#d4af37]" />
              <span className="text-[#d4af37] text-sm tracking-widest uppercase">
                100% Natural
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif text-foreground leading-tight">
              Liquid Gold for <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#d4af37] to-[#c29b27]">
                Vibrant Roots
              </span>
            </h1>

            <p className="text-lg text-foreground">
              Infused with 18 rare herbs and cold-pressed oils to restore hair
              vitality and shine.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-foreground ">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#d4af37] " />
                <span>Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-[#d4af37]" />
                <span>Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Toxin-Free</span>
              </div>
            </div>

            <Link href="/collection/">
              <button className="mt-4 px-8 py-4 bg-linear-to-r from-[#d4af37] to-[#aa8929] text-white rounded-full hover:scale-105 transition cursor-pointer">
                Explore Collection →
              </button>
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-125 lg:h-175  flex justify-center"
          >
            <motion.div
              animate={{ y: [-15, 10, -15] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="relative w-full max-w-md lg:w-[90%] lg:h-[90%] rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="/hero.webp"
                alt="Hair Oil"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                className="object-cover"
              />

              {/* Herb Particles */}
              {herbParticles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#d4af37] rounded-full"
                  style={{ left: `${p.left}%`, top: `${p.top}%` }}
                  animate={{ y: [0, -100], opacity: [0, 1, 0] }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-sm opacity-70 text-accent"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <ChevronDown />
      </motion.div>
    </section>
  );
}