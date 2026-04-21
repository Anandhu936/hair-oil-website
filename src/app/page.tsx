
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import InfiniteScrollFeatures from "@/components/sections/InfiniteScrollFeatures";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import IngredientSection from "@/components/sections/IngredientsSection";

export default function Home() {
  return (
    <>
      
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <InfiniteScrollFeatures/>
         <IngredientSection/>
        <ProductsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
    
    </>
  );
}
