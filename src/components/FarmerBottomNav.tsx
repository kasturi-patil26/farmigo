import React from 'react';
import { FarmerTab } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FarmerBottomNavProps {
  activeTab: FarmerTab;
  onTabChange: (tab: FarmerTab) => void;
}

export const FarmerBottomNav: React.FC<FarmerBottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useLanguage();

  const isSellFamily =
    activeTab === 'sell' ||
    activeTab === 'sell-recommendations' ||
    activeTab === 'buyer-offers';

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1.5 py-2 bg-[#FFFDF8] border-t-2 border-[#E2D7C1] shadow-lg pb-safe">
      <button
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer min-w-[54px] min-h-[48px] ${
          activeTab === 'home'
            ? 'text-[#2F5233] font-bold'
            : 'text-[#6E5D4F] hover:text-[#2B2016]'
        }`}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'home' ? 'bg-[#2F5233]/15 text-[#2F5233]' : ''}`}>
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
        </div>
        <span className="text-[11px] font-heading font-semibold tracking-tight mt-0.5">{t.home}</span>
      </button>

      <button
        onClick={() => onTabChange('markets')}
        className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer min-w-[54px] min-h-[48px] ${
          activeTab === 'markets'
            ? 'text-[#2F5233] font-bold'
            : 'text-[#6E5D4F] hover:text-[#2B2016]'
        }`}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'markets' ? 'bg-[#2F5233]/15 text-[#2F5233]' : ''}`}>
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: activeTab === 'markets' ? "'FILL' 1" : "'FILL' 0" }}
          >
            storefront
          </span>
        </div>
        <span className="text-[11px] font-heading font-semibold tracking-tight mt-0.5">{t.marketPrices}</span>
      </button>

      <button
        onClick={() => onTabChange('sell')}
        className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer min-w-[54px] min-h-[48px] ${
          isSellFamily
            ? 'text-[#2F5233] font-bold'
            : 'text-[#6E5D4F] hover:text-[#2B2016]'
        }`}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSellFamily ? 'bg-[#2F5233]/15 text-[#2F5233]' : ''}`}>
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: isSellFamily ? "'FILL' 1" : "'FILL' 0" }}
          >
            add_circle
          </span>
        </div>
        <span className="text-[11px] font-heading font-semibold tracking-tight mt-0.5">{t.addProduce}</span>
      </button>

      <button
        onClick={() => onTabChange('farm-store')}
        className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer min-w-[54px] min-h-[48px] ${
          activeTab === 'farm-store'
            ? 'text-[#2F5233] font-bold'
            : 'text-[#6E5D4F] hover:text-[#2B2016]'
        }`}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'farm-store' ? 'bg-[#2F5233]/15 text-[#2F5233]' : ''}`}>
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: activeTab === 'farm-store' ? "'FILL' 1" : "'FILL' 0" }}
          >
            shopping_bag
          </span>
        </div>
        <span className="text-[11px] font-heading font-semibold tracking-tight mt-0.5">{t.farmStore}</span>
      </button>

      <button
        onClick={() => onTabChange('sales-tracking')}
        className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer min-w-[54px] min-h-[48px] ${
          activeTab === 'sales-tracking'
            ? 'text-[#2F5233] font-bold'
            : 'text-[#6E5D4F] hover:text-[#2B2016]'
        }`}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'sales-tracking' ? 'bg-[#2F5233]/15 text-[#2F5233]' : ''}`}>
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: activeTab === 'sales-tracking' ? "'FILL' 1" : "'FILL' 0" }}
          >
            receipt_long
          </span>
        </div>
        <span className="text-[11px] font-heading font-semibold tracking-tight mt-0.5">{t.salesTracking}</span>
      </button>

      <button
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer min-w-[54px] min-h-[48px] ${
          activeTab === 'profile'
            ? 'text-[#2F5233] font-bold'
            : 'text-[#6E5D4F] hover:text-[#2B2016]'
        }`}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'profile' ? 'bg-[#2F5233]/15 text-[#2F5233]' : ''}`}>
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
        </div>
        <span className="text-[11px] font-heading font-semibold tracking-tight mt-0.5">{t.profile}</span>
      </button>
    </nav>
  );
};
