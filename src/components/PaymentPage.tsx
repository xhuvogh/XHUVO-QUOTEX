import React, { useState } from 'react';
import { VIP_PLANS } from '../data/mockData';
import { ArrowLeft, Copy, Send, Zap, Check, ShieldCheck, Lock, Sparkles, PhoneCall, ChevronDown, ShoppingCart, ExternalLink, User, ArrowRight, RefreshCw, Tag } from 'lucide-react';
import { CustomGatewayModal } from './CustomGatewayModal';
import { useStore } from '../context/StoreContext';

interface PaymentPageProps {
  initialPlanId?: string;
  currency: 'USD' | 'BDT';
  setCurrency: (c: 'USD' | 'BDT') => void;
  onBackToStore: () => void;
}

type PaymentMethodKey = 'Binance' | 'USDT' | 'bKash' | 'Nagad';

const PAYMENT_METHODS: Record<PaymentMethodKey, {
  name: string;
  title: string;
  number: string;
  type: string;
  badge: string;
  badgeStyle: string;
  themeColor: string;
  borderColor: string;
  glowBg: string;
  buttonBg: string;
  qrData: string;
  scannerTitle: string;
  instructions: string;
}> = {
  Binance: {
    name: 'Binance',
    title: 'Binance Pay / UID',
    number: '884943053',
    type: 'BINANCE UID',
    badge: 'CRYPTO FAST',
    badgeStyle: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    themeColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/50',
    glowBg: 'bg-yellow-500/20',
    buttonBg: 'bg-yellow-500 hover:bg-yellow-400 text-slate-950',
    qrData: 'BINANCE_UID_884943053',
    scannerTitle: 'Binance Pay & UID QR',
    instructions: 'Binance অ্যাপের Pay or Send অপশনে গিয়ে 884943053 UID-তে পেমেন্ট করুন।'
  },
  USDT: {
    name: 'USDT',
    title: 'USDT TRC20 Wallet',
    number: 'TDyYRypjbefCLdRC9dkTW67HhfhPaEEWaL',
    type: 'TRC20 NETWORK',
    badge: 'GLOBAL CRYPTO',
    badgeStyle: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    themeColor: 'text-purple-300',
    borderColor: 'border-purple-500/50',
    glowBg: 'bg-purple-600/20',
    buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white',
    qrData: 'TDyYRypjbefCLdRC9dkTW67HhfhPaEEWaL',
    scannerTitle: 'USDT TRC20 Wallet QR',
    instructions: 'Tron TRC20 নেটওয়ার্ক সিলেক্ট করে TDyYRypjbefCLdRC9dkTW67HhfhPaEEWaL ওয়ালেটে ডলার ট্রান্সফার করুন।'
  },
  bKash: {
    name: 'bKash',
    title: 'বিকাশ পার্সোনাল',
    number: '01637743610',
    type: 'SEND MONEY',
    badge: 'INSTANT BDT',
    badgeStyle: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    themeColor: 'text-pink-400',
    borderColor: 'border-pink-500/50',
    glowBg: 'bg-pink-600/20',
    buttonBg: 'bg-pink-500 hover:bg-pink-400 text-white',
    qrData: 'bkash://sendmoney?msisdn=01637743610',
    scannerTitle: 'বিকাশ সেন্ড মানি QR Code',
    instructions: 'bKash অ্যাপ অথবা *247# ডায়াল করে 01637743610 নাম্বারে Send Money করুন।'
  },
  Nagad: {
    name: 'Nagad',
    title: 'নগদ পার্সোনাল',
    number: '01637743610',
    type: 'SEND MONEY',
    badge: 'FAST BDT',
    badgeStyle: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    themeColor: 'text-orange-400',
    borderColor: 'border-orange-500/50',
    glowBg: 'bg-orange-600/20',
    buttonBg: 'bg-orange-500 hover:bg-orange-400 text-white',
    qrData: 'nagad://sendmoney?msisdn=01637743610',
    scannerTitle: 'নগদ সেন্ড মানি QR Code',
    instructions: 'নগদ অ্যাপ অথবা *167# ডায়াল করে 01637743610 নাম্বারে Send Money করুন।'
  }
};

