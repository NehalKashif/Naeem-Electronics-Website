// Checkout Integration Script
// This script automatically loads cart data from localStorage and displays it on checkout page

// Create checkout integration class
class CheckoutIntegration {
  constructor() {
    this.cartData = this.loadCartFromStorage();
    this.initializeCheckout();
  }

  loadCartFromStorage() {
    try {
      const stored = localStorage.getItem('naeemElectronicsCart');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }

  initializeCheckout() {
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', () => {
      this.updateCheckoutSummary();
    });
  }

  updateCheckoutSummary() {
    const orderItemsEl = document.getElementById('orderItems');
    const itemCountEl = document.getElementById('itemCount');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    if (!orderItemsEl) return;

    orderItemsEl.innerHTML = '';
    let subtotal = 0;
    let itemCount = 0;

    if (this.cartData.length === 0) {
      orderItemsEl.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-gray-500">
          <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
          </svg>
          <p class="text-lg font-medium">Your cart is empty</p>
          <a href="index.html#products" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Continue Shopping</a>
        </div>
      `;
      return;
    }

    this.cartData.forEach((item, index) => {
      subtotal += item.price * item.qty;
      itemCount += item.qty;

      const div = document.createElement('div');
      div.className = 'flex items-start p-4 border-b border-gray-100';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4 flex-shrink-0">
        <div class="flex-1">
          <h4 class="font-medium text-gray-900">${item.name}</h4>
          <p class="text-sm text-gray-500">Rs. ${item.price.toLocaleString()}</p>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="checkoutIntegration.updateQuantity(${index}, ${item.qty - 1})" 
                  class="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <span class="text-lg leading-none">−</span>
          </button>
          <span class="px-3 py-1 bg-gray-100 rounded text-sm font-medium">${item.qty}</span>
          <button onclick="checkoutIntegration.updateQuantity(${index}, ${item.qty + 1})" 
                  class="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <span class="text-lg leading-none">+</span>
          </button>
          <button onclick="checkoutIntegration.removeItem(${index})" 
                  class="text-red-500 hover:text-red-700 text-xl font-bold w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors ml-2">
            ×
          </button>
          <p class="font-bold text-gray-900 ml-4">Rs. ${(item.price * item.qty).toLocaleString()}</p>
        </div>
      `;
      orderItemsEl.appendChild(div);
    });

    if (itemCountEl) itemCountEl.textContent = itemCount;
    if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString();
    if (totalEl) totalEl.textContent = subtotal.toLocaleString();
  }

  updateQuantity(index, newQty) {
    if (newQty <= 0) {
      this.removeItem(index);
    } else {
      this.cartData[index].qty = newQty;
      this.saveCart();
      this.updateCheckoutSummary();
      this.updateNavCartCount();
    }
  }

  removeItem(index) {
    this.cartData.splice(index, 1);
    this.saveCart();
    this.updateCheckoutSummary();
    this.updateNavCartCount();
  }

  saveCart() {
    try {
      localStorage.setItem('naeemElectronicsCart', JSON.stringify(this.cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  updateNavCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
      const totalItems = this.cartData.reduce((count, item) => count + item.qty, 0);
      cartCountEl.textContent = totalItems;
    }
  }

  getTotal() {
    return this.cartData.reduce((total, item) => total + (item.price * item.qty), 0);
  }

  getItemCount() {
    return this.cartData.reduce((count, item) => count + item.qty, 0);
  }
}

// Initialize checkout integration if on checkout page
let checkoutIntegration;
if (window.location.pathname.includes('checkout.html')) {
  checkoutIntegration = new CheckoutIntegration();
}