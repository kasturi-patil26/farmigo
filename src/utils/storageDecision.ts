/**
 * Pure rule-based calculation utility for comparing immediate sale vs. warehousing produce.
 * Completely deterministic; no AI calls.
 */

export interface StorageDecisionResult {
  currentPricePerQuintal: number;
  quantityQuintals: number;
  storageRatePerQuintalPerDay: number;
  storageDurationDays: number;
  forecastLowPrice: number;
  forecastHighPrice: number;
  futurePriceEstimated: number; // Average of forecasted price range
  netSellNow: number;
  storageCost: number;
  grossStoreAndSellLater: number;
  netStoreAndSellLater: number;
  profitDifference: number; // Positive means storing is better, negative means selling now is better
  absDifference: number;
  recommendedOption: 'sell_now' | 'store';
  recommendation: string;
  isStoreProfitable: boolean;
}

/**
 * Parses a price string such as "₹2,400 - ₹2,600", "₹2,250", or raw numbers.
 */
export function parsePriceRange(priceRangeInput: string | number): { min: number; max: number; avg: number } {
  if (typeof priceRangeInput === 'number' && !isNaN(priceRangeInput)) {
    return { min: priceRangeInput, max: priceRangeInput, avg: priceRangeInput };
  }

  const str = String(priceRangeInput || '');
  // Match numbers (ignoring commas, ₹, spaces)
  const numbers = str
    .replace(/[^\d\s\-\–]/g, '')
    .split(/[\s\-\–]+/)
    .map((n) => parseInt(n, 10))
    .filter((n) => !isNaN(n) && n > 0);

  if (numbers.length >= 2) {
    const min = Math.min(numbers[0], numbers[1]);
    const max = Math.max(numbers[0], numbers[1]);
    const avg = Math.round((min + max) / 2);
    return { min, max, avg };
  } else if (numbers.length === 1) {
    const val = numbers[0];
    return { min: val, max: val, avg: val };
  }

  // Sensible default fallback if input is unparseable
  return { min: 2400, max: 2600, avg: 2500 };
}

/**
 * Parses numeric price from strings like "₹2,250" or numbers.
 */
export function parseNumericPrice(priceInput: string | number, defaultPrice = 2400): number {
  if (typeof priceInput === 'number' && !isNaN(priceInput) && priceInput > 0) {
    return priceInput;
  }
  const clean = String(priceInput || '').replace(/[^\d]/g, '');
  const parsed = parseInt(clean, 10);
  return !isNaN(parsed) && parsed > 0 ? parsed : defaultPrice;
}

/**
 * Calculates net proceeds between selling now vs. storing in a warehouse and selling later.
 *
 * @param currentPricePerQuintal - current mandi price (e.g. 2250)
 * @param quantityQuintals - produce lot size in quintals (e.g. 50)
 * @param forecastedPriceRange - forecasted range string (e.g. "₹2,400 - ₹2,600") from /api/ai/forecast
 * @param storageRatePerQuintalPerDay - daily warehouse rent per quintal in ₹ (e.g. 0.85 for dry storage, 2.80 for cold storage)
 * @param storageDurationDays - planned storage duration in days (e.g. 30)
 */
export function calculateStorageVsSellNow(
  currentPricePerQuintal: number | string,
  quantityQuintals: number,
  forecastedPriceRange: string | number,
  storageRatePerQuintalPerDay: number,
  storageDurationDays: number = 30
): StorageDecisionResult {
  const currentPrice = parseNumericPrice(currentPricePerQuintal, 2400);
  const qty = Math.max(1, quantityQuintals || 1);
  const duration = Math.max(1, storageDurationDays || 30);
  const dailyRate = Math.max(0, storageRatePerQuintalPerDay || 0.85);

  const { min: forecastLow, max: forecastHigh, avg: futurePriceEstimated } = parsePriceRange(forecastedPriceRange);

  // 1. Net proceeds if sold now
  const netSellNow = Math.round(currentPrice * qty);

  // 2. Storage cost for duration
  const storageCost = Math.round(dailyRate * qty * duration);

  // 3. Gross & Net proceeds if stored and sold later at projected price
  const grossStoreAndSellLater = Math.round(futurePriceEstimated * qty);
  const netStoreAndSellLater = Math.round(grossStoreAndSellLater - storageCost);

  // 4. Comparison
  const profitDifference = netStoreAndSellLater - netSellNow;
  const absDifference = Math.abs(profitDifference);
  const isStoreProfitable = profitDifference > 0;
  const recommendedOption: 'sell_now' | 'store' = isStoreProfitable ? 'store' : 'sell_now';

  const recommendation = isStoreProfitable
    ? `Storing for ${duration} days is estimated to yield ₹${absDifference.toLocaleString('en-IN')} higher net proceeds after deducting ₹${storageCost.toLocaleString('en-IN')} storage fees.`
    : `Selling now is estimated to yield ₹${absDifference.toLocaleString('en-IN')} higher net proceeds than holding for ${duration} days after accounting for storage costs.`;

  return {
    currentPricePerQuintal: currentPrice,
    quantityQuintals: qty,
    storageRatePerQuintalPerDay: dailyRate,
    storageDurationDays: duration,
    forecastLowPrice: forecastLow,
    forecastHighPrice: forecastHigh,
    futurePriceEstimated,
    netSellNow,
    storageCost,
    grossStoreAndSellLater,
    netStoreAndSellLater,
    profitDifference,
    absDifference,
    recommendedOption,
    recommendation,
    isStoreProfitable,
  };
}
