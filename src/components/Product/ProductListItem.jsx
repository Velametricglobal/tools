import React from 'react';
import { FileText, Eye, CheckCircle2, Scale, Heart, ShieldCheck } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const ProductListItem = ({ product }) => {
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col md:flex-row items-center gap-4 group">
      
      {/* Product Image */}
      <div className="relative w-full md:w-44 h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider">
          SS 304 FOOD GRADE
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
            isSaved ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-rose-500'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-sky-700">
          <span>{product.brand}</span>
          <span>•</span>
          <span className="truncate">{product.subcategory}</span>
        </div>

        <h3
          onClick={() => setSelectedProduct(product)}
          className="text-sm font-extrabold text-slate-900 group-hover:text-[#02408f] transition-colors cursor-pointer leading-tight line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Key Features Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-600">
          <span className="bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 font-semibold text-slate-700">
            {product.specifications['Motor Power'] ||
              product.specifications['Power Required'] ||
              product.specifications['Motor'] ||
              'Commercial Motor'}
          </span>
          <span className="bg-sky-50 text-[#02408f] px-2.5 py-0.5 rounded-md border border-sky-200 font-bold">
            {product.specifications['Processing Capacity'] ||
              product.specifications['Grading Capacity'] ||
              product.specifications['Output'] ||
              'High Output'}
          </span>
          <span className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200 font-semibold">
            {product.warranty}
          </span>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="w-full md:w-56 flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 shrink-0 gap-3">
        
        {/* Pricing */}
        <div className="text-left md:text-right">
          <div className="flex items-baseline gap-2 md:justify-end">
            <span className="text-base font-black text-[#02408f]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block mt-0.5">
            Save {product.discount}% (Excl. 18% GST Input)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Compare Toggle Button */}
          <button
            onClick={() => toggleCompare(product.id)}
            className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
              isCompared
                ? 'bg-amber-400 text-slate-950 border-amber-500 font-black'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Compare Specification Matrix"
          >
            <Scale className="w-4 h-4" />
          </button>

          {/* Quick Specs View */}
          <button
            onClick={() => setSelectedProduct(product)}
            className="p-2 rounded-xl text-xs font-bold bg-sky-50 text-[#02408f] border border-sky-200 hover:bg-sky-100 transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Add to RFQ */}
          <button
            onClick={() => addToRFQ(product)}
            className="bg-[#02408f] hover:bg-blue-900 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>RFQ Quote</span>
          </button>
        </div>

      </div>

    </div>
  );
};
