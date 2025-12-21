'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import ProductForm from '@/components/admin/ProductForm';
import { productService } from '@/services/productService';

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      await productService.create(formData);
      router.push('/admin/products');
    } catch (err: any) {
      console.error('Failed to create product:', err);
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
            <p className="text-gray-600 mt-2">Add a new product to your store</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
