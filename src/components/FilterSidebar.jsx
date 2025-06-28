import { useState } from 'react';

const categories = ['Electronics', 'Clothing', 'Books', 'Beauty'];
const brands = ['Apple', 'Samsung', 'Nike', 'Sony'];

const FilterSidebar = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    console.log('Applied Filters:', {
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
    });
    // This can be lifted to parent using a prop callback later
  };

  return (
    <div className="w-64 p-4 border-r border-gray-300 bg-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        {categories.map((category) => (
          <label key={category} className="block text-sm">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="block text-sm">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex gap-2">
            <label className="w-1/2 text-sm text-gray-700">
                Min
                <div className="mt-1">
                <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    className="w-full border px-2 py-1 text-sm outline-none"
                />
                </div>
            </label>

            <label className="w-1/2 text-sm text-gray-700">
                Max
                <div className="mt-1">
                <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    className="w-full border px-2 py-1 text-sm outline-none"
                />
                </div>
            </label>
        </div>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full bg-[#0d99ff] text-white py-2 mt-2 text-sm hover:bg-blue-600 transition cursor-pointer" 
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
