export const INITIAL_PROPOSALS = [
  {
    id: 'prop-201',
    proposal_number: 'PROP-2026-089',
    client_name: 'Hotel Capital Dehradun',
    title: 'SS 304 Commercial Kitchen Equipment Setup',
    subtotal: 380000,
    tax_amount: 68400, // 18% GST
    total_amount: 448400,
    status: 'SENT',
    valid_until: '2026-09-15',
    created_at: '2026-08-25T14:30:00Z',
    items: [
      { name: 'SS 304 Heavy Duty Worktable (6ft x 2.5ft)', qty: 8, unit_price: 18500, total: 148000 },
      { name: '4-Burner Commercial Gas Range', qty: 2, unit_price: 46000, total: 92000 },
      { name: 'Commercial Pulverizer 3 HP', qty: 2, unit_price: 45000, total: 90000 },
      { name: 'Double Sink Unit SS 304', qty: 2, unit_price: 25000, total: 50000 }
    ]
  },
  {
    id: 'prop-202',
    proposal_number: 'PROP-2026-090',
    client_name: 'Himalayan Food Processing Pvt Ltd',
    title: 'Apple Grading Line & Hydraulic Press Line',
    subtotal: 280000,
    tax_amount: 50400,
    total_amount: 330400,
    status: 'ACCEPTED',
    valid_until: '2026-09-20',
    created_at: '2026-08-26T11:00:00Z',
    items: [
      { name: 'Apple Grading and Sorting Machine', qty: 1, unit_price: 185000, total: 185000 },
      { name: 'Electric Hydraulic Juice Press Machine', qty: 1, unit_price: 115000, total: 115000 }
    ]
  }
];

export const INITIAL_INVOICES = [
  {
    id: 'inv-301',
    invoice_number: 'INV-2026-042',
    client_name: 'Himalayan Food Processing Pvt Ltd',
    issue_date: '2026-08-26',
    due_date: '2026-09-09',
    total_amount: 330400,
    paid_amount: 330400,
    status: 'PAID',
    payment_method: 'Bank RTGS',
    transaction_ref: 'RTGS9876543210'
  },
  {
    id: 'inv-302',
    invoice_number: 'INV-2026-043',
    client_name: 'Hotel Capital Dehradun',
    issue_date: '2026-08-27',
    due_date: '2026-09-10',
    total_amount: 448400,
    paid_amount: 150000,
    status: 'PARTIALLY_PAID',
    payment_method: 'UPI / Cheque',
    transaction_ref: 'CHQ-889911'
  }
];

export const proposalService = {
  proposalsState: [...INITIAL_PROPOSALS],
  invoicesState: [...INITIAL_INVOICES],

  getProposals() {
    return this.proposalsState;
  },

  getInvoices() {
    return this.invoicesState;
  },

  createProposal(data) {
    const newProp = {
      id: `prop-${Date.now()}`,
      proposal_number: `PROP-2026-${Math.floor(100 + Math.random() * 900)}`,
      created_at: new Date().toISOString(),
      status: 'DRAFT',
      ...data
    };
    this.proposalsState.unshift(newProp);
    return newProp;
  },

  createInvoice(data) {
    const newInv = {
      id: `inv-${Date.now()}`,
      invoice_number: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      issue_date: new Date().toISOString().split('T')[0],
      status: 'DRAFT',
      paid_amount: 0,
      ...data
    };
    this.invoicesState.unshift(newInv);
    return newInv;
  }
};
