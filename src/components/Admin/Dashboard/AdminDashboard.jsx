import React, { useState, useEffect } from 'react';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { leadService } from '../../../services/leadService';
import { crmService } from '../../../services/crmService';
import { proposalService } from '../../../services/proposalService';

export const AdminDashboard = ({ onNavigate }) => {
  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [proposals, setProposals] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const lData = await leadService.getAllLeads();
    setLeads(lData);
    setMetrics(crmService.calculateMetrics(lData));
    setProposals(proposalService.getProposals());
    setInvoices(proposalService.getInvoices());
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.paid_amount || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#02408f] to-indigo-950 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              ENTERPRISE PLATFORM
            </span>
            <span className="text-xs text-sky-200 font-bold">Admin Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Tejas & Company CRM & CMS Executive Control Panel
          </h1>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Real-time pipeline performance, lead management, proposals, invoices & visual website builder
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('homepage-builder')}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 py-3 rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
          >
            <span>Visual Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#02408f] flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{metrics.totalLeads || 0}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              +{metrics.newLeads || 0} New
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pipeline Value</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#02408f]">
              ₹{(metrics.pipelineValue || 0).toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-slate-500">8 Pipeline Stages</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Collected Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              18% GST Compliant
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Win Rate</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{metrics.winRate || 0}%</span>
            <span className="text-xs font-bold text-slate-500">Sales Conversion</span>
          </div>
        </div>

      </div>

      {/* Grid: Recent Leads & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Leads Table */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Recent Inquiries & CRM Leads
            </h3>
            <button
              onClick={() => onNavigate('leads')}
              className="text-xs font-bold text-[#02408f] hover:underline"
            >
              View All Leads →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {leads.slice(0, 4).map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900">{lead.full_name}</h4>
                  <p className="text-[11px] text-slate-500">{lead.company_name} • {lead.service_interest}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-[#02408f] block">
                    ₹{(lead.estimated_budget || 0).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-bold bg-sky-100 text-[#02408f] px-2 py-0.5 rounded-full">
                    {lead.stage_code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Proposals & Invoices */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Proposals & Invoices
            </h3>
            <button
              onClick={() => onNavigate('proposals')}
              className="text-xs font-bold text-[#02408f] hover:underline"
            >
              Manage →
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {proposals.map((prop) => (
              <div key={prop.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-extrabold text-[#02408f] block">{prop.proposal_number}</span>
                  <h4 className="font-bold text-slate-900">{prop.client_name}</h4>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-900 block">₹{prop.total_amount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    {prop.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
