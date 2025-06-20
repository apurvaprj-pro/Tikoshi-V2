import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition h-full flex flex-col relative w-[320px]">
      <Link
        to={`/product/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}
        className="block h-full flex flex-col"
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
        <div className="mt-auto bg-blue-600 text-white text-sm py-2 rounded text-center">
          Add to Cart
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
