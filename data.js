// Données pour le site Thanksgiving Afro-Béninois & Affiliation Amazon

const AFFILIATE_TAG = "thanksgivingbj-21";

const RECIPES_DATA = [
  {
    id: "dinde-laquee",
    title: "Dinde Rôtie Laquée au Miel et Piment Doux Béninois",
    category: "poultry",
    categoryLabel: "Volailles & Rôtis",
    rating: 4.9,
    reviewsCount: 328,
    prepTime: "30 min",
    cookTime: "3h 45min",
    difficulty: "Moyen",
    image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=1200&q=80",
    description: "Une dinde dorée et juteuse marinée avec de l'ail, du gingembre frais, du piment doux d'Agbangnizoun et glacée au miel pur.",
    featured: true,
    amazonProducts: [
      {
        name: "Rôtissoire Grand Format Inox avec Grille",
        priceFCFA: "38 500 FCFA",
        priceEUR: "58,90 €",
        amazonUrl: `https://www.amazon.fr/dp/B07XYZROAST?tag=${AFFILIATE_TAG}`,
        badge: "Recommandé Chef"
      },
      {
        name: "Thermomètre à Viande Intelligent Sans Fil",
        priceFCFA: "24 900 FCFA",
        priceEUR: "37,99 €",
        amazonUrl: `https://www.amazon.fr/dp/B08MEATPRB?tag=${AFFILIATE_TAG}`,
        badge: "Top Vente Amazon"
      },
      {
        name: "Pinceau de Glaçage en Silicone Haute Température",
        priceFCFA: "6 500 FCFA",
        priceEUR: "9,99 €",
        amazonUrl: `https://www.amazon.fr/dp/B07BRUSH12?tag=${AFFILIATE_TAG}`,
        badge: "Essentiel"
      }
    ],
    ingredients: [
      "1 dinde fermière de 4 à 5 kg",
      "4 c. à soupe de moutarde de table",
      "6 gousses d'ail pilées et gingembre écrasé",
      "2 c. à soupe d'épices d'assaisonnement béninois (clou de girofle, poivre noir sauvage)",
      "4 c. à soupe de miel pur d'acacia",
      "3 c. à soupe d'huile rouge raffinée ou huile d'arachide",
      "Herbes fraîches (thym, laurier frais)"
    ],
    instructions: [
      "Nettoyer et sécher soigneusement la volaille à l'aide d'essuie-tout.",
      "Mélanger l'ail, le gingembre, le poivre sauvage, la moutarde et le sel pour former la marinade.",
      "Enduire la dinde sous la peau et à l'intérieur, laisser reposer au frais 4 heures.",
      "Préchauffer le four à 175°C. Placer la dinde sur la rôtissoire inox avec un fond d'eau aromatisée.",
      "Enfourner et arroser toutes les 30 minutes avec le jus de cuisson.",
      "30 minutes avant la fin, badigeonner avec le mélange miel et beurre pour laquer la peau."
    ]
  },
  {
    id: "dinde-braisee-gingembre",
    title: "Cuisses de Dinde Braisées au Gingembre et Épices du Terroir",
    category: "poultry",
    categoryLabel: "Volailles & Rôtis",
    rating: 4.8,
    reviewsCount: 154,
    prepTime: "20 min",
    cookTime: "1h 30min",
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1514944298352-78d1222479f6?auto=format&fit=crop&w=800&q=80",
    description: "Marinée selon la tradition avec gingembre frais, oignons caramélisés et herbes locales, saisie au grill.",
    amazonProducts: [
      {
        name: "Plancha Grill Électrique Antiadhésive 2200W",
        priceFCFA: "45 000 FCFA",
        priceEUR: "68,50 €",
        amazonUrl: `https://www.amazon.fr/dp/B08GRILL99?tag=${AFFILIATE_TAG}`,
        badge: "Choix Amazon"
      }
    ],
    ingredients: ["4 belles cuisses de dinde", "Gingembre frais râpé", "Piment végétarien", "Oignons rouges"],
    instructions: ["Mariner la viande pendant 2 heures.", "Faire dorer à feu vif puis mijoter doucement."]
  },
  {
    id: "mac-and-cheese-epice",
    title: "Mac & Cheese Gourmand aux Épices Douces & 4 Fromages",
    category: "sides",
    categoryLabel: "Accompagnements",
    rating: 4.9,
    reviewsCount: 210,
    prepTime: "25 min",
    cookTime: "35 min",
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    description: "Le classique américain revisité avec une touche de muscade, piment doux séché et croûte dorée au four.",
    amazonProducts: [
      {
        name: "Plat à Gratin en Céramique Émaillée",
        priceFCFA: "19 500 FCFA",
        priceEUR: "29,90 €",
        amazonUrl: `https://www.amazon.fr/dp/B07GRATIN1?tag=${AFFILIATE_TAG}`,
        badge: "Idéal pour Four"
      }
    ],
    ingredients: ["400g macaroni coudés", "Cheddar affiné, Comté et Mozzarella", "Béchamel parfumée à la muscade"],
    instructions: ["Cuire les pâtes al dente.", "Napper de sauce béchamel fromagée.", "Gratiner 25 minutes au four."]
  },
  {
    id: "alloco-caramelise",
    title: "Alloco Croustillant & Bananes Plantains Glacées au Four",
    category: "sides",
    categoryLabel: "Accompagnements",
    rating: 4.9,
    reviewsCount: 412,
    prepTime: "15 min",
    cookTime: "20 min",
    difficulty: "Très Facile",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    description: "Plantains mûrs taillés en dés, dorés à l'huile aromatisée et accompagnés d'une sauce tomate pimentée façon Cotonou.",
    amazonProducts: [
      {
        name: "Friteuse Sans Huile Air Fryer XXL 5.5L",
        priceFCFA: "65 000 FCFA",
        priceEUR: "99,00 €",
        amazonUrl: `https://www.amazon.fr/dp/B08AIRFRY5?tag=${AFFILIATE_TAG}`,
        badge: "Best Seller"
      }
    ],
    ingredients: ["4 plantains mûrs à point", "Fleur de sel", "Huile de cuisson", "Piment rouge doux"],
    instructions: ["Couper les plantains en rondelles ou cubes.", "Dorer à 180°C dans l'air fryer ou poêle."]
  },
  {
    id: "gratin-patate-douce",
    title: "Gratin Onctueux de Patates Douces & Éclats de Noix de Cajou",
    category: "sides",
    categoryLabel: "Accompagnements",
    rating: 4.7,
    reviewsCount: 178,
    prepTime: "20 min",
    cookTime: "40 min",
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80",
    description: "Patates douces locales tranchées finement, crème parfumée à la cannelle et garnies de noix de cajou de Parakou.",
    amazonProducts: [
      {
        name: "Mandoline de Cuisine Professionnelle Inox Réglable",
        priceFCFA: "18 000 FCFA",
        priceEUR: "27,50 €",
        amazonUrl: `https://www.amazon.fr/dp/B07MANDOLN?tag=${AFFILIATE_TAG}`,
        badge: "Gain de temps"
      }
    ],
    ingredients: ["800g de patates douces", "25cl de crème liquide", "Noix de cajou concassées", "Pointe de cannelle"],
    instructions: ["Trancher finement à la mandoline.", "Disposer en rosace et napper de crème.", "Cuire 40 min à 180°C."]
  },
  {
    id: "tarte-potiron-coco",
    title: "Tarte Fondante Potiron d'Automne & Lait de Coco",
    category: "desserts",
    categoryLabel: "Desserts & Douceurs",
    rating: 5.0,
    reviewsCount: 290,
    prepTime: "25 min",
    cookTime: "45 min",
    difficulty: "Moyen",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    description: "La célèbre Pumpkin Pie revisitée avec du lait de coco doux, vanille Bourbon et fond de pâte croustillante au beurre.",
    featured: true,
    amazonProducts: [
      {
        name: "Moule à Tarte Cannelé Fond Amovible Antiadhésif 28cm",
        priceFCFA: "12 500 FCFA",
        priceEUR: "18,90 €",
        amazonUrl: `https://www.amazon.fr/dp/B07PIEMOLD?tag=${AFFILIATE_TAG}`,
        badge: "Indispensable Pâtisserie"
      },
      {
        name: "Robot Pâtissier Multifonction 1000W Inox",
        priceFCFA: "79 000 FCFA",
        priceEUR: "119,99 €",
        amazonUrl: `https://www.amazon.fr/dp/B08STANDMIX?tag=${AFFILIATE_TAG}`,
        badge: "Coup de Cœur"
      }
    ],
    ingredients: [
      "1 pâte brisée pur beurre",
      "500g de purée de potiron cuite et égouttée",
      "20cl de lait de coco crémeux",
      "3 œufs frais",
      "80g de sucre de canne roux",
      "1 c. à café d'épices douces (cannelle, gingembre, muscade)"
    ],
    instructions: [
      "Foncer le moule à tarte avec la pâte et piquer le fond avec une fourchette.",
      "Fouetter les œufs avec le sucre, la purée de potiron, le lait de coco et les épices.",
      "Verser l'appareil homogène sur le fond de tarte.",
      "Cuire 45 minutes à 180°C jusqu'à ce que la crème soit prise et dorée."
    ]
  },
  {
    id: "fondant-chocolat-piment",
    title: "Moelleux Chocolat Noir Intense & Pointe de Piment Doux",
    category: "desserts",
    categoryLabel: "Desserts & Douceurs",
    rating: 4.8,
    reviewsCount: 94,
    prepTime: "15 min",
    cookTime: "18 min",
    difficulty: "Facile",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Chocolat grand cru fondu associé à une pincée de piment doux d'Afrique de l'Ouest pour réveiller les papilles.",
    amazonProducts: [
      {
        name: "Balance de Cuisine Électronique Précision 1g",
        priceFCFA: "9 500 FCFA",
        priceEUR: "14,50 €",
        amazonUrl: `https://www.amazon.fr/dp/B07SCALES1?tag=${AFFILIATE_TAG}`,
        badge: "Haute Précision"
      }
    ],
    ingredients: ["200g chocolat noir 70%", "100g beurre", "3 œufs", "Pointe de piment doux moulu"],
    instructions: ["Faire fondre le chocolat et le beurre.", "Incorporer œufs et sucre.", "Cuire 18 min à 190°C."]
  },
  {
    id: "tartelette-meringuee",
    title: "Tartelette Nuage aux Agrumes & Meringue Dorée au Chalumeau",
    category: "desserts",
    categoryLabel: "Desserts & Douceurs",
    rating: 4.9,
    reviewsCount: 167,
    prepTime: "30 min",
    cookTime: "20 min",
    difficulty: "Moyen",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    description: "Crème onctueuse au citron vert et orange amère, coiffée d'une meringue italienne croustillante et toastée.",
    amazonProducts: [
      {
        name: "Chalumeau de Cuisine Professionnel Rechargeable",
        priceFCFA: "14 000 FCFA",
        priceEUR: "21,90 €",
        amazonUrl: `https://www.amazon.fr/dp/B08TORCH01?tag=${AFFILIATE_TAG}`,
        badge: "Chef Pâtissier"
      }
    ],
    ingredients: ["Fonds de tartelettes cuits", "Crème de citron vert", "Blancs d'œufs et sucre pour meringue"],
    instructions: ["Garnir les fonds de tartelette.", "Pocher la meringue et dorer au chalumeau."]
  }
];

