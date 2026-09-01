import React, { useState } from 'react';
import {
  LayoutDashboard,
  Tv,
  Users,
  Kanban,
  FileText,
  Image as ImageIcon,
  Settings,
  ArrowLeft,
  Shield,
  Layers,
  Sparkles,
  Package,
  Building2,
  FileCheck2,
  Menu
} from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';
import { AdminDashboard } from './Dashboard/AdminDashboard';
import { HomepageBuilder } from './HomepageBuilder/HomepageBuilder';
import { LeadsManager } from './Leads/LeadsManager';
import { PipelineKanban } from './Pipeline/PipelineKanban';
import { ProposalManager } from './Proposals/ProposalManager';
import { MediaManager } from './Media/MediaManager';
import { SettingsManager } from './Settings/SettingsManager';
import { ProductsManager } from './Products/ProductsManager';
import { CompanyBrandManager } from './CompanyBrand/CompanyBrandManager';
import { DocumentManager } from './Documents/DocumentManager';

const FALLBACK_LOGO = '/velametric-logo.png';

export const ADMIN_MODULES = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'company-brand', label: 'Company & Branding Kit', icon: Building2, highlight: true },
  { id: 'documents', label: 'Business Document Generator', icon: FileCheck2, highlight: true },
  { id: 'homepage-builder', label: 'Visual Homepage Builder', icon: Tv },
  { id: 'products', label: 'Products & Categories CMS', icon: Package },
  { id: 'leads', label: 'Leads & Inquiries CRM', icon: Users },
  { id: 'pipeline', label: 'Sales Pipeline Kanban', icon: Kanban },
  { id: 'proposals', label: 'Proposals & Commercial Quotes', icon: FileText },
  { id: 'media', label: 'Supabase Media Library', icon: ImageIcon },
  { id: 'settings', label: 'Global Platform Settings', icon: Settings }
];

export const AdminLayout = ({ onReturnToWebsite }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const { branding } = useRenova() || {};

  const company = branding?.companyProfile || {};
  const tokens = branding?.brandTokens || {};
  const logos = branding?.logos || {};

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <AdminDashboard onNavigate={setActiveModule} />;
      case 'company-brand':
        return <CompanyBrandManager />;
      case 'documents':
        return <DocumentManager />;
      case 'homepage-builder':
        return <HomepageBuilder />;
      case 'products':
        return <ProductsManager />;
      case 'leads':
        return <LeadsManager />;
      case 'pipeline':
        return <PipelineKanban />;
      case 'proposals':
        return <ProposalManager />;
      case 'media':
        return <MediaManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <AdminDashboard onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased">
      
      {/* Master Top Bar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onReturnToWebsite}
              className="flex items-center gap-1 text-xs font-bold text-sky-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Public Website</span>
              <span className="sm:hidden">Site</span>
            </button>

            <div className="h-4 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2 min-w-0">
              <img
                src={logos.primary_logo || FALLBACK_LOGO}
                alt="Velametric Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_LOGO;
                }}
                className="h-6 sm:h-7 object-contain rounded-md bg-slate-900 p-0.5 border border-slate-800 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-black tracking-wider uppercase truncate text-white flex items-center gap-1.5">
                  <span className="truncate">DEMO CRM FOR E-COMMERCE</span>
                  <span className="hidden md:inline-block text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-xs uppercase shrink-0">
                    CLIENT DEMO
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold block truncate">
                  Via Velametric Global • We Create. We Market. We Grow
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs">
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-extrabold bg-sky-950 text-sky-300 border border-sky-800 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
              <span>VELAMETRIC GLOBAL DEMO</span>
            </span>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
              VG
            </div>
          </div>

        </div>
      </header>

      {/* Mobile/Tablet Horizontal Module Switcher (Visible on Mobile & Tablet) */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-3 py-2 sticky top-[45px] z-40 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {ADMIN_MODULES.map((mod) => {
            const IconComp = mod.icon;
            const isActive = activeModule === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-slate-900'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{mod.label}</span>
                {mod.highlight && (
                  <span className="text-[9px] bg-sky-400 text-slate-950 font-black px-1 rounded-sm">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Left Sidebar Navigation (Desktop) + Content Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        
        {/* Left Navigation Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-2">
          <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-sm space-y-1 sticky top-16">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-3 py-2 block">
              Demo CRM Modules
            </span>

            {ADMIN_MODULES.map((mod) => {
              const IconComp = mod.icon;
              const isActive = activeModule === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`w-full p-2.5 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all text-left ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md font-extrabold'
                      : 'text-slate-700 hover:bg-sky-50 hover:text-slate-900'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span className="truncate">{mod.label}</span>
                  {mod.highlight && (
                    <span className="ml-auto text-[9px] bg-sky-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">
                      NEW
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Active Module View */}
        <main className="lg:col-span-9 space-y-4 min-w-0">
          {renderActiveModule()}
        </main>

      </div>

    </div>
  );
};
