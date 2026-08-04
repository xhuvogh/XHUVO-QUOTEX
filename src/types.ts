export interface IndicatorFeature {
  id: string;
  category: 'Overview' | 'Setting & Inputs' | 'HUD & Looks';
  title: string;
  description: string;
  symbol: string; // tech symbol or icon key
  isSecret?: boolean; // whether it belongs to the blurred VIP formula overlay
  highlight?: boolean;
}

export interface IndicatorTier {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  price: number;
  bgGlowClass: string;
  cardGlassClass: string;
  accentColor: string;
  borderColor: string;
  featuresOverview: string[];
  featuresSettings: string[];
  featuresHud: string[];
  isPopular?: boolean;
  isUltimate?: boolean;
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  signal?: 'CALL' | 'PUT' | null;
  winState?: 'WIN' | 'LOSS' | null;
  snrType?: 'RESISTANCE' | 'SUPPORT' | null;
}

export type IndicatorTheme = 'cyber-blue' | 'neon-emerald' | 'hyper-violet' | 'gold-infinity';

export interface SiteSettings {
  infinityPrice: string;
  infinityBdtPrice: string;
  v5Price: string;
  v5BdtPrice: string;
  discountBannerActive: boolean;
  discountBannerText: string;
  bkashNumber: string;
  nagadNumber: string;
  binanceUid: string;
  usdtAddress: string;
  telegramOwner: string;
}
