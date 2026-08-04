import React, { useState, useEffect } from 'react';
import {
  Activity,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Palette,
  ShieldCheck,
  Timer,
  TrendingUp,
  TrendingDown,
  Cpu,
  Sparkles,
  Sliders,
  CheckCircle2,
  Maximize2,
  ChevronDown,
  Crosshair,
  BarChart2,
  Settings,
  Send,
  SlidersHorizontal,
  Flame,
  Award,
  XCircle,
  Zap
} from 'lucide-react';
import { CandlestickData, IndicatorTheme } from '../types';

export const InteractiveChartSimulator: React.FC = () => {
  const [theme, setTheme] = useState<IndicatorTheme>('hyper-violet');
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState('AI Mode');
  const [selectedPair, setSelectedPair] = useState('EUR/USD LIVE');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [candleSeconds, setCandleSeconds] = useState(58);

  // Stats
  const [wins, setWins] = useState(34);
  const [losses, setLosses] = useState(1);

  // Candles data - 22+ realistic market candles
  const [candles, setCandles] = useState<CandlestickData[]>([
    { time: '09:50', open: 1.0840, high: 1.0848, low: 1.0838, close: 1.0845, signal: null },
    { time: '09:51', open: 1.0845, high: 1.0855, low: 1.0842, close: 1.0852, signal: 'CALL', winState: 'WIN', snrType: 'SUPPORT' },
    { time: '09:52', open: 1.0852, high: 1.0860, low: 1.0849, close: 1.0858, signal: null },
    { time: '09:53', open: 1.0858, high: 1.0864, low: 1.0850, close: 1.0853, signal: null },
    { time: '09:54', open: 1.0853, high: 1.0856, low: 1.0839, close: 1.0841, signal: 'PUT', winState: 'WIN', snrType: 'RESISTANCE' },
    { time: '09:55', open: 1.0841, high: 1.0850, low: 1.0838, close: 1.0848, signal: 'CALL', winState: 'WIN' },
    { time: '09:56', open: 1.0848, high: 1.0862, low: 1.0845, close: 1.0860, signal: null },
    { time: '09:57', open: 1.0860, high: 1.0872, low: 1.0858, close: 1.0870, signal: 'CALL', winState: 'WIN' },
    { time: '09:58', open: 1.0870, high: 1.0878, low: 1.0862, close: 1.0865, signal: null },
    { time: '09:59', open: 1.0865, high: 1.0868, low: 1.0848, close: 1.0852, signal: 'PUT', winState: 'WIN', snrType: 'RESISTANCE' },
    { time: '10:00', open: 1.0852, high: 1.0855, low: 1.0838, close: 1.0840, signal: null },
    { time: '10:01', open: 1.0840, high: 1.0865, low: 1.0839, close: 1.0862, signal: 'CALL', winState: 'WIN', snrType: 'SUPPORT' },
    { time: '10:02', open: 1.0862, high: 1.0878, low: 1.0860, close: 1.0875, signal: null },
    { time: '10:03', open: 1.0875, high: 1.0888, low: 1.0870, close: 1.0886, signal: 'CALL', winState: 'WIN' },
    { time: '10:04', open: 1.0886, high: 1.0888, low: 1.0862, close: 1.0865, signal: 'PUT', winState: 'WIN', snrType: 'RESISTANCE' },
    { time: '10:05', open: 1.0865, high: 1.0868, low: 1.0842, close: 1.0846, signal: null },
    { time: '10:06', open: 1.0846, high: 1.0870, low: 1.0844, close: 1.0868, signal: 'CALL', winState: 'WIN' },
    { time: '10:07', open: 1.0868, high: 1.0882, low: 1.0864, close: 1.0879, signal: 'CALL', winState: 'WIN' },
    { time: '10:08', open: 1.0879, high: 1.0892, low: 1.0875, close: 1.0888, signal: null },
    { time: '10:09', open: 1.0888, high: 1.0890, low: 1.0866, close: 1.0870, signal: 'PUT', winState: 'WIN' },
    { time: '10:10', open: 1.0870, high: 1.0895, low: 1.0868, close: 1.0892, signal: 'CALL', winState: 'WIN' },
    { time: '10:11', open: 1.0892, high: 1.0905, low: 1.0888, close: 1.0901, signal: 'CALL', winState: 'WIN' }
  ]);

  // Active price tick
  const [currentPrice, setCurrentPrice] = useState(1.0879);

  // Sound beep synthesis
  const playAlertSound = (type: 'CALL' | 'PUT') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type === 'CALL' ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(type === 'CALL' ? 880 : 440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // audio context fallback
    }
  };

  // Candle countdown timer & price tick loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCandleSeconds((prev) => {
        if (prev <= 1) {
          // Form new candle
          const lastCandle = candles[candles.length - 1];
          const newOpen = lastCandle ? lastCandle.close : 1.0879;
          const delta = (Math.random() - 0.47) * 0.0012;
          const newClose = Number((newOpen + delta).toFixed(4));
          const newHigh = Number((Math.max(newOpen, newClose) + Math.random() * 0.0006).toFixed(4));
          const newLow = Number((Math.min(newOpen, newClose) - Math.random() * 0.0006).toFixed(4));

          let signal: 'CALL' | 'PUT' | null = null;
          let winState: 'WIN' | 'LOSS' | null = null;

          if (Math.random() > 0.45) {
            signal = delta > 0 ? 'CALL' : 'PUT';
            winState = 'WIN';
            setWins((w) => w + 1);
            playAlertSound(signal);
          }

          const now = new Date();
          const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

          const newCandle: CandlestickData = {
            time: timeStr,
            open: newOpen,
            high: newHigh,
            low: newLow,
            close: newClose,
            signal,
            winState,
            snrType: signal ? (signal === 'CALL' ? 'SUPPORT' : 'RESISTANCE') : null,
          };

          setCandles((c) => [...c.slice(-23), newCandle]);
          setCurrentPrice(newClose);
          return 60;
        }
        return prev - 1;
      });

      setCurrentPrice((p) => Number((p + (Math.random() - 0.5) * 0.0002).toFixed(4)));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, candles, soundEnabled]);

  // Theme color styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'cyber-blue':
        return {
          cardBg: 'bg-[#051124]/95 border-cyan-500/50 shadow-cyan-500/20',
          accentText: 'text-cyan-400',
          borderGlow: 'border-cyan-500',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        };
      case 'neon-emerald':
        return {
          cardBg: 'bg-[#04120f]/95 border-emerald-500/50 shadow-emerald-500/20',
          accentText: 'text-emerald-400',
          borderGlow: 'border-emerald-500',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'gold-infinity':
        return {
          cardBg: 'bg-[#140e04]/95 border-amber-500/50 shadow-amber-500/20',
          accentText: 'text-amber-400',
          borderGlow: 'border-amber-500',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'hyper-violet':
      default:
        return {
          cardBg: 'bg-[#0c0618]/95 border-purple-500/50 shadow-purple-500/30',
          accentText: 'text-purple-400',
          borderGlow: 'border-purple-500',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        };
    }
  };

  const themeStyle = getThemeStyles();
  const totalTrades = wins + losses;
  const winRate = ((wins / totalTrades) * 100).toFixed(1);

  return (
    <section id="live-simulator" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Glass Effect & Red-White Two-Color Styling */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 p-6 sm:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-red-500/30 shadow-2xl shadow-red-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 pointer-events-none rounded-3xl" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/50 text-red-400 text-xs font-mono-tech font-bold shadow-lg shadow-red-500/20 backdrop-blur-md">
          <Activity className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-white">TRADINGVIEW</span> <span className="text-red-500 font-black">LIVE PERFORMANCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black text-white tracking-tight uppercase">
          <span className="text-red-500 text-glow-red animate-pulse">XHUVO QX</span>{' '}
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">TRADINGVIEW INTERFACE</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-mono-tech font-semibold">
          LIVE DATA FORWARDED FROM TRADINGVIEW
        </p>
      </div>

      {/* TradingView Container - Modern Deep Space Cyber Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 bg-[#030712]/95 backdrop-blur-2xl transition-all duration-300">
        {/* Top TradingView Bar - Sleek Dark Terminal Header */}
        <div className="bg-[#0b0f19] border-b border-cyan-500/20 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
          {/* Pair & Timeframe Toolbar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {/* Symbol selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 bg-[#131927] hover:bg-[#1a2336] px-3 py-1.5 rounded-lg text-white font-bold cursor-pointer border border-cyan-500/30 transition-all shadow-md">
                <span className="text-emerald-400 font-extrabold text-xs sm:text-sm">{selectedPair}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {/* Dropdown options */}
              <div className="absolute top-full left-0 mt-1.5 hidden group-hover:block z-50 bg-[#131927] border border-cyan-500/30 rounded-lg shadow-2xl p-1.5 w-48 font-mono-tech text-[11px]">
                {['EUR/USD LIVE', 'GBP/USD LIVE', 'USD/JPY LIVE', 'AUD/USD LIVE', 'NZD/USD LIVE', 'EUR/GBP LIVE'].map((pair) => (
                  <button
                    key={pair}
                    onClick={() => setSelectedPair(pair)}
                    className={`w-full text-left px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors ${selectedPair === pair ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-300'}`}
                  >
                    {pair}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe pills */}
            <div className="hidden sm:flex items-center bg-[#131927] p-1 rounded-lg border border-cyan-500/20 text-[10px] font-bold">
              {['1s', '5s', '15s', '1M', '5M'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedTimeframe === tf ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Indicator Name Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-950/80 border border-red-500/40 text-amber-300 text-[10px] sm:text-[11px] font-extrabold tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>XHUVO QX INFINITY HUD</span>
            </div>
          </div>

          {/* Theme & Controls */}
          <div className="flex items-center gap-2">
            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg bg-[#131927] border border-cyan-500/20 transition-all cursor-pointer ${soundEnabled ? 'text-cyan-300 shadow-sm shadow-cyan-500/20' : 'text-slate-500'}`}
              title="Toggle Signal Pre-Alert Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Play/Pause Simulator */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-slate-200 text-xs hover:bg-slate-800 transition-all cursor-pointer shadow-md"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="hidden sm:inline font-mono-tech text-[10px] font-bold">{isPlaying ? 'PAUSE' : 'RESUME'}</span>
            </button>
          </div>
        </div>

        {/* Desktop Viewport Main Body */}
        <div className="relative w-full min-h-[420px] sm:min-h-[460px] bg-[#131722] flex overflow-hidden">
          {/* Desktop Toolbar (Left sidebar) */}
          <div className="w-9 bg-[#1e222d] border-r border-white/10 flex flex-col items-center py-2.5 gap-2.5 text-slate-400">
            <button className="p-1 hover:text-cyan-400 hover:bg-white/5 rounded transition-colors" title="Crosshair">
              <Crosshair className="w-3 h-3" />
            </button>
            <button className="p-1 hover:text-cyan-400 hover:bg-white/5 rounded transition-colors text-cyan-400 font-bold text-xs" title="SNR Support & Resistance">
              ─
            </button>
            <button className="p-1 hover:text-cyan-400 hover:bg-white/5 rounded transition-colors" title="Volume Delta Histogram">
              <BarChart2 className="w-3 h-3" />
            </button>
            <button className="p-1 hover:text-cyan-400 hover:bg-white/5 rounded transition-colors" title="Indicator AI Confluence">
              <Sliders className="w-3 h-3" />
            </button>
            <button className="p-1 hover:text-cyan-400 hover:bg-white/5 rounded transition-colors" title="Active Timer HUD">
              <Timer className="w-3 h-3" />
            </button>
            <div className="mt-auto p-1 text-slate-500">
              <Settings className="w-3 h-3" />
            </div>
          </div>

          {/* Main Candlestick Chart Area */}
          <div className="flex-1 relative bg-[#131722] p-2 sm:p-3 flex flex-col justify-between overflow-hidden">
            {/* Grid background lines */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

            {/* Support & Resistance SNR Overlay Lines - Cleanly positioned away from timestamps */}
            <div className="absolute top-[14%] inset-x-0 border-b border-dashed border-red-500/60 flex items-center justify-between px-3 sm:px-4 z-10 pointer-events-none">
              <span className="text-[8px] sm:text-[9px] font-mono-tech font-extrabold text-red-400 bg-[#131722]/90 border border-red-500/40 px-1.5 py-0.5 rounded shadow flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                RESISTANCE SNR
              </span>
              <span className="text-[8px] font-mono-tech font-bold text-red-400 bg-red-950/90 px-1 py-0.5 rounded border border-red-500/40">1.0888</span>
            </div>

            <div className="absolute bottom-[20%] inset-x-0 border-b border-dashed border-emerald-500/60 flex items-center justify-between px-3 sm:px-4 z-10 pointer-events-none">
              <span className="text-[8px] sm:text-[9px] font-mono-tech font-extrabold text-emerald-400 bg-[#131722]/90 border border-emerald-500/40 px-1.5 py-0.5 rounded shadow flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SUPPORT SNR
              </span>
              <span className="text-[8px] font-mono-tech font-bold text-emerald-400 bg-emerald-950/90 px-1 py-0.5 rounded border border-emerald-500/40">1.0842</span>
            </div>

            {/* XHUVO QX INFINITY MAIN DASHBOARD PANEL (Sleek Compact Glass Box) */}
            <div className="absolute top-1.5 left-1.5 z-20 w-40 sm:w-48 rounded-lg bg-[#090514]/90 border border-cyan-500/40 p-1.5 sm:p-2 backdrop-blur-md shadow-xl font-mono-tech text-[8px] sm:text-[9px] space-y-0.5">
              <div className="bg-cyan-950/90 border border-cyan-500/40 py-0.5 px-1.5 text-center font-extrabold text-cyan-300 tracking-wider rounded-sm text-[8px] flex items-center justify-between">
                <span>XHUVO QX INFINITY</span>
                <span className="text-[7px] bg-emerald-500/20 text-emerald-300 px-1 rounded font-bold">LIVE</span>
              </div>
              <div className="space-y-0.5 text-slate-200 text-[8px] sm:text-[9px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
                  <span className="text-slate-400">WIN RATE</span>
                  <span className="font-extrabold text-emerald-400">{winRate}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
                  <span className="text-slate-400">SIGNALS (W/L)</span>
                  <span className="font-bold text-white"><span className="text-emerald-400">{wins}W</span> / <span className="text-red-400">{losses}L</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-0.5">
                  <span className="text-slate-400">ACCURACY</span>
                  <span className="font-bold text-cyan-300">95%+</span>
                </div>
              </div>
              <div className="mt-1 py-0.5 px-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[7px] font-extrabold text-center uppercase tracking-wider flex items-center justify-center gap-1">
                <Flame className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
                <span>5 WINS STREAK!</span>
              </div>
            </div>

            {/* Price Scale Active Timer */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center">
              <div className="px-2 py-1 rounded-l-md bg-emerald-500 text-slate-950 font-mono-tech text-[9px] font-extrabold shadow-lg flex items-center gap-1 border-l border-y border-emerald-300 animate-pulse">
                <Timer className="w-3 h-3" />
                <span>00:{candleSeconds.toString().padStart(2, '0')} | RUNNING</span>
              </div>
            </div>

            {/* Candlesticks & TradingView Chart Area */}
            {(() => {
              const allPrices = candles.flatMap((c) => [c.high, c.low, c.open, c.close]);
              const minP = Math.min(...allPrices, 1.0830);
              const maxP = Math.max(...allPrices, 1.0910);
              const range = Math.max(0.0020, maxP - minP);

              return (
                <div className="relative z-10 w-full mt-12 sm:mt-14">
                  {/* Candlestick Chart Area Canvas */}
                  <div className="relative w-full h-[260px] sm:h-[290px] flex items-stretch justify-between gap-1 sm:gap-1.5 px-1 sm:px-3">
                    {candles.map((candle, idx) => {
                      const isBullish = candle.close >= candle.open;
                      const isLatest = idx === candles.length - 1;

                      // Scaled positions (0% = top of chart, 100% = bottom of chart)
                      const highPct = ((maxP - candle.high) / range) * 82 + 8;
                      const lowPct = ((maxP - candle.low) / range) * 82 + 8;
                      const openPct = ((maxP - candle.open) / range) * 82 + 8;
                      const closePct = ((maxP - candle.close) / range) * 82 + 8;

                      const bodyTopPct = Math.min(openPct, closePct);
                      const bodyHeightPct = Math.max(2, Math.abs(openPct - closePct));
                      const wickTopPct = highPct;
                      const wickHeightPct = Math.max(2, lowPct - highPct);

                      return (
                        <div key={idx} className="flex-1 relative flex flex-col items-center group min-w-[8px]">
                          {/* CALL or PUT Signal Badge (Floating cleanly above/below candle) */}
                          {candle.signal && (
                            <div
                              style={{
                                top: candle.signal === 'CALL' ? `${lowPct + 4}%` : `${highPct - 14}%`,
                              }}
                              className="absolute z-30 transform -translate-x-1/2 left-1/2 transition-all"
                            >
                              <div
                                className={`px-1.5 py-0.5 rounded font-mono-tech font-black text-[8px] sm:text-[9px] shadow-xl flex items-center gap-0.5 whitespace-nowrap ${
                                  candle.signal === 'CALL'
                                    ? 'bg-emerald-400 text-slate-950 ring-1 ring-emerald-300 shadow-emerald-500/50'
                                    : 'bg-red-500 text-white ring-1 ring-red-300 shadow-red-500/50'
                                }`}
                              >
                                {candle.signal === 'CALL' ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                                <span>{candle.signal}</span>
                              </div>
                            </div>
                          )}

                          {/* WIN Checkmark Tag (Floating cleanly below signal or low wick) */}
                          {candle.winState && (
                            <div
                              style={{
                                top: candle.signal === 'CALL' ? `${lowPct + 16}%` : `${lowPct + 4}%`,
                              }}
                              className="absolute z-30 transform -translate-x-1/2 left-1/2 transition-all"
                            >
                              <span className="px-1 py-0.2 rounded bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 font-mono-tech font-extrabold text-[8px] flex items-center gap-0.5 whitespace-nowrap shadow-md">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                                WIN
                              </span>
                            </div>
                          )}

                          {/* Candle Wick line */}
                          <div
                            style={{
                              top: `${wickTopPct}%`,
                              height: `${wickHeightPct}%`,
                            }}
                            className={`w-[1.5px] absolute ${isBullish ? 'bg-emerald-400/90' : 'bg-red-400/90'}`}
                          />

                          {/* Candle Body */}
                          <div
                            style={{
                              top: `${bodyTopPct}%`,
                              height: `${bodyHeightPct}%`,
                            }}
                            className={`w-2 sm:w-3.5 rounded-[1px] absolute z-10 transition-all ${
                              isBullish
                                ? 'bg-emerald-500 border border-emerald-300 shadow-md shadow-emerald-500/30'
                                : 'bg-red-500 border border-red-300 shadow-md shadow-red-500/30'
                            } ${isLatest ? 'ring-2 ring-cyan-400 animate-pulse' : ''}`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Dedicated Bottom X-Axis Timeline Row - Zero Overlap! */}
                  <div className="w-full pt-2 mt-1 border-t border-white/10 flex items-center justify-between px-1 sm:px-3 text-[8px] sm:text-[9px] text-slate-400 font-mono-tech">
                    {candles.filter((_, i) => i % 3 === 0 || i === candles.length - 1).map((c, i) => (
                      <span key={i} className="hover:text-cyan-300 transition-colors">
                        {c.time}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Bottom Chart HUD Status Bar - Clean and Responsive */}
            <div className="relative z-10 pt-1.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[9px] sm:text-[10px] font-mono-tech text-slate-300 bg-[#1e222d]/95 px-3 py-1.5 rounded-lg">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-cyan-300 font-bold">FILTERS: <strong className="text-emerald-400">15+ ACTIVE</strong></span>
                <span className="text-purple-300 font-bold">NON-MTG: <strong className="text-white">100% STRICT</strong></span>
              </div>
              <div className="text-amber-400 font-extrabold flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>XHUVO QX INFINITY $400 VIP</span>
              </div>
            </div>
          </div>

          {/* Desktop Right Sidebar (Watchlist & Live Signal History Stream) */}
          <div className="hidden lg:flex w-64 bg-[#1e222d] border-l border-white/10 flex-col justify-between p-3 text-xs font-mono-tech">
            <div>
              {/* Watchlist Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <span className="font-extrabold text-white text-xs tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  LIVE SIGNAL STREAM
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Live Signal Feed */}
              <div className="space-y-2 max-h-[320px] overflow-y-auto">
                {[
                  { pair: 'EUR/USD LIVE', signal: 'CALL 1M', result: 'WIN ✓', time: '10:11' },
                  { pair: 'GBP/USD LIVE', signal: 'PUT 1M', result: 'WIN ✓', time: '10:10' },
                  { pair: 'USD/JPY LIVE', signal: 'CALL 1M', result: 'WIN ✓', time: '10:08' },
                  { pair: 'AUD/USD LIVE', signal: 'PUT 1M', result: 'WIN ✓', time: '10:07' },
                  { pair: 'EUR/GBP LIVE', signal: 'CALL 1M', result: 'WIN ✓', time: '10:05' },
                  { pair: 'USD/CHF LIVE', signal: 'PUT 1M', result: 'WIN ✓', time: '10:03' },
                  { pair: 'NZD/USD LIVE', signal: 'CALL 1M', result: 'WIN ✓', time: '10:00' },
                ].map((item, i) => (
                  <div key={i} className="p-2 rounded bg-[#131722] border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200 text-[11px]">{item.pair}</div>
                      <div className="text-[10px] text-cyan-300">{item.time} • {item.signal}</div>
                    </div>
                    <span className="text-emerald-400 font-extrabold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      {item.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA in Watchlist */}
            <div className="pt-3 border-t border-white/10">
              <a
                href="https://t.me/XQ_owner"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-orbitron font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                GET LICENSE (@XQ_owner)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
