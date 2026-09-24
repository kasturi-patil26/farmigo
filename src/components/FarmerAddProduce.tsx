import React, { useState, useRef, useEffect } from 'react';
import { FarmerTab, WarehouseRecord, AuthUser } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { WarehouseFinder } from './WarehouseFinder';
import { INITIAL_FPOS } from '../data/fpoData';
import { Warehouse, ShieldCheck, MapPin, Snowflake, Package, Building2, CheckCircle2, RotateCcw, Users, Camera, Sparkles, Loader2, AlertTriangle } from 'lucide-react';

interface GradeAnalysisResult {
  grade: 'A' | 'B' | 'C';
  confidence: number;
  reasons: string[];
  advisory: string;
}

interface FarmerAddProduceProps {
  onNavigate: (tab: FarmerTab) => void;
  onProduceAdded?: (crop: string, qty: number, grade: string, location: string, fpoId?: string) => void;
  currentUser?: AuthUser | null;
}

export const FarmerAddProduce: React.FC<FarmerAddProduceProps> = ({
  onNavigate,
  onProduceAdded,
  currentUser,
}) => {
  const { t, language } = useLanguage();
  const [crop, setCrop] = useState('wheat');
  const [quantity, setQuantity] = useState<number>(50);
  const [grade, setGrade] = useState<'A' | 'B' | 'C'>('B');
  const [location, setLocation] = useState('Pune District Warehouse, Haveli Taluka');
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseRecord | null>(null);
  const [showWarehousePicker, setShowWarehousePicker] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listAsFpo, setListAsFpo] = useState(false);

  // Grade-by-photo state: the farmer captures/uploads one clear photo of the
  // produce and the AI grading endpoint classifies it into Grade A/B/C.
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoMimeType, setPhotoMimeType] = useState<string>('image/jpeg');
  const [isAnalyzingGrade, setIsAnalyzingGrade] = useState(false);
  const [gradeAnalysis, setGradeAnalysis] = useState<GradeAnalysisResult | null>(null);
  const [gradeAnalysisError, setGradeAnalysisError] = useState<string | null>(null);

  const runGradeAnalysis = async (base64Data: string, mimeType: string, cropValue: string) => {
    setIsAnalyzingGrade(true);
    setGradeAnalysisError(null);
    try {
      const res = await fetch('/api/ai/grade-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data, mimeType, crop: cropValue, language }),
      });
      if (!res.ok) throw new Error('Grade analysis request failed');
      const data = await res.json();
      const detectedGrade: 'A' | 'B' | 'C' = ['A', 'B', 'C'].includes(data.grade) ? data.grade : 'B';
      setGradeAnalysis({
        grade: detectedGrade,
        confidence: typeof data.confidence === 'number' ? data.confidence : 70,
        reasons: Array.isArray(data.reasons) ? data.reasons : [],
        advisory: typeof data.advisory === 'string' ? data.advisory : '',
      });
      setGrade(detectedGrade);
    } catch (err) {
      setGradeAnalysisError(t.gradeAnalysisError);
    } finally {
      setIsAnalyzingGrade(false);
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setGradeAnalysis(null);
    setGradeAnalysisError(null);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const commaIndex = dataUrl.indexOf(',');
      const meta = dataUrl.slice(0, commaIndex);
      const base64Data = dataUrl.slice(commaIndex + 1);
      const mimeMatch = meta.match(/data:(.*);base64/);
      const mimeType = mimeMatch ? mimeMatch[1] : (file.type || 'image/jpeg');

      setPhotoPreview(dataUrl);
      setPhotoBase64(base64Data);
      setPhotoMimeType(mimeType);
      runGradeAnalysis(base64Data, mimeType, crop);
    };
    reader.readAsDataURL(file);
  };

  const handleRetakePhoto = () => {
    setPhotoPreview(null);
    setPhotoBase64(null);
    setGradeAnalysis(null);
    setGradeAnalysisError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Re-run grading if the farmer changes the crop type after already
  // capturing a photo, since the grading rubric is crop-specific.
  useEffect(() => {
    if (photoBase64) {
      runGradeAnalysis(photoBase64, photoMimeType, crop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop]);

  // This toggle only renders when the farmer has actually joined an FPO —
  // additive feature, zero effect on a farmer who hasn't joined one.
  const myFpo = currentUser?.fpoId
    ? INITIAL_FPOS.find((f) => f.id === currentUser.fpoId)
    : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const resolvedLocation = selectedWarehouse
      ? `${selectedWarehouse.name} (${selectedWarehouse.district})`
      : location;

    if (onProduceAdded) {
      onProduceAdded(crop, quantity, grade, resolvedLocation, listAsFpo && myFpo ? myFpo.id : undefined);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('sell-recommendations');
    }, 400);
  };

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-8 py-6 md:py-8 mb-20 md:mb-8 bg-[#F7F1E3]">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-3 py-1 bg-[#2F5233]/10 text-[#2F5233] rounded-full text-xs font-mono-price font-bold uppercase tracking-wider border border-[#2F5233]/20">
            LOT CREATION • आवक नोंद
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-[#2B2016] tracking-tight mb-1.5 font-heading">
          {t.addProduceTitle}
        </h1>
        <p className="text-sm md:text-base text-[#6E5D4F] font-medium font-body">
          {t.addProduceSubtitle}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm shadow-md border-2 border-[#2F5233] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden"
      >
        {/* Top color bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#2F5233]" />

        {/* Crop Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="crop-select" className="text-xs font-bold uppercase tracking-wider text-[#6E5D4F] font-body">
            {t.cropVariety}
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#2F5233]">
              eco
            </span>
            <select
              id="crop-select"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full h-14 pl-12 pr-10 rounded-2xl bg-[#F7F1E3] border-2 border-[#E2D7C1] text-[#2B2016] font-bold text-sm md:text-base focus:border-[#2F5233] focus:outline-none appearance-none transition-all cursor-pointer font-body"
            >
              <option value="wheat">Wheat (Lok-1 / Sharbati - Rabi)</option>
              <option value="rice">Rice (Basmati / Indrayani - Kharif)</option>
              <option value="cotton">Cotton (Medium / Long Staple)</option>
              <option value="soyabean">Soyabean (Yellow Oil-rich)</option>
              <option value="onions">Red Onions (Nashik Bellary)</option>
              <option value="maize">Maize (Sweet / Feed Grade)</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#6E5D4F] pointer-events-none">
              arrow_drop_down
            </span>
          </div>
        </div>

        {/* Quantity (Quintals) */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6E5D4F] font-body">{t.quantity} ({t.quintal})</label>
            <span className="text-xs text-[#6E5D4F] font-medium font-body">
              1 {t.quintal} = 100 kg
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(5, q - 5))}
              className="w-14 h-14 rounded-2xl bg-[#F7F1E3] flex items-center justify-center text-[#2F5233] hover:bg-[#E2D7C1] active:scale-95 transition-all text-xl font-bold border-2 border-[#E2D7C1] cursor-pointer font-mono-price"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 0))}
              className="flex-1 h-14 text-center rounded-2xl bg-[#F7F1E3] border-2 border-[#E2D7C1] text-[#2B2016] font-black text-2xl focus:border-[#2F5233] focus:outline-none transition-all font-mono-price"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 5)}
              className="w-14 h-14 rounded-2xl bg-[#F7F1E3] flex items-center justify-center text-[#2F5233] hover:bg-[#E2D7C1] active:scale-95 transition-all text-xl font-bold border-2 border-[#E2D7C1] cursor-pointer font-mono-price"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        {/* Quality Grade — AI photo-based analysis */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6E5D4F] font-body">{t.qualityGrade}</label>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2F5233] bg-[#2F5233]/10 px-2 py-0.5 rounded-md border border-[#2F5233]/20">
              <Sparkles className="w-3 h-3" />
              AI Grading
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoCapture}
            className="hidden"
          />

          {!photoPreview ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-6 rounded-2xl bg-[#F7F1E3] hover:bg-[#E2D7C1]/60 border-2 border-dashed border-[#2F5233] flex flex-col items-center justify-center gap-2 text-center transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-white border-2 border-[#2F5233]/30 flex items-center justify-center text-[#2F5233] group-hover:scale-105 transition-transform">
                <Camera className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-[#2B2016] font-heading">{t.uploadCropPhoto}</h4>
              <p className="text-xs text-[#6E5D4F] font-body max-w-xs">{t.gradePhotoHint}</p>
            </button>
          ) : (
            <div className="rounded-2xl border-2 border-[#2F5233] bg-[#FFFDF8] overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-36 h-36 shrink-0 bg-[#2B2016]/5">
                  <img src={photoPreview} alt="Produce sample" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">
                  {isAnalyzingGrade ? (
                    <div className="flex items-center gap-2 text-[#2F5233] font-bold text-sm font-body">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.analyzingGrade}
                    </div>
                  ) : gradeAnalysisError ? (
                    <div className="flex items-center gap-2 text-red-700 font-bold text-sm font-body">
                      <AlertTriangle className="w-4 h-4" />
                      {gradeAnalysisError}
                    </div>
                  ) : gradeAnalysis ? (
                    <>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F5233]/15 border border-[#2F5233] text-[#2F5233] font-black text-sm font-heading">
                          <CheckCircle2 className="w-4 h-4" />
                          {grade === 'A' ? t.gradeA : grade === 'B' ? t.gradeB : t.gradeC}
                        </span>
                        <span className="text-[11px] font-bold text-[#6E5D4F] font-body">
                          {gradeAnalysis.confidence}% {t.gradeAnalysisConfidence}
                        </span>
                      </div>
                      {gradeAnalysis.reasons.length > 0 && (
                        <ul className="text-xs text-[#6E5D4F] font-body list-disc pl-4 space-y-0.5">
                          {gradeAnalysis.reasons.slice(0, 3).map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      )}
                      {gradeAnalysis.advisory && (
                        <p className="text-[11px] text-[#2F5233]/80 font-body italic">{gradeAnalysis.advisory}</p>
                      )}
                    </>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleRetakePhoto}
                    className="mt-auto self-start flex items-center gap-1.5 text-xs font-bold text-[#2F5233] bg-white hover:bg-[#E2D7C1]/50 border border-[#2F5233]/40 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t.retakePhoto}
                  </button>
                </div>
              </div>
            </div>
          )}
          <p className="text-[11px] text-[#6E5D4F] font-body">{t.gradeNote}</p>
        </div>

        {/* Storage Location - Registered Warehouse & Cold Storage Selection */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6E5D4F] font-body">
              {t.selectStorageForProduce || 'Storage Location / Warehouse'}
            </label>
            <span className="text-[11px] font-bold text-[#2F5233] bg-[#2F5233]/10 px-2 py-0.5 rounded-md border border-[#2F5233]/20">
              WDRA Directory
            </span>
          </div>

          {selectedWarehouse ? (
            <div className="p-4 rounded-2xl bg-[#F7F1E3] border-2 border-[#2F5233] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#2F5233]/30 flex items-center justify-center shrink-0 mt-0.5">
                  {selectedWarehouse.warehouseType === 'Cold Storage' ? (
                    <Snowflake className="w-5 h-5 text-cyan-700" />
                  ) : selectedWarehouse.warehouseType === 'Dry Storage' ? (
                    <Package className="w-5 h-5 text-amber-700" />
                  ) : (
                    <Building2 className="w-5 h-5 text-emerald-700" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-xs font-bold text-[#2B2016]">
                      {selectedWarehouse.name}
                    </span>
                    {selectedWarehouse.isWdraRegistered && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3 text-emerald-700" />
                        WDRA
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6E5D4F]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-700" />
                      {selectedWarehouse.district}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-[#2B2016]">
                      ₹{selectedWarehouse.ratePerQuintalPerDay.toFixed(2)} / qtl / day
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setShowWarehousePicker(true)}
                  className="px-3 py-1.5 text-xs font-bold text-[#2F5233] bg-white hover:bg-[#E2D7C1]/50 border border-[#2F5233]/40 rounded-xl transition-colors cursor-pointer"
                >
                  {t.changeWarehouse || 'Change Warehouse'}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowWarehousePicker(true)}
              className="w-full p-4 rounded-2xl bg-[#F7F1E3] hover:bg-[#E2D7C1]/60 border-2 border-dashed border-[#2F5233] flex items-center justify-between gap-3 text-left transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#2F5233]/20 flex items-center justify-center text-[#2F5233] group-hover:scale-105 transition-transform">
                  <Warehouse className="w-6 h-6 text-[#2F5233]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2B2016] font-heading">
                    {t.chooseStorageLocation || 'Choose Registered Warehouse or Cold Storage'}
                  </h4>
                  <p className="text-xs text-[#6E5D4F] font-body mt-0.5">
                    Browse 20+ WDRA accredited warehouses across Maharashtra by distance
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-[#2F5233] text-white text-xs font-bold rounded-full font-heading shrink-0">
                Browse &rarr;
              </span>
            </button>
          )}
        </div>

        {/* Warehouse Selection Modal */}
        {showWarehousePicker && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-[#F7F1E3] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#2F5233] shadow-2xl p-4 sm:p-6 relative">
              <WarehouseFinder
                farmerLocation="Pune, MH"
                isModal={true}
                selectedWarehouseId={selectedWarehouse?.id}
                onSelectWarehouse={(wh) => {
                  setSelectedWarehouse(wh);
                  setLocation(`${wh.name}, ${wh.district}`);
                  setShowWarehousePicker(false);
                }}
                onClose={() => setShowWarehousePicker(false)}
                initialCrop={crop}
                initialQuantity={quantity}
              />
            </div>
          </div>
        )}

        {/* FPO Aggregation Toggle — only appears if farmer has joined an FPO */}
        {myFpo && (
          <div className="bg-[#F7F1E3] rounded-2xl p-5 border-2 border-[#2F5233]/30 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={listAsFpo}
                onChange={(e) => setListAsFpo(e.target.checked)}
                className="mt-1 w-5 h-5 accent-[#2F5233] cursor-pointer"
              />
              <span>
                <span className="flex items-center gap-2 font-heading font-bold text-sm text-[#2B2016]">
                  <Users size={16} className="text-[#2F5233]" />
                  {t.fpoAggregationToggle} — {myFpo.name}
                </span>
                <span className="text-xs text-[#6E5D4F] font-body block mt-1">
                  {t.fpoAggregationHint}
                </span>
              </span>
            </label>
          </div>
        )}

        {/* Estimated Value Preview Ticket Strip */}
        <div className="bg-[#F7F1E3] rounded-2xl p-5 border-2 border-dashed border-[#E2D7C1] flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-[11px] font-bold text-[#6E5D4F] uppercase tracking-wider block mb-0.5 font-body">
              {t.estimatedListingValue}
            </span>
            <span className="text-2xl font-black text-[#2F5233] font-mono-price">
              ₹{(quantity * 2800).toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-xs font-bold text-[#2F5233] bg-[#2F5233]/10 border border-[#2F5233]/30 px-3.5 py-1.5 rounded-full font-body">
            3 {t.activeBuyerBidsWaiting}
          </span>
        </div>

        {/* Submit Button */}
        <div className="pt-2 border-t-2 border-[#E2D7C1]">
          <button
            type="submit"
            disabled={isSubmitting || isAnalyzingGrade || !gradeAnalysis}
            className="w-full h-14 bg-[#2F5233] hover:bg-[#254228] text-white rounded-full font-heading font-bold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <span className="material-symbols-outlined text-xl">search</span>
            {isSubmitting ? 'Analyzing Regional Mandis...' : !gradeAnalysis ? t.uploadCropPhoto : t.submitProduce}
          </button>
        </div>
      </form>
    </main>
  );
};
