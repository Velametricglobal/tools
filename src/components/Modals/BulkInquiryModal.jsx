import React, { useState } from 'react';
import { ShieldCheck, X, Building2, Send, CheckCircle2, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BulkInquiryModal = () => {
  const { isBulkInquiryOpen, setIsBulkInquiryOpen, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  if (!isBulkInquiryOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Wholesale quotation request submitted! Our B2B Agri engineer will call you.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              B2B Bulk & Wholesale Quotation
            </h3>
          </div>
          <button
            onClick={() => {
              setIsBulkInquiryOpen(false);
              setSubmitted(false);
            }}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-base font-extrabold text-slate-900">Request Received!</h4>
            <p className="text-xs text-slate-600">
              Our B2B quotation desk will process your bulk pricing & GST tax invoice calculation. An engineer will contact you within 2 business hours.
            </p>
            <button
              onClick={() => {
                setIsBulkInquiryOpen(false);
                setSubmitted(false);
              }}
              className="bg-[#339a99] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl mt-2"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-slate-700">
              <span className="font-bold text-slate-900 block mb-0.5">
                Why Buy Bulk on Toolsvilla?
              </span>
              <span>100% Guaranteed Wholesale Rates • 18% GST Input Credit • Dedicated Fleet Delivery</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Company / Farm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Patel Agro Farms"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">GSTIN (Optional)</label>
                <input
                  type="text"
                  placeholder="19AAACG1234F1Z5"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none uppercase font-bold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Machinery & Quantity Details</label>
              <textarea
                rows={3}
                required
                placeholder="Specify required products (e.g. 5x Power Tillers, 10x 16L Sprayers, 2x Submersible Pumps)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#339a99] hover:bg-teal-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
            >
              <Send className="w-4 h-4" />
              <span>Submit Wholesale Quote Request</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
