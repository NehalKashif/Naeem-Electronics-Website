import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/config/api';
import { Category } from '@/types';

export interface CreateCategoryData {
  value: string;
  label: string;
  icon: string;
  description?: string;
  isActive?: boolean;
  order?: number;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

export const categoryService = {
  // Get all categories
  getAll: async (includeInactive?: boolean) => {
    const params = includeInactive ? { includeInactive: 'true' } : undefined;
    return apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES, params);
  },

  // Get category by ID
  getById: async (id: string) => {
    return apiClient.get<Category>(API_ENDPOINTS.CATEGORY_BY_ID(id));
  },

  // Create category
  create: async (data: CreateCategoryData) => {
    return apiClient.post<Category>(API_ENDPOINTS.CATEGORIES, data);
  },

  // Update category
  update: async (id: string, data: UpdateCategoryData) => {
    return apiClient.put<Category>(API_ENDPOINTS.CATEGORY_BY_ID(id), data);
  },

  // Delete category
  delete: async (id: string) => {
    return apiClient.delete(API_ENDPOINTS.CATEGORY_BY_ID(id));
  },
};
