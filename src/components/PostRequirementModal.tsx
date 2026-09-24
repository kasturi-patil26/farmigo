import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PostRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const PostRequirementModal: React.FC<PostRequirementModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const { t } = useLanguage();
  const [crop, setCrop] = useState('Lokwan Wheat');
  const [quantity, setQuantity] = useState(100);
  const [targetPrice, setTargetPrice] = useState(2800);
  const [destination, setDestination] = useState('Pune Wholesale Yard / Processing Unit');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess();
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl border-2 border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6 border-b-2 border-slate-100 flex justify-between items-center bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">post_add</span>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg tracking-tight">{t.postRequirement}</h3>
              <p className="text-xs text-slate-300">
                Broadcast buying bids directly to verified local farmers
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

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h4 className="text-xl font-black text-slate-900">Requirement Broadcasted!</h4>
            <p className="text-xs text-slate-500 font-medium">
              Your purchase order RFQ has been sent to 412 registered farmers in Pune & Nashik.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.commodity}
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  {t.quantity} ({t.quintal})
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Target Bid (₹ / {t.quintal})
                </label>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value) || 0)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.storageLocation}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                required
              />
            </div>

            <div className="bg-indigo-50/70 p-4 rounded-2xl border-2 border-indigo-100 text-xs flex justify-between items-center">
              <span className="font-bold text-indigo-900 uppercase tracking-wider">{t.totalPayout}:</span>
              <strong className="text-indigo-600 font-black text-base">
                ₹{(quantity * targetPrice).toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="pt-3 border-t-2 border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full shadow-md shadow-indigo-100 transition-all cursor-pointer"
              >
                Post to Regional Network
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
