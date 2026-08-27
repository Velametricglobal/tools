import React, { useState, useEffect } from 'react';
import { PIPELINE_STAGES } from '../../../services/crmService';
import { leadService } from '../../../services/leadService';
import { DollarSign, User, ArrowRightLeft, CheckCircle2, Building2, Phone, Mail } from 'lucide-react';

export const PipelineKanban = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const data = await leadService.getAllLeads();
    setLeads(data);
  };

  const handleStageMove = async (leadId, targetStageCode) => {
    await leadService.updateLeadStage(leadId, targetStageCode);
    await loadLeads();
  };

  return (
    <div className="space-y-4">
      
      {/* Top Bar / Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <span>Sales Pipeline Kanban Board</span>
            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase">
              8 Stages
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Scroll horizontally to manage deals from New Inquiry through to Closed Won & Closed Lost
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-extrabold text-[#02408f] bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
            Total Pipeline Value: ₹{leads.reduce((sum, l) => sum + (Number(l.estimated_budget) || 0), 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* HORIZONTAL SCROLLABLE KANBAN COLUMNS STRIP (W-72 FIXED COLUMN WIDTH) */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 max-w-full">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => (l.stage_code || 'NEW') === stage.code);
          const stageValue = stageLeads.reduce((sum, l) => sum + (Number(l.estimated_budget) || 0), 0);

          return (
            <div
              key={stage.code}
              className={`w-72 shrink-0 rounded-3xl border p-4 flex flex-col justify-between space-y-3 bg-white shadow-sm hover:shadow-md transition-shadow ${stage.color}`}
            >
              
              {/* Column Stage Header */}
              <div className="pb-3 border-b border-slate-200/80">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-black text-xs uppercase tracking-wider text-slate-900 truncate">
                    {stage.name}
                  </h4>
                  <span className="text-[10px] font-black bg-slate-900 text-white px-2.5 py-0.5 rounded-full shrink-0">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Stage Total:
                  </span>
                  <span className="text-xs font-black text-[#02408f]">
                    ₹{stageValue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Deal Cards Container */}
              <div className="space-y-3 flex-1 min-h-[420px] overflow-y-auto pr-0.5">
                {stageLeads.length === 0 ? (
                  <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-slate-200/70 rounded-2xl text-center">
                    <span className="text-xs text-slate-400 font-semibold">No Deals in Stage</span>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-sky-400 hover:-translate-y-0.5 transition-all text-xs space-y-2.5"
                    >
                      {/* Customer Name & Company */}
                      <div>
                        <h5 className="font-extrabold text-slate-900 text-sm leading-snug">
                          {lead.full_name}
                        </h5>
                        <span className="text-[11px] font-semibold text-slate-500 block truncate mt-0.5">
                          {lead.company_name}
                        </span>
                      </div>

                      {/* Machinery Interest */}
                      <div className="bg-sky-50/70 p-2 rounded-xl border border-sky-100/80">
                        <span className="text-[10px] font-black uppercase text-[#02408f] tracking-wider block">
                          Requirement:
                        </span>
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">
                          {lead.service_interest}
                        </span>
                      </div>

                      {/* Contact Quick Info */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span className="truncate">{lead.email}</span>
                        {lead.phone && <span className="font-mono text-[10px] shrink-0 ml-1">{lead.phone}</span>}
                      </div>

                      {/* Price & Stage Selector */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase">
                            Budget
                          </span>
                          <span className="font-black text-slate-900 text-xs">
                            ₹{(Number(lead.estimated_budget) || 0).toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Stage Selector Dropdown */}
                        <select
                          value={lead.stage_code || 'NEW'}
                          onChange={(e) => handleStageMove(lead.id, e.target.value)}
                          className="text-[10px] font-extrabold bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl px-2 py-1 outline-none cursor-pointer text-slate-800 transition-colors"
                        >
                          {PIPELINE_STAGES.map((s) => (
                            <option key={s.code} value={s.code}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
