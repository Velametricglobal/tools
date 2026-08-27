import React, { useState } from 'react';
import { RenovaProvider } from './context/RenovaContext';
import { RenovaTopBar } from './components/Header/RenovaTopBar';
import { RenovaNavbar } from './components/Header/RenovaNavbar';
import { RenovaCategoryNav } from './components/Header/RenovaCategoryNav';
import { MobileMenuDrawer } from './components/Header/MobileMenuDrawer';
import { RenovaHero } from './components/Hero/RenovaHero';
import { CategoryPills } from './components/Sections/CategoryPills';
import { RenovaProductSection } from './components/Sections/RenovaProductSection';
import { KitchenConfigurator } from './components/Sections/KitchenConfigurator';
import { ManufacturingTrust } from './components/Sections/ManufacturingTrust';
import { ContactSection } from './components/Sections/ContactSection';
import { RenovaProductModal } from './components/Product/RenovaProductModal';
import { ProductCompareModal } from './components/Modals/ProductCompareModal';
import { RFQDrawer } from './components/Modals/RFQDrawer';
import { QuickQuoteModal } from './components/Modals/QuickQuoteModal';
import { FloatingWhatsApp } from './components/Floating/FloatingWhatsApp';
import { StickyRFQBar } from './components/Floating/StickyRFQBar';
import { RenovaFooter } from './components/Footer/RenovaFooter';
import { ToastContainer } from './components/ToastContainer';
import { AdminLayout } from './components/Admin/AdminLayout';

export function App() {
  const [currentView, setCurrentView] = useState('website'); // 'website' | 'admin'

  return (
    <RenovaProvider>
      {currentView === 'admin' ? (
        <AdminLayout onReturnToWebsite={() => setCurrentView('website')} />
      ) : (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-[#02408f] selection:text-white pb-16">
          {/* Header Navigation System */}
          <RenovaTopBar onOpenAdmin={() => setCurrentView('admin')} />
          <RenovaNavbar />
          <RenovaCategoryNav />
          <MobileMenuDrawer />

          {/* Main Content Showcase */}
          <main className="flex-1">
            <RenovaHero />
            <CategoryPills />
            <RenovaProductSection />
            <KitchenConfigurator />
            <ManufacturingTrust />
            <ContactSection />
          </main>

          {/* Footer */}
          <RenovaFooter />

          {/* Floating Widgets */}
          <FloatingWhatsApp />
          <StickyRFQBar />

          {/* Modals & Overlays */}
          <RenovaProductModal />
          <ProductCompareModal />
          <RFQDrawer />
          <QuickQuoteModal />
          <ToastContainer />
        </div>
      )}
    </RenovaProvider>
  );
}

export default App;
