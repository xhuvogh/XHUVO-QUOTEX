import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicatorShowcase } from './components/IndicatorShowcase';
import { VipPricingSection } from './components/VipPricingSection';
import { ProofAndTestimonials } from './components/ProofAndTestimonials';
import { SocialVideoHub } from './components/SocialVideoHub';
import { Footer } from './components/Footer';
import { PaymentPage } from './components/PaymentPage';
import { BacktestPage } from './components/BacktestPage';
import { SupportPage } from './components/SupportPage';
import { FeedbackPage } from './components/FeedbackPage';
import { AiSupportWidget } from './components/AiSupportWidget';
import { StickyMobileNav } from './components/StickyMobileNav';
import { PageTransitionOverlay } from './components/PageTransitionOverlay';
import { XhuvoLogo } from './components/XhuvoLogo';
import { AdminBackendModal } from './components/AdminBackendModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HeroSkeleton, ShowcaseSkeleton } from './components/SkeletonLoader';
import { StoreProvider } from './context/StoreContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';

const VIEW_ORDER: Record<string, number> = {
  store: 0,
  backtest: 1,
  feedback: 2,
  support: 3,
  payment: 4,
};

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
    rotateY: direction > 0 ? 12 : -12,
  }),
  animate: {
    x: '0%',
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
    rotateY: direction < 0 ? 12 : -12,
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const,
    },
  }),
};

