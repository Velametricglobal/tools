import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, Tag, ArrowRight, Check, Percent } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartMSRP,
    totalDiscount,
    couponDiscountAmount,
    estimatedGstCredit,
    cartTotal,
    appliedCoupon,
    setAppliedCoupon,
    showToast,
    setIsCheckoutOpen
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.toUpperCase() === 'TOOLSVILLA10' || couponInput.toUpperCase() === 'AGRI20') {
      setAppliedCoupon({ code: couponInput.toUpperCase(), discountPercent: 10 });
      showToast(`Promo coupon "${couponInput.toUpperCase()}" applied! Saved 10% Extra`);
      setCouponInput('');
    } else {
      showToast('Invalid promo code. Use TOOLSVILLA10 for 10% off', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-[#113636] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider">
                My Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-teal-900/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 font-medium">
                      ₹{product.price.toLocaleString('en-IN')} × {quantity}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Qty Changer */}
                      <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(product.id, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(product.id, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <span className="text-xs font-extrabold text-slate-900">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Delete button */}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-600">Your cart is currently empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs font-bold text-[#339a99] hover:underline"
                >
                  Explore Machinery Catalog
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer Calculation & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              
              {/* Coupon Entry */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. TOOLSVILLA10)"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 outline-none uppercase font-bold text-slate-800 focus:border-[#339a99]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-lg"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200">
                  <span className="font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Coupon {appliedCoupon.code} Applied ({appliedCoupon.discountPercent}% OFF)
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-[10px] underline font-bold text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-2">
                <div className="flex justify-between">
                  <span>MSRP Original Price:</span>
                  <span className="line-through">₹{cartMSRP.toLocaleString('en-IN')}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Toolsvilla Factory Discount:</span>
                    <span>-₹{totalDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount:</span>
                    <span>-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Shipping Fee (Express COD):</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-[#339a99] font-semibold text-[11px] bg-teal-50 p-1.5 rounded-md">
                  <span>Estimated 18% GST Input Credit:</span>
                  <span>₹{estimatedGstCredit.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-300 pt-2">
                  <span>Total Amount Payable:</span>
                  <span className="text-lg font-black text-[#339a99]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#339a99] hover:bg-teal-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
