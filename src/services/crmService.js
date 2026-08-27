export const PIPELINE_STAGES = [
  { code: 'NEW', name: 'New Inquiry', color: 'border-blue-500 bg-blue-50/50 text-blue-900' },
  { code: 'CONTACTED', name: 'Contacted', color: 'border-[#02408f] bg-sky-50/50 text-[#02408f]' },
  { code: 'QUALIFIED', name: 'Qualified', color: 'border-teal-500 bg-teal-50/50 text-teal-900' },
  { code: 'MEETING', name: 'Meeting / Demo', color: 'border-indigo-500 bg-indigo-50/50 text-indigo-900' },
  { code: 'PROPOSAL', name: 'Proposal Sent', color: 'border-amber-500 bg-amber-50/50 text-amber-900' },
  { code: 'NEGOTIATION', name: 'Negotiation', color: 'border-orange-500 bg-orange-50/50 text-orange-900' },
  { code: 'WON', name: 'Closed Won', color: 'border-emerald-500 bg-emerald-50/50 text-emerald-900' },
  { code: 'LOST', name: 'Closed Lost', color: 'border-rose-500 bg-rose-50/50 text-rose-900' }
];

export const crmService = {
  getPipelineStages() {
    return PIPELINE_STAGES;
  },

  calculateMetrics(leads) {
    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.stage_code === 'NEW').length;
    const qualifiedLeads = leads.filter((l) => l.stage_code === 'QUALIFIED').length;
    const proposalLeads = leads.filter((l) => l.stage_code === 'PROPOSAL').length;
    const wonLeads = leads.filter((l) => l.stage_code === 'WON').length;
    
    const pipelineValue = leads.reduce((sum, l) => sum + (Number(l.estimated_budget) || 0), 0);
    const winRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

    return {
      totalLeads,
      newLeads,
      qualifiedLeads,
      proposalLeads,
      wonLeads,
      pipelineValue,
      winRate
    };
  }
};
