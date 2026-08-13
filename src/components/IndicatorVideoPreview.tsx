import React, { useState } from 'react';
import { Play, Sparkles, ExternalLink, Activity } from 'lucide-react';
import { CustomChartWidget } from './CustomChartWidget';

interface IndicatorVideoPreviewProps {
  onOpenCheckout?: (planId?: string) => void;
  className?: string;
}

export const IndicatorVideoPreview: React.FC<IndicatorVideoPreviewProps> = ({
  onOpenCheckout,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative max-w-5xl mx-auto rounded-3xl bg-[#0b0616] border border-purple-500/40 p-4 sm:p-8 shadow-xl ${className}`}>
      
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Play className="w-3.5 h-3.5 fill-current text-purple-400" />
            <span>XHUVO QUOTEX LIVE ACTION DEMO</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white font-mono mt-1 uppercase tracking-tight">
            SEE XHUVO QX INFINITY IN ACTION
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            Watch real-time non-repaint signal entries, pre-alerts
          </p>
        </div>
      </div>

      {/* LIVE MARKET & INDICATOR PREVIEW SECTION */}
      <div className="mt-6">
        
        {/* Full-width TradingView Widget replacing the video */}
        <div className="w-full relative mb-8">
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-1.5 bg-slate-900/90 border border-purple-500/40 rounded-lg shadow-lg">
             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
             <span className="text-[10px] text-purple-200 font-mono font-bold tracking-wider uppercase">Live Market & Indicator Preview</span>
          </div>
          <CustomChartWidget />
        </div>

        {/* Tutorial Details & Quick Guide */}
        <div className="w-full space-y-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
            <span className="text-purple-300 font-bold block uppercase tracking-wider text-sm">
              ⚡ LIVE INDICATOR PREVIEW ENVIRONMENT
            </span>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Explore the live real-time price action with our integrated TradingView charts. The <strong>XHUVO QX INFINITY</strong> indicator overlays will execute instantly with 100% non-repaint BUY/SELL signals on TradingView.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">1</span>
              <div>
                <strong className="text-white block font-sans">Listen for 5-10s Pre-Alert Audio:</strong>
                <span className="text-slate-400 text-[11px] font-sans">Buzzer rings before candle close so you are ready at 00:01s.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">2</span>
              <div>
                <strong className="text-white block font-sans">Confirm Non-Repaint Arrow:</strong>
                <span className="text-slate-400 text-[11px] font-sans">Arrow prints firmly on candle close and never disappears.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">3</span>
              <div>
                <strong className="text-white block font-sans">1M Direct Non-MTG Execution:</strong>
                <span className="text-slate-400 text-[11px] font-sans">Enter 1M CALL/PUT trade on Quotex for a direct 1-step win.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {onOpenCheckout && (
              <button
                onClick={() => onOpenCheckout('xhuvoqx-infinity')}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm flex items-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.02] transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>GET XHUVO QX INFINITY SCRIPT NOW</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
