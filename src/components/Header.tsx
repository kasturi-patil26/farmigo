import React from 'react';
import { UserRole, FarmerTab, AuthUser } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentRole: UserRole;
  currentUser: AuthUser | null;
  onSelectRole: (role: UserRole) => void;
  onLogout: () => void;
  onOpenLanguageModal: () => void;
  farmerTab?: FarmerTab;
  onFarmerTabChange?: (tab: FarmerTab) => void;
  onOpenAskAI?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  currentUser,
  onSelectRole,
  onLogout,
  onOpenLanguageModal,
  farmerTab,
  onFarmerTabChange,
  onOpenAskAI,
}) => {
  const { language, t } = useLanguage();

  const getLanguageLabel = () => {
    switch (language) {
      case 'hi':
        return 'हिंदी';
      case 'mr':
        return 'मराठी';
      default:
        return 'English';
    }
  };

  const getRoleHeaderDetails = () => {
    switch (currentRole) {
      case 'farmer':
        return {
          label: t.farmer,
          badgeColor: 'bg-[#2F5233]/10 text-[#2F5233] border-[#2F5233]/30',
          roleEmoji: '🌾',
          themeColor: '#2F5233',
        };
      case 'merchant':
        return {
          label: t.merchant,
          badgeColor: 'bg-[#8C4A2F]/10 text-[#8C4A2F] border-[#8C4A2F]/30',
          roleEmoji: '🏪',
          themeColor: '#8C4A2F',
        };
      case 'government':
        return {
          label: t.government,
          badgeColor: 'bg-[#1F6F78]/10 text-[#1F6F78] border-[#1F6F78]/30',
          roleEmoji: '🏛️',
          themeColor: '#1F6F78',
        };
      default:
        return {
          label: t.appTagline,
          badgeColor: 'bg-[#D9A441]/20 text-[#2B2016] border-[#D9A441]/40',
          roleEmoji: '🌾',
          themeColor: '#2F5233',
        };
    }
  };

  const roleDetails = getRoleHeaderDetails();

  return (
    <header className="w-full flex justify-between items-center px-4 md:px-8 h-20 bg-[#FFFDF8] border-b-2 border-[#E2D7C1] sticky top-0 z-40 shadow-xs">
      {/* Brand logo & role badge */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onSelectRole('role-selection')}
          className="flex items-center gap-3 text-left group hover:opacity-95 transition-opacity cursor-pointer"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0 border-2"
            style={{
              backgroundColor: roleDetails.themeColor,
              borderColor: roleDetails.themeColor,
            }}
          >
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-xl object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                agriculture
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#2B2016] tracking-tight font-heading leading-none">
                {t.appName}
              </h1>
            </div>
            <span className="text-[11px] font-bold text-[#6E5D4F] font-body tracking-wider uppercase mt-1 flex items-center gap-1.5">
              <span>{roleDetails.roleEmoji}</span>
              <span>{roleDetails.label}</span>
            </span>
          </div>
        </button>
      </div>

      {/* Desktop Farmer Tab Navigation */}
      {currentRole === 'farmer' && onFarmerTabChange && (
        <div className="hidden lg:flex items-center gap-1 bg-[#F7F1E3] p-1.5 rounded-full border-2 border-[#E2D7C1]">
          {[
            { id: 'home', label: t.home, icon: 'home' },
            { id: 'markets', label: t.marketPrices, icon: 'storefront' },
            { id: 'sell', label: t.addProduce, icon: 'add_circle' },
            { id: 'storage', label: t.findStorage, icon: 'warehouse' },
            { id: 'sell-recommendations', label: t.bestPlaceToSell, icon: 'alt_route' },
            { id: 'buyer-offers', label: t.buyerOffers, icon: 'handshake' },
            { id: 'fpo', label: t.fpoNavLabel, icon: 'groups' },
            { id: 'farm-store', label: t.farmStore, icon: 'shopping_bag' },
            { id: 'sales-tracking', label: t.salesTracking, icon: 'receipt_long' },
            { id: 'profile', label: t.profile, icon: 'person' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFarmerTabChange(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-body transition-all cursor-pointer flex items-center gap-1.5 ${
                farmerTab === tab.id
                  ? 'bg-[#2F5233] text-white shadow-xs'
                  : 'text-[#6E5D4F] hover:text-[#2B2016] hover:bg-[#FFFDF8]'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Actions: Role switcher, Language, AI / Help */}
      <div className="flex items-center gap-2.5">
        {currentRole !== 'role-selection' && (
          <button
            onClick={() => onSelectRole('role-selection')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#2B2016] bg-[#FFFDF8] border-2 border-[#E2D7C1] hover:border-[#2F5233] hover:bg-[#F7F1E3] h-10 px-3.5 rounded-full shadow-xs transition-colors cursor-pointer"
            title="Switch portal role"
          >
            <span className="material-symbols-outlined text-base text-[#2F5233]">swap_horiz</span>
            <span className="font-heading">{t.switchRole}</span>
          </button>
        )}

        <button
          onClick={onOpenLanguageModal}
          className="h-10 px-3.5 bg-[#FFFDF8] border-2 border-[#E2D7C1] hover:border-[#D9A441] rounded-full font-bold text-xs text-[#2B2016] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg text-[#D9A441]" style={{ fontVariationSettings: "'FILL' 1" }}>
            translate
          </span>
          <span className="font-heading">{getLanguageLabel()}</span>
        </button>

        {onOpenAskAI && currentRole !== 'role-selection' && (
          <button
            onClick={onOpenAskAI}
            className="w-10 h-10 rounded-full bg-[#FFFDF8] border-2 border-[#2F5233] hover:bg-[#2F5233] text-[#2F5233] hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
            title="Ask FarmiGo AI Agronomist"
          >
            <span className="material-symbols-outlined text-xl">psychology</span>
          </button>
        )}

        {currentUser && (
          <button
            onClick={onLogout}
            className="w-10 h-10 rounded-full bg-[#FFFDF8] hover:bg-[#8C4A2F]/10 hover:text-[#8C4A2F] text-[#6E5D4F] flex items-center justify-center transition-colors cursor-pointer border-2 border-[#E2D7C1]"
            title={t.logout}
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        )}
      </div>
    </header>
  );
};
