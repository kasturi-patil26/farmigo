export interface Coordinates {
  lat: number;
  lon: number;
  name: string;
}

export const MANDI_COORDINATES: Record<string, Coordinates> = {
  'Nashik': { lat: 19.9975, lon: 73.7898, name: 'Nashik APMC Mandi' },
  'Nashik, MH': { lat: 19.9975, lon: 73.7898, name: 'Nashik APMC Mandi' },
  'Dindori, Nashik, MH': { lat: 20.2036, lon: 73.8344, name: 'Dindori Farmgate Hub' },
  'Dindori, Nashik': { lat: 20.2036, lon: 73.8344, name: 'Dindori Farmgate Hub' },
  'Pune': { lat: 18.5204, lon: 73.8567, name: 'Pune APMC Yard' },
  'Pune, MH': { lat: 18.5204, lon: 73.8567, name: 'Pune APMC Yard' },
  'Lasalgaon': { lat: 20.1472, lon: 74.2254, name: 'Lasalgaon Onion Mandi' },
  'Lasalgaon, MH': { lat: 20.1472, lon: 74.2254, name: 'Lasalgaon Onion Mandi' },
  'Nagpur': { lat: 21.1458, lon: 79.0882, name: 'Nagpur Central APMC' },
  'Nagpur, MH': { lat: 21.1458, lon: 79.0882, name: 'Nagpur Central APMC' },
  'Latur': { lat: 18.4088, lon: 76.5604, name: 'Latur Oilseed Mandi' },
  'Latur, Maharashtra': { lat: 18.4088, lon: 76.5604, name: 'Latur Oilseed Mandi' },
  'Sangli': { lat: 16.8524, lon: 74.5815, name: 'Sangli Spices & Grapes APMC' },
  'Tasgaon, Sangli, MH': { lat: 17.0343, lon: 74.6033, name: 'Tasgaon Grape Yard' },
  'Ahmednagar': { lat: 19.0948, lon: 74.7480, name: 'Ahmednagar APMC' },
  'Aurangabad': { lat: 19.8762, lon: 75.3433, name: 'Chhatrapati Sambhajinagar APMC' },
  'Chhatrapati Sambhajinagar': { lat: 19.8762, lon: 75.3433, name: 'Chhatrapati Sambhajinagar APMC' },
  'Solapur': { lat: 17.6599, lon: 75.9064, name: 'Solapur APMC' },
  'Kolhapur': { lat: 16.7050, lon: 74.2433, name: 'Kolhapur Market Yard' },
  'Baramati': { lat: 18.1517, lon: 74.5772, name: 'Baramati APMC' },
  'Pimpalgaon': { lat: 20.1705, lon: 73.9856, name: 'Pimpalgaon Baswant' },
  'Malegaon': { lat: 20.5539, lon: 74.5298, name: 'Malegaon APMC' },
  'Sehore, MP': { lat: 23.2032, lon: 77.0844, name: 'Sehore Wheat APMC' },
  'Mumbai': { lat: 19.0760, lon: 72.8777, name: 'Vashi APMC Navi Mumbai' },
  'Maharashtra': { lat: 19.7515, lon: 75.7139, name: 'Maharashtra Central' },
};

/**
 * Calculates great-circle distance between two points on the Earth in kilometers
 * using the Haversine formula.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // 1 decimal place
}

/**
 * Finds approximate coordinates for a location string or returns default.
 */
export function getCoordinatesForLocation(locationName: string): Coordinates {
  if (!locationName) return MANDI_COORDINATES['Nashik'];

  // Exact match
  if (MANDI_COORDINATES[locationName]) {
    return MANDI_COORDINATES[locationName];
  }

  // Partial match
  const lower = locationName.toLowerCase();
  for (const key of Object.keys(MANDI_COORDINATES)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return MANDI_COORDINATES[key];
    }
  }

  // Default fallback (Dindori/Nashik baseline)
  return { lat: 20.2036, lon: 73.8344, name: locationName };
}

export interface VehicleOption {
  id: string;
  name: string;
  cap: string;
  baseRate: number;
  perKmRate: number;
  cost: number;
}

/**
 * Computes vehicle pricing based on distance in kilometers.
 */
export function calculateVehicleOptions(distanceKm: number): VehicleOption[] {
  const safeDistance = Math.max(distanceKm, 5);

  return [
    {
      id: 'ace',
      name: 'Tata Ace',
      cap: '1.5 T Cap',
      baseRate: 400,
      perKmRate: 16,
      cost: Math.round(400 + safeDistance * 16),
    },
    {
      id: 'eicher',
      name: 'Eicher 14ft',
      cap: '4.5 T Cap',
      baseRate: 800,
      perKmRate: 30,
      cost: Math.round(800 + safeDistance * 30),
    },
    {
      id: 'tractor',
      name: 'Tractor Trolley',
      cap: '3.0 T Cap',
      baseRate: 600,
      perKmRate: 22,
      cost: Math.round(600 + safeDistance * 22),
    },
  ];
}
