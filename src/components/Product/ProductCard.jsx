import React from 'react';
import { Star, Heart, ShoppingCart, Eye, Truck, Check, Percent } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-teal-400 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative">
      
      {/* Top Discount & Flash Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.discount > 0 && (
          <span className="bg-rose-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-sm shadow-xs uppercase tracking-wider flex items-center gap-0.5">
            <Percent className="w-3 h-3" />
            {product.discount}% OFF
          </span>
        )}
        {product.isDealOfDay && (
          <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
            FLASH DEAL
          </span>
        )}
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-400 hover:text-rose-500 shadow-sm flex items-center justify-center transition-all"
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'fill-rose-500 text-rose-500' : ''
          }`}
        />
      </button>

      {/* Image Container with Quick View Hover Button */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick View Button */}
        <button
          onClick={() => setSelectedProduct(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 hover:bg-[#339a99] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-md"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-1.5 py-0.5 rounded-md border border-amber-200/60 text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 hover:text-[#339a99] cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Feature Tags (COD & GST) */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-600 font-medium">
          {product.codAvailable && (
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-xs border border-emerald-200">
              <Truck className="w-3 h-3 text-emerald-600" />
              COD Ready
            </span>
          )}
          {product.gstIncluded && (
            <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-xs">
              <Check className="w-3 h-3 text-[#339a99]" />
              GST Invoice
            </span>
          )}
        </div>

        {/* Flash Sale Stock Status */}
        {product.isDealOfDay && product.dealSoldPercentage > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-rose-600">Limited Stock Deal</span>
              <span className="text-slate-500">{product.dealSoldPercentage}% Claimed</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full"
                style={{ width: `${product.dealSoldPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base md:text-lg font-extrabold text-slate-900 leading-none">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block font-normal">
              Incl. {product.gstRate}% GST (₹{Math.round((product.price * product.gstRate) / (100 + product.gstRate)).toLocaleString('en-IN')} Tax)
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-[#339a99] hover:bg-teal-700 text-white p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
