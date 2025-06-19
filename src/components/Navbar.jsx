import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Array of objects with name and path
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const isLoggedIn = true;
const cartItemCount = 3;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-semibold text-[#0d99ff] tracking-wide">Tikoshi</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 text-sm font-medium">
          {navLinks.map(({ name, path }) => (
            <a
              key={name}
              href={path}
              className="relative transition duration-200 hover:text-[#0d99ff] hover:underline underline-offset-4"
            >
              {name}
            </a>
          ))}

          {/* Auth Actions */}
          {isLoggedIn ? (
            <a href="/cart" className="relative text-[#0d99ff] hover:underline">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartItemCount}
                </span>
              )}
            </a>
          ) : (
            <a href="/login" className="text-[#0d99ff] hover:underline">
              Sign In
            </a>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? (
              <X className="w-6 h-6 cursor-pointer text-[#0d99ff]" />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer text-[#0d99ff]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white rounded-md mt-2 mx-2"
          >
            <div className="flex flex-col space-y-4 px-4 py-4 text-gray-700 font-medium">
              {navLinks.map(({ name, path }) => (
                <a
                  key={name}
                  href={path}
                  className="hover:text-[#0d99ff] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </a>
              ))}

              {isLoggedIn ? (
                <a
                  href="/cart"
                  className="flex items-center gap-2 text-[#0d99ff] hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {cartItemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1 py-0.5">
                      {cartItemCount}
                    </span>
                  )}
                </a>
              ) : (
                <a
                  href="/login"
                  className="text-[#0d99ff] hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
