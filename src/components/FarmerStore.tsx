import React, { useState } from 'react';
import { FarmerTab, FarmStoreItem } from '../types';
import { FARM_STORE_ITEMS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface FarmerStoreProps {
  onNavigate: (tab: FarmerTab) => void;
}

export const FarmerStore: React.FC<FarmerStoreProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<'all' | 'seeds' | 'fertilizer' | 'equipment' | 'houseware'>('all');
  const [selectedItem, setSelectedItem] = useState<FarmStoreItem | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const filteredItems = category === 'all'
    ? FARM_STORE_ITEMS
    : FARM_STORE_ITEMS.filter((item) => item.category === category);

  const handleOrder = (item: FarmStoreItem) => {
    setSelectedItem(item);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setOrderSuccess(`Order placed for ${selectedItem.title}! Delivery token #GP-ORD-9921 sent via SMS.`);
    setTimeout(() => {
      setSelectedItem(null);
      setOrderSuccess(null);
    }, 2200);
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-emerald-50 text-emerald-700 font-mono font-bold text-xs rounded-full border border-emerald-200">
              DBT Subsidy Direct-Link
            </span>
            <span className="px-3.5 py-1 bg-indigo-50 text-indigo-700 font-mono font-bold text-xs rounded-full border border-indigo-200">
              Gram Panchayat Delivery
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            {t.farmStoreTitle}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium">
            {t.farmStoreSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t.back}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          { id: 'all', label: t.all, icon: 'apps' },
          { id: 'seeds', label: t.certifiedSeeds, icon: 'eco' },
          { id: 'fertilizer', label: t.bioFertilizers, icon: 'science' },
          { id: 'equipment', label: t.equipmentSubsidies, icon: 'solar_power' },
          { id: 'houseware', label: t.houseware, icon: 'home_repair_service' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategory(tab.id as any)}
            className={`px-5 py-3 rounded-full font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              category === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 border-2 border-indigo-600'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Product Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[2.5rem] border-2 border-slate-200 p-6 md:p-8 flex flex-col justify-between shadow-xs hover:border-indigo-300 hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-mono font-bold text-xs rounded-full border border-emerald-200">
                  {item.subsidyPercentage}% {t.govSubsidyDiscount}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  ★ {item.rating} • {item.brand}
                </span>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 overflow-hidden shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 mt-1 block">
                    Unit: {item.unit} • Free Delivery in {item.deliveryDays} Days
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t-2 border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {t.subsidizedPrice}
                </span>
                <div className="flex items-baseline gap-2">
                  <strong className="text-2xl font-black text-slate-900">
                    ₹{item.subsidyPrice.toLocaleString('en-IN')}
                  </strong>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleOrder(item)}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-xs shadow-lg shadow-indigo-100 transition-all active:scale-95 cursor-pointer"
              >
                {t.orderNow}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Gram Panchayat Notice */}
      <div className="bg-indigo-50/80 border-2 border-indigo-100 rounded-[2rem] p-5 flex items-center gap-4 text-indigo-950 text-xs font-medium">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-xl">local_shipping</span>
        </div>
        <p>{t.freeDeliveryToPanchayat}</p>
      </div>

      {/* Order Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl border-2 border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">shopping_cart</span>
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">{t.confirmSubsidizedOrder}</h3>
                  <p className="text-xs text-slate-300 font-medium">DBT Direct Benefit Transfer</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {orderSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h4 className="font-bold text-base text-slate-900">Order Confirmed!</h4>
                <p className="text-xs text-slate-600">{orderSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="p-6 space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 text-xs space-y-1.5 text-slate-600">
                  <p><strong className="text-slate-900">{t.commodity}:</strong> {selectedItem.title}</p>
                  <p><strong className="text-slate-900">{t.subsidizedPrice}:</strong> ₹{selectedItem.subsidyPrice}</p>
                  <p><strong className="text-slate-900">Destination:</strong> Gram Panchayat Office, Dindori (Nashik)</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div className="pt-3 border-t-2 border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-2 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full shadow-lg shadow-indigo-100 transition-all cursor-pointer"
                  >
                    {t.confirmOrder}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
