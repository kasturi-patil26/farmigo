import React, { useState, useMemo } from 'react';
import {
  Warehouse,
  Snowflake,
  Package,
  Building2,
  MapPin,
  ShieldCheck,
  Phone,
  CheckCircle2,
  Filter,
  Calculator,
  X,
  TrendingUp,
  Info,
  Calendar,
} from 'lucide-react';
import { WarehouseRecord, WarehouseType, FarmerTab } from '../types';
import { WAREHOUSE_DIRECTORY } from '../data/warehouseData';
import { calculateHaversineDistance, getCoordinatesForLocation } from '../utils/distance';
import { calculateStorageVsSellNow, StorageDecisionResult } from '../utils/storageDecision';
import { useLanguage } from '../context/LanguageContext';
import { DemoDataBadge } from './DemoDataBadge';

export interface WarehouseFinderProps {
  farmerLocation?: string;
  farmerCoordinates?: { lat: number; lon: number };
  onSelectWarehouse?: (warehouse: WarehouseRecord) => void;
  selectedWarehouseId?: string;
  isModal?: boolean;
  onClose?: () => void;
  onNavigate?: (tab: FarmerTab) => void;
  initialCrop?: string;
  initialQuantity?: number;
  initialCurrentPrice?: number | string;
  initialForecastRange?: string;
}

