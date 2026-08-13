import { Indicator, LiveSignal, VipPlan, Testimonial, FaqItem } from '../types';

export const INDICATORS: Indicator[] = [
  {
    id: 'xhuvoqx-v5',
    name: 'XHUVO QX V5 (Starter Edition)',
    tagline: 'Standard 100% Non-Repaint engine optimized for 1M binary trading starters.',
    description: 'Standard 100% Non-Repaint engine optimized for 1M binary trading starters on Quotex real market and TradingView.',
    badge: 'STARTER EDITION',
    accuracy: '88.5%',
    category: 'Binary / Real Market',
    recommendedTimeframe: '1M / 5M',
    previewChartType: 'candles',
    features: [
      '100% Non Repaint Signal Engine',
      'Standard Pre-Alert Sound & Visuals',
      'AI Mode (Auto Selects Settings)',
      '1M Fast Binary Candle Mode',
      '3 Strategy Modes Included',
      '5 Advanced Signal Filters',
      'Standard Emerald HUD Layout'
    ]
  },
  {
    id: 'xhuvoqx-infinity',
    name: 'XHUVO QX INFINITY (Flagship)',
    tagline: 'The apex binary indicator system built with non-MTG mode, AI auto-settings, 15+ advanced confluence filters & money management.',
    description: 'The apex binary indicator system built with non-MTG mode, AI auto-settings, 15+ advanced confluence filters & built-in money management.',
    badge: 'HOT TOPIC FLAGSHIP',
    accuracy: '95.0%',
    category: 'Binary / Real Market',
    recommendedTimeframe: '1M / 5M Real Market',
    previewChartType: 'candles',
    isPopular: true,
    features: [
      '100% Non Repaint Engine',
      'Pre-Alert Audio & Visual System',
      '1st TIME IN COMMUNITY: Non-MTG / Martingale Direct Win Mode',
      'AI Auto Settings Confluence (15+ Filters)',
      '1M Fast Binary Candle Mode with Active Timer HUD',
      'Built-in Money Management Calculator',
      'Automated SNR Lines & Volume / Delta Cluster',
      'Unlimited Theme Customizer (RGB, Neon, Violet, Gold)',
      'Direct Developer Access (@XQ_owner)'
    ]
  },
  {
    id: 'xhuvoqx-ultimate',
    name: 'XHUVO QX ULTIMATE (Next Generation)',
    tagline: 'THIS INDICATOR FOR NEXT GENERATION',
    description: 'এই সময় যদি এটা আনা হয় তাহলে পুরা জেনারেশনের মাথা নষ্ট হয়ে যাবে! (IF RELEASED NOW, IT WILL BLOW THE ENTIRE GENERATION\'S MIND!)',
    badge: 'PERMANENT SECRET',
    accuracy: '99.0%',
    category: 'Smart Money',
    recommendedTimeframe: '1M Live Market / All Timeframes',
    previewChartType: 'smc',
    features: [
      'Permanently Blurred Formula',
      'Next Generation AI Quantum Prediction',
      'Direct Zero-Lag Execution Signal Engine',
      'Contact Developer for Inquiry (@XQ_owner)'
    ]
  }
];

export const MOCK_LIVE_SIGNALS: LiveSignal[] = [
  {
    id: 'sig-01',
    asset: 'EUR/USD (Live Market)',
    marketType: 'Quotex Live Forex',
    timeframe: '1M',
    type: 'CALL / BUY',
    entryPrice: 1.08420,
    tpPrice: 1.08480,
    slPrice: 1.08390,
    winProbability: 97.2,
    indicatorTriggers: ['XHUVO QX INFINITY', 'Non-MTG Direct Win', 'Pre-Alert Audio Confirmed'],
    expiresInSeconds: 42,
    status: 'ACTIVE',
    timestamp: 'Just now'
  },
  {
    id: 'sig-02',
    asset: 'USD/BDT (Real Market)',
    marketType: 'Quotex Live Market',
    timeframe: '1M',
    type: 'PUT / SELL',
    entryPrice: 121.450,
    tpPrice: 121.320,
    slPrice: 121.550,
    winProbability: 95.8,
    indicatorTriggers: ['XHUVO QX INFINITY', 'Delta Cluster Exhaustion', '1M Candle Timer'],
    expiresInSeconds: 18,
    status: 'ACTIVE',
    timestamp: '1 min ago'
  },
  {
    id: 'sig-03',
    asset: 'GBP/USD (Live Market)',
    marketType: 'Quotex Live Forex',
    timeframe: '1M',
    type: 'CALL / BUY',
    entryPrice: 1.29420,
    tpPrice: 1.29490,
    slPrice: 1.29380,
    winProbability: 96.5,
    indicatorTriggers: ['XHUVO QX INFINITY', 'Auto SNR Support Bounce', '15+ AI Filters'],
    expiresInSeconds: 120,
    status: 'ACTIVE',
    timestamp: '2 mins ago'
  }
];

