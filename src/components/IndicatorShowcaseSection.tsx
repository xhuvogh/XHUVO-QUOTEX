import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Flame,
  Activity,
  Sliders,
  Layers,
  Gauge,
  Timer,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Send,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  Compass,
  Palette,
  Award,
  Terminal,
  Crosshair,
  BarChart2,
  ShoppingCart
} from 'lucide-react';
import { getSiteSettings } from '../lib/settingsStore';

interface IndicatorShowcaseSectionProps {
  onOpenTelegramModal: () => void;
}

export const IndicatorShowcaseSection: React.FC<IndicatorShowcaseSectionProps> = ({
  onOpenTelegramModal,
}) => {
  const siteSettings = getSiteSettings();
  // State for the requested Blur / Hidden formula layer on Ultimate Infinity
  const [isInfinityBlurred, setIsInfinityBlurred] = useState(true);

  return (
    <section id="indicators" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Glass Effect & Red-White Two-Color Styling */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 p-6 sm:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-red-500/30 shadow-2xl shadow-red-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 pointer-events-none rounded-3xl" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 text-xs font-mono-tech font-bold shadow-lg shadow-red-500/20 backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="text-white">INDICATOR</span> <span className="text-red-500 font-black">SUITE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">OUR INDICATORS</span>{' '}
          <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)] animate-pulse">& FEATURES</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-mono-tech leading-relaxed">
          Each indicator features custom neon HUD visuals, 1M/5M Binary optimization, and dedicated smoke background themes.
        </p>
      </div>

      {/* Grid of 3 Indicators: V5 Starter, INFINITY Advanced, ULTIMATE Next Gen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
        {/* ==================== 1. XHUVO QX V5 (Starter) ==================== */}
        <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/30 via-emerald-950/20 to-slate-950/90 rounded-2xl" />

          <div className="relative h-full bg-[#04120f]/90 backdrop-blur-xl rounded-[15px] p-6 flex flex-col justify-between border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono-tech text-[10px] font-bold tracking-widest uppercase">
                  STARTER EDITION
                </span>
                <span className="text-xs font-mono-tech text-emerald-300">V5 ENGINE</span>
              </div>

              <h3 className="text-2xl font-orbitron font-extrabold text-white mb-2 flex items-center gap-2">
                <span className="text-red-500 text-glow-red animate-pulse">XHUVO</span> QX V5
              </h3>
              <p className="text-slate-400 text-xs mb-6 font-mono-tech">
                Standard 100% Non-Repaint engine optimized for 1M binary trading starters.
              </p>

              {/* Price */}
              <div className="mb-6 p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-orbitron font-extrabold text-emerald-400">{siteSettings.v5Price}</span>
                  <span className="text-xs text-slate-400 font-mono-tech ml-2">/ Lifetime</span>
                </div>
                <span className="text-[10px] font-mono-tech text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                  STARTER
                </span>
              </div>

              {/* Features list for V5 */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono-tech font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-emerald-500/20 pb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Core Features
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      100% Non Repaint Signal Engine
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Standard Pre-Alert Sound & Visuals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      AI Mode (Auto Selects Settings)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      1M Fast Binary Candle Mode
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono-tech font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-emerald-500/20 pb-1">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    Strategy & HUD
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      3 Strategy Modes Included
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      5 Advanced Signal Filters
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Standard Emerald HUD Layout
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTelegramModal}
              className="mt-8 w-full py-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              BUY V5 INDICATOR
            </button>
            <a
              href="https://www.tradingview.com/script/Mj8posvn-Xhuvo-Qx-V5/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-3 rounded-xl bg-transparent border border-emerald-500/30 text-emerald-400/80 hover:text-emerald-300 hover:border-emerald-500/60 hover:bg-emerald-500/10 font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              VIEW OFFICIAL SCRIPT
            </a>
          </div>
        </div>

        {/* ==================== 2. XHUVO QX INFINITY (Flagship - Main Importance) ==================== */}
        <div id="infinity-flagship" className="relative group rounded-2xl overflow-hidden p-[2px] transition-all duration-300 shadow-2xl shadow-red-500/50 flex flex-col justify-between lg:-translate-y-2">
          {/* Animated Laser Border & Glowing Red/Rose/Amber Smoke */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 animate-pulse rounded-2xl" />

          <div className="relative h-full bg-[#18040a]/95 backdrop-blur-2xl rounded-[14px] p-6 flex flex-col justify-between border border-red-500/60">
            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-md bg-gradient-to-r from-red-600/30 via-rose-600/30 to-amber-500/30 border border-red-400/50 text-amber-300 font-mono-tech text-[10px] font-extrabold tracking-widest uppercase flex items-center gap-1 shadow-md animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  HOT TOPIC (FLAGSHIP)
                </span>
                <span className="text-xs font-mono-tech font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                  95% ACCURACY
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white mb-2 flex items-center gap-2">
                <span className="text-red-500 text-glow-red animate-pulse">XHUVO</span> QX INFINITY
              </h3>

              <p className="text-slate-300 text-xs mb-6 font-mono-tech leading-relaxed">
                The apex binary indicator system built with NON-MTG mode, AI auto-settings, 15+ advanced confluence filters & money management.
              </p>

              {/* Price Banner matching V5 layout */}
              <div className="mb-6 p-3 rounded-xl bg-slate-950/80 border border-red-500/40 flex items-baseline justify-between shadow-lg">
                <div>
                  <span className="text-3xl font-orbitron font-extrabold text-amber-400 text-glow-gold">{siteSettings.infinityPrice}</span>
                  <span className="text-xs text-slate-400 font-mono-tech ml-2">/ Lifetime VIP</span>
                </div>
                <span className="text-[10px] font-mono-tech text-amber-300 bg-red-500/20 px-2 py-1 rounded border border-red-400/40 font-bold uppercase tracking-wider">
                  FLAGSHIP
                </span>
              </div>

              {/* All Requested Features for INFINITY with SVG symbols and clean single-line badges */}
              <div className="space-y-3">
                {/* 1. Overview */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-cyan-500/30">
                  <h4 className="text-[11px] font-mono-tech font-extrabold text-cyan-300 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b border-cyan-500/20 pb-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Overview
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-200 font-mono-tech">
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        100% Non Repaint Engine
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">100% NON-REPAINT</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        Pre-Alert Audio & Visual System
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">ACTIVE</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        AI Auto Settings Confluence
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">AI ENABLED</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        1M Fast Binary Candle Mode
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">1M BINARY</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        Average Performance Precision
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">95% ACCURACY</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        Extreme High Accuracy Rate
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">CONFIRMED</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        Money Management Calculator
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">BUILT-IN</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Setting & Inputs */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-purple-500/30">
                  <h4 className="text-[11px] font-mono-tech font-extrabold text-purple-300 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b border-purple-500/20 pb-1">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    Setting & Inputs
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-200 font-mono-tech">
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        Strategy Modes Included
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">10+ MODES</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        Advanced Confluence Filters
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">15+ FILTERS</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        AI Mode Auto Select
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">ACTIVE</span>
                    </li>
                    <li className="relative my-2 p-2.5 sm:p-3 rounded-xl bg-slate-900/90 border border-red-500/50 shadow-md text-white flex flex-col gap-1">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                          1st Time In Community
                        </span>
                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-wide">
                          MAIN FEATURE
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-black text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="truncate">Non Mtg / martingale Mode</span>
                      </div>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        Strict Confluence Filter
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">100% STRICT</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        RUNNING CANDLE MODE
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">SMOOTH</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <BarChart2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        Advance Volume / Delta Cluster
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">ACTIVE</span>
                    </li>
                    <li className="flex items-center justify-between gap-1.5 py-1">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-200 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        Proper Management System
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">ACTIVE</span>
                    </li>
                  </ul>
                </div>

                {/* 3. HuD & Looks */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-amber-500/30">
                  <h4 className="text-[11px] font-mono-tech font-extrabold text-amber-300 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b border-amber-500/20 pb-1">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    HuD & Aesthetics
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-200 font-mono-tech">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        Premium Indicator Visuals
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                        Premium PineScript Dashboard
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                        Dashboard Customization
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-cyan-400" />
                        Unlimited Themes (RGB, Neon, Violet, Gold)
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        Win Loss Background Effects
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                        Automated SNR Support & Resistance
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5 text-cyan-400" />
                        Active Candle Timer HUD
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTelegramModal}
              className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-rose-500 text-white font-orbitron font-black text-xs sm:text-sm tracking-wider shadow-xl shadow-red-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              BUY INFINITY FLAGSHIP
            </button>
            <a
              href="https://www.tradingview.com/script/WY8TSFrN-Xhuvo-Qx-Infinity/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-3 rounded-xl bg-transparent border border-red-500/30 text-red-400/80 hover:text-red-300 hover:border-red-500/60 hover:bg-red-500/10 font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              VIEW OFFICIAL SCRIPT
            </a>
          </div>
        </div>

        {/* ==================== 3. XHUVO QX ULTIMATE (NEXT GENERATION - PERMANENTLY BLURRED) ==================== */}
        <div id="infinity-ultimate" className="relative group rounded-2xl overflow-hidden p-[2px] transition-all duration-300 shadow-2xl shadow-purple-500/40 flex flex-col justify-between">
          {/* Permanent Glow Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-slate-700 to-purple-950 rounded-2xl opacity-70" />

          <div className="relative h-full bg-[#080410]/95 backdrop-blur-2xl rounded-[14px] p-6 flex flex-col justify-between border border-purple-500/30">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-purple-950 border border-purple-500/40 text-purple-300 font-mono-tech text-[10px] font-extrabold tracking-widest uppercase flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  PERMANENT SECRET
                </span>
                <span className="text-xs font-mono-tech font-bold text-amber-400">NEXT GEN</span>
              </div>

              {/* Title */}
              <div className="p-3 mb-4 rounded-xl bg-slate-950/90 border border-purple-500/30 text-center relative overflow-hidden">
                <div className="font-mono-tech font-extrabold text-sm text-purple-300 flex items-center justify-center gap-1 tracking-wider">
                  <span>🔒 <span className="text-red-500 font-black">XHUVO</span> QX ULTIMATE</span>
                </div>
              </div>

              {/* Permanently Blurred Box with Bengali/English Text requested */}
              <div className="relative rounded-xl overflow-hidden border border-purple-500/40 bg-slate-950/95 p-6 min-h-[420px] flex flex-col items-center justify-center text-center">
                {/* Blurred backdrop content simulating hidden code */}
                <div className="absolute inset-0 p-4 filter blur-xl opacity-20 select-none pointer-events-none font-mono-tech text-[10px] text-purple-400 space-y-2">
                  <p>/// NEXT_GEN_ALGORITHM_KEY = 0x9948271</p>
                  <p>/// NON_REPAINT_NEURAL_CONFLUENCE_V5</p>
                  <p>/// QUANTUM_SNR_AUTO_PROJECTION_ENGINE</p>
                  <p>/// PRIVATE_FORMULA_XHUVO_QX_OWNER</p>
                  <p>/// CONFIDENTIAL_STRATEGY_ARRAY_15_PLUS</p>
                </div>

                {/* Permanent Overlay Message with exact requested text */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-3.5 p-2">
                  <div className="p-3.5 rounded-full bg-purple-950/90 border border-amber-400/60 shadow-xl shadow-purple-500/40">
                    <Lock className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                  
                  <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white text-glow-cyan leading-snug">
                    THIS INDICATOR FOR NEXT GENERATION
                  </h3>

                  {/* Requested Bengali Text Badge */}
                  <div className="p-3 bg-purple-950/90 rounded-xl border border-amber-400/50 shadow-xl max-w-xs text-center space-y-1">
                    <p className="text-xs sm:text-sm font-extrabold text-amber-300 font-mono-tech leading-snug">
                      "এই সময় যদি এটা আনা হয় তাইলে পুরা জেনারেশনের মাথা নষ্ট হয়ে যাবে!"
                    </p>
                    <p className="text-[10px] text-purple-200/80 font-mono-tech uppercase tracking-wider font-semibold">
                      (IF RELEASED NOW, IT WILL BLOW THE ENTIRE GENERATION'S MIND!)
                    </p>
                  </div>

                  <div className="inline-block px-3 py-1 rounded bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono-tech text-[10px] font-extrabold uppercase tracking-widest">
                    PERMANENTLY BLURRED FORMULA
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Button */}
            <button
              onClick={onOpenTelegramModal}
              className="mt-6 w-full py-3.5 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 font-orbitron font-bold text-xs tracking-wider opacity-80 hover:opacity-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-purple-400" />
              INQUIRE NEXT GEN (CONTACT DEVELOPER)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
