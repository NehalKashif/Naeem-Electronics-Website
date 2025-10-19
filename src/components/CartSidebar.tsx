'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    closeCart,
    getCartTotal,
    removeFromCart,
    changeQuantity,
  } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 w-96 max-w-full bg-white/95 backdrop-blur-md shadow-2xl h-full transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 z-50 flex flex-col border-l border-gray-200`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <h4 className="text-xl font-bold flex items-center space-x-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span>Shopping Cart</span>
        </h4>
        <button
          onClick={closeCart}
          className="text-white hover:text-amber-300 text-2xl font-bold transition-colors"
          aria-label="Close cart"
        >
          &times;
        </button>
      </div>

      {/* Cart Items */}
      <ul className="flex-1 overflow-y-auto divide-y">
        {cart.length === 0 ? (
          <li className="flex flex-col items-center justify-center p-8 text-gray-500">
            <svg
              className="w-16 h-16 mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
              />
            </svg>
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm">Add some products to get started!</p>
          </li>
        ) : (
          cart.map((item, index) => (
            <li key={index} className="flex items-center p-4 border-b border-gray-100 last:border-b-0">
              <Image
                src={item.img}
                alt={item.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-lg mr-4 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-gray-900 truncate">{item.name}</h5>
                <p className="text-sm text-gray-500">Rs. {item.price.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => changeQuantity(index, -1)}
                    className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg leading-none">−</span>
                  </button>
                  <span className="px-3 py-1 mx-2 bg-gray-100 rounded text-sm font-medium">{item.qty}</span>
                  <button
                    onClick={() => changeQuantity(index, 1)}
                    className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg leading-none">+</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end ml-4">
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold mb-2 w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  ×
                </button>
                <p className="font-bold text-gray-900">Rs. {(item.price * item.qty).toLocaleString()}</p>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Subtotal & Actions */}
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <p className="flex justify-between font-semibold mb-4">
            <span>Subtotal:</span>
            <span>Rs. {getCartTotal().toLocaleString()} PKR</span>
          </p>
          <div className="flex flex-col space-y-2">
            <button
              onClick={closeCart}
              className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Continue Shopping
            </button>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors"
            >
              <span>Checkout</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.285 6.709a1 1 0 0 0-1.41 0L9 16.584l-3.875-3.875a1 1 0 0 0-1.41 1.414l4.585 4.586a1 1 0 0 0 1.41 0l10.585-10.586a1 1 0 0 0 0-1.414z" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
