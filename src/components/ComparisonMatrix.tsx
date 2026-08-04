import React from 'react';
import { Check, X, Sparkles, Send } from 'lucide-react';

interface ComparisonMatrixProps {
  onOpenTelegramModal: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onOpenTelegramModal }) => {
  const comparisonRows = [
    { feature: '100% Non Repaint Signal Engine', v5: true, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Pre-Alert Audio & Visual System', v5: true, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: '1M Fast Binary Candle Mode', v5: true, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Strategy Modes Included', v5: '3 Modes', infinity: '10+ Modes', ultimate: '🔒 SECRET' },
    { feature: 'Advanced Confluence Filters', v5: '5 Filters', infinity: '15+ Filters', ultimate: '🔒 SECRET' },
    { feature: 'AI Mode (Auto Selects Settings)', v5: true, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Non Mtg / Martingale Mode', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Strict Confluence Filter (Non-MTG Only)', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'RUNNING CANDLE MODE (Smooth Delivery)', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Advance Volume / Delta Cluster Analysis', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Built-in Money Management Calculator', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Automated SNR Lines (Support & Resistance)', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Active Candle Timer HUD', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'Unlimited Theme Customizer (RGB, Neon, Violet, Gold)', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
    { feature: 'VIP Direct Owner Access (@XQ_owner)', v5: false, infinity: true, ultimate: '🔒 BLURRED' },
  ];

  return (
    <section id="pricing" className="relative py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Glass Effect & Red-White Two-Color Styling */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 p-6 sm:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-red-500/30 shadow-2xl shadow-red-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 pointer-events-none rounded-3xl" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 text-xs font-mono-tech font-bold shadow-lg shadow-red-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="text-white">INDICATOR FEATURE</span> <span className="text-red-500 font-black">MATRIX</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">COMPARE</span>{' '}
          <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)] animate-pulse">VERSIONS & FEATURES</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-mono-tech leading-relaxed">
          Direct comparison between XHUVO QX V5 ($100 Starter) and the Flagship XHUVO QX INFINITY ($400 Edition).
        </p>
      </div>

      {/* Glassmorphism Container fitting perfectly inside page without horizontal scroll */}
      <div className="w-full rounded-2xl border border-red-500/30 bg-slate-950/70 backdrop-blur-2xl shadow-2xl shadow-red-500/10 p-2 sm:p-5 relative overflow-hidden">
        {/* Subtle Ambient Glow inside glass card */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full">
          <table className="w-full text-left font-mono-tech text-[10px] sm:text-xs table-fixed">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/80 text-slate-200">
                <th className="p-2 sm:p-3.5 font-bold text-slate-100 w-[38%] sm:w-[40%]">
                  <span className="text-xs sm:text-sm uppercase font-orbitron">FEATURE</span>
                </th>
                <th className="p-2 sm:p-3.5 text-center text-emerald-400 w-[20%] sm:w-[18%]">
                  <div className="font-orbitron font-bold text-[10px] sm:text-xs md:text-sm truncate">
                    <span className="text-red-500 font-extrabold">XHUVO</span> QX V5
                  </div>
                  <div className="text-[9px] sm:text-xs text-slate-400">$100</div>
                </th>
                <th className="p-2 sm:p-3.5 text-center text-cyan-400 bg-cyan-950/40 border-x border-cyan-500/30 w-[24%] sm:w-[24%]">
                  <div className="font-orbitron font-extrabold text-[10px] sm:text-xs md:text-sm text-glow-cyan flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400 hidden sm:inline" />
                    <span><span className="text-red-500 font-extrabold">XHUVO</span> INFINITY</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-amber-300 font-bold">$400 FLAGSHIP</div>
                </th>
                <th className="p-2 sm:p-3.5 text-center text-purple-400 bg-purple-950/30 w-[18%] sm:w-[18%]">
                  <div className="font-orbitron font-bold text-[9px] sm:text-xs text-purple-300 truncate">ULTIMATE</div>
                  <div className="text-[8px] sm:text-[10px] text-purple-400">BLURRED</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {comparisonRows.map((row, idx) => {
                const isNonMtg = row.feature.toLowerCase().includes('non mtg');
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isNonMtg
                        ? 'bg-red-950/40 hover:bg-red-900/50'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="p-2 sm:p-3 leading-tight text-slate-200 text-[10px] sm:text-xs font-medium">
                      {isNonMtg ? (
                        <div className="inline-flex items-center gap-1.5 font-bold text-red-200">
                          <span className="shrink-0 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 uppercase tracking-wider">
                            🔥 1st Time
                          </span>
                          <span className="font-extrabold">{row.feature}</span>
                        </div>
                      ) : (
                        row.feature
                      )}
                    </td>

                    {/* V5 column */}
                    <td className="p-2 sm:p-3 text-center">
                      {typeof row.v5 === 'boolean' ? (
                        row.v5 ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto stroke-[3]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-emerald-300 font-bold text-[9px] sm:text-xs">{row.v5}</span>
                      )}
                    </td>

                    {/* Infinity Flagship column */}
                    <td className={`p-2 sm:p-3 text-center border-x ${isNonMtg ? 'bg-red-900/50 border-red-700/60 font-black' : 'bg-cyan-950/20 border-cyan-500/20'}`}>
                      {typeof row.infinity === 'boolean' ? (
                        row.infinity ? (
                          <Check className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto stroke-[3] ${isNonMtg ? 'text-amber-300' : 'text-cyan-400 font-bold'}`} />
                        ) : (
                          <X className="w-3.5 h-3.5 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-cyan-300 font-extrabold text-[9px] sm:text-xs">{row.infinity}</span>
                      )}
                    </td>

                    {/* Ultimate Next Gen column (Permanently Blurred) */}
                    <td className="p-2 sm:p-3 text-center bg-purple-950/20">
                      <span className="text-purple-400/70 font-mono-tech text-[8px] sm:text-[10px] filter blur-[0.5px]">
                        {row.ultimate}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onOpenTelegramModal}
          className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-500 to-amber-500 text-white font-orbitron font-extrabold text-xs sm:text-sm shadow-xl shadow-purple-500/30 hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          GET VIP LICENSE (CONTACT DEVELOPER)
        </button>
      </div>
    </section>
  );
};

