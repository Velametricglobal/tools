import React, { useState, useContext } from 'react';
import {
  Building2,
  Palette,
  Image as ImageIcon,
  Type,
  Eye,
  FileCheck2,
  Sparkles,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Landmark,
  ShieldAlert,
  Wrench,
  Download,
  Share2,
  Upload,
  Maximize2,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { brandService } from '../../../services/brandService';
import { RenovaContext } from '../../../context/RenovaContext';

export const CompanyBrandManager = () => {
  const [activeTab, setActiveTab] = useState('logos'); // default to logo management tab per user request
  const { updateGlobalBranding } = useContext(RenovaContext) || {};

  const [companyProfile, setCompanyProfile] = useState(brandService.getCompanyProfile());
  const [brandTokens, setBrandTokens] = useState(brandService.getBrandTokens());
  const [logos, setLogos] = useState(brandService.getLogos());
  const [guidelines, setGuidelines] = useState(brandService.getGuidelines());
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const handleProfileChange = (field, val) => {
    setCompanyProfile((prev) => ({ ...prev, [field]: val }));
  };

  const handleBankChange = (field, val) => {
    setCompanyProfile((prev) => ({
      ...prev,
      bank_details: { ...prev.bank_details, [field]: val }
    }));
  };

  const handleLogoChange = (field, val) => {
    setLogos((prev) => ({ ...prev, [field]: val }));
  };

  // Local File Upload Handler for Logo Images
  const handleLogoFileUpload = (logoKey, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogos((prev) => ({ ...prev, [logoKey]: reader.result }));
        setSaveSuccessMsg(`Uploaded new logo file for ${logoKey.replace('_', ' ')}!`);
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePalette = () => {
    const palette = brandService.generateBrandPalette(brandTokens.primary);
    setBrandTokens(palette);
    setSaveSuccessMsg('Brand palette generated automatically from primary color!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleApplyBrandKit = () => {
    brandService.updateCompanyProfile(companyProfile);
    brandService.updateBrandTokens(brandTokens);
    brandService.updateLogos(logos);
    brandService.updateGuidelines(guidelines);

    if (updateGlobalBranding) {
      updateGlobalBranding({
        companyProfile,
        brandTokens,
        logos
      });
    }

    setSaveSuccessMsg('Brand kit & Logo dimension settings applied across whole system!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#02408f]" />
            <span>Company Identity & Branding Kit</span>
            <span className="text-[10px] bg-sky-100 text-[#02408f] font-black px-2 py-0.5 rounded-md uppercase">
              Single Source of Truth
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure legal profile, logo uploads with height/width & scale controls, color palette, and 1-Click Brand Kit application
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleApplyBrandKit}
            className="bg-[#02408f] hover:bg-blue-900 text-white font-extrabold text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-md transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Apply Brand Kit to Whole System</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-extrabold">
        {[
          { id: 'profile', label: 'Company Profile', icon: Building2 },
          { id: 'logos', label: 'Logo Management (Upload & Scale)', icon: ImageIcon },
          { id: 'colors', label: 'Color Palette & Tokens', icon: Palette },
          { id: 'preview', label: 'Live Brand Preview', icon: Eye },
          { id: 'guidelines', label: 'Brand Guidelines', icon: FileCheck2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COMPANY PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase">1. Legal & Commercial Company Information</h3>
            <p className="text-xs text-slate-500">Legal registration numbers, official contact addresses, and bank accounts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Legal Name *</label>
              <input
                type="text"
                value={companyProfile.legal_name}
                onChange={(e) => handleProfileChange('legal_name', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Brand / Display Name *</label>
              <input
                type="text"
                value={companyProfile.brand_name}
                onChange={(e) => handleProfileChange('brand_name', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={companyProfile.tagline}
                onChange={(e) => handleProfileChange('tagline', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">GSTIN *</label>
              <input
                type="text"
                value={companyProfile.gstin}
                onChange={(e) => handleProfileChange('gstin', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none uppercase font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">PAN Number *</label>
              <input
                type="text"
                value={companyProfile.pan}
                onChange={(e) => handleProfileChange('pan', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none uppercase font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">CIN (Corporate Identity No.)</label>
              <input
                type="text"
                value={companyProfile.cin}
                onChange={(e) => handleProfileChange('cin', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none uppercase font-mono text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={companyProfile.official_email}
                onChange={(e) => handleProfileChange('official_email', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Sales Phone</label>
              <input
                type="text"
                value={companyProfile.sales_phone}
                onChange={(e) => handleProfileChange('sales_phone', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={companyProfile.whatsapp_number}
                onChange={(e) => handleProfileChange('whatsapp_number', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-black text-slate-900 uppercase mb-3 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#02408f]" />
              <span>Official Company Bank Details (Auto-Populates Documents)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={companyProfile.bank_details.account_holder}
                  onChange={(e) => handleBankChange('account_holder', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={companyProfile.bank_details.bank_name}
                  onChange={(e) => handleBankChange('bank_name', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Branch Name</label>
                <input
                  type="text"
                  value={companyProfile.bank_details.branch}
                  onChange={(e) => handleBankChange('branch', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={companyProfile.bank_details.account_number}
                  onChange={(e) => handleBankChange('account_number', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none bg-white font-mono font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={companyProfile.bank_details.ifsc_code}
                  onChange={(e) => handleBankChange('ifsc_code', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none bg-white font-mono uppercase font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">UPI ID</label>
                <input
                  type="text"
                  value={companyProfile.bank_details.upi_id}
                  onChange={(e) => handleBankChange('upi_id', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none bg-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOGO MANAGEMENT (WITH FILE UPLOAD, WIDTH, HEIGHT & SCALE SETTINGS) */}
      {activeTab === 'logos' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#02408f]" />
                <span>2. Brand Logo Management & Scaling Studio</span>
              </h3>
              <p className="text-xs text-slate-500">
                Upload local logo files directly or enter URL, and fine-tune Width (px), Height (px), and Scale %
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {[
              { key: 'primary_logo', prefix: 'primary', label: 'Primary Logo (Header/Website)', desc: 'Main logo used across website navbar and hero' },
              { key: 'secondary_logo', prefix: 'secondary', label: 'Secondary Logo', desc: 'Alternative compact or square variant' },
              { key: 'document_logo', prefix: 'document', label: 'Document Logo (Invoices/Quotes)', desc: 'Optimized high-resolution logo for PDFs and print' },
              { key: 'dark_logo', prefix: 'dark', label: 'Dark Mode Logo', desc: 'Light-colored logo for dark backgrounds' },
              { key: 'light_logo', prefix: 'light', label: 'Light Background Logo', desc: 'Dark-colored logo for white backgrounds' },
              { key: 'favicon', prefix: 'favicon', label: 'Website Favicon', desc: '32x32 browser tab icon' }
            ].map((item) => {
              const currentWidth = logos[`${item.prefix}_width`] || 140;
              const currentHeight = logos[`${item.prefix}_height`] || 48;
              const currentScale = logos[`${item.prefix}_scale`] || 100;

              return (
                <div key={item.key} className="bg-slate-50 p-5 rounded-3xl border border-slate-200/90 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
                  
                  {/* Title & File Upload Button */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{item.label}</h4>
                      <p className="text-[10px] text-slate-500">{item.desc}</p>
                    </div>

                    {/* Direct Local File Upload Button */}
                    <label className="bg-[#02408f] hover:bg-blue-900 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-amber-300" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLogoFileUpload(item.key, e)}
                      />
                    </label>
                  </div>

                  {/* Dynamic Scaling Image Preview Box */}
                  <div className="h-32 bg-white rounded-2xl border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative group">
                    <img
                      src={logos[item.key]}
                      alt={item.label}
                      className="object-contain transition-transform duration-200"
                      style={{
                        width: `${currentWidth}px`,
                        height: `${currentHeight}px`,
                        transform: `scale(${currentScale / 100})`,
                        transformOrigin: 'center center'
                      }}
                    />
                    <span className="absolute bottom-1 right-2 text-[9px] font-mono font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded-md">
                      {currentWidth}x{currentHeight}px | {currentScale}%
                    </span>
                  </div>

                  {/* Width & Height Setting Inputs */}
                  <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Width (px)</label>
                      <input
                        type="number"
                        value={currentWidth}
                        onChange={(e) => handleLogoChange(`${item.prefix}_width`, Number(e.target.value))}
                        className="w-full p-1.5 border border-slate-300 rounded-xl outline-none font-mono text-[11px] font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Height (px)</label>
                      <input
                        type="number"
                        value={currentHeight}
                        onChange={(e) => handleLogoChange(`${item.prefix}_height`, Number(e.target.value))}
                        className="w-full p-1.5 border border-slate-300 rounded-xl outline-none font-mono text-[11px] font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Scale % Slider */}
                  <div className="space-y-1 bg-white p-2.5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-700 flex items-center gap-1">
                        <Sliders className="w-3 h-3 text-[#02408f]" />
                        <span>Scale Factor</span>
                      </span>
                      <span className="text-[#02408f] font-mono font-black bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                        {currentScale}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={currentScale}
                      onChange={(e) => handleLogoChange(`${item.prefix}_scale`, Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#02408f]"
                    />
                  </div>

                  {/* Image URL Input Field */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Or Paste Image URL:</label>
                    <input
                      type="text"
                      value={logos[item.key]}
                      onChange={(e) => handleLogoChange(item.key, e.target.value)}
                      placeholder="https://..."
                      className="w-full p-2 border border-slate-300 rounded-xl bg-white outline-none font-mono text-[10px]"
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: COLOR PALETTE GENERATOR & TOKENS */}
      {activeTab === 'colors' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase">3. Brand Color Palette & Design Tokens</h3>
              <p className="text-xs text-slate-500">Pick a primary brand color to auto-generate WCAG compliant palette</p>
            </div>

            <button
              onClick={handleGeneratePalette}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Generate Brand Palette</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 text-xs">
            {[
              { key: 'primary', label: 'Primary Color' },
              { key: 'secondary', label: 'Secondary Color' },
              { key: 'accent', label: 'Accent CTA Color' },
              { key: 'background', label: 'Background' },
              { key: 'surface', label: 'Surface Card' },
              { key: 'text', label: 'Primary Text' },
              { key: 'textMuted', label: 'Muted Text' },
              { key: 'border', label: 'Border Divider' },
              { key: 'success', label: 'Success Green' },
              { key: 'warning', label: 'Warning Amber' },
              { key: 'error', label: 'Error Rose' }
            ].map((col) => (
              <div key={col.key} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div
                  className="h-14 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center font-mono font-extrabold text-[10px]"
                  style={{ backgroundColor: brandTokens[col.key] || '#ffffff' }}
                >
                  <span className="bg-slate-900/80 text-white px-2 py-0.5 rounded-md">
                    {brandTokens[col.key]}
                  </span>
                </div>
                <span className="font-bold text-slate-700 block text-[11px] truncate">{col.label}</span>
                <input
                  type="color"
                  value={brandTokens[col.key] || '#02408f'}
                  onChange={(e) => handleTokenChange(col.key, e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer border border-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LIVE BRAND PREVIEW */}
      {activeTab === 'preview' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase">4. Live System Branding Preview</h3>
            <p className="text-xs text-slate-500">Real-time preview of buttons, machinery cards, and invoices using current brand kit</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Website Hero Card Preview */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-md">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Website Mockup</span>
              <div className="flex items-center gap-3">
                <img
                  src={logos.primary_logo}
                  alt="Logo"
                  className="object-contain rounded-lg bg-white p-1"
                  style={{
                    width: `${logos.primary_width || 140}px`,
                    height: `${logos.primary_height || 48}px`,
                    transform: `scale(${(logos.primary_scale || 100) / 100})`,
                    transformOrigin: 'center left'
                  }}
                />
                <div>
                  <h4 className="font-extrabold text-base">{companyProfile.brand_name}</h4>
                  <p className="text-[10px] text-slate-300">{companyProfile.tagline}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-2 border border-white/10">
                <h5 className="font-extrabold text-sm text-white">Commercial Pulverizer Line</h5>
                <p className="text-xs text-slate-300">Continuous 1000 kg/hr stainless steel spices & grain processing machine.</p>
                <div className="flex gap-2 pt-2">
                  <button
                    className="px-4 py-2 rounded-xl font-extrabold text-xs shadow-sm"
                    style={{ backgroundColor: brandTokens.accent, color: '#0f172a' }}
                  >
                    Request Quote
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl font-extrabold text-xs text-white border border-white/30"
                    style={{ backgroundColor: brandTokens.primary }}
                  >
                    Download Spec Sheet
                  </button>
                </div>
              </div>
            </div>

            {/* Document Invoice Card Preview */}
            <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm" style={{ color: brandTokens.primary }}>
                    TAX INVOICE
                  </h4>
                  <span className="font-mono text-[10px] text-slate-500">INV-2026-27-0101</span>
                </div>
                <div
                  className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase"
                  style={{ backgroundColor: brandTokens.primary, color: '#ffffff' }}
                >
                  PAID ₹2,80,250
                </div>
              </div>

              <div className="text-[11px] space-y-1 text-slate-600">
                <p><strong>Billed To:</strong> Himalayan Food Processing Pvt Ltd</p>
                <p><strong>GSTIN:</strong> 05AAACH9988K1Z2</p>
                <p><strong>Bank:</strong> {companyProfile.bank_details.bank_name} ({companyProfile.bank_details.ifsc_code})</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: BRAND GUIDELINES */}
      {activeTab === 'guidelines' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase">5. Brand Story & Guidelines</h3>
            <p className="text-xs text-slate-500">Mission, vision, brand voice, and values used for AI content generation</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Brand Story</label>
              <textarea
                rows={3}
                value={guidelines.story}
                onChange={(e) => setGuidelines({ ...guidelines, story: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Mission</label>
                <textarea
                  rows={2}
                  value={guidelines.mission}
                  onChange={(e) => setGuidelines({ ...guidelines, mission: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Vision</label>
                <textarea
                  rows={2}
                  value={guidelines.vision}
                  onChange={(e) => setGuidelines({ ...guidelines, vision: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
