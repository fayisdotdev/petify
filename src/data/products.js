// src/data/products.js

export const storeContactInfo = {
  phone: '+91 97450 01101',
  email: 'petify.shopping@gmail.com',
  company: 'Petify Group'
}

export const products = [
  // --- INDIVIDUAL PRODUCTS ---
  {
    id: 'channa-stick-125g',
    type: 'single',
    name: 'Petify Channa Stick (125g)',
    category: 'Fish Food',
    price: 349.00,
    originalPrice: 349.00,
    weight: '125g',
    image: 'images/channa-stick-125g.jpg',
    shortDesc: 'Premium protein-rich fish food formulated specifically for Snakehead & carnivorous fish.',
    ingredients: 'Fish Meal, Shrimp Meal, Wheat Flour, Soybean Meal, Fish Oil, Spirulina, Krill Meal, Yeast, Lecithin, Vitamins & Minerals, Astaxanthin.',
    nutritionalFacts: {
      protein: '45% (Min)',
      fat: '8% (Min)',
      fiber: '3% (Max)',
      moisture: '8% (Max)',
      ash: '12% (Max)',
      omega3: '1.2% (Min)',
      astaxanthin: '100 ppm (Min)'
    },
    idealFor: 'Snakehead (Channa spp.) and other carnivorous fish.',
    feedingGuide: 'Feed 2–3 times daily. Provide only as much as fish can consume in 3–5 minutes. Remove uneaten food from the aquarium.'
  },
  {
    id: 'arowana-stick-125g',
    type: 'single',
    name: 'Petify Arowana Stick (125g)',
    category: 'Fish Food',
    price: 299.00,
    originalPrice: 299.00,
    weight: '125g',
    image: 'images/arowana-stick-125g.jpg',
    shortDesc: 'Specially formulated high-protein & Omega-3 rich stick for Arowana and large carnivores.',
    ingredients: 'Fish Meal, Shrimp Meal, Wheat Flour, Soybean Meal, Fish Oil, Spirulina, Krill Meal, Yeast, Lecithin, Vitamins & Minerals, Astaxanthin.',
    nutritionalFacts: {
      protein: '45% (Min)',
      fat: '8% (Min)',
      fiber: '3% (Max)',
      moisture: '8% (Max)',
      ash: '12% (Max)',
      omega3: '15% (Min)',
      astaxanthin: '100 ppm (Min)'
    },
    idealFor: 'Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead & other carnivorous fish.',
    feedingGuide: 'Feed 2–3 times daily. Provide only as much as fish can consume in 3–5 minutes. Remove uneaten food from the aquarium.'
  },
  {
    id: 'shrimp-35g',
    type: 'single',
    name: 'Petify Freeze Dried Shrimp (35g)',
    category: 'Treats',
    price: 315.00,
    originalPrice: 315.00,
    weight: '35g',
    image: 'images/shrimp-35g.jpg',
    shortDesc: '100% natural, protein-rich treat without added preservatives or artificial flavors.',
    ingredients: 'Freeze-Dried Shrimp',
    nutritionalFacts: {
      protein: '55% (Min)',
      fat: '6% (Min)',
      fiber: '8% (Max)',
      moisture: '4% (Max)'
    },
    idealFor: 'Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead & other carnivorous fish.',
    feedingGuide: 'Feed 2–3 times daily. To be consumed in ~5 minutes. Remove uneaten food using a fish net.'
  },
  {
    id: 'shrimp-50g',
    type: 'single',
    name: 'Petify Freeze Dried Shrimp (50g)',
    category: 'Treats',
    price: 439.00,
    originalPrice: 439.00,
    weight: '50g',
    image: 'images/shrimp-50g.jpg',
    shortDesc: 'Natural nutritional treat supporting healthy digestion and color enhancement.',
    ingredients: 'Freeze-Dried Shrimp',
    nutritionalFacts: {
      protein: '55% (Min)',
      fat: '6% (Min)',
      fiber: '8% (Max)',
      moisture: '4% (Max)'
    },
    idealFor: 'Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead & other carnivorous fish.',
    feedingGuide: 'Feed 2–3 times daily. To be consumed in ~5 minutes. Remove uneaten food using a fish net.'
  },
  {
    id: 'shrimp-100g',
    type: 'single',
    name: 'Petify Freeze Dried Shrimp (100g)',
    category: 'Treats',
    price: 649.00,
    originalPrice: 649.00,
    weight: '100g',
    image: 'images/shrimp-100g.jpg',
    shortDesc: 'Value pack of premium freeze-dried shrimp high in natural protein.',
    ingredients: 'Freeze-Dried Shrimp',
    nutritionalFacts: {
      protein: '55% (Min)',
      fat: '6% (Min)',
      fiber: '8% (Max)',
      moisture: '4% (Max)'
    },
    idealFor: 'Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead & other carnivorous fish.',
    feedingGuide: 'Feed 2–3 times daily. To be consumed in ~5 minutes. Remove uneaten food using a fish net.'
  },

  // --- COMBO OFFERS ---
  {
    id: 'combo-125g-100g',
    type: 'combo',
    name: 'Channa Stick (125g) + Freeze Dried Shrimp (100g) Combo',
    category: 'Combos',
    price: 899.00,
    originalPrice: 998.00,
    savings: 99,
    image: 'images/combo-899.jpg',
    shortDesc: 'Ultimate protein-rich combo pack featuring 125g Channa Stick and 100g Freeze Dried Shrimp.',
    idealFor: 'Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead & other carnivorous fish.'
  },
  {
    id: 'combo-125g-50g',
    type: 'combo',
    name: 'Channa Stick (125g) + Freeze Dried Shrimp (50g) Combo',
    category: 'Combos',
    price: 699.00,
    originalPrice: 778.00,
    savings: 79,
    image: 'images/combo-699.jpg',
    shortDesc: 'Balanced daily nutritional bundle featuring 125g Channa Stick and 50g Freeze Dried Shrimp.',
    idealFor: 'Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead & other carnivorous fish.'
  },
  {
    id: 'combo-125g-35g',
    type: 'combo',
    name: 'Channa Stick (125g) + Freeze Dried Shrimp (35g) Combo',
    category: 'Combos',
    price: 599.00,
    originalPrice: 664.00,
    savings: 65,
    image: 'images/combo-599.jpg',
    shortDesc: 'Essential starter combo pack featuring 125g Channa Stick and 35g Freeze Dried Shrimp.',
    idealFor: 'Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead & other carnivorous fish.'
  }
]