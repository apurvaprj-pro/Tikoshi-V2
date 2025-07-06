import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialWishlist = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: '₹2,499',
    image: 'https://placehold.co/300x200?text=Headphones&font=roboto',
    link: '/product/1',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: '₹3,999',
    image: 'https://placehold.co/300x200?text=Smart+Watch&font=roboto',
    link: '/product/2',
  },
  {
    id: 3,
    name: 'Portable SSD 1TB',
    price: '₹6,799',
    image: 'https://placehold.co/300x200?text=1TB+SSD&font=roboto',
    link: '/product/3',
  },
  {
    id: 4,
    name: 'Mechanical Gaming Keyboard',
    price: '₹2,299',
    image: 'https://placehold.co/300x200?text=Keyboard&font=roboto',
    link: '/product/4',
  },
  {
    id: 5,
    name: '1080p HD Webcam',
    price: '₹1,499',
    image: 'https://placehold.co/300x200?text=Webcam&font=roboto',
    link: '/product/5',
  },
  {
    id: 6,
    name: 'USB-C Docking Station',
    price: '₹3,299',
    image: 'https://placehold.co/300x200?text=Docking+Station&font=roboto',
    link: '/product/6',
  },
  {
    id: 7,
    name: 'Wireless Mouse',
    price: '₹749',
    image: 'https://placehold.co/300x200?text=Wireless+Mouse&font=roboto',
    link: '/product/7',
  },
  {
    id: 8,
    name: 'Smart LED Light Strip',
    price: '₹1,199',
    image: 'https://placehold.co/300x200?text=LED+Strip&font=roboto',
    link: '/product/8',
  },
  {
    id: 9,
    name: 'Laptop Cooling Pad',
    price: '₹899',
    image: 'https://placehold.co/300x200?text=Cooling+Pad&font=roboto',
    link: '/product/9',
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    console.log('Add to cart:', item);
    removeItem(item.id);
  };

  return (
    <section className="min-h-screen px-4 py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-5xl mx-auto">
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="/assets/images/empty-box.png"
              alt="Empty Wishlist"
              className="w-40 mx-auto mb-6 opacity-60"
            />
            <p className="text-lg text-gray-600">Your wishlist is feeling lonely.</p>
            <Link
              to="/"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow hover:shadow-lg p-4 transition-transform transform hover:-translate-y-1 flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain rounded-xl mb-4 border"
                />
                <div className="flex-1">
                  <Link
                    to={item.link}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-500 mt-1">{item.price}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
