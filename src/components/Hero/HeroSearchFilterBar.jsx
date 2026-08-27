import React from 'react';
import { Search, SlidersHorizontal, ArrowRight, Zap, Filter } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';
import { TEJAS_CATEGORIES } from '../../data/tejasCategories';

export const HeroSearchFilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice
  } = useRenova();

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const catalogEl = document.getElementById('product-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-blue-500/30 shadow-2xl">
      
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold uppercase text-white tracking-wider">
            Quick Machinery Search & Filter Bar
          </span>
        </div>
        <span className="text-[10px] text-sky-400 font-bold hidden sm:inline">
          Filter 23 Tejas Products Instantally
        </span>
      </div>

      {/* Filter Inputs Grid */}
      <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* 1. Keyword Input */}
        <div className="sm:col-span-5 relative">
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs focus-within:border-sky-400 transition-colors">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Apple Grader, Pulverizer, Retort..."
              className="w-full bg-transparent text-white placeholder-slate-400 outline-none"
            />
          </div>
        </div>

        {/* 2. Category Dropdown */}
        <div className="sm:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer focus:border-sky-400 transition-colors"
          >
            <option value="all">All 9 Categories (23 Products)</option>
            {TEJAS_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.count})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Search Action Button */}
        <div className="sm:col-span-3">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all uppercase tracking-wider"
          >
            <Zap className="w-4 h-4" />
            <span>Find Machine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </form>

    </div>
  );
};
