"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";

const features = [
  "Boosts Hair Growth",
  "Strengthens Roots",
  "Fights Dandruff & Itchiness",
  "Adds Natural Shine & Smoothness",
  "Pure Herbal & Zero Harmful Chemicals",
  "Reduces Hair Fall",
];

export default function InfiniteScrollFeatures() {
  const baseX = useMotionValue(0);

  const speed = 50; // px/sec

  useAnimationFrame((_, delta) => {
    baseX.set(baseX.get() - (speed * delta) / 1000);
  });

  // 🔥 Manual wrap (no external lib)
  const x = useTransform(baseX, (v) => {
    const width = 1000; // adjust if needed
    return `${v % width}px`;
  });

  return (
    <div className="w-full overflow-hidden bg-card py-6">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        style={{ x }}
      >
        {/* Repeat MANY times */}
        {[...features, ...features, ...features, ...features].map(
          (item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm md:text-base font-medium text-white"
            >
              <span className="w-2 h-2 bg-[#d4af37] rounded-full" />
              {item}
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}