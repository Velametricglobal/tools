import React from 'react';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const Footer = () => {
  return (
    <footer className="bg-[#113636] text-slate-300 pt-12 pb-6 border-t border-teal-900">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#339a99] text-white flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5 transform -rotate-12 text-amber-300" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                TOOLS<span className="text-[#339a99]">VILLA</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Toolsvilla is India's largest and most trusted online marketplace for machinery, agricultural tools, power equipment, and B2B industrial supplies. Serving over 500,000+ farmers, workshop owners, and SMBs with COD and fast delivery across India.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Toll Free Support: 1800-266-7788 (9 AM - 7 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@toolsvilla.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#339a99] shrink-0" />
                <span>Toolsvilla India Pvt Ltd, Park Street, Kolkata - 700016</span>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-teal-800 pb-2">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a href="#" className="hover:text-[#339a99] transition-colors">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* B2B & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-teal-800 pb-2">
              Customer & B2B Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-[#339a99]">Track My Order</a></li>
              <li><a href="#" className="hover:text-[#339a99]">GST Invoice & Input Credit</a></li>
              <li><a href="#" className="hover:text-[#339a99]">Bulk Wholesale Orders</a></li>
              <li><a href="#" className="hover:text-[#339a99]">Warranty & Repairs</a></li>
              <li><a href="#" className="hover:text-[#339a99]">Become a Seller / Supplier</a></li>
              <li><a href="#" className="hover:text-[#339a99]">Agri Technology Blog</a></li>
            </ul>
          </div>

          {/* Download App & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-teal-800 pb-2">
              Toolsvilla Mobile App
            </h4>
            <p className="text-xs text-slate-400">
              Download the Toolsvilla App for exclusive app-only deals and real-time order tracking.
            </p>

            <div className="space-y-2">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl border border-teal-800 flex items-center justify-center gap-3 transition-colors">
                <span className="text-xl">🤖</span>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] uppercase text-slate-400">GET IT ON</span>
                  <span className="text-xs font-bold text-white">Google Play Store</span>
                </div>
              </button>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl border border-teal-800 flex items-center justify-center gap-3 transition-colors">
                <span className="text-xl">🍎</span>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] uppercase text-slate-400">DOWNLOAD ON THE</span>
                  <span className="text-xs font-bold text-white">Apple App Store</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="border-t border-teal-900/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Toolsvilla.com (India's Largest Online Store for Machinery & Tools). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">GST Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
