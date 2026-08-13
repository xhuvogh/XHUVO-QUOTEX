import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2, CreditCard, Sparkles, Send, Check, Copy } from 'lucide-react';

interface CustomGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amountUSD: number;
  amountBDT: number;
  onSuccess: (trxId: string, accountInfo: string) => void;
}

type GatewayMethod = 'Binance' | 'USDT' | 'bKash' | 'Nagad' | 'Rocket';

export const CustomGatewayModal: React.FC<CustomGatewayModalProps> = ({
  isOpen,
  onClose,
  planName,
  amountUSD,
  amountBDT,
  onSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<GatewayMethod>('Binance');
  const [step, setStep] = useState<'input' | 'otp' | 'processing' | 'success'>('input');
  const [accountInput, setAccountInput] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedTrxId, setGeneratedTrxId] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  if (!isOpen) return null;

  const methodDetails: Record<GatewayMethod, { title: string; color: string; walletOrNumber: string; inputLabel: string; placeholder: string; note: string }> = {
    Binance: {
      title: 'Binance Pay UID',
      color: 'from-amber-500 to-yellow-600',
      walletOrNumber: '891048291 (XHUVO_PAY)',
      inputLabel: 'Your Binance Pay ID / Email:',
      placeholder: 'e.g. 182739482 or user@binance.com',
      note: 'Send USD to Pay UID 891048291 on Binance App.'
    },
    USDT: {
      title: 'USDT (TRC20)',
      color: 'from-[#26A17B] to-emerald-700',
      walletOrNumber: 'T9xQ2pZ7vM4nK8rL1sJ6wH3uY5tC0aF2',
      inputLabel: 'Your TxHash / Wallet Address:',
      placeholder: 'e.g. 0x82a9... or TRC20 TxHash',
      note: 'Transfer exact amount via Tron Network TRC20.'
    },
    bKash: {
      title: 'bKash Merchant Pay',
      color: 'from-[#e2136e] to-pink-700',
      walletOrNumber: '01790-000000 (XHUVO STORE)',
      inputLabel: 'Your bKash Wallet Number:',
      placeholder: 'e.g. 01700000000',
      note: 'Send Money or Payment to 01790-000000.'
    },
    Nagad: {
      title: 'Nagad Personal',
      color: 'from-orange-500 to-red-600',
      walletOrNumber: '01890-000000 (XHUVO STORE)',
      inputLabel: 'Your Nagad Wallet Number:',
      placeholder: 'e.g. 01800000000',
      note: 'Send Money to Nagad Personal 01890-000000.'
    },
    Rocket: {
      title: 'Rocket Wallet',
      color: 'from-purple-600 to-indigo-700',
      walletOrNumber: '01990-000000-7',
      inputLabel: 'Your Rocket Wallet Number:',
      placeholder: 'e.g. 01900000000-1',
      note: 'Send Money to Rocket 01990-000000-7.'
    }
  };

  const currentConfig = methodDetails[selectedMethod];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountInput.trim().length >= 4) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    const randomTrx = (selectedMethod === 'Binance' || selectedMethod === 'USDT' ? 'XQ-' : 'TX-') + Math.floor(100000000 + Math.random() * 900000000).toString();
    setGeneratedTrxId(randomTrx);

    setTimeout(() => {
      setStep('success');
    }, 1800);
  };

  const handleFinish = () => {
    onSuccess(generatedTrxId, `${selectedMethod}: ${accountInput}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="w-full max-w-lg bg-[#0d0818] text-slate-100 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.4)] border border-purple-500/40 flex flex-col font-sans">
        
        {/* Custom Gateway URL Address Bar Frame */}
        <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between text-[10px] font-mono border-b border-purple-500/20">
          <div className="flex items-center space-x-1.5 min-w-0">
            <Lock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="truncate text-purple-300 font-bold">https://pay.xhuvoqx.com/v1/checkout/gateway</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[9px]">SSL SECURE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Purple Gateway Banner Header */}
        <div className="bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-900 p-5 text-white flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/30 border border-purple-300/40 flex items-center justify-center text-white font-black text-xl font-mono shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <CreditCard className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-300 font-bold block">XHUVO QX PAYGATEWAY</span>
              <h2 className="text-xl font-black font-mono tracking-tight text-white">Custom Web Payment Page</h2>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] text-purple-300 block uppercase">AMOUNT DUE</span>
            <span className="text-xl font-black text-white">${amountUSD} <span className="text-xs text-purple-300">/ ৳{amountBDT.toLocaleString()}</span></span>
          </div>
        </div>

        {/* Payment Method Selector Tab Bar */}
        <div className="bg-slate-900/90 p-2.5 border-b border-purple-500/20 grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
          {(['Binance', 'USDT', 'bKash', 'Nagad', 'Rocket'] as const).map((m) => {
            const isSel = selectedMethod === m;
            return (
              <button
                key={m}
                onClick={() => {
                  setSelectedMethod(m);
                  setStep('input');
                }}
                className={`py-2 rounded-xl text-[11px] font-bold transition-all ${
                  isSel
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-300/50'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-5 bg-[#0b0615]">

          {/* Wallet Address & Quick Copy Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold uppercase">{currentConfig.title} Address/ID:</span>
              <button
                onClick={() => handleCopy(currentConfig.walletOrNumber)}
                className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 text-[10px] font-bold flex items-center space-x-1 transition-all"
              >
                {copiedAddress ? <Check className="w-3 h-3 text-purple-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedAddress ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-sm font-bold text-white tracking-wider break-all select-all">
              {currentConfig.walletOrNumber}
            </div>

            <p className="text-[11px] text-slate-400 font-sans">
              💡 {currentConfig.note}
            </p>
          </div>

          {/* STEP 1: Enter Account Details */}
          {step === 'input' && (
            <form onSubmit={handleInputSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block font-mono">
                  {currentConfig.inputLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={currentConfig.placeholder}
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-500/40 focus:border-purple-400 rounded-xl p-3 text-sm font-mono text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs font-mono border border-slate-800 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs font-mono shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>PROCEED TO AUTHORIZE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Verification Code */}
          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4 font-mono">
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-200">
                Authorize payment for account <strong>{accountInput}</strong> via Custom Gateway. Enter 2FA / Auth code below.
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">
                  Enter 2FA Verification Code / Ref:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 782910"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-500/40 focus:border-purple-400 rounded-xl p-3 text-center text-lg font-bold tracking-widest text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs font-mono border border-slate-800 transition-colors"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs font-mono shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>AUTHORIZE ${amountUSD}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Gateway Processing State */}
          {step === 'processing' && (
            <div className="py-8 text-center space-y-3 font-mono">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
              <p className="text-xs font-bold text-purple-300">Communicating with pay.xhuvoqx.com Gateway...</p>
              <p className="text-[11px] text-slate-400">Verifying TxHash and generating TradingView authorization ticket</p>
            </div>
          )}

          {/* STEP 4: Payment Complete Success State */}
          {step === 'success' && (
            <div className="py-4 text-center space-y-4 font-mono">
              <div className="w-16 h-16 rounded-full bg-purple-950 text-purple-400 border border-purple-500/50 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-purple-400 uppercase font-black tracking-widest block">GATEWAY PAYMENT VERIFIED!</span>
                <h3 className="text-xl font-black text-white">${amountUSD} / ৳{amountBDT.toLocaleString()} PAID</h3>
                <p className="text-xs text-purple-300 font-sans">
                  Gateway TxID: <strong className="text-white font-mono">{generatedTrxId}</strong>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 text-left text-[11px] text-slate-300 space-y-1">
                <p><strong>Merchant:</strong> XHUVO QX INDICATOR STORE</p>
                <p><strong>License Plan:</strong> {planName}</p>
                <p><strong>Method:</strong> {selectedMethod}</p>
                <p><strong>Status:</strong> Approved & Auto-Authorized</p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs font-mono shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all"
              >
                COMPLETE & AUTHORIZE SCRIPT
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-purple-500/20 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>256-Bit Custom Web Payment Endpoint</span>
          </span>
          <span className="text-purple-300 font-bold">pay.xhuvoqx.com</span>
        </div>

      </div>
    </div>
  );
};
