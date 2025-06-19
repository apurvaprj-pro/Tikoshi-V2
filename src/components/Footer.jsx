import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 px-6 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Us */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            Tikoshi is committed to providing the best products and customer service. Shop with confidence and convenience.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Shop</a></li>
            <li><a href="#" className="hover:text-blue-600">About</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-blue-600">Payment Methods</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-700">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-600">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-600">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tikoshi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
