import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Printer,
  Download,
  Share2,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  QrCode,
  Landmark,
  X,
  FileCheck,
  Building2,
  Phone,
  Mail,
  Send,
  MessageSquare
} from 'lucide-react';
import { documentService, DOCUMENT_TYPES } from '../../../services/documentService';
import { brandService } from '../../../services/brandService';

export const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const company = brandService.getCompanyProfile();
  const tokens = brandService.getBrandTokens();
  const logos = brandService.getLogos();

  // Create Document Form State
  const [newDoc, setNewDoc] = useState({
    doc_type: 'INVOICE',
    client_name: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    client_gstin: '',
    state: 'Uttarakhand',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    items: [
      { hsn_sac: '84386000', description: 'Commercial Pulverizer Machine AISI 304', quantity: 1, unit: 'Unit', rate: 150000, discount_pct: 0, gst_rate: 18 }
    ],
    notes: 'Thank you for choosing Tejas & Company.',
    terms: '100% advance against dispatch. 1-Year Machinery Warranty.'
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const data = await documentService.getAllDocuments();
    setDocuments(data);
  };

  const handleAddItemRow = () => {
    setNewDoc((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { hsn_sac: '84386000', description: '', quantity: 1, unit: 'Unit', rate: 0, discount_pct: 0, gst_rate: 18 }
      ]
    }));
  };

  const handleRemoveItemRow = (index) => {
    setNewDoc((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, val) => {
    const updated = [...newDoc.items];
    updated[index][field] = val;
    setNewDoc({ ...newDoc, items: updated });
  };

  const handleSaveDocument = async (e) => {
    e.preventDefault();
    if (!newDoc.client_name) return;
    await documentService.createDocument(newDoc);
    setIsCreateModalOpen(false);
    await loadDocuments();
  };

  const handleConvertQuotation = async (quotationId) => {
    const inv = await documentService.convertQuotationToInvoice(quotationId);
    if (inv) {
      setSelectedDoc(inv);
      setIsPrintModalOpen(true);
      await loadDocuments();
    }
  };

  const filteredDocs = documents.filter((d) => {
    const matchesFilter = activeFilter === 'ALL' || d.doc_type === activeFilter;
    const matchesSearch =
      d.doc_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.client_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate live totals for newDoc form
  const liveCalculation = documentService.calculateGst(newDoc.items, newDoc.state);

  return (
    <div className="space-y-6">
      
      {/* Top Header Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#02408f]" />
            <span>Business Document Generator & GST Billing</span>
            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase">
              20 Document Types
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate printable A4 Invoices, Quotations, POs, Proposals, Delivery Challans, and Receipts with GST calculations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#02408f] hover:bg-blue-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Create New Document</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 text-xs font-bold">
          {['ALL', 'INVOICE', 'QUOTATION', 'PO', 'PROPOSAL', 'RECEIPT'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors whitespace-nowrap ${
                activeFilter === type
                  ? 'bg-slate-900 text-white font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type === 'ALL' ? 'All Documents' : type}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Doc #, Client Name..."
            className="bg-transparent outline-none w-full text-slate-800"
          />
        </div>
      </div>

      {/* Documents List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider">
                <th className="py-3.5 px-4">Doc # & Type</th>
                <th className="py-3.5 px-4">Client Info</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Total Amount (₹)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredDocs.map((doc) => {
                const typeObj = DOCUMENT_TYPES.find((t) => t.code === doc.doc_type) || DOCUMENT_TYPES[0];

                return (
                  <tr key={doc.id} className="hover:bg-sky-50/40 transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <h4 className="font-extrabold text-slate-900 text-sm font-mono">{doc.doc_number}</h4>
                      <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md border mt-1 ${typeObj.color}`}>
                        {typeObj.name}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-slate-900 block text-xs">{doc.client_name}</span>
                      <span className="text-[11px] text-slate-500 font-mono block mt-0.5">{doc.client_gstin}</span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {doc.issue_date}
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                      ₹{(Number(doc.total_amount) || 0).toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-800 font-black text-[10px] px-2.5 py-1 rounded-full border border-slate-300">
                        {doc.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Print / View Button */}
                        <button
                          onClick={() => {
                            setSelectedDoc(doc);
                            setIsPrintModalOpen(true);
                          }}
                          className="bg-sky-50 hover:bg-sky-100 text-[#02408f] border border-sky-200 font-extrabold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View A4 / Print</span>
                        </button>

                        {/* Convert Quotation to Invoice Button */}
                        {doc.doc_type === 'QUOTATION' && doc.status !== 'ACCEPTED' && (
                          <button
                            onClick={() => handleConvertQuotation(doc.id)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Convert to Invoice</span>
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW DOCUMENT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase">Create Business Document</h3>
                <p className="text-xs text-slate-500">Generate GST compliant invoices, quotations, POs with automated calculations</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDocument} className="space-y-5 text-xs">
              
              {/* Doc Type & Client Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Document Type *</label>
                  <select
                    value={newDoc.doc_type}
                    onChange={(e) => setNewDoc({ ...newDoc, doc_type: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-bold text-slate-900 bg-white"
                  >
                    {DOCUMENT_TYPES.map((t) => (
                      <option key={t.code} value={t.code}>
                        {t.name} ({t.prefix})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newDoc.client_name}
                    onChange={(e) => setNewDoc({ ...newDoc, client_name: e.target.value })}
                    placeholder="e.g. Himalayan Food Processing"
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client GSTIN</label>
                  <input
                    type="text"
                    value={newDoc.client_gstin}
                    onChange={(e) => setNewDoc({ ...newDoc, client_gstin: e.target.value })}
                    placeholder="e.g. 05AAACH9988K1Z2"
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Email</label>
                  <input
                    type="email"
                    value={newDoc.client_email}
                    onChange={(e) => setNewDoc({ ...newDoc, client_email: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Phone</label>
                  <input
                    type="text"
                    value={newDoc.client_phone}
                    onChange={(e) => setNewDoc({ ...newDoc, client_phone: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Place of Supply (State)</label>
                  <select
                    value={newDoc.state}
                    onChange={(e) => setNewDoc({ ...newDoc, state: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none bg-white font-bold"
                  >
                    <option value="Uttarakhand">Uttarakhand (CGST 9% + SGST 9%)</option>
                    <option value="Other State">Other State (IGST 18%)</option>
                  </select>
                </div>
              </div>

              {/* Line Items Table Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-black text-slate-900 uppercase">Line Items & GST HSN/SAC Breakdown</h4>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="bg-sky-50 text-[#02408f] font-bold text-[11px] px-3 py-1 rounded-lg border border-sky-200 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item Line</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {newDoc.items.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={item.hsn_sac}
                          onChange={(e) => handleItemChange(idx, 'hsn_sac', e.target.value)}
                          placeholder="HSN/SAC"
                          className="w-full p-2 border border-slate-300 rounded-xl outline-none font-mono text-[11px]"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          required
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          placeholder="Item description & machine specs..."
                          className="w-full p-2 border border-slate-300 rounded-xl outline-none font-semibold text-[11px]"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                          placeholder="Qty"
                          className="w-full p-2 border border-slate-300 rounded-xl outline-none font-bold text-[11px]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleItemChange(idx, 'rate', Number(e.target.value))}
                          placeholder="Rate (₹)"
                          className="w-full p-2 border border-slate-300 rounded-xl outline-none font-bold text-[11px]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <select
                          value={item.gst_rate}
                          onChange={(e) => handleItemChange(idx, 'gst_rate', Number(e.target.value))}
                          className="w-full p-2 border border-slate-300 rounded-xl outline-none font-bold text-[11px] bg-white"
                        >
                          <option value={0}>0% GST</option>
                          <option value={5}>5% GST</option>
                          <option value={12}>12% GST</option>
                          <option value={18}>18% GST</option>
                          <option value={28}>28% GST</option>
                        </select>
                      </div>
                      <div className="md:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          className="text-rose-600 font-bold hover:bg-rose-50 p-1.5 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculated Totals Box */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-[11px]">
                  <p>Subtotal: ₹{liveCalculation.subtotal.toLocaleString('en-IN')}</p>
                  <p>Taxable Value: ₹{liveCalculation.taxable_amount.toLocaleString('en-IN')}</p>
                  <p>CGST + SGST: ₹{(liveCalculation.cgst_amount + liveCalculation.sgst_amount).toLocaleString('en-IN')}</p>
                  {liveCalculation.igst_amount > 0 && <p>IGST: ₹{liveCalculation.igst_amount.toLocaleString('en-IN')}</p>}
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400 font-black uppercase block">Grand Total</span>
                  <span className="text-xl font-black text-white">₹{liveCalculation.total_amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#02408f] text-white font-extrabold text-xs py-3 rounded-2xl hover:bg-blue-900 shadow-md"
              >
                Generate & Save Business Document
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE A4 DOCUMENT MODAL VIEW */}
      {isPrintModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-300 w-full max-w-4xl p-8 space-y-6 my-8 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Top Actions */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">Document Printable A4 View</span>
                <span className="text-xs font-mono text-[#02408f] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  {selectedDoc.doc_number}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-[#02408f] hover:bg-blue-900 text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4 text-amber-300" />
                  <span>Print A4 / Save PDF</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-600 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* A4 DOCUMENT CANVAS */}
            <div className="bg-white text-slate-900 p-8 border border-slate-200 shadow-sm rounded-2xl space-y-6 text-xs font-sans">
              
              {/* Header: Company Logo & Identity */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <img src={logos.document_logo || logos.primary_logo} alt="Company Logo" className="h-12 object-contain" />
                    <div>
                      <h2 className="text-lg font-black tracking-tight" style={{ color: tokens.primary }}>
                        {company.legal_name}
                      </h2>
                      <p className="text-[10px] text-slate-600 font-semibold">{company.tagline}</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 space-y-0.5 pt-2">
                    <p>{company.address}, {company.city}, {company.state} - {company.pincode}</p>
                    <p className="font-mono"><strong>GSTIN:</strong> {company.gstin} | <strong>PAN:</strong> {company.pan} | <strong>CIN:</strong> {company.cin}</p>
                    <p><strong>Email:</strong> {company.official_email} | <strong>Phone:</strong> {company.sales_phone}</p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xl font-black uppercase tracking-wider block" style={{ color: tokens.primary }}>
                    {selectedDoc.doc_type.replace('_', ' ')}
                  </span>
                  <span className="font-mono font-extrabold text-sm block">{selectedDoc.doc_number}</span>
                  <p className="text-[10px] text-slate-500">Date: {selectedDoc.issue_date}</p>
                  {selectedDoc.due_date && <p className="text-[10px] text-slate-500">Due Date: {selectedDoc.due_date}</p>}
                </div>
              </div>

              {/* Customer Billing Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider mb-1">
                    Billed To (Customer):
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">{selectedDoc.client_name}</h4>
                  <p className="text-[11px] text-slate-600 mt-1">{selectedDoc.client_address || 'Address provided on order dispatch'}</p>
                  {selectedDoc.client_email && <p className="text-[11px] text-slate-600">{selectedDoc.client_email}</p>}
                  {selectedDoc.client_phone && <p className="text-[11px] text-slate-600 font-mono">{selectedDoc.client_phone}</p>}
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider mb-1">
                    Tax & Registration:
                  </span>
                  <p className="font-mono text-xs font-bold text-slate-900">GSTIN: {selectedDoc.client_gstin || 'UNREGISTERED'}</p>
                  <p className="text-[11px] text-slate-600">Place of Supply: {selectedDoc.state || 'Uttarakhand'}</p>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] font-black uppercase">
                    <th className="p-2.5 border border-slate-800">#</th>
                    <th className="p-2.5 border border-slate-800">HSN/SAC</th>
                    <th className="p-2.5 border border-slate-800">Description</th>
                    <th className="p-2.5 border border-slate-800 text-center">Qty</th>
                    <th className="p-2.5 border border-slate-800 text-right">Rate (₹)</th>
                    <th className="p-2.5 border border-slate-800 text-center">GST %</th>
                    <th className="p-2.5 border border-slate-800 text-right">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {selectedDoc.items.map((it, i) => (
                    <tr key={i}>
                      <td className="p-2.5 border border-slate-200 text-center font-bold">{i + 1}</td>
                      <td className="p-2.5 border border-slate-200 font-mono text-[10px]">{it.hsn_sac}</td>
                      <td className="p-2.5 border border-slate-200 font-semibold">{it.description}</td>
                      <td className="p-2.5 border border-slate-200 text-center font-bold">{it.quantity} {it.unit}</td>
                      <td className="p-2.5 border border-slate-200 text-right font-mono">₹{Number(it.rate).toLocaleString('en-IN')}</td>
                      <td className="p-2.5 border border-slate-200 text-center font-bold">{it.gst_rate}%</td>
                      <td className="p-2.5 border border-slate-200 text-right font-mono font-bold">₹{Number(it.taxable_value || it.rate * it.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary & Bank Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Bank Details & QR Code Verification */}
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] space-y-1">
                    <span className="font-extrabold uppercase text-[#02408f] block">Bank Account Details for Payment:</span>
                    <p><strong>Account Holder:</strong> {company.bank_details.account_holder}</p>
                    <p><strong>Bank & Branch:</strong> {company.bank_details.bank_name}, {company.bank_details.branch}</p>
                    <p className="font-mono"><strong>Account No:</strong> {company.bank_details.account_number}</p>
                    <p className="font-mono"><strong>IFSC Code:</strong> {company.bank_details.ifsc_code}</p>
                    <p className="font-mono"><strong>UPI ID:</strong> {company.bank_details.upi_id}</p>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-sky-50 border border-sky-200 rounded-xl text-[10px]">
                    <QrCode className="w-10 h-10 text-[#02408f] shrink-0" />
                    <div>
                      <span className="font-black text-slate-900 block">Verification ID: {selectedDoc.verification_id}</span>
                      <span className="text-slate-500">Scan QR Code or visit /verify/{selectedDoc.verification_id} to verify authenticity.</span>
                    </div>
                  </div>
                </div>

                {/* Tax Breakdown & Grand Total */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-600">Subtotal:</span>
                    <span className="font-mono font-bold">₹{Number(selectedDoc.subtotal).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-600">Taxable Value:</span>
                    <span className="font-mono font-bold">₹{Number(selectedDoc.taxable_amount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-600">CGST (9%):</span>
                    <span className="font-mono font-bold">₹{Number(selectedDoc.cgst_amount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-600">SGST (9%):</span>
                    <span className="font-mono font-bold">₹{Number(selectedDoc.sgst_amount).toLocaleString('en-IN')}</span>
                  </div>
                  {selectedDoc.igst_amount > 0 && (
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-semibold text-slate-600">IGST (18%):</span>
                      <span className="font-mono font-bold">₹{Number(selectedDoc.igst_amount).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-black text-[#02408f]">
                    <span>Grand Total:</span>
                    <span>₹{Number(selectedDoc.total_amount).toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>

              {/* Terms & Authorized Signatory */}
              <div className="flex items-end justify-between pt-6 border-t border-slate-200">
                <div className="max-w-md text-[10px] text-slate-500 space-y-1">
                  <p><strong>Terms:</strong> {selectedDoc.terms}</p>
                  <p><strong>Notes:</strong> {selectedDoc.notes}</p>
                </div>

                <div className="text-center space-y-2">
                  <div className="h-12 w-36 border-b border-slate-400 flex items-center justify-center font-serif italic text-slate-400 text-xs">
                    Authorized Signatory
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 block">For {company.legal_name}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
