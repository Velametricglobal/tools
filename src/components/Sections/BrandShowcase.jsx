import React from 'react';
import { BRANDS } from '../../data/banners';
import { ShieldCheck } from 'lucide-react';

export const BrandShowcase = () => {
  return (
    <section className="bg-white py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#339a99]" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Official Brand Partners
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">100% Manufacturer Warranties</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-100 hover:border-teal-300 rounded-xl flex flex-col items-center justify-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-12 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
              <span className="text-xs font-bold text-slate-700 group-hover:text-[#339a99]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
