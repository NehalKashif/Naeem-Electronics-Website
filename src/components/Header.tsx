'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount, toggleCart } = useCart();
  const cartCount = getCartItemCount();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-3xl text-blue-600 focus:outline-none hover:text-amber-500 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current mb-1 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current mb-1 transition-transform duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
        {/* Brand Name */}
        <Link href="/">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer">
            Naeem Electronics
          </h1>
        </Link>

        {/* Nav links */}
        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex space-y-2 md:space-x-8 md:space-y-0 items-start text-blue-700 font-medium flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white/95 md:bg-transparent shadow-lg md:shadow-none backdrop-blur-md md:backdrop-blur-none p-4 md:p-0`}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="px-4 py-2 rounded-lg hover:text-amber-500 hover:bg-amber-50 transition-all duration-300 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/products"
            onClick={closeMenu}
            className="px-4 py-2 rounded-lg hover:text-amber-500 hover:bg-amber-50 transition-all duration-300 relative group"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/#services"
            onClick={closeMenu}
            className="px-4 py-2 rounded-lg hover:text-amber-500 hover:bg-amber-50 transition-all duration-300 relative group"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/#contact"
            onClick={closeMenu}
            className="px-4 py-2 rounded-lg hover:text-amber-500 hover:bg-amber-50 transition-all duration-300 relative group"
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
