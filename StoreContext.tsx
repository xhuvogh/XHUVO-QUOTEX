import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, PromoCode, BannerAnnouncement, AuthorizedLicense, PriceConfig, SocialVideo, VocalFeedback, Testimonial } from '../types';

interface StoreContextType {
  prices: Record<string, { priceUSD: number; priceBDT: number }>;
  promoCodes: PromoCode[];
  announcement: BannerAnnouncement;
  orders: Order[];
  licenses: AuthorizedLicense[];
  videos: SocialVideo[];
  vocals: VocalFeedback[];
  testimonials: Testimonial[];
  fridayDiscountEnabled: boolean;
  setFridayDiscountEnabled: (enabled: boolean) => void;
  weeklyDiscountEnabled: boolean;
  setWeeklyDiscountEnabled: (enabled: boolean) => void;
  weeklyDiscountSpotsLeft: number;
  setWeeklyDiscountSpotsLeft: (spots: number) => void;
  weeklyDiscountTimeLeft: number;
  resetWeeklyDiscountTimer: () => void;
  updatePrice: (planId: string, priceUSD: number, priceBDT: number) => void;
  addPromoCode: (code: string, discountPercent: number, description?: string) => void;
  togglePromoCode: (id: string) => void;
  deletePromoCode: (id: string) => void;
  updateAnnouncement: (enabled: boolean, text: string, type?: 'sale' | 'info' | 'alert') => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], notes?: string) => void;
  addLicense: (tradingViewUsername: string, indicatorName: string, customerName?: string) => void;
  revokeLicense: (licenseId: string) => void;
  resetToDefaults: () => void;
  validatePromoCode: (codeStr: string) => PromoCode | null;
  // Dynamic Feedback controls
  addVideo: (video: Omit<SocialVideo, 'id'>) => void;
  updateVideo: (id: string, updated: Partial<SocialVideo>) => void;
  deleteVideo: (id: string) => void;
  addVocal: (vocal: Omit<VocalFeedback, 'id'>) => void;
  updateVocal: (id: string, updated: Partial<VocalFeedback>) => void;
  deleteVocal: (id: string) => void;
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
}

const DEFAULT_PRICES: Record<string, { priceUSD: number; priceBDT: number }> = {
  'xhuvoqx-v5': { priceUSD: 100, priceBDT: 11500 },
  'xhuvoqx-infinity': { priceUSD: 400, priceBDT: 46000 },
  'ultimate-secret': { priceUSD: 1000, priceBDT: 115000 },
};

const DEFAULT_PROMO_CODES: PromoCode[] = [
  { id: '1', code: 'XHUVO20', discountPercent: 20, active: true, description: '20% Flash Sale Discount' },
  { id: '2', code: 'XHUVO50', discountPercent: 50, active: true, description: '50% VIP Partner Discount' },
  { id: '3', code: 'VIP10', discountPercent: 10, active: true, description: '10% Welcome Discount' },
];

const DEFAULT_ANNOUNCEMENT: BannerAnnouncement = {
  enabled: true,
  text: "⚡ SPECIAL FLASH SALE: USE CODE 'XHUVO20' FOR 20% INSTANT DISCOUNT ON XHUVO QX INDICATORS!",
  type: 'sale',
};

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerName: 'Tanvir Hossain',
    emailOrTelegram: '@tanvir_trader',
    tradingViewUsername: 'tanvir_qx_99',
    indicatorId: 'xhuvoqx-infinity',
    indicatorName: 'XHUVO QX INFINITY ($400 FLAGSHIP)',
    amountUSD: 400,
    amountBDT: 46000,
    paymentMethod: 'bKash (Send Money)',
    transactionId: 'BK8271639101',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    notes: 'Awaiting TradingView script authorization check'
  },
  {
    id: 'ORD-9820',
    customerName: 'Rahim Uddin',
    emailOrTelegram: '@rahim_fx',
    tradingViewUsername: 'rahim_trader',
    indicatorId: 'xhuvoqx-infinity',
    indicatorName: 'XHUVO QX INFINITY ($400 FLAGSHIP)',
    amountUSD: 320,
    amountBDT: 36800,
    paymentMethod: 'Binance USDT TRC20',
    transactionId: '0x8f27319a2b7190827361',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    notes: 'Payment verified on USDT TRC20. License granted.'
  },
  {
    id: 'ORD-9819',
    customerName: 'Sabbir Ahmed',
    emailOrTelegram: '@sabbir_binary',
    tradingViewUsername: 'sabbir_binary_pro',
    indicatorId: 'xhuvoqx-v5',
    indicatorName: 'XHUVO QX V5 ($100 STARTER)',
    amountUSD: 100,
    amountBDT: 11500,
    paymentMethod: 'Nagad',
    transactionId: 'NG736192031',
    status: 'LICENSE_GRANTED',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    notes: 'Added to TradingView invite-only script repository'
  }
];

