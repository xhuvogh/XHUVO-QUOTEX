import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode, CandlestickSeries, HistogramSeries, createSeriesMarkers } from 'lightweight-charts';

export const CustomChartWidget: React.FC<{ className?: string }> = ({ className = "w-full h-[500px] relative rounded-2xl overflow-hidden" }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#0b0616' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(168, 85, 247, 0.1)' },
        horzLines: { color: 'rgba(168, 85, 247, 0.1)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(168, 85, 247, 0.2)',
      },
      timeScale: {
        borderColor: 'rgba(168, 85, 247, 0.2)',
        timeVisible: true,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Generate some fake candle data
    const generateData = () => {
      const data = [];
      let time = Math.floor(Date.now() / 1000) - 100 * 60; // 100 minutes ago
      let close = 159.350;
      for (let i = 0; i < 100; i++) {
        const open = close;
        const high = open + Math.random() * 0.05;
        const low = open - Math.random() * 0.05;
        close = (open + (Math.random() - 0.5) * 0.04);
        // ensure high > all, low < all
        const actualHigh = Math.max(open, close, high);
        const actualLow = Math.min(open, close, low);
        
        data.push({
          time: time + i * 60 as any, // 1 minute intervals
          open,
          high: actualHigh,
          low: actualLow,
          close,
        });
      }
      return data;
    };

    const data = generateData();
    candlestickSeries.setData(data);

    // Add vertical highlights using a histogram series behind candles
    const highlightSeries = chart.addSeries(HistogramSeries, {
      color: 'rgba(34, 197, 94, 0.1)',
      priceScaleId: '', // overlay
      lastValueVisible: false,
      priceLineVisible: false,
    });
    
    // Scale it to full height
    highlightSeries.priceScale().applyOptions({
        scaleMargins: {
            top: 0,
            bottom: 0,
        }
    });

    // Add markers and highlights
    const markers = [];
    const highlightData = [];
    
    for (let i = 0; i < data.length; i++) {
        // Highlight logic
        if (i > 10 && i < data.length - 5 && i % 15 === 0) {
            const isBuy = Math.random() > 0.5;
            markers.push({
                time: data[i].time,
                position: isBuy ? 'belowBar' : 'aboveBar',
                color: isBuy ? '#22c55e' : '#ef4444',
                shape: isBuy ? 'arrowUp' : 'arrowDown',
                text: isBuy ? 'BUY' : 'SELL',
                size: 2,
            });
            highlightData.push({
                time: data[i].time,
                value: 100, // arbitrary large value since it's an overlay
                color: isBuy ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            });
        } else {
            highlightData.push({
                time: data[i].time,
                value: 0,
            });
        }
    }
    
    highlightSeries.setData(highlightData as any);
    
    // Create markers plugin for v5
    const seriesMarkers = createSeriesMarkers(candlestickSeries, markers as any);

    // Auto resize
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className={className}>
        <div ref={chartContainerRef} className="w-full h-full" />
        
        {/* Money Management Dashboard (Top Right) */}
        <div className="absolute top-4 right-14 bg-[#1e0a2d]/90 border border-purple-500/50 rounded-md p-2 shadow-xl z-20 backdrop-blur-sm pointer-events-none w-48 hidden sm:block">
            <div className="text-[9px] text-fuchsia-400 font-bold text-center border-b border-purple-500/30 pb-1 mb-1">
                MONEY MANAGEMENT
            </div>
            <div className="space-y-1 text-[10px] font-mono">
                <div className="flex justify-between text-white"><span>💰 BALANCE</span><span className="text-purple-300">$100</span></div>
                <div className="flex justify-between text-white"><span>🎯 TARGET (10%)</span><span className="text-emerald-400">$10</span></div>
                <div className="flex justify-between text-white"><span>🛑 STOP LOSS (10%)</span><span className="text-rose-400">$10</span></div>
                <div className="flex justify-between text-white"><span>💵 PER TRADE</span><span className="text-purple-300">$2.35</span></div>
                <div className="flex justify-between text-white"><span>🏆 WINS NEEDED</span><span className="text-emerald-400">5</span></div>
            </div>
            <div className="mt-2 border-t border-purple-500/30 pt-1 text-center">
                <div className="text-[9px] text-amber-400 font-bold">⚠️ INSTRUCTIONS ⚠️</div>
                <div className="text-[8px] text-amber-300/80 mt-0.5">• Take 5 trades to hit target</div>
                <div className="text-[8px] text-amber-300/80">• Stop trading when target is hit</div>
            </div>
        </div>

        {/* Xhuvo QX Infinity Stats (Bottom Right) */}
        <div className="absolute bottom-6 right-14 bg-[#1e0a2d]/90 border border-purple-500/50 rounded-md p-2 shadow-xl z-20 backdrop-blur-sm pointer-events-none w-48 hidden sm:block">
            <div className="text-[10px] text-fuchsia-400 font-bold text-center border-b border-purple-500/30 pb-1 mb-1">
                XHUVO QX INFINITY
            </div>
            <div className="space-y-1 text-[10px] font-mono">
                <div className="flex justify-between text-white bg-white/5 px-1 rounded"><span>📝 TOTAL SIGNALS</span><span className="text-purple-300">26</span></div>
                <div className="flex justify-between text-white bg-white/5 px-1 rounded"><span>🎯 WIN RATE</span><span className="text-emerald-400">88.46%</span></div>
                <div className="flex justify-between text-white bg-white/5 px-1 rounded"><span>✅ TOTAL PROFIT</span><span className="text-emerald-400">23</span></div>
                <div className="flex justify-between text-white bg-white/5 px-1 rounded"><span>❌ TOTAL LOSS</span><span className="text-rose-400">3</span></div>
                <div className="flex justify-between text-white bg-white/5 px-1 rounded"><span>👉 WIN/LOSS STREAK</span><span className="text-emerald-400">5W</span></div>
            </div>
            <div className="mt-2 text-center text-[9px] text-amber-400 font-bold">
                🔥 5 WINS - MARKET IS OURS!
            </div>
            <div className="flex justify-between text-[9px] text-purple-300 font-mono mt-1 border-t border-purple-500/30 pt-1">
                <span>🤖 ALGO STATUS</span>
                <span className="text-emerald-400 animate-pulse">WAITING...</span>
            </div>
            <div className="text-center text-[8px] text-slate-500 mt-1">DEV - XHUVO Trader</div>
        </div>
        
        {/* Fake Symbol Info (Top Left) */}
        <div className="absolute top-4 left-4 bg-[#1e0a2d]/80 border border-purple-500/30 rounded px-2 py-1 z-20 flex items-center space-x-2 text-[10px] font-mono pointer-events-none">
            <span className="text-purple-300">Xhuvo QX Infinity</span>
        </div>
    </div>
  );
};
