export const INITIAL_PORTFOLIO_PROJECTS = [
  {
    id: 'proj-01',
    title: 'Himalayan Cold Storage Apple Sorting Line',
    slug: 'himalayan-apple-sorting-line',
    client_name: 'Himalayan Orchards Ltd',
    industry: 'Fruit Processing & Agriculture',
    description: 'Turnkey installation of automated 4-channel apple grading line with soft receiving bins and digital weight sensors.',
    challenge: 'High apple bruising rates and manual sorting bottlenecks during peak harvest season.',
    solution: 'Designed and installed a customized 3 Tons/hr SS 304 automated roller grader line.',
    results: '98% reduction in apple bruising and 3x faster packing turnaround time.',
    featured_image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=80',
    completion_date: '2026-05-15',
    is_featured: true
  },
  {
    id: 'proj-02',
    title: 'Dehradun Commercial Hotel Kitchen Setup',
    slug: 'dehradun-hotel-kitchen-setup',
    client_name: 'Hotel Capital Plaza Dehradun',
    industry: 'Hospitality & Commercial Kitchen',
    description: 'Complete AISI 304 food-grade stainless steel fabrication, custom work tables, gas ranges & ventilation hoods.',
    challenge: 'Strict food safety hygiene compliance requirements for 500+ daily buffet covers.',
    solution: 'Custom SS 304 anti-microbial worktables, heavy duty pulverizers, pizza ovens and cold storage.',
    results: '100% Food Grade SS 304 inspection pass with zero health audit flags.',
    featured_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    completion_date: '2026-06-20',
    is_featured: true
  },
  {
    id: 'proj-03',
    title: 'Commercial Cold Press Mustard Oil Extraction Unit',
    slug: 'cold-press-mustard-oil-unit',
    client_name: 'PureBio Himalayan Oils',
    industry: 'Oil Processing & Spices',
    description: '10 HP heavy duty cold press expeller setup with automated seed feeder and dual filter press.',
    challenge: 'Temperature buildup in traditional warm expellers degrading essential oil nutrients.',
    solution: 'Engineered a temperature-regulated 100 kg/hr cold press screw worm expeller.',
    results: 'Extracted 94% purity cold pressed mustard oil preserving natural aroma and allyl isothiocyanate.',
    featured_image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80',
    completion_date: '2026-07-10',
    is_featured: true
  }
];

export const portfolioService = {
  getProjects() {
    return INITIAL_PORTFOLIO_PROJECTS;
  },

  getProjectBySlug(slug) {
    return INITIAL_PORTFOLIO_PROJECTS.find((p) => p.slug === slug || p.id === slug);
  }
};
