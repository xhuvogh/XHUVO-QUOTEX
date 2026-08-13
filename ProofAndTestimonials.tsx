import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, Award, MessageCircle, ExternalLink, TrendingUp, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { TelegramProofFeed } from './TelegramProofFeed';

interface ProofAndTestimonialsProps {
  onOpenFeedbackPage: () => void;
}

export const ProofAndTestimonials: React.FC<ProofAndTestimonialsProps> = ({ onOpenFeedbackPage }) => {
  const { language } = useLanguage();
  const store = useStore();
  
  // Display only the first 3 visible, public testimonials on the homepage
  const displayTestimonials = store.testimonials
    .filter(t => !t.private && t.showOnFeedbackPage !== false)
    .slice(0, 3);

  return (
    <section id="proofs" className="py-20 bg-[#07040e] text-slate-100 border-b border-purple-500/20 relative overflow-hidden">
      {/* Ambient Background Aura */}
      <div className="ambient-orb-purple top-1/3 -left-20" />
      <div className="ambient-orb-pink bottom-10 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full liquid-glass-pill text-purple-300 text-xs font-mono animate-pulse-badge">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>{language === 'BN' ? '১০০% যাচাইকৃত মেম্বার ট্রেডিং প্রুফ' : '100% VERIFIED MEMBER RESULTS & WRITTEN PROOF'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
            {language === 'BN' ? (
              <>আমাদের <span className="gradient-text-purple-pink">৮,৪০০+ সফল ট্রেডারদের</span> রিভিউ</>
            ) : (
              <>Trusted by Over <span className="gradient-text-purple-pink">8,400+ Quotex Traders</span></>
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            {language === 'BN' ? (
              'আমাদের মেম্বারদের রিয়েল প্রফিট স্ক্রিনশট এবং ভেরিফাইড লিখিত ট্রেড ফিডব্যাক দেখুন।'
            ) : (
              'See real trade results, profit proof feedback, and verified comments from Bengali & global Quotex traders using XHUVO QX.'
            )}
          </p>
        </motion.div>

        {/* Two-Column Responsive Layout: Reviews Grid & Live Telegram Channel Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: Traditional Written Reviews Bento List (Columns: 7/12) */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between self-stretch">
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950/40 border border-purple-500/10 text-left">
                <span className="text-[10px] text-purple-400 font-mono font-bold tracking-widest uppercase block mb-1">TRADER SATISFACTION</span>
                <p className="text-xs text-slate-400">
                  {language === 'BN' 
                    ? 'কোটেক্স মার্কেটে শত শত বাঙালি ট্রেডার আমাদের সিগন্যাল ইন্ডিকেটর ব্যবহার করে সফল ক্যারিয়ার গড়েছেন। নিচে কিছু সাম্প্রতিক ভেরিফাইড লিখিত রিভিউ দেওয়া হলো:' 
                    : 'Hundreds of Bengali traders have crafted profitable careers using our professional Quotex indicators. Read some of our latest verified customer feedback below:'}
                </p>
              </div>

              {displayTestimonials.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bento-card rounded-[24px] p-6 relative flex flex-col justify-between text-left"
                >
                  <div>
                    {/* User Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-bold text-white text-sm font-sans">{t.name}</h4>
                          {t.verified && <ShieldCheck className="w-4 h-4 text-purple-400" />}
                        </div>
                        <p className="text-xs text-slate-400 font-mono">{t.role} • {t.location}</p>
                      </div>
                    </div>

                    {/* Rating & Profit Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 font-mono font-bold text-[10px] border border-purple-500/20">
                        {t.profitAmount}
                      </span>
                    </div>

                    {/* Comment */}
                    <p className="text-xs text-slate-300 leading-relaxed italic mb-4 font-sans text-left">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono pt-3 border-t border-purple-500/20 flex items-center justify-between">
                    <span>{language === 'BN' ? 'যাচাইকৃত ট্রেডার রিভিউ' : 'VERIFIED TRADER REVIEW'}</span>
                    {t.date.startsWith('t.me/') ? (
                      <a
                        href={`https://${t.date}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300 font-bold flex items-center space-x-1"
                      >
                        <span>Telegram Proof</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span>{t.date}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More Written Reviews button */}
            <div className="pt-4 text-left">
              <button
                onClick={onOpenFeedbackPage}
                className="group inline-flex items-center space-x-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase font-mono cursor-pointer"
              >
                <span>{language === 'BN' ? 'সব লিখিত মেম্বার রিভিউ দেখুন' : 'View all written member reviews'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Telegram Channel Feed Simulator (Columns: 5/12) */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <TelegramProofFeed />
          </div>

        </div>

        {/* MORE FEEDBACK CTA WEB PAGE LINK BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center space-y-4 pt-4"
        >
          <button
            onClick={onOpenFeedbackPage}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-mono font-black text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-3 shadow-[0_0_35px_rgba(217,70,239,0.5)] btn-neon-glow hover:scale-[1.03] transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-fuchsia-200" />
            <span>{language === 'BN' ? 'মেম্বার রিভিউ ও প্রুফ পেজ দেখুন' : 'VIEW MEMBER REVIEWS & PROOF'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[11px] font-mono text-purple-400/90 font-bold uppercase tracking-wide">
            {language === 'BN' ? 'সব লিখিত মেম্বার রিভিউ ও আপনার প্রুফ সাবমিট করার পেজ' : 'FULL MEMBER REVIEWS & TESTIMONIAL FEEDBACK BOARD'}
          </p>
        </motion.div>

        {/* Telegram Proof Channel Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 text-center bento-card p-6 sm:p-8 max-w-3xl mx-auto rounded-[24px] space-y-4 border border-purple-500/20"
        >
          <div className="flex items-center justify-center space-x-2 text-purple-300 font-mono font-bold text-sm">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>{language === 'BN' ? 'প্রতিদিনের লাইভ প্রফিট স্ক্রিনশট ও মেম্বার ফিডব্যাক' : 'DAILY LIVE PROFIT SCREENSHOTS & FEEDBACK'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            {language === 'BN' ? (
              'আমাদের অফিশিয়াল পাবলিক টেলিগ্রাম চ্যানেলে জয়েন করে প্রতিদিনের ভিডিও প্রমাণ এবং ট্রেডারদের লাইভ রিভিউ দেখুন।'
            ) : (
              'Join our official public Telegram channel to view daily video proof, Quotex win screenshots, and trader feedback updated every session.'
            )}
          </p>
          <a
            href="https://t.me/+K8Kjxh16WjdlYTQ1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl liquid-glass-button font-bold text-xs text-white shadow-lg shadow-purple-500/20 btn-neon-glow hover:scale-[1.03] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-purple-300" />
            <span>{language === 'BN' ? 'টেলিগ্রাম লাইভ প্রুফ দেখুন' : 'VIEW LIVE TELEGRAM PROOF'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
