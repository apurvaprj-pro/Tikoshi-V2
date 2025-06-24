import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const deals = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: '₹15,999',
    image: 'https://placehold.co/400x400?text=Smartphone+Deal',
    discountEnds: new Date(new Date().getTime() + 1000 * 60 * 60 * 5), // 5 hours from now
  },
  {
    id: 2,
    name: 'Running Shoes',
    price: '₹999',
    image: 'https://placehold.co/400x400?text=Shoes+Deal',
    discountEnds: new Date(new Date().getTime() + 1000 * 60 * 45), // 45 minutes from now
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: '₹1,299',
    image: 'https://placehold.co/400x400?text=Speaker+Deal',
    discountEnds: new Date(new Date().getTime() + 20 * 1000), // 20 seconds from now
  },
  {
    id: 4,
    name: 'Smartwatch Pro',
    price: '₹3,999',
    image: 'https://placehold.co/400x400?text=Smartwatch+Deal',
    discountEnds: new Date(new Date().getTime() + 5 * 1000), // 20 seconds from now
  },
];

const TopDeals = () => {
  const scrollRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      deals.forEach(({ id, discountEnds }) => {
        const diff = discountEnds - new Date();
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeft[id] = 'Expired';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    const scrollAmount = 320;
    current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="relative px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Deals</h2>

      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white h-[100px] w-7 cursor-pointer rounded-[4px] shadow-md hover:bg-blue-700 items-center justify-center"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white h-[100px] w-7 cursor-pointer rounded-[4px] shadow-md hover:bg-blue-700 items-center justify-center"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-6"
        role="list"
      >
        {deals.map(({ id, name, price, image }) => (
          <div
            key={id}
            className="min-w-[280px] max-w-[280px] bg-white border border-gray-300 rounded-lg p-4 relative flex-shrink-0"
            role="listitem"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-64 object-cover rounded mb-3"
            />
            <h3 className="text-base font-medium text-gray-900 truncate">{name}</h3>
            <p className="text-red-600 font-semibold mb-2">{price}</p>
            <p className="text-sm text-gray-500 mb-3">
              Ends in: <span className="font-semibold">{timeLeft[id] || 'Loading...'}</span>
            </p>
            <button className="w-full bg-blue-600 cursor-pointer text-white text-sm py-2 rounded hover:bg-blue-700">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDeals;
