import React, { useState } from 'react';
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ShoppingCart,
  Zap,
  MapPin,
  Heart,
  Percent,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    location,
    setIsCartOpen
  } = useApp();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState(location.pincode);
  const [pincodeChecked, setPincodeChecked] = useState(true);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const images = selectedProduct.images || [selectedProduct.image];

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              {selectedProduct.brand}
            </span>
            <span className="text-xs text-slate-400">SKU: {selectedProduct.id}</span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Image Gallery */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-4/3 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center p-4">
                <img
                  src={images[selectedImageIdx]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 transition-all ${
                        selectedImageIdx === idx ? 'border-[#339a99]' : 'border-slate-200 opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Warranty Badge */}
              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl flex items-center gap-3 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-5 h-5 text-[#339a99] shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">{selectedProduct.warranty}</span>
                  <span>Full manufacturer replacement assistance via Toolsvilla</span>
                </div>
              </div>
            </div>

            {/* Right Specifications & Purchase Control */}
            <div className="md:col-span-6 space-y-5">
              
              <div>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h2>
                
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 font-bold text-xs px-2 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-slate-400 font-normal">({selectedProduct.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    In Stock (Ready to Ship)
                  </span>
                </div>
              </div>

              {/* Price & GST Note */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        {selectedProduct.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Price includes {selectedProduct.gstRate}% GST. Claim ₹{Math.round((selectedProduct.price * selectedProduct.gstRate) / (100 + selectedProduct.gstRate)).toLocaleString('en-IN')} Input Tax Credit with GSTIN.
                </p>
              </div>

              {/* Pincode Estimator */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#339a99]" />
                  <span>Check Delivery & COD Availability</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    maxLength={6}
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#339a99]"
                  />
                  <button
                    onClick={() => setPincodeChecked(true)}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    Check
                  </button>
                </div>
                {pincodeChecked && (
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Express Delivery by Friday to {pincodeInput} (COD Available)
                  </p>
                )}
              </div>

              {/* Quantity Picker & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity);
                      setSelectedProduct(null);
                    }}
                    className="bg-[#339a99] hover:bg-teal-700 text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Key Features & Detailed Specs */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            
            {/* Key Features */}
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                Key Features Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedProduct.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Table */}
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                Technical Specifications
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 px-4 py-2.5 ${
                      idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <span className="col-span-5 font-bold text-slate-700">{key}</span>
                    <span className="col-span-7 font-medium text-slate-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
