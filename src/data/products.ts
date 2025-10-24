import { Product } from '@/types';
import { CATEGORY_VALUES } from '@/data/categories';

// ============================================
// PRODUCTS DATA
// ============================================
// Using CATEGORY_VALUES (like enum) ensures consistency
// Example: category: CATEGORY_VALUES.LIGHTING
// This prevents typos and makes categories consistent

export const products: Product[] = [
  // Lighting Products
  {
    id: 'emergency-light',
    name: 'Rechargeable Emergency Light',
    category: CATEGORY_VALUES.LIGHTING, // ✅ Using enum-like constant
    originalPrice: 950,
    // No discount - will show only Rs. 950
    discountPercent: 0,
    image: '/Images/emergency-light.png',
    badge: 'Essential',
    badgeColor: 'red',
    shortDescription: 'Powerful LED emergency light with 8+ hours backup, perfect for load shedding and outdoor activities.',
    fullDescription: 'Never be left in the dark during power outages. This powerful emergency light provides bright illumination for hours with its long-lasting battery.',
    isFeatured: true,
    features: [
      '30 High-Power LED Bulbs',
      '8+ Hours Backup Time',
      'AC power charging',
      'Overcharge Protection',
      'Dual Light Modes (Bright/Dim)',
      'Fast Charging Technology'
    ],
    specifications: {
      'LED Count': '30 SMD LEDs',
      'Power': '3W',
      'Charging Time': '8-10 Hours',
      'Backup Time': '8-12 Hours',
      'Light Modes': '2 (High/Low)',
      'Weight': '800g'
    },
    reviews: [
      {
        name: 'Hassan Raza',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Perfect for load shedding! Very bright and lasts the entire night. Highly recommended.'
      }
    ]
  },
  //============================================

  {
    id: 'emergency-light-2',
    name: 'Solar Portable Rechargeable LED Flashlight Torch',
    category: CATEGORY_VALUES.LIGHTING, 
    originalPrice: 800,
    discountPercent: 0,
    image: '/Images/solar-torch.png',
    badge: 'Essential',
    badgeColor: 'red',
    shortDescription: 'Powerful Solar Portable Rechargeable LED Flashlight Torch 8+ hours backup, perfect for load shedding and outdoor activities.',
    fullDescription: 'Solar Portable Rechargeable LED Flashlight Torch with Side Light This powerful emergency light provides bright illumination for hours with its long-lasting battery.',
    isFeatured: true,
    features: [
      '1W high brightness LED light bead+2W COB side light;',
      '800mAh large capacity rechargeable battery',
      'Torch/side light mode switch',
      'Built-in power charging plug and charging indicator',
    ],
    specifications: {
      'Battery Capacity': '4V 800mAh',
      'Power': '3W',
      'Working Hours (hours)': '30000',
      'Backup Time': '8-12 Hours',
      'Power Supply': 'Rechargeable Battery',
      'Lighting Mode': 'Flashlight(1W)/Side light(2W)',
    },
    reviews: [
      {
        name: 'Adbul wahab',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Perfect for load shedding! Very bright and lasts the entire night. Highly recommended.'
      }
    ]
  },
  
  //============================================
  {
    id: 'dp-959c_led_light',
    name: 'Rechargeable LED Flashlights Torches for Camping',
    category: CATEGORY_VALUES.LIGHTING, 
    originalPrice: 1500,
    discountPercent: 0,
    image: '/Images/dp-959-led-light.png',
    badge: 'Essential',
    badgeColor: 'red',
    shortDescription: 'Powerful Rechargeable LED Flashlights Torches for Camping 8+ hours backup, perfect for load shedding and outdoor activities.',
    fullDescription: 'Rechargeable LED Flashlights Torches for Camping with Side Light This powerful emergency light provides bright illumination for hours with its long-lasting battery.',
    isFeatured: false,
    features: [
      '6W high brightness LED light ',
      '1600mAh large capacity rechargeable battery',
      'Built-in power charging plug and charging indicator',
    ],
    specifications: {
      'Input Voltage (V)': 'Ac 110v ( ± 10%)',
      'Lamp Life (hours)': '30000',
      'Power Supply': 'Rechargeable Battery',
      'Backup Time': '8-12 Hours',
      'Lighting Mode': 'Flashlight(1W)/Side light(2W)',
      'Warranty': '1 Year'
    },
    reviews: [
      {
        name: 'Ali ahmad',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Perfect for load shedding! Very bright and lasts the entire night. Highly recommended.'
      }
    ]
  },
  //============================================
  {
    id: 'rl-233-flash-light',
    name: 'Multifunctional High Power Telescopic Rechargeable LED FlashLight',
    category: CATEGORY_VALUES.LIGHTING, // ✅ Using enum-like constant
    originalPrice: 1700,
    discountPercent: 0,
    image: '/Images/rl-233-flashlight.png',
    badge: 'Essential',
    badgeColor: 'red',
    shortDescription: 'Powerful LED emergency light with 8+ hours backup, perfect for load shedding and outdoor activities.',
    fullDescription: 'The Ruilang RL-233 is a versatile and high-performance flashlight designed for multiple uses, making it an ideal companion for outdoor adventures, professional tasks, and emergencies. With its multifunctional features, powerbank capability, and durable construction, it offers reliability and convenience in any situation.',
    isFeatured: true,
    features: [
      'Rechargeable Battery: Includes a high-capacity 26650 Lithium Battery for long-lasting performance.',
      'Best Use Cases: Ideal for hiking, camping, policing, emergency stopping, and everyday tasks',
      'Powerbank Feature: Charge devices such as phones and small electronics on the go',
      'Type-C Charging Port: Supports fast charging for quick and efficient battery replenishment.',
      'Fully Metal Body: Sturdy and durable construction for rough conditions.',
      'Water Resistant: Designed to withstand splashes and wet conditions.',
      'Fast Charging Technology'
    ],
    specifications: {
      'Brand': 'Ruilang',
      'Charging Port': 'Type-C Fast Charging',
      'Battery': '26650 Lithium Battery',
      'Light Modes': 'Multiple Modes including High, Medium, Low, Strobe, SOS',
      'Backup Time': '8-12 Hours',
      'Powerbank Feature': 'Charge devices such as phones and small electronics on the go',
      'Weight': '800g',
    },
    reviews: [
      {
        name: 'Hamid Khan',
        rating: 4.9,
        date: '1 day ago',
        comment: 'Perfect for load shedding! Very bright and lasts the entire night. Highly recommended.'
      }
    ]
  },
  
  {
    id: 'smart-led-bulb',
    name: 'Smart LED Bulb 12W',
    category: CATEGORY_VALUES.LIGHTING, // ✅ Using enum-like constant
    originalPrice: 399,
    discountPercent: 25,  // Will calculate to Rs. 300 (rounded from 299.25)
    image: '/Images/smart-led-bulb.png',
    badge: 'Smart',
    badgeColor: 'blue',
    shortDescription: 'Wi-Fi enabled 12W smart bulb with adjustable brightness and color tones, controllable via mobile app or voice assistant.',
    fullDescription: 'Transform any room with vibrant lighting – control brightness, color, and scheduling straight from your smartphone or voice assistant.',
    isFeatured: true,
    features: [
      '12W Power Consumption',
      '16 Million Colors',
      'Wi-Fi & Bluetooth Enabled',
      'Voice Control Compatible (Alexa, Google)',
      'Schedule & Timer Functions',
      '25,000 Hour Lifespan'
    ],
    specifications: {
      'Power': '12W',
      'Voltage': '220-240V AC',
      'Base Type': 'E27',
      'Brightness': '1200 Lumens',
      'Color Temperature': '2700K-6500K',
      'Connectivity': 'Wi-Fi 2.4GHz, Bluetooth 5.0',
    },
    reviews: [
      {
        name: 'Ahmed Khan',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Amazing product! The app control works flawlessly and the color options are endless. Installation was super easy.'
      },
      {
        name: 'Sara Ali',
        rating: 4,
        date: '1 month ago',
        comment: 'Great value for money. Brightness is impressive and voice control with Alexa works perfectly.'
      }
    ]
  },

  //Tools and machinery
  {
    id: 'sewing-motor-domestic',
    name: 'Household Sewing Machine Motor',
  // Using HOME_APPLIANCES as the closest existing category to avoid build-time type errors
  // If you'd like a separate "tools-and-machinery" category on production, ensure
  // `CATEGORY_VALUES` in `src/data/categories.ts` is updated and committed first.
  category: CATEGORY_VALUES.HOME_APPLIANCES,
    originalPrice: 2499, // Estimated price
    // Example: Applying an introductory discount
    discountPercent: 10, 
    image: '/Images/sewing-motor-domestic.png', // Placeholder path for the converted image
    badge: 'High Torque',
    badgeColor: 'blue',
    shortDescription: 'Reliable 150W motor for domestic sewing machines, providing smooth, powerful, and consistent operation for all fabric types.',
    fullDescription: 'Upgrade or replace your sewing machine motor with this high-performance, durable, and energy-efficient unit. It features a variable speed foot controller, easy installation, and is compatible with most household sewing machine models.',
    isFeatured: true,
    features: [
        '150 Watt High Power Output',
        'Variable Speed Foot Controller Included',
        'Easy Belt and Bracket Installation',
        'Built-in Cooling Fan for Durability',
        'Durable All-Metal Construction',
        'Low Vibration and Noise Operation'
    ],
    specifications: {
        'Power': '150W',
        'Voltage': '220V-240V AC (Standard)',
        'Frequency': '50/60Hz',
        'Max Speed': '7,000 RPM (Motor)',
        'Speed Control': 'Variable Foot Pedal',
        'Weight': '1.2 kg (Motor Only)',
        'Compatibility': 'Universal Domestic Machines'
    },
    reviews: [
        {
            name: 'Aisha K.',
            rating: 5,
            date: '2 days ago',
            comment: 'Easy to install and runs so much smoother than my old motor. Great power even on thicker fabrics!'
        }
    ]
  },
  
  //============================================ 
  
  // Cooling Products
  {
    id: 'ceiling-fan',
    name: 'Ceiling Fan with LED',
    category: CATEGORY_VALUES.COOLING, // ✅ Using enum-like constant
    originalPrice: 6499,
    discountPercent: 23,  // Will calculate to Rs. 5000 (rounded from 5004.23)
    image: '/Images/Ceiling-fan.png',
    badge: 'New',
    badgeColor: 'green',
    shortDescription: 'Energy-efficient ceiling fan with integrated LED lighting, three speed settings, and silent motor for a comfortable environment.',
    fullDescription: 'Premium ceiling fan combining efficient air circulation with modern LED lighting. Features a whisper-quiet motor and elegant design.',
    isFeatured: true,
    features: [
      '1200mm Sweep Size',
      'Integrated LED Light (18W)',
      '3 Speed Settings',
      'Silent BLDC Motor',
      'Energy Star Rated',
      'Remote Control Included'
    ],
    specifications: {
      'Sweep': '1200mm (48 inches)',
      'Motor Type': 'BLDC (Brushless DC)',
      'Speed': '3 Levels',
      'Air Delivery': '220 CMM',
      'Power Consumption': '35W',
      'LED Power': '18W',
      'Warranty': '2 Years Motor, 1 Year LED'
    },
    reviews: []
  },
  {
    id: 'stand-fan',
    name: 'Adjustable Stand Fan',
    category: CATEGORY_VALUES.COOLING, 
    originalPrice: 4299,
    discountPercent: 19,  // Will calculate to Rs. 3480 (rounded from 3482.19)
    image: '/Images/stand-fan.png',
    badge: 'Eco',
    badgeColor: 'teal',
    shortDescription: 'Powerful 3-speed stand fan with adjustable height and oscillation, ideal for cooling larger rooms or offices.',
    fullDescription: 'High-performance pedestal fan with adjustable height and tilt. Perfect for bedrooms, living rooms, and offices.',
    isFeatured: true,
    features: [
      '16-inch Fan Blades',
      '3 Speed Settings',
      'Adjustable Height (3ft-4ft)',
      '90° Oscillation',
      'Tilt Adjustment',
      'Stable Base Design'
    ],
    specifications: {
      'Blade Size': '16 inches',
      'Speed Levels': '3',
      'Height Range': '3-4 feet',
      'Oscillation': '90 degrees',
      'Power': '55W',
      'Cable Length': '1.5m',
      'Warranty': '1 Year'
    },
    reviews: []
  },

  // Kitchen Appliances
  {
    id: 'panasonic-blender-grinder-agt-1393',
    name: 'Panasonic Blender Grinder 2-in-1',
    category: CATEGORY_VALUES.KITCHEN, 
    originalPrice: 3500, // Placeholder price, please adjust based on market
    discountPercent: 15, // Example discount
    image: '/Images/panasonic-blender-grinder-agt-1393.png', // Assuming this path after image generation
    badge: 'Best Seller',
    badgeColor: 'green',
    shortDescription: 'Powerful 2-in-1 blender and grinder with 100% copper motor for efficient food preparation.',
    fullDescription: 'Experience effortless blending and grinding with the Panasonic AGT-1393. Its robust 100% copper motor ensures durability and superior performance for all your culinary needs, from smoothies to spices. Comes with a 1-year warranty for peace of mind.',
    isFeatured: true,
    features: [
      '2-in-1 Blender & Grinder Functionality',
      '100% Copper Powerful Motor',
      '2 Speeds with Pulse Function',
      'Durable Plastic Jar',
      'Safety Lock System',
      'Easy to Clean Detachable Parts'
    ],
    specifications: {
      'Model Number': 'AGT-1393',
      'Power': '350W',
      'Voltage': '220-240V',
      'Frequency': '50/60Hz',
      'Jar Material': 'High-Grade Plastic',
      'Motor Type': '100% Copper',
      'Speed Settings': '2 Speeds + Pulse',
      'Warranty': '1 Year'
    },
    reviews: [
      {
        name: 'Aisha Khan',
        rating: 5,
        date: '2 months ago',
        comment: 'Fantastic blender! Grinds spices perfectly and makes great smoothies. Very happy with the purchase.'
      },
      {
        name: 'Ali Ahmed',
        rating: 4,
        date: '1 month ago',
        comment: 'Good value for money. Works well for most tasks, though the jar could be a bit larger.'
      }
    ]
  },

  // Personal Care
  {
    id: 'hair-dryer',
    name: 'Professional Hair Dryer',
    category: CATEGORY_VALUES.PERSONAL_CARE, // ✅ Using enum-like constant
    originalPrice: 3499,
    discountPercent: 29,  // Will calculate to Rs. 2480 (rounded from 2484.29)
    image: '/Images/hair-dryer.jpg',
    badge: 'Salon',
    badgeColor: 'pink',
    shortDescription: 'Ionic hair dryer with multiple heat settings and cool shot button for professional styling at home.',
    fullDescription: 'Professional salon-grade hair dryer with advanced ionic technology to reduce frizz and enhance shine. Multiple heat and speed settings for all hair types.',
    isFeatured: true,
    features: [
      '2200W Professional Motor',
      'Ionic Technology',
      '3 Heat & 2 Speed Settings',
      'Cool Shot Button',
      'Concentrator & Diffuser Attachments',
      'Overheat Protection'
    ],
    specifications: {
      'Power': '2200W',
      'Voltage': '220-240V',
      'Heat Settings': '3 (Low/Medium/High)',
      'Speed Settings': '2',
      'Cable Length': '2.5m',
      'Weight': '550g',
      'Warranty': '1 Year'
    },
    reviews: [
      {
        name: 'Aisha Siddiqui',
        rating: 5,
        date: '1 week ago',
        comment: 'Love this hair dryer! Dries my hair quickly without damage. The cool shot feature is amazing.'
      }
    ]
  },

  // Home Appliances
  {
    id: 'national-electric-insect-killer-20w',
    name: 'National Electric Insect Killer (Bug Zapper)',
    category: CATEGORY_VALUES.HOME_APPLIANCES, // Assuming a CATEGORY_VALUES.HOME_APPLIANCES
    originalPrice: 2000, // Placeholder price, please adjust based on current market rate for 20W model
    discountPercent: 0, // No discount example
    image: '/Images/national-electric-insect-killer.png', // Assuming this path after image generation
    badge: 'Pest Control',
    badgeColor: 'blue',
    shortDescription: 'Effective electric insect killer using UV light to attract and instantly zap mosquitoes, flies, and other flying pests.',
    fullDescription: 'This **National Electric Insect Killer** uses advanced UV-A light tubes to lure flying insects into a high-voltage grid, eliminating them instantly. It is non-toxic, odorless, and suitable for use in homes, offices, and commercial spaces. The design allows for both free-standing and hanging placement.',
    isFeatured: true,
    features: [
      'High-Voltage Electric Grid Zapping',
      'UV-A Light for Maximum Insect Attraction',
      'Non-Toxic and Odorless Pest Control',
      'Durable Protective Safety Cage/Mesh',
      'Removable Tray for Easy Cleaning',
      'Suitable for Hanging or Free-Standing Use'
    ],
    specifications: {
      'Brand': 'NATIONAL',
      'Model Number': 'NA3312 / NG-786-210 (Estimated)', // Using common model numbers from search
      'Power': '8W', // Common wattage for this size
      'Input Voltage': 'AC 220–240 V / 50 Hz', // Common voltage for appliances in this region
      'Killing Voltage': 'Approx. 2000-3000V', // Typical high voltage for bug zappers
      'Lamp Type': 'UV-A Tube (or LED tube in newer variants)',
      'Technology': 'Electric Grid Zapping'
    },
    reviews: [
      {
        name: 'Sana Batool',
        rating: 4,
        date: '4 months ago',
        comment: 'Very effective at night! The zapping sound is a little loud, but it definitely works. Easy to clean the tray.'
      }
    ]
 },
  {
    id: 'washing-machine',
    name: 'Automatic Washing Machine 8KG',
    category: CATEGORY_VALUES.HOME_APPLIANCES, // ✅ Using enum-like constant
    originalPrice: 44999,
    discountPercent: 22,  // Will calculate to Rs. 35100 (rounded from 35099.22)
    image: '/Images/washing-machine.png',
    badge: 'Popular',
    badgeColor: 'blue',
    shortDescription: 'Fully automatic front-load washing machine with 8KG capacity, multiple wash programs, and energy-efficient design.',
    fullDescription: 'Advanced washing machine with intelligent sensors and multiple wash programs. Delivers exceptional cleaning performance while being gentle on clothes.',
    isFeatured: true,
    features: [
      '8KG Load Capacity',
      '12 Wash Programs',
      'Digital LED Display',
      'Delay Start Timer (24hr)',
      'Child Lock Safety',
      'Energy Efficient (A++)'
    ],
    specifications: {
      'Type': 'Fully Automatic Front Load',
      'Capacity': '8 KG',
      'Spin Speed': '1200 RPM',
      'Programs': '12',
      'Energy Rating': 'A++',
      'Water Consumption': '45L per cycle',
      'Dimensions': '60x58x85 cm',
      'Warranty': '2 Years (5 Years Motor)'
    },
    reviews: [
      {
        name: 'Bilal Ahmed',
        rating: 5,
        date: '1 month ago',
        comment: 'Excellent washing machine! Very quiet operation and cleans clothes perfectly. Worth every penny.'
      },
      {
        name: 'Nadia Khan',
        rating: 4,
        date: '3 weeks ago',
        comment: 'Great product with many features. Installation was professional. Very satisfied with the purchase.'
      }
    ]
  },
  {
    id: 'water-immersion-rod',
    name: 'Fast Heating Immersion Water Heater Rod',
    category: CATEGORY_VALUES.HOME_APPLIANCES, // Assuming a relevant enum constant for appliances/heating
    originalPrice: 400, // Estimated price
    // Example: No discount applied
    discountPercent: 20, 
    image: '/Images/immersion-rod-combined.png', // Placeholder path for the combined image
    badge: 'Seasonal Essential',
    badgeColor: 'red',
    shortDescription: 'Quick and safe way to heat water. Features anti-corrosive material and a shock-proof plastic handle for safety.',
    fullDescription: 'Heat water quickly and efficiently with this durable immersion rod. Built with **anti-corrosive heating element** and a sturdy **bakelite handle** for user safety, it is perfect for use in buckets and containers for everyday hot water needs.',
    isFeatured: false,
    features: [
        '1200 Watt High-Efficiency Heating',
        'Anti-Corrosive Heating Element (Copper/Nickel Plated)',
        'Shock-Proof Plastic Handle',
        'Minimal Energy Consumption',
        'Fixed Type Heating Element',
        'Easy to Use and Store'
    ],
    specifications: {
        'Power Consumption': '1200W', // Common rating for household use
        'Voltage': '220V-240V AC (Standard)',
        'Element Material': 'Copper with Nickel Plating',
        'Handle Material': 'Bakelite (Heat/Shock Resistant)',
        'Cord Length': 'Approx. 1.5 meters',
        'Safety': 'Shock-Proof Handle'
    },
    reviews: [
        {
            name: 'Farhan S.',
            rating: 4,
            date: '1 month ago',
            comment: 'Heats water very fast, much quicker than my old rod. The handle feels very safe and secure.'
        }
    ]
},
{
    id: 'gas-clothes-iron',
    name: 'Heavy-Duty Gas Clothes Iron (Non-Electric)',
    category: CATEGORY_VALUES.HOME_APPLIANCES, // Can also use TOOLS_AND_MACHINERY or UTILITY
    originalPrice: 1800, // Estimated price
    // Example: Applying an introductory discount
    discountPercent: 0, 
    image: '/Images/gas-iron-main.png', // Placeholder path for the converted image
    badge: 'Classic',
    badgeColor: 'purple',
    shortDescription: 'Reliable, heavy-duty gas iron for crisp ironing without electricity. Ideal for commercial use or areas with frequent power outages.',
    fullDescription: 'This heavy-duty **non-electric gas iron** provides consistent and high heat, perfect for ironing large batches of clothes. It uses a small gas cylinder (LPG) and is a cost-effective, dependable solution for professional laundries and home use during power cuts.',
    isFeatured: true,
    features: [
        'Non-Electric Operation (LPG/Gas)',
        'Heavy-Weight Base for Crisp Creases',
        'Built-in Gas Regulator and Ignition',
        'Durable Chrome-Plated Finish',
        'Large Ironing Surface',
        'Ergonomic Wooden or Heat-Resistant Handle'
    ],
    specifications: {
        'Heat Source': 'LPG/Butane Gas Cylinder (Not Included)',
        'Fuel Consumption': 'Low (Efficient Design)',
        'Base Material': 'Heavy Cast Iron, Chrome Plated',
        'Operation': 'Manual Gas Flow Control',
        'Weight': 'Approx. 5 - 6 kg (Heavy Duty)',
        'Recommended Use': 'Commercial & Household'
    },
    reviews: [
        {
            name: 'Waqas Ali',
            rating: 5,
            date: '3 weeks ago',
            comment: 'Essential tool for my laundry business. Consistent heat and works perfectly even during load shedding. Very durable.'
        }
    ]
},
{
    id: 'national-electric-iron-560b',
    name: 'National Heavy Weight Dry Iron (NI-560B/Similar)',
    category: CATEGORY_VALUES.HOME_APPLIANCES, 
    originalPrice: 3500, // Estimated market price
    // Example: Applying a small promotional discount
    discountPercent: 0, 
    image: '/Images/national-electric-iron.png', // Placeholder path for the converted image
    badge: 'Heavy Duty',
    badgeColor: 'green',
    shortDescription: 'Classic 6lb heavy-weight electric iron with a non-stick soleplate for professional, crisp, and crease-free ironing results.',
    fullDescription: 'Experience effortless ironing with this traditional heavy-weight dry iron. The significant weight (approx. 2.5 kg) and **1000W power** ensure deep heat penetration to quickly remove stubborn wrinkles from all fabric types. Features an adjustable thermostat and non-stick soleplate for smooth gliding and safety.',
    isFeatured: true,
    features: [
        '1000 Watt High Power Element',
        'Approx. 2.5 KG / 6 lb Heavy Weight for Crisp Finish',
        'Non-Stick Coated Soleplate',
        'Built-in Thermostat with 6 Heat Settings',
        'Pilot Lamp Indicator (Heat Ready)',
        'Overheat Protection Safety Feature'
    ],
    specifications: {
        'Type': 'Dry Iron (Non-Steam)',
        'Power Consumption': '1000W',
        'Voltage': '220V-240V AC (Standard)',
        'Soleplate': 'Non-Stick Coated',
        'Weight': 'Approx. 2.5 kg',
        'Safety': 'Overheat Protection, Stable Heel Support'
    },
    reviews: [
        {
            name: 'Samina B.',
            rating: 5,
            date: '1 week ago',
            comment: 'The best iron for getting that professional finish. It heats up fast and the heavy base makes ironing cotton and denim a breeze.'
        }
    ]
}
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    product.fullDescription.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.features.some(f => f.toLowerCase().includes(lowercaseQuery))
  );
};
