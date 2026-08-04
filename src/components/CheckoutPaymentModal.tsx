import React, { useState } from 'react';
import {
  X,
  Send,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CreditCard,
  QrCode,
  Upload,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronLeft,
  FileText,
  UserCheck
} from 'lucide-react';

import { getSiteSettings } from '../lib/settingsStore';

export interface OrderRecord {
  id: string;
  tradingViewUsername: string;
  email: string;
  plan: string;
  price: string;
  paymentMethod: 'BINANCE' | 'USDT_TRC20' | 'BKASH' | 'NAGAD';
  senderAccount: string;
  trxIdOrPin: string;
  screenshotUrl?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: string;
}

interface CheckoutPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminPortal?: () => void;
}

export const CheckoutPaymentModal: React.FC<CheckoutPaymentModalProps> = ({
  isOpen,
  onClose,
  onOpenAdminPortal,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPlan, setSelectedPlan] = useState<'V5' | 'INFINITY'>('INFINITY');
  
  // State for Blurred Number & Get Number Verification
  const [isNumberUnlocked, setIsNumberUnlocked] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('xhuvo_number_unlocked') === 'true';
  });
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('Abroad - Dollar Purchase Not Possible');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Form fields
  const [tradingViewUsername, setTradingViewUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senderAccount, setSenderAccount] = useState('');
  const [confirmWithTrxId, setConfirmWithTrxId] = useState(true);
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  
  // High-Tech Animation State for Payment Transitions
  const [animState, setAnimState] = useState<{
    isLoading: boolean;
    title: string;
    subtitle: string;
  }>({
    isLoading: true, // Start with loading animation when modal opens
    title: 'GETTING PAYMENT INFORMATION...',
    subtitle: 'পেমেন্ট গেটওয়ে এবং একাউন্ট তথ্য প্রস্তুত করা হচ্ছে...'
  });

  // Trigger 1.6 second animation whenever modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setAnimState({
        isLoading: true,
        title: 'GETTING PAYMENT INFORMATION...',
        subtitle: 'পেমেন্ট গেটওয়ে এবং একাউন্ট তথ্য প্রস্তুত করা হচ্ছে...'
      });
      const timer = setTimeout(() => {
        setAnimState(prev => ({ ...prev, isLoading: false }));
      }, 1600); // Exactly 1.6 seconds animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const triggerAnimation = (title: string, subtitle: string, onComplete: () => void, duration = 1600) => {
    setAnimState({ isLoading: true, title, subtitle });
    setTimeout(() => {
      setAnimState(prev => ({ ...prev, isLoading: false }));
      onComplete();
    }, duration);
  };
  
  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState<'BINANCE' | 'USDT_TRC20' | 'BKASH' | 'NAGAD'>('BKASH');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Proof fields
  const [trxIdOrPin, setTrxIdOrPin] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);

  // Errors
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const siteSettings = getSiteSettings();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getPlanPrice = () => {
    return selectedPlan === 'INFINITY' ? siteSettings.infinityPrice : siteSettings.v5Price;
  };

  const getBdtPrice = () => {
    return selectedPlan === 'INFINITY' ? siteSettings.infinityBdtPrice : siteSettings.v5BdtPrice;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!tradingViewUsername.trim()) {
      setErrorMessage('Please enter your TradingView Username / অনুগ্রহ করে ট্রেডিংভিউ ইউজারনেম দিন');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your Email address / অনুগ্রহ করে ইমেইল ঠিকানা দিন');
      return;
    }
    if (!isReadyToPay) {
      setErrorMessage('You must check "I am ready to pay" to proceed / আপনাকে পেমেন্ট করতে সম্মত হতে হবে');
      return;
    }

    // Check blacklist from localStorage
    const blacklistedRaw = localStorage.getItem('xhuvo_blacklisted_users');
    if (blacklistedRaw) {
      try {
        const blacklisted: string[] = JSON.parse(blacklistedRaw);
        if (blacklisted.some(u => u.toLowerCase() === tradingViewUsername.trim().toLowerCase())) {
          setErrorMessage('❌ THIS TRADINGVIEW USERNAME IS PERMANENTLY BLACKLISTED due to non-payment or fraudulent activity.');
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    triggerAnimation(
      'GETTING PAYMENT INFORMATION...',
      'পেমেন্ট গেটওয়ে এবং একাউন্ট তথ্য লোড করা হচ্ছে...',
      () => setStep(2),
      1400
    );
  };

  const handleSwitchPaymentMethod = (method: 'BINANCE' | 'USDT_TRC20' | 'BKASH' | 'NAGAD') => {
    if (method === paymentMethod) return;
    const labels = {
      BKASH: 'bKash Personal Send Money',
      NAGAD: 'Nagad Personal Send Money',
      BINANCE: 'Binance Pay UID Gateway',
      USDT_TRC20: 'USDT TRC20 Crypto Gateway'
    };
    triggerAnimation(
      `LOADING ${labels[method].toUpperCase()}...`,
      'পেমেন্ট নম্বর ও নির্দেশনা লোড হচ্ছে...',
      () => setPaymentMethod(method),
      700
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxIdOrPin.trim()) {
      setErrorMessage('Please enter Transaction ID (TrxID) or PIN / অনুগ্রহ করে ট্রানজেকশন আইডি বা পিন নম্বর দিন');
      return;
    }

    triggerAnimation(
      'PROCESSING PAYMENT PROOF...',
      'অর্ডার তথ্য ভ্যালিডেট করে অটোমেটিক লাইসেন্স জেনারেট করা হচ্ছে...',
      () => {
        const orderId = `XQ-INF-${Math.floor(10000 + Math.random() * 90000)}`;
        const newOrder: OrderRecord = {
          id: orderId,
          tradingViewUsername: tradingViewUsername.trim(),
          email: email.trim(),
          plan: selectedPlan === 'INFINITY' ? 'XHUVO QX INFINITY VIP ($400)' : 'XHUVO QX V5 ($100)',
          price: getPlanPrice(),
          paymentMethod,
          senderAccount: senderAccount.trim() || 'Not specified',
          trxIdOrPin: trxIdOrPin.trim(),
          screenshotUrl: screenshotUrl || undefined,
          status: 'PENDING',
          timestamp: new Date().toLocaleString()
        };

        const existingOrdersRaw = localStorage.getItem('xhuvo_orders');
        let orders: OrderRecord[] = [];
        if (existingOrdersRaw) {
          try {
            orders = JSON.parse(existingOrdersRaw);
          } catch (err) {
            console.error(err);
          }
        }
        orders.unshift(newOrder);
        localStorage.setItem('xhuvo_orders', JSON.stringify(orders));

        setSubmittedOrder(newOrder);
        setStep(4);
      },
      1500
    );
  };

  // Dynamic Theme Colors based on Selected Payment Method & Admin Settings
  const getThemeDetails = () => {
    switch (paymentMethod) {
      case 'BKASH':
        return {
          name: 'bKash Personal',
          logo: 'bKash Personal',
          accountNumber: siteSettings.bkashNumber,
          type: 'Personal Send Money',
          bg: 'bg-[#1b0512]',
          border: 'border-[#e2136e]',
          accentText: 'text-[#f06292]',
          badgeBg: 'bg-[#e2136e]',
          glow: 'shadow-[0_0_30px_rgba(226,19,110,0.3)]',
          instructions: !isNumberUnlocked
            ? 'bKash App অথবা *247# থেকে "Send Money" দিয়ে 016377***** (লক করা) নম্বরে পেমেন্ট সম্পূর্ণ করুন।'
            : `bKash App অথবা *247# থেকে "Send Money" দিয়ে ${siteSettings.bkashNumber} নম্বরে পেমেন্ট সম্পূর্ণ করুন।`
        };
      case 'NAGAD':
        return {
          name: 'Nagad Personal',
          logo: 'Nagad Personal',
          accountNumber: siteSettings.nagadNumber,
          type: 'Personal Send Money',
          bg: 'bg-[#1e0e04]',
          border: 'border-[#f7931e]',
          accentText: 'text-[#ffb74d]',
          badgeBg: 'bg-[#f7931e]',
          glow: 'shadow-[0_0_30px_rgba(247,147,30,0.3)]',
          instructions: !isNumberUnlocked
            ? 'Nagad App অথবা *167# থেকে "Send Money" দিয়ে 016377***** (লক করা) নম্বরে পেমেন্ট সম্পূর্ণ করুন।'
            : `Nagad App অথবা *167# থেকে "Send Money" দিয়ে ${siteSettings.nagadNumber} নম্বরে পেমেন্ট সম্পূর্ণ করুন।`
        };
      case 'BINANCE':
        return {
          name: 'Binance Pay',
          logo: 'Binance Pay',
          accountNumber: siteSettings.binanceUid,
          type: 'Binance Pay UID',
          bg: 'bg-[#181a20]',
          border: 'border-[#f0b90b]',
          accentText: 'text-[#f0b90b]',
          badgeBg: 'bg-[#f0b90b] text-black font-extrabold',
          glow: 'shadow-[0_0_30px_rgba(240,185,11,0.25)]',
          instructions: `Open Binance App -> Pay -> Send via Pay ID -> Enter UID: ${siteSettings.binanceUid}`
        };
      case 'USDT_TRC20':
        return {
          name: 'USDT (TRC20)',
          logo: 'USDT TRC20',
          accountNumber: siteSettings.usdtAddress,
          type: 'TRC20 Network Address',
          bg: 'bg-[#0b1d16]',
          border: 'border-[#26a17b]',
          accentText: 'text-[#26a17b]',
          badgeBg: 'bg-[#26a17b]',
          glow: 'shadow-[0_0_30px_rgba(38,161,123,0.3)]',
          instructions: `Send ${getPlanPrice()} USDT via TRC20 (Tron Network) to address: ${siteSettings.usdtAddress}`
        };
    }
  };

  const currentTheme = getThemeDetails();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-fadeIn p-3 sm:p-6 flex items-start sm:items-center justify-center min-h-screen">
      <div className={`relative w-full max-w-2xl rounded-2xl ${currentTheme.bg} border ${currentTheme.border} p-5 sm:p-8 shadow-2xl ${currentTheme.glow} transition-all duration-300 my-auto`}>
        {/* Close Button / Locked Security Badge */}
        {!isNumberUnlocked ? (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-red-950/90 border border-red-500/70 text-red-200 font-mono-tech text-[10px] font-extrabold flex items-center gap-1.5 z-10 shadow-lg animate-pulse">
            <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>SECURITY LOCKED (NUMBER REVEALED)</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 pr-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-sans text-xs font-black uppercase tracking-wider shadow-lg shadow-red-500/30 shrink-0 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>XHUVO QX</span>
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-sans font-black text-white leading-tight tracking-tight uppercase">
                XHUVO QX <span className="text-red-400">INDICATOR PAYMENT</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-cyan-300 font-mono-tech font-bold mt-0.5">
                Official Automated License Checkout & Script Access
              </p>
            </div>
          </div>
        </div>

        {/* Security Warning Banner when Number is Unlocked */}
        {isNumberUnlocked && (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-red-950/90 via-rose-950/80 to-slate-950 border border-red-500/80 text-white font-mono-tech text-xs flex items-center gap-2.5 shadow-xl shadow-red-950/50">
            <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0 animate-pulse" />
            <div className="leading-tight">
              <span className="text-amber-300 font-bold block text-[11px] uppercase tracking-wider">🔒 সিকিউরিটি প্রোটোকল একটিভ / SECURITY LOCKED</span>
              <span className="text-slate-200 text-[11px]">
                আপনি পেমেন্ট সেন্ড মানি নাম্বার রিভেল করেছেন। সিকিউরিটি পলিসি অনুযায়ী পেমেন্ট সম্পন্ন করে স্ক্রিনশট ও TrxID সাবমিট করুন।
              </span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-300 font-mono-tech text-xs flex items-center gap-2 animate-bounce">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Getting Information & High-Tech Step Transition Loading Animation */}
        {animState.isLoading && (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 border-r-emerald-400 animate-spin flex items-center justify-center shadow-lg shadow-cyan-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg sm:text-2xl font-orbitron font-black text-white tracking-wider uppercase animate-pulse">
                {animState.title}
              </h4>
              <p className="text-xs sm:text-sm font-mono-tech text-cyan-300 font-bold">
                {animState.subtitle}
              </p>
              <div className="text-[11px] font-mono-tech text-slate-300 bg-slate-900/90 px-4 py-2 rounded-full border border-cyan-500/30 inline-block mt-2 shadow-lg">
                TradingView ID: <span className="text-white font-extrabold">{tradingViewUsername || 'Guest'}</span> • Plan: <span className="text-emerald-400 font-extrabold">{selectedPlan === 'INFINITY' ? 'INFINITY VIP ($400)' : 'V5 STARTER ($100)'}</span>
              </div>
            </div>
            {/* Animated progress bar */}
            <div className="w-full max-w-xs bg-slate-900 rounded-full h-2.5 overflow-hidden border border-cyan-500/40 p-0.5">
              <div className="bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 h-full rounded-full animate-pulse w-full" />
            </div>
          </div>
        )}

        {/* STEP 1: USER DETAILS & WARNING */}
        {!animState.isLoading && step === 1 && (
          <form onSubmit={handleProceedToPayment} className="space-y-5">
            {/* Plan Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono-tech font-bold text-slate-300">
                1. SELECT INDICATOR EDITION:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('INFINITY')}
                  className={`p-3.5 rounded-xl border text-left font-mono-tech transition-all cursor-pointer relative ${
                    selectedPlan === 'INFINITY'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px]">
                    FLAGSHIP VIP
                  </span>
                  <div className="text-sm font-extrabold text-white">XHUVO QX INFINITY</div>
                  <div className="text-xs text-amber-300 font-bold mt-0.5">{siteSettings.infinityPrice} Lifetime License</div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ 95%+ Win Rate • Non-Repaint</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('V5')}
                  className={`p-3.5 rounded-xl border text-left font-mono-tech transition-all cursor-pointer ${
                    selectedPlan === 'V5'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold text-white">XHUVO QX V5</div>
                  <div className="text-xs text-emerald-400 font-bold mt-0.5">{siteSettings.v5Price} Starter</div>
                  <div className="text-[10px] text-slate-400 mt-1">✓ Standard Binary Signals</div>
                </button>
              </div>
            </div>

            {/* TradingView Username Input */}
            <div>
              <label className="block text-xs font-mono-tech font-bold text-slate-200 mb-1">
                2. TRADINGVIEW USERNAME <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={tradingViewUsername}
                onChange={(e) => setTradingViewUsername(e.target.value)}
                placeholder="e.g. TraderJohn_99"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/20 text-white placeholder-slate-500 font-mono-tech text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <p className="text-[10px] text-slate-400 font-mono-tech mt-1">
                This exact username will be granted script access on TradingView.
              </p>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-mono-tech font-bold text-slate-200 mb-1">
                3. EMAIL ADDRESS <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/20 text-white placeholder-slate-500 font-mono-tech text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            {/* Strict Warning Box in English & Bengali */}
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-extrabold font-mono-tech text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span>CRITICAL PAYMENT WARNING / গুরুত্বপূর্ণ সতর্কতা</span>
              </div>
              <p className="text-[11px] text-red-200 font-mono-tech leading-relaxed">
                🇬🇧 <strong>ENGLISH:</strong> If you proceed to the payment step and do not complete the transaction, your TradingView username (<strong>{tradingViewUsername || 'Your Username'}</strong>) will be permanently blacklisted and banned from acquiring XHUVO QX indicators.
              </p>
              <p className="text-[11px] text-red-300 font-mono-tech leading-relaxed pt-1 border-t border-red-500/30">
                🇧🇩 <strong>বাংলা:</strong> পেমেন্ট স্টেপে অগ্রসর হয়ে আপনি যদি পেমেন্ট না সম্পন্ন করেন বা ভুয়া তথ্য দেন, তবে আপনার ট্রেডিংভিউ ইউজারনেমটি স্থায়ীভাবে ব্ল্যাকলিস্ট করা হবে এবং ইন্ডিকেটর সাপোর্ট বন্ধ করে দেওয়া হবে।
              </p>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40">
              <input
                type="checkbox"
                id="readyToPay"
                checked={isReadyToPay}
                onChange={(e) => setIsReadyToPay(e.target.checked)}
                className="w-5 h-5 accent-amber-400 rounded cursor-pointer mt-0.5"
              />
              <label htmlFor="readyToPay" className="text-xs font-mono-tech font-bold text-amber-300 cursor-pointer leading-snug">
                I am ready to pay / আমি পেমেন্ট করতে প্রস্তুত এবং সমস্ত নিয়ম মেনে পেমেন্ট অপশনে যেতে চাই।
              </label>
            </div>

            {/* Next Step CTA */}
            <button
              type="submit"
              disabled={!isReadyToPay || !tradingViewUsername.trim() || !email.trim()}
              className={`w-full py-4 rounded-xl font-orbitron font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
                isReadyToPay && tradingViewUsername.trim() && email.trim()
                  ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 text-slate-950 shadow-emerald-500/30 hover:scale-[1.01]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <span>PROCEED TO PAYMENT METHOD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION & THEMED DETAILS */}
        {!animState.isLoading && step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => triggerAnimation('LOADING USER DETAILS...', 'ইউজার তথ্য রিটার্ন করা হচ্ছে...', () => setStep(1), 600)}
                className="text-xs font-mono-tech text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to User Details
              </button>
              <div className="text-xs font-mono-tech text-cyan-300 font-bold">
                Order Total: <span className="text-amber-400">{getPlanPrice()} ({getBdtPrice()})</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-mono-tech font-bold text-slate-300">
                SELECT PAYMENT METHOD / পেমেন্ট মেথড বেছে নিন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => handleSwitchPaymentMethod('BKASH')}
                  className={`p-3 rounded-xl border font-mono-tech text-xs text-center transition-all cursor-pointer ${
                    paymentMethod === 'BKASH'
                      ? 'bg-[#e2136e]/20 border-[#e2136e] text-white font-extrabold shadow-lg shadow-[#e2136e]/30'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="inline-block px-2 py-0.5 rounded bg-[#e2136e] text-white font-black text-xs">bKash</div>
                  <div className="text-[10px] text-pink-300 mt-1 font-semibold">Personal</div>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => handleSwitchPaymentMethod('NAGAD')}
                  className={`p-3 rounded-xl border font-mono-tech text-xs text-center transition-all cursor-pointer ${
                    paymentMethod === 'NAGAD'
                      ? 'bg-[#f7931e]/20 border-[#f7931e] text-white font-extrabold shadow-lg shadow-[#f7931e]/30'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="inline-block px-2 py-0.5 rounded bg-[#f7931e] text-white font-black text-xs">Nagad</div>
                  <div className="text-[10px] text-amber-300 mt-1 font-semibold">Personal</div>
                </button>

                {/* Binance */}
                <button
                  type="button"
                  onClick={() => handleSwitchPaymentMethod('BINANCE')}
                  className={`p-3 rounded-xl border font-mono-tech text-xs text-center transition-all cursor-pointer ${
                    paymentMethod === 'BINANCE'
                      ? 'bg-[#f0b90b]/20 border-[#f0b90b] text-white font-extrabold shadow-lg shadow-[#f0b90b]/30'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="inline-block px-2 py-0.5 rounded bg-[#f0b90b] text-slate-950 font-black text-xs">Binance</div>
                  <div className="text-[10px] text-yellow-300 mt-1 font-semibold">Pay UID</div>
                </button>

                {/* USDT */}
                <button
                  type="button"
                  onClick={() => handleSwitchPaymentMethod('USDT_TRC20')}
                  className={`p-3 rounded-xl border font-mono-tech text-xs text-center transition-all cursor-pointer ${
                    paymentMethod === 'USDT_TRC20'
                      ? 'bg-[#26a17b]/20 border-[#26a17b] text-white font-extrabold shadow-lg shadow-[#26a17b]/30'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="inline-block px-2 py-0.5 rounded bg-[#26a17b] text-white font-black text-xs">USDT</div>
                  <div className="text-[10px] text-emerald-300 mt-1 font-semibold">TRC20</div>
                </button>
              </div>
            </div>

            {/* Dynamic Themed Payment Details Card */}
            <div className={`p-5 rounded-xl ${currentTheme.bg} border ${currentTheme.border} space-y-4 font-mono-tech shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm font-extrabold text-white flex items-center gap-2">
                  <CreditCard className={`w-5 h-5 ${currentTheme.accentText}`} />
                  {currentTheme.name}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${currentTheme.badgeBg}`}>
                  {currentTheme.type}
                </span>
              </div>

              {/* Number / Address Copy Box */}
              <div className="p-3.5 rounded-lg bg-slate-950/90 border border-white/20 flex items-center justify-between gap-2 relative overflow-hidden">
                {(paymentMethod === 'BKASH' || paymentMethod === 'NAGAD') && !isNumberUnlocked ? (
                  <div className="flex items-center justify-between w-full gap-3">
                    <div>
                      <div className="text-[10px] text-pink-400 font-bold uppercase flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Send Money Number (Blurred)</span>
                      </div>
                      <div className="text-base sm:text-lg font-mono-tech font-black text-slate-400 filter blur-sm select-none tracking-widest">
                        016377*****
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowReasonModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-orbitron font-extrabold text-xs tracking-wider shadow-lg shadow-pink-600/40 flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105 shrink-0 animate-pulse"
                    >
                      <Lock className="w-3.5 h-3.5 text-amber-300" />
                      <span>GET NUMBER / আনলক করুন</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">
                        {paymentMethod === 'BKASH' || paymentMethod === 'NAGAD' ? 'Send Money Number (Unlocked)' : 'Pay ID / Address'}
                      </div>
                      <div className={`text-base sm:text-lg font-mono-tech font-black tracking-wider ${currentTheme.accentText} select-all break-all`}>
                        {currentTheme.accountNumber}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(currentTheme.accountNumber, currentTheme.name)}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedKey === currentTheme.name ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* Step-by-step Payment Guide */}
              <div className="p-3 rounded-lg bg-slate-900/80 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white mb-1">📌 INSTRUCTIONS / নির্দেশাবলী:</div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  {currentTheme.instructions}
                </p>
                <div className="text-[10px] text-amber-300 font-bold mt-1">
                  • TradingView Username: <span className="text-white underline">{tradingViewUsername}</span>
                </div>
              </div>
            </div>

            {/* Proceed to Submission Button */}
            <button
              onClick={() => triggerAnimation('VERIFYING PAYMENT DETAILS...', 'পেমেন্ট ভেরিফিকেশন ও ট্রানজেকশন প্রুফ ফর্ম প্রস্তুত করা হচ্ছে...', () => setStep(3), 1000)}
              className={`w-full py-4 rounded-xl font-orbitron font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${currentTheme.badgeBg}`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I HAVE SUCCESSFULLY PAID / আমি পেমেন্ট সম্পন্ন করেছি</span>
            </button>
          </div>
        )}

        {/* STEP 3: TRANSACTION ID & PROOF SUBMISSION */}
        {!animState.isLoading && step === 3 && (
          <form onSubmit={handleSubmitProof} className="space-y-5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => triggerAnimation('LOADING PAYMENT METHODS...', 'পেমেন্ট গেটওয়ে অপশনসমূহ লোড হচ্ছে...', () => setStep(2), 600)}
                className="text-xs font-mono-tech text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Change Payment Method
              </button>
              <div className="text-xs font-mono-tech text-emerald-400 font-bold">
                Method: {currentTheme.name}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1 text-xs font-mono-tech">
              <div className="text-slate-400">TradingView Username: <strong className="text-white">{tradingViewUsername}</strong></div>
              <div className="text-slate-400">Email: <strong className="text-white">{email}</strong></div>
              <div className="text-slate-400">Order Amount: <strong className="text-amber-400">{getPlanPrice()}</strong></div>
            </div>

            {/* TrxID / PIN Input */}
            <div>
              <label className="block text-xs font-mono-tech font-bold text-slate-200 mb-1">
                TRANSACTION ID (TrxID) / PIN / REFERENCE NUMBER <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={trxIdOrPin}
                onChange={(e) => setTrxIdOrPin(e.target.value)}
                placeholder="e.g. 9J8A7K3M1X or PIN"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/20 text-white placeholder-slate-500 font-mono-tech text-sm focus:outline-none focus:border-cyan-400 transition-colors uppercase"
                required
              />
              <p className="text-[10px] text-slate-400 font-mono-tech mt-1">
                Enter the TrxID received from bKash/Nagad SMS or Binance/Crypto TxHash.
              </p>
            </div>

            {/* Screenshot Upload (Optional) */}
            <div>
              <label className="block text-xs font-mono-tech font-bold text-slate-200 mb-1">
                ATTACH PAYMENT SCREENSHOT (OPTIONAL / স্ক্রিনশট যোগ করুন)
              </label>
              <div className="relative border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-cyan-400 transition-colors bg-slate-950/50 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-cyan-400" />
                  <span className="text-xs text-slate-300 font-mono-tech">
                    {screenshotUrl ? '✓ Screenshot Attached (Click to change)' : 'Click or Drag screenshot here'}
                  </span>
                </div>
              </div>
              {screenshotUrl && (
                <div className="mt-2 text-center">
                  <img src={screenshotUrl} alt="Screenshot Preview" className="max-h-32 mx-auto rounded border border-white/20" />
                </div>
              )}
            </div>

            {/* Submit Proof Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-slate-950 font-orbitron font-extrabold text-xs tracking-wider shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>SUBMIT ORDER FOR INSTANT VIP ACTIVATION</span>
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS RECEIPT */}
        {step === 4 && submittedOrder && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-orbitron font-extrabold text-white">
                PAYMENT SUBMITTED SUCCESSFULLY!
              </h3>
              <p className="text-xs text-emerald-400 font-mono-tech mt-1">
                Order ID: <strong className="text-white bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">{submittedOrder.id}</strong>
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-left font-mono-tech text-xs space-y-2.5">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">TradingView Username:</span>
                <span className="font-bold text-white">{submittedOrder.tradingViewUsername}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Email:</span>
                <span className="text-white">{submittedOrder.email}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Selected Plan:</span>
                <span className="text-cyan-300 font-bold">{submittedOrder.plan}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Payment Method:</span>
                <span className="text-amber-300 font-bold">{submittedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">TrxID / PIN:</span>
                <span className="text-emerald-400 font-bold uppercase">{submittedOrder.trxIdOrPin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold text-[10px]">
                  ⏳ PENDING ADMIN VERIFICATION
                </span>
              </div>
            </div>

            {/* Direct Telegram Notification Button */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://t.me/XQ_owner?text=${encodeURIComponent(
                  `Hello Developer! I have paid for ${submittedOrder.plan}.\nOrder ID: ${submittedOrder.id}\nTradingView Username: ${submittedOrder.tradingViewUsername}\nPayment Method: ${submittedOrder.paymentMethod}\nTrxID/PIN: ${submittedOrder.trxIdOrPin}\n\nPlease activate my TradingView script access!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-white font-orbitron font-extrabold text-xs tracking-wider shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>NOTIFY DEVELOPER ON TELEGRAM (@XQ_owner)</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-300 font-mono-tech text-xs font-bold cursor-pointer transition-colors"
              >
                CLOSE WINDOW
              </button>
            </div>
          </div>
        )}

        {/* REASON & UNLOCK NUMBER MODAL OVERLAY */}
        {showReasonModal && (
          <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 border-2 border-pink-500/60 rounded-2xl max-w-md w-full p-6 text-left shadow-2xl space-y-4 font-mono-tech relative">
              <button
                type="button"
                onClick={() => setShowReasonModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/40">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-orbitron font-extrabold text-sm text-white">
                    পেমেন্ট নাম্বার আনলক করুন ({paymentMethod})
                  </h4>
                  <p className="text-[11px] text-pink-300 font-bold">
                    অ্যাডমিন ভেরিফিকেশন ও সিকিউরিটি প্রোটোকল
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-200">
                  ১. আপনি কেন এই পেমেন্ট মেথডটি ব্যবহার করবেন? (কারণ সিলেক্ট করুন)
                </label>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full bg-slate-950 border border-pink-500/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-pink-400 font-mono-tech cursor-pointer"
                >
                  <option value="Abroad - Dollar Purchase Not Possible">১. আমি বিদেশে থাকি এখানে ডলার কিনা সম্ভব না</option>
                  <option value="No Binance/bKash Account">২. আমার বাইন্যান্স/বিকাশ একাউন্ট নেই</option>
                </select>

                <div className="p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 text-xs text-pink-200 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-pink-300">
                    <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>অ্যাডমিন নির্দেশনা / Admin Notice:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    নাম্বারটি প্রকাশ পাওয়ার পর সেন্ড মানি করুন। পেমেন্ট সম্পন্ন হলে আপনার পেমেন্ট হিস্ট্রি অথবা অ্যাপের <strong className="text-amber-300">পেমেন্ট সাকসেস স্ক্রিনশট</strong> এবং <strong className="text-cyan-300 font-extrabold">TrxID</strong> ফর্ম এ সাবমিট করবেন।
                  </p>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 accent-pink-500 rounded cursor-pointer w-4 h-4"
                  />
                  <span className="text-[11px] text-slate-300 font-medium leading-tight">
                    আমি রাজি, পেমেন্ট শেষে সঠিক TrxID ও পেমেন্ট স্ক্রিনশট জমা দেব।
                  </span>
                </label>
              </div>

              <button
                type="button"
                disabled={!agreedTerms}
                onClick={() => {
                  triggerAnimation(
                    'VERIFYING REASON & UNLOCKING NUMBER...',
                    'অ্যাডমিন ভেরিফিকেশন সম্পন্ন হচ্ছে... নাম্বারটি আনলক করা হচ্ছে...',
                    () => {
                      localStorage.setItem('xhuvo_number_unlocked', 'true');
                      setIsNumberUnlocked(true);
                      setShowReasonModal(false);
                    },
                    1200
                  );
                }}
                className={`w-full py-3.5 rounded-xl font-orbitron font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg ${
                  agreedTerms
                    ? 'bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white shadow-pink-600/30 hover:scale-[1.02]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>SUBMIT & UNLOCK NUMBER / সাবমিট ও নাম্বার দেখুন</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
