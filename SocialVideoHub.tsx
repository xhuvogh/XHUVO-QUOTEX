import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Share2, Send, MessageCircle, Copy, ExternalLink, Star, ShieldCheck, Video, Check, Eye } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../context/StoreContext';

interface SocialVideo {
  id: string;
  title: string;
  banglaTitle: string;
  platform: 'TikTok' | 'Telegram' | 'YouTube Shorts';
  traderName: string;
  traderHandle: string;
  avatar: string;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  views: string;
  likes: string;
  rating: number;
  tags: string[];
  description: string;
}

const SOCIAL_VIDEOS: SocialVideo[] = [
  {
    id: 'tiktok-main',
    title: 'XHUVO QX INFINITY Perfect Entry Proof',
    banglaTitle: 'টিকটক লাইভ ট্রেড প্রুফ ও ইন্ডিকেটর ফিডব্যাক সেশন।',
    platform: 'TikTok',
    traderName: 'Xhuvo Official Trader',
    traderHandle: '@xhuvoofficial',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://vt.tiktok.com/ZS4EA6vQJ/',
    embedUrl: 'https://www.tiktok.com/embed/7667853909330939157',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    views: '48.5K',
    likes: '4.2K',
    rating: 5.0,
    tags: ['TikTok Featured', 'Quotex 1M', 'Non-Repaint'],
    description: 'XHUVO QX INFINITY ইন্ডিকেটর দিয়ে কোটেক্সে ট্রেড করে প্রথম দিনেই ১ মিনিটে ব্যাক-টু-ব্যাক প্রফিট পাওয়া সরাসরি ভিডিও রেকর্ড।'
  },
  {
    id: 'tiktok-clip-2',
    title: 'Quotex 1M Non-Repaint Live Signal Review',
    banglaTitle: 'কোটেক্স ১ মিনিট ট্রেডিং লাইভ সিগন্যাল রিভিউ। ১০০% নন-রিপেইন্ট রেজাল্ট।',
    platform: 'TikTok',
    traderName: 'Bengali Trader Community',
    traderHandle: '@xhuvoofficial8',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://vt.tiktok.com/ZS4EDju3a/',
    embedUrl: 'https://www.tiktok.com/embed/7665250933391101202',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    views: '29.4K',
    likes: '2.7K',
    rating: 5.0,
    tags: ['TikTok Review', 'Binary Strategy', 'Pocket Option'],
    description: 'পকেট অপশন এবং কোটেক্স উভয় মার্কেটেই সমান নিখুঁত কাজ করার সরাসরি ভিডিও।'
  },
  {
    id: 'tiktok-v5',
    title: 'XHUVO QX V5 Ultimate Setup & Strategy Proof',
    banglaTitle: 'কোটেক্স V5 ইন্ডিকেটর এর নিখুঁত সিগন্যাল প্রমাণ এবং সেটআপ গাইড।',
    platform: 'TikTok',
    traderName: 'Pro Trader Shuvo',
    traderHandle: '@xhuvoqx',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://vt.tiktok.com/ZS4EA34fq/',
    embedUrl: 'https://www.tiktok.com/embed/7644545672175242504',
    thumbnailUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=600',
    views: '51.2K',
    likes: '4.9K',
    rating: 5.0,
    tags: ['Xhuvo V5', 'Quotex Live', 'Strategy'],
    description: 'XHUVO QX V5 আল্টিমেট সিগন্যাল সেটআপ এবং কোটেক্স ক্যান্ডেল অ্যাকুরেসি প্রমাণ ভিডিও।'
  },
  {
    id: 'telegram-clip-1',
    title: 'Secured VIP Telegram Feedback Session',
    banglaTitle: 'টেলিগ্রাম ভিআইপি মেম্বার ফিডব্যাক ও সিগন্যাল প্রমাণ সরাসরি ভিডিও রেকর্ড।',
    platform: 'Telegram',
    traderName: 'VIP Telegram Group',
    traderHandle: '@xhuvoofficial',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://t.me/c/2946179614/7556',
    embedUrl: 'private-telegram-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    views: '32.1K',
    likes: '3.8K',
    rating: 5.0,
    tags: ['Telegram VIP', 'Live Proof', 'Private Chat'],
    description: 'টেলিগ্রাম ভিআইপি গ্রুপের লাইভ ভিডিও প্রুফ যেখানে প্রতিটা অ্যারো আসার পর সরাসরি লাইভ ট্রেড নেওয়া হয়েছে।'
  },
  {
    id: 'yt-shorts-1',
    title: 'XHUVO QX INFINITY Official Video Walkthrough',
    banglaTitle: 'কোটেক্স মাস্টারক্লাস গাইড: কিভাবে নন-রিপেইন্ট সিগন্যাল ফলো করে ট্রেড করবেন।',
    platform: 'YouTube Shorts',
    traderName: 'Xhuvo Official YouTube',
    traderHandle: '@xhuvoofficial',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    videoUrl: 'https://youtube.com/shorts/FIJS66YHj8Q?si=5yTj2Ysp8UXZSf0F',
    embedUrl: 'https://www.youtube-nocookie.com/embed/FIJS66YHj8Q?autoplay=1&mute=1&loop=1&playlist=FIJS66YHj8Q&modestbranding=1&rel=0&playsinline=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    views: '65.8K',
    likes: '5.9K',
    rating: 5.0,
    tags: ['YouTube Shorts', 'Official Tutorial', 'No Martingale'],
    description: 'কোনো মার্টিংগেল ছাড়া ডাইরেক্ট উইন স্ট্র্যাটেজি ব্যবহার করে ১ মিনিটে ৪৮০ ডলার লাভ করার ভিডিও প্রমাণ।'
  }
];

