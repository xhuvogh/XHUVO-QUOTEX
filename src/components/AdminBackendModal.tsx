import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../contexts/ToastContext';
import {
  ShieldCheck,
  Lock,
  X,
  DollarSign,
  Tag,
  ShoppingBag,
  UserCheck,
  Zap,
  CheckCircle2,
  XCircle,
  Copy,
  Plus,
  Trash2,
  Megaphone,
  TrendingUp,
  Search,
  Send,
  RefreshCw,
  Sliders,
  Check,
  AlertCircle,
  Video,
  Mic,
  MessageSquare,
  Eye,
  EyeOff,
  Edit,
  ArrowRight
} from 'lucide-react';

interface AdminBackendModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'USD' | 'BDT';
}

export const AdminBackendModal: React.FC<AdminBackendModalProps> = ({ isOpen, onClose, currency }) => {
  const store = useStore();
  const { showToast } = useToast();
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'discounts' | 'licenses' | 'feedback'>('orders');

  // Filter & Search states
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // New Promo Code Form State
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newDiscountPercent, setNewDiscountPercent] = useState<number>(20);
  const [newPromoDesc, setNewPromoDesc] = useState('');

  // Announcement Form State
  const [announcementText, setAnnouncementText] = useState(store.announcement.text);
  const [announcementEnabled, setAnnouncementEnabled] = useState(store.announcement.enabled);

  // Price Edit State
  const [editingPrices, setEditingPrices] = useState({
    v5USD: store.prices['xhuvoqx-v5']?.priceUSD || 100,
    v5BDT: store.prices['xhuvoqx-v5']?.priceBDT || 11500,
    infinityUSD: store.prices['xhuvoqx-infinity']?.priceUSD || 400,
    infinityBDT: store.prices['xhuvoqx-infinity']?.priceBDT || 46000,
    ultimateUSD: store.prices['ultimate-secret']?.priceUSD || 1000,
    ultimateBDT: store.prices['ultimate-secret']?.priceBDT || 115000,
  });

  // Manual Add License State
  const [manualTvUser, setManualTvUser] = useState('');
  const [manualCustomer, setManualCustomer] = useState('');
  const [manualIndicator, setManualIndicator] = useState('XHUVO QX INFINITY');

  // Manual Add Order Form State
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [addOrderCustomer, setAddOrderCustomer] = useState('');
  const [addOrderTvUser, setAddOrderTvUser] = useState('');
  const [addOrderIndicator, setAddOrderIndicator] = useState('xhuvoqx-infinity');
  const [addOrderMethod, setAddOrderMethod] = useState('bKash (Send Money)');
  const [addOrderTrx, setAddOrderTrx] = useState('');

  // ----------------------------------------
  // DYNAMIC FEEDBACK MANAGER FORMS & STATE
  // ----------------------------------------
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [showVideoFormModal, setShowVideoFormModal] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: '',
    banglaTitle: '',
    platform: 'TikTok' as 'TikTok' | 'Telegram' | 'YouTube Shorts',
    traderName: 'Xhuvo Trader',
    traderHandle: '@xhuvoofficial',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    videoUrl: '',
    embedUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    views: '24.5K',
    likes: '2.4K',
    rating: 5,
    tags: 'TikTok, Binary, Signal',
    description: '',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  });

  const [editingVocalId, setEditingVocalId] = useState<string | null>(null);
  const [showVocalFormModal, setShowVocalFormModal] = useState(false);
  const [vocalForm, setVocalForm] = useState({
    name: '',
    role: 'Quotex VIP Scalper',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    profitAmount: '+$250 / week',
    duration: '0:12',
    date: 'Just now',
    notesBN: '',
    notesEN: '',
    verified: true,
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  });

  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [showTestimonialFormModal, setShowTestimonialFormModal] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: 'Quotex Trader',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: '',
    profitAmount: '+$350 / week',
    verified: true,
    date: 'Just now',
    showOnHomepage: true,
    showOnFeedbackPage: true,
    private: false
  });

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalEmbedUrl = videoForm.embedUrl;
    if (!finalEmbedUrl && videoForm.videoUrl) {
      if (videoForm.videoUrl.includes('tiktok.com')) {
        const parts = videoForm.videoUrl.split('/video/');
        if (parts.length > 1) {
          const id = parts[1].split('?')[0];
          finalEmbedUrl = `https://www.tiktok.com/embed/${id}`;
        } else if (videoForm.videoUrl.includes('/ZS')) {
          finalEmbedUrl = 'https://www.tiktok.com/embed/v2/placeholder';
        }
      } else if (videoForm.videoUrl.includes('youtube.com/shorts') || videoForm.videoUrl.includes('youtu.be')) {
        const parts = videoForm.videoUrl.split('/');
        const id = parts[parts.length - 1].split('?')[0];
        finalEmbedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&modestbranding=1&rel=0&playsinline=1`;
      }
    }

    const tagsArray = videoForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      title: videoForm.title,
      banglaTitle: videoForm.banglaTitle,
      platform: videoForm.platform,
      traderName: videoForm.traderName,
      traderHandle: videoForm.traderHandle,
      avatar: videoForm.avatar,
      videoUrl: videoForm.videoUrl,
      embedUrl: finalEmbedUrl || 'private-telegram-video',
      thumbnailUrl: videoForm.thumbnailUrl,
      views: videoForm.views,
      likes: videoForm.likes,
      rating: videoForm.rating,
      tags: tagsArray,
      description: videoForm.description,
      showOnHomepage: videoForm.showOnHomepage,
      showOnFeedbackPage: videoForm.showOnFeedbackPage,
      private: videoForm.private
    };

    if (editingVideoId) {
      store.updateVideo(editingVideoId, payload);
      handleCopy('Video Updated!', 'video_status');
    } else {
      store.addVideo(payload);
      handleCopy('Video Added Successfully!', 'video_status');
    }

    setShowVideoFormModal(false);
    setEditingVideoId(null);
  };

  const handleVocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: vocalForm.name,
      role: vocalForm.role,
      location: vocalForm.location,
      avatar: vocalForm.avatar,
      rating: vocalForm.rating,
      profitAmount: vocalForm.profitAmount,
      duration: vocalForm.duration,
      date: vocalForm.date,
      notesBN: vocalForm.notesBN,
      notesEN: vocalForm.notesEN,
      verified: vocalForm.verified,
      showOnHomepage: vocalForm.showOnHomepage,
      showOnFeedbackPage: vocalForm.showOnFeedbackPage,
      private: vocalForm.private
    };

    if (editingVocalId) {
      store.updateVocal(editingVocalId, payload);
      handleCopy('Audio Review Updated!', 'vocal_status');
    } else {
      store.addVocal(payload);
      handleCopy('Audio Review Added!', 'vocal_status');
    }

    setShowVocalFormModal(false);
    setEditingVocalId(null);
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: testimonialForm.name,
      role: testimonialForm.role,
      location: testimonialForm.location,
      avatar: testimonialForm.avatar,
      comment: testimonialForm.comment,
      profitAmount: testimonialForm.profitAmount,
      rating: testimonialForm.rating,
      date: testimonialForm.date,
      verified: testimonialForm.verified,
      showOnHomepage: testimonialForm.showOnHomepage,
      showOnFeedbackPage: testimonialForm.showOnFeedbackPage,
      private: testimonialForm.private
    };

    if (editingTestimonialId) {
      store.updateTestimonial(editingTestimonialId, payload);
      handleCopy('Written Review Updated!', 'test_status');
    } else {
      store.addTestimonial(payload);
      handleCopy('Written Review Added!', 'test_status');
    }

    setShowTestimonialFormModal(false);
    setEditingTestimonialId(null);
  };

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim() === 'xhuvo2026') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSavePrices = () => {
    store.updatePrice('xhuvoqx-v5', Number(editingPrices.v5USD), Number(editingPrices.v5BDT));
    store.updatePrice('xhuvoqx-infinity', Number(editingPrices.infinityUSD), Number(editingPrices.infinityBDT));
    store.updatePrice('ultimate-secret', Number(editingPrices.ultimateUSD), Number(editingPrices.ultimateBDT));
    handleCopy('Prices Updated!', 'prices_saved');
  };

  const handleAddPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPromoCode.trim()) {
      store.addPromoCode(newPromoCode, newDiscountPercent, newPromoDesc);
      setNewPromoCode('');
      setNewDiscountPercent(20);
      setNewPromoDesc('');
    }
  };

  const handleAnnouncementSave = () => {
    store.updateAnnouncement(announcementEnabled, announcementText);
    handleCopy('Announcement Saved!', 'announcement_saved');
  };

  const handleAddManualLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualTvUser.trim()) {
      store.addLicense(manualTvUser, manualIndicator, manualCustomer);
      setManualTvUser('');
      setManualCustomer('');
    }
  };

  const handleAddManualOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addOrderCustomer.trim() && addOrderTvUser.trim()) {
      const planPrice = store.prices[addOrderIndicator] || { priceUSD: 400, priceBDT: 46000 };
      store.addOrder({
        customerName: addOrderCustomer,
        emailOrTelegram: `@${addOrderTvUser}`,
        tradingViewUsername: addOrderTvUser,
        indicatorId: addOrderIndicator,
        indicatorName: addOrderIndicator === 'xhuvoqx-infinity' ? 'XHUVO QX INFINITY ($400 FLAGSHIP)' : 'XHUVO QX V5 ($100 STARTER)',
        amountUSD: planPrice.priceUSD,
        amountBDT: planPrice.priceBDT,
        paymentMethod: addOrderMethod,
        transactionId: addOrderTrx || `MANUAL-${Math.floor(Math.random() * 89999 + 10000)}`,
      });
      setShowAddOrderModal(false);
      setAddOrderCustomer('');
      setAddOrderTvUser('');
      setAddOrderTrx('');
    }
  };

  // Filtered Orders
  const filteredOrders = store.orders.filter(o => {
    const matchesStatus = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      o.customerName.toLowerCase().includes(q) ||
      o.tradingViewUsername.toLowerCase().includes(q) ||
      o.transactionId.toLowerCase().includes(q) ||
      o.emailOrTelegram.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // Calculate Revenue Stats
  const approvedOrders = store.orders.filter(o => o.status === 'APPROVED' || o.status === 'LICENSE_GRANTED');
  const pendingCount = store.orders.filter(o => o.status === 'PENDING').length;
  const totalRevUSD = approvedOrders.reduce((sum, o) => sum + o.amountUSD, 0);
  const totalRevBDT = approvedOrders.reduce((sum, o) => sum + o.amountBDT, 0);

  // Export Usernames as CSV / String
  const exportUsernamesText = store.licenses.map(l => l.tradingViewUsername).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl liquid-glass-modal rounded-3xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Modal Header Bar */}
        <div className="px-6 py-4 bg-[#0d071c] border-b border-purple-500/30 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white font-mono uppercase tracking-wider flex items-center space-x-2">
                <span>XHUVO QX BACKEND CONTROL SYSTEM</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px]">
                  ADMIN
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Order Approvals, Price Discounts, Announcement Broadcasts &amp; License Manager
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUTH LOCK SCREEN */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-2xl">
                <h3 className="text-xl font-extrabold text-red-500 font-sans tracking-wide uppercase">
                  এটি শুধু শুভ একসেস করতে পারবে
                </h3>
                <p className="text-xs text-rose-300 font-mono mt-1 font-bold">
                  Restricted Access: Only SHUVO Can Access This Panel!
                </p>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Unauthorized access attempts are monitored and recorded. Please enter the master administrative key.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="••••••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-950 border border-red-500/30 rounded-xl text-center text-sm font-mono text-white focus:outline-none focus:border-red-500/60 transition"
              />

              {authError && (
                <p className="text-xs text-rose-500 font-mono flex items-center justify-center space-x-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>ভুল পাসওয়ার্ড! (Incorrect Passcode)</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black font-mono text-xs shadow-lg hover:scale-[1.02] transition duration-200"
              >
                CONFIRM ADMINISTRATIVE AUTHORIZATION
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* Admin Tabs Bar */}
            <div className="px-6 py-2.5 bg-[#0b0616] border-b border-purple-500/20 flex items-center space-x-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-mono">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'orders'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders &amp; Approvals</span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('discounts')}
                className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'discounts'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Price &amp; Discounts</span>
              </button>

              <button
                onClick={() => setActiveTab('licenses')}
                className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'licenses'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>TradingView Licenses ({store.licenses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'analytics'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Revenue Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'feedback'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Feedback Hub ({store.videos.length + store.vocals.length + store.testimonials.length})</span>
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {/* TAB 1: ORDERS & APPROVALS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  
                  {/* Top Search & Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Status Filter Tabs */}
                    <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-purple-500/30 text-xs font-mono w-full sm:w-auto">
                      {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setOrderStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
                            orderStatusFilter === st
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    {/* Search Input & Manual Add Button */}
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search username, TrxID..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                        />
                      </div>

                      <button
                        onClick={() => setShowAddOrderModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-mono font-bold flex items-center space-x-1.5 shrink-0 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Order</span>
                      </button>
                    </div>

                  </div>

                  {/* Orders Cards List */}
                  <div className="space-y-3">
                    {filteredOrders.length === 0 ? (
                      <div className="p-10 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs">
                        No orders matching the selected filter.
                      </div>
                    ) : (
                      filteredOrders.map((ord) => {
                        const isPending = ord.status === 'PENDING';
                        const isApproved = ord.status === 'APPROVED' || ord.status === 'LICENSE_GRANTED';

                        return (
                          <div
                            key={ord.id}
                            className={`p-5 rounded-2xl border transition-all space-y-3 ${
                              isPending
                                ? 'bg-purple-950/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                                : isApproved
                                ? 'bg-slate-950/80 border-emerald-500/40'
                                : 'bg-slate-950/40 border-rose-500/30 opacity-75'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
                              <div className="flex items-center space-x-3">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
                                  {ord.id}
                                </span>
                                <div>
                                  <h4 className="font-bold text-white text-sm font-sans flex items-center space-x-2">
                                    <span>{ord.customerName}</span>
                                    <span className="text-xs text-purple-300 font-mono">({ord.emailOrTelegram})</span>
                                  </h4>
                                  <p className="text-xs text-slate-400 font-mono">
                                    TradingView: <strong className="text-purple-300">{ord.tradingViewUsername}</strong>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <div className="text-right font-mono">
                                  <span className="text-sm font-black text-purple-300 block">
                                    ${ord.amountUSD} / ৳{ord.amountBDT.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] text-slate-400 block">{ord.paymentMethod}</span>
                                </div>

                                {/* Status Badge */}
                                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                                  isPending
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : isApproved
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                }`}>
                                  {ord.status}
                                </span>
                              </div>
                            </div>

                            {/* Order Details & Transaction ID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                              <div>
                                <span className="text-slate-400 block text-[10px]">INDICATOR PLAN:</span>
                                <span className="text-white font-bold">{ord.indicatorName}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">TRANSACTION ID / REF:</span>
                                <span className="text-purple-300 font-bold select-all">{ord.transactionId}</span>
                              </div>
                            </div>

                            {/* Order Action Buttons */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleCopy(ord.tradingViewUsername, `tv_${ord.id}`)}
                                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center space-x-1"
                                >
                                  <Copy className="w-3.5 h-3.5 text-purple-400" />
                                  <span>{copiedText === `tv_${ord.id}` ? 'COPIED!' : 'Copy Username'}</span>
                                </button>

                                <button
                                  onClick={() => {
                                    const reply = `Hello ${ord.customerName}! Your TradingView username '${ord.tradingViewUsername}' has been granted access to ${ord.indicatorName}. Open TradingView -> Indicators -> Invite-Only Scripts!`;
                                    handleCopy(reply, `reply_${ord.id}`);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center space-x-1"
                                >
                                  <Send className="w-3.5 h-3.5 text-purple-400" />
                                  <span>{copiedText === `reply_${ord.id}` ? 'REPLY COPIED!' : 'Copy Reply Msg'}</span>
                                </button>
                              </div>

                              <div className="flex items-center space-x-2">
                                {isPending && (
                                  <>
                                    <button
                                      onClick={() => store.updateOrderStatus(ord.id, 'APPROVED', 'Verified & License Granted')}
                                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center space-x-1 shadow-lg"
                                    >
                                      <CheckCircle2 className="w-4 h-4" />
                                      <span>APPROVE &amp; GRANT LICENSE</span>
                                    </button>

                                    <button
                                      onClick={() => store.updateOrderStatus(ord.id, 'REJECTED', 'Invalid transaction reference')}
                                      className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-300 font-mono font-bold text-xs flex items-center space-x-1"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      <span>REJECT</span>
                                    </button>
                                  </>
                                )}

                                {isApproved && (
                                  <span className="text-xs text-emerald-400 font-mono font-bold flex items-center space-x-1">
                                    <Check className="w-4 h-4" />
                                    <span>License Active</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: PRICE CONTROL & DISCOUNT MANAGER */}
              {activeTab === 'discounts' && (
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* Friday Special Hot Discount Controller */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-purple-950/20 to-red-950/40 border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.25)] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-mono font-black uppercase tracking-wider animate-pulse-badge">
                          🔥 WEEKLY FRIDAY MEGA SALE
                        </span>
                        <h3 className="text-base font-black text-white font-sans mt-1.5 flex items-center space-x-2">
                          <span>FRIDAY SPECIAL DISCOUNT SYSTEM</span>
                        </h3>
                        <p className="text-xs text-rose-200/80 font-mono mt-0.5">
                          টগল করার সাথে সাথে পুরো ওয়েবসাইটে V5 ইন্ডিকেটর $40 এবং INFINITY ইন্ডিকেটর $80 হয়ে যাবে (60% &amp; 80% Off!)
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <span className={`text-xs font-mono font-bold ${store.fridayDiscountEnabled ? 'text-red-400' : 'text-slate-400'}`}>
                          {store.fridayDiscountEnabled ? '🔴 DISCOUNT IS LIVE NOW!' : '⚪ INACTIVE'}
                        </span>
                        
                        <button
                          onClick={() => {
                            const newEnabledState = !store.fridayDiscountEnabled;
                            store.setFridayDiscountEnabled(newEnabledState);
                            // Also automatically sync or toggled announcement for better UX!
                            if (newEnabledState) {
                              store.updateAnnouncement(true, "🔥 FRIDAY SPECIAL HOT OFFER IS LIVE! ⚡ GET XHUVO QX INFINITY ($400) AT ONLY $80 (80% OFF) & XHUVO QX V5 ($100) AT ONLY $40 (60% OFF) FOR TODAY ONLY! ⚡");
                            } else {
                              store.updateAnnouncement(false, "⚡ SPECIAL FLASH SALE: USE CODE 'XHUVO20' FOR 20% INSTANT DISCOUNT ON XHUVO QX INDICATORS!");
                            }
                          }}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            store.fridayDiscountEnabled ? 'bg-red-600' : 'bg-slate-800'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              store.fridayDiscountEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-red-500/20">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">XHUVO QX V5 (STARTER)</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-slate-500 line-through font-bold">$100 / ৳১১,৫০০</span>
                          <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-red-400 font-black font-mono animate-pulse">$40 / ৳৪,৬০০ (60% OFF!)</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-red-500/20">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">XHUVO QX INFINITY (FLAGSHIP)</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-slate-500 line-through font-bold">$400 / ৳৪৬,০০০</span>
                          <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-red-400 font-black font-mono animate-pulse">$80 / ৳৯,২০০ (80% OFF!)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WEEKLY 80% MEGA DISCOUNT FOR 5 PEOPLE CONTROL PANEL */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-red-950/20 to-amber-950/40 border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.25)] space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-black uppercase tracking-wider animate-pulse-badge">
                          📈♾️ WEEKLY 80% SPECIAL CAMPAIGN
                        </span>
                        <h3 className="text-base font-black text-white font-sans mt-1.5 flex items-center space-x-2">
                          <span>WEEKLY 80% DISCOUNT FOR ONLY 5 PEOPLE</span>
                        </h3>
                        <p className="text-xs text-amber-200/80 font-mono mt-0.5">
                          Enable a premium 80% discount sitewide with a 24-hour countdown clock and limited seat limit counter!
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <span className={`text-xs font-mono font-bold ${store.weeklyDiscountEnabled ? 'text-amber-400' : 'text-slate-400'}`}>
                          {store.weeklyDiscountEnabled ? '🟢 CAMPAIGN ACTIVE' : '⚪ INACTIVE'}
                        </span>
                        
                        <button
                          onClick={() => {
                            store.setWeeklyDiscountEnabled(!store.weeklyDiscountEnabled);
                          }}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            store.weeklyDiscountEnabled ? 'bg-amber-500' : 'bg-slate-800'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              store.weeklyDiscountEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      
                      {/* Interactive Seat Counter Customizer */}
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/20 flex flex-col justify-between">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase mb-1">AVAILABLE SEATS (OUT OF 5)</span>
                        <div className="flex items-center justify-between mt-2">
                          <button
                            onClick={() => store.setWeeklyDiscountSpotsLeft(Math.max(1, store.weeklyDiscountSpotsLeft - 1))}
                            className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-center"
                          >
                            -
                          </button>
                          <span className="text-xl font-black text-amber-400 px-3">{store.weeklyDiscountSpotsLeft}</span>
                          <button
                            onClick={() => store.setWeeklyDiscountSpotsLeft(Math.min(5, store.weeklyDiscountSpotsLeft + 1))}
                            className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-center"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[9px] text-slate-500 mt-2 block text-center">Decrements automatically upon customer checkout</span>
                      </div>

                      {/* Live Ticker Monitor */}
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/20 flex flex-col justify-between">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase mb-1">⏱️ 24-HOUR COUNTDOWN REMAINING</span>
                        {store.weeklyDiscountEnabled ? (
                          <div className="text-lg font-black text-white tracking-widest text-center py-2 animate-pulse font-mono">
                            {(() => {
                              const hrs = Math.floor(store.weeklyDiscountTimeLeft / 3600);
                              const mins = Math.floor((store.weeklyDiscountTimeLeft % 3600) / 60);
                              const secs = store.weeklyDiscountTimeLeft % 60;
                              return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                            })()}
                          </div>
                        ) : (
                          <div className="text-slate-500 text-center py-2">Timer paused</div>
                        )}
                        <span className="text-[9px] text-slate-500 block text-center">Resets and loops automatically after 24 hours</span>
                      </div>

                      {/* Reset Campaign Trigger Button */}
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/20 flex flex-col justify-center items-center">
                        <button
                          onClick={() => {
                            store.resetWeeklyDiscountTimer();
                            showToast('Discount timer & spots successfully reset to 24:00:00 & 5 spots!', 'success');
                          }}
                          className="w-full py-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white rounded font-bold text-[10px] tracking-wider uppercase transition-all shadow-md active:scale-95"
                        >
                          🔄 RESET TIMER &amp; SPOTS
                        </button>
                        <span className="text-[9px] text-slate-400 mt-2 block text-center leading-relaxed">
                          Sets timer back to 24:00:00 and remaining seats back to 5.
                        </span>
                      </div>

                    </div>
                  </div>
                  
                  {/* 1. Base Price Customizer */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-purple-400" />
                          <span>INDICATOR BASE PRICE CONTROLLER</span>
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          Adjust baseline store prices for V5, INFINITY, and ULTIMATE editions.
                        </p>
                      </div>

                      <button
                        onClick={handleSavePrices}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center space-x-1.5 shadow-lg"
                      >
                        <Check className="w-4 h-4" />
                        <span>{copiedText === 'prices_saved' ? 'SAVED!' : 'Save All Prices'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                      
                      {/* V5 Price Card */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <span className="font-bold text-purple-300 block">XHUVO QX V5 (STARTER)</span>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block">USD Price ($):</label>
                            <input
                              type="number"
                              value={editingPrices.v5USD}
                              onChange={(e) => setEditingPrices({ ...editingPrices, v5USD: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block">BDT Price (৳):</label>
                            <input
                              type="number"
                              value={editingPrices.v5BDT}
                              onChange={(e) => setEditingPrices({ ...editingPrices, v5BDT: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* INFINITY Price Card */}
                      <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-3">
                        <span className="font-bold text-purple-300 block">XHUVO QX INFINITY (FLAGSHIP)</span>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block">USD Price ($):</label>
                            <input
                              type="number"
                              value={editingPrices.infinityUSD}
                              onChange={(e) => setEditingPrices({ ...editingPrices, infinityUSD: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block">BDT Price (৳):</label>
                            <input
                              type="number"
                              value={editingPrices.infinityBDT}
                              onChange={(e) => setEditingPrices({ ...editingPrices, infinityBDT: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* ULTIMATE Price Card */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <span className="font-bold text-fuchsia-300 block">ULTIMATE SECRET EDITION</span>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block">USD Price ($):</label>
                            <input
                              type="number"
                              value={editingPrices.ultimateUSD}
                              onChange={(e) => setEditingPrices({ ...editingPrices, ultimateUSD: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block">BDT Price (৳):</label>
                            <input
                              type="number"
                              value={editingPrices.ultimateBDT}
                              onChange={(e) => setEditingPrices({ ...editingPrices, ultimateBDT: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 2. Promo Code & Discount Creator */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4">
                    <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-purple-400" />
                      <span>CREATE &amp; BROADCAST PROMO DISCOUNT CODES</span>
                    </h3>

                    <form onSubmit={handleAddPromoSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                      <input
                        type="text"
                        required
                        placeholder="CODE (e.g. XHUVO30)"
                        value={newPromoCode}
                        onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-bold"
                      />
                      <input
                        type="number"
                        required
                        min="1"
                        max="90"
                        placeholder="Discount % (e.g. 20)"
                        value={newDiscountPercent}
                        onChange={(e) => setNewDiscountPercent(Number(e.target.value))}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Description (Optional)"
                        value={newPromoDesc}
                        onChange={(e) => setNewPromoDesc(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                      />
                      <button
                        type="submit"
                        className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono flex items-center justify-center space-x-1 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Discount Code</span>
                      </button>
                    </form>

                    {/* Active Promo Codes List */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] text-slate-400 font-mono block font-bold">ACTIVE PROMO CODES:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {store.promoCodes.map((p) => (
                          <div
                            key={p.id}
                            className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs ${
                              p.active ? 'bg-purple-950/30 border-purple-500/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'
                            }`}
                          >
                            <div>
                              <span className="font-black text-purple-300 block">{p.code} ({p.discountPercent}% OFF)</span>
                              <span className="text-[10px] text-slate-400 block">{p.description}</span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => store.togglePromoCode(p.id)}
                                className={`px-2 py-1 rounded text-[10px] font-bold ${
                                  p.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {p.active ? 'ACTIVE' : 'OFF'}
                              </button>
                              <button
                                onClick={() => store.deletePromoCode(p.id)}
                                className="p-1 text-rose-400 hover:text-rose-200"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* 3. Top Banner Announcement Editor */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center space-x-2">
                        <Megaphone className="w-4 h-4 text-purple-400" />
                        <span>LIVE WEBSITE ANNOUNCEMENT BROADCASTER</span>
                      </h3>

                      <label className="flex items-center space-x-2 text-xs font-mono cursor-pointer">
                        <input
                          type="checkbox"
                          checked={announcementEnabled}
                          onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                          className="rounded bg-slate-900 border-slate-800 text-purple-600 focus:ring-0"
                        />
                        <span className="text-slate-300 font-bold">Enable Broadcast Banner</span>
                      </label>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <textarea
                        rows={2}
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400"
                        placeholder="Broadcast text displayed on live website..."
                      />

                      <button
                        onClick={handleAnnouncementSave}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono text-xs flex items-center space-x-1.5 shadow"
                      >
                        <Zap className="w-4 h-4" />
                        <span>{copiedText === 'announcement_saved' ? 'BROADCAST LIVE!' : 'Publish Broadcast Banner'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: TRADINGVIEW LICENSES MANAGER */}
              {activeTab === 'licenses' && (
                <div className="space-y-6">
                  
                  {/* Add Manual Username Form */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
                    <h3 className="text-xs font-bold text-purple-300 font-mono uppercase">
                      GRANT TRADINGVIEW SCRIPT LICENSE MANUALLY:
                    </h3>

                    <form onSubmit={handleAddManualLicenseSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                      <input
                        type="text"
                        required
                        placeholder="TradingView Username"
                        value={manualTvUser}
                        onChange={(e) => setManualTvUser(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Customer Name (Optional)"
                        value={manualCustomer}
                        onChange={(e) => setManualCustomer(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                      />
                      <select
                        value={manualIndicator}
                        onChange={(e) => setManualIndicator(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                      >
                        <option value="XHUVO QX INFINITY">XHUVO QX INFINITY</option>
                        <option value="XHUVO QX V5">XHUVO QX V5</option>
                        <option value="XHUVO QX ULTIMATE">XHUVO QX ULTIMATE</option>
                      </select>
                      <button
                        type="submit"
                        className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono flex items-center justify-center space-x-1 shadow"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Grant Access</span>
                      </button>
                    </form>
                  </div>

                  {/* Copy All Authorized Usernames Bar */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="text-white font-bold block">BULK EXPORT AUTHORIZED TRADINGVIEW USERNAMES:</span>
                      <span className="text-slate-400 text-[11px] truncate block max-w-lg">{exportUsernamesText || 'No usernames yet'}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(exportUsernamesText, 'export_users')}
                      className="px-3.5 py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-900 transition flex items-center space-x-1 shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === 'export_users' ? 'COPIED ALL!' : 'Copy All Usernames'}</span>
                    </button>
                  </div>

                  {/* Licenses Table */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                          <th className="py-3 px-4">TradingView Username</th>
                          <th className="py-3 px-4">Customer Name</th>
                          <th className="py-3 px-4">Indicator Package</th>
                          <th className="py-3 px-4">Granted Date</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {store.licenses.map((lic) => (
                          <tr key={lic.id} className="hover:bg-slate-900/50">
                            <td className="py-3 px-4 font-bold text-purple-300">{lic.tradingViewUsername}</td>
                            <td className="py-3 px-4 text-slate-300">{lic.customerName || 'N/A'}</td>
                            <td className="py-3 px-4 text-slate-400">{lic.indicatorName}</td>
                            <td className="py-3 px-4 text-slate-400 text-[11px]">
                              {new Date(lic.grantedAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lic.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                              }`}>
                                {lic.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              {lic.status === 'ACTIVE' && (
                                <button
                                  onClick={() => store.revokeLicense(lic.id)}
                                  className="text-rose-400 hover:text-rose-200 text-[11px] font-bold underline"
                                >
                                  Revoke
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 4: REVENUE & ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6 font-mono text-xs">
                  
                  {/* Top Stats Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">TOTAL VERIFIED REVENUE (USD)</span>
                      <p className="text-2xl font-black text-purple-300">${totalRevUSD.toLocaleString()}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">TOTAL VERIFIED REVENUE (BDT)</span>
                      <p className="text-2xl font-black text-purple-300">৳{totalRevBDT.toLocaleString()}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">ACTIVE TRADINGVIEW LICENSES</span>
                      <p className="text-2xl font-black text-white">{store.licenses.filter(l => l.status === 'ACTIVE').length}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">PENDING APPROVAL ORDERS</span>
                      <p className="text-2xl font-black text-amber-400">{pendingCount}</p>
                    </div>
                  </div>

                  {/* Summary Notes */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-white font-bold">💡 STORE BACKEND SUMMARY:</h4>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      <li>Orders placed on the website automatically sync into this Order Manager.</li>
                      <li>Clicking <strong>APPROVE &amp; GRANT LICENSE</strong> instantly adds the TradingView username to the license registry.</li>
                      <li>All promo codes and price updates persist in browser storage and apply across live store pages.</li>
                    </ul>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm('Reset store backend data to default settings?')) {
                          store.resetToDefaults();
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-rose-400 hover:text-rose-200 text-xs font-bold transition flex items-center space-x-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Factory Defaults</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 5: DYNAMIC FEEDBACK MANAGER */}
              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  {/* Top Header Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-950 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                        <Video className="w-5 h-5 text-purple-400" />
                        <span>Dynamic Feedback Hub &amp; Media Manager</span>
                      </h3>
                      <p className="text-slate-400 text-[11px] mt-1 max-w-xl">
                        Add, edit, or delete TikTok, Telegram, and YouTube videos, voice audio recordings, and text reviews. Instantly dispatch them to the homepage, feedback gallery, or keep them private.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setVideoForm({
                            title: '',
                            banglaTitle: '',
                            platform: 'TikTok',
                            traderName: 'Xhuvo Trader',
                            traderHandle: '@xhuvoofficial',
                            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                            videoUrl: '',
                            embedUrl: '',
                            thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
                            views: '15.4K',
                            likes: '1.5K',
                            rating: 5,
                            tags: 'TikTok Featured, Non-Repaint, Quotex 1M',
                            description: '',
                            showOnHomepage: true,
                            showOnFeedbackPage: true,
                            private: false
                          });
                          setEditingVideoId(null);
                          setShowVideoFormModal(true);
                        }}
                        className="px-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center space-x-1.5 shadow-lg active:scale-95 transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Video</span>
                      </button>

                      <button
                        onClick={() => {
                          setVocalForm({
                            name: '',
                            role: 'Quotex VIP Scalper',
                            location: 'Dhaka, Bangladesh',
                            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                            rating: 5,
                            profitAmount: '+$310 / week',
                            duration: '0:12',
                            date: 'Just now',
                            notesBN: '',
                            notesEN: '',
                            verified: true,
                            showOnHomepage: true,
                            showOnFeedbackPage: true,
                            private: false
                          });
                          setEditingVocalId(null);
                          setShowVocalFormModal(true);
                        }}
                        className="px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center space-x-1.5 shadow-lg active:scale-95 transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Audio Review</span>
                      </button>

                      <button
                        onClick={() => {
                          setTestimonialForm({
                            name: '',
                            role: 'Quotex Trader',
                            location: 'Dhaka, Bangladesh',
                            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                            rating: 5,
                            comment: '',
                            profitAmount: '+$450 / week',
                            verified: true,
                            date: 'Just now',
                            showOnHomepage: true,
                            showOnFeedbackPage: true,
                            private: false
                          });
                          setEditingTestimonialId(null);
                          setShowTestimonialFormModal(true);
                        }}
                        className="px-3 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold flex items-center space-x-1.5 shadow-lg active:scale-95 transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Written Review</span>
                      </button>
                    </div>
                  </div>

                  {/* SECTION 1: VIDEOS MANAGER */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-purple-300 font-mono uppercase tracking-wider flex items-center space-x-1.5">
                        <Video className="w-4 h-4" />
                        <span>TikTok / Telegram / YouTube Videos ({store.videos.length})</span>
                      </h4>
                    </div>

                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-bold">
                              <th className="py-2.5 px-4">Platform &amp; Video</th>
                              <th className="py-2.5 px-4">Trader Info</th>
                              <th className="py-2.5 px-4">Stats &amp; Tags</th>
                              <th className="py-2.5 px-4 text-center">Homepage</th>
                              <th className="py-2.5 px-4 text-center">Feedback Page</th>
                              <th className="py-2.5 px-4 text-center">Private</th>
                              <th className="py-2.5 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {store.videos.map((vid) => (
                              <tr key={vid.id} className="hover:bg-slate-900/40">
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="relative w-14 h-9 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                                      <img src={vid.thumbnailUrl} alt="Video thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                      <span className={`absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded text-[8px] font-black uppercase text-white ${
                                        vid.platform === 'TikTok' ? 'bg-[#ff0050]' : vid.platform === 'Telegram' ? 'bg-[#229ED9]' : 'bg-[#FF0000]'
                                      }`}>
                                        {vid.platform === 'YouTube Shorts' ? 'YT' : vid.platform}
                                      </span>
                                    </div>
                                    <div className="max-w-[200px] truncate">
                                      <span className="font-bold text-white block truncate">{vid.title}</span>
                                      <span className="text-slate-400 text-[10px] block truncate">{vid.banglaTitle}</span>
                                      <a href={vid.videoUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline text-[9px] block truncate">{vid.videoUrl}</a>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-2">
                                    <img src={vid.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover shrink-0" />
                                    <div>
                                      <span className="text-slate-300 block font-bold">{vid.traderName}</span>
                                      <span className="text-slate-500 text-[10px] block">{vid.traderHandle}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-400">
                                  <div className="space-y-0.5">
                                    <span className="block text-[10px] text-slate-300">👁️ {vid.views} | ❤️ {vid.likes}</span>
                                    <div className="flex flex-wrap gap-1">
                                      {vid.tags.slice(0, 2).map((t, i) => (
                                        <span key={i} className="px-1 py-0.2 bg-slate-900 rounded text-[9px] text-purple-400">{t}</span>
                                      ))}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={vid.showOnHomepage}
                                    onChange={(e) => store.updateVideo(vid.id, { showOnHomepage: e.target.checked })}
                                    className="rounded border-slate-800 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5 bg-slate-900"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={vid.showOnFeedbackPage}
                                    onChange={(e) => store.updateVideo(vid.id, { showOnFeedbackPage: e.target.checked })}
                                    className="rounded border-slate-800 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5 bg-slate-900"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black cursor-pointer select-none ${
                                    vid.private ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-900 text-slate-500'
                                  }`}
                                    onClick={() => store.updateVideo(vid.id, { private: !vid.private })}
                                  >
                                    {vid.private ? 'PRIVATE' : 'PUBLIC'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button
                                      onClick={() => {
                                        setVideoForm({
                                          title: vid.title,
                                          banglaTitle: vid.banglaTitle,
                                          platform: vid.platform,
                                          traderName: vid.traderName,
                                          traderHandle: vid.traderHandle,
                                          avatar: vid.avatar,
                                          videoUrl: vid.videoUrl,
                                          embedUrl: vid.embedUrl,
                                          thumbnailUrl: vid.thumbnailUrl,
                                          views: vid.views,
                                          likes: vid.likes,
                                          rating: vid.rating,
                                          tags: vid.tags.join(', '),
                                          description: vid.description || '',
                                          showOnHomepage: vid.showOnHomepage,
                                          showOnFeedbackPage: vid.showOnFeedbackPage,
                                          private: vid.private
                                        });
                                        setEditingVideoId(vid.id);
                                        setShowVideoFormModal(true);
                                      }}
                                      className="text-purple-400 hover:text-purple-300 underline font-bold"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this video feedback entry?')) {
                                          store.deleteVideo(vid.id);
                                        }
                                      }}
                                      className="text-rose-400 hover:text-rose-300"
                                    >
                                      <Trash2 className="w-3.5 h-3.5 inline" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: AUDIO VOCALS MANAGER */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-indigo-300 font-mono uppercase tracking-wider flex items-center space-x-1.5">
                      <Mic className="w-4 h-4" />
                      <span>Recorded Voice Feedbacks ({store.vocals.length})</span>
                    </h4>

                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-bold">
                              <th className="py-2.5 px-4">Client Name &amp; Role</th>
                              <th className="py-2.5 px-4">Audio Details</th>
                              <th className="py-2.5 px-4">English Transcript / translation</th>
                              <th className="py-2.5 px-4 text-center">Homepage</th>
                              <th className="py-2.5 px-4 text-center">Feedback Page</th>
                              <th className="py-2.5 px-4 text-center">Private</th>
                              <th className="py-2.5 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {store.vocals.map((voc) => (
                              <tr key={voc.id} className="hover:bg-slate-900/40">
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-3">
                                    <img src={voc.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0 border border-indigo-500/30" />
                                    <div>
                                      <span className="font-bold text-white block">{voc.name}</span>
                                      <span className="text-slate-400 text-[10px] block">{voc.role} | {voc.location}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-300">
                                  <div className="space-y-0.5">
                                    <span className="text-[10px] text-indigo-400 block font-bold">🎯 Profit: {voc.profitAmount}</span>
                                    <span className="text-[10px] text-slate-400 block">⏱️ Length: {voc.duration} | {voc.date}</span>
                                    <p className="text-[10px] italic text-slate-300 line-clamp-2">" {voc.notesBN} "</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-400 max-w-xs">
                                  <p className="text-[10px] line-clamp-3">
                                    {voc.notesEN || 'No English Translation'}
                                  </p>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={voc.showOnHomepage}
                                    onChange={(e) => store.updateVocal(voc.id, { showOnHomepage: e.target.checked })}
                                    className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 bg-slate-900"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={voc.showOnFeedbackPage}
                                    onChange={(e) => store.updateVocal(voc.id, { showOnFeedbackPage: e.target.checked })}
                                    className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 bg-slate-900"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black cursor-pointer select-none ${
                                    voc.private ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-900 text-slate-500'
                                  }`}
                                    onClick={() => store.updateVocal(voc.id, { private: !voc.private })}
                                  >
                                    {voc.private ? 'PRIVATE' : 'PUBLIC'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button
                                      onClick={() => {
                                        setVocalForm({
                                          name: voc.name,
                                          role: voc.role,
                                          location: voc.location,
                                          avatar: voc.avatar,
                                          rating: voc.rating,
                                          profitAmount: voc.profitAmount,
                                          duration: voc.duration,
                                          date: voc.date,
                                          notesBN: voc.notesBN,
                                          notesEN: voc.notesEN,
                                          verified: voc.verified,
                                          showOnHomepage: voc.showOnHomepage,
                                          showOnFeedbackPage: voc.showOnFeedbackPage,
                                          private: voc.private
                                        });
                                        setEditingVocalId(voc.id);
                                        setShowVocalFormModal(true);
                                      }}
                                      className="text-indigo-400 hover:text-indigo-300 underline font-bold"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this recorded voice feedback entry?')) {
                                          store.deleteVocal(voc.id);
                                        }
                                      }}
                                      className="text-rose-400 hover:text-rose-300"
                                    >
                                      <Trash2 className="w-3.5 h-3.5 inline" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: WRITTEN TESTIMONIALS MANAGER */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-pink-300 font-mono uppercase tracking-wider flex items-center space-x-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>Written Client Reviews ({store.testimonials.length})</span>
                    </h4>

                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[9px] font-bold">
                              <th className="py-2.5 px-4">Client Detail</th>
                              <th className="py-2.5 px-4">Comment / Testimonial</th>
                              <th className="py-2.5 px-4">Verification Info</th>
                              <th className="py-2.5 px-4 text-center">Homepage</th>
                              <th className="py-2.5 px-4 text-center">Feedback Page</th>
                              <th className="py-2.5 px-4 text-center">Private</th>
                              <th className="py-2.5 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {store.testimonials.map((test) => (
                              <tr key={test.id} className="hover:bg-slate-900/40">
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-3">
                                    <img src={test.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0 border border-pink-500/30" />
                                    <div>
                                      <span className="font-bold text-white block">{test.name}</span>
                                      <span className="text-slate-400 text-[10px] block">{test.role} | {test.location}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-300 max-w-sm">
                                  <p className="line-clamp-3 italic text-slate-300">" {test.comment} "</p>
                                </td>
                                <td className="py-3 px-4 text-slate-400">
                                  <div className="space-y-0.5 text-[10px]">
                                    <span className="text-pink-400 block font-bold">🏆 {test.profitAmount}</span>
                                    <span className="text-slate-400 block">📞 {test.date || 'telegram handle'}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={test.showOnHomepage}
                                    onChange={(e) => store.updateTestimonial(test.id, { showOnHomepage: e.target.checked })}
                                    className="rounded border-slate-800 text-pink-600 focus:ring-pink-500 h-3.5 w-3.5 bg-slate-900"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={test.showOnFeedbackPage}
                                    onChange={(e) => store.updateTestimonial(test.id, { showOnFeedbackPage: e.target.checked })}
                                    className="rounded border-slate-800 text-pink-600 focus:ring-pink-500 h-3.5 w-3.5 bg-slate-900"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black cursor-pointer select-none ${
                                    test.private ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-900 text-slate-500'
                                  }`}
                                    onClick={() => store.updateTestimonial(test.id, { private: !test.private })}
                                  >
                                    {test.private ? 'PRIVATE' : 'PUBLIC'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button
                                      onClick={() => {
                                        setTestimonialForm({
                                          name: test.name,
                                          role: test.role,
                                          location: test.location,
                                          avatar: test.avatar,
                                          rating: test.rating,
                                          comment: test.comment,
                                          profitAmount: test.profitAmount,
                                          verified: test.verified,
                                          date: test.date,
                                          showOnHomepage: test.showOnHomepage,
                                          showOnFeedbackPage: test.showOnFeedbackPage,
                                          private: test.private
                                        });
                                        setEditingTestimonialId(test.id);
                                        setShowTestimonialFormModal(true);
                                      }}
                                      className="text-pink-400 hover:text-pink-300 underline font-bold"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this written review testimonial entry?')) {
                                          store.deleteTestimonial(test.id);
                                        }
                                      }}
                                      className="text-rose-400 hover:text-rose-300"
                                    >
                                      <Trash2 className="w-3.5 h-3.5 inline" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Add Manual Order Modal */}
      {showAddOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0c071a] border border-purple-500/40 rounded-2xl p-6 space-y-4 shadow-2xl font-sans text-xs">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="font-bold text-white font-mono text-sm">ADD MANUAL CUSTOMER ORDER</h3>
              <button onClick={() => setShowAddOrderModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddManualOrderSubmit} className="space-y-3 font-mono">
              <div>
                <label className="text-slate-300 block mb-1">Customer Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hossain"
                  value={addOrderCustomer}
                  onChange={(e) => setAddOrderCustomer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">TradingView Username:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. tanvir_trader"
                  value={addOrderTvUser}
                  onChange={(e) => setAddOrderTvUser(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Indicator Plan:</label>
                <select
                  value={addOrderIndicator}
                  onChange={(e) => setAddOrderIndicator(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="xhuvoqx-infinity">XHUVO QX INFINITY ($400 FLAGSHIP)</option>
                  <option value="xhuvoqx-v5">XHUVO QX V5 ($100 STARTER)</option>
                  <option value="ultimate-secret">ULTIMATE SECRET ($1000)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Payment Method:</label>
                <input
                  type="text"
                  placeholder="e.g. bKash / USDT TRC20"
                  value={addOrderMethod}
                  onChange={(e) => setAddOrderMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Transaction ID / Reference:</label>
                <input
                  type="text"
                  placeholder="e.g. BK82736192"
                  value={addOrderTrx}
                  onChange={(e) => setAddOrderTrx(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono shadow-lg mt-2"
              >
                CREATE ORDER
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Add/Edit Video Modal */}
      {showVideoFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0c071a] border border-purple-500/40 rounded-2xl p-6 my-8 space-y-4 shadow-2xl font-sans text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="font-bold text-white font-mono text-sm uppercase">
                {editingVideoId ? 'EDIT VIDEO FEEDBACK ENTRY' : 'ADD NEW VIDEO FEEDBACK'}
              </h3>
              <button onClick={() => { setShowVideoFormModal(false); setEditingVideoId(null); }} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVideoSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Platform:</label>
                  <select
                    value={videoForm.platform}
                    onChange={(e) => setVideoForm({ ...videoForm, platform: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Telegram">Telegram (VIP File)</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Trader Handle Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. @xhuvoofficial"
                    value={videoForm.traderHandle}
                    onChange={(e) => setVideoForm({ ...videoForm, traderHandle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Video Title (English):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quotex 1M Non-Repaint Proof"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Bangla Headline Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. কোটেক্স ১ মিনিট লাইভ সিগন্যাল প্রমাণ"
                  value={videoForm.banglaTitle}
                  onChange={(e) => setVideoForm({ ...videoForm, banglaTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Video URL (TikTok, YouTube or Telegram Link):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://vt.tiktok.com/ZS4EA6vQJ/"
                  value={videoForm.videoUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-purple-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Embed URL (Optional):</label>
                  <input
                    type="text"
                    placeholder="Auto-calculated if blank"
                    value={videoForm.embedUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, embedUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Thumbnail Image URL:</label>
                  <input
                    type="text"
                    required
                    value={videoForm.thumbnailUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Views Display:</label>
                  <input
                    type="text"
                    value={videoForm.views}
                    onChange={(e) => setVideoForm({ ...videoForm, views: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Likes Display:</label>
                  <input
                    type="text"
                    value={videoForm.likes}
                    onChange={(e) => setVideoForm({ ...videoForm, likes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Tags (comma-separated):</label>
                  <input
                    type="text"
                    placeholder="Tag1, Tag2"
                    value={videoForm.tags}
                    onChange={(e) => setVideoForm({ ...videoForm, tags: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Trader / Author Display Name:</label>
                <input
                  type="text"
                  value={videoForm.traderName}
                  onChange={(e) => setVideoForm({ ...videoForm, traderName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Short Description / Subtext:</label>
                <textarea
                  rows={2}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  placeholder="Review detail details..."
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-purple-400 font-bold block uppercase">VISIBILITY MANAGEMENT CONTROLS:</span>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={videoForm.showOnHomepage}
                      onChange={(e) => setVideoForm({ ...videoForm, showOnHomepage: e.target.checked })}
                      className="rounded border-slate-800 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span>Homepage</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={videoForm.showOnFeedbackPage}
                      onChange={(e) => setVideoForm({ ...videoForm, showOnFeedbackPage: e.target.checked })}
                      className="rounded border-slate-800 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span>Feedback</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={videoForm.private}
                      onChange={(e) => setVideoForm({ ...videoForm, private: e.target.checked })}
                      className="rounded border-slate-800 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span className="text-rose-400 font-bold">Keep Private</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg uppercase"
              >
                {editingVideoId ? 'SAVE CHANGES' : 'PUBLISH VIDEO ENTRY'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add/Edit Audio/Vocal Review Modal */}
      {showVocalFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0c071a] border border-purple-500/40 rounded-2xl p-6 my-8 space-y-4 shadow-2xl font-sans text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="font-bold text-white font-mono text-sm uppercase">
                {editingVocalId ? 'EDIT AUDIO RECORDING FEEDBACK' : 'ADD NEW AUDIO FEEDBACK'}
              </h3>
              <button onClick={() => { setShowVocalFormModal(false); setEditingVocalId(null); }} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVocalSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Client Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="Hasan Mahmud"
                    value={vocalForm.name}
                    onChange={(e) => setVocalForm({ ...vocalForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Trading Role / Bio:</label>
                  <input
                    type="text"
                    required
                    placeholder="Quotex VIP Scalper"
                    value={vocalForm.role}
                    onChange={(e) => setVocalForm({ ...vocalForm, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Location:</label>
                  <input
                    type="text"
                    required
                    placeholder="Dhaka, Bangladesh"
                    value={vocalForm.location}
                    onChange={(e) => setVocalForm({ ...vocalForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Weekly Profit amount:</label>
                  <input
                    type="text"
                    required
                    placeholder="+$340 / week"
                    value={vocalForm.profitAmount}
                    onChange={(e) => setVocalForm({ ...vocalForm, profitAmount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-indigo-400 font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Audio Duration:</label>
                  <input
                    type="text"
                    required
                    placeholder="0:14"
                    value={vocalForm.duration}
                    onChange={(e) => setVocalForm({ ...vocalForm, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Bengali Audio transcript:</label>
                <textarea
                  rows={2}
                  required
                  placeholder="সাউন্ড অ্যালার্ট দিয়ে সিগন্যাল পাই অনেক সুবিধা হয়..."
                  value={vocalForm.notesBN}
                  onChange={(e) => setVocalForm({ ...vocalForm, notesBN: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">English Translation:</label>
                <textarea
                  rows={2}
                  required
                  placeholder="The audio triggers play sound notifications instantly..."
                  value={vocalForm.notesEN}
                  onChange={(e) => setVocalForm({ ...vocalForm, notesEN: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Client Avatar Image URL:</label>
                  <input
                    type="text"
                    required
                    value={vocalForm.avatar}
                    onChange={(e) => setVocalForm({ ...vocalForm, avatar: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Record Date label:</label>
                  <input
                    type="text"
                    value={vocalForm.date}
                    onChange={(e) => setVocalForm({ ...vocalForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-indigo-400 font-bold block uppercase">VISIBILITY MANAGEMENT CONTROLS:</span>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={vocalForm.showOnHomepage}
                      onChange={(e) => setVocalForm({ ...vocalForm, showOnHomepage: e.target.checked })}
                      className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span>Homepage</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={vocalForm.showOnFeedbackPage}
                      onChange={(e) => setVocalForm({ ...vocalForm, showOnFeedbackPage: e.target.checked })}
                      className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span>Feedback</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={vocalForm.private}
                      onChange={(e) => setVocalForm({ ...vocalForm, private: e.target.checked })}
                      className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span className="text-rose-400 font-bold">Keep Private</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg uppercase"
              >
                {editingVocalId ? 'SAVE CHANGES' : 'PUBLISH AUDIO REVIEW'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add/Edit Written Review Modal */}
      {showTestimonialFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0c071a] border border-purple-500/40 rounded-2xl p-6 my-8 space-y-4 shadow-2xl font-sans text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="font-bold text-white font-mono text-sm uppercase">
                {editingTestimonialId ? 'EDIT WRITTEN CLIENT REVIEW' : 'ADD NEW CLIENT TESTIMONIAL'}
              </h3>
              <button onClick={() => { setShowTestimonialFormModal(false); setEditingTestimonialId(null); }} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTestimonialSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Client Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shakil Hossain"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Trading Role / Bio:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quotex Trader"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Location:</label>
                  <input
                    type="text"
                    required
                    placeholder="Dhaka, Bangladesh"
                    value={testimonialForm.location}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Verified Profit Label:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +$1,450 / week"
                    value={testimonialForm.profitAmount}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, profitAmount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-pink-400 font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Telegram / Contact Label:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. @shakil_trader_bd"
                    value={testimonialForm.date}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Client Comment Text:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="XHUVO QX INFINITY indicator ta ek kothay osadharon..."
                  value={testimonialForm.comment}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, comment: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Client Avatar Image URL:</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.avatar}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-pink-400 font-bold block uppercase">VISIBILITY MANAGEMENT CONTROLS:</span>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={testimonialForm.showOnHomepage}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, showOnHomepage: e.target.checked })}
                      className="rounded border-slate-800 text-pink-600 focus:ring-pink-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span>Homepage</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={testimonialForm.showOnFeedbackPage}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, showOnFeedbackPage: e.target.checked })}
                      className="rounded border-slate-800 text-pink-600 focus:ring-pink-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span>Feedback</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={testimonialForm.private}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, private: e.target.checked })}
                      className="rounded border-slate-800 text-pink-600 focus:ring-pink-500 h-3.5 w-3.5 bg-slate-900"
                    />
                    <span className="text-rose-400 font-bold">Keep Private</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-lg uppercase"
              >
                {editingTestimonialId ? 'SAVE CHANGES' : 'PUBLISH CLIENT REVIEW'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