const DEFAULT_LICENSES: AuthorizedLicense[] = [
  { id: 'LIC-1', tradingViewUsername: 'tanvir_qx_99', indicatorName: 'XHUVO QX INFINITY', grantedAt: new Date(Date.now() - 86400000 * 2).toISOString(), customerName: 'Tanvir Hossain', status: 'ACTIVE' },
  { id: 'LIC-2', tradingViewUsername: 'rahim_trader', indicatorName: 'XHUVO QX INFINITY', grantedAt: new Date(Date.now() - 86400000 * 5).toISOString(), customerName: 'Rahim Uddin', status: 'ACTIVE' },
  { id: 'LIC-3', tradingViewUsername: 'sabbir_binary_pro', indicatorName: 'XHUVO QX V5', grantedAt: new Date(Date.now() - 86400000 * 7).toISOString(), customerName: 'Sabbir Ahmed', status: 'ACTIVE' },
  { id: 'LIC-4', tradingViewUsername: 'xhuvo_official_vip', indicatorName: 'XHUVO QX INFINITY & ULTIMATE', grantedAt: new Date(Date.now() - 86400000 * 30).toISOString(), customerName: 'Developer XHUVO', status: 'ACTIVE' },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-telegram-9',
    name: 'Mohammad Yusuf',
    role: 'Quotex Scalper Specialist',
    location: 'Sylhet, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Alhamdulillah! Telegram channel (t.me/xhuvo_122/9) এর মেম্বার রিভিউ দেখে অর্ডার করেছিলাম। ১ মিনিটে ডাইরেক্ট উইন সিগন্যালগুলো কোটেক্স রিয়েল মার্কেটে ম্যাজিকের মতো কাজ করে। ইনফিনিটি ইন্ডিকেটর এবং নন-মার্টিঙ্গেল সেটিংস আসলেই চমৎকার। প্রফিট হচ্ছে প্রতিদিন!',
    profitAmount: '+$140 / day',
    verified: true,
    date: 't.me/xhuvo_122/9',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 't-telegram-13',
    name: 'Zayed Al-Hasan',
    role: 'Binary Options Mastermind',
    location: 'Chittagong, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'আমার লাইফের সেরা ইনভেস্টমেন্ট! টেলিগ্রাম প্রুফ সেশন (t.me/xhuvo_122/13) দেখে নিয়েছিলাম। কোন রিপেইন্ট বা অ্যারো ডিলিট হয় না। কোটেক্সে প্র্যাকটিক্যাল ব্যাক-টু-ব্যাক প্রফিট পেয়েছি। তাছাড়া লাইভ কাউন্টডাউন এবং আরজিবি কাস্টম থিম ড্যাশবোর্ডটি জাস্ট অসাধারণ।',
    profitAmount: '+$420 / week',
    verified: true,
    date: 't.me/xhuvo_122/13',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 't-1',
    name: 'Shakil Hossain',
    role: 'Quotex Trader',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'XHUVO QX INFINITY indicator ta ek kothay osadharon! Real market 1M candle a non-repaint arrow dekhe trade niye 10 tar moddhe 9 tai direct win without martingale. bKash personal a payment korar 5 min er moddhe TradingView a script access peye gechi.',
    profitAmount: '+$1,450 / week',
    verified: true,
    date: '@shakil_trader_bd',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 't-2',
    name: 'Ariful Islam',
    role: 'Pocket Option Scalper',
    location: 'Chittagong, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Real market 1M binary trading er jonno er theke bhalo indicator Bangladesh a r nai. Pre-alert sound buzzer shune entry neya jay ejonno fast candle miss hoy na. Developer XHUVO bhai khub e helpful Telegram a.',
    profitAmount: '+$2,100 / week',
    verified: true,
    date: '@ariful_fx_bd',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 't-3',
    name: 'Naimur Rahman',
    role: 'Forex & Binary Trader',
    location: 'Sylhet, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'First e V5 Starter nisi, tarpor profit kore INFINITY te upgrade korsi. 100% non-repaint signals, candle close jawar por arrow kono din shifts ba repaints hoy na. 100% recommended for Bangladeshi traders!',
    profitAmount: '+$3,250 / month',
    verified: true,
    date: '@naimur_qx',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 't-4',
    name: 'Tanvir Ahmed',
    role: 'Quotex Real Market Trader',
    location: 'Rajshahi, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Nagad a payment kore Telegram a TxID r TradingView username diycilam, instantly script authorization peye gechi. EUR/USD r GBP/USD real market a non-MTG direct wins super accurate!',
    profitAmount: '+$1,850 / week',
    verified: true,
    date: '@tanvir_crypto_bd',
    showOnHomepage: false,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 't-5',
    name: 'Mehedi Hasan',
    role: 'Binary Options Pro',
    location: 'Khulna, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Real market EUR/USD and GBP/USD e fast 1M binary entry accurate noise-free signals dey. 15+ AI filters algorithm script ta shotti e top level quality.',
    profitAmount: '+$2,400 / week',
    verified: true,
    date: '@mehedi_binary',
    showOnHomepage: false,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 't-6',
    name: 'Fahim Chowdhury',
    role: 'Live Market Scalper',
    location: 'Barishal, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'XHUVO QX INFINITY kine amar trading losses shob recover hoise. Direct TradingView indicator access + Telegram proofs group er daily update dekhe 100% trust kora jay.',
    profitAmount: '+$2,900 / week',
    verified: true,
    date: '@fahim_vip_qx',
    showOnHomepage: false,
    showOnFeedbackPage: true,
    private: false
  }
];

