'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { products } from '@/data/products';
import { motion } from 'framer-motion';

// ============================================
// ADMIN PANEL EDITABLE CONTENT (CONSTANTS)
// ============================================
// TODO: These will be fetched from database via API in future
// For now, keeping them as constants for easy identification and management

const SITE_SETTINGS = {
  // Contact Information
  whatsappNumber: '923224768011', // Format: country code + number (no +, spaces, or dashes)
  phoneNumber: '+92 322 4768011',
  email: 'info@naeemelectronics.com',
  address: 'Rachna town, Ferozwala, Sheikhupura, Pakistan',
  
  // Business Settings
  freeDeliveryThreshold: 2000,
  currency: 'Rs.',
  
  // Social Media (for footer)
  facebook: 'https://facebook.com/naeemelectronics',
  instagram: 'https://instagram.com/naeemelectronics',
  twitter: 'https://twitter.com/naeemelectronics',
};

const HERO_SECTION = {
  promoBanner: '🚚 Free Delivery on Orders Above Rs. 2,000',
  mainHeading: 'Premium Electronics for',
  highlightedText: 'Modern Living',
  description: 'Discover cutting-edge appliances with professional installation & maintenance services.',
  highlightedDescription: 'Transform your home with smart technology today.',
  
  // Call-to-Action Buttons
  primaryButton: {
    text: 'Shop Now',
    link: '/products',
  },
  secondaryButton: {
    text: 'Our Services',
    link: '/#services',
  },
  
  // Statistics
  stats: [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Premium Products' },
    { number: '24/7', label: 'Customer Support' },
  ],
};

const PRODUCTS_SECTION = {
  badge: 'Our Products',
  heading: 'Featured Products',
  description: 'Discover our premium collection of smart appliances designed to enhance your modern lifestyle',
  viewAllButtonText: 'View All Products',
};

const SERVICES_SECTION = {
  badge: 'Our Services',
  heading: 'Professional Services',
  description: 'From installations to repairs, Naeem Electronics provides a complete range of electrical services to make your life easier and your home or office smarter.',
  
  services: [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Electrical Installation',
      description: 'Certified electricians providing expert installation of home and commercial electrical systems, wiring, lighting, and smart devices with safety assurance.',
      features: ['New wiring & rewiring', 'Smart home setup', 'Lighting solutions'],
      serviceType: 'installation',
      whatsappMessage: `Hello Naeem Electronics! 👋\n\nI'm interested in learning more about your *Electrical Installation Services*. I would like to know about:\n\n• New wiring & rewiring\n• Smart home setup\n• Lighting solutions\n\nCould you please provide more information?`,
    },
    {
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Repair & Maintenance',
      description: 'Fast and reliable repairs for appliances, fans, lighting systems, and other electronics to keep your home and business running smoothly.',
      features: ['Appliance diagnostics', 'Replacement parts', 'Scheduled maintenance'],
      serviceType: 'repair',
      whatsappMessage: `Hello Naeem Electronics! 👋\n\nI'm interested in your *Repair & Maintenance Services*. I need help with:\n\n• Appliance diagnostics\n• Replacement parts\n• Scheduled maintenance\n\nCan you assist me?`,
    },
    {
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      title: 'Expert Consultation',
      description: 'Get expert advice on energy efficiency, product selection, and customized electrical solutions for your home or business with our certified professionals.',
      features: ['Energy-saving tips', 'Safety inspections', 'Project cost estimates'],
      serviceType: 'consultation',
      whatsappMessage: `Hello Naeem Electronics! 👋\n\nI would like to schedule an *Expert Consultation* regarding:\n\n• Energy-saving tips\n• Safety inspections\n• Project cost estimates\n\nWhen would be a good time to discuss?`,
    },
  ],
};

const CONTACT_SECTION = {
  heading: 'Get in Touch',
  description: 'Have a question or need a quote? Fill out the form below — we\'d love to hear from you!',
  submitButtonText: 'Send Message',
  sendingButtonText: 'Sending...',
  successMessage: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!',
  errorMessage: 'Oops! Something went wrong. Please try again or contact us directly.',
};

// ============================================
// END OF ADMIN PANEL EDITABLE CONTENT
// ============================================

export default function HomePage() {
  const featuredProducts = products.filter(p => p.isFeatured);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setSubmitStatus({
        type: 'success',
        message: CONTACT_SECTION.successMessage,
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: CONTACT_SECTION.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle WhatsApp contact for services
  const handleWhatsAppContact = (serviceType: string) => {
    // Find the service and get its WhatsApp message
    const service = SERVICES_SECTION.services.find(s => s.serviceType === serviceType);
    const message = service?.whatsappMessage || 'Hello! I would like to know more about your services.';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

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
              {HERO_SECTION.promoBanner}
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {HERO_SECTION.mainHeading}{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {HERO_SECTION.highlightedText}
            </span>
          </motion.h2>
          <motion.p 
            className="max-w-4xl mx-auto mb-5 md:mb-6 text-base md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed backdrop-blur-sm bg-white/10 p-3 md:p-5 rounded-2xl border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {HERO_SECTION.description}{' '}
            <span className="font-semibold text-amber-300">{HERO_SECTION.highlightedDescription}</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center mb-6 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href={HERO_SECTION.primaryButton.link}
              className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 flex items-center space-x-3 shadow-xl"
            >
              <span>{HERO_SECTION.primaryButton.text}</span>
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
              href={HERO_SECTION.secondaryButton.link}
              className="group bg-white/15 backdrop-blur-md text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white/25 transition-all duration-500 border-2 border-white/40 hover:border-white/60 flex items-center space-x-3 hover:scale-105 shadow-xl"
            >
              <span>{HERO_SECTION.secondaryButton.text}</span>
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
            {HERO_SECTION.stats.map((stat, index) => (
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
                {PRODUCTS_SECTION.badge}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{PRODUCTS_SECTION.heading}</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {PRODUCTS_SECTION.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Carousel Container */}
          <div className="relative px-4 md:px-12">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 md:p-3 hover:bg-blue-50 transition-all duration-300 ${
                !canScrollLeft ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110 opacity-100'
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 md:p-3 hover:bg-blue-50 transition-all duration-300 ${
                !canScrollRight ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110 opacity-100'
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Products Carousel - Flex Layout */}
            <div
              ref={carouselRef}
              className="overflow-x-auto scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="product-card-wrapper flex-none w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)]">
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
                <span>{PRODUCTS_SECTION.viewAllButtonText}</span>
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
                {SERVICES_SECTION.badge}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">{SERVICES_SECTION.heading}</h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {SERVICES_SECTION.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_SECTION.services.map((service, index) => (
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
                  <button 
                    onClick={() => handleWhatsAppContact(service.serviceType)}
                    className="bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-300 font-medium flex items-center justify-center space-x-2 mx-auto group/btn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-12 md:py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-3 text-blue-900">{CONTACT_SECTION.heading}</h3>
            <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
              {CONTACT_SECTION.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-xl shadow-lg p-5 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-left text-gray-700 font-medium mb-1 text-sm">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-left text-gray-700 font-medium mb-1 text-sm">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-left text-gray-700 font-medium mb-1 text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-left text-gray-700 font-medium mb-1 text-sm">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Write your message here..."
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all resize-none"
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div
                    className={`p-3 rounded-lg flex items-start space-x-2 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p
                      className={`text-xs md:text-sm font-medium ${
                        submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center space-x-2 mx-auto min-w-[140px] text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>{CONTACT_SECTION.sendingButtonText}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                        <span>{CONTACT_SECTION.submitButtonText}</span>
                      </>
                    )}
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
