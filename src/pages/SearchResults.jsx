import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import { products } from '../data/products';
import ProductList from '../components/ProductList';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('relevance');
  const query = searchParams.get('query') || '';

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'lowToHigh', label: 'Price - Low to High' },
    { value: 'highToLow', label: 'Price - High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'popularity':
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case 'lowToHigh':
        return sorted.sort((a, b) => a.price - b.price);
      case 'highToLow':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="flex pt-20 max-w-7xl mx-auto">
      <FilterSidebar />
      <div className="flex-1 p-4">
        <h1 className="text-lg font-semibold mb-4">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"} for "{query}"
        </h1>

        <div className="mb-4 flex gap-5 items-center">
          <div className="text-sm text-gray-600">Sort By:</div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-600">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded border cursor-pointer ${sortBy === option.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-100'
                  } transition`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <ProductList products={sortedProducts} />
      </div>
    </div>
  );
};

export default SearchResults;
