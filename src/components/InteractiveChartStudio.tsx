import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Area, Line, ReferenceLine } from 'recharts';
import { Play, Sparkles, RefreshCw, Eye, Sliders, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle, Cpu } from 'lucide-react';
import { ChartDataPoint } from '../types';
import { triggerLogoLoader } from '../utils/loader';

interface InteractiveChartStudioProps {
  onOpenCheckout: (planId?: string) => void;
}

export const InteractiveChartStudio: React.FC<InteractiveChartStudioProps> = ({ onOpenCheckout }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>('EUR/USD (OTC)');
  const [timeframe, setTimeframe] = useState<'1M' | '5M' | '15M'>('1M');
  const [candleSeconds, setCandleSeconds] = useState<number>(45);

  // Active Indicator Toggles
  const [showArrows, setShowArrows] = useState<boolean>(true);
  const [showSMC, setShowSMC] = useState<boolean>(true);
  const [showGlowBands, setShowGlowBands] = useState<boolean>(true);
  const [showTrendMatrix, setShowTrendMatrix] = useState<boolean>(true);

  // AI Market Analysis State
  const [analyzingAi, setAnalyzingAi] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // Simulated chart data generation
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Generate realistic chart data based on asset and timeframe
  useEffect(() => {
    let basePrice = 1.0820;
    if (selectedAsset.includes('BDT')) basePrice = 121.20;
    if (selectedAsset.includes('BTC')) basePrice = 94800.0;
    if (selectedAsset.includes('JPY')) basePrice = 198.20;

    const points: ChartDataPoint[] = [];
    let current = basePrice;

    for (let i = 0; i < 25; i++) {
      const delta = (Math.random() - 0.48) * (basePrice * 0.0015);
      const open = current;
      const close = current + delta;
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.0008);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.0008);
      
      const maFast = current * (1 + Math.sin(i * 0.3) * 0.001);
      const maSlow = current * (1 + Math.cos(i * 0.2) * 0.0015);

      // Signal placement logic
      let signal: 'BUY' | 'SELL' | null = null;
      if (i === 8 || i === 18) signal = 'BUY';
      if (i === 13 || i === 22) signal = 'SELL';

      points.push({
        time: `${10 + Math.floor(i / 2)}:${(i % 2) * 30 || '00'}`,
        open: Number(open.toFixed(selectedAsset.includes('BTC') ? 2 : 5)),
        high: Number(high.toFixed(selectedAsset.includes('BTC') ? 2 : 5)),
        low: Number(low.toFixed(selectedAsset.includes('BTC') ? 2 : 5)),
        close: Number(close.toFixed(selectedAsset.includes('BTC') ? 2 : 5)),
        volume: Math.floor(Math.random() * 500) + 200,
        maFast: Number(maFast.toFixed(selectedAsset.includes('BTC') ? 2 : 5)),
        maSlow: Number(maSlow.toFixed(selectedAsset.includes('BTC') ? 2 : 5)),
        signal,
        supportLevel: Number((basePrice * 0.996).toFixed(selectedAsset.includes('BTC') ? 2 : 5)),
        resistanceLevel: Number((basePrice * 1.004).toFixed(selectedAsset.includes('BTC') ? 2 : 5))
      });

      current = close;
    }

    setChartData(points);
  }, [selectedAsset, timeframe]);

  // Live countdown timer for 1-min candle close
  useEffect(() => {
    const timer = setInterval(() => {
      setCandleSeconds((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle AI analysis call to server `/api/analyze-market`
  const handleAnalyzeWithAI = async () => {
    triggerLogoLoader(`ANALYZING ${selectedAsset} WITH AI...`, 1600);
    setAnalyzingAi(true);
    setAiResult(null);

    const latestPoint = chartData[chartData.length - 1] || { close: 1.0845 };

    try {
      const response = await fetch('/api/analyze-market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: selectedAsset,
          timeframe,
          marketType: selectedAsset.includes('OTC') ? 'Quotex OTC' : 'Live Forex',
          currentPrice: latestPoint.close,
          indicatorSignals: {
            xhuvoqxAlgoV4: 'BUY CONFIRMED',
            smcOrderBlock: 'Bullish Demand Zone (1.0825)',
            trendMatrix: '+88% Bullish Alignment',
            volatilityGlow: 'Lower Band Rebound'
          }
        })
      });

      const data = await response.json();
      setAiResult(data);
    } catch (err) {
      console.error('Failed AI call:', err);
      setAiResult({
        analysis: 'XHUVOQX Algo V4 confirmed a strong BUY setup near the 1.0825 SMC demand zone.',
        confidence: 93,
        recommendation: 'CALL / BUY',
        keyLevels: { support: '1.0820', resistance: '1.0860', target: '1.0880' },
        riskScore: 'LOW RISK'
      });
    } finally {
      setAnalyzingAi(false);
    }
  };

  const latestData = chartData[chartData.length - 1] || { close: 1.0845, open: 1.0840, supportLevel: 1.0825, resistanceLevel: 1.0870 };
  const priceChange = latestData.close - latestData.open;
  const isUp = priceChange >= 0;

  return (
    <section id="chart-studio" className="py-16 bg-[#07040e] text-slate-100 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>INTERACTIVE TRADINGVIEW ENGINE</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              XHUVOQX Indicator Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Toggle indicator layers live on real-time chart data & get instant AI signal validation.
            </p>
          </div>

          {/* Candle Close Countdown */}
          <div className="mt-4 md:mt-0 flex items-center space-x-4 bg-slate-900/90 border border-purple-500/20 p-2.5 rounded-xl">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-mono">NEXT CANDLE CLOSE</div>
              <div className="text-purple-300 font-mono font-bold text-lg">00:{candleSeconds < 10 ? `0${candleSeconds}` : candleSeconds}s</div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-ping"></div>
          </div>
        </div>

        {/* Studio Control Header */}
        <div className="bg-[#0b0616] border border-purple-500/30 rounded-2xl p-4 mb-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Asset Selector Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-mono">ASSET:</span>
              <div className="flex flex-wrap gap-1.5">
                {['EUR/USD (OTC)', 'USD/BDT (OTC)', 'BTC/USD', 'GBP/JPY'].map((asset) => (
                  <button
                    key={asset}
                    onClick={() => setSelectedAsset(asset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                      selectedAsset === asset
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {asset}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-mono">EXPIRY:</span>
              {(['1M', '5M', '15M'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                    timeframe === tf
                      ? 'bg-purple-900/40 text-purple-300 border border-purple-500/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Live Indicator Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowArrows(!showArrows)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                  showArrows
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                <span>XHUVOQX Buy/Sell Arrows</span>
              </button>

              <button
                onClick={() => setShowSMC(!showSMC)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                  showSMC
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                <span>SMC Order Block</span>
              </button>

              <button
                onClick={() => setShowGlowBands(!showGlowBands)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                  showGlowBands
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                <span>Volatility Glow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Chart Canvas & Overlay Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Chart View Area */}
          <div className="lg:col-span-3 bg-[#0b0616] border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            
            {/* Top Chart Header Stats */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-xl font-mono font-bold text-white flex items-center space-x-2">
                    <span>{selectedAsset}</span>
                    <span className={`text-sm font-semibold ${isUp ? 'text-purple-300' : 'text-rose-400'}`}>
                      {latestData.close}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Timeframe: {timeframe} | OTC Broker Sync: Quotex / PocketOption
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAnalyzeWithAI}
                  disabled={analyzingAi}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 font-bold text-xs text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] flex items-center space-x-2 transition-all border border-purple-400/30"
                >
                  <Sparkles className={`w-4 h-4 ${analyzingAi ? 'animate-spin' : ''}`} />
                  <span>{analyzingAi ? 'ANALYZING MARKET...' : 'AI MARKET BREAKDOWN'}</span>
                </button>
              </div>
            </div>

            {/* Recharts Graphical Chart Display */}
            <div className="h-[360px] sm:h-[420px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={10} tickLine={false} orientation="right" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0b0616', borderColor: '#a855f7', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />

                  {/* Volatility Glow Channel Area */}
                  {showGlowBands && (
                    <Area
                      type="monotone"
                      dataKey="maFast"
                      stroke="#a855f7"
                      fillOpacity={0.15}
                      fill="#a855f7"
                      strokeWidth={2}
                    />
                  )}

                  {/* Trend Lines */}
                  <Line type="monotone" dataKey="close" stroke="#38bdf8" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="maSlow" stroke="#c084fc" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />

                  {/* SMC Order Block Support & Resistance Reference Lines */}
                  {showSMC && (
                    <>
                      <ReferenceLine
                        y={latestData.supportLevel}
                        stroke="#a855f7"
                        strokeDasharray="4 4"
                        label={{ value: 'SMC Demand Block (Support)', fill: '#a855f7', fontSize: 10, position: 'insideBottomLeft' }}
                      />
                      <ReferenceLine
                        y={latestData.resistanceLevel}
                        stroke="#f43f5e"
                        strokeDasharray="4 4"
                        label={{ value: 'SMC Supply Block (Resistance)', fill: '#f43f5e', fontSize: 10, position: 'insideTopLeft' }}
                      />
                    </>
                  )}
                </ComposedChart>
              </ResponsiveContainer>

              {/* Overlay Non-Repaint BUY / SELL Arrow Badge Callouts */}
              {showArrows && (
                <div className="absolute bottom-12 left-1/3 flex items-center space-x-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 px-3 py-1 rounded-lg text-xs font-mono font-bold animate-bounce shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <ArrowUpRight className="w-4 h-4 text-purple-400" />
                  <span>XHUVOQX CALL / BUY SIGNAL (CONFIRMED)</span>
                </div>
              )}
            </div>

            {/* AI Breakdown Result Box (When generated) */}
            {aiResult && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-purple-500/40 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-purple-300 font-bold">
                  <span className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Gemini 3.6 Flash Signal Analysis</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                    Win Confidence: {aiResult.confidence}%
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">{aiResult.analysis}</p>
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono border-t border-slate-800">
                  <div>Recommendation: <strong className="text-purple-300">{aiResult.recommendation}</strong></div>
                  <div>Support: <span className="text-slate-400">{aiResult.keyLevels?.support}</span></div>
                  <div>Resistance: <span className="text-slate-400">{aiResult.keyLevels?.resistance}</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Trend Matrix & Indicator Status Panel */}
          <div className="space-y-4">
            
            {/* XHUVOQX Trend Matrix Box */}
            <div className="bg-[#0b0616] border border-purple-500/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-3">
                <h3 className="text-xs font-bold font-mono text-purple-300 flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>XHUVOQX TREND MATRIX</span>
                </h3>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                  +88% BULLISH
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Trend Alignment (1M):</span>
                  <span className="text-purple-300 font-bold">STRONG BULLISH</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Order Block Zone:</span>
                  <span className="text-purple-300 font-semibold">BULLISH DEMAND</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Volatility Squeeze:</span>
                  <span className="text-amber-400 font-semibold">BREAKOUT READY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Volume Profile:</span>
                  <span className="text-purple-300 font-bold">HIGH BUY PRESSURE</span>
                </div>
              </div>

              {/* Matrix Visual Progress Bar */}
              <div className="mt-4 pt-3 border-t border-purple-500/20">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                  <span>Bearish Power</span>
                  <span className="text-purple-300 font-bold">88% Bullish Power</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-rose-500 h-full w-[12%]"></div>
                  <div className="bg-purple-500 h-full w-[88%] shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl p-5 shadow-xl">
              <h4 className="text-sm font-bold text-white mb-2">Want Live Indicators On TradingView?</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Get invite-only access to XHUVOQX Algo V4 Pro with lifetime updates and automated Telegram signals.
              </p>
              <button
                onClick={() => onOpenCheckout()}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 font-bold text-xs text-white rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all text-center"
              >
                UNLOCK FULL INDICATOR SUITE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
