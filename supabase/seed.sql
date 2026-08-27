-- =============================================================================
-- SUPABASE INITIAL SEED DATA
-- =============================================================================

-- Seed Roles
INSERT INTO roles (name, description) VALUES
  ('SUPER_ADMIN', 'Full system access across all modules and settings'),
  ('ADMIN', 'Full management access to content, CRM, and services'),
  ('SALES_MANAGER', 'Manages sales team, leads, deals, and proposals'),
  ('SALES_EXECUTIVE', 'Manages assigned leads and follow-ups'),
  ('CONTENT_MANAGER', 'Manages CMS content, pages, blog, and media')
ON CONFLICT (name) DO NOTHING;

-- Seed Pipeline Stages
INSERT INTO pipeline_stages (name, code, color, sort_order) VALUES
  ('New Inquiry', 'NEW', '#3b82f6', 1),
  ('Contacted', 'CONTACTED', '#0284c7', 2),
  ('Qualified', 'QUALIFIED', '#0d9488', 3),
  ('Meeting Scheduled', 'MEETING', '#8b5cf6', 4),
  ('Proposal Sent', 'PROPOSAL', '#f59e0b', 5),
  ('Negotiation', 'NEGOTIATION', '#d97706', 6),
  ('Closed Won', 'WON', '#10b981', 7),
  ('Closed Lost', 'LOST', '#ef4444', 8)
ON CONFLICT (code) DO NOTHING;

-- Seed Service Categories
INSERT INTO service_categories (name, slug, description, icon, sort_order) VALUES
  ('Website & App Development', 'web-app-dev', 'High performance enterprise websites, web apps, and mobile applications', 'Code', 1),
  ('Digital & Offline Marketing', 'marketing', 'Data-driven marketing, SEO, PPC, and brand promotion campaigns', 'TrendingUp', 2),
  ('Branding & Graphics', 'branding', 'Corporate brand identity, SS 304 packaging design, and visual assets', 'Palette', 3),
  ('Video Production & PR', 'video-pr', 'Commercial promotional videos, 3D product animations, and PR media', 'Video', 4),
  ('Financial Consultancy & Loans', 'financial-loans', 'Government subsidy loans, business cash credits, and machinery financing', 'Building2', 5)
ON CONFLICT (slug) DO NOTHING;

-- Seed Navigation
INSERT INTO navigation_menus (name, location) VALUES
  ('Main Header Menu', 'header')
ON CONFLICT (location) DO NOTHING;
