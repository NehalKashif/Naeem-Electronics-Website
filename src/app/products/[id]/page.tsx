'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.name, product.price, product.image);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-8">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative h-96 md:h-full bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
            {product.badge && (
              <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold text-white ${
                product.badge === 'Best Seller' ? 'bg-gradient-gold' :
                product.badge === 'New Arrival' ? 'bg-gradient-electric' :
                'bg-green-500'
              }`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(averageRating) ? '★' : 
                       i < averageRating ? '½' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  ({averageRating.toFixed(1)} • {product.reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">Rs. {product.price.toLocaleString()}</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">{product.fullDescription}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-electric text-white hover:shadow-electric'
                }`}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="border-t px-8 py-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b border-gray-200 py-2">
                <span className="w-1/2 font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="w-1/2 text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="border-t px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
