import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Building2 } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const ContactSection = () => {
  const { showToast } = useRenova();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Inquiry submitted to PK Renova Dehradun desk!');
  };

  return (
    <section className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                VISIT DEHRADUN FACTORY & SHOWROOM
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                CONTACT PK RENOVA INDUSTRIES
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Have a custom machinery requirement or need a formal RFQ quotation for your kitchen setup? Visit our Dehradun facility or contact our senior engineers directly.
            </p>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block text-sm">Factory & Office Address</span>
                  <span>1/1 Raipur, Near Vedic Sadhan Ashram, Tapovan, Dehradun, Uttarakhand – 248008</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-400 block text-[10px]">PHONE & WHATSAPP</span>
                    <a href="tel:+918954799323" className="font-bold text-white hover:text-sky-300">
                      +91-89547 99323
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-400 block text-[10px]">EMAIL INQUIRY</span>
                    <a href="mailto:support@pkrenova.com" className="font-bold text-white hover:text-emerald-300">
                      support@pkrenova.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/918954799323?text=Hi%20PK%20Renova,%20I%20want%20to%20visit%20your%20Dehradun%20showroom"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect Live on WhatsApp (+91 89547 99323)</span>
            </a>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
            
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              Send Direct Inquiry to Dehradun Factory Desk
            </h3>

            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-extrabold text-white">Inquiry Sent Successfully</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Our sales engineer will review your machinery requirements and respond within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#02408f] text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Mobile / WhatsApp Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">City & State</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dehradun, Uttarakhand"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Equipment / Project Details</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe required machinery, SS table dimensions, motor power, or kitchen setup plans..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#02408f] to-[#1662ad] hover:from-blue-800 hover:to-sky-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Factory Desk</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
