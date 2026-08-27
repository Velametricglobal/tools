import React, { useState } from 'react';
import { Calculator, Percent, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GSTCalculator = () => {
  const [purchaseAmount, setPurchaseAmount] = useState(50000);
  const [gstRate, setGstRate] = useState(18);
  const { setIsBulkInquiryOpen } = useApp();

  const gstCreditAmount = Math.round((purchaseAmount * gstRate) / (100 + gstRate));
  const netEffectiveCost = purchaseAmount - gstCreditAmount;

  return (
    <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 py-10 text-white border-y border-teal-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-400/30 uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5 text-amber-400" />
              B2B Business & Farm Tax Credit
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Calculate Your 18% GST Tax Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every tool and machine purchased on Toolsvilla comes with a tax-compliant GST Invoice. Registered GST buyers can claim 100% Input Tax Credit (ITC) to reduce operational costs.
            </p>
            <div className="flex items-center gap-4 text-xs text-emerald-400 font-semibold pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>GSTIN Billing Supported</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Instant Invoice PDF Download</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-teal-500/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Calculator className="w-4 h-4" />
                <span>Live GST Input Tax Credit Estimator</span>
              </div>
              <span className="text-[11px] text-slate-400">Toolsvilla B2B Pro</span>
            </div>

            {/* Slider & Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-300 font-medium">Estimated Order Amount (₹):</label>
                <input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(1000, Number(e.target.value)))}
                  className="w-32 bg-slate-950 border border-teal-700 rounded-lg px-2.5 py-1 text-right text-xs font-bold text-amber-300 outline-none focus:border-amber-400"
                />
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                className="w-full accent-[#339a99] cursor-pointer"
              />
            </div>

            {/* GST Rate Selector */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-300">GST Slab Rate:</span>
              <div className="flex gap-2">
                {[12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                      gstRate === rate
                        ? 'bg-[#339a99] text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Breakdown Display */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Your GST Input Credit
                </span>
                <span className="text-lg font-black text-emerald-400 mt-1 block">
                  ₹{gstCreditAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Net Effective Machine Cost
                </span>
                <span className="text-lg font-black text-amber-300 mt-1 block">
                  ₹{netEffectiveCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setIsBulkInquiryOpen(true)}
              className="w-full bg-[#339a99] hover:bg-teal-600 text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Request Custom GST Quote & Bulk Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
