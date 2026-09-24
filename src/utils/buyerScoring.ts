import { BuyerOffer } from '../types';

export interface FactorBreakdown {
  label: string;
  weightedScore: number;
}

/**
 * Calculates the holistic match score for a buyer offer based on:
 * - 30% Normalized offered price (relative to min & max prices across offers)
 * - 20% Buyer reliability score
 * - 15% Delivery fit score (pickup speed, logistical alignment)
 * - 15% Quality grade alignment
 * - 10% Payment terms favorable rating
 * - 10% Proximity (distance to farmgate)
 */
export function calculateBuyerScore(
  offer: BuyerOffer,
  minPrice: number,
  maxPrice: number,
  maxDistanceKm: number = 50,
  farmerQualityScore: number = 70
): number {
  const priceRange = maxPrice - minPrice;
  const normalizedNetPrice =
    priceRange > 0 ? (offer.offeredPrice - minPrice) / priceRange : 1.0;

  const reliability = (offer.reliabilityScore ?? (offer.rating / 5) * 100) / 100;
  const deliveryFit = (offer.deliveryFitScore ?? (offer.hasFastPickup ? 95 : 75)) / 100;
  const qualityFit = (offer.qualityFitScore ?? farmerQualityScore) / 100;
  const paymentTerms = (offer.paymentTermsScore ?? 85) / 100;
  const distance = offer.distanceKm ?? 25;
  const safeMaxDist = Math.max(distance, maxDistanceKm, 1);
  const proximityFit = Math.max(0, 1 - distance / safeMaxDist);

  const matchScore =
    0.30 * normalizedNetPrice +
    0.20 * reliability +
    0.15 * deliveryFit +
    0.15 * qualityFit +
    0.10 * paymentTerms +
    0.10 * proximityFit;

  return Math.round(matchScore * 100) / 100;
}

/**
 * Returns the top contributing factor breakdown for an offer to explain its ranking.
 */
export function getOfferFactorBreakdowns(
  offer: BuyerOffer,
  minPrice: number = 2700,
  maxPrice: number = 2850,
  maxDistanceKm: number = 50
): FactorBreakdown[] {
  const priceRange = maxPrice - minPrice;
  const normalizedNetPrice =
    priceRange > 0 ? (offer.offeredPrice - minPrice) / priceRange : 1.0;

  const reliability = (offer.reliabilityScore ?? (offer.rating / 5) * 100) / 100;
  const deliveryFit = (offer.deliveryFitScore ?? (offer.hasFastPickup ? 95 : 75)) / 100;
  const qualityFit = (offer.qualityFitScore ?? 85) / 100;
  const paymentTerms = (offer.paymentTermsScore ?? 85) / 100;
  const distance = offer.distanceKm ?? 25;
  const safeMaxDist = Math.max(distance, maxDistanceKm, 1);
  const proximityFit = Math.max(0, 1 - distance / safeMaxDist);

  const factors: FactorBreakdown[] = [
    {
      label: `Top net price (₹${offer.offeredPrice.toLocaleString('en-IN')})`,
      weightedScore: 0.30 * normalizedNetPrice,
    },
    {
      label: `Verified reliability (${offer.rating}★, ${offer.reliabilityScore ?? 90}% score)`,
      weightedScore: 0.20 * reliability,
    },
    {
      label: offer.hasFastPickup ? 'Fast pickup & transport fit' : 'Flexible logistics delivery',
      weightedScore: 0.15 * deliveryFit,
    },
    {
      label: `Quality fit (${offer.requiredQuality})`,
      weightedScore: 0.15 * qualityFit,
    },
    {
      label: 'Instant/secure settlement terms',
      weightedScore: 0.10 * paymentTerms,
    },
    {
      label: `Close farmgate proximity (${distance} km)`,
      weightedScore: 0.10 * proximityFit,
    },
  ];

  return factors.sort((a, b) => b.weightedScore - a.weightedScore);
}

/**
 * Returns the top 2 contributing factors for an offer as concise strings.
 */
export function getTopFactors(
  offer: BuyerOffer,
  minPrice: number = 2700,
  maxPrice: number = 2850,
  maxDistanceKm: number = 50
): string[] {
  const sortedFactors = getOfferFactorBreakdowns(offer, minPrice, maxPrice, maxDistanceKm);
  return [sortedFactors[0].label, sortedFactors[1].label];
}

/**
 * Computes scores for an array of offers, sorts descending by matchScore,
 * and sets isBestMatch = true only on the highest-scoring offer.
 */
export function scoreAndRankBuyerOffers(offers: BuyerOffer[], farmerQualityScore: number = 70): BuyerOffer[] {
  if (offers.length === 0) return [];

  const prices = offers.map((o) => o.offeredPrice);
  const distances = offers.map((o) => o.distanceKm ?? 25);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const maxDistanceKm = Math.max(...distances, 50);

  const scoredOffers = offers.map((offer) => {
    const score = calculateBuyerScore(offer, minPrice, maxPrice, maxDistanceKm, farmerQualityScore);
    return {
      ...offer,
      matchScore: score,
      isBestMatch: false,
    };
  });

  // Sort descending by matchScore (higher is better)
  scoredOffers.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));

  // Highest score gets isBestMatch
  if (scoredOffers.length > 0) {
    scoredOffers[0].isBestMatch = true;
  }

  return scoredOffers;
}
