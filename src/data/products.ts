import { Product } from '@/types';

export const products: Product[] = [
  // Lighting Products
  {
    id: 'smart-led-bulb',
    name: 'Smart LED Bulb 12W',
    category: 'lighting',
    price: 299,
    originalPrice: 399,
    discount: 25,
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
      'Warranty': '2 Years'
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
  {
    id: 'emergency-light',
    name: 'Rechargeable Emergency Light',
    category: 'lighting',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    image: '/Images/emergency-light.png',
    badge: 'Essential',
    badgeColor: 'red',
    shortDescription: 'Powerful LED emergency light with 8+ hours backup, perfect for load shedding and outdoor activities.',
    fullDescription: 'Never be left in the dark during power outages. This powerful emergency light provides bright illumination for hours with its long-lasting battery.',
    isFeatured: true,
    features: [
      '24 High-Power LED Bulbs',
      '8+ Hours Backup Time',
      'Portable & Wall-Mountable',
      'Overcharge Protection',
      'Dual Light Modes (Bright/Dim)',
      'Fast Charging Technology'
    ],
    specifications: {
      'LED Count': '24 SMD LEDs',
      'Battery': '4V 6Ah Lead Acid',
      'Charging Time': '8-10 Hours',
      'Backup Time': '8-12 Hours',
      'Light Modes': '2 (High/Low)',
      'Weight': '800g',
      'Warranty': '1 Year'
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

  // Cooling Products
  {
    id: 'ceiling-fan',
    name: 'Ceiling Fan with LED',
    category: 'cooling',
    price: 4999,
    originalPrice: 6499,
    discount: 23,
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
    category: 'cooling',
    price: 3499,
    originalPrice: 4299,
    discount: 19,
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
    id: 'juicer-machine',
    name: 'Professional Juicer Machine',
    category: 'kitchen',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    image: '/Images/juicer-machine.jpg',
    badge: 'Pro',
    badgeColor: 'purple',
    shortDescription: 'High-power stainless steel juicer designed for fast and efficient juice extraction, ideal for home or commercial use.',
    fullDescription: 'Professional-grade juicer with powerful motor and stainless steel construction. Extract maximum juice from fruits and vegetables with ease.',
    isFeatured: true,
    features: [
      '800W Powerful Motor',
      'Stainless Steel Blades & Body',
      'Large 1.5L Juice Container',
      'Pulp Separator',
      'Safety Lock System',
      'Easy to Clean Design'
    ],
    specifications: {
      'Motor Power': '800W',
      'Speed': '18000 RPM',
      'Juice Container': '1.5 Liters',
      'Pulp Container': '2 Liters',
      'Material': 'Stainless Steel 304',
      'Feed Tube': '75mm Wide',
      'Warranty': '2 Years'
    },
    reviews: [
      {
        name: 'Fatima Malik',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excellent juicer! Makes fresh juice in seconds. Easy to clean and very sturdy.'
      }
    ]
  },

  // Personal Care
  {
    id: 'hair-dryer',
    name: 'Professional Hair Dryer',
    category: 'personal-care',
    price: 2499,
    originalPrice: 3499,
    discount: 29,
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
    id: 'washing-machine',
    name: 'Automatic Washing Machine 8KG',
    category: 'home-appliances',
    price: 34999,
    originalPrice: 44999,
    discount: 22,
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
