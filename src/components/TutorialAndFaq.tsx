import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, Play, CheckCircle2, Shield, Radio, Tv } from 'lucide-react';

export const TutorialAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'tv' | 'quotex'>('tv');

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#06040d] text-slate-100 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>SETUP GUIDE & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How to Get Started & FAQs
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about setting up XHUVOQX indicators on TradingView & receiving Telegram signals for Quotex.
          </p>
        </div>

        {/* Step by Step Setup Tutorial Box */}
        <div className="bg-[#0b0616] border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Tv className="w-5 h-5 text-purple-400" />
              <span>XHUVOQX 3-Step Setup Guide</span>
            </h3>

            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('tv')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeTab === 'tv'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                TradingView Setup
              </button>
              <button
                onClick={() => setActiveTab('quotex')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeTab === 'quotex'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                Quotex Signal Setup
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {activeTab === 'tv' ? (
              <>
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative">
                  <span className="text-2xl font-black text-purple-400 font-mono block mb-2">01</span>
                  <h4 className="font-bold text-white text-sm mb-1">Get Indicator License</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Choose your plan and message @XQ_owner on Telegram with your payment screenshot & TradingView username.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative">
                  <span className="text-2xl font-black text-purple-400 font-mono block mb-2">02</span>
                  <h4 className="font-bold text-white text-sm mb-1">Grant Script Permission</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Our developer adds your username to XHUVO QX INFINITY invite-only script repository within 2-5 minutes.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative">
                  <span className="text-2xl font-black text-purple-400 font-mono block mb-2">03</span>
                  <h4 className="font-bold text-white text-sm mb-1">Add to Chart & Trade</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Open TradingView -&gt; Indicators -&gt; Invite-Only Scripts -&gt; Click XHUVO QX INFINITY and start taking high win-rate signals!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative">
                  <span className="text-2xl font-black text-purple-400 font-mono block mb-2">01</span>
                  <h4 className="font-bold text-white text-sm mb-1">Official Telegram Community</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Receive instant TradingView script authorization and access to our official proofs Telegram channel.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative">
                  <span className="text-2xl font-black text-purple-400 font-mono block mb-2">02</span>
                  <h4 className="font-bold text-white text-sm mb-1">Receive Pre-Alert Sounds</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Indicator emits 5s pre-alert audio buzzer on TradingView chart before candle closes.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative">
                  <span className="text-2xl font-black text-purple-400 font-mono block mb-2">03</span>
                  <h4 className="font-bold text-white text-sm mb-1">Execute on Quotex</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Open Quotex or PocketOption, select the asset, set 1M expiry, and place your trade on non-repaint arrow!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0b0616] border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-white font-bold text-sm sm:text-base hover:text-purple-300"
                >
                  <span className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 text-xs font-mono">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-purple-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-500/20 animate-fadeIn font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
