import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CommodityPrice } from '../types';
import { CROP_LIST, findCropByName, CropDefinition } from '../data/cropList';
import { MAHARASHTRA_MANDIS, APMCMandi } from '../data/maharashtraMandis';

export interface MarketPriceRecord {
  id: string;
  mandiName: string;
  district: string;
  state: string;
  commodity: string;
  variety: string;
  grade: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  pricePerQuintal: number;
  arrivalDate: string;
  arrivalsQuintals: string;
  isArrivalEstimated?: boolean;
  trendChange: number;
  isTrendEstimated?: boolean;
}

export interface DayPricePoint {
  dayLabel: string;
  shortDate: string;
  price: number;
  isToday: boolean;
}

export interface CropPriceSnapshot {
  commodity: string;
  cropDef: CropDefinition;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  pricePerQuintal: number;
  trendChange: number;
  trendPercent: number;
  isTrendEstimated?: boolean;
  arrivalsQuintals: string;
  isArrivalEstimated?: boolean;
  arrivalDate: string;
  primaryMandiName: string;
  primaryDistrict: string;
  source: 'live_agmarknet' | 'reference_mock';
  prices: MarketPriceRecord[];
  history7Days: DayPricePoint[];
  isLoading: boolean;
  error: string | null;
}

interface MarketPriceContextType {
  // Synchronous accessor for any crop (guaranteed non-null, instantly renders)
  getPrice: (cropName: string) => CropPriceSnapshot;
  // Async fetcher to refresh or ensure a specific crop is loaded from the API
  fetchPrice: (cropName: string) => Promise<CropPriceSnapshot>;
  // Pre-aggregated list of commodities for the Home dashboard ticker & feed
  allCommodities: CommodityPrice[];
  // Global loading state for initial batch
  isLoadingInitial: boolean;
  // Force refresh all cached prices
  refreshAll: () => Promise<void>;
  // Active primary mandi list
  activeMandis: APMCMandi[];
}

const MarketPriceContext = createContext<MarketPriceContextType | undefined>(undefined);

// Deterministically generate 7-day historical prices ending precisely at today's modalPrice
export function generateDeterministic7DayHistory(
  modalPrice: number,
  trendPercent: number,
  cropId: string
): DayPricePoint[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  const now = new Date();
  
  // Deterministic seed from cropId characters to prevent flickering
  let seed = 0;
  for (let i = 0; i < cropId.length; i++) {
    seed += cropId.charCodeAt(i);
  }

  const history: DayPricePoint[] = [];
  const pointsCount = 7;
  
  // Back-calculate 6 preceding days leading up to modalPrice today
  // Overall trend over the week approximately reflects trendPercent
  const totalWeeklyDelta = (modalPrice * (trendPercent / 100)) || (modalPrice * 0.025);
  const startPrice = Math.round(modalPrice - totalWeeklyDelta);

  for (let i = 0; i < pointsCount; i++) {
    const isToday = i === pointsCount - 1;
    const dayDate = new Date(now);
    dayDate.setDate(now.getDate() - (pointsCount - 1 - i));
    const shortDate = `${dayDate.getDate()} ${dayDate.toLocaleString('default', { month: 'short' })}`;

    if (isToday) {
      history.push({
        dayLabel: 'Today',
        shortDate,
        price: modalPrice,
        isToday: true,
      });
    } else {
      // Progressively interpolate with deterministic pseudo-noise
      const t = i / (pointsCount - 1);
      const baseInterpolated = startPrice + (modalPrice - startPrice) * t;
      const wave = Math.sin((i + seed) * 1.7) * (modalPrice * 0.015);
      const dayPrice = Math.round(Math.max(modalPrice * 0.7, baseInterpolated + wave));

      history.push({
        dayLabel: days[i],
        shortDate,
        price: dayPrice,
        isToday: false,
      });
    }
  }

  return history;
}

// Generate benchmark records using the verified Maharashtra mandis for a given crop
function generateMandiRecordsForCrop(cropDef: CropDefinition): MarketPriceRecord[] {
  const base = cropDef.defaultBenchmarkPrice;
  const todayStr = new Date().toISOString().split('T')[0];

  // Find mandis matching crop specialty or top major mandis
  const matchingMandis = MAHARASHTRA_MANDIS.filter((m) =>
    m.specialties.some((s) => s.toLowerCase().includes(cropDef.canonicalName.toLowerCase()))
  );

  const selectedMandis = matchingMandis.length >= 4 
    ? matchingMandis.slice(0, 6)
    : [...matchingMandis, ...MAHARASHTRA_MANDIS.slice(0, 6 - matchingMandis.length)];

  return selectedMandis.map((mandi, idx) => {
    // Deterministic regional spread based on distance & index
    const varianceFactor = 1 + ((idx % 5) - 2) * 0.025;
    const modal = Math.round(base * varianceFactor);
    const min = Math.round(modal * cropDef.minPriceRatio);
    const max = Math.round(modal * cropDef.maxPriceRatio);
    const trend = Math.round((varianceFactor - 1) * 100 * 10) / 10;

    return {
      id: `mandi_rec_${mandi.id}_${cropDef.id}`,
      mandiName: mandi.name,
      district: mandi.district,
      state: 'Maharashtra',
      commodity: cropDef.name,
      variety: cropDef.standardGrade,
      grade: 'FAQ Grade A',
      minPrice: min,
      maxPrice: max,
      modalPrice: modal,
      pricePerQuintal: modal,
      arrivalDate: todayStr,
      arrivalsQuintals: `${Math.round(8000 + (idx * 2150))} qtl`,
      trendChange: trend,
    };
  });
}

