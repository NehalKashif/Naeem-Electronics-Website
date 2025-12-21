import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/config/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'superadmin';
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials) => {
    return apiClient.post<{ admin: AdminUser; token: string }>(
      API_ENDPOINTS.LOGIN,
      credentials
    );
  },

  // Register
  register: async (data: RegisterData) => {
    return apiClient.post<{ admin: AdminUser; token: string }>(
      API_ENDPOINTS.REGISTER,
      data
    );
  },

  // Get current user
  me: async () => {
    return apiClient.get<AdminUser>(API_ENDPOINTS.ME);
  },
};
