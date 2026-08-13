import React, { useState } from 'react';
import { MOCK_LIVE_SIGNALS } from '../data/mockData';
import { LiveSignal } from '../types';
import { Radio, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, Volume2, VolumeX, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface LiveSignalsPanelProps {
  onOpenCheckout: (planId?: string) => void;
}

export const LiveSignalsPanel: React.FC<LiveSignalsPanelProps> = ({ onOpenCheckout }) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'Quotex OTC' | 'Forex Live' | 'Crypto'>('ALL');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const filteredSignals = activeCategory === 'ALL'
    ? MOCK_LIVE_SIGNALS
    : MOCK_LIVE_SIGNALS.filter(s => s.marketType === activeCategory);

  return (
    <section id="live-signals" className="py-16 bg-[#06040d] text-slate-100 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>REAL-TIME TELEGRAM & QUOTEX SCANNER</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Live Algorithmic Signals
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Automated high-confluence entry signals generated directly by XHUVOQX Algo V4 Pro.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-mono flex items-center space-x-2 hover:border-purple-500/50"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  <span>Audio Alerts On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span>Audio Muted</span>
                </>
              )}
            </button>

            <a
              href="https://t.me/+K8Kjxh16WjdlYTQ1"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-xs text-white shadow-lg shadow-purple-500/20 flex items-center space-x-2 hover:scale-[1.02] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>TELEGRAM CHANNEL</span>
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {['ALL', 'Quotex OTC', 'Forex Live', 'Crypto'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat} {cat === 'Quotex OTC' && '🔥'}
            </button>
          ))}
        </div>

        {/* Live Signal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map((signal) => {
            const isCall = signal.type.includes('CALL') || signal.type.includes('BUY');
            return (
              <div
                key={signal.id}
                className="group relative bg-[#0b0616] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Status Header */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-base text-white">{signal.asset}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {signal.timeframe}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      signal.status === 'ACTIVE'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {signal.status === 'ACTIVE' ? '🟢 LIVE NOW' : '✅ WIN'}
                  </span>
                </div>

                {/* Signal Direction Badge */}
                <div className="my-4 flex items-center justify-between">
                  <div
                    className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 font-black text-sm tracking-wider shadow-md ${
                      isCall
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    }`}
                  >
                    {isCall ? (
                      <ArrowUpRight className="w-5 h-5 text-purple-300" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-rose-400" />
                    )}
                    <span>{signal.type}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-mono">WIN PROBABILITY</div>
                    <div className="text-xl font-black text-purple-300 font-mono">
                      {signal.winProbability}%
                    </div>
                  </div>
                </div>

                {/* Signal Entry Metrics */}
                <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-purple-500/20 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Entry Price:</span>
                    <span className="text-white font-bold">{signal.entryPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Level:</span>
                    <span className="text-purple-300 font-bold">{signal.tpPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Signal Market:</span>
                    <span className="text-slate-300">{signal.marketType}</span>
                  </div>
                </div>

                {/* Indicator Triggers List */}
                <div className="space-y-1 mb-4">
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Indicator Triggers:</div>
                  <div className="flex flex-wrap gap-1">
                    {signal.indicatorTriggers.map((trig, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60">
                        {trig}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onOpenCheckout()}
                  className="w-full py-2 bg-slate-900 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:border-purple-500/50 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>RECEIVE TELEGRAM PUSH ALERTS</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">
              Want Instant Quotex &amp; Binary Signals directly on Telegram?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Get access to our automated server signals channel with 90%+ verified win accuracy and zero delays.
            </p>
          </div>
          <button
            onClick={() => onOpenCheckout()}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 font-bold text-xs text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all whitespace-nowrap"
          >
            GET VIP TELEGRAM ACCESS NOW
          </button>
        </div>
      </div>
    </section>
  );
};
