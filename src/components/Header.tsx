'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import type { Category } from '@/data/categories';
import { categoryService } from '@/services/categoryService';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { getCartItemCount, toggleCart } = useCart();
  const router = useRouter();
  const cartCount = getCartItemCount();
  const pathname = usePathname();

  // Load categories from API
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([]);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Used to avoid double-toggle when touchstart is followed by a click event on some devices
  const lastTouchRef = useRef<number>(0);

  const handleCategoryClick = (categoryValue: string) => {
    closeMenu();
    router.push(`/products?category=${categoryValue}`);
  };

  return (
  <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-60 border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Mobile Hamburger */}
        <button
          onClick={() => {
            // Toggle mobile menu and ensure dropdown is closed when opening
            setIsMenuOpen((prev) => {
              const next = !prev;
              if (next) setIsDropdownOpen(false);
              return next;
            });
          }}
          className="md:hidden text-3xl text-blue-600 focus:outline-none hover:text-amber-500 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current mb-1 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current mb-1 transition-transform duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
        {/* Brand Name */}
        <Link href="/" onClick={closeMenu}>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer">
            Naeem Electronics
          </h1>
        </Link>

        {/* Nav links */}
        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex space-y-2 md:space-x-8 md:space-y-0 items-start text-blue-700 font-medium flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white/95 md:bg-transparent shadow-lg md:shadow-none backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 z-50`}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${pathname === '/' ? 'bg-amber-50 text-amber-600' : 'hover:text-amber-500 hover:bg-amber-50'}`}
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Products Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="flex items-center">
              <Link
                href="/products"
                onClick={closeMenu}
                className={`px-4 py-2 rounded-lg transition-all duration-300 relative group flex items-center gap-1 ${pathname?.startsWith('/products') ? 'bg-amber-50 text-amber-600' : 'hover:text-amber-500 hover:bg-amber-50'}`}
              >
                Products
                <span className="hidden md:inline">
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Mobile-only arrow: toggles dropdown without navigating */}
              <button
                type="button"
                className="md:hidden px-2 ml-1 rounded-full text-blue-700 hover:bg-blue-50 transition-colors"
                aria-label="Toggle categories"
                aria-expanded={isDropdownOpen}
                onClick={(e) => {
                  // If a recent touchstart happened, ignore the click to avoid double-toggle
                  const now = Date.now();
                  if (now - lastTouchRef.current < 700) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDropdownOpen((v) => !v);
                }}
                onTouchStart={(e) => {
                  // Mark the time so the following click event can be ignored
                  lastTouchRef.current = Date.now();
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDropdownOpen((v) => !v);
                }}
              >
                <svg className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            <div 
              className={`${
                isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              } absolute md:top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 z-60`}
            >
              <div className="py-2">
                {/* All Products Option */}
                <Link
                  href="/products"
                  onClick={closeMenu}
                  className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>All Products</span>
                  </div>
                </Link>
                
                <div className="border-t border-gray-100 my-2"></div>
                
                {/* Category Options - Dynamic from backend API */}
                {categories && categories.length > 0 && categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryClick(category.value)}
                    className="w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center gap-3"
                  >
                    {/* Category Icon (emoji from backend) */}
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/#services"
            onClick={closeMenu}
            className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${pathname === '/#services' ? 'bg-amber-50 text-amber-600' : 'hover:text-amber-500 hover:bg-amber-50'}`}
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/#contact"
            onClick={closeMenu}
            className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${pathname === '/#contact' ? 'bg-amber-50 text-amber-600' : 'hover:text-amber-500 hover:bg-amber-50'}`}
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* Cart Button */}
        <button
          onClick={toggleCart}
          className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center space-x-2 group"
        >
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span className="font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-1 font-bold animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
