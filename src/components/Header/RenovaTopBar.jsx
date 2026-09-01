import React from 'react';
import { Phone, Globe, MessageSquare, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const RenovaTopBar = ({ onOpenAdmin }) => {
  const { branding } = useRenova();
  const company = branding?.companyProfile || {};
  const tokens = branding?.brandTokens || {};

  const cleanWa = (company.whatsapp_number || '919876543210').replace(/\D/g, '');

  return (
    <div
      className="text-slate-300 text-[11px] py-1.5 px-3 border-b border-slate-800 transition-colors"
      style={{ backgroundColor: tokens.secondary || '#020617' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Prominent Client Demo Announcement */}
        <div className="flex items-center gap-2 truncate">
          <span className="flex items-center gap-1.5 text-amber-400 font-black tracking-wide uppercase truncate text-[10px] sm:text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
            <span className="truncate">DEMO CRM FOR CLIENT VIA VELAMETRIC GLOBAL</span>
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline text-slate-400 font-semibold text-[10px]">
            We Create. We Market. We Grow
          </span>
        </div>

        {/* Right: Admin Entry & Quick WhatsApp */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-slate-950 font-black bg-sky-400 hover:bg-sky-300 px-2.5 py-0.5 rounded-md transition-all text-[10px] uppercase shadow-2xs"
          >
            <Lock className="w-2.5 h-2.5 text-slate-950" />
            <span>Open Demo Admin CRM</span>
          </button>

          <span className="text-slate-700">|</span>

          <a
            href={`https://wa.me/${cleanWa}?text=Hi%20Velametric%20Global,%20I%20want%20a%20demo%20of%20the%20E-Commerce%20CRM%20software.`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <MessageSquare className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Demo Info</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
