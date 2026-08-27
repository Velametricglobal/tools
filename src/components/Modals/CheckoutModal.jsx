import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Building2,
  FileText,
  Lock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    estimatedGstCredit,
    user,
    location,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [gstNumber, setGstNumber] = useState(user.gstNo || '');
  const [companyName, setCompanyName] = useState('Sharma Agri Industries');
  const [address, setAddress] = useState('Plot No. 42, Industrial Area, Sector 5');
  const [pincode, setPincode] = useState(location.pincode);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    showToast('Order successfully placed! Order ID #TV-2026-8849', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider">
              Toolsvilla Secure Checkout
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setIsOrderPlaced(false);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isOrderPlaced ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Order Confirmed! #TV-2026-8849
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for ordering with Toolsvilla. We have dispatched your tax invoice PDF to your registered phone {user.phone}.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="font-bold text-slate-900 uppercase">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online (UPI)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-600">3-4 Working Days</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Total Charged:</span>
                  <span className="font-extrabold text-[#339a99]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsOrderPlaced(false);
                }}
                className="bg-[#339a99] hover:bg-teal-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#339a99]" />
                  1. Delivery Address & Customer Details
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Customer Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Phone Number</label>
                    <input
                      type="text"
                      defaultValue={user.phone}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="text-slate-600 font-semibold block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">City / State</label>
                    <input
                      type="text"
                      defaultValue={`${location.city}, ${location.state}`}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* GSTIN Business Invoice Section */}
              <div className="space-y-3 p-4 bg-teal-50/50 border border-teal-200 rounded-xl">
                <h3 className="text-xs font-extrabold text-[#339a99] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#339a99]" />
                  2. Business GST Invoice (Claim 18% Tax Credit)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">GSTIN Number (Optional)</label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. 19AAACG1234F1Z5"
                      className="w-full bg-white border border-teal-300 rounded-lg px-3 py-2 outline-none uppercase font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Registered Business Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Company Name"
                      className="w-full bg-white border border-teal-300 rounded-lg px-3 py-2 outline-none text-slate-800"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-teal-800 font-medium">
                  Tax invoice with GST credit of ₹{estimatedGstCredit.toLocaleString('en-IN')} will be generated on placement.
                </p>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#339a99]" />
                  3. Select Payment Option
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#339a99] bg-teal-50/70 ring-2 ring-teal-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900">Cash On Delivery</span>
                    <span className="text-[10px] text-slate-500 mt-1">Pay cash to delivery executive</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#339a99] bg-teal-50/70 ring-2 ring-teal-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900">Instant UPI / QR</span>
                    <span className="text-[10px] text-slate-500 mt-1">GPay, PhonePe, Paytm, BHIM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#339a99] bg-teal-50/70 ring-2 ring-teal-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900">NetBanking / Cards</span>
                    <span className="text-[10px] text-slate-500 mt-1">Debit & Credit Cards</span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Amount:</span>
                  <span className="text-xl font-black text-[#339a99]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="bg-[#339a99] hover:bg-teal-700 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2 uppercase tracking-wider"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm Order</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
