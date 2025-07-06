import { useState } from 'react';
import { Star, Droplet } from 'lucide-react';

const categories = ['Electronics', 'Clothing', 'Books', 'Beauty', 'Home', 'Toys', 'Sports', 'Automotive'];
const brands = ['Apple', 'Samsung', 'Nike', 'Sony', 'Adidas', 'LG', 'Dell', 'HP'];
const colors = ['Red', 'Blue', 'Green', 'Black', 'Yellow', 'Purple', 'White'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const discounts = ['10% Off', '20% Off', '30% Off', '50% Off'];

const FilterSidebar = ({ onApply }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('');

  const toggleFilter = (value, list, setList) => {
    setList(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handlePriceChange = e => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onApply({
      categories: selectedCategories,
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      discounts: selectedDiscounts,
      priceRange,
      minRating,
      inStockOnly,
      sortOrder,
    });
  };

  return (
    <aside className="w-72 p-6 border-r border-gray-200 bg-white space-y-6">
      <h2 className="text-lg font-semibold">Filter Products</h2>

      {/* Category */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
              className={`text-sm px-2 py-1 rounded-full border transition ${
                selectedCategories.includes(cat)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300'
              }`}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-medium mb-2">Brand</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                className="mr-2"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
              className={`w-6 h-6 rounded-full border transition cursor-pointer ${
                selectedColors.includes(color)
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`} 
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(sz => (
            <button
              key={sz}
              onClick={() => toggleFilter(sz, selectedSizes, setSelectedSizes)}
              className={`text-sm px-2 py-1 rounded border transition ${
                selectedSizes.includes(sz)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 border-gray-300'
              }`}
            >{sz}</button>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div>
        <h3 className="font-medium mb-2">Discount</h3>
        <div className="flex flex-wrap gap-2">
          {discounts.map(dis => (
            <label key={dis} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={selectedDiscounts.includes(dis)}
                onChange={() => toggleFilter(dis, selectedDiscounts, setSelectedDiscounts)}
                className="mr-2"
              />
              {dis}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="w-1/2 border px-2 py-1 text-sm outline-none"
          />
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="w-1/2 border px-2 py-1 text-sm outline-none"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-medium mb-2 flex items-center gap-1">Min Rating <Star size={16} className="text-yellow-500" /></h3>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={minRating}
          onChange={e => setMinRating(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-sm mt-1">{minRating}+</div>
      </div>

      {/* Stock & Sort */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly(prev => !prev)}
            className="mr-2"
          />
          In Stock Only
        </label>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border px-2 py-1 text-sm outline-none"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition cursor-pointer"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
