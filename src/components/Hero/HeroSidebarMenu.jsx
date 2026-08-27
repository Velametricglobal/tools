import React, { useState } from 'react';
import {
  Apple,
  Wrench,
  PackageCheck,
  Zap,
  Droplets,
  Container,
  Sun,
  Flame,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  LayoutGrid
} from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const HERO_TEJAS_CATEGORIES = [
  {
    id: 'fruit-veg-processing',
    name: 'Fruit & Vegetable Processing',
    count: 10,
    icon: Apple,
    subcategories: [
      { name: 'Apple Grading & Sorting Machines', icon: Apple },
      { name: 'Fruits & Vegetable Crusher Machines', icon: Wrench },
      { name: 'Commercial Juicer Machines', icon: Droplets },
      { name: 'Potato, Turmeric & Ginger Peeler Washer', icon: Wrench },
      { name: 'Electric Hydraulic Juice Press', icon: Droplets },
      { name: 'Walnut, Almond & Apricot Cracker', icon: Wrench },
      { name: 'Gas Operated Steam Blanchers', icon: Flame },
      { name: 'Multi-Purpose Slicer Machines', icon: Utensils },
      { name: 'Fruits & Vegetables Pulping Machines', icon: Apple },
      { name: 'Colloidal Mill Paste Maker Machines', icon: Wrench }
    ]
  },
  {
    id: 'pulverizer-grinding',
    name: 'Pulverizer & Grinding',
    count: 3,
    icon: Wrench,
    subcategories: [
      { name: '2 in 1 Pulverizer Machines', icon: Wrench },
      { name: 'Bower Cyclone Pulverizer Machines', icon: Zap },
      { name: 'Fully Automatic 1 HP Flour Mill (8-10 kg/hr)', icon: Wrench }
    ]
  },
  {
    id: 'packaging-machines',
    name: 'Packaging Machines',
    count: 2,
    icon: PackageCheck,
    subcategories: [
      { name: 'Automatic Form-Fill-Seal Packing Machines', icon: PackageCheck },
      { name: '550W Hand Sealer for Laminated Pouches', icon: PackageCheck }
    ]
  },
  {
    id: 'industrial-utility',
    name: 'Industrial Utility Equipment',
    count: 2,
    icon: Zap,
    subcategories: [
      { name: 'STIHL MS 250 Petrol Chainsaws', icon: Wrench },
      { name: 'Portable Petrol Generators', icon: Zap }
    ]
  },
  {
    id: 'oil-processing',
    name: 'Oil Processing Machinery',
    count: 1,
    icon: Droplets,
    subcategories: [
      { name: 'Cold Press Oil Expeller (10 HP, 100 kg/hr)', icon: Droplets }
    ]
  },
  {
    id: 'liquid-processing',
    name: 'Liquid Processing Machines',
    count: 2,
    icon: Container,
    subcategories: [
      { name: 'Industrial RO Water Treatment Plants', icon: Container },
      { name: 'Digital Automatic Liquid Fillers (Single Nozzle)', icon: Droplets }
    ]
  },
  {
    id: 'drying-machines',
    name: 'Drying Machines',
    count: 1,
    icon: Sun,
    subcategories: [
      { name: 'Industrial Hot Air Tray Dryer Machines', icon: Sun }
    ]
  },
  {
    id: 'roasting-machines',
    name: 'Roasting Machines',
    count: 1,
    icon: Flame,
    subcategories: [
      { name: 'Gas Operated Tilting Drum Roaster Machines', icon: Flame }
    ]
  },
  {
    id: 'food-preservation',
    name: 'Food Preservation Equipment',
    count: 1,
    icon: ShieldCheck,
    subcategories: [
      { name: 'Commercial Canning Retort Sterilizer', icon: ShieldCheck }
    ]
  }
];

// Utensils helper fallback
function Utensils(props) {
  return <Wrench {...props} />;
}

export const HeroSidebarMenu = () => {
  const { setSelectedCategory } = useRenova();
  const [activeHoverId, setActiveHoverId] = useState('fruit-veg-processing');

  const currentHoverCat = HERO_TEJAS_CATEGORIES.find((c) => c.id === activeHoverId);

  return (
    <div
      className="hidden lg:block relative z-30"
      onMouseLeave={() => setActiveHoverId(null)}
    >
      <div className="bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200 w-72 overflow-hidden">
        
        {/* Sidebar Header */}
        <div className="px-4 py-3 bg-[#02408f] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-amber-400" />
            9 Main Categories (23 Products)
          </span>
          <span className="text-[10px] text-sky-200 font-bold">Tejas & Co.</span>
        </div>

        {/* Categories List */}
        <div className="py-1 divide-y divide-slate-100/80">
          {HERO_TEJAS_CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            const isHovered = activeHoverId === cat.id;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveHoverId(cat.id)}
                className="relative"
              >
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors text-left group ${
                    isHovered
                      ? 'bg-[#e0f2f1] text-[#02408f] font-extrabold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isHovered
                          ? 'bg-[#02408f] text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:text-[#02408f]'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="block text-xs truncate leading-tight">{cat.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({cat.count} {cat.count === 1 ? 'product' : 'products'})
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isHovered ? 'text-[#02408f] translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </button>
              </div>
            );
          })}

          {/* View All Categories Link */}
          <button
            onClick={() => setSelectedCategory('all')}
            className="w-full px-3.5 py-2.5 text-xs font-bold text-[#02408f] hover:bg-sky-50 flex items-center gap-2 transition-colors"
          >
            <div className="w-6 h-6 rounded-md bg-sky-100 text-[#02408f] flex items-center justify-center shrink-0">
              <LayoutGrid className="w-3.5 h-3.5" />
            </div>
            <span>View All 23 Tejas Products</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
        </div>

      </div>

      {/* Flyout Submenu Panel */}
      {currentHoverCat && (
        <div
          onMouseEnter={() => setActiveHoverId(currentHoverCat.id)}
          className="absolute left-full top-0 ml-1.5 w-72 bg-[#e4f6f6] rounded-2xl shadow-2xl border border-teal-200 p-4 space-y-3 animate-in fade-in slide-in-from-left-2 duration-150 z-40 min-h-[380px] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 pb-2.5 border-b border-teal-200/80 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#02408f] text-white flex items-center justify-center">
                {React.createElement(currentHoverCat.icon, { className: 'w-3.5 h-3.5' })}
              </div>
              <div>
                <span className="text-xs font-black uppercase text-[#02408f] tracking-wider block leading-tight">
                  {currentHoverCat.name}
                </span>
                <span className="text-[10px] text-teal-800 font-bold">
                  {currentHoverCat.count} Machinery Items Listed
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              {currentHoverCat.subcategories.map((sub, idx) => {
                const SubIcon = sub.icon || Zap;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(currentHoverCat.id)}
                    className="w-full text-left p-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-white hover:text-[#02408f] hover:shadow-xs transition-all flex items-center gap-2.5 group"
                  >
                    <div className="w-5 h-5 rounded-md bg-teal-100/70 text-[#02408f] flex items-center justify-center shrink-0 group-hover:bg-[#02408f] group-hover:text-white transition-colors">
                      <SubIcon className="w-3 h-3" />
                    </div>
                    <span className="truncate leading-tight">{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-teal-200/80">
            <button
              onClick={() => setSelectedCategory(currentHoverCat.id)}
              className="w-full bg-[#02408f] hover:bg-blue-900 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span>View All {currentHoverCat.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
