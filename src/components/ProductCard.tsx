'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.name, product.price, product.image);
  };

  const badgeColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    red: 'bg-red-500',
    teal: 'bg-teal-500',
    indigo: 'bg-indigo-500',
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div 
        className="bg-white shadow-lg rounded-2xl p-4 md:p-6 hover:transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 flex flex-col h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative overflow-hidden rounded-xl mb-4 md:mb-6 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-32 md:h-48 object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          {product.badge && (
            <div
              className={`absolute top-2 md:top-3 right-2 md:right-3 ${
                badgeColors[product.badgeColor || 'blue']
              } text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium`}
            >
              {product.badge}
            </div>
          )}
        </div>
        <div className="space-y-2 md:space-y-3 flex-grow flex flex-col">
          <h4 className="text-base md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed flex-grow hidden md:block">
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline space-x-1 md:space-x-2">
              <span className="text-lg md:text-2xl font-bold text-blue-600">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm md:text-lg line-through text-gray-400">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.discount && (
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 font-medium group-hover:transform group-hover:scale-105 mt-3 md:mt-4 text-sm md:text-base"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
