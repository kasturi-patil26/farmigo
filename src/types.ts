export type UserRole = 'role-selection' | 'farmer' | 'merchant' | 'government';

export type FarmerTab =
  | 'home'
  | 'markets'
  | 'sell'
  | 'sell-recommendations'
  | 'buyer-offers'
  | 'storage'
  | 'farm-store'
  | 'sales-tracking'
  | 'ai-assistant'
  | 'fpo'
  | 'profile';

// FPO (Farmer Producer Organization) — additive feature
export interface FPOProfile {
  id: string;
  name: string;
  registrationNumber: string;
  district: string;
  memberCount: number;
  officeBearerName: string;
  officeBearerPhone: string;
  primaryCrops: string[];
  dateEstablished: string;
}

export interface FPOMembership {
  farmerId: string;
  fpoId: string;
  joinedDate: string;
  isActive: boolean;
}

// Dispute / Grievance — additive feature
export type DisputeReason = 'quality-mismatch' | 'payment-delay' | 'quantity-mismatch' | 'other';
export type DisputeStatus = 'open' | 'under-review' | 'resolved';

export interface DisputeTicket {
  id: string;
  relatedSaleId?: string;
  relatedOfferId?: string;
  raisedBy: string;
  reason: DisputeReason;
  note: string;
  status: DisputeStatus;
  createdDate: string;
}

export type WarehouseType = 'Cold Storage' | 'Dry Storage' | 'Silo';

export interface WarehouseRecord {
  id: string;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  warehouseType: WarehouseType;
  capacityMT: number;
  availableCapacityMT: number;
  ratePerQuintalPerDay: number;
  isWdraRegistered: boolean;
  contactPhone: string;
}

export type MerchantTab =
  | 'home'
  | 'markets'
  | 'post-requirement'
  | 'my-offers'
  | 'purchases'
  | 'ai-assistant'
  | 'profile';

export type GovernmentTab =
  | 'dashboard'
  | 'markets'
  | 'farmers'
  | 'analytics'
  | 'alerts'
  | 'reports'
  | 'profile';

export type LanguageCode = 'en' | 'hi' | 'mr';
export type Language = LanguageCode;

export interface AuthUser {
  id: string;
  name: string;
  role: 'farmer' | 'merchant' | 'government';
  mobile: string;
  badgeId: string; // Krushi ID / APMC License / Official ID
  location: string;
  isVerified: boolean;
  avatarUrl: string;
  holdingAcres?: number;
  primaryCrops?: string[];
  businessName?: string;
  department?: string;
  fpoId?: string; // optional FPO membership
  gstNumber?: string; // used to compute real verification status for buyers
}

export interface CommodityPrice {
  id: string;
  name: string;
  category: 'Rabi' | 'Kharif' | 'Zaid';
  price: number;
  unit: string;
  trend: number; // percentage
  isTrendEstimated?: boolean; // true when no genuine day-over-day comparison was available
  icon: string;
  colorClass: string;
}

export interface MandiRate {
  id: string;
  mandiName: string;
  location: string;
  distanceKm: number;
  cropName: string;
  grade: string;
  pricePerQuintal: number;
  trendChange: number;
  arrivalsQuintals: string;
  estNetProfit?: number;
  isRecommended?: boolean;
}

export interface ProduceItem {
  id: string;
  title: string;
  cropType: string;
  variety: string;
  season: 'Kharif' | 'Rabi';
  quantityTons: number;
  location: string;
  pricePerQuintal: number;
  imageUrl: string;
  farmerName: string;
  grade: 'A' | 'B' | 'C';
  harvestDate: string;
  status?: 'active' | 'in-transit' | 'sold';
  fpoId?: string; // set when farmer opts to list as part of their FPO group
}

export interface BuyerOffer {
  id: string;
  buyerName: string;
  rating: number;
  isBestMatch?: boolean;
  hasFastPickup?: boolean;
  offeredPrice: number;
  quantity: string;
  quantityQuintals: number;
  requiredQuality: string;
  paymentTerms: string;
  status: 'pending' | 'accepted' | 'declined';
  reliabilityScore?: number; // 0-100
  distanceKm?: number;
  deliveryFitScore?: number; // 0-100
  qualityFitScore?: number; // 0-100
  paymentTermsScore?: number; // 0-100
  matchScore?: number;
  gstNumber?: string; // presence + phone confirmation drives real isVerified computation
  phoneVerified?: boolean;
}

export interface HotspotPoint {
  id: string;
  name: string;
  crop: string;
  change: string;
  isPositive: boolean;
  top: string;
  left: string;
  details: string;
}

export interface FarmStoreItem {
  id: string;
  title: string;
  category: 'seeds' | 'fertilizer' | 'equipment' | 'houseware';
  originalPrice: number;
  subsidyPrice: number;
  subsidyPercentage: number;
  unit: string;
  rating: number;
  brand: string;
  inStock: boolean;
  imageUrl: string;
  deliveryDays: number;
  description: string;
}

export interface SalesRecord {
  id: string;
  cropName: string;
  quantityQuintals: number;
  destinationMandi: string;
  buyerName: string;
  soldPricePerQtl: number;
  totalGross: number;
  netPayout: number;
  date: string;
  status: 'in-transit' | 'weighbridge-verified' | 'paid' | 'pending';
  gatePassNo: string;
  vehicleNo: string;
  eNamTxnId: string;
  buyerQualityRating?: number; // 1-5, set by buyer post-delivery; feeds real quality track record
  disputeId?: string; // set if a dispute ticket was raised against this sale
}
