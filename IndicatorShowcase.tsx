import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Lock, Sparkles, ExternalLink, Play, Zap, MessageCircle, Volume2, Award, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface IndicatorShowcaseProps {
  onOpenCheckout: (planId?: string) => void;
}

export const IndicatorShowcase: React.FC<IndicatorShowcaseProps> = ({ onOpenCheckout }) => {
  const store = useStore();
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  return (
    <section id="indicators" className="py-20 bg-[#060911] text-slate-100 border-b border-slate-800 relative overflow-hidden gpu-accelerated">
      {/* Ambient Background Aura Orbs */}
      <div className="ambient-orb-purple top-10 -right-20" />
      <div className="ambient-orb-cyan bottom-20 -left-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono animate-pulse-badge">
            <Zap className="w-3.5 h-3.5" />
            <span>INDICATOR SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-mono">
            OUR INDICATORS <span className="gradient-text-purple-pink">&amp; FEATURES</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Each indicator features custom neon HUD visuals, 1M/5M Binary optimization, and dedicated smoke background themes.
          </p>
        </motion.div>

        {/* Indicator Cards List (V5, INFINITY, ULTIMATE) */}
        <div className="space-y-12 max-w-5xl mx-auto gpu-accelerated">
          
          {/* 1. XHUVO QX V5 (Starter Edition) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bento-card rounded-[24px] p-6 sm:p-8 relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold liquid-glass-pill text-purple-300 uppercase">
                STARTER EDITION
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">V5 ENGINE</span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-black gradient-text-cyan-purple tracking-tight font-mono">
                XHUVO QX V5
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 font-sans">
                Standard 100% Non-Repaint engine optimized for 1M binary trading starters on Quotex and TradingView.
              </p>
            </div>

            {store.fridayDiscountEnabled ? (
              <div className="flex flex-col mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs text-slate-500 line-through font-mono font-bold">$100</span>
                  <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-[10px] text-red-400 font-bold font-mono uppercase tracking-wider animate-pulse">
                    🔥 FRIDAY SPECIAL 60% OFF
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-red-400 font-mono drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">$40</span>
                  <span className="text-xs text-slate-400 font-mono">/ Lifetime STARTER</span>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline space-x-2 mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-black text-purple-300 font-mono">$100</span>
                <span className="text-xs text-slate-400 font-mono">/ Lifetime STARTER</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-8">
              <div>
                <h4 className="font-bold text-purple-300 font-mono mb-3 uppercase flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span>CORE FEATURES</span>
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>100% Non Repaint Signal Engine</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>Standard Pre-Alert Sound &amp; Visuals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>AI Mode (Auto Selects Settings)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>1M Fast Binary Candle Mode</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-purple-300 font-mono mb-3 uppercase flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>STRATEGY &amp; HUD</span>
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>3 Strategy Modes Included</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>5 Advanced Signal Filters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>Standard Violet HUD Layout</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => onOpenCheckout('xhuvoqx-v5')}
                className="flex-1 py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.35)] btn-neon-glow cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>{store.fridayDiscountEnabled ? 'BUY V5 INDICATOR ($40) 🔥' : 'BUY V5 INDICATOR ($100)'}</span>
              </button>
              <a
                href="https://www.tradingview.com/script/Mj8posvn-Xhuvo-Qx-V5/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-purple-400" />
                <span>VIEW OFFICIAL SCRIPT</span>
              </a>
            </div>
          </motion.div>

          {/* 2. XHUVO QX INFINITY (HOT TOPIC FLAGSHIP - 95% ACCURACY) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="infinity-red-motion-glass rounded-[24px] p-6 sm:p-10 relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-black bg-gradient-to-r from-red-600 to-rose-600 text-white uppercase tracking-wider animate-pulse-badge border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                🔥 HOT TOPIC (FLAGSHIP)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold liquid-glass-pill text-red-400 border-red-500/30">
                95% ACCURACY
              </span>
            </div>

            <div className="mb-6 relative z-10">
              <h3 className="text-3xl sm:text-4xl font-black gradient-text-beast tracking-tight font-mono">
                XHUVO QX INFINITY
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2 font-sans">
                The apex binary indicator system built with non-MTG mode, AI auto-settings, 15+ advanced confluence filters &amp; money management.
              </p>
            </div>

            {store.fridayDiscountEnabled ? (
              <div className="flex flex-col mb-6 pb-6 border-b border-slate-800/80 relative z-10">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-slate-500 line-through font-mono font-bold">$400</span>
                  <span className="px-2.5 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-[10px] text-red-400 font-bold font-mono uppercase tracking-wider animate-pulse">
                    🔥 FRIDAY SPECIAL 80% OFF
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black text-red-500 font-mono drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">$80</span>
                  <span className="text-xs text-slate-400 font-mono">/ Lifetime VIP FLAGSHIP</span>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline space-x-2 mb-6 pb-6 border-b border-slate-800/80 relative z-10">
                <span className="text-5xl font-black text-red-400 font-mono drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">$400</span>
                <span className="text-xs text-slate-400 font-mono">/ Lifetime VIP FLAGSHIP</span>
              </div>
            )}

            {/* Overview Badges */}
            <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-red-500/30 space-y-2 text-xs relative z-10">
              <h4 className="font-bold font-mono text-red-400 uppercase mb-3">OVERVIEW</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200">
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-900 min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">100% Non Repaint Engine</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30 flex-shrink-0 whitespace-nowrap">100% NON-REPAINT</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-900 min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">Pre-Alert Audio &amp; Visual System</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30 flex-shrink-0 whitespace-nowrap">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-900 min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">AI Auto Settings Confluence</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30 flex-shrink-0 whitespace-nowrap">AI ENABLED</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-900 min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">1M Fast Binary Candle Mode</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30 flex-shrink-0 whitespace-nowrap">1M BINARY</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-900 min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">Average Performance Precision</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/30 text-red-200 font-bold border border-red-500/40 flex-shrink-0 whitespace-nowrap">95% ACCURACY</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-900 min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">Money Management Calculator</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30 flex-shrink-0 whitespace-nowrap">BUILT-IN</span>
                </div>
              </div>
            </div>

            {/* Setting & Inputs */}
            <div className="mb-8 space-y-3 text-xs relative z-10">
              <h4 className="font-bold font-mono text-red-400 uppercase">SETTING &amp; INPUTS</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-between min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">Strategy Modes Included</span>
                  <span className="text-[10px] font-mono font-bold text-red-300 bg-red-500/20 px-2 py-0.5 rounded border border-red-500/30 flex-shrink-0 whitespace-nowrap">10+ MODES</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-between min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">Advanced Confluence Filters</span>
                  <span className="text-[10px] font-mono font-bold text-red-300 bg-red-500/20 px-2 py-0.5 rounded border border-red-500/30 flex-shrink-0 whitespace-nowrap">15+ FILTERS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:col-span-2 min-w-0">
                  <span className="font-bold text-red-200 text-[11px] sm:text-xs">🔥 1st TIME IN COMMUNITY: Non Mtg / martingale Mode</span>
                  <span className="text-[10px] font-mono font-bold text-red-300 uppercase bg-red-500/20 px-2 py-0.5 rounded border border-red-500/30 flex-shrink-0 whitespace-nowrap">MAIN FEATURE</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-between min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">Strict Confluence Filter</span>
                  <span className="text-[10px] font-mono font-bold text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 flex-shrink-0 whitespace-nowrap">100% STRICT</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-between min-w-0">
                  <span className="truncate mr-2 font-mono text-[11px]">Running Candle Mode</span>
                  <span className="text-[10px] font-mono font-bold text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 flex-shrink-0 whitespace-nowrap">SMOOTH</span>
                </div>
              </div>
            </div>

            {/* HUD & Aesthetics */}
            <div className="mb-8 space-y-2 text-xs relative z-10">
              <h4 className="font-bold font-mono text-red-400 uppercase mb-2">HUD &amp; AESTHETICS</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-red-400" />
                  <span>Premium Indicator Visuals &amp; PineScript Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-red-400" />
                  <span>Unlimited Themes (RGB, Neon, Violet, Gold)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-red-400" />
                  <span>Automated SNR Lines (Support &amp; Resistance)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-red-400" />
                  <span>Active Candle Timer HUD &amp; Volume Delta Cluster</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/80 relative z-10">
              <button
                onClick={() => onOpenCheckout('xhuvoqx-infinity')}
                className="flex-1 py-4 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-[0_0_35px_rgba(239,68,68,0.7)] hover:from-red-500 hover:to-rose-500 hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer font-mono"
              >
                <Zap className="w-4 h-4" />
                <span>{store.fridayDiscountEnabled ? 'BUY INFINITY FLAGSHIP ($80) 🔥' : 'BUY INFINITY FLAGSHIP ($400)'}</span>
              </button>
              <a
                href="https://www.tradingview.com/script/WY8TSFrN-Xhuvo-Qx-Infinity/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 rounded-xl font-bold text-xs bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-red-400" />
                <span>VIEW OFFICIAL SCRIPT</span>
              </a>
            </div>
          </motion.div>

          {/* 3. XHUVO QX ULTIMATE (PERMANENT SECRET / NEXT GEN) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bento-card rounded-[24px] p-6 sm:p-8 relative text-center space-y-6"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                🔒 PERMANENT SECRET
              </span>
              <span className="text-xs font-mono font-bold text-purple-400">NEXT GEN</span>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/90 border border-slate-800/80 max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-purple-300 font-mono tracking-wide uppercase">
                THIS INDICATOR FOR NEXT GENERATION
              </h3>
              <p className="text-sm text-amber-300 font-semibold italic bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 font-sans">
                "এই সময় যদি এটা আনা হয় তাহলে পুরা জেনারেশনের মাথা নষ্ট হয়ে যাবে!" <br />
                <span className="text-xs text-slate-400 font-mono font-normal">
                  (IF RELEASED NOW, IT WILL BLOW THE ENTIRE GENERATION'S MIND!)
                </span>
              </p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 text-xs font-mono">
                PERMANENTLY BLURRED FORMULA
              </div>
            </div>

            <a
              href="https://t.me/XQ_owner"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 font-mono text-xs font-bold transition-all shadow-lg cursor-pointer hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>INQUIRE NEXT GEN (CONTACT DEVELOPER @XQ_owner)</span>
            </a>
          </motion.div>

        </div>


        {/* Live Indicator Walkthrough Video Box */}
        <div className="mt-20 max-w-5xl mx-auto bg-[#0b0616] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 gpu-accelerated">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Play className="w-3.5 h-3.5 text-purple-400" />
              <span>LIVE INDICATOR DEMO &amp; VIDEO WALKTHROUGH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              SEE <span className="text-red-500">XHUVO</span> QX INFINITY IN ACTION
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Watch real-time non-repaint signal entries, pre-alerts audio confirmations, and 1M Quotex candle executions in action.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Phone Frame Emulator containing YouTube Shorts (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-4">
              <div className="relative w-full max-w-[270px] aspect-[9/16] rounded-[36px] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-purple-500/5 overflow-hidden ring-1 ring-purple-500/20">
                {/* Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>
                
                {/* Video Container */}
                <div className="w-full h-full rounded-[28px] overflow-hidden relative bg-slate-900 flex items-center justify-center group">
                  {isPlayingDemo ? (
                    <iframe
                      className="w-full h-full object-cover z-10"
                      src="https://www.youtube-nocookie.com/embed/FIJS66YHj8Q?autoplay=1&mute=1&loop=1&playlist=FIJS66YHj8Q&modestbranding=1&rel=0&playsinline=1"
                      title="XHUVO QX Video Tutorial Walkthrough"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 cursor-pointer" onClick={() => setIsPlayingDemo(true)}>
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-[#090514]/90 backdrop-blur-sm z-0" />
                      <div className="relative z-10 space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-all duration-300">
                          <Play className="w-7 h-7 fill-white ml-1" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold text-red-400 block uppercase tracking-wider">Tutorial Shorts</span>
                          <span className="text-xs font-mono text-slate-300 block mt-1">Click to play video tutorial on how to follow signals</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct YouTube App/Tab link for foolproof compatibility */}
              <a 
                href="https://youtube.com/shorts/FIJS66YHj8Q?si=5yTj2Ysp8UXZSf0F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold text-red-500 hover:text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 hover:scale-105 active:scale-95 transition-all cursor-pointer font-mono uppercase tracking-wide"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>ওপেন ইন ইউটিউব (Open in YouTube)</span>
              </a>
            </div>

            {/* Signal Guide Instruction Matrix (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-5">
              <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide border-b border-purple-500/15 pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>HOW TO FOLLOW SIGNALS PERFECTLY</span>
              </h4>
              
              <div className="space-y-3.5 font-mono text-xs">
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-purple-500/20 transition-all flex items-start space-x-3.5 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm flex items-center justify-center group-hover:scale-105 transition-all">
                    1
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-white text-[12px] flex items-center gap-1.5 uppercase tracking-wide">
                      <Zap className="w-4 h-4 text-red-400" />
                      <span>Prepare 5-10 Seconds Before Candle Close</span>
                    </h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                      Keep your eyes on the active candle <strong>5 to 10 seconds before</strong> it closes. This provides you with plenty of preparation time to set your trade direction.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-purple-500/20 transition-all flex items-start space-x-3.5 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-sm flex items-center justify-center group-hover:scale-105 transition-all">
                    2
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-white text-[12px] flex items-center gap-1.5 uppercase tracking-wide">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span>Confirm Non-Repaint Arrow at Candle Close</span>
                    </h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                      Wait for the active candle to hit <strong>00:00 (Candle Close)</strong>. If the BUY/SELL arrow is printed on the closed candle, it is locked 100% and will never repaint.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-purple-500/20 transition-all flex items-start space-x-3.5 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm flex items-center justify-center group-hover:scale-105 transition-all">
                    3
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-white text-[12px] flex items-center gap-1.5 uppercase tracking-wide">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>1-Minute Trade Execution (No MTG)</span>
                    </h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                      Execute a direct 1-Minute CALL or PUT option immediately on Quotex or Pocket Option. Zero Martingale (No MTG) is required for high accuracy wins.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono pt-6 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center space-x-2 text-slate-300">
              <Check className="w-4 h-4 text-purple-400" />
              <span>Non-Repaint Confirmation at Candle Close</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center space-x-2 text-slate-300">
              <Check className="w-4 h-4 text-purple-400" />
              <span>Real-Time Signal Confirmation</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center space-x-2 text-slate-300">
              <Check className="w-4 h-4 text-purple-400" />
              <span>1M Quotex / Pocket Option Fast Entry</span>
            </div>
          </div>
        </div>

        {/* INDICATOR FEATURE MATRIX (Comparison Table) */}
        <div className="mt-20 max-w-5xl mx-auto bg-[#0b0616] border border-purple-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>INDICATOR FEATURE MATRIX</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              COMPARE VERSIONS &amp; FEATURES
            </h3>
            <p className="text-xs text-slate-400">
              Direct comparison between XHUVO QX V5 ($100 Starter) and the Flagship XHUVO QX INFINITY ($400 Edition).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase">
                  <th className="py-3 px-4 font-bold">FEATURE</th>
                  <th className="py-3 px-4 font-bold text-center text-red-400">XHUVO QX V5 <br /><span className="text-[10px] text-slate-500">$100</span></th>
                  <th className="py-3 px-4 font-bold text-center text-purple-300">XHUVO QX INFINITY <br /><span className="text-[10px] text-amber-400">$400 FLAGSHIP</span></th>
                  <th className="py-3 px-4 font-bold text-center text-purple-400">ULTIMATE <br /><span className="text-[10px] text-purple-500">SECRET</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr>
                  <td className="py-3 px-4 font-bold">100% Non Repaint Signal Engine</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Pre-Alert Audio &amp; Visual System</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">1M Fast Binary Candle Mode</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Strategy Modes Included</td>
                  <td className="py-3 px-4 text-center text-sky-400 font-bold">3 Modes</td>
                  <td className="py-3 px-4 text-center text-purple-300 font-bold">10+ Modes</td>
                  <td className="py-3 px-4 text-center text-purple-400">🔒 Secret</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Advanced Confluence Filters</td>
                  <td className="py-3 px-4 text-center text-sky-400 font-bold">5 Filters</td>
                  <td className="py-3 px-4 text-center text-purple-300 font-bold">15+ Filters</td>
                  <td className="py-3 px-4 text-center text-purple-400">🔒 Secret</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">AI Mode (Auto Selects Settings)</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr className="bg-purple-500/10">
                  <td className="py-3 px-4 font-bold text-purple-300">🔥 1ST TIME: Non Mtg / Martingale Mode</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Strict Confluence Filter (Non-MTG Only)</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">RUNNING CANDLE MODE (Smooth Delivery)</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Advance Volume / Delta Cluster Analysis</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Built-in Money Management Calculator</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Automated SNR Lines (Support &amp; Resistance)</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Active Candle Timer HUD</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Unlimited Theme Customizer (RGB, Neon, Violet, Gold)</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">VIP Direct Owner Access (@XQ_owner)</td>
                  <td className="py-3 px-4 text-center text-red-400">✕</td>
                  <td className="py-3 px-4 text-center text-purple-300 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-slate-600">🔒 Blurred</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://t.me/XQ_owner"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-mono font-bold text-xs shadow-lg hover:scale-[1.02] transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>GET VIP LICENSE (CONTACT DEVELOPER @XQ_owner)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
