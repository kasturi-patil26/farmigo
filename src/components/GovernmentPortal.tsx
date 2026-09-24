import React, { useState } from 'react';
import { GovernmentTab, HotspotPoint } from '../types';
import { ASSETS, REGIONAL_HOTSPOTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface GovernmentPortalProps {
  onSwitchRole: () => void;
  onOpenAIInsights: () => void;
}

export const GovernmentPortal: React.FC<GovernmentPortalProps> = ({
  onSwitchRole,
  onOpenAIInsights,
}) => {
  const { t } = useLanguage();
  const [activeNav, setActiveNav] = useState<GovernmentTab>('dashboard');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotPoint | null>(REGIONAL_HOTSPOTS[0]);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Create a downloaded mock CSV / report
      const blob = new Blob([
        `FarmiGo Intelligence Report - Department of Agriculture Region 04
Date: ${new Date().toLocaleDateString()}
Total Active Farmers: 1.24M (+5.2%)
Trade Volume: 45.8K Metric Tons
Price Trend Index: 108.4

Regional Hotspots:
- Punjab/Haryana: Wheat (+12%)
- Maharashtra Central: Rice (-2%)
- Gujarat Corridor: Groundnut (+8%)
- Telangana/Andhra: Tur Dal (+15%)

AI Demand Forecast:
- Pulses: High (85% Demand Surge)
- Oilseeds: Medium (60%)
- Cereals: Stable (40%)
`
      ], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `FarmiGo_Agri_Intelligence_Report_${new Date().toISOString().slice(0, 10)}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50 text-slate-900 animate-fade-in">
      {/* Navigation Drawer (Desktop) */}
      <nav className="hidden lg:flex flex-col py-8 bg-white border-r-2 border-slate-200 w-72 shrink-0 justify-between">
        <div>
          {/* Admin user profile block */}
          <div className="px-6 mb-8 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-indigo-200 shrink-0 shadow-xs">
              <img
                src={ASSETS.officialAvatar}
                alt="Government Official"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-base font-black text-slate-900 tracking-tight">
                {t.government}
              </div>
              <div className="text-xs font-bold text-indigo-600">
                Dept. of Agriculture
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Region 04 (Western Zone)</div>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-2 px-4">
            {[
              { id: 'dashboard', label: t.surveillanceTitle, icon: 'dashboard' },
              { id: 'markets', label: t.marketPrices, icon: 'analytics' },
              { id: 'farmers', label: 'Farmers Registry', icon: 'group' },
              { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
              { id: 'alerts', label: 'Alerts', icon: 'notifications_active' },
              { id: 'reports', label: 'Reports', icon: 'description' },
              { id: 'profile', label: t.profile, icon: 'account_circle' },
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveNav(item.id as GovernmentTab)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full font-bold text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-4 pt-4 border-t-2 border-slate-100">
          <button
            onClick={onSwitchRole}
            className="w-full py-3 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-indigo-600">swap_horiz</span>
            {t.switchRole}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
                {t.nationalSurveillance} • {t.nationalFeed}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              {t.surveillanceTitle}
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">
              {t.surveillanceSubtitle}
            </p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-white text-slate-700 hover:bg-slate-50 px-4 py-3 rounded-full font-bold text-xs border-2 border-slate-200 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-indigo-600">download</span>
              {isExporting ? 'Exporting...' : t.exportReport}
            </button>
            <button
              onClick={onOpenAIInsights}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full font-bold text-xs transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              {t.generateInsights}
            </button>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Regional Price Hotspots Map Card */}
          <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-xs flex flex-col overflow-hidden relative">
            <div className="p-6 md:p-8 border-b-2 border-slate-100 flex justify-between items-center bg-slate-50/50 z-10">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  {t.regionalPriceHotspots}
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Interactive real-time disparity & volatility monitor
                </span>
              </div>
              <span className="material-symbols-outlined text-indigo-600 text-2xl">map</span>
            </div>

            <div className="relative bg-slate-100 min-h-[380px] md:min-h-[420px] overflow-hidden flex items-center justify-center">
              {/* Map background */}
              <img
                src={ASSETS.indiaMap}
                alt="India Agricultural Hotspots Map"
                className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-85"
              />

              {/* Hotspot Pins */}
              {REGIONAL_HOTSPOTS.map((hotspot) => {
                const isSelected = selectedHotspot?.id === hotspot.id;
                return (
                  <div
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className="absolute z-20 flex flex-col items-center cursor-pointer group transition-transform hover:scale-110"
                    style={{ top: hotspot.top, left: hotspot.left }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-white shadow-md transition-all ${
                        hotspot.isPositive ? 'bg-red-600 animate-pulse' : 'bg-emerald-600'
                      } ${isSelected ? 'ring-4 ring-indigo-400 scale-125' : ''}`}
                    />
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm mt-1 whitespace-nowrap border-2 transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-white text-slate-900 border-slate-200'
                      }`}
                    >
                      {hotspot.crop} {hotspot.change}
                    </span>
                  </div>
                );
              })}

              {/* Selected Hotspot Detail Overlay */}
              {selectedHotspot && (
                <div className="absolute bottom-4 left-4 right-4 z-30 bg-white/95 backdrop-blur-md p-5 rounded-3xl border-2 border-slate-200 shadow-xl flex justify-between items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-900">
                        {selectedHotspot.name}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          selectedHotspot.isPositive
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {selectedHotspot.crop} {selectedHotspot.change}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {selectedHotspot.details}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="text-slate-400 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 3 KPI Cards Column */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col justify-between gap-4">
            {/* KPI 1: Active Farmers */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs flex flex-col justify-between h-[136px]">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Active Farmers
                </h3>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  <span className="material-symbols-outlined text-lg">agriculture</span>
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">1.24M</div>
                <div className="text-xs font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +5.2% from last month
                </div>
              </div>
            </div>

            {/* KPI 2: Trade Volume */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs flex flex-col justify-between h-[136px]">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Trade Volume
                </h3>
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold">
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">45.8K T</div>
                <div className="text-xs font-bold text-red-600 mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                  -1.1% from seasonal average
                </div>
              </div>
            </div>

            {/* KPI 3: Avg Price Trend Index */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs flex flex-col justify-between h-[136px]">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Avg. Price Trend Index
                </h3>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  <span className="material-symbols-outlined text-lg">query_stats</span>
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">108.4</div>
                <div className="text-xs font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +2.4% stabilizing
                </div>
              </div>
            </div>
          </div>

          {/* Supply Forecast Chart Card */}
          <div className="col-span-1 md:col-span-6 bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{t.supplyForecast}</h3>
                <span className="text-xs text-slate-500 font-medium">Regional APMC arrivals projection</span>
              </div>
              <button
                onClick={() => alert('Detailed Kharif seasonal supply models exported to workspace.')}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>

            {/* Visual Bar Chart */}
            <div className="flex items-end justify-between h-48 space-x-3 border-b-2 border-slate-100 pb-2">
              {[
                { month: 'Oct', height: '40%', isPeak: false, color: 'bg-slate-200' },
                { month: 'Nov', height: '60%', isPeak: false, color: 'bg-slate-200' },
                { month: 'Dec', height: '80%', isPeak: false, color: 'bg-indigo-600' },
                { month: 'Jan', height: '50%', isPeak: false, color: 'bg-slate-200' },
                { month: 'Feb', height: '92%', isPeak: true, color: 'bg-indigo-600' },
                { month: 'Mar', height: '75%', isPeak: false, color: 'bg-indigo-600' },
              ].map((bar) => (
                <div
                  key={bar.month}
                  className="w-full bg-slate-100 flex flex-col justify-end group rounded-t-2xl hover:bg-slate-200 transition-colors relative"
                >
                  {bar.isPeak && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-indigo-600 px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                      Peak
                    </div>
                  )}
                  <div
                    className={`${bar.color} w-full rounded-t-2xl transition-all duration-300`}
                    style={{ height: bar.height }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-3 text-xs font-bold text-slate-500">
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span className="text-indigo-600 font-black">Feb</span>
              <span>Mar</span>
            </div>
          </div>

          {/* AI Demand Prediction Card */}
          <div className="col-span-1 md:col-span-6 bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-indigo-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center tracking-tight">
                  <span className="material-symbols-outlined text-indigo-600 mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                  {t.aiDemandPrediction}
                </h3>
                <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                  Neural Model
                </span>
              </div>

              <p className="text-xs md:text-sm text-slate-600 mb-6 relative z-10 border-l-4 border-indigo-600 pl-3.5 leading-relaxed font-medium">
                Based on current monsoon patterns and early harvest data, algorithmic models predict a{' '}
                <strong className="text-slate-900 font-bold">15% surge in demand for pulses</strong> in the southern region by mid-November. Recommended buffer stock release prep.
              </p>

              {/* Progress bars */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 w-16">Pulses</span>
                  <div className="flex-1 mx-4 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[85%] rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-indigo-600 w-12 text-right">
                    High
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 w-16">Oilseeds</span>
                  <div className="flex-1 mx-4 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-700 w-[60%] rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 w-12 text-right">
                    Medium
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 w-16">Cereals</span>
                  <div className="flex-1 mx-4 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 w-[40%] rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 w-12 text-right">
                    Stable
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Source: National Buffer Stock System</span>
              <button
                onClick={onOpenAIInsights}
                className="text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                Deep Advisory →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