const DEFAULT_VIDEOS: SocialVideo[] = [
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
    description: 'XHUVO QX INFINITY ইন্ডিকেটর দিয়ে কোটেক্সে ট্রেড করে প্রথম দিনেই ১ মিনিটে ব্যাক-টু-ব্যাক প্রফিট পাওয়া সরাসরি ভিডিও রেকর্ড।',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
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
    description: 'পকেট অপশন এবং কোটেক্স উভয় মার্কেটেই সমান নিখুঁত কাজ করার সরাসরি ভিডিও।',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
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
    description: 'XHUVO QX V5 আল্টিমেট সিগন্যাল সেটআপ এবং কোটেক্স ক্যান্ডেল অ্যাকুরেসি প্রমাণ ভিডিও।',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
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
    description: 'টেলিগ্রাম ভিআইপি গ্রুপের লাইভ ভিডিও প্রুফ যেখানে প্রতিটা অ্যারো আসার পর সরাসরি লাইভ ট্রেড নেওয়া হয়েছে।',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
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
    description: 'কোনো মার্টিংগেল ছাড়া ডাইরেক্ট উইন স্ট্র্যাটেজি ব্যবহার করে ১ মিনিটে ৪৮০ ডলার লাভ করার ভিডিও প্রমাণ।',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  }
];

