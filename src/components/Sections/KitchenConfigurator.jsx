import React, { useState } from 'react';
import { ChefHat, Check, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

const KITCHEN_TYPES = [
  {
    id: 'restaurant',
    title: 'Fine Dining & Multi-Cuisine Restaurant',
    desc: '304 Grade Work Tables, SS Tandoors, 4-Burner Gas Range, Pizza Oven & Visi Cooler',
    estBudget: '₹1.5 Lakh - ₹3.8 Lakh'
  },
  {
    id: 'bakery',
    title: 'Commercial Bakery & Pastry Shop',
    desc: 'Atta Kneader, Deck Oven, Stainless Steel Work Tables, Planetary Mixer & Display Fridge',
    estBudget: '₹1.2 Lakh - ₹2.5 Lakh'
  },
  {
    id: 'cloud-kitchen',
    title: 'Cloud Kitchen & QSR Outlet',
    desc: 'Compact SS Prep Table, Deep Fryers, Griddles, Pulverizer & Continuous Band Sealer',
    estBudget: '₹95,000 - ₹2.2 Lakh'
  },
  {
    id: 'hotel-canteen',
    title: 'Hotel, Hostel & Industrial Canteen',
    desc: 'Bulk Tilting Pan, Masala Ribbon Mixer, 3 HP Pulverizer, Commercial Dishwasher & Freezers',
    estBudget: '₹2.8 Lakh - ₹6.5 Lakh'
  }
];

export const KitchenConfigurator = () => {
  const [selectedType, setSelectedType] = useState('restaurant');
  const { setIsQuickQuoteOpen } = useRenova();

  const currentConfig = KITCHEN_TYPES.find((k) => k.id === selectedType);

  return (
    <section className="bg-gradient-to-r from-slate-900 via-[#02408f] to-slate-900 py-12 text-white border-y border-blue-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              PK Renova Commercial Setup Wizard
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              COMMERCIAL KITCHEN PLANNING & SETUP
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Planning a new restaurant, bakery, or cloud kitchen in Dehradun or North India? Select your business type below to view custom equipment recommendations & estimated SS 304 package pricing.
            </p>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-blue-500/30 text-xs text-sky-200 space-y-1">
              <span className="font-bold text-white block">Includes Dehradun Factory Benefits:</span>
              <p>• On-site kitchen layout consultation & custom fabrication</p>
              <p>• 100% Stainless Steel 304 Food Grade Certification</p>
            </div>
          </div>

          {/* Right Configurator */}
          <div className="lg:col-span-7 bg-slate-950/90 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 shadow-2xl space-y-5">
            
            <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              Select Your Establishment Type:
            </div>

            {/* Type Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KITCHEN_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedType === type.id
                      ? 'border-amber-400 bg-blue-900/60 ring-2 ring-amber-400/30'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">{type.title}</span>
                    {selectedType === type.id && (
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{type.desc}</p>
                </button>
              ))}
            </div>

            {/* Config Summary Card */}
            {currentConfig && (
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Recommended Equipment Package:</span>
                  <span className="font-black text-amber-400">{currentConfig.estBudget}</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">{currentConfig.desc}</p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => setIsQuickQuoteOpen(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all uppercase tracking-wider"
            >
              <span>Get Detailed Setup Quotation (RFQ)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
