import React from 'react';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { TEJAS_CATEGORIES } from '../../data/tejasCategories';
import { useRenova } from '../../context/RenovaContext';

export const RenovaFooter = () => {
  const { branding } = useRenova();
  const company = branding?.companyProfile || {};
  const tokens = branding?.brandTokens || {};
  const logos = branding?.logos || {};

  return (
    <footer
      className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t border-slate-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {logos.primary_logo ? (
                <img
                  src={logos.primary_logo}
                  alt="Velametric Global Logo"
                  className="h-10 object-contain rounded-lg bg-slate-900 p-1 border border-slate-800"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-sky-400 text-slate-950 flex items-center justify-center font-black">
                  VG
                </div>
              )}
              <div>
                <span className="text-lg font-black text-white uppercase tracking-tight block leading-none">
                  {company.brand_name || 'Velametric Global'}
                </span>
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                  {company.tagline || 'We Create. We Market. We Grow'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {company.tagline || 'We Create. We Market. We Grow'} • Enterprise E-Commerce Accelerator, Headless CMS, Sales Pipeline CRM & Business Automation Platform.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={company.website || "https://velametricglobal.com/"} target="_blank" rel="noreferrer" className="hover:text-sky-300 font-bold">
                  {company.website || 'velametricglobal.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{company.sales_phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{company.official_email || 'contact@velametricglobal.com'}</span>
              </div>
              {company.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{company.address}, {company.city}, {company.state}</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Demo Product Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {TEJAS_CATEGORIES.map((cat) => (
                <li key={cat.id} className="flex justify-between items-center">
                  <a href="#" className="hover:text-sky-400 transition-colors">
                    {cat.name}
                  </a>
                  <span className="text-[10px] text-sky-300 font-extrabold bg-slate-900 px-1.5 py-0.2 rounded-full border border-slate-800">
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-sky-400">Headless Products & Category CMS</a></li>
              <li><a href="#" className="hover:text-sky-400">Visual Drag-and-Drop Page Builder</a></li>
              <li><a href="#" className="hover:text-sky-400">Kanban Sales Pipeline CRM</a></li>
              <li><a href="#" className="hover:text-sky-400">GST Invoice & Quotation Engine</a></li>
              <li><a href="#" className="hover:text-sky-400">Brand Kit & Token Manager</a></li>
              <li><a href="#" className="hover:text-sky-400">GSTIN: {company.gstin || '07AABCV9988F1Z4'}</a></li>
            </ul>
          </div>

          {/* Guarantee */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Client Demo Assurance
            </h4>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Velametric Global Demo</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Client demo environment engineered by {company.legal_name || 'Velametric Global Private Limited'}.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {company.legal_name || 'Velametric Global Private Limited'}. We Create. We Market. We Grow.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Platform License</a>
            <span>•</span>
            <a href="#" className="hover:underline">GST Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
