export interface Recipe {
  id: string;
  name: string;
  category: 'petit-dejeuner' | 'dejeuner' | 'diner' | 'collation';
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  prepTime: string;
  cookingTime: string;
  priceLevel: number;
  ingredients: string[];
  steps: string[];
}

export const recipesDatabase: Recipe[] = [
  // --- PETITS-DÉJEUNERS ---
  {
    id: "mégabowl_flocons_beurre_cacahuete",
    name: "Mega Bowl Avoine, Banane, Noix & Beurre de Cacahuète",
    category: "petit-dejeuner",
    calories: 850,
    proteins: 32,
    carbs: 95,
    fats: 38,
    prepTime: "10 min",
    cookingTime: "5 min",
    priceLevel: 1,
    ingredients: [
      "100g de flocons d'avoine",
      "300ml de lait entier",
      "2 bananes mûres",
      "2 cuillères à soupe généreuses de beurre de cacahuète",
      "30g de noix ou de noisettes concassées",
      "1 cuillère à soupe de miel"
    ],
    steps: [
      "Faire cuire les flocons d'avoine dans le lait entier à feu doux pendant 5 minutes.",
      "Verser dans un grand bol creux.",
      "Disposer les bananes coupées en rondelles par-dessus.",
      "Ajouter le beurre de cacahuète, parsemer de noix et napper de miel."
    ]
  },
  {
    id: "pancakes_geants_protein_choc",
    name: "Pancakes Géants Fourrés & Chocolat",
    category: "petit-dejeuner",
    calories: 780,
    proteins: 45,
    carbs: 90,
    fats: 24,
    prepTime: "15 min",
    cookingTime: "10 min",
    priceLevel: 2,
    ingredients: [
      "100g de farine d'avoine",
      "2 œufs entiers + 1 blanc",
      "1 scoop (30g) de whey protéine chocolat",
      "150ml de lait",
      "2 carrés de chocolat noir fondus et 1 banane"
    ],
    steps: [
      "Mélanger la farine d'avoine, la whey, les œufs et le lait pour obtenir une pâte homogène.",
      "Cuire de larges pancakes dans une poêle chaude antiadhésive huilée.",
      "Napper avec le chocolat fondu et servir avec la banane en tranches."
    ]
  },
  {
    id: "toast_avocat_oeuf_poché_xxl",
    name: "Avocado Toast XXL & Double Œuf",
    category: "petit-dejeuner",
    calories: 620,
    proteins: 26,
    carbs: 45,
    fats: 36,
    prepTime: "10 min",
    cookingTime: "4 min",
    priceLevel: 2,
    ingredients: [
      "3 tranches de pain complet au levain",
      "1 avocat entier",
      "2 œufs pochés",
      "1 filet d'huile d'olive et graines de courge"
    ],
    steps: [
      "Toaster le pain, écraser l'avocat assaisonné par-dessus.",
      "Déposer les deux œufs pochés et parsemer de graines."
    ]
  },
  {
    id: "flocons_avoine_banane",
    name: "Porridge Énergétique Banane & Beurre de Cacahuète",
    category: "petit-dejeuner",
    calories: 410,
    proteins: 15,
    carbs: 55,
    fats: 14,
    prepTime: "5 min",
    cookingTime: "5 min",
    priceLevel: 1,
    ingredients: [
      "50g de flocons d'avoine",
      "200ml de lait (végétal ou animal)",
      "1 banane mûre",
      "1 cuillère à soupe de beurre de cacahuète",
      "Une pincée de cannelle"
    ],
    steps: [
      "Dans une casserole, verser les flocons d'avoine et le lait.",
      "Faire chauffer à feu doux pendant 5 minutes en remuant régulièrement jusqu'à obtention d'une texture crémeuse.",
      "Verser le porridge dans un bol.",
      "Ajouter la banane coupée en rondelles par-dessus.",
      "Napper avec la cuillère de beurre de cacahuète et saupoudrer de cannelle."
    ]
  },
  {
    id: "bowl_fromage_blanc_fruits_rouges",
    name: "Bowl Fraîcheur Fromage Blanc & Fruits Rouges",
    category: "petit-dejeuner",
    calories: 320,
    proteins: 22,
    carbs: 38,
    fats: 4,
    prepTime: "5 min",
    cookingTime: "0 min",
    priceLevel: 1,
    ingredients: [
      "200g de fromage blanc 0% ou 3%",
      "50g de muesli ou granola croustillant",
      "80g de fruits rouges (fraises, framboises ou myrtilles)",
      "1 cuillère à café de miel"
    ],
    steps: [
      "Disposer le fromage blanc dans un bol creux.",
      "Ajouter le muesli pour le croustillant.",
      "Disposer harmonieusement les fruits rouges par-dessus.",
      "Arroser d'un filet de miel avant de déguster."
    ]
  },
  {
    id: "toast_avocat_oeuf_poché",
    name: "Avocado Toast & Œuf Poché",
    category: "petit-dejeuner",
    calories: 350,
    proteins: 16,
    carbs: 28,
    fats: 19,
    prepTime: "5 min",
    cookingTime: "3 min",
    priceLevel: 2,
    ingredients: [
      "2 tranches de pain complet ou au levain",
      "1 avocat mûr",
      "1 œuf",
      "Jus de citron, sel, poivre et graines de sésame"
    ],
    steps: [
      "Faire toaster les tranches de pain.",
      "Écraser la chair de l'avocat avec un peu de jus de citron, du sel et du poivre, puis étaler sur le pain.",
      "Pocher l'œuf dans une casserole d'eau frémissante vinaigrée pendant 3 minutes, puis l'égoutter.",
      "Déposer l'œuf poché sur les toasts à l'avocat et parsemer de graines de sésame."
    ]
  },
  {
    id: "pancake_banane_avoine",
    name: "Pancakes Fit Banane & Avoine (sans sucre ajouté)",
    category: "petit-dejeuner",
    calories: 360,
    proteins: 14,
    carbs: 58,
    fats: 7,
    prepTime: "10 min",
    cookingTime: "6 min",
    priceLevel: 1,
    ingredients: [
      "1 banane bien mûre",
      "1 œuf",
      "40g de farine d'avoine",
      "1 trait de lait",
      "1/2 sachet de levure chimique"
    ],
    steps: [
      "Écraser la banane dans un saladier à l'aide d'une fourchette.",
      "Ajouter l'œuf et mélanger, puis incorporer la farine d'avoine, la levure et le trait de lait pour assouplir.",
      "Faire chauffer une poêle antiadhésive légèrement huilée.",
      "Verser de petites portions de pâte pour former les pancakes et faire cuire 2 minutes de chaque côté."
    ]
  },
  {
    id: "chia_pudding_lait_coco",
    name: "Chia Pudding Exotique Lait de Coco & Mangue",
    category: "petit-dejeuner",
    calories: 340,
    proteins: 9,
    carbs: 35,
    fats: 16,
    prepTime: "10 min",
    cookingTime: "0 min",
    priceLevel: 2,
    ingredients: [
      "30g de graines de chia",
      "150ml de lait de coco léger",
      "1/2 mangue fraîche coupée en dés"
    ],
    steps: [
      "La veille au soir, mélanger les graines de chia et le lait de coco dans un bocal.",
      "Laisser reposer 10 minutes, remuer à nouveau pour éviter les grumeaux, puis placer au réfrigérateur toute la nuit.",
      "Le matin, napper avec les dés de mangue fraîche avant de déguster."
    ]
  },
  {
    id: "omelette_blancs_oeufs_flocons",
    name: "Omelette Salée Protéinée aux Herbes",
    category: "petit-dejeuner",
    calories: 290,
    proteins: 26,
    carbs: 4,
    fats: 18,
    prepTime: "5 min",
    cookingTime: "5 min",
    priceLevel: 1,
    ingredients: [
      "2 œufs entiers + 2 blancs d'œufs",
      "Un filet de lait",
      "Ciboulette et persil ciselés",
      "1 cuillère à café d'huile d'olive"
    ],
    steps: [
      "Battre les œufs entiers et les blancs dans un bol avec le lait, les herbes, le sel et le poivre.",
      "Chauffer l'huile d'olive dans une poêle.",
      "Verser le mélange et cuire à feu moyen en remuant légèrement au début, puis laisser prendre selon la texture souhaitée."
    ]
  },
  {
    id: "smoothie_bowl_vert",
    name: "Green Smoothie Bowl Épinards & Kiwi",
    category: "petit-dejeuner",
    calories: 310,
    proteins: 10,
    carbs: 60,
    fats: 3,
    prepTime: "5 min",
    cookingTime: "0 min",
    priceLevel: 2,
    ingredients: [
      "1 banane congelée",
      "1 kiwi",
      "Une poignée d'épinards frais",
      "150ml de lait d'amande",
      "Quelques amandes effilées pour le topping"
    ],
    steps: [
      "Placer la banane congelée, le kiwi pelé, les épinards et le lait d'amande dans un blender.",
      "Mixer à pleine puissance jusqu'à l'obtention d'une texture onctueuse et dense.",
      "Verser dans un bol et parsemer d'amandes effilées."
    ]
  },
  {
    id: "bowl_cottage_fromage_fruits",
    name: "Bowl Cottage Cheese & Poire",
    category: "petit-dejeuner",
    calories: 280,
    proteins: 20,
    carbs: 38,
    fats: 4,
    prepTime: "5 min",
    cookingTime: "0 min",
    priceLevel: 1,
    ingredients: [
      "180g de cottage cheese (fromage frais)",
      "1 poire mûre coupée en morceaux",
      "10g de noix concassées",
      "Cannelle en poudre"
    ],
    steps: [
      "Disposer le cottage cheese dans un bol.",
      "Ajouter les morceaux de poire fraîche par-dessus.",
      "Parsemer de noix concassées et saupoudrer d'un voile de cannelle."
    ]
  },
  {
    id: "galettes_riz_crean_peanut",
    name: "Galettes de Riz Croquantes & Beurre d'Amande",
    category: "petit-dejeuner",
    calories: 330,
    proteins: 10,
    carbs: 42,
    fats: 14,
    prepTime: "3 min",
    cookingTime: "0 min",
    priceLevel: 2,
    ingredients: [
      "3 galettes de riz soufflé bio",
      "2 cuillères à soupe de purée d'amande complète",
      "1/2 banane coupée en fines rondelles"
    ],
    steps: [
      "Étaler généreusement la purée d'amande sur chaque galette de riz.",
      "Disposer les rondelles de banane par-dessus pour apporter du moelleux et de la douceur."
    ]
  },
  {
    id: "muffins_oeuf_bacon_muffin",
    name: "Muffins Salés Œuf & Dinde",
    category: "petit-dejeuner",
    calories: 300,
    proteins: 22,
    carbs: 10,
    fats: 18,
    prepTime: "5 min",
    cookingTime: "5 min",
    priceLevel: 1,
    ingredients: [
      "2 œufs",
      "2 tranches de bacon de dinde ou de jambon blanc découenné",
      "20g de cheddar râpé léger",
      "Un mini pain complet"
    ],
    steps: [
      "Faire revenir rapidement les tranches de dinde dans une poêle.",
      "Préparer un œuf au plat ou brouillé.",
      "Composer un petit sandwich réconfortant avec le pain complet, la dinde, l'œuf et le cheddar fondu."
    ]
  },

  // --- DÉJEUNERS ---
  {
    id: "mega_bowl_poulet_patate_douce",
    name: "Mega Bowl Poulet Rôti, Patate Douce & Avocat",
    category: "dejeuner",
    calories: 950,
    proteins: 65,
    carbs: 90,
    fats: 35,
    prepTime: "15 min",
    cookingTime: "25 min",
    priceLevel: 2,
    ingredients: [
      "200g de blanc de poulet",
      "250g de patate douce en gros dés",
      "1 avocat entier",
      "120g de riz basmati pesé cuit",
      "2 cuillères à soupe d'huile d'olive"
    ],
    steps: [
      "Enfourner les dés de patate douce avec de l'huile d'olive à 200°C pendant 25 minutes.",
      "Faire dorer le poulet émincé à la poêle avec des épices.",
      "Cuire le riz basmati.",
      "Assembler le tout dans un grand bol avec l'avocat en tranches."
    ]
  },
  {
    id: "pates_bolognaise_extra_viande",
    name: "Pâtes Complètes Bolognaise XXL & Parmesan",
    category: "dejeuner",
    calories: 920,
    proteins: 62,
    carbs: 110,
    fats: 28,
    prepTime: "10 min",
    cookingTime: "15 min",
    priceLevel: 2,
    ingredients: [
      "130g de pâtes complètes crues",
      "200g de bœuf haché 5% MG",
      "200ml de coulis de tomate cuisiné",
      "30g de parmesan râpé"
    ],
    steps: [
      "Faire cuire les pâtes.",
      "Faire revenir le bœuf haché et ajouter le coulis de tomate, laisser mijoter.",
      "Mélanger les pâtes à la sauce et saupoudrer généreusement de parmesan."
    ]
  },
  {
    id: "saumon_quinoa_creme_avocat",
    name: "Pavé de Saumon XXL, Quinoa & Sauce Avocat",
    category: "dejeuner",
    calories: 880,
    proteins: 54,
    carbs: 75,
    fats: 42,
    prepTime: "10 min",
    cookingTime: "15 min",
    priceLevel: 3,
    ingredients: [
      "220g de pavé de saumon",
      "120g de quinoa cru",
      "1 avocat mixé en sauce crémeuse avec du citron",
      "1 cuillère à soupe d'huile d'olive"
    ],
    steps: [
      "Cuire le quinoa dans l'eau bouillante.",
      "Cuire le saumon à la poêle côté peau.",
      "Mixer l'avocat avec du citron et du sel pour en faire une sauce onctueuse à napper sur le plat."
    ]
  },
  {
    id: "bowl_poulet_avocat",
    name: "Bowl Poulet & Avocat",
    category: "dejeuner",
    calories: 520,
    proteins: 35,
    carbs: 45,
    fats: 18,
    prepTime: "10 min",
    cookingTime: "15 min",
    priceLevel: 2,
    ingredients: [
      "150g de blanc de poulet",
      "1/2 avocat",
      "80g de riz basmati cuit",
      "1 portion de légumes verts (brocolis ou épinards)",
      "1 cuillère à soupe d'huile d'olive"
    ],
    steps: [
      "Faire cuire le riz basmati selon les instructions du paquet.",
      "Couper le blanc de poulet en dés et les faire cuire dans une poêle avec un filet d'huile d'olive jusqu'à ce qu'ils soient bien dorés.",
      "Faire cuire les légumes verts à la vapeur ou à la poêle.",
      "Dans un bol, disposer le riz, ajouter le poulet, les légumes et les tranches d'avocat.",
      "Assaisonner selon vos envies et déguster !"
    ]
  },
  {
    id: "salade_mediterraneenne_thon",
    name: "Salade Méditerranéenne Complète au Thon",
    category: "dejeuner",
    calories: 460,
    proteins: 32,
    carbs: 40,
    fats: 16,
    prepTime: "10 min",
    cookingTime: "10 min",
    priceLevel: 1,
    ingredients: [
      "1 boîte (120g) de thon au naturel égoutté",
      "80g de pâtes complètes cuites",
      "1/2 concombre",
      "1 tomate",
      "30g de feta",
      "1 cuillère à soupe d'huile d'olive et vinaigre balsamique"
    ],
    steps: [
      "Faire cuire les pâtes complètes puis les laisser refroidir.",
      "Couper le concombre et la tomate en dés.",
      "Dans un saladier, mélanger les pâtes, les légumes, le thon émietté et la feta en cubes.",
      "Assaisonner avec l'huile d'olive, le vinaigre balsamique, du sel et du poivre."
    ]
  },
  {
    id: "wrap_frais_dinde_crudites",
    name: "Wrap Léger dinde, Crudités & Fromage Frais",
    category: "dejeuner",
    calories: 440,
    proteins: 28,
    carbs: 48,
    fats: 14,
    prepTime: "8 min",
    cookingTime: "0 min",
    priceLevel: 1,
    ingredients: [
      "1 grande tortilla de blé ou de maïs complet",
      "120g d'émincés de filet de dinde rôtie",
      "30g de fromage frais type St Môret ou Philadelphia light",
      "Salade verte, lamelles de poivrons et carottes râpées"
    ],
    steps: [
      "Badigeonner la tortilla de fromage frais.",
      "Disposer un lit de salade verte, les carottes râpées et les lamelles de poivrons au centre.",
      "Ajouter les émincés de dinde.",
      "Rouler fermement la tortilla en repliant les bords, puis couper en deux en diagonale."
    ]
  },
  {
    id: "poke_bowl_saumon_frais",
    name: "Poke Bowl Saumon, Riz & Mangue",
    category: "dejeuner",
    calories: 550,
    proteins: 30,
    carbs: 55,
    fats: 21,
    prepTime: "12 min",
    cookingTime: "15 min",
    priceLevel: 3,
    ingredients: [
      "130g de pavé de saumon frais coupé en cubes",
      "80g de riz à sushi cuit",
      "1/4 de mangue en dés",
      "1/4 de concombre",
      "Graines de sésame et sauce soja sucrée allégée"
    ],
    steps: [
      "Disposer le riz à sushi cuit au fond d'un bol.",
      "Disposer joliment par-dessus les cubes de saumon frais, les dés de mangue et les rondelles de concombre.",
      "Parsemer de graines de sésame et arroser d'un trait de sauce soja."
    ]
  },
  {
    id: "bowl_patate_douce_poulet",
    name: "Bowl Rôti Patate Douce & Poulet",
    category: "dejeuner",
    calories: 490,
    proteins: 34,
    carbs: 52,
    fats: 13,
    prepTime: "10 min",
    cookingTime: "25 min",
    priceLevel: 2,
    ingredients: [
      "150g de patate douce coupée en dés",
      "130g de blanc de poulet",
      "Une poignée de pousses d'épinards",
      "1 cuillère à soupe d'huile d'olive, paprika et ail en poudre"
    ],
    steps: [
      "Préchauffer le four à 200°C. Enrober les dés de patate douce d'huile d'olive et de paprika, puis enfourner 25 minutes.",
      "Faire cuire le poulet coupé en morceaux à la poêle avec l'ail en poudre.",
      "Dans une assiette creuse, assembler les épinards frais, la patate douce rôtie et le poulet chaud."
    ]
  },
  {
    id: "filet_cabillaud_riz_legumes",
    name: "Cabillaud Vapeur, Riz Parfumé & Courgettes",
    category: "dejeuner",
    calories: 410,
    proteins: 36,
    carbs: 45,
    fats: 8,
    prepTime: "10 min",
    cookingTime: "12 min",
    priceLevel: 3,
    ingredients: [
      "160g de filet de cabillaud",
      "70g de riz blanc ou complet cuit",
      "1 courgette moyenne coupée en rondelles",
      "Jus de citron et herbes de Provence"
    ],
    steps: [
      "Faire cuire le cabillaud et les rondelles de courgette à la vapeur pendant 12 minutes.",
      "Servir avec le riz chaud.",
      "Arroser le poisson d'un filet de jus de citron, d'herbes de Provence, de sel et de poivre."
    ]
  },
  {
    id: "salade_pois_chiches_feta",
    name: "Salade Dynamique Pois Chiches, Feta & Concombre",
    category: "dejeuner",
    calories: 470,
    proteins: 22,
    carbs: 54,
    fats: 18,
    prepTime: "10 min",
    cookingTime: "0 min",
    priceLevel: 1,
    ingredients: [
      "150g de pois chiches en conserve (rincés)",
      "1 concombre",
      "50g de tomates cerises",
      "40g de feta",
      "Jus de citron, menthe fraîche et huile d'olive"
    ],
    steps: [
      "Dans un saladier, mélanger les pois chiches égouttés avec le concombre et les tomates cerises coupés.",
      "Émietter la feta par-dessus.",
      "Ajouter de la menthe fraîche ciselée, un filet d'huile d'olive et du jus de citron."
    ]
  },

  // --- DÎNERS ---
  {
    id: "entrecote_puree_beurre",
    name: "Entrecôte Grillée & Purée de Pommes de Terre Maison",
    category: "diner",
    calories: 910,
    proteins: 70,
    carbs: 55,
    fats: 48,
    prepTime: "15 min",
    cookingTime: "20 min",
    priceLevel: 3,
    ingredients: [
      "220g d'entrecôte de bœuf",
      "300g de pommes de terre",
      "30g de beurre et 100ml de lait entier pour la purée",
      "Huile d'olive, sel et poivre"
    ],
    steps: [
      "Éplucher et cuire les pommes de terre à l'eau bouillante, puis les écraser en purée avec le beurre et le lait chaud.",
      "Faire griller l'entrecôte à la poêle selon la cuisson désirée.",
      "Servir l'ensemble bien chaud."
    ]
  },
  {
    id: "gratin_poulet_patate_douce_fromage",
    name: "Gratin Musclé Poulet, Patate Douce & Mozzarella",
    category: "diner",
    calories: 850,
    proteins: 68,
    carbs: 65,
    fats: 34,
    prepTime: "15 min",
    cookingTime: "30 min",
    priceLevel: 2,
    ingredients: [
      "200g de blanc de poulet en morceaux",
      "250g de patate douce en rondelles fines",
      "80g de mozzarella râpée",
      "100ml de crème légère"
    ],
    steps: [
      "Disposer les rondelles de patate douce et le poulet dans un plat à gratin.",
      "Verser la crème, saler, poivrer et recouvrir de mozzarella.",
      "Enfourner à 200°C pendant 30 minutes jusqu'à ce que le gratin soit bien doré."
    ]
  },
  {
    id: "omelette_gigantesque_lardons_fromage",
    name: "Omelette Maxi Lardons, Pommes de Terre & Emmental",
    category: "diner",
    calories: 790,
    proteins: 52,
    carbs: 35,
    fats: 49,
    prepTime: "10 min",
    cookingTime: "15 min",
    priceLevel: 1,
    ingredients: [
      "4 œufs entiers",
      "100g de lardons de dinde ou de porc",
      "150g de pommes de terre sautées cuites",
      "50g d'emmental râpé"
    ],
    steps: [
      "Faire revenir les lardons et les dés de pommes de terre dans une poêle.",
      "Battre les œufs en omelette et les verser par-dessus.",
      "Ajouter l'emmental râpé, laisser cuire et plier en deux."
    ]
  },
  {
    id: "omelette_epinards_feta",
    name: "Omelette Express Épinards & Feta",
    category: "diner",
    calories: 380,
    proteins: 24,
    carbs: 5,
    fats: 28,
    prepTime: "5 min",
    cookingTime: "5 min",
    priceLevel: 1,
    ingredients: [
      "3 œufs entiers",
      "Une poignée d'épinards frais",
      "30g de feta émiettée",
      "1 cuillère à café d'huile d'olive",
      "Herbes de Provence, sel et poivre"
    ],
    steps: [
      "Dans un bol, battre les œufs entiers avec du sel, du poivre et des herbes de Provence.",
      "Faire suer les épinards frais dans une poêle avec un filet d'huile d'olive pendant 2 minutes.",
      "Verser les œufs battus par-dessus les épinards.",
      "Ajouter les morceaux de feta, laisser cuire à feu moyen, puis plier l'omelette en deux avant de servir."
    ]
  },
  {
    id: "soupe_veloute_courgettes_vache_qui_rit",
    name: "Velouté de Courgettes Léger",
    category: "diner",
    calories: 250,
    proteins: 12,
    carbs: 18,
    fats: 14,
    prepTime: "10 min",
    cookingTime: "20 min",
    priceLevel: 1,
    ingredients: [
      "2 courgettes moyennes",
      "2 portions de fromage fondu allégé (type Vache qui rit)",
      "1 petit oignon",
      "300ml d'eau et bouillon de légumes"
    ],
    steps: [
      "Éplucher et couper grossièrement les courgettes et l'oignon.",
      "Les placer dans une casserole avec l'eau et le bouillon, puis faire cuire 20 minutes.",
      "Mixer le tout avec le fromage fondu jusqu'à l'obtention d'un velouté bien onctueux."
    ]
  },
  {
    id: "blanc_poulet_roti_haricots_verts",
    name: "Poulet Rôti aux Herbes & Haricots Verts",
    category: "diner",
    calories: 340,
    proteins: 35,
    carbs: 12,
    fats: 15,
    prepTime: "5 min",
    cookingTime: "15 min",
    priceLevel: 1,
    ingredients: [
      "140g de blanc de poulet",
      "200g de haricots verts frais ou surgelés",
      "1 cuillère à café d'huile d'olive",
      "Ail en poudre et thym"
    ],
    steps: [
      "Faire cuire les haricots verts à la vapeur.",
      "Faire dorer le blanc de poulet à la poêle avec l'huile d'olive, l'ail et le thym.",
      "Servir chaud avec les haricots verts simplement assaisonnés."
    ]
  },
  {
    id: "papillote_saumon_courgettes",
    name: "Papillote de Saumon aux Courgettes & Aneth",
    category: "diner",
    calories: 390,
    proteins: 32,
    carbs: 8,
    fats: 24,
    prepTime: "10 min",
    cookingTime: "18 min",
    priceLevel: 3,
    ingredients: [
      "1 pavé de saumon",
      "1 courgette coupée en fines tagliatelles (à l'économe)",
      "1 filet de jus de citron",
      "Aneth frais, sel et poivre"
    ],
    steps: [
      "Préchauffer le four à 180°C.",
      "Disposer les tagliatelles de courgette au centre d'une feuille de papier cuisson, poser le saumon par-dessus.",
      "Arroser de jus de citron, ajouter l'aneth, saler et poivrer.",
      "Fermer hermétiquement la papillote et enfourner pour 18 minutes."
    ]
  },

  // --- COLLATIONS ---
  {
    id: "smoothie_hypercalorique_masse",
    name: "Smoothie Shake Booster de Masse",
    category: "collation",
    calories: 650,
    proteins: 30,
    carbs: 70,
    fats: 28,
    prepTime: "5 min",
    cookingTime: "0 min",
    priceLevel: 1,
    ingredients: [
      "300ml de lait entier",
      "2 bananes",
      "2 cuillères à soupe de beurre de cacahuète",
      "30g de flocons d'avoine réduits en poudre"
    ],
    steps: [
      "Mettre tous les ingrédients dans un blender.",
      "Mixer à pleine puissance pendant 1 minute et boire immédiatement."
    ]
  },
  {
    id: "snack_barre_fruits_secs_noix",
    name: "Mix Massif de Noix, Amandes & Dattes Séchées",
    category: "collation",
    calories: 550,
    proteins: 15,
    carbs: 55,
    fats: 32,
    prepTime: "2 min",
    cookingTime: "0 min",
    priceLevel: 2,
    ingredients: [
      "60g d'un mélange de noix, amandes et noisettes",
      "80g de dattes séchées dénoyautées"
    ],
    steps: [
      "Déguster en collation énergétique pour faire le plein de bonnes graisses."
    ]
  },
  {
    id: "sandwich_beurre_cacahuete_confiture",
    name: "Super Sandwich Américain Beurre de Cacahuète & Confiture XXL",
    category: "collation",
    calories: 580,
    proteins: 18,
    carbs: 70,
    fats: 26,
    prepTime: "3 min",
    cookingTime: "0 min",
    priceLevel: 1,
    ingredients: [
      "2 grandes tranches de pain de mie brioché",
      "3 cuillères à soupe de beurre de cacahuète",
      "2 cuillères à soupe de confiture de fraise"
    ],
    steps: [
      "Étaler généreusement le beurre de cacahuète sur une tranche et la confiture sur l'autre.",
      "Assembler le sandwich pour une collation ultra-calorique."
    ]
  }
];
