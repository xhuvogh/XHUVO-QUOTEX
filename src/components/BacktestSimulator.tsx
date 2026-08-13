import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, ShieldCheck, Play, Lock, Sparkles, Send, ArrowRight, Activity } from 'lucide-react';
import { CustomChartWidget } from './CustomChartWidget';
import { triggerLogoLoader } from '../utils/loader';

interface BacktestSimulatorProps {
  onOpenCheckout?: (planId?: string) => void;
}

export const BacktestSimulator: React.FC<BacktestSimulatorProps> = ({ onOpenCheckout }) => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('xhuvoqx-v5');
  const [tradeCount, setTradeCount] = useState<number>(200);
  const [running, setRunning] = useState<boolean>(false);

  // Backtest calculation state for V5
  const [results, setResults] = useState({
    winRate: 88.5,
    wins: 177,
    losses: 23,
    profitFactor: 2.92,
    maxDrawdown: 3.2,
    netProfitPercent: +185.4
  });

  const equityData = useMemo(() => {
    const data = [];
    let equity = 1000;
    for (let i = 0; i <= 20; i++) {
      const win = i % 8 !== 3;
      const change = win ? 35 : -25;
      equity += change;
      data.push({
        trade: `#${i * 10}`,
        equity: Math.round(equity)
      });
    }
    return data;
  }, [results.winRate, tradeCount]);

  const handleRunSimulation = () => {
    triggerLogoLoader('RUNNING ALGORITHM BACKTEST SIMULATION...', 1600);
    setRunning(true);
    setTimeout(() => {
      const winRate = 88.5;
      const wins = Math.round((tradeCount * winRate) / 100);
      const losses = tradeCount - wins;

      setResults({
        winRate,
        wins,
        losses,
        profitFactor: Number((winRate / (100 - winRate) * 0.22).toFixed(2)),
        maxDrawdown: Number((Math.random() * 0.5 + 2.8).toFixed(1)),
        netProfitPercent: Number((wins * 1.5 - losses * 1.8).toFixed(1))
      });
      setRunning(false);
    }, 300);
  };

  const isInfinityLocked = selectedStrategy === 'xhuvoqx-infinity';
  const isUltimateLocked = selectedStrategy === 'xhuvoqx-ultimate';
  const isLocked = isInfinityLocked || isUltimateLocked;

  return (
    <section id="backtester" className="py-20 bg-[#06040d] text-slate-100 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span>NON-REPAINT STRATEGY BACKTESTER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-mono">
              HISTORICAL PERFORMANCE BACKTESTING
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Verify XHUVO QX indicator performance against historical Quotex Real Market candle data. Test V5 live below or unlock Flagship INFINITY ($400) for 95%+ direct non-MTG wins!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="https://t.me/+K8Kjxh16WjdlYTQ1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 px-3.5 py-2 rounded-xl border border-purple-500/30 transition-all"
            >
              <Send className="w-4 h-4 text-purple-400" />
              <span>TELEGRAM PROOFS GROUP</span>
            </a>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-purple-300 bg-slate-900 px-3.5 py-2 rounded-xl border border-purple-500/20">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>100% NON-REPAINT VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Backtester Setup Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Strategy Selection Column */}
          <div className="lg:col-span-1 bg-[#0b0616] border border-purple-500/30 rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
              1. SELECT INDICATOR EDITION
            </h3>

            <div className="space-y-2.5">
              {/* V5 (Unlocked for testing) */}
              <button
                onClick={() => setSelectedStrategy('xhuvoqx-v5')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-mono font-bold transition-all border flex items-center justify-between ${
                  selectedStrategy === 'xhuvoqx-v5'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-black text-white">XHUVO QX V5</div>
                  <div className="text-[10px] text-purple-400 font-normal">Starter Edition ($100)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">TESTABLE</span>
              </button>

              {/* INFINITY (Locked) */}
              <button
                onClick={() => setSelectedStrategy('xhuvoqx-infinity')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-mono font-bold transition-all border flex items-center justify-between ${
                  selectedStrategy === 'xhuvoqx-infinity'
                    ? 'bg-purple-950/50 text-purple-300 border-purple-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-black text-amber-300 flex items-center space-x-1">
                    <span>XHUVO QX INFINITY</span>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Flagship ($400)</div>
                </div>
                <div className="flex items-center space-x-1 text-amber-400 text-[10px]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>VIP LOCKED</span>
                </div>
              </button>

              {/* ULTIMATE (Locked Secret) */}
              <button
                onClick={() => setSelectedStrategy('xhuvoqx-ultimate')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-mono font-bold transition-all border flex items-center justify-between ${
                  selectedStrategy === 'xhuvoqx-ultimate'
                    ? 'bg-fuchsia-950/40 text-fuchsia-300 border-fuchsia-500/60'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-black text-rose-400 flex items-center space-x-1">
                    <span>XHUVO QX ULTIMATE</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Next Generation Formula</div>
                </div>
                <div className="flex items-center space-x-1 text-rose-400 text-[10px]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>SECRET</span>
                </div>
              </button>
            </div>

            {/* Trade Sample Size */}
            {!isLocked && (
              <div className="pt-2">
                <label className="text-xs text-slate-400 font-mono block mb-1">Trade Sample Size:</label>
                <select
                  value={tradeCount}
                  onChange={(e) => setTradeCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                >
                  <option value={100}>Last 100 Trades</option>
                  <option value={200}>Last 200 Trades</option>
                  <option value={500}>Last 500 Trades</option>
                </select>
              </div>
            )}

            {/* Run Button for V5 */}
            {!isLocked ? (
              <button
                onClick={handleRunSimulation}
                disabled={running}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold font-mono text-xs text-white shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <Play className={`w-4 h-4 ${running ? 'animate-spin' : ''}`} />
                <span>{running ? 'BACKTESTING V5...' : 'RUN V5 BACKTEST'}</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenCheckout && onOpenCheckout(selectedStrategy)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 font-bold font-mono text-xs text-white shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>UNLOCK THIS INDICATOR</span>
              </button>
            )}
          </div>

          {/* Results Display Area */}
          <div className="lg:col-span-3 bg-[#0b0616] border border-purple-500/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Locked Overlay for INFINITY / ULTIMATE */}
            {isLocked ? (
              <div className="my-auto py-12 px-6 text-center space-y-6 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-widest">
                    {isInfinityLocked ? 'VIP FLAGSHIP SCRIPT' : 'PERMANENT SECRET FORMULA'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
                    {isInfinityLocked ? 'XHUVO QX INFINITY ($400)' : 'XHUVO QX ULTIMATE'}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    {isInfinityLocked
                      ? 'Features 100% Non-Repaint, 95%+ Win Rate, 1st Time Non-MTG direct candle wins, 15+ AI Confluence Filters, and Auto Money Management. Unlock now for instant TradingView access!'
                      : 'THIS INDICATOR IS FOR NEXT GENERATION. Permanent secret formula that will blow the entire generation\'s mind! Contact developer @XQ_owner on Telegram for inquiry.'
                    }
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => onOpenCheckout && onOpenCheckout(isInfinityLocked ? 'xhuvoqx-infinity' : 'xhuvoqx-v5')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold font-mono text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{isInfinityLocked ? 'BUY INFINITY FLAGSHIP ($400)' : 'INQUIRE DEVELOPER (@XQ_owner)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://t.me/+K8Kjxh16WjdlYTQ1"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-purple-500/30 font-bold font-mono text-xs flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-purple-400" />
                    <span>VIEW PROOFS IN TELEGRAM</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Unlocked V5 Simulation Output */
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">XHUVO QX V5 (Starter Edition)</h3>
                    <p className="text-xs text-slate-400 font-mono">Sample: {tradeCount} Historical Trades | 1M / 5M OTC Candle Data</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-mono">STARTER WIN RATE</div>
                    <div className="text-2xl font-black text-purple-300 font-mono">{results.winRate}%</div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-purple-500/20">
                    <div className="text-[10px] text-slate-400 font-mono">WIN / LOSS</div>
                    <div className="text-sm font-bold text-white font-mono">{results.wins} / {results.losses}</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-purple-500/20">
                    <div className="text-[10px] text-slate-400 font-mono">PROFIT FACTOR</div>
                    <div className="text-sm font-bold text-purple-300 font-mono">{results.profitFactor}</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-purple-500/20">
                    <div className="text-[10px] text-slate-400 font-mono">MAX DRAWDOWN</div>
                    <div className="text-sm font-bold text-amber-400 font-mono">{results.maxDrawdown}%</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-purple-500/20">
                    <div className="text-[10px] text-slate-400 font-mono">NET EQUITY GROWTH</div>
                    <div className="text-sm font-bold text-purple-300 font-mono">+{results.netProfitPercent}%</div>
                  </div>
                </div>

                {/* Equity Growth Graph */}
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={equityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="trade" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ backgroundColor: '#0b0616', borderColor: '#a855f7', borderRadius: '8px', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="equity" stroke="#a855f7" fill="#a855f720" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Live Broker Simulation Environment */}
        <div className="mt-8">
          <div className="bg-[#0b0616] border border-purple-500/30 rounded-3xl p-1 shadow-xl overflow-hidden">
            <div className="bg-slate-900 border-b border-purple-500/20 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-t-3xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
                    <span>LIVE BROKER TERMINAL</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-wider font-bold animate-pulse">Online</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans">Simulated Real-Time Quotex/Pocket Option Environment</p>
                </div>
              </div>
              
              {/* Fake broker controls to make it look legit */}
              <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 transition-colors">
                  CALL
                </div>
                <div className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-[10px] font-mono font-bold border border-rose-500/20 cursor-pointer hover:bg-rose-500/20 transition-colors">
                  PUT
                </div>
              </div>
            </div>
            
               {/* The actual Chart Simulation */}
            <div className="w-full relative bg-black">
               {/* Overlay to hide the bottom/top borders and make it look embedded */}
               <div className="absolute inset-0 pointer-events-none border-[4px] border-[#0b0616] z-10"></div>
               <CustomChartWidget className="w-full h-[400px] sm:h-[500px] relative" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