const DEFAULT_VOCALS: VocalFeedback[] = [
  {
    id: 'vocal-1',
    name: 'Hasan Mahmud',
    role: 'Quotex VIP Scalper',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    profitAmount: '+$340 / week',
    duration: '0:14',
    date: '1 day ago',
    notesBN: 'ইন্ডিকেটর সিগন্যালগুলো ক্যান্ডেল শুরু হওয়ার আগে থেকেই সাউন্ড অ্যালার্ট দেয়। কাজ করা অনেক সহজ হয়।',
    notesEN: 'The indicator signals play audio alerts before the candle begins. Makes trading so much easier.',
    verified: true,
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 'vocal-2',
    name: 'Sabina Yeasmin',
    role: '1-Min Binary Scalper',
    location: 'Sylhet, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    profitAmount: '+$180 / week',
    duration: '0:09',
    date: '2 days ago',
    notesBN: 'প্রথম দিনেই ৩টি ওটিসি সিগন্যাল নিয়ে ৩টিতেই প্রফিট পেয়েছি। থ্যাংক ইউ শুভ ভাই!',
    notesEN: 'Took 3 OTC signals on the first day and got profits in all 3. Thank you brother Shuvon!',
    verified: true,
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  },
  {
    id: 'vocal-3',
    name: 'Rahat Chowdhury',
    role: 'Quotex Day Trader',
    location: 'Chittagong, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    profitAmount: '+$520 / week',
    duration: '0:11',
    date: '3 days ago',
    notesBN: 'টেলিগ্রাম চ্যানেলে মেম্বার প্রুফ দেখে অর্ডার দিয়েছিলাম। ইন্ডিকেটরটি সত্যিই একুরেট।',
    notesEN: 'Ordered after viewing member proof on the Telegram channel. The indicator is indeed highly accurate.',
    verified: true,
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'xhuvo_store_backend_v2';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<Record<string, { priceUSD: number; priceBDT: number }>>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_prices`);
      return saved ? JSON.parse(saved) : DEFAULT_PRICES;
    } catch {
      return DEFAULT_PRICES;
    }
  });

  const [fridayDiscountEnabled, setFridayDiscountEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_friday_discount`);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [weeklyDiscountEnabled, setWeeklyDiscountEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_weekly_discount_enabled`);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [weeklyDiscountSpotsLeft, setWeeklyDiscountSpotsLeft] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_weekly_discount_spots_left`);
      return saved ? JSON.parse(saved) : 5;
    } catch {
      return 5;
    }
  });

  const [weeklyDiscountStartTime, setWeeklyDiscountStartTime] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_weekly_discount_start_time`);
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [weeklyDiscountTimeLeft, setWeeklyDiscountTimeLeft] = useState<number>(0);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_weekly_discount_enabled`, JSON.stringify(weeklyDiscountEnabled));
    } catch (e) { console.error(e); }
  }, [weeklyDiscountEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_weekly_discount_spots_left`, JSON.stringify(weeklyDiscountSpotsLeft));
    } catch (e) { console.error(e); }
  }, [weeklyDiscountSpotsLeft]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_weekly_discount_start_time`, JSON.stringify(weeklyDiscountStartTime));
    } catch (e) { console.error(e); }
  }, [weeklyDiscountStartTime]);

  // Real-time tick effect for 24-hour remaining countdown timer
  useEffect(() => {
    if (!weeklyDiscountEnabled) {
      setWeeklyDiscountTimeLeft(0);
      return;
    }

    let startTime = weeklyDiscountStartTime;
    if (startTime === 0) {
      startTime = Date.now();
      setWeeklyDiscountStartTime(startTime);
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const totalDuration = 24 * 60 * 60 * 1000; // 24 hours
      const remaining = Math.max(0, Math.floor((totalDuration - elapsed) / 1000));
      
      if (remaining <= 0) {
        // Continuous looping 24-hour cycle to maintain non-stop excitement and sales pressure
        const newStartTime = Date.now();
        setWeeklyDiscountStartTime(newStartTime);
        setWeeklyDiscountTimeLeft(24 * 60 * 60);
      } else {
        setWeeklyDiscountTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weeklyDiscountEnabled, weeklyDiscountStartTime]);

  const resetWeeklyDiscountTimer = () => {
    const now = Date.now();
    setWeeklyDiscountStartTime(now);
    setWeeklyDiscountSpotsLeft(5);
    setWeeklyDiscountTimeLeft(24 * 60 * 60);
  };

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_promos`);
      return saved ? JSON.parse(saved) : DEFAULT_PROMO_CODES;
    } catch {
      return DEFAULT_PROMO_CODES;
    }
  });

  const [announcement, setAnnouncement] = useState<BannerAnnouncement>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_announcement`);
      return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENT;
    } catch {
      return DEFAULT_ANNOUNCEMENT;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  const [licenses, setLicenses] = useState<AuthorizedLicense[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_licenses`);
      return saved ? JSON.parse(saved) : DEFAULT_LICENSES;
    } catch {
      return DEFAULT_LICENSES;
    }
  });

  const [videos, setVideos] = useState<SocialVideo[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_videos`);
      return saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
    } catch {
      return DEFAULT_VIDEOS;
    }
  });

  const [vocals, setVocals] = useState<VocalFeedback[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_vocals`);
      return saved ? JSON.parse(saved) : DEFAULT_VOCALS;
    } catch {
      return DEFAULT_VOCALS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_testimonials`);
      return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_prices`, JSON.stringify(prices));
    } catch (e) { console.error(e); }
  }, [prices]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_friday_discount`, JSON.stringify(fridayDiscountEnabled));
    } catch (e) { console.error(e); }
  }, [fridayDiscountEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_promos`, JSON.stringify(promoCodes));
    } catch (e) { console.error(e); }
  }, [promoCodes]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_announcement`, JSON.stringify(announcement));
    } catch (e) { console.error(e); }
  }, [announcement]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_orders`, JSON.stringify(orders));
    } catch (e) { console.error(e); }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_licenses`, JSON.stringify(licenses));
    } catch (e) { console.error(e); }
  }, [licenses]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_videos`, JSON.stringify(videos));
    } catch (e) { console.error(e); }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_vocals`, JSON.stringify(vocals));
    } catch (e) { console.error(e); }
  }, [vocals]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
    } catch (e) { console.error(e); }
  }, [testimonials]);

  const updatePrice = (planId: string, priceUSD: number, priceBDT: number) => {
    setPrices(prev => ({
      ...prev,
      [planId]: { priceUSD, priceBDT }
    }));
  };

  const addPromoCode = (code: string, discountPercent: number, description?: string) => {
    const newPromo: PromoCode = {
      id: Date.now().toString(),
      code: code.trim().toUpperCase(),
      discountPercent,
      active: true,
      description: description || `${discountPercent}% Discount Code`
    };
    setPromoCodes(prev => [newPromo, ...prev.filter(p => p.code !== newPromo.code)]);
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes(prev => prev.filter(p => p.id !== id));
  };

  const updateAnnouncement = (enabled: boolean, text: string, type: 'sale' | 'info' | 'alert' = 'sale') => {
    setAnnouncement({ enabled, text, type });
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    };
    setOrders(prev => [newOrder, ...prev]);

    // Automatically decrement the remaining 5 spots when a new order is made
    if (weeklyDiscountEnabled && weeklyDiscountSpotsLeft > 1) {
      setWeeklyDiscountSpotsLeft(prev => {
        const next = prev - 1;
        try {
          localStorage.setItem(`${LOCAL_STORAGE_KEY}_weekly_discount_spots_left`, JSON.stringify(next));
        } catch (e) { console.error(e); }
        return next;
      });
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], notes?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updated = { ...o, status, notes: notes !== undefined ? notes : o.notes };
        // If status becomes APPROVED or LICENSE_GRANTED, ensure tradingViewUsername is added to licenses
        if ((status === 'APPROVED' || status === 'LICENSE_GRANTED') && o.tradingViewUsername) {
          addLicense(o.tradingViewUsername, o.indicatorName, o.customerName);
        }
        return updated;
      }
      return o;
    }));
  };

  const addLicense = (tradingViewUsername: string, indicatorName: string, customerName?: string) => {
    const cleanUsername = tradingViewUsername.trim();
    if (!cleanUsername) return;
    setLicenses(prev => {
      const exists = prev.find(l => l.tradingViewUsername.toLowerCase() === cleanUsername.toLowerCase());
      if (exists) {
        return prev.map(l => l.id === exists.id ? { ...l, status: 'ACTIVE', grantedAt: new Date().toISOString() } : l);
      }
      const newLic: AuthorizedLicense = {
        id: `LIC-${Date.now()}`,
        tradingViewUsername: cleanUsername,
        indicatorName,
        grantedAt: new Date().toISOString(),
        customerName: customerName || 'VIP Customer',
        status: 'ACTIVE'
      };
      return [newLic, ...prev];
    });
  };

  const revokeLicense = (licenseId: string) => {
    setLicenses(prev => prev.map(l => l.id === licenseId ? { ...l, status: 'REVOKED' } : l));
  };

  const validatePromoCode = (codeStr: string): PromoCode | null => {
    const found = promoCodes.find(p => p.code.toUpperCase() === codeStr.trim().toUpperCase() && p.active);
    return found || null;
  };

  const resetToDefaults = () => {
    setPrices(DEFAULT_PRICES);
    setPromoCodes(DEFAULT_PROMO_CODES);
    setAnnouncement(DEFAULT_ANNOUNCEMENT);
    setOrders(DEFAULT_ORDERS);
    setLicenses(DEFAULT_LICENSES);
    setVideos(DEFAULT_VIDEOS);
    setVocals(DEFAULT_VOCALS);
    setTestimonials(DEFAULT_TESTIMONIALS);
  };

  // Video CRUD
  const addVideo = (videoData: Omit<SocialVideo, 'id'>) => {
    const newVideo: SocialVideo = {
      ...videoData,
      id: `vid-${Date.now()}`
    };
    setVideos(prev => [newVideo, ...prev]);
  };

  const updateVideo = (id: string, updated: Partial<SocialVideo>) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...updated } : v));
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  // Vocal CRUD
  const addVocal = (vocalData: Omit<VocalFeedback, 'id'>) => {
    const newVocal: VocalFeedback = {
      ...vocalData,
      id: `vocal-${Date.now()}`
    };
    setVocals(prev => [newVocal, ...prev]);
  };

  const updateVocal = (id: string, updated: Partial<VocalFeedback>) => {
    setVocals(prev => prev.map(v => v.id === id ? { ...v, ...updated } : v));
  };

  const deleteVocal = (id: string) => {
    setVocals(prev => prev.filter(v => v.id !== id));
  };

  // Testimonial CRUD
  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newT: Testimonial = {
      ...testimonialData,
      id: `t-${Date.now()}`
    };
    setTestimonials(prev => [newT, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        prices,
        promoCodes,
        announcement,
        orders,
        licenses,
        videos,
        vocals,
        testimonials,
        fridayDiscountEnabled,
        setFridayDiscountEnabled,
        weeklyDiscountEnabled,
        setWeeklyDiscountEnabled,
        weeklyDiscountSpotsLeft,
        setWeeklyDiscountSpotsLeft,
        weeklyDiscountTimeLeft,
        resetWeeklyDiscountTimer,
        updatePrice,
        addPromoCode,
        togglePromoCode,
        deletePromoCode,
        updateAnnouncement,
        addOrder,
        updateOrderStatus,
        addLicense,
        revokeLicense,
        resetToDefaults,
        validatePromoCode,
        addVideo,
        updateVideo,
        deleteVideo,
        addVocal,
        updateVocal,
        deleteVocal,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