const AMAZON_FEATURED_PRODUCTS = [
  {
    id: "roaster-pro",
    title: "Rôtissoire Familiale Inox avec Grille Amovible",
    brand: "KitchenMaster Pro",
    rating: 4.8,
    reviews: 1420,
    priceFCFA: "38 500 FCFA",
    priceEUR: "58,90 €",
    originalPriceEUR: "79,90 €",
    discount: "-26%",
    image: "https://images.unsplash.com/photo-1584990347449-39bbf8a59489?auto=format&fit=crop&w=600&q=80",
    description: "Parfaite pour une dinde de 6 kg, conduction thermique uniforme pour une peau ultra croustillante.",
    badge: "Choix d'Amazon",
    prime: true,
    amazonUrl: `https://www.amazon.fr/dp/B07XYZROAST?tag=${AFFILIATE_TAG}`
  },
  {
    id: "air-fryer-xxl",
    title: "Friteuse Sans Huile Air Fryer XXL 5.5L 1700W",
    brand: "Ninja Gourmand",
    rating: 4.9,
    reviews: 3890,
    priceFCFA: "65 000 FCFA",
    priceEUR: "99,00 €",
    originalPriceEUR: "139,99 €",
    discount: "-30%",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    description: "Pour des allocos dorés et croustillants avec 75% d'huile en moins. Nettoyage facile au lave-vaisselle.",
    badge: "N°1 des Ventes",
    prime: true,
    amazonUrl: `https://www.amazon.fr/dp/B08AIRFRY5?tag=${AFFILIATE_TAG}`
  },
  {
    id: "meat-thermometer",
    title: "Thermomètre à Viande Connecté Bluetooth Sans Fil",
    brand: "ThermoPro Smart",
    rating: 4.8,
    reviews: 2150,
    priceFCFA: "24 900 FCFA",
    priceEUR: "37,99 €",
    originalPriceEUR: "49,99 €",
    discount: "-24%",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Surveillez la cuisson à cœur de votre dinde depuis votre smartphone avec alerte en temps réel.",
    badge: "Amazon Prime",
    prime: true,
    amazonUrl: `https://www.amazon.fr/dp/B08MEATPRB?tag=${AFFILIATE_TAG}`
  },
  {
    id: "cocotte-fonte",
    title: "Cocotte Ronde en Fonte Émaillée 6.7L Rouge Grenat",
    brand: "CastIron Heritage",
    rating: 4.9,
    reviews: 1840,
    priceFCFA: "52 000 FCFA",
    priceEUR: "79,50 €",
    originalPriceEUR: "110,00 €",
    discount: "-28%",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80",
    description: "Maintient les sauces et les viandes braisées incroyablement tendres et juteuses pour le grand repas.",
    badge: "Indispensable Fêtes",
    prime: true,
    amazonUrl: `https://www.amazon.fr/dp/B07CASTIRON?tag=${AFFILIATE_TAG}`
  },
  {
    id: "moulin-epices",
    title: "Broyeur & Moulin à Épices Électrique Inox 300W",
    brand: "AromaGrind",
    rating: 4.7,
    reviews: 970,
    priceFCFA: "16 500 FCFA",
    priceEUR: "24,99 €",
    originalPriceEUR: "34,90 €",
    discount: "-28%",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    description: "Idéal pour moudre le poivre de Penja, clous de girofle, graines d'akpi et piments secs en 10 secondes.",
    badge: "Pratique",
    prime: true,
    amazonUrl: `https://www.amazon.fr/dp/B07SPICEGRIND?tag=${AFFILIATE_TAG}`
  },
  {
    id: "couteau-tranchelart",
    title: "Coffret Couteau à Découper & Fourchette à Viande Pro",
    brand: "ChefMaster Japan Steel",
    rating: 4.8,
    reviews: 820,
    priceFCFA: "22 000 FCFA",
    priceEUR: "33,50 €",
    originalPriceEUR: "45,00 €",
    discount: "-25%",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80",
    description: "Tranchez votre dinde de Thanksgiving avec une netteté de chef. Lame en acier trempé ultra-affûtée.",
    badge: "Haute Précision",
    prime: true,
    amazonUrl: `https://www.amazon.fr/dp/B08KNIFESET?tag=${AFFILIATE_TAG}`
  }
];

const CATEGORIES = [
  { id: "all", label: "Toutes les Recettes", icon: "🍽️" },
  { id: "poultry", label: "Dindes & Volailles", icon: "🍗" },
  { id: "sides", label: "Accompagnements & Alloco", icon: "🍌" },
  { id: "desserts", label: "Tartes & Desserts", icon: "🥧" }
];
