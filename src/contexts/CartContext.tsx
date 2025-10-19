'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType } from '@/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load cart from localStorage on client side
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('naeemElectronicsCart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('naeemElectronicsCart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const addToCart = (name: string, price: number, img: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === name);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.name === name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      
      return [...prevCart, { name, price, qty: 1, img }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      setCart(prevCart =>
        prevCart.map((item, i) => (i === index ? { ...item, qty: newQty } : item))
      );
    }
  };

  const changeQuantity = (index: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map((item, i) => {
        if (i === index) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      }).filter(item => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((count, item) => count + item.qty, 0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    changeQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
