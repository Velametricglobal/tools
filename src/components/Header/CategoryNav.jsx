import React, { useState } from 'react';
import { ChevronDown, Zap, Tag, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const CategoryNav = () => {
  const { selectedCategory, setSelectedCategory, setIsBulkInquiryOpen } = useApp();
  const [activeHoverCat, setActiveHoverCat] = useState(null);

  return (
    <nav className="bg-[#113636] text-white border-b border-teal-900 shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-0.5">
          
          {/* Main Category List */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 font-extrabold'
                  : 'hover:bg-teal-900/80 text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>

            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setActiveHoverCat(category.id)}
                onMouseLeave={() => setActiveHoverCat(null)}
                className="relative"
              >
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3.5 py-2.5 text-xs font-semibold rounded-t-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-[#339a99] text-white font-bold'
                      : 'hover:bg-teal-900/80 text-slate-200'
                  }`}
                >
                  <span>{category.name}</span>
                  <ChevronDown className="w-3 h-3 text-teal-300 opacity-70" />
                </button>

                {/* Subcategories Mega Dropdown */}
                {activeHoverCat === category.id && (
                  <div className="absolute top-full left-0 w-72 bg-white text-slate-800 shadow-2xl rounded-b-xl border border-slate-200 p-4 z-50 animate-in fade-in duration-100">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-[#339a99]"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#339a99]">
                        {category.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3">{category.description}</p>
                    <ul className="space-y-1.5">
                      {category.subcategories.map((sub, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setActiveHoverCat(null);
                            }}
                            className="w-full text-left text-xs font-medium text-slate-700 hover:text-[#339a99] hover:bg-teal-50 px-2 py-1.5 rounded-md transition-colors flex items-center justify-between group"
                          >
                            <span>{sub}</span>
                            <span className="text-slate-300 group-hover:text-[#339a99] font-bold">
                              →
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Offer Tags */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 pl-4 border-l border-teal-800">
            <button
              onClick={() => setSelectedCategory('deals')}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20"
            >
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Deals of the Day</span>
            </button>
            <button
              onClick={() => setIsBulkInquiryOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal-200 hover:text-white"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Wholesale Inquiry</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
