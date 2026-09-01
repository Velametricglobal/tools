import React, { useState } from 'react';
import { X, Wrench, ChevronDown, ChevronRight, Phone, MessageSquare, Heart, FileText, Globe, LayoutGrid, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';
import { TEJAS_CATEGORIES } from '../../data/tejasCategories';

export const MobileMenuDrawer = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    selectedCategory,
    setSelectedCategory,
    rfqCart,
    wishlist,
    setIsRFQDrawerOpen,
    setIsQuickQuoteOpen,
    branding
  } = useRenova();

  const [expandedCat, setExpandedCat] = useState(null);

  if (!isMobileMenuOpen) return null;

  const company = branding?.companyProfile || {};
  const logos = branding?.logos || {};
  const totalRFQItems = rfqCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden font-sans">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      />

      {/* Drawer Box */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-250">
        
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src={logos.primary_logo || '/velametric-logo.png'}
              alt="Velametric Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/velametric-logo.png';
              }}
              className="h-8 object-contain rounded-md bg-slate-900 p-0.5"
            />
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">VELAMETRIC DEMO</h3>
              <span className="text-[10px] text-sky-400 font-bold block">We Create. We Market. We Grow</span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body - Category Accordion */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
          
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Demo Categories
            </span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setIsMobileMenuOpen(false);
              }}
              className="text-[11px] font-bold text-sky-600 hover:underline flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-sky-500" />
              <span>Show All Items</span>
            </button>
          </div>

          {/* Categories Accordion */}
          <div className="space-y-1.5">
            {TEJAS_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const isExpanded = expandedCat === cat.id;

              return (
                <div key={cat.id} className="rounded-xl border border-slate-100 overflow-hidden">
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setExpandedCat((prev) => (prev === cat.id ? null : cat.id));
                    }}
                    className={`w-full p-2.5 text-xs font-bold flex items-center justify-between text-left transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-800 hover:bg-sky-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate">{cat.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          isSelected ? 'bg-sky-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isExpanded ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </button>

                  {/* Subcategories Accordion Content */}
                  {isExpanded && (
                    <div className="bg-sky-50/70 p-2.5 space-y-1 text-xs border-t border-sky-100">
                      {cat.subcategories.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left p-1.5 text-[11px] font-medium text-slate-700 hover:text-sky-600 hover:bg-white rounded-md transition-colors block truncate"
                        >
                          • {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setIsRFQDrawerOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-slate-900 text-white p-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span>RFQ Quote List</span>
              </div>
              <span className="bg-sky-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                {totalRFQItems} items
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('wishlist');
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-rose-50 text-rose-800 p-2.5 rounded-xl text-xs font-bold flex items-center justify-between border border-rose-200"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600 fill-current" />
                <span>Saved Items</span>
              </div>
              <span className="text-xs font-black">{wishlist.length}</span>
            </button>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
          <a
            href={`tel:${company.sales_phone || '+919876543210'}`}
            className="w-full bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Call Velametric Sales</span>
          </a>

          <a
            href={`https://wa.me/${(company.whatsapp_number || '919876543210').replace(/\D/g, '')}?text=Hi%20Velametric%20Global,%20I%20want%20a%20demo%20of%20the%20CRM.`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-emerald-500 text-slate-950 text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp CRM Demo</span>
          </a>
        </div>

      </div>
    </div>
  );
};