// Create initial snapshot from standard crop definition
function createInitialSnapshot(cropDef: CropDefinition): CropPriceSnapshot {
  const records = generateMandiRecordsForCrop(cropDef);
  const primary = records[0];
  const history = generateDeterministic7DayHistory(
    cropDef.defaultBenchmarkPrice,
    cropDef.volatilityPercent,
    cropDef.id
  );

  return {
    commodity: cropDef.name,
    cropDef,
    modalPrice: cropDef.defaultBenchmarkPrice,
    minPrice: Math.round(cropDef.defaultBenchmarkPrice * cropDef.minPriceRatio),
    maxPrice: Math.round(cropDef.defaultBenchmarkPrice * cropDef.maxPriceRatio),
    pricePerQuintal: cropDef.defaultBenchmarkPrice,
    trendChange: cropDef.volatilityPercent,
    trendPercent: cropDef.volatilityPercent,
    arrivalsQuintals: '12,500 qtl',
    arrivalDate: new Date().toISOString().split('T')[0],
    primaryMandiName: primary?.mandiName || 'Nashik APMC Main Yard',
    primaryDistrict: primary?.district || 'Nashik',
    source: 'reference_mock',
    prices: records,
    history7Days: history,
    isLoading: false,
    error: null,
  };
}

export const MarketPriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In-memory price cache keyed by canonical/normalized crop name
  const [cache, setCache] = useState<Record<string, CropPriceSnapshot>>(() => {
    const initialCache: Record<string, CropPriceSnapshot> = {};
    // Populate with the initial top crops
    CROP_LIST.forEach((crop) => {
      const snap = createInitialSnapshot(crop);
      initialCache[crop.id] = snap;
      initialCache[crop.name.toLowerCase()] = snap;
      initialCache[crop.canonicalName.toLowerCase()] = snap;
    });
    return initialCache;
  });

  const inFlightRequests = useRef<Record<string, Promise<CropPriceSnapshot>>>({});
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);

  // Fetch prices from server endpoint /api/market/prices
  const fetchPrice = useCallback(
    async (cropName: string): Promise<CropPriceSnapshot> => {
      const cropDef = findCropByName(cropName);
      const cacheKey = cropDef.canonicalName.toLowerCase();

      // Return cached in-flight promise if duplicate request is occurring
      if (inFlightRequests.current[cacheKey]) {
        return inFlightRequests.current[cacheKey];
      }

      const requestPromise = (async () => {
        try {
          const res = await fetch(
            `/api/market/prices?crop=${encodeURIComponent(cropDef.canonicalName)}&state=Maharashtra`
          );

          if (!res.ok) {
            throw new Error(`API returned status ${res.status}`);
          }

          const data = await res.json();
          const pricesList: MarketPriceRecord[] = Array.isArray(data.prices) && data.prices.length > 0
            ? data.prices
            : generateMandiRecordsForCrop(cropDef);

          const primary = data.primaryPrice || pricesList[0];
          const modalPrice = primary?.modalPrice || cropDef.defaultBenchmarkPrice;
          const minPrice = primary?.minPrice || Math.round(modalPrice * cropDef.minPriceRatio);
          const maxPrice = primary?.maxPrice || Math.round(modalPrice * cropDef.maxPriceRatio);
          const trendChange = primary?.trendChange ?? cropDef.volatilityPercent;
          const source = data.source === 'live_agmarknet' ? 'live_agmarknet' : 'reference_mock';
          // Honest flag: true when we could not compute a genuine day-over-day
          // comparison (e.g. only one reporting date present in the live
          // batch, or this is reference/fallback data rather than live).
          const isTrendEstimated = source === 'live_agmarknet' ? (primary?.isTrendEstimated ?? true) : true;

          const history = generateDeterministic7DayHistory(modalPrice, trendChange, cropDef.id);

          const snapshot: CropPriceSnapshot = {
            commodity: cropDef.name,
            cropDef,
            modalPrice,
            minPrice,
            maxPrice,
            pricePerQuintal: modalPrice,
            trendChange,
            trendPercent: trendChange,
            isTrendEstimated,
            arrivalsQuintals: primary?.arrivalsQuintals || '14,200 qtl',
            isArrivalEstimated: primary ? (primary.isArrivalEstimated ?? false) : true,
            arrivalDate: primary?.arrivalDate || new Date().toISOString().split('T')[0],
            primaryMandiName: primary?.mandiName || 'Nashik APMC Main Yard',
            primaryDistrict: primary?.district || 'Nashik',
            source,
            prices: pricesList,
            history7Days: history,
            isLoading: false,
            error: null,
          };

          setCache((prev) => ({
            ...prev,
            [cropDef.id]: snapshot,
            [cropDef.name.toLowerCase()]: snapshot,
            [cacheKey]: snapshot,
          }));

          return snapshot;
        } catch (err: any) {
          console.warn(`[MarketPriceContext] Error fetching price for ${cropName}:`, err);
          // Fall back safely to standard snapshot
          const fallbackSnap = createInitialSnapshot(cropDef);
          setCache((prev) => ({
            ...prev,
            [cropDef.id]: fallbackSnap,
            [cropDef.name.toLowerCase()]: fallbackSnap,
            [cacheKey]: fallbackSnap,
          }));
          return fallbackSnap;
        } finally {
          delete inFlightRequests.current[cacheKey];
        }
      })();

      inFlightRequests.current[cacheKey] = requestPromise;
      return requestPromise;
    },
    []
  );

  // Synchronous accessor: returns immediately from cache or defaults, and fires fetch if stale
  const getPrice = useCallback(
    (cropName: string): CropPriceSnapshot => {
      const cropDef = findCropByName(cropName);
      const cacheKey = cropDef.canonicalName.toLowerCase();
      const existing = cache[cacheKey] || cache[cropDef.id] || cache[cropDef.name.toLowerCase()];

      if (existing) {
        return existing;
      }

      // If not in cache, create and return standard snapshot synchronously while scheduling fetch
      const fallback = createInitialSnapshot(cropDef);
      fetchPrice(cropName);
      return fallback;
    },
    [cache, fetchPrice]
  );

  // Pre-fetch the key primary crops on mount
  useEffect(() => {
    const primaryCropsToWarm = [
      'Onion (Red)',
      'Soybean (Yellow)',
      'Cotton (Medium Staple)',
      'Wheat (Lokwan)',
      'Tomato (Hybrid)',
      'Tur / Arhar (Pigeon Pea)',
      'Potato (Table / Jyoti)',
      'Gram / Chana (Desi)',
    ];

    setIsLoadingInitial(true);
    Promise.allSettled(primaryCropsToWarm.map((c) => fetchPrice(c))).finally(() => {
      setIsLoadingInitial(false);
    });
  }, [fetchPrice]);

  // Refresh all cache
  const refreshAll = useCallback(async () => {
    setIsLoadingInitial(true);
    const uniqueCrops = Array.from(new Set(CROP_LIST.map((c) => c.canonicalName)));
    await Promise.allSettled(uniqueCrops.map((c) => fetchPrice(c)));
    setIsLoadingInitial(false);
  }, [fetchPrice]);

  // Commodities list formatted for Home dashboard ticker & feed
  const allCommodities: CommodityPrice[] = useMemo(() => {
    return CROP_LIST.map((crop) => {
      const snap = cache[crop.canonicalName.toLowerCase()] || cache[crop.id];
      const price = snap ? snap.modalPrice : crop.defaultBenchmarkPrice;
      const trend = snap ? snap.trendPercent : crop.volatilityPercent;
      const isTrendEstimated = snap ? snap.isTrendEstimated : true;

      return {
        id: crop.id,
        name: crop.name,
        category: (crop.season === 'Kharif' || crop.season === 'Rabi' || crop.season === 'Zaid') 
          ? crop.season 
          : 'Kharif',
        price,
        unit: crop.unit,
        trend,
        isTrendEstimated,
        icon: crop.icon,
        colorClass: crop.colorClass,
      };
    });
  }, [cache]);

  const value = useMemo(
    () => ({
      getPrice,
      fetchPrice,
      allCommodities,
      isLoadingInitial,
      refreshAll,
      activeMandis: MAHARASHTRA_MANDIS,
    }),
    [getPrice, fetchPrice, allCommodities, isLoadingInitial, refreshAll]
  );

  return <MarketPriceContext.Provider value={value}>{children}</MarketPriceContext.Provider>;
};

export function useMarketPrices(): MarketPriceContextType {
  const context = useContext(MarketPriceContext);
  if (!context) {
    throw new Error('useMarketPrices must be used within a MarketPriceProvider');
  }
  return context;
}

export function useCropPrice(cropName: string): CropPriceSnapshot {
  const { getPrice, fetchPrice } = useMarketPrices();
  const snapshot = getPrice(cropName);

  useEffect(() => {
    fetchPrice(cropName);
  }, [cropName, fetchPrice]);

  return snapshot;
}