export const VIP_PLANS: VipPlan[] = [
  {
    id: 'xhuvoqx-v5',
    name: 'XHUVO QX V5 (Starter Edition)',
    priceUSD: 100,
    priceBDT: 11500,
    period: '/ Lifetime STARTER',
    description: 'Standard 100% Non-Repaint engine optimized for 1M binary trading starters.',
    features: [
      '100% Non Repaint Signal Engine',
      'Standard Pre-Alert Sound & Visuals',
      'AI Mode (Auto Selects Settings)',
      '1M Fast Binary Candle Mode',
      '3 Strategy Modes Included',
      '5 Advanced Signal Filters',
      'Standard Emerald HUD Layout'
    ],
    buttonText: 'BUY V5 INDICATOR ($100)'
  },
  {
    id: 'xhuvoqx-infinity',
    name: 'XHUVO QX INFINITY (Flagship)',
    badge: 'HOT TOPIC FLAGSHIP - 95% ACCURACY',
    priceUSD: 400,
    priceBDT: 46000,
    period: '/ Lifetime FLAGSHIP LICENSE',
    description: 'The apex binary indicator system built with non-MTG mode, AI auto-settings, 15+ advanced confluence filters & money management.',
    isPopular: true,
    features: [
      '100% Non Repaint Engine [100% NON-REPAINT]',
      'Pre-Alert Audio & Visual System [ACTIVE]',
      'AI Auto Settings Confluence [AI ENABLED]',
      '1M Fast Binary Candle Mode [1M BINARY]',
      '1st TIME IN COMMUNITY: Non Mtg / Martingale Mode',
      'Strict Confluence Filter (15+ Filters)',
      'Running Candle Mode (Smooth Delivery)',
      'Advance Volume / Delta Cluster Analysis',
      'Built-in Money Management Calculator',
      'Automated SNR Lines (Support & Resistance)',
      'Active Candle Timer HUD',
      'Unlimited Theme Customizer (RGB, Neon, Violet, Gold)',
      'Direct Developer Support (@XQ_owner)'
    ],
    buttonText: 'BUY INFINITY FLAGSHIP ($400)'
  }
];

export const TESTIMONIALS: Testimonial[] = [
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
    date: '@shakil_trader_bd'
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
    date: '@ariful_fx_bd'
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
    date: '@naimur_qx'
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
    date: '@tanvir_crypto_bd'
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
    date: '@mehedi_binary'
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
    date: '@fahim_vip_qx'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'IS XHUVO QX INFINITY REALLY 100% NON-REPAINT?',
    answer: 'Yes! Once a candle closes and the signal arrow appears on your TradingView chart, it NEVER disappears, shifts, or repaints regardless of future market movements. You can verify this on historical candles at any time.',
    category: 'Indicators'
  },
  {
    question: 'DOES XHUVO QX SUPPORT REAL MARKET AND OTC BROKERS?',
    answer: 'XHUVO QX indicators are specially calibrated exclusively for LIVE REAL MARKET trading (EUR/USD, GBP/USD, USD/JPY, Gold/XAUUSD, Crypto) where true institutional price action applies with 100% non-repaint accuracy.',
    category: 'Indicators'
  },
  {
    question: 'HOW DO I RECEIVE SCRIPT ACCESS AFTER MAKING A PAYMENT?',
    answer: 'After completing payment via bKash, Nagad, Rocket, or USDT / Crypto, submit your Transaction ID and TradingView username in the Checkout Modal or send it directly to developer Telegram (@XQ_owner). Access is granted to your TradingView account within 2-5 minutes!',
    category: 'VIP Access'
  },
  {
    question: 'CAN I USE THIS FOR 1M BINARY TRADING ON QUOTEX OR POCKET OPTION?',
    answer: 'Yes, XHUVO QX INFINITY is specifically engineered for 1-minute real market binary options trading on Quotex, Pocket Option, IQ Option, and Olymp Trade. It provides 5-10 second pre-alert audio notifications so you can enter trades right as the candle opens.',
    category: 'Indicators'
  },
  {
    question: 'WHAT IS NON-MTG / MARTINGALE MODE?',
    answer: 'Non-MTG (Non-Martingale) mode means you do NOT need to double your investment amount after a loss. Signals are designed for direct 1-step candle wins with 95%+ accuracy.',
    category: 'Indicators'
  },
  {
    question: 'WHAT PAYMENT METHODS ARE SUPPORTED IN BANGLADESH & GLOBALLY?',
    answer: 'For Bangladesh: bKash (Personal), Nagad (Personal), Rocket, and CellFin. For International: USDT (TRC20/BEP20), Binance Pay (Pay ID: 839210482), and Crypto.',
    category: 'VIP Access'
  }
];



