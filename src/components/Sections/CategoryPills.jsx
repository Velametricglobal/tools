import React from 'react';
import { Apple, Wrench, PackageCheck, Zap, Droplets, Container, Sun, Flame, ShieldCheck } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';
import { TEJAS_CATEGORIES } from '../../data/tejasCategories';

const ICON_MAP = {
  Apple: Apple,
  Wrench: Wrench,
  PackageCheck: PackageCheck,
  Zap: Zap,
  Droplets: Droplets,
  Container: Container,
  Sun: Sun,
  Flame: Flame,
  ShieldCheck: ShieldCheck
};

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useRenova();

  return (
    <section className="bg-slate-100 py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
              Tejas & Company Product Categories (9 Main Categories)
            </h2>
            <p className="text-xs text-slate-500">
              Showing 23 official processing, grinding, packaging & utility products
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-[#02408f] hover:underline"
            >
              Show All 23 Products
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TEJAS_CATEGORIES.map((cat) => {
            const IconComp = ICON_MAP[cat.icon] || Wrench;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 group ${
                  isSelected
                    ? 'bg-[#02408f] text-white border-blue-900 shadow-md ring-2 ring-blue-400/40'
                    : 'bg-white hover:bg-sky-50/60 border-slate-200 text-slate-800 shadow-2xs hover:border-sky-300'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-sky-100/70 text-[#02408f] group-hover:bg-[#02408f] group-hover:text-white'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold leading-snug group-hover:text-[#02408f] line-clamp-2">
                  {cat.name}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count} {cat.count === 1 ? 'Product' : 'Products'}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
