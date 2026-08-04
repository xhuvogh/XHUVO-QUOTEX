import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Activity,
  Flame,
  ArrowRight,
  Send,
  Eye,
  Sliders,
  Gauge,
  Layers,
  Crosshair,
  Award,
  ShoppingCart
} from 'lucide-react';
import { getSiteSettings } from '../lib/settingsStore';

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
  onOpenTelegramModal: () => void;
}

// Typewriter Component for Bangladesh Headline
const TypingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isDeleting && displayedText.length < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 90);
    } else if (!isDeleting && displayedText.length === text.length) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, 45);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text]);

  return (
    <span className="font-mono-tech tracking-widest">
      {displayedText}
      <span className="inline-block w-2 h-4 ml-1 bg-red-500 animate-pulse font-extrabold" />
    </span>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToSection,
  onOpenTelegramModal,
}) => {
  const siteSettings = getSiteSettings();

  return (
    <section id="overview" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[250px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Headline & Subheaders */}
      <div className="flex flex-col items-center text-center space-y-5">
        <div className="space-y-3 max-w-5xl">
          {/* 3-Line Motion Graphics Kinetic Headline */}
          <h1 className="font-orbitron tracking-tight leading-snug uppercase max-w-4xl mx-auto flex flex-col items-center gap-2">
            {/* Line 1: HEY GUYS WHAT'S UP! */}
            <span className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-200 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)] animate-pulse">
              HEY GUYS WHAT'S UP!
            </span>

            {/* Line 2: MYSELF XHUVO */}
            <span className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wider scale-105 my-1">
              <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">MYSELF </span>
              <span className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,1)] animate-pulse">XHUVO</span>
            </span>

            {/* Line 3: Smaller size, white text with red XHUVO and green OFFICIAL */}
            <span className="text-base sm:text-xl md:text-2xl font-black tracking-wide text-white mt-1">
              & WELCOME BACK TO{' '}
              <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,1)] animate-pulse">XHUVO</span>{' '}
              QUOTEX{' '}
              <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,1)] font-black">OFFICIAL</span>
            </span>
          </h1>

          {/* Ultra High-Tech Motion Graphics Animated Badge for BANGLADESH Indicator with Off-White Glass Effect */}
          <div className="pt-3 min-h-[52px] flex items-center justify-center">
            <div className="relative group cursor-default">
              {/* Animated Rotating/Pulsing Outer Neon Aura */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-500 via-amber-300 via-emerald-400 to-cyan-400 opacity-80 blur-lg group-hover:opacity-100 transition duration-1000 animate-pulse" />
              
              {/* Off-White Glassmorphism Pill Container */}
              <div className="relative text-xs sm:text-base font-orbitron font-extrabold uppercase px-6 py-3 rounded-full bg-white/10 border border-white/40 shadow-[0_0_35px_rgba(255,255,255,0.25)] backdrop-blur-2xl flex items-center justify-center overflow-hidden text-white transition-transform duration-300 hover:scale-[1.02]">
                {/* Continuous Shimmer Light Glare Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-[shimmer_2.5s_infinite]" />

                <span className="relative z-10 text-white font-extrabold tracking-widest drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
                  <TypingText text="BEST BINARY OPTION INDICATOR IN BANGLADESH" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle Description */}
        <p className="max-w-3xl text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
          Engineered for extreme precision in 1M Binary (Quotex, Pocket Option, IQ Option) & TradingView. Features 100% Non-Repaint signal execution, Pre-Alerts, AI Confluence, and Non-MTG automated risk calculation.
        </p>

        {/* Hero CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 w-full max-w-3xl">
          {/* HOT TOPIC INFINITY Button */}
          <button
            onClick={() => onScrollToSection('infinity-flagship')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-orbitron font-extrabold text-xs sm:text-sm tracking-wider shadow-xl shadow-red-600/50 hover:shadow-red-600/70 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>HOT TOPIC INFINITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onScrollToSection('live-simulator')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 hover:bg-emerald-900/90 text-emerald-300 font-mono-tech font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 shadow-lg shadow-emerald-500/20"
          >
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>LIVE PERFORMANCE TEST</span>
          </button>

          {/* BUY INDICATOR Button -> Opens Payment Modal */}
          <button
            onClick={onOpenTelegramModal}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono-tech font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            <span>BUY INDICATOR</span>
          </button>

          {/* Contact Developer Button -> Direct Telegram link */}
          <a
            href="https://t.me/XQ_owner"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:bg-slate-800 text-cyan-300 font-mono-tech font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-cyan-400 shadow-lg"
          >
            <Send className="w-4 h-4 text-cyan-400" />
            <span>CONTACT DEVELOPER</span>
          </a>
        </div>

        {/* Quick Tech Specs Cards (Replacing basic emojis with tech symbols) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl pt-4">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm flex items-center gap-3 hover:border-cyan-500/50 transition-colors">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono-tech font-bold text-cyan-300">100% NON-REPAINT</div>
              <div className="text-[10px] text-slate-400">Confirmed Signals</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-sm flex items-center gap-3 hover:border-purple-500/50 transition-colors">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono-tech font-bold text-purple-300">PRE-ALERT SYSTEM</div>
              <div className="text-[10px] text-slate-400">Zero Execution Lag</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-sm flex items-center gap-3 hover:border-emerald-500/50 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono-tech font-bold text-emerald-300">95%+ WIN RATE</div>
              <div className="text-[10px] text-slate-400">Backtested Engine</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 backdrop-blur-sm flex items-center gap-3 hover:border-amber-500/50 transition-colors">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono-tech font-bold text-amber-300">NON-MTG MODE</div>
              <div className="text-[10px] text-slate-400">Direct Single Entry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
