import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Zap, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';
import { TEJAS_CATEGORIES } from '../../data/tejasCategories';

export const RenovaCategoryNav = () => {
  const {
    branding,
    selectedCategory,
    setSelectedCategory,
    products,
    setSelectedProduct,
    setIsQuickQuoteOpen
  } = useRenova();

  const tokens = branding?.brandTokens || {};
  const company = branding?.companyProfile || {};

  const [activeOpenCat, setActiveOpenCat] = useState(null);
  const navRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveOpenCat(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActiveOpenCat((prev) => (prev === catId ? null : catId));
  };

  const activeCategoryObj = TEJAS_CATEGORIES.find((c) => c.id === activeOpenCat);
  const activeProducts = activeCategoryObj ? products.filter((p) => p.category === activeCategoryObj.id) : [];

  return (
    <nav
      className="bg-slate-900 text-white border-b border-slate-800 shadow-md relative z-40 font-sans"
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Horizontal Category Strip */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1.5 text-xs">
          
          {/* Categories Pill Strip */}
          <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            
            {/* All Products Button */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveOpenCat(null);
              }}
              onMouseEnter={() => setActiveOpenCat(null)}
              className={`px-3 py-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-sky-400 text-slate-950 shadow-xs'
                  : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>

            {/* Category Buttons */}
            {TEJAS_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              const isOpen = activeOpenCat === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  onMouseEnter={() => setActiveOpenCat(category.id)}
                  className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected || isOpen
                      ? 'bg-sky-500/20 text-sky-300 font-black border border-sky-500/40 shadow-2xs'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-[9px] bg-slate-950 text-sky-400 font-extrabold px-1.5 py-0.2 rounded-full border border-slate-700">
                    {category.count}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-400' : ''
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right RFQ Quick Link (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 pl-3 border-l border-slate-800">
            <button
              onClick={() => setIsQuickQuoteOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20 whitespace-nowrap transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Velametric Official RFQ</span>
            </button>
          </div>

        </div>
      </div>

      {/* CONNECTED DROPDOWN PANEL */}
      {activeCategoryObj && (
        <div
          onMouseLeave={() => setActiveOpenCat(null)}
          className="absolute top-full inset-x-0 bg-white text-slate-900 border-b-4 border-sky-400 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-150 border-t border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            
            {/* Connected Header Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-slate-900" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                  {activeCategoryObj.name}
                </h3>
                <span className="text-[10px] bg-sky-100 text-sky-900 font-extrabold px-2 py-0.5 rounded-md">
                  {activeCategoryObj.count} Demo Items
                </span>
              </div>

              <button
                onClick={() => setActiveOpenCat(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors"
                title="Close Submenu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-500 font-medium">
              {activeCategoryObj.description}
            </p>

            {/* Grid Layout: Subcategories + Equipment Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1">
              
              {/* Subcategories Column */}
              <div className="md:col-span-6 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Subcategories & Divisions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {activeCategoryObj.subcategories.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(activeCategoryObj.id);
                        setActiveOpenCat(null);
                      }}
                      className="w-full text-left text-xs font-semibold text-slate-800 hover:text-sky-600 bg-sky-50/70 hover:bg-sky-100 p-2 rounded-xl transition-colors truncate"
                    >
                      • {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Items Shortcuts Column */}
              {activeProducts.length > 0 && (
                <div className="md:col-span-6 space-y-1.5 border-t md:border-t-0 md:border-l border-slate-100 md:pl-4 pt-2 md:pt-0">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    Direct Equipment Shortcuts:
                  </span>
                  <div className="max-h-40 overflow-y-auto space-y-1 pr-1 divide-y divide-slate-100 custom-scrollbar">
                    {activeProducts.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => {
                          setSelectedProduct(prod);
                          setActiveOpenCat(null);
                        }}
                        className="w-full text-left pt-1.5 first:pt-0 text-xs hover:bg-sky-50 p-1.5 rounded-lg flex items-center justify-between transition-colors group/p"
                      >
                        <span className="font-bold text-slate-800 truncate group-hover:text-sky-600">
                          {prod.name}
                        </span>
                        <span className="text-[10px] font-extrabold shrink-0 ml-2 text-sky-600">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom CTA Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                Velametric Global Demo Platform
              </span>

              <button
                onClick={() => {
                  setSelectedCategory(activeCategoryObj.id);
                  setActiveOpenCat(null);
                }}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>View All {activeCategoryObj.name} Items</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>

          </div>
        </div>
      )}

    </nav>
  );
};
