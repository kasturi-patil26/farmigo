import React, { useState } from 'react';
import { ProduceItem, MerchantTab } from '../types';
import { PRODUCE_FEED } from '../data/mockData';
import { INITIAL_FPOS } from '../data/fpoData';
import { useLanguage } from '../context/LanguageContext';

interface MerchantDashboardProps {
  onOpenPostRequirement: () => void;
  onPlaceBid: (item: ProduceItem) => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  onOpenPostRequirement,
  onPlaceBid,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<MerchantTab>('home');
  const [items, setItems] = useState<ProduceItem[]>(PRODUCE_FEED);
  const [filter, setFilter] = useState<'All' | 'Rabi' | 'Kharif'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === 'All' || item.season === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cropType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // FPO pooling context: for any item tagged with an fpoId, find how many
  // OTHER active items share the same FPO + crop + grade, so buyers can see
  // the real combined volume available — without changing per-item bidding.
  const getPoolInfo = (item: ProduceItem) => {
    if (!item.fpoId) return null;
    const poolMembers = items.filter(
      (i) => i.fpoId === item.fpoId && i.cropType === item.cropType && i.grade === item.grade
    );
    if (poolMembers.length < 2) return null;
    const totalTons = poolMembers.reduce((sum, i) => sum + i.quantityTons, 0);
    const fpo = INITIAL_FPOS.find((f) => f.id === item.fpoId);
    return { farmerCount: poolMembers.length, totalTons, fpoName: fpo?.name ?? 'FPO Group' };
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6 md:gap-8 pb-24 md:pb-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
              {t.licensedTrader} • APMC-LIC-PUN-8832
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            {t.merchantDashboardTitle}
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium mt-1">
            {t.merchantDashboardSubtitle}
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={onOpenPostRequirement}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_box
            </span>
            {t.postRequirement}
          </button>
        </div>
      </div>

      {/* Market Demand Overview (Bento Grid Style) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
            <span className="material-symbols-outlined text-indigo-600">trending_up</span>
            {t.commodityDemandVelocity}
          </h2>
          <span className="text-xs font-bold text-slate-400">Aggregated from 14 APMCs</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Onions */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                <span className="material-symbols-outlined text-xl">trending_up</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                +12.4%
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Onions (Red)</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 mt-0.5">High</p>
              <span className="text-[11px] text-slate-500 font-medium">Nashik / Pune APMC</span>
            </div>
          </div>

          {/* Grapes */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold">
                <span className="material-symbols-outlined text-xl">trending_flat</span>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                Steady
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Green Grapes</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 mt-0.5">Medium</p>
              <span className="text-[11px] text-slate-500 font-medium">Sangli / Tasgaon Hub</span>
            </div>
          </div>

          {/* Wheat */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                <span className="material-symbols-outlined text-xl">trending_up</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                +8.4%
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lokwan Wheat</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 mt-0.5">High</p>
              <span className="text-[11px] text-slate-500 font-medium">Central MP & MH</span>
            </div>
          </div>

          {/* Cotton */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                <span className="material-symbols-outlined text-xl">trending_up</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                +4.2%
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Raw Cotton</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 mt-0.5">Strong</p>
              <span className="text-[11px] text-slate-500 font-medium">Vidarbha & Gujarat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Produce Near You Feed */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-2 border-slate-200 rounded-[2rem] p-6 shadow-xs">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {t.directFarmerLots}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Verified lots available for immediate gate pickup or APMC delivery
            </p>
          </div>

          {/* Search bar & filter pills */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                search
              </span>
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-xs bg-slate-50 border-2 border-slate-200 rounded-full focus:outline-none focus:border-indigo-600 font-medium text-slate-800"
              />
            </div>

            <div className="flex gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
              {(['All', 'Rabi', 'Kharif'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    filter === s
                      ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {s === 'All' ? t.all : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Cards (Bento Grid Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const poolInfo = getPoolInfo(item);
            return (
            <div
              key={item.id}
              className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border-2 border-slate-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Grade {item.grade}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base text-slate-900">
                        {item.title}
                      </h3>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
                        {item.season}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm text-indigo-600">location_on</span>
                      {item.location}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      Farmer: {item.farmerName} • Harvested {item.harvestDate}
                    </p>
                    {poolInfo && (
                      <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[12px]">groups</span>
                        {t.fpoPooledLotBadge}: {poolInfo.totalTons} Tons across {poolInfo.farmerCount} {t.fpoPooledFrom}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-end mt-3 pt-3 border-t-2 border-slate-100">
                    <div>
                      <span className="text-[11px] text-slate-400 font-bold uppercase">{t.quantity}</span>
                      <p className="text-sm font-black text-slate-900">{item.quantityTons} Tons</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-indigo-600">
                        ₹{item.pricePerQuintal.toLocaleString('en-IN')}/qtl
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t-2 border-slate-100 flex gap-2">
                <button
                  onClick={() => onPlaceBid(item)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">request_quote</span>
                  {t.placePurchaseBid}
                </button>
                <button
                  onClick={() => alert(`Connecting with registered farmer ${item.farmerName} (Verified Mandi Pass active)`)}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full border-2 border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                  title="Contact Farmer directly"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
