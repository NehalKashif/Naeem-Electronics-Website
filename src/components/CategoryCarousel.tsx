'use client';

import React, { JSX } from 'react';
import Link from 'next/link';
import { getActiveCategories } from '@/data/categories';
import { motion } from 'framer-motion';

// Icon mapping for categories
const iconMap: Record<string, JSX.Element> = {
  bulb: (
    <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
    </svg>
  ),
  fan: (
    <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  utensils: (
    <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  ),
  user: (
    <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  ),
  home: (
    <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  tools: (
    <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M14.7 5.3a4 4 0 11-5.657 5.657L4 16v4h4l5.043-5.043A4 4 0 0114.7 5.3zM19 10l-5 5" />
    </svg>
  ),
};

export default function CategoryCarousel() {
  const categories = getActiveCategories();
  
  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <div className="relative overflow-hidden py-6">
      <motion.div
        className="flex gap-8 md:gap-10"
        animate={{
          x: [0, -100 * categories.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedCategories.map((category, index) => (
          <Link
            key={`${category.id}-${index}`}
            href={`/products?category=${category.value}`}
            className="group flex-shrink-0"
          >
            <div className="flex flex-col items-center space-y-3 cursor-pointer">
              {/* Circle with Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-600 group-hover:scale-105 group-hover:border-white shadow-lg">
                {iconMap[category.icon] || iconMap.home}
              </div>
              
              {/* Category Label */}
              <p className="text-white font-semibold text-sm md:text-base group-hover:text-amber-300 transition-colors duration-300">
                {category.label}
              </p>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-900 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-900 to-transparent pointer-events-none"></div>
    </div>
  );
}
