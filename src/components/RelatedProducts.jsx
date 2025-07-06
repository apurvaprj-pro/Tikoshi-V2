import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

const RelatedProducts = ({ currentProduct }) => {
  const related = products
    .filter(
      (item) =>
        item.category === currentProduct.category &&
        item.name !== currentProduct.name
    )
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <section className="px-4 mt-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-3">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product, index) => (
          <Link
            key={product.id || index}
            to={`/product/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}
            className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-lg transition"
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
  )
}

export default RelatedProducts
