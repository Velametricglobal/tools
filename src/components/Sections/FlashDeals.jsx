import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../Product/ProductCard';

export const FlashDeals = () => {
  const { products, setSelectedCategory } = useApp();
  const dealProducts = products.filter((p) => p.isDealOfDay);

  // Countdown timer simulation (4 hours, 28 minutes, 14 seconds)
  const [timeLeft, setTimeLeft] = useState(16094);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 16094));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (dealProducts.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-amber-500/10 via-slate-50 to-teal-500/10 py-10 border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Flash Header & Timer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-gradient-to-r from-slate-900 to-teal-950 p-4 sm:p-6 rounded-2xl shadow-xl border border-teal-800 text-white">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black animate-pulse shadow-md">
              <Flame className="w-7 h-7 text-rose-600 fill-rose-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  DEALS OF THE DAY
                </h2>
                <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-xs uppercase">
                  LIMITED TIME
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Exclusive factory discounts on heavy machinery, tillers & water pumps
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-amber-400/30">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs font-bold text-slate-300">Ends In:</div>
            <div className="flex items-center gap-1 font-mono text-sm font-black">
              <span className="bg-amber-400 text-slate-950 px-2 py-1 rounded-md">
                {String(hours).padStart(2, '0')}
              </span>
              <span className="text-amber-400">:</span>
              <span className="bg-amber-400 text-slate-950 px-2 py-1 rounded-md">
                {String(minutes).padStart(2, '0')}
              </span>
              <span className="text-amber-400">:</span>
              <span className="bg-rose-600 text-white px-2 py-1 rounded-md">
                {String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setSelectedCategory('deals')}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#339a99] hover:text-teal-700 bg-white hover:bg-teal-50 border border-teal-300 px-6 py-2.5 rounded-xl shadow-xs transition-all"
          >
            <span>View All Today's Machinery Offers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
