import React, { useState } from 'react';
import { Zap, Send, ShieldAlert, ShieldCheck, ExternalLink, MessageCircle, Lock } from 'lucide-react';
import { XhuvoLogo } from './XhuvoLogo';

interface FooterProps {
  onOpenCheckout?: (planId?: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCheckout, onOpenAdmin }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleCopyrightClick = () => {
    if (!onOpenAdmin) return;
    const nextCount = clickCount + 1;
    if (nextCount >= 7) {
      onOpenAdmin();
      setClickCount(0);
    } else {
      setClickCount(nextCount);
    }
  };
  return (
    <footer className="bg-[#030206] text-slate-400 text-xs border-t border-purple-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner CTA Box */}
        <div className="bg-gradient-to-r from-slate-900 via-[#100720] to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl flex flex-col items-center">
          <XhuvoLogo size="lg" showSubtitle={true} clickable={true} />
          
          <p className="text-xs font-mono text-purple-300 font-bold uppercase tracking-widest pt-2">
            <span className="text-red-500 font-black drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">XHUVO</span> QX INFINITY - BEAST INDICATOR SYSTEM
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenCheckout ? onOpenCheckout('xhuvoqx-infinity') : null}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold font-mono text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
            >
              🛒 BUY INDICATOR
            </button>
            <a
              href="https://t.me/XQ_owner"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/40 text-purple-200 font-bold font-mono text-xs shadow-lg transition-all flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5 text-purple-300" />
              <span>✈️ CONTACT DEVELOPER (@XQ_owner)</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-black font-mono text-base tracking-wider uppercase">
              <span className="text-red-500 font-black">XHUVO</span> QX SUITE
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              100% Non-Repaint AI Confluence Trading Engine designed for high accuracy binary options and TradingView technical analysis.
            </p>
            
            <div className="space-y-1 font-mono text-xs pt-2">
              <span className="text-slate-500 uppercase block font-bold">INDICATOR EDITIONS</span>
              <div className="flex space-x-4 text-purple-300 font-bold">
                <span>• <span className="text-red-500 font-bold">XHUVO</span> QX V5 Starter</span>
                <span>• <span className="text-red-500 font-bold">XHUVO</span> QX INFINITY</span>
              </div>
            </div>
          </div>

          {/* Supported Brokers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-mono text-xs uppercase tracking-wider">
              SUPPORTED BROKERS
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>• Quotex Broker</li>
              <li>• Pocket Option</li>
              <li>• IQ Option &amp; Olymp Trade</li>
              <li>• Deriv / Binary.com</li>
              <li>• TradingView Scripts</li>
            </ul>
          </div>

          {/* Official Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-mono text-xs uppercase tracking-wider">
              OFFICIAL CONTACT
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <p className="text-slate-400">Telegram Developer Handle:</p>
              <a
                href="https://t.me/XQ_owner"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold hover:bg-purple-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Developer (@XQ_owner)</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center space-x-1.5 text-amber-400 font-bold font-mono">
            <ShieldAlert className="w-4 h-4" />
            <span>FINANCIAL &amp; TRADING RISK DISCLAIMER:</span>
          </div>
          <p className="leading-relaxed">
            Trading foreign exchange, binary options, Quotex real market, and cryptocurrency carries high financial risk and may not be suitable for all investors. Past performance backtests or signal accuracy figures do not guarantee future returns. Always trade responsibly.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
          <div 
            onClick={handleCopyrightClick}
            className="cursor-default select-none active:opacity-80 transition-opacity"
            title="© Copyright Notice"
          >
            © {new Date().getFullYear()} <span className="text-red-500 font-black">XHUVO</span> QX OFFICIAL. All Rights Reserved. Binary Option Indicator in Bangladesh.
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-purple-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Non-Repaint Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
