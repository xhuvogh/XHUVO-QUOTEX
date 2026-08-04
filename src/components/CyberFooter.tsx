import React from 'react';
import { Cpu, Send, ShieldCheck, Sparkles, Heart, ShoppingCart } from 'lucide-react';

interface CyberFooterProps {
  onOpenTelegramModal: () => void;
  onOpenAdminPortal?: () => void;
  onScrollToSection: (id: string) => void;
}

export const CyberFooter: React.FC<CyberFooterProps> = ({
  onOpenTelegramModal,
  onOpenAdminPortal,
  onScrollToSection,
}) => {
  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#02050c] text-slate-400 font-mono-tech text-xs pt-12 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Footer Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-purple-950/60 to-slate-950 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-cyan-500/10">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-orbitron font-extrabold text-white text-lg flex items-center justify-center md:justify-start gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span><span className="text-red-500 font-extrabold text-glow-red animate-pulse">XHUVO</span> QX OFFICIAL</span>
            </div>
            <p className="text-xs text-cyan-300 font-bold">
              <span className="text-red-500">XHUVO</span> QX INFINITY — BEAST INDICATOR SYSTEM
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
            <button
              onClick={onOpenTelegramModal}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-orbitron font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              BUY INDICATOR
            </button>
            <a
              href="https://t.me/XQ_owner"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 text-cyan-300 font-orbitron font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              CONTACT DEVELOPER
            </a>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4 border-t border-white/5">
          <div className="space-y-3">
            <h4 className="font-orbitron font-bold text-white text-sm"><span className="text-red-500">XHUVO</span> QX SUITE</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              100% Non-Repaint AI Confluence Trading Engine designed for high accuracy binary options and TradingView technical analysis.
            </p>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-white text-sm mb-3">INDICATOR EDITIONS</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => onScrollToSection('indicators')} className="hover:text-emerald-300 transition-colors">
                  <span className="text-red-500 font-bold">XHUVO</span> QX V5 Starter
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('infinity-ultimate')} className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-red-500 font-bold">XHUVO</span> QX INFINITY
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-white text-sm mb-3">SUPPORTED BROKERS</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• Quotex Broker</li>
              <li>• Pocket Option</li>
              <li>• IQ Option & Olymp Trade</li>
              <li>• Deriv / Binary.com</li>
              <li>• TradingView Scripts</li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-white text-sm mb-3">OFFICIAL CONTACT</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-2">
              <div className="text-[11px] text-slate-400">Telegram Developer Handle:</div>
              <a
                href="https://t.me/XQ_owner"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 font-bold hover:underline flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                Contact Developer
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-4 text-center sm:text-left">
          <p
            onDoubleClick={onOpenAdminPortal}
            title="XHUVO QX OFFICIAL 2026"
            className="cursor-default select-none hover:text-slate-400 transition-colors"
          >
            © 2026 XHUVO QX OFFICIAL. All rights reserved. Best Binary Option Indicator in Bangladesh.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Non-Repaint Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
