import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface BkashSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amountBDT: number;
  onSuccess: (trxId: string, phone: string) => void;
}

export const BkashSandboxModal: React.FC<BkashSandboxModalProps> = ({
  isOpen,
  onClose,
  planName,
  amountBDT,
  onSuccess,
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'pin' | 'processing' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [generatedTrxId, setGeneratedTrxId] = useState('');

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 11) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setStep('pin');
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length >= 5) {
      setStep('processing');
      const randomTrx = '9B' + Math.floor(10000000 + Math.random() * 90000000).toString();
      setGeneratedTrxId(randomTrx);

      setTimeout(() => {
        setStep('success');
      }, 1800);
    }
  };

  const handleFinish = () => {
    onSuccess(generatedTrxId, phone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(226,19,110,0.5)] border border-pink-500/30 flex flex-col font-sans">
        
        {/* URL Address Bar Frame */}
        <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800">
          <div className="flex items-center space-x-1.5 min-w-0">
            <Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="truncate text-slate-300">https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/payment/create</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* bKash Header Pink Banner */}
        <div className="bg-[#e2136e] p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-black text-xl font-mono">
              bK
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-90 block">OFFICIAL ONLINE CHECKOUT</span>
              <h2 className="text-xl font-black font-mono tracking-tight">bKash Payment</h2>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] opacity-80 block uppercase">AMOUNT DUE</span>
            <span className="text-xl font-black">৳ {amountBDT.toLocaleString()}</span>
          </div>
        </div>

        {/* Merchant & Order Info Bar */}
        <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">MERCHANT NAME</span>
            <strong className="text-slate-900">XHUVO QX INDICATOR STORE</strong>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase block">ITEM LICENSE</span>
            <strong className="text-[#e2136e]">{planName}</strong>
          </div>
        </div>

        {/* Modal Body Steps */}
        <div className="p-6 bg-white space-y-5">

          {/* STEP 1: Phone Number */}
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Your bKash Account Number:
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01700000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#e2136e] rounded-xl p-3 text-base font-mono font-bold text-slate-900 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 font-bold bg-slate-200 px-2 py-1 rounded-md">
                    BDT ৳
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  By clicking confirm, you agree to the terms and conditions of bKash payment gateway.
                </p>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs font-mono transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#e2136e] hover:bg-[#c90f60] text-white font-black text-xs font-mono transition-all shadow-lg shadow-pink-500/30 flex items-center justify-center space-x-1.5"
                >
                  <span>CONFIRM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Verification Code / OTP */}
          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-xs text-[#e2136e] font-mono">
                Verification code sent to <strong>{phone}</strong> (Enter any 6-digit code e.g. 123456)
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Enter bKash Verification Code (OTP):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#e2136e] rounded-xl p-3 text-center text-lg font-mono font-bold tracking-widest text-slate-900 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs font-mono transition-colors"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#e2136e] hover:bg-[#c90f60] text-white font-black text-xs font-mono transition-all shadow-lg shadow-pink-500/30 flex items-center justify-center space-x-1.5"
                >
                  <span>VERIFY OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Enter PIN */}
          {step === 'pin' && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Enter Your 5-Digit bKash PIN:
                </label>
                <input
                  type="password"
                  required
                  placeholder="• • • • •"
                  maxLength={5}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#e2136e] rounded-xl p-3 text-center text-2xl font-mono font-bold tracking-widest text-slate-900 focus:outline-none transition-colors"
                />
                <p className="text-[11px] text-slate-500">
                  bKash or merchant will never ask for your PIN.
                </p>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs font-mono transition-colors"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#e2136e] hover:bg-[#c90f60] text-white font-black text-xs font-mono transition-all shadow-lg shadow-pink-500/30 flex items-center justify-center space-x-1.5"
                >
                  <span>PAY ৳ {amountBDT.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Processing State */}
          {step === 'processing' && (
            <div className="py-8 text-center space-y-3 font-mono">
              <Loader2 className="w-10 h-10 text-[#e2136e] animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-800">Processing Payment via bKash Gateway...</p>
              <p className="text-[11px] text-slate-500">Connecting to checkout.sandbox.bka.sh/v1.2.0-beta</p>
            </div>
          )}

          {/* STEP 5: Success Confirmation */}
          {step === 'success' && (
            <div className="py-4 text-center space-y-4 font-mono">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-emerald-600 uppercase font-black tracking-widest block">PAYMENT SUCCESSFUL!</span>
                <h3 className="text-xl font-black text-slate-900">৳ {amountBDT.toLocaleString()} PAID</h3>
                <p className="text-xs text-slate-600 font-sans">
                  bKash Transaction ID: <strong className="text-slate-900 font-mono">{generatedTrxId}</strong>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-left text-[11px] text-slate-700 space-y-1">
                <p><strong>Merchant:</strong> XHUVO QX INDICATOR STORE</p>
                <p><strong>Plan:</strong> {planName}</p>
                <p><strong>Account:</strong> {phone}</p>
                <p><strong>Status:</strong> Approved & Auto-Authorized</p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs font-mono shadow-lg transition-all"
              >
                COMPLETE & AUTHORIZE SCRIPT
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Sandbox Gateway</span>
          </span>
          <span>v1.2.0-beta</span>
        </div>

      </div>
    </div>
  );
};
