export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  benefits: string[];
  ingredients: { name: string; benefit: string; image: string }[];
  usage: string[];
  originalPrices: number[];
  prices: number[];
  sizes: string[];
  images: string[];
}

export const PRODUCTS: Record<string, Product> = {
  "hair-oil": {
    id: "hair-oil",
    name: "Geethika Herbal Hair Oil",
    tagline: "The essence of Kerala in every drop",
    description: "A potent blend of 18 sacred herbs infused in cold-pressed coconut oil, following traditional Ayurvedic recipes.",
    longDescription: "Our signature hair oil is crafted using ancient 'Ksheerabala' techniques where herbs are slow-cooked in medium heat to preserve their medicinal properties. It penetrates deep into the scalp to nourish follicles and promote healthy hair growth.",
    benefits: [
      "Reduces hair fall within 15 days",
      "Accelerates natural hair growth",
      "Treats dandruff and scalp itchiness",
      "Deeply conditions and adds natural shine",
      "Prevents premature greying"
    ],
    ingredients: [
      { name: "Hibiscus", benefit: "Rich in vitamin C and amino acids", image: "/ingredients/hibiscus.webp" },
      { name: "Brahmi", benefit: "Strengthens hair from roots", image: "/ingredients/brahmi.webp" },
      { name: "Bringaraj", benefit: "The 'King of Hair' for hair growth", image: "/ingredients/bhringaraj.webp" },
      { name: "Amla", benefit: "Potent antioxidant for scalp health", image: "/ingredients/amla.webp" }
    ],
    usage: [
      "Apply liberally to hair and scalp.",
      "Massage gently in circular motions for 5-10 minutes.",
      "Leave on for at least 1-2 hours or overnight for best results.",
      "Wash off with a mild herbal shampoo."
    ],
    originalPrices: [280, 420, 780],
    prices: [220, 320, 680],
    sizes: ["100ml", "200ml", "500ml"],
    images: ["/hair-oil.webp"],
  },
  "shampoo": {
    id: "shampoo",
    name: "Geethika Herbal Shampoo",
    tagline: "Gentle cleansing, naturally",
    description: "Sulphate-free, paraben-free cleansing enriched with Shikakai and Reetha for soft, manageable hair.",
    longDescription: "A gentle yet effective herbal cleanser that removes dirt and excess oil without stripping away the natural oils of your scalp. Formulated with traditional foaming agents that respect your hair's delicate balance.",
    benefits: [
      "Safe for daily use",
      "Sulphate & Paraben free",
      "Reduces frizz and makes hair manageable",
      "Strengthens hair strands",
      "Safe for color-treated hair"
    ],
    ingredients: [
      { name: "Shikakai", benefit: "Natural cleanser with low pH", image: "/ingredients/shikakai.webp" },
      { name: "Reetha", benefit: "Natural foaming agent", image: "/ingredients/reetha.webp" },
      { name: "Aloe Vera", benefit: "Hydrates and soothes scalp", image: "/ingredients/aloe.webp" }
    ],
    usage: [
      "Wet your hair thoroughly.",
      "Apply a small amount of shampoo and massage into scalp.",
      "Work through the lengths of your hair.",
      "Rinse thoroughly with water."
    ],
    originalPrices: [299, 580, 790],
    prices: [249, 500, 700],
    sizes: ["100ml", "200ml", "500ml"],
    images: ["/shamboo.webp"],
  },
  "coconut-oil": {
    id: "coconut-oil",
    name: "Geethika Virgin Coconut Oil",
    tagline: "Cold-pressed purity",
    description: "100% pure, cold-pressed virgin coconut oil from the finest Kerala coconuts.",
    longDescription: "Our coconut oil is extracted using the traditional cold-pressing method, ensuring that all natural nutrients, aroma, and taste are preserved. No heat or chemicals are used in the process, resulting in a pure, crystal-clear oil.",
    benefits: [
      "Perfect for hair, skin, and edible use",
      "Rich in Lauric acid",
      "Deeply moisturizing properties",
      "Zero cholesterol and trans-fat",
      "Chemical-free and unrefined"
    ],
    ingredients: [
      { name: "Kerala Coconuts", benefit: "Rich in medium-chain fatty acids", image: "/ingredients/coconut.webp" }
    ],
    usage: [
      "For hair check: Apply and leave for 30 mins before wash.",
      "For skin: Use as a natural moisturizer after shower.",
      "For cooking: Use as a healthy alternative to refined oils."
    ],
    originalPrices: [90, 150, 250, 490],
    prices: [60, 110, 220, 410],
    sizes: ["100ml", "200ml", "500ml", "1ltr"],
    images: ["/coconut.webp"],
  },
};
