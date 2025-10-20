'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { products } from '@/data/products';
import { motion } from 'framer-motion';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.isFeatured);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const firstCard = carouselRef.current.querySelector('.product-card-wrapper') as HTMLElement;
        const cardWidth = firstCard?.offsetWidth || 0;
        const gap = 24; // 6 * 4 = 24px gap
        
        // If at the end, scroll back to start
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by one card width plus gap to show next product
          carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        }
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll handlers
  const scrollLeft = () => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.querySelector('.product-card-wrapper') as HTMLElement;
      const cardWidth = firstCard?.offsetWidth || 0;
      const gap = 24; // 6 * 4 = 24px gap
      carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.querySelector('.product-card-wrapper') as HTMLElement;
      const cardWidth = firstCard?.offsetWidth || 0;
      const gap = 24; // 6 * 4 = 24px gap
      carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
      return () => carousel.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative text-white text-center min-h-[85vh] lg:min-h-[75vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-white rounded-full animate-pulse delay-200"></div>
        </div>

        <div className="relative z-10 text-center py-6 md:py-12 lg:py-16 px-4 max-w-6xl mx-auto w-full">
          <motion.div 
            className="mb-3 md:mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4 shadow-2xl animate-bounce">
              🚚 Free Delivery on Orders Above Rs. 2,000
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium Electronics for{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Modern Living
            </span>
          </motion.h2>
          <motion.p 
            className="max-w-4xl mx-auto mb-5 md:mb-6 text-base md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed backdrop-blur-sm bg-white/10 p-3 md:p-5 rounded-2xl border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover cutting-edge appliances with professional installation & maintenance services.{' '}
            <span className="font-semibold text-amber-300">Transform your home with smart technology today.</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center mb-6 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/products"
              className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 flex items-center space-x-3 shadow-xl"
            >
              <span>Shop Now</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/#services"
              className="group bg-white/15 backdrop-blur-md text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white/25 transition-all duration-500 border-2 border-white/40 hover:border-white/60 flex items-center space-x-3 hover:scale-105 shadow-xl"
            >
              <span>Our Services</span>
              <svg
                className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center">
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '50+', label: 'Premium Products' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="bg-white/10 backdrop-blur-lg p-3 md:p-6 rounded-3xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 group">
                <div className="text-3xl md:text-4xl font-black text-amber-300 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white font-medium text-base md:text-lg">{stat.label}</div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-3 rounded-full"></div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                Our Products
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Featured Products</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our premium collection of smart appliances designed to enhance your modern lifestyle
              </p>
            </div>
          </ScrollReveal>

          {/* Carousel Container */}
          <div className="relative px-12">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-blue-50 transition-all duration-300 ${
                !canScrollLeft ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110 opacity-100'
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-blue-50 transition-all duration-300 ${
                !canScrollRight ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110 opacity-100'
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Products Carousel - Flex Layout */}
            <div
              ref={carouselRef}
              className="overflow-x-auto scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="product-card-wrapper flex-none w-[calc(25%-1.125rem)]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium"
              >
                <span>View All Products</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
                Our Services
              </span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Professional Services</h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                From installations to repairs, Naeem Electronics provides a complete range of electrical services to
                make your life easier and your home or office smarter.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Electrical Installation',
                description:
                  'Certified electricians providing expert installation of home and commercial electrical systems, wiring, lighting, and smart devices with safety assurance.',
                features: ['New wiring & rewiring', 'Smart home setup', 'Lighting solutions'],
              },
              {
                icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Repair & Maintenance',
                description:
                  'Fast and reliable repairs for appliances, fans, lighting systems, and other electronics to keep your home and business running smoothly.',
                features: ['Appliance diagnostics', 'Replacement parts', 'Scheduled maintenance'],
              },
              {
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                title: 'Expert Consultation',
                description:
                  'Get expert advice on energy efficiency, product selection, and customized electrical solutions for your home or business with our certified professionals.',
                features: ['Energy-saving tips', 'Safety inspections', 'Project cost estimates'],
              },
            ].map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/20 transition-all duration-500 border border-white/20 hover:scale-105 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d={service.icon} />
                      </svg>
                    </div>
                  </div>
                  <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-blue-100 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="text-blue-100 space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center space-x-2">
                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-300 font-medium">
                    Learn More
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <h3 className="text-4xl font-bold text-center mb-4 text-blue-900">Get in Touch</h3>
            <p className="text-center text-gray-600 mb-12">
              Have a question or need a quote? Fill out the form below or call us directly — we&apos;d love to hear from you!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-left text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-left text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-left text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+92 300 1234567"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-left text-gray-700 font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Write your message here..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
