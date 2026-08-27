import React from 'react';
import { ShieldCheck, Truck, FileText, Headphones, RefreshCw } from 'lucide-react';
import { TRUST_BADGES } from '../../data/banners';

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  Truck: Truck,
  FileText: FileText,
  Headphones: Headphones,
  RefreshCw: RefreshCw
};

export const TrustBar = () => {
  return (
    <section className="bg-white py-5 border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TRUST_BADGES.map((badge, idx) => {
            const IconComp = ICON_MAP[badge.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-100/70 text-[#007777] flex items-center justify-center shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
