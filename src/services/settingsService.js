import { brandService } from './brandService';

const company = brandService.getCompanyProfile();

export const INITIAL_SITE_SETTINGS = {
  company_name: company.brand_name || 'Tejas & Company',
  website_domain: 'tejasandcompany.in',
  contact_email: company.official_email || 'info@tejasandcompany.in',
  sales_phone: company.sales_phone || '+91 98765 43210',
  whatsapp_number: company.whatsapp_number || '919876543210',
  factory_address: `${company.address}, ${company.city}, ${company.state}`,
  gstin: company.gstin || '05AAACT1234F1Z9',
  default_seo_title: `${company.brand_name} • Commercial Kitchen & Food Processing Machinery`,
  default_meta_description: company.tagline || 'Official products catalog across food processing, pulverizers, cold press oil expellers & stainless steel kitchen equipment.'
};

export const settingsService = {
  settingsState: { ...INITIAL_SITE_SETTINGS },

  getSettings() {
    return this.settingsState;
  },

  updateSettings(newSettings) {
    this.settingsState = { ...this.settingsState, ...newSettings };
    return this.settingsState;
  }
};
