import { BuyerOffer, SalesRecord } from '../types';

/**
 * Real, rule-based buyer verification — NOT a static label.
 * A buyer is only considered "verified" if they have provided a GST number
 * (basic format check: 15 chars, standard GSTIN pattern) AND their phone
 * has been confirmed. This replaces the previous hardcoded isVerified flag.
 */
export function computeBuyerVerification(offer: BuyerOffer): boolean {
  const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const hasValidGst = !!offer.gstNumber && gstPattern.test(offer.gstNumber);
  return hasValidGst && !!offer.phoneVerified;
}

/**
 * Computes a real quality-fit score (0-100) from a farmer's actual
 * post-delivery buyer ratings (1-5 stars each), instead of the previous
 * hardcoded default of 85. Falls back to a neutral 70 (not 85) when no
 * ratings exist yet, clearly signaling "new farmer, no track record" rather
 * than presenting an inflated default as if it were earned.
 */
export function computeQualityScoreFromHistory(sales: SalesRecord[]): number {
  const rated = sales.filter((s) => typeof s.buyerQualityRating === 'number');
  if (rated.length === 0) return 70; // neutral, honest default for no history
  const avg =
    rated.reduce((sum, s) => sum + (s.buyerQualityRating ?? 0), 0) / rated.length;
  // Convert 1-5 star average into a 0-100 score
  return Math.round((avg / 5) * 100);
}

/**
 * Returns a human-readable quality track record summary string.
 */
export function getQualityTrackRecordSummary(sales: SalesRecord[]): string {
  const rated = sales.filter((s) => typeof s.buyerQualityRating === 'number');
  if (rated.length === 0) return 'No quality ratings yet';
  const avg =
    rated.reduce((sum, s) => sum + (s.buyerQualityRating ?? 0), 0) / rated.length;
  return `${avg.toFixed(1)}★ average across ${rated.length} rated deliveries`;
}
