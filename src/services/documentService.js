import { supabase, isSupabaseConfigured } from './supabaseClient';
import { brandService } from './brandService';

export const DOCUMENT_TYPES = [
  { code: 'INVOICE', name: 'Tax Invoice', prefix: 'INV', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { code: 'QUOTATION', name: 'Commercial Quotation', prefix: 'QUO', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { code: 'PO', name: 'Purchase Order', prefix: 'PO', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { code: 'SO', name: 'Sales Order', prefix: 'SO', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { code: 'PROPOSAL', name: 'Commercial Proposal', prefix: 'PRP', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { code: 'RECEIPT', name: 'Payment Receipt', prefix: 'REC', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { code: 'PROFORMA', name: 'Proforma Invoice', prefix: 'PI', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { code: 'DELIVERY_CHALLAN', name: 'Delivery Challan', prefix: 'DC', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { code: 'CREDIT_NOTE', name: 'Credit Note', prefix: 'CN', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { code: 'DEBIT_NOTE', name: 'Debit Note', prefix: 'DN', color: 'bg-[#02408f] text-white border-blue-900' },
  { code: 'WORK_ORDER', name: 'Work Order', prefix: 'WO', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { code: 'CONTRACT', name: 'Service Contract', prefix: 'SC', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { code: 'ESTIMATE', name: 'Cost Estimate', prefix: 'EST', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { code: 'PAYMENT_REQUEST', name: 'Payment Request', prefix: 'PR', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { code: 'STATEMENT_ACCOUNT', name: 'Statement of Account', prefix: 'SOA', color: 'bg-slate-200 text-slate-800 border-slate-300' },
  { code: 'PURCHASE_REQUEST', name: 'Purchase Request', prefix: 'PRQ', color: 'bg-stone-100 text-stone-700 border-stone-300' },
  { code: 'EXPENSE_VOUCHER', name: 'Expense Voucher', prefix: 'EV', color: 'bg-lime-50 text-lime-700 border-lime-200' },
  { code: 'TAX_INVOICE', name: 'Official GST Tax Invoice', prefix: 'GSTINV', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { code: 'SERVICE_AGREEMENT', name: 'Service Level Agreement', prefix: 'SLA', color: 'bg-sky-100 text-sky-900 border-sky-300' },
  { code: 'SALARY_SLIP', name: 'Payment Voucher', prefix: 'PV', color: 'bg-slate-100 text-slate-700 border-slate-300' }
];

let INITIAL_DOCUMENTS = [
  {
    id: 'doc-101',
    doc_type: 'INVOICE',
    doc_number: 'INV-2026-27-0101',
    financial_year: '2026-27',
    client_name: 'Himalayan Food Processing Pvt Ltd',
    client_email: 'rajesh@himalayafoods.com',
    client_phone: '+91 98123 45678',
    client_address: 'Industrial Area Phase 2, Haridwar, Uttarakhand',
    client_gstin: '05AAACH9988K1Z2',
    issue_date: '2026-08-15',
    due_date: '2026-08-30',
    state: 'Uttarakhand',
    items: [
      { hsn_sac: '84386000', description: 'Commercial Automatic Vegetable & Fruit Dicing Machine (500 kg/hr capacity, AISI 304)', quantity: 1, unit: 'Unit', rate: 250000, discount_pct: 5, gst_rate: 18 }
    ],
    subtotal: 250000,
    discount_amount: 12500,
    taxable_amount: 237500,
    cgst_amount: 21375,
    sgst_amount: 21375,
    igst_amount: 0,
    total_amount: 280250,
    paid_amount: 280250,
    status: 'PAID',
    notes: 'Thank you for your business. Warranty covers 12 months comprehensive motor & gear service.',
    terms: 'Payment term: 100% advance against PI or upon successful trial dispatch.',
    verification_id: 'DOC-2026-8A91F2'
  },
  {
    id: 'doc-102',
    doc_type: 'QUOTATION',
    doc_number: 'QUO-2026-27-0102',
    financial_year: '2026-27',
    client_name: 'Organic Spices & Oils Ltd',
    client_email: 'anita@organicoils.co.in',
    client_phone: '+91 94111 88990',
    client_address: 'MIDC Food Zone, Kashipur, Uttarakhand',
    client_gstin: '05BBBCO1122J1Z5',
    issue_date: '2026-08-20',
    valid_until: '2026-09-20',
    state: 'Uttarakhand',
    items: [
      { hsn_sac: '84792010', description: 'Heavy-Duty Cold Press Mustard Oil Expeller Unit (100 kg/hr dual chamber)', quantity: 1, unit: 'Set', rate: 310000, discount_pct: 0, gst_rate: 18 }
    ],
    subtotal: 310000,
    discount_amount: 0,
    taxable_amount: 310000,
    cgst_amount: 27900,
    sgst_amount: 27900,
    igst_amount: 0,
    total_amount: 365800,
    paid_amount: 0,
    status: 'SENT',
    notes: 'Quotation valid for 30 days. Prices inclusive of 1-year on-site engineering warranty.',
    terms: '50% advance along with Purchase Order, 50% prior to dispatch.',
    verification_id: 'DOC-2026-3B77C9'
  },
  {
    id: 'doc-103',
    doc_type: 'PO',
    doc_number: 'PO-2026-27-0103',
    financial_year: '2026-27',
    client_name: 'Jindal Stainless Supply Co.',
    client_email: 'procurement@jindalstainless.com',
    client_phone: '+91 98990 00112',
    client_address: 'Steel Yard Complex, Hisar, Haryana',
    client_gstin: '06AAAJS5544H1Z3',
    issue_date: '2026-08-22',
    due_date: '2026-09-05',
    state: 'Haryana',
    items: [
      { hsn_sac: '72221100', description: 'AISI 304 Food-Grade Stainless Steel Sheets 3mm (8ft x 4ft)', quantity: 20, unit: 'Sheet', rate: 12500, discount_pct: 2, gst_rate: 18 }
    ],
    subtotal: 250000,
    discount_amount: 5000,
    taxable_amount: 245000,
    cgst_amount: 0,
    sgst_amount: 0,
    igst_amount: 44100,
    total_amount: 289100,
    paid_amount: 0,
    status: 'SENT',
    notes: 'Material test certificate (MTC) required along with delivery challan.',
    terms: 'Payment strictly within 30 days of GRN generation.',
    verification_id: 'DOC-2026-9F22E1'
  }
];

export const documentService = {
  documents: [...INITIAL_DOCUMENTS],

  async getAllDocuments() {
    return this.documents;
  },

  async getDocumentById(id) {
    return this.documents.find((d) => d.id === id || d.doc_number === id || d.verification_id === id);
  },

  calculateGst(items, clientState = 'Uttarakhand') {
    let subtotal = 0;
    let discountAmount = 0;
    let taxableAmount = 0;
    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;

    const calculatedItems = items.map((item) => {
      const rate = Number(item.rate) || 0;
      const qty = Number(item.quantity) || 1;
      const discPct = Number(item.discount_pct) || 0;
      const gstRate = Number(item.gst_rate) || 18;

      const lineGross = rate * qty;
      const lineDisc = lineGross * (discPct / 100);
      const lineTaxable = lineGross - lineDisc;
      const lineTax = lineTaxable * (gstRate / 100);
      const lineTotal = lineTaxable + lineTax;

      subtotal += lineGross;
      discountAmount += lineDisc;
      taxableAmount += lineTaxable;

      // Intra-state (Uttarakhand) vs Inter-state
      const isIntraState = clientState.toLowerCase().includes('uttarakhand');
      if (isIntraState) {
        cgstAmount += lineTax / 2;
        sgstAmount += lineTax / 2;
      } else {
        igstAmount += lineTax;
      }

      return {
        ...item,
        taxable_value: lineTaxable,
        total_value: lineTotal
      };
    });

    const totalAmount = taxableAmount + cgstAmount + sgstAmount + igstAmount;

    return {
      items: calculatedItems,
      subtotal,
      discount_amount: discountAmount,
      taxable_amount: taxableAmount,
      cgst_amount: cgstAmount,
      sgst_amount: sgstAmount,
      igst_amount: igstAmount,
      total_amount: Math.round(totalAmount)
    };
  },

  async createDocument(docData) {
    const docTypeObj = DOCUMENT_TYPES.find((t) => t.code === docData.doc_type) || DOCUMENT_TYPES[0];
    const seqNum = Math.floor(100 + Math.random() * 900);
    const docNumber = `${docTypeObj.prefix}-2026-27-0${seqNum}`;
    const verificationId = `DOC-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const calculated = this.calculateGst(docData.items || [], docData.state || 'Uttarakhand');

    const newDoc = {
      id: `doc-${Date.now()}`,
      doc_type: docData.doc_type,
      doc_number: docNumber,
      financial_year: '2026-27',
      client_name: docData.client_name,
      client_email: docData.client_email,
      client_phone: docData.client_phone,
      client_address: docData.client_address,
      client_gstin: docData.client_gstin || 'UNREGISTERED',
      issue_date: docData.issue_date || new Date().toISOString().split('T')[0],
      due_date: docData.due_date,
      valid_until: docData.valid_until,
      state: docData.state || 'Uttarakhand',
      items: calculated.items,
      subtotal: calculated.subtotal,
      discount_amount: calculated.discount_amount,
      taxable_amount: calculated.taxable_amount,
      cgst_amount: calculated.cgst_amount,
      sgst_amount: calculated.sgst_amount,
      igst_amount: calculated.igst_amount,
      total_amount: calculated.total_amount,
      paid_amount: docData.paid_amount || 0,
      status: docData.status || 'DRAFT',
      notes: docData.notes || 'Thank you for choosing Tejas & Company.',
      terms: docData.terms || 'Terms: 100% against dispatch. 1-Year Machinery Warranty.',
      verification_id: verificationId,
      created_at: new Date().toISOString()
    };

    this.documents.unshift(newDoc);
    return newDoc;
  },

  async convertQuotationToInvoice(quotationId) {
    const quo = this.documents.find((d) => d.id === quotationId);
    if (!quo) return null;

    const seqNum = Math.floor(100 + Math.random() * 900);
    const invoiceNumber = `INV-2026-27-0${seqNum}`;
    const verificationId = `DOC-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const invoice = {
      ...quo,
      id: `doc-${Date.now()}`,
      doc_type: 'INVOICE',
      doc_number: invoiceNumber,
      status: 'SENT',
      issue_date: new Date().toISOString().split('T')[0],
      verification_id: verificationId,
      notes: `Converted from Quotation ${quo.doc_number}. Warranty applies as quoted.`
    };

    // Update original quotation status
    quo.status = 'ACCEPTED';

    this.documents.unshift(invoice);
    return invoice;
  }
};
