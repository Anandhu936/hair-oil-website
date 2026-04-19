"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus } from "lucide-react";

const productData = {
  "hair-oil": {
    id: "hair-oil",
    name: "HAIRVEL Herbal Hair Oil | 100% Natural Herbal Hair Oil",
    description: "Experience the essence of Kerala in every drop...",
    originalPrices: [280, 380, 780],
    prices: [220, 320, 680],
    images: ["/hair-oil.webp", "/shampoo.webp"],
    sizes: ["100ml", "200ml", "500ml"],
  },
  shampoo: {
    id: "shampoo",
    name: "Hairvel Herbal Shampoo",
    description: "Gentle herbal shampoo enriched with natural extracts...",
    originalPrices: [299, 580, 790],
    prices: [249, 500, 700],
    images: ["/shampoo.webp"],
    sizes: ["100ml", "200ml", "500ml"],
  },
  "coconut-oil": {
    id: "coconut-oil",
    name: "Hairvel Coconut Oil",
    description: "Cold-pressed coconut oil from Kerala farms...",
    originalPrices: [90, 150, 250, 490],
    prices: [60, 110, 220, 410],
    images: ["/coconut.webp"],
    sizes: ["100ml", "200ml", "500ml", "1ltr"],
  },
};

export default function ProductPage() {
  const { id } = useParams();
  const product = productData[id as keyof typeof productData];

  const addToCart = useCartStore((state) => state.addToCart);

  const [activeImage, setActiveImage] = useState(product?.images?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  
  // Track the previous ID to reset state without using useEffect
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setActiveImage(product?.images?.[0] || "");
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

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: currentPrice,
      image: activeImage,
      size: selectedSize,
      quantity: quantity, 
    });
  };

  return (
    <main className="min-h-screen w-full bg-white dark:bg-card transition-colors">
      <div className="max-w-6xl min-h-screen mx-auto px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* LEFT - Image */}
        <div className="relative w-full bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border aspect-square">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT - Details */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-3xl font-medium mb-4">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-6 text-sm max-w-md">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="flex justify-center items-center gap-3 mb-6 w-full">
            {/* Original Price - Forced Strikethrough */}
            <span
              className="text-gray-400 text-lg"
              style={{ textDecoration: "line-through" }}
            >
              ₹{currentOriginalPrice}
            </span>

            {/* Current Price */}
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{currentPrice}
            </span>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <div className="flex gap-3 flex-wrap justify-center">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedSize === size
                      ? "bg-background text-yellow-500 border-transparent" 
                      : "bg-background text-foreground border-primary/20 hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded mb-6 overflow-hidden">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Minus size={14} />
            </button>

            <span className="px-4 font-medium">{quantity}</span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full"
            >
              Add to cart
            </Button>

            <Button onClick={handleAddToCart} className="w-full">
              Buy it now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}