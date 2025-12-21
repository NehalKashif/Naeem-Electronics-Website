'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import { mediaService } from '@/services/mediaService';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    media: 0,
    loading: true,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsRes, categoriesRes, mediaRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
        mediaService.getAll(),
      ]);

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        media: mediaRes.count || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link href="/admin/products" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    📦
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.loading ? '...' : stats.products}
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/admin/categories" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    📂
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.loading ? '...' : stats.categories}
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/admin/media" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                    🖼️
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Media Files</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.loading ? '...' : stats.media}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/products/new"
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-medium"
              >
                + Add Product
              </Link>
              <Link
                href="/admin/categories/new"
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center font-medium"
              >
                + Add Category
              </Link>
              <Link
                href="/admin/media"
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center font-medium"
              >
                Upload Media
              </Link>
              <Link
                href="/admin/admins/new"
                className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-center font-medium"
              >
                + Add Admin
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
