import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, TrendingUp, HelpCircle, Send, Home, Globe, Sparkles, Tag, Menu, X, CheckCircle2, MessageCircle } from 'lucide-react';
import { XhuvoLogo } from './XhuvoLogo';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { triggerLogoLoader } from '../utils/loader';

interface HeaderProps {
  currency: 'USD' | 'BDT';
  setCurrency: (c: 'USD' | 'BDT') => void;
  onOpenCheckout: (planId?: string) => void;
  onOpenBacktest: () => void;
  onOpenSupport: () => void;
  onGoHome: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  currentView?: 'store' | 'backtest' | 'support' | 'payment' | 'feedback';
  onOpenFeedback?: () => void;
  onExploreStudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  setCurrency,
  onOpenCheckout,
  onOpenBacktest,
  onOpenSupport,
  onGoHome,
  onOpenAdmin,
  activeSection,
  setActiveSection,
  currentView = 'store',
  onOpenFeedback,
  onExploreStudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const store = useStore();
  const { language, setLanguage, t } = useLanguage();
  const { showToast } = useToast();
  
  const infinityPrice = store.prices['xhuvoqx-infinity'] || { priceUSD: 400, priceBDT: 46000 };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'EN' | 'BN');
    showToast('Settings saved successfully', 'success');
  };

  return (
    <header className="sticky top-0 z-[9990] bg-[#070312]/85 backdrop-blur-2xl border-b border-purple-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.2)] transition-all">
      
      {/* 3. TOP ANNOUNCEMENT TICKER STRIP (Top Flash Sale Ticker) */}
      {store.weeklyDiscountEnabled ? (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-[11px] font-mono py-2 px-3 sm:px-6 border-b border-red-500/50 overflow-hidden backdrop-blur-xl flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-black text-amber-400 font-black text-[9px] tracking-widest uppercase animate-pulse">
                🔥 WEEKLY 80% MEGA OFFER
              </span>
              <span className="font-bold tracking-tight text-white uppercase text-center md:text-left">
                ONLY <strong className="bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black">{store.weeklyDiscountSpotsLeft} PEOPLE</strong> CAN ENJOY THIS OFFER! ({5 - store.weeklyDiscountSpotsLeft} CLAIMED)
              </span>
            </div>
            
            <div className="flex items-center space-x-3 font-mono">
              <span className="text-[10px] text-red-100 font-bold uppercase tracking-wider hidden sm:inline">OFFER ENDS IN:</span>
              <span className="bg-black/90 px-2.5 py-1 rounded-md text-amber-300 font-black tracking-widest text-[12px] border border-red-500/30 font-mono shadow-inner">
                {(() => {
                  const hrs = Math.floor(store.weeklyDiscountTimeLeft / 3600);
                  const mins = Math.floor((store.weeklyDiscountTimeLeft % 3600) / 60);
                  const secs = store.weeklyDiscountTimeLeft % 60;
                  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                })()}
              </span>
              <button 
                onClick={() => {
                  const pricingEl = document.getElementById('pricing');
                  if (pricingEl) pricingEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-red-700 font-black px-3 py-1 rounded text-[10px] hover:bg-red-100 transition active:scale-95 uppercase tracking-wide shrink-0 shadow animate-pulse"
              >
                Claim Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-purple-950/90 via-fuchsia-950/90 to-indigo-950/90 text-[11px] font-mono py-1.5 px-3 sm:px-6 border-b border-purple-500/30 text-slate-200 overflow-hidden backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Ticker Content */}
            <div className="flex items-center space-x-3 sm:space-x-5 overflow-x-auto no-scrollbar whitespace-nowrap">
              
              {/* Flash Sale Badge */}
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/50 text-fuchsia-200 font-bold text-[10px] tracking-wide animate-pulse shadow-[0_0_10px_rgba(217,70,239,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping" />
                <span>⚡ FLASH SALE</span>
              </div>

              {/* Promo Code Coupon Highlight */}
              <div className="flex items-center space-x-1.5 text-purple-200 font-bold">
                <Tag className="w-3 h-3 text-fuchsia-400 shrink-0" />
                <span>USE CODE <strong className="text-white bg-purple-500/30 px-1.5 py-0.5 rounded border border-purple-400/40 font-mono tracking-wider">XHUVO20</strong> FOR 20% EXTRA DISCOUNT!</span>
              </div>

              <span className="text-purple-500/50 hidden sm:inline">•</span>

              {/* Guarantee Tag */}
              <span className="hidden md:flex items-center space-x-1 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Non-Repaint & Non-MTG Indicators</span>
              </span>

              <span className="text-purple-500/50 hidden md:inline">•</span>

              {/* Pricing Hint */}
              <span className="hidden lg:inline text-purple-300">
                XHUVO QUOTEX INDICATORS: <strong className="text-white">${infinityPrice.priceUSD} / ৳{infinityPrice.priceBDT.toLocaleString()}</strong>
              </span>
            </div>

            {/* Right Telegram Developer Support Badge */}
            <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono shrink-0 pl-3">
              <a 
                href="https://t.me/XQ_owner" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center space-x-1.5 text-purple-300 hover:text-white transition-colors bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/30"
              >
                <Send className="w-3 h-3 text-purple-400" />
                <span>DEV: <strong className="text-fuchsia-200">@XQ_owner</strong></span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* 2. SINGLE-ROW MINIMALIST HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* LEFT: Clean Unboxed Brand Logo & Indicators Shortcut Button */}
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0 my-auto">
          <div 
            onClick={onGoHome} 
            className="cursor-pointer flex items-center justify-center group"
            id="logo-header"
          >
            <XhuvoLogo size="sm" showSubtitle={false} clickable={true} unboxed={true} />
          </div>

          {/* INDICATORS SHORTCUT BUTTON with premium breathing animation */}
          <motion.button
            onClick={() => {
              if (currentView !== 'store') {
                triggerLogoLoader('LOADING STORE HOME...', 1600, () => {
                  onGoHome();
                  setTimeout(() => {
                    const el = document.getElementById('indicators');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                });
              } else {
                if (onExploreStudio) {
                  onExploreStudio();
                } else {
                  const el = document.getElementById('indicators');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 6px rgba(168,85,247,0.3)',
                '0 0 20px rgba(168,85,247,0.7)',
                '0 0 6px rgba(168,85,247,0.3)'
              ],
              borderColor: [
                'rgba(168,85,247,0.4)',
                'rgba(236,72,153,0.8)',
                'rgba(168,85,247,0.4)'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-purple-950/50 border text-[9px] sm:text-xs font-mono font-black text-white hover:bg-purple-900/30 transition-all cursor-pointer shadow-lg tracking-wider"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fuchsia-400 animate-pulse fill-fuchsia-400/20 shrink-0" />
            <span>INDICATORS</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
          </motion.button>
        </div>

        {/* CENTER: Desktop Navigation Links (Clean) */}
        <nav className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => triggerLogoLoader('SWITCHING TO STORE HOME...', 3200, onGoHome)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center space-x-2 ${
              currentView === 'store'
                ? 'bg-purple-500/20 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4 text-purple-400" />
            <span>{t('nav.store')}</span>
          </button>

          <button
            onClick={() => triggerLogoLoader('LOADING TESTING TOOLS STUDIO...', 3200, onOpenBacktest)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center space-x-2 ${
              currentView === 'backtest'
                ? 'bg-purple-500/20 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>{t('nav.backtest')}</span>
          </button>

          <button
            onClick={() => {
              if (onOpenFeedback) {
                triggerLogoLoader('LOADING MEMBER FEEDBACKS...', 3200, onOpenFeedback);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center space-x-2 ${
              currentView === 'feedback'
                ? 'bg-purple-500/20 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-purple-400" />
            <span>{t('nav.reviews')}</span>
          </button>

          <button
            onClick={() => triggerLogoLoader('LOADING SUPPORT & FAQ PAGE...', 3200, onOpenSupport)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center space-x-2 ${
              currentView === 'support'
                ? 'bg-purple-500/20 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>{t('nav.support')}</span>
          </button>
        </nav>

        {/* RIGHT: Currency Selector & Sleek Hamburger Menu Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-950/80 p-0.5 rounded-xl text-xs font-mono">
            <button
              onClick={() => {
                if (currency !== 'USD') {
                  triggerLogoLoader('SWITCHING TO USD CURRENCY...', 3200, () => setCurrency('USD'));
                }
              }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              USD $
            </button>
            <button
              onClick={() => {
                if (currency !== 'BDT') {
                  triggerLogoLoader('SWITCHING TO BDT CURRENCY...', 3200, () => setCurrency('BDT'));
                }
              }}
              className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg font-bold transition-all ${
                currency === 'BDT'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BDT ৳
            </button>
          </div>

          {/* Sleek Hamburger / Menu Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-purple-300 hover:text-white text-xs font-mono font-bold transition-all active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-fuchsia-400" />
            ) : (
              <Menu className="w-4 h-4 text-purple-400" />
            )}
            <span className="hidden xs:inline">MENU</span>
          </button>

          {/* Direct Buy Button (Desktop/Tablet) */}
          <button
            onClick={() => onOpenCheckout('xhuvoqx-infinity')}
            id="join-vip-header-btn"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold font-mono text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-xl hover:scale-[1.02]"
          >
            <Zap className="w-4 h-4 mr-1.5 text-purple-100 fill-current" />
            <span>BUY INFINITY</span>
          </button>
        </div>
      </div>

      {/* Menu Section Drawer (Desktop & Mobile) */}
      {mobileMenuOpen && (
        <div className="bg-[#090514]/95 border-b border-purple-500/30 px-4 pt-4 pb-6 space-y-3 font-mono text-xs shadow-2xl animate-fadeIn backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-400 tracking-wider uppercase mb-1">
              <span>SYSTEM NAVIGATION MENU</span>
              <span className="text-slate-500 font-normal"><span className="text-red-500 font-black">XHUVO</span> QX OFFICIAL</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onGoHome(); }}
                className="flex items-center space-x-2 px-3.5 py-3 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 font-bold hover:bg-purple-900/20 transition-all"
              >
                <Home className="w-4 h-4 text-purple-400" />
                <span>1. Store Home</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBacktest(); }}
                className="flex items-center space-x-2 px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-all"
              >
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span>2. Backtest Tools</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); if (onOpenFeedback) onOpenFeedback(); }}
                className="flex items-center space-x-2 px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-purple-400" />
                <span>3. Member Feedback</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSupport(); }}
                className="flex items-center space-x-2 px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-all"
              >
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>4. Support Desk</span>
              </button>
            </div>

            {/* Language Setting in Menu Section */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/40 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <div>
                  <span className="text-white font-bold block text-xs">System Language Setting</span>
                  <span className="text-slate-400 text-[10px]">Change application locale &amp; language</span>
                </div>
              </div>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-slate-950 text-purple-200 border border-purple-500/50 rounded-lg px-3 py-1.5 font-mono font-bold text-xs outline-none cursor-pointer focus:ring-2 focus:ring-purple-500"
              >
                <option value="EN">English (EN)</option>
                <option value="BN">বাংলা (BN)</option>
              </select>
            </div>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout('xhuvoqx-infinity');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-xl font-bold text-xs text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>PROCEED TO PAYMENT GATEWAY</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


