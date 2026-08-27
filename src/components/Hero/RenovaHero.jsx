import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Award, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';
import { HeroSidebarMenu } from './HeroSidebarMenu';
import { HeroSearchFilterBar } from './HeroSearchFilterBar';

export const RenovaHero = () => {
  const { branding, setSelectedCategory, setIsQuickQuoteOpen, products, setSelectedProduct } = useRenova();
  const company = branding?.companyProfile || {};
  const tokens = branding?.brandTokens || {};

  // Top 10 Featured Machinery Products for Hero Slider
  const sliderProducts = products.slice(0, 10);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slide animation every 2000ms (2 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, sliderProducts.length]);

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? sliderProducts.length - 1 : prev - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
  };

  const activeProduct = sliderProducts[currentSlide] || sliderProducts[0];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-8 md:py-12">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950/80 z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 1. Desktop Left Sidebar Category Menu */}
          <div className="lg:col-span-3">
            <HeroSidebarMenu />
          </div>

          {/* 2. Center Text + Product Slider + Bottom Filter Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Grid: Text & Animated Slider */}
            <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 items-start">
              
              {/* Left Hero Text */}
              <div className="lg:col-span-5 space-y-5 pt-2">
                
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-sky-300 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-400/30">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{company.brand_name || 'TEJAS & COMPANY'} OFFICIAL CATALOG</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight uppercase font-sans">
                  INDUSTRIAL MACHINERY & <span style={{ color: tokens.accent || '#fbbf24' }}>FOOD PROCESSING</span> LINES
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {company.tagline || 'Official processing, grinding, packaging, roasting, drying, oil expelling & liquid processing equipment catalog.'}
                </p>

                {/* Key Value Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Fruit & Vegetable Processing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Pulverizers & Mills</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cold Press Oil Expeller Setup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Packaging & Liquid Lines</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedCategory('fruit-veg-processing')}
                    className="text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 group transition-all"
                    style={{ backgroundColor: tokens.primary || '#02408f' }}
                  >
                    <span>Browse Machinery Catalog</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setIsQuickQuoteOpen(true)}
                    className="text-slate-950 font-black text-xs px-4 py-3 rounded-xl flex items-center gap-1.5 shadow-md transition-colors uppercase tracking-wider"
                    style={{ backgroundColor: tokens.accent || '#fbbf24' }}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Request RFQ Quote</span>
                  </button>
                </div>

              </div>

              {/* Right Showcase 10-Product Animated Slider (2000ms Interval) */}
              <div className="lg:col-span-4 flex flex-col items-center pt-2">
                <div
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setSelectedProduct(activeProduct)}
                  className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/40 cursor-pointer group select-none"
                >
                  {/* Product Background Image with 2000ms Fade Transition */}
                  {sliderProducts.map((prod, idx) => (
                    <img
                      key={prod.id}
                      src={prod.image}
                      alt={prod.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                        idx === currentSlide
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 z-0'
                      }`}
                    />
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/10 z-10" />

                  {/* Top Slide Counter & Speed Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                    <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-[10px] font-bold text-sky-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>SLIDE {currentSlide + 1} OF 10 • 2000ms</span>
                    </div>

                    <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                      ₹{activeProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Navigation Arrow Buttons */}
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center z-20 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-all"
                    style={{ backgroundColor: tokens.primary || '#02408f' }}
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center z-20 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-all"
                    style={{ backgroundColor: tokens.primary || '#02408f' }}
                    title="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Bottom Details Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 flex items-center justify-between z-20 group-hover:border-sky-400 transition-colors">
                    <div className="min-w-0 pr-2">
                      <span className="text-[9px] uppercase font-bold text-sky-400 block truncate">
                        {activeProduct.subcategory}
                      </span>
                      <p className="text-xs font-black text-white truncate leading-snug">
                        {activeProduct.name}
                      </p>
                    </div>
                    <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-1 rounded-md shrink-0 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>SPECS</span>
                    </span>
                  </div>

                </div>

                {/* Slider Dots */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  {sliderProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-6 bg-amber-400'
                          : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

            </div>

            {/* Product Search & Filter Bar */}
            <HeroSearchFilterBar />

          </div>

        </div>
      </div>
    </section>
  );
};
