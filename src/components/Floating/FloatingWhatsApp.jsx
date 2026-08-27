import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp = () => {
  return (
    <div className="fixed bottom-16 left-3 sm:left-6 z-50">
      <a
        href="https://wa.me/919876543210?text=Hi%20Tejas%20%26%20Company,%20I%20want%20to%20enquire%20about%20your%20food%20processing%20and%20industrial%20machinery"
        target="_blank"
        rel="noreferrer"
        className="relative group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-emerald-300/40 backdrop-blur-md"
        title="Chat on WhatsApp"
      >
        {/* Animated Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none"></span>

        <div className="relative w-6 h-6 rounded-full bg-slate-950 text-emerald-400 flex items-center justify-center shrink-0">
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
        </div>

        <div className="relative flex flex-col text-left leading-none">
          <span className="text-[8px] uppercase font-bold text-slate-900 tracking-wider">
            24/7 WHATSAPP
          </span>
          <span className="text-[11px] sm:text-xs font-black text-slate-950 whitespace-nowrap">
            Enquire Now
          </span>
        </div>
      </a>
    </div>
  );
};
