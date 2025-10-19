import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">About Naeem Electronics</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            We are your trusted partner for premium home appliances, smart electronics, and professional
            installation services. Our goal is to deliver quality products and exceptional customer care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-amber-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-amber-500 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-amber-500 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-amber-500 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <span className="font-semibold">Phone:</span>{' '}
              <a href="tel:+923224768011" className="hover:text-amber-500 transition-colors">
                +92 3224768011
              </a>
            </li>
            <li>
              <span className="font-semibold">Email:</span>{' '}
              <a href="mailto:info@naeemelectronics.com" className="hover:text-amber-500 transition-colors">
                info@naeemelectronics.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Address:</span> Rachna town, Ferozwala, Sheikhupura, Pakistan
            </li>
            <li>
              <span className="font-semibold">Hours:</span> Mon – Thurs, Sat: 9:00 AM – 9:00 PM
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
          <p className="text-gray-400 text-sm mb-3">Stay connected through our social channels:</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-amber-500 transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.8h2.6l-.4 3h-2.2v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.5.6-2.33.7a4.1 4.1 0 001.8-2.27 8.4 8.4 0 01-2.6 1 4.16 4.16 0 00-7.1 3.8A11.8 11.8 0 013 4.7a4.1 4.1 0 001.3 5.5 4.06 4.06 0 01-1.9-.5v.1a4.15 4.15 0 003.3 4 4.1 4.1 0 01-1.9.1 4.15 4.15 0 003.9 2.9 8.36 8.36 0 01-5.2 1.8A8.53 8.53 0 012 19a11.78 11.78 0 006.3 1.8c7.6 0 11.8-6.3 11.8-11.8v-.5c.8-.6 1.5-1.3 2.1-2.1z" />
              </svg>
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors" aria-label="Instagram">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-800 text-gray-400 text-center py-4 border-t border-gray-700">
        &copy; 2025 Naeem Electronics. All rights reserved.
      </div>
    </footer>
  );
}
