
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
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
        <BenefitsSection />
         <IngredientSection/>
        <ProductsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
    
    </>
  );
}
