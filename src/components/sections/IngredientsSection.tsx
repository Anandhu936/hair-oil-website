'use client';

import { motion } from 'framer-motion';

interface Ingredient {
  id: string;
  name: string;
  scientificName: string;
  benefit: string;
  icon: string; 
}

const ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tulsi',
    scientificName: 'Ocimum Tenuiflorum',
    benefit: 'Purifies the scalp, improves blood circulation, and helps maintain a healthy, dandruff-free foundation.',
    icon: '🌿',
  },
  {
    id: '2',
    name: 'Black Cumin',
    scientificName: 'Nigella Sativa',
    benefit: 'Rich in antioxidants and essential fatty acids to promote robust hair growth and reduce thinning.',
    icon: '🖤',
  },
  {
    id: '3',
    name: 'Indian Borage',
    scientificName: 'Plectranthus Amboinicus',
    benefit: 'Soothes scalp irritation and provides natural antibacterial properties to keep follicles clear.',
    icon: '🍃',
  },
  {
    id: '4',
    name: 'Fenugreek',
    scientificName: 'Trigonella Foenum-Graecum',
    benefit: 'Packed with proteins and nicotinic acid to strengthen the hair shaft and prevent breakage.',
    icon: '🌾',
  },
  {
    id: '5',
    name: 'Hibiscus',
    scientificName: 'Hibiscus Rosa-Sinensis',
    benefit: 'Conditions the hair naturally, leaving it smooth, shiny, and deeply hydrated from root to tip.',
    icon: '🌺',
  },
  {
    id: '6',
    name: 'Curry Leaf',
    scientificName: 'Murraya Koenigii',
    benefit: 'Loaded with beta-carotene and proteins to restore natural melanin and delay premature graying.',
    icon: '🌳',
  },
  {
    id: '7',
    name: 'Lark Daisy',
    scientificName: 'Centratherum Punctatum',
    benefit: 'A potent botanical that revitalizes the scalp and stimulates dormant hair follicles.',
    icon: '🌼',
  },
  {
    id: '8',
    name: 'Bhringraj',
    scientificName: 'Eclipta Alba',
    benefit: 'Revered as the "king of herbs," it deeply nourishes the scalp to accelerate healthy hair growth.',
    icon: '🌱',
  },
  {
    id: '9',
    name: 'Aloe Vera',
    scientificName: 'Aloe Barbadensis Miller',
    benefit: 'Intensely hydrates and balances the scalp\'s pH, creating the perfect environment for hair to thrive.',
    icon: '🪴',
  }
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="py-24 bg-white dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-serif text-accent sm:text-5xl"
          >
            The Core of Geethika
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-foreground"
          >
            Purity in every drop. We source only the finest, clinically-backed botanicals to restore your hair&apos;s natural vitality.
          </motion.p>
        </div>

        {/* Ingredients Grid - Changed to lg:grid-cols-3 for 9 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white dark:bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-black/20 dark:border-stone-100"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {ingredient.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground">{ingredient.name}</h3>
              <p className="text-sm italic text-stone-400 mb-4">{ingredient.scientificName}</p>
              <p className="text-foreground/70 leading-relaxed text-sm">
                {ingredient.benefit}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}