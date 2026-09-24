import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface RoleSelectionProps {
  onSelectRole: (role: 'farmer' | 'merchant' | 'government') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const { t } = useLanguage();

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8 py-8 md:py-16 relative overflow-hidden bg-[#F7F1E3]">
      {/* Background warm watermark texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D9A441]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#2F5233]/10 blur-3xl" />
      </div>

      {/* Header section */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFFDF8] border-2 border-[#E2D7C1] rounded-full text-xs font-bold text-[#2B2016] uppercase tracking-wider mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#2F5233] animate-pulse"></span>
          <span className="font-mono-price text-[#2F5233] font-bold">APMC e-NAM</span>
          <span className="text-[#D9A441]">•</span>
          <span>{t.portalBadge}</span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2B2016] mb-3 tracking-tight font-heading leading-tight">
          {t.roleSelectionTitle}
        </h2>
        <p className="text-base md:text-lg text-[#6E5D4F] max-w-2xl mx-auto font-medium leading-relaxed font-body">
          {t.roleSelectionSubtitle}
        </p>
      </div>

      {/* Mandi Gate Entry Pass / Ticket-Stub Role Cards */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 px-2 md:px-0">
        
        {/* 1. Farmer Gate Pass (Harvest Green: #2F5233) */}
        <div className="group relative flex flex-col justify-between bg-[#FFFDF8] border-2 border-[#2F5233] rounded-t-3xl rounded-br-3xl rounded-bl-sm shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          {/* Top color bar */}
          <div className="h-2.5 bg-[#2F5233] w-full" />
          
          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              {/* Ticket Top Row: Serial & Mandi Stamp */}
              <div className="flex justify-between items-start gap-3 mb-5">
                <div>
                  <span className="text-[11px] font-mono-price font-bold text-[#2F5233] uppercase tracking-widest block">
                    GATE PASS #FMR-2026
                  </span>
                  <span className="text-xs font-bold text-[#6E5D4F] font-body">
                    {t.producerBadge} • मंडी प्रवेश
                  </span>
                </div>

                {/* Circular Mandi Stamp Badge */}
                <div className="mandi-stamp mandi-stamp-green w-14 h-14 shrink-0 p-1">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    eco
                  </span>
                  <span className="text-[8px] font-mono-price font-black leading-none mt-0.5">KRUSHI</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#2F5233] font-heading mb-2.5 tracking-tight flex items-center gap-2">
                <span>{t.farmer}</span>
              </h3>
              <p className="text-sm text-[#2B2016] font-medium leading-relaxed mb-5 font-body">
                {t.farmerDesc}
              </p>

              {/* Key Features Pill list */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#2F5233]">check_circle</span>
                  <span>{t.marketPrices} & {t.aiForecasting}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#2F5233]">check_circle</span>
                  <span>{t.netEarningsCalculator}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#2F5233]">check_circle</span>
                  <span>{t.buyerOffers} & {t.directBankDbt}</span>
                </div>
              </div>
            </div>

            {/* Perforated Tear Line */}
            <div className="perforated-h my-4 -mx-6 sm:-mx-7" />

            {/* Action CTA Button */}
            <button
              onClick={() => onSelectRole('farmer')}
              className="w-full min-h-[52px] py-3.5 px-6 bg-[#2F5233] hover:bg-[#254228] text-white font-heading font-bold text-base rounded-2xl flex items-center justify-between shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{t.continueAsFarmer}</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 2. Trader / Merchant Gate Pass (Terracotta Clay: #8C4A2F) */}
        <div className="group relative flex flex-col justify-between bg-[#FFFDF8] border-2 border-[#8C4A2F] rounded-t-3xl rounded-br-3xl rounded-bl-sm shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          {/* Top color bar */}
          <div className="h-2.5 bg-[#8C4A2F] w-full" />

          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              {/* Ticket Top Row: Serial & Mandi Stamp */}
              <div className="flex justify-between items-start gap-3 mb-5">
                <div>
                  <span className="text-[11px] font-mono-price font-bold text-[#8C4A2F] uppercase tracking-widest block">
                    LICENSE PASS #TRD-8841
                  </span>
                  <span className="text-xs font-bold text-[#6E5D4F] font-body">
                    {t.procurementBadge} • व्यापारी कक्ष
                  </span>
                </div>

                {/* Circular Mandi Stamp Badge */}
                <div className="mandi-stamp mandi-stamp-terracotta w-14 h-14 shrink-0 p-1">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    balance
                  </span>
                  <span className="text-[8px] font-mono-price font-black leading-none mt-0.5">TRADER</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#8C4A2F] font-heading mb-2.5 tracking-tight flex items-center gap-2">
                <span>{t.merchant}</span>
              </h3>
              <p className="text-sm text-[#2B2016] font-medium leading-relaxed mb-5 font-body">
                {t.merchantDesc}
              </p>

              {/* Key Features Pill list */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#8C4A2F]">check_circle</span>
                  <span>{t.directFarmerLots}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#8C4A2F]">check_circle</span>
                  <span>{t.postRequirement}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#8C4A2F]">check_circle</span>
                  <span>{t.placePurchaseBid}</span>
                </div>
              </div>
            </div>

            {/* Perforated Tear Line */}
            <div className="perforated-h my-4 -mx-6 sm:-mx-7" />

            {/* Action CTA Button */}
            <button
              onClick={() => onSelectRole('merchant')}
              className="w-full min-h-[52px] py-3.5 px-6 bg-[#8C4A2F] hover:bg-[#743c25] text-white font-heading font-bold text-base rounded-2xl flex items-center justify-between shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{t.continueAsMerchant}</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 3. Government / Oversight Gate Pass (Mandi Teal: #1F6F78) */}
        <div className="group relative flex flex-col justify-between bg-[#FFFDF8] border-2 border-[#1F6F78] rounded-t-3xl rounded-br-3xl rounded-bl-sm shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
          {/* Top color bar */}
          <div className="h-2.5 bg-[#1F6F78] w-full" />

          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              {/* Ticket Top Row: Serial & Mandi Stamp */}
              <div className="flex justify-between items-start gap-3 mb-5">
                <div>
                  <span className="text-[11px] font-mono-price font-bold text-[#1F6F78] uppercase tracking-widest block">
                    OFFICIAL ID #GOV-5109
                  </span>
                  <span className="text-xs font-bold text-[#6E5D4F] font-body">
                    {t.surveillanceBadge} • शासन नियंत्रण
                  </span>
                </div>

                {/* Circular Mandi Stamp Badge */}
                <div className="mandi-stamp mandi-stamp-teal w-14 h-14 shrink-0 p-1">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shield_person
                  </span>
                  <span className="text-[8px] font-mono-price font-black leading-none mt-0.5">BHARAT</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#1F6F78] font-heading mb-2.5 tracking-tight flex items-center gap-2">
                <span>{t.government}</span>
              </h3>
              <p className="text-sm text-[#2B2016] font-medium leading-relaxed mb-5 font-body">
                {t.governmentDesc}
              </p>

              {/* Key Features Pill list */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#1F6F78]">check_circle</span>
                  <span>{t.regionalPriceHotspots}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#1F6F78]">check_circle</span>
                  <span>{t.mspCompliance} & {t.bufferStocks}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2016]">
                  <span className="material-symbols-outlined text-base text-[#1F6F78]">check_circle</span>
                  <span>{t.aiDemandPrediction}</span>
                </div>
              </div>
            </div>

            {/* Perforated Tear Line */}
            <div className="perforated-h my-4 -mx-6 sm:-mx-7" />

            {/* Action CTA Button */}
            <button
              onClick={() => onSelectRole('government')}
              className="w-full min-h-[52px] py-3.5 px-6 bg-[#1F6F78] hover:bg-[#185860] text-white font-heading font-bold text-base rounded-2xl flex items-center justify-between shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{t.continueAsGovernment}</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>

      {/* Mandi Network Trust Badges */}
      <div className="mt-10 relative z-10 flex flex-wrap items-center justify-center gap-3">
        <div className="bg-[#FFFDF8] border-2 border-[#E2D7C1] px-4 py-2 rounded-full flex items-center gap-2 shadow-xs text-xs font-bold text-[#2B2016]">
          <span className="material-symbols-outlined text-[#2F5233] text-base">check_circle</span>
          <span>{t.apmcLinked}</span>
        </div>
        <div className="bg-[#FFFDF8] border-2 border-[#E2D7C1] px-4 py-2 rounded-full flex items-center gap-2 shadow-xs text-xs font-bold text-[#2B2016]">
          <span className="material-symbols-outlined text-[#D9A441] text-base">psychology</span>
          <span>{t.krushiAiActive}</span>
        </div>
        <div className="bg-[#FFFDF8] border-2 border-[#E2D7C1] px-4 py-2 rounded-full flex items-center gap-2 shadow-xs text-xs font-bold text-[#2B2016]">
          <span className="material-symbols-outlined text-[#1F6F78] text-base">verified</span>
          <span>{t.multiStateSurveillance}</span>
        </div>
      </div>
    </main>
  );
};
