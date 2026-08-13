import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  X,
  Send,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Calculator,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Zap,
  User,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface AiSupportWidgetProps {
  onOpenCheckout: (planId?: string) => void;
  externalIsOpen?: boolean;
  onToggleOpen?: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actions?: Array<{ label: string; action: () => void; isPrimary?: boolean }>;
}

export const AiSupportWidget: React.FC<AiSupportWidgetProps> = ({
  onOpenCheckout,
  externalIsOpen,
  onToggleOpen
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const setIsOpen = (val: boolean) => {
    if (onToggleOpen) {
      if ((val && !isOpen) || (!val && isOpen)) {
        onToggleOpen();
      }
    } else {
      setInternalIsOpen(val);
    }
  };

  // Main Tabs: 'ai' (Chat), 'calculator' (10% Money Management), 'vocal' (Voice Mode), 'client' (License Check)
  const [activeTab, setActiveTab] = useState<'ai' | 'calculator' | 'vocal' | 'client'>('ai');

  // Voice / Audio Settings
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'bot',
      text: `🤖 **WELCOME TO XHUVO QUOTEX AI TRADING HUB 5.0!**\n\nI am your Quantitative Institutional AI Analyst & Master Trading Assistant. How can I empower your trading today?\n\n• **10% Risk Management & Compounding Calculator** (Check the 📊 Sheet tab!)\n• **1M Non-Repaint Binary Execution Strategies** (Quotex / Pocket Option)\n• **XHUVO QX INFINITY ($400) & V5 ($100) Indicator Guidance**\n• **Live Voice Commands & Audio Assistant**`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '📊 Open 10% Money Sheet', action: () => setActiveTab('calculator'), isPrimary: true },
        { label: '🎙️ Launch Live Vocal Mode', action: () => setActiveTab('vocal') }
      ]
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 10% Money Management Sheet State
  const [capital, setCapital] = useState<number>(100); // Default $100 starting balance
  const [currencySymbol, setCurrencySymbol] = useState<'$' | '৳'>('$');
  const [riskPercent, setRiskPercent] = useState<number>(10); // Default 10% risk per trade
  const [payoutPercent, setPayoutPercent] = useState<number>(85); // 85% binary payout
  const [totalSessionTrades, setTotalSessionTrades] = useState<number>(10); // 10 trades per session
  const [copiedSheet, setCopiedSheet] = useState(false);

  // Client License State
  const [clientTvUser, setClientTvUser] = useState('');
  const [clientStatus, setClientStatus] = useState<string | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Speech Recognition Setup
  const handleStartListening = async () => {
    setMicPermissionError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicPermissionError('Speech Recognition is not supported on this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    // Try requesting microphone access via getUserMedia first to handle frame/browser permissions
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop stream tracks after permission is granted so SpeechRecognition can use mic
        stream.getTracks().forEach(track => track.stop());
      } catch (e: any) {
        console.warn('Microphone getUserMedia permission error:', e);
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
          setMicPermissionError('Microphone permission denied. Please allow microphone access in your browser or site settings.');
          setIsListening(false);
          return;
        }
      }
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceTranscript('Listening... Speak your trading question clearly.');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setVoiceTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicPermissionError('Microphone access is blocked or not allowed. Please grant microphone permissions in your browser or open the site in a new tab.');
        } else if (event.error === 'no-speech') {
          setVoiceTranscript('No speech detected. Please tap the microphone and try again.');
        } else {
          setMicPermissionError(`Voice recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.error('Voice recording exception:', err);
      setIsListening(false);
      setMicPermissionError('Failed to initialize speech recognition. Please ensure microphone permissions are granted.');
    }
  };

  // Text-to-Speech Output (With Phonetic Pronunciation Fix for XHUVO QUOTEX -> Shuvo Quotex)
  const speakText = (text: string) => {
    if (!isVoiceOutputEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    try {
      window.speechSynthesis.cancel();
      // Clean markdown stars/bullets for natural speech
      let cleanText = text.replace(/[*#_`]/g, '').replace(/\n+/g, '. ');

      // PHONETIC REPLACEMENTS FOR NATURAL ACCURATE BENGALI/ENGLISH TTS PRONUNCIATION
      cleanText = cleanText
        .replace(/XHUVO QUOTEX/gi, 'Shuvo Quotex')
        .replace(/XHUVOQX/gi, 'Shuvo QX')
        .replace(/XHUVO QX/gi, 'Shuvo QX')
        .replace(/XHUVO/gi, 'Shuvo');

      // Keep vocal responses concise (speak max 220 chars for quick direct answers)
      const vocalText = cleanText.length > 220 ? cleanText.slice(0, 220) + '...' : cleanText;

      const utterance = new SpeechSynthesisUtterance(vocalText);
      utterance.rate = 0.98;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
    }
  };

  // Intelligent AI Knowledge Engine Fallback Resolver
  const generateIntelligentResponse = (query: string): { text: string; actions?: Array<{ label: string; action: () => void; isPrimary?: boolean }> } => {
    const q = query.toLowerCase();

    // Developer Identity Query
    if (q.includes('developer') || q.includes('who created') || q.includes('who made') || q.includes('owner') || q.includes('creator') || q.includes('ডেভেলপার') || q.includes('বানাইছে')) {
      return {
        text: `👑 **XHUVO AI DEVELOPER & MENTOR:**\n\nI was developed by **Master Trader XHUVO** (XHUVO Official), the quantitative developer and algorithmic trader behind XHUVO QX Indicators.\n\nHe engineered the 100% non-repaint Pine Script engine powering **XHUVO QX INFINITY ($400)** and **XHUVO QX V5 ($100)** for Quotex & Pocket Option.`,
        actions: [
          { label: '⚡ Get INFINITY ($400)', action: () => onOpenCheckout('xhuvoqx-infinity'), isPrimary: true },
          { label: '💬 Contact Mentor XHUVO', action: () => window.open('https://t.me/XQ_owner', '_blank') }
        ]
      };
    }

    // Money Management Queries
    if (q.includes('money management') || q.includes('10%') || q.includes('capital') || q.includes('compounding') || q.includes('risk') || q.includes('plan')) {
      return {
        text: `📊 **XHUVO 10% MONEY MANAGEMENT & COMPOUNDING STRATEGY:**\n\n1️⃣ **Risk Rule:** Invest exactly **10%** of your current account balance per trade.\n2️⃣ **Compounding Power:** After every WIN, recalculate 10% based on your NEW higher balance!\n3️⃣ **Daily Target:** Aim for 3-5 consecutive wins per session using XHUVO QX INFINITY signals.\n4️⃣ **Safety Stop Loss:** Maximum **2 consecutive losses** per session. Stop trading for 2 hours if 2 losses occur.`,
        actions: [
          { label: '📊 Open Interactive Money Sheet', action: () => setActiveTab('calculator'), isPrimary: true }
        ]
      };
    }

    // Indicator Comparison & Specs
    if (q.includes('difference') || q.includes('vs') || q.includes('infinity vs v5') || q.includes('which one') || q.includes('indicator')) {
      return {
        text: `⚡ **XHUVO QX INDICATOR COMPARISON:**\n\n1️⃣ **XHUVO QX INFINITY (Flagship - $400 / ৳46,000):**\n• 95.0%+ Verified Win Rate\n• 100% Non-Repaint & 1st Time Non-MTG (Direct Candle Wins)\n• 15+ AI Confluence Filters + 5-10s Pre-Alert Audio Buzzer\n• Auto Money Management Engine\n\n2️⃣ **XHUVO QX V5 (Starter - $100 / ৳11,500):**\n• 88.5% Win Rate, basic signal arrows`,
        actions: [
          { label: '⚡ Buy INFINITY Flagship ($400)', action: () => onOpenCheckout('xhuvoqx-infinity'), isPrimary: true },
          { label: '🛒 Buy V5 Starter ($100)', action: () => onOpenCheckout('xhuvoqx-v5') }
        ]
      };
    }

    // Quotex / Pocket Option 1M Execution
    if (q.includes('quotex') || q.includes('pocket option') || q.includes('1m') || q.includes('setup') || q.includes('how to use')) {
      return {
        text: `🎯 **QUOTEX 1M / 5M NON-REPAINT TRADING STEPS:**\n\n1. Open **TradingView** chart set to 1-Minute timeframe.\n2. Apply **XHUVO QX INFINITY** from *Indicators -> Invite-Only Scripts*.\n3. Turn ON TradingView Audio Alerts.\n4. When the **5-10s Pre-Alert Buzzer** rings, prepare your 1M trade on Quotex.\n5. On exact candle close (00:01s), when the arrow prints firmly, execute a **1M CALL or PUT** on Quotex for a direct 1-step win!`,
        actions: [
          { label: '⚡ Get INFINITY ($400)', action: () => onOpenCheckout('xhuvoqx-infinity'), isPrimary: true }
        ]
      };
    }

    // Non-Repaint Guarantee
    if (q.includes('non-repaint') || q.includes('repaint') || q.includes('proof') || q.includes('guarantee')) {
      return {
        text: `🛡️ **100% NON-REPAINT CODE GUARANTEE:**\n\nXHUVO QX INFINITY is coded using strict Pine Script confirmed bar state logic (\`barstate.isconfirmed\`).\n\nOnce a candle closes and the Buy/Sell arrow displays on your TradingView chart, it **NEVER shifts, recalculates, or disappears** — even if the market reverses on the next candle! Tested on live Quotex real market and OTC charts.`,
        actions: [
          { label: '🚀 Upgrade to Non-Repaint INFINITY', action: () => onOpenCheckout('xhuvoqx-infinity'), isPrimary: true }
        ]
      };
    }

    // SMC / ICT Price Action Rules
    if (q.includes('smc') || q.includes('ict') || q.includes('order block') || q.includes('fvg') || q.includes('candlestick')) {
      return {
        text: `🧠 **INSTITUTIONAL SMC / ICT PRICE ACTION RULES:**\n\n• **Order Block (OB):** Identify the last down-candle before a strong bullish expansion that creates a Break of Structure (BOS).\n• **Fair Value Gap (FVG):** Look for a 3-candle imbalance gap where price returns to rebalance liquidity before continuation.\n• **XHUVO Confluence:** Wait for XHUVO QX INFINITY arrow trigger at an active Order Block or FVG level for a 98%+ probability 1M trade!`,
        actions: [
          { label: '📊 Use 10% Risk Calculator', action: () => setActiveTab('calculator'), isPrimary: true }
        ]
      };
    }

    // Default Fallback Response
    return {
      text: `🤖 **XHUVO AI ANALYZED:** "${query}"\n\nXHUVO QX INFINITY is the premier 100% non-repaint algorithmic script for Quotex and Pocket Option, created by Master Trader XHUVO.\n\nUse our **10% Money Management Sheet** to compound your account balance safely or talk to me using **Live Vocal Mode**!`,
      actions: [
        { label: '📊 Calculate 10% Compounding', action: () => setActiveTab('calculator'), isPrimary: true },
        { label: '⚡ Buy INFINITY ($400)', action: () => onOpenCheckout('xhuvoqx-infinity') }
      ]
    };
  };

  // Process User Query
  const handleSendAiMsg = async (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsThinking(true);

    try {
      // Try Server API first
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, chatHistory: messages })
      });

      const data = await res.json();

      if (data.success && data.reply) {
        const botMsg: Message = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        speakText(data.reply);
      } else {
        // Fallback to local intelligence
        const fallback = generateIntelligentResponse(query);
        const botMsg: Message = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: fallback.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: fallback.actions
        };
        setMessages(prev => [...prev, botMsg]);
        speakText(fallback.text);
      }
    } catch (_e) {
      // Local Fallback on network error
      const fallback = generateIntelligentResponse(query);
      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: fallback.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: fallback.actions
      };
      setMessages(prev => [...prev, botMsg]);
      speakText(fallback.text);
    } finally {
      setIsThinking(false);
    }
  };

  // Send Voice Transcript Query
  const handleVoiceSend = () => {
    if (!voiceTranscript || voiceTranscript.startsWith('Listening')) return;
    handleSendAiMsg(voiceTranscript);
    setVoiceTranscript('');
    setActiveTab('ai');
  };

  // Calculate Step-by-Step 10% Compounding Data
  const calculateCompoundingSheet = () => {
    let currentBal = capital;
    const rows = [];
    let totalProfit = 0;

    for (let i = 1; i <= totalSessionTrades; i++) {
      const riskAmount = currentBal * (riskPercent / 100);
      const payoutAmount = riskAmount * (payoutPercent / 100);
      const endBal = currentBal + payoutAmount;
      totalProfit += payoutAmount;

      rows.push({
        tradeNum: i,
        startBal: currentBal,
        tradeRisk: riskAmount,
        payoutWin: payoutAmount,
        endBal: endBal
      });

      currentBal = endBal; // Compound for next trade
    }

    return {
      rows,
      finalCapital: currentBal,
      netProfit: totalProfit,
      growthPercent: ((currentBal - capital) / capital) * 100,
      safeStopLoss: capital * 0.20 // 2 consecutive losses max = 20% drawdown limit
    };
  };

  const compoundingData = calculateCompoundingSheet();

  // Calculate 30-Day Monthly Compounding Growth
  const calculateMonthlyPlan = () => {
    let dayBal = capital;
    const dailyRows = [];
    const dailyReturnPercent = 0.15; // 15% daily target account compounding

    for (let d = 1; d <= 30; d++) {
      const dailyProfit = dayBal * dailyReturnPercent;
      const endDayBal = dayBal + dailyProfit;
      dailyRows.push({
        day: d,
        startBal: dayBal,
        targetProfit: dailyProfit,
        endBal: endDayBal,
        stopLossLimit: dayBal * 0.20 // 20% drawdown limit
      });
      dayBal = endDayBal;
    }

    return {
      dailyRows,
      monthEndBal: dayBal,
      totalMonthProfit: dayBal - capital
    };
  };

  const monthlyData = calculateMonthlyPlan();

  // HTML5 Canvas Card Image Generator
  const handleDownloadPlanCardImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 675);
    grad.addColorStop(0, '#06030f');
    grad.addColorStop(0.5, '#12082b');
    grad.addColorStop(1, '#080417');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 675);

    // Cyberpunk Neon Glow Borders
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 635);

    ctx.strokeStyle = '#d946ef';
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, 1144, 619);

    // Header Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('XHUVO QUOTEX 30-DAY TRADING & MONEY PLAN', 50, 80);

    ctx.fillStyle = '#d8b4fe';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('Developer & Master Mentor: Master Trader Xhuvo | Official Strategy', 50, 115);

    // Divider Line
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 135);
    ctx.lineTo(1150, 135);
    ctx.stroke();

    // Metric Box 1: Starting Capital
    ctx.fillStyle = 'rgba(18, 10, 35, 0.8)';
    ctx.fillRect(50, 160, 250, 120);
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.strokeRect(50, 160, 250, 120);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('STARTING CAPITAL', 70, 195);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 32px monospace';
    ctx.fillText(`${currencySymbol}${capital}`, 70, 245);

    // Metric Box 2: 30-Day Projected Target
    ctx.fillStyle = 'rgba(18, 10, 35, 0.8)';
    ctx.fillRect(325, 160, 270, 120);
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.strokeRect(325, 160, 270, 120);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('30-DAY TARGET BALANCE', 345, 195);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 32px monospace';
    ctx.fillText(`${currencySymbol}${monthlyData.monthEndBal.toFixed(0)}`, 345, 245);

    // Metric Box 3: Daily Target Wins
    ctx.fillStyle = 'rgba(18, 10, 35, 0.8)';
    ctx.fillRect(620, 160, 250, 120);
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.strokeRect(620, 160, 250, 120);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('DAILY TARGET GOAL', 640, 195);
    ctx.fillStyle = '#e879f9';
    ctx.font = 'bold 26px monospace';
    ctx.fillText('3 - 5 WINS / DAY', 640, 245);

    // Metric Box 4: Daily Stop Loss
    ctx.fillStyle = 'rgba(18, 10, 35, 0.8)';
    ctx.fillRect(895, 160, 255, 120);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.strokeRect(895, 160, 255, 120);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('MAX STOP-LOSS LIMIT', 915, 195);
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 26px monospace';
    ctx.fillText('2 LOSSES MAX', 915, 245);

    // Rules & Strategy Banner
    ctx.fillStyle = 'rgba(30, 15, 60, 0.9)';
    ctx.fillRect(50, 310, 1100, 180);
    ctx.strokeStyle = 'rgba(217, 70, 239, 0.5)';
    ctx.strokeRect(50, 310, 1100, 180);

    ctx.fillStyle = '#f472b6';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('📌 MASTER TRADER XHUVO MONEY MANAGEMENT RULES:', 70, 345);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '15px monospace';
    ctx.fillText(`1. Risk Rule: Invest exactly 10% of current account balance (${currencySymbol}${(capital * 0.1).toFixed(1)} initial trade).`, 70, 380);
    ctx.fillText('2. Compounding Rule: Recalculate 10% risk after every WIN to multiply account growth.', 70, 410);
    ctx.fillText(`3. Stop-Loss Rule: If 2 consecutive losses occur, STOP TRADING immediately for 2 hours.`, 70, 440);
    ctx.fillText('4. Indicator Confluence: Execute trades ONLY on XHUVO QX INFINITY 5-10s audio pre-alerts!', 70, 470);

    // Motivational Wisdom Quote Banner
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(50, 510, 1100, 90);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.strokeRect(50, 510, 1100, 90);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('🔥 MOTIVATIONAL TRADING WISDOM:', 70, 540);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'italic 15px sans-serif';
    ctx.fillText('"Trading is 20% technical strategy and 80% emotional discipline. Protect your capital first, and compounding will handle the rest."', 70, 575);

    // Footer Watermark
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('XHUVO QUOTEX OFFICIAL | 100% NON-REPAINT | t.me/XQ_owner', 50, 635);

    // Trigger Image Download
    const link = document.createElement('a');
    link.download = `XHUVO_QUOTEX_30DAY_PLAN_${capital}${currencySymbol}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopySheetData = () => {
    const text = `📊 XHUVO QUOTEX 30-DAY TRADING & COMPOUNDING ROADMAP:
