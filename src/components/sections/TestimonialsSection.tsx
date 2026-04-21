"use client";

// 1. Add useEffect to your imports
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";

const testimonials = [
  {
    text: "I've tried countless hair oils, but nothing compares to Geethika. After just three weeks of consistent use, the shedding stopped and my hair looks incredibly shiny.",
    author: "Samantha",
    role: "Verified Buyer",
    image: "/rashmika.webp",
  },
  {
    text: "The earthy smell and the rich texture make my Sunday oiling ritual feel like a luxurious spa treatment. My dandruff is completely gone.",
    author: "Mamitha",
    role: "Verified Buyer",
    image: "/mamitha.webp",
  },
  {
    text: "You can tell this is made with real herbs. The Bhringraj formula helped regrow my edges after postpartum hair loss. Absolutely highly recommended!",
    author: "Anupama",
    role: "Verified Buyer",
    image: "/anupama.webp",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // 2. Wrap paginate in useCallback to prevent unnecessary re-renders
  // and make it available for the useEffect hook
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  // 3. Add the Auto-Play Logic
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000); // Changes slide every 5 seconds

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [paginate]);

  // --- Rest of your slideVariants and component logic ---

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <Section
      id="testimonials"
      className="bg-white dark:bg-card py-8 lg:py-32 overflow-hidden relative flex items-center justify-center min-h-[80vh]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm uppercase tracking-[0.3em] text-foreground/50 font-semibold mb-4">
            Real Results
          </h2>
          <p className="text-4xl md:text-5xl font-serif font-medium text-foreground italic">
            Loved by thousands of{" "}
            <span className="text-accent">healthy hair</span> journeys.
          </p>
        </div>
        <div className="relative h-125 md:h-100 w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-grab active:cursor-grabbing"
            >
              {/* Large Image Reveal */}
              <div className="w-32 h-32 md:w-72 md:h-72 relative rounded-full md:rounded-3xl overflow-hidden shrink-0 shadow-2xl">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  fill
                  sizes="(max-width: 768px) 128px, 288px"
                  className="object-cover pointer-events-none"
                  priority
                />
              </div>

              {/* Typography */}
              <div className="flex flex-col max-w-2xl text-center md:text-left">
                <div className="flex gap-1 mb-6 text-amber-500 justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>

                <h3 className="text-2xl  lg:text-3xl font-serif font-medium text-foreground leading-tight md:leading-snug mb-8">
                  &quot;{testimonials[currentIndex].text}&quot;
                </h3>

                <div>
                  <p className="text-lg font-bold text-accent">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-foreground/60 text-sm uppercase tracking-widest mt-1 font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Navigation Controls */}
        <div className="flex items-center justify-between md:justify-end gap-6 mt-16 md:mt-0 relative z-20">
          <div className="flex gap-2 mr-auto md:mr-8">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-foreground" : "w-2 bg-foreground/20"}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(-1)}
            className="w-12 h-12 rounded-full border text-foreground border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-12 h-12 rounded-full border border-foreground/10 text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
}
