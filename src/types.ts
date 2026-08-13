export interface Indicator {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  accuracy: string;
  category: 'Binary / Real Market' | 'Binary / OTC' | 'TradingView / Forex' | 'Crypto' | 'Smart Money';
  features: string[];
  recommendedTimeframe: string;
  previewChartType: 'candles' | 'line' | 'smc';
  isPopular?: boolean;
}

export interface LiveSignal {
  id: string;
  asset: string;
  marketType: 'Quotex Live Forex' | 'Quotex Live Market' | 'Quotex OTC' | 'Forex Live' | 'Crypto' | 'Binary Options';
  timeframe: '1M' | '5M' | '15M';
  type: 'CALL / BUY' | 'PUT / SELL';
  entryPrice: number;
  tpPrice: number;
  slPrice: number;
  winProbability: number;
  indicatorTriggers: string[];
  expiresInSeconds: number;
  status: 'ACTIVE' | 'WIN' | 'EXPIRED';
  timestamp: string;
}

export interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  maFast?: number;
  maSlow?: number;
  signal?: 'BUY' | 'SELL' | null;
  supportLevel?: number;
  resistanceLevel?: number;
}

export interface VipPlan {
  id: string;
  name: string;
  badge?: string;
  priceUSD: number;
  priceBDT: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  profitAmount: string;
  verified: boolean;
  date: string;
  showOnHomepage?: boolean;
  showOnFeedbackPage?: boolean;
  private?: boolean;
}

export interface SocialVideo {
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
  showOnHomepage?: boolean;
  showOnFeedbackPage?: boolean;
  private?: boolean;
}

export interface VocalFeedback {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  profitAmount: string;
  duration: string;
  date: string;
  notesBN: string;
  notesEN: string;
  audioBlobUrl?: string;
  verified: boolean;
  showOnHomepage?: boolean;
  showOnFeedbackPage?: boolean;
  private?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Indicators' | 'Signals' | 'Quotex Setup' | 'VIP Access';
}

export interface AuthUser {
  id: string;
  name: string;
  emailOrUsername: string;
  tradingViewUser?: string;
  preferredBroker?: string;
  phoneOrWhatsapp?: string;
  vipLicenses?: string[];
  avatar: string;
  provider: 'telegram' | 'google' | 'direct';
  loggedInAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  emailOrTelegram: string;
  tradingViewUsername: string;
  indicatorId: string;
  indicatorName: string;
  amountUSD: number;
  amountBDT: number;
  paymentMethod: string;
  transactionId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'LICENSE_GRANTED';
  createdAt: string;
  notes?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  active: boolean;
  description?: string;
}

export interface BannerAnnouncement {
  enabled: boolean;
  text: string;
  type: 'sale' | 'info' | 'alert';
}

export interface AuthorizedLicense {
  id: string;
  tradingViewUsername: string;
  indicatorName: string;
  grantedAt: string;
  customerName?: string;
  status: 'ACTIVE' | 'REVOKED';
}

export interface PriceConfig {
  planId: string;
  priceUSD: number;
  priceBDT: number;
}
