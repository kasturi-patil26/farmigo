import React, { useState } from 'react';
import { BuyerOffer, FarmerTab } from '../types';
import { INITIAL_BUYER_OFFERS, INITIAL_SALES_RECORDS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { scoreAndRankBuyerOffers, getTopFactors } from '../utils/buyerScoring';
import { computeBuyerVerification, computeQualityScoreFromHistory, getQualityTrackRecordSummary } from '../utils/verificationAndQuality';
import { DemoDataBadge } from './DemoDataBadge';

interface FarmerBuyerOffersProps {
  onNavigate: (tab: FarmerTab) => void;
  onAcceptOffer: (offer: BuyerOffer) => void;
}

export const FarmerBuyerOffers: React.FC<FarmerBuyerOffersProps> = ({
  onNavigate,
  onAcceptOffer,
}) => {
  const { t } = useLanguage();
  // Real quality score derived from the farmer's actual post-delivery buyer
  // ratings, instead of a hardcoded 85 default used previously.
  const farmerQualityScore = computeQualityScoreFromHistory(INITIAL_SALES_RECORDS);
  const qualityTrackRecordSummary = getQualityTrackRecordSummary(INITIAL_SALES_RECORDS);
  const [offers, setOffers] = useState<BuyerOffer[]>(() =>
    scoreAndRankBuyerOffers(INITIAL_BUYER_OFFERS, farmerQualityScore)
  );
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [activeCrop] = useState({ name: 'Wheat (Lok-1)', quantity: 50, expectedPrice: 2800 });

  const handleDecline = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'declined' } : o))
    );
  };

  const handleAccept = (offer: BuyerOffer) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offer.id ? { ...o, status: 'accepted' } : o))
    );
    onAcceptOffer(offer);
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 mb-20 md:mb-8 bg-[#F7F1E3]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-1 bg-[#2F5233]/10 text-[#2F5233] rounded-full text-xs font-mono-price font-bold uppercase tracking-wider border border-[#2F5233]/20">
              DIRECT APMC BIDS • थेट खरेदीदार सौदे
            </span>
            <DemoDataBadge type="simulated" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#2B2016] tracking-tight font-heading">
            {t.buyerOffers}
          </h1>
          <p className="text-sm md:text-base text-[#6E5D4F] font-medium mt-1 font-body">
            {t.buyerOffersSubtitle}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-bold text-[#2F5233] bg-[#2F5233]/10 border border-[#2F5233]/20 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">military_tech</span>
            {t.qualityTrackRecord}: {qualityTrackRecordSummary}
          </span>
        </div>

        {/* Compare Toggle */}
        <div className="flex items-center gap-3 bg-[#FFFDF8] px-5 py-2.5 rounded-full border-2 border-[#E2D7C1] shadow-xs">
          <span className="text-xs md:text-sm font-bold text-[#2B2016] font-body">{t.compareMode}</span>
          <button
            type="button"
            role="switch"
            aria-checked={isCompareMode}
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isCompareMode ? 'bg-[#2F5233]' : 'bg-[#E2D7C1]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                isCompareMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Selected Crop Context Mandi Strip */}
      <div className="mb-6 md:mb-8 bg-[#FFFDF8] rounded-2xl p-5 md:p-6 border-2 border-[#E2D7C1] shadow-xs flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2F5233]/10 border-2 border-[#2F5233]/20 flex items-center justify-center text-[#2F5233]">
            <span className="material-symbols-outlined text-2xl">eco</span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-[#2B2016] font-heading">
              {activeCrop.name}
            </h2>
            <p className="text-xs md:text-sm text-[#6E5D4F] font-medium mt-0.5 font-body">
              {t.listedQuantity}: <strong className="text-[#2B2016] font-mono-price font-bold">{activeCrop.quantity} {t.quintal}</strong> • High Grade
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-bold text-[#6E5D4F] uppercase tracking-wider mb-0.5 font-body">
            {t.expectedBasePrice}
          </p>
          <p className="text-xl md:text-2xl font-black text-[#2F5233] font-mono-price">
            ₹{activeCrop.expectedPrice.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-normal text-[#6E5D4F] font-body">/{t.quintal}</span>
          </p>
        </div>
      </div>

      {/* Offers Grid / Comparison Mode with Ticket-Stub Styling */}
      <div
        className={
          isCompareMode
            ? 'flex overflow-x-auto gap-5 pb-4 snap-x'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }
      >
        {offers.map((offer) => {
          const topFactors = getTopFactors(offer);
          return (
            <div
              key={offer.id}
              className={`bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm border-2 ${
                offer.isBestMatch
                  ? 'border-[#2F5233] shadow-md ring-2 ring-[#2F5233]/20'
                  : 'border-[#E2D7C1] shadow-xs'
              } p-6 flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md ${
                isCompareMode ? 'min-w-[320px] max-w-[360px] snap-start' : ''
              }`}
            >
              {/* Top color bar */}
              <div
                className={`h-1.5 w-full -mt-6 -mx-6 mb-5 ${
                  offer.isBestMatch ? 'bg-[#2F5233]' : 'bg-[#D9A441]'
                }`}
              />

              <div>
                {/* Card Top */}
                <div className="flex justify-between items-start mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#8C4A2F]/10 flex items-center justify-center border border-[#8C4A2F]/20 text-[#8C4A2F] font-bold">
                      <span className="material-symbols-outlined text-2xl">
                        {offer.buyerName.includes('Local') ? 'person' : 'storefront'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-black text-[#2B2016] font-heading leading-tight">
                        {offer.buyerName}
                      </h3>
                      <div className="flex items-center gap-1 text-[#D9A441]">
                        <span
                          className="material-symbols-outlined text-sm text-[#D9A441]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-xs font-bold text-[#2B2016] font-mono-price">{offer.rating}</span>
                        <span className="text-[11px] text-[#6E5D4F] font-body">{t.sellerScore}</span>
                      </div>
                      <div className="mt-1">
                        {computeBuyerVerification(offer) ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2F5233] bg-[#2F5233]/10 border border-[#2F5233]/30 px-2 py-0.5 rounded-full">
                            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            {t.verifiedBuyerBadge}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#6E5D4F] bg-[#E2D7C1]/40 border border-[#E2D7C1] px-2 py-0.5 rounded-full">
                            <span className="material-symbols-outlined text-[12px]">help</span>
                            {t.unverifiedBuyerBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {offer.isBestMatch && (
                      <span className="bg-[#2F5233]/10 text-[#2F5233] border border-[#2F5233]/30 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 font-body shrink-0">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                        {t.bestMatch}
                      </span>
                    )}

                    {offer.hasFastPickup && !offer.isBestMatch && (
                      <span className="bg-[#D9A441]/15 text-[#976D1F] border border-[#D9A441]/40 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 font-body shrink-0">
                        <span className="material-symbols-outlined text-sm">local_shipping</span>
                        {t.fastPickup}
                      </span>
                    )}
                  </div>
                </div>

                {/* Explainability factors */}
                {offer.isBestMatch ? (
                  <div className="mb-4 bg-[#2F5233]/5 border border-[#2F5233]/20 rounded-xl p-2.5">
                    <p className="text-[11px] font-bold text-[#2F5233] leading-tight">
                      Best Match — {topFactors[0]} + {topFactors[1]}
                    </p>
                  </div>
                ) : (
                  <div className="mb-3">
                    <p className="text-[11px] font-medium text-[#6E5D4F]">
                      Key factor: {topFactors[0]}
                    </p>
                  </div>
                )}

                {/* Data Table within Card */}
                <div className="space-y-3 text-sm py-2 font-body">
                  <div className="flex justify-between items-center pb-2.5 border-b border-[#E2D7C1]">
                    <span className="text-xs text-[#6E5D4F] font-medium">{t.offeredPrice}</span>
                    <span className="text-xl font-black text-[#2B2016] font-mono-price">
                      ₹{offer.offeredPrice.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-[#6E5D4F] font-body">/{t.quintal}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-[#E2D7C1]">
                    <span className="text-xs text-[#6E5D4F] font-medium">{t.quantityRequired}</span>
                    <span className="font-bold text-[#2B2016] text-xs font-mono-price">{offer.quantity}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-[#E2D7C1]">
                    <span className="text-xs text-[#6E5D4F] font-medium">{t.totalPayout}</span>
                    <span className="font-black text-[#2F5233] text-base font-mono-price">
                      ₹{(offer.offeredPrice * offer.quantityQuintals).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-[#E2D7C1]">
                    <span className="text-xs text-[#6E5D4F] font-medium">Distance & Logistics</span>
                    <span className="text-xs font-bold text-[#2B2016] font-mono-price">
                      {offer.distanceKm ?? 25} km from farm
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6E5D4F] font-medium">{t.requiredQuality}</span>
                    <span className="text-xs font-bold text-[#2F5233] bg-[#2F5233]/10 border border-[#2F5233]/20 px-2.5 py-0.5 rounded-full font-body">
                      {offer.requiredQuality}
                    </span>
                  </div>
                </div>
              </div>

              {/* Perforated Tear Line */}
              <div className="perforated-h my-3 -mx-6" />

              {/* Actions */}
              <div className="pt-2">
                {offer.status === 'accepted' ? (
                  <div className="w-full py-3 bg-[#2F5233]/10 border border-[#2F5233]/30 text-[#2F5233] text-center font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 font-heading">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    {t.offerAcceptedPass}
                  </div>
                ) : offer.status === 'declined' ? (
                  <div className="w-full py-3 bg-[#F7F1E3] text-[#6E5D4F] text-center font-bold text-xs rounded-2xl border border-[#E2D7C1] font-heading">
                    {t.declined}
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDecline(offer.id)}
                      className="flex-1 bg-[#F7F1E3] border-2 border-[#E2D7C1] text-[#2B2016] font-bold text-xs py-3 rounded-2xl hover:bg-[#E2D7C1]/50 transition-colors cursor-pointer font-heading min-h-[44px]"
                    >
                      {t.decline}
                    </button>
                    <button
                      onClick={() => handleAccept(offer)}
                      className="flex-1 bg-[#2F5233] hover:bg-[#254228] text-white font-bold text-xs py-3 rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer font-heading min-h-[44px]"
                    >
                      {t.acceptOffer}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-[#2F5233] font-bold text-sm flex items-center gap-1.5 hover:underline cursor-pointer font-heading"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          {t.backToDashboard}
        </button>
      </div>
    </main>
  );
};
