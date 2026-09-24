import React, { useState } from 'react';
import { FarmerTab, SalesRecord, DisputeTicket } from '../types';
import { INITIAL_SALES_RECORDS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { DisputeCenterModal, DisputeStatusBadge } from './DisputeCenter';

interface FarmerSalesTrackingProps {
  onNavigate: (tab: FarmerTab) => void;
}

export const FarmerSalesTracking: React.FC<FarmerSalesTrackingProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [sales, setSales] = useState<SalesRecord[]>(INITIAL_SALES_RECORDS);
  const [selectedReceipt, setSelectedReceipt] = useState<SalesRecord | null>(null);
  const [disputeTargetSale, setDisputeTargetSale] = useState<SalesRecord | null>(null);
  const [disputes, setDisputes] = useState<DisputeTicket[]>([]);

  // Real, button-driven state change — status genuinely flips in app state
  // instead of being frozen demo text.
  const handleMarkAsPaid = (saleId: string) => {
    setSales((prev) =>
      prev.map((s) => (s.id === saleId ? { ...s, status: 'paid' } : s))
    );
  };

  const handleDisputeSubmit = (ticket: DisputeTicket) => {
    setDisputes((prev) => [...prev, ticket]);
    if (disputeTargetSale) {
      setSales((prev) =>
        prev.map((s) => (s.id === disputeTargetSale.id ? { ...s, disputeId: ticket.id } : s))
      );
    }
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-[#F7F1E3]">
      {/* Header Card */}
      <div className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm p-6 md:p-8 border-2 border-[#2F5233] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Top color bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#2F5233]" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-[#2F5233]/10 text-[#2F5233] font-mono-price font-bold text-xs rounded-full border border-[#2F5233]/20">
              e-NAM Unified Settlement • थेट खात्यात जमा
            </span>
            <span className="px-3.5 py-1 bg-[#D9A441]/15 text-[#976D1F] font-mono-price font-bold text-xs rounded-full border border-[#D9A441]/30">
              APMC Gate Audited
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-[#2B2016] tracking-tight font-heading">
            {t.salesTrackingTitle}
          </h2>
          <p className="text-sm md:text-base text-[#6E5D4F] font-medium font-body">
            {t.salesTrackingSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-3 bg-[#F7F1E3] hover:bg-[#E2D7C1]/50 text-[#2B2016] rounded-full font-heading font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-[#E2D7C1]"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t.back}
          </button>
        </div>
      </div>

      {/* Sales Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm p-6 border-2 border-[#E2D7C1] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2F5233]/10 text-[#2F5233] border-2 border-[#2F5233]/20 flex items-center justify-center text-2xl font-black font-mono-price">
            ₹
          </div>
          <div>
            <span className="text-[10px] text-[#6E5D4F] font-bold uppercase tracking-wider block font-body">
              {t.totalRealizedRevenue}
            </span>
            <strong className="text-2xl font-black text-[#2B2016] font-mono-price">₹3,79,700</strong>
            <span className="text-xs text-[#2F5233] font-bold block mt-0.5 font-body">100% {t.directPayoutEnabled}</span>
          </div>
        </div>

        <div className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm p-6 border-2 border-[#E2D7C1] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2F5233]/10 text-[#2F5233] border-2 border-[#2F5233]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">scale</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6E5D4F] font-bold uppercase tracking-wider block font-body">
              {t.totalHarvestSold}
            </span>
            <strong className="text-2xl font-black text-[#2B2016] font-mono-price">120 {t.quintal}</strong>
            <span className="text-xs text-[#6E5D4F] font-medium block mt-0.5 font-body">Across 3 APMC Mandis</span>
          </div>
        </div>

        <div className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm p-6 border-2 border-[#E2D7C1] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D9A441]/15 text-[#976D1F] border-2 border-[#D9A441]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">local_shipping</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6E5D4F] font-bold uppercase tracking-wider block font-body">
              {t.activeInTransit}
            </span>
            <strong className="text-2xl font-black text-[#2B2016] font-mono-price">1 {t.shipment}</strong>
            <span className="text-xs text-[#976D1F] font-bold block mt-0.5 font-body">Arriving Lasalgaon at 11:30 AM</span>
          </div>
        </div>
      </div>

      {/* Sales Records List */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-[#2B2016] tracking-tight flex items-center gap-2 font-heading">
          <span className="material-symbols-outlined text-[#2F5233]">receipt_long</span>
          {t.completedSales}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm border-2 border-[#E2D7C1] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:border-[#2F5233] transition-all"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 font-mono-price font-bold text-xs rounded-full border ${
                    sale.status === 'paid'
                      ? 'bg-[#2F5233]/10 text-[#2F5233] border-[#2F5233]/30'
                      : 'bg-[#D9A441]/15 text-[#976D1F] border-[#D9A441]/40'
                  }`}>
                    {sale.status === 'paid' ? `✓ ${t.paidCleared}` : `🚚 ${t.inTransit}`}
                  </span>
                  <span className="text-xs font-bold text-[#6E5D4F] font-mono-price">
                    {t.gatePassNumber}: {sale.gatePassNo}
                  </span>
                  <span className="text-xs text-[#6E5D4F] font-medium font-body">
                    • {sale.date}
                  </span>
                </div>

                <h4 className="text-xl font-black text-[#2B2016] tracking-tight font-heading">
                  {sale.cropName} ({sale.quantityQuintals} {t.quintal})
                </h4>

                <div className="flex flex-wrap gap-4 text-xs text-[#6E5D4F] font-medium font-body">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#2F5233]">store</span>
                    {sale.destinationMandi}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#8C4A2F]">person</span>
                    Buyer: {sale.buyerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#2F5233]">local_shipping</span>
                    Vehicle: {sale.vehicleNo}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t-2 md:border-t-0 border-[#E2D7C1]">
                <div className="md:text-right">
                  <span className="text-[10px] text-[#6E5D4F] font-bold uppercase tracking-wider block font-body">
                    {t.netSettledAmount}
                  </span>
                  <strong className="text-2xl font-black text-[#2F5233] font-mono-price">
                    ₹{sale.netPayout.toLocaleString('en-IN')}
                  </strong>
                  <span className="text-xs text-[#6E5D4F] block font-medium font-body">
                    @ ₹{sale.soldPricePerQtl}/qtl ({t.totalPayout} ₹{sale.totalGross.toLocaleString('en-IN')})
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedReceipt(sale)}
                    className="px-4 py-2.5 bg-[#F7F1E3] hover:bg-[#E2D7C1]/50 text-[#2F5233] rounded-full font-heading font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-[#E2D7C1]"
                  >
                    <span className="material-symbols-outlined text-base">receipt</span>
                    {t.downloadENAMReceipt}
                  </button>
                  {sale.status !== 'paid' && (
                    <button
                      onClick={() => handleMarkAsPaid(sale.id)}
                      className="px-4 py-2.5 bg-[#2F5233] hover:bg-[#254228] text-white rounded-full font-heading font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      {t.markAsPaidButton}
                    </button>
                  )}
                  {sale.disputeId ? (
                    <DisputeStatusBadge status={disputes.find((d) => d.id === sale.disputeId)?.status ?? 'open'} />
                  ) : (
                    <button
                      onClick={() => setDisputeTargetSale(sale)}
                      className="px-4 py-2.5 bg-[#8C4A2F]/10 hover:bg-[#8C4A2F]/20 text-[#8C4A2F] rounded-full font-heading font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-[#8C4A2F]/30"
                    >
                      <span className="material-symbols-outlined text-base">flag</span>
                      {t.raiseIssueButton}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandi Receipt Modal with Physical Gate Pass Styling */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2016]/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFFDF8] rounded-t-3xl rounded-br-3xl rounded-bl-sm w-full max-w-lg shadow-2xl border-2 border-[#2F5233] overflow-hidden">
            <div className="p-6 bg-[#2F5233] text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight font-heading">{t.digitalSettlementSlip}</h3>
                  <p className="text-xs text-white/80 font-medium font-body">APMC e-NAM Official Gate Record</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-medium font-body">
              <div className="p-4 bg-[#F7F1E3] rounded-2xl border-2 border-[#E2D7C1] space-y-2 font-mono-price">
                <div className="flex justify-between border-b border-[#E2D7C1] pb-2">
                  <span className="text-[#6E5D4F] font-body">{t.transactionRef}:</span>
                  <span className="font-bold text-[#2B2016]">{selectedReceipt.eNamTxnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E5D4F] font-body">{t.gatePassNumber}:</span>
                  <span className="font-bold text-[#2B2016]">{selectedReceipt.gatePassNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E5D4F] font-body">{t.commodity}:</span>
                  <span className="font-bold text-[#2B2016] font-body">{selectedReceipt.cropName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E5D4F] font-body">{t.quantityWeighed}:</span>
                  <span className="font-bold text-[#2B2016]">{selectedReceipt.quantityQuintals} {t.quintal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E5D4F] font-body">{t.rateRealized}:</span>
                  <span className="font-bold text-[#2B2016]">₹{selectedReceipt.soldPricePerQtl} {t.perQuintal}</span>
                </div>
                <div className="flex justify-between border-t border-[#E2D7C1] pt-2 text-sm font-black">
                  <span className="text-[#2B2016] font-body">{t.netBankTransfer}:</span>
                  <span className="text-[#2F5233]">₹{selectedReceipt.netPayout.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#2F5233]/10 border border-[#2F5233]/30 text-[#2B2016] flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#2F5233]">account_balance</span>
                <div>
                  <p className="font-bold text-xs font-heading">{t.directDBTBeneficiary}: Ramesh Patil</p>
                  <p className="text-[11px] text-[#6E5D4F]">Bank of Maharashtra • A/C Ending in 4902 • IFSC: MAHB000012</p>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="flex-1 h-12 bg-[#F7F1E3] hover:bg-[#E2D7C1]/50 text-[#2B2016] font-heading font-bold text-xs rounded-full transition-colors cursor-pointer border border-[#E2D7C1]"
                >
                  {t.close}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReceipt(null);
                  }}
                  className="flex-2 h-12 bg-[#2F5233] hover:bg-[#254228] text-white font-heading font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  {t.downloadInvoice}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DisputeCenterModal
        isOpen={!!disputeTargetSale}
        onClose={() => setDisputeTargetSale(null)}
        relatedSaleId={disputeTargetSale?.id}
        raisedBy={'Farmer'}
        onSubmit={handleDisputeSubmit}
      />
    </main>
  );
};
