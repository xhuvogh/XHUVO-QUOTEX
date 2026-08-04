import { SiteSettings } from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  infinityPrice: '$400',
  infinityBdtPrice: '48,000 BDT',
  v5Price: '$100',
  v5BdtPrice: '12,000 BDT',
  discountBannerActive: false,
  discountBannerText: '🔥 SPECIAL LIMITED OFFER: GET 25% DISCOUNT ON XHUVO QX INFINITY VIP LICENSE!',
  bkashNumber: '01637743610',
  nagadNumber: '01637743610',
  binanceUid: '884943053',
  usdtAddress: 'TDyYRypjbefCLdRC9dkTW67HhfhPaEEWaL',
  telegramOwner: 'XQ_owner',
};

const SETTINGS_KEY = 'xhuvo_website_settings';

export function getSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SITE_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SITE_SETTINGS;
    return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to parse site settings:', err);
    return DEFAULT_SITE_SETTINGS;
  }
}

export function saveSiteSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Dispatch custom event for real-time reactivity in current tab
    window.dispatchEvent(new CustomEvent('xhuvo_settings_updated', { detail: settings }));
  } catch (err) {
    console.error('Failed to save site settings:', err);
  }
}
