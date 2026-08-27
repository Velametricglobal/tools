import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const QuickQuoteModal = () => {
  const { isQuickQuoteOpen, setIsQuickQuoteOpen, showToast } = useRenova();
  const [submitted, setSubmitted] = useState(false);

  if (!isQuickQuoteOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Instant quotation request submitted to PK Renova Dehradun!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              PK Renova Fast Quotation (RFQ)
            </h3>
          </div>
          <button
            onClick={() => {
              setIsQuickQuoteOpen(false);
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
            <h4 className="text-base font-extrabold text-slate-900">Quotation Request Received!</h4>
            <p className="text-xs text-slate-600">
              Our engineering team in Dehradun will issue an official tax invoice quotation within 2 business hours.
            </p>
            <button
              onClick={() => {
                setIsQuickQuoteOpen(false);
                setSubmitted(false);
              }}
              className="bg-[#02408f] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl mt-2"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Verma"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Phone / WhatsApp Number</label>
              <input
                type="text"
                required
                placeholder="+91 89547 99323"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Establishment / Location</label>
              <input
                type="text"
                placeholder="e.g. Royal Bakery, Dehradun"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Required Machinery / Custom SS Notes</label>
              <textarea
                rows={3}
                required
                placeholder="Specify machines (e.g. 6ft SS Work Table, 3 HP Pulverizer, 400L Visi Cooler)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#02408f] hover:bg-[#1662ad] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Send className="w-4 h-4" />
              <span>Submit RFQ to Dehradun Desk</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
