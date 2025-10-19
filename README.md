<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Naeem Electronics Website

A modern, responsive e-commerce website for Naeem Electronics - your trusted source for premium electronics and appliances.

## Group Members
- Nehal Kashif FA23-BSE-149
- Muhammad Saud FA23-BSE-133

## Features

### 🛍️ Dynamic Product System
- **Products Page** (`products.html`): Browse all products with category filters
- **Dynamic Product Details** (`product-detail.html`): Each product has its own detail page with specifications, features, and reviews
- **Product Database** (`products-data.js`): Centralized product data management

### 📦 Product Categories
- **Lighting**: Smart LED Bulbs, Emergency Lights
- **Cooling**: Ceiling Fans, Stand Fans
- **Kitchen**: Juicer Machines
- **Personal Care**: Hair Dryers
- **Home Appliances**: Washing Machines

### 🎯 Key Features
- Responsive design for all devices
- Shopping cart with localStorage persistence
- Product filtering by category
- Dynamic product detail pages
- Customer reviews system
- Specifications display
- Related products suggestions
- Quantity selector
- Add to cart functionality
- WhatsApp checkout integration

## Pages

1. **index.html** - Home page with featured products
2. **products.html** - All products page with category filters
3. **product-detail.html** - Dynamic product detail page (URL: `product-detail.html?id=PRODUCT_ID`)
4. **checkout.html** - Checkout page
5. **admin-Orders.html** - Admin orders management
6. **admin-Products.html** - Admin products management

## Products Available

### Lighting
- Smart LED Bulb 12W (Rs. 299)
- Rechargeable Emergency Light (Rs. 1,299)

### Cooling
- Ceiling Fan with LED (Rs. 4,999)
- Adjustable Stand Fan (Rs. 3,499)

### Kitchen
- Professional Juicer Machine (Rs. 8,999)

### Personal Care
- Professional Hair Dryer (Rs. 2,499)

### Home Appliances
- Automatic Washing Machine 8KG (Rs. 34,999)

## How to Use

### Viewing Products
1. Click "View All Products" on the home page
2. Filter products by category
3. Click on any product to view detailed information

### Adding Products
1. Click on a product to view details
2. Select quantity
3. Click "Add to Cart"
4. Review cart in the sidebar
5. Proceed to checkout

### Dynamic Product URLs
Each product can be accessed directly using its ID:
- `product-detail.html?id=smart-led-bulb`
- `product-detail.html?id=juicer-machine`
- `product-detail.html?id=hair-dryer`
- `product-detail.html?id=emergency-light`
- `product-detail.html?id=washing-machine`
- `product-detail.html?id=ceiling-fan`
- `product-detail.html?id=stand-fan`

## Technical Details

### Technologies Used
- HTML5
- TailwindCSS (via CDN)
- Vanilla JavaScript
- LocalStorage for cart persistence

### File Structure
```
Naeem Electronics/
├── index.html              # Home page
├── products.html           # All products page
├── product-detail.html     # Dynamic product detail page
├── checkout.html           # Checkout page
├── admin-Orders.html       # Admin orders
├── admin-Products.html     # Admin products
├── cart.js                 # Shopping cart functionality
├── products-data.js        # Product database
├── checkout-integration.js # Checkout logic
├── README.md              # This file
└── Images/
    ├── smart-led-bulb.png
    ├── emergency-light.svg
    ├── Ceiling-fan.png
    ├── stand-fan.png
    ├── juicer.png
    ├── hair-dryer.svg
    ├── washing-machine.svg
    └── heroBg.jpg
```

## Adding New Products

To add a new product, edit `products-data.js`:

```javascript
{
  id: 'product-id',
  name: 'Product Name',
  category: 'category', // lighting, cooling, kitchen, personal-care, home-appliances
  price: 0,
  originalPrice: 0,
  discount: 0,
  image: 'Images/product.png',
  badge: 'New',
  badgeColor: 'blue',
  shortDescription: 'Short description...',
  fullDescription: 'Full description...',
  features: [
    'Feature 1',
    'Feature 2'
  ],
  specifications: {
    'Spec Name': 'Value'
  },
  reviews: [
    {
      name: 'Customer Name',
      rating: 5,
      date: '1 week ago',
      comment: 'Great product!'
    }
  ]
}
```

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements
- User authentication
- Order tracking
- Payment gateway integration
- Product search functionality
- Wishlist feature
- Product comparison
- Advanced filtering
- Product ratings and reviews submission

## Contact
- 📍 123 Electronic Market, Karachi
- 📞 +92-300-1234567
- 📧 info@naeemelectronics.com
- 🕒 Mon-Sat: 9 AM - 8 PM

---

© 2025 Naeem Electronics. All rights reserved.

>>>>>>> d267ac3090fee5e6ddc207753df698356bc4b413
