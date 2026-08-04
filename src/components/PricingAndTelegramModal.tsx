import React, { useState, useEffect } from 'react';
import { getSiteSettings } from '../lib/settingsStore';
import {
  X,
  Send,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Zap,
  Award,
  AlertTriangle,
  CreditCard,
  Smartphone,
  Lock,
  CheckCircle2,
  QrCode,
  UploadCloud,
  User,
  Mail,
  FileText,
  Clock,
  ShieldAlert,
  Trash2,
  Eye,
  ExternalLink
} from 'lucide-react';

interface PricingAndTelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface OrderRecord {
  id: string;
  tradingViewUser: string;
  email: string;
  plan: 'INFINITY' | 'V5';
  amount: string;
  paymentMethod: 'bkash' | 'nagad' | 'binance' | 'usdt';
  senderAccount: string;
  trxId: string;
  screenshot: string;
  timestamp: string;
  status: 'PENDING' | 'APPROVED' | 'BLACKLISTED';
}

export const PricingAndTelegramModal: React.FC<PricingAndTelegramModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Modal Step State: 1 (User Info & Plan) -> 2 (Warning & Confirmation) -> 3 (Payment Details Theme) -> 4 (TrxID & Proof) -> 5 (Success Receipt)
  const [step, setStep] = useState<number>(1);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);

  // User details
  const [selectedPlan, setSelectedPlan] = useState<'INFINITY' | 'V5'>('INFINITY');
  const [tradingViewUser, setTradingViewUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'binance' | 'usdt'>('bkash');
  const [senderAccount, setSenderAccount] = useState<string>('');
  const [confirmWithTrx, setConfirmWithTrx] = useState<boolean>(true);
  const [readyToPayChecked, setReadyToPayChecked] = useState<boolean>(false);

  // Proof & TrxID
  const [trxId, setTrxId] = useState<string>('');
  const [screenshotProof, setScreenshotProof] = useState<string>('');

  // State for Blurred Number & Unlock Verification
  const [isNumberUnlocked, setIsNumberUnlocked] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('xhuvo_number_unlocked') === 'true';
  });
  const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('Abroad - Dollar Purchase Not Possible');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);

  // Helper UI State
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const [currentOrderId, setCurrentOrderId] = useState<string>('');

  // High-Tech Step Transition Animation State
  const [animState, setAnimState] = useState<{
    isLoading: boolean;
    title: string;
    subtitle: string;
  }>({
    isLoading: true,
    title: 'GETTING PAYMENT INFORMATION...',
    subtitle: 'পেমেন্ট গেটওয়ে এবং একাউন্ট তথ্য প্রস্তুত করা হচ্ছে...'
  });

  // Trigger 1.6 seconds loading animation whenever modal opens
  useEffect(() => {
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

  // Admin orders stored in localStorage
  const [savedOrders, setSavedOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('xhuvo_qx_orders');
      if (stored) {
        setSavedOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen, showAdminPanel]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const getPlanPrice = () => {
    return selectedPlan === 'INFINITY' ? '$400' : '$100';
  };

  const siteSettings = getSiteSettings();

  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case 'bkash':
        return {
          title: 'bKash Personal Payment',
          badge: '🤩 bKash Personal',
          number: siteSettings.bkashNumber,
          instruction: 'আপনার বিকাশ অ্যাপ বা *247# থকে সেন্ড মানি করুন (Send Money)',
          bgGradient: 'from-[#e2136e]/20 via-[#e2136e]/10 to-slate-950',
          borderColor: 'border-[#e2136e]',
          textColor: 'text-[#e2136e]',
          btnBg: 'bg-[#e2136e] hover:bg-[#c10d5c]',
          note: !isNumberUnlocked
            ? 'বিকাশ পার্সোনাল নম্বর (লক করা): 016377*****'
            : `বিকাশ পার্সোনাল নম্বর: ${siteSettings.bkashNumber}`,
          currency: 'BDT (~48,000 BDT or $400 USD)'
        };
      case 'nagad':
        return {
          title: 'Nagad Personal Payment',
          badge: '🤩 Nagad Personal',
          number: siteSettings.nagadNumber,
          instruction: 'আপনার নগদ অ্যাপ বা *167# থকে সেন্ড মানি করুন (Send Money)',
          bgGradient: 'from-[#f7921e]/20 via-[#f7921e]/10 to-slate-950',
          borderColor: 'border-[#f7921e]',
          textColor: 'text-[#f7921e]',
          btnBg: 'bg-[#f7921e] hover:bg-[#d97c12]',
          note: !isNumberUnlocked
            ? 'নগদ পার্সোনাল নম্বর (লক করা): 016377*****'
            : `নগদ পার্সোনাল নম্বর: ${siteSettings.nagadNumber}`,
          currency: 'BDT (~48,000 BDT or $400 USD)'
        };
      case 'binance':
        return {
          title: 'Binance Pay (UID)',
          badge: '😬 Binance UID',
          number: '884943053',
          instruction: 'Open Binance App -> Pay -> Send via Binance ID / UID',
          bgGradient: 'from-[#f0b90b]/20 via-[#f0b90b]/10 to-slate-950',
          borderColor: 'border-[#f0b90b]',
          textColor: 'text-[#f0b90b]',
          btnBg: 'bg-[#f0b90b] text-black font-extrabold hover:bg-[#d8a609]',
          note: 'Binance Pay UID: 884943053',
          currency: selectedPlan === 'INFINITY' ? '$400 USDT / BUSD' : '$100 USDT / BUSD'
        };
      case 'usdt':
        return {
          title: 'USDT TRC20 Crypto Payment',
          badge: '🌐 USDT TRC20',
          number: 'TDyYRypjbefCLdRC9dkTW67HhfhPaEEWaL',
          instruction: 'Send TRC20 USDT to the network wallet address below',
          bgGradient: 'from-[#26a17b]/20 via-[#26a17b]/10 to-slate-950',
          borderColor: 'border-[#26a17b]',
          textColor: 'text-[#26a17b]',
          btnBg: 'bg-[#26a17b] hover:bg-[#1e8565]',
          note: 'USDT TRC20 Wallet Address',
          currency: selectedPlan === 'INFINITY' ? '$400 USDT (TRC20)' : '$100 USDT (TRC20)'
        };
    }
  };

  const handleStep1Next = () => {
    setValidationError('');
    if (!tradingViewUser.trim()) {
      setValidationError('TradingView Username is required!');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Valid Email address is required!');
      return;
    }
    triggerAnimation('GETTING PAYMENT INFORMATION...', 'পেমেন্ট গেটওয়ে এবং মেথড অপশনসমূহ লোড করা হচ্ছে...', () => setStep(2), 1200);
  };

  const handleStep2Next = () => {
    setValidationError('');
    if (!senderAccount.trim()) {
      setValidationError('Please enter your Sender Number or Account ID!');
      return;
    }
    if (!readyToPayChecked) {
      setValidationError('You must accept the agreement & warning checkbox before proceeding!');
      return;
    }
    triggerAnimation('VERIFYING PAYMENT METHOD...', 'পেমেন্ট একাউন্ট তথ্য ও গাইডলাইন প্রস্তুত করা হচ্ছে...', () => setStep(3), 1000);
  };

  const handleStep3Paid = () => {
    triggerAnimation('VERIFYING TRANSACTION PROOF...', 'ট্রানজেকশন প্রুফ ও TrxID সাবমিশন পেজ লোড হচ্ছে...', () => setStep(4), 1000);
  };

  const handleSelectPaymentMethod = (method: 'bkash' | 'nagad' | 'binance' | 'usdt') => {
    if (method === paymentMethod) return;
    const names = {
      bkash: 'bKash Personal',
      nagad: 'Nagad Personal',
      binance: 'Binance Pay UID',
      usdt: 'USDT TRC20 Wallet'
    };
    triggerAnimation(`LOADING ${names[method].toUpperCase()}...`, 'পেমেন্ট নম্বর ও বিস্তারিত নির্দেশনা আপডেট করা হচ্ছে...', () => setPaymentMethod(method), 700);
  };

  const handleSubmitOrder = () => {
    setValidationError('');
    if (!trxId.trim()) {
      setValidationError('Transaction ID / TrxID / Reference PIN is required!');
      return;
    }

    triggerAnimation('PROCESSING PAYMENT PROOF...', 'অর্ডার তথ্য ডাটাবেসে সেভ করা হচ্ছে এবং অফিসিয়াল ইনভয়েস জেনারেট হচ্ছে...', () => {
      const orderId = `XHQX-${Math.floor(100000 + Math.random() * 900000)}`;
      setCurrentOrderId(orderId);

      const newOrder: OrderRecord = {
        id: orderId,
        tradingViewUser: tradingViewUser.trim(),
        email: email.trim(),
        plan: selectedPlan,
        amount: getPlanPrice(),
        paymentMethod,
        senderAccount: senderAccount.trim(),
        trxId: trxId.trim(),
        screenshot: screenshotProof || 'Provided via Telegram / Direct',
        timestamp: new Date().toLocaleString(),
        status: 'PENDING'
      };

      try {
        const existing = localStorage.getItem('xhuvo_qx_orders');
        const ordersList: OrderRecord[] = existing ? JSON.parse(existing) : [];
        ordersList.unshift(newOrder);
        localStorage.setItem('xhuvo_qx_orders', JSON.stringify(ordersList));
        setSavedOrders(ordersList);
      } catch (e) {
        console.error(e);
      }

      setStep(5);
    }, 1500);
  };

  const handleApproveOrder = (orderId: string) => {
    const updated = savedOrders.map(o => o.id === orderId ? { ...o, status: 'APPROVED' as const } : o);
    setSavedOrders(updated);
    localStorage.setItem('xhuvo_qx_orders', JSON.stringify(updated));
  };

  const handleBlacklistOrder = (orderId: string) => {
    const updated = savedOrders.map(o => o.id === orderId ? { ...o, status: 'BLACKLISTED' as const } : o);
    setSavedOrders(updated);
    localStorage.setItem('xhuvo_qx_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = savedOrders.filter(o => o.id !== orderId);
    setSavedOrders(updated);
    localStorage.setItem('xhuvo_qx_orders', JSON.stringify(updated));
  };

  const details = getPaymentDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#090514] border border-cyan-500/40 p-5 sm:p-7 shadow-2xl shadow-cyan-500/30 overflow-hidden my-auto">
        {/* Top Header Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono-tech font-extrabold uppercase">
              XHUVO QX INDICATOR & FEATURES PAYMENT
            </span>
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="px-2 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[9px] font-mono-tech font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3 text-purple-400" />
              {showAdminPanel ? 'Exit Admin' : 'Admin Channel'}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ADMIN CHANNEL PANEL VIEW */}
        {showAdminPanel ? (
          <div className="space-y-4 font-mono-tech text-xs">
            <div className="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl text-center">
              <h3 className="text-sm font-orbitron font-extrabold text-purple-300 flex items-center justify-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                ADMIN VERIFICATION & ORDER MANAGEMENT
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">
                Owner Dashboard for TradingView License Approvals & Blacklist Control
              </p>
            </div>

            {savedOrders.length === 0 ? (
              <div className="p-6 text-center text-slate-400 bg-slate-900/60 rounded-xl border border-white/10">
                No payment orders submitted yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {savedOrders.map((ord) => (
                  <div key={ord.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <span className="font-bold text-cyan-300">{ord.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                        ord.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        ord.status === 'BLACKLISTED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {ord.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                      <div>
                        <span className="text-slate-400">TradingView:</span> <strong className="text-white">{ord.tradingViewUser}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Email:</span> <strong className="text-white">{ord.email}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Method:</span> <strong className="text-amber-300 uppercase">{ord.paymentMethod}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Sender:</span> <strong className="text-white">{ord.senderAccount}</strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400">TrxID / PIN:</span> <strong className="text-emerald-400 font-mono">{ord.trxId}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                      {ord.status !== 'APPROVED' && (
                        <button
                          onClick={() => handleApproveOrder(ord.id)}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold cursor-pointer"
                        >
                          APPROVE ACCESS
                        </button>
                      )}
                      {ord.status !== 'BLACKLISTED' && (
                        <button
                          onClick={() => handleBlacklistOrder(ord.id)}
                          className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-[10px] font-bold cursor-pointer"
                        >
                          BLACKLIST
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(ord.id)}
                        className="p-1 rounded bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowAdminPanel(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-white/20 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
            >
              BACK TO CHECKOUT FLOW
            </button>
          </div>
        ) : (
          /* STANDARD MULTI-STEP CHECKOUT FLOW */
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-5 px-1 font-mono-tech text-[10px]">
              {[
                { num: 1, label: 'User Details' },
                { num: 2, label: 'Warning & Terms' },
                { num: 3, label: 'Payment' },
                { num: 4, label: 'Verify TrxID' },
                { num: 5, label: 'Receipt' },
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      step === s.num
                        ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30'
                        : step > s.num
                        ? 'bg-emerald-500 text-black'
                        : 'bg-slate-800 text-slate-500 border border-white/10'
                    }`}
                  >
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className={`hidden sm:inline ${step === s.num ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {validationError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 font-mono-tech text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* High-Tech Loading Transition Animation */}
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
                    TradingView ID: <span className="text-white font-extrabold">{tradingViewUser || 'Guest'}</span> • Plan: <span className="text-emerald-400 font-extrabold">{selectedPlan === 'INFINITY' ? 'INFINITY VIP ($400)' : 'V5 STARTER ($100)'}</span>
                  </div>
                </div>
                <div className="w-full max-w-xs bg-slate-900 rounded-full h-2.5 overflow-hidden border border-cyan-500/40 p-0.5">
                  <div className="bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 h-full rounded-full animate-pulse w-full" />
                </div>
              </div>
            )}

            {/* STEP 1: USER DETAILS & PLAN SELECTOR */}
            {!animState.isLoading && step === 1 && (
              <div className="space-y-4 font-mono-tech text-xs">
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-orbitron font-extrabold text-white">
                    STEP 1: TRADINGVIEW & ACCOUNT INFORMATION
                  </h3>
                  <p className="text-slate-400 text-[11px]">
                    Enter your TradingView username so we can grant instant license access.
                  </p>
                </div>

                {/* Plan Selection */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('INFINITY')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      selectedPlan === 'INFINITY'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="absolute -top-2 right-3 px-2 py-0.2 rounded bg-amber-400 text-black font-extrabold text-[8px] uppercase">
                      BEST CHOICE
                    </span>
                    <div className="font-orbitron font-extrabold text-cyan-300 text-sm"><span className="text-red-500 font-extrabold">XHUVO</span> QX INFINITY</div>
                    <div className="text-amber-400 font-extrabold text-base mt-1">$400 LIFETIME VIP</div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-1">✓ 100% Non Repaint & Pre-Alerts</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('V5')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedPlan === 'V5'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-orbitron font-extrabold text-emerald-300 text-sm"><span className="text-red-500 font-extrabold">XHUVO</span> QX V5</div>
                    <div className="text-emerald-400 font-extrabold text-base mt-1">$100 STARTER</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-1">✓ Standard Signal Mode</div>
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      TradingView Username (Required):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. trader_xhuvo"
                      value={tradingViewUser}
                      onChange={(e) => setTradingViewUser(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      We activate the script directly on this TradingView username.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      Email Address (Required):
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. trader@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleStep1Next}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-orbitron font-extrabold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer mt-4"
                >
                  NEXT: CHOOSE PAYMENT METHOD & TERMS →
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT METHOD & WARNING TERMS */}
            {!animState.isLoading && step === 2 && (
              <div className="space-y-4 font-mono-tech text-xs">
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-orbitron font-extrabold text-white">
                    STEP 2: PAYMENT METHOD & AGREEMENT
                  </h3>
                  <p className="text-slate-400 text-[11px]">
                    Select how you want to pay and review the terms.
                  </p>
                </div>

                {/* Payment Method Selector Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'bg-[#e2136e]/20 border-[#e2136e] text-white shadow-lg shadow-[#e2136e]/20'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-extrabold text-[#e2136e]">🤩 bKash Personal</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">{siteSettings.bkashNumber}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'bg-[#f7921e]/20 border-[#f7921e] text-white shadow-lg shadow-[#f7921e]/20'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-extrabold text-[#f7921e]">🤩 Nagad Personal</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">{siteSettings.nagadNumber}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPaymentMethod('binance')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'binance'
                        ? 'bg-[#f0b90b]/20 border-[#f0b90b] text-white shadow-lg shadow-[#f0b90b]/20'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-extrabold text-[#f0b90b]">😬 Binance UID</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">884943053</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectPaymentMethod('usdt')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'usdt'
                        ? 'bg-[#26a17b]/20 border-[#26a17b] text-white shadow-lg shadow-[#26a17b]/20'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-extrabold text-[#26a17b]">🌐 USDT TRC20</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Crypto Wallet</div>
                  </button>
                </div>

                {/* Sender Info Field */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Your Sender Number or Wallet/Account ID:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 017xxxxxxxx or Binance Pay ID"
                    value={senderAccount}
                    onChange={(e) => setSenderAccount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Option for TrxID confirmation */}
                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-white/10 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={confirmWithTrx}
                    onChange={(e) => setConfirmWithTrx(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-400 accent-cyan-400"
                  />
                  <span className="text-xs">I want to confirm payment with Transaction ID / PIN / TrxID</span>
                </label>

                {/* STRICT WARNING BOX IN ENGLISH & BENGALI */}
                <div className="p-3.5 rounded-xl bg-red-950/90 border border-red-500/70 space-y-2 text-red-200">
                  <div className="flex items-center gap-2 font-extrabold text-red-400 text-xs uppercase">
                    <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                    STRICT SYSTEM WARNING / নিয়মাবলী ও সতর্কতা
                  </div>
                  <p className="text-[11px] leading-relaxed text-red-100">
                    <strong>[ENGLISH]:</strong> If you proceed to the next payment step and do not complete the payment, your TradingView username (<strong className="text-white underline">{tradingViewUser}</strong>) will be PERMANENTLY BLACKLISTED and blocked from accessing XHUVO QX indicators.
                  </p>
                  <p className="text-[11px] leading-relaxed text-red-100 border-t border-red-500/30 pt-1.5">
                    <strong>[বাংলা]:</strong> পরবর্তী ধাপে গিয়ে পেমেন্ট সম্পন্ন না করলে, আপনার ট্রেডিংভিউ ইউজারনেমটি স্থায়ীভাবে ব্ল্যাকলিস্ট করা হবে এবং ভবিষ্যতে এই ইন্ডিকেটর আর ব্যবহার করতে পারবেন না!
                  </p>
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={readyToPayChecked}
                    onChange={(e) => setReadyToPayChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 accent-amber-400 mt-0.5"
                  />
                  <span className="text-xs font-bold leading-tight">
                    I am ready to pay / আমি পেমেন্ট করতে প্রস্তুত এবং নিয়মাবলী মেনে চলব।
                  </span>
                </label>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => triggerAnimation('RETURNING TO STEP 1...', 'ইউজার তথ্য রিটার্ন করা হচ্ছে...', () => setStep(1), 600)}
                    className="w-1/3 py-3 rounded-xl bg-slate-900 border border-white/15 text-slate-300 font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    ← BACK
                  </button>
                  <button
                    onClick={handleStep2Next}
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-orbitron font-extrabold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                  >
                    PROCEED TO PAYMENT →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DYNAMIC PAYMENT DETAILS SCREEN */}
            {!animState.isLoading && step === 3 && (
              <div className="space-y-4 font-mono-tech text-xs">
                {/* Dynamic Theme Banner */}
                <div className={`p-4 rounded-xl bg-gradient-to-b ${details.bgGradient} border ${details.borderColor} shadow-xl space-y-3`}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className={`px-2.5 py-1 rounded-md bg-black/40 border ${details.borderColor} ${details.textColor} font-extrabold text-xs`}>
                      {details.badge}
                    </span>
                    <span className="text-white font-orbitron font-extrabold text-base">
                      {details.currency}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-300 text-[11px] font-bold block">{details.note}:</span>
                    <div className="p-3 rounded-lg bg-slate-950/90 border border-white/20 flex items-center justify-between gap-2 relative overflow-hidden">
                      {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && !isNumberUnlocked ? (
                        <div className="flex items-center justify-between w-full gap-2">
                          <div>
                            <div className="text-[10px] text-pink-400 font-bold uppercase flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              <span>Send Money Number (Blurred)</span>
                            </div>
                            <div className="text-base sm:text-lg font-mono font-black text-slate-400 filter blur-sm select-none tracking-widest">
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
                          <span className="text-base sm:text-lg font-mono font-extrabold text-white tracking-widest break-all">
                            {details.number}
                          </span>
                          <button
                            onClick={() => handleCopy(details.number, details.title)}
                            className={`ml-2 px-3 py-1.5 rounded-md ${details.btnBg} text-white font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer transition-transform active:scale-95`}
                          >
                            {copiedText === details.title ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>COPIED!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {paymentMethod === 'usdt' && (
                    <div className="p-3 bg-black/60 rounded-xl border border-white/10 flex items-center justify-center gap-3">
                      <QrCode className="w-12 h-12 text-emerald-400" />
                      <div className="text-[10px] text-slate-300">
                        <strong className="text-emerald-400 block">TRC20 Network Only</strong>
                        Verify address before sending. Instant automated verification.
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 bg-black/40 rounded-lg text-[11px] text-slate-200 border border-white/10">
                    💡 <strong>Instructions:</strong> {details.instruction}
                  </div>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-white/10 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>TradingView User:</span>
                    <strong className="text-white">{tradingViewUser}</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Sender Account:</span>
                    <strong className="text-white">{senderAccount}</strong>
                  </div>
                </div>

                <button
                  onClick={handleStep3Paid}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-slate-950 font-orbitron font-black text-xs tracking-wider shadow-xl shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>I HAVE SUCCESSFULLY PAID</span>
                </button>
              </div>
            )}

            {/* STEP 4: VERIFY TRANSACTION ID & PROOF */}
            {!animState.isLoading && step === 4 && (
              <div className="space-y-4 font-mono-tech text-xs">
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-orbitron font-extrabold text-white">
                    STEP 4: SUBMIT TRANSACTION ID / PROOF
                  </h3>
                  <p className="text-slate-400 text-[11px]">
                    Enter your transaction ID / TrxID or PIN from your payment receipt.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Transaction ID / TrxID / Reference PIN (Required):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9K823JXL41 or Binance Order ID"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Payment Screenshot / Proof Note (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sent from bKash app at 10:15 AM"
                      value={screenshotProof}
                      onChange={(e) => setScreenshotProof(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-orbitron font-black text-xs tracking-wider shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>SUBMIT ORDER & VERIFY ACCESS</span>
                </button>
              </div>
            )}

            {/* STEP 5: ORDER SUCCESS RECEIPT */}
            {!animState.isLoading && step === 5 && (
              <div className="space-y-4 font-mono-tech text-xs">
                <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/50 space-y-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-orbitron font-extrabold text-emerald-400">
                    ORDER SUBMITTED SUCCESSFULLY!
                  </h3>
                  <p className="text-slate-300 text-xs">
                    Your request has been received by Developer <strong>@XQ_owner</strong>.
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Order ID:</span>
                    <strong className="text-cyan-300 font-mono">{currentOrderId}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">TradingView Username:</span>
                    <strong className="text-white">{tradingViewUser}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Payment Method:</span>
                    <strong className="text-amber-300 uppercase">{paymentMethod}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">TrxID / Reference:</span>
                    <strong className="text-emerald-400 font-mono">{trxId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Activation Status:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                      PENDING VERIFICATION (5-15 MINS)
                    </span>
                  </div>
                </div>

                {/* Telegram Direct Activation CTA */}
                <a
                  href={`https://t.me/XQ_owner?text=${encodeURIComponent(
                    `Hello Developer, I have submitted payment order ${currentOrderId} for TradingView user '${tradingViewUser}'. TrxID: ${trxId}. Please activate my indicator access!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-orbitron font-extrabold text-xs tracking-wider shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>EXPRESS TELEGRAM VERIFICATION (@XQ_owner)</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  CLOSE WINDOW
                </button>
              </div>
            )}
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
                    পেমেন্ট নাম্বার আনলক করুন ({paymentMethod.toUpperCase()})
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
