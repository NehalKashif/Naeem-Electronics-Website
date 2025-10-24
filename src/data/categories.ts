// Category Configuration - Single Source of Truth
// This acts like an enum - all categories must come from here

export interface Category {
  id: string;
  value: string;
  label: string;
  icon: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  order?: number;
}

// ============================================
// CATEGORIES DATA - Single Source of Truth
// ============================================
// When backend is added, this will be fetched from database
// For now, it's a constant array that acts like an enum

export const categories: Category[] = [
  {
    id: '1',
    value: 'lighting',
    label: 'Lighting',
    icon: 'bulb',
    description: 'LED lights, bulbs, and lighting solutions',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    value: 'cooling',
    label: 'Cooling',
    icon: 'fan',
    description: 'Fans, air coolers, and cooling appliances',
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    value: 'kitchen',
    label: 'Kitchen',
    icon: 'utensils',
    description: 'Kitchen appliances and gadgets',
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    value: 'personal-care',
    label: 'Personal Care',
    icon: 'user',
    description: 'Hair dryers, trimmers, and personal care products',
    isActive: true,
    order: 4,
  },
  {
    id: '5',
    value: 'home-appliances',
    label: 'Home Appliances',
    icon: 'home',
    description: 'Washing machines, refrigerators, and home appliances',
    isActive: true,
    order: 5,
  },
  {
    id: '6',
    value: 'tools-and-machinery',
    label: 'Tools & Machinery',
    icon: 'tools',
    description: 'Power tools, hand tools, and machinery',
    isActive: true,
    order: 6,
  }
];

// ============================================
// HELPER FUNCTIONS - Enum-like Access
// ============================================

// Get all active categories (for dropdowns, filters, etc.)
export const getActiveCategories = (): Category[] => {
  return categories.filter(cat => cat.isActive);
};

// Get category by value (validation helper)
export const getCategoryByValue = (value: string): Category | undefined => {
  return categories.find(cat => cat.value === value);
};

// Check if category value is valid (like enum validation)
export const isValidCategory = (value: string): boolean => {
  return categories.some(cat => cat.value === value && cat.isActive);
};

// Get category label by value
export const getCategoryLabel = (value: string): string => {
  const category = getCategoryByValue(value);
  return category?.label || value;
};

// ============================================
// ENUM-LIKE CONSTANTS for easy access
// ============================================
// Use like: CATEGORY_VALUES.LIGHTING
export const CATEGORY_VALUES = {
  LIGHTING: 'lighting',
  COOLING: 'cooling',
  KITCHEN: 'kitchen',
  PERSONAL_CARE: 'personal-care',
  HOME_APPLIANCES: 'home-appliances',
  TOOLS_AND_MACHINERY: 'tools-and-machinery',

} as const;

// Type for category values (creates union type from the array)
export type CategoryValue = typeof categories[number]['value'];

// ============================================
// BACKWARDS COMPATIBILITY
// ============================================
// Export in old format for components that use CATEGORIES
export const CATEGORIES = categories.reduce((acc, cat) => {
  acc[cat.value] = { label: cat.label, value: cat.value };
  return acc;
}, {} as Record<string, { label: string; value: string }>);
