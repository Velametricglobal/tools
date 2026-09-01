import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  FileText,
  Heart,
  Wrench,
  X,
  Menu,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const RenovaNavbar = () => {
  const {
    branding,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    rfqCart,
    wishlist,
    products,
    setIsRFQDrawerOpen,
    setIsQuickQuoteOpen,
    setSelectedProduct,
    rfqSubtotal,
    setIsMobileMenuOpen
  } = useRenova();

  const company = branding?.companyProfile || {};
  const tokens = branding?.brandTokens || {};
  const logos = branding?.logos || {};

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);

  const totalRFQItems = rfqCart.reduce((sum, item) => sum + item.quantity, 0);

  // Auto-complete match suggestions
  const searchSuggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logoWidth = logos.primary_width || 140;
  const logoHeight = logos.primary_height || 44;
  const logoScale = logos.primary_scale || 100;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 font-sans">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Mobile Hamburger & "DEMO CRM FOR ECOMMERCE BUSINESS" Text */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              style={{ color: tokens.primary }}
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo & "DEMO CRM FOR ECOMMERCE BUSINESS" Header Text */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
              {logos.primary_logo ? (
                <img
                  src={logos.primary_logo}
                  alt="Velametric Global Logo"
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                  style={{
                    width: `${logoWidth}px`,
                    height: `${logoHeight}px`,
                    transform: `scale(${logoScale / 100})`,
                    transformOrigin: 'center left'
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-sky-400 flex items-center justify-center font-black text-xs shadow-md">
                  VG
                </div>
              )}

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  {/* TEXT REQUESTED BY USER: DEMO CRM FOR ECOMMERCE BUSINESS */}
                  <span className="text-sm sm:text-base font-black tracking-tight uppercase leading-none text-slate-900 font-sans">
                    DEMO CRM FOR E-COMMERCE BUSINESS
                  </span>
                  <span className="hidden xs:inline bg-sky-400 text-slate-950 font-black text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-2xs">
                    VELAMETRIC DEMO
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase hidden sm:block truncate max-w-[320px]">
                  Via Velametric Global • We Create. We Market. We Grow
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md relative" ref={searchRef}>
            <div
              className="flex items-center bg-slate-50 border-2 rounded-xl overflow-hidden shadow-xs transition-colors"
              style={{ borderColor: tokens.primary || '#0f172a' }}
            >
              <div className="flex-1 flex items-center px-3 gap-2 bg-white py-1.5">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search Products, CRM Leads, Deals..."
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                className="text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                style={{ backgroundColor: tokens.primary || '#0f172a' }}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            {/* Desktop Auto-suggest Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Matching Demo Catalog Items
                </div>
                <div className="divide-y divide-slate-100">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-sky-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-800 truncate group-hover:text-sky-600">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-bold text-slate-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Items */}
            <button
              onClick={() => setSelectedCategory('wishlist')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex flex-col items-center"
              title="Saved Items"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* RFQ Cart Button */}
            <button
              onClick={() => setIsRFQDrawerOpen(true)}
              className="text-white px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-2 shadow-sm transition-all group"
              style={{ backgroundColor: tokens.primary || '#0f172a' }}
            >
              <div className="relative">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-sky-300 group-hover:scale-110 transition-transform" />
                {totalRFQItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-sky-400 text-slate-950 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-slate-950">
                    {totalRFQItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[9px] uppercase font-bold text-sky-300">Quote List</span>
                <span className="text-xs font-extrabold text-white">
                  ₹{rfqSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </button>

            {/* Quick Quote CTA (Desktop) */}
            <button
              onClick={() => setIsQuickQuoteOpen(true)}
              className="hidden lg:flex items-center gap-1.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all uppercase tracking-wider"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

        {/* Mobile Expandable Search Bar Overlay */}
        {showMobileSearch && (
          <div className="lg:hidden mt-2.5 pt-2 border-t border-slate-100 animate-in slide-in-from-top-1 duration-150">
            <div
              className="flex items-center bg-slate-50 border-2 rounded-xl overflow-hidden px-3 py-1.5"
              style={{ borderColor: tokens.primary || '#0f172a' }}
            >
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Demo Products..."
                className="w-full text-xs text-slate-800 outline-none bg-transparent"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
