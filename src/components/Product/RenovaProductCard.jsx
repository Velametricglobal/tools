import React from 'react';
import { FileText, Eye, CheckCircle2, Scale, Heart, ShieldCheck } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const RenovaProductCard = ({ product }) => {
  const {
    addToRFQ,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare
  } = useRenova();

  const isSaved = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const specs = product.specifications || product.specs || {};
  const motorSpec =
    specs['Motor Power'] ||
    specs['Power Required'] ||
    specs['Motor'] ||
    specs['power'] ||
    '3 Phase Food-Grade Motor';
  const capacitySpec =
    specs['Processing Capacity'] ||
    specs['Grading Capacity'] ||
    specs['Output'] ||
    specs['capacity'] ||
    'High Yield Industrial Capacity';

  const origPrice = product.originalPrice || Math.round(product.price * 1.2);
  const discountVal = product.discount || '20';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-2xl hover:border-sky-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative font-sans">
      
      {/* Product Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 border-b border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-slate-950 text-white font-extrabold text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm border border-slate-800">
            VELAMETRIC VERIFIED
          </span>
          <span className="bg-sky-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
            SAVE {discountVal}%
          </span>
        </div>

        {/* Wishlist & Compare Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-rose-500'
            }`}
            title="Save to Wishlist"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={() => toggleCompare(product.id)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
              isCompared
                ? 'bg-sky-400 text-slate-950 font-black'
                : 'bg-slate-900/60 text-white hover:bg-sky-400 hover:text-slate-950'
            }`}
            title="Compare Specifications Matrix"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick View Floating Overlay Button */}
        <button
          onClick={() => setSelectedProduct(product)}
          className="absolute inset-x-4 bottom-3 bg-slate-950/90 hover:bg-slate-900 text-white text-xs font-extrabold py-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>Quick Technical Specs</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Subcategory */}
          <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider block mb-1">
            {product.subcategory || product.category}
          </span>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer leading-tight line-clamp-2"
          >
            {product.name}
          </h3>
        </div>

        {/* Spec Bullet Highlights */}
        <div className="space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="truncate font-medium">{motorSpec}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="truncate font-medium">{capacitySpec}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-400 line-through block leading-none">
              ₹{origPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-base font-black text-slate-900 leading-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => addToRFQ(product)}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>RFQ Quote</span>
          </button>
        </div>

      </div>

    </div>
  );
};
