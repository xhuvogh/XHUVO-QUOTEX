import React from 'react';
import { motion } from 'motion/react';
import { VIP_PLANS } from '../data/mockData';
import { Shield, Check, Zap, Lock, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface VipPricingSectionProps {
  currency: 'USD' | 'BDT';
  setCurrency: (c: 'USD' | 'BDT') => void;
  onOpenCheckout: (planId?: string) => void;
}

export const VipPricingSection: React.FC<VipPricingSectionProps> = ({
  currency,
  setCurrency,
  onOpenCheckout
}) => {
  const store = useStore();
  return (
    <section id="pricing" className="py-20 bg-[#050308] text-slate-100 border-b border-purple-500/20 relative overflow-hidden">
      {/* Ambient Background Aura */}
      <div className="ambient-orb-purple top-1/4 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono animate-pulse-badge">
            <Shield className="w-3.5 h-3.5" />
            <span>INSTANT TRADINGVIEW SCRIPT ACCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Choose Your <span className="gradient-text-purple-pink">Indicator Plan</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Get instant access to XHUVO QX non-repaint indicators directly on your TradingView account with developer support.
          </p>

        {/* Currency Toggle */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="inline-flex items-center bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-purple-500/30 space-x-2 pt-2">
            <span className="text-xs text-slate-400 font-mono pl-2">Display Currency:</span>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD $
            </button>
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-3.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                currency === 'BDT'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BDT ৳
            </button>
          </div>

          {/* 80% Mega Offer Live Countdown Board */}
          {store.weeklyDiscountEnabled && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-rose-950/40 to-red-950/60 border border-red-500/50 shadow-[0_0_35px_rgba(239,68,68,0.3)] text-center max-w-lg w-full space-y-2.5 font-mono"
            >
              <span className="px-3 py-0.5 rounded-md bg-red-600/20 text-red-400 border border-red-500/40 text-[10px] font-black uppercase tracking-wider animate-pulse">
                🚨 WEEKLY 80% FLASH SALE IS LIVE NOW 🚨
              </span>
              <div className="text-sm font-bold text-white uppercase">
                ONLY <span className="text-amber-400 font-black">{store.weeklyDiscountSpotsLeft} PEOPLE</span> CAN SECURE THE OFFER!
              </div>
              <div className="text-[10px] text-slate-300">
                ({5 - store.weeklyDiscountSpotsLeft} spots claimed in last 24 hours)
              </div>
              
              {/* Giant Countdown Clock */}
              <div className="flex items-center justify-center space-x-2 pt-1">
                {(() => {
                  const hrs = Math.floor(store.weeklyDiscountTimeLeft / 3600).toString().padStart(2, '0');
                  const mins = Math.floor((store.weeklyDiscountTimeLeft % 3600) / 60).toString().padStart(2, '0');
                  const secs = (store.weeklyDiscountTimeLeft % 60).toString().padStart(2, '0');
                  
                  return (
                    <>
                      <div className="bg-black/90 px-3 py-2 rounded border border-red-500/30 text-amber-300 text-xl font-black">{hrs}</div>
                      <span className="text-red-500 font-black animate-ping">:</span>
                      <div className="bg-black/90 px-3 py-2 rounded border border-red-500/30 text-amber-300 text-xl font-black">{mins}</div>
                      <span className="text-red-500 font-black animate-ping">:</span>
                      <div className="bg-black/90 px-3 py-2 rounded border border-red-500/30 text-amber-300 text-xl font-black">{secs}</div>
                    </>
                  );
                })()}
              </div>
              <div className="text-[9px] text-red-400 font-bold tracking-widest uppercase pt-1">TIME REMAINING - GRAB IT IMMEDIATELY</div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {VIP_PLANS.map((plan, index) => {
          const isWeeklyDiscount = store.weeklyDiscountEnabled;
          const isFridayDiscount = !isWeeklyDiscount && store.fridayDiscountEnabled && (plan.id === 'xhuvoqx-v5' || plan.id === 'xhuvoqx-infinity');
          
          const isDiscountActive = isWeeklyDiscount || isFridayDiscount;
          const originalPrice = currency === 'USD' ? `$${plan.priceUSD}` : `৳${plan.priceBDT.toLocaleString()}`;
          
          let discountedUSD = plan.priceUSD;
          let discountedBDT = plan.priceBDT;
          let discountPercentText = '';
          
          if (isWeeklyDiscount) {
            discountPercentText = '80% OFF';
            if (plan.id === 'xhuvoqx-v5') {
              discountedUSD = 20;
              discountedBDT = 2300;
            } else if (plan.id === 'xhuvoqx-infinity') {
              discountedUSD = 80;
              discountedBDT = 9200;
            }
          } else if (isFridayDiscount) {
            if (plan.id === 'xhuvoqx-v5') {
              discountedUSD = 40;
              discountedBDT = 4600;
              discountPercentText = '60% OFF';
            } else if (plan.id === 'xhuvoqx-infinity') {
              discountedUSD = 80;
              discountedBDT = 9200;
              discountPercentText = '80% OFF';
            }
          }
          
          const displayPrice = currency === 'USD' ? `$${discountedUSD}` : `৳${discountedBDT.toLocaleString()}`;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-[24px] p-8 flex flex-col justify-between transition-all duration-300 ${
                isWeeklyDiscount
                  ? 'infinity-red-motion-glass border-2 border-red-500 shadow-[0_0_55px_rgba(239,68,68,0.5)] animate-pulse-subtle transform md:-translate-y-2'
                  : isFridayDiscount
                  ? 'infinity-red-motion-glass border-2 border-red-500/60 shadow-[0_0_45px_rgba(239,68,68,0.4)] animate-breathing-glow transform md:-translate-y-2'
                  : plan.isPopular
                  ? 'liquid-glass-modal border-2 border-fuchsia-400/60 shadow-[0_0_40px_rgba(168,85,247,0.35)] animate-breathing-glow transform md:-translate-y-2'
                  : 'bento-card'
              }`}
            >
              {/* Popular Badge */}
              {isWeeklyDiscount ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-black text-[10px] tracking-wider uppercase shadow-md animate-pulse-badge">
                  🔥 WEEKLY OFFER {discountPercentText} 🔥
                </div>
              ) : isFridayDiscount ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-black text-[10px] tracking-wider uppercase shadow-md animate-pulse-badge">
                  🔥 FRIDAY SPECIAL {discountPercentText} 🔥
                </div>
              ) : plan.badge ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-black text-[10px] tracking-wider uppercase shadow-md animate-pulse-badge">
                  {plan.badge}
                </div>
              ) : null}

              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono uppercase">{plan.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans">{plan.description}</p>

                {/* Price Header */}
                <div className="mb-6 pb-6 border-b border-purple-500/20">
                  {isDiscountActive ? (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500 line-through font-mono font-bold">
                          {originalPrice}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-[9px] text-red-400 font-bold font-mono">
                          SAVE {currency === 'USD' ? `$${plan.priceUSD - discountedUSD}` : `৳${(plan.priceBDT - discountedBDT).toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-4xl sm:text-5xl font-black text-red-500 font-mono tracking-tight drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                          {displayPrice}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl sm:text-5xl font-black gradient-text-purple-pink font-mono tracking-tight">{displayPrice}</span>
                      <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                    </div>
                  )}
                </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs text-slate-200 font-sans">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onOpenCheckout(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs font-mono transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] btn-neon-glow hover:scale-[1.03]'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:scale-[1.02]'
                  }`}
                >
                  <span>PROCEED TO PAYMENT GATEWAY</span>
                  <ArrowRight className="w-4 h-4 text-purple-200" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Security & Instant Guarantee Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-mono border-t border-purple-500/20 pt-8"
        >
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Instant TradingView Script Authorization</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span>100% Non-Repaint Guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Supported: bKash, Nagad, Binance Pay, USDT</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

