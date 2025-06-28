import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'My Orders', path: '/my-orders' },
  { name: 'Wishlist', path: '/my-wishlist' },
];

const isLoggedIn = true;
const cartItemCount = 3;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      setSearchQuery(suggestions[activeIndex].name);
      applySuggestion(suggestions[activeIndex].name);
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const applySuggestion = (name) => {
    setSearchQuery(name);
    navigate(`/search?query=${encodeURIComponent(name)}`);
    setSuggestions([]);
    setActiveIndex(-1);
  };
  return (
    <nav className="bg-white border-b border-gray-300 px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#0d99ff]">Tikoshi</Link>

        {/* Search - Centered */}
        <form
          onSubmit={handleSearch}
          className="relative hidden md:flex items-center w-1/2 mx-6"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="w-full border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#0d99ff]"
            style={{ borderRadius: '0px' }}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-4 bg-[#0d99ff] text-white hover:bg-blue-600 cursor-pointer transition-all"
            style={{ borderRadius: '0px' }}
          >
            <Search size={18} />
          </button>

          {suggestions.length > 0 && (
            <ul role="listbox" className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow z-50 text-sm">
              {suggestions.map((product, index) => (
                <li
                  key={product.id}
                  className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${index === activeIndex ? 'bg-gray-100 font-semibold' : ''
                    }`}
                  aria-selected={index === activeIndex}
                  role="option"
                  onMouseDown={() => applySuggestion(product.name)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div>
                    <p
                      className="text-sm font-medium"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(product.name, searchQuery),
                      }}
                    />
                    <p className="text-xs text-gray-500">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(product.category, searchQuery),
                        }}
                      />
                      {' · ₹' + product.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="hover:text-[#0d99ff] hover:underline underline-offset-4 transition"
            >
              {name}
            </Link>
          ))}

          {isLoggedIn ? (
            <Link to="/cart" className="relative text-[#0d99ff] hover:underline">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartItemCount}
                </span>
              )}
            </Link>
          ) : (
            <Link to="/login" className="text-[#0d99ff] hover:underline">Sign In</Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {isOpen ? (
              <X className="w-6 h-6 text-[#0d99ff]" />
            ) : (
              <Menu className="w-6 h-6 text-[#0d99ff]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white mt-2 mx-2 rounded-md"
          >
            <div className="px-4 py-4 flex flex-col gap-4 text-gray-700 font-medium">

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search products..."
                  className="w-full border border-gray-400 px-4 py-2 text-sm text-gray-800"
                  style={{ borderRadius: '0px' }}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-4 bg-[#0d99ff] text-white hover:bg-blue-600"
                  style={{ borderRadius: '0px' }}
                >
                  <Search size={18} />
                </button>

                {suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow z-50 text-sm">
                    {suggestions.map((product, index) => (
                      <li
                        key={product.id}
                        className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onMouseDown={() => applySuggestion(product.name)}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <div>
                          <p
                            className="text-sm font-medium"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(product.name, searchQuery),
                            }}
                          />
                          <p className="text-xs text-gray-500">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: highlightMatch(product.category, searchQuery),
                              }}
                            />
                            {' · ₹' + product.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </form>

              {navLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="hover:text-[#0d99ff] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              ))}

              {isLoggedIn ? (
                <Link
                  to="/cart"
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
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-[#0d99ff] hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
