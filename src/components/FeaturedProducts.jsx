import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from "../data/products.js";

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const featuredProducts = products.slice(0, 20);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    const card = cardRef.current;
    if (!el || !card) return;

    const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const distance = touchEndX.current - touchStartX.current;
    const swipeThreshold = 50;

    if (distance > swipeThreshold) scroll('left');
    else if (distance < -swipeThreshold) scroll('right');
  };

  return (
    <section className="relative px-4 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Products</h2>

      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                     bg-blue-600 text-white h-[100px] w-7 rounded-[4px]
                     shadow-md hover:bg-blue-700 items-center justify-center cursor-pointer"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                     bg-blue-600 text-white h-[100px] w-7 cursor-pointer rounded-[4px]
                     shadow-md hover:bg-blue-700 items-center justify-center"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-6"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {featuredProducts.map((product, index) => (
          <Link
            key={product.id || index}
            to={`/product/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}
            ref={index === 0 ? cardRef : null}
            className="min-w-[250px] max-w-[300px] bg-white border border-gray-300 rounded-lg p-4 relative flex-shrink-0 hover:shadow-lg transition"
          >
            {product.badge && (
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full -rotate-2">
                {product.badge}
              </span>
            )}
            <img
              src={product.images?.[0] || 'https://placehold.co/400x400?text=Product'}
              alt={product.name}
              className="w-full h-64 object-cover rounded mb-3"
            />
            <h3 className="text-base font-medium text-gray-900 truncate">{product.name}</h3>
            <p className="text-blue-600 font-semibold mb-2">₹{product.price?.toLocaleString()}</p>
            <div className="w-full bg-blue-600 text-white text-sm py-2 rounded text-center">
              Add to Cart
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
