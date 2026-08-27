import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BANNERS } from '../../data/banners';
import { useApp } from '../../context/AppContext';

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedCategory, setIsBulkInquiryOpen } = useApp();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNERS[currentSlide];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-8 md:py-12">
      {/* Background Decorative Lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 via-slate-900 to-emerald-950/70 z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
          
          {/* Slide Text Content */}
          <div className="lg:col-span-7 space-y-5 animate-in fade-in duration-300">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-400/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{slide.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-slate-300 font-medium max-w-2xl">
              {slide.subtitle}
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cash On Delivery (COD) Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>18% GST Tax Invoice & Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Year Manufacturer Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Factory Wholesale Pricing</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setSelectedCategory('farm-garden')}
                className="bg-gradient-to-r from-[#339a99] to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-teal-900/40 flex items-center gap-2 group transition-all"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsBulkInquiryOpen(true)}
                className="bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-slate-700 font-bold text-sm px-5 py-3.5 rounded-xl flex items-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Request GST Bulk Rate</span>
              </button>
            </div>

          </div>

          {/* Slide Image Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/30 group">
              <img
                src={slide.bgImage}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-400">Featured Offer</span>
                  <p className="text-xs font-bold text-white">{slide.tag}</p>
                </div>
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md">
                  BEST PRICE
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Navigation Dots & Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 mt-6">
          
          <div className="flex items-center gap-2">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-[#339a99]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1))}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % BANNERS.length)}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
