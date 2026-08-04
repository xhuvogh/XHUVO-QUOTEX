import React, { useState, useEffect } from 'react';
import { SmokeBackgroundCanvas } from './components/SmokeBackgroundCanvas';
import { CyberNavbar } from './components/CyberNavbar';
import { HeroSection } from './components/HeroSection';
import { IndicatorShowcaseSection } from './components/IndicatorShowcaseSection';
import { InteractiveChartSimulator } from './components/InteractiveChartSimulator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CheckoutPaymentModal } from './components/CheckoutPaymentModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { CyberFooter } from './components/CyberFooter';
import { getSiteSettings } from './lib/settingsStore';
import { SiteSettings } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('xhuvo_number_unlocked') === 'true';
  });
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    // Check if number was unlocked previously and lock modal open
    const checkLockState = () => {
      if (typeof window !== 'undefined' && localStorage.getItem('xhuvo_number_unlocked') === 'true') {
        setIsCheckoutModalOpen(true);
      }
    };

    checkLockState();
    window.addEventListener('storage', checkLockState);

    // Listen for custom settings updates
    const handleSettingsUpdate = (e: any) => {
      if (e.detail) {
        setSiteSettings(e.detail);
      } else {
        setSiteSettings(getSiteSettings());
      }
    };
    window.addEventListener('xhuvo_settings_updated', handleSettingsUpdate);

    // Check for secret #admin URL hash
    if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
      setIsAdminPortalOpen(true);
    }

    // Secret keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminPortalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('storage', checkLockState);
      window.removeEventListener('xhuvo_settings_updated', handleSettingsUpdate);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] relative selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Dynamic Promo Banner from Admin Settings */}
      {siteSettings.discountBannerActive && (
        <div className="bg-gradient-to-r from-purple-900 via-amber-600 to-cyan-800 text-white font-mono-tech text-xs py-2 px-4 text-center font-extrabold flex items-center justify-center gap-2 shadow-lg border-b border-amber-400/50 relative z-50 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{siteSettings.discountBannerText}</span>
          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            className="ml-2 px-2.5 py-0.5 rounded bg-white text-slate-950 font-black text-[10px] uppercase hover:bg-amber-300 transition-colors cursor-pointer"
          >
            CLAIM NOW
          </button>
        </div>
      )}

      {/* Animated Smoke Background */}
      <SmokeBackgroundCanvas />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <CyberNavbar
          onOpenTelegramModal={() => setIsCheckoutModalOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        <main className="flex-grow space-y-12">
          <HeroSection
            onScrollToSection={handleScrollToSection}
            onOpenTelegramModal={() => setIsCheckoutModalOpen(true)}
          />

          <IndicatorShowcaseSection
            onOpenTelegramModal={() => setIsCheckoutModalOpen(true)}
          />

          <ComparisonMatrix
            onOpenTelegramModal={() => setIsCheckoutModalOpen(true)}
          />

          <InteractiveChartSimulator />
        </main>

        <CyberFooter
          onOpenTelegramModal={() => setIsCheckoutModalOpen(true)}
          onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
          onScrollToSection={handleScrollToSection}
        />
      </div>

      {/* Automated Multi-Method Checkout Payment Modal */}
      <CheckoutPaymentModal
        isOpen={isCheckoutModalOpen || (typeof window !== 'undefined' && localStorage.getItem('xhuvo_number_unlocked') === 'true')}
        onClose={() => {
          if (typeof window === 'undefined' || localStorage.getItem('xhuvo_number_unlocked') !== 'true') {
            setIsCheckoutModalOpen(false);
          }
        }}
        onOpenAdminPortal={() => {
          setIsCheckoutModalOpen(false);
          setIsAdminPortalOpen(true);
        }}
      />

      {/* Developer Admin Verification Channel Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
    </div>
  );
}

