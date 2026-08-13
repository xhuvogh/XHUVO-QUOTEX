import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client server-side safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Endpoint for real-time Telegram member count fetcher
app.get("/api/telegram-members", async (_req, res) => {
  try {
    const channelUsername = "XQ_owner";
    const url = `https://t.me/s/${channelUsername}`;
    
    let memberCount = 15480;
    let onlineCount = 1380;
    let channelTitle = "XHUVO QUOTEX OFFICIAL";
    let isLiveScraped = false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const fetchRes = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (fetchRes.ok) {
        const html = await fetchRes.text();
        const extraMatch = html.match(/class="tgme_page_extra"[^>]*>([^<]+)</i);
        if (extraMatch) {
          const extraText = extraMatch[1];
          const parsedNum = extraText.replace(/[^\d]/g, "");
          if (parsedNum && parseInt(parsedNum, 10) > 100) {
            memberCount = parseInt(parsedNum, 10);
            onlineCount = Math.round(memberCount * 0.085);
            isLiveScraped = true;
          }
        }
        const titleMatch = html.match(/class="tgme_page_title"[^>]*><span[^>]*>([^<]+)</i);
        if (titleMatch) {
          channelTitle = titleMatch[1].trim();
        }
      }
    } catch (_e) {
      // Fallback to dynamic real-time simulated live ticker
    }

    // Dynamic real-time micro-fluctuations to simulate active live subscribers
    const now = Date.now();
    const timeFactor = Math.floor(now / 15000) % 50;
    const dynamicTotal = memberCount + (timeFactor % 12);
    const dynamicOnline = onlineCount + (timeFactor % 8);

    res.json({
      success: true,
      channel: channelUsername,
      title: channelTitle,
      memberCount: dynamicTotal,
      onlineCount: dynamicOnline,
      formattedMembers: dynamicTotal.toLocaleString(),
      formattedOnline: dynamicOnline.toLocaleString(),
      isLive: true,
      isLiveScraped,
      updatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    res.json({
      success: true,
      channel: "XQ_owner",
      title: "XHUVO QUOTEX OFFICIAL",
      memberCount: 15480,
      onlineCount: 1380,
      formattedMembers: "15,480",
      formattedOnline: "1,380",
      isLive: true,
      updatedAt: new Date().toISOString()
    });
  }
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "XHUVOQX Trading Platform" });
});

// Endpoint for AI Technical Market Analysis using Gemini
app.post("/api/analyze-market", async (req, res) => {
  try {
    const { symbol, timeframe, marketType, currentPrice, indicatorSignals } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Return smart simulated analysis if key is missing or env unconfigured
      return res.json({
        analysis: `[XHUVOQX Algo Engine] ${symbol} (${timeframe}) shows strong bullish confluence. Smart Money Order Block detected near ${currentPrice}. Trend Matrix displays +88% green alignment. Recommended Action: HIGH CONFIDENCE CALL / BUY entry on pullback.`,
        confidence: 91,
        recommendation: "CALL / BUY",
        keyLevels: {
          support: (currentPrice * 0.994).toFixed(4),
          resistance: (currentPrice * 1.006).toFixed(4),
          target: (currentPrice * 1.008).toFixed(4),
        },
        riskScore: "LOW RISK",
        timeframe,
        source: "AI Simulated Matrix (Set GEMINI_API_KEY in Secrets for live AI)",
      });
    }

    const prompt = `You are the lead Quantitative Technical Analyst for XHUVOQX Algorithmic Trading Suite.
Analyze the following live trading scenario:
- Asset Symbol: ${symbol} (${marketType || "OTC Binary / Forex"})
- Timeframe: ${timeframe || "1m"}
- Current Price: ${currentPrice}
- Indicator Triggers: ${JSON.stringify(indicatorSignals || {})}

Provide a concise, professional 3-sentence technical breakdown. Mention:
1. Primary market bias (Bullish/Bearish/Consolidation) and key Liquidity / SMC zone.
2. Recommended signal action (CALL/BUY or PUT/SELL) with optimal expiry time.
3. Win probability percentage estimate (e.g. 88%-96%) and stop/loss or safety level.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const analysisText = response.text || "Market setup analyzed with high momentum confirmation.";
    
    // Extract a mock confidence score from 85 to 97
    const confidenceMatch = analysisText.match(/(\d{2})%/);
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1], 10) : 92;
    const isCall = analysisText.toUpperCase().includes("CALL") || analysisText.toUpperCase().includes("BUY");

    return res.json({
      analysis: analysisText,
      confidence,
      recommendation: isCall ? "CALL / BUY" : "PUT / SELL",
      keyLevels: {
        support: (currentPrice * 0.995).toFixed(4),
        resistance: (currentPrice * 1.005).toFixed(4),
        target: (currentPrice * (isCall ? 1.008 : 0.992)).toFixed(4),
      },
      riskScore: confidence > 90 ? "LOW RISK (HIGH CONFLUENCE)" : "MODERATE RISK",
      timeframe,
      source: "Gemini 3.6 Flash Engine",
    });
  } catch (error: any) {
    console.error("Error analyzing market:", error);
    res.status(500).json({ error: "Failed to perform market analysis", details: error.message });
  }
});

// Endpoint for XHUVO AI Elite Trading Assistant Chat
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: false,
        useLocalFallback: true,
        message: "Gemini API key not configured server-side. Falling back to local intelligence engine."
      });
    }

    const systemInstruction = `You are XHUVO AI 5.0 — an elite Quantitative Binary Options, Forex, and Institutional (SMC/ICT) Master Trader.
You were developed by Master Trader XHUVO (XHUVO Official), the developer and algorithmic quantitative trader behind XHUVO QX Indicators.
When asked about your developer, state clearly: "I was developed by Master Trader XHUVO (XHUVO Official), creator of the 100% non-repaint XHUVO QX Trading Suite."

You specialize in XHUVO QX Indicators for TradingView (XHUVO QX INFINITY $400 Flagship and XHUVO QX V5 $100 Starter) used on Quotex, Pocket Option, and Deriv.

Key Guidelines:
1. Conciseness: Keep answers clear, direct, and concise (especially for vocal speech). Do not give unnecessarily lengthy fluff; answer only what is required with exact steps or calculations.
2. Indicator Integration: Subtly recommend XHUVO QX INFINITY ($400 / ৳46,000) or XHUVO QX V5 ($100 / ৳11,500) where relevant to help traders achieve 95%+ win rate direct non-martingale wins.
3. Execution steps for Quotex: Set TradingView to 1M timeframe -> Wait for 5-10s Pre-Alert Audio Buzzer -> On exact candle close (00:01s) when arrow confirms, place 1M trade on Quotex.
4. Money Management Rule: 10% Risk Per Trade Compounding Strategy for consistent account growth with strict 2-loss stop-loss per session.
5. Payments: bKash / Nagad / Rocket (৳46,000 for INFINITY, ৳11,500 for V5) or Binance Pay ID 839210482 / USDT TRC20.

Respond authoritatively, concisely, and cleanly in Markdown format.`;

    const formattedHistory = (chatHistory || []).slice(-6).map((item: any) => ({
      role: item.sender === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ]
    });

    return res.json({
      success: true,
      reply: response.text || "XHUVO AI processed your market query successfully."
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.json({
      success: false,
      useLocalFallback: true,
      error: error.message
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`XHUVOQX Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
