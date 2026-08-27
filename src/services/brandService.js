import { supabase, isSupabaseConfigured } from './supabaseClient';
import brandData from '../../brand.json';

export const DEFAULT_COMPANY_PROFILE = brandData.company_profile;
export const DEFAULT_BRAND_TOKENS = brandData.brand_tokens;
export const DEFAULT_LOGOS = brandData.logos;
export const DEFAULT_BRAND_GUIDELINES = brandData.brand_guidelines;

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