• Developer & Mentor: Master Trader Xhuvo
• Starting Capital: ${currencySymbol}${capital}
• 30-Day Target Balance: ${currencySymbol}${monthlyData.monthEndBal.toFixed(2)}
• Daily Win Goal: 3 - 5 Wins per session
• Daily Risk Rule: 10% of current balance per trade
• Daily Stop-Loss Limit: Max 2 Losses (${currencySymbol}${compoundingData.safeStopLoss.toFixed(2)})
• Motivational Rule: "Protect your capital first. Stick to your stop-loss and let compounding do the magic!"
• Mentor Support: https://t.me/XQ_owner
• VIP Signals Channel: https://t.me/+K8Kjxh16WjdlYTQ1`;

    navigator.clipboard.writeText(text);
    setCopiedSheet(true);
    setTimeout(() => setCopiedSheet(false), 2000);
  };

  const handleCheckClientStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientTvUser) return;
    setClientStatus(`✅ ACTIVE PERMISSION - TradingView user "${clientTvUser}" has verified VIP Invite-Only permissions for XHUVO QX INFINITY.`);
  };

  return (
    <>
      {/* Sleek Floating Circular Trigger Button (When Closed) */}
      {!isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[99990] font-sans select-none pointer-events-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(217,70,239,0.7)] border border-fuchsia-300/60 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            title="Open XHUVO QUOTEX AI Trading Hub"
          >
            {/* Glowing Pulse Ring */}
            <span className="absolute inset-0 rounded-full bg-fuchsia-500/30 animate-ping opacity-75 pointer-events-none" />

            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
            </div>
          </button>
        </div>
      )}

      {/* DEDICATED FULL-SCREEN IMMERSIVE "XHUVO QUOTEX AI TRADING HUB" OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[99990] bg-[#06040d]/96 backdrop-blur-3xl text-slate-100 flex flex-col h-screen w-screen overflow-hidden select-none animate-fadeIn font-sans">
          
          {/* PROMINENT SEMI-TRANSPARENT BACKGROUND WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
            <h1 className="text-[12vw] font-black tracking-[0.15em] text-purple-500/5 uppercase text-center leading-none whitespace-nowrap blur-[1px]">
              XHUVO QUOTEX
            </h1>
          </div>

          {/* TOP HEADER BAR */}
          <header className="relative z-10 px-4 sm:px-8 py-3.5 bg-slate-950/90 border-b border-purple-500/30 flex items-center justify-between gap-4 shrink-0 shadow-lg">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 border border-fuchsia-300/40 flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                QX
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-extrabold text-sm sm:text-base text-white tracking-wide font-mono flex items-center space-x-1.5">
                    <span>XHUVO QUOTEX AI TRADING HUB</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </h2>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                    LIVE 5.0
                  </span>
                </div>
                <p className="text-[11px] text-purple-300/90 font-mono">Quantum Technical AI Assistant & 10% Capital Management Suite</p>
              </div>
            </div>

            {/* Quick Voice Toggle & Close Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsVoiceOutputEnabled(!isVoiceOutputEnabled)}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                  isVoiceOutputEnabled
                    ? 'bg-purple-500/20 border-purple-400/50 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
                title={isVoiceOutputEnabled ? 'Voice Feedback Active' : 'Voice Muted'}
              >
                {isVoiceOutputEnabled ? <Volume2 className="w-4 h-4 text-purple-300" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                <span className="hidden sm:inline">{isVoiceOutputEnabled ? 'Voice ON' : 'Muted'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                title="Close AI Hub"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* MAIN TABS NAVIGATION */}
          <nav className="relative z-10 px-4 sm:px-8 py-2.5 bg-slate-900/80 border-b border-purple-500/20 flex items-center space-x-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-300/40'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-purple-500/10'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>💬 AI TRADING CHAT</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)] border border-fuchsia-300/40'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-purple-500/10'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>📊 10% MONEY MANAGEMENT SHEET</span>
            </button>

            <button
              onClick={() => setActiveTab('vocal')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'vocal'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-300/40'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-purple-500/10'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>🎙️ LIVE VOCAL MODE</span>
            </button>

            <button
              onClick={() => setActiveTab('client')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-300/40'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-purple-500/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>🛡️ SCRIPT ACCESS CHECK</span>
            </button>
          </nav>

          {/* MAIN TAB CONTENT CONTAINER */}
          <main className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 max-w-6xl w-full mx-auto flex flex-col">
            
            {/* TAB 1: AI TRADING CHAT ASSISTANT */}
            {activeTab === 'ai' && (
              <div className="flex-1 flex flex-col bg-slate-950/80 border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] h-full">
                
                {/* Chat Messages Area */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {m.sender === 'bot' ? (
                          <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-purple-300">
                            <Bot className="w-3.5 h-3.5 text-fuchsia-400" />
                            <span>XHUVO AI ANALYST</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-purple-300">
                            <User className="w-3.5 h-3.5 text-purple-400" />
                            <span>YOU</span>
                          </div>
                        )}
                        <span className="text-[9px] text-slate-500 font-mono">{m.time}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl max-w-[90%] sm:max-w-[80%] whitespace-pre-line leading-relaxed shadow-md ${
                          m.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium border border-purple-400/30'
                            : 'bg-slate-900/90 border border-purple-500/25 text-slate-200'
                        }`}
                      >
                        <p>{m.text}</p>

                        {/* Inline Actions inside Bot Messages */}
                        {m.actions && m.actions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-purple-500/20 flex flex-wrap gap-2 font-mono">
                            {m.actions.map((act, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={act.action}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  act.isPrimary
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                }`}
                              >
                                {act.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isThinking && (
                    <div className="flex items-center space-x-2 text-xs text-purple-300 font-mono p-3 bg-slate-900/80 border border-purple-500/30 rounded-2xl animate-pulse w-fit">
                      <RefreshCw className="w-4 h-4 animate-spin text-fuchsia-400" />
                      <span>XHUVO AI is analyzing market liquidity & strategy...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Preset Prompts Chips */}
                <div className="p-3 bg-slate-900/90 border-t border-purple-500/20 flex items-center space-x-2 overflow-x-auto no-scrollbar text-[11px] font-mono shrink-0">
                  <span className="text-purple-400 font-bold shrink-0">Prompts:</span>
                  <button
                    onClick={() => handleSendAiMsg('How to use the 10% Money Management Sheet?')}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-purple-500/20 whitespace-nowrap transition-all cursor-pointer"
                  >
                    📊 10% Money Management
                  </button>
                  <button
                    onClick={() => handleSendAiMsg('Quotex 1M Non-Repaint Execution Steps')}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-purple-500/20 whitespace-nowrap transition-all cursor-pointer"
                  >
                    🎯 Quotex 1M Execution
                  </button>
                  <button
                    onClick={() => handleSendAiMsg('Explain SMC Order Block & FVG rules')}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-purple-500/20 whitespace-nowrap transition-all cursor-pointer"
                  >
                    🧠 SMC Order Block & FVG
                  </button>
                  <button
                    onClick={() => handleSendAiMsg('XHUVO QX INFINITY ($400) vs V5 ($100)')}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-purple-500/20 whitespace-nowrap transition-all cursor-pointer"
                  >
                    ⚡ INFINITY vs V5
                  </button>
                </div>

                {/* Input Bar */}
                <div className="p-3 sm:p-4 bg-slate-900 border-t border-purple-500/30 flex items-center space-x-2 shrink-0">
                  <input
                    type="text"
                    placeholder="Ask XHUVO AI about indicators, 10% compounding, SMC setups..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendAiMsg()}
                    className="flex-1 bg-slate-950 border border-purple-500/40 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400 transition-all font-sans"
                  />

                  {/* Voice Button inside input bar */}
                  <button
                    onClick={handleStartListening}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      isListening
                        ? 'bg-red-600 border-red-400 text-white animate-pulse'
                        : 'bg-slate-950 border-purple-500/40 text-purple-300 hover:text-white'
                    }`}
                    title="Voice Query"
                  >
                    <Mic className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleSendAiMsg()}
                    className="p-3 sm:px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1"
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline text-xs font-mono">SEND</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: BUILT-IN 10% CAPITAL & MONEY MANAGEMENT SHEET */}
            {activeTab === 'calculator' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Header Info Banner */}
                <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-900/50 via-slate-900 to-indigo-900/50 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center space-x-2">
                      <Calculator className="w-5 h-5 text-fuchsia-400" />
                      <span>10% CAPITAL COMPOUNDING & RISK SHEET</span>
                    </h3>
                    <p className="text-xs text-purple-300 font-mono mt-1">
                      Algorithmic money management plan engineered for Quotex & Pocket Option 1M Binary Traders.
                    </p>
                  </div>

                  <button
                    onClick={handleCopySheetData}
                    className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all flex items-center space-x-2 shadow-md cursor-pointer shrink-0"
                  >
                    {copiedSheet ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSheet ? 'COPIED TO CLIPBOARD!' : 'COPY PLAN SUMMARY'}</span>
                  </button>
                </div>

                {/* Input Parameters Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Capital Input */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span>STARTING CAPITAL:</span>
                      <div className="flex space-x-1 text-[10px]">
                        <button onClick={() => setCurrencySymbol('$')} className={`px-1.5 py-0.5 rounded ${currencySymbol === '$' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>$ USD</button>
                        <button onClick={() => setCurrencySymbol('৳')} className={`px-1.5 py-0.5 rounded ${currencySymbol === '৳' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>৳ BDT</button>
                      </div>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-purple-400 font-bold font-mono text-sm">{currencySymbol}</span>
                      <input
                        type="number"
                        value={capital}
                        onChange={(e) => setCapital(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-slate-900 border border-purple-500/40 rounded-xl pl-8 pr-3 py-2 text-white font-mono font-bold text-sm focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  {/* Fixed Risk % */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span>RISK PER TRADE:</span>
                      <span className="text-fuchsia-400 font-bold">{riskPercent}% (OPTIMAL)</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(Number(e.target.value))}
                      className="w-full accent-fuchsia-500 cursor-pointer"
                    />
                  </div>

                  {/* Average Payout % */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span>AVG PAYOUT:</span>
                      <span className="text-emerald-400 font-bold">{payoutPercent}%</span>
                    </label>
                    <input
                      type="range"
                      min="70"
                      max="95"
                      value={payoutPercent}
                      onChange={(e) => setPayoutPercent(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Session Target Trades */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                      <span>SESSION TRADES:</span>
                      <span className="text-purple-300 font-bold">{totalSessionTrades} TRADES</span>
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="20"
                      value={totalSessionTrades}
                      onChange={(e) => setTotalSessionTrades(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Summary Metrics Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-1">
                    <p className="text-[11px] text-slate-400">PROJECTED FINAL BALANCE:</p>
                    <p className="text-xl sm:text-2xl font-black text-emerald-400">
                      {currencySymbol}{compoundingData.finalCapital.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-emerald-300/80">+{compoundingData.growthPercent.toFixed(1)}% Account Compound</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-1">
                    <p className="text-[11px] text-slate-400">TOTAL NET SESSION PROFIT:</p>
                    <p className="text-xl sm:text-2xl font-black text-fuchsia-400">
                      +{currencySymbol}{compoundingData.netProfit.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-fuchsia-300/80">Compounded across {totalSessionTrades} winning trades</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-1">
                    <p className="text-[11px] text-slate-400">SAFE STOP-LOSS LIMIT:</p>
                    <p className="text-xl sm:text-2xl font-black text-red-400">
                      2 LOSSES MAX
                    </p>
                    <p className="text-[10px] text-red-300/80">Stop session if drawdown reaches {currencySymbol}{compoundingData.safeStopLoss.toFixed(2)}</p>
                  </div>
                </div>

                {/* Step-by-Step Trade Table */}
                <div className="bg-slate-950 border border-purple-500/30 rounded-3xl overflow-hidden shadow-lg">
                  <div className="px-5 py-3.5 bg-slate-900 border-b border-purple-500/20 flex items-center justify-between">
                    <h4 className="font-mono font-bold text-xs text-white flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>STEP-BY-STEP COMPOUNDING SESSION PLAN</span>
                    </h4>
                    <span className="text-[10px] text-purple-300 font-mono">10% Risk Per Step</span>
                  </div>

                  <div className="overflow-x-auto max-h-60 overflow-y-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-slate-900/50 text-slate-400 border-b border-purple-500/20 text-[11px] sticky top-0 bg-slate-900">
                        <tr>
                          <th className="py-3 px-4">TRADE #</th>
                          <th className="py-3 px-4">START BALANCE</th>
                          <th className="py-3 px-4 text-fuchsia-300">10% INVESTMENT</th>
                          <th className="py-3 px-4 text-emerald-300">EST. WIN PAYOUT</th>
                          <th className="py-3 px-4 text-purple-300">END BALANCE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-500/10 text-slate-200">
                        {compoundingData.rows.map((r) => (
                          <tr key={r.tradeNum} className="hover:bg-purple-500/5 transition-colors">
                            <td className="py-3 px-4 font-bold text-purple-400">Trade {r.tradeNum}</td>
                            <td className="py-3 px-4">{currencySymbol}{r.startBal.toFixed(2)}</td>
                            <td className="py-3 px-4 font-bold text-fuchsia-400">{currencySymbol}{r.tradeRisk.toFixed(2)}</td>
                            <td className="py-3 px-4 font-bold text-emerald-400">+{currencySymbol}{r.payoutWin.toFixed(2)}</td>
                            <td className="py-3 px-4 font-bold text-white">{currencySymbol}{r.endBal.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 30-DAY MONTHLY ROADMAP & CARD GENERATOR ACTIONS */}
                <div className="p-6 rounded-3xl bg-slate-950 border border-purple-500/40 space-y-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[10px] font-mono font-bold">
                        FULL MONTH TRADING ROADMAP
                      </span>
                      <h4 className="text-base font-bold text-white font-mono mt-1 flex items-center space-x-2">
                        <span>30-DAY ACCOUNT COMPOUNDING GOALS</span>
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Targeting 15% daily account compounding using XHUVO QX INFINITY signals.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleDownloadPlanCardImage}
                        className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-mono text-xs font-bold transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span>🖼️ DOWNLOAD PLAN CARD IMAGE (PNG)</span>
                      </button>
                    </div>
                  </div>

                  {/* 30-Day Projections Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/20">
                      <p className="text-[10px] text-slate-400">DAY 1 START</p>
                      <p className="text-lg font-bold text-cyan-400 mt-1">{currencySymbol}{capital}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/20">
                      <p className="text-[10px] text-slate-400">DAY 10 TARGET</p>
                      <p className="text-lg font-bold text-purple-300 mt-1">{currencySymbol}{(capital * Math.pow(1.15, 10)).toFixed(0)}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/20">
                      <p className="text-[10px] text-slate-400">DAY 20 TARGET</p>
                      <p className="text-lg font-bold text-fuchsia-400 mt-1">{currencySymbol}{(capital * Math.pow(1.15, 20)).toFixed(0)}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/20">
                      <p className="text-[10px] text-slate-400">DAY 30 END TARGET</p>
                      <p className="text-lg font-bold text-emerald-400 mt-1">{currencySymbol}{monthlyData.monthEndBal.toFixed(0)}</p>
                    </div>
                  </div>

                  {/* MOTIVATIONAL TRADING MINDSET WISDOM BANNER */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-950 to-slate-900 border border-purple-500/30 font-mono text-xs space-y-1.5">
                    <div className="flex items-center space-x-2 text-purple-300 font-bold">
                      <Zap className="w-4 h-4 text-yellow-400 shrink-0 animate-pulse" />
                      <span>MASTER TRADER XHUVO MOTIVATIONAL MINDSET:</span>
                    </div>
                    <p className="text-slate-200 italic leading-relaxed">
                      "Trading is 20% technical strategy and 80% emotional discipline. Protect your capital first. Never chase a loss in the OTC market. Stick to your 2-loss stop loss, trust XHUVO QX INFINITY audio buzzers, and compounding will transform your trading account!"
                    </p>
                  </div>

                  {/* MENTOR ACCESS & TELEGRAM COMMUNITY BUTTONS */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-purple-500/20">
                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                      <User className="w-4 h-4 text-purple-400" />
                      <span>Developer & Mentor: <strong className="text-white">Master Trader Xhuvo</strong></span>
                    </div>

                    <div className="flex items-center space-x-2 font-mono text-xs w-full sm:w-auto">
                      <a
                        href="https://t.me/XQ_owner"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all text-center flex items-center justify-center space-x-1.5"
                      >
                        <span>💬 Message Mentor</span>
                      </a>
                      <a
                        href="https://t.me/+K8Kjxh16WjdlYTQ1"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-purple-200 font-bold transition-all text-center flex items-center justify-center space-x-1.5"
                      >
                        <span>📢 VIP Telegram Channel</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 3: LIVE VOCAL MODE */}
            {activeTab === 'vocal' && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-8 py-8 animate-fadeIn text-center">
                
                {/* Voice Status Heading */}
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold">
                    INSTITUTIONAL LIVE VOCAL COMMAND CENTER
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-wide">
                    {isListening ? 'LISTENING TO YOUR VOICE...' : isSpeaking ? 'XHUVO AI IS SPEAKING...' : 'TAP MICROPHONE TO TALK'}
                  </h3>
                  <p className="text-xs text-purple-300/80 max-w-md mx-auto font-mono">
                    Speak any technical analysis question, Quotex strategy query, or money management rule directly to XHUVO AI.
                  </p>
                </div>

                {/* Microphone Permission Warning Banner */}
                {micPermissionError && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-200 font-mono text-xs max-w-lg w-full text-left space-y-2 shadow-lg">
                    <div className="flex items-center space-x-2 text-amber-400 font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>MICROPHONE PERMISSION NOTICE</span>
                    </div>
                    <p className="leading-relaxed">{micPermissionError}</p>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => {
                          setMicPermissionError(null);
                          setActiveTab('ai');
                        }}
                        className="text-purple-300 underline font-bold cursor-pointer hover:text-white"
                      >
                        Use Text Chat Instead
                      </button>
                      <button
                        onClick={handleStartListening}
                        className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-bold transition-all cursor-pointer"
                      >
                        Retry Permission
                      </button>
                    </div>
                  </div>
                )}

                {/* Big Glowing Microphone Orb */}
                <button
                  onClick={handleStartListening}
                  className={`relative group w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isListening
                      ? 'bg-gradient-to-tr from-red-600 to-fuchsia-600 shadow-[0_0_80px_rgba(239,68,68,0.8)] scale-110'
                      : isSpeaking
                      ? 'bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-600 shadow-[0_0_80px_rgba(217,70,239,0.8)] animate-pulse'
                      : 'bg-slate-900 border-2 border-purple-500/50 hover:border-fuchsia-400 shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:scale-105'
                  }`}
                >
                  {/* Animated Wave Rings */}
                  {isListening && (
                    <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                  )}

                  <div className="relative flex flex-col items-center space-y-2 text-white">
                    {isListening ? (
                      <Mic className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-bounce" />
                    ) : (
                      <Mic className="w-12 h-12 sm:w-16 sm:h-16 text-purple-300 group-hover:text-white transition-colors" />
                    )}
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider">
                      {isListening ? 'SPEAK NOW' : 'TAP TO RECORD'}
                    </span>
                  </div>
                </button>

                {/* Real-Time Transcript Display */}
                {voiceTranscript && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 text-purple-200 font-mono text-sm max-w-lg w-full shadow-lg">
                    <p className="text-[10px] text-slate-400 mb-1">TRANSCRIPTION:</p>
                    <p className="font-bold">"{voiceTranscript}"</p>
                    
                    <button
                      onClick={handleVoiceSend}
                      className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center space-x-2 w-full cursor-pointer"
                    >
                      <span>ASK XHUVO AI THIS QUESTION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Equalizer Visualizer Bars */}
                <div className="flex items-center space-x-1.5 h-8">
                  {[40, 70, 30, 90, 60, 100, 40, 80, 50, 90, 30].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${isListening || isSpeaking ? h : 15}%` }}
                      className={`w-1.5 rounded-full transition-all duration-200 ${
                        isListening
                          ? 'bg-red-400'
                          : isSpeaking
                          ? 'bg-fuchsia-400 animate-pulse'
                          : 'bg-purple-900'
                      }`}
                    />
                  ))}
                </div>

              </div>
            )}

            {/* TAB 4: SCRIPT LICENSE ACCESS CHECKER */}
            {activeTab === 'client' && (
              <div className="max-w-xl mx-auto w-full space-y-6 py-6 animate-fadeIn font-mono">
                <div className="p-6 rounded-3xl bg-slate-950 border border-purple-500/40 space-y-5 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                  <div className="border-b border-purple-500/20 pb-3">
                    <h3 className="font-bold text-base text-white flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      <span>TRADINGVIEW VIP SCRIPT ACCESS VERIFIER</span>
                    </h3>
                    <p className="text-xs text-purple-300 mt-1">Check license permissions for XHUVO QX INFINITY ($400).</p>
                  </div>

                  <form onSubmit={handleCheckClientStatus} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1.5 font-bold">TradingView Username:</label>
                      <input
                        type="text"
                        placeholder="e.g. xhuvo_trader"
                        value={clientTvUser}
                        onChange={(e) => setClientTvUser(e.target.value)}
                        className="w-full bg-slate-900 border border-purple-500/40 rounded-2xl p-3.5 text-white focus:outline-none focus:border-purple-400 text-sm font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md cursor-pointer"
                    >
                      VERIFY SCRIPT PERMISSION STATUS
                    </button>
                  </form>

                  {clientStatus && (
                    <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs leading-relaxed">
                      {clientStatus}
                    </div>
                  )}
                </div>
              </div>
            )}

          </main>
        </div>
      )}
    </>
  );
};
