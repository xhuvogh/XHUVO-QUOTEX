import React from 'react';
import { Home, TrendingUp, Zap, HelpCircle, Bot, Sparkles } from 'lucide-react';
import { triggerLogoLoader } from '../utils/loader';

interface StickyMobileNavProps {
  onOpenCheckout: (planId?: string) => void;
  onOpenBacktest: () => void;
  onOpenSupport: () => void;
  onGoHome: () => void;
  onOpenAiSupport?: () => void;
  currentView?: 'store' | 'backtest' | 'support' | 'payment' | 'feedback';
}

export const StickyMobileNav: React.FC<StickyMobileNavProps> = ({
  onOpenCheckout,
  onOpenBacktest,
  onOpenSupport,
  onGoHome,
  onOpenAiSupport,
  currentView = 'store'
}) => {
  const handleNavClick = (actionName: string, actionFn: () => void) => {
    triggerLogoLoader(`LOADING ${actionName.toUpperCase()}...`, 3200, actionFn);
  };

  const handleAiClick = () => {
    triggerLogoLoader('INITIALIZING AI MARKET SCANNER...', 3200, () => {
      if (onOpenAiSupport) {
        onOpenAiSupport();
      } else {
        onOpenSupport();
      }
    });
  };

  return (
    <nav className="bottom-dock block md:hidden">
      {/* Store Home Page */}
      <button
        onClick={() => handleNavClick('Home Store', onGoHome)}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
          currentView === 'store'
            ? 'text-fuchsia-200 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-4 h-4" />
        <span className="text-[10px] font-mono mt-0.5">Home</span>
        {currentView === 'store' && (
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.9)] mt-0.5 animate-pulse" />
        )}
      </button>

      {/* AI Scanner */}
      <button
        onClick={handleAiClick}
        className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-purple-200 hover:text-white font-bold transition-all duration-200 active:scale-95"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="w-4 h-4 text-purple-300" />
          <Sparkles className="w-2 h-2 absolute -top-1 -right-1 text-fuchsia-400 animate-pulse" />
        </div>
        <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">AI SCAN</span>
      </button>

      {/* Backtest */}
      <button
        onClick={() => handleNavClick('Testing Tools Studio', onOpenBacktest)}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
          currentView === 'backtest'
            ? 'text-fuchsia-200 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <TrendingUp className="w-4 h-4" />
        <span className="text-[10px] font-mono mt-0.5">Backtest</span>
        {currentView === 'backtest' && (
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.9)] mt-0.5 animate-pulse" />
        )}
      </button>

      {/* Support */}
      <button
        onClick={() => handleNavClick('Support & FAQ', onOpenSupport)}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
          currentView === 'support'
            ? 'text-fuchsia-200 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <HelpCircle className="w-4 h-4" />
        <span className="text-[10px] font-mono mt-0.5">Support</span>
        {currentView === 'support' && (
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.9)] mt-0.5 animate-pulse" />
        )}
      </button>

      {/* Instant Buy / Payment Page */}
      <button
        onClick={() => handleNavClick('Checkout Payment Gateway', () => onOpenCheckout('xhuvoqx-infinity'))}
        className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl font-bold transition-all duration-200 active:scale-95 ${
          currentView === 'payment'
            ? 'text-fuchsia-200 font-bold'
            : 'text-purple-300 hover:text-white'
        }`}
      >
        <Zap className="w-4 h-4 fill-current text-fuchsia-400" />
        <span className="text-[9px] font-mono font-black tracking-tighter mt-0.5">BUY</span>
        {currentView === 'payment' && (
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.9)] mt-0.5 animate-pulse" />
        )}
      </button>
    </nav>
  );
};

