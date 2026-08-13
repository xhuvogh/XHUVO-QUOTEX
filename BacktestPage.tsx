import React, { useState } from 'react';
import { ArrowLeft, BarChart2, Cpu, Radio, Zap, ShoppingBag } from 'lucide-react';
import { BacktestSimulator } from './BacktestSimulator';
import { InteractiveChartStudio } from './InteractiveChartStudio';
import { LiveSignalsPanel } from './LiveSignalsPanel';
import { XhuvoLogo } from './XhuvoLogo';
import { triggerLogoLoader } from '../utils/loader';

interface BacktestPageProps {
  currency: 'USD' | 'BDT';
  setCurrency: (c: 'USD' | 'BDT') => void;
  onOpenCheckout: (planId?: string) => void;
  onBackToStore: () => void;
}

export const BacktestPage: React.FC<BacktestPageProps> = ({
  currency,
  setCurrency,
  onOpenCheckout,
  onBackToStore
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'studio' | 'signals'>('simulator');

  const handleTabSwitch = (tab: 'simulator' | 'studio' | 'signals', toolName: string) => {
    if (tab === activeTab) return;
    triggerLogoLoader(`LOADING ${toolName.toUpperCase()}...`, 1600, () => {
      setActiveTab(tab);
    });
  };

  return (
    <div className="min-h-screen bg-[#060912] text-slate-100 font-sans pb-20 md:pb-12">
      {/* Top Standalone Navigation Bar */}
      <header className="sticky top-0 z-50 liquid-glass-header px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Back to Store Button & Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onBackToStore}
              className="px-3 py-1.5 rounded-xl liquid-glass hover:bg-slate-800/80 text-xs font-mono font-bold text-slate-200 transition-all flex items-center space-x-1.5 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">RETURN TO STORE</span>
              <span className="sm:hidden">STORE</span>
            </button>

            <div onClick={onBackToStore} className="cursor-pointer">
              <XhuvoLogo size="sm" showSubtitle={false} />
            </div>
          </div>

          {/* Page Title Badge */}
          <div className="hidden lg:flex items-center space-x-2 px-3.5 py-1 rounded-full liquid-glass-pill text-purple-300 text-xs font-mono font-bold">
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <span>BACKTESTING & TESTING TOOLS STUDIO</span>
          </div>

          {/* Controls: Currency + Buy Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => {
                triggerLogoLoader('TOGGLING CURRENCY...', 1200, () => setCurrency(currency === 'USD' ? 'BDT' : 'USD'));
              }}
              className="px-2.5 py-1.5 rounded-lg liquid-glass-pill text-xs font-mono font-bold text-purple-300 border border-purple-500/30 hover:border-purple-400"
            >
              {currency} ৳
            </button>

            <button
              onClick={() => onOpenCheckout('xhuvoqx-infinity')}
              className="px-3.5 py-2 rounded-xl liquid-glass-button text-white font-black text-xs hover:scale-[1.02] transition-all flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-4 h-4 fill-current" />
              <span>BUY INDICATORS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner for Testing Page */}
      <div className="bg-gradient-to-b from-[#0f0720] to-[#060912] border-b border-purple-500/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full liquid-glass-pill text-purple-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>XHUVO QX HIGH PRECISION TESTING LAB</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Algorithm Testing & Strategy Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Verify historical win-rates, analyze 1M OTC candle executions, test strategy parameters, and review live algorithmic signal triggers before applying to TradingView.
          </p>

          {/* Tool Tab Switcher */}
          <div className="pt-4 flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleTabSwitch('simulator', 'Strategy Backtest Simulator')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'simulator'
                  ? 'liquid-glass-button text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-300/50'
                  : 'liquid-glass text-slate-300 hover:text-white hover:border-purple-500/40'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>1. Strategy Backtest Simulator</span>
            </button>

            <button
              onClick={() => handleTabSwitch('studio', 'Interactive Chart Studio')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'studio'
                  ? 'liquid-glass-button text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-300/50'
                  : 'liquid-glass text-slate-300 hover:text-white hover:border-purple-500/40'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. Interactive Chart Studio</span>
            </button>

            <button
              onClick={() => handleTabSwitch('signals', 'Live Signal Scanner')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'signals'
                  ? 'liquid-glass-button text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-300/50'
                  : 'liquid-glass text-slate-300 hover:text-white hover:border-purple-500/40'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>3. Live Signal Scanner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area based on Selected Tab */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'simulator' && (
          <div className="space-y-8 animate-fadeIn">
            <BacktestSimulator />
          </div>
        )}

        {activeTab === 'studio' && (
          <div className="space-y-8 animate-fadeIn">
            <InteractiveChartStudio onOpenCheckout={onOpenCheckout} />
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-8 animate-fadeIn">
            <LiveSignalsPanel onOpenCheckout={onOpenCheckout} />
          </div>
        )}
      </main>

      {/* Footer Banner CTA */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Ready to trade with 90%+ Win Accuracy?</h3>
            <p className="text-xs text-slate-300">Get instant TradingView invite-only script authorization with 100% non-repaint signals.</p>
          </div>
          <button
            onClick={() => onOpenCheckout('xhuvoqx-infinity')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg hover:scale-[1.02] transition-all whitespace-nowrap"
          >
            PROCEED TO PAYMENT GATEWAY
          </button>
        </div>
      </div>
    </div>
  );
};
