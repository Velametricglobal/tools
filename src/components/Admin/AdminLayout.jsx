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
  FileCheck2
} from 'lucide-react';
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
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToWebsite}
              className="flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Public Website</span>
            </button>

            <div className="h-4 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#02408f] text-amber-300 font-black flex items-center justify-center text-xs shadow-xs">
                T
              </div>
              <div>
                <span className="text-xs font-black tracking-wider uppercase block text-white">
                  Tejas Admin Console
                </span>
                <span className="text-[10px] text-slate-400 font-bold block">
                  Enterprise Headless CMS & CRM
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>SUPER_ADMIN (RLS Enabled)</span>
            </span>

            <div className="w-8 h-8 rounded-full bg-[#02408f] text-white font-extrabold flex items-center justify-center text-xs">
              AD
            </div>
          </div>

        </div>
      </header>

      {/* Main Layout: Left Sidebar Navigation + Content Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-3 py-2 block">
              Admin Modules
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
                      ? 'bg-[#02408f] text-white shadow-md font-extrabold'
                      : 'text-slate-700 hover:bg-sky-50 hover:text-[#02408f]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span className="truncate">{mod.label}</span>
                  {mod.highlight && (
                    <span className="ml-auto text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">
                      NEW
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Active Module View */}
        <main className="lg:col-span-9 space-y-4">
          {renderActiveModule()}
        </main>

      </div>

    </div>
  );
};
