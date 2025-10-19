// Shared Cart System with LocalStorage
class ShoppingCart {
  constructor() {
    this.cart = this.loadCart();
    this.init();
  }

  init() {
    // Initialize cart UI elements
    this.cartButton = document.getElementById('cartButton');
    this.cartSidebar = document.getElementById('cartSidebar');
    this.cartItemsEl = document.getElementById('cartItems');
    this.cartTotalEl = document.getElementById('cartTotal');
    this.cartCountEl = document.getElementById('cartCount');
    this.closeCartBtn = document.getElementById('closeCart');

    // Bind event listeners
    if (this.cartButton) {
      this.cartButton.addEventListener('click', () => this.toggleCart());
    }
    if (this.closeCartBtn) {
      this.closeCartBtn.addEventListener('click', () => this.closeCart());
    }

    // Update cart display on page load
    this.updateCartDisplay();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem('naeemElectronicsCart');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('naeemElectronicsCart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  addToCart(name, price, img = '') {
    // Check if item already exists
    const existingItem = this.cart.find(item => item.name === name);
    
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      this.cart.push({
        name: name,
        price: price,
        qty: 1,
        img: img || 'Images/default-product.png'
      });
    }
    
    this.saveCart();
    this.updateCartDisplay();
    this.showAddedNotification(name);
  }

  removeFromCart(index) {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.updateCartDisplay();
    }
  }

  updateQuantity(index, newQty) {
    if (index >= 0 && index < this.cart.length) {
      if (newQty <= 0) {
        this.removeFromCart(index);
      } else {
        this.cart[index].qty = newQty;
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  changeQuantity(index, delta) {
    if (index >= 0 && index < this.cart.length) {
      const newQty = this.cart[index].qty + delta;
      this.updateQuantity(index, newQty);
    }
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }

  getCartItemCount() {
    return this.cart.reduce((count, item) => count + item.qty, 0);
  }

  updateCartDisplay() {
    // Update cart count badge
    if (this.cartCountEl) {
      this.cartCountEl.textContent = this.getCartItemCount();
    }

    // Update cart total
    if (this.cartTotalEl) {
      this.cartTotalEl.textContent = this.getCartTotal().toLocaleString();
    }

    // Update cart items list
    if (this.cartItemsEl) {
      this.cartItemsEl.innerHTML = '';
      
      if (this.cart.length === 0) {
        this.cartItemsEl.innerHTML = `
          <li class="flex flex-col items-center justify-center p-8 text-gray-500">
            <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
            </svg>
            <p class="text-lg font-medium">Your cart is empty</p>
            <p class="text-sm">Add some products to get started!</p>
          </li>
        `;
        return;
      }

      this.cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-center p-4 border-b border-gray-100 last:border-b-0';
        li.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4 flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h5 class="font-medium text-gray-900 truncate">${item.name}</h5>
            <p class="text-sm text-gray-500">Rs. ${item.price.toLocaleString()}</p>
            <div class="flex items-center mt-2">
              <button onclick="cart.changeQuantity(${index}, -1)" 
                      class="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <span class="text-lg leading-none">−</span>
              </button>
              <span class="px-3 py-1 mx-2 bg-gray-100 rounded text-sm font-medium">${item.qty}</span>
              <button onclick="cart.changeQuantity(${index}, 1)" 
                      class="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <span class="text-lg leading-none">+</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col items-end ml-4">
            <button onclick="cart.removeFromCart(${index})" 
                    class="text-red-500 hover:text-red-700 text-xl font-bold mb-2 w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors">
              ×
            </button>
            <p class="font-bold text-gray-900">Rs. ${(item.price * item.qty).toLocaleString()}</p>
          </div>
        `;
        this.cartItemsEl.appendChild(li);
      });
    }
  }

  toggleCart() {
    if (this.cartSidebar) {
      this.cartSidebar.classList.toggle('translate-x-full');
    }
  }

  openCart() {
    if (this.cartSidebar) {
      this.cartSidebar.classList.remove('translate-x-full');
    }
  }

  closeCart() {
    if (this.cartSidebar) {
      this.cartSidebar.classList.add('translate-x-full');
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartDisplay();
  }

  showAddedNotification(productName) {
    // Create and show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-[60] transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>${productName} added to cart!</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    // Animate cart button
    if (this.cartButton) {
      this.cartButton.classList.add('animate-pulse');
      setTimeout(() => this.cartButton.classList.remove('animate-pulse'), 1000);
    }
  }

  // Get cart data for checkout
  getCartData() {
    return {
      items: this.cart,
      total: this.getCartTotal(),
      itemCount: this.getCartItemCount()
    };
  }
}

// Initialize cart when DOM is loaded
let cart;
document.addEventListener('DOMContentLoaded', () => {
  cart = new ShoppingCart();
});

// Global functions for backwards compatibility
function addToCart(name, price, img) {
  if (cart) {
    cart.addToCart(name, price, img);
  }
}

function removeFromCart(index) {
  if (cart) {
    cart.removeFromCart(index);
  }
}

function changeQty(index, delta) {
  if (cart) {
    cart.changeQuantity(index, delta);
  }
}