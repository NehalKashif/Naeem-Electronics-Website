'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { products } from '@/data/products';
import { CategoryType, CATEGORIES } from '@/types';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category') as CategoryType | null;
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Set category from URL on mount
  useEffect(() => {
    if (categoryFromUrl && CATEGORIES[categoryFromUrl]) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">All Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">Our Products</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 px-4">
              Explore our complete range of premium electronics and appliances
            </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products... (e.g., LED, Fan, Juicer)"
                className="w-full px-4 py-3 md:px-6 md:py-4 pr-20 md:pr-32 rounded-xl text-gray-800 font-medium text-sm md:text-base border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 shadow-lg placeholder-gray-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-2 md:px-6 md:py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center space-x-1 md:space-x-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 px-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-xl border-2 font-medium transition-all duration-300 text-sm md:text-base ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white border-blue-600'
                : 'border-blue-600 text-blue-600 hover:bg-blue-50'
            }`}
          >
            All Products
          </button>
          {Object.values(CATEGORIES).map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-xl border-2 font-medium transition-all duration-300 text-sm md:text-base ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white border-blue-600'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        </ScrollReveal>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600">Try selecting a different category or search term</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}