import React from 'react';
import { FarmerTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useMarketPrices } from '../context/MarketPriceContext';

interface FarmerSellRecommendationsProps {
  onNavigate: (tab: FarmerTab) => void;
  onInitiateSale: (mandiName: string) => void;
}

export const FarmerSellRecommendations: React.FC<FarmerSellRecommendationsProps> = ({
  onNavigate,
  onInitiateSale,
}) => {
  const { t } = useLanguage();
  const { getPrice } = useMarketPrices();
  const onionSnap = getPrice('Onion (Red)');
  const basePrice = onionSnap.modalPrice;
  const qty = 50;
  const transportNashik = 1200;
  const handlingNashik = 1000;
  const netNashik = qty * basePrice - transportNashik - handlingNashik;
  const punePrice = Math.round(basePrice * 1.04);
  const netPune = qty * punePrice - 3200 - 1000;
  const traderPrice = Math.round(basePrice * 0.94);
  const netTrader = qty * traderPrice;

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8 pb-24 md:pb-8 bg-[#F7F1E3]">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-3 py-1 bg-[#2F5233]/10 text-[#2F5233] rounded-full text-xs font-mono-price font-bold uppercase tracking-wider border border-[#2F5233]/20">
            ARBITRAGE ADVISORY • सर्वाधिक नफा सल्ला
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-[#2B2016] tracking-tight font-heading">
          {t.bestPlaceTitle}
        </h2>
        <p className="text-sm md:text-base text-[#6E5D4F] font-medium mt-1 font-body">
          {t.bestPlaceSubtitle}
        </p>
      </header>

      {/* Top Recommendation Ticket Stub (AI Enhanced) */}
      <section className="bg-[#FFFDF8] border-2 border-[#2F5233] rounded-t-3xl rounded-br-3xl rounded-bl-sm p-6 md:p-8 shadow-md relative overflow-hidden flex flex-col justify-between">
        {/* Top color bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#2F5233]" />

        <div className="flex justify-between items-start mb-6 flex-wrap gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#2F5233]/10 border-2 border-[#2F5233]/20 flex items-center justify-center text-[#2F5233] font-bold">
              <span className="material-symbols-outlined text-3xl">storefront</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-[#2B2016] tracking-tight font-heading">
                Nashik APMC Mandi
              </h3>
              <span className="inline-flex items-center gap-1 bg-[#2F5233]/10 text-[#2F5233] font-bold text-xs px-3 py-1 rounded-full mt-1.5 border border-[#2F5233]/20 font-body">
                <span className="material-symbols-outlined text-xs">recommend</span> {t.highestNetProfit}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl md:text-4xl font-black text-[#2F5233] tracking-tight font-mono-price">
              ₹{netNashik.toLocaleString('en-IN')}
            </div>
            <div className="text-xs md:text-sm font-bold text-[#6E5D4F] uppercase tracking-wider mt-0.5 font-body">
              {t.estimatedNetProfit} ({qty} {t.quintal})
            </div>
          </div>
        </div>

        {/* 4 Stats Grid with Ticket Slip Texture */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
          <div className="bg-[#F7F1E3] p-4 rounded-2xl border-2 border-[#E2D7C1]">
            <div className="text-[11px] font-bold text-[#6E5D4F] uppercase tracking-wider mb-1 font-body">{t.sellingPrice}</div>
            <div className="text-base md:text-lg font-black text-[#2B2016] font-mono-price">
              ₹{basePrice.toLocaleString('en-IN')} {t.perQuintal}
            </div>
          </div>

          <div className="bg-[#F7F1E3] p-4 rounded-2xl border-2 border-[#E2D7C1]">
            <div className="text-[11px] font-bold text-[#6E5D4F] uppercase tracking-wider mb-1 font-body">{t.distance}</div>
            <div className="text-base md:text-lg font-black text-[#2B2016] font-mono-price">45 km</div>
          </div>

          <div className="bg-[#F7F1E3] p-4 rounded-2xl border-2 border-[#E2D7C1]">
            <div className="text-[11px] font-bold text-[#6E5D4F] uppercase tracking-wider mb-1 font-body">{t.transportCost}</div>
            <div className="text-base md:text-lg font-black text-[#2B2016] font-mono-price">₹1,200 (Est)</div>
          </div>

          <div className="bg-[#F7F1E3] p-4 rounded-2xl border-2 border-[#E2D7C1]">
            <div className="text-[11px] font-bold text-[#6E5D4F] uppercase tracking-wider mb-1 font-body">{t.priceTrend}</div>
            <div className="text-base md:text-lg font-black text-[#2F5233] flex items-center gap-1 font-mono-price">
              +2.4% <span className="material-symbols-outlined text-base">trending_up</span>
            </div>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="bg-[#F7F1E3] border-2 border-[#E2D7C1] p-5 md:p-6 rounded-2xl flex items-start gap-4 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#FFFDF8] border-2 border-[#2F5233]/30 text-[#2F5233] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
            <h4 className="text-xs font-black text-[#2F5233] uppercase tracking-wider mb-1 font-heading">
              {t.arbitrageInsight}
            </h4>
            <p className="text-xs md:text-sm text-[#2B2016] font-medium leading-relaxed font-body">
              {t.aiArbitrageNote}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            onInitiateSale('Nashik Mandi');
            onNavigate('buyer-offers');
          }}
          className="w-full md:w-auto bg-[#2F5233] hover:bg-[#254228] text-white font-heading font-bold text-sm py-3.5 px-8 rounded-full transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>{t.viewDirectOffers}</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </section>

      {/* Alternative Markets Grid */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-black text-[#2B2016] flex items-center gap-2 tracking-tight font-heading">
          <span className="material-symbols-outlined text-[#2F5233]">alt_route</span>
          {t.alternativeMarkets}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pune APMC */}
          <div className="bg-[#FFFDF8] border-2 border-[#E2D7C1] rounded-2xl p-6 shadow-xs hover:border-[#2F5233] transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#F7F1E3] border border-[#E2D7C1] flex items-center justify-center text-[#2B2016]">
                    <span className="material-symbols-outlined text-xl">store</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#2B2016] font-heading">Pune APMC</h4>
                    <span className="text-xs text-[#6E5D4F] font-medium font-body">Central Wholesale Yard #4</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-[#2F5233] font-mono-price">₹{netPune.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-[#6E5D4F] font-bold uppercase font-body">{t.estimatedNetProfit}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-2xl bg-[#F7F1E3] border border-[#E2D7C1]">
                <div>
                  <div className="text-[11px] text-[#6E5D4F] font-bold uppercase font-body">{t.sellingPrice}</div>
                  <div className="text-sm font-black text-[#2B2016] mt-0.5 font-mono-price">₹{punePrice.toLocaleString('en-IN')}/q</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#6E5D4F] font-bold uppercase font-body">{t.distance}</div>
                  <div className="text-sm font-black text-[#2B2016] mt-0.5 font-mono-price">28 km</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onInitiateSale('Pune APMC');
                onNavigate('buyer-offers');
              }}
              className="w-full bg-[#F7F1E3] hover:bg-[#E2D7C1]/50 text-[#2F5233] font-heading font-bold text-xs py-3 rounded-full border-2 border-[#E2D7C1] transition-colors cursor-pointer"
            >
              Select Pune APMC &rarr;
            </button>
          </div>

          {/* Local Trader Direct */}
          <div className="bg-[#FFFDF8] border-2 border-[#E2D7C1] rounded-2xl p-6 shadow-xs hover:border-[#8C4A2F] transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#8C4A2F]/10 border border-[#8C4A2F]/20 flex items-center justify-center text-[#8C4A2F]">
                    <span className="material-symbols-outlined text-xl">person_pin</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#2B2016] font-heading">Local Trader (Direct)</h4>
                    <span className="text-xs text-[#6E5D4F] font-medium font-body">Immediate Farmgate Pickup</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-[#8C4A2F] font-mono-price">₹{netTrader.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-[#6E5D4F] font-bold uppercase font-body">{t.estimatedNetProfit}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-2xl bg-[#F7F1E3] border border-[#E2D7C1]">
                <div>
                  <div className="text-[11px] text-[#6E5D4F] font-bold uppercase font-body">{t.sellingPrice}</div>
                  <div className="text-sm font-black text-[#2B2016] mt-0.5 font-mono-price">₹{traderPrice.toLocaleString('en-IN')}/q</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#6E5D4F] font-bold uppercase font-body">{t.distance}</div>
                  <div className="text-sm font-black text-[#2B2016] mt-0.5 font-mono-price">5 km</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onInitiateSale('Local Trader');
                onNavigate('buyer-offers');
              }}
              className="w-full bg-[#F7F1E3] hover:bg-[#E2D7C1]/50 text-[#8C4A2F] font-heading font-bold text-xs py-3 rounded-full border-2 border-[#E2D7C1] transition-colors cursor-pointer"
            >
              Select Local Trader &rarr;
            </button>
          </div>
        </div>

        {/* Alternative Option: Store & Wait for Higher Market Rates */}
        <div className="bg-[#FFFDF8] rounded-3xl border-2 border-cyan-800/30 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-900/10 border border-cyan-800/20 flex items-center justify-center text-cyan-800 shrink-0">
              <span className="material-symbols-outlined text-2xl">warehouse</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-base text-[#2B2016]">
                  {t.storeVsSellTitle}
                </h4>
                <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">
                  WDRA Accredited
                </span>
              </div>
              <p className="text-xs text-[#6E5D4F] font-body mt-1 max-w-xl">
                {t.storeVsSellSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('storage')}
            className="px-5 py-2.5 rounded-full bg-cyan-800 hover:bg-cyan-900 text-white font-heading font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <span>{t.findStorage}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  );
};
