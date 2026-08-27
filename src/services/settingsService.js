export const INITIAL_SITE_SETTINGS = {
  company_name: 'Tejas & Company',
  website_domain: 'tejasandcompany.in',
  contact_email: 'info@tejasandcompany.in',
  sales_phone: '+91-98765 43210',
  whatsapp_number: '919876543210',
  factory_address: 'Dehradun Industrial Estate, Uttarakhand, India',
  gstin: '05AAACT1234F1Z9',
  default_seo_title: 'Tejas & Company • Commercial Kitchen & Food Processing Machinery',
  default_meta_description: 'Official 23 products catalog across 9 main categories: Apple Grading, Pulverizers, Cold Press Oil Expeller, Canning Retort & SS 304 Kitchen Equipment.'
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
