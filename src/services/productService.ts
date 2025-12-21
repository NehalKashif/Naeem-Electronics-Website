import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/config/api';
import { Product } from '@/types';

export interface CreateProductData {
  name: string;
  category: string;
  originalPrice: number;
  discountPercent?: number;
  image?: File | string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'pink' | 'red' | 'teal' | 'indigo';
  shortDescription: string;
  fullDescription: string;
  isFeatured?: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  reviews?: any[];
  stock?: number;
  sku?: string;
  brand?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  includeInactive?: boolean;
  page?: number;
  limit?: number;
}

export const productService = {
  // Get all products
  getAll: async (filters?: ProductFilters) => {
    return apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS, filters);
  },

  // Get product by ID
  getById: async (id: string) => {
    return apiClient.get<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id));
  },

  // Get products by category
  getByCategory: async (category: string) => {
    return apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
  },

  // Create product
  create: async (data: CreateProductData | FormData) => {
    // If data is already FormData, use it directly
    if (data instanceof FormData) {
      return apiClient.post<Product>(API_ENDPOINTS.PRODUCTS, data);
    }

    // Otherwise, create FormData from the object
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'features' || key === 'reviews') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'specifications') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return apiClient.post<Product>(API_ENDPOINTS.PRODUCTS, formData);
  },

  // Update product
  update: async (id: string, data: UpdateProductData | FormData) => {
    // If data is already FormData, use it directly
    if (data instanceof FormData) {
      return apiClient.put<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id), data);
    }

    // Otherwise, create FormData from the object
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'features' || key === 'reviews') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'specifications') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return apiClient.put<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id), formData);
  },

  // Delete product
  delete: async (id: string) => {
    return apiClient.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
  },
};
