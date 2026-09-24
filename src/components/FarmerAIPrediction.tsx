import React, { useState, useEffect } from 'react';
import { FarmerTab, AuthUser } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DemoDataBadge } from './DemoDataBadge';
import { calculateStorageVsSellNow } from '../utils/storageDecision';

interface KeyDriver {
  title: string;
  desc: string;
}

interface FarmerAIPredictionProps {
  onNavigate: (tab: FarmerTab) => void;
  onOpenAskAI: () => void;
  currentUser?: AuthUser | null;
}

export const FarmerAIPrediction: React.FC<FarmerAIPredictionProps> = ({
  onNavigate,
  onOpenAskAI,
  currentUser,
}) => {
  const { t, language } = useLanguage();
  const initialCrop = currentUser?.primaryCrops?.[0] || 'Soybean (Yellow)';
  const [selectedCrop, setSelectedCrop] = useState(initialCrop);
  
  // Dynamic forecast states
  const [priceRange, setPriceRange] = useState('₹2,400 - ₹2,600');
  const [currentPrice, setCurrentPrice] = useState('₹2,250');
  const [expectedChange, setExpectedChange] = useState('+6.6%');
  const [confidence, setConfidence] = useState(85);
  const [trend, setTrend] = useState('Rising Trend');
  const [keyDrivers, setKeyDrivers] = useState<KeyDriver[]>([
    {
      title: 'Lower Monsoon Rainfall',
      desc: 'Impacting early sowing in central regions.',
    },
    {
      title: 'High Export Demand',
      desc: 'Increased procurement from SE Asian markets.',
    },
  ]);
  const [insight, setInsight] = useState('');
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [statisticalBaseline, setStatisticalBaseline] = useState<{
    method: string;
    movingAverage7Day: number;
    projected7DayPrice: number;
    priceRangeLower: number;
    priceRangeUpper: number;
    percentChange: number;
  } | null>(null);

  const radius = 45;
  const circumference = 2 * Math.PI * radius; // ≈ 282.74
  const [gaugeOffset, setGaugeOffset] = useState(circumference - (85 / 100) * circumference);

  const [customQuestion, setCustomQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);

  // Deterministic store vs sell now calculation based on current forecast
  const numericCurrentPrice = Number(currentPrice.replace(/[^0-9]/g, '')) || 2250;
  const storageDecision = calculateStorageVsSellNow(
    numericCurrentPrice,
    50,
    priceRange,
    0.85,
    60
  );

  useEffect(() => {
    if (currentUser?.primaryCrops?.[0]) {
      setSelectedCrop(currentUser.primaryCrops[0]);
    }
  }, [currentUser]);

  // Fetch forecast data dynamically from /api/ai/forecast
  useEffect(() => {
    let isMounted = true;
    const fetchForecast = async () => {
      setLoadingForecast(true);
      const userRegion = currentUser?.location || 'Maharashtra';

      try {
        const res = await fetch('/api/ai/forecast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            crop: selectedCrop,
            season: 'Kharif',
            region: userRegion,
            language,
          }),
        });

        if (!res.ok) throw new Error('Forecast fetch failed');
        const data = await res.json();

        if (isMounted) {
          if (data.priceRange) setPriceRange(data.priceRange);
          if (data.currentPrice) setCurrentPrice(data.currentPrice);
          if (data.expectedChange) setExpectedChange(data.expectedChange);
          if (data.trend) setTrend(data.trend);
          if (data.insight) setInsight(data.insight);
          if (Array.isArray(data.keyDrivers) && data.keyDrivers.length > 0) {
            setKeyDrivers(data.keyDrivers);
          }
          const conf = typeof data.confidence === 'number' ? data.confidence : 85;
          setConfidence(conf);
          const newOffset = circumference - (conf / 100) * circumference;
          setGaugeOffset(newOffset);
          if (data.statisticalBaseline) setStatisticalBaseline(data.statisticalBaseline);
        }
      } catch (err) {
        console.error('Failed to load forecast:', err);
        // Fallback default state
        if (isMounted) {
          const defaultConf = 85;
          setConfidence(defaultConf);
          setGaugeOffset(circumference - (defaultConf / 100) * circumference);
        }
      } finally {
        if (isMounted) {
          setLoadingForecast(false);
        }
      }
    };

    fetchForecast();

    return () => {
      isMounted = false;
    };
  }, [selectedCrop, currentUser?.location, language, circumference]);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setAiLoading(true);
    setCustomAnswer(null);

    const userRegion = currentUser?.location || 'Maharashtra';

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customQuestion,
          role: 'Farmer',
          crop: selectedCrop,
          region: userRegion,
          language,
        }),
      });
      const data = await res.json();
      setCustomAnswer(data.response || 'Insight retrieved successfully.');
    } catch {
      if (language === 'mr') {
        setCustomAnswer(
          `${userRegion} मधील ${selectedCrop} साठी सध्याचे बाजारभाव पाहता चांगल्या प्रतीचा माल ३-५ दिवस थांबवून विकणे फायदेशीर ठरेल. क्विंटलमागे ₹५०-₹८० वाढ दिसून येत आहे.`
        );
      } else if (language === 'hi') {
        setCustomAnswer(
          `${userRegion} में ${selectedCrop} के लिए वर्तमान APMC दरें उत्तम गुणवत्ता के माल को 3-5 दिन रोककर बेचने के पक्ष में हैं। ₹50-₹80 प्रति क्विंटल की तेजी बनी हुई है।`
        );
      } else {
        setCustomAnswer(
          `For ${selectedCrop} in ${userRegion}, prices are supported by delayed regional arrivals and robust crushing demand in western oil mills. Target staggered liquidation across the ₹2,550-₹2,620 range.`
        );
      }
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <main className="flex-grow pt-4 pb-20 md:pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full animate-fade-in">
      {/* Header Section */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
              {t.predictiveEngine}
            </span>
            <DemoDataBadge type="ai_assisted_estimate" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-600 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            {t.aiForecasting}
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl mt-1">
            {t.aiForecastingSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold text-xs">
            Kharif Season
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
            {t.updatedToday}
          </span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Prediction Card */}
        <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {selectedCrop}
                </h2>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="text-xs bg-slate-50 border-2 border-slate-200 rounded-full px-3 py-1.5 font-bold text-indigo-600 cursor-pointer focus:outline-none focus:border-indigo-600"
                >
                  <option value="Soybean (Yellow)">Soybean</option>
                  <option value="Wheat (Lokwan)">Wheat</option>
                  <option value="Onion (Nashik Red)">Onion</option>
                  <option value="Cotton (Medium)">Cotton</option>
                  <option value="Grapes (Green Seedless)">Grapes</option>
                </select>
              </div>
              <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">
                {t.expectedPricePerQtl}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
              <span className="text-xs font-bold">{trend || t.risingTrend}</span>
            </div>
          </div>

          {loadingForecast ? (
            <div className="relative z-10 py-8 flex flex-col items-center justify-center text-center space-y-3">
              <span className="material-symbols-outlined animate-spin text-3xl text-indigo-600">progress_activity</span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generating dynamic AI prediction...</p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
              {/* Price Range */}
              <div className="text-center sm:text-left">
                <div className="text-4xl md:text-6xl font-black text-slate-900 mb-1 tracking-tight font-mono">
                  {priceRange}
                </div>
                <div className="text-sm md:text-base text-slate-500 flex items-center gap-2 justify-center sm:justify-start font-medium">
                  <span>{t.currentPrice}: <strong className="text-slate-800 font-mono">{currentPrice}</strong></span>
                  <span className="text-emerald-700 font-bold text-xs bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full font-mono">
                    {expectedChange} {t.expected}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-center sm:justify-start">
                  <DemoDataBadge type="ai_assisted_estimate" />
                </div>
                {insight && (
                  <p className="text-xs text-slate-600 font-medium mt-3 max-w-lg leading-relaxed bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100">
                    <strong className="text-indigo-900">Key Insight:</strong> {insight}
                  </p>
                )}
                {statisticalBaseline && (
                  <div className="mt-3 max-w-lg bg-amber-50/70 border border-amber-200 rounded-2xl p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="material-symbols-outlined text-amber-700 text-base">calculate</span>
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                        {t.statisticalBaselineBadge}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-amber-900 font-mono-price font-bold mb-1.5">
                      <span>7d Avg: ₹{statisticalBaseline.movingAverage7Day.toLocaleString('en-IN')}</span>
                      <span>Projected: ₹{statisticalBaseline.projected7DayPrice.toLocaleString('en-IN')}</span>
                      <span>Range: ₹{statisticalBaseline.priceRangeLower.toLocaleString('en-IN')} - ₹{statisticalBaseline.priceRangeUpper.toLocaleString('en-IN')}</span>
                      <span className={statisticalBaseline.percentChange >= 0 ? 'text-emerald-700' : 'text-red-700'}>
                        {statisticalBaseline.percentChange >= 0 ? '+' : ''}{statisticalBaseline.percentChange}%
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800/80 leading-snug font-medium">
                      {t.statisticalBaselineExplanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Confidence Gauge SVG */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#4f46e5"
                    strokeLinecap="round"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    style={{
                      strokeDashoffset: gaugeOffset,
                      transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-indigo-600 font-mono">{confidence}%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.certainty}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="relative z-10 pt-5 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-medium">
              {t.modelCalibratedNote}
            </span>
            <button
              onClick={() => onNavigate('sell-recommendations')}
              className="text-indigo-600 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
            >
              {t.findBestMandis}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Key Drivers Card */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border-2 border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 tracking-tight">
              <span className="material-symbols-outlined text-indigo-600">lightbulb</span>
              {t.keyMarketDrivers}
            </h3>
            <ul className="flex flex-col gap-3">
              {keyDrivers.map((driver, idx) => (
                <li
                  key={idx}
                  className={`flex gap-3 items-start p-4 rounded-2xl border ${
                    idx % 2 === 0
                      ? 'bg-red-50/70 border-red-200/80 text-red-900'
                      : 'bg-indigo-50/70 border-indigo-100 text-indigo-900'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined mt-0.5 text-xl ${
                      idx % 2 === 0 ? 'text-red-600' : 'text-indigo-600'
                    }`}
                  >
                    {idx % 2 === 0 ? 'water_drop' : 'public'}
                  </span>
                  <div>
                    <span className="text-xs font-bold block mb-0.5">
                      {driver.title}
                    </span>
                    <span className="text-xs text-slate-600 leading-relaxed font-medium">
                      {driver.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onOpenAskAI}
            className="mt-5 w-full bg-slate-50 hover:bg-slate-100 text-indigo-600 font-bold text-xs py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 border-2 border-slate-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">psychology</span>
            {t.askAIAdvisor}
          </button>
        </div>

        {/* Store vs. Sell Now Side-by-Side Comparison Card */}
        <div className="col-span-1 md:col-span-12 bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-3 py-1 bg-cyan-50 text-cyan-800 rounded-full text-xs font-bold uppercase tracking-wider border border-cyan-200">
                  {t.storeVsSellTitle}
                </span>
                <DemoDataBadge type="ai_assisted_estimate" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {selectedCrop}: {t.storeVsSellSubtitle}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('storage')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">warehouse</span>
              <span>{t.findStorage}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Sell Now Box */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              storageDecision.recommendedOption === 'sell_now'
                ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.sellNowOption}
                </span>
                {storageDecision.recommendedOption === 'sell_now' && (
                  <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold">
                    {t.recommendedChoice}
                  </span>
                )}
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 font-mono">
                ₹{storageDecision.netSellNow.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                50 qtl @ ₹{numericCurrentPrice.toLocaleString('en-IN')}/qtl (mandi rate)
              </p>
            </div>

            {/* Store & Sell Later Box */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              storageDecision.recommendedOption === 'store'
                ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.storeAndSellLaterOption}
                </span>
                {storageDecision.recommendedOption === 'store' && (
                  <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold">
                    {t.recommendedChoice}
                  </span>
                )}
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 font-mono">
                ₹{storageDecision.netStoreAndSellLater.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Net return after ₹{storageDecision.storageCost.toLocaleString('en-IN')} storage fee (60 days @ ₹0.85/qtl/day)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-indigo-600">info</span>
              {t.storageEstimateDisclaimer}
            </span>
            <span className="font-bold text-slate-700 shrink-0">
              {storageDecision.isStoreProfitable
                ? `Net Advantage: +₹${storageDecision.absDifference.toLocaleString('en-IN')}`
                : `Sell Now Advantage: +₹${storageDecision.absDifference.toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>

        {/* Interactive Query Assistant Box */}
        <div className="col-span-1 md:col-span-12 bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-slate-200 shadow-sm">
          <h3 className="text-base md:text-lg font-black text-slate-900 mb-2 flex items-center gap-2 tracking-tight">
            <span className="material-symbols-outlined text-indigo-600">forum</span>
            {t.askLiveQuestion} ({selectedCrop})
          </h3>
          <form onSubmit={handleAskQuestion} className="flex flex-col sm:flex-row gap-3 mt-3">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="e.g. Should I sell my soybean now or hold until next month?"
              className="flex-1 h-12 px-5 rounded-full bg-slate-50 border-2 border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:border-indigo-600 text-slate-800"
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              {aiLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">send</span>
                  {t.send}
                </>
              )}
            </button>
          </form>

          {customAnswer && (
            <div className="mt-5 p-5 rounded-3xl bg-indigo-50/70 border-2 border-indigo-100 text-xs md:text-sm text-slate-800 leading-relaxed flex items-start gap-3.5">
              <span className="material-symbols-outlined text-indigo-600 shrink-0 mt-0.5 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <div>
                <strong className="text-indigo-600 block font-black mb-1">
                  FarmiGo AI Recommendation:
                </strong>
                <p className="font-medium text-slate-700">{customAnswer}</p>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer Card */}
        <div className="col-span-1 md:col-span-12 bg-slate-100/70 rounded-3xl p-5 border-2 border-slate-200/80 flex items-start gap-3">
          <span className="material-symbols-outlined text-slate-500 shrink-0 mt-0.5 text-lg">
            info
          </span>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            <strong className="font-bold text-slate-700">Disclaimer:</strong> {t.aiDisclaimer}
          </p>
        </div>
      </div>
    </main>
  );
};
