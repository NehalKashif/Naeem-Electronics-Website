// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Storage keys
export const AUTH_TOKEN_KEY = 'admin_token';
export const USER_DATA_KEY = 'admin_user';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  
  // Admins
  ADMINS: '/admins',
  ADMIN_BY_ID: (id: string) => `/admins/${id}`,
  CHANGE_PASSWORD: (id: string) => `/admins/${id}/password`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  
  // Media
  MEDIA: '/media',
  MEDIA_BY_ID: (id: string) => `/media/${id}`,
} as const;
