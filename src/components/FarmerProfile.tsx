import React from 'react';
import { ASSETS } from '../data/mockData';
import { FarmerTab, UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FarmerProfileProps {
  onNavigate: (tab: FarmerTab) => void;
  onSwitchRole: (role: UserRole) => void;
}

export const FarmerProfile: React.FC<FarmerProfileProps> = ({
  onNavigate,
  onSwitchRole,
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6 mb-20 md:mb-8 animate-fade-in">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={ASSETS.farmerAvatar}
          alt="Ramesh Patil"
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-sm shrink-0"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Ramesh S. Patil</h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              {t.kycVerified}
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
            Haveli Taluka, Pune District, Maharashtra • {t.kisanId}: <strong className="text-slate-700 font-mono font-bold">KRU-MH-88421</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            <span className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full font-bold text-slate-700">
              🌱 8.5 {t.acresLabel} {t.cultivatedLand}
            </span>
            <span className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full font-bold text-slate-700">
              🌾 Wheat & Soyabean Specialization
            </span>
            <span className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full font-bold">
              ⭐ 4.9 {t.sellerScore}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Land and Bank Details */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">account_balance</span>
              {t.bankAccountTitle}
            </h2>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs text-slate-500 font-medium">{t.bankName}</span>
                <span className="font-bold text-xs text-slate-800">State Bank of India</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs text-slate-500 font-medium">{t.accountNumber}</span>
                <span className="font-mono font-bold text-xs text-slate-900">•••• •••• 9104</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs text-slate-500 font-medium">{t.ifscCode}</span>
                <span className="font-mono font-bold text-xs text-slate-700">SBIN0004128</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-slate-500 font-medium">{t.directPayoutEnabled}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                  {t.verified}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation / Settings */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">tune</span>
              {t.portalShortcuts}
            </h2>
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('buyer-offers')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-colors text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-indigo-600 text-lg">local_offer</span>
                  {t.buyerOffers} (3)
                </span>
                <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
              </button>

              <button
                onClick={() => onNavigate('markets')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-colors text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-indigo-600 text-lg">monitoring</span>
                  {t.marketPrices}
                </span>
                <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 mt-4">
            <button
              onClick={() => onSwitchRole('role-selection')}
              className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-indigo-600 font-bold text-xs rounded-full border-2 border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">swap_horiz</span>
              {t.switchRole}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
