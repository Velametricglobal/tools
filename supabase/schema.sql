-- =============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR ENTERPRISE CMS, CRM & VISUAL PAGE BUILDER
-- WITH BRANDING KIT & BUSINESS DOCUMENT GENERATOR
-- =============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role_id UUID REFERENCES roles(id),
  phone TEXT,
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  module TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  old_value JSONB,
  new_value JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MULTI-BRAND & BRANDING KIT TABLES
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  brand_name TEXT,
  tagline TEXT,
  company_type TEXT DEFAULT 'Private Limited',
  registration_no TEXT,
  gstin TEXT,
  pan TEXT,
  cin TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  pincode TEXT,
  bank_details_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brand_kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  logos_json JSONB DEFAULT '{}'::jsonb,
  colors_json JSONB DEFAULT '{}'::jsonb,
  typography_json JSONB DEFAULT '{}'::jsonb,
  tokens_json JSONB DEFAULT '{}'::jsonb,
  guidelines_json JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brand_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  folder TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VISUAL PAGE BUILDER & THEME ENGINE
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  is_homepage BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  seo_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_enabled BOOLEAN DEFAULT TRUE,
  content_json JSONB DEFAULT '{}'::jsonb,
  style_json JSONB DEFAULT '{}'::jsonb,
  responsive_json JSONB DEFAULT '{}'::jsonb,
  animation_json JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  content_snapshot JSONB NOT NULL,
  status TEXT DEFAULT 'DRAFT',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS theme_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'Default Theme',
  is_active BOOLEAN DEFAULT TRUE,
  colors_json JSONB DEFAULT '{}'::jsonb,
  typography_json JSONB DEFAULT '{}'::jsonb,
  buttons_json JSONB DEFAULT '{}'::jsonb,
  cards_json JSONB DEFAULT '{}'::jsonb,
  layout_json JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SERVICES, PORTFOLIO & CASE STUDIES CMS
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  full_description TEXT,
  icon TEXT,
  cover_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  process_steps JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'PUBLISHED',
  sort_order INT DEFAULT 0,
  seo_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  industry TEXT,
  description TEXT,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  featured_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  completion_date DATE,
  testimonial_quote TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'PUBLISHED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CRM & SALES PIPELINE ENGINE
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#02408f',
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  service_interest TEXT,
  estimated_budget DECIMAL(12, 2),
  notes TEXT,
  source TEXT DEFAULT 'Website Form',
  stage_id UUID REFERENCES pipeline_stages(id),
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BUSINESS DOCUMENT GENERATOR & SEQUENCES
CREATE TABLE IF NOT EXISTS document_sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doc_type TEXT UNIQUE NOT NULL,
  prefix TEXT NOT NULL,
  financial_year TEXT DEFAULT '2026-27',
  current_number INT DEFAULT 100,
  padding_length INT DEFAULT 4
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  doc_type TEXT NOT NULL,
  doc_number TEXT UNIQUE NOT NULL,
  financial_year TEXT DEFAULT '2026-27',
  client_id UUID,
  lead_id UUID REFERENCES leads(id),
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  client_address TEXT,
  client_gstin TEXT,
  issue_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  valid_until DATE,
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(12, 2) DEFAULT 0,
  taxable_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
  cgst_amount DECIMAL(12, 2) DEFAULT 0,
  sgst_amount DECIMAL(12, 2) DEFAULT 0,
  igst_amount DECIMAL(12, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
  paid_amount DECIMAL(12, 2) DEFAULT 0,
  status TEXT DEFAULT 'DRAFT',
  notes TEXT,
  terms TEXT,
  bank_details_json JSONB DEFAULT '{}'::jsonb,
  signature_url TEXT,
  verification_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  hsn_sac TEXT,
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit TEXT DEFAULT 'Nos',
  rate DECIMAL(12, 2) NOT NULL DEFAULT 0,
  discount_pct DECIMAL(5, 2) DEFAULT 0,
  gst_rate DECIMAL(5, 2) DEFAULT 18,
  taxable_value DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total_value DECIMAL(12, 2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  content_snapshot JSONB NOT NULL,
  changed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Public READ for published content
CREATE POLICY "Public Read Pages" ON pages FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public Read Sections" ON page_sections FOR SELECT USING (is_enabled = TRUE);
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (status = 'PUBLISHED');

-- Authenticated Full Access for Admin
CREATE POLICY "Admin Full Control Pages" ON pages FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Full Control Sections" ON page_sections FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Full Control Leads" ON leads FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Full Control Documents" ON documents FOR ALL TO authenticated USING (TRUE);
