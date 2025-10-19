// Product Types
export interface Product {
  id: string;
  name: string;
  category: 'lighting' | 'cooling' | 'kitchen' | 'personal-care' | 'home-appliances';
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'pink' | 'red' | 'teal' | 'indigo';
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specifications: Record<string, string>;
  reviews: Review[];
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

// Category Types
export type CategoryType = Product['category'];

export const CATEGORIES: Record<CategoryType, { label: string; value: CategoryType }> = {
  'lighting': { label: 'Lighting', value: 'lighting' },
  'cooling': { label: 'Cooling', value: 'cooling' },
  'kitchen': { label: 'Kitchen', value: 'kitchen' },
  'personal-care': { label: 'Personal Care', value: 'personal-care' },
  'home-appliances': { label: 'Home Appliances', value: 'home-appliances' }
};
