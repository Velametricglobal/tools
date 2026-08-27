import React from 'react';
import { Sprout, Droplets, Wrench, UtensilsCrossed, Sun, ShieldCheck, Gauge } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useApp } from '../../context/AppContext';

const ICON_MAP = {
  Sprout: Sprout,
  Droplets: Droplets,
  Wrench: Wrench,
  UtensilsCrossed: UtensilsCrossed,
  Sun: Sun,
  ShieldCheck: ShieldCheck,
  Gauge: Gauge
};

export const CategoryGrid = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <section className="bg-slate-100 py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight">
              Explore Popular Categories
            </h2>
            <p className="text-xs text-slate-500">
              Browse top machinery and tools categories with verified warranties
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-[#339a99] hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Circular / Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Wrench;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 group ${
                  isSelected
                    ? 'bg-[#339a99] text-white border-teal-700 shadow-md ring-2 ring-teal-400/40'
                    : 'bg-white hover:bg-teal-50/60 border-slate-200 text-slate-800 shadow-2xs hover:border-teal-300'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-teal-50 text-[#339a99] group-hover:bg-[#339a99] group-hover:text-white'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold leading-tight group-hover:text-[#339a99] transition-colors">
                  {cat.name}
                </span>
                <span
                  className={`text-[10px] ${
                    isSelected ? 'text-teal-100' : 'text-slate-400'
                  }`}
                >
                  {cat.subcategories.length} sub-items
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