export const SocialVideoHub: React.FC = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const store = useStore();
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'TikTok' | 'Telegram' | 'YouTube Shorts'>('ALL');
  const [activeVideo, setActiveVideo] = useState<SocialVideo | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredVideos = store.videos.filter(v => {
    if (v.private) return false;
    if (v.showOnFeedbackPage === false) return false;
    if (selectedCategory !== 'ALL' && v.platform !== selectedCategory) return false;
    return true;
  });

  const handleCopyLink = (video: SocialVideo) => {
    navigator.clipboard.writeText(video.videoUrl);
    setCopiedId(video.id);
    showToast(`Copied ${video.platform} video link! You can now forward it.`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleForwardTelegram = (video: SocialVideo) => {
    const text = encodeURIComponent(`🔥 Check out this XHUVO QX Video Review (${video.title}):\n${video.videoUrl}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(video.videoUrl)}&text=${text}`, '_blank');
  };

  const handleForwardWhatsApp = (video: SocialVideo) => {
    const text = encodeURIComponent(`🔥 Check out this XHUVO QX Video Proof (${video.title}): ${video.videoUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="social-videos" className="py-20 bg-[#06030c] text-slate-100 border-b border-purple-500/20 relative overflow-hidden">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="ambient-orb-purple top-1/4 left-10" />
      <div className="ambient-orb-cyan bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-glass-pill text-purple-300 text-xs font-mono border border-purple-400/40 animate-pulse-badge">
            <Video className="w-4 h-4 text-fuchsia-400" />
            <span>{language === 'BN' ? 'ভিডিও ফিডব্যাক ও সরাসরি ট্রেডিং প্রমাণ' : 'VIDEO FEEDBACKS & LIVE TRADER SESSIONS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
            {language === 'BN' ? (
              <>ভিডিও ফিডব্যাক <span className="gradient-text-purple-pink">ও লাইভ ক্লিপস</span></>
            ) : (
              <>Video Feedback <span className="gradient-text-purple-pink">&amp; Proof Clips</span></>
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            {language === 'BN' ? (
              'টিকটক, টেলিগ্রাম এবং ইউটিউব থেকে আমাদের মেম্বারদের লাইভ ট্রেড প্রফিটের সরাসরি ভিডিও রিভিউ দেখুন ও শেয়ার করুন।'
            ) : (
              'Watch, verify, and forward live trader video reviews from TikTok, Telegram, and YouTube directly to your friends or trading groups.'
            )}
          </p>
        </motion.div>

        {/* Filter Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {(['ALL', 'TikTok', 'Telegram', 'YouTube Shorts'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'liquid-glass-button text-white font-bold border border-fuchsia-400/60 shadow-[0_0_20px_rgba(217,70,239,0.5)] scale-105'
                  : 'liquid-glass text-slate-300 hover:text-white hover:border-purple-500/40 hover:scale-[1.02]'
              }`}
            >
              {cat === 'ALL' ? '🔥 ALL VIDEO FEEDBACK' : `${cat.toUpperCase()}`}
            </button>
          ))}
        </motion.div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card rounded-[24px] p-5 sm:p-6 border border-purple-400/30 flex flex-col justify-between space-y-5 group shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Header Info */}
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={video.avatar}
                    alt={video.traderName}
                    className="w-10 h-10 rounded-full border-2 border-fuchsia-400/60 object-cover shadow-[0_0_10px_rgba(217,70,239,0.4)]"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white font-sans flex items-center gap-1.5">
                      {video.traderName}
                      <ShieldCheck className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                    </h4>
                    <span className="text-xs text-purple-300 font-mono">{video.traderHandle}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40 shadow-[0_0_10px_rgba(217,70,239,0.3)]">
                  {video.platform}
                </span>
              </div>

              {/* Video Thumbnail / Preview Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-purple-500/30 group-hover:border-fuchsia-400/60 transition-all shadow-xl">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center text-xs font-mono text-white">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-purple-300" /> {video.views} Views
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-amber-300 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {video.rating}
                    </span>
                  </div>

                  {/* Play Overlay Button */}
                  <div className="my-auto mx-auto">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.8)] hover:scale-110 transition-transform border-2 border-white/50 cursor-pointer"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>

                  {/* Video Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {video.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-purple-950/80 text-[10px] font-mono text-purple-200 border border-purple-400/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title & Bangla Description */}
              <div className="text-left space-y-2">
                <h3 className="text-base font-black text-white font-mono leading-snug group-hover:text-fuchsia-300 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-purple-200 font-sans leading-relaxed bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/20">
                  "{video.banglaTitle}"
                </p>
              </div>

              {/* Forward & Social Share Buttons */}
              <div className="pt-2 border-t border-purple-500/20 space-y-3">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 text-left">
                  <Share2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>FORWARD VIDEO FEEDBACK:</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleForwardTelegram(video)}
                    className="py-2 px-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105"
                    title="Forward to Telegram"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </button>

                  <button
                    onClick={() => handleForwardWhatsApp(video)}
                    className="py-2 px-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleCopyLink(video)}
                    className="py-2 px-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 border border-purple-400/40 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105"
                    title="Copy Video Link"
                  >
                    {copiedId === video.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === video.id ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>

                {/* Watch Direct Button */}
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl liquid-glass-button text-white text-xs font-mono font-bold flex items-center justify-center space-x-2 border border-fuchsia-400/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] btn-neon-glow hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-fuchsia-300" />
                  <span>WATCH DIRECTLY ON {video.platform.toUpperCase()}</span>
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN SOCIAL VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="liquid-glass-modal rounded-[24px] border-2 border-fuchsia-400/60 max-w-3xl w-full p-6 relative shadow-[0_0_80px_rgba(217,70,239,0.6)] space-y-4">
            
            <div className="flex justify-between items-center border-b border-purple-500/30 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-ping" />
                <h3 className="text-sm font-mono font-bold text-white uppercase">{activeVideo.platform} Video Review</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors font-mono font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video mx-auto bg-slate-950 border border-purple-500/40 w-full flex items-center justify-center">
              {activeVideo.embedUrl === 'private-telegram-video' ? (
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-between text-center bg-[#090514]/95 backdrop-blur-md z-10 font-sans">
                  <div className="w-full flex justify-between items-center text-[10px] font-mono text-sky-400">
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">TELEGRAM SECURED VIDEO</span>
                    <span>VIP CHANNEL ONLY</span>
                  </div>
                  
                  <div className="space-y-4 my-auto">
                    <div className="w-16 h-16 mx-auto rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center animate-bounce">
                      <Send className="w-8 h-8 fill-sky-500/10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wide">
                        🔐 সুরক্ষিত টেলিগ্রাম ভিআইপি ভিডিও
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        এটি একটি সংরক্ষিত টেলিগ্রাম ভিডিও যা শুধুমাত্র আমাদের VIP মেম্বারদের জন্য। ভিডিওটি সরাসরি আপনার টেলিগ্রাম অ্যাপে দেখতে নিচের <strong>"Open App / ভিডিও দেখুন"</strong> বাটনে ক্লিক করুন।
                      </p>
                    </div>
                  </div>

                  <a 
                    href={activeVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(14,165,233,0.4)] transition"
                  >
                    <Send className="w-4 h-4 fill-current" />
                    <span>টেলিগ্রাম অ্যাপে দেখুন (Open in Telegram)</span>
                  </a>
                </div>
              ) : (
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="w-full h-full rounded-xl border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>

            <div className="space-y-2 text-left">
              <h4 className="text-sm font-bold text-white font-mono">{activeVideo.title}</h4>
              <p className="text-xs text-purple-200 font-sans">{activeVideo.banglaTitle}</p>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <button
                onClick={() => handleForwardTelegram(activeVideo)}
                className="flex-1 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 font-mono font-bold text-xs flex items-center justify-center gap-2 border border-sky-400/40 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Forward Telegram
              </button>
              <a
                href={activeVideo.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl liquid-glass-button text-white font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer animate-pulse-badge"
              >
                <ExternalLink className="w-4 h-4" /> Open App
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
