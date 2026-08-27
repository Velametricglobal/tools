import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../Product/ProductCard';

export const CategorySection = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery } = useApp();

  // Filter products by selected category or search query
  let filteredProducts = products;

  if (selectedCategory === 'deals') {
    filteredProducts = products.filter((p) => p.isDealOfDay);
  } else if (selectedCategory === 'wishlist') {
    // Handled in wishlist state view
    filteredProducts = products;
  } else if (selectedCategory !== 'all') {
    filteredProducts = products.filter((p) => p.category === selectedCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
    );
  }

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section className="py-10 bg-slate-50 min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentCategoryObj ? currentCategoryObj.name : selectedCategory === 'deals' ? "Today's Flash Deals" : 'Featured Machinery & Equipment'}
              </h2>
              <span className="bg-teal-100 text-[#007777] font-bold text-xs px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} Products
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentCategoryObj
                ? currentCategoryObj.description
                : '100% Original products with manufacturer warranty, fast delivery & GST input credit'}
            </p>
          </div>

          {/* Subcategory Pills Filter */}
          {currentCategoryObj && (
            <div className="flex flex-wrap items-center gap-2">
              {currentCategoryObj.subcategories.map((sub, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-white border border-slate-200 text-slate-700 font-semibold px-3 py-1 rounded-lg shadow-2xs hover:border-teal-400 hover:text-[#339a99] transition-colors cursor-pointer"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-[#339a99] flex items-center justify-center mx-auto text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-base font-extrabold text-slate-800">No Machinery Matches Found</h3>
            <p className="text-xs text-slate-500">
              We couldn't find any products matching your query "{searchQuery}". Try searching for terms like "pump", "tiller", "drill", or "sprayer".
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-[#339a99] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Browse All Categories
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
