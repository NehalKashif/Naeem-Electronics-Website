'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { categoryService } from '@/services/categoryService';
import { mediaService, MediaFile } from '@/services/mediaService';
import type { Category } from '@/data/categories';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export default function ProductForm({ initialData, onSubmit, isLoading = false }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    originalPrice: initialData?.originalPrice || '',
    discountPercent: initialData?.discountPercent || '',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    badge: initialData?.badge || '',
    badgeColor: initialData?.badgeColor || 'blue',
    isFeatured: initialData?.isFeatured || false,
    image: initialData?.image || '', // Add image URL field
  });
  
  const [features, setFeatures] = useState<string[]>(initialData?.features || ['']);
  const [specifications, setSpecifications] = useState<Record<string, string>>(
    initialData?.specifications || {}
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || '');
  
  // Media Gallery States
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'select'>('upload');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadMediaFiles = async () => {
    try {
      setLoadingMedia(true);
      const response = await mediaService.getAll();
      console.log('Media API Response:', response);
      console.log('Media Files:', response.data);
      setMediaFiles(response.data || []);
    } catch (error) {
      console.error('Failed to load media:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleMediaGalleryOpen = () => {
    setShowMediaGallery(true);
    loadMediaFiles();
  };

  const handleSelectMedia = (media: MediaFile) => {
    setImagePreview(media.url);
    setImageFile(null); // Clear file upload
    setFormData(prev => ({ ...prev, image: media.url }));
    setShowMediaGallery(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSpecificationChange = (key: string, value: string, oldKey?: string) => {
    const newSpecs = { ...specifications };
    if (oldKey && oldKey !== key) {
      delete newSpecs[oldKey];
    }
    newSpecs[key] = value;
    setSpecifications(newSpecs);
  };

  const addSpecification = () => {
    const newKey = `spec_${Object.keys(specifications).length + 1}`;
    setSpecifications({ ...specifications, [newKey]: '' });
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    setSpecifications(newSpecs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('originalPrice', formData.originalPrice.toString());
    if (formData.discountPercent) {
      data.append('discountPercent', formData.discountPercent.toString());
    }
    data.append('shortDescription', formData.shortDescription);
    data.append('fullDescription', formData.fullDescription);
    if (formData.badge) {
      data.append('badge', formData.badge);
      data.append('badgeColor', formData.badgeColor);
    }
    data.append('isFeatured', String(formData.isFeatured));
    
    // Add features
    const validFeatures = features.filter(f => f.trim());
    data.append('features', JSON.stringify(validFeatures));
    
    // Add specifications
    data.append('specifications', JSON.stringify(specifications));
    
    // Add image - either file or URL from selected media
    if (imageFile) {
      data.append('image', imageFile);
    } else if (formData.image) {
      data.append('image', formData.image);
    }

    await onSubmit(data);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Smart LED Bulb 9W"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="flex gap-2">
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <Link
                href="/admin/categories/new"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap flex items-center"
                title="Add new category"
              >
                + New
              </Link>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price (₹) *
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="299"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percent (%)
            </label>
            <input
              type="number"
              name="discountPercent"
              value={formData.discountPercent}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h3>
        
        {/* Upload Mode Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setUploadMode('upload')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              uploadMode === 'upload'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📤 Upload New
          </button>
          <button
            type="button"
            onClick={() => {
              setUploadMode('select');
              handleMediaGalleryOpen();
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              uploadMode === 'select'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🖼️ Choose from Media
          </button>
        </div>

        {/* Upload Mode */}
        {uploadMode === 'upload' && (
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            )}
          </div>
        )}

        {/* Select Mode */}
        {uploadMode === 'select' && imagePreview && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={imagePreview}
                alt="Selected"
                className="w-48 h-48 object-cover rounded-lg border-2 border-blue-500"
              />
              <button
                type="button"
                onClick={handleMediaGalleryOpen}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Change Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Descriptions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              required
              maxLength={150}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief product description (max 150 chars)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description *
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed product description..."
            />
          </div>
        </div>
      </div>

      {/* Badge and Featured */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Text
            </label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Best Seller, New"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Color
            </label>
            <select
              name="badgeColor"
              value={formData.badgeColor}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
              <option value="red">Red</option>
              <option value="teal">Teal</option>
              <option value="indigo">Indigo</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Mark as Featured
            </label>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Features</h3>
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            + Add Feature
          </button>
        </div>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Feature ${index + 1}`}
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-4 py-2 text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
          <button
            type="button"
            onClick={addSpecification}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            + Add Specification
          </button>
        </div>
        <div className="space-y-3">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => handleSpecificationChange(e.target.value, value, key)}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Key (e.g., Power)"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleSpecificationChange(key, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Value (e.g., 9W)"
              />
              <button
                type="button"
                onClick={() => removeSpecification(key)}
                className="px-4 py-2 text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>

    {/* Media Gallery Modal */}
    {showMediaGallery && (
      <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Select Image from Media</h2>
            <button
              type="button"
              onClick={() => setShowMediaGallery(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {loadingMedia ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading media...</p>
            </div>
          ) : mediaFiles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No media files found. Upload some images first!</p>
              <Link
                href="/admin/media"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go to Media Page
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaFiles.map((media) => (
                <div
                  key={media._id}
                  onClick={() => handleSelectMedia(media)}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
                >
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={media.url}
                      alt={media.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate" title={media.filename}>
                      {media.filename}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
}
