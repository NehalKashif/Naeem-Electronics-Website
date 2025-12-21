'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, AdminUser } from '@/services/authService';
import { getAuthToken, setAuthToken, removeAuthToken } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      
      if (token) {
        try {
          const response = await authService.me();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            removeAuthToken();
            setUser(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          removeAuthToken();
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Periodically check if token is still valid (every 30 seconds)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      try {
        const response = await authService.me();
        if (!response.success || !response.data) {
          removeAuthToken();
          setUser(null);
          router.push('/admin/login');
        }
      } catch (error) {
        removeAuthToken();
        setUser(null);
        router.push('/admin/login');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [user, router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        setAuthToken(response.data.token);
        setUser(response.data.admin);
        router.push('/admin');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
