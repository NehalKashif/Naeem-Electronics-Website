import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/config/api';
import { AdminUser } from './authService';

export interface CreateAdminData {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'superadmin';
  isActive?: boolean;
}

export interface UpdateAdminData {
  username?: string;
  email?: string;
  role?: 'admin' | 'superadmin';
  isActive?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const adminService = {
  // Get all admins
  getAll: async () => {
    return apiClient.get<AdminUser[]>(API_ENDPOINTS.ADMINS);
  },

  // Get admin by ID
  getById: async (id: string) => {
    return apiClient.get<AdminUser>(API_ENDPOINTS.ADMIN_BY_ID(id));
  },

  // Create admin
  create: async (data: CreateAdminData) => {
    return apiClient.post<AdminUser>(API_ENDPOINTS.ADMINS, data);
  },

  // Update admin
  update: async (id: string, data: UpdateAdminData) => {
    return apiClient.put<AdminUser>(API_ENDPOINTS.ADMIN_BY_ID(id), data);
  },

  // Change password
  changePassword: async (id: string, data: ChangePasswordData) => {
    return apiClient.put(API_ENDPOINTS.CHANGE_PASSWORD(id), data);
  },

  // Delete admin
  delete: async (id: string) => {
    return apiClient.delete(API_ENDPOINTS.ADMIN_BY_ID(id));
  },
};
