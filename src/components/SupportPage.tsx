import React from 'react';
import { ArrowLeft, Send, HelpCircle, PhoneCall, Sparkles, ShoppingBag, ShieldCheck, Copy, CheckCircle2 } from 'lucide-react';
import { TutorialAndFaq } from './TutorialAndFaq';
import { AdvantageSection } from './AdvantageSection';
import { XhuvoLogo } from './XhuvoLogo';

interface SupportPageProps {
  currency: 'USD' | 'BDT';
  setCurrency: (c: 'USD' | 'BDT') => void;
  onOpenCheckout: (planId?: string) => void;
  onBackToStore: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({
  currency,
  setCurrency,
  onOpenCheckout,
  onBackToStore
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText('@XQ_owner');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#06040d] text-slate-100 font-sans pb-20 md:pb-12">
      {/* Top Standalone Header */}
      <header className="sticky top-0 z-50 bg-[#07040e]/95 backdrop-blur-md border-b border-purple-500/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Back to Store & Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onBackToStore}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono font-bold text-slate-200 transition-all flex items-center space-x-1.5 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">RETURN TO STORE</span>
              <span className="sm:hidden">STORE</span>
            </button>

            <div onClick={onBackToStore} className="cursor-pointer">
              <XhuvoLogo size="sm" showSubtitle={false} />
            </div>
          </div>

          {/* Title Badge */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>XHUVO QX SUPPORT & HELP DESK</span>
          </div>

          {/* Currency & Buy Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'BDT' : 'USD')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-purple-300 border border-slate-700/80"
            >
              {currency} ৳
            </button>

            <button
              onClick={() => onOpenCheckout('xhuvoqx-infinity')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-black text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-[1.02] transition-all flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-4 h-4 fill-current" />
              <span>BUY INDICATORS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner for Support Page */}
      <div className="bg-gradient-to-b from-[#0e071e] to-[#06040d] border-b border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
            <span>24/7 OFFICIAL DEVELOPER SUPPORT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Can We Assist You Today?
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Need help authorizing your TradingView username, setting up Quotex 1M charts, or verifying bKash / USDT payments? Contact developer <strong className="text-purple-300">@XQ_owner</strong> directly on Telegram or view setup tutorials below.
          </p>

          {/* Developer Telegram Badge Card */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Official Developer Telegram</span>
                  <span className="text-base font-black text-purple-300 font-mono">@XQ_owner</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyUsername}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{copied ? 'COPIED!' : 'Copy Username'}</span>
                </button>

                <a
                  href="https://t.me/XQ_owner"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:brightness-110 text-white text-xs font-mono font-black transition-all flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  <span>Chat @XQ_owner</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Support Sections */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Why Choose XHUVO QX Advantage Comparison */}
        <AdvantageSection onOpenCheckout={onOpenCheckout} />

        {/* Step-by-Step Setup Guide & FAQs */}
        <TutorialAndFaq />
      </main>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Ready to purchase XHUVO QX Flagship Indicators?</h3>
            <p className="text-xs text-slate-300">Proceed to our official payment webpage for bKash, Nagad, Rocket, or Binance Pay activation.</p>
          </div>
          <button
            onClick={() => onOpenCheckout('xhuvoqx-infinity')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-black text-xs shadow-lg hover:scale-[1.02] transition-all whitespace-nowrap"
          >
            PROCEED TO PAYMENT GATEWAY
          </button>
        </div>
      </div>
    </div>
  );
};
