import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  UserX,
  CheckCircle,
  AlertTriangle,
  Lock,
  Search,
  Trash2,
  RefreshCw,
  Eye,
  Check,
  Send,
  UserCheck,
  SlidersHorizontal,
  Tag,
  CreditCard,
  Save,
  Sparkles
} from 'lucide-react';
import { OrderRecord } from './CheckoutPaymentModal';
import { getSiteSettings, saveSiteSettings } from '../lib/settingsStore';
import { SiteSettings } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [blacklistedUsers, setBlacklistedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'BLACKLIST' | 'SETTINGS'>('PENDING');

  const [newBlacklistName, setNewBlacklistName] = useState('');
  const [viewScreenshot, setViewScreenshot] = useState<string | null>(null);

  // Site settings state for admin edit
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(getSiteSettings());
  const [settingsSaveNotice, setSettingsSaveNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
      setSettingsForm(getSiteSettings());
    }
  }, [isOpen]);

  const loadData = () => {
    // Load Orders
    const ordersRaw = localStorage.getItem('xhuvo_orders');
    if (ordersRaw) {
      try {
        setOrders(JSON.parse(ordersRaw));
      } catch (err) {
        console.error(err);
      }
    } else {
      setOrders([]);
    }

    // Load Blacklist
    const blacklistRaw = localStorage.getItem('xhuvo_blacklisted_users');
    if (blacklistRaw) {
      try {
        setBlacklistedUsers(JSON.parse(blacklistRaw));
      } catch (err) {
        console.error(err);
      }
    } else {
      setBlacklistedUsers([]);
    }
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'xhuvo2026' || passwordInput === 'admin' || passwordInput === 'owner') {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const updateOrderStatus = (orderId: string, status: 'APPROVED' | 'REJECTED') => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status };
      }
      return order;
    });

    setOrders(updated);
    localStorage.setItem('xhuvo_orders', JSON.stringify(updated));

    // If rejected, option to blacklist
    if (status === 'REJECTED') {
      const targetOrder = orders.find(o => o.id === orderId);
      if (targetOrder && targetOrder.tradingViewUsername) {
        blacklistUsername(targetOrder.tradingViewUsername);
      }
    }
  };

  const blacklistUsername = (username: string) => {
    const cleaned = username.trim();
    if (!cleaned) return;
    if (!blacklistedUsers.includes(cleaned)) {
      const updated = [...blacklistedUsers, cleaned];
      setBlacklistedUsers(updated);
      localStorage.setItem('xhuvo_blacklisted_users', JSON.stringify(updated));
    }
  };

  const removeBlacklist = (username: string) => {
    const updated = blacklistedUsers.filter(u => u !== username);
    setBlacklistedUsers(updated);
    localStorage.setItem('xhuvo_blacklisted_users', JSON.stringify(updated));
  };

  const handleAddBlacklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlacklistName.trim()) {
      blacklistUsername(newBlacklistName.trim());
      setNewBlacklistName('');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(settingsForm);
    setSettingsSaveNotice(true);
    setTimeout(() => setSettingsSaveNotice(false), 3000);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.tradingViewUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trxIdOrPin.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'PENDING') return order.status === 'PENDING' && matchesSearch;
    if (activeTab === 'APPROVED') return order.status === 'APPROVED' && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md animate-fadeIn p-3 sm:p-6 flex items-start sm:items-center justify-center min-h-screen">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#090d16] border border-cyan-500/40 p-5 sm:p-8 shadow-2xl shadow-cyan-500/20 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-orbitron font-extrabold text-white flex items-center gap-2">
              XHUVO QX ADMIN & VERIFICATION PORTAL
            </h3>
            <p className="text-xs text-slate-400 font-mono-tech">
              Developer Channel & License Activation Dashboard
            </p>
          </div>
        </div>

        {/* LOGIN FORM IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4 py-8">
            <div className="text-center space-y-2">
              <Lock className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
              <h4 className="text-lg font-orbitron font-bold text-white">DEVELOPER AUTHENTICATION</h4>
              <p className="text-xs text-slate-400 font-mono-tech">
                Enter admin passcode (Default: <code className="text-cyan-300">xhuvo2026</code>)
              </p>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-mono-tech text-center">
                ❌ Invalid passcode. Please try again.
              </div>
            )}

            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter passcode..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-white font-mono-tech text-center text-sm focus:outline-none focus:border-cyan-400"
              required
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-orbitron font-bold text-xs tracking-wider cursor-pointer shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-transform"
            >
              ACCESS ADMIN DASHBOARD
            </button>
          </form>
        ) : (
          /* ADMIN DASHBOARD CONTENT */
          <div className="space-y-6">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 font-mono-tech">
                <div className="text-[10px] text-slate-400 uppercase">Total Orders</div>
                <div className="text-xl font-bold text-white mt-0.5">{orders.length}</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 font-mono-tech">
                <div className="text-[10px] text-amber-300 uppercase">Pending Review</div>
                <div className="text-xl font-bold text-amber-400 mt-0.5">
                  {orders.filter(o => o.status === 'PENDING').length}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono-tech">
                <div className="text-[10px] text-emerald-300 uppercase">Approved Licenses</div>
                <div className="text-xl font-bold text-emerald-400 mt-0.5">
                  {orders.filter(o => o.status === 'APPROVED').length}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 font-mono-tech">
                <div className="text-[10px] text-red-300 uppercase">Blacklisted TV Users</div>
                <div className="text-xl font-bold text-red-400 mt-0.5">{blacklistedUsers.length}</div>
              </div>
            </div>

            {/* Navigation Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('PENDING')}
                  className={`px-4 py-2 rounded-xl font-mono-tech text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'PENDING'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Pending ({orders.filter(o => o.status === 'PENDING').length})
                </button>

                <button
                  onClick={() => setActiveTab('APPROVED')}
                  className={`px-4 py-2 rounded-xl font-mono-tech text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'APPROVED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Approved ({orders.filter(o => o.status === 'APPROVED').length})
                </button>

                <button
                  onClick={() => setActiveTab('BLACKLIST')}
                  className={`px-4 py-2 rounded-xl font-mono-tech text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'BLACKLIST'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Blacklist Manager ({blacklistedUsers.length})
                </button>

                <button
                  onClick={() => setActiveTab('SETTINGS')}
                  className={`px-4 py-2 rounded-xl font-mono-tech text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'SETTINGS'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-purple-400" />
                  Site Discounts & Prices
                </button>
              </div>

              {(activeTab === 'PENDING' || activeTab === 'APPROVED') && (
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search order or username..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/20 text-xs font-mono-tech text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}
            </div>

            {/* TAB CONTENT: ORDERS LIST */}
            {activeTab !== 'BLACKLIST' && (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {filteredOrders.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 font-mono-tech text-xs">
                    No orders found in this section.
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/40 transition-colors font-mono-tech text-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-cyan-300 text-sm">{order.id}</span>
                          <span className="text-slate-400">({order.timestamp})</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.status === 'PENDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                        <div>
                          <span className="text-slate-500">TradingView User:</span>{' '}
                          <strong className="text-white text-sm bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                            {order.tradingViewUsername}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500">Email:</span> <span className="text-slate-200">{order.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Plan:</span> <span className="text-cyan-300 font-bold">{order.plan}</span> ({order.price})
                        </div>
                        <div>
                          <span className="text-slate-500">Method:</span> <span className="text-amber-300 font-bold">{order.paymentMethod}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Sender Account:</span> <span className="text-slate-200">{order.senderAccount}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">TrxID / PIN:</span>{' '}
                          <strong className="text-emerald-400 font-bold uppercase">{order.trxIdOrPin}</strong>
                        </div>
                      </div>

                      {order.screenshotUrl && (
                        <div className="pt-2">
                          <button
                            onClick={() => setViewScreenshot(order.screenshotUrl || null)}
                            className="px-2.5 py-1 rounded bg-slate-900 border border-white/20 text-[11px] text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View Payment Screenshot Proof
                          </button>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        {order.status === 'PENDING' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'APPROVED')}
                            className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            Approve & Activate VIP Access
                          </button>
                        )}

                        <button
                          onClick={() => updateOrderStatus(order.id, 'REJECTED')}
                          className="px-3 py-2 rounded-lg bg-red-500/20 border border-red-500/50 hover:bg-red-500/30 text-red-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <UserX className="w-4 h-4" />
                          Reject & Blacklist Username
                        </button>

                        <a
                          href={`https://t.me/XQ_owner?text=${encodeURIComponent(
                            `Hello @${order.tradingViewUsername}! Order ${order.id} status is updated to ${order.status}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Message User
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB CONTENT: BLACKLIST MANAGER */}
            {activeTab === 'BLACKLIST' && (
              <div className="space-y-4 font-mono-tech text-xs">
                <form onSubmit={handleAddBlacklist} className="flex gap-2">
                  <input
                    type="text"
                    value={newBlacklistName}
                    onChange={(e) => setNewBlacklistName(e.target.value)}
                    placeholder="Enter TradingView Username to Blacklist..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-red-500/40 text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <UserX className="w-4 h-4" />
                    Blacklist
                  </button>
                </form>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                  <div className="text-slate-400 font-bold mb-2">BLACKVIEW TRADINGVIEW USERNAMES ({blacklistedUsers.length}):</div>
                  {blacklistedUsers.length === 0 ? (
                    <div className="text-slate-500 text-center py-4">No blacklisted usernames yet.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {blacklistedUsers.map((user) => (
                        <div
                          key={user}
                          className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-between text-red-200"
                        >
                          <span className="font-bold">@{user}</span>
                          <button
                            onClick={() => removeBlacklist(user)}
                            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Remove from Blacklist"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: WEBSITE SETTINGS & DISCOUNTS */}
            {activeTab === 'SETTINGS' && (
              <form onSubmit={handleSaveSettings} className="space-y-5 font-mono-tech text-xs max-h-[440px] overflow-y-auto pr-2">
                {settingsSaveNotice && (
                  <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 font-bold text-center flex items-center justify-center gap-2 animate-bounce">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Website pricing, discounts, and payment numbers saved successfully!</span>
                  </div>
                )}

                {/* Promo Announcement Banner Settings */}
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                    <span className="font-extrabold text-purple-300 flex items-center gap-1.5 text-sm">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Header Announcement & Promo Banner
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.discountBannerActive}
                        onChange={(e) => setSettingsForm({ ...settingsForm, discountBannerActive: e.target.checked })}
                        className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                      />
                      <span className="text-xs text-amber-300 font-bold">Show Banner on Site</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Banner Text Message:</label>
                    <input
                      type="text"
                      value={settingsForm.discountBannerText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, discountBannerText: e.target.value })}
                      placeholder="e.g. SPECIAL LIMITED OFFER: 20% DISCOUNT ON INFINITY..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/20 text-white font-mono-tech focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Pricing customization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Infinity Price */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3">
                    <h4 className="font-extrabold text-cyan-300 border-b border-white/10 pb-1 flex items-center justify-between">
                      <span>XHUVO QX INFINITY (Flagship)</span>
                      <span className="text-amber-400 text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">VIP</span>
                    </h4>
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">USD Price ($):</label>
                      <input
                        type="text"
                        value={settingsForm.infinityPrice}
                        onChange={(e) => setSettingsForm({ ...settingsForm, infinityPrice: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-cyan-300 font-extrabold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">BDT Equivalent Rate:</label>
                      <input
                        type="text"
                        value={settingsForm.infinityBdtPrice}
                        onChange={(e) => setSettingsForm({ ...settingsForm, infinityBdtPrice: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-amber-300 font-bold"
                      />
                    </div>
                  </div>

                  {/* V5 Price */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
                    <h4 className="font-extrabold text-emerald-300 border-b border-white/10 pb-1 flex items-center justify-between">
                      <span>XHUVO QX V5 (Starter)</span>
                      <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">STARTER</span>
                    </h4>
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">USD Price ($):</label>
                      <input
                        type="text"
                        value={settingsForm.v5Price}
                        onChange={(e) => setSettingsForm({ ...settingsForm, v5Price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-emerald-300 font-extrabold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">BDT Equivalent Rate:</label>
                      <input
                        type="text"
                        value={settingsForm.v5BdtPrice}
                        onChange={(e) => setSettingsForm({ ...settingsForm, v5BdtPrice: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-emerald-200 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Credentials customization */}
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-4">
                  <h4 className="font-extrabold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    Official Payment Credentials & Wallet Numbers
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-pink-300 font-bold mb-1">bKash Personal Phone Number:</label>
                      <input
                        type="text"
                        value={settingsForm.bkashNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bkashNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-pink-500/40 text-pink-200 font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-300 font-bold mb-1">Nagad Personal Phone Number:</label>
                      <input
                        type="text"
                        value={settingsForm.nagadNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, nagadNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-200 font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block text-yellow-300 font-bold mb-1">Binance Pay UID:</label>
                      <input
                        type="text"
                        value={settingsForm.binanceUid}
                        onChange={(e) => setSettingsForm({ ...settingsForm, binanceUid: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-yellow-500/40 text-yellow-200 font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-300 font-bold mb-1">Telegram Developer Username:</label>
                      <input
                        type="text"
                        value={settingsForm.telegramOwner}
                        onChange={(e) => setSettingsForm({ ...settingsForm, telegramOwner: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-200 font-mono-tech"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-emerald-400 font-bold mb-1">USDT TRC20 Wallet Address:</label>
                      <input
                        type="text"
                        value={settingsForm.usdtAddress}
                        onChange={(e) => setSettingsForm({ ...settingsForm, usdtAddress: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono-tech"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Security & Unlock Testing Controller */}
                <div className="p-4 rounded-xl bg-slate-950 border border-red-500/40 space-y-3">
                  <h4 className="font-extrabold text-red-300 border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-red-400" />
                      Payment Number Reveal & Lock Control
                    </span>
                    <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded border uppercase font-bold ${
                      typeof window !== 'undefined' && localStorage.getItem('xhuvo_number_unlocked') === 'true'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-red-500/20 text-red-300 border-red-500/40'
                    }`}>
                      STATUS: {typeof window !== 'undefined' && localStorage.getItem('xhuvo_number_unlocked') === 'true' ? 'UNLOCKED (NUMBER VISIBLE)' : 'LOCKED (BLURRED)'}
                    </span>
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    ইউজার পেমেন্ট রিভেল করার পর সাইটটি লক থাকে এবং নাম্বার দেখা যায়। এডমিন হিসেবে টেস্ট করার জন্য নিচের বাটনে ক্লিক করে আনলক অথবা রিসেট (লক) করতে পারেন:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('xhuvo_number_unlocked', 'true');
                        window.dispatchEvent(new Event('storage'));
                        alert('✅ Payment Number UNLOCKED! পেমেন্ট নাম্বার এখন দৃশ্যমান এবং সাইটটি লকিং প্রোটোকলে থাকবে।');
                        window.location.reload();
                      }}
                      className="px-3.5 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 hover:bg-emerald-900 text-xs font-mono-tech font-bold cursor-pointer transition-colors"
                    >
                      🔓 Force Unlock (নাম্বার আনলক করুন)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('xhuvo_number_unlocked');
                        window.dispatchEvent(new Event('storage'));
                        alert('🔒 Payment Lock RESET! নাম্বার পুনরায় ঝাপসা/ব্লার করা হয়েছে এবং লক রিমুভ হয়েছে।');
                        window.location.reload();
                      }}
                      className="px-3.5 py-2 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 hover:bg-red-900 text-xs font-mono-tech font-bold cursor-pointer transition-colors"
                    >
                      🔒 Reset Lock (ঝাপসা/লক রিসেট করুন)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-slate-950 font-orbitron font-extrabold text-xs tracking-wider cursor-pointer shadow-xl shadow-cyan-500/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE WEBSITE SETTINGS & BROADCAST LIVE</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Modal for viewing proof screenshot */}
        {viewScreenshot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <div className="relative max-w-2xl w-full p-4 bg-slate-900 rounded-xl border border-cyan-500">
              <button
                onClick={() => setViewScreenshot(null)}
                className="absolute top-2 right-2 p-2 text-white bg-black/50 rounded-full hover:bg-black"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={viewScreenshot} alt="Proof" className="max-h-[80vh] mx-auto rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
