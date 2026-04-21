"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Ingredient {
  id: string;
  name: string;
  scientificName: string;
  benefit: string;
  image: string;
}

const ingredients: Ingredient[] = [
  {
    id: "1",
    name: "Tulsi",
    scientificName: "Ocimum Tenuiflorum",
    benefit:
      "Purifies the scalp, improves blood circulation, and helps maintain a healthy, dandruff-free foundation.",
    image: "/ingredients/tulsi.webp",
  },

  {
    id: "2",
    name: "Black Cumin",
    scientificName: "Nigella Sativa",
    benefit:
      "Rich in antioxidants and essential fatty acids to promote robust hair growth and reduce thinning.",
    image: "/ingredients/black-cumin.webp",
  },

  {
    id: "3",
    name: "Indian Borage",
    scientificName: "Plectranthus Amboinicus",
    benefit:
      "Soothes scalp irritation and provides natural antibacterial properties to keep follicles clear.",
    image: "/ingredients/indian-borage.webp",
  },

  {
    id: "4",
    name: "Fenugreek",
    scientificName: "Trigonella Foenum-Graecum",
    benefit:
      "Packed with proteins and nicotinic acid to strengthen the hair shaft and prevent breakage.",
    image: "/ingredients/fenugreek.webp",
  },

  {
    id: "5",
    name: "Hibiscus",
    scientificName: "Hibiscus Rosa-Sinensis",
    benefit:
      "Conditions the hair naturally, leaving it smooth, shiny, and deeply hydrated from root to tip.",
    image: "/ingredients/hibiscus.webp",
  },

  {
    id: "6",
    name: "Curry Leaf",
    scientificName: "Murraya Koenigii",
    benefit:
      "Loaded with beta-carotene and proteins to restore natural melanin and delay premature graying.",
    image: "/ingredients/curry-leaf.webp",
  },

  {
    id: "7",
    name: "Lark Daisy",
    scientificName: "Centratherum Punctatum",
    benefit:
      "A potent botanical that revitalizes the scalp and stimulates dormant hair follicles.",
    image: "/ingredients/lark-daisy.webp",
  },

  {
    id: "8",
    name: "Bhringraj",
    scientificName: "Eclipta Alba",
    benefit:
      'Revered as the "king of herbs," it deeply nourishes the scalp to accelerate healthy hair growth.',
    image: "/ingredients/bhringraj.webp",
  },

  {
    id: "9",
    name: "Aloe Vera",
    scientificName: "Aloe Barbadensis Miller",
    benefit:
      "Intensely hydrates and balances the scalp's pH, creating the perfect environment for hair to thrive.",
    image: "/ingredients/aloe-vera.webp",
  },
];

export default function IngredientsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Preload next image to prevent decode lag during transition
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % ingredients.length;
    const img = new window.Image();
    img.src = ingredients[nextIndex].image;
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ingredients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % ingredients.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? ingredients.length - 1 : prev - 1));
  };

  const activeIngredient = ingredients[currentIndex];

  return (
    <section
      id="ingredients"
      className="relative min-h-screen bg-white dark:bg-card flex flex-col justify-center overflow-hidden py-24"
    >
      {/* Background Glow - REMOVED key so it doesn't remount, added transform-gpu */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-31.25 h-31.25 md:w-125 md:h-125 bg-accent/10  blur-[120px] transform-gpu"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-4">
            The Core of Geethika
          </h2>
          <div className="w-px h-12 bg-accent/30 mx-auto" />
        </div>

        {/* Main Content */}
        <div className="min-h-105 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              // Added hardware acceleration classes
              className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full will-change-transform transform-gpu"
            >
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:w-1/2 flex justify-center relative will-change-transform"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="relative w-55 h-55 md:w-[320px] md:h-80 transform-gpu"
                >
                  {/* Glow - Kept static relative to the image to avoid repaint lag */}
                  <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full transform-gpu" />

                  {/* Changed drop-shadow to shadow for better animation performance */}
                  <div className="absolute inset-0  shadow-2xl overflow-hidden">
                    <Image
                      src={activeIngredient.image}
                      alt={activeIngredient.name}
                      fill
                      sizes="(max-width: 768px) 220px, 320px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:w-1/2 text-center md:text-left max-w-lg will-change-transform"
              >
                <div className="font-mono text-accent/50 mb-4 text-lg">
                  0{currentIndex + 1} / 0{ingredients.length}
                </div>

                <h3 className="text-5xl md:text-7xl font-serif text-foreground mb-4">
                  {activeIngredient.name}
                </h3>

                <p className="text-xl italic text-stone-400 mb-6 font-serif">
                  {activeIngredient.scientificName}
                </p>

                <p className="text-lg text-foreground/80 leading-relaxed">
                  {activeIngredient.benefit}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border text-foreground flex items-center justify-center hover:scale-110 transition"
            >
              ←
            </button>

            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs uppercase tracking-widest text-foreground/80 hover:text-accent transition-colors"
            >
              {isAutoPlaying ? "Pause" : "Play"}
            </button>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border flex text-foreground items-center justify-center hover:scale-110 transition"
            >
              →
            </button>
          </div>

          {/* Progress */}
          <div className="w-full max-w-md h-0.5 bg-black/5 dark:bg-white/5 flex">
            {ingredients.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className="flex-1 relative cursor-pointer"
              >
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeProgress"
                    className="absolute inset-0 bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
