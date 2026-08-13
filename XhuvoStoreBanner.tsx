import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Download, Zap, Shield, Sparkles } from 'lucide-react';

interface XhuvoStoreBannerProps {
  onOpenCheckout?: (planId?: string) => void;
  className?: string;
}

export const XhuvoStoreBanner: React.FC<XhuvoStoreBannerProps> = ({
  onOpenCheckout,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleBannerClick = () => {
    if (onOpenCheckout) {
      onOpenCheckout('xhuvoqx-infinity');
    } else {
      const pricingEl = document.getElementById('pricing');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopyStoreLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('https://t.me/+K8Kjxh16WjdlYTQ1');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group max-w-5xl mx-auto rounded-3xl overflow-hidden border-2 border-red-500/40 hover:border-red-500/80 shadow-[0_0_40px_rgba(239,68,68,0.25)] hover:shadow-[0_0_60px_rgba(239,68,68,0.5)] transition-all duration-300 ${className}`}>
      
      {/* Clickable Banner Image Container */}
      <div 
        onClick={handleBannerClick}
        className="cursor-pointer relative bg-[#090b10] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 select-none"
      >
        {/* Left Side: XHUVO QX STORE OFFICIAL Text Branding */}
        <div className="z-10 text-left space-y-4 max-w-xl">
          
          {/* Store Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span className="font-bold uppercase tracking-wider">OFFICIAL STORE BANNER</span>
          </div>

          {/* Large Title */}
          <h2 className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight uppercase leading-none">
            <span className="text-red-500 font-black drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">XHUVO</span> QX <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300">STORE</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
            Click to enter the official <strong className="text-red-500 font-black">XHUVO</strong> <strong className="text-white font-mono font-bold">QX</strong> TradingView indicator store. 100% Non-repaint scripts, instant authorization, and 24/7 developer support.
          </p>

          {/* Action CTA Badge */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-mono font-bold text-xs inline-flex items-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Zap className="w-4 h-4 fill-current" />
              <span>BUY INDICATORS NOW</span>
            </span>

            <button
              onClick={handleCopyStoreLink}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700 inline-flex items-center space-x-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-purple-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Store Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Trading Candlestick Graphic Simulation */}
        <div className="relative w-full md:w-80 h-56 rounded-2xl bg-[#06040d] border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Chart Header Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono border-b border-purple-500/20 pb-2">
            <span className="text-purple-300 font-bold"><span className="text-red-500 font-black">XHUVO</span> QX / LIVE FOREX</span>
            <span className="text-slate-400">53817.95</span>
          </div>

          {/* Simulated Candlesticks */}
          <div className="flex items-end justify-between h-32 px-2 pt-2 relative">
            <div className="absolute top-2 left-4 text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40">
              ⬆ BUY SIGNAL (NON-REPAINT)
            </div>

            {/* Candle 1 Purple */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-purple-500"></div>
              <div className="w-3 h-12 bg-purple-500 rounded-sm"></div>
              <div className="w-0.5 h-3 bg-purple-500"></div>
            </div>

            {/* Candle 2 Red */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-2 bg-rose-500"></div>
              <div className="w-3 h-8 bg-rose-500 rounded-sm"></div>
              <div className="w-0.5 h-4 bg-rose-500"></div>
            </div>

            {/* Candle 3 Purple Big */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-3 bg-purple-500"></div>
              <div className="w-3.5 h-20 bg-purple-500 rounded-sm shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
              <div className="w-0.5 h-2 bg-purple-500"></div>
            </div>

            {/* Candle 4 Purple */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-5 bg-purple-500"></div>
              <div className="w-3.5 h-16 bg-purple-500 rounded-sm shadow-[0_0_12px_rgba(168,85,247,0.9)]"></div>
              <div className="w-0.5 h-2 bg-purple-500"></div>
            </div>
          </div>

          {/* Price Ribbon */}
          <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-purple-500/20">
            <span className="text-slate-500">ACCURACY: 95.0%</span>
            <span className="text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded">
              DIRECT WIN 46834.45
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
