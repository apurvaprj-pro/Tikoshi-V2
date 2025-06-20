import React, { useState } from 'react';
import { products } from '../data/products';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const itemsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const [inStockOnly, setInStockOnly] = useState(false);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    setSelectedSizes([]);
    setSelectedRatings([]);
    setInStockOnly(false);
  };

  const allCategories = [...new Set(products.map(p => p.category))];
  const allBrands = [...new Set(products.map(p => p.brand))];
  const allSizes = Array.from(
    new Set(
      products.flatMap(p =>
        p.size && typeof p.size === 'object' ? Object.keys(p.size) : []
      )
    )
  );

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesSize =
      selectedSizes.length === 0 ||
      (product.size &&
        typeof product.size === 'object' &&
        selectedSizes.some(size => product.size[size]?.available));
    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.some(r => product.rating >= r);
    const matchesStock = !inStockOnly || product.inStock;

    let matchesPrice = true;
    if (selectedPriceRange) {
      const price = product.price;
      matchesPrice = price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesSize &&
      matchesRating &&
      matchesStock
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Filters */}
        <FilterSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          clearAllFilters={clearAllFilters}
          categories={allCategories}
          brands={allBrands}
          sizes={allSizes}
        />

        {/* Products */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-17 justify-center">
              {filteredProducts
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
