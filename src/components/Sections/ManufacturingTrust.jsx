import React from 'react';
import { ShieldCheck, Award, Wrench, RefreshCw, Truck } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: '100% AISI 304 Food Grade SS',
    desc: 'Hygienic, corrosion-free stainless steel certified for all commercial food touchpoints.'
  },
  {
    icon: Wrench,
    title: 'Custom SS Fabrication',
    desc: 'Tailored dimensions and custom burner configurations to fit any commercial kitchen space.'
  },
  {
    icon: Award,
    title: 'Dehradun Factory Direct',
    desc: 'Eliminate middleman margins and enjoy direct manufacturer pricing and warranty support.'
  },
  {
    icon: Truck,
    title: 'North India On-Site Setup',
    desc: 'Complete delivery, testing, and technician installation support across Uttarakhand & NCR.'
  }
];

export const ManufacturingTrust = () => {
  return (
    <section className="bg-white py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            THE PK RENOVA MANUFACTURING GUARANTEE
          </h2>
          <p className="text-xs text-slate-500">
            Trusted by over 500+ commercial kitchens, bakeries, hotels & cloud kitchens
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-center space-y-3 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-100/70 text-[#02408f] flex items-center justify-center mx-auto group-hover:bg-[#02408f] group-hover:text-white transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
