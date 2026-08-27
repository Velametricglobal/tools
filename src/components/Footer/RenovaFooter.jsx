import React from 'react';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Globe } from 'lucide-react';
import { TEJAS_CATEGORIES } from '../../data/tejasCategories';
import { useRenova } from '../../context/RenovaContext';

export const RenovaFooter = () => {
  const { branding } = useRenova();
  const company = branding?.companyProfile || {};
  const tokens = branding?.brandTokens || {};
  const logos = branding?.logos || {};

  return (
    <footer
      className="text-slate-300 pt-12 pb-6 border-t transition-colors"
      style={{ backgroundColor: tokens.secondary || '#0f172a', borderColor: '#1e293b' }}
    >
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {logos.primary_logo ? (
                <img
                  src={logos.primary_logo}
                  alt={company.brand_name || 'Logo'}
                  className="h-10 object-contain rounded-lg bg-white p-1"
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-xl text-white flex items-center justify-center font-bold"
                  style={{ backgroundColor: tokens.primary || '#02408f' }}
                >
                  <Wrench className="w-5 h-5 text-amber-300 transform -rotate-12" />
                </div>
              )}
              <span className="text-xl font-black text-white tracking-tight">
                {company.brand_name || 'TEJAS & COMPANY'}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {company.tagline || 'Leading manufacturer & supplier of Fruit & Vegetable Processing, Pulverizer Mills, Packaging, Oil Expelling, Roasting, Drying, and Industrial Utility Equipment.'}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={company.website || "http://tejasandcompany.in/"} target="_blank" rel="noreferrer" className="hover:text-amber-300 font-bold">
                  {company.website || 'tejasandcompany.in'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{company.sales_phone || '+91-98765 43210'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{company.official_email || 'info@tejasandcompany.in'}</span>
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
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Product Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {TEJAS_CATEGORIES.map((cat) => (
                <li key={cat.id} className="flex justify-between items-center">
                  <a href="#" className="hover:text-sky-400 transition-colors">
                    {cat.name}
                  </a>
                  <span className="text-[10px] text-amber-400 font-bold bg-slate-800 px-1.5 py-0.2 rounded-full">
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Machinery Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-sky-400">Apple & Fruit Grading Lines</a></li>
              <li><a href="#" className="hover:text-sky-400">10 HP Cold Press Oil Expeller Setup</a></li>
              <li><a href="#" className="hover:text-sky-400">Cyclone Blower Pulverizer Mills</a></li>
              <li><a href="#" className="hover:text-sky-400">Form-Fill-Seal Packaging Lines</a></li>
              <li><a href="#" className="hover:text-sky-400">Canning Retort Sterilizers</a></li>
              <li><a href="#" className="hover:text-sky-400">GSTIN: {company.gstin || '05AAACT1234F1Z9'}</a></li>
            </ul>
          </div>

          {/* Guarantee */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Verified Product Assurance
            </h4>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Manufacturer</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                All equipment directly manufactured and supplied by {company.legal_name || 'Tejas & Company Private Limited'}.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {company.legal_name || 'Tejas & Company'}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Catalog Terms</a>
            <span>•</span>
            <a href="#" className="hover:underline">GST Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
