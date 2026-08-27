import React from 'react';
import { LayoutGrid, List, Scale, SlidersHorizontal, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const CatalogToolbar = ({ totalProductsCount }) => {
  const {
    viewMode,
    setViewMode,
    compareList,
    setIsCompareOpen,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    selectedCategory,
    setSelectedCategory
  } = useRenova();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 space-y-4">
      
      {/* Top Toolbar Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Count & Category Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#02408f] flex items-center justify-center font-extrabold">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              Product Catalog Toolbar
            </h3>
            <p className="text-[11px] text-slate-500">
              Showing <span className="font-extrabold text-[#02408f]">{totalProductsCount}</span> verified machines
            </p>
          </div>
        </div>

        {/* Center & Right Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Comparison Matrix Counter Button */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 border transition-all ${
              compareList.length > 0
                ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-300/50'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-4 h-4 text-slate-950" />
            <span>Compare ({compareList.length}/3)</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400 font-bold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none font-bold text-slate-800 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>

          {/* Grid vs List View Toggle */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'grid'
                  ? 'bg-[#02408f] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'list'
                  ? 'bg-[#02408f] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Compact List View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

        </div>

      </div>

      {/* Filter Row - Price Slider & Stock Checkbox */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Price Slider */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-bold text-slate-700 shrink-0">Max Price:</span>
          <input
            type="range"
            min="2000"
            max="300000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-32 sm:w-48 accent-[#02408f] cursor-pointer"
          />
          <span className="font-black text-[#02408f] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 shrink-0">
            ≤ ₹{maxPrice.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Stock Filter Checkbox & Reset */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-[#02408f] rounded-md"
            />
            <span>Ready Stock Only</span>
          </label>

          {(maxPrice < 300000 || inStockOnly || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setMaxPrice(300000);
                setInStockOnly(false);
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
