import React, { useState } from 'react';
import { Check, X, Shield, Zap, Cpu, Sparkles, DollarSign, Clock, ArrowRight, Award } from 'lucide-react';

interface AdvantageSectionProps {
  onOpenCheckout: (planId?: string) => void;
}

export const AdvantageSection: React.FC<AdvantageSectionProps> = ({ onOpenCheckout }) => {
  const [activeTab, setActiveTab] = useState<'advantage' | 'markets' | 'pricing'>('advantage');

  return (
    <section id="advantage" className="py-20 bg-[#060911] text-slate-100 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>XHUVO QX ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-mono">
            WHY TRADERS CHOOSE <span className="text-purple-400">XHUVO QX</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how XHUVO QX INFINITY eliminates lag, repainting, and fake broker manipulation compared to traditional lagging indicators.
          </p>
        </div>

        {/* Tab Navigation (Advantage | Binary Expiries | Pricing Value) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 space-x-1 sm:space-x-2 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('advantage')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
                activeTab === 'advantage'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Advantage</span>
            </button>

            <button
              onClick={() => setActiveTab('markets')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
                activeTab === 'markets'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Binary Expiries &amp; Brokers</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${
                activeTab === 'pricing'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Pricing &amp; Savings</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Advantage Comparison */}
        {activeTab === 'advantage' && (
          <div className="max-w-5xl mx-auto bg-[#0b0616] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-purple-300 uppercase font-bold tracking-widest">
                BEYOND TRADITIONAL INDICATORS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-mono">
                TRADITIONAL VS XHUVO QX SUITE
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Traditional Indicators Box */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-red-500/30 space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
                  <X className="w-5 h-5 text-red-500" />
                  <h4 className="font-bold font-mono text-red-400 uppercase text-sm">
                    TRADITIONAL INDICATORS
                  </h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-400 font-mono">
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Delayed &amp; Lagging Signals</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Heavy Repainting Issues (Arrows disappear after loss)</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Requires Martingale (Double stake risks blowup)</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>No Audio Pre-Alert (Misses fast 1M binary candle entries)</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Cluttered Chart Visuals &amp; Confusion</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Manual TP &amp; SL Risk Management</span>
                  </li>
                </ul>
              </div>

              {/* XHUVO QX Suite Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
                  <Check className="w-5 h-5 text-purple-400" />
                  <h4 className="font-bold font-mono text-purple-300 uppercase text-sm">
                    XHUVO QX INFINITY SUITE
                  </h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-200 font-mono font-medium">
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span className="text-purple-300 font-bold">100% Non-Repaint Guarantee</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>5-10s Pre-Alert Audio &amp; Visual Sound Confirmation</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span className="text-fuchsia-300 font-bold">🔥 1st TIME: Non-MTG / Martingale Mode</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>AI Auto Settings Confluence (15+ Filters)</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>Built-in Money Management Calculator</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>Unlimited Theme Customizer (RGB, Neon, Violet, Gold)</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Binary Brokers & Expiries */}
        {activeTab === 'markets' && (
          <div className="max-w-5xl mx-auto bg-[#0b0616] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-purple-300 uppercase font-bold tracking-widest">
                BUILT FOR BINARY OPTIONS &amp; REAL MARKET BROKERS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-mono">
                SUPPORTED BROKERS &amp; EXPIRY TIMEFRAMES
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
              
              {/* Brokers Box */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="font-bold text-purple-300 uppercase border-b border-slate-800 pb-2">
                  SUPPORTED BINARY BROKERS
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span className="font-bold">Quotex Real Market</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span className="font-bold">Pocket Option</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span className="font-bold">IQ Option</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span className="font-bold">Olymp Trade</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2 col-span-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span className="font-bold">TradingView Free &amp; Pro Accounts</span>
                  </div>
                </div>
              </div>

              {/* Expiry Timeframes Box */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="font-bold text-purple-300 uppercase border-b border-slate-800 pb-2">
                  RECOMMENDED EXPIRIES &amp; MODES
                </h4>
                <div className="space-y-2 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span>1M Fast Real Market Binary Expiry</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">RECOMMENDED</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span>5M / 15M Reversal Expiry</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">SUPPORTED</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span>Non-MTG (1-Step Direct Win)</span>
                    <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold">FLAGSHIP</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span>Running Candle Mode (Smooth Execution)</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">ACTIVE</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Pricing & Value */}
        {activeTab === 'pricing' && (
          <div className="max-w-5xl mx-auto bg-[#0b0616] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-purple-300 uppercase font-bold tracking-widest">
                PAY ONCE. TRADE FOREVER.
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-mono">
                NO RECURRING MONTHLY SUBSCRIPTIONS
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/20 text-center space-y-4 max-w-xl mx-auto">
              <div className="text-3xl sm:text-4xl font-black text-purple-300 font-mono">
                LIFETIME VIP LICENSE
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                Stop paying $50-$100 every month for low win-rate signal groups. Purchase XHUVO QX once and get unlimited TradingView script authorization, future updates, and 24/7 direct owner support!
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => onOpenCheckout('xhuvoqx-infinity')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold font-mono text-xs shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
                >
                  BUY INFINITY FLAGSHIP ($400)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* How It Works (3 Simple Steps) */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-mono text-purple-300 uppercase font-bold tracking-widest">
              SIMPLE 3-STEP PROCESS
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white font-mono uppercase">
              HOW TO START TRADING IN 3 MINUTES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#0b0616] border border-purple-500/20 rounded-2xl p-6 relative space-y-4 shadow-xl">
              <div className="text-4xl font-black text-purple-400 font-mono">01</div>
              <h4 className="text-base font-bold text-white font-mono uppercase">
                GET ACCESS TO XHUVO QX
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose V5 ($100) or INFINITY ($400). Enter your TradingView username during bKash/USDT checkout. Script access is granted within 2-5 minutes!
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0b0616] border border-purple-500/20 rounded-2xl p-6 relative space-y-4 shadow-xl">
              <div className="text-4xl font-black text-purple-400 font-mono">02</div>
              <h4 className="text-base font-bold text-white font-mono uppercase">
                RECEIVE REAL-TIME PRE-ALERTS
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add XHUVO QX to your TradingView chart. Get 5-10 second audio pre-alerts and visual Buy/Sell arrow confirmations before the candle closes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0b0616] border border-purple-500/20 rounded-2xl p-6 relative space-y-4 shadow-xl">
              <div className="text-4xl font-black text-purple-400 font-mono">03</div>
              <h4 className="text-base font-bold text-white font-mono uppercase">
                TRADE ON QUOTEX WITH CONFIDENCE
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Execute 1-minute trades on Quotex or Pocket Option on candle open. Enjoy 95%+ win rate with non-repaint precision!
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
