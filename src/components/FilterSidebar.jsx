import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedSizes,
  setSelectedSizes,
  selectedRatings,
  setSelectedRatings,
  inStockOnly,
  setInStockOnly,
  clearAllFilters,
  categories,
  brands,
  sizes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const priceRanges = [
    { label: '₹0 – ₹499', value: [0, 499] },
    { label: '₹500 – ₹999', value: [500, 999] },
    { label: '₹1000 – ₹1999', value: [1000, 1999] },
    { label: '₹2000+', value: [2000, Infinity] },
  ];

  const ratings = [5, 4, 3];

  const toggleItem = (item, list, setList) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const SidebarContent = () => (
    <div className="w-full sm:w-72 p-4 bg-white space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 sm:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-3 py-2 border rounded outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Category</h3>
        {categories.map((category) => (
          <label key={category} className="block text-sm mb-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleItem(category, selectedCategories, setSelectedCategories)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="block text-sm mb-1">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleItem(brand, selectedBrands, setSelectedBrands)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Price</h3>
        {priceRanges.map(({ label, value }) => (
          <label key={label} className="block text-sm mb-1">
            <input
              type="radio"
              name="price"
              checked={
                selectedPriceRange &&
                selectedPriceRange[0] === value[0] &&
                selectedPriceRange[1] === value[1]
              }
              onChange={() => setSelectedPriceRange(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>

      {/* Sizes */}
      {sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleItem(size, selectedSizes, setSelectedSizes)}
                className={`border px-3 py-1 rounded-full text-sm ${
                  selectedSizes.includes(size)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ratings */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Rating</h3>
        {ratings.map((rating) => (
          <label key={rating} className="block text-sm mb-1">
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => toggleItem(rating, selectedRatings, setSelectedRatings)}
              className="mr-2"
            />
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="inline w-4 h-4 text-yellow-500 fill-yellow-500" />
            ))} & up
          </label>
        ))}
      </div>

      {/* Stock */}
      <div>
        <label className="text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly(!inStockOnly)}
            className="mr-2"
          />
          In Stock Only
        </label>
      </div>

      {/* Clear */}
      <div className="mt-4">
        <button
          onClick={clearAllFilters}
          className="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="sm:hidden mb-4 px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
        >
          Filter
        </button>
      </div>

      {/* Sidebar Drawer (mobile) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30">
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-lg overflow-y-auto transition">
            {SidebarContent()}
          </div>
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
        </div>
      )}

      {/* Sidebar (desktop) */}
      <div className="hidden sm:block">{SidebarContent()}</div>
    </>
  );
};

export default FilterSidebar;
