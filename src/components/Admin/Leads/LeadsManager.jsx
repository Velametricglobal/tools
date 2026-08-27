import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  X,
  MessageSquare
} from 'lucide-react';
import { leadService } from '../../../services/leadService';
import { PIPELINE_STAGES } from '../../../services/crmService';

export const LeadsManager = () => {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    service_interest: 'Fruit & Vegetable Processing',
    estimated_budget: 150000,
    notes: ''
  });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const data = await leadService.getAllLeads();
    setLeads(data);
  };

  const handleStageChange = async (leadId, newStage) => {
    await leadService.updateLeadStage(leadId, newStage);
    await loadLeads();
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!selectedLead || !noteInput.trim()) return;
    await leadService.addLeadNote(selectedLead.id, noteInput);
    setNoteInput('');
    await loadLeads();
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLead.full_name || !newLead.email) return;
    await leadService.createLead(newLead);
    setIsAddLeadModalOpen(false);
    setNewLead({
      full_name: '',
      email: '',
      phone: '',
      company_name: '',
      service_interest: 'Fruit & Vegetable Processing',
      estimated_budget: 150000,
      notes: ''
    });
    await loadLeads();
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            Lead Generation & CRM Inquiries
          </h2>
          <p className="text-xs text-slate-500">
            Showing <span className="font-extrabold text-[#02408f]">{filteredLeads.length}</span> active leads captured from website forms & WhatsApp
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Lead Name, Company, Email..."
              className="bg-transparent outline-none w-full text-slate-800"
            />
          </div>

          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="bg-[#02408f] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Add Manual Lead</span>
          </button>
        </div>
      </div>

      {/* Leads Table - Clean Spaced Grid Layout */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px]">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider">
                <th className="py-3.5 px-4 min-w-[220px]">Contact Info</th>
                <th className="py-3.5 px-4 min-w-[230px]">Company & Interest</th>
                <th className="py-3.5 px-4 min-w-[120px] whitespace-nowrap">Est. Budget</th>
                <th className="py-3.5 px-4 min-w-[160px] whitespace-nowrap">Pipeline Stage</th>
                <th className="py-3.5 px-4 min-w-[140px] whitespace-nowrap">Source</th>
                <th className="py-3.5 px-4 min-w-[260px] text-right whitespace-nowrap">Quick Sales Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredLeads.map((lead) => {
                const rawPhone = lead.phone || '9876543210';
                const cleanPhone = rawPhone.replace(/\D/g, '');
                const waUrl = `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=Hi%20${encodeURIComponent(lead.full_name)},%20thank%20you%20for%20your%20inquiry%20regarding%20${encodeURIComponent(lead.service_interest)}%20with%20Tejas%20%26%20Company.`;

                return (
                  <tr key={lead.id} className="hover:bg-sky-50/50 transition-colors align-middle">
                    
                    {/* 1. Contact Info Column */}
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                        {lead.full_name}
                      </h4>
                      <div className="space-y-0.5 mt-1">
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 truncate">
                          <Mail className="w-3 h-3 text-[#02408f] shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </span>
                        {lead.phone && (
                          <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 whitespace-nowrap">
                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{lead.phone}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 2. Company & Interest Column */}
                    <td className="py-3.5 px-4 min-w-[230px]">
                      <span className="font-extrabold text-slate-900 text-xs block leading-snug">
                        {lead.company_name}
                      </span>
                      <span className="text-[11px] font-bold text-[#02408f] block mt-0.5">
                        {lead.service_interest}
                      </span>
                    </td>

                    {/* 3. Est. Budget Column */}
                    <td className="py-3.5 px-4 min-w-[120px] whitespace-nowrap font-black text-slate-900 text-sm">
                      ₹{(Number(lead.estimated_budget) || 0).toLocaleString('en-IN')}
                    </td>

                    {/* 4. Pipeline Stage Dropdown Column */}
                    <td className="py-3.5 px-4 min-w-[160px] whitespace-nowrap">
                      <select
                        value={lead.stage_code || 'NEW'}
                        onChange={(e) => handleStageChange(lead.id, e.target.value)}
                        className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 font-extrabold text-[11px] px-3 py-1.5 rounded-xl outline-none text-slate-800 cursor-pointer transition-colors"
                      >
                        {PIPELINE_STAGES.map((st) => (
                          <option key={st.code} value={st.code}>
                            {st.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* 5. Lead Source Column */}
                    <td className="py-3.5 px-4 min-w-[140px] whitespace-nowrap">
                      <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-extrabold px-3 py-1 rounded-full border border-slate-200 whitespace-nowrap">
                        {lead.source}
                      </span>
                    </td>

                    {/* 6. Direct Quick Sales Actions Column */}
                    <td className="py-3.5 px-4 min-w-[260px] text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                        
                        {/* WhatsApp Button */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap shrink-0"
                          title={`Send WhatsApp message to ${lead.full_name}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Direct Call Button */}
                        <a
                          href={`tel:${lead.phone || '+919876543210'}`}
                          className="bg-sky-50 hover:bg-sky-100 text-[#02408f] border border-sky-200 font-extrabold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap shrink-0"
                          title={`Call ${lead.full_name}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-[#02408f] shrink-0" />
                          <span>Call</span>
                        </a>

                        {/* View Notes & Timeline */}
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-extrabold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                          title="View Lead Notes & Timeline"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>Notes</span>
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Notes & Timeline Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedLead.full_name}</h3>
                <span className="text-xs text-[#02408f] font-bold">{selectedLead.company_name}</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-extrabold uppercase text-slate-400 block tracking-wider">
                Activity & Notes History:
              </span>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 whitespace-pre-wrap text-slate-700 font-mono text-[11px] max-h-48 overflow-y-auto">
                {selectedLead.notes || 'No notes added yet.'}
              </div>
            </div>

            <form onSubmit={handleAddNote} className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700">Add New Follow-Up Note:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Enter interaction details..."
                  className="flex-1 p-2 border border-slate-300 rounded-xl text-xs outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#02408f] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-900"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Manual Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Add New CRM Lead</h3>
              <button onClick={() => setIsAddLeadModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLead.full_name}
                  onChange={(e) => setNewLead({ ...newLead, full_name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={newLead.company_name}
                  onChange={(e) => setNewLead({ ...newLead, company_name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Budget (₹)</label>
                <input
                  type="number"
                  value={newLead.estimated_budget}
                  onChange={(e) => setNewLead({ ...newLead, estimated_budget: Number(e.target.value) })}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#02408f] text-white font-bold text-xs py-3 rounded-xl hover:bg-blue-900 mt-2"
              >
                Create CRM Lead
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
