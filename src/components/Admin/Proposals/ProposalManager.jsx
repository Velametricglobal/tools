import React, { useState, useEffect } from 'react';
import { proposalService } from '../../../services/proposalService';
import { FileText, Plus, CheckCircle2, ShieldCheck, DollarSign, Printer } from 'lucide-react';

export const ProposalManager = () => {
  const [proposals, setProposals] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setProposals(proposalService.getProposals());
    setInvoices(proposalService.getInvoices());
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            Proposals & 18% GST Invoices
          </h2>
          <p className="text-xs text-slate-500">
            Generate formal B2B commercial quotes, GST tax invoices & track client payments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-[#02408f] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-900 flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Create New Commercial Proposal</span>
          </button>
        </div>
      </div>

      {/* Two Grid Cards: Proposals & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Commercial Proposals */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Commercial Proposals ({proposals.length})
            </h3>
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
              Valid Quotes
            </span>
          </div>

          <div className="space-y-3">
            {proposals.map((prop) => (
              <div key={prop.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold text-[#02408f] block">
                      {prop.proposal_number}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm">{prop.client_name}</h4>
                    <p className="text-slate-500 text-[11px]">{prop.title}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-300">
                    {prop.status}
                  </span>
                </div>

                <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between font-extrabold text-slate-900">
                  <span className="text-[11px] text-slate-500 font-bold">Subtotal + 18% GST</span>
                  <span className="text-sm text-[#02408f]">₹{prop.total_amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GST Invoices */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              18% GST Invoices & Payments ({invoices.length})
            </h3>
            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
              Input Credit Ready
            </span>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold text-emerald-700 block">
                      {inv.invoice_number}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-sm">{inv.client_name}</h4>
                    <p className="text-slate-500 text-[11px]">Due: {inv.due_date} • Ref: {inv.transaction_ref}</p>
                  </div>
                  <span className="bg-sky-100 text-[#02408f] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-sky-300">
                    {inv.status}
                  </span>
                </div>

                <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between font-extrabold">
                  <span className="text-[11px] text-slate-500 font-bold">Paid: ₹{inv.paid_amount.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-emerald-700">Total: ₹{inv.total_amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