export const WarehouseFinder: React.FC<WarehouseFinderProps> = ({
  farmerLocation = 'Nashik, MH',
  farmerCoordinates,
  onSelectWarehouse,
  selectedWarehouseId,
  isModal = false,
  onClose,
  onNavigate,
  initialCrop = 'Soybean',
  initialQuantity = 50,
  initialCurrentPrice = 4650,
  initialForecastRange = '₹4,850 - ₹5,200',
}) => {
  const { t } = useLanguage();

  // Location filter state
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Active warehouse for comparison calculator
  const [calculatorWarehouse, setCalculatorWarehouse] = useState<WarehouseRecord>(
    WAREHOUSE_DIRECTORY[0]
  );

  // Comparison calculator inputs
  const [calcQuantity, setCalcQuantity] = useState<number>(initialQuantity || 50);
  const [calcDurationDays, setCalcDurationDays] = useState<number>(30);
  const [calcCurrentPrice, setCalcCurrentPrice] = useState<number>(
    typeof initialCurrentPrice === 'number' ? initialCurrentPrice : 4650
  );
  const [calcForecastRange, setCalcForecastRange] = useState<string>(
    initialForecastRange || '₹4,850 - ₹5,200'
  );

  // Compute farmer reference coordinates
  const farmerCoords = useMemo(() => {
    if (farmerCoordinates && farmerCoordinates.lat && farmerCoordinates.lon) {
      return farmerCoordinates;
    }
    const coords = getCoordinatesForLocation(farmerLocation);
    return { lat: coords.lat, lon: coords.lon };
  }, [farmerCoordinates, farmerLocation]);

  // Unique list of districts for filter dropdown
  const districtList = useMemo(() => {
    const set = new Set<string>();
    WAREHOUSE_DIRECTORY.forEach((w) => set.add(w.district));
    return Array.from(set).sort();
  }, []);

  // Compute distances & sort warehouses
  const sortedWarehouses = useMemo(() => {
    return WAREHOUSE_DIRECTORY.map((warehouse) => {
      const distance = calculateHaversineDistance(
        farmerCoords.lat,
        farmerCoords.lon,
        warehouse.latitude,
        warehouse.longitude
      );
      return {
        ...warehouse,
        distanceKm: Math.round(distance * 10) / 10,
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [farmerCoords]);

  // Filtered warehouses
  const filteredWarehouses = useMemo(() => {
    return sortedWarehouses.filter((wh) => {
      // District filter
      if (selectedDistrict !== 'All' && wh.district !== selectedDistrict) {
        return false;
      }
      // Type filter
      if (selectedType !== 'All' && wh.warehouseType !== selectedType) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = wh.name.toLowerCase().includes(term);
        const matchesDistrict = wh.district.toLowerCase().includes(term);
        if (!matchesName && !matchesDistrict) return false;
      }
      return true;
    });
  }, [sortedWarehouses, selectedDistrict, selectedType, searchTerm]);

  // Top 5 nearest warehouses (or filtered list)
  const topNearest = useMemo(() => {
    // If user filtered by district or type, show matching. Otherwise default to top 5 nearest.
    if (selectedDistrict === 'All' && selectedType === 'All' && !searchTerm.trim()) {
      return sortedWarehouses.slice(0, 5);
    }
    return filteredWarehouses;
  }, [sortedWarehouses, filteredWarehouses, selectedDistrict, selectedType, searchTerm]);

  // Calculate store vs sell comparison
  const comparisonResult: StorageDecisionResult = useMemo(() => {
    const rate = calculatorWarehouse?.ratePerQuintalPerDay || 0.85;
    return calculateStorageVsSellNow(
      calcCurrentPrice,
      calcQuantity,
      calcForecastRange,
      rate,
      calcDurationDays
    );
  }, [calcCurrentPrice, calcQuantity, calcForecastRange, calculatorWarehouse, calcDurationDays]);

  const getTypeIcon = (type: WarehouseType) => {
    switch (type) {
      case 'Cold Storage':
        return <Snowflake className="w-4 h-4 text-cyan-700" />;
      case 'Dry Storage':
        return <Package className="w-4 h-4 text-amber-700" />;
      case 'Silo':
        return <Building2 className="w-4 h-4 text-emerald-700" />;
      default:
        return <Warehouse className="w-4 h-4 text-slate-700" />;
    }
  };

  const getTypeBadgeClass = (type: WarehouseType) => {
    switch (type) {
      case 'Cold Storage':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'Dry Storage':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Silo':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className={`space-y-6 ${isModal ? 'p-2' : 'max-w-7xl mx-auto'}`}>
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Warehouse className="w-3.5 h-3.5" />
                WDRA Agri-Storage Grid
              </span>
              <DemoDataBadge type="reference" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.warehouseDiscovery || 'Warehousing & Cold Storage Discovery'}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {t.warehouseDiscoverySubtitle ||
                'Explore registered warehouses, silos, and cold storage across Maharashtra with WDRA compliance.'}
            </p>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="self-end sm:self-start p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Directory Disclaimer Notice Box */}
        <div className="mt-4 p-3.5 bg-[#FFFDF8] border border-amber-300/80 rounded-lg flex items-start gap-3 text-xs sm:text-sm text-amber-900">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-amber-950">
              {t.storageDirectoryNote ||
                'Reference directory of registered warehouses — for live availability, contact the warehouse directly.'}
            </span>
            <span className="block text-amber-800/90 text-xs mt-0.5">
              Warehousing Development and Regulatory Authority (WDRA) accreditation enables farmers to obtain electronic Negotiable Warehouse Receipts (e-NWR) for low-interest post-harvest pledge finance.
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100">
          {/* Farmer Location reference */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Your Reference Location (GPS/District)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={farmerLocation}
                readOnly
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium cursor-default focus:outline-none"
              />
            </div>
          </div>

          {/* District filter */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              {t.searchByDistrict || 'Filter by District'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-lg text-stone-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="All">{t.allDistricts || 'All Districts (Maharashtra)'}</option>
              {districtList.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Storage Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-lg text-stone-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="All">{t.allTypes || 'All Types'}</option>
              <option value="Cold Storage">{t.coldStorage || 'Cold Storage'}</option>
              <option value="Dry Storage">{t.dryStorage || 'Dry Storage'}</option>
              <option value="Silo">{t.siloStorage || 'Bulk Silo'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Nearest Warehouses List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {selectedDistrict === 'All' && selectedType === 'All' && !searchTerm.trim()
                ? t.nearestWarehouses || '5 Nearest Warehouses by Distance'
                : `Warehouses in Maharashtra (${topNearest.length} found)`}
            </h3>
            <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full font-medium">
              Sorted by Distance
            </span>
          </div>
        </div>

        {topNearest.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500">
            <Warehouse className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="font-medium text-stone-700">No warehouses match the selected filters.</p>
            <p className="text-xs mt-1">Try resetting the district or type filter to view available storage hubs.</p>
            <button
              onClick={() => {
                setSelectedDistrict('All');
                setSelectedType('All');
                setSearchTerm('');
              }}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topNearest.map((wh) => {
              const isSelected = selectedWarehouseId === wh.id;
              const isCalculatorActive = calculatorWarehouse?.id === wh.id;
              const occupancyPct = Math.round(
                ((wh.capacityMT - wh.availableCapacityMT) / wh.capacityMT) * 100
              );

              return (
                <div
                  key={wh.id}
                  className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between p-5 shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-400/40 bg-emerald-50/10'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${getTypeBadgeClass(
                          wh.warehouseType
                        )}`}
                      >
                        {getTypeIcon(wh.warehouseType)}
                        {wh.warehouseType === 'Cold Storage'
                          ? t.coldStorage || 'Cold Storage'
                          : wh.warehouseType === 'Dry Storage'
                          ? t.dryStorage || 'Dry Storage'
                          : t.siloStorage || 'Bulk Silo'}
                      </span>

                      {wh.isWdraRegistered && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          WDRA Reg.
                        </span>
                      )}
                    </div>

                    {/* Warehouse Name */}
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2">
                      {wh.name}
                    </h4>

                    {/* Distance & District */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-stone-600">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <MapPin className="w-3 h-3 text-emerald-700" />
                        {wh.distanceKm} km away
                      </span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-700 font-medium">{wh.district} District</span>
                    </div>

                    {/* Capacity & Rates Section */}
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between text-stone-600 mb-1">
                          <span>{t.availableCapacity || 'Available Space'}:</span>
                          <span className="font-semibold text-stone-900">
                            {wh.availableCapacityMT.toLocaleString('en-IN')} MT
                            <span className="text-stone-500 font-normal"> / {wh.capacityMT.toLocaleString('en-IN')} MT</span>
                          </span>
                        </div>
                        {/* Occupancy bar */}
                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              occupancyPct > 80
                                ? 'bg-amber-500'
                                : 'bg-emerald-600'
                            }`}
                            style={{ width: `${occupancyPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-stone-600">
                        <span>Daily Tariff:</span>
                        <span className="font-bold text-stone-900 text-sm">
                          ₹{wh.ratePerQuintalPerDay.toFixed(2)}{' '}
                          <span className="text-xs font-normal text-stone-500">/ qtl / day</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-3 border-t border-stone-100 space-y-2">
                    {/* Select button for produce form integration */}
                    {onSelectWarehouse && (
                      <button
                        onClick={() => onSelectWarehouse(wh)}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                            {t.selectedWarehouse || 'Selected for Harvest'}
                          </>
                        ) : (
                          <>
                            <Warehouse className="w-4 h-4" />
                            {t.selectWarehouse || 'Select this Warehouse'}
                          </>
                        )}
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      {/* Interactive calculation selector */}
                      <button
                        onClick={() => {
                          setCalculatorWarehouse(wh);
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors flex items-center justify-center gap-1 ${
                          isCalculatorActive
                            ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                        title="Calculate holding profits with this warehouse rate"
                      >
                        <Calculator className="w-3.5 h-3.5 text-amber-700" />
                        {isCalculatorActive ? 'Active in Calculator' : 'Compare ROI'}
                      </button>

                      {/* Click-to-call phone link */}
                      <a
                        href={`tel:${wh.contactPhone.replace(/\s+/g, '')}`}
                        className="py-1.5 px-3 rounded-lg text-xs font-medium bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 flex items-center gap-1 shrink-0 transition-colors"
                        title="Call warehouse office"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PART 3: Interactive Store vs. Sell-Now Financial Comparison Engine */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Calculator className="w-3.5 h-3.5 text-amber-800" />
                Rule-Based Decision Math
              </span>
              <DemoDataBadge type="ai_assisted_estimate" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              {t.storeVsSellTitle || 'Store vs. Sell Now Analysis'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {t.storeVsSellSubtitle ||
                'Rule-based financial comparison between immediate mandi sale and warehouse holding.'}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-stone-500 block">Applied Warehouse Tariff:</span>
            <span className="text-xs sm:text-sm font-bold text-stone-900">
              {calculatorWarehouse.name.slice(0, 24)}... (₹{calculatorWarehouse.ratePerQuintalPerDay.toFixed(2)}/qtl/day)
            </span>
          </div>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200/80 mb-5">
          {/* Quantity in Quintals */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Lot Quantity (Quintals)
            </label>
            <input
              type="number"
              min="1"
              max="5000"
              value={calcQuantity}
              onChange={(e) => setCalcQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Current Mandi Price */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Current Mandi Rate (₹/Qtl)
            </label>
            <input
              type="number"
              min="500"
              max="20000"
              value={calcCurrentPrice}
              onChange={(e) => setCalcCurrentPrice(Math.max(100, parseInt(e.target.value) || 100))}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Forecasted Price Range (from AI Forecast) */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Forecasted Rate Outlook
            </label>
            <input
              type="text"
              value={calcForecastRange}
              onChange={(e) => setCalcForecastRange(e.target.value)}
              placeholder="e.g. ₹4,850 - ₹5,200"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Storage Duration */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.storageDuration || 'Holding Duration'}
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[15, 30, 45, 60].map((days) => (
                <button
                  key={days}
                  onClick={() => setCalcDurationDays(days)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    calcDurationDays === days
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side-by-Side Financial Comparison Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Sell Now */}
          <div
            className={`p-5 rounded-xl border transition-all ${
              comparisonResult.recommendedOption === 'sell_now'
                ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-400/40'
                : 'bg-stone-50/80 border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Option 1
              </span>
              {comparisonResult.recommendedOption === 'sell_now' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-700 text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.recommendedChoice || 'Recommended'}
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-stone-900">
              {t.sellNowOption || 'Sell Immediately at Current Mandi'}
            </h4>
            <p className="text-xs text-stone-600 mt-0.5">
              Cash payout at ₹{comparisonResult.currentPricePerQuintal.toLocaleString('en-IN')}/qtl with zero holding expenses.
            </p>

            <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-1.5">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Gross Crop Value:</span>
                <span className="font-semibold text-stone-800">
                  ₹{comparisonResult.netSellNow.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-xs text-stone-600">
                <span>Storage Cost:</span>
                <span className="font-semibold text-emerald-700">₹0 (None)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Net In-Hand Proceeds:</span>
                <span className="text-base text-stone-950">
                  ₹{comparisonResult.netSellNow.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Option B: Store & Sell Later */}
          <div
            className={`p-5 rounded-xl border transition-all ${
              comparisonResult.recommendedOption === 'store'
                ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-400/40'
                : 'bg-stone-50/80 border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Option 2
              </span>
              {comparisonResult.recommendedOption === 'store' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-700 text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.recommendedChoice || 'Recommended'}
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-stone-900">
              {t.storeAndSellLaterOption || 'Store & Sell Later'} ({comparisonResult.storageDurationDays} {t.days || 'Days'})
            </h4>
            <p className="text-xs text-stone-600 mt-0.5">
              Hold at {calculatorWarehouse.name.slice(0, 30)}... until projected peak rate (approx. ₹{comparisonResult.futurePriceEstimated.toLocaleString('en-IN')}/qtl).
            </p>

            <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-1.5">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Projected Gross Value:</span>
                <span className="font-semibold text-stone-800">
                  ₹{comparisonResult.grossStoreAndSellLater.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-xs text-rose-700">
                <span>
                  Storage Rent ({comparisonResult.storageDurationDays}d @ ₹{comparisonResult.storageRatePerQuintalPerDay.toFixed(2)}/qtl/d):
                </span>
                <span className="font-semibold">
                  - ₹{comparisonResult.storageCost.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Net In-Hand Proceeds:</span>
                <span className="text-base text-stone-950">
                  ₹{comparisonResult.netStoreAndSellLater.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Recommendation Banner */}
        <div
          className={`mt-4 p-4 rounded-xl border flex items-center justify-between flex-wrap gap-3 ${
            comparisonResult.isStoreProfitable
              ? 'bg-emerald-700 text-white border-emerald-800'
              : 'bg-amber-900 text-amber-50 border-amber-950'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 shrink-0">
              {comparisonResult.isStoreProfitable ? (
                <TrendingUp className="w-5 h-5 text-emerald-200" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-amber-200" />
              )}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90 block">
                Calculated Advisory Result
              </span>
              <p className="font-bold text-sm sm:text-base leading-snug">
                {comparisonResult.recommendation}
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-white/20 sm:pl-4">
            <span className="text-xs opacity-80 block">Net Advantage</span>
            <span className="text-lg font-black tracking-tight">
              + ₹{comparisonResult.absDifference.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-3 text-[11px] text-stone-500 italic">
          {t.storageEstimateDisclaimer ||
            'Estimate based on current mandi price outlook and daily storage tariff. Actual payout depends on market arrivals and grade inspection at delivery.'}
        </p>
      </div>
    </div>
  );
};
