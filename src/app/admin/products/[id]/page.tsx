'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import ProductForm from '@/components/admin/ProductForm';
import { productService } from '@/services/productService';
import { Product } from '@/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const response = await productService.getById(productId);
      setProduct(response.data || null);
    } catch (err: any) {
      console.error('Failed to load product:', err);
      setLoadError(err.response?.data?.message || 'Failed to load product');
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      await productService.update(productId, formData);
      router.push('/admin/products');
    } catch (err: any) {
      console.error('Failed to update product:', err);
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadError) {
    return (
      <ProtectedRoute>
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {loadError}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!product) {
    return (
      <ProtectedRoute>
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading product...</div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600 mt-2">Update product information</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <ProductForm 
            initialData={product} 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
