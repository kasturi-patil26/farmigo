import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  getCoordinatesForLocation,
  calculateHaversineDistance,
  calculateVehicleOptions,
  VehicleOption
} from '../utils/distance';
import { DemoDataBadge } from './DemoDataBadge';

interface TransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: { mandi: string; qty: number; netIncome: number } | null;
}

export const TransportModal: React.FC<TransportModalProps> = ({ isOpen, onClose, data }) => {
  const { t } = useLanguage();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('eicher');
  const [pickupDate, setPickupDate] = useState('Tomorrow, 07:00 AM (Early Batch)');
  const [isBooked, setIsBooked] = useState(false);

  // Default origin is the farmer's registered location / hub
  const originCoords = useMemo(() => getCoordinatesForLocation('Dindori, Nashik, MH'), []);
  const destCoords = useMemo(() => getCoordinatesForLocation(data?.mandi || 'Nashik, MH'), [data?.mandi]);

  const distanceKm = useMemo(() => {
    if (!data) return 45;
    const dist = calculateHaversineDistance(
      originCoords.lat,
      originCoords.lon,
      destCoords.lat,
      destCoords.lon
    );
    // If distance is very small (same city), give a realistic minimum farmgate-to-APMC transit distance of 18-35 km
    return dist < 10 ? 24 : Math.round(dist);
  }, [originCoords, destCoords, data]);

  // Extended vehicle options with capacity in Quintals (1 Ton = 10 Quintals)
  const vehicleOptions = useMemo(() => {
    const rawOptions = calculateVehicleOptions(distanceKm);
    const capacityMap: Record<string, { capacityQtl: number; type: string }> = {
      ace: { capacityQtl: 15, type: 'Small Pickup' },
      tractor: { capacityQtl: 30, type: 'Tractor Trolley' },
      eicher: { capacityQtl: 45, type: 'Medium Truck' },
    };

    // Also include a Heavy 10T option for large lot sizes (> 45 quintals)
    const heavyOption: VehicleOption & { capacityQtl: number; type: string } = {
      id: 'heavy',
      name: 'Tata 1613 Heavy',
      cap: '10.0 T Cap',
      baseRate: 1200,
      perKmRate: 45,
      cost: Math.round(1200 + distanceKm * 45),
      capacityQtl: 100,
      type: 'Heavy Multi-Axle Truck'
    };

    const enhanced = rawOptions.map((opt) => ({
      ...opt,
      capacityQtl: capacityMap[opt.id]?.capacityQtl || 20,
      type: capacityMap[opt.id]?.type || 'Commercial Vehicle'
    }));

    return [...enhanced, heavyOption];
  }, [distanceKm]);

  // Determine optimal vehicle for the given quantity
  const qty = data?.qty || 50;
  const optimalVehicle = useMemo(() => {
    const sorted = [...vehicleOptions].sort((a, b) => a.capacityQtl - b.capacityQtl);
    const fits = sorted.find((v) => v.capacityQtl >= qty);
    return fits || sorted[sorted.length - 1];
  }, [vehicleOptions, qty]);

  // Automatically select optimal vehicle when modal opens if not yet chosen or undersized
  const activeVehicle = vehicleOptions.find((v) => v.id === selectedVehicleId) || optimalVehicle;

  if (!isOpen || !data) return null;

  const handleConfirm = () => {
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2016]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDF8] rounded-[2.5rem] w-full max-w-lg shadow-2xl border-2 border-[#E2D7C1] overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b-2 border-[#E2D7C1] flex justify-between items-center bg-[#2B2016] text-[#FFFDF8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F5233] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-base md:text-lg">{t.bookTransport}</h3>
                <DemoDataBadge type="prototype" />
              </div>
              <p className="text-xs text-[#E2D7C1]/80 font-body">
                Direct farmgate-to-weighbridge transit routing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {isBooked ? (
          <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-4 font-body">
            <div className="w-16 h-16 rounded-3xl bg-[#2F5233]/15 border-2 border-[#2F5233]/30 text-[#2F5233] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-[#2B2016] font-heading">Transport Confirmed!</h4>
              <p className="text-xs text-[#6E5D4F] mt-1 font-body">
                Booking ID: <strong className="text-[#2F5233] font-mono-price font-bold">TRN-MH-2026-9042</strong>
              </p>
            </div>
            <div className="bg-[#F7F1E3] rounded-2xl p-4 w-full text-left text-xs space-y-2 border-2 border-[#E2D7C1] font-medium text-[#2B2016]">
              <p><strong className="text-[#6E5D4F]">Origin:</strong> Dindori Farmgate Hub (Nashik District)</p>
              <p><strong className="text-[#6E5D4F]">Destination:</strong> {data.mandi}</p>
              <p><strong className="text-[#6E5D4F]">Calculated Distance:</strong> <span className="font-mono-price font-bold text-[#2F5233]">{distanceKm} km</span> (Haversine Route)</p>
              <p><strong className="text-[#6E5D4F]">{t.quantity}:</strong> {data.qty} {t.quintal}</p>
              <p><strong className="text-[#6E5D4F]">Assigned Vehicle:</strong> {activeVehicle.name} ({activeVehicle.cap})</p>
              <p><strong className="text-[#6E5D4F]">Est. Logistics Cost:</strong> <span className="font-mono-price font-bold text-[#2F5233]">₹{activeVehicle.cost.toLocaleString('en-IN')}</span></p>
              <p><strong className="text-[#6E5D4F]">Pickup Slot:</strong> {pickupDate}</p>
              <p><strong className="text-[#6E5D4F]">Driver:</strong> Santosh G. (Tata 407 • MH-12-CZ-4109)</p>
              <p><strong className="text-[#6E5D4F]">Driver Phone:</strong> +91 98221 44819</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#2F5233] hover:bg-[#254228] text-white font-heading font-bold text-xs rounded-full shadow-md transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5 font-body">
            {/* Booking overview summary */}
            <div className="bg-[#F7F1E3] p-4 rounded-2xl border-2 border-[#E2D7C1] flex justify-between items-center text-sm">
              <div>
                <span className="text-[11px] text-[#6E5D4F] font-bold uppercase tracking-wider block">
                  Route & Destination
                </span>
                <strong className="text-[#2B2016] font-black text-base font-heading">{data.mandi}</strong>
                <span className="text-xs text-[#2F5233] font-bold font-mono-price block">~{distanceKm} km from Dindori Hub</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#6E5D4F] font-bold uppercase tracking-wider block">
                  Lot Size
                </span>
                <strong className="text-[#2F5233] font-black text-base font-mono-price">{data.qty} {t.quintal}</strong>
              </div>
            </div>

            {/* Select Vehicle Type */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#6E5D4F] uppercase tracking-wider font-heading">
                  Select Dedicated Vehicle
                </label>
                <span className="text-[11px] font-bold text-[#2F5233]">
                  Recommended: {optimalVehicle.name}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {vehicleOptions.map((v) => {
                  const isUndersized = v.capacityQtl < qty;
                  const isSelected = activeVehicle.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2F5233] bg-[#2F5233]/10 text-[#2B2016] shadow-xs'
                          : isUndersized
                          ? 'border-[#E2D7C1]/70 bg-[#FFFDF8] opacity-60 text-[#6E5D4F]'
                          : 'border-[#E2D7C1] hover:border-[#2F5233]/50 bg-[#FFFDF8] text-[#2B2016]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-heading block truncate">{v.name}</span>
                        </div>
                        <span className="text-[10px] text-[#6E5D4F] font-bold font-mono-price">{v.cap}</span>
                        {isUndersized && (
                          <span className="text-[9px] font-bold text-[#8C4A2F] block mt-0.5">
                            Under-capacity
                          </span>
                        )}
                        {v.id === optimalVehicle.id && (
                          <span className="text-[9px] font-bold text-[#2F5233] block mt-0.5">
                            Best Fit
                          </span>
                        )}
                      </div>
                      <strong className="text-xs font-black text-[#2F5233] font-mono-price mt-2">
                        ₹{v.cost.toLocaleString('en-IN')}
                      </strong>
                    </button>
                  );
                })}
              </div>
              {activeVehicle.capacityQtl < qty && (
                <p className="text-xs text-[#8C4A2F] font-medium bg-[#8C4A2F]/10 p-2.5 rounded-xl border border-[#8C4A2F]/20">
                  ⚠️ Note: <strong>{activeVehicle.name}</strong> capacity ({activeVehicle.capacityQtl} qtl) is lower than your lot size ({qty} qtl). Multiple trips or a larger vehicle ({optimalVehicle.name}) is recommended.
                </p>
              )}
            </div>

            {/* Pickup Schedule */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6E5D4F] uppercase tracking-wider font-heading">
                Pickup Slot
              </label>
              <select
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-[#FFFDF8] border-2 border-[#E2D7C1] text-xs font-bold text-[#2B2016] focus:outline-none focus:border-[#2F5233] cursor-pointer"
              >
                <option value="Tomorrow, 07:00 AM (Early Batch)">Tomorrow, 07:00 AM (Early Batch)</option>
                <option value="Tomorrow, 01:00 PM (Afternoon Batch)">Tomorrow, 01:00 PM (Afternoon Batch)</option>
                <option value="Day After Tomorrow, 07:00 AM">Day After Tomorrow, 07:00 AM</option>
              </select>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t-2 border-[#E2D7C1] flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 bg-[#E2D7C1]/50 hover:bg-[#E2D7C1] text-[#2B2016] font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3.5 bg-[#2F5233] hover:bg-[#254228] text-white font-heading font-bold text-xs rounded-full shadow-md transition-all cursor-pointer active:scale-95"
              >
                Confirm Pickup (₹{activeVehicle.cost.toLocaleString('en-IN')})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
