// Import category value type from categories data
import type { CategoryValue } from '@/data/categories';

// Product Types
export interface Product {
  id: string;
  name: string;
  category: CategoryValue; // ✅ Now uses enum-like category values
  originalPrice: number;        // Base/MRP price (required)
  discountPercent?: number;     // Discount % (optional: 0-100, null = no discount)
  image: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'pink' | 'red' | 'teal' | 'indigo';
  shortDescription: string;
  fullDescription: string;
  isFeatured?: boolean;
  features: string[];
  specifications: Record<string, string>;
  reviews: Review[];
}

// Helper function to calculate discounted price (rounded to nearest 10)
export function getDiscountedPrice(product: Product): number {
  if (!product.discountPercent || product.discountPercent <= 0) {
    return product.originalPrice;
  }
  const discounted = product.originalPrice * (1 - product.discountPercent / 100);
  // Round to nearest 10
  return Math.round(discounted / 10) * 10;
}

// Helper to check if product has active discount
export function hasDiscount(product: Product): boolean {
  return !!(product.discountPercent && product.discountPercent > 0);
}

// Review Types
export interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

// Cart Types
export interface CartItem {
  name: string;
  price: number;
  qty: number;
  img: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (name: string, price: number, img: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQty: number) => void;
  changeQuantity: (index: number, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// Category Types - Now imported from categories.ts for consistency
export type CategoryType = CategoryValue;

// Re-export categories and helper functions for backwards compatibility
export { 
  categories,
  CATEGORIES, 
  CATEGORY_VALUES,
  getActiveCategories,
  getCategoryByValue,
  isValidCategory,
  getCategoryLabel
} from '@/data/categories';

export type { Category } from '@/data/categories';
