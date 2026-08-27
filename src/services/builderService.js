import { supabase, isSupabaseConfigured } from './supabaseClient';

export const INITIAL_HOMEPAGE_SECTIONS = [
  {
    id: 'sec-hero-01',
    section_type: 'HERO',
    name: 'Main Hero Section',
    sort_order: 1,
    is_enabled: true,
    content_json: {
      heading: 'ENGINEERED FOR COMMERCIAL KITCHEN EXCELLENCE',
      subheading: 'DEHRADUN PREMIER MANUFACTURER',
      description: 'Manufacturer of 100% AISI 304 Food-Grade Stainless Steel Work Tables, Commercial Pulverizers, Pizza Ovens, Visi Coolers & Machinery.',
      primary_cta: { label: 'Explore Machinery Range', url: '#product-catalog' },
      secondary_cta: { label: 'Request RFQ Quote', url: '#contact' },
      badge: 'OFFICIAL CATALOG • 23 PRODUCTS',
      alignment: 'left',
      hero_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    },
    style_json: {
      background_color: '#070d19',
      text_color: '#ffffff',
      accent_color: '#02408f',
      padding_top: '60px',
      padding_bottom: '60px'
    },
    responsive_json: { desktop_columns: 12, mobile_columns: 1 },
    animation_json: { fade_in: true, duration: 700 }
  },
  {
    id: 'sec-3d-02',
    section_type: '3D_HERO',
    name: '3D Machinery Interactive Viewer',
    sort_order: 2,
    is_enabled: true,
    content_json: {
      enable_3d: true,
      model_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      camera_position: { x: 0, y: 1.5, z: 4 },
      rotation_speed: 1.5,
      mouse_interaction: true,
      scroll_interaction: true,
      environment_light: 'studio',
      particle_intensity: 0.8,
      glow_opacity: 0.6,
      fallback_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    },
    style_json: { background_color: '#0f172a' },
    responsive_json: { desktop_height: '450px', mobile_height: '300px' }
  },
  {
    id: 'sec-stats-03',
    section_type: 'STATS',
    name: 'Key Business Statistics',
    sort_order: 3,
    is_enabled: true,
    content_json: {
      stats: [
        { number: '23', suffix: '+', label: 'Verified Machinery Models' },
        { number: '9', suffix: '', label: 'Core Product Divisions' },
        { number: '100', suffix: '%', label: 'SS 304 Food Grade Material' },
        { number: '500', suffix: '+', label: 'Commercial Projects Completed' }
      ]
    },
    style_json: { background_color: '#02408f', text_color: '#ffffff' }
  },
  {
    id: 'sec-[#00408f]-services-04',
    section_type: 'SERVICES',
    name: 'Dynamic Services & Categories Showcase',
    sort_order: 4,
    is_enabled: true,
    content_json: {
      title: 'Our 9 Core Machinery Categories',
      subtitle: 'Engineered for high yield, food safety, and continuous industrial operations',
      layout: 'grid',
      grid_columns: 3,
      show_icons: true,
      show_count: true
    },
    style_json: { background_color: '#f8fafc' }
  },
  {
    id: 'sec-process-05',
    section_type: 'PROCESS',
    name: '5-Step Manufacturing & Installation Process',
    sort_order: 5,
    is_enabled: true,
    content_json: {
      title: 'How We Work',
      steps: [
        { step: 1, title: 'Requirement Audit', desc: 'Assess kitchen layout, capacity requirements, and power specs' },
        { step: 2, title: 'Custom 3D CAD Design', desc: 'Fabrication drawings for SS 304 worktables, sinks & counters' },
        { step: 3, title: 'Precision Manufacturing', desc: 'Laser cutting, TIG welding & mirror polishing in Dehradun' },
        { step: 4, title: 'Quality Inspection', desc: '100% SS 304 verification and pressure testing' },
        { step: 5, title: 'On-Site Commissioning', desc: 'Delivery, installation and operator training' }
      ]
    },
    style_json: { background_color: '#ffffff' }
  },
  {
    id: 'sec-cta-06',
    section_type: 'CTA',
    name: 'Bottom Conversion CTA',
    sort_order: 6,
    is_enabled: true,
    content_json: {
      heading: 'READY TO UPGRADE YOUR COMMERCIAL KITCHEN?',
      description: 'Get factory-direct prices with 18% GST Input Tax Credit invoices and Dehradun installation support.',
      button_text: 'Request Instant WhatsApp Quote',
      button_url: 'https://wa.me/919876543210'
    },
    style_json: { background_color: '#0f172a', text_color: '#ffffff' }
  }
];

export const builderService = {
  sectionsState: [...INITIAL_HOMEPAGE_SECTIONS],
  versionsState: [
    {
      id: 'ver-01',
      version_number: 1,
      status: 'PUBLISHED',
      created_at: new Date().toISOString(),
      content_snapshot: INITIAL_HOMEPAGE_SECTIONS
    }
  ],

  async getPageSections(pageSlug = 'home') {
    if (isSupabaseConfigured) {
      const { data: page } = await supabase.from('pages').select('id').eq('slug', pageSlug).single();
      if (page) {
        const { data: sections, error } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_id', page.id)
          .order('sort_order', { ascending: true });
        if (!error && sections && sections.length > 0) return sections;
      }
    }
    return this.sectionsState;
  },

  async updateSections(newSections) {
    this.sectionsState = newSections.map((sec, idx) => ({ ...sec, sort_order: idx + 1 }));
    if (isSupabaseConfigured) {
      for (const sec of this.sectionsState) {
        await supabase.from('page_sections').upsert(sec);
      }
    }
    return this.sectionsState;
  },

  async saveDraft(sections) {
    const updated = await this.updateSections(sections);
    const newVersion = {
      id: `ver-${Date.now()}`,
      version_number: this.versionsState.length + 1,
      status: 'DRAFT',
      created_at: new Date().toISOString(),
      content_snapshot: updated
    };
    this.versionsState.unshift(newVersion);
    return newVersion;
  },

  async publishPage(sections) {
    const updated = await this.updateSections(sections);
    const pubVersion = {
      id: `ver-${Date.now()}`,
      version_number: this.versionsState.length + 1,
      status: 'PUBLISHED',
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      content_snapshot: updated
    };
    this.versionsState.unshift(pubVersion);
    return pubVersion;
  },

  async getVersions() {
    return this.versionsState;
  },

  async restoreVersion(versionId) {
    const target = this.versionsState.find((v) => v.id === versionId);
    if (target) {
      this.sectionsState = target.content_snapshot;
      await this.saveDraft(this.sectionsState);
      return this.sectionsState;
    }
    throw new Error('Version not found');
  }
};
