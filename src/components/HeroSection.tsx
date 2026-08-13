import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Cpu, Sparkles, Send, Zap, Crown, Target, Volume2, Shield, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { triggerLogoLoader } from '../utils/loader';

interface HeroSectionProps {
  onOpenCheckout: (planId?: string) => void;
  onExploreStudio: () => void;
  currency: 'USD' | 'BDT';
  onOpenAi?: () => void;
}

interface TelegramStats {
  formattedMembers: string;
  formattedOnline: string;
  isLive: boolean;
  updatedAt?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCheckout,
  onExploreStudio,
  currency,
  onOpenAi
}) => {
  const { t, language } = useLanguage();
  const [telegramStats, setTelegramStats] = useState<TelegramStats>({
    formattedMembers: '15,480',
    formattedOnline: '1,380',
    isLive: true
  });

  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const phrases = [
      language === 'EN' 
        ? "Ask market strategies, indicators, or signals..." 
        : "ট্রেডিং ইন্ডিকেটর বা স্ট্র্যাটেজি প্রশ্ন করুন...",
      language === 'EN' 
        ? "I can also make money management for you!" 
        : "মানি ম্যানেজমেন্ট প্ল্যান তৈরি করতে বলুন!"
    ];
    const activePhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activePhrase.substring(0, typedText.length + 1));
        setTypingSpeed(60);
      }, typingSpeed);

      if (typedText === activePhrase) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3500);
      }
    } else {
      timer = setTimeout(() => {
        setTypedText(activePhrase.substring(0, typedText.length - 1));
        setTypingSpeed(30);
      }, typingSpeed);

      if (typedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(120);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, language, typingSpeed]);

  useEffect(() => {
    const fetchTelegramMembers = async () => {
      try {
        const res = await fetch('/api/telegram-members');
        if (res.ok) {
          const data = await res.json();
          if (data.formattedMembers) {
            setTelegramStats({
              formattedMembers: data.formattedMembers,
              formattedOnline: data.formattedOnline || '1,380',
              isLive: true,
              updatedAt: data.updatedAt
            });
          }
        }
      } catch (_err) {
        // Fallback keeps initial state
      }
    };

    fetchTelegramMembers();
    const interval = setInterval(fetchTelegramMembers, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden py-16 sm:py-24 bg-[#07040d] border-b border-purple-500/20">
      {/* Ambient Background Aura Orbs (Deep Cyberpunk Atmosphere) */}
      <div className="ambient-orb-purple -top-40 -left-40 animate-pulse" />
      <div className="ambient-orb-pink -bottom-40 -right-40" />
      <div className="ambient-orb-cyan top-1/3 left-1/2 -translate-x-1/2" />

      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/30 via-slate-950 to-[#07040d] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* PREMIUM SEAMLESS XHUVO QX AI BAR */}
        <div className="w-full py-1.5 flex justify-center items-center relative z-20 -mt-7 mb-4">
          <motion.div
            onClick={onOpenAi}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              borderColor: [
                'rgba(168, 85, 247, 0.4)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(168, 85, 247, 0.4)'
              ],
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.15)',
                '0 0 25px rgba(168, 85, 247, 0.35)',
                '0 0 20px rgba(168, 85, 247, 0.15)'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(26, 11, 46, 0.85) 0%, rgba(15, 5, 30, 0.95) 100%)'
            }}
            className="w-full max-w-[420px] border border-purple-500/40 rounded-2xl py-1.5 px-3 flex items-center justify-between cursor-pointer select-none transition-all"
          >
            {/* Status Indicator & Premium Custom AI Logo */}
            <div className="flex items-center space-x-2.5 shrink-0">
              {/* Custom Premium AI Vector Logo with a pulse ring */}
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                {/* Pulsing Core */}
                <span className="absolute top-0.5 right-0.5 flex h-2 w-2 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                
                {/* Sleek Custom Vector AI Robot / Brain Logo */}
                <svg className="w-4.5 h-4.5 text-fuchsia-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z" className="opacity-40" />
                  <path d="M12 6v12M8 10h8M9 14h6" />
                  <circle cx="9" cy="10" r="1" className="fill-fuchsia-400" />
                  <circle cx="15" cy="10" r="1" className="fill-fuchsia-400" />
                  <path d="M12 18v2M12 4v2" />
                </svg>
              </div>
            </div>

            {/* Centered Dynamic Typing Text Area */}
            <div className="flex flex-col flex-grow text-left ml-2.5 overflow-hidden">
              <span className="text-[12px] sm:text-[13px] font-mono tracking-wider font-black uppercase flex items-center gap-1.5 leading-none">
                <span className="text-red-500 font-extrabold drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">XHUVO</span>
                <span className="text-purple-400">QX AI</span>
              </span>
              <div className="flex items-center text-[10px] sm:text-[11px] text-white/60 font-medium truncate max-w-[240px] mt-1">
                <span>{typedText || 'Ask market strategies, indicators...'}</span>
                <span className="text-purple-400 font-bold animate-pulse ml-0.5">|</span>
              </div>
            </div>

            {/* Elegant Call-To-Action Rocket/Arrow Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/20 rounded-xl w-8 h-8 flex items-center justify-center text-white cursor-pointer shadow-[0_4px_12px_rgba(147,51,234,0.4)] transition-all shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </motion.div>
        </div>
        
        {/* UNIFIED HERO INTRO & DEVELOPER LIQUID GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(20, 10, 36, 0.7)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderTop: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            borderRadius: '24px'
          }}
          className="p-6 sm:p-12 text-center max-w-5xl mx-auto relative overflow-hidden"
        >
          {/* Top Integrated Header Badge (Combines Group Logo, Title and Subtitle) */}
          <div className="inline-flex flex-col items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-purple-950/60 border border-purple-500/35 mb-8 shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-pulse-badge max-w-xl mx-auto w-full">
            
            {/* Row 1: Animated Official Group Logo Cluster */}
            <div className="flex items-center space-x-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-purple-500/20 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="shrink-0 flex items-center justify-center"
              >
                <Target className="w-3.5 h-3.5 text-purple-400" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.25, 1],
                  filter: ["drop-shadow(0 0 2px rgba(217,70,239,0.5))", "drop-shadow(0 0 8px rgba(217,70,239,0.9))", "drop-shadow(0 0 2px rgba(217,70,239,0.5))"]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="shrink-0 flex items-center justify-center"
              >
                <Crown className="w-4 h-4 text-fuchsia-400 fill-fuchsia-400/20" />
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="shrink-0 flex items-center justify-center"
              >
                <Target className="w-3.5 h-3.5 text-purple-400" />
              </motion.div>
            </div>

            {/* Row 2: XHUVO QUOTEX Header with breathing motion bg */}
            <h1 className="leading-none font-sans relative z-10 py-1">
              <motion.span 
                animate={{ 
                  scale: [1, 1.015, 1],
                  filter: [
                    'drop-shadow(0 0 25px rgba(239,68,68,0.4)) drop-shadow(0 0 35px rgba(168,85,247,0.25))',
                    'drop-shadow(0 0 40px rgba(239,68,68,0.75)) drop-shadow(0 0 50px rgba(217,70,239,0.55))',
                    'drop-shadow(0 0 25px rgba(239,68,68,0.4)) drop-shadow(0 0 35px rgba(168,85,247,0.25))'
                  ]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="inline-block text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight"
              >
                <span className="gradient-text-beast pr-1 sm:pr-2">XHUVO</span>{' '}
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">QUOTEX</span>
              </motion.span>
              
              {/* Row 3: OFFICIAL INDICATORS & TOOLS */}
              <span className="block text-[10px] sm:text-xs font-black tracking-[0.18em] sm:tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-300 mt-2 font-sans drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                OFFICIAL INDICATORS & TOOLS
              </span>
            </h1>

            {/* Row 4: Non-Repaint Guarantee Label */}
            <div className="flex items-center space-x-1.5 text-[10px] text-purple-300 border-t border-purple-500/20 pt-2 w-full justify-center font-mono">
              <span>⚡ XHUVO QX OFFICIAL STORE</span>
              <span>|</span>
              <span className="text-purple-200">100% NON-REPAINT GUARANTEE</span>
            </div>
          </div>

          {/* FUTURISTIC KEY HIGHLIGHTS BADGES ROW */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 max-w-3xl mx-auto relative z-10">
            {/* Highlight 1: 1M Timeframe */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/45 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] select-none"
            >
              <svg className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[10px] font-mono font-black tracking-wider text-cyan-300">1M TIMEFRAME</span>
            </motion.div>

            {/* Highlight 2: Real-time Signal */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-950/45 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)] select-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <svg className="w-3.5 h-3.5 text-pink-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 6a6 6 0 0 1 6 6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span className="text-[10px] font-mono font-black tracking-wider text-pink-300">REAL-TIME SIGNAL</span>
            </motion.div>

            {/* Highlight 3: Non-Repaint */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/45 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] select-none"
            >
              <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
              </svg>
              <span className="text-[10px] font-mono font-black tracking-wider text-amber-300">100% NON-REPAINT</span>
            </motion.div>
          </div>
 
          {/* V5 Flagship Algos Features Grid */}
          <div className="mt-8 mb-4 max-w-4xl mx-auto text-left relative z-10">
            <div className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                🔥 BEAST INDICATOR IN COMMUNITY
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <motion.div 
                whileHover={{ y: -2, scale: 1.01 }}
                className="p-4 rounded-xl bg-black/40 border-l-4 border-l-purple-500 border-r border-t border-b border-purple-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-sans">
                      {language === 'EN' ? '100% Non-Repaint Engine' : '১০০% নন-রিপেইন্ট ইঞ্জিন'}
                      <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-1 py-0.5 rounded uppercase font-bold">V5 Lock</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                      {language === 'EN' 
                        ? 'Signals lock instantly on close candle. Zero paint-overs, zero history changes.' 
                        : 'ক্যান্ডেল ক্লোজ হওয়ার সাথে সাথে সিগন্যাল লক হয়ে যায়। কোনো রি-পেইন্ট বা পরিবর্তন হয় না।'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                whileHover={{ y: -2, scale: 1.01 }}
                className="p-4 rounded-xl bg-black/40 border-l-4 border-l-fuchsia-500 border-r border-t border-b border-fuchsia-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20 shrink-0 mt-0.5">
                    <Target className="w-4 h-4 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-sans">
                      {language === 'EN' ? 'Advance Indicate Signal' : 'অ্যাডভান্সড ইন্ডিকেট সিগন্যাল'}
                      <span className="text-[9px] font-mono bg-fuchsia-500/20 text-fuchsia-300 px-1 py-0.5 rounded uppercase font-bold">Adv Check</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                      {language === 'EN' 
                        ? 'Analyzes and cross-checks indicators in advance to print precise high-winrate signal arrows.' 
                        : 'সরাসরি অ্যাডভান্সড ক্যান্ডেল সিগন্যাল এবং কনফার্মেশন অ্যারো চেক করে নির্ভুল এন্ট্রি দেয়।'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                whileHover={{ y: -2, scale: 1.01 }}
                className="p-4 rounded-xl bg-black/40 border-l-4 border-l-red-500 border-r border-t border-b border-red-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-sans">
                      {language === 'EN' ? 'Direct Candle Win Mode' : 'ডাইরেক্ট ক্যান্ডেল উইন মোড'}
                      <span className="text-[9px] font-mono bg-red-500/20 text-red-300 px-1 py-0.5 rounded uppercase font-bold">No MTG</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                      {language === 'EN' 
                        ? 'Signals optimized to win on the first instant candle. Avoids high-risk martingale setups.' 
                        : '১ম ক্যান্ডেলেই সরাসরি উইন হওয়ার জন্য অপ্টিমাইজড। ঝুঁকিপূর্ণ মার্টিনগেল ছাড়াই কাজ করে।'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                whileHover={{ y: -2, scale: 1.01 }}
                className="p-4 rounded-xl bg-black/40 border-l-4 border-l-cyan-500 border-r border-t border-b border-cyan-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-sans">
                      {language === 'EN' ? 'Automated Trend Filter' : 'অটোমেটেড ট্রেন্ড ফিল্টার'}
                      <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 px-1 py-0.5 rounded uppercase font-bold">95%+ Accurate</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                      {language === 'EN' 
                        ? 'Clears out sideways consolidation signals. Selects premium high-volume trend modes.' 
                        : 'মার্কেটের সাইডওয়েজ বা কনসোলিডেশন ফিল্টার করে শুধুমাত্র হাই-ভলিউম ট্রেন্ড সিগন্যাল দেখায়।'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Glowing Liquid Divider Line */}
          <div className="w-full max-w-md mx-auto my-8 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500/30 blur-sm" />
          </div>

          {/* INTEGRATED DEVELOPER BIOGRAPHY */}
          <div className="space-y-3 max-w-3xl mx-auto pt-2">
            <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
              👋 DEVELOPER INTRODUCTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              {t('hero.greeting')} <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] font-black">XHUVO</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
              Welcome to <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)] font-bold">Xhuvo</span> Quotex Official Store. As an algorithmic Pine Script developer, I engineer high-winrate, non-repaint visual indicators specifically optimized for 1-minute real-market binary options.
            </p>
          </div>

          {/* INTEGRATED BENTO METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono max-w-4xl mx-auto mt-8">
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <div className="text-xl sm:text-2xl font-black gradient-text-purple-pink">{telegramStats.formattedMembers}+</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-sans font-medium">Traders Community</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <div className="text-xl sm:text-2xl font-black gradient-text-green">95.0%+</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-sans font-medium">Verified Win Rate</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <div className="text-xl sm:text-2xl font-black text-white">100%</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-sans font-medium">Non-Repaint Arrow</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <div className="text-xl sm:text-2xl font-black gradient-text-cyan-purple">2-5 MINS</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-sans font-medium">Instant Setup</div>
            </div>
          </div>
 
          {/* Key Feature Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-8 text-xs sm:text-sm font-mono text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-fuchsia-400 shrink-0" />
              <span>100% Non-Repaint & Non-MTG</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-fuchsia-400 shrink-0" />
              <span>Quotex 1M / 5M Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-fuchsia-400 shrink-0" />
              <span>5-10s Pre-Alert Audio Confirmation</span>
            </div>
          </div>
 
          {/* COMBINED HIGH-CONVERTING ACTIONS */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 font-mono max-w-4xl mx-auto">
            <button
              onClick={() => {
                triggerLogoLoader('LOADING SECURE CHECKOUT...', 1600, () => onOpenCheckout('xhuvoqx-infinity'));
              }}
              style={{
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
              }}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 hover:scale-[1.03] hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <Zap className="w-5 h-5 text-white fill-current animate-pulse" />
              <span>BUY INFINITY FLAGSHIP ({currency === 'USD' ? '$400' : '৳46,000'})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
 
            <button
              onClick={() => {
                triggerLogoLoader('LOADING INDICATOR STUDIO...', 1600, () => onExploreStudio());
              }}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-xs sm:text-sm text-slate-100 bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Cpu className="w-5 h-5 text-purple-400" />
              <span>EXPLORE ALL INDICATORS</span>
            </button>

            {/* Official Community Telegram CTA */}
            <a
              href="https://t.me/+K8Kjxh16WjdlYTQ1"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-[1.03] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-purple-200 animate-bounce" />
              <span>JOIN OFFICIAL GROUP</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
 
        </motion.div>

      </div>
    </section>
  );
};
