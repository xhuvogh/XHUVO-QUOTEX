import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'BN';

interface Translations {
  [key: string]: {
    EN: string;
    BN: string;
  };
}

const translations: Translations = {
  // Navigation / Header
  "nav.details": { EN: "DETAILS", BN: "বিস্তারিত" },
  "nav.pricing": { EN: "PRICING", BN: "মূল্য তালিকা" },
  "nav.reviews": { EN: "REVIEWS", BN: "রিভিউ" },
  "nav.support": { EN: "SUPPORT", BN: "সাপোর্ট" },
  "nav.backtest": { EN: "BACKTESTER", BN: "ব্যাকটেস্টার" },
  "nav.store": { EN: "STORE", BN: "স্টোর" },
  
  // Hero Section
  "hero.greeting": { EN: "Hey Myself", BN: "হ্যালো আমি" },
  "hero.welcome": { EN: "And welcome back to", BN: "এবং আপনাকে স্বাগতম" },
  "hero.desc": { 
    EN: "The official XHUVO QX TradingView indicator store engineered for Quotex, Pocket Option & 1M Real Market Binary Options. Engineered with 100% non-repaint signal arrows, pre-alert audio confirmations, and 1st time Non-MTG direct candle win modes.", 
    BN: "অফিসিয়াল XHUVO QX ট্রেডিংভিউ ইন্ডিকেটর স্টোর যা কোটেক্স, পকেট অপশন এবং ১ মিনিটের রিয়েল মার্কেট বাইনারি অপশনের জন্য ডিজাইন করা হয়েছে। ১০০% নন-রিপেইন্ট সিগন্যাল, অডিও অ্যালার্ট এবং প্রথমবার নন-এমটিজি ডাইরেক্ট ক্যান্ডেল উইন মোড সহ।" 
  },
  "hero.getScript": { EN: "GET SCRIPT NOW", BN: "স্ক্রিপ্ট সংগ্রহ করুন" },
  "hero.watchTrailer": { EN: "WATCH TRAILER", BN: "ট্রেইলার দেখুন" },
  
  // Mobile Nav
  "mobile.home": { EN: "Home", BN: "হোম" },
  "mobile.backtest": { EN: "Backtest", BN: "ব্যাকটেস্ট" },
  "mobile.support": { EN: "Support", BN: "সাপোর্ট" },
  "mobile.payment": { EN: "Payment", BN: "পেমেন্ট" }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') as Language;
    if (savedLang && (savedLang === 'EN' || savedLang === 'BN')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
