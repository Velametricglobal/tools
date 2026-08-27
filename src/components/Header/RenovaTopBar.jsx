import React from 'react';
import { Phone, Globe, MessageSquare, ShieldCheck, Lock } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const RenovaTopBar = ({ onOpenAdmin }) => {
  const { branding } = useRenova();
  const company = branding?.companyProfile || {};
  const tokens = branding?.brandTokens || {};

  const cleanPhone = (company.sales_phone || '+91 98765 43210').replace(/\D/g, '');
  const cleanWa = (company.whatsapp_number || '919876543210').replace(/\D/g, '');

  return (
    <div
      className="text-slate-300 text-[11px] py-1.5 px-3 border-b border-slate-800 transition-colors"
      style={{ backgroundColor: tokens.secondary || '#0f172a' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Official Catalog Badge & Admin Entry */}
        <div className="flex items-center gap-2 truncate">
          <a
            href={company.website || "http://tejasandcompany.in/"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors truncate"
          >
            <Globe className="w-3 h-3 shrink-0 text-amber-400" />
            <span className="truncate">{company.brand_name || 'Tejas & Company'}</span>
          </a>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:inline text-slate-400 text-[10px]">
            {company.tagline || 'Official 23 Machinery Catalog'}
          </span>
          <span className="text-slate-700">|</span>
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 bg-amber-400/20 px-2 py-0.5 rounded-md font-extrabold border border-amber-400/30 transition-all text-[10px]"
          >
            <Lock className="w-2.5 h-2.5 text-amber-400" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Right: Quick Sales Phone & WhatsApp */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${company.sales_phone || '+919876543210'}`}
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-bold transition-colors"
          >
            <Phone className="w-3 h-3 text-sky-400" />
            <span className="hidden xs:inline sm:inline">{company.sales_phone || '+91 98765 43210'}</span>
            <span className="xs:hidden sm:hidden">Call</span>
          </a>

          <span className="text-slate-700">|</span>

          <a
            href={`https://wa.me/${cleanWa}?text=Hi%20${encodeURIComponent(company.brand_name || 'Tejas & Company')},%20I%20want%20a%20quotation%20for%20machinery`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <MessageSquare className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">RFQ</span>
          </a>
        </div>

      </div>
    </div>
  );
};
