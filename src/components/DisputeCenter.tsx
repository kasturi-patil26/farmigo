import React, { useState } from 'react';
import { DisputeReason, DisputeTicket } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DisputeCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  relatedSaleId?: string;
  raisedBy: string;
  onSubmit: (ticket: DisputeTicket) => void;
}

export const DisputeCenterModal: React.FC<DisputeCenterModalProps> = ({
  isOpen,
  onClose,
  relatedSaleId,
  raisedBy,
  onSubmit,
}) => {
  const { t } = useLanguage();
  const [reason, setReason] = useState<DisputeReason>('quality-mismatch');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket: DisputeTicket = {
      id: `dispute_${Date.now()}`,
      relatedSaleId,
      raisedBy,
      reason,
      note,
      status: 'open',
      createdDate: new Date().toISOString(),
    };
    onSubmit(ticket);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2016]/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm w-full max-w-md shadow-2xl border-2 border-[#8C4A2F] overflow-hidden">
        <div className="p-5 bg-[#8C4A2F] text-white flex justify-between items-center">
          <h3 className="font-bold text-base tracking-tight font-heading">{t.disputeCenterTitle}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2F5233]/10 border-2 border-[#2F5233]/30 text-[#2F5233] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <p className="font-bold text-sm text-[#2B2016] font-body">{t.disputeSuccessMessage}</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-[#2F5233] text-white rounded-full font-bold text-xs font-heading"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-[#6E5D4F] uppercase tracking-wider block mb-2 font-body">
                {t.disputeReasonLabel}
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as DisputeReason)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E2D7C1] bg-[#F7F1E3] text-sm font-bold text-[#2B2016] font-body"
              >
                <option value="quality-mismatch">{t.disputeReasonQuality}</option>
                <option value="payment-delay">{t.disputeReasonPayment}</option>
                <option value="quantity-mismatch">{t.disputeReasonQuantity}</option>
                <option value="other">{t.disputeReasonOther}</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#6E5D4F] uppercase tracking-wider block mb-2 font-body">
                {t.disputeNoteLabel}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#E2D7C1] bg-[#F7F1E3] text-sm font-medium text-[#2B2016] font-body resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#8C4A2F] hover:bg-[#733B24] text-white font-bold text-xs rounded-full font-heading transition-colors"
            >
              {t.disputeSubmit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

interface DisputeStatusBadgeProps {
  status: DisputeTicket['status'];
}

export const DisputeStatusBadge: React.FC<DisputeStatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();
  const label =
    status === 'open' ? t.disputeStatusOpen : status === 'under-review' ? t.disputeStatusReview : t.disputeStatusResolved;
  const colorClass =
    status === 'open'
      ? 'bg-[#8C4A2F]/10 text-[#8C4A2F] border-[#8C4A2F]/30'
      : status === 'under-review'
      ? 'bg-[#D9A441]/15 text-[#976D1F] border-[#D9A441]/40'
      : 'bg-[#2F5233]/10 text-[#2F5233] border-[#2F5233]/30';
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${colorClass}`}>
      {label}
    </span>
  );
};
