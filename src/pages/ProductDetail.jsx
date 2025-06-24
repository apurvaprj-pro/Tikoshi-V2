import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';
import { products } from '../data/products';
import ZoomImage from '../components/ZoomImage';
import RelatedProducts from '../components/RelatedProducts';

const ProductDetail = () => {
  const { productName } = useParams();
  const product = products.find(
    (item) =>
      item.name.toLowerCase().replace(/\s+/g, '-') ===
      decodeURIComponent(productName).toLowerCase()
  );

  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mt-10">Product Not Found</h2>
      </div>
    );
  }

  const basePrice = product.price;
  const hasSizes = product.size && typeof product.size === 'object';
  const currentSizePrice = selectedSize ? product.size[selectedSize]?.price : basePrice;

  return (
    <section className={`max-w-6xl mx-auto px-4 py-10 ${product.inStock ? 'opacity-100' : 'opacity-75'}`}>
      <div className="mb-6">
        <Link to="/" className="flex items-center text-blue-600 hover:underline mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Products
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Image Section */}
        <div className="flex flex-col md:flex-row gap-4 md:w-1/2 relative">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 object-cover rounded border cursor-pointer ${
                  selectedImage === img ? 'border-blue-600' : 'border-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="relative flex-1">
            <ZoomImage src={selectedImage} alt={product.name} />
          </div>
        </div>

        {/* Right Info Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          {/* Top info content */}
          <div className="space-y-4 flex-grow">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-blue-600 text-xl font-semibold">₹{currentSizePrice.toLocaleString()}</p>

            <div className="text-sm text-gray-700 space-y-1">
              <p className="text-gray-800 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, dolore.
              </p>
              <p><span className="font-medium">Brand:</span> {product.brand}</p>
              <p><span className="font-medium">Category:</span> {product.category}</p>
              <p>
                <span className="font-medium">Rating:</span>{' '}
                <Star className="inline-block text-blue-400 fill-blue-400" width={18} /> {product.rating} / 5
              </p>
              <p>
                <span className="font-medium">Availability:</span>{' '}
                <span className={product.inStock ? 'text-green-600' : 'text-red-500'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            </div>

            {/* Size Selection */}
            {hasSizes && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Select Size</h3>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(product.size).map(([size, info]) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!info.available}
                      className={`px-4 py-2 border rounded-full text-sm transition
                        ${selectedSize === size ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}
                        ${!info.available ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 border-gray-300'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {selectedSize && (
                  <p className="mt-2 text-sm text-gray-600">
                    Price for size <strong>{selectedSize}</strong>: ₹{currentSizePrice.toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6">
            <button
              disabled={!product.inStock}
              className={`flex-1 ${
                product.inStock ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
              } text-white text-sm py-3 rounded-lg transition`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button
              disabled={!product.inStock}
              className={`flex-1 ${
                product.inStock ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
              } text-white text-sm py-3 rounded-lg transition`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <RelatedProducts currentProduct={product} />
    </section>
  );
};

export default ProductDetail;