function MainApp() {
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('BDT');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentView, setCurrentView] = useState<'store' | 'backtest' | 'feedback' | 'support' | 'payment'>('store');
  const [navigationDirection, setNavigationDirection] = useState<number>(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('xhuvoqx-infinity');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>('SWITCHING WEBPAGE...');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  // Global loader listener for analysis tools & page transitions
  useEffect(() => {
    const handleTriggerLoader = (e: any) => {
      const { message = 'Switching Webpage...', duration = 450, callback } = e.detail || {};
      setLoaderMessage(message);
      setIsNavigating(true);
      setTimeout(() => {
        setIsNavigating(false);
        if (callback) callback();
      }, duration);
    };

    window.addEventListener('xhuvo-trigger-loader', handleTriggerLoader);
    return () => window.removeEventListener('xhuvo-trigger-loader', handleTriggerLoader);
  }, []);

  // 120Hz High Performance Smooth Scrolling Hook for Desktop/Mouse users
  useEffect(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    const lerpSpeed = 0.085; // highly-tuned inertia value for 120Hz screens
    let animationActive = false;

    const handleWheel = (e: WheelEvent) => {
      // Allow default behavior if hovering over scrollable items like chats or modals
      const composedPath = e.composedPath();
      const isInsideScrollable = composedPath.some((element: any) => {
        if (!element || !element.tagName) return false;
        const computedStyle = window.getComputedStyle(element);
        return (
          (computedStyle.overflowY === 'auto' || computedStyle.overflowY === 'scroll') &&
          element.scrollHeight > element.clientHeight
        );
      });
      if (isInsideScrollable) return;

      e.preventDefault();
      targetY += e.deltaY;
      
      const maxScrollBoundary = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(targetY, maxScrollBoundary));

      if (!animationActive) {
        animationActive = true;
        requestAnimationFrame(animateInertiaScroll);
      }
    };

    const animateInertiaScroll = () => {
      const distance = targetY - currentY;
      if (Math.abs(distance) < 0.15) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        animationActive = false;
      } else {
        currentY += distance * lerpSpeed;
        window.scrollTo(0, currentY);
        requestAnimationFrame(animateInertiaScroll);
      }
    };

    const handleSyncScroll = () => {
      if (!animationActive) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleSyncScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleSyncScroll);
    };
  }, []);

  // Sync state with URL hash on load and hash change
  useEffect(() => {
    const syncViewFromHash = () => {
      const hash = window.location.hash.toLowerCase();
      let targetView: 'store' | 'backtest' | 'feedback' | 'support' | 'payment' = 'store';
      if (hash === '#checkout' || hash === '#payment') {
        targetView = 'payment';
      } else if (hash === '#backtest' || hash === '#testing') {
        targetView = 'backtest';
      } else if (hash === '#support' || hash === '#help' || hash === '#faq') {
        targetView = 'support';
      } else if (hash === '#feedback' || hash === '#reviews' || hash === '#testimonials') {
        targetView = 'feedback';
      }

      setCurrentView((prev) => {
        if (prev !== targetView) {
          const prevIdx = VIEW_ORDER[prev] ?? 0;
          const nextIdx = VIEW_ORDER[targetView] ?? 0;
          setNavigationDirection(nextIdx >= prevIdx ? 1 : -1);
          setLoaderMessage('Switching Webpage...');
          setIsNavigating(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            setIsNavigating(false);
          }, 450);
        }
        return targetView;
      });
    };

    syncViewFromHash();
    window.addEventListener('hashchange', syncViewFromHash);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Secret Admin Hotkey (Ctrl+Shift+A or Cmd+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setLoaderMessage('LOADING ADMIN BACKEND...');
        setIsNavigating(true);
        setTimeout(() => {
          setIsNavigating(false);
          setIsAdminOpen(true);
        }, 450);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', syncViewFromHash);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const triggerPageTransition = (view: 'store' | 'backtest' | 'feedback' | 'support' | 'payment', hash: string) => {
    const currentIdx = VIEW_ORDER[currentView] ?? 0;
    const nextIdx = VIEW_ORDER[view] ?? 0;
    setNavigationDirection(nextIdx >= currentIdx ? 1 : -1);

    setLoaderMessage('SWITCHING WEBPAGE...');
    setIsNavigating(true);
    window.location.hash = hash;
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsNavigating(false);
    }, 450);
  };

  const handleOpenCheckout = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    triggerPageTransition('payment', 'checkout');
  };

  const handleOpenBacktest = () => {
    triggerPageTransition('backtest', 'backtest');
  };

  const handleOpenFeedback = () => {
    triggerPageTransition('feedback', 'feedback');
  };

  const handleOpenSupport = () => {
    triggerPageTransition('support', 'help');
  };

  const handleBackToStore = () => {
    triggerPageTransition('store', 'store');
  };

  const handleExploreStudio = () => {
    setActiveSection('indicators');
    const el = document.getElementById('indicators');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'payment':
        return (
          <motion.div
            key="payment"
            custom={navigationDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-[#06040d] text-slate-100 font-sans pb-28 md:pb-8 relative shadow-2xl"
          >
            <PaymentPage
              initialPlanId={selectedPlanId}
              currency={currency}
              setCurrency={setCurrency}
              onBackToStore={handleBackToStore}
            />
          </motion.div>
        );
      case 'backtest':
        return (
          <motion.div
            key="backtest"
            custom={navigationDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-[#06040d] text-slate-100 font-sans pb-28 md:pb-8 relative shadow-2xl"
          >
            <BacktestPage
              currency={currency}
              setCurrency={setCurrency}
              onOpenCheckout={handleOpenCheckout}
              onBackToStore={handleBackToStore}
            />
          </motion.div>
        );
      case 'feedback':
        return (
          <motion.div
            key="feedback"
            custom={navigationDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-[#06040d] text-slate-100 font-sans pb-28 md:pb-8 relative shadow-2xl"
          >
            <FeedbackPage
              onBackToStore={handleBackToStore}
            />
          </motion.div>
        );
      case 'support':
        return (
          <motion.div
            key="support"
            custom={navigationDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-[#06040d] text-slate-100 font-sans pb-28 md:pb-8 relative shadow-2xl"
          >
            <SupportPage
              currency={currency}
              setCurrency={setCurrency}
              onOpenCheckout={handleOpenCheckout}
              onBackToStore={handleBackToStore}
            />
          </motion.div>
        );
      case 'store':
      default:
        return (
          <motion.div
            key="store"
            custom={navigationDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-[#06040d] text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-28 md:pb-8 relative shadow-2xl"
          >
            <Header
              currency={currency}
              setCurrency={setCurrency}
              onOpenCheckout={handleOpenCheckout}
              onOpenBacktest={handleOpenBacktest}
              onOpenSupport={handleOpenSupport}
              onGoHome={handleBackToStore}
              onOpenAdmin={() => setIsAdminOpen(true)}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              currentView={currentView}
              onOpenFeedback={handleOpenFeedback}
              onExploreStudio={handleExploreStudio}
            />

            <HeroSection
              onOpenCheckout={handleOpenCheckout}
              onExploreStudio={handleExploreStudio}
              currency={currency}
              onOpenAi={() => setIsAiOpen(true)}
            />
            <ProofAndTestimonials onOpenFeedbackPage={handleOpenFeedback} />
            <IndicatorShowcase onOpenCheckout={handleOpenCheckout} />
            <VipPricingSection
              currency={currency}
              setCurrency={setCurrency}
              onOpenCheckout={handleOpenCheckout}
            />
            {/* <SocialVideoHub /> */}

            <Footer onOpenCheckout={handleOpenCheckout} onOpenAdmin={() => setIsAdminOpen(true)} />

            <AiSupportWidget
              onOpenCheckout={handleOpenCheckout}
              externalIsOpen={isAiOpen}
              onToggleOpen={() => setIsAiOpen(!isAiOpen)}
            />

            <AdminBackendModal
              isOpen={isAdminOpen}
              onClose={() => setIsAdminOpen(false)}
              currency={currency}
            />
          </motion.div>
        );
    }
  };

  if (isLoading) {
    return (
      <motion.div
        key="initial-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.4 } }}
        className="fixed inset-0 z-[10000] bg-[#06040d] text-slate-100 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      >
        {/* Soft Ambient Background Glows */}
        <div className="absolute w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[110px] pointer-events-none" />

        {/* Logo Reveal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center space-y-6 z-10"
        >
          {/* Logo Frame */}
          <div className="relative p-2 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.25)] backdrop-blur-xl">
            <XhuvoLogo size="lg" showSubtitle={true} clickable={false} />
          </div>

          {/* Premium Old-School Progress Line */}
          <div className="w-52 sm:w-64 h-1 bg-slate-900 rounded-full overflow-hidden border border-purple-500/20 p-0.5 relative shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="h-full w-2/3 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"
            />
          </div>

          {/* Clean Old-School Branding Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-[11px] font-mono text-purple-300/90 font-bold tracking-[0.25em] uppercase text-center"
          >
            INITIALIZING PLATFORM...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#06040d] pb-28 sm:pb-32">
      {/* Reusable Global Page Transition Overlay */}
      <PageTransitionOverlay isVisible={isNavigating} message={loaderMessage} />

      <AnimatePresence mode="wait" custom={navigationDirection}>
        {renderView()}
      </AnimatePresence>

      {/* PERMANENT VIEWPORT-LOCKED MOBILE TOOLBAR / DOCKBAR */}
      <StickyMobileNav
        onOpenCheckout={handleOpenCheckout}
        onOpenBacktest={handleOpenBacktest}
        onOpenSupport={handleOpenSupport}
        onGoHome={handleBackToStore}
        onOpenAiSupport={() => setIsAiOpen(true)}
        currentView={currentView}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <LanguageProvider>
          <StoreProvider>
            <MainApp />
          </StoreProvider>
        </LanguageProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