export const PaymentPage: React.FC<PaymentPageProps> = ({
  initialPlanId = 'xhuvoqx-infinity',
  currency,
  setCurrency,
  onBackToStore
}) => {
  const store = useStore();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  
  // User Credentials Form Inputs
  const [fullName, setFullName] = useState('');
  const [tvUsername, setTvUsername] = useState('');
  const [telegramHandle, setTelegramHandle] = useState('');
  
  // Checkout Steps: 'user_info' -> 'payment_checkout'
  const [checkoutStep, setCheckoutStep] = useState<'user_info' | 'payment_checkout'>('user_info');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodKey | null>(null);
  
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(true);
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Dynamic Prices from Store Context
  let dynamicPrice = store.prices[selectedPlanId] || { priceUSD: 400, priceBDT: 46000 };
  if (store.fridayDiscountEnabled) {
    if (selectedPlanId === 'xhuvoqx-v5') {
      dynamicPrice = { priceUSD: 40, priceBDT: 4600 };
    } else if (selectedPlanId === 'xhuvoqx-infinity') {
      dynamicPrice = { priceUSD: 80, priceBDT: 9200 };
    }
  }
  const baseUSD = dynamicPrice.priceUSD;
  const baseBDT = dynamicPrice.priceBDT;

  const finalUSD = Math.round(baseUSD * (1 - appliedDiscount / 100));
  const finalBDT = Math.round(baseBDT * (1 - appliedDiscount / 100));

  const selectedPlan = VIP_PLANS.find(p => p.id === selectedPlanId) || VIP_PLANS[1];
  const symbol = currency === 'USD' ? '$' : '৳';
  const priceDisplay = currency === 'USD' ? `${finalUSD}` : `${finalBDT.toLocaleString()}`;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const res = store.validatePromoCode(promoInput);
    if (res) {
      setAppliedDiscount(res.discountPercent);
      setPromoMessage(`✅ Code Applied! ${res.discountPercent}% Discount Granted.`);
    } else {
      setAppliedDiscount(0);
      setPromoMessage('❌ Invalid or expired promo code.');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && tvUsername.trim()) {
      setCheckoutStep('payment_checkout');
      setSelectedMethod(null);
    }
  };

  const activeMethodConfig = selectedMethod ? PAYMENT_METHODS[selectedMethod] : null;

  const handleSendTelegram = () => {
    const methodStr = selectedMethod ? PAYMENT_METHODS[selectedMethod].title : 'Web Gateway';
    const finalTrx = trxId.trim() || `XQ-${Math.floor(Math.random() * 89999 + 10000)}`;

    // Sync order to store backend context
    store.addOrder({
      customerName: fullName,
      emailOrTelegram: telegramHandle || `@${tvUsername}`,
      tradingViewUsername: tvUsername,
      indicatorId: selectedPlanId,
      indicatorName: selectedPlan.name,
      amountUSD: finalUSD,
      amountBDT: finalBDT,
      paymentMethod: methodStr,
      transactionId: finalTrx,
    });

    const text = encodeURIComponent(
      `Hello XHUVO QX Developer!\n` +
      `I have completed payment for indicator authorization:\n` +
      `👤 Full Name: ${fullName || 'Not provided'}\n` +
      `📊 TradingView Username: ${tvUsername || 'Not provided'}\n` +
      `✈️ Telegram Handle: ${telegramHandle || 'Not provided'}\n` +
      `📌 License Plan: ${selectedPlan.name} (${symbol}${priceDisplay})\n` +
      `💳 Payment Method: ${methodStr}\n` +
      `🔢 Transaction ID / Reference: ${finalTrx}`
    );
    window.open(`https://t.me/XQ_owner?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#040209] text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">

        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
          <button
            onClick={onBackToStore}
            className="px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-purple-200 hover:text-white font-mono text-xs font-bold transition-all flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>RETURN TO STORE</span>
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-purple-500/30 text-xs font-mono">
            <button
              type="button"
              onClick={() => setCurrency('BDT')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'BDT'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BDT ৳
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'USD'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD $
            </button>
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-purple-400 fill-current" />
            <span>XHUVO QX SECURE CHECKOUT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight">
            𝗫𝗛𝗨𝗩𝗢 𝗤𝗫 𝗜𝗡𝗗𝗜𝗖𝗔𝗧𝗢𝗥
          </h1>
          <p className="text-xs sm:text-sm text-purple-300 font-sans">
            Secure Payment Gateway for Instant TradingView Invite-Only Authorization
          </p>
        </div>

        {/* Order Summary Header Card */}
        <div className="rounded-2xl bg-[#0d071b] border border-purple-500/30 overflow-hidden shadow-2xl">
          <button
            type="button"
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="w-full px-5 py-3.5 bg-purple-950/40 hover:bg-purple-900/40 flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2 text-xs font-mono">
              <ShoppingCart className="w-4 h-4 text-purple-400" />
              <span className="text-slate-200 font-bold">Indicator Order Summary</span>
              <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${showOrderSummary ? 'rotate-180' : ''}`} />
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono mr-2">Total Price:</span>
              <span className="text-lg font-black font-mono text-purple-300">{symbol}{priceDisplay}</span>
            </div>
          </button>

          {showOrderSummary && (
            <div className="p-4 border-t border-purple-500/20 bg-slate-950/60 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/10">
                <div>
                  <span className="font-bold text-white block">{selectedPlan.name}</span>
                  <span className="text-[11px] text-slate-400 font-sans block">{selectedPlan.description}</span>
                </div>
                <span className="font-bold text-purple-300 text-sm">{symbol}{priceDisplay}</span>
              </div>

              {/* Plan Switcher Tabs */}
              <div className="pt-1">
                <span className="text-[10px] text-purple-300 block mb-1.5 uppercase font-bold">Select License Edition:</span>
                <div className="grid grid-cols-3 gap-2">
                  {VIP_PLANS.map(p => {
                    const isSel = p.id === selectedPlanId;
                    const pPrice = currency === 'USD' ? `$${p.priceUSD}` : `৳${p.priceBDT.toLocaleString()}`;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          isSel
                            ? 'bg-purple-600/30 border-purple-400 text-white font-bold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="block text-[11px] truncate">{p.name}</span>
                        <span className="block text-xs font-mono text-purple-300 font-black">{pPrice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STEP 1: USER DETAILS ENTRY FORM */}
        {checkoutStep === 'user_info' && (
          <div className="bg-[#0b0616] border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
            <div className="p-3.5 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-center">
              <p className="text-xs text-purple-300 font-bold uppercase tracking-wider font-mono">
                📝 STEP 1: ENTER YOUR TRADINGVIEW & TELEGRAM DETAILS
              </p>
            </div>

            <form onSubmit={handleUserInfoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1 font-mono">
                  1. TradingView Username (REQUIRED FOR SCRIPT ACCESS):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. xhuvo_trader"
                  value={tvUsername}
                  onChange={(e) => setTvUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/40 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1 font-mono">
                  2. Telegram Username / Handle:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. @xhuvo_trader"
                  value={telegramHandle}
                  onChange={(e) => setTelegramHandle(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/40 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1 font-mono">
                  3. Your Full Name (Customer Name):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahim Ahmed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/40 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black font-mono text-sm shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center space-x-2"
              >
                <span>PROCEED TO PAYMENT 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: CUSTOMER PAYMENT CHECKOUT PAGE */}
        {checkoutStep === 'payment_checkout' && (
          <div className="bg-[#0a0514] border border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
            
            {/* Amount & Highlighted Customer Name Box */}
            <div className="space-y-4 text-center">
              
              {/* Top Amount Display Box */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/30 flex items-center justify-between shadow-lg font-mono">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">প্রদেয় মোট পরিমাণ:</span>
                <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono">{symbol}{priceDisplay}</span>
              </div>

              {/* Large Highlighted Customer Name Card */}
              <div className="bg-purple-950/40 p-4 sm:p-5 rounded-2xl border-l-4 border-purple-400 text-left space-y-1.5 shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-purple-300 uppercase font-bold tracking-wider font-mono">গ্রাহক:</p>
                  <button
                    onClick={() => setCheckoutStep('user_info')}
                    className="text-[10px] text-slate-400 hover:text-white underline font-mono flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>তথ্য পরিবর্তন করুন</span>
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 tracking-wide">
                  {fullName}
                </h2>

                <div className="text-xs text-slate-300 font-mono pt-1 space-y-0.5">
                  <p>📊 TradingView: <span className="text-purple-300 font-bold">{tvUsername}</span></p>
                  <p>✈️ Telegram: <span className="text-purple-300 font-bold">{telegramHandle}</span></p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed pt-2 border-t border-purple-500/20">
                  নিচের মাধ্যমগুলো থেকে যেকোনো একটি সিলেক্ট করে পেমেন্ট সম্পন্ন করুন।
                </p>
              </div>
            </div>

            {/* SELECTION VIEW: 4 Payment Methods */}
            {!selectedMethod && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
                  পেমেন্ট মেথড সিলেক্ট করুন:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['Binance', 'USDT', 'bKash', 'Nagad'] as const).map((method) => {
                    const cfg = PAYMENT_METHODS[method];
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setSelectedMethod(method)}
                        className={`w-full bg-slate-950 hover:bg-purple-950/50 border ${cfg.borderColor} transition-all duration-300 rounded-2xl p-4 flex items-center justify-between group shadow-lg`}
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          <div className={`w-11 h-11 rounded-xl ${cfg.glowBg} border border-purple-500/30 flex items-center justify-center font-bold font-mono text-sm text-white shrink-0`}>
                            {method.slice(0, 2)}
                          </div>
                          <div className="text-left min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-bold text-white group-hover:text-purple-300 transition">{cfg.title}</p>
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono truncate">{cfg.number}</p>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold border ${cfg.badgeStyle}`}>
                          {cfg.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Web Gateway Trigger Button */}
                <div className="pt-4 border-t border-purple-500/20">
                  <button
                    type="button"
                    onClick={() => setIsGatewayModalOpen(true)}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-900/60 hover:from-purple-800 hover:to-indigo-800 border border-purple-500/50 text-purple-200 font-bold font-mono text-xs transition-all flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4 text-purple-400" />
                    <span>অথবা অনলাইন ওয়েব পেমেন্ট গেটওয়ে দিয়ে পে করুন (pay.xhuvoqx.com)</span>
                  </button>
                </div>
              </div>
            )}

            {/* DETAILS VIEW: Selected Payment Method Scanner & Info */}
            {selectedMethod && activeMethodConfig && (
              <div className="space-y-4 animate-fadeIn">
                <button
                  type="button"
                  onClick={() => setSelectedMethod(null)}
                  className="text-xs text-purple-200 hover:text-white flex items-center space-x-1.5 font-bold transition bg-purple-950/60 px-3.5 py-2 rounded-xl border border-purple-500/40"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>অন্য মেথড সিলেক্ট করুন</span>
                </button>

                {/* Instruction Box */}
                <div className="bg-purple-950/50 rounded-2xl p-4 text-center border border-purple-500/30 space-y-1">
                  <p className="text-xs sm:text-sm text-slate-100 font-medium">
                    {activeMethodConfig.instructions}
                  </p>
                </div>

                {/* QR Scanner & Address Box */}
                <div className="bg-slate-950 p-5 rounded-2xl text-center space-y-4 border border-purple-500/30 relative overflow-hidden">
                  
                  {/* Scanner Header Badge */}
                  <div className="py-1 px-3.5 rounded-lg text-xs font-mono font-bold inline-block bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {activeMethodConfig.scannerTitle}
                  </div>

                  {/* QR Code Container */}
                  <div className="bg-white p-3 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center shadow-2xl relative border-2 border-slate-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(activeMethodConfig.qrData)}`}
                      alt="Payment QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans">
                    অ্যাপের 'স্ক্যান কিউআর' অপশন দিয়ে স্ক্যান করুন অথবা নিচের নাম্বার কপি করুন
                  </p>

                  {/* Number / Address Box */}
                  <div className="bg-[#0b0615] p-4 rounded-xl border border-purple-500/30 text-left space-y-1">
                    <p className="text-[10px] text-purple-300 uppercase tracking-wider font-bold font-mono">
                      Account Number / UID / Address:
                    </p>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs sm:text-sm font-mono font-black text-white truncate break-all select-all">
                        {activeMethodConfig.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(activeMethodConfig.number)}
                        className="text-xs px-3.5 py-2 rounded-xl font-bold shrink-0 bg-purple-600 hover:bg-purple-500 text-white font-mono transition-all flex items-center space-x-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copied ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Transaction ID input (Optional) */}
                  <div className="text-left space-y-1 pt-2 border-t border-purple-500/20">
                    <label className="text-[11px] text-slate-300 font-mono block">
                      Transaction ID / Reference (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TrxID or Order ID"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  {/* Send Telegram Button */}
                  <button
                    type="button"
                    onClick={handleSendTelegram}
                    className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black font-mono py-4 rounded-2xl transition duration-300 text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30"
                  >
                    <Send className="w-4 h-4 fill-current" />
                    <span>পেমেন্ট করে টেলিগ্রামে স্ক্রিনশট দিন 💬</span>
                  </button>

                </div>
              </div>
            )}

            {/* Footer Telegram Support Note */}
            <div className="pt-4 border-t border-purple-500/20 text-center space-y-1 font-mono text-[11px] text-slate-400">
              <p>Direct Developer Contact: <a href="https://t.me/XQ_owner" target="_blank" rel="noreferrer" className="text-purple-300 font-bold underline">@XQ_owner</a></p>
              <p className="text-[10px] text-purple-400">POWERED BY XHUVO ECOSYSTEM</p>
            </div>

          </div>
        )}

      </div>

      {/* Custom Gateway Modal */}
      <CustomGatewayModal
        isOpen={isGatewayModalOpen}
        onClose={() => setIsGatewayModalOpen(false)}
        planName={selectedPlan.name}
        amountUSD={selectedPlan.priceUSD}
        amountBDT={selectedPlan.priceBDT}
        onSuccess={(genTrx) => {
          setTrxId(genTrx);
        }}
      />
    </div>
  );
};
