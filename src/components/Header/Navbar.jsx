import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Mic,
  MapPin,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Wrench,
  Sparkles,
  Coins,
  LogOut,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const Navbar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    cart,
    wishlist,
    location,
    user,
    products,
    setIsCartOpen,
    setIsVoiceSearchOpen,
    setIsLocationModalOpen,
    setIsLoginModalOpen,
    setSelectedProduct
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products for instant auto-complete suggestions
  const searchSuggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#007777] to-[#339a99] flex items-center justify-center text-white shadow-md shadow-teal-900/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6 transform -rotate-12 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-sans leading-none">
                    TOOLS<span className="text-[#339a99]">VILLA</span>
                  </span>
                  <span className="bg-amber-400 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider">
                  MACHINERY & TOOLS HUB
                </span>
              </div>
            </a>

            {/* Pincode / Location Selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg text-slate-700 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#339a99] shrink-0" />
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-slate-400 font-medium">Deliver to</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  {location.pincode} - {location.city}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar with Category Dropdown & Voice Mic */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="flex items-center bg-slate-50 border-2 border-[#339a99] rounded-xl overflow-hidden shadow-xs focus-within:shadow-md focus-within:border-teal-700 transition-all">
              
              {/* Category Select */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="hidden sm:block text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-2.5 border-r border-slate-200 outline-none cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Input */}
              <div className="flex-1 flex items-center px-3 gap-2 bg-white">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search 50,000+ power tillers, water pumps, sprayers, cordless drills..."
                  className="w-full text-xs md:text-sm py-2.5 text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {/* Voice Search Button */}
                <button
                  onClick={() => setIsVoiceSearchOpen(true)}
                  title="Voice Search"
                  className="p-1.5 text-slate-400 hover:text-[#339a99] hover:bg-teal-50 rounded-full transition-colors relative group"
                >
                  <Mic className="w-4 h-4 text-[#339a99]" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Voice Search
                  </span>
                </button>
              </div>

              {/* Search Action Button */}
              <button className="bg-[#339a99] hover:bg-teal-700 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            {/* Auto-suggest Search Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Matching Products</span>
                  <span>{searchSuggestions.length} items</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-teal-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-800 truncate group-hover:text-[#339a99]">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-bold text-teal-700">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1 rounded-xs">
                            {item.discount}% OFF
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist, Account, Cart */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            
            {/* Wishlist */}
            <button
              onClick={() => setSelectedCategory('wishlist')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex flex-col items-center"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="text-[10px] font-medium hidden md:inline mt-0.5">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 md:px-3 md:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-teal-100 text-[#007777] font-bold text-xs flex items-center justify-center shrink-0">
                  {user.name[0]}
                </div>
                <div className="hidden lg:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    {user.name.split(' ')[0]}
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold flex items-center gap-0.5">
                    <Coins className="w-2.5 h-2.5 text-amber-500" />
                    {user.coins} Coins
                  </span>
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.phone}</p>
                    <div className="mt-2 flex items-center gap-1.5 bg-amber-50 text-amber-800 text-[11px] font-semibold px-2 py-1 rounded-md border border-amber-200">
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span>{user.coins} Toolsvilla Reward Coins</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile & GSTIN Settings
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4 text-slate-400" />
                      My Orders & Invoices
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Switch Account / Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#339a99] hover:bg-teal-700 text-white px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-sm hover:shadow transition-all group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-teal-900">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] uppercase font-semibold text-teal-100">My Cart</span>
                <span className="text-xs font-extrabold text-white">
                  ₹{cart.reduce((s, i) => s + i.product.price * i.quantity, 0).toLocaleString('en-IN')}
                </span>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
