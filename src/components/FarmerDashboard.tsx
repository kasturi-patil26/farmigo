import React from 'react';
import { FarmerTab } from '../types';
import { useMarketPrices } from '../context/MarketPriceContext';
import { useLanguage } from '../context/LanguageContext';
import { WeatherWidget } from './WeatherWidget';

interface FarmerDashboardProps {
  onNavigate: (tab: FarmerTab) => void;
  onOpenAskAI: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  onNavigate,
  onOpenAskAI,
}) => {
  const { t } = useLanguage();
  const { allCommodities, getPrice } = useMarketPrices();
  const onionSnap = getPrice('Onion (Red)');
  const commodities = allCommodities.slice(0, 8);

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8 bg-[#F7F1E3]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-[#2F5233]/10 text-[#2F5233] rounded-full text-xs font-bold font-body uppercase tracking-wider border border-[#2F5233]/20">
              {t.verifiedFarmer}
            </span>
            <span className="text-xs font-bold text-[#6E5D4F] font-body">Maharashtra APMC & e-NAM</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#2B2016] tracking-tight font-heading">
            {t.greeting}, Ramesh Patil
          </h1>
          <p className="text-sm md:text-base text-[#6E5D4F] font-medium mt-1 font-body">
            {t.kisanId}: <strong className="text-[#2B2016] font-mono-price">KID-MH-98421</strong> • Dindori, Nashik (6.5 {t.acresLabel})
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('storage')}
            className="bg-[#FFFDF8] hover:bg-[#F7F1E3] text-[#2B2016] font-bold font-heading text-xs px-4 py-3 rounded-full flex items-center gap-2 transition-all border-2 border-[#E2D7C1] shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-cyan-700">warehouse</span>
            {t.findStorage || 'Find Storage'}
          </button>
          <button
            onClick={() => onNavigate('farm-store')}
            className="bg-[#FFFDF8] hover:bg-[#F7F1E3] text-[#2B2016] font-bold font-heading text-xs px-5 py-3 rounded-full flex items-center gap-2 transition-all border-2 border-[#E2D7C1] shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#D9A441]">shopping_bag</span>
            {t.farmStore}
          </button>
          <button
            onClick={() => onNavigate('sell')}
            className="bg-[#2F5233] hover:bg-[#254228] text-white font-bold font-heading text-xs px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            {t.addProduce}
          </button>
        </div>
      </div>

      {/* Real-Time Live Weather & Dynamic Advisory (Open-Meteo) */}
      <WeatherWidget region="Nashik" />

      {/* Mandi Pass & Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Mandi Gate Entry / Crop Advisory Pass (Span 8) */}
        <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm border-2 border-[#2F5233] p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-sm">
          {/* Top color bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2F5233]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2F5233]/10 border-2 border-[#2F5233]/30 flex items-center justify-center text-[#2F5233] shrink-0">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    psychology
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono-price font-bold uppercase tracking-widest text-[#2F5233]">
                    KRUSHI INTELLIGENCE • ADVISORY
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-[#2B2016] tracking-tight font-heading">
                    {t.checkAIPrediction}
                  </h3>
                </div>
              </div>
              <div className="mandi-stamp mandi-stamp-green px-3 py-1 text-xs">
                <span>{t.highConfidence}</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-[#2B2016] font-medium leading-relaxed mt-2 font-body">
              {t.wheatInsightHeadline}
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t-2 border-dashed border-[#E2D7C1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-xs text-[#6E5D4F] font-medium flex items-center gap-1.5 font-body">
              <span className="material-symbols-outlined text-sm text-[#2F5233]">auto_graph</span>
              {t.mandiAggregatedNote}
            </span>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="text-[#2F5233] font-bold text-xs flex items-center gap-1 hover:underline transition-colors uppercase tracking-wider font-heading cursor-pointer"
            >
              <span>{t.details}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Live APMC Price Ticker Card (Span 4) */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm border-2 border-[#D9A441] p-6 md:p-8 text-[#2B2016] relative overflow-hidden flex flex-col justify-between shadow-sm">
          {/* Top color bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D9A441]" />

          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-[#D9A441]/15 text-[#976D1F] border border-[#D9A441]/40 rounded-full text-xs font-mono-price font-bold uppercase tracking-wider">
                {t.activeBenchmark}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#2F5233] font-bold font-body">
                <span className="w-2 h-2 rounded-full bg-[#2F5233] animate-pulse"></span>
                {t.liveENAM}
              </div>
            </div>

            <p className="text-xs text-[#6E5D4F] font-semibold uppercase tracking-widest font-body">
              {onionSnap.commodity} • {t.peakRateToday}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl md:text-4xl font-black text-[#2B2016] font-mono-price">
                ₹{onionSnap.modalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#6E5D4F] font-medium font-body">{t.perQuintal}</span>
            </div>
            <p className="text-xs text-[#2F5233] font-bold mt-1.5 flex items-center gap-1 font-body">
              <span className="material-symbols-outlined text-sm text-[#2F5233]">trending_up</span>
              <span>+{onionSnap.trendPercent}% {t.aboveMSP}</span>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-dashed border-[#E2D7C1] flex items-center justify-between text-xs text-[#6E5D4F] font-medium">
            <span className="font-body">{onionSnap.primaryMandiName}</span>
            <button
              onClick={() => onNavigate('markets')}
              className="text-[#2F5233] font-bold font-heading hover:underline cursor-pointer"
            >
              {t.viewAll}
            </button>
          </div>
        </div>

        {/* Quick Action Mandi Tiles */}
        <div className="col-span-1 md:col-span-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('sell')}
            className="bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] hover:border-[#2F5233] p-4 flex flex-col items-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2F5233]/10 border-2 border-[#2F5233]/20 flex items-center justify-center text-[#2F5233] mb-2.5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">add_circle</span>
            </div>
            <h4 className="font-bold text-xs text-[#2B2016] font-heading leading-tight">{t.addProduce}</h4>
          </button>

          <button
            onClick={() => onNavigate('storage')}
            className="bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] hover:border-[#2F5233] p-4 flex flex-col items-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-900/10 border-2 border-cyan-800/20 flex items-center justify-center text-cyan-800 mb-2.5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">warehouse</span>
            </div>
            <h4 className="font-bold text-xs text-[#2B2016] font-heading leading-tight">{t.findStorage || 'Find Storage'}</h4>
          </button>

          <button
            onClick={() => onNavigate('markets')}
            className="bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] hover:border-[#2F5233] p-4 flex flex-col items-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FFFDF8] border-2 border-[#E2D7C1] flex items-center justify-center text-[#2B2016] mb-2.5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl text-[#D9A441]">monitoring</span>
            </div>
            <h4 className="font-bold text-xs text-[#2B2016] font-heading leading-tight">{t.marketPrices}</h4>
          </button>

          <button
            onClick={() => onNavigate('sell-recommendations')}
            className="bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] hover:border-[#2F5233] p-4 flex flex-col items-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2F5233]/10 border-2 border-[#2F5233]/20 flex items-center justify-center text-[#2F5233] mb-2.5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">alt_route</span>
            </div>
            <h4 className="font-bold text-xs text-[#2B2016] font-heading leading-tight">{t.bestPlaceToSell}</h4>
          </button>

          <button
            onClick={() => onNavigate('buyer-offers')}
            className="bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] hover:border-[#2F5233] p-4 flex flex-col items-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8C4A2F]/10 border-2 border-[#8C4A2F]/20 flex items-center justify-center text-[#8C4A2F] mb-2.5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">handshake</span>
            </div>
            <h4 className="font-bold text-xs text-[#2B2016] font-heading leading-tight">{t.buyerOffers}</h4>
          </button>

          <button
            onClick={() => onNavigate('farm-store')}
            className="bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] hover:border-[#2F5233] p-4 flex flex-col items-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D9A441]/15 border-2 border-[#D9A441]/30 flex items-center justify-center text-[#976D1F] mb-2.5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </div>
            <h4 className="font-bold text-xs text-[#2B2016] font-heading leading-tight">{t.farmStore}</h4>
          </button>

          <button
            onClick={() => onNavigate('sales-tracking')}
            className="bg-[#FFFDF8] rounded-2xl border-2 border-[#E2D7C1] hover:border-[#2F5233] p-4 flex flex-col items-center text-center shadow-xs transition-all active:scale-95 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1F6F78]/10 border-2 border-[#1F6F78]/20 flex items-center justify-center text-[#1F6F78] mb-2.5 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">receipt_long</span>
            </div>
            <h4 className="font-bold text-xs text-[#2B2016] font-heading leading-tight">{t.salesTracking}</h4>
          </button>
        </div>

        {/* Live Mandi Ticker Price Table (Span 12) */}
        <div className="col-span-1 md:col-span-12 bg-[#FFFDF8] rounded-3xl border-2 border-[#E2D7C1] shadow-xs overflow-hidden">
          <div className="p-6 md:p-8 border-b-2 border-[#E2D7C1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FFFDF8]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-[#2F5233]/10 text-[#2F5233] border border-[#2F5233]/20 rounded-md text-[11px] font-mono-price font-bold uppercase tracking-wider">
                  APMC e-NAM TICKER
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#2B2016] tracking-tight font-heading">
                {t.liveMandiTicker}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 text-xs text-[#2B2016] font-bold font-body bg-[#F7F1E3] border-2 border-[#E2D7C1] px-4 py-2 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2F5233] animate-pulse"></span>
                {t.updatedMinsAgo}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#E2D7C1] text-[#6E5D4F] text-xs uppercase tracking-widest font-bold bg-[#F7F1E3] font-body">
                  <th className="p-4 pl-6 md:pl-8">{t.commodity}</th>
                  <th className="p-4">{t.category}</th>
                  <th className="p-4 text-right">{t.price} ({t.perQuintal})</th>
                  <th className="p-4 text-right pr-6">{t.trend}</th>
                  <th className="p-4 text-center pr-6 md:pr-8 hidden sm:table-cell">{t.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#E2D7C1]/60 text-sm font-body">
                {commodities.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onNavigate('markets')}
                    className="hover:bg-[#F7F1E3]/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4 pl-6 md:pl-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2F5233]/10 border border-[#2F5233]/20 flex items-center justify-center font-bold text-[#2F5233]">
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#2B2016] text-base block font-heading">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#6E5D4F] font-medium sm:hidden">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-[#F7F1E3] border border-[#E2D7C1] text-[#2B2016] px-3 py-1 rounded-full text-xs font-mono-price font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-right font-black text-lg text-[#2B2016] font-mono-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right pr-6">
                      {item.isTrendEstimated ? (
                        <span className="inline-flex items-center justify-end gap-1 font-bold text-xs px-2.5 py-1 rounded-full font-mono-price text-[#6E5D4F] bg-[#E2D7C1]/40 border border-[#E2D7C1]">
                          <span className="material-symbols-outlined text-sm">horizontal_rule</span>
                          N/A
                        </span>
                      ) : item.trend === 0 ? (
                        <span className="inline-flex items-center justify-end gap-1 font-bold text-xs px-2.5 py-1 rounded-full font-mono-price text-[#6E5D4F] bg-[#E2D7C1]/40 border border-[#E2D7C1]">
                          <span className="material-symbols-outlined text-sm">horizontal_rule</span>
                          Stable
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center justify-end gap-1 font-bold text-xs px-2.5 py-1 rounded-full font-mono-price ${
                            item.trend > 0
                              ? 'text-[#2F5233] bg-[#2F5233]/10 border border-[#2F5233]/30'
                              : 'text-[#8C4A2F] bg-[#8C4A2F]/10 border border-[#8C4A2F]/30'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {item.trend > 0 ? 'trending_up' : 'trending_down'}
                          </span>
                          {item.trend > 0 ? `+${item.trend}%` : `${item.trend}%`}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center pr-6 md:pr-8 hidden sm:table-cell">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('sell-recommendations');
                        }}
                        className="text-xs font-bold font-heading text-[#2F5233] hover:text-white hover:bg-[#2F5233] px-4 py-2 rounded-full border-2 border-[#2F5233] transition-all cursor-pointer"
                      >
                        {t.sellThis}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
