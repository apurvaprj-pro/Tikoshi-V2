import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, price, images, rating, description } = product;
  const roundedRating = Math.round(rating);
  const [isWishlist, setIsWishlist] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const toggleWishlist = (e) => {
    e.stopPropagation(); // prevent card click
    setIsWishlist((prev) => !prev);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);
  };

  const goToDetails = () => {
    navigate(
      `/product/${encodeURIComponent(
        product.name.toLowerCase().replace(/\s+/g, "-")
      )}`
    );
  };

  return (
    <div
      onClick={goToDetails}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-300 cursor-pointer"
    >
      <div className="relative">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-56 object-cover"
        />
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-1 rounded-full transition-transform duration-300 ${
            animate ? "animate-[pulse_0.4s_ease-in-out]" : ""
          }`}
        >
          <Heart
            className={`cursor-pointer text-red-500 transition-colors duration-300 ${
              isWishlist ? "fill-red-500" : ""
            }`}
            size={22}
          />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2 line-clamp-1">{name}</h2>
        <div className="flex items-center gap-1 text-yellow-500 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < roundedRating ? "fill-current" : "text-gray-300"}
            />
          ))}
          <span className="text-gray-600 text-sm">({rating.toFixed(1)})</span>
        </div>
        <p className="text-gray-700 text-sm line-clamp-3 flex-1">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold">₹{price}</span>
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
};

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
