import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialWishlist = [
  {
    id: 1,
    name: 'Vitamin C Serum',
    price: '₹499',
    image: '/assets/images/serum.png',
    link: '/product/1',
  },
  {
    id: 2,
    name: 'Skin Moisturizing Cream',
    price: '₹799',
    image: '/assets/images/cream.png',
    link: '/product/2',
  },
  {
    id: 3,
    name: 'Daily Multivitamin Tablets',
    price: '₹349',
    image: '/assets/images/vitamins.png',
    link: '/product/3',
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
    <div className="bg-gray-50 px-4 mt-20 mb-10">
      <div className="max-w-4xl mx-auto">

        {wishlist.length === 0 ? (
          <div className="text-center text-gray-600">Your wishlist is empty.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <Link to={item.link} className="text-lg font-medium text-gray-800 hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.price}</p>

                  <div className="mt-2 flex flex-wrap justify-between">
                    <button
                      onClick={() => addToCart(item)}
                      className="text-sm text-white bg-[#0d99ff] px-3 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
