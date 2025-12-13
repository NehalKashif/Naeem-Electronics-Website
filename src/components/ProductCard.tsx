'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getDiscountedPrice, hasDiscount } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '@/config/whatsapp';
import { formatBuyNowMessage } from '@/lib/whatsappMessages';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const finalPrice = getDiscountedPrice(product);
  const showDiscount = hasDiscount(product);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.name, finalPrice, product.image, product.id);
    
    // Show success message
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = formatBuyNowMessage(product.name, product.id);
    openWhatsApp(message);
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
    <>
      {/* Success Message Notification - Fixed at top */}
      {showAddedMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">✓ Added to cart!</span>
        </div>
      )}

      <Link href={`/products/${product.id}`} className="h-full">
        <motion.div 
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 flex flex-col h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-500 p-2"
          />
          {product.badge && (
            <div
              className={`absolute top-2 right-2 ${
                badgeColors[product.badgeColor || 'blue']
              } text-white px-2 py-1 rounded text-xs font-semibold shadow-md`}
            >
              {product.badge}
            </div>
          )}
          {showDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              {product.discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-3 flex flex-col flex-grow">
          {/* Product Name */}
          <h4 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem] md:min-h-[3rem] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h4>

          {/* Product Description - Desktop Only */}
          <p className="hidden md:block text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg md:text-xl font-bold text-blue-600">
                Rs. {finalPrice.toLocaleString()}
              </span>
              {showDiscount && (
                <span className="text-xs md:text-sm line-through text-gray-400">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {/* Buy Now Button - Primary WhatsApp Green */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 md:py-2.5 rounded-lg hover:shadow-lg hover:shadow-green-600/40 transition-all duration-300 font-medium text-xs md:text-sm flex items-center justify-center gap-1 hover:from-green-700 hover:to-green-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Buy Now</span>
              </button>

              {/* Add to Cart Button - Secondary Blue */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 md:py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 font-medium text-xs md:text-sm flex items-center justify-center gap-1 hover:from-blue-700 hover:to-blue-800 hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden sm:inline">Add</span>
                <span className="sm:hidden">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
    </>
  );
}
