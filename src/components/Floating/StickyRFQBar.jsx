import React from 'react';
import { FileText, Scale, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const StickyRFQBar = () => {
  const {
    rfqCart,
    rfqSubtotal,
    setIsRFQDrawerOpen,
    compareList,
    setIsCompareOpen
  } = useRenova();

  const totalItems = rfqCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl py-2.5 px-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-sky-400 block leading-tight">
                Tejas & Company Official Quotation
              </span>
              <span className="text-xs font-bold text-slate-300">
                18% GST Input Credit Claimable Invoices
              </span>
            </div>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Compare Matrix ({compareList.length})</span>
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold leading-none">
              Quote Subtotal ({totalItems} items)
            </span>
            <span className="text-sm sm:text-base font-black text-amber-400">
              ₹{rfqSubtotal.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => setIsRFQDrawerOpen(true)}
            className="bg-gradient-to-r from-[#02408f] to-[#1662ad] hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Review RFQ Quotation</span>
            <span className="sm:hidden">RFQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
