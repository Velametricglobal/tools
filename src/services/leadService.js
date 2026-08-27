import { supabase, isSupabaseConfigured } from './supabaseClient';

export const INITIAL_LEADS = [
  {
    id: 'lead-101',
    full_name: 'Rajesh Sharma',
    email: 'rajesh@himalayafoods.com',
    phone: '+91 98123 45678',
    company_name: 'Himalayan Food Processing Pvt Ltd',
    service_interest: 'Fruit & Vegetable Processing',
    estimated_budget: 250000,
    stage_code: 'NEW',
    source: 'Website Contact Form',
    notes: 'Interested in Apple Grading & Sorting machine + Juice Pressing line.',
    created_at: '2026-08-26T10:15:00Z',
    utm_source: 'google',
    utm_campaign: 'apple-grader-search'
  },
  {
    id: 'lead-102',
    full_name: 'Vikram Verma',
    email: 'vikram@dehradunkitchens.in',
    phone: '+91 98765 11223',
    company_name: 'Hotel Capital Dehradun',
    service_interest: 'Commercial Kitchen Equipment',
    estimated_budget: 450000,
    stage_code: 'PROPOSAL',
    source: 'WhatsApp RFQ',
    notes: 'Requires 12 SS 304 Worktables, 4 Gas Ranges, and Visi Coolers.',
    created_at: '2026-08-25T14:30:00Z',
    utm_source: 'direct'
  },
  {
    id: 'lead-103',
    full_name: 'Aniti Mehta',
    email: 'anita@organicoils.co.in',
    phone: '+91 94111 88990',
    company_name: 'Organic Spices & Oils Ltd',
    service_interest: 'Oil Processing Machinery',
    estimated_budget: 310000,
    stage_code: 'QUALIFIED',
    source: 'Machinery Inquiry Form',
    notes: 'Cold Press 10 HP Mustard Expeller inquiry with filter press.',
    created_at: '2026-08-24T09:00:00Z',
    utm_source: 'facebook'
  }
];

export const leadService = {
  leadsState: [...INITIAL_LEADS],

  async getAllLeads() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    return this.leadsState;
  },

  async createLead(leadData) {
    const newLead = {
      id: `lead-${Date.now()}`,
      stage_code: 'NEW',
      created_at: new Date().toISOString(),
      source: leadData.source || 'Website Form',
      ...leadData
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('leads').insert(newLead).select().single();
      if (!error && data) return data;
    }

    this.leadsState.unshift(newLead);
    return newLead;
  },

  async updateLeadStage(leadId, newStageCode) {
    if (isSupabaseConfigured) {
      await supabase.from('leads').update({ stage_code: newStageCode }).eq('id', leadId);
    }
    this.leadsState = this.leadsState.map((l) =>
      l.id === leadId ? { ...l, stage_code: newStageCode } : l
    );
    return true;
  },

  async addLeadNote(leadId, noteText) {
    const lead = this.leadsState.find((l) => l.id === leadId);
    if (lead) {
      lead.notes = lead.notes ? `${lead.notes}\n• ${noteText}` : `• ${noteText}`;
    }
    return lead;
  }
};
