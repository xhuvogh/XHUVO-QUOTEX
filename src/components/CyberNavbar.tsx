import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Send, Menu, X, Sparkles, Activity, Lock, ShoppingCart, UserCheck, ShieldAlert } from 'lucide-react';

interface CyberNavbarProps {
  onOpenTelegramModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  onOpenTelegramModal,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);
  const [tempId, setTempId] = useState('');
  
  const [isVerified, setIsVerified] = useState(false);
  const [telegramId, setTelegramId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verified = localStorage.getItem('xhuvo_telegram_verified') === 'true';
      const tid = localStorage.getItem('xhuvo_telegram_id');
      setIsVerified(verified);
      if (tid) setTelegramId(tid);
    }
  }, []);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempId.trim()) {
        const id = tempId.trim().startsWith('@') ? tempId.trim() : '@' + tempId.trim();
        localStorage.setItem('xhuvo_telegram_verified', 'true');
        localStorage.setItem('xhuvo_telegram_id', id);
        setIsVerified(true);
        setTelegramId(id);
        setVerifyModalOpen(false);
    }
  };

  const handleVerifyReset = () => {
    localStorage.removeItem('xhuvo_telegram_verified');
    localStorage.removeItem('xhuvo_telegram_id');
    setIsVerified(false);
    setTelegramId('');
    setVerifyModalOpen(false);
  };

  const navItems = [
    { label: 'OVERVIEW', id: 'overview' },
    { label: 'INDICATORS', id: 'indicators' },
    { label: 'INFINITY ULTIMATE', id: 'infinity-ultimate', highlight: true },
    { label: 'LIVE SIMULATOR', id: 'live-simulator' },
    { label: 'PRICING', id: 'pricing' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-[#030712]/80 backdrop-blur-md">
      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="font-orbitron font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5">
              <span className="text-red-500 text-glow-red animate-pulse">XHUVO</span>
              <span>QX</span>
              <span className="text-xs font-mono-tech px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                OFFICIAL
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tech uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                item.highlight
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/40 hover:bg-purple-500/20 hover:border-purple-400 shadow-sm shadow-purple-500/20'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-white/5'
              }`}
            >
              {item.highlight && <Sparkles className="w-3 h-3 inline mr-1 text-purple-400" />}
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Telegram button & Verified Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setVerifyModalOpen(true)}
            className={`px-3 py-2 rounded-lg font-mono-tech text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isVerified
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 shadow-md shadow-emerald-500/10'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isVerified ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate max-w-[90px]">{telegramId}</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                VERIFY ID
              </>
            )}
          </button>
          
          <button
            onClick={onOpenTelegramModal}
            className="relative group overflow-hidden rounded-lg p-[1px] font-mono-tech text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 animate-pulse"></span>
            <span className="relative flex items-center gap-2 px-4 py-2 bg-slate-950 rounded-[7px] text-cyan-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              BUY INDICATOR
            </span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-cyan-500/30 px-4 py-4 space-y-3 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-mono-tech text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 border border-transparent hover:border-cyan-500/20"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setVerifyModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center gap-2 py-3 border font-mono-tech font-bold text-xs rounded-lg ${
                isVerified 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                  : 'bg-slate-800/50 text-slate-300 border-slate-700/50'
              }`}
            >
              {isVerified ? (
                <>
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  VERIFIED: {telegramId}
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  VERIFY ID
                </>
              )}
            </button>
            <button
              onClick={() => {
                onOpenTelegramModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-mono-tech font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              BUY INDICATOR
            </button>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-cyan-500/10 relative">
            <button 
              onClick={() => setVerifyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${isVerified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                {isVerified ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-orbitron font-bold text-white">
                {isVerified ? 'Verification Status' : 'Verify Identity'}
              </h3>
            </div>

            {isVerified ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-200 text-sm font-mono-tech">
                  You are currently verified as:<br/>
                  <span className="text-emerald-400 font-bold text-lg">{telegramId}</span>
                </div>
                <button
                  onClick={handleVerifyReset}
                  className="w-full py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 font-mono-tech text-xs font-bold transition-all cursor-pointer"
                >
                  RESET VERIFICATION
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <p className="text-slate-300 text-xs font-mono-tech">
                  Enter your Telegram ID to verify your status.
                </p>
                <div>
                  <input
                    type="text"
                    value={tempId}
                    onChange={(e) => setTempId(e.target.value)}
                    placeholder="@username"
                    required
                    className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono-tech"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono-tech text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  VERIFY NOW
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
