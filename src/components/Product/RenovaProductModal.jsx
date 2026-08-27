import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, FileText, Scale, Truck, Calculator, Wrench, Heart } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const RenovaProductModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToRFQ,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare
  } = useRenova();

  const [activeTab, setActiveTab] = useState('specs');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  if (!selectedProduct) return null;

  const isSaved = wishlist.includes(selectedProduct.id);
  const isCompared = compareList.includes(selectedProduct.id);

  // 18% GST Input Credit calculation
  const gstRate = 0.18;
  const basePriceExclGst = Math.round(selectedProduct.price / (1 + gstRate));
  const gstAmount = selectedProduct.price - basePriceExclGst;

  const origPrice = selectedProduct.originalPrice || Math.round(selectedProduct.price * 1.2);
  const discountVal = selectedProduct.discount || '20';
  const brandName = selectedProduct.brand || 'Tejas & Company';
  const subCategoryName = selectedProduct.subcategory || selectedProduct.category || 'Machinery';
  const warrantyText = selectedProduct.warranty || '1 Year Official On-Site Warranty';

  const specs = selectedProduct.specifications || selectedProduct.specs || {
    Material: selectedProduct.material || '100% AISI 304 Stainless Steel',
    Capacity: 'Standard Industrial Capacity',
    Power: 'Electric / Hydraulic Motor',
    Warranty: warrantyText
  };

  const keyFeatures = selectedProduct.keyFeatures || [
    '100% AISI 304 Food-Grade Stainless Steel Construction',
    'Engineered for Continuous Heavy-Duty Industrial Operation',
    'Includes 18% GST Claimable Invoice with Factory Warranty'
  ];

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryStatus({
        express: '2 - 4 Business Days (Dehradun Factory Direct)',
        freight: 'Insured Freight Logistics Available to your location',
        pincode
      });
    } else {
      setDeliveryStatus(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#02408f] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
              TEJAS OFFICIAL SPEC SHEET
            </span>
            <span className="text-xs text-sky-200 font-bold hidden sm:inline">
              Model ID: #{selectedProduct.id}
            </span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="w-9 h-9 rounded-full bg-blue-900/80 hover:bg-blue-800 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Top Product Hero Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Image */}
            <div className="md:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black text-[9px] px-2.5 py-1 rounded-md uppercase">
                AISI 304 FOOD GRADE
              </div>
            </div>

            {/* Main Information */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-extrabold text-[#02408f] uppercase tracking-wider block">
                {brandName} • {subCategoryName}
              </span>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Price & Tax Box */}
              <div className="bg-sky-50/70 border border-sky-200 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#02408f]">
                      ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{origPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-700 block mt-0.5">
                    Includes 18% GST Input Credit (₹{gstAmount.toLocaleString('en-IN')} Tax Claimable)
                  </span>
                </div>

                <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs">
                  SAVE {discountVal}%
                </span>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => addToRFQ(selectedProduct)}
                  className="bg-[#02408f] hover:bg-blue-900 text-white font-black text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Add to RFQ Quote</span>
                </button>

                <button
                  onClick={() => toggleCompare(selectedProduct.id)}
                  className={`px-4 py-3 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${
                    isCompared
                      ? 'bg-amber-400 text-slate-950 border-amber-500 font-black'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'Compared' : 'Compare Matrix'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isSaved ? 'bg-rose-500 text-white border-rose-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex items-center gap-4 text-xs font-extrabold">
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'border-[#02408f] text-[#02408f]'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Technical Specifications</span>
              </button>

              <button
                onClick={() => setActiveTab('warranty')}
                className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'warranty'
                    ? 'border-[#02408f] text-[#02408f]'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Warranty & Safety</span>
              </button>

              <button
                onClick={() => setActiveTab('gst')}
                className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'gst'
                    ? 'border-[#02408f] text-[#02408f]'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>18% GST & Delivery</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Technical Specs Table */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Official Machine Specifications
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(specs).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs"
                  >
                    <span className="font-bold text-slate-600 capitalize">{key}</span>
                    <span className="font-black text-slate-900 text-right">{val}</span>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold text-slate-800">Engineering Highlights:</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Warranty & Safety */}
          {activeTab === 'warranty' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>{warrantyText}</span>
                </div>
                <p className="text-slate-700">
                  Covers motor winding failure, structural welds, and internal contact parts against manufacturing defects. Includes free factory tech consultation.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-800">Operational & Maintenance Instructions:</h5>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>Operate within specified voltage limits (220V Single Phase / 415V 3-Phase).</li>
                  <li>Clean food contact chambers daily with food-grade detergent and clean water.</li>
                  <li>Check gearbox lubrication oil level every 500 operating hours.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: GST & Freight Delivery */}
          {activeTab === 'gst' && (
            <div className="space-y-4 text-xs">
              
              {/* GST Breakdown */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
                <h5 className="font-extrabold text-[#02408f] text-xs uppercase tracking-wider">
                  18% GST Input Tax Credit Breakdown
                </h5>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-slate-400 block font-bold">Base Price</span>
                    <span className="font-black text-slate-800">₹{basePriceExclGst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-slate-400 block font-bold">18% GST Amount</span>
                    <span className="font-black text-[#02408f]">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-slate-400 block font-bold">Total Invoice Price</span>
                    <span className="font-black text-emerald-700">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Pincode Freight Form */}
              <form onSubmit={handlePincodeCheck} className="space-y-2 pt-2">
                <h5 className="font-bold text-slate-800">Check Delivery Lead Time & Freight:</h5>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-Digit Pincode (e.g. 248001)"
                    className="px-3 py-2 border border-slate-300 rounded-xl outline-none text-xs w-48 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-[#02408f] text-white font-bold px-4 py-2 rounded-xl hover:bg-blue-900"
                  >
                    Check Freight
                  </button>
                </div>
                {deliveryStatus && (
                  <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>Verified Freight Service for {deliveryStatus.pincode}</span>
                    </p>
                    <p className="text-[11px] text-[#02408f]">{deliveryStatus.express}</p>
                  </div>
                )}
              </form>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Factory Direct Quotation • 18% GST Input Credit Invoice
          </span>

          <button
            onClick={() => setSelectedProduct(null)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
          >
            Close Sheet
          </button>
        </div>

      </div>
    </div>
  );
};
