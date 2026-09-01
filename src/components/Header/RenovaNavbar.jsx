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
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

const FALLBACK_LOGO = '/velametric-logo.png';

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

  const logoWidth = logos.primary_width || 150;
  const logoHeight = logos.primary_height || 46;
  const logoScale = logos.primary_scale || 100;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      {/* Top Accent Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-slate-900 via-sky-500 to-slate-900 w-full" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 font-sans">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Left: Hamburger, Mobile Quick Dropdown & Desktop Header */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Section: Logo hidden on mobile (hidden sm:block), replaced by Mobile Header Dropdown Menu (sm:hidden) */}
            <div className="flex items-center gap-3">
              {/* Logo: Hidden on mobile (sm:hidden), visible on sm+ */}
              <img
                src={logos.primary_logo || FALLBACK_LOGO}
                alt="Velametric Global Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_LOGO;
                }}
                className="hidden sm:block object-contain transition-transform duration-200 hover:scale-102 cursor-pointer"
                onClick={() => setSelectedCategory('all')}
                style={{
                  width: `${logoWidth}px`,
                  height: `${logoHeight}px`,
                  transform: `scale(${logoScale / 100})`,
                  transformOrigin: 'center left'
                }}
              />

              {/* Desktop Header Text (sm:block) */}
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-tight uppercase leading-none text-slate-900 font-sans">
                    DEMO CRM FOR E-COMMERCE BUSINESS
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5 text-slate-950" />
                    <span>CLIENT DEMO</span>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase truncate max-w-[340px] mt-0.5">
                  Via Velametric Global • We Create. We Market. We Grow
                </span>
              </div>

              {/* Mobile Header Quick Dropdown Menu (sm:hidden - Replaces logo on mobile screens) */}
              <div className="flex sm:hidden flex-col min-w-0 max-w-[195px] xs:max-w-[230px]">
                <span className="text-[11px] font-black tracking-tight uppercase leading-tight text-slate-900 truncate">
                  DEMO CRM E-COMMERCE
                </span>

                {/* Mobile Dropdown Quick Selector */}
                <div className="mt-1 relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-950 text-sky-400 font-extrabold text-[10px] py-1 px-2.5 rounded-lg appearance-none outline-none border border-slate-800 pr-6 uppercase tracking-wider cursor-pointer shadow-2xs truncate"
                  >
                    <option value="all">⚡ Select Category ▼</option>
                    <option value="all">All 23 Demo Items</option>
                    <option value="fruit-veg-processing">Fruit & Veg Processing</option>
                    <option value="pulverizer-grinding">Pulverizers & Mills</option>
                    <option value="packaging-machines">Packaging Lines</option>
                    <option value="industrial-utility">Industrial Utility</option>
                    <option value="food-preservation">Canning Retorts</option>
                    <option value="oil-processing">Cold Press Oil Expeller</option>
                    <option value="drying-machines">Tray Dryers</option>
                    <option value="liquid-processing">Liquid Filling & RO</option>
                    <option value="roasting-machines">Tilting Drum Roaster</option>
                    <option value="wishlist">Saved Wishlist Items</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center px-1 text-sky-400">
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md relative" ref={searchRef}>
            <div className="flex items-center bg-slate-50 border border-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 rounded-xl overflow-hidden shadow-2xs transition-all">
              <div className="flex-1 flex items-center px-3.5 gap-2.5 bg-white py-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search Demo Products, CRM Deals, Inquiries..."
                  className="w-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-sky-400" />
                <span>Search</span>
              </button>
            </div>

            {/* Desktop Auto-suggest Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Matching Demo Products
                </div>
                <div className="divide-y divide-slate-100">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-sky-50/60 flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0 shadow-2xs"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-extrabold text-sky-600">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Items */}
            <button
              onClick={() => setSelectedCategory('wishlist')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex flex-col items-center"
              title="Saved Items"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* RFQ Quote List Drawer Button */}
            <button
              onClick={() => setIsRFQDrawerOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-2.5 shadow-xs transition-all hover:shadow-md group"
            >
              <div className="relative">
                <FileText className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-sky-400 group-hover:scale-110 transition-transform" />
                {totalRFQItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-sky-400 text-slate-950 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-slate-950">
                    {totalRFQItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[9px] uppercase font-bold text-slate-400">Quote List</span>
                <span className="text-xs font-extrabold text-sky-400">
                  ₹{rfqSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </button>

            {/* Get Quote CTA Button */}
            <button
              onClick={() => setIsQuickQuoteOpen(true)}
              className="hidden lg:flex items-center gap-1.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all uppercase tracking-wider"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

        {/* Mobile Expandable Search Bar Overlay */}
        {showMobileSearch && (
          <div className="lg:hidden mt-2.5 pt-2 border-t border-slate-100 animate-in slide-in-from-top-1 duration-150">
            <div className="flex items-center bg-slate-50 border border-slate-300 focus-within:border-sky-500 rounded-xl overflow-hidden px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Demo Products & CRM Deals..."
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
