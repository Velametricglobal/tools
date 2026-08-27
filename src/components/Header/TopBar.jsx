import React from 'react';
import { Phone, MessageSquare, Truck, ShieldCheck, Percent, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopBar = () => {
  const { setIsBulkInquiryOpen } = useApp();

  return (
    <div className="bg-[#113636] text-white text-xs py-2 px-4 border-b border-teal-900/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left Side: Call & WhatsApp */}
        <div className="flex items-center gap-4 text-slate-200">
          <a
            href="tel:1800123456"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Toll Free: 1800-266-7788</span>
          </a>
          <span className="text-slate-600">|</span>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Agri Support</span>
          </a>
        </div>

        {/* Center: Highlight Banner */}
        <div className="hidden lg:flex items-center gap-2 text-amber-300 font-medium bg-teal-900/60 px-3 py-0.5 rounded-full border border-teal-700/50">
          <Percent className="w-3.5 h-3.5 text-amber-400" />
          <span>Save 18% Extra via GST Invoice Input Tax Credit on All Business Orders!</span>
        </div>

        {/* Right Side: Quick Links */}
        <div className="flex items-center gap-4 text-slate-300">
          <button
            onClick={() => setIsBulkInquiryOpen(true)}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">Bulk / GST Buying</span>
          </button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Track Order</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-base leading-none">🇮🇳</span>
            <span>India</span>
          </div>
        </div>

      </div>
    </div>
  );
};
