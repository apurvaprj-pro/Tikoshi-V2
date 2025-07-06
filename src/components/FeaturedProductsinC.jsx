import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { Heart, Star } from "lucide-react";

const FeaturedProductsinC = ({ categoryName, animate }) => {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 3);
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <section className="my-10">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Featured Products in {categoryName}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
        {featuredProducts.map((product) => {
          const roundedRating = Math.round(product.rating || 0);
          const wishlistActive = wishlist[product.id] === true;

          return (
            <div
              key={product.id}
              onClick={() =>
                navigate(
                  `/product/${encodeURIComponent(
                    product.name.toLowerCase().replace(/\s+/g, "-")
                  )}`
                )
              }
              className="border rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-2 right-2 p-1 rounded-full transition-transform duration-300 ${
                    animate ? "animate-[pulse_0.4s_ease-in-out]" : ""
                  }`}
                >
                  <Heart
                    size={22}
                    className={`text-red-500 transition-colors duration-300 cursor-pointer ${
                      wishlistActive ? "fill-red-500" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="p-5 flex flex-col">
                <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                  {product.name}
                </h2>

                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < roundedRating ? "fill-current" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">
                    ({product.rating?.toFixed(1)})
                  </span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-3 mb-4 flex-1">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProductsinC;
