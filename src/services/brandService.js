import { supabase, isSupabaseConfigured } from './supabaseClient';

export const DEFAULT_COMPANY_PROFILE = {
  legal_name: 'Tejas & Company Private Limited',
  brand_name: 'Tejas & Company',
  tagline: 'Engineered for Commercial Kitchen & Food Processing Excellence',
  company_type: 'Private Limited',
  registration_no: 'REG-UR-2026-9876',
  gstin: '05AAACT1234F1Z9',
  pan: 'AAACT1234F',
  cin: 'U29100UR2026PTC012345',
  website: 'http://tejasandcompany.in/',
  official_email: 'info@tejasandcompany.in',
  support_email: 'support@tejasandcompany.in',
  accounts_email: 'accounts@tejasandcompany.in',
  sales_phone: '+91 98765 43210',
  whatsapp_number: '919876543210',
  address: 'Plot No. 42, Industrial Estate, Patel Nagar',
  city: 'Dehradun',
  state: 'Uttarakhand',
  country: 'India',
  pincode: '248001',
  google_maps_url: 'https://maps.google.com/?q=Dehradun+Industrial+Estate',
  bank_details: {
    account_holder: 'Tejas & Company Private Limited',
    bank_name: 'HDFC Bank Ltd',
    branch: 'Rajpur Road Main Branch, Dehradun',
    account_number: '50200088991122',
    ifsc_code: 'HDFC0001234',
    upi_id: 'tejasandcompany@hdfcbank'
  }
};

export const DEFAULT_BRAND_TOKENS = {
  primary: '#02408f',
  secondary: '#0f172a',
  accent: '#fbbf24',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textMuted: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  radius: '16px'
};

export const DEFAULT_LOGOS = {
  primary_logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
  primary_width: 140,
  primary_height: 48,
  primary_scale: 100,

  secondary_logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
  secondary_width: 120,
  secondary_height: 40,
  secondary_scale: 100,

  document_logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
  document_width: 160,
  document_height: 50,
  document_scale: 100,

  dark_logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
  dark_width: 140,
  dark_height: 48,
  dark_scale: 100,

  light_logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
  light_width: 140,
  light_height: 48,
  light_scale: 100,

  favicon: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=64&q=80',
  favicon_width: 32,
  favicon_height: 32,
  favicon_scale: 100
};

export const DEFAULT_BRAND_GUIDELINES = {
  story: 'Established in Dehradun, Tejas & Company is Uttarakhand’s premier manufacturer of 100% AISI 304 food-grade stainless steel commercial kitchen equipment, pulverizers, fruit processing machinery, and cold press oil expellers.',
  mission: 'To empower food processors and commercial kitchens with continuous high-yield, hygienic, and energy-efficient machinery.',
  vision: 'To become India’s most trusted B2B manufacturer for turnkey industrial food processing lines.',
  voice: 'Professional, Engineering-Grounded, Reliable, Premium',
  tagline: 'Engineered for Commercial Kitchen & Food Processing Excellence'
};

export const brandService = {
  companyProfileState: { ...DEFAULT_COMPANY_PROFILE },
  brandTokensState: { ...DEFAULT_BRAND_TOKENS },
  logosState: { ...DEFAULT_LOGOS },
  guidelinesState: { ...DEFAULT_BRAND_GUIDELINES },

  getCompanyProfile() {
    return this.companyProfileState;
  },

  updateCompanyProfile(profile) {
    this.companyProfileState = { ...this.companyProfileState, ...profile };
    return this.companyProfileState;
  },

  getBrandTokens() {
    return this.brandTokensState;
  },

  updateBrandTokens(tokens) {
    this.brandTokensState = { ...this.brandTokensState, ...tokens };
    return this.brandTokensState;
  },

  getLogos() {
    return this.logosState;
  },

  updateLogos(logos) {
    this.logosState = { ...this.logosState, ...logos };
    return this.logosState;
  },

  getGuidelines() {
    return this.guidelinesState;
  },

  updateGuidelines(guidelines) {
    this.guidelinesState = { ...this.guidelinesState, ...guidelines };
    return this.guidelinesState;
  },

  // Color Palette Generator based on Primary Hex
  generateBrandPalette(primaryHex = '#02408f') {
    return {
      primary: primaryHex,
      secondary: '#0f172a',
      accent: '#fbbf24',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      textMuted: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };
  }
};
