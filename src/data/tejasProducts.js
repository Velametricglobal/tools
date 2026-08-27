export const TEJAS_PRODUCTS = [
  // --- Category 1: Fruit & Vegetable Processing (10 products) ---
  {
    id: 'tejas-101',
    name: 'Apple Grading and Sorting Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Apple Grading & Sorting Machines',
    brand: 'Tejas & Company',
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Stainless Steel 304 Belt & Frame',
    warranty: '1 Year Manufacturer Warranty',
    keyFeatures: [
      'Multi-stage weight & diameter size grading roller channels',
      'Soft padded receiving bins to prevent apple bruising',
      'Variable speed conveyor control with digital counter',
      'High throughput capacity suitable for cold storage & packhouses'
    ],
    specifications: {
      'Grading Capacity': '1.5 to 3.0 Tons/hr',
      'Grading Channels': '4 to 6 Size Grades',
      'Power Required': '2.0 HP (Single/3 Phase)',
      'Structure': 'SS 304 Food Grade Contact Parts',
      'Dimensions': '14ft x 4ft x 4.5ft'
    }
  },
  {
    id: 'tejas-102',
    name: 'Fruits & Vegetable Crusher Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Crushers & Pulpers',
    brand: 'Tejas & Company',
    price: 48500,
    originalPrice: 62000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1626d?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1592417817098-8f3d6eb1626d?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Heavy Duty SS 304 Rotor Blades',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Coarse & fine crushing of apples, tomatoes, mangoes, ginger & garlic',
      'High torque heavy duty motor with stainless steel hopper',
      'Interchangeable screen sizes for variable mash consistency',
      'Easy wash-down hygienic design'
    ],
    specifications: {
      'Processing Capacity': '500 - 800 kg/hr',
      'Motor Power': '3.0 HP (2880 RPM)',
      'Material': 'SS 304 Contact Chamber',
      'Weight': '75 kg'
    }
  },
  {
    id: 'tejas-103',
    name: 'Commercial Juicer Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Juice Press & Extraction Machines',
    brand: 'Tejas & Company',
    price: 32000,
    originalPrice: 42000,
    discount: 24,
    rating: 4.7,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Food Grade Stainless Steel',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Extracts fresh juice from carrots, apples, pineapples, oranges & beetroot',
      'Automatic pulp ejection system into separate waste collection bin',
      'Continuous duty commercial copper winding motor',
      'Removable micro-mesh centrifuge filter basket'
    ],
    specifications: {
      'Juicing Capacity': '120 - 180 Litres/hr',
      'Motor': '1.5 HP Single Phase 220V',
      'Filter Mesh': 'SS 304 Micro Perforated',
      'Weight': '38 kg'
    }
  },
  {
    id: 'tejas-104',
    name: 'Potato, Turmeric & Ginger Peeling Cum Washer Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Peeling & Washing Equipment',
    brand: 'Tejas & Company',
    price: 54000,
    originalPrice: 68000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 71,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Abrasive Silicon Carbide Lining + SS 304 Drum',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Dual function high speed peeling and water spray washing',
      'Internal abrasive silicon carbide disc strips skin without damaging pulp',
      'Suitable for potatoes, fresh ginger, turmeric roots, carrots & radishes',
      'Water drain outlet with solid skin trap filter basket'
    ],
    specifications: {
      'Batch Capacity': '15 - 25 kg per batch (2-3 min batch time)',
      'Output': '300 - 450 kg/hr',
      'Motor': '2.0 HP Heavy Duty',
      'Body': 'SS 304 Stainless Steel',
      'Weight': '88 kg'
    }
  },
  {
    id: 'tejas-105',
    name: 'Electric Hydraulic Juice Press Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Juice Press & Extraction Machines',
    brand: 'Tejas & Company',
    price: 115000,
    originalPrice: 145000,
    discount: 20,
    rating: 4.8,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Hydraulic Cylinder & SS 304 Juice Tray',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'High pressure hydraulic ram extracts maximum yield from fruit mash',
      'Suitable for cold pressed apple cider, grape juice, herbs & berry pressing',
      'Includes food grade filter press bags and wooden/SS press racks',
      'Pressure relief valve & automatic stroke return feature'
    ],
    specifications: {
      'Press Pressure': '15 - 25 Tons Hydraulic Power',
      'Juice Yield': 'Up to 80% liquid extraction',
      'Motor': '3.0 HP Hydraulic Powerpack',
      'Tray': 'SS 304 Heavy Duty Collector'
    }
  },
  {
    id: 'tejas-106',
    name: 'Walnut, Almond & Apricot Cracking Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Apple Grading & Sorting Machines',
    brand: 'Tejas & Company',
    price: 88000,
    originalPrice: 110000,
    discount: 20,
    rating: 4.9,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1509358271058-acd05cc93898?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1509358271058-acd05cc93898?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Hardened Steel Cracking Rollers',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Cracks hard shells of walnuts, almonds, apricot kernels & hazelnut without crushing kernel',
      'Adjustable clearance gap between cracking rollers for different nut sizes',
      'Vibratory sorting screen separates broken shell pieces from whole kernels',
      'Ideal for Himalayan nut processors in Uttarakhand, Kashmir & Himachal'
    ],
    specifications: {
      'Cracking Capacity': '200 - 350 kg/hr',
      'Motor Power': '2.0 HP Single/3 Phase',
      'Shelling Efficiency': '92% unbroken kernel rate',
      'Weight': '120 kg'
    }
  },
  {
    id: 'tejas-107',
    name: 'Gas Operated Steam Blancher',
    category: 'fruit-veg-processing',
    subcategory: 'Slicers & Colloidal Paste Mills',
    brand: 'Tejas & Company',
    price: 68000,
    originalPrice: 85000,
    discount: 20,
    rating: 4.7,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Double Jacketed SS 304 Tank',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Inactivates enzymes in fruits & vegetables prior to freezing, drying, or canning',
      'Gas operated steam generation with automatic water level controller',
      'Perforated SS tilting basket for easy discharge into cold water tank',
      'Insulated outer body minimizes fuel consumption'
    ],
    specifications: {
      'Tank Capacity': '150 - 250 Litres',
      'Fuel': 'Commercial LPG / PNG Gas',
      'Material': 'SS 304 Food Grade Stainless Steel',
      'Weight': '95 kg'
    }
  },
  {
    id: 'tejas-108',
    name: 'Multi-Purpose Slicer Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Slicers & Colloidal Paste Mills',
    brand: 'Tejas & Company',
    price: 34500,
    originalPrice: 44000,
    discount: 21,
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 304 Rotary Blade Disc',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Precise slicing, dicing, shredding & julienne cutting for potatoes, onions, carrots & fruits',
      'Includes 4 interchangeable cutter blades (1mm to 10mm thickness adjust)',
      'Safety feeder chute with pusher handle',
      'High speed rotary cutter disc powered by copper winding motor'
    ],
    specifications: {
      'Cutting Capacity': '200 - 350 kg/hr',
      'Motor': '1.0 HP Single Phase',
      'Blades Included': 'Slicer, Shredder, Dicer & Julienne',
      'Weight': '32 kg'
    }
  },
  {
    id: 'tejas-109',
    name: 'Fruits & Vegetables Pulping Machine',
    category: 'fruit-veg-processing',
    subcategory: 'Crushers & Pulpers',
    brand: 'Tejas & Company',
    price: 49500,
    originalPrice: 65000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 304 Contact Sieve Mesh & Paddles',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Extracts smooth pulp from mangoes, tomatoes, papayas, guavas, apples & jamun',
      'Automatic separation of seeds and outer skin into waste discharge chute',
      'Includes 1mm & 2mm stainless steel sieve meshes',
      'Sanitary quick-dismantle design for fast thorough cleaning'
    ],
    specifications: {
      'Production Rate': '300 - 500 kg/hr',
      'Motor Power': '2.0 HP (Single/3 Phase)',
      'Sieve Size': '1 mm & 2 mm Included',
      'Weight': '68 kg'
    }
  },
  {
    id: 'tejas-110',
    name: 'Colloidal Mill Machine (Paste Maker Machine)',
    category: 'fruit-veg-processing',
    subcategory: 'Slicers & Colloidal Paste Mills',
    brand: 'Tejas & Company',
    price: 78000,
    originalPrice: 98000,
    discount: 20,
    rating: 4.9,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 316 Rotor & Stator Teeth',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Ultra fine micro-grinding for peanut butter, ginger-garlic paste, sauces & fruit purees',
      'Micrometer clearance adjustment ring between stator & high speed rotor',
      'Water jacketed cooling option prevents heat buildup during continuous run',
      'Recirculation pipe attachment included for smooth homogeneity'
    ],
    specifications: {
      'Capacity': '150 - 300 kg/hr',
      'Motor': '3.0 HP (2880 RPM 3-Phase)',
      'Fineness': 'Up to 5 - 10 microns',
      'Weight': '90 kg'
    }
  },

  // --- Category 2: Pulverizer & Grinding Machines (3 products) ---
  {
    id: 'tejas-201',
    name: '2 in 1 Pulverizer Machine',
    category: 'pulverizer-grinding',
    subcategory: '2 in 1 Pulverizer Machines',
    brand: 'Tejas & Company',
    price: 24500,
    originalPrice: 32000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Heavy Duty Cast Iron Chamber + SS Cutter',
    warranty: '1 Year Motor Warranty',
    keyFeatures: [
      'Dual hopper mechanism grinds dry grains (wheat, rice, maize) & spices (chilli, coriander, turmeric)',
      '2.0 HP 100% copper winding motor',
      'Includes 6 stainless steel sieve mesh sets',
      'Compact footprint with low noise operation'
    ],
    specifications: {
      'Capacity': '18 - 25 kg/hr',
      'Motor Power': '2.0 HP Single Phase',
      'Motor Speed': '2880 RPM',
      'Weight': '42 kg'
    }
  },
  {
    id: 'tejas-202',
    name: 'Bower Cyclone Pulverizer Machine',
    category: 'pulverizer-grinding',
    subcategory: 'Bower Cyclone Pulverizers',
    brand: 'Tejas & Company',
    price: 52000,
    originalPrice: 68000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 304 Contact Chamber & Cyclone Filter',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Blower fan pneumatic suction draws ground powder directly into cyclone collector tank',
      'Dust-free cool grinding preserves aroma & essential oils of spices',
      'Heavy duty alloy steel beater hammers',
      'Ideal for commercial flour mills, spice processing & herbal powdering'
    ],
    specifications: {
      'Capacity': '60 - 90 kg/hr',
      'Motor Power': '5.0 HP (Three Phase)',
      'Cyclone Height': '6 Feet',
      'Weight': '135 kg'
    }
  },
  {
    id: 'tejas-203',
    name: 'Fully Automatic 2 in 1 Flour Mill/Pulverizer — 1 HP, 8–10 kg/hr',
    category: 'pulverizer-grinding',
    subcategory: '1 HP Automatic Flour Mills (8-10 kg/hr)',
    brand: 'Tejas & Company',
    price: 15800,
    originalPrice: 21000,
    discount: 24,
    rating: 4.7,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Stainless Steel Hopper & Cutter Chamber',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Compact domestic & small shop 1 HP automatic flour mill',
      'Grinds wheat, rice, bajra, jowar, pulses & dry spices',
      'Auto-sensor shutoff when grain hopper is empty',
      'Vibration-free silent operation with caster wheels'
    ],
    specifications: {
      'Motor Power': '1.0 HP (Single Phase 220V)',
      'Output Capacity': '8 - 10 kg/hr',
      'Hopper Size': '4.5 kg Capacity',
      'Weight': '28 kg'
    }
  },

  // --- Category 3: Packaging Machines (2 products) ---
  {
    id: 'tejas-301',
    name: 'Fully Automatic Packing Machine (Form-Fill-Seal Machine)',
    category: 'packaging-machines',
    subcategory: 'Form-Fill-Seal Automatic Packing Machines',
    brand: 'Tejas & Company',
    price: 165000,
    originalPrice: 210000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 304 Contact Parts + PLC Touchscreen Controller',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Pneumatic Form-Fill-Seal pouch packing for powders, grains, spices & tea',
      'Volumetric cup filler / auger filler mechanism for accurate pouch weights',
      'Integrated batch code ribbon printer for MFD, EXP date & price embossing',
      'Pouch size range: 10g to 250g / 500g pouches'
    ],
    specifications: {
      'Packing Speed': '25 - 55 Pouches/Min',
      'Pouch Range': '10 grams to 500 grams',
      'Control Panel': 'Digital PLC with Eye-Mark Sensor',
      'Air Consumption': '2 - 3 CFM (Compressed Air Required)'
    }
  },
  {
    id: 'tejas-302',
    name: 'Hand Sealer, 550W — for Laminated/Polyester Pouches',
    category: 'packaging-machines',
    subcategory: '550W Hand Sealers for Laminated Pouches',
    brand: 'Tejas & Company',
    price: 2450,
    originalPrice: 3800,
    discount: 35,
    rating: 4.7,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Heavy Cast Metal Body + PTFE Teflon Tape',
    warranty: '6 Months Warranty',
    keyFeatures: [
      '550W impulse heating element seals thick polyester, aluminum foil & laminated pouches',
      'Adjustable 8-timer temperature control dial',
      'Sealing length: 300 mm (12 inches) with 3mm wide leak-proof seal',
      'Includes replacement teflon sheets & heating elements'
    ],
    specifications: {
      'Power Consumption': '550 W',
      'Sealing Length': '300 mm (12 Inches)',
      'Sealing Width': '3 mm Leak-Proof',
      'Weight': '4.5 kg'
    }
  },

  // --- Category 4: Industrial Utility Equipment (2 products) ---
  {
    id: 'tejas-401',
    name: 'STIHL MS 250 Petrol Chainsaw',
    category: 'industrial-utility',
    subcategory: 'STIHL MS 250 Petrol Chainsaws',
    brand: 'STIHL',
    price: 26500,
    originalPrice: 32000,
    discount: 17,
    rating: 4.9,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'German Engineered 2-Stroke Engine',
    warranty: '1 Year Official Stihl Warranty',
    keyFeatures: [
      '45.4 cc 3.1 HP powerful 2-stroke petrol engine for timber cutting & clearing',
      '18-Inch guide bar with Master Control Lever for choke & throttle',
      'Stihl Ematic automatic chain oiling system',
      'Anti-vibration system reduces operator fatigue during long field use'
    ],
    specifications: {
      'Engine Displacement': '45.4 cc',
      'Power Output': '2.3 kW / 3.1 HP',
      'Guide Bar Length': '18 Inches (45 cm)',
      'Weight': '4.6 kg'
    }
  },
  {
    id: 'tejas-402',
    name: 'Portable Petrol Generator',
    category: 'industrial-utility',
    subcategory: 'Portable Petrol Generators',
    brand: 'Tejas & Company',
    price: 28900,
    originalPrice: 38000,
    discount: 24,
    rating: 4.8,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: '100% Copper Alternator + OHV 4-Stroke Engine',
    warranty: '1 Year Warranty',
    keyFeatures: [
      '3.5 kVA max power output for running commercial processing machines & pumps',
      'Self recoil + push button electric start mode',
      'Digital voltmeter, hour meter & circuit breaker overload protection',
      'Heavy steel frame with wheel kit for easy field transport'
    ],
    specifications: {
      'Rated Output': '3.0 kW (Max 3.5 kVA)',
      'Fuel Tank': '15 Litres (9 hours run time at 50% load)',
      'Engine': '7.0 HP 4-Stroke Air-Cooled OHV',
      'Weight': '48 kg'
    }
  },

  // --- Category 5: Food Preservation Equipment (1 product) ---
  {
    id: 'tejas-501',
    name: 'Canning Retort Sterilization Machine',
    category: 'food-preservation',
    subcategory: 'Commercial Canning Retort Sterilizers',
    brand: 'Tejas & Company',
    price: 145000,
    originalPrice: 185000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 304 High Pressure Vessel (ASME Standard)',
    warranty: '1 Year Pressure Vessel Warranty',
    keyFeatures: [
      'High temperature steam sterilization for canned fruits, vegetables, meat & ready-to-eat pouches',
      'Eliminates bacterial spores (Clostridium botulinum) to extend shelf life up to 12-24 months',
      'Includes digital temperature controller, pressure gauge & safety pop-off relief valve',
      'Includes perforated stainless steel loading baskets'
    ],
    specifications: {
      'Vessel Capacity': '100 - 200 Cans/Pouches per batch',
      'Working Temperature': '121°C - 134°C',
      'Working Pressure': '1.2 - 2.1 bar (15-30 PSI)',
      'Material': '8mm Thick SS 304 Boiler Grade Sheet'
    }
  },

  // --- Category 6: Oil Processing Machinery (1 product) ---
  {
    id: 'tejas-601',
    name: 'Cold Press Oil Expeller Machine (10 HP Motor, 100 kg/hr Capacity)',
    category: 'oil-processing',
    subcategory: 'Commercial Cold Press Oil Expeller (10 HP, 100 kg/hr)',
    brand: 'Tejas & Company',
    price: 245000,
    originalPrice: 310000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Heavy Alloy Steel Screw Press Worm + SS Catch Tray',
    warranty: '1 Year Gearbox & Frame Warranty',
    keyFeatures: [
      '10 HP 3-Phase electric motor extracts 100% pure cold pressed oil from mustard, sesame, groundnut, sunflower & flax',
      '100 kg/hour continuous crushing capacity suitable for commercial oil mills',
      'Heavy reduction gearbox drive with oil temperature regulator',
      'Includes oil filter press pump & stainless steel receiving tank'
    ],
    specifications: {
      'Processing Capacity': '100 kg seeds per hour',
      'Motor Power': '10.0 HP (Three Phase 415V)',
      'Extraction Rate': 'Up to 92-95% seed oil content',
      'Weight': '480 kg'
    }
  },

  // --- Category 7: Drying Machines (1 product) ---
  {
    id: 'tejas-701',
    name: 'Industrial Hot Air Tray Dryer Machine',
    category: 'drying-machines',
    subcategory: 'Industrial Hot Air Tray Dryer Machines',
    brand: 'Tejas & Company',
    price: 95000,
    originalPrice: 125000,
    discount: 24,
    rating: 4.8,
    reviewsCount: 36,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Double Walled SS 304 Insulated Body with 24 Trays',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Dehydrates fruits (apple slices, banana, mango), vegetables, herbs, spices & tea leaves',
      'Recirculating hot air blower fan for uniform temperature across all 24 SS trays',
      'Digital PID temperature controller (Ambient to 150°C) with timer',
      'High density glasswool insulation reduces power consumption'
    ],
    specifications: {
      'Tray Capacity': '24 Stainless Steel Wire Mesh Trays (16" x 32")',
      'Batch Capacity': '60 - 100 kg fresh produce per batch',
      'Heating Load': '6.0 kW Electrical Heaters',
      'Blower Fan': '1.0 HP High CFM Hot Air Motor'
    }
  },

  // --- Category 8: Liquid Processing Machines (2 products) ---
  {
    id: 'tejas-801',
    name: 'Industrial RO Water Treatment Plant',
    category: 'liquid-processing',
    subcategory: 'Industrial RO Water Treatment Plants',
    brand: 'Tejas & Company',
    price: 85000,
    originalPrice: 115000,
    discount: 26,
    rating: 4.8,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 304 Skid Frame + FRP Pressure Vessels',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'High capacity Reverse Osmosis water purification for food & beverage production plants',
      'Dual 4040 Dow Filmtec RO membranes with high pressure multistage SS pump',
      'Includes sand filter vessel, activated carbon filter & micron cartridge housing',
      'Digital TDS meter, flow meters & high/low pressure cut-off switches'
    ],
    specifications: {
      'Water Output': '500 - 1000 Litres per Hour (LPH)',
      'High Pressure Pump': '2.0 HP Vertical Multistage SS Pump',
      'Frame': 'SS 304 Skid Structure',
      'Raw Water TDS': 'Up to 2000 PPM'
    }
  },
  {
    id: 'tejas-802',
    name: 'Digital Automatic Liquid Filling Machine (Single Nozzle)',
    category: 'liquid-processing',
    subcategory: 'Digital Single Nozzle Automatic Liquid Fillers',
    brand: 'Tejas & Company',
    price: 18500,
    originalPrice: 26000,
    discount: 28,
    rating: 4.7,
    reviewsCount: 79,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'SS 304 Diaphragm Pump & Filling Nozzle',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Digital micro-computer timer controls precise filling volume from 5ml to 3500ml',
      'Suitable for juices, syrup, milk, oils, vinegar, sanitizer & liquid detergents',
      'Anti-drip stainless steel filling nozzle with foot pedal switch / auto interval mode',
      'Compact benchtop design with silicone food-grade hoses'
    ],
    specifications: {
      'Filling Range': '5 ml to 3500 ml',
      'Filling Speed': '1.5 to 3.2 Litres/Min',
      'Repeat Accuracy': '±0.5%',
      'Power': '60 W (Single Phase 220V)'
    }
  },

  // --- Category 9: Roasting Machines (1 product) ---
  {
    id: 'tejas-901',
    name: 'Gas Operated Tilting Drum Roaster Machine',
    category: 'roasting-machines',
    subcategory: 'Gas Operated Tilting Drum Roaster Machines',
    brand: 'Tejas & Company',
    price: 64000,
    originalPrice: 82000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 44,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    material: 'Heavy Duty SS 304 Rotating Drum',
    warranty: '1 Year Warranty',
    keyFeatures: [
      'Uniform batch roasting for groundnuts, peanuts, almonds, cashews, chickpeas, coffee beans & spices',
      'Gas operated infrared ring burner with temperature indicator',
      'Manual lever tilting drum design for instant 100% discharge into cooling tray',
      'Internal flight paddles ensure non-burning continuous tumbling'
    ],
    specifications: {
      'Batch Capacity': '25 - 35 kg per batch (15-20 min roast time)',
      'Fuel': 'Commercial LPG / PNG Gas',
      'Drum Motor': '1.0 HP Gearbox Motor',
      'Weight': '115 kg'
    }
  }
];